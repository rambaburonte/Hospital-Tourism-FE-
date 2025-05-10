import React, { useState, useMemo } from 'react';
import { Heart, Stethoscope, TestTube, Car, ChefHat, Plane, Package, Languages, Search, Filter, X } from 'lucide-react';

// Define the type for tour plan items
interface TourPlan {
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  inclusions: string[];
}

const TourPlans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOption, setSortOption] = useState('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample tour plan data (2-3 plans per category)
  const tourPlans: TourPlan[] = [
    // Spa & Physiotherapy
    {
      name: 'Delhi Spa Retreat',
      description: 'Luxury spa treatments and physiotherapy in Delhi’s premier wellness center.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Spa & Physiotherapy',
      price: 700,
      inclusions: ['Spa Therapy', 'Physiotherapy'],
    },
    {
      name: 'Bangalore Yoga Wellness',
      description: 'Guided yoga and spa therapy for holistic wellness in Bangalore.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Spa & Physiotherapy',
      price: 900,
      inclusions: ['Yoga Sessions', 'Spa Therapy'],
    },
    {
      name: 'Chennai Relaxation Plan',
      description: 'Therapeutic massage and physiotherapy sessions in Chennai.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Spa & Physiotherapy',
      price: 650,
      inclusions: ['Massage', 'Physiotherapy'],
    },
    // Doctor Consultation
    {
      name: 'Mumbai Heart Checkup',
      description: 'Cardiology consultation with comprehensive screening in Mumbai.',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Doctor Consultation',
      price: 1100,
      inclusions: ['Cardiology Consultation', 'Health Screening'],
    },
    {
      name: 'Delhi Orthopedic Care',
      description: 'Orthopedic consultation with follow-up care in Delhi.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Doctor Consultation',
      price: 950,
      inclusions: ['Orthopedic Consultation', 'Follow-up'],
    },
    {
      name: 'Bangalore Neuro Consult',
      description: 'Neurology consultation with specialist care in Bangalore.',
      image: 'https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Doctor Consultation',
      price: 1200,
      inclusions: ['Neurology Consultation', 'Diagnostic Review'],
    },
    // Lab Testing
    {
      name: 'Bangalore Diagnostic Plan',
      description: 'Full-body lab tests including blood work and imaging in Bangalore.',
      image: 'https://images.unsplash.com/photo-1585435465945-bef5a93d24c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Lab Testing',
      price: 600,
      inclusions: ['Blood Tests', 'MRI Scan'],
    },
    {
      name: 'Chennai Health Check',
      description: 'Comprehensive lab tests for preventive health in Chennai.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173fd1bece7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Lab Testing',
      price: 750,
      inclusions: ['Lab Tests', 'Health Report'],
    },
    {
      name: 'Delhi Lab Screening',
      description: 'Advanced diagnostic tests for complete health assessment in Delhi.',
      image: 'https://images.unsplash.com/photo-1579684453423-8a6b57f2fad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Lab Testing',
      price: 800,
      inclusions: ['Blood Work', 'Ultrasound'],
    },
    // Travel with Cab
    {
      name: 'Chennai Medical Transport',
      description: 'Dedicated cab service for medical visits in Chennai.',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Travel with Cab',
      price: 450,
      inclusions: ['Cab Service', 'Hospital Transfers'],
    },
    {
      name: 'Mumbai Clinic Shuttle',
      description: 'Convenient cab transport for clinic visits in Mumbai.',
      image: 'https://images.unsplash.com/photo-1542451365-e5aa846e5e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Travel with Cab',
      price: 500,
      inclusions: ['Cab Service', 'Clinic Visits'],
    },
    // Chef-Curated Meals
    {
      name: 'Delhi Gourmet Health Stay',
      description: 'Luxury hotel stay with healthy meals by a chef in Delhi.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Chef-Curated Meals',
      price: 1200,
      inclusions: ['Hotel Stay', 'Chef-Prepared Meals'],
    },
    {
      name: 'Bangalore Culinary Wellness',
      description: 'Hotel stay with diet-specific meals by a chef in Bangalore.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe75d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Chef-Curated Meals',
      price: 1400,
      inclusions: ['Hotel Stay', 'Custom Meals'],
    },
    // Flight-Included Travel
    {
      name: 'Mumbai Flight Medical Plan',
      description: 'Flight to Mumbai with hospital consultation and hotel stay.',
      image: 'https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Flight-Included Travel',
      price: 1600,
      inclusions: ['Flight', 'Hospital Consultation', 'Hotel'],
    },
    {
      name: 'Delhi Flight Wellness Plan',
      description: 'Flight to Delhi with spa therapy and consultation.',
      image: 'https://images.unsplash.com/photo-1542451365-e5aa846e5e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Flight-Included Travel',
      price: 1450,
      inclusions: ['Flight', 'Spa Therapy', 'Consultation'],
    },
    // End-to-End Care
    {
      name: 'Bangalore Complete Care',
      description: 'All-inclusive plan with flights, consultations, tests, and spa.',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'End-to-End Care',
      price: 2200,
      inclusions: ['Flights', 'Doctor Consultation', 'Lab Tests', 'Spa', 'Cab', 'Chef Meals', 'Translator'],
    },
    {
      name: 'Delhi Ultimate Health Journey',
      description: 'Comprehensive medical tourism with all services included.',
      image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'End-to-End Care',
      price: 2500,
      inclusions: ['Flights', 'Consultation', 'Tests', 'Hotel', 'Cab', 'Chef Meals', 'Translator'],
    },
    // Flight-Free Wellness
    {
      name: 'Chennai Local Wellness',
      description: 'Spa, consultation, and cab services without flights in Chennai.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Flight-Free Wellness',
      price: 850,
      inclusions: ['Spa Therapy', 'Doctor Consultation', 'Cab Service'],
    },
    {
      name: 'Mumbai Grounded Care',
      description: 'Local medical and wellness services without flights in Mumbai.',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Flight-Free Wellness',
      price: 700,
      inclusions: ['Lab Tests', 'Hotel Stay', 'Cab Service'],
    },
    // Translator-Assisted Care
    {
      name: 'Delhi Language-Supported Care',
      description: 'Doctor consultation with translator services in Delhi.',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Translator-Assisted Care',
      price: 1000,
      inclusions: ['Doctor Consultation', 'Translator Services'],
    },
    {
      name: 'Bangalore Interpreter Plan',
      description: 'Medical visits with interpreter support in Bangalore.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173fd1bece7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Translator-Assisted Care',
      price: 900,
      inclusions: ['Consultation', 'Translator Services'],
    },
  ];

  // Map categories to their respective icons
  const categoryIcons: Record<string, JSX.Element> = {
    'Spa & Physiotherapy': <Heart className="h-5 w-5 text-indigo-600" />,
    'Doctor Consultation': <Stethoscope className="h-5 w-5 text-indigo-600" />,
    'Lab Testing': <TestTube className="h-5 w-5 text-indigo-600" />,
    'Travel with Cab': <Car className="h-5 w-5 text-indigo-600" />,
    'Chef-Curated Meals': <ChefHat className="h-5 w-5 text-indigo-600" />,
    'Flight-Included Travel': <Plane className="h-5 w-5 text-indigo-600" />,
    'End-to-End Care': <Package className="h-5 w-5 text-indigo-600" />,
    'Flight-Free Wellness': <Heart className="h-5 w-5 text-indigo-600" />,
    'Translator-Assisted Care': <Languages className="h-5 w-5 text-indigo-600" />,
  };

  // Available categories
  const categories = [
    'All',
    'Spa & Physiotherapy',
    'Doctor Consultation',
    'Lab Testing',
    'Travel with Cab',
    'Chef-Curated Meals',
    'Flight-Included Travel',
    'End-to-End Care',
    'Flight-Free Wellness',
    'Translator-Assisted Care',
  ];

  // Memoized filtered tour plans
  const filteredTourPlans = useMemo(() => {
    let plans = tourPlans.filter((plan) => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
      const matchesPrice = plan.price >= priceRange[0] && plan.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort plans
    if (sortOption === 'priceLowToHigh') {
      plans.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighToLow') {
      plans.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popularity') {
      plans.sort((a, b) => tourPlans.indexOf(a) - tourPlans.indexOf(b)); // Maintain original order
    }

    return plans;
  }, [searchTerm, selectedCategory, priceRange, sortOption]);

  return (
    <section className="bg-gray-100 py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Medical Tourism Hero"
            className="w-full h-72 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
            <div className="text-center text-white animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Discover Medical Tourism Packages</h1>
              <p className="text-xl">Tailored plans for your health and travel needs.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
                aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
              >
                {isFilterOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
              </button>
            </div>
            <div
              className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} bg-white p-6 rounded-2xl shadow-lg bg-gradient-to-b from-white to-gray-50 mb-6 lg:mb-0 transition-all duration-300`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tour plans..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label="Search tour plans"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-indigo-600"
                  aria-label="Price range filter"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Category Selection */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Select a Plan Category
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-gray-100 hover:scale-105'
                    }`}
                    role="tab"
                    aria-selected={selectedCategory === category}
                    aria-label={`Filter by ${category}`}
                  >
                    {category !== 'All' && categoryIcons[category]}
                    <span className={category !== 'All' ? 'ml-2' : ''}>{category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div className="flex justify-end mb-6">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-gray-50"
                aria-label="Sort tour plans"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>

            {/* Tour Plans Cards */}
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Medical Tour Plans
              </h2>

              {filteredTourPlans.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No tour plans found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTourPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gradient-to-r from-indigo-100 to-purple-100"
                      role="article"
                      aria-label={plan.name}
                    >
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-56 object-cover rounded-xl mb-4"
                      />
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-50 p-2 rounded-full shadow-sm mr-3">
                          {categoryIcons[plan.category]}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800">{plan.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {plan.inclusions.map((inclusion, i) => (
                          <span
                            key={i}
                            className="inline-block bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full hover:bg-indigo-200 transition-all duration-200 cursor-default"
                            title={inclusion}
                          >
                            {inclusion}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plan.description}</p>
                      <p className="text-gray-800 text-lg font-semibold">Price: ${plan.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>
    </section>
  );
};

export default TourPlans;