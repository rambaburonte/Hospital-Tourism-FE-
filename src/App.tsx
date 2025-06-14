import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SubAdminDashboard from './admin/subadminloginregister/getAllSubAdmins';


import HospitalList from './pages/HospitalList';

import WorldUserHeatmap from './components/worldMap';
// Public Pages
import HomePage from './pages/Index';
import AboutPage from './pages/About';
import Specialities from './pages/Specialities';
import AllDoctorsPage from './pages/AllDoctorsPage';
import ContactUsPage from './pages/contactus';

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
import UserDocuments from './components/userspage/UserDocuments';
import UserCart from './Pharmacy/UserCart';
import ChefsList from './pages/FindAllChefs';
import SpaServiceDetailsPage from './pages/spaservice';
import BookingPage from './components/bookingsingleservice';
import BookingCart from './pages/BookingCart';
import Wishlist from './pages/Wishlist';





// Admin Pages
import Admindashboard from './admin/admindashboard';
import Uploaddoctors from './admin/uploadoctors';
import ViewDoctors from './admin/viewdoctors';
import Uploadhospital from './admin/uploadhospitals';

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
import Users from './components/userspage/GetAllUsers';
import DoctorDetails from './admin/doctordetails';
 // Corrected import name (PascalCase)
import UpdateAllSubAdmin from './admin/subadminloginregister/alldetalupdatesubadmin';
// Utility Components
import NotFound from './pages/NotFound';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from './ScrollToTop';
import { Import } from 'lucide-react';
import UpdateSubAdminForm from './admin/subadminloginregister/updateSubAdmin';
import AddMedicineForm from './Pharmacy/addMadicine';
import MedicineList from './Pharmacy/MedicineList';
import UpdateMedicine from './Pharmacy/MadichineUpdate';
import MedicineCatalog from './Pharmacy/UserInterface';
import BookingForm from './admin/Booking';
import ChefList from './admin/viewchefs';
import UpdateChef from './admin/UpdateChef';
import AddSlots from './admin/AddSlots';
const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <div className={isAdminRoute ? '' : 'pt-32 pb-20'}>{children}</div>
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
            <Route path="/HospitalList" element={<HospitalList />} />
            <Route path="/PharmacyCategoryPage" element={<PharmacyCategoryPage />} />
            <Route path="/translatorList" element={<TranslatorList />} />
            <Route path="/ServiceListingPage" element={<ServiceListingPage />} />
            <Route path="/tours" element={<TourPlans />} />
            <Route path="/health-blogs" element={<HealthBlogs />} />
            <Route path="/blogs" element={<BlogDetail />} />
            <Route path="/admin/subadminregister" element={<SubAdminRegister />} />
            <Route path="/admin/subadmindashboard" element={<SubAdminDashboard />} />
            <Route path="/userdocuments" element={<UserDocuments />} />
            <Route path="/medicinecatalog" element={<MedicineCatalog />} />
            <Route path="/doctor-profile/:id" element={<DoctorDetails />} />
            <Route path="/chef-list" element={<ChefsList />} />
            <Route path="/spa-service-details" element={<SpaServiceDetailsPage />} />
            
            <Route path="/booking/:serviceType/:id" element={<BookingPage />} />

         



           
            {/* Admin Routes */}
            {/* <Route path="/admin/updatesubadmin/:id" element={<UpdateAllSubAdmin />} /> */}
          
            {/* Admin Routes */}

            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/subadminlogin" element={<SubadmLoginForm />} />
            <Route path="/patientlist" element={<Users />} />
            <Route path="/bookingfom" element={<BookingForm/>}/>
            <Route path="/usercart" element={<UserCart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/hospitaldoctors/:id" element={< HospitalDoctor />} />
             <Route path="/viewservices/:id" element={< SpaServices />} />
             <Route path="/tests" element={< Diagnostics />} />
             <Route path="/viewtests/:id" element={<  Labtests  />} />
             

            <Route path="/tests" element={<DiagnosticsList />} />
            <Route path="/bookingcart" element={<BookingCart/>}/>

            {/* Admin Routes */}
            <Route path="/admin/slots"element={<AddSlots/>}/>
            <Route path="/admin/updateSubAdmin" element={<UpdateSubAdminForm />} />
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
            <Route path="/admin/viewdiagnostics" element={<DiagnosticsList />} />
            <Route path="/admin/subadminregister" element={<SubAdminRegister />} />
               <Route path="admin/viewdiagnostics" element={<ViewDiagnostics/>} />
                <Route path="/admin/viewHospitals" element={<ViewHospitals />} />
               <Route path="/admin/viewdiagnostics" element={<ViewDiagnostics/>} />
               <Route path="/admin/labtests/:id" element={<LabTests />} />
               <Route path="/admin/translators" element={<Translators />} />
                <Route path="/admin/chefs" element={<Chefs />} />
                <Route path="/admin/Physios" element={< Physios/>} />
                <Route path="/admin/viewcenters" element={<Centers/>}/>
                <Route path="/admin/spaservices/:id" element={< SpaService/>} />
               <Route path="/admin/viewLocations" element={<ViewLocations />} />
               <Route path="/admin/users" element={<ViewUsers />} />
                <Route path="/admin/update-subadminAllData/:adminId" element={<UpdateAllSubAdmin />} />
            <Route path="/admin/addMedicine" element={<AddMedicineForm />} />
            <Route path="/admin/medicineList" element={<MedicineList />} />
            <Route path="/admin/ChefList" element={<ChefList/>} />
            <Route path="/admin/updateMedicine/:id" element={<UpdateMedicine />} />
            <Route path="/update-chef/:chefID" element={<UpdateChef />} />
            {/* User Routes */}
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;