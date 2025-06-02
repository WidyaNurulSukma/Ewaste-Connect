import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer.component';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans'>
      <div className='flex-grow flex flex-col justify-center items-center bg-green-50 px-8 py-12'>
        <div className='bg-white p-10 md:p-16 lg:p-20 max-w-3xl w-full rounded-lg shadow-lg text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-green-600 mb-6'>
            404 - Page Not Found
          </h1>
          <p className='text-lg md:text-xl mb-4'>
            Oops! It looks like this page has been recycled.
          </p>
          <p className='text-gray-600 text-base md:text-lg mb-8'>
            Don't worry, we're still committed to recycling e-waste, not web
            pages!
          </p>
          <p className='mb-10 text-base md:text-lg'>
            Let's get you back on track to a more sustainable future.
          </p>
          <button
            className='bg-green-600 text-white px-6 py-3 rounded-full text-lg md:text-xl hover:bg-green-700 transition-all'
            onClick={handleGoHome}
          >
            Return to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
