import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import orderService from '../../services/order.service';
import { Spinner, Center } from '@chakra-ui/react';

const CollectorHistory = () => {
  const [history, setHistory] = useState([]);
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
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const resp = await orderService.getAllOrders(user.accessToken);
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
          setHistory(ordersWithAddress);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user.accessToken]);

  // Statistik
  const totalPickups = history.length;
  const completedPickups = history.filter((order) => order.status === 'Completed').length;
  const inProgressPickups = history.filter((order) => order.status === 'InProgress').length;
  const cancelledPickups = history.filter((order) => order.status === 'Cancelled').length;

  return (
    <div className='font-sans text-gray-800 p-4 mb-4 mt-10 max-w-4xl mx-auto'>
      <div className='text-center mb-6'>
        <p className='text-xl text-white'>Riwayat Penjemputan Semua Pengguna</p>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
        <div className='p-4'>
          <h2 className='text-xl mb-4 text-center text-black'>Statistik Penjemputan</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
            <div>
              <p className='text-gray-600'>Total Penjemputan</p>
              <p className='text-2xl font-bold'>{totalPickups}</p>
            </div>
            <div>
              <p className='text-gray-600'>Selesai</p>
              <p className='text-2xl font-bold'>{completedPickups}</p>
            </div>
            <div>
              <p className='text-gray-600'>Dalam Proses</p>
              <p className='text-2xl font-bold'>{inProgressPickups}</p>
            </div>
            <div>
              <p className='text-gray-600'>Dibatalkan</p>
              <p className='text-2xl font-bold'>{cancelledPickups}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-4'>
          <h2 className='text-xl mb-4 text-center text-black'>Riwayat Penjemputan</h2>
          {loading ? (
            <Center height='50vh'>
              <Spinner size='xl' />
            </Center>
          ) : history.length === 0 ? (
            <p className='text-center text-gray-600'>Tidak ada riwayat penjemputan.</p>
          ) : (
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='border p-2 text-left text-gray-800'>Tanggal</th>
                  <th className='border p-2 text-left text-gray-800'>Kode</th>
                  <th className='border p-2 text-left text-gray-800'>Nama Pengguna</th>
                  <th className='border p-2 text-left text-gray-800'>Alamat</th>
                  <th className='border p-2 text-left text-gray-800'>Item</th>
                  <th className='border p-2 text-left text-gray-800'>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((order, index) => (
                  <tr key={index}>
                    <td className='border p-2 text-gray-800'>
                      {new Date(order.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className='border p-2 text-gray-800'>{order.id}</td>
                    <td className='border p-2 text-gray-800'>{order.userName || 'Tidak Diketahui'}</td>
                    <td className='border p-2 text-gray-800'>
                      {order.formattedAddress || `Lat: ${order.location.lat}, Lng: ${order.location.lng}`}
                    </td>
                    <td className='border p-2'>
                      <div className='flex flex-wrap gap-2'>
                        {order.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className='bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className='border p-2 text-gray-800'>
                      {mapStatusToIndonesian(order.status)}
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

export default CollectorHistory;