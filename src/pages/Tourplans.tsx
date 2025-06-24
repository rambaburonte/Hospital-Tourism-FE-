
// import React, { useState, useMemo, useEffect } from 'react';
// import { Heart, Stethoscope, TestTube, Car, ChefHat, Plane, Package, Languages, Search, Filter, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Define the type for tour plan items
// interface TourPlan {
//   id: number;
//   name: string;
//   description: string;
//   image: string | null;
//   category: string;
//   price: number;
//   inclusions: string[];
//   durationDays: number;
//   featured: string;
// }

// // Define the type for booking status
// interface BookingStatus {
//   [key: number]: {
//     loading: boolean;
//     error: string | null;
//     success: boolean;
//   };
// }

// // Define the type for API response
// interface ApiServicePackage {
//   id: number;
//   name: string;
//   description: string;
//   totalPrice: number;
//   durationDays: number;
//   imageUrl: string | null;
//   featured: string;
//   serviceItems: { id: number; servicePackageId: number; serviceItemId: number | null }[];
// }

// // Define the type for booking response DTO
// interface BookingPackageDTO {
//   id: number;
//   userId: number;
//   servicePackageId: number;
//   bookingDate: string;
//   status: string;
//   totalPrice: number;
// }

// // Define the type for user data stored in localStorage
// interface UserData {
//   id: number;
//   email: string;
//   // Add other user fields as needed
// }

// const TourPlans: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [priceRange, setPriceRange] = useState<number[]>([0, 27500]);
//   const [sortOption, setSortOption] = useState<string>('popularity');
//   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
//   const [tourPlans, setTourPlans] = useState<TourPlan[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});

//   // Map serviceItemIds to inclusion names (assumed mapping)
//   const serviceItemMap: Record<number, string> = {
//     1: 'Spa Therapy',
//     2: 'Yoga Sessions',
//     152: 'Doctor Consultation',
//     153: 'Hotel Stay',
//     202: 'Lab Tests',
//     252: 'Cab Service',
//     302: 'Flight',
//     303: 'Translator Services',
//     304: 'Chef-Prepared Meals',
//     307: 'Physiotherapy',
//   };

//   // Map service items to categories
//   const getCategoryFromInclusions = (inclusions: string[]): string => {
//     if (inclusions.includes('Flight')) return 'Flight-Included Travel';
//     if (inclusions.includes('Translator Services')) return 'Translator-Assisted Care';
//     if (inclusions.includes('Spa Therapy') || inclusions.includes('Yoga Sessions') || inclusions.includes('Physiotherapy'))
//       return 'Spa & Physiotherapy';
//     if (inclusions.includes('Doctor Consultation')) return 'Doctor Consultation';
//     if (inclusions.includes('Lab Tests')) return 'Lab Testing';
//     if (inclusions.includes('Cab Service')) return 'Travel with Cab';
//     if (inclusions.includes('Chef-Prepared Meals')) return 'Chef-Curated Meals';
//     if (inclusions.length > 4) return 'End-to-End Care';
//     return 'Flight-Free Wellness';
//   };

//   // Fetch tour plans from API
//   useEffect(() => {
//     const fetchTourPlans = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:4545/admin/packege/All/packages', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ApiServicePackage[] = await response.json();

//         // Map API data to TourPlan interface
//         const mappedPlans: TourPlan[] = data.map((item) => ({
//           id: item.id,
//           name: item.name,
//           description: item.description.trim(),
//           image: item.imageUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
//           price: item.totalPrice,
//           durationDays: item.durationDays,
//           featured: item.featured,
//           inclusions: item.serviceItems
//             .map((si) => serviceItemMap[si.serviceItemId!])
//             .filter((inclusion): inclusion is string => inclusion !== undefined),
//           category: getCategoryFromInclusions(
//             item.serviceItems
//               .map((si) => serviceItemMap[si.serviceItemId!])
//               .filter((inclusion): inclusion is string => inclusion !== undefined)
//           ),
//         }));

//         setTourPlans(mappedPlans);
//       } catch (err) {
//         setError('Failed to fetch tour plans. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTourPlans();
//   }, []);

//   // Handle booking action
//   const handleBookPackage = async (packageId: number) => {
//     const userString = localStorage.getItem('user');
//     if (!userString) {
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: 'Please log in to book a package.', success: false },
//       }));
//       navigate('/login');
//       return;
//     }

//     let userId: number;
//     try {
//       const userData: UserData = JSON.parse(userString);
//       userId = userData.id;
//     } catch (err) {
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: 'Invalid user data. Please log in again.', success: false },
//       }));
//       navigate('/login');
//       return;
//     }

//     setBookingStatus((prev) => ({
//       ...prev,
//       [packageId]: { loading: true, error: null, success: false },
//     }));

//     try {
//       const response = await fetch(`http://localhost:4545/user/package/book/${userId}/${packageId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: BookingPackageDTO = await response.json();
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: null, success: true },
//       }));

//       // Reset success message after 5 seconds
//       setTimeout(() => {
//         setBookingStatus((prev) => ({
//           ...prev,
//           [packageId]: { loading: false, error: null, success: false },
//         }));
//       }, 5000);
//     } catch (err) {
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: 'Failed to book package. Please try again.', success: false },
//       }));
//       console.error(err);
//     }
//   };

//   // Map categories to their respective icons
//   const categoryIcons: Record<string, JSX.Element> = {
//     'Spa & Physiotherapy': <Heart className="h-5 w-5 text-[#499E14]" />,
//     'Doctor Consultation': <Stethoscope className="h-5 w-5 text-[#499E14]" />,
//     'Lab Testing': <TestTube className="h-5 w-5 text-[#499E14]" />,
//     'Travel with Cab': <Car className="h-5 w-5 text-[#499E14]" />,
//     'Chef-Curated Meals': <ChefHat className="h-5 w-5 text-[#499E14]" />,
//     'Flight-Included Travel': <Plane className="h-5 w-5 text-[#499E14]" />,
//     'End-to-End Care': <Package className="h-5 w-5 text-[#499E14]" />,
//     'Flight-Free Wellness': <Heart className="h-5 w-5 text-[#499E14]" />,
//     'Translator-Assisted Care': <Languages className="h-5 w-5 text-[#499E14]" />,
//   };

//   // Available categories (dynamically generated)
//   const categories = useMemo(() => {
//     const uniqueCategories = Array.from(new Set(tourPlans.map((plan) => plan.category)));
//     return ['All', ...uniqueCategories];
//   }, [tourPlans]);

//   // Memoized filtered tour plans
//   const filteredTourPlans = useMemo(() => {
//     const plans = tourPlans.filter((plan: TourPlan) => {
//       const matchesSearch =
//         plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
//       const matchesPrice = plan.price >= priceRange[0] && plan.price <= priceRange[1];
//       return matchesSearch && matchesCategory && matchesPrice;
//     });

//     // Sort plans
//     if (sortOption === 'priceLowToHigh') {
//       plans.sort((a: TourPlan, b: TourPlan) => a.price - b.price);
//     } else if (sortOption === 'priceHighToLow') {
//       plans.sort((a: TourPlan, b: TourPlan) => b.price - a.price);
//     } else if (sortOption === 'popularity') {
//       plans.sort((a: TourPlan, b: TourPlan) => (b.featured === 'Yes' ? 1 : -1));
//     }

//     return plans;
//   }, [searchTerm, selectedCategory, priceRange, sortOption, tourPlans]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl text-gray-600">Loading tour plans...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-100 py-16 w-full">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <div className="relative mb-12 rounded-2xl overflow-hidden shadow-xl">
//           <img
//             src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//             alt="Medical Tourism Hero"
//             className="w-full h-72 sm:h-96 object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
//             <div className="text-center text-white animate-fade-in">
//               <h1 className="text-4xl sm:text-5xl font-bold mb-4">Discover Medical Tourism Packages</h1>
//               <p className="text-xl">Tailored plans for your health and travel needs.</p>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
//           {/* Filter Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="lg:hidden flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
//               <button
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className="p-2 rounded-lg bg-[#499E14] text-white hover:bg-[#3a7e10] transition-all duration-300"
//                 aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
//               >
//                 {isFilterOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
//               </button>
//             </div>
//             <div
//               className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} bg-white p-6 rounded-2xl shadow-lg bg-gradient-to-b from-white to-gray-50 mb-6 lg:mb-0 transition-all duration-300`}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
//                   placeholder="Search tour plans..."
//                   className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
//                   aria-label="Search tour plans"
//                 />
//               </div>

//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
//               <div className="mb-6">
//                 <input
//                   type="range"
//                   min="0"
//                   max="27500"
//                   value={priceRange[1]}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     setPriceRange([0, parseInt(e.target.value)])
//                   }
//                   className="w-full accent-[#499E14]"
//                   aria-label="Price range filter"
//                 />
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>$0</span>
//                   <span>${priceRange[1]}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Category Selection */}
//             <div className="mb-10">
//               <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                 Select a Plan Category
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm ${
//                       selectedCategory === category
//                         ? 'bg-[#499E14] text-white'
//                         : 'bg-white text-gray-800 hover:bg-gray-100 hover:scale-105'
//                     }`}
//                     role="tab"
//                     aria-selected={selectedCategory === category}
//                     aria-label={`Filter by ${category}`}
//                   >
//                     {category !== 'All' && categoryIcons[category]}
//                     <span className={category !== 'All' ? 'ml-2' : ''}>{category}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sorting */}
//             <div className="flex justify-end mb-6">
//               <select
//                 value={sortOption}
//                 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:bg-gray-50"
//                 aria-label="Sort tour plans"
//               >
//                 <option value="popularity">Sort by Popularity</option>
//                 <option value="priceLowToHigh">Price: Low to High</option>
//                 <option value="priceHighToLow">Price: High to Low</option>
//               </select>
//             </div>

//             {/* Tour Plans Cards */}
//             <div>
//               <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 Medical Tour Plans
//               </h2>

//               {filteredTourPlans.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg">No tour plans found.</p>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredTourPlans.map((plan: TourPlan) => (
//                     <div
//                       key={plan.id}
//                       className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gradient-to-r from-[#e6f4e0] to-[#f0f8e8]"
//                       role="article"
//                       aria-label={plan.name}
//                     >
//                       <img
//                         src={plan.image!}
//                         alt={plan.name}
//                         className="w-full h-56 object-cover rounded-xl mb-4"
//                       />
//                       <div className="flex items-center mb-3">
//                         <div className="bg-[#f0f8e8] p-2 rounded-full shadow-sm mr-3">
//                           {categoryIcons[plan.category]}
//                         </div>
//                         <h4 className="text-xl font-semibold text-gray-800">{plan.name}</h4>
//                       </div>
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {plan.inclusions.map((inclusion, i) => (
//                           <span
//                             key={i}
//                             className="inline-block bg-[#e6f4e0] text-[#3a7e10] text-xs px-3 py-1 rounded-full hover:bg-[#d0e8b8] transition-all duration-200 cursor-default"
//                             title={inclusion}
//                           >
//                             {inclusion}
//                           </span>
//                         ))}
//                       </div>
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plan.description}</p>
//                       <p className="text-gray-800 text-lg font-semibold">Price: ${plan.price}</p>
//                       <p className="text-gray-600 text-sm mb-3">Duration: {plan.durationDays} days</p>
//                       <button
//                         onClick={() => handleBookPackage(plan.id)}
//                         disabled={bookingStatus[plan.id]?.loading}
//                         className={`w-full py-2 rounded-lg text-white font-medium transition-all duration-300 ${
//                           bookingStatus[plan.id]?.loading
//                             ? 'bg-gray-400 cursor-not-allowed'
//                             : 'bg-[#499E14] hover:bg-[#3a7e10]'
//                         }`}
//                         aria-label={`Book ${plan.name}`}
//                       >
//                         {bookingStatus[plan.id]?.loading ? 'Booking...' : 'Book Here'}
//                       </button>
//                       {bookingStatus[plan.id]?.success && (
//                         <p className="text-green-600 text-sm mt-2 text-center">Booking successful!</p>
//                       )}
//                       {bookingStatus[plan.id]?.error && (
//                         <p className="text-red-600 text-sm mt-2 text-center">
//                           {bookingStatus[plan.id].error}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 1s ease-out;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TourPlans;


















// import React, { useState, useMemo, useEffect } from 'react';
// import { Heart, Stethoscope, TestTube, Car, ChefHat, Plane, Package, Languages, Search, Filter, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Define the type for tour plan items
// interface TourPlan {
//   id: number;
//   name: string;
//   description: string;
//   image: string | null;
//   category: string;
//   price: number;
//   inclusions: string[];
//   durationDays: number;
//   featured: string;
// }

// // Define the type for booking status
// interface BookingStatus {
//   [key: number]: {
//     loading: boolean;
//     error: string | null;
//     success: boolean;
//   };
// }

// // Define the type for API response
// interface ApiServicePackage {
//   id: number;
//   name: string;
//   description: string;
//   totalPrice: number;
//   durationDays: number;
//   imageUrl: string | null;
//   featured: string;
//   serviceItems: { id: number; servicePackageId: number; serviceItemId: number | null }[];
// }

// // Define the type for booking response DTO
// interface BookingPackageDTO {
//   id: number;
//   userId: number;
//   servicePackageId: number;
//   bookingDate: string;
//   status: string;
//   totalPrice: number;
// }

// // Define the type for user data stored in localStorage
// interface UserData {
//   id: number;
//   email: string;
// }

// const TourPlans: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [priceRange, setPriceRange] = useState<number[]>([0, 27500]);
//   const [sortOption, setSortOption] = useState<string>('popularity');
//   const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
//   const [tourPlans, setTourPlans] = useState<TourPlan[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});

//   // Map serviceItemIds to inclusion names
//   const serviceItemMap: Record<number, string> = {
//     1: 'Spa Therapy',
//     2: 'Yoga Sessions',
//     152: 'Doctor Consultation',
//     153: 'Hotel Stay',
//     202: 'Lab Tests',
//     252: 'Cab Service',
//     302: 'Flight',
//     303: 'Translator Services',
//     304: 'Chef-Prepared Meals',
//     307: 'Physiotherapy',
//   };

//   // Map service items to categories
//   const getCategoryFromInclusions = (inclusions: string[]): string => {
//     if (inclusions.includes('Flight')) return 'Flight-Included Travel';
//     if (inclusions.includes('Translator Services')) return 'Translator-Assisted Care';
//     if (inclusions.includes('Spa Therapy') || inclusions.includes('Yoga Sessions') || inclusions.includes('Physiotherapy'))
//       return 'Spa & Physiotherapy';
//     if (inclusions.includes('Doctor Consultation')) return 'Doctor Consultation';
//     if (inclusions.includes('Lab Tests')) return 'Lab Testing';
//     if (inclusions.includes('Cab Service')) return 'Travel with Cab';
//     if (inclusions.includes('Chef-Prepared Meals')) return 'Chef-Curated Meals';
//     if (inclusions.length > 4) return 'End-to-End Care';
//     return 'Flight-Free Wellness';
//   };

//   // Fetch tour plans from API
//   useEffect(() => {
//     const fetchTourPlans = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:4545/admin/packege/All/packages', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: ApiServicePackage[] = await response.json();

//         // Map API data to TourPlan interface
//         const mappedPlans: TourPlan[] = data.map((item) => ({
//           id: item.id,
//           name: item.name,
//           description: item.description.trim(),
//           image: item.imageUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
//           price: item.totalPrice,
//           durationDays: item.durationDays,
//           featured: item.featured,
//           inclusions: item.serviceItems
//             .map((si) => serviceItemMap[si.serviceItemId!])
//             .filter((inclusion): inclusion is string => inclusion !== undefined),
//           category: getCategoryFromInclusions(
//             item.serviceItems
//               .map((si) => serviceItemMap[si.serviceItemId!])
//               .filter((inclusion): inclusion is string => inclusion !== undefined)
//           ),
//         }));

//         setTourPlans(mappedPlans);
//       } catch (err) {
//         setError('Failed to fetch tour plans. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTourPlans();
//   }, []);

//   // Handle booking action
//   const handleBookPackage = async (packageId: number) => {
//     const userString = localStorage.getItem('user');
//     if (!userString) {
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: 'Please log in to book a package.', success: false },
//       }));
//       navigate('/login');
//       return;
//     }

//     let userId: number;
//     try {
//       const userData: UserData = JSON.parse(userString);
//       userId = userData.id;
//     } catch (err) {
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: 'Invalid user data. Please log in again.', success: false },
//       }));
//       navigate('/login');
//       return;
//     }

//     setBookingStatus((prev) => ({
//       ...prev,
//       [packageId]: { loading: true, error: null, success: false },
//     }));

//     try {
//       const response = await fetch(`http://localhost:4545/user/package/book/${userId}/${packageId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: BookingPackageDTO = await response.json();
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: null, success: true },
//       }));

//       // Reset success message after 5 seconds
//       setTimeout(() => {
//         setBookingStatus((prev) => ({
//           ...prev,
//           [packageId]: { loading: false, error: null, success: false },
//         }));
//       }, 5000);
//     } catch (err) {
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: 'Failed to book package. Please try again.', success: false },
//       }));
//       console.error(err);
//     }
//   };

//   // Map categories to their respective icons
//   const categoryIcons: Record<string, JSX.Element> = {
//     'Spa & Physiotherapy': <Heart className="h-5 w-5 text-teal-600" />,
//     'Doctor Consultation': <Stethoscope className="h-5 w-5 text-teal-600" />,
//     'Lab Testing': <TestTube className="h-5 w-5 text-teal-600" />,
//     'Travel with Cab': <Car className="h-5 w-5 text-teal-600" />,
//     'Chef-Curated Meals': <ChefHat className="h-5 w-5 text-teal-600" />,
//     'Flight-Included Travel': <Plane className="h-5 w-5 text-teal-600" />,
//     'End-to-End Care': <Package className="h-5 w-5 text-teal-600" />,
//     'Flight-Free Wellness': <Heart className="h-5 w-5 text-teal-600" />,
//     'Translator-Assisted Care': <Languages className="h-5 w-5 text-teal-600" />,
//   };

//   // Available categories (dynamically generated)
//   const categories = useMemo(() => {
//     const uniqueCategories = Array.from(new Set(tourPlans.map((plan) => plan.category)));
//     return ['All', ...uniqueCategories];
//   }, [tourPlans]);

//   // Memoized filtered tour plans
//   const filteredTourPlans = useMemo(() => {
//     const plans = tourPlans.filter((plan: TourPlan) => {
//       const matchesSearch =
//         plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
//       const matchesPrice = plan.price >= priceRange[0] && plan.price <= priceRange[1];
//       return matchesSearch && matchesCategory && matchesPrice;
//     });

//     // Sort plans
//     if (sortOption === 'priceLowToHigh') {
//       plans.sort((a: TourPlan, b: TourPlan) => a.price - b.price);
//     } else if (sortOption === 'priceHighToLow') {
//       plans.sort((a: TourPlan, b: TourPlan) => b.price - a.price);
//     } else if (sortOption === 'popularity') {
//       plans.sort((a: TourPlan, b: TourPlan) => (b.featured === 'Yes' ? 1 : -1));
//     }

//     return plans;
//   }, [searchTerm, selectedCategory, priceRange, sortOption, tourPlans]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <p className="text-2xl font-medium text-gray-700 animate-pulse">Loading tour plans...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <p className="text-2xl font-medium text-red-600">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-50 py-12 w-full min-h-screen">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
//         {/* Hero Section */}
//         <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl">
//           <img
//             src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
//             alt="Medical Tourism Hero"
//             className="w-full h-64 sm:h-80 lg:h-96 object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center">
//             <div className="text-center text-white animate-slide-up">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
//                 Explore Medical Tourism Packages
//               </h1>
//               <p className="text-lg sm:text-xl lg:text-2xl font-light">Personalized health and travel experiences await you.</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filter Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="lg:hidden flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
//               <button
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className="p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300"
//                 aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
//               >
//                 {isFilterOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
//               </button>
//             </div>
//             <div
//               className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} bg-white p-6 rounded-3xl shadow-xl sticky top-6 transition-all duration-300`}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
//                   placeholder="Search tour plans..."
//                   className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
//                   aria-label="Search tour plans"
//                 />
//               </div>

//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
//               <div className="mb-6">
//                 <input
//                   type="range"
//                   min="0"
//                   max="27500"
//                   value={priceRange[1]}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     setPriceRange([0, parseInt(e.target.value)])
//                   }
//                   className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-teal-600"
//                   aria-label="Price range filter"
//                 />
//                 <div className="flex justify-between text-sm text-gray-600 mt-2">
//                   <span>$0</span>
//                   <span>${priceRange[1]}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:w-3/4">
//             {/* Category Selection */}
//             <div className="mb-10">
//               <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
//                 Choose Your Plan Category
//               </h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-md ${
//                       selectedCategory === category
//                         ? 'bg-teal-600 text-white shadow-lg'
//                         : 'bg-white text-gray-700 hover:bg-teal-50 hover:shadow-lg hover:scale-105'
//                     }`}
//                     role="tab"
//                     aria-selected={selectedCategory === category}
//                     aria-label={`Filter by ${category}`}
//                   >
//                     {category !== 'All' && categoryIcons[category]}
//                     <span className={category !== 'All' ? 'ml-2' : ''}>{category}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sorting */}
//             <div className="flex justify-end mb-6">
//               <select
//                 value={sortOption}
//                 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value)}
//                 className="p-3 border border-gray-200 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:bg-teal-50 text-sm"
//                 aria-label="Sort tour plans"
//               >
//                 <option value="popularity">Sort by Popularity</option>
//                 <option value="priceLowToHigh">Price: Low to High</option>
//                 <option value="priceHighToLow">Price: High to Low</option>
//               </select>
//             </div>

//             {/* Tour Plans Cards */}
//             <div>
//               <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8">
//                 Medical Tour Plans
//               </h2>

//               {filteredTourPlans.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg font-medium">No tour plans found.</p>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//                   {filteredTourPlans.map((plan: TourPlan) => (
//                     <div
//                       key={plan.id}
//                       className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-teal-50"
//                       role="article"
//                       aria-label={plan.name}
//                     >
//                       <img
//                         src={plan.image!}
//                         alt={plan.name}
//                         className="w-full h-48 object-cover rounded-2xl mb-4"
//                       />
//                       <div className="flex items-center mb-3">
//                         <div className="bg-teal-50 p-2 rounded-full shadow-sm mr-2">
//                           {categoryIcons[plan.category]}
//                         </div>
//                         <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">{plan.name}</h4>
//                       </div>
//                       <div className="flex flex-wrap gap-1.5 mb-3">
//                         {plan.inclusions.map((inclusion, i) => (
//                           <span
//                             key={i}
//                             className="inline-block bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full hover:bg-teal-100 transition-all duration-200 cursor-default"
//                             title={inclusion}
//                           >
//                             {inclusion}
//                           </span>
//                         ))}
//                       </div>
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plan.description}</p>
//                       <p className="text-gray-800 text-base font-semibold">Price: ${plan.price}</p>
//                       <p className="text-gray-600 text-sm mb-4">Duration: {plan.durationDays} days</p>
//                       <button
//                         onClick={() => handleBookPackage(plan.id)}
//                         disabled={bookingStatus[plan.id]?.loading}
//                         className={`w-full py-2.5 rounded-xl text-white font-medium text-sm transition-all duration-300 ${
//                           bookingStatus[plan.id]?.loading
//                             ? 'bg-gray-400 cursor-not-allowed'
//                             : 'bg-teal-600 hover:bg-teal-700'
//                         }`}
//                         aria-label={`Book ${plan.name}`}
//                       >
//                         {bookingStatus[plan.id]?.loading ? 'Booking...' : 'Book Now'}
//                       </button>
//                       {bookingStatus[plan.id]?.success && (
//                         <p className="text-teal-600 text-xs mt-2 text-center font-medium">Booking successful!</p>
//                       )}
//                       {bookingStatus[plan.id]?.error && (
//                         <p className="text-red-600 text-xs mt-2 text-center font-medium">
//                           {bookingStatus[plan.id].error}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out;
//         }
//         input[type='range']::-webkit-slider-thumb {
//           appearance: none;
//           width: 16px;
//           height: 16px;
//           background: #2dd4bf;
//           border-radius: 50%;
//           cursor: pointer;
//           box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.2);
//         }
//         input[type='range']::-moz-range-thumb {
//           width: 16px;
//           height: 16px;
//           background: #2dd4bf;
//           border-radius: 50%;
//           cursor: pointer;
//           box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.2);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default TourPlans;












import React, { useState, useMemo, useEffect } from 'react';
import { Heart, Stethoscope, TestTube, Car, ChefHat, Plane, Package, Languages, Search, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the type for tour plan items
interface TourPlan {
  id: number;
  name: string;
  description: string;
  image: string | null;
  category: string;
  price: number;
  inclusions: string[];
  durationDays: number;
  featured: string;
}

// Define the type for booking status
interface BookingStatus {
  [key: number]: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

// Define the type for API response
interface ApiServicePackage {
  id: number;
  name: string;
  description: string;
  totalPrice: number;
  durationDays: number;
  imageUrl: string | null;
  featured: string;
  serviceItems: { id: number; servicePackageId: number; serviceItemId: number | null }[];
}

// Define the type for bookingSNS_1.0
// booking response DTO
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
}

const TourPlans: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number[]>([0, 27500]);
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [tourPlans, setTourPlans] = useState<TourPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});

  // Map serviceItemIds to inclusion names
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

  // Map service items to categories
  const getCategoryFromInclusions = (inclusions: string[]): string => {
    if (inclusions.includes('Flight')) return 'Flight-Included Travel';
    if (inclusions.includes('Translator Services')) return 'Translator-Assisted Care';
    if (inclusions.includes('Spa Therapy') || inclusions.includes('Yoga Sessions') || inclusions.includes('Physiotherapy'))
      return 'Spa & Physiotherapy';
    if (inclusions.includes('Doctor Consultation')) return 'Doctor Consultation';
    if (inclusions.includes('Lab Tests')) return 'Lab Testing';
    if (inclusions.includes('Cab Service')) return 'Travel with Cab';
    if (inclusions.includes('Chef-Prepared Meals')) return 'Chef-Curated Meals';
    if (inclusions.length > 4) return 'End-to-End Care';
    return 'Flight-Free Wellness';
  };

  // Fetch tour plans from API
  useEffect(() => {
    const fetchTourPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4545/admin/packege/All/packages', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiServicePackage[] = await response.json();

        // Map API data to TourPlan interface
        const mappedPlans: TourPlan[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description.trim(),
          image: item.imageUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          price: item.totalPrice,
          durationDays: item.durationDays,
          featured: item.featured,
          inclusions: item.serviceItems
            .map((si) => serviceItemMap[si.serviceItemId!])
            .filter((inclusion): inclusion is string => inclusion !== undefined),
          category: getCategoryFromInclusions(
            item.serviceItems
              .map((si) => serviceItemMap[si.serviceItemId!])
              .filter((inclusion): inclusion is string => inclusion !== undefined)
          ),
        }));

        setTourPlans(mappedPlans);
      } catch (err) {
        setError('Failed to fetch tour plans. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourPlans();
  }, []);

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
      const response = await fetch(`http://localhost:4545/user/package/book/${userId}/${packageId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BookingPackageDTO = await response.json();
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

  // Map categories to their respective icons
  const categoryIcons: Record<string, JSX.Element> = {
    'Spa & Physiotherapy': <Heart className="h-5 w-5 text-[#499E14]" />,
    'Doctor Consultation': <Stethoscope className="h-5 w-5 text-[#499E14]" />,
    'Lab Testing': <TestTube className="h-5 w-5 text-[#499E14]" />,
    'Travel with Cab': <Car className="h-5 w-5 text-[#499E14]" />,
    'Chef-Curated Meals': <ChefHat className="h-5 w-5 text-[#499E14]" />,
    'Flight-Included Travel': <Plane className="h-5 w-5 text-[#499E14]" />,
    'End-to-End Care': <Package className="h-5 w-5 text-[#499E14]" />,
    'Flight-Free Wellness': <Heart className="h-5 w-5 text-[#499E14]" />,
    'Translator-Assisted Care': <Languages className="h-5 w-5 text-[#499E14]" />,
  };

  // Available categories (dynamically generated)
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(tourPlans.map((plan) => plan.category)));
    return ['All', ...uniqueCategories];
  }, [tourPlans]);

// Memoized filtered tour plans
const filteredTourPlans = useMemo(() => {
  const plans = tourPlans.filter((plan: TourPlan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
    const matchesPrice = plan.price >= priceRange[0] && plan.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort plans
  if (sortOption === 'priceLowToHigh') {
    plans.sort((a: TourPlan, b: TourPlan) => a.price - b.price);
  } else if (sortOption === 'priceHighToLow') {
    plans.sort((a: TourPlan, b: TourPlan) => b.price - a.price);
  } else if (sortOption === 'popularity') {
    plans.sort((a: TourPlan, b: TourPlan) => (b.featured === 'Yes' ? 1 : -1));
  }

  return plans;
}, [searchTerm, selectedCategory, priceRange, sortOption, tourPlans]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-2xl font-medium text-gray-700 animate-pulse">Loading tour plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-2xl font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12 w-full min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Hero Section */}
        <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
            alt="Medical Tourism Hero"
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center">
            <div className="text-center text-white animate-slide-up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
                Explore Medical Tourism Packages
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-light">Personalized health and travel experiences await you.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded-full bg-[#499E14] text-white hover:bg-[#3D7E11] transition-all duration-300"
                aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
              >
                {isFilterOpen ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
              </button>
            </div>
            <div
              className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} bg-white p-6 rounded-3xl shadow-xl sticky top-6 transition-all duration-300`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search</h3>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  placeholder="Search tour plans..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
                  aria-label="Search tour plans"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="27500"
                  value={priceRange[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPriceRange([0, parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#499E14]"
                  aria-label="Price range filter"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
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
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
                Choose Your Plan Category
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-md ${
                      selectedCategory === category
                        ? 'bg-[#499E14] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-[#E6F3DA] hover:shadow-lg hover:scale-105'
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value)}
                className="p-3 border border-gray-200 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:bg-[#E6F3DA] text-sm"
                aria-label="Sort tour plans"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>

            {/* Tour Plans Cards */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8">
                Medical Tour Plans
              </h2>

              {filteredTourPlans.length === 0 ? (
                <p className="text-center text-gray-600 text-lg font-medium">No tour plans found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {filteredTourPlans.map((plan: TourPlan) => (
                    <div
                      key={plan.id}
                      className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-[#E6F3DA]"
                      role="article"
                      aria-label={plan.name}
                    >
                      <img
                        src={plan.image!}
                        alt={plan.name}
                        className="w-full h-48 object-cover rounded-2xl mb-4"
                      />
                      <div className="flex items-center mb-3">
                        <div className="bg-[#E6F3DA] p-2 rounded-full shadow-sm mr-2">
                          {categoryIcons[plan.category]}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">{plan.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {plan.inclusions.map((inclusion, i) => (
                          <span
                            key={i}
                            className="inline-block bg-[#E6F3DA] text-[#499E14] text-xs px-2 py-1 rounded-full hover:bg-[#D1E8B7] transition-all duration-200 cursor-default"
                            title={inclusion}
                          >
                            {inclusion}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plan.description}</p>
                      <p className="text-gray-800 text-base font-semibold">Price: ${plan.price}</p>
                      <p className="text-gray-600 text-sm mb-4">Duration: {plan.durationDays} days</p>
                      <button
                        onClick={() => handleBookPackage(plan.id)}
                        disabled={bookingStatus[plan.id]?.loading}
                        className={`w-full py-2.5 rounded-xl text-white font-medium text-sm transition-all duration-300 ${
                          bookingStatus[plan.id]?.loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#499E14] hover:bg-[#3D7E11]'
                        }`}
                        aria-label={`Book ${plan.name}`}
                      >
                        {bookingStatus[plan.id]?.loading ? 'Booking...' : 'Book Now'}
                      </button>
                      {bookingStatus[plan.id]?.success && (
                        <p className="text-[#499E14] text-xs mt-2 text-center font-medium">Booking successful!</p>
                      )}
                      {bookingStatus[plan.id]?.error && (
                        <p className="text-red-600 text-xs mt-2 text-center font-medium">
                          {bookingStatus[plan.id].error}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #499E14;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(73, 158, 20, 0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #499E14;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(73, 158, 20, 0.2);
        }
      `}</style>
    </section>
  );
};

export default TourPlans;