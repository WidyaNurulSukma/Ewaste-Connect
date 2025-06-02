import React from 'react';
import { useSelector } from 'react-redux';

const ContributionHistory = () => {
  const contributions = useSelector(state => state.contribution);

  // Fungsi untuk memetakan status bahasa Inggris ke bahasa Indonesia
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
        return status; // Kembali ke status asli jika tidak dikenali
    }
  };

  return (
    <div className='font-sans text-gray-800 p-4 mb-4 mt-10 max-w-3xl mx-auto'>
      <div className='text-center mb-6'>
        <p className='text-xl text-white'>
          Terima Kasih telah menjaga Bumi agar Tetap Bersih dan Sehat!
        </p>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-4'>
          <h2 className='text-xl mb-4 text-center text-black'>Riwayat Kontribusi</h2>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border p-2 text-left text-gray-800'>Tanggal</th>
                <th className='border p-2 text-left text-gray-800'>Barang</th>
                <th className='border p-2 text-left text-gray-800'>Status</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contribution, index) => (
                <tr key={index}>
                  <td className='border p-2 text-gray-800'>
                    {new Date(contribution.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className='border p-2'>
                    <img
                      className='w-16 h-16'
                      src={contribution.imageUrl}
                      alt="Barang kontribusi"
                    />
                  </td>
                  <td className='border p-2 text-gray-800'>
                    {mapStatusToIndonesian(contribution.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContributionHistory;