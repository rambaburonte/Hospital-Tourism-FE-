
import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Phone, X, User, Plus, ShoppingCart, Heart, LogOut, LayoutDashboard, Languages, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
// import { Whatsapp } from "lucide-react"; // Remove this line, as lucide-react does not export Whatsapp

// Add a simple WhatsApp SVG icon component
const Whatsapp: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 6.403h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.045c0-5.444 4.425-9.87 9.87-9.87 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.883 6.979c-.003 5.444-4.428 9.869-9.872 9.869zm8.413-18.282A11.815 11.815 0 0011.97 0C5.373 0 0 5.373 0 11.972c0 2.112.552 4.174 1.601 5.981L.057 23.925a1.001 1.001 0 001.225 1.225l5.951-1.548a11.93 11.93 0 005.736 1.463h.005c6.597 0 11.97-5.373 11.97-11.972 0-3.193-1.246-6.197-3.513-8.464z" />
  </svg>
);
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

// Add type declaration for gtag and Google Translate
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
    google?: {
      translate: {
        TranslateElement: new (options: { 
          pageLanguage: string; 
          includedLanguages?: string;
          layout?: number;
          autoDisplay?: boolean;
        }, elementId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
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
  profilePictureUrls?: string | string[];
}

// Language options for Google Translate
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
];

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);  const [userName, setUserName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [translateDropdownOpen, setTranslateDropdownOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const translateDropdownRef = useRef<HTMLDivElement>(null);
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
  // Google Translate initialization
  useEffect(() => {
    // Load Google Translate script
    const loadGoogleTranslate = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
    };    // Initialize Google Translate Element
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: languages.map(lang => lang.code).join(','),
            autoDisplay: false
          },
          'google_translate_element'
        );
      }
    };

    loadGoogleTranslate();
  }, []);
  // Function to trigger translation
  const translateToLanguage = (languageCode: string) => {
    setTranslateDropdownOpen(false);
    trackEvent('translate', 'Language', languageCode);
    
    if (languageCode === 'en') {
      // For English, remove any translation
      const currentUrl = window.location.href;
      if (currentUrl.includes('#googtrans(')) {
        window.location.href = currentUrl.split('#googtrans(')[0];
      }
    } else {
      // For other languages, use Google Translate URL hash
      const currentUrl = window.location.href.split('#googtrans(')[0];
      window.location.href = `${currentUrl}#googtrans(en|${languageCode})`;
    }
    
    // Force page reload to apply translation
    setTimeout(() => {
      window.location.reload();
    }, 100);
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

  // Function to check login status, fetch cart count, and profile picture
  const checkLoginStatusAndCart = () => {
    const user = localStorage.getItem('user');
    try {
      const userData: UserData = JSON.parse(user || '{}');
      const loggedIn = !!user && (!!userData.id || !!userData.userId);
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        setUserName(userData.name || userData.userName || 'User');
        // Handle profilePictureUrls which can be either a string or an array of strings
        const profilePictureUrl = Array.isArray(userData.profilePictureUrls) 
          ? userData.profilePictureUrls[0] 
          : userData.profilePictureUrls;
        setProfilePicture(profilePictureUrl || null);
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
        setProfilePicture(null);
        setCartItemCount(0);
      }
    } catch (e) {
      console.error('Invalid user data in localStorage:', e);
      setIsLoggedIn(false);
      setUserName(null);
      setProfilePicture(null);
      setCartItemCount(0);
    }
  };

  // Effect to check login status and cart count on mount and path change
  useEffect(() => {
    checkLoginStatusAndCart();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkLoginStatusAndCart();
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
      if (translateDropdownRef.current && !translateDropdownRef.current.contains(event.target as Node)) {
        setTranslateDropdownOpen(false);
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
    e.preventDefault();
    console.log('handleLogout called');

    try {
      console.log('Current localStorage user:', localStorage.getItem('user'));
      localStorage.removeItem('user');
      console.log('User item removed from localStorage. Current localStorage user:', localStorage.getItem('user'));

      checkLoginStatusAndCart();
      setDropdownOpen(false);
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
    { to: '/about', label: 'About Us' },
    { to: '/tours', label: 'Packages' },
    
  ];

  const handleRedirect = () => {
    navigate('/chat-bot');
  };  return (
    <>      {/* Hide Google Translate default styling but keep functionality */}
      <style dangerouslySetInnerHTML={{
        __html: `
          #google_translate_element {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
          .goog-te-banner-frame {
            display: none !important;
          }
          .goog-te-menu-value {
            display: none !important;
          }
          body {
            top: 0 !important;
          }
          .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
          }
          .goog-te-gadget-simple .goog-te-menu-value {
            color: transparent !important;
          }
        `
      }} />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        } border-b-2 border-green-200 dark:border-green-800`}
      >
        {/* Top Bar */}
        <div className="bg-[#499E14] py-2 px-4 sm:px-6 text-white dark:bg-[#3a7e10]">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <>
                <Phone className="h-4 w-4 text-green-200" />
                <a href="tel:918595114141" className="hover:text-green-200">Emergency:+91 8595114141</a>
                <Whatsapp className="h-4 w-4 text-green-200" />
                <a href="https://wa.me/918595114141" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
                  WhatsApp
                </a>
              </>
            </div>            
            <div className="mt-2 sm:mt-0 flex space-x-4 text-xs sm:text-sm items-center">
              <span onClick={() => navigate('/ContactUsPage')} className="cursor-pointer hover:text-green-200">Contact Us</span>
              <span onClick={() => navigate('/health-blogs')} className="cursor-pointer hover:text-green-200">Blog</span>
             

              
              {/* Google Translate Dropdown */}
              <div className="relative" ref={translateDropdownRef}>
                <button
                  onClick={() => setTranslateDropdownOpen(!translateDropdownOpen)}
                  className="flex items-center space-x-1 cursor-pointer hover:text-green-200 transition-colors"
                  aria-label="Select Language"
                >
                  <Globe className="h-4 w-4" />
                  <span>Translate</span>
                </button>
                
                {translateDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => translateToLanguage(language.code)}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="mr-2 text-base">{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Main Header */}
        
          <div className="container mx-auto py-1 px-4 sm:px-6 flex justify-between items-center bg-white dark:bg-gray-900">
            <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/maditailr/maditailarLogo.png" alt="MAX Logo" className="h-20 w-25" />
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

            {!isMobile && isLoggedIn ? (
              <div className="relative" ref={userDropdownRef}>
                <Button
                  variant="outline"
                  className="text-[#499E14] dark:text-[#5ab81a] border-none hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg pr-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full mr-2 object-cover"
                      onError={() => setProfilePicture(null)}
                    />
                  ) : (
                    <User className="mr-2 h-4 w-4" />
                  )}
                  {userName}
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
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                    </Link>
                    <Link
                      to="/PatientProfile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {profilePicture ? (
                        <img
                          src={profilePicture}
                          alt="Profile"
                          className="h-8 w-8 rounded-full mr-2 object-cover"
                          onError={() => setProfilePicture(null)}
                        />
                      ) : (
                        <User className="h-4 w-4 mr-2" />
                      )}
                      Profile
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
                className="text-[#499E14] dark:text-[#5ab81a] border-none hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
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
            <nav className="flex flex-col p-4 space-y-2">              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              
              {/* Mobile Translate Section */}
              <div className="py-2">
                <button
                  onClick={() => setTranslateDropdownOpen(!translateDropdownOpen)}
                  className="flex items-center w-full py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2"
                >
                  <Globe className="h-6 w-6 mr-2" />
                  Translate
                </button>
                {translateDropdownOpen && (
                  <div className="mt-2 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-md">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          translateToLanguage(language.code);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <span className="mr-2 text-base">{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
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
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-6 w-6 mr-2" /> Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="h-10 w-10 rounded-full mr-2 object-cover"
                        onError={() => setProfilePicture(null)}
                      />
                    ) : (
                      <User className="h-6 w-6 mr-2" />
                    )}
                    Profile
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-[#499E14] dark:text-[#5ab81a] border-none hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
                    onClick={(e) => { handleLogout(e); setMobileMenuOpen(false); }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full mt-2 text-[#499E14] dark:text-[#5ab81a] border-none hover:bg-green-500 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 rounded-lg"
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
            <div className="flex justify-center mb-4">
              <Plus className="h-12 w-12 text-yellow-400 dark:text-yellow-300" />
            </div>

            <button
              ref={closeButtonRef}
              onClick={handleCloseClick}
              onKeyDown={(e) => e.key === 'Enter' && handleCloseClick()}
              className="absolute top-4 right-4 text-white dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-300"
              aria-label="Close popup"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 id="popup-title" className="text-3xl sm:text-4xl font-bold text-white dark:text-gray-100 text-center mb-3">
              Your Journey to Wellness Begins with Meditailor!
            </h2>
            <p id="popup-desc" className="text-white dark:text-gray-200 text-center mb-6 text-base sm:text-lg">
              World-Class Healthcare Awaits You
            </p>

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
            </div>          </div>
        </div>
      )}

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </>
  );
};

export default Header;