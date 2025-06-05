import React from 'react';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import MyItems from '../components/myitems/MyItems.component';

const MyItemsPage = () => {
  return (
    <div className="bg-[#332F9E] min-h-screen text-white">
      <AuthHeader />
      <MyItems />
    </div>
  );
};

export default MyItemsPage;