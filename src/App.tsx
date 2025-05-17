import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';


// Public Pages
import HomePage from './pages/Index';
import AboutPage from './pages/About';
import Specialities from './pages/Specialities';
import AllDoctorsPage from './pages/AllDoctorsPage';
import ContactUsPage from './pages/contactus';
import OurHospitals from './pages/ourhospitals';
import PharmacyCategoryPage from './components/pharmaMedicine';
import TranslatorList from './pages/TranslatorList';
import ServiceListingPage from './pages/SpaPhysiotherpy';
import TourPlans from './pages/Tourplans';
import HealthBlogs from './pages/HealthBlogs';
import BlogDetail from './pages/BlogDetail';

// User Pages
import Login from './components/userspage/login';
import Registor from './components/userspage/registor';
import Userdashboard from './components/userspage/userboard';
import PatientProfile from './components/userspage/userprofile';

// Admin Pages
import Admindashboard from './admin/admindashboard';
import Uploaddoctors from './admin/uploadoctors';
import ViewDoctors from './admin/viewdoctors';
import Uploadhospital from './admin/uploadhospitals';
import DoctorDetails from './admin/doctordetails';
import UploadTest from './admin/uploadlabtests';
import Uploadloacation from './admin/businessLocation';
import Uploaddiagnostics from './admin/uploadDiagnostics';
import Uploadlabtests from './admin/uploadlabtests';
import UploadTranslators from './admin/uploadTranslators';
import UploadChefs from './admin/uploadChefs';
import UploadPhysios from './admin/uploadPhysio';
import UploadCenters from './admin/upoladCenters';
 // Corrected import name (PascalCase)

// Utility Components
import NotFound from './pages/NotFound';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from './ScrollToTop';

const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <div className={isAdminRoute ? '' : 'pt-32'}>{children}</div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/doctors" element={<AllDoctorsPage />} />
            <Route path="/ContactUsPage" element={<ContactUsPage />} />
            <Route path="/OurHospitals" element={<OurHospitals />} />
            <Route path="/PharmacyCategoryPage" element={<PharmacyCategoryPage />} />
            <Route path="/translatorList" element={<TranslatorList />} />
            <Route path="/ServiceListingPage" element={<ServiceListingPage />} />
            <Route path="/tours" element={<TourPlans />} />
            <Route path="/health-blogs" element={<HealthBlogs />} />
            <Route path="/blogs" element={<BlogDetail />} />

            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />

            {/* Admin Routes */}
            <Route path="/admin/admindashboard" element={<Admindashboard />} />
            <Route path="/admin/doctors/upload" element={<Uploaddoctors />} />
            <Route path="/admin/doctors/viewdoctors" element={<ViewDoctors />} />
            <Route path="/admin/uploadhospital" element={<Uploadhospital />} />
             <Route path="/admin/uploadlabtests" element={<UploadTest />} />
            <Route path="/admin/doctordetails/:id" element={<DoctorDetails />} />
            <Route path="/admin/businessLocations" element={<Uploadloacation/>} />
             <Route path="/admin/uploadDiagnostics" element={<Uploaddiagnostics/>} />
              <Route path="/admin/uploadlabtests" element={<Uploadlabtests/>} />
               <Route path="/admin/uploadTanslators" element={<UploadTranslators/>} />
                <Route path="/admin/uploadchefs" element={<UploadChefs/>} />
                 <Route path="/admin/uploadPhysios" element={<UploadPhysios/>} />
              <Route path="/admin/uploadCenters" element={<UploadCenters/>} />


            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;