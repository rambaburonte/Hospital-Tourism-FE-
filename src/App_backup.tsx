import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import AdminLogin from './components/admin/AdminLogin';
import SubAdminRegister from './components/admin/SubAdminRegister';
import SubAdminDashboard from './components/subadmin/pages/SubAdminDashboard';
import ViewDashboard from './components/subadmin/pages/ViewDashboard';
import ManageUsers from './components/subadmin/pages/ManageUsers';
import EditProfile from './components/subadmin/pages/EditProfile';
import ManageContent from './components/subadmin/pages/ManageContent';
import ViewReports from './components/subadmin/pages/ViewReports';

import HospitalList from './pages/HospitalList';
import SalesDashboard from './sales/SalesDashboard.js';

import EditHospital from './hospitals/edithospital.js';
import DeleteHospital from './hospitals/deletehospital.js';
import DownloadHospitals from './hospitals/downloadhospitals.js';
import EditDiagnostics from './diagnostics/editdiagnostics.js';
import DeleteDiagnostics from './diagnostics/deletediagnostics.js';
import DownloadDiagnostics from './admin/downloaddiagnostics';
import EditLabTests from './labtests/editlabtests.js';
import ViewLabTests from './labtests/viewlabtests.js';
import DeleteLabTests from './labtests/deletelabtests.js';
import DownloadLabTests from './labtests/downloadlabtests.js';

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
import MyOrders from './pages/MyOrders';





// Admin Pages
import Admindashboard from './admin/admindashboard';
import Uploaddoctors from './doctors/upload.js';
import ViewDoctors from './doctors/view.js';
import Uploadhospital from './hospitals/uploadhospitals.js';

import UploadTest from './labtests/uploadlabtests';
import Uploadloacation from './admin/businessLocation';
import Uploaddiagnostics from './diagnostics/uploadDiagnostics';
import Uploadlabtests from './labtests/uploadlabtests';
import UploadPhysios from './physio/uploadPhysio.js';
import UploadCenters from './admin/upoladCenters';
import UploadSpaService from './spa/uploadSpaServices';
import ViewHospitals from './hospitals/viewHospitals.js';
import HospitalDoctors from './hospitals/HospitalDoctors';

import ViewDiagnostics from './diagnostics/viewDiagnostics';
import SalesLogin from './sales/Login.js';
import LabTests from './admin/viewdiagnolabtests';
import Translators from './translators/viewTranslators.js';
import Chefs from './chefs/viewchefs.js';
import Physios from './physio/viewPhysio.js';
import Centers from './spa/viewspacenters';
import SpaService from './spa/viewspaServices'
import ViewLocations from './admin/viewLocations';
import ViewUsers from './admin/viewUsers';
import Users from './components/userspage/GetAllUsers';
import DoctorDetails from './doctors/details.js';
import AllOrders from './admin/AllOrders';
import SalesTeamPage from './sales/salesTeam';
import SalesTasksPage from './sales/salesTasks';
import DiagnosticsList from './pages/Diagnostics';

import PackagesDisplayPage from './admin/ViewPackages.js';
import AddPackages from './admin/AddPackages';
// Corrected import name (PascalCase)
import UpdateAllSubAdmin from './admin/subadminloginregister/alldetalupdatesubadmin';
import ViewSubAdmins from './components/admin/subadminloginregister/ViewSubAdmins';
import UpdateSubAdmin from './components/admin/subadminloginregister/UpdateSubAdmin';
import DeleteSubAdmin from './admin/deletesubadmin';
import DownloadSubAdmins from './admin/downloadsubadmins';
// Utility Components
import NotFound from './pages/NotFound';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from './ScrollToTop';
import AddMedicineForm from './Pharmacy/addMadicine';
import MedicineList from './Pharmacy/MedicineList';
import PrescriptionList from './Pharmacy/OrderList';
import OrderList from './Pharmacy/OrderList';
import UpdateMedicine from './Pharmacy/MadichineUpdate';
import MedicineCatalog from './Pharmacy/UserInterface';
import BookingForm from './admin/Booking';
import UpdateChef from './chefs/UpdateChef.js';
import AddSlots from './admin/AddSlots';
import ViewBlogCategory from './blogs/ViewBlogCategory.js';
import ViewBlogs from './blogs/ViewBlogs.js';
import ViewBlog from './blogs/ViewBlog.js';
import MedicalRecords from './components/madicalrecordsOfUser.js';
import HospitalAdvertisement from './components/Advertisement.js';
import Cardiology from './pages/specialties/Cardiology';
import Neurology from './pages/specialties/Neurology';
import Orthopedics from './pages/specialties/Orthopedics';
import Oncology from './pages/specialties/Oncology';
import Gastroenterology from './pages/specialties/Gastroenterology';
import Pediatrics from './pages/specialties/Pediatrics';
import Gynecology from './pages/specialties/Gynecology';
import Urology from './pages/specialties/Urology';
import Placeholder from './admin/Placeholder';

import EditDoctor from './doctors/edit.js';
import DeleteDoctor from './doctors/delete.js';
import DownloadDoctors from './doctors/download.js';

// Translator CRUD components
import EditTranslators from './translators/EditTranslators';
import DeleteTranslators from './translators/DeleteTranslators';
import DownloadTranslators from './translators/DownloadTranslators';
import UploadTranslators from './translators/uploadTranslators';

// Chef CRUD components
import EditChefs from './chefs/EditChefs';
import DeleteChefs from './chefs/DeleteChefs';
import DownloadChefs from './chefs/DownloadChefs';
import UploadChefs from './chefs/uploadChefs.js';

// Physio CRUD components
import EditPhysios from './physio/EditPhysios';
import DeletePhysios from './physio/DeletePhysios';
import DownloadPhysios from './physio/DownloadPhysios';

// Spa Center CRUD components
import EditSpaCenters from './spa/EditSpaCenters';
import DeleteSpaCenters from './spa/DeleteSpaCenters';
import DownloadSpaCenters from './spa/DownloadSpaCenters';

// Spa Services CRUD components
import EditSpaServices from './spa/EditSpaServices';
import DeleteSpaServices from './spa/DeleteSpaServices';
import DownloadSpaServices from './spa/DownloadSpaServices';

import GoogleTranslate from './components/GoogleTraslator.js';


import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import Sitemap from './components/Sitemap';

import contactus from './pages/contactus';
import SubadmLoginForm from './sales/Login.js';

const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/subadmin');

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
            <Route path="/userdocuments" element={<UserDocuments />} />
            <Route path="/medicinecatalog" element={<MedicineCatalog />} />
            <Route path="/doctor-profile/:id" element={<DoctorDetails />} />
            <Route path="/chef-list" element={<ChefsList />} />
            <Route path="/spa-service-details" element={<SpaServiceDetailsPage />} />
            <Route path="/booking/:serviceType/:id" element={<BookingPage />} />

            

            <Route path="/translator" element={<GoogleTranslate />} />
 

            {/* Specialty Routes */}
            <Route path="/specialties/cardiology" element={<Cardiology />} />
            <Route path="/specialties/neurology" element={<Neurology />} />
            <Route path="/specialties/orthopedics" element={<Orthopedics />} />
            <Route path="/specialties/oncology" element={<Oncology />} />
            <Route path="/specialties/gastroenterology" element={<Gastroenterology />} />
            <Route path="/specialties/pediatrics" element={<Pediatrics />} />
            <Route path="/specialties/gynecology" element={<Gynecology />} />
            <Route path="/specialties/urology" element={<Urology />} />

            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />

            <Route path="/subadminlogin" element={<SubadmLoginForm />} />
            <Route path="/admin/patientlist/users" element={<Users />} />
            <Route path="/bookingfom" element={<BookingForm />} />
            <Route path='/usercart' element={<UserCart />} />
            <Route path="/patientlist" element={<Users />} />
            <Route path="/bookingfom" element={<BookingForm />} />
            <Route path="/usercart" element={<UserCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/hospitaldoctors/:id" element={<HospitalDoctor />} />
            <Route path="/viewservices/:id" element={<SpaServices />} />
            <Route path="/tests" element={<Diagnostics />} />
            <Route path="/viewtests/:id" element={<Labtests />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/bookingcart" element={<BookingCart />} />
            <Route path="/MyOrders" element={<MyOrders />} />
             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/sitemap" element={<Sitemap />} />

            {/* User Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/patientlist" element={<Users />} />
            <Route path="/bookingfom" element={<BookingForm />} />
            <Route path="/usercart" element={<UserCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/hospitaldoctors/:id" element={<HospitalDoctor />} />
            <Route path="/viewservices/:id" element={<SpaServices />} />
            <Route path="/tests" element={<Diagnostics />} />
            <Route path="/viewtests/:id" element={<Labtests />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/bookingcart" element={<BookingCart />} />
            <Route path="/MyOrders" element={<MyOrders />} />


            {/* Admin & Sub-Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/saleslogin" element={<SalesLogin />} />

            {/* Sub-Admin Routes */}
            <Route path="/subadmin/dashboard" element={<SubAdminDashboard />} />
            {/* <Route path="/subadmin/dashboard" element={<ViewSubAdmins />} /> */}
            <Route path="/subadmin/view-dashboard" element={<ViewDashboard />} />
            <Route path="/subadmin/manage-users" element={<ManageUsers />} />
            <Route path="/subadmin/edit-profile" element={<EditProfile />} />
            <Route path="/subadmin/manage-content" element={<ManageContent />} />
            <Route path="/subadmin/view-reports" element={<ViewReports />} />            
            {/* Admin Routes */}            
            <Route path="/admin/admindashboard" element={<Admindashboard />} />
            <Route path="/admin/subadminregister" element={<SubAdminRegister />} />            
            <Route path="/admin/viewsubadmins" element={<ViewSubAdmins />} />            
            <Route path="/admin/update-subadmin/:employeeId" element={<UpdateSubAdmin />} />
            <Route path="/admin/update-subadminAllData/:adminId" element={<UpdateAllSubAdmin />} />
            <Route path="/admin/editsubadmin" element={<UpdateSubAdmin />} />
            <Route path="/admin/deletesubadmin" element={<DeleteSubAdmin />} />
            <Route path="/admin/downloadsubadmins" element={<DownloadSubAdmins />} />
            
            {/* Admin - Doctor Management */}
            <Route path="/admin/doctors/upload" element={<Uploaddoctors />} />
            <Route path="/admin/doctors/viewdoctors" element={<ViewDoctors />} />
            <Route path="/admin/doctordetails/:id" element={<DoctorDetails />} />
            <Route path="/admin/doctors/edit" element={<EditDoctor />} />
            <Route path="/admin/doctors/delete" element={<DeleteDoctor />} />
            <Route path="/admin/doctors/download" element={<DownloadDoctors />} />
              {/* Admin - Hospital Management */}
            <Route path="/admin/uploadhospital" element={<Uploadhospital />} />
            <Route path="/admin/viewHospitals" element={<ViewHospitals />} />
            <Route path="/admin/hospitalDoctor/:id" element={<HospitalDoctors />} />
            <Route path="/admin/edithospital" element={<EditHospital />} />
            <Route path="/admin/deletehospital" element={<DeleteHospital />} />
            <Route path="/admin/downloadhospitals" element={<DownloadHospitals />} />
            
            {/* Admin - Services Management */}
            <Route path="/admin/uploadlabtests" element={<UploadTest />} />
            <Route path="/admin/uploadDiagnostics" element={<Uploaddiagnostics />} />
            <Route path="/admin/viewdiagnostics" element={<ViewDiagnostics />} />
            <Route path="/admin/labtests/:id" element={<LabTests />} />
            <Route path="/admin/uploadspaServices" element={<UploadSpaService />} />
            <Route path="/admin/spaservices/:id" element={<SpaService />} />            
            <Route path="/admin/editdiagnostics" element={<EditDiagnostics />} />
            <Route path="/admin/deletediagnostics" element={<DeleteDiagnostics />} />
            <Route path="/admin/downloaddiagnostics" element={<DownloadDiagnostics />} />              <Route path="/admin/editlabtests" element={<EditLabTests />} />
            <Route path="/admin/viewlabtests" element={<ViewLabTests />} />
            <Route path="/admin/deletelabtests" element={<DeleteLabTests />} />
            <Route path="/admin/downloadlabtests" element={<DownloadLabTests />} />
            <Route path="/admin/editspaservices/:id" element={<EditSpaServices />} />
            <Route path="/admin/viewspaservices" element={<SpaService />} />
            <Route path="/admin/deletespaservices" element={<DeleteSpaServices />} />
            <Route path="/admin/downloadspaservices" element={<DownloadSpaServices />} />
            
            {/* Admin - Staff Management */}
            <Route path="/admin/uploadTranslators" element={<UploadTranslators />} />
            <Route path="/admin/translators" element={<Translators />} />            
            <Route path="/admin/uploadchefs" element={<UploadChefs />} />
            <Route path="/admin/chefs" element={<Chefs />} />
            <Route path="/admin/uploadPhysios" element={<UploadPhysios />} />
            <Route path="/admin/Physios" element={<Physios />} />
            <Route path="/admin/uploadCenters" element={<UploadCenters />} />
            <Route path="/admin/viewcenters" element={<Centers />} />
            <Route path="/update-chef/:chefID" element={<UpdateChef />} />            
            <Route path="/admin/edittranslators" element={<EditTranslators />} />
            <Route path="/admin/edittranslators/:id" element={<EditTranslators />} />
            <Route path="/admin/deletetranslators" element={<DeleteTranslators />} />
            <Route path="/admin/downloadtranslators" element={<DownloadTranslators />} />
            <Route path="/admin/editchefs/:id" element={<EditChefs />} />
            <Route path="/admin/deletechefs" element={<DeleteChefs />} />
            <Route path="/admin/downloadchefs" element={<DownloadChefs />} />
            <Route path="/admin/editphysios/:id" element={<EditPhysios />} />
            <Route path="/admin/deletephysios" element={<DeletePhysios />} />
            <Route path="/admin/downloadphysios" element={<DownloadPhysios />} />
            <Route path="/admin/editspacenters/:id" element={<EditSpaCenters />} />
            <Route path="/admin/deletespacenters" element={<DeleteSpaCenters />} />
            <Route path="/admin/downloadspacenters" element={<DownloadSpaCenters />} />
            
            {/* Admin - System Management */}
            <Route path="/admin/businessLocations" element={<Uploadloacation />} />
            <Route path="/admin/viewLocations" element={<ViewLocations />} />
            <Route path="/admin/users" element={<ViewUsers />} />
            <Route path="/admin/slots" element={<AddSlots />} />
            <Route path="/admin/settings" element={<Placeholder title="Settings" />} />
            
            {/* Admin - Pharmacy & Orders */}
            <Route path="/admin/addMedicine" element={<AddMedicineForm />} />
            <Route path="/admin/medicineList" element={<MedicineList />} />
            <Route path="/admin/updateMedicine/:id" element={<UpdateMedicine />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/prescriptions" element={<PrescriptionList />} />
            <Route path="/admin/AllOrders" element={<AllOrders />} />
            <Route path="/admin/editMedicine" element={<Placeholder title="Edit Medicine" />} />
            <Route path="/admin/deleteMedicine" element={<Placeholder title="Delete Medicine" />} />
            <Route path="/admin/downloadMedicines" element={<Placeholder title="Download Medicines" />} />
            
            {/* Admin - Content Management */}
            <Route path="/admin/ViewBlogCategory" element={<ViewBlogCategory />} />
            <Route path="/admin/ViewBlogs" element={<ViewBlogs />} />
            <Route path="/admin/ViewBlog/:id" element={<ViewBlog />} />
            <Route path="/admin/viewpackage" element={<PackagesDisplayPage />} />
            <Route path="/admin/addpackages" element={<AddPackages />} />
            <Route path="/admin/AddBlog" element={<Placeholder title="Add Blog" />} />
            <Route path="/admin/EditBlog" element={<Placeholder title="Edit Blog" />} />
            <Route path="/admin/DeleteBlog" element={<Placeholder title="Delete Blog" />} />
            <Route path="/admin/downloadblogs" element={<Placeholder title="Download Blogs" />} />
            <Route path="/admin/editpackages" element={<Placeholder title="Edit Packages" />} />
            <Route path="/admin/deletepackages" element={<Placeholder title="Delete Packages" />} />
            <Route path="/admin/downloadpackages" element={<Placeholder title="Download Packages" />} />
            <Route path="/admin/packagebookings" element={<Placeholder title="Package Bookings" />} />
            
            {/* Admin - Sales Team */}
            <Route path="/admin/salesTeam" element={<SalesTeamPage />} />
            <Route path="/admin/salesTasks" element={<SalesTasksPage />} />
            <Route path="/admin/sales/dashboard" element={<SalesDashboard />} />
            <Route path="/admin/addsalesteam" element={<Placeholder title="Add Team Member" />} />
            <Route path="/admin/editsalesteam" element={<Placeholder title="Edit Team Member" />} />
            <Route path="/admin/deletesalesteam" element={<Placeholder title="Delete Team Member" />} />
            <Route path="/admin/downloadsalesteam" element={<Placeholder title="Download Team Members" />} />

            {/* Miscellaneous Routes */}
            <Route path="/contact-us" element={<ContactUsPage />} />

            {/* 404 Route - Must be last */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;