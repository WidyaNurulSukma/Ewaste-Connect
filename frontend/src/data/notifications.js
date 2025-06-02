import {
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const notificationCategories = [
  {
    name: 'All',
    icon: Bell,
    notifications: [
      {
        id: 1,
        title: 'New E-waste Pickup Request',
        description:
          'A new pickup request for 2 old laptops has been submitted.',
        date: '5m ago',
        type: 'pickup',
        read: false
      },
      {
        id: 2,
        title: 'E-waste Collection Completed',
        description:
          'The e-waste collection for order #EW5678 has been successfully completed.',
        date: '2h ago',
        type: 'collection',
        read: true
      },
      {
        id: 3,
        title: 'Recycling Credit Earned',
        description:
          "You've earned 100 recycling points for your recent e-waste disposal.",
        date: '1d ago',
        type: 'credit',
        read: true
      },
      {
        id: 4,
        title: 'New Recycling Center Added',
        description:
          'A new e-waste recycling center has been added in your area.',
        date: '3d ago',
        type: 'info',
        read: false
      }
    ]
  },
  {
    name: 'Unread',
    icon: AlertCircle,
    notifications: [
      {
        id: 1,
        title: 'New E-waste Pickup Request',
        description:
          'A new pickup request for 2 old laptops has been submitted.',
        date: '5m ago',
        type: 'pickup',
        read: false
      },
      {
        id: 4,
        title: 'New Recycling Center Added',
        description:
          'A new e-waste recycling center has been added in your area.',
        date: '3d ago',
        type: 'info',
        read: false
      }
    ]
  },
  {
    name: 'Read',
    icon: CheckCircle,
    notifications: [
      {
        id: 2,
        title: 'E-waste Collection Completed',
        description:
          'The e-waste collection for order #EW5678 has been successfully completed.',
        date: '2h ago',
        type: 'collection',
        read: true
      },
      {
        id: 3,
        title: 'Recycling Credit Earned',
        description:
          "You've earned 100 recycling points for your recent e-waste disposal.",
        date: '1d ago',
        type: 'credit',
        read: true
      }
    ]
  }
];

export default notificationCategories;
