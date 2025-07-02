import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from './ScrollToTop';
import NotFound from './pages/NotFound';

// Utility Components
import GoogleTranslate from './components/GoogleTraslator.js';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import Sitemap from './components/Sitemap';
import WorldUserHeatmap from './components/worldMap';
import PharmacyCategoryPage from './components/pharmaMedicine';
import BookingPage from './components/bookingsingleservice';

// Public Pages
import HomePage from './pages/Index';
import AboutPage from './pages/About';
import Specialities from './pages/Specialities';
import AllDoctorsPage from './pages/AllDoctorsPage';
import ContactUsPage from './pages/contactus';
import HospitalList from './pages/HospitalList';
import TranslatorList from './pages/TranslatorList';
import ServiceListingPage from './pages/SpaPhysiotherpy';
import TourPlans from './pages/Tourplans';
import HealthBlogs from './pages/HealthBlogs';
import BlogDetail from './pages/BlogDetail';
import HospitalDoctor from './pages/hospitaldoctors';
import SpaServices from './pages/spaservice';
import Diagnostics from './pages/Diagnostics';
import Labtests from './pages/labTests';
import ChefsList from './pages/FindAllChefs';
import SpaServiceDetailsPage from './pages/spaservice';
import BookingCart from './pages/BookingCart';
import Wishlist from './pages/Wishlist';
import MyOrders from './pages/MyOrders';
import DiagnosticsList from './pages/Diagnostics';
import HotelList from './pages/hotels/HotelList';
import TravelList from './pages/travel/TravelList';

// Corrected import name (PascalCase)
// Utility Components
// import MedicineCatalog from './Pharmacy/UserInterface'; // Duplicate import removed
// import UpdateChef from './admin/UpdateChef'; // Removed due to duplicate identifier
/* import ViewBlog from './admin/ViewBlog'; // Removed due to duplicate identifier */
import MedicalRecords from './components/madicalrecordsOfUser.js';
import HospitalAdvertisement from './components/Advertisement.js';

// Specialty Pages

import Cardiology from './pages/specialties/Cardiology';
import Neurology from './pages/specialties/Neurology';
import Orthopedics from './pages/specialties/Orthopedics';
import Oncology from './pages/specialties/Oncology';
import Gastroenterology from './pages/specialties/Gastroenterology';
import Pediatrics from './pages/specialties/Pediatrics';
import Gynecology from './pages/specialties/Gynecology';
import Urology from './pages/specialties/Urology';

// User Authentication & Dashboard
import Login from './components/userspage/login';
import Registor from './components/userspage/registor';
import Userdashboard from './components/userspage/userboard';
import PatientProfile from './components/userspage/userprofile';
import UserDocuments from './components/userspage/UserDocuments';
import Users from './components/userspage/GetAllUsers';

// Admin Authentication
import AdminLogin from './components/admin/AdminLogin';
import SubAdminRegister from './components/admin/SubAdminRegister';

// Sub-Admin Components
import SubAdminDashboard from './components/subadmin/pages/SubAdminDashboard';
import ViewDashboard from './components/subadmin/pages/ViewDashboard';
import ManageUsers from './components/subadmin/pages/ManageUsers';
import EditProfile from './components/subadmin/pages/EditProfile';
import ManageContent from './components/subadmin/pages/ManageContent';
import ViewReports from './components/subadmin/pages/ViewReports';
import ViewSubAdmins from './components/admin/subadminloginregister/ViewSubAdmins';
import UpdateSubAdmin from './components/admin/subadminloginregister/UpdateSubAdmin';

// Admin Dashboard & Core
import Admindashboard from './admin/admindashboard';
import Placeholder from './admin/Placeholder';
import ViewUsers from './admin/viewUsers';
import ViewLocations from './admin/viewLocations';
import Uploadloacation from './admin/businessLocation';
import AddSlots from './admin/AddSlots';
import BookingForm from './admin/Booking';
import UpdateAllSubAdmin from './admin/subadminloginregister/alldetalupdatesubadmin';
import DeleteSubAdmin from './admin/deletesubadmin';
import DownloadSubAdmins from './admin/downloadsubadmins';
import UploadCenters from './admin/upoladCenters';
import LabTests from './admin/viewdiagnolabtests';
import AllOrders from './admin/AllOrders';
// Package Management Components
import AddPackages from './admin/packages/AddPackages';
import ViewPackages from './admin/packages/ViewPackages';
import EditPackages from './admin/packages/EditPackages';
import DeletePackages from './admin/packages/DeletePackages';
import DownloadPackages from './admin/packages/DownloadPackages';
import BookingPackages from './admin/packages/BookingPackages';
import DownloadDiagnostics from './admin/downloaddiagnostics';
import Uploaddoctors from './doctors/upload.js';
import ViewDoctors from './doctors/view.js';
import DoctorDetails from './doctors/details.js';
import EditDoctor from './doctors/edit.js';
import DeleteDoctor from './doctors/delete.js';
import DownloadDoctors from './doctors/download.js';

// Hospitals Module
import Uploadhospital from './hospitals/uploadhospitals.js';
import ViewHospitals from './hospitals/viewHospitals.js';
import HospitalDoctors from './hospitals/HospitalDoctors';
import EditHospital from './hospitals/edithospital.js';
import DeleteHospital from './hospitals/deletehospital.js';
import DownloadHospitals from './hospitals/downloadhospitals.js';

// Diagnostics Module
import Uploaddiagnostics from './diagnostics/uploadDiagnostics';
import ViewDiagnostics from './diagnostics/viewDiagnostics';
import EditDiagnostics from './diagnostics/editdiagnostics.js';
import DeleteDiagnostics from './diagnostics/deletediagnostics.js';

// Lab Tests Module
import UploadTest from './labtests/uploadlabtests';
import ViewLabTests from './labtests/viewlabtests.js';
import EditLabTests from './labtests/editlabtests.js';
import DeleteLabTests from './labtests/deletelabtests.js';
import DownloadLabTests from './labtests/downloadlabtests.js';
 
// Translators Module
import UploadTranslators from './translators/uploadTranslators';
import Translators from './translators/viewTranslators.js';
import EditTranslators from './translators/EditTranslators';
import DeleteTranslators from './translators/DeleteTranslators';
import DownloadTranslators from './translators/DownloadTranslators';

// Chefs Module
import UploadChefs from './chefs/uploadChefs.js';
import Chefs from './chefs/viewchefs.js';
import UpdateChef from './chefs/UpdateChef.js';
import EditChefs from './chefs/EditChefs';
import DeleteChefs from './chefs/DeleteChefs';
import DownloadChefs from './chefs/DownloadChefs';



import contactus from './pages/contactus';

// Physio Module
import UploadPhysios from './physio/uploadPhysio.js';
import Physios from './physio/viewPhysio.js';
import EditPhysios from './physio/EditPhysios';
import DeletePhysios from './physio/DeletePhysios';
import DownloadPhysios from './physio/DownloadPhysios';

// Spa Module
import UploadSpaService from './spa/uploadSpaServices';
import Centers from './spa/viewspacenters';
import SpaService from './spa/viewspaServices';
import EditSpaCenters from './spa/EditSpaCenters';
import DeleteSpaCenters from './spa/DeleteSpaCenters';
import DownloadSpaCenters from './spa/DownloadSpaCenters';
import EditSpaServices from './spa/EditSpaServices';
import DeleteSpaServices from './spa/DeleteSpaServices';
import DownloadSpaServices from './spa/DownloadSpaServices';

// Pharmacy Module
import UserCart from './Pharmacy/UserCart';
import AddMedicineForm from './Pharmacy/addMadicine';

// import MedicineList from './Pharmacy/MedicineList'; // Duplicate import removed
// import UpdateMedicine from './Pharmacy/MadichineUpdate'; // Duplicate import removed
// import MedicineCatalog from './Pharmacy/UserInterface'; // Duplicate import removed
// import PrescriptionList from './Pharmacy/PrescriptionList'; // Duplicate import removed
// import OrderList from './Pharmacy/OrderList'; // Duplicate import removed

import MedicineList from './Pharmacy/MedicineList';
import UpdateMedicine from './Pharmacy/MadichineUpdate';
import EditMedicine from './Pharmacy/EditMedicine';
import DeleteMedicine from './Pharmacy/DeleteMedicine';
import DownloadMedicines from './Pharmacy/DownloadMedicines';
import PrescriptionList from './Pharmacy/PrescriptionList';
import OrderList from './Pharmacy/OrderList';
import MedicineCatalog from './Pharmacy/UserInterface';


// Sales Module
import SalesDashboard from './sales/SalesDashboard.js';
import SalesLogin from './sales/Login.js';
import SalesTeamPage from './sales/salesTeam';
import SalesTasksPage from './sales/salesTasks';
import AddSalesTeam from './sales/AddSalesTeam';
import EditSalesTeam from './sales/EditSalesTeam';
import DeleteSalesTeam from './sales/DeleteSalesTeam';
import DownloadSalesTeam from './sales/DownloadSalesTeam';

// Blogs Module
import ViewBlogCategory from './blogs/ViewBlogCategory';
import ViewBlogs from './blogs/ViewBlogs';
import ViewBlog from './blogs/ViewBlog';
import AddBlog from './blogs/AddBlog';
import EditBlog from './blogs/EditBlog';
import DeleteBlog from './blogs/DeleteBlog';
import DownloadBlogs from './blogs/DownloadBlogs';
import AddBlogCategory from './blogs/AddBlogCategory';
import EditBlogCategory from './blogs/EditBlogCategory';
import DeleteBlogCategory from './blogs/DeleteBlogCategory';

import HospitalResults from './components/HospitalResults';
import EmergencyPage from './admin/EmergencyPage';

import CouponsPage from './admin/CouponsPage';
const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || 
                       location.pathname.startsWith('/subadmin') || 
                       location.pathname.startsWith('/patientlist');

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
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/HospitalList" element={<HospitalList />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/travel" element={<TravelList />} />
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/sitemap" element={<Sitemap />} />

            {/* Specialty Routes */}
            <Route path="/specialties/cardiology" element={<Cardiology />} />
            <Route path="/specialties/neurology" element={<Neurology />} />
            <Route path="/specialties/orthopedics" element={<Orthopedics />} />
            <Route path="/specialties/oncology" element={<Oncology />} />
            <Route path="/specialties/gastroenterology" element={<Gastroenterology />} />
            <Route path="/specialties/pediatrics" element={<Pediatrics />} />
            <Route path="/specialties/gynecology" element={<Gynecology />} />
            <Route path="/specialties/urology" element={<Urology />} />

            {/* User Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />

            {/* User Dashboard & Profile Routes */}
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/usercart" element={<UserCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/bookingcart" element={<BookingCart />} />
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/medical-records" element={<MedicalRecords />} />

            {/* User Service Routes */}
            <Route path="/hospitaldoctors/:id" element={<HospitalDoctor />} />
            <Route path="/viewservices/:id" element={<SpaServices />} />
            <Route path="/tests" element={<Diagnostics />} />
            <Route path="/viewtests/:id" element={<Labtests />} />

            {/* Admin & Sub-Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/saleslogin" element={<SalesLogin />} />
            <Route path="/subadminlogin" element={<SalesLogin />} />

            {/* Sub-Admin Routes */}
            <Route path="/subadmin/dashboard" element={<SubAdminDashboard />} />
            <Route path="/subadmin/view-dashboard" element={<ViewDashboard />} />
            <Route path="/subadmin/manage-users" element={<ManageUsers />} />
            <Route path="/subadmin/edit-profile" element={<EditProfile />} />
            <Route path="/subadmin/manage-content" element={<ManageContent />} />
            <Route path="/subadmin/view-reports" element={<ViewReports />} />

            {/* Admin Core Routes */}
            <Route path="/admin/admindashboard" element={<Admindashboard />} />
            <Route path="/admin/subadminregister" element={<SubAdminRegister />} />
            <Route path="/admin/users" element={<ViewUsers />} />
            <Route path="/admin/patientlist/users" element={<Users />} />
            <Route path="/patientlist" element={<Users />} />
            <Route path="/bookingfom" element={<BookingForm />} />
            <Route path="/admin/slots" element={<AddSlots />} />
            <Route path="/admin/businessLocations" element={<Uploadloacation />} />
            <Route path="/admin/viewLocations" element={<ViewLocations />} />
            <Route path="/admin/settings" element={<Placeholder title="Settings" />} />

            {/* Sub-Admin Management Routes */}
            <Route path="/admin/viewsubadmins" element={<ViewSubAdmins />} />
            <Route path="/admin/update-subadmin/:adminId" element={<UpdateSubAdmin />} />
            <Route path="/admin/update-subadminAllData/:adminId" element={<UpdateAllSubAdmin />} />
            <Route path="/admin/editsubadmin" element={<UpdateSubAdmin />} />
            <Route path="/admin/deletesubadmin" element={<DeleteSubAdmin />} />
            <Route path="/admin/downloadsubadmins" element={<DownloadSubAdmins />} />

            {/* Doctor Management Routes */}
            <Route path="/admin/doctors/upload" element={<Uploaddoctors />} />
            <Route path="/admin/doctors/viewdoctors" element={<ViewDoctors />} />
            <Route path="/admin/doctordetails/:id" element={<DoctorDetails />} />
            <Route path="/admin/doctors/edit" element={<EditDoctor />} />
            <Route path="/admin/doctors/delete" element={<DeleteDoctor />} />
            <Route path="/admin/doctors/download" element={<DownloadDoctors />} />

            {/* Hospital Management Routes */}
            <Route path="/admin/uploadhospital" element={<Uploadhospital />} />
            <Route path="/admin/viewHospitals" element={<ViewHospitals />} />
            <Route path="/admin/hospitalDoctor/:id" element={<HospitalDoctors />} />
            <Route path="/admin/edithospital" element={<EditHospital />} />
            <Route path="/admin/deletehospital" element={<DeleteHospital />} />
            <Route path="/admin/downloadhospitals" element={<DownloadHospitals />} />

            {/* Diagnostics Management Routes */}
            <Route path="/admin/uploadDiagnostics" element={<Uploaddiagnostics />} />
            <Route path="/admin/viewdiagnostics" element={<ViewDiagnostics />} />
            <Route path="/admin/editdiagnostics" element={<EditDiagnostics />} />
            <Route path="/admin/deletediagnostics" element={<DeleteDiagnostics />} />
            <Route path="/admin/downloaddiagnostics" element={<DownloadDiagnostics />} />

            {/* Lab Tests Management Routes */}
            <Route path="/admin/uploadlabtests" element={<UploadTest />} />
            <Route path="/admin/labtests/:id" element={<LabTests />} />
            <Route path="/admin/editlabtests" element={<EditLabTests />} />
            <Route path="/admin/viewlabtests" element={<ViewLabTests />} />
            <Route path="/admin/deletelabtests" element={<DeleteLabTests />} />
            <Route path="/admin/downloadlabtests" element={<DownloadLabTests />} />

            {/* Translator Management Routes */}
            <Route path="/admin/uploadTranslators" element={<UploadTranslators />} />
            <Route path="/admin/translators" element={<Translators />} />
            <Route path="/admin/edittranslators" element={<EditTranslators />} />
            <Route path="/admin/edittranslators/:id" element={<EditTranslators />} />
            <Route path="/admin/deletetranslators" element={<DeleteTranslators />} />
            <Route path="/admin/downloadtranslators" element={<DownloadTranslators />} />

            {/* Chef Management Routes */}
            <Route path="/admin/uploadchefs" element={<UploadChefs />} />
            <Route path="/admin/chefs" element={<Chefs />} />
            <Route path="/admin/ChefList" element={<Chefs />} />
            <Route path="/update-chef/:chefID" element={<UpdateChef />} />
            <Route path="/admin/editchefs" element={<EditChefs />} />
            <Route path="/admin/editchefs/:id" element={<EditChefs />} />
            <Route path="/admin/deletechefs" element={<DeleteChefs />} />
            <Route path="/admin/downloadchefs" element={<DownloadChefs />} />

            {/* Physio Management Routes */}
            <Route path="/admin/uploadPhysios" element={<UploadPhysios />} />
            <Route path="/admin/Physios" element={<Physios />} />
            <Route path="/admin/editphysios" element={<EditPhysios />} />
            <Route path="/admin/editphysios/:id" element={<EditPhysios />} />
            <Route path="/admin/deletephysios" element={<DeletePhysios />} />
            <Route path="/admin/downloadphysios" element={<DownloadPhysios />} />

            {/* Spa Center Management Routes */}
            <Route path="/admin/uploadCenters" element={<UploadCenters />} />
            <Route path="/admin/viewcenters" element={<Centers />} />
            <Route path="/admin/editspacenters" element={<EditSpaCenters />} />
            <Route path="/admin/editspacenters/:id" element={<EditSpaCenters />} />
            <Route path="/admin/deletespacenters" element={<DeleteSpaCenters />} />
            <Route path="/admin/downloadspacenters" element={<DownloadSpaCenters />} />

            {/* Spa Services Management Routes */}
            <Route path="/admin/uploadspaServices" element={<UploadSpaService />} />
            <Route path="/admin/spaservices/:id" element={<SpaService />} />
            <Route path="/admin/viewspaservices" element={<SpaService />} />
            <Route path="/admin/editspaservices" element={<EditSpaServices />} />
            <Route path="/admin/editspaservices/:id" element={<EditSpaServices />} />
            <Route path="/admin/deletespaservices" element={<DeleteSpaServices />} />
            <Route path="/admin/downloadspaservices" element={<DownloadSpaServices />} />

            {/* Pharmacy Management Routes */}
            <Route path="/admin/addMedicine" element={<AddMedicineForm />} />
            <Route path="/admin/medicineList" element={<MedicineList />} />
            <Route path="/admin/updateMedicine/:id" element={<UpdateMedicine />} />
            <Route path="/admin/editMedicine" element={<EditMedicine />} />
            <Route path="/admin/editMedicine/:id" element={<EditMedicine />} />
            <Route path="/admin/deleteMedicine" element={<DeleteMedicine />} />
            <Route path="/admin/deleteMedicine/:id" element={<DeleteMedicine />} />
            <Route path="/admin/downloadMedicines" element={<DownloadMedicines />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/prescriptions" element={<PrescriptionList />} />
            <Route path="/admin/AllOrders" element={<AllOrders />} />

            {/* Package Management Routes */}
            <Route path="/admin/viewpackage" element={<ViewPackages />} />
            <Route path="/admin/viewpackages" element={<ViewPackages />} />
            <Route path="/admin/addpackages" element={<AddPackages />} />
            <Route path="/admin/editpackages" element={<EditPackages />} />
            <Route path="/admin/editpackages/:id" element={<EditPackages />} />
            <Route path="/admin/deletepackages" element={<DeletePackages />} />
            <Route path="/admin/downloadpackages" element={<DownloadPackages />} />
            <Route path="/admin/packagebookings" element={<BookingPackages />} />

            {/* Blog Management Routes */}
            <Route path="/admin/ViewBlogCategory" element={<ViewBlogCategory />} />
            <Route path="/admin/ViewBlogs" element={<ViewBlogs />} />
            <Route path="/admin/ViewBlog/:id" element={<ViewBlog />} />
            <Route path="/admin/AddBlog" element={<AddBlog />} />
            <Route path="/admin/EditBlog" element={<EditBlog />} />
            <Route path="/admin/EditBlog/:id" element={<EditBlog />} />
            <Route path="/admin/DeleteBlog" element={<DeleteBlog />} />
            <Route path="/admin/DownloadBlogs" element={<DownloadBlogs />} />
            
            {/* Blog Category Management Routes */}
            <Route path="/admin/AddBlogCategory" element={<AddBlogCategory />} />
            <Route path="/admin/EditBlogCategory" element={<EditBlogCategory />} />
            <Route path="/admin/EditBlogCategory/:id" element={<EditBlogCategory />} />
            <Route path="/admin/DeleteBlogCategory" element={<DeleteBlogCategory />} />

            {/* Sales Team Management Routes */}
            <Route path="/admin/salesTeam" element={<SalesTeamPage />} />
            <Route path="/admin/salesTasks" element={<SalesTasksPage />} />
            <Route path="/admin/sales/dashboard" element={<SalesDashboard />} />
            <Route path="/admin/addsalesteam" element={<AddSalesTeam />} />
            <Route path="/admin/editsalesteam" element={<EditSalesTeam />} />
            <Route path="/admin/editsalesteam/:id" element={<EditSalesTeam />} />
            <Route path="/admin/deletesalesteam" element={<DeleteSalesTeam />} />
            <Route path="/admin/deletesalesteam/:id" element={<DeleteSalesTeam />} />
            <Route path="/admin/downloadsalesteam" element={<DownloadSalesTeam />} />

            <Route path="/admin/emergency" element={<EmergencyPage />} />

            <Route path="/admin/coupons" element={<CouponsPage />} />
            
              <Route path="/admin/PrescriptionList" element={<PrescriptionList />} />
              
                   <Route path="/hospitals/:location" element={<HospitalResults />} />
              
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
