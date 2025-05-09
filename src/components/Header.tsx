
import React, { useState } from 'react';
import { Menu, Search, Phone, User, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm header">
      {/* Top bar */}
      <div className="bg-primary py-1.5 px-4 md:px-6 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xs md:text-sm">
            Locate a Hospital Near You | Write to Us | Emergency: 1800 XXX XXXX
          </div>
          <div className="hidden md:flex space-x-4 text-xs md:text-sm">
          <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
             Patient Portal Login
          </span>

            <span>Doctor Login</span>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="logo-container">
              <a href="/" className="text-2xl font-bold text-primary flex items-center">
                <img src="/public/lovable-uploads/fa245f1c-c97e-46e6-b76f-132e062ee971.png" alt="Logo" className="h-10 w-auto" />
                <span className="ml-2 text-primary font-semibold text-xl md:text-2xl">MAX</span>
              </a>
            </div>
            {!isMobile && (
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-primary font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-primary font-medium">Specialties</a>
                {/* <a href="#" className="text-gray-700 hover:text-primary font-medium">Our Hospitals</a> */}
                <a href="/pages/hospitals" className="text-gray-700 hover:text-primary font-medium">Our Hospitals</a>
                <a href="#" className="text-gray-700 hover:text-primary font-medium">Doctors</a>

                <a href="#" className="text-gray-700 hover:text-primary font-medium">Patient Care</a>
                <a href="#" className="text-gray-700 hover:text-primary font-medium">About Us</a>
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center border rounded-full px-3 py-1.5">
              <Search className="h-4 w-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 pl-2 h-auto"
              />
            </div>
            <Button variant="outline" className="hidden md:flex text-primary border-primary hover:bg-primary hover:text-white">
              <Phone className="mr-2 h-4 w-4" /> Contact
            </Button>
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Book Appointment
            </Button>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="container mx-auto px-4 py-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-700 hover:text-primary font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">Specialties</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">Our Hospitals</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">Doctors</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">Patient Care</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium">About Us</a>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
