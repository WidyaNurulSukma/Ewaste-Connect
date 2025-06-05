import React from 'react';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import CollectorHistory from '../components/collectorhistory/CollectorHistory.component';

const CollectorHistoryPage = () => {
  return (
    <div className="bg-[#6C6C81] min-h-screen">
      <AuthHeader />
      <CollectorHistory />

    </div>
  );
};

export default CollectorHistoryPage;