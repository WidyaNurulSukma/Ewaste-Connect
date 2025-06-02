import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import Header from '../components/header/Header.component';
import { useAuth } from '../hooks/auth';

// Set the workerSrc to the correct path
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.min.mjs';

const PrivacyPolicy = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  function onDocumentLoadSuccess ({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      {user ? <AuthHeader /> : <Header />}

      <div className='flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans'>
        <div className='flex-grow flex flex-col justify-center items-center bg-green-50 px-8 py-12'>
          <div className='bg-white p-10 md:p-16 lg:p-20 max-w-3xl w-full rounded-lg shadow-lg text-center overflow-y-auto' style={{ maxHeight: '600px' }}>
            <h1 className='text-5xl md:text-6xl font-bold text-green-600 mb-6'>
              Privacy Policy
            </h1>
            <div className='text-lg md:text-xl mb-4'>
              <Document
                file='../../public/privacypolicy.pdf'
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p className='mt-4'>
                Page {pageNumber} of {numPages}
              </p>
              {pageNumber > 1 && (
                <button
                  onClick={() => setPageNumber(pageNumber - 1)}
                  className='mr-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all'
                >
                  Previous
                </button>
              )}
              {pageNumber < numPages && (
                <button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className='bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all'
                >
                  Next
                </button>
              )}
            </div>
            <button
              className='bg-green-600 text-white px-6 py-3 rounded-full text-lg md:text-xl hover:bg-green-700 transition-all'
              onClick={handleGoHome}
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
