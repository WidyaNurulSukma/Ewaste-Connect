import LandingPage from '../pages/Landing.page';
import PageNotFound from '../pages/PageNotFound.page';
import AboutUs from '../pages/AboutUs.page';
import Blog from '../pages/Blog.page';
import FAQ from '../pages/FAQ.page';
import CustomerSupport from '../pages/CustomerSupport.page';
import TermsandConditions from '../pages/TermsandConditions.pages';
import PrivacyPolicy from '../pages/PrivacyPolicy.pages';
import LoginPage from '../pages/Login.page';
import SignupPage from '../pages/Signup.page';
import ResetPage from '../pages/Reset.page';
import Dashboard from '../pages/Dashboard.page';
import EWastePickupFlow from '../pages/NewPickup.page';
import VerificationPage from '../pages/Verification.page';
import History from '../pages/History.page';
import ProfilePage from '../pages/Profile.page';
import NotificationsPage from '../pages/Notifications.page';
import ForgotPasswordPage from '../pages/ForgotPassword.page';
import PrivateRoute from './Private.route';
import OrdersPage from '../pages/PickupRequests.page';
import MyItemsPage from '../pages/MyItems.page';
import DailyRoutePage from '../pages/DailyRoute.page';
import CollectorHistoryPage from '../pages/CollectorHistory.page';

import { Routes, Route } from 'react-router-dom';

const RootRouter = () => {
  return (
    <Routes>
      <Route path='/' index element={<LandingPage />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/support' element={<CustomerSupport />} />
      <Route path='/terms' element={<TermsandConditions />} />
      <Route path='/privacy' element={<PrivacyPolicy />} />
      <Route path='/account/login' element={<LoginPage />} />
      <Route path='/account/signup' element={<SignupPage />} />
      <Route path='/account/forgot' element={<ResetPage />} />
      <Route path='/account/reset' element={<ForgotPasswordPage />} />
      <Route path='/account/notifications' element={<NotificationsPage />} />
      <Route path='/account/verify/:id' element={<VerificationPage />} />
      <Route path='/pickup/new' element={<EWastePickupFlow />} />
      <Route path='/pickup/history' element={<History />} />
      <Route path='/pickup/requests' element={<OrdersPage />} />
      <Route path="/my-items" element={<MyItemsPage />} />
      <Route path="/daily-route" element={<DailyRoutePage />} />
      <Route path="/collector-history" element={<CollectorHistoryPage />} />

      <Route
        path='/account/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/account/profile'
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path='*' index element={<PageNotFound />} />
    </Routes>
  );
};

export default RootRouter;
