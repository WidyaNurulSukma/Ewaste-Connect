import ContributionHistory from '../components/dashboard/Contribution.component';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';

const History = () => {
  return (
    <div className="bg-[#332F9E] min-h-screen text-white">
      <AuthHeader />
      <ContributionHistory />
      <Footer />
    </div>
  );
};

export default History;