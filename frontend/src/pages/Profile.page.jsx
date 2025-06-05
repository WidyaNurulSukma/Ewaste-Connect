import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import UserProfile from '../components/profile/Profile.component';

const ProfilePage = () => {
  return (
    <div className="bg-[#332F9E] min-h-screen text-white">
      <AuthHeader />
      <UserProfile />
    </div>
  );
};

export default ProfilePage;