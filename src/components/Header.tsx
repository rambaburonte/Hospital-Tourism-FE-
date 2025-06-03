import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Phone, X, User, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaRobot } from 'react-icons/fa';

// Add type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
    dataLayer: any[];
  }
}

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(100);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle popup logic
  useEffect(() => {
    if (sessionStorage.getItem('welcomePopupShown')) {
      return;
    }

    const showTimer = setTimeout(() => {
      setShowPopup(true);
      closeButtonRef.current?.focus();
      sessionStorage.setItem('welcomePopupShown', 'true');

      // Track popup display
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'popup_display', {
          event_category: 'Welcome Popup',
          event_label: 'Poster Popup Shown',
        });
      }

      let startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 5000 - elapsed);
        setProgress((remaining / 5000) * 100);
      }, 50);

      setTimeout(() => {
        setShowPopup(false);
        clearInterval(interval);
      }, 5000);
    }, 1000);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  // Handle button clicks with GA tracking
  const handleLearnMoreClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'popup_click', {
        event_category: 'Welcome Popup',
        event_label: 'Learn More',
      });
    }
    navigate('/success-stories');
  };

  const handleCloseClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'popup_click', {
        event_category: 'Welcome Popup',
        event_label: 'Close',
      });
    }
    setShowPopup(false);
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/specialities', label: 'Specialties' },
    { to: '/OurHospitals', label: 'Our Hospitals' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/about', label: 'About Us' },
    { to: '/tours', label: 'Packages' },
    { to: '/medicinecatalog', label: 'Pharmacy' },
  ];
 
  const handleRedirect = () => {
    navigate('/chat-bot');
  };
 
  return (
    <>
      {/* Google Analytics Script */}
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NMEZPCSMXK"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NMEZPCSMXK');
          `}
        </script>
      </Helmet>

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        } border-b-2 border-green-200 dark:border-green-800`}
      >
        {/* Top Bar */}
        <div className="bg-[#499E14] py-2 px-4 sm:px-6 text-white dark:bg-[#3a7e10]">
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
               {/* <span
                onClick={handleRedirect}
                className="cursor-pointer text-lg font-semibold text-gray-700 dark:text-gray-200"
              >
                 <FaRobot />
              </span> */}
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
              <span className="text-2xl font-bold text-[#499E14] dark:text-[#5ab81a]">MAX</span>
             
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
          <div className="flex items-center gap-3">
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
              className="bg-[#499E14] hover:bg-green-500 text-white rounded-lg shadow-md"
              onClick={() => {
                if (typeof window.gtag === 'function') {
                  window.gtag('event', 'button_click', {
                    event_category: 'Header',
                    event_label: 'Book Appointment',
                  });
                }
                navigate('/appointment');
              }}
            >
              Book Appointment
            </Button>

            {!isMobile && (
              <Button
                variant="outline"
                className="text-[#499E14] dark:text-[#5ab81a] border-[#499E14] dark:border-[#5ab81a] hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
                onClick={() => {
                  if (typeof window.gtag === 'function') {
                    window.gtag('event', 'button_click', {
                      event_category: 'Header',
                      event_label: 'Login',
                    });
                  }
                  navigate('/login');
                }}
              >
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            )}

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
              <Button
                variant="outline"
                className="text-[#499E14] dark:text-[#5ab81a] border-[#499E14] dark:border-[#5ab81a] hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
                onClick={() => {
                  if (typeof window.gtag === 'function') {
                    window.gtag('event', 'button_click', {
                      event_category: 'Header',
                      event_label: 'Login Mobile',
                    });
                  }
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
              >
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
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

      {/* Poster-Style Welcome Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full sm:w-[90%] p-6 sm:p-8 transform transition-transform duration-300 animate-zoom-in overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(73, 158, 20, 0.7), rgba(58, 126, 16, 0.7)), url("https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '4px solid rgba(255, 255, 255, 0.2)',
            }}
            role="dialog"
            aria-labelledby="popup-title"
            aria-describedby="popup-desc"
          >
            {/* Decorative Border */}
            <div className="absolute inset-0 border-2 border-[#d0e8b8] dark:border-[#3a7e10] rounded-3xl pointer-events-none" />

            {/* Medical Cross Icon */}
            <div className="flex justify-center mb-4">
              <Plus className="h-12 w-12 text-yellow-400 dark:text-yellow-300 animate-pulse" />
            </div>

            {/* Close Button (X) */}
            <button
              ref={closeButtonRef}
              onClick={handleCloseClick}
              onKeyDown={(e) => e.key === 'Enter' && handleCloseClick()}
              className="absolute top-4 right-4 text-white dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Content */}
            <h2 id="popup-title" className="text-3xl sm:text-4xl font-extrabold text-white dark:text-gray-100 text-center mb-3 tracking-tight">
              Your Journey to Wellness Begins with MAX!
            </h2>
            <p id="popup-desc" className="text-white dark:text-gray-200 text-center mb-6 text-base sm:text-lg">
              World-Class Healthcare Awaits You
            </p>

            {/* Progress Bar */}
            <div
              className="w-full h-1.5 bg-white/30 dark:bg-gray-700/30 rounded-full mb-6 overflow-hidden"
              aria-live="polite"
              aria-label="Popup will close in 5 seconds"
            >
              <div
                className="h-full bg-yellow-400 dark:bg-yellow-300 transition-all duration-[5000ms] ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleLearnMoreClick}
                className="flex-1 bg-[#499E14] hover:bg-[#5ab81a] text-white font-bold rounded-xl py-3 sm:py-2.5 text-base sm:text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Learn More
              </Button>
              <Button
                onClick={handleCloseClick}
                className="flex-1 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl py-3 sm:py-2.5 text-base sm:text-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;