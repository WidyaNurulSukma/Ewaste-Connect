import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Package, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@chakra-ui/react';
import orderService from '../../services/order.service';
import { useAuth } from '../../hooks/auth';

const OrderList = ({ orders }) => {
  const [ordersWithAddress, setOrdersWithAddress] = useState([]);
  const { getUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const user = JSON.parse(getUser());
  const auth = user.accessToken;

  useEffect(() => {
    let isMounted = true;

    const fetchAddresses = async () => {
      try {
        // Batasi hanya 5 order pertama untuk reverse geocode
        const limitedOrders = orders.slice(0, 5);

        const fetchedOrders = await Promise.all(
          limitedOrders.map(async (order) => {
            if (order.location && !order.formattedAddress) {
              try {
                const address = await orderService.reverseGeocode(
                  order.location.lat,
                  order.location.lng
                );
                return { ...order, formattedAddress: address };
              } catch (error) {
                console.error(`Gagal mendapatkan alamat untuk pesanan ${order.id}:`, error);
                return order;
              }
            }
            return order;
          })
        );

        const restOrders = orders.slice(5).map((order) => ({
          ...order,
          formattedAddress: `Lat: ${order.location.lat}, Lng: ${order.location.lng}`
        }));

        if (isMounted) {
          setOrdersWithAddress([...fetchedOrders, ...restOrders]);
        }
      } catch (error) {
        console.error('Gagal mengambil alamat:', error);
        toast({
          title: 'Gagal memuat detail pesanan',
          description: 'Terjadi kesalahan saat memuat detail pesanan. Silakan coba lagi.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    };

    if (orders.length > 0) {
      fetchAddresses();
    }

    return () => {
      isMounted = false;
    };
  }, [orders, toast]);

  const handleStartPickup = async (orderId) => {
    try {
      const resp = await orderService.acceptOrder(orderId, auth);
      if (resp.status === 200) {
        toast({
          title: 'Penjemputan diterima',
          description: 'Anda telah menerima permintaan penjemputan ini.',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        });
        navigate('/daily-route');
      } else {
        toast({
          title: 'Gagal menerima penjemputan',
          description: resp.data?.error || 'Penjemputan mungkin sudah diterima.',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        });
      }
    } catch (error) {
      toast({
        title: 'Gagal menerima penjemputan',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      try {
        const resp = await orderService.deleteOrder(orderId, auth);
        if (resp.status === 200 || resp.status === 204) {
          setOrdersWithAddress((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId)
          );
          toast({
            title: 'Pesanan dihapus',
            description: 'Pesanan telah berhasil dihapus.',
            status: 'success',
            duration: 5000,
            isClosable: true
          });
        } else {
          toast({
            title: 'Gagal menghapus pesanan',
            description: `Gagal dengan status ${resp.status}: ${resp.data?.error || 'Kesalahan tidak diketahui'}`,
            status: 'error',
            duration: 5000,
            isClosable: true
          });
        }
      } catch (error) {
        console.error('Gagal menghapus pesanan:', error);
        toast({
          title: 'Gagal menghapus pesanan',
          description: `Terjadi kesalahan: ${error.message}. Silakan coba lagi.`,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3'>
      {ordersWithAddress.map((order) => (
        <div key={order.id} className='bg-white p-7 mt-8 rounded-lg shadow'>
          <div className='mb-4'>
            <img
              src={order.imageUrl}
              alt={order.description}
              className='w-full h-48 object-cover rounded-lg'
            />
          </div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <Package size={20} className='mr-2' />
              <span className='text-gray-600'>{order.description}</span>
            </div>
            <div className='space-x-2'>
              <button
                className='bg-[#6C6C81] text-white px-4 py-2 rounded hover:bg-[#5A5A6D] transition duration-300'
                onClick={() => handleStartPickup(order.id)}
              >
                Jemput
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300'
                onClick={() => handleDeleteOrder(order.id)}
              >
                Hapus
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 text-gray-600 mb-4'>
            <div>
              <Calendar size={16} className='inline-block mr-2' />
              <span>{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
            <div>
              <MapPin size={16} className='inline-block mr-2' />
              <span>{order.formattedAddress}</span>
            </div>
          </div>
          <div className='bg-blue-100 p-4 rounded-lg'>
            <h3 className='text-gray-800 font-semibold mb-2'>Kategori Ewaste</h3>
            <div className='flex flex-wrap gap-2'>
              {order.tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
