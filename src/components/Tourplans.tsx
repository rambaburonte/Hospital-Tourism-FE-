import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Clock, Heart } from 'lucide-react';

// Define the type for tour plan items
interface TourPlan {
  name: string;
  details: string;
  image: string;
  description: string;
  category: string;
  route: string;
}

const TopTourPlans = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample tour plan data
  const tourPlans: TourPlan[] = [
    {
      name: 'Medical Travel Package',
      details: 'Flight + Cardiology Checkup + Spa Therapy',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Includes direct flight to Delhi, a cardiology checkup at Max Hospital, and a therapeutic massage for recovery.',
      category: 'Travel Booking',
      route: '/travel',
    },
    {
      name: 'Mumbai Neurology Recovery Plan',
      details: 'Neurology Consultation + Physiotherapy',
      image: 'https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Neurology consultation at Max Hospital Mumbai with post-treatment physiotherapy for optimal recovery.',
      category: 'Appointment Booking',
      route: '/appointments',
    },
    {
      name: 'Bangalore Wellness Journey',
      details: 'Flight + Dermatology + Yoga Therapy',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Direct flight to Bangalore, dermatology appointment, and guided yoga therapy for holistic wellness.',
      category: 'Spa & Physiotherapy',
      route: '/spa-physiotherapy',
    },
    {
      name: 'Chennai Orthopedic Care Package',
      details: 'Flight + Orthopedic Consultation + Hydrotherapy',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Direct flight to Chennai, orthopedic consultation at Max Hospital, and hydrotherapy for joint pain relief.',
      category: 'Travel Booking',
      route: '/travel',
    },
  ];

  // Map categories to their respective icons
  const categoryIcons: Record<string, JSX.Element> = {
    'Travel Booking': <Plane className="h-6 w-6 text-indigo-600" />,
    'Appointment Booking': <Clock className="h-6 w-6 text-indigo-600" />,
    'Spa & Physiotherapy': <Heart className="h-6 w-6 text-indigo-600" />,
  };

  // Memoized tour plans
  const memoizedTourPlans = useMemo(() => tourPlans, []);

  // Auto-scrolling logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % memoizedTourPlans.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [memoizedTourPlans.length]);

  // Scroll to the current slide
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  return (
    <section className="bg-slate-50 py-12 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Auto-Scrolling Full-Width Section */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
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
                {memoizedTourPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="w-full flex-none"
                    role="group"
                    aria-label={`Slide ${index + 1} of ${memoizedTourPlans.length}`}
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
              {memoizedTourPlans.slice(0, 4).map((plan, index) => (
                <div
                  key={index}
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
                    <div className="bg-slate-100 p-3 rounded-full shadow-sm mr-3">
                      {categoryIcons[plan.category]}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {plan.name}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {plan.details}
                  </p>
                  <p className="text-gray-500 text-xs italic mb-4">
                    {plan.description}
                  </p>
                  <Link
                    to={plan.route}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    aria-label={`Book Now ${plan.name}`}
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/tours"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
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