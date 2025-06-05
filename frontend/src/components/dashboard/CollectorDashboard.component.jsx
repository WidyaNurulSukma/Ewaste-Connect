import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Package,
  ClipboardList,
  User,
  Calendar,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../hooks/auth';

const CollectorDashboard = () => {
  const navigate = useNavigate();
  const [collectorName, setCollectorName] = useState('');
  const [collectionStats, setCollectionStats] = useState({
    completed: 0,
    pending: 0,
    today: 0
  });
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());

  useEffect(() => {
    // TODO: Fetch collector data and stats from API
    setCollectorName(user.name);
    setCollectionStats({ completed: 15, pending: 5, today: 3 });
  }, []);

  const quickActions = [
    {
      name: 'Melihat permintaan penjemputan',
      icon: <ClipboardList size={24} />,
      action: () => navigate('/pickup/requests')
    },
    {
      name: "Rute Hari ini",
      icon: <MapPin size={24} />,
      action: () => navigate('/daily-route')
    },
    {
      name: 'Riwayat',
      icon: <Truck size={24} />,
      action: () => navigate('/collector-history')
    },
    {
      name: 'Edit Profile',
      icon: <User size={24} />,
      action: () => navigate('/account/profile')
    }
  ];

  return (
    <div className='bg-[#6C6C81] min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-white mb-8'>
          Welcome, Collector {collectorName}!
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4 text-black'>
              Permintaan Penjemputan Anda
            </h2>
            <div className='flex justify-between'>
              <div>
                <p className='text-gray-600'>Completed</p>
                <p className='text-2xl font-bold text-green-600'>
                  {collectionStats.completed}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Pending</p>
                <p className='text-2xl font-bold text-yellow-600'>
                  {collectionStats.pending}
                </p>
              </div>
              <div>
                <p className='text-gray-600'>Today's Pickups</p>
                <p className='text-2xl font-bold text-blue-600'>
                  {collectionStats.today}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4 text-black'>Pilihan Cepat</h2>
            <div className='grid grid-cols-2 gap-4'>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className='flex flex-col items-center justify-center p-4 bg-[#6C6C81] rounded-lg hover:bg-[#5A5A6D] transition duration-300'
                >
                  {action.icon}
                  <span className='mt-2 text-sm text-white'>{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow mb-8'>
          <h2 className='text-xl font-semibold mb-4 text-black'>
            Permintaan Penjemputan Anda
          </h2>
          <ul className='space-y-4'>
            <li className='flex items-center justify-between text-gray-600'>
              <div className='flex items-center'>
                <Package size={20} className='mr-2' />
                <span>Barang Handphone</span>
              </div>
              <button className='bg-[#6C6C81] text-white px-4 py-2 rounded hover:bg-[#5A5A6D] transition duration-300'>
                Jemput
              </button>
            </li>
            <li className='flex items-center justify-between text-gray-600'>
              <div className='flex items-center'>
                <Package size={20} className='mr-2' />
                <span>Barang Handphone</span>
              </div>
              <button className='bg-[#6C6C81] text-white px-4 py-2 rounded hover:bg-[#5A5A6D] transition duration-300'>
                Jemput
              </button>
            </li>
          </ul>
        </div>

        <div className='bg-white p-6 rounded-lg'>
          <h2 className='text-xl font-semibold mb-4 text-black'>eWaste Tip</h2>
          <p className='text-gray-700'>
          Selalu kenakan perlengkapan keselamatan yang tepat saat menangani limbah elektronik untuk melindungi diri dari bahan berbahaya.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectorDashboard;