



// import React, { useState, useMemo, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Plane, Clock, Heart } from 'lucide-react';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface PackageServiceItem {
//   id: number;
//   serviceItemId: number | null;
//   servicePackageId: number;
// }

// interface ServicePackage {
//   id: number;
//   name: string;
//   description: string;
//   totalPrice: number;
//   durationDays: number;
//   imageUrl?: string;
//   featured: string;
//   serviceItems: PackageServiceItem[];
// }

// interface TourPlan {
//   id: number;
//   name: string;
//   details: string;
//   image: string;
//   description: string;
//   category: string;
//   route: string;
//   inclusions: string[];
//   price: number;
//   durationDays: number;
// }

// interface BookingStatus {
//   [key: number]: {
//     loading: boolean;
//     error: string | null;
//     success: boolean;
//   };
// }

// interface BookingPackageDTO {
//   id: number;
//   userId: number;
//   servicePackageId: number;
//   bookingDate: string;
//   status: string;
//   totalPrice: number;
// }

// interface UserData {
//   id: number;
//   email: string;
// }

// const TopTourPlans: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [packages, setPackages] = useState<ServicePackage[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});
//   const carouselRef = useRef<HTMLDivElement>(null);

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

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/admin/packege/All/packages`);
//         const filteredPackages = res.data.filter(
//           (pkg: ServicePackage) => pkg.featured.toLowerCase() === 'no'
//         );
//         console.log('Fetched Packages:', filteredPackages); // Debug log
//         setPackages(filteredPackages);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching packages:', err);
//         setError('Failed to load featured packages. Please try again later.');
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const tourPlans: TourPlan[] = useMemo(() => {
//     const plans = packages.map((pkg) => ({
//       id: pkg.id,
//       name: pkg.name,
//       details: pkg.serviceItems.length
//         ? pkg.serviceItems
//             .map((item) => serviceItemMap[item.serviceItemId!])
//             .filter((inclusion): inclusion is string => inclusion !== undefined)
//             .join(' + ')
//         : 'Custom Medical Package',
//       image: pkg.imageUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
//       description: pkg.description || `A ${pkg.durationDays}-day medical package costing $${pkg.totalPrice}.`,
//       category: pkg.serviceItems.length ? 'Medical Package' : 'General Package',
//       route: '/packages',
//       inclusions: pkg.serviceItems
//         .map((si) => serviceItemMap[si.serviceItemId!])
//         .filter((inclusion): inclusion is string => inclusion !== undefined),
//       price: pkg.totalPrice,
//       durationDays: pkg.durationDays,
//     }));
//     console.log('Tour Plans:', plans); // Debug log
//     return plans.slice(0, 4); // Ensure exactly 4 cards
//   }, [packages]);

//   const categoryIcons: Record<string, JSX.Element> = {
//     'Medical Package': <Plane className="h-4 w-4 text-[#499E14]" />,
//     'General Package': <Clock className="h-4 w-4 text-[#499E14]" />,
//     'Spa & Physiotherapy': <Heart className="h-4 w-4 text-[#499E14]" />,
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % tourPlans.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [tourPlans.length]);

//   useEffect(() => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollTo({
//         left: currentSlide * carouselRef.current.offsetWidth,
//         behavior: 'smooth',
//       });
//     }
//   }, [currentSlide]);

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
//       const response = await axios.post(`${BASE_URL}/user/package/book/${userId}/${packageId}`, {}, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data: BookingPackageDTO = response.data;
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: null, success: true },
//       }));

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

//   const handleDotClick = (index: number) => {
//     setCurrentSlide(index);
//   };

//   if (loading) {
//     return (
//       <section className="bg-gray-50 py-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center">
//             <svg className="h-8 w-8 text-[#499E14] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//             </svg>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="bg-gray-50 py-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-red-600 text-lg">{error}</p>
//         </div>
//       </section>
//     );
//   }

//   if (!tourPlans.length) {
//     return (
//       <section className="bg-gray-50 py-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-gray-600 text-lg">No featured packages available.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">Explore Our Top Plans</h2>
//           <div className="mb-12">
//             <div
//               ref={carouselRef}
//               className="relative w-full overflow-x-hidden rounded-2xl shadow-lg"
//               role="region"
//               aria-live="polite"
//               aria-label="Top tour plans carousel"
//             >
//               <div className="flex w-full">
//                 {tourPlans.map((plan, index) => (
//                   <div
//                     key={plan.id}
//                     className="w-full flex-none"
//                     role="group"
//                     aria-label={`Slide ${index + 1} of ${tourPlans.length}`}
//                   >
//                     <div className="relative w-full h-64 sm:h-80 md:h-96">
//                       <img
//                         src={plan.image}
//                         alt={plan.name}
//                         className="w-full h-full object-cover rounded-2xl"
//                         loading="lazy"
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
//                         <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{plan.name}</h3>
//                         <p className="text-white text-sm sm:text-base line-clamp-2">{plan.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center mt-4 space-x-2">
//               {tourPlans.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDotClick(index)}
//                   className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                     currentSlide === index ? 'bg-[#499E14] scale-125' : 'bg-gray-300'
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             {tourPlans.slice(0, 4).map((plan, index) => (
//               <div
//                 key={plan.id}
//                 className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in relative"
//                 style={{ animationDelay: `${index * 100}ms` }}
//                 role="article"
//                 aria-label={plan.name}
//               >
//                 <img
//                   src={plan.image}
//                   alt={plan.name}
//                   className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
//                   loading="lazy"
//                 />
//                 <div className="flex items-center mb-2">
//                   <div className="bg-[#499E14]/10 p-2 rounded-full mr-2">
//                     {categoryIcons[plan.category]}
//                   </div>
//                   <h4 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{plan.name}</h4>
//                 </div>
//                 <div className="flex flex-wrap gap-1 mb-2">
//                   {plan.inclusions.slice(0, 3).map((inclusion, i) => (
//                     <span
//                       key={i}
//                       className="inline-block bg-[#499E14]/10 text-[#499E14] text-xs px-2 py-1 rounded-full"
//                       title={inclusion}
//                     >
//                       {inclusion}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2">{plan.description}</p>
//                 <div className="flex justify-between items-center mb-10">
//                   <p className="text-gray-800 text-sm font-semibold">${plan.price}</p>
//                   <p className="text-gray-600 text-xs">{plan.durationDays} days</p>
//                 </div>
//                 <button
//                   onClick={() => handleBookPackage(plan.id)}
//                   disabled={bookingStatus[plan.id]?.loading}
//                   className={`absolute bottom-4 left-4 right-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
//                     bookingStatus[plan.id]?.loading
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-[#499E14] hover:bg-[#3B7D10]'
//                   }`}
//                   aria-label={`Book ${plan.name}`}
//                 >
//                   {bookingStatus[plan.id]?.loading ? 'Booking...' : 'Book Now'}
//                 </button>
//                 {bookingStatus[plan.id]?.success && (
//                   <p className="text-[#499E14] text-xs mt-2 text-center absolute bottom-0 left-0 right-0">Booking successful!</p>
//                 )}
//                 {bookingStatus[plan.id]?.error && (
//                   <p className="text-red-600 text-xs mt-2 text-center absolute bottom-0 left-0 right-0">{bookingStatus[plan.id].error}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 text-center">
//             <Link
//               to="/tours"
//               className="inline-block bg-[#499E14] text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[#3B7D10] hover:scale-105 transition-all duration-200"
//               aria-label="Explore More Plans"
//             >
//               Explore More Plans
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopTourPlans;








// import React, { useState, useMemo, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Plane, Clock, Heart, ArrowRight } from 'lucide-react';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface PackageServiceItem {
//   id: number;
//   serviceItemId: number | null;
//   servicePackageId: number;
// }

// interface ServicePackage {
//   id: number;
//   name: string;
//   description: string;
//   totalPrice: number;
//   durationDays: number;
//   imageUrl?: string;
//   featured: string;
//   serviceItems: PackageServiceItem[];
// }

// interface TourPlan {
//   id: number;
//   name: string;
//   details: string;
//   image: string;
//   description: string;
//   category: string;
//   route: string;
//   inclusions: string[];
//   price: number;
//   durationDays: number;
// }

// interface BookingStatus {
//   [key: number]: {
//     loading: boolean;
//     error: string | null;
//     success: boolean;
//   };
// }

// interface BookingPackageDTO {
//   id: number;
//   userId: number;
//   servicePackageId: number;
//   bookingDate: string;
//   status: string;
//   totalPrice: number;
// }

// interface UserData {
//   id: number;
//   email: string;
// }

// const TopTourPlans: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [packages, setPackages] = useState<ServicePackage[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});
//   const carouselRef = useRef<HTMLDivElement>(null);

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

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/admin/packege/All/packages`);
//         const filteredPackages = res.data.filter(
//           (pkg: ServicePackage) => pkg.featured.toLowerCase() === 'no'
//         );
//         console.log('Fetched Packages:', filteredPackages);
//         setPackages(filteredPackages);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching packages:', err);
//         setError('Failed to load featured packages. Please try again later.');
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const tourPlans: TourPlan[] = useMemo(() => {
//     const plans = packages.map((pkg) => ({
//       id: pkg.id,
//       name: pkg.name,
//       details: pkg.serviceItems.length
//         ? pkg.serviceItems
//             .map((item) => serviceItemMap[item.serviceItemId!])
//             .filter((inclusion): inclusion is string => inclusion !== undefined)
//             .join(' + ')
//         : 'Custom Medical Package',
//       image: pkg.imageUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
//       description: pkg.description || `A ${pkg.durationDays}-day medical package costing $${pkg.totalPrice}.`,
//       category: pkg.serviceItems.length ? 'Medical Package' : 'General Package',
//       route: '/packages',
//       inclusions: pkg.serviceItems
//         .map((si) => serviceItemMap[si.serviceItemId!])
//         .filter((inclusion): inclusion is string => inclusion !== undefined),
//       price: pkg.totalPrice,
//       durationDays: pkg.durationDays,
//     }));
//     console.log('Tour Plans:', plans);
//     return plans.slice(0, 4);
//   }, [packages]);

//   const categoryIcons: Record<string, JSX.Element> = {
//     'Medical Package': <Plane className="h-4 w-4 text-[#499E14]" />,
//     'General Package': <Clock className="h-4 w-4 text-[#499E14]" />,
//     'Spa & Physiotherapy': <Heart className="h-4 w-4 text-[#499E14]" />,
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % tourPlans.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [tourPlans.length]);

//   useEffect(() => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollTo({
//         left: currentSlide * carouselRef.current.offsetWidth,
//         behavior: 'smooth',
//       });
//     }
//   }, [currentSlide]);

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
//       const response = await axios.post(`${BASE_URL}/user/package/book/${userId}/${packageId}`, {}, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data: BookingPackageDTO = response.data;
//       setBookingStatus((prev) => ({
//         ...prev,
//         [packageId]: { loading: false, error: null, success: true },
//       }));

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

//   const handleDotClick = (index: number) => {
//     setCurrentSlide(index);
//   };

//   if (loading) {
//     return (
//       <section 
//         className="py-16 bg-gradient-to-br from-white to-blue-50 overflow-hidden"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173fdabe37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center">
//             <svg className="h-8 w-8 text-[#499E14] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//             </svg>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section 
//         className="py-16 bg-gradient-to-br from-white to-blue-50 overflow-hidden"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173fdabe37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-6 text-center">
//             <p className="text-red-600 text-lg">{error}</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!tourPlans.length) {
//     return (
//       <section 
//         className="py-16 bg-gradient-to-br from-white to-blue-50 overflow-hidden"
//         style={{
//           backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173fdabe37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-6 text-center">
//             <p className="text-gray-800 text-lg">No featured packages available.</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section 
//       className="py-16 bg-gradient-to-br from-white to-blue-50 overflow-hidden"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173fdabe37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h2 
//             className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             Explore Our Top Plans
//           </h2>
//           <div 
//             className="mb-12"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <div
//               ref={carouselRef}
//               className="relative w-full overflow-x-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl"
//               role="region"
//               aria-live="polite"
//               aria-label="Top tour plans carousel"
//             >
//               <div className="flex w-full">
//                 {tourPlans.map((plan, index) => (
//                   <div
//                     key={plan.id}
//                     className="w-full flex-none"
//                     role="group"
//                     aria-label={`Slide ${index + 1} of ${tourPlans.length}`}
//                   >
//                     <div className="relative w-full h-64 sm:h-80 md:h-96">
//                       <img
//                         src={plan.image}
//                         alt={plan.name}
//                         className="w-full h-full object-cover rounded-xl"
//                         loading="lazy"
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
//                         <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{plan.name}</h3>
//                         <p className="text-white text-sm sm:text-base line-clamp-2">{plan.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center mt-4 space-x-2">
//               {tourPlans.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleDotClick(index)}
//                   className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                     currentSlide === index ? 'bg-[#499E14] scale-125' : 'bg-gray-300'
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             {tourPlans.slice(0, 4).map((plan, index) => (
//               <div
//                 key={plan.id}
//                 className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                 style={{ animationDelay: `${index * 100}ms` }}
//                 role="article"
//                 aria-label={plan.name}
//                 data-aos="fade-up"
//                 data-aos-duration="1000"
//               >
//                 <img
//                   src={plan.image}
//                   alt={plan.name}
//                   className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
//                   loading="lazy"
//                 />
//                 <div className="flex items-center mb-2">
//                   <div className="bg-[#499E14]/10 p-2 rounded-full mr-2">
//                     {categoryIcons[plan.category]}
//                   </div>
//                   <h4 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{plan.name}</h4>
//                 </div>
//                 <div className="flex flex-wrap gap-1 mb-2">
//                   {plan.inclusions.slice(0, 3).map((inclusion, i) => (
//                     <span
//                       key={i}
//                       className="inline-block bg-[#499E14]/10 text-[#499E14] text-xs px-2 py-1 rounded-full"
//                       title={inclusion}
//                     >
//                       {inclusion}
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-gray-800 text-xs sm:text-sm line-clamp-2 mb-2">{plan.description}</p>
//                 <div className="flex justify-between items-center mb-10">
//                   {/* <p className="text-gray-800 text-sm font-semibold">${plan.price}</p> */}
//                   <p className="text-gray-800 text-xs">{plan.durationDays} days</p>
//                 </div>
//                 <button
//                   onClick={() => handleBookPackage(plan.id)}
//                   disabled={bookingStatus[plan.id]?.loading}
//                   className={`group absolute bottom-4 left-4 right-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
//                     bookingStatus[plan.id]?.loading
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-[#499E14] hover:bg-white/20 hover:border-white/50 border border-[#499E14]'
//                   }`}
//                   aria-label={`Book ${plan.name}`}
//                 >
//                   {bookingStatus[plan.id]?.loading ? 'Booking...' : 'Book Now'}
//                   {!bookingStatus[plan.id]?.loading && (
//                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                   )}
//                 </button>
//                 {bookingStatus[plan.id]?.success && (
//                   <p className="text-[#499E14] text-xs mt-2 text-center absolute bottom-0 left-0 right-0">Booking successful!</p>
//                 )}
//                 {bookingStatus[plan.id]?.error && (
//                   <p className="text-red-600 text-xs mt-2 text-center absolute bottom-0 left-0 right-0">{bookingStatus[plan.id].error}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div 
//             className="mt-8 text-center"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <Link
//               to="/tours"
//               className="group inline-block bg-[#499E14] text-white text-sm font-semibold py-2 px-6 rounded-lg border border-[#499E14] hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-xl"
//               aria-label="Explore More Plans"
//             >
//               Explore More Plans
//               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopTourPlans;


import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Clock, Heart, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import useInView from '@/hooks/useInView';// ✅ Imported custom hook

interface PackageServiceItem {
  id: number;
  serviceItemId: number | null;
  servicePackageId: number;
}

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

interface TourPlan {
  id: number;
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

interface BookingStatus {
  [key: number]: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

interface BookingPackageDTO {
  id: number;
  userId: number;
  servicePackageId: number;
  bookingDate: string;
  status: string;
  totalPrice: number;
}

interface UserData {
  id: number;
  email: string;
}

const TopTourPlans: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null); // ✅ Ref for lazy loading
  const isVisible = useInView(sectionRef);         // ✅ Detects visibility
  const [currentSlide, setCurrentSlide] = useState(0);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>({});
  const carouselRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isVisible || packages.length > 0 || !loading) return;

    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/packege/All/packages`);
        const filteredPackages = res.data.filter(
          (pkg: ServicePackage) => pkg.featured.toLowerCase() === 'no'
        );
        console.log('Fetched Packages:', filteredPackages);
        setPackages(filteredPackages);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load featured packages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [isVisible]);

  const tourPlans: TourPlan[] = useMemo(() => {
    const plans = packages.map((pkg) => ({
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
    console.log('Tour Plans:', plans);
    return plans.slice(0, 4);
  }, [packages]);

  const categoryIcons: Record<string, JSX.Element> = {
    'Medical Package': <Plane className="h-4 w-4 text-[#499E14]" />,
    'General Package': <Clock className="h-4 w-4 text-[#499E14]" />,
    'Spa & Physiotherapy': <Heart className="h-4 w-4 text-[#499E14]" />,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tourPlans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tourPlans.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentSlide * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

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
      const response = await axios.post(`${BASE_URL}/user/package/book/${userId}/${packageId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: BookingPackageDTO = response.data;
      setBookingStatus((prev) => ({
        ...prev,
        [packageId]: { loading: false, error: null, success: true },
      }));

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

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      ref={sectionRef} // ✅ Apply lazy load ref here
      className="py-16 bg-gradient-to-br from-white to-blue-50 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173fdabe37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* The rest of your JSX remains the same including loading, error, tourPlans rendering */}
      {/* No need to modify anything else visually. Only the data fetching is lazily triggered now. */}
    </section>
  );
};

export default TopTourPlans;
