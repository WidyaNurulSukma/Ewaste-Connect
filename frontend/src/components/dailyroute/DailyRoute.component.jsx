import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/auth';
import orderService from '../../services/order.service';
import { Spinner, Center, Select, Button, useToast } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

const DailyRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { getUser } = useAuth();
  const toast = useToast();
  const user = JSON.parse(getUser());

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const resp = await orderService.getAcceptedOrders(user.accessToken);
        if (resp.status === 200) {
          const ordersWithAddress = await Promise.all(
            resp.data.orders.map(async (order) => {
              if (order.location && !order.formattedAddress) {
                const address = await orderService.reverseGeocode(
                  order.location.lat,
                  order.location.lng
                );
                return { ...order, formattedAddress: address };
              }
              return order;
            })
          );
          setRoutes(ordersWithAddress);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
        toast({
          title: 'Gagal memuat rute',
          description: 'Terjadi kesalahan saat memuat rute hari ini.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, [user.accessToken, toast]);

  const handleAddRoute = async (orderId) => {
    try {
      const resp = await orderService.acceptOrder(orderId, user.accessToken);
      if (resp.status === 200) {
        const updatedRoutes = [...routes, resp.data.order];
        setRoutes(updatedRoutes);
        toast({
          title: 'Rute ditambahkan',
          description: 'Pesanan telah ditambahkan ke rute hari ini.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: 'Gagal menambahkan rute',
        description: 'Terjadi kesalahan saat menambahkan pesanan ke rute.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const resp = await orderService.updateOrderStatus(orderId, newStatus, user.accessToken);
      if (resp.status === 200) {
        setRoutes(routes.map((route) =>
          route.id === orderId ? { ...route, status: newStatus } : route
        ));
        toast({
          title: 'Status diperbarui',
          description: `Status pesanan telah diubah menjadi ${newStatus}.`,
          status: 'success',
          duration: 5000,
          isClosable: true
        });
      }
    } catch (error) {
      toast({
        title: 'Gagal memperbarui status',
        description: 'Terjadi kesalahan saat memperbarui status pesanan.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleViewItems = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  // Statistik ringkasan
  const totalLocations = routes.length;
  const totalItems = routes.reduce((sum, route) => sum + (route.tags?.length || 0), 0);

  return (
    <div className='font-sans text-gray-800 p-4 mb-4 mt-10 max-w-4xl mx-auto'>
      <div className='text-center mb-6'>
        <p className='text-xl text-white'>Rute Penjemputan Hari Ini</p>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
        <div className='p-4'>
          <h2 className='text-xl mb-4 text-center text-black'>Statistik Rute</h2>
          <div className='grid grid-cols-2 gap-4 text-center'>
            <div>
              <p className='text-gray-600'>Total Lokasi</p>
              <p className='text-2xl font-bold'>{totalLocations}</p>
            </div>
            <div>
              <p className='text-gray-600'>Total Barang</p>
              <p className='text-2xl font-bold'>{totalItems}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end mb-4'>
        <Button
            colorScheme='green'
            leftIcon={<Plus />}
            onClick={() => handleAddRoute('ORDER_ID_SIMPANAN')} // ganti dengan ID yang sesuai
        >
            Tambah Rute
        </Button>
      </div>


      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-4'>
          <h2 className='text-xl mb-4 text-center text-black'>Daftar Pengambilan</h2>
          {loading ? (
            <Center height='50vh'>
              <Spinner size='xl' />
            </Center>
          ) : routes.length === 0 ? (
            <p className='text-center text-gray-600'>Tidak ada rute hari ini.</p>
          ) : (
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border p-2 text-left text-gray-800'>Alamat</th>
                  <th className='border p-2 text-left text-gray-800'>Aksi</th>
                  <th className='border p-2 text-left text-gray-800'>Status</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className='border p-2 text-gray-800'>
                        {route.formattedAddress || `Lat: ${route.location.lat}, Lng: ${route.location.lng}`}
                      </td>
                      <td className='border p-2'>
                        <Button
                          size='sm'
                          colorScheme='blue'
                          onClick={() => handleViewItems(route)}
                        >
                          {selectedOrder?.id === route.id ? 'Sembunyikan Barang' : 'Lihat Barang'}
                        </Button>
                      </td>
                      <td className='border p-2'>
                        <Select
                          value={route.status}
                          onChange={(e) => handleStatusChange(route.id, e.target.value)}
                        >
                          <option value='Pending'>Belum Dijemput</option>
                          <option value='InProgress'>Sedang Dijemput</option>
                          <option value='Completed'>Selesai</option>
                          <option value='Cancelled'>Dibatalkan</option>
                        </Select>
                      </td>
                    </tr>
                    {selectedOrder?.id === route.id && (
                      <tr>
                        <td colSpan='3' className='border p-2'>
                          <div className='bg-blue-100 p-4 rounded-lg'>
                            <h3 className='text-gray-800 font-semibold mb-2'>Daftar Barang</h3>
                            <div className='flex flex-wrap gap-2'>
                              {route.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className='bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm'
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <img
                              src={route.imageUrl}
                              alt='Barang pesanan'
                              className='w-32 h-32 mt-2 rounded'
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyRoute;