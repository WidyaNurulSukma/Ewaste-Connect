import { Tab } from '@headlessui/react';

const notifications = [
  {
    id: 1,
    title: 'Trash status has been updated',
    date: '5m ago',
    type: 'order'
  },
  {
    id: 2,
    title: 'Ready to pickup',
    date: '2h ago',
    type: 'order'
  }
];

const NotificationPanel = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${isOpen ? '' : 'hidden'}`}>
      <div className='rounded-md bg-white shadow-xs'>
        <div className='p-3'>
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className='relative rounded-md p-3 hover:bg-gray-100'
              >
                <h3 className='text-sm font-medium leading-5 text-black'>
                  {notification.title}
                </h3>
                <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
                  <li>{notification.date}</li>
                  <li>&middot;</li>
                  <li>{notification.type}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
