import AuthHeader from '../components/header/AuthHeader.component';
import OrderDetail from '../components/order/orderDetails.component';
import orderService from '../services/order.service';
import { useAuth } from '../hooks/auth';
import { useEffect, useState } from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUser } = useAuth();

  const user = JSON.parse(getUser());

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const resp = await orderService.getAllOrders(user.accessToken);
      if (resp.status === 200) {
        setOrders(resp.data.orders);
      }
      setLoading(false);
    };
    getOrders();
  }, [user.accessToken]);

  return (
    <div className='bg-[#6C6C81] min-h-screen'>
      <AuthHeader />
      {loading
        ? (
          <Center height='50vh'>
            <Spinner size='xl' />
          </Center>
          )
        : (
          <OrderDetail orders={orders} />
          )}
    </div>
  );
};

export default OrdersPage;