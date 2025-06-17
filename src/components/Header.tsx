import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Phone, X, User, Plus, ShoppingCart, Heart, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

// Add type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
    dataLayer: any[];
  }
}

// Define UserData interface for type safety
interface UserData {
  id?: string;
  userId?: string;
  name?: string;
  userName?: string;
  email?: string;
  userEmail?: string;
}

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Centralized GA tracking function
  const trackEvent = (action: string, category: string, label: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };

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
    if (sessionStorage.getItem('welcomePopupShown') || location.pathname !== '/') {
      return;
    }

    const showTimer = setTimeout(() => {
      setShowPopup(true);
      closeButtonRef.current?.focus();
      sessionStorage.setItem('welcomePopupShown', 'true');

      trackEvent('popup_display', 'Welcome Popup', 'Poster Popup Shown');

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }, 1000);

    return () => {
      clearTimeout(showTimer);
    };
  }, [location.pathname]);

  // Function to check login status and fetch cart count
  const checkLoginStatusAndCart = () => {
    const user = localStorage.getItem('user');
    try {
      const userData: UserData = JSON.parse(user || '{}');
      const loggedIn = !!user && !!userData.id || !!userData.userId;
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        setUserName(userData.name || userData.userName || 'User');
        // Fetch cart count
        axios.get(`${BASE_URL}/api/AddToCart/count/${userData.id || userData.userId}`)
          .then(response => {
            if (response.data && typeof response.data === 'number') {
              setCartItemCount(response.data);
            } else {
              console.warn('Invalid cart count response:', response.data);
              setCartItemCount(0);
            }
          })
          .catch(err => {
            console.error('Failed to fetch cart count:', err);
            setCartItemCount(0);
          });
      } else {
        setUserName(null);
        setCartItemCount(0);
      }
    } catch (e) {
      console.error('Invalid user data in localStorage:', e);
      setIsLoggedIn(false);
      setUserName(null);
      setCartItemCount(0);
    }
  };

  // Effect to check login status and cart count on mount and path change
  useEffect(() => {
    checkLoginStatusAndCart();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkLoginStatusAndCart(); // Re-run checks if user data changes in localStorage
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle button clicks with GA tracking
  const handleLearnMoreClick = () => {
    trackEvent('popup_click', 'Welcome Popup', 'Learn More');
    navigate('/success-stories');
  };

  const handleCloseClick = () => {
    trackEvent('popup_click', 'Welcome Popup', 'Close');
    setShowPopup(false);
  };

  // Handle logout
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default button behavior
    console.log('handleLogout called');
    
    try {
      console.log('Current localStorage user:', localStorage.getItem('user'));
      localStorage.removeItem('user');
      console.log('User item removed from localStorage. Current localStorage user:', localStorage.getItem('user'));

      // Immediately update state and re-check login status
      checkLoginStatusAndCart(); 
      setDropdownOpen(false); // Close dropdown
      console.log('State updated and login status re-checked.');

      if (location.pathname !== '/login') {
        console.log('Navigating to /login');
        navigate('/login');
      } else {
        console.log('Already on /login page');
      }

      trackEvent('logout', 'Authentication', 'User Logout');
      console.log('Logout event tracked');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/specialities', label: 'Specialties' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/about', label: 'About Us' },
    { to: '/tours', label: 'Packages' },
    { to: '/medicinecatalog', label: 'Pharmacy' },
    { to: '/HospitalList', label: 'Hospitals' },
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
              <span>Emergency: 8595114141</span>
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-4 text-xs sm:text-sm">
              <span onClick={() => navigate('/ContactUsPage')} className="cursor-pointer hover:text-green-200">Contact Us</span>
              <span onClick={() => navigate('/health-blogs')} className="cursor-pointer hover:text-green-200">Blog</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#499E14] dark:text-[#5ab81a]">
                MAX
              </span>
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
                trackEvent('button_click', 'Header', 'Book Appointment');
                navigate('/bookingfom');
              }}
            >
              Book Appointment
            </Button>

            {!isMobile && isLoggedIn ? (
              <div className="relative" ref={userDropdownRef}>
                <Button
                  variant="outline"
                  className="text-[#499E14] dark:text-[#5ab81a] border-[#499E14] dark:border-[#5ab81a] hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg pr-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="mr-2 h-4 w-4" /> {userName}
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/bookingcart"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Cart
                      {cartItemCount > 0 && (
                        <span className="ml-auto bg-[#499E14] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Heart className="h-4 w-4 mr-2" /> Wishlist
                    </Link>
                    <Link
                      to="/myorders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LogOut className="h-4 w-4 mr-2 rotate-180" /> My Orders
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                    <button
                      onClick={(e) => { handleLogout(e); setDropdownOpen(false); }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : !isMobile && (
              <Button
                variant="outline"
                className="text-[#499E14] dark:text-[#5ab81a] border-[#499E14] dark:border-[#5ab81a] hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
                onClick={() => {
                  trackEvent('button_click', 'Header', 'Login');
                  navigate('/login');
                }}
              >
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Mobile Menu Sidebar */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-bold text-[#499E14] dark:text-[#5ab81a]">MAX</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/bookingcart"
                    className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-6 w-6 mr-2" /> Cart
                    {cartItemCount > 0 && (
                      <span className="ml-auto bg-[#499E14] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-6 w-6 mr-2" /> Wishlist
                  </Link>
                  <Link
                    to="/myorders"
                    className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="h-6 w-6 mr-2 rotate-180" /> My Orders
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-[#499E14] dark:text-[#5ab81a] border-[#499E14] dark:border-[#5ab81a] hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
                    onClick={(e) => { handleLogout(e); setMobileMenuOpen(false); }}
                  >
                    <User className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full mt-2 text-[#499E14] dark:text-[#5ab81a] border-[#499E14] dark:border-[#5ab81a] hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                >
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Poster-Style Welcome Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ contain: 'layout', transform: 'translateZ(0)' }}
        >
          <div
            className="relative bg-[#3a7e10] dark:bg-[#2a5e08] rounded-lg max-w-lg w-full sm:w-[90%] p-6 sm:p-8"
            style={{ contain: 'layout', transform: 'translateZ(0)' }}
            role="dialog"
            aria-labelledby="popup-title"
            aria-describedby="popup-desc"
          >
            {/* Medical Cross Icon */}
            <div className="flex justify-center mb-4">
              <Plus className="h-12 w-12 text-yellow-400 dark:text-yellow-300" />
            </div>

            {/* Close Button (X) */}
            <button
              ref={closeButtonRef}
              onClick={handleCloseClick}
              onKeyDown={(e) => e.key === 'Enter' && handleCloseClick()}
              className="absolute top-4 right-4 text-white dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-300"
              aria-label="Close popup"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Content */}
            <h2 id="popup-title" className="text-3xl sm:text-4xl font-bold text-white dark:text-gray-100 text-center mb-3">
              Your Journey to Wellness Begins with MAX!
            </h2>
            <p id="popup-desc" className="text-white dark:text-gray-200 text-center mb-6 text-base sm:text-lg">
              World-Class Healthcare Awaits You
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleLearnMoreClick}
                className="flex-1 bg-[#499E14] hover:bg-[#5ab81a] text-white font-bold rounded-lg py-3 sm:py-2.5 text-base sm:text-lg"
              >
                Learn More
              </Button>
              <Button
                onClick={handleCloseClick}
                className="flex-1 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg py-3 sm:py-2.5 text-base sm:text-lg"
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