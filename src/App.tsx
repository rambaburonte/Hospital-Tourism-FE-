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
import HospitalDoctor from './pages/hospitaldoctors';
import SpaServices from './pages/spaservice';
import Diagnostics from './pages/Diagnostics';
import Labtests from './pages/labTests';

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
import UploadSpaService from './admin/uploadSpaServices';
import ViewHospitals from './admin/viewHospitals';
import HospitalDoctors from './admin/HospitalDoctors';

import SubAdminRegister from './admin/subadminloginregister/subadminreg';
import DiagnosticsList from './admin/viewDiagnostics';
import SubadmLoginForm from './admin/subadminloginregister/subadmLogin';

import LabTests  from './admin/viewdiagnolabtests';
import Translators from './admin/viewTranslators';
import Chefs from './admin/viewchefs';
import Physios from './admin/viewPhysio';
import Centers from './admin/viewspacenters';
import SpaService from './admin/viewspaServices'
import ViewDiagnostics from './admin/viewDiagnostics';
import ViewLocations from './admin/viewLocations';
import ViewUsers from './admin/viewUsers';

 // Corrected import name (PascalCase)

// Utility Components
import NotFound from './pages/NotFound';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from './ScrollToTop';
import { Import } from 'lucide-react';

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
            <Route path="/subadminregister" element={<SubAdminRegister />} />
            

            {/* Admin Routes */}

            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/subadminlogin" element={<SubadmLoginForm />} />


            <Route path="/hospitaldoctors/:id" element={< HospitalDoctor />} />
             <Route path="/viewservices/:id" element={< SpaServices />} />
             <Route path="/tests" element={< Diagnostics />} />
             <Route path="/viewtests/:id" element={<  Labtests  />} />

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
               <Route path="/admin/uploadspaServices" element={<UploadSpaService/>} />
               <Route path="/admin/viewHospitals" element={<ViewHospitals/>} />
               <Route path="/admin/hospitalDoctor/:id" element={<HospitalDoctors/>} />

               <Route path="admin/viewdiagnostics" element={<ViewDiagnostics/>} />

               <Route path="/admin/viewdiagnostics" element={<ViewDiagnostics/>} />
               <Route path="/admin/labtests/:id" element={<LabTests />} />
               <Route path="/admin/translators" element={<Translators />} />
                <Route path="/admin/chefs" element={<Chefs />} />
                <Route path="/admin/Physios" element={< Physios/>} />
                <Route path="/admin/viewcenters" element={<Centers/>}/>
                 <Route path="/admin/spaservices/:id" element={< SpaService/>} />
               <Route path="/admin/viewLocations" element={<ViewLocations />} />
               <Route path="/admin/users" element={<ViewUsers />} />


            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;