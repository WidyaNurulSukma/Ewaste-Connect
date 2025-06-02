import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderService from '../../services/order.service';
import { useAuth } from '../../hooks/auth';
import { Spinner, Center } from '@chakra-ui/react';

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());

  // Fungsi untuk memetakan status ke bahasa Indonesia
  const mapStatusToIndonesian = (status) => {
    switch (status) {
      case 'Pending':
        return 'Belum Dijemput';
      case 'InProgress':
        return 'Sedang Dijemput';
      case 'Completed':
        return 'Selesai';
      case 'Cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        setLoading(true);
        const resp = await orderService.getUserOrders(user.accessToken);
        if (resp.status === 200) {
          setItems(resp.data.orders);
        }
      } catch (error) {
        console.error('Error fetching user items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserItems();
  }, [user.accessToken]);

  return (
    <div className='font-sans text-gray-800 p-4 mb-4 mt-10 max-w-3xl mx-auto'>
      <div className='text-center mb-6'>
        <p className='text-xl text-white'>
          Daftar Barang Anda yang Sedang Diproses
        </p>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-4'>
          <h2 className='text-xl mb-4 text-center text-black'>Barang Saya</h2>
          {loading ? (
            <Center height='50vh'>
              <Spinner size='xl' />
            </Center>
          ) : items.length === 0 ? (
            <p className='text-center text-gray-600'>Tidak ada barang yang sedang diproses.</p>
          ) : (
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border p-2 text-left text-gray-800'>Tanggal</th>
                  <th className='border p-2 text-left text-gray-800'>Barang</th>
                  <th className='border p-2 text-left text-gray-800'>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className='border p-2 text-gray-800'>
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className='border p-2'>
                      <img
                        className='w-16 h-16'
                        src={item.imageUrl}
                        alt="Barang pengguna"
                      />
                    </td>
                    <td className='border p-2 text-gray-800'>
                      {mapStatusToIndonesian(item.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyItems;