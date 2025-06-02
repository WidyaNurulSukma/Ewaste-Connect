import AuthHeader from '../components/header/AuthHeader.component';
import UserDashboard from '../components/dashboard/UserDashboard.component';
import CollectorDashboard from '../components/dashboard/CollectorDashboard.component';
import { useAuth } from '../hooks/auth';

const Dashboard = () => {
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());

  return (
    <div className="bg-[#332F9E] min-h-screen text-white">
      <AuthHeader />
      {user.role === 'user' ? <UserDashboard /> : <CollectorDashboard />}
    </div>
  );
};

export default Dashboard;