import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const PrivateRoute = ({ children }) => {
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());

  return user ? children : <Navigate to='/account/login' />;
};

export default PrivateRoute;
