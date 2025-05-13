
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./components/userspage/login";
import Registor from "./components/userspage/registor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "./pages/Index";
import AboutPage from "./pages/About";
import Specialities from "./pages/Specialities";
import Userdashboard from "./components/userspage/userboard";
import AllDoctorsPage from "./pages/AllDoctorsPage";
import PatientProfile from "./components/userspage/userprofile";
import ContactUsPage from "./pages/contactus";
import ScrollToTop from "./ScrollToTop";
import OurHospitals from "./pages/ourhospitals";
import PharmacyCategoryPage from "./components/pharmaMedicine";
import TranslatorList from "./pages/TranslatorList";
import ServiceListingPage from "./pages/SpaPhysiotherpy";
import TourPlans from "./pages/Tourplans";
import HealthBlogs from "./pages/HealthBlogs";
import BlogDetail from "./pages/BlogDetail";

import Admindashboard from "./admin/admindashboard";
import Uploaddoctors from "./admin/uploadoctors";
import VIEWDOCTORS from "./admin/viewdoctors";


const queryClient = new QueryClient();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admindashboard') || location.pathname.startsWith('/doctors/upload');

  return (
    <>
      {!isAdminRoute && <Header />}
      <div className={isAdminRoute ? '' : 'pt-32'}>
        {children}
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registor />} />
            <Route path="/dashboard" element={<Userdashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/doctors" element={<AllDoctorsPage />} />
            <Route path="/PatientProfile" element={<PatientProfile />} />
            <Route path="/ContactUsPage" element={<ContactUsPage />} />
            <Route path="/OurHospitals" element={<OurHospitals />} />
            <Route path="/translatorList" element={<TranslatorList />} />
            <Route path="/ServiceListingPage" element={<ServiceListingPage />} />
            <Route path="*" element={<NotFound />} />

            {/* <Route path="/PharmacyCategoryPage" element={<PharmacyCategoryPage/>} />
            <Route path="/tours" element={<TourPlans/>} />
            <Route path="/health-blogs" element={<HealthBlogs/>} />
            <Route path="/blogs" element={<BlogDetail/>} /> */}
           
            {/* Add more routes as needed */}

            <Route path="/PharmacyCategoryPage" element={<PharmacyCategoryPage />} />
            <Route path="/tours" element={<TourPlans />} />
            <Route path="/health-blogs" element={<HealthBlogs />} />
            <Route path="/blogs" element={<BlogDetail />} />
            <Route path="/doctors/upload" element={<Uploaddoctors />} />
            <Route path="/admindashboard" element={<Admindashboard />} />
             <Route path="/doctors/viewdoctors" element={<VIEWDOCTORS />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
