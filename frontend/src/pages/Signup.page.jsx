import Signup from '../components/signup/Signup.component';
import Footer from '../components/footer/Footer.component';
import Header from '../components/header/Header.component';

const SignupPage = () => {
  return (
    <>
      {/* Tulisan eWaste Connect di pojok kiri atas */}
      <div className="absolute top-4 left-4 z-50 leading-none">
        <p className="text-blue-800" style={{ fontSize: '20px' }}>eWaste</p>
        <p className="text-green-600" style={{ fontSize: '20px' }}>Connect</p>
      </div>

      <Signup />
    </>
  );
};

export default SignupPage;
