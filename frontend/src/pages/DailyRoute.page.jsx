import React from 'react';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import DailyRoute from '../components/dailyroute/DailyRoute.component';

const DailyRoutePage = () => {
  return (
    <div className="bg-[#6C6C81] min-h-screen">
      <AuthHeader />
      <DailyRoute />
      <Footer />
    </div>
  );
};

export default DailyRoutePage;