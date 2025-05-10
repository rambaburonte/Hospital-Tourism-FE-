import React, { useState, useEffect } from 'react';
import { Menu, Search, Phone, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/specialities', label: 'Specialties' },
    { to: '/OurHospitals', label: 'Our Hospitals' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/about', label: 'About Us' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      } border-b-2 border-green-200 dark:border-green-800`}
    >
      {/* Top Bar */}
      <div className="bg-blue-600 py-2 px-4 sm:px-6 text-white dark:bg-blue-800">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <Phone className="h-4 w-4 text-green-200" />
            <span>Emergency: 1800 XXX XXXX</span>
            <span>|</span>
            <span className="cursor-pointer hover:text-green-200" onClick={() => navigate('/OurHospitals')}>
              Locate a Hospital
            </span>
          </div>
          <div className="mt-2 sm:mt-0 flex space-x-4 text-xs sm:text-sm">
            <span onClick={() => navigate('/ContactUsPage')} className="cursor-pointer hover:text-green-200">Contact Us</span>
            <span onClick={() => navigate('/blog')} className="cursor-pointer hover:text-green-200">Blog</span>
            
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40?text=MAX"
              alt="MAX Healthcare Logo"
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/40?text=Logo';
              }}
            />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">MAX</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex space-x-6">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 font-medium relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 dark:bg-green-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {!isMobile && (
            <div className="relative flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:border-green-300 dark:hover:border-green-700">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 pl-2 h-auto text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          )}

          <Button
            className="bg-blue-600 hover:bg-green-500 text-white rounded-lg shadow-md"
            onClick={() => navigate('/appointment')}
          >
            Book Appointment
          </Button>

          <Button
            variant="outline"
            className="hidden md:flex text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
            onClick={() => navigate('/login')}
          >
            <User className="mr-2 h-4 w-4" /> Login
          </Button>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="container mx-auto px-4 py-4 bg-white dark:bg-gray-900 border-t border-green-200 dark:border-green-800 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
