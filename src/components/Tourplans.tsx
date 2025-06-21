import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Clock, Heart } from 'lucide-react';
import axios from 'axios';

// Define the type for service items
interface PackageServiceItem {
  id: number;
  serviceItemId: number | null;
  servicePackageId: number;
}

// Define the type for service package from backend
interface ServicePackage {
  id: number;
  name: string;
  description: string;
  totalPrice: number;
  durationDays: number;
  imageUrl?: string;
  featured: string;
  serviceItems: PackageServiceItem[];
}

// Define the type for tour plan items
interface TourPlan {
  id: number; // Added to track package ID for booking
  name: string;
  details: string;
  image: string;
  description: string;
  category: string;
  route: string;
  inclusions: string[];
  price: number;
  durationDays: number;
}

// Define the type for booking status
interface BookingStatus {
  [key: number]: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

// Define the type for booking response DTO
interface BookingPackageDTO {
  id: number;
  userId: number;
  servicePackageId: number;
  bookingDate: string;
  status: string;
  totalPrice: number;
}

// Define the type for user data stored in localStorage
interface UserData {
  id: number;
  email: string;
  // Add other user fields as needed
}

const TopTourPlans: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  // Map serviceItemIds to inclusion names (aligned with TourPlans.tsx)
  const serviceItemMap: Record<number, string> = {
    1: 'Spa Therapy',
    2: 'Yoga Sessions',
    152: 'Doctor Consultation',
    153: 'Hotel Stay',
    202: 'Lab Tests',
    252: 'Cab Service',
    302: 'Flight',
    303: 'Translator Services',
    304: 'Chef-Prepared Meals',
    307: 'Physiotherapy',
  };

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:4545/admin/packege/All/packages');
        const filteredPackages = res.data.filter(
          (pkg: ServicePackage) => pkg.featured.toLowerCase() === 'no'
        );
        setPackages(filteredPackages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load featured packages. Please try again later.');
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Map packages to tour plans
  const tourPlans: TourPlan[] = useMemo(() => {
    return packages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      details: pkg.serviceItems.length
        ? pkg.serviceItems
            .map((item) => serviceItemMap[item.serviceItemId!])
            .filter((inclusion): inclusion is string => inclusion !== undefined)
            .join(' + ')
        : 'Custom Medical Package',
      image: pkg.imageUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: pkg.description || `A ${pkg.durationDays}-day medical package costing $${pkg.totalPrice}.`,
      category: pkg.serviceItems.length ? 'Medical Package' : 'General Package',
      route: '/packages',
      inclusions: pkg.serviceItems
        .map((si) => serviceItemMap[si.serviceItemId!])
        .filter((inclusion): inclusion is string => inclusion !== undefined),
      price: pkg.totalPrice,
      durationDays: pkg.durationDays,
    }));
  }, [packages]);

  // Map categories to their respective icons (aligned with TourPlans.tsx)
  const categoryIcons: Record<string, JSX.Element> = {
    'Medical Package': <Plane className="h-5 w-5 text-[#499E14]" />,
    'General Package': <Clock className="h-5 w-5 text-[#499E14]" />,
    'Spa & Physiotherapy': <Heart className="h-5 w-5 text-[#499E14]" />,
  };

  // Auto-scrolling logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tourPlans.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [tourPlans.length]);

  // Scroll to the current slide
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  // Handle booking action
  const handleBookPackage = async (packageId: number) => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      setBookingStatus((prev) => ({
        ...prev,
        [packageId]: { loading: false, error: 'Please log in to book a package.', success: false },
      }));
      navigate('/login');
      return;
    }

    let userId: number;
    try {
      const userData: UserData = JSON.parse(userString);
      userId = userData.id;
    } catch (err) {
      setBookingStatus((prev) => ({
        ...prev,
        [packageId]: { loading: false, error: 'Invalid user data. Please log in again.', success: false },
      }));
      navigate('/login');
      return;
    }

    setBookingStatus((prev) => ({
      ...prev,
      [packageId]: { loading: true, error: null, success: false },
    }));

    try {
      const response = await axios.post(`http://localhost:4545/user/package/book/${userId}/${packageId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: BookingPackageDTO = response.data;
      setBookingStatus((prev) => ({
        ...prev,
        [packageId]: { loading: false, error: null, success: true },
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setBookingStatus((prev) => ({
          ...prev,
          [packageId]: { loading: false, error: null, success: false },
        }));
      }, 5000);
    } catch (err) {
      setBookingStatus((prev) => ({
        ...prev,
        [packageId]: { loading: false, error: 'Failed to book package. Please try again.', success: false },
      }));
      console.error(err);
    }
  };

  if (loading) {
    return (
      <section className="bg-slate-50 py-12 w-full bg-opacity-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-50">
          <p className="text-center text-gray-600">Loading featured packages...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-slate-50 py-12 w-full bg-opacity-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-50">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!tourPlans.length) {
    return (
      <section className="bg-slate-50 py-12 w-full bg-opacity-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-50">
          <p className="text-center text-gray-600">No featured packages available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-12 w-full bg-opacity-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-50">
        <div className="w-full max-w-7xl mx-auto">
          {/* Auto-Scrolling Full-Width Section */}
          <div className="mb-12">
            <h2 className="text-2xl py-12 sm:text-3xl font-bold text-center bg-opacity-50">
              Explore our Plans
            </h2>
            <div
              ref={carouselRef}
              className="relative w-full overflow-x-hidden"
              role="region"
              aria-live="polite"
              aria-label="Top tour plans auto-scrolling carousel"
            >
              <div className="flex w-full">
                {tourPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="w-full flex-none"
                    role="group"
                    aria-label={`Slide ${index + 1} of ${tourPlans.length}`}
                  >
                    <div className="relative w-full h-64 sm:h-96">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <p className="text-white text-xl font-bold mb-2">
                          {plan.name}
                        </p>
                        <p className="text-white text-sm">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medical Tour Plans Section with Scaling Cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tourPlans.slice(0, 4).map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  role="article"
                  aria-label={plan.name}
                >
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center mb-2">
                    <div className="bg-[#f0f8e8] p-3 rounded-full shadow-sm mr-3">
                      {categoryIcons[plan.category]}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {plan.name}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {plan.inclusions.map((inclusion, i) => (
                      <span
                        key={i}
                        className="inline-block bg-[#e6f4e0] text-[#3a7e10] text-xs px-3 py-1 rounded-full hover:bg-[#d0e8b8] transition-all duration-200 cursor-default"
                        title={inclusion}
                      >
                        {inclusion}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {plan.description}
                  </p>
                  <p className="text-gray-800 text-sm font-semibold mb-2">
                    Price: ${plan.price}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Duration: {plan.durationDays} days
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookPackage(plan.id)}
                      disabled={bookingStatus[plan.id]?.loading}
                      className={`flex-1 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                        bookingStatus[plan.id]?.loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#499E14] hover:bg-[#3a7e10]'
                      }`}
                      aria-label={`Book ${plan.name}`}
                    >
                      {bookingStatus[plan.id]?.loading ? 'Booking...' : 'Book Here'}
                    </button>
                    <Link
                      to={plan.route}
                      className="flex-1 bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-2 px-4 rounded-lg shadow-md text-center transition-all duration-300"
                      aria-label={`View Details ${plan.name}`}
                    >
                      View Details
                    </Link>
                  </div>
                  {bookingStatus[plan.id]?.success && (
                    <p className="text-green-600 text-sm mt-2 text-center">Booking successful!</p>
                  )}
                  {bookingStatus[plan.id]?.error && (
                    <p className="text-red-600 text-sm mt-2 text-center">
                      {bookingStatus[plan.id].error}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/tours"
                className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:text-white hover:scale-105 hover:shadow-md transition-all duration-200"
                aria-label="Explore More"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTourPlans;