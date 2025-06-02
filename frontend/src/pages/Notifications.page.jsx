import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import NotificationItem from '../components/notifications/NotificationItem.component';
import notificationCategories from '../data/notifications';
import AuthHeader from '../components/header/AuthHeader.component';
import Footer from '../components/footer/Footer.component';

const NotificationsPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <AuthHeader />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Notifications</h1>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className='flex space-x-1 rounded-xl bg-green-700 p-1'>
            {notificationCategories.map(({ name, icon: Icon }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                  flex items-center justify-center
                  ${
                    selected
                      ? 'bg-white shadow'
                      : 'text-green-100 hover:bg-white/[0.12] hover:text-white'
                  }`}
              >
                <Icon className='w-5 h-5 mr-2' />
                {name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='mt-2'>
            {notificationCategories.map(({ name, notifications }) => (
              <Tab.Panel
                key={name}
                className='rounded-xl bg-white p-3'
              >
                <ul role='list' className='divide-y divide-gray-200'>
                  {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
