
const NotificationItem = ({ notification }) => (
  <li className='py-4'>
    <div className='flex space-x-3'>
      <div className='flex-1 space-y-1'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium'>{notification.title}</h3>
          <p className='text-sm text-gray-500'>{notification.date}</p>
        </div>
        <p className='text-sm text-gray-500'>{notification.description}</p>
      </div>
    </div>
  </li>
);

export default NotificationItem;
