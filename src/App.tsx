import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Login from "./components/userspage/login";
import Registor from "./components/userspage/registor";


import HomePage from "./pages/Index";
import AboutPage from "./pages/About";
import Specialities from "./pages/Specialities"
import Userdashboard from "./components/userspage/userboard";
import AllDoctorsPage from "./pages/AllDoctorsPage";
import PatientProfile from "./components/userspage/userprofile";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registor" element={<Registor />} />
          <Route path="/dashboard" element={<Userdashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/specialities" element={<Specialities />} />

          <Route path="/login" element={<Login/>}/>

          <Route path='/registor' element={<Registor/>}/>
           <Route path='/dashboard' element={<Userdashboard/>}/>
          <Route path="/doctors" element={<AllDoctorsPage />} />
<Route path="/PatientProfile" element={<PatientProfile/>}/>
          <Route path='/register' element={<Registor/>}/>

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
