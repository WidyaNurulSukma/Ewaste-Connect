import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import Header from '../components/header/Header.component';
import { useAuth } from '../hooks/auth';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      {user ? <AuthHeader /> : <Header />}
      <div className='flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans'>
        <div className='flex-grow flex flex-col justify-center items-center bg-green-50 px-8 py-12'>
          <div className='bg-white p-10 md:p-16 lg:p-20 max-w-3xl w-full rounded-lg shadow-lg text-center'>
            <h1 className='text-5xl md:text-6xl font-bold text-green-600 mb-6'>
              About Us
            </h1>
            <p className='text-lg md:text-xl mb-4'>
              Welcome to E-Waste Recycling Solutions!
              <p />
              <br />
              <p>
                We are passionate about promoting sustainability through responsible electronic waste disposal. Our mission is to minimize the environmental impact of e-waste by offering eco-friendly recycling, secure data destruction, and convenient collection services. <br />
              </p>
            </p><br />
            <button
              className='bg-green-600 text-white px-6 py-3 rounded-full text-lg md:text-xl hover:bg-green-700 transition-all'
              onClick={handleGoHome}
            >Dispose your e-waste here
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
