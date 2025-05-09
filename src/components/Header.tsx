import React, { useState } from 'react';
import { Menu, Search, Phone, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
import AllDoctorsPage from '@/pages/AllDoctorsPage';
>>>>>>> 39fb2983f1121f68bb327d44ad2d76d5d347454c

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary py-1.5 px-4 md:px-6 text-white">
<<<<<<< HEAD
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xs md:text-sm">
            Locate a Hospital Near You | Write to Us | Emergency: 1800 XXX XXXX
          </div>
          <div className="hidden md:flex space-x-4 text-xs md:text-sm">
            <span onClick={() => navigate('/login')} className="cursor-pointer hover:underline">
              Patient Portal Login
            </span>
            <span className="cursor-pointer hover:underline">Doctor Login</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary flex items-center">
            <img
              src="/lovable-uploads/fa245f1c-c97e-46e6-b76f-132e062ee971.png"
              alt="Logo"
              className="h-10 w-auto"
            />
            <span className="ml-2 text-primary font-semibold text-xl md:text-2xl">MAX</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
              <Link to="/specialities" className="text-gray-700 hover:text-primary font-medium">Specialties</Link>
              <Link to="/hospitals" className="text-gray-700 hover:text-primary font-medium">Our Hospitals</Link>
              <Link to="/doctors" className="text-gray-700 hover:text-primary font-medium">Doctors</Link>
              <Link to="/patient-care" className="text-gray-700 hover:text-primary font-medium">Patient Care</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary font-medium">About Us</Link>
            </nav>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {!isMobile && (
            <div className="flex items-center border rounded-full px-3 py-1.5">
=======
  <div className="container mx-auto flex justify-between items-center">
    <div className="text-xs md:text-sm">
      Locate a Hospital Near You | Write to Us | Emergency: 1800 XXX XXXX
    </div>
    <div className="hidden md:flex space-x-4 text-xs md:text-sm">
      <span onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>
        Contact Us
      </span>
      <span onClick={() => navigate('/blog')} style={{ cursor: 'pointer' }}>
        Blog
      </span>
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
                <a href="#" className="text-gray-700 hover:text-primary font-medium">Our Hospitals</a>
                <a href="/doctors" className="text-gray-700 hover:text-primary font-medium">Doctors</a>
                
                <a href="#" className="text-gray-700 hover:text-primary font-medium">Patient Care</a>
                <a href="#" className="text-gray-700 hover:text-primary font-medium">About Us</a>
              </nav>
            )}
          </div>
           &nbsp;&nbsp; &nbsp;&nbsp;
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center border rounded-full px-3 py-1.5">
>>>>>>> 39fb2983f1121f68bb327d44ad2d76d5d347454c
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search..."
                className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 pl-2 h-auto"
              />
            </div>
<<<<<<< HEAD
          )}
          <Button
            variant="outline"
            className="hidden md:flex text-primary border-primary hover:bg-primary hover:text-white"
          >
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
=======
            &nbsp;&nbsp;
             <Button className="bg-primary hover:bg-primary-dark text-white">
              Book Appointment
            </Button>
            <Button
  variant="outline"
  className="hidden md:flex text-primary border-primary hover:bg-primary hover:text-white"
  onClick={() => navigate('/login')}
>
  <User className="mr-2 h-4 w-4" /> Login
</Button>

           
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
>>>>>>> 39fb2983f1121f68bb327d44ad2d76d5d347454c
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="container mx-auto px-4 py-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link to="/specialties" className="text-gray-700 hover:text-primary font-medium">Specialties</Link>
            <Link to="/hospitals" className="text-gray-700 hover:text-primary font-medium">Our Hospitals</Link>
            <Link to="/doctors" className="text-gray-700 hover:text-primary font-medium">Doctors</Link>
            <Link to="/patient-care" className="text-gray-700 hover:text-primary font-medium">Patient Care</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium">About Us</Link>
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
