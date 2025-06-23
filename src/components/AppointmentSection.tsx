
// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Search, User, Hotel, Plane, Pill } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
// import { FaSpa, FaUtensils } from 'react-icons/fa';
// import { TbPhysotherapist } from 'react-icons/tb';
// import axios from 'axios';
// import { BASE_URL, API_ENDPOINTS } from '@/config/config';
// import WishlistButton, { ServiceType } from './WishlistButton';

// interface Doctor {
//   id: number;
//   name: string;
//   email: string;
//   rating: number;
//   description: string;
//   department: string;
//   profilepic: string;
//   hospital: {
//     hospitalId: number;
//     hospitalName: string;
//     hospitalDescription: string;
//     hospitalImage: string;
//     rating: string;
//     address: string;
//     status: string;
//   };
//   status: string | null;
// }

// interface LabTest {
//   id: number;
//   testTitle: string;
//   testDepartment: string;
//   testDescription: string;
//   testImage?: string;
//   status?: string;
// }

// interface Hospital {
//   hospitalId: number;
//   hospitalName: string;
//   address: string;
//   hospitalDescription: string;
//   hospitalImage?: string;
//   status?: string;
// }

// interface ServiceItem {
//   // Common properties
//   id?: number;
//   status?: string | null;
  
//   // Doctor properties
//   name?: string;
//   department?: string;
//   description?: string;
//   profilepic?: string;
  
//   // Lab test properties
//   testTitle?: string;
//   testDepartment?: string;
//   testDescription?: string;
//   testImage?: string;
  
//   // Diagnostics properties
//   diognosticsId?: number;
//   diognosticsName?: string;
//   diognosticsDescription?: string;
//   diognosticsImage?: string;
//   diognosticsrating?: string;
//   diognosticsaddress?: string;
  
//   // Hospital properties
//   hospitalId?: number;
//   hospitalName?: string;
//   address?: string;
//   hospitalDescription?: string;
//   hospitalImage?: string;
  
//   // Spa properties
//   serviceName?: string;
//   serviceDescription?: string;
//   serviceImage?: string;
//   spaCenterId?: number;
//   rating?: string;
  
//   // Physio properties
//   physioId?: number;
//   physioName?: string;
//   physioDescription?: string;
//   physioImage?: string;
  
//   // Hotel properties
//   hotelId?: number;
//   hotelName?: string;
//   hotelDescription?: string;
//   hotelImage?: string;
//   hotelDetails?: string;
  
//   // Travel properties
//   travelId?: number;
//   travelName?: string;
//   travelDescription?: string;
//   travelImage?: string;
//   travelDetails?: string;
  
//   // Translator properties
//   translatorID?: number;
//   translatorName?: string;
//   translatorDescription?: string;
//   translatorImage?: string;
//   translatorLanguages?: string;
//   translatorRating?: string;
  
//   // Chef properties
//   chefID?: number;
//   chefName?: string;
//   chefDescription?: string;
//   chefImage?: string;
//   styles?: string;
//   experience?: string;
  
//   // Pharmacy properties
//   pharmacyId?: number;
//   pharmacyName?: string;
//   pharmacyDescription?: string;
//   pharmacyImage?: string;
//   pharmacyDetails?: string;
  
//   // Common pricing
//   price?: number | string;
// }

// interface PharmacyCategory {
//   categoryId: number;
//   categoryName: string;
//   categoryDescription: string;
//   categoryImage?: string;
//   status?: string;
// }

// // Constants outside component to avoid dependency issues
// const serviceRoutes: Record<string, string> = {
//   'Find a Doctor': '/doctors',
//   'Book a Test': '/tests',
//   'Spa': '/spa-service-details',
//   'Physiotherapy': '/ServiceListingPage',
//   'Locate Hospital': '/OurHospitals',
//   'Hotel & GuestHouse Booking': '/hotels/list',
//   'Travel Booking': '/travel/list',
//   'Translators': '/translatorList',
//   'Chefs': '/chef-list',
//   'Pharmacy': '/medicinecatalog',
// };

// const apiEndpoints: Record<string, string> = {
//   'Find a Doctor': API_ENDPOINTS.DOCTORS,
//   'Book a Test': API_ENDPOINTS.DIAGNOSTICS,
//   'Spa': API_ENDPOINTS.SPA,
//   'Physiotherapy': API_ENDPOINTS.PHYSIO,
//   'Locate Hospital': API_ENDPOINTS.HOSPITALS,
//   'Hotel & GuestHouse Booking': API_ENDPOINTS.HOTELS,
//   'Travel Booking': API_ENDPOINTS.TRAVEL,
//   'Translators': API_ENDPOINTS.TRANSLATORS,
//   'Chefs': API_ENDPOINTS.CHEFS,
//   'Pharmacy': API_ENDPOINTS.PHARMACY,
//   'pharmacyCategories': API_ENDPOINTS.PHARMACY_CATEGORIES,
// };

// const AppointmentSection = () => {
//   const [doctorSearch, setDoctorSearch] = useState('');
//   const [location, setLocation] = useState('');
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [serviceData, setServiceData] = useState<
//     Record<string, (ServiceItem)[]>
//   >({
//     'Find a Doctor': [],
//     'Book a Test': [],
//     'Spa': [],
//     'Physiotherapy': [],
//     'Locate Hospital': [],
//     'Hotel & GuestHouse Booking': [],
//     'Travel Booking': [],
//     'Translators': [],
//     'Chefs': [],
//     'Pharmacy': [],
//   });
//   const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
//   const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
//   const [error, setError] = useState<{ [key: string]: string }>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!selectedService) return;

//     const debounceFetch = setTimeout(() => {
//       const fetchServiceData = async () => {
//         console.log('Fetching data for:', selectedService);
//         setLoading((prev) => ({ ...prev, [selectedService]: true }));
//         setError((prev) => ({ ...prev, [selectedService]: '' }));

//         try {
//           if (selectedService === 'Pharmacy') {
//             const [pharmaciesRes, categoriesRes] = await Promise.all([
//               axios.get(apiEndpoints['Pharmacy']).then((res) => {
//                 console.log('Pharmacy API Response:', res.data);
//                 return res.data;
//               }).catch((err) => {
//                 console.error('Pharmacy API Error:', err);
//                 return [];
//               }),
//               axios.get(apiEndpoints['pharmacyCategories']).then((res) => {
//                 console.log('Pharmacy Categories API Response:', res.data);
//                 return res.data;
//               }).catch((err) => {
//                 console.error('Pharmacy Categories API Error:', err);
//                 return [];
//               }),
//             ]);
//             setServiceData((prev) => ({
//               ...prev,
//               Pharmacy: filterActive(pharmaciesRes).slice(0, 6),
//             }));
//             setPharmacyCategories(filterActive(categoriesRes as PharmacyCategory[]).slice(0, 6));
//           } else {
//             const serviceTypeMap: Record<string, string> = {
//               'Find a Doctor': 'Doctor',
//               'Book a Test': 'LabTest',
//               'Spa': 'SpaService',
//               'Physiotherapy': 'Physio',
//               'Locate Hospital': 'Hospital',
//               'Hotel & GuestHouse Booking': 'Hotel',
//               'Travel Booking': 'Travel',
//               'Translators': 'Translator',
//               'Chefs': 'Chef',
//             };

//             const type = serviceTypeMap[selectedService];
//             let res: ServiceItem[] = [];

//             switch (type) {
//               case 'Doctor':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Doctor API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Doctor API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'LabTest':
//                 res = await axios.get<LabTest[]>(apiEndpoints[selectedService]).then((res) => {
//                   console.log('LabTest API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('LabTest API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'SpaService':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('SpaService API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('SpaService API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Physio':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Physio API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Physio API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Hospital':
//                 res = await axios.get<Hospital[]>(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Hospital API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Hospital API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Hotel':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Hotel API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Hotel API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Travel':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Travel API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Travel API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Translator':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Translator API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Translator API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Chef':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Chef API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Chef API Error:', err);
//                   return [];
//                 });
//                 break;
//               default:
//                 res = [];
//             }

//             console.log('Filtered Data:', filterActive(res));
//             setServiceData((prev) => ({
//               ...prev,
//               [selectedService]: filterActive(res).slice(0, 6),
//             }));
//           }
//         } catch (err) {
//           console.error('Fetch Error:', err);
//           setError((prev) => ({
//             ...prev,
//             [selectedService]: `Failed to fetch ${selectedService} data. Please check your network or try again later.`,
//           }));
//         } finally {
//           setLoading((prev) => ({ ...prev, [selectedService]: false }));
//         }
//       };

//       fetchServiceData();
//     }, 300);

//     return () => clearTimeout(debounceFetch);
//   }, [selectedService]);

//   // Updated filterActive to handle various status values
//   const filterActive = <T extends { status?: string | null }>(items: T[]): T[] => {
//     console.log('Before Filtering:', items);
//     const filtered = items.filter(
//       (item) =>
//         item.status === undefined ||
//         !item.status ||
//         item.status.trim().toUpperCase() === 'NULL' ||
//         (typeof item.status === 'string' && 
//           ['ACTIVE', 'active', '1'].includes(item.status.trim().toUpperCase()))
//     );
//     console.log('After Filtering:', filtered);
//     return filtered;
//   };

//   const handleBookAppointment = () => {
//     if (!doctorSearch || !location) {
//       alert('Please enter a doctor search term and select a location.');
//       return;
//     }
//     navigate(`/booking?doctor=${encodeURIComponent(doctorSearch)}&location=${encodeURIComponent(location)}`);
//   };

//   const handleServiceClick = (service: string) => {
//     if (service === 'Pharmacy') {
//       navigate(serviceRoutes['Pharmacy']);
//     } else {
//       setSelectedService(selectedService === service ? null : service);
//     }
//   };

//   const handleCategoryClick = (categoryName: string) => {
//     navigate(`/PharmacyCategoryPage/list?category=${encodeURIComponent(categoryName)}`);
//   };
//   const getDetailRoute = (item: ServiceItem): string => {
//     console.log('Generating Detail Route for:', item);
//     if ('id' in item && 'department' in item) return `/hospitaldoctors/${item.id}`;
//     if ('testTitle' in item) return `/tests/${item.id}`;
//     if ('diognosticsName' in item) return `/diagnostics/${item.diognosticsId}`;
//     if ('serviceName' in item) return `/ServiceListingPage/spa/${item.spaCenterId}`;
//     if ('physioName' in item) return `/ServiceListingPage/physio/${item.physioId}`;
//     if ('hospitalName' in item) return `/OurHospitals/${item.hospitalId}`;
//     if ('hotelName' in item) return `/hotels/${item.hotelId}`;
//     if ('travelName' in item) return `/travel/${item.travelId}`;
//     if ('translatorName' in item) return `/translatorAndChefList/translators/${item.translatorID}`;
//     if ('chefName' in item) return `/translatorAndChefList/chef/${item.chefID}`;
//     if ('pharmacyName' in item) return `/PharmacyCategoryPage/${item.pharmacyId}`;
//     return '#';
//   };
//   const getBookingRoute = (item: ServiceItem): string => {
//     console.log('Generating Booking Route for:', item);
//     if ('id' in item && 'department' in item) return `/booking/doctor/${item.id}`;
//     if ('testTitle' in item) return `/booking/test/${item.id}`;
//     if ('diognosticsName' in item) return `/booking/diagnostics/${item.diognosticsId}`;
//     if ('serviceName' in item) return `/booking/spa/${item.spaCenterId}`;
//     if ('physioName' in item) return `/booking/physio/${item.physioId}`;
//     if ('hospitalName' in item) return `/booking/hospital/${item.hospitalId}`;
//     if ('hotelName' in item) return `/booking/hotel/${item.hotelId}`;
//     if ('travelName' in item) return `/booking/travel/${item.travelId}`;
//     if ('translatorName' in item) return `/booking/translator/${item.translatorID}`;
//     if ('chefName' in item) return `/booking/chef/${item.chefID}`;
//     if ('pharmacyName' in item) return `/booking/pharmacy/${item.pharmacyId}`;
//     return '#';
//   };

//   const renderItemFields = (item: ServiceItem) => {
//     console.log('Rendering Item:', item);
//     const defaultFields = {
//       name: 'Unknown',
//       details: 'No details available',
//       description: 'No description available',
//       image: 'https://placehold.co/300x200?text=No+Image',
//     };

//     if ('name' in item && 'department' in item) {
//       return {
//         name: item.name,
//         details: item.department,
//         description: item.description,
//         image: item.profilepic || defaultFields.image,
//       };
//     }    if ('testTitle' in item) {
//       return {
//         name: item.testTitle,
//         details: item.testDepartment,
//         description: item.testDescription,
//         image: item.testImage || defaultFields.image,
//       };
//     }
//     if ('diognosticsName' in item) {
//       return {
//         name: item.diognosticsName,
//         details: item.diognosticsaddress || 'No address provided',
//         description: item.diognosticsDescription || 'No description available',
//         image: item.diognosticsImage || defaultFields.image,
//       };
//     }
//     if ('serviceName' in item) {
//       return {
//         name: item.serviceName,
//         details: item.rating ? `Rating: ${item.rating}` : 'No rating available',
//         description: item.serviceDescription || 'No description provided',
//         image: item.serviceImage || defaultFields.image,
//       };
//     }
//     if ('physioName' in item) {
//       return {
//         name: item.physioName,
//         details: `${item.address || 'No address provided'}${item.rating ? ` | Rating: ${item.rating}` : ''}`,
//         description: item.physioDescription || 'No description provided',
//         image: item.physioImage || defaultFields.image,
//       };
//     }
//     if ('hospitalName' in item) {
//       return {
//         name: item.hospitalName,
//         details: item.address || '',
//         description: item.hospitalDescription,
//         image: item.hospitalImage || defaultFields.image,
//       };
//     }
//     if ('hotelName' in item) {
//       return {
//         name: item.hotelName,
//         details: item.hotelDetails,
//         description: item.hotelDescription,
//         image: item.hotelImage || defaultFields.image,
//       };
//     }
//     if ('travelName' in item) {
//       return {
//         name: item.travelName,
//         details: item.travelDetails,
//         description: item.travelDescription,
//         image: item.travelImage || defaultFields.image,
//       };
//     }
//     if ('translatorName' in item) {
//       return {
//         name: item.translatorName,
//         details: `${item.translatorLanguages}${item.translatorRating ? ` | Rating: ${item.translatorRating}` : ''}`,
//         description: item.translatorDescription,
//         image: item.translatorImage || defaultFields.image,
//       };
//     }
//     if ('chefName' in item) {
//       return {
//         name: item.chefName,
//         details: `${item.styles} | ${item.experience} experience`,
//         description: item.chefDescription,
//         image: item.chefImage || defaultFields.image,
//       };
//     }
//     if ('pharmacyName' in item) {
//       return {
//         name: item.pharmacyName,
//         details: item.pharmacyDetails,
//         description: item.pharmacyDescription,
//         image: item.pharmacyImage || defaultFields.image,
//       };
//     }
//     return defaultFields;
//   };
//   const getServiceType = (item: ServiceItem): ServiceType => {
//     if ('chefName' in item) return 'chef';
//     if ('testTitle' in item) return 'labtest';
//     if ('diognosticsName' in item) return 'labtest';
//     if ('name' in item && 'department' in item) return 'doctor';
//     if ('serviceName' in item) return 'spa';
//     if ('translatorName' in item) return 'translator';
//     if ('physioName' in item) return 'physio';
//     if ('hospitalName' in item) return 'hospital';
//     if ('hotelName' in item) return 'hotel';
//     if ('travelName' in item) return 'travel';
//     if ('pharmacyName' in item) return 'pharmacy';
//     throw new Error("Unknown service type");
//   };

//   const getServicePrice = (item: ServiceItem): number => {
//     if ('price' in item && typeof item.price === 'number') return item.price;
//     if ('price' in item && typeof item.price === 'string') return parseFloat(item.price) || 0;
//     return 0;
//   };

//   return (
//     <section className="bg-slate-50 py-12 bg-opacity-50">
//       <div className="container mx-auto px-4 md:px-6 bg-opacity-50">
//         <div className="max-w-8xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-6 bg-opacity-50">
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="w-full md:w-1/3">
//                 <img
//                   src="/maditailr/doc1.png"
//                   alt="Doctor giving thumbs up"
//                   className="w-full h-auto rounded-lg shadow-lg"
//                 />
//               </div>
//               <div className="w-full md:w-2/3">
//                 <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left text-gray-800 mb-8">
//                   Schedule Your Appointment Online
//                 </h2>
//                 <p className="text-center md:text-left text-sm text-gray-600 mb-4">
//                   Current time: {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//                     <input
//                       type="text"
//                       placeholder="Search for Doctor"
//                       value={doctorSearch}
//                       onChange={(e) => setDoctorSearch(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm"
//                       aria-label="Search for a doctor"
//                     />
//                   </div>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//                     <select
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm"
//                       aria-label="Choose a location"
//                     >
//                       <option value="">Choose Location</option>
//                       <option value="Delhi NCR">Delhi NCR</option>
//                       <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
//                       <option value="Pune, Maharashtra">Pune, Maharashtra</option>
//                       <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
//                       <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
//                       <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
//                     </select>
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       onClick={handleBookAppointment}
//                       className="bg-[#499E14] text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md"
//                       aria-label="Book an appointment"
//                     >
//                       Book an Appointment
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
//                   {Object.keys(serviceRoutes).map((service) => (
//                     <button
//                       key={service}
//                       onClick={() => handleServiceClick(service)}
//                       className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md ${
//                         selectedService === service ? 'border-[#499E14] bg-[#f0f8e8]' : ''
//                       }`}
//                       aria-label={`Select ${service}`}
//                     >
//                       <div className="p-4 flex flex-col items-center justify-center">
//                         <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                           {service === 'Find a Doctor' && <User className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Book a Test' && <Calendar className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Spa' && <FaSpa className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Physiotherapy' && <TbPhysotherapist className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Locate Hospital' && <MapPin className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Hotel & GuestHouse Booking' && <Hotel className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Travel Booking' && <Plane className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Translators' && <PaperAirplaneIcon className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Chefs' && <FaUtensils className="h-6 w-6 text-[#499E14]" />}
//                           {service === 'Pharmacy' && <Pill className="h-6 w-6 text-[#499E14]" />}
//                         </div>
//                         <p className="text-sm font-medium text-gray-800">{service}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 {selectedService && (
//                   <div className="mt-12">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedService}</h3>
//                     {loading[selectedService] && (
//                       <div className="flex justify-center py-4">
//                         <svg
//                           className="h-6 w-6 text-[#499E14]"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                         </svg>
//                       </div>
//                     )}
//                     {error[selectedService] && !loading[selectedService] && (
//                       <div className="text-center py-4">
//                         <p className="text-lg text-red-500">{error[selectedService]}</p>
//                       </div>
//                     )}
//                     {!loading[selectedService] && !error[selectedService] && (
//                       <>
//                         {console.log('Rendering Data:', serviceData[selectedService])}
//                         {serviceData[selectedService].length === 0 ? (
//                           <div className="text-center py-4">
//                             <p className="text-lg text-gray-500">No active {selectedService} found.</p>
//                           </div>
//                         ) : (
//                           <>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                               {selectedService === 'Pharmacy'
//                                 ? pharmacyCategories.slice(0, 6).map((category) => (
//                                     <div
//                                       key={category.categoryId}
//                                       className="bg-white p-5 rounded-xl shadow-lg"
//                                     >
//                                       <img
//                                         src={category.categoryImage || 'https://placehold.co/300x200?text=No+Image'}
//                                         alt={category.categoryName}
//                                         className="w-full h-40 object-cover rounded-lg mb-4"
//                                         loading="lazy"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{category.categoryName}</h4>
//                                       <p className="text-gray-500 text-sm">{category.categoryDescription}</p>
//                                       <button
//                                         onClick={() => handleCategoryClick(category.categoryName)}
//                                         className="mt-4 bg-[#499E14] text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md"
//                                         aria-label={`Book ${category.categoryName}`}
//                                       >
//                                         Book Here
//                                       </button>
//                                     </div>
//                                   ))
//                                 : serviceData[selectedService].slice(0, 6).map((item, index) => {
//                                     const { name, details, description, image } = renderItemFields(item);
//                                     const serviceId =
//                                       'id' in item
//                                         ? item.id
//                                         : 'physioId' in item
//                                         ? item.physioId
//                                         : 'spaCenterId' in item
//                                         ? item.spaCenterId
//                                         : 'hospitalId' in item
//                                         ? item.hospitalId
//                                         : 'hotelId' in item
//                                         ? item.hotelId
//                                         : 'travelId' in item
//                                         ? item.travelId
//                                         : 'translatorID' in item
//                                         ? item.translatorID
//                                         : 'chefID' in item
//                                         ? item.chefID
//                                         : 'pharmacyId' in item
//                                         ? item.pharmacyId
//                                         : 0;

//                                     return (
//                                       <div key={index} className="bg-white p-5 rounded-xl shadow-lg relative">
//                                         <div className="absolute top-2 right-2 z-10">
//                                           <WishlistButton
//                                             serviceId={serviceId}
//                                             serviceType={getServiceType(item)}
//                                             serviceName={name}
//                                             price={getServicePrice(item)}
//                                             description={description}
//                                             serviceImageUrl={image}
//                                           />
//                                         </div>
//                                         <Link to={getDetailRoute(item)}>
//                                           <img
//                                             src={image}
//                                             alt={name}
//                                             className="w-full h-40 object-cover rounded-lg mb-4"
//                                             loading="lazy"
//                                           />
//                                           <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
//                                           <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                           <p className="text-gray-500 text-sm italic">{description}</p>
//                                         </Link>
//                                         <Link
//                                           to={getBookingRoute(item)}
//                                           className="mt-4 block bg-[#499E14] text-white font-semibold py-2 px-4 rounded-lg w-full text-center shadow-md"
//                                           aria-label={`Book ${name}`}
//                                         >
//                                           Book Here
//                                         </Link>
//                                       </div>
//                                     );
//                                   })}
//                             </div>
//                             <div className="mt-8 text-center">
//                               <Link
//                                 to={serviceRoutes[selectedService]}
//                                 className="inline-block bg-[#499E14] text-white font-semibold py-3 px-6 rounded-lg shadow-md"
//                                 aria-label={`Explore more ${selectedService}`}
//                               >
//                                 Explore More
//                               </Link>
//                             </div>
//                           </>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppointmentSection;













// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Search, User, Hotel, Plane, Pill } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
// import { FaSpa, FaUtensils } from 'react-icons/fa';
// import { TbPhysotherapist } from 'react-icons/tb';
// import axios from 'axios';
// import { BASE_URL, API_ENDPOINTS } from '@/config/config';
// import WishlistButton, { ServiceType } from './WishlistButton';

// interface Doctor {
//   id: number;
//   name: string;
//   email: string;
//   rating: number;
//   description: string;
//   department: string;
//   profilepic: string;
//   hospital: {
//     hospitalId: number;
//     hospitalName: string;
//     hospitalDescription: string;
//     hospitalImage: string;
//     rating: string;
//     address: string;
//     status: string;
//   };
//   status: string | null;
// }

// interface LabTest {
//   id: number;
//   testTitle: string;
//   testDepartment: string;
//   testDescription: string;
//   testImage?: string;
//   status?: string;
// }

// interface Hospital {
//   hospitalId: number;
//   hospitalName: string;
//   address: string;
//   hospitalDescription: string;
//   hospitalImage?: string;
//   status?: string;
// }

// interface ServiceItem {
//   id?: number;
//   status?: string | null;
//   name?: string;
//   department?: string;
//   description?: string;
//   profilepic?: string;
//   testTitle?: string;
//   testDepartment?: string;
//   testDescription?: string;
//   testImage?: string;
//   diognosticsId?: number;
//   diognosticsName?: string;
//   diognosticsDescription?: string;
//   diognosticsImage?: string;
//   diognosticsrating?: string;
//   diognosticsaddress?: string;
//   hospitalId?: number;
//   hospitalName?: string;
//   address?: string;
//   hospitalDescription?: string;
//   hospitalImage?: string;
//   serviceName?: string;
//   serviceDescription?: string;
//   serviceImage?: string;
//   spaCenterId?: number;
//   rating?: string;
//   physioId?: number;
//   physioName?: string;
//   physioDescription?: string;
//   physioImage?: string;
//   hotelId?: number;
//   hotelName?: string;
//   hotelDescription?: string;
//   hotelImage?: string;
//   hotelDetails?: string;
//   travelId?: number;
//   travelName?: string;
//   travelDescription?: string;
//   travelImage?: string;
//   travelDetails?: string;
//   translatorID?: number;
//   translatorName?: string;
//   translatorDescription?: string;
//   translatorImage?: string;
//   translatorLanguages?: string;
//   translatorRating?: string;
//   chefID?: number;
//   chefName?: string;
//   chefDescription?: string;
//   chefImage?: string;
//   styles?: string;
//   experience?: string;
//   pharmacyId?: number;
//   pharmacyName?: string;
//   pharmacyDescription?: string;
//   pharmacyImage?: string;
//   pharmacyDetails?: string;
//   price?: number | string;
// }

// interface PharmacyCategory {
//   categoryId: number;
//   categoryName: string;
//   categoryDescription: string;
//   categoryImage?: string;
//   status?: string;
// }

// const serviceRoutes: Record<string, string> = {
//   'Find a Doctor': '/doctors',
//   'Book a Test': '/tests',
//   'Spa': '/ServiceListingPage',
//   'Physiotherapy': '/ServiceListingPage',
//   'Locate Hospital': '/HospitalList',
//   'Hotel & GuestHouse Booking': '/hotels/list',
//   'Travel Booking': '/travel/list',
//   'Translators': '/translatorList',
//   'Chefs': '/chef-list',
//   'Pharmacy': '/medicinecatalog',
// };

// const apiEndpoints: Record<string, string> = {
//   'Find a Doctor': API_ENDPOINTS.DOCTORS,
//   'Book a Test': API_ENDPOINTS.DIAGNOSTICS,
//   'Spa': API_ENDPOINTS.SPA,
//   'Physiotherapy': API_ENDPOINTS.PHYSIO,
//   'Locate Hospital': API_ENDPOINTS.HOSPITALS,
//   'Hotel & GuestHouse Booking': API_ENDPOINTS.HOTELS,
//   'Travel Booking': API_ENDPOINTS.TRAVEL,
//   'Translators': API_ENDPOINTS.TRANSLATORS,
//   'Chefs': API_ENDPOINTS.CHEFS,
//   'Pharmacy': API_ENDPOINTS.PHARMACY,
//   'pharmacyCategories': API_ENDPOINTS.PHARMACY_CATEGORIES,
// };

// const AppointmentSection = () => {
//   const [doctorSearch, setDoctorSearch] = useState('');
//   const [location, setLocation] = useState('');
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [serviceData, setServiceData] = useState<
//     Record<string, (ServiceItem)[]>
//   >({
//     'Find a Doctor': [],
//     'Book a Test': [],
//     'Spa': [],
//     'Physiotherapy': [],
//     'Locate Hospital': [],
//     'Hotel & GuestHouse Booking': [],
//     'Travel Booking': [],
//     'Translators': [],
//     'Chefs': [],
//     'Pharmacy': [],
//   });
//   const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
//   const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
//   const [error, setError] = useState<{ [key: string]: string }>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!selectedService) return;

//     const debounceFetch = setTimeout(() => {
//       const fetchServiceData = async () => {
//         console.log('Fetching data for:', selectedService);
//         setLoading((prev) => ({ ...prev, [selectedService]: true }));
//         setError((prev) => ({ ...prev, [selectedService]: '' }));

//         try {
//           if (selectedService === 'Pharmacy') {
//             const [pharmaciesRes, categoriesRes] = await Promise.all([
//               axios.get(apiEndpoints['Pharmacy']).then((res) => {
//                 console.log('Pharmacy API Response:', res.data);
//                 return res.data;
//               }).catch((err) => {
//                 console.error('Pharmacy API Error:', err);
//                 return [];
//               }),
//               axios.get(apiEndpoints['pharmacyCategories']).then((res) => {
//                 console.log('Pharmacy Categories API Response:', res.data);
//                 return res.data;
//               }).catch((err) => {
//                 console.error('Pharmacy Categories API Error:', err);
//                 return [];
//               }),
//             ]);
//             setServiceData((prev) => ({
//               ...prev,
//               Pharmacy: filterActive(pharmaciesRes).slice(0, 3),
//             }));
//             setPharmacyCategories(filterActive(categoriesRes as PharmacyCategory[]).slice(0, 3));
//           } else {
//             const serviceTypeMap: Record<string, string> = {
//               'Find a Doctor': 'Doctor',
//               'Book a Test': 'LabTest',
//               'Spa': 'SpaService',
//               'Physiotherapy': 'Physio',
//               'Locate Hospital': 'Hospital',
//               'Hotel & GuestHouse Booking': 'Hotel',
//               'Travel Booking': 'Travel',
//               'Translators': 'Translator',
//               'Chefs': 'Chef',
//             };

//             const type = serviceTypeMap[selectedService];
//             let res: ServiceItem[] = [];

//             switch (type) {
//               case 'Doctor':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Doctor API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Doctor API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'LabTest':
//                 res = await axios.get<LabTest[]>(apiEndpoints[selectedService]).then((res) => {
//                   console.log('LabTest API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('LabTest API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'SpaService':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('SpaService API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('SpaService API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Physio':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Physio API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Physio API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Hospital':
//                 res = await axios.get<Hospital[]>(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Hospital API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Hospital API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Hotel':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Hotel API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Hotel API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Travel':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Travel API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Travel API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Translator':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Translator API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Translator API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Chef':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Chef API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Chef API Error:', err);
//                   return [];
//                 });
//                 break;
//               default:
//                 res = [];
//             }

//             console.log('Filtered Data:', filterActive(res));
//             setServiceData((prev) => ({
//               ...prev,
//               [selectedService]: filterActive(res).slice(0, 3),
//             }));
//           }
//         } catch (err) {
//           console.error('Fetch Error:', err);
//           setError((prev) => ({
//             ...prev,
//             [selectedService]: `Failed to fetch ${selectedService} data. Please check your network or try again later.`,
//           }));
//         } finally {
//           setLoading((prev) => ({ ...prev, [selectedService]: false }));
//         }
//       };

//       fetchServiceData();
//     }, 300);

//     return () => clearTimeout(debounceFetch);
//   }, [selectedService]);

//   const filterActive = <T extends { status?: string | null }>(items: T[]): T[] => {
//     console.log('Before Filtering:', items);
//     const filtered = items.filter(
//       (item) =>
//         item.status === undefined ||
//         !item.status ||
//         item.status.trim().toUpperCase() === 'NULL' ||
//         (typeof item.status === 'string' && 
//           ['ACTIVE', 'active', '1'].includes(item.status.trim().toUpperCase()))
//     );
//     console.log('After Filtering:', filtered);
//     return filtered;
//   };

//   const handleBookAppointment = () => {
//     if (!doctorSearch || !location) {
//       alert('Please enter a doctor search term and select a location.');
//       return;
//     }
//     navigate(`/booking?doctor=${encodeURIComponent(doctorSearch)}&location=${encodeURIComponent(location)}`);
//   };

//   const handleServiceClick = (service: string) => {
//     if (service === 'Pharmacy') {
//       navigate(serviceRoutes['Pharmacy']);
//     } else {
//       setSelectedService(selectedService === service ? null : service);
//     }
//   };

//   const handleCategoryClick = (categoryName: string) => {
//     navigate(`/PharmacyCategoryPage/list?category=${encodeURIComponent(categoryName)}`);
//   };

//   const getDetailRoute = (item: ServiceItem): string => {
//     console.log('Generating Detail Route for:', item);
//     if ('id' in item && 'department' in item) return `/hospitaldoctors/${item.id}`;
//     if ('testTitle' in item) return `/tests/${item.id}`;
//     if ('diognosticsName' in item) return `/diagnostics/${item.diognosticsId}`;
//     if ('serviceName' in item) return `/ServiceListingPage/spa/${item.spaCenterId}`;
//     if ('physioName' in item) return `/ServiceListingPage/physio/${item.physioId}`;
//     if ('hospitalName' in item) return `/OurHospitals/${item.hospitalId}`;
//     if ('hotelName' in item) return `/hotels/${item.hotelId}`;
//     if ('travelName' in item) return `/travel/${item.travelId}`;
//     if ('translatorName' in item) return `/translatorAndChefList/translators/${item.translatorID}`;
//     if ('chefName' in item) return `/translatorAndChefList/chef/${item.chefID}`;
//     if ('pharmacyName' in item) return `/PharmacyCategoryPage/${item.pharmacyId}`;
//     return '#';
//   };

//   const getBookingRoute = (item: ServiceItem): string => {
//     console.log('Generating Booking Route for:', item);
//     if ('id' in item && 'department' in item) return `/booking/doctor/${item.id}`;
//     if ('testTitle' in item) return `/booking/test/${item.id}`;
//     if ('diognosticsName' in item) return `/booking/diagnostics/${item.diognosticsId}`;
//     if ('serviceName' in item) return `/booking/spa/${item.spaCenterId}`;
//     if ('physioName' in item) return `/booking/physio/${item.physioId}`;
//     if ('hospitalName' in item) return `/booking/hospital/${item.hospitalId}`;
//     if ('hotelName' in item) return `/booking/hotel/${item.hotelId}`;
//     if ('travelName' in item) return `/booking/travel/${item.travelId}`;
//     if ('translatorName' in item) return `/booking/translator/${item.translatorID}`;
//     if ('chefName' in item) return `/booking/chef/${item.chefID}`;
//     if ('pharmacyName' in item) return `/booking/pharmacy/${item.pharmacyId}`;
//     return '#';
//   };

//   const renderItemFields = (item: ServiceItem) => {
//     console.log('Rendering Item:', item);
//     const defaultFields = {
//       name: 'Unknown',
//       details: 'No details available',
//       description: 'No description available',
//       image: 'https://placehold.co/300x200?text=No+Image',
//     };

//     if ('name' in item && 'department' in item) {
//       return {
//         name: item.name,
//         details: item.department,
//         description: item.description,
//         image: item.profilepic || defaultFields.image,
//       };
//     }
//     if ('testTitle' in item) {
//       return {
//         name: item.testTitle,
//         details: item.testDepartment,
//         description: item.testDescription,
//         image: item.testImage || defaultFields.image,
//       };
//     }
//     if ('diognosticsName' in item) {
//       return {
//         name: item.diognosticsName,
//         details: item.diognosticsaddress || 'No address provided',
//         description: item.diognosticsDescription || 'No description available',
//         image: item.diognosticsImage || defaultFields.image,
//       };
//     }
//     if ('serviceName' in item) {
//       return {
//         name: item.serviceName,
//         details: item.rating ? `Rating: ${item.rating}` : 'No rating available',
//         description: item.serviceDescription || 'No description provided',
//         image: item.serviceImage || defaultFields.image,
//       };
//     }
//     if ('physioName' in item) {
//       return {
//         name: item.physioName,
//         details: `${item.address || 'No address provided'}${item.rating ? ` | Rating: ${item.rating}` : ''}`,
//         description: item.physioDescription || 'No description provided',
//         image: item.physioImage || defaultFields.image,
//       };
//     }
//     if ('hospitalName' in item) {
//       return {
//         name: item.hospitalName,
//         details: item.address || '',
//         description: item.hospitalDescription,
//         image: item.hospitalImage || defaultFields.image,
//       };
//     }
//     if ('hotelName' in item) {
//       return {
//         name: item.hotelName,
//         details: item.hotelDetails,
//         description: item.hotelDescription,
//         image: item.hotelImage || defaultFields.image,
//       };
//     }
//     if ('travelName' in item) {
//       return {
//         name: item.travelName,
//         details: item.travelDetails,
//         description: item.travelDescription,
//         image: item.travelImage || defaultFields.image,
//       };
//     }
//     if ('translatorName' in item) {
//       return {
//         name: item.translatorName,
//         details: `${item.translatorLanguages}${item.translatorRating ? ` | Rating: ${item.translatorRating}` : ''}`,
//         description: item.translatorDescription,
//         image: item.translatorImage || defaultFields.image,
//       };
//     }
//     if ('chefName' in item) {
//       return {
//         name: item.chefName,
//         details: `${item.styles} | ${item.experience} experience`,
//         description: item.chefDescription,
//         image: item.chefImage || defaultFields.image,
//       };
//     }
//     if ('pharmacyName' in item) {
//       return {
//         name: item.pharmacyName,
//         details: item.pharmacyDetails,
//         description: item.pharmacyDescription,
//         image: item.pharmacyImage || defaultFields.image,
//       };
//     }
//     return defaultFields;
//   };

//   const getServiceType = (item: ServiceItem): ServiceType => {
//     if ('chefName' in item) return 'chef';
//     if ('testTitle' in item) return 'labtest';
//     if ('diognosticsName' in item) return 'labtest';
//     if ('name' in item && 'department' in item) return 'doctor';
//     if ('serviceName' in item) return 'spa';
//     if ('translatorName' in item) return 'translator';
//     if ('physioName' in item) return 'physio';
//     if ('hospitalName' in item) return 'hospital';
//     if ('hotelName' in item) return 'hotel';
//     if ('travelName' in item) return 'travel';
//     if ('pharmacyName' in item) return 'pharmacy';
//     throw new Error("Unknown service type");
//   };

//   const getServicePrice = (item: ServiceItem): number => {
//     if ('price' in item && typeof item.price === 'number') return item.price;
//     if ('price' in item && typeof item.price === 'string') return parseFloat(item.price) || 0;
//     return 0;
//   };

//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="w-full md:w-1/3">
//                 <img
//                   src="/maditailr/doc1.png"
//                   alt="Doctor giving thumbs up"
//                   className="w-full h-auto rounded-xl shadow-md object-cover"
//                 />
//               </div>
//               <div className="w-full md:w-2/3">
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center md:text-left">
//                   Schedule Your Appointment Online
//                 </h2>
//                 <p className="text-center md:text-left text-sm text-gray-600 mb-6">
//                   Current time: {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search for Doctor"
//                       value={doctorSearch}
//                       onChange={(e) => setDoctorSearch(e.target.value)}
//                       className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                       aria-label="Search for a doctor"
//                     />
//                   </div>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <select
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                       aria-label="Choose a location"
//                     >
//                       <option value="">Choose Location</option>
//                       <option value="Delhi NCR">Delhi NCR</option>
//                       <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
//                       <option value="Pune, Maharashtra">Pune, Maharashtra</option>
//                       <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
//                       <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
//                       <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
//                     </select>
//                   </div>
                  
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
//                   {Object.keys(serviceRoutes).map((service) => (
//                     <button
//                       key={service}
//                       onClick={() => handleServiceClick(service)}
//                       className={`border border-gray-200 text-center rounded-xl bg-white shadow-md p-4 hover:shadow-lg transition ${
//                         selectedService === service ? 'border-green-500 bg-green-50' : ''
//                       }`}
//                       aria-label={`Select ${service}`}
//                     >
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="mb-2 bg-gray-100 p-3 rounded-full shadow-sm">
//                           {service === 'Find a Doctor' && <User style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Book a Test' && <Calendar style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Spa' && <FaSpa style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Physiotherapy' && <TbPhysotherapist style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Locate Hospital' && <MapPin style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Hotel & GuestHouse Booking' && <Hotel style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Travel Booking' && <Plane style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Translators' && <PaperAirplaneIcon style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Chefs' && <FaUtensils style={{ color: '#499E14' }} className="h-6 w-6" />}
//                           {service === 'Pharmacy' && <Pill style={{ color: '#499E14' }} className="h-6 w-6" />}
//                         </div>
//                         <p className="text-sm font-medium text-gray-800">{service}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 {selectedService && (
//                   <div className="mt-12">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedService}</h3>
//                     {loading[selectedService] && (
//                       <div className="flex justify-center py-6">
//                         <svg
//                           className="h-8 w-8 text-green-600 animate-spin"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                         </svg>
//                       </div>
//                     )}
//                     {error[selectedService] && !loading[selectedService] && (
//                       <div className="text-center py-6">
//                         <p className="text-lg text-red-600">{error[selectedService]}</p>
//                       </div>
//                     )}
//                     {!loading[selectedService] && !error[selectedService] && (
//                       <>
//                         {console.log('Rendering Data:', serviceData[selectedService])}
//                         {serviceData[selectedService].length === 0 ? (
//                           <div className="text-center py-6">
//                             <p className="text-lg text-gray-500">No active {selectedService} found.</p>
//                           </div>
//                         ) : (
//                           <>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                               {selectedService === 'Pharmacy'
//                                 ? pharmacyCategories.slice(0, 3).map((category) => (
//                                     <div
//                                       key={category.categoryId}
//                                       className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
//                                     >
//                                       <img
//                                         src={category.categoryImage || 'https://placehold.co/300x200?text=No+Image'}
//                                         alt={category.categoryName}
//                                         className="w-full h-48 object-cover rounded-lg mb-4"
//                                         loading="lazy"
//                                       />
//                                       <h4 className="text-xl font-semibold text-gray-800 mb-2">{category.categoryName}</h4>
//                                       <p className="text-gray-600 text-sm line-clamp-2">{category.categoryDescription}</p>
//                                       <button
//                                         onClick={() => handleCategoryClick(category.categoryName)}
//                                         style={{ backgroundColor: '#499E14' }}
//                                         className="mt-4 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-[#3A7C10] transition"
//                                         aria-label={`Book ${category.categoryName}`}
//                                       >
//                                         Book Now
//                                       </button>
//                                     </div>
//                                   ))
//                                 : serviceData[selectedService].slice(0, 3).map((item, index) => {
//                                     const { name, details, description, image } = renderItemFields(item);
//                                     const serviceId =
//                                       'id' in item
//                                         ? item.id
//                                         : 'physioId' in item
//                                         ? item.physioId
//                                         : 'spaCenterId' in item
//                                         ? item.spaCenterId
//                                         : 'hospitalId' in item
//                                         ? item.hospitalId
//                                         : 'hotelId' in item
//                                         ? item.hotelId
//                                         : 'travelId' in item
//                                         ? item.travelId
//                                         : 'translatorID' in item
//                                         ? item.translatorID
//                                         : 'chefID' in item
//                                         ? item.chefID
//                                         : 'pharmacyId' in item
//                                         ? item.pharmacyId
//                                         : 0;

//                                     return (
//                                       <div
//                                         key={index}
//                                         className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 relative"
//                                       >
//                                         <div className="absolute top-4 right-4 z-10">
//                                           <WishlistButton
//                                             serviceId={serviceId}
//                                             serviceType={getServiceType(item)}
//                                             serviceName={name}
//                                             price={getServicePrice(item)}
//                                             description={description}
//                                             serviceImageUrl={image}
//                                           />
//                                         </div>
//                                         <Link to={getDetailRoute(item)}>
//                                           <img
//                                             src={image}
//                                             alt={name}
//                                             className="w-full h-48 object-cover rounded-lg mb-4"
//                                             loading="lazy"
//                                           />
//                                           <h4 className="text-xl font-semibold text-gray-800 mb-2">{name}</h4>
//                                           <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                           <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
//                                         </Link>
//                                         <Link
//                                           to={getBookingRoute(item)}
//                                           style={{ backgroundColor: '#499E14' }}
//                                           className="mt-4 block text-white font-semibold py-2 px-4 rounded-lg w-full text-center hover:bg-[#3A7C10] transition"
//                                           aria-label={`Book ${name}`}
//                                         >
//                                           Book Now
//                                         </Link>
//                                       </div>
//                                     );
//                                   })}
//                             </div>
//                             <div className="mt-8 text-center">
//                               <Link
//                                 to={serviceRoutes[selectedService]}
//                                 style={{ backgroundColor: '#499E14' }}
//                                 className="inline-block text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#3A7C10] transition"
//                                 aria-label={`Explore more ${selectedService}`}
//                               >
//                                 Explore More
//                               </Link>
//                             </div>
//                           </>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppointmentSection;












// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Search, User, Hotel, Plane, Pill } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
// import { FaSpa, FaUtensils } from 'react-icons/fa';
// import { TbPhysotherapist } from 'react-icons/tb';
// import axios from 'axios';
// import { BASE_URL, API_ENDPOINTS } from '@/config/config';
// import WishlistButton, { ServiceType } from './WishlistButton';

// interface Doctor {
//   id: number;
//   name: string;
//   email: string;
//   rating: number;
//   description: string;
//   department: string;
//   profilepic: string;
//   hospital: {
//     hospitalId: number;
//     hospitalName: string;
//     hospitalDescription: string;
//     hospitalImage: string;
//     rating: string;
//     address: string;
//     status: string;
//   };
//   status: string | null;
// }

// interface LabTest {
//   id: number;
//   testTitle: string;
//   testDepartment: string;
//   testDescription: string;
//   testImage?: string;
//   status?: string;
// }

// interface Hospital {
//   hospitalId: number;
//   hospitalName: string;
//   address: string;
//   hospitalDescription: string;
//   hospitalImage?: string;
//   status?: string;
// }

// interface ServiceItem {
//   id?: number;
//   status?: string | null;
//   name?: string;
//   department?: string;
//   description?: string;
//   profilepic?: string;
//   testTitle?: string;
//   testDepartment?: string;
//   testDescription?: string;
//   testImage?: string;
//   diognosticsId?: number;
//   diognosticsName?: string;
//   diognosticsDescription?: string;
//   diognosticsImage?: string;
//   diognosticsrating?: string;
//   diognosticsaddress?: string;
//   hospitalId?: number;
//   hospitalName?: string;
//   address?: string;
//   hospitalDescription?: string;
//   hospitalImage?: string;
//   serviceName?: string;
//   serviceDescription?: string;
//   serviceImage?: string;
//   spaCenterId?: number;
//   rating?: string;
//   physioId?: number;
//   physioName?: string;
//   physioDescription?: string;
//   physioImage?: string;
//   hotelId?: number;
//   hotelName?: string;
//   hotelDescription?: string;
//   hotelImage?: string;
//   hotelDetails?: string;
//   travelId?: number;
//   travelName?: string;
//   travelDescription?: string;
//   travelImage?: string;
//   travelDetails?: string;
//   translatorID?: number;
//   translatorName?: string;
//   translatorDescription?: string;
//   translatorImage?: string;
//   translatorLanguages?: string;
//   translatorRating?: string;
//   chefID?: number;
//   chefName?: string;
//   chefDescription?: string;
//   chefImage?: string;
//   styles?: string;
//   experience?: string;
//   pharmacyId?: number;
//   pharmacyName?: string;
//   pharmacyDescription?: string;
//   pharmacyImage?: string;
//   pharmacyDetails?: string;
//   price?: number | string;
// }

// interface PharmacyCategory {
//   categoryId: number;
//   categoryName: string;
//   categoryDescription: string;
//   categoryImage?: string;
//   status?: string;
// }

// const serviceRoutes: Record<string, string> = {
//   'Find a Doctor': '/doctors',
//   'Book a Test': '/tests',
//   'Spa': '/ServiceListingPage',
//   'Physiotherapy': '/ServiceListingPage',
//   'Locate Hospital': '/HospitalList',
//   'Hotel & GuestHouse Booking': '/hotels/list',
//   'Travel Booking': '/travel/list',
//   'Translators': '/translatorList',
//   'Chefs': '/chef-list',
//   'Pharmacy': '/medicinecatalog',
// };

// const apiEndpoints: Record<string, string> = {
//   'Find a Doctor': API_ENDPOINTS.DOCTORS,
//   'Book a Test': API_ENDPOINTS.DIAGNOSTICS,
//   'Spa': API_ENDPOINTS.SPA,
//   'Physiotherapy': API_ENDPOINTS.PHYSIO,
//   'Locate Hospital': API_ENDPOINTS.HOSPITALS,
//   'Hotel & GuestHouse Booking': API_ENDPOINTS.HOTELS,
//   'Travel Booking': API_ENDPOINTS.TRAVEL,
//   'Translators': API_ENDPOINTS.TRANSLATORS,
//   'Chefs': API_ENDPOINTS.CHEFS,
//   'Pharmacy': API_ENDPOINTS.PHARMACY,
//   'pharmacyCategories': API_ENDPOINTS.PHARMACY_CATEGORIES,
// };

// const AppointmentSection = () => {
//   const [doctorSearch, setDoctorSearch] = useState('');
//   const [location, setLocation] = useState('');
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [serviceData, setServiceData] = useState<
//     Record<string, (ServiceItem)[]>
//   >({
//     'Find a Doctor': [],
//     'Book a Test': [],
//     'Spa': [],
//     'Physiotherapy': [],
//     'Locate Hospital': [],
//     'Hotel & GuestHouse Booking': [],
//     'Travel Booking': [],
//     'Translators': [],
//     'Chefs': [],
//     'Pharmacy': [],
//   });
//   const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
//   const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
//   const [error, setError] = useState<{ [key: string]: string }>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!selectedService) return;

//     const debounceFetch = setTimeout(() => {
//       const fetchServiceData = async () => {
//         console.log('Fetching data for:', selectedService);
//         setLoading((prev) => ({ ...prev, [selectedService]: true }));
//         setError((prev) => ({ ...prev, [selectedService]: '' }));

//         try {
//           if (selectedService === 'Pharmacy') {
//             const [pharmaciesRes, categoriesRes] = await Promise.all([
//               axios.get(apiEndpoints['Pharmacy']).then((res) => {
//                 console.log('Pharmacy API Response:', res.data);
//                 return res.data;
//               }).catch((err) => {
//                 console.error('Pharmacy API Error:', err);
//                 return [];
//               }),
//               axios.get(apiEndpoints['pharmacyCategories']).then((res) => {
//                 console.log('Pharmacy Categories API Response:', res.data);
//                 return res.data;
//               }).catch((err) => {
//                 console.error('Pharmacy Categories API Error:', err);
//                 return [];
//               }),
//             ]);
//             setServiceData((prev) => ({
//               ...prev,
//               Pharmacy: filterActive(pharmaciesRes).slice(0, 3),
//             }));
//             setPharmacyCategories(filterActive(categoriesRes as PharmacyCategory[]).slice(0, 3));
//           } else {
//             const serviceTypeMap: Record<string, string> = {
//               'Find a Doctor': 'Doctor',
//               'Book a Test': 'LabTest',
//               'Spa': 'SpaService',
//               'Physiotherapy': 'Physio',
//               'Locate Hospital': 'Hospital',
//               'Hotel & GuestHouse Booking': 'Hotel',
//               'Travel Booking': 'Travel',
//               'Translators': 'Translator',
//               'Chefs': 'Chef',
//             };

//             const type = serviceTypeMap[selectedService];
//             let res: ServiceItem[] = [];

//             switch (type) {
//               case 'Doctor':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Doctor API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Doctor API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'LabTest':
//                 res = await axios.get<LabTest[]>(apiEndpoints[selectedService]).then((res) => {
//                   console.log('LabTest API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('LabTest API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'SpaService':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('SpaService API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('SpaService API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Physio':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Physio API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Physio API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Hospital':
//                 res = await axios.get<Hospital[]>(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Hospital API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Hospital API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Hotel':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Hotel API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Hotel API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Travel':
//                 res = await axios.get(apiEndpoints['Travel Booking']).then((res) => {
//                   console.log('Travel API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Travel API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Translator':
//                 res = await axios.get(apiEndpoints[selectedService]).then((res) => {
//                   console.log('Translator API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Translator API Error:', err);
//                   return [];
//                 });
//                 break;
//               case 'Chef':
//                 res = await axios.get(apiEndpoints['Chefs']).then((res) => {
//                   console.log('Chef API Response:', res.data);
//                   return res.data;
//                 }).catch((err) => {
//                   console.error('Chef API Error:', err);
//                   return [];
//                 });
//                 break;
//               default:
//                 res = [];
//             }

//             console.log('Filtered Data:', filterActive(res));
//             setServiceData((prev) => ({
//               ...prev,
//               [selectedService]: filterActive(res).slice(0, 3),
//             }));
//           }
//         } catch (err) {
//           console.error('Fetch error:', err);
//           setError((prev) => ({
//             ...prev,
//             [selectedService]: `Failed to fetch ${selectedService} data. Please check your network or try again later.`,
//           }));
//         } finally {
//           setLoading((prev) => ({ ...prev, [selectedService]: false }));
//         }
//       };

//       fetchServiceData();
//     }, 300);

//     return () => clearTimeout(debounceFetch);
//   }, [selectedService]);

//   const filterActive = <T extends { status?: string | null }>(items: T[]): T[] => {
//     console.log('Before Filtering:', items);
//     const filtered = items.filter(
//       (item) =>
//         item.status === undefined ||
//         !item.status ||
//         item.status.trim().toUpperCase() === 'NULL' ||
//         (typeof item.status === 'string' && 
//           ['ACTIVE', 'active', '1'].includes(item.status.trim().toUpperCase()))
//     );
//     console.log('After Filtering:', filtered);
//     return filtered;
//   };

//   const handleServiceClick = (service: string) => {
//     if (service === 'Pharmacy') {
//       navigate(serviceRoutes['Pharmacy']);
//     } else {
//       setSelectedService(selectedService === service ? null : service);
//     }
//   };

//   const handleCategoryClick = (categoryName: string) => {
//     navigate(`/PharmacyCategoryPage/list?category=${encodeURIComponent(categoryName)}`);
//   };

//   const getDetailRoute = (item: ServiceItem): string => {
//     console.log('Generating Detail Route for:', item);
//     if ('id' in item && 'department' in item) return `/hospitaldoctors/${item.id}`;
//     if ('testTitle' in item) return `/tests/${item.id}`;
//     if ('diognosticsName' in item) return `/diagnostics/${item.diognosticsId}`;
//     if ('serviceName' in item) return `/ServiceListingPage/spa/${item.spaCenterId}`;
//     if ('physioName' in item) return `/ServiceListingPage/physio/${item.physioId}`;
//     if ('hospitalName' in item) return `/OurHospitals/${item.hospitalId}`;
//     if ('hotelName' in item) return `/hotels/${item.hotelId}`;
//     if ('travelName' in item) return `/travel/${item.travelId}`;
//     if ('translatorName' in item) return `/translatorAndChefList/translators/${item.translatorID}`;
//     if ('chefName' in item) return `/translatorAndChefList/chef/${item.chefID}`;
//     if ('pharmacyName' in item) return `/PharmacyCategoryPage/${item.pharmacyId}`;
//     return '#';
//   };

//   const getBookingRoute = (item: ServiceItem): string => {
//     console.log('Generating Booking Route for:', item);
//     if ('id' in item && 'department' in item) return `/booking/doctor/${item.id}`;
//     if ('testTitle' in item) return `/booking/test/${item.id}`;
//     if ('diognosticsName' in item) return `/booking/diagnostics/${item.diognosticsId}`;
//     if ('serviceName' in item) return `/booking/spa/${item.spaCenterId}`;
//     if ('physioName' in item) return `/booking/physio/${item.physioId}`;
//     if ('hospitalName' in item) return `/booking/hospital/${item.hospitalId}`;
//     if ('hotelName' in item) return `/booking/hotel/${item.hotelId}`;
//     if ('travelName' in item) return `/booking/travel/${item.travelId}`;
//     if ('translatorName' in item) return `/booking/translator/${item.translatorID}`;
//     if ('chefName' in item) return `/booking/chef/${item.chefID}`;
//     if ('pharmacyName' in item) return `/booking/pharmacy/${item.pharmacyId}`;
//     return '#';
//   };

//   const renderItemFields = (item: ServiceItem) => {
//     console.log('Rendering Item:', item);
//     const defaultFields = {
//       name: 'Unknown',
//       details: 'No details available',
//       description: 'No description available',
//       image: 'https://placehold.co/300x200?text=No+Image',
//     };

//     if ('name' in item && 'department' in item) {
//       return {
//         name: item.name,
//         details: item.department,
//         description: item.description,
//         image: item.profilepic || defaultFields.image,
//       };
//     }
//     if ('testTitle' in item) {
//       return {
//         name: item.testTitle,
//         details: item.testDepartment,
//         description: item.testDescription,
//         image: item.testImage || defaultFields.image,
//       };
//     }
//     if ('diognosticsName' in item) {
//       return {
//         name: item.diognosticsName,
//         details: item.diognosticsaddress || 'No address provided',
//         description: item.diognosticsDescription || 'No description available',
//         image: item.diognosticsImage || defaultFields.image,
//       };
//     }
//     if ('serviceName' in item) {
//       return {
//         name: item.serviceName,
//         details: item.rating ? `Rating: ${item.rating}` : 'No rating available',
//         description: item.serviceDescription || 'No description provided',
//         image: item.serviceImage || defaultFields.image,
//       };
//     }
//     if ('physioName' in item) {
//       return {
//         name: item.physioName,
//         details: `${item.address || 'No address provided'}${item.rating ? ` | Rating: ${item.rating}` : ''}`,
//         description: item.physioDescription || 'No description provided',
//         image: item.physioImage || defaultFields.image,
//       };
//     }
//     if ('hospitalName' in item) {
//       return {
//         name: item.hospitalName,
//         details: item.address || '',
//         description: item.hospitalDescription,
//         image: item.hospitalImage || defaultFields.image,
//       };
//     }
//     if ('hotelName' in item) {
//       return {
//         name: item.hotelName,
//         details: item.hotelDetails,
//         description: item.hotelDescription,
//         image: item.hotelImage || defaultFields.image,
//       };
//     }
//     if ('travelName' in item) {
//       return {
//         name: item.travelName,
//         details: item.travelDetails,
//         description: item.travelDescription,
//         image: item.travelImage || defaultFields.image,
//       };
//     }
//     if ('translatorName' in item) {
//       return {
//         name: item.translatorName,
//         details: `${item.translatorLanguages}${item.translatorRating ? ` | Rating: ${item.translatorRating}` : ''}`,
//         description: item.translatorDescription,
//         image: item.translatorImage || defaultFields.image,
//       };
//     }
//     if ('chefName' in item) {
//       return {
//         name: item.chefName,
//         details: `${item.styles} | ${item.experience} experience`,
//         description: item.chefDescription,
//         image: item.chefImage || defaultFields.image,
//       };
//     }
//     if ('pharmacyName' in item) {
//       return {
//         name: item.pharmacyName,
//         details: item.pharmacyDetails,
//         description: item.pharmacyDescription,
//         image: item.pharmacyImage || defaultFields.image,
//       };
//     }
//     return defaultFields;
//   };

//   const getServiceType = (item: ServiceItem): ServiceType => {
//     if ('chefName' in item) return 'chef';
//     if ('testTitle' in item) return 'labtest';
//     if ('diognosticsName' in item) return 'labtest';
//     if ('name' in item && 'department' in item) return 'doctor';
//     if ('serviceName' in item) return 'spa';
//     if ('translatorName' in item) return 'translator';
//     if ('physioName' in item) return 'physio';
//     if ('hospitalName' in item) return 'hospital';
//     if ('hotelName' in item) return 'hotel';
//     if ('travelName' in item) return 'travel';
//     if ('pharmacyName' in item) return 'pharmacy';
//     throw new Error("Unknown service type");
//   };

//   const getServicePrice = (item: ServiceItem): number => {
//     if ('price' in item && typeof item.price === 'number') return item.price;
//     if ('price' in item && typeof item.price === 'string') return parseFloat(item.price) || 0;
//     return 0;
//   };

//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="w-full md:w-1/3">
//                 <img
//                   src="/maditailr/doc1.png"
//                   alt="Doctor giving thumbs up"
//                   className="w-full h-auto rounded-lg shadow-sm object-cover"
//                 />
//               </div>
//               <div className="w-full md:w-2/3">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
//                   Schedule Your Appointment Online
//                 </h2>
//                 <p className="text-center md:text-left text-sm text-gray-500 mb-6">
//                   Time: {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search for Doctor"
//                       value={doctorSearch}
//                       onChange={(e) => setDoctorSearch(e.target.value)}
//                       className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       aria-label="Search for a doctor"
//                     />
//                   </div>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <select
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       aria-label="Choose a location"
//                     >
//                       <option value="">Choose Location...</option>
//                       <option value="Delhi NCR">Delhi NCR</option>
//                       <option value="Mumbai">Mumbai</option>
//                       <option value="Pune">Pune</option>
//                       <option value="Chennai">Chennai</option>
//                       <option value="Bangalore">Bangalore</option>
//                       <option value="Hyderabad">Hyderabad</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
//                   {Object.keys(serviceRoutes).map((service) => (
//                     <button
//                       key={service}
//                       onClick={() => handleServiceClick(service)}
//                       className={`border border-gray-200 rounded-xl bg-white shadow-sm p-3 hover:shadow-md transition-colors ${
//                         selectedService === service ? 'border-blue-400 bg-blue-50' : ''
//                       }`}
//                       aria-label={`Select ${service}`}
//                     >
//                       <div className="flex flex-col items-center">
//                         <div className="mb-2 p-2.5 bg-gray-100 rounded-full shadow-sm">
//                           {service === 'Find a Doctor' && <User style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Book a Test' && <Calendar style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Spa' && <FaSpa style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Physiotherapy' && <TbPhysotherapist style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Locate Hospital' && <MapPin style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Hotel & GuestHouse Booking' && <Hotel style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Travel Booking' && <Plane style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Translators' && <PaperAirplaneIcon style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Chefs' && <FaUtensils style={{ color: '#499E14' }} className="h-5 w-5" />}
//                           {service === 'Pharmacy' && <Pill style={{ color: '#499E14' }} className="h-5 w-5" />}
//                         </div>
//                         <p className="text-xs font-medium text-gray-700">{service}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 {selectedService && (
//                   <div className="mt-10">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4">{selectedService}</h3>
//                     {loading[selectedService] && (
//                       <div className="flex justify-center py-4">
//                         <svg
//                           className="h-6 w-6 text-blue-500 animate-spin"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                         </svg>
//                       </div>
//                     )}
//                     {error[selectedService] && !loading[selectedService] && (
//                       <div className="text-center py-4">
//                         <p className="text-md text-red-500">{error[selectedService]}</p>
//                       </div>
//                     )}
//                     {!loading[selectedService] && !error[selectedService] && (
//                       <>
//                         {serviceData[selectedService].length === 0 ? (
//                           <div className="text-center py-4">
//                             <p className="text-md text-gray-500">No active {selectedService} found.</p>
//                           </div>
//                         ) : (
//                           <>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                               {selectedService === 'Pharmacy'
//                                 ? pharmacyCategories.slice(0, 3).map((category) => (
//                                     <div
//                                       key={category.categoryId}
//                                       className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 overflow-hidden"
//                                     >
//                                       <img
//                                         src={category.categoryImage || 'https://placehold.co/300x200?text=No+Image'}
//                                         alt={category.categoryName}
//                                         className="w-full h-40 object-cover rounded-md mb-3"
//                                         loading="lazy"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2 truncate">{category.categoryName}</h4>
//                                       <p className="text-gray-500 text-sm line-clamp-3">{category.categoryDescription}</p>
//                                       <button
//                                         onClick={() => handleCategoryClick(category.categoryName)}
//                                         style={{ backgroundColor: '#499E14' }}
//                                         className="mt-3 w-full text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-[#3A7C10] transition"
//                                         aria-label={`View ${category.categoryName}`}
//                                       >
//                                         Book now
//                                       </button>
//                                     </div>
//                                   ))
//                                 : serviceData[selectedService].slice(0, 3).map((item, index) => {
//                                     const { name, details, description, image } = renderItemFields(item);
//                                     const serviceId =
//                                       'id' in item
//                                         ? item.id
//                                         : 'physioId' in item
//                                         ? item.physioId
//                                         : 'spaCenterId' in item
//                                         ? item.spaCenterId
//                                         : 'hospitalId' in item
//                                         ? item.hospitalId
//                                         : 'hotelId' in item
//                                         ? item.hotelId
//                                         : 'travelId' in item
//                                         ? item.travelId
//                                         : 'translatorID' in item
//                                         ? item.translatorID
//                                         : 'chefID' in item
//                                         ? item.chefID
//                                         : 'pharmacyId' in item
//                                         ? item.pharmacyId
//                                         : 0;

//                                     return (
//                                       <div
//                                         key={index}
//                                         className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 overflow-hidden"
//                                       >
//                                         <div className="absolute top-3 right-3 z-10">
//                                           <WishlistButton
//                                             serviceId={serviceId}
//                                             serviceType={getServiceType(item)}
//                                             serviceName={name}
//                                             price={getServicePrice(item)}
//                                             description={description}
//                                             serviceImageUrl={image}
//                                           />
//                                         </div>
//                                         <Link to={getDetailRoute(item)} className="block">
//                                           <img
//                                             src={image}
//                                             alt={name}
//                                             className="w-full h-40 object-cover rounded-md mb-3"
//                                             loading="lazy"
//                                           />
//                                           <h4 className="text-lg font-semibold text-gray-800 mb-2 truncate">{name}</h4>
//                                           <p className="text-gray-600 text-sm mb-2 truncate">{details}</p>
//                                           <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
//                                         </Link>
//                                         <Link
//                                           to={getBookingRoute(item)}
//                                           style={{ backgroundColor: '#499E14' }}
//                                           className="mt-3 block text-white font-medium py-2 px-4 rounded-lg shadow-sm text-center hover:bg-[#3A7C10] transition"
//                                           aria-label={`Book ${name}`}
//                                         >
//                                           Book now
//                                         </Link>
//                                       </div>
//                                     );
//                                   })}
//                             </div>
//                             <div className="mt-6 text-center">
//                               <Link
//                                 to={serviceRoutes[selectedService]}
//                                 style={{ backgroundColor: '#499E14' }}
//                                 className="inline-block text-white font-medium py-2.5 px-4 rounded-lg shadow-md text-center hover:bg-[#3A7C10] transition"
//                                 aria-label="Explore More"
//                               >
//                                 Explore more
//                               </Link>
//                             </div>
//                           </>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppointmentSection;




















import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Search, User, Hotel, Plane, Pill } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { FaSpa, FaUtensils } from 'react-icons/fa';
import { TbPhysotherapist } from 'react-icons/tb';
import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from '@/config/config';
import WishlistButton, { ServiceType } from './WishlistButton';

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospital: {
    hospitalId: number;
    hospitalName: string;
    hospitalDescription: string;
    hospitalImage: string;
    rating: string;
    address: string;
    status: string;
  };
  status: string | null;
}

interface LabTest {
  id: number;
  testTitle: string;
  testDepartment: string;
  testDescription: string;
  testImage?: string;
  status?: string;
}

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  address: string;
  hospitalDescription: string;
  hospitalImage?: string;
  status?: string;
}

interface ServiceItem {
  id?: number;
  status?: string | null;
  name?: string;
  department?: string;
  description?: string;
  profilepic?: string;
  testTitle?: string;
  testDepartment?: string;
  testDescription?: string;
  testImage?: string;
  diognosticsId?: number;
  diognosticsName?: string;
  diognosticsDescription?: string;
  diognosticsImage?: string;
  diognosticsrating?: string;
  diognosticsaddress?: string;
  hospitalId?: number;
  hospitalName?: string;
  address?: string;
  hospitalDescription?: string;
  hospitalImage?: string;
  serviceName?: string;
  serviceDescription?: string;
  serviceImage?: string;
  spaCenterId?: number;
  rating?: string;
  physioId?: number;
  physioName?: string;
  physioDescription?: string;
  physioImage?: string;
  hotelId?: number;
  hotelName?: string;
  hotelDescription?: string;
  hotelImage?: string;
  hotelDetails?: string;
  travelId?: number;
  travelName?: string;
  travelDescription?: string;
  travelImage?: string;
  travelDetails?: string;
  translatorID?: number;
  translatorName?: string;
  translatorDescription?: string;
  translatorImage?: string;
  translatorLanguages?: string;
  translatorRating?: string;
  chefID?: number;
  chefName?: string;
  chefDescription?: string;
  chefImage?: string;
  styles?: string;
  experience?: string;
  pharmacyId?: number;
  pharmacyName?: string;
  pharmacyDescription?: string;
  pharmacyImage?: string;
  pharmacyDetails?: string;
  price?: number | string;
}

interface PharmacyCategory {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage?: string;
  status?: string;
}

const serviceRoutes: Record<string, string> = {
  'Find a Doctor': '/doctors',
  'Book a Test': '/tests',
  'Spa': '/ServiceListingPage',
  'Physiotherapy': '/ServiceListingPage',
  'Locate Hospital': '/HospitalList',
  'Hotel & GuestHouse Booking': '/hotels/list',
  'Travel Booking': '/travel/list',
  'Translators': '/translatorList',
  'Chefs': '/chef-list',
  'Pharmacy': '/medicinecatalog',
};

const apiEndpoints: Record<string, string> = {
  'Find a Doctor': API_ENDPOINTS.DOCTORS,
  'Book a Test': API_ENDPOINTS.DIAGNOSTICS,
  'Spa': API_ENDPOINTS.SPA,
  'Physiotherapy': API_ENDPOINTS.PHYSIO,
  'Locate Hospital': API_ENDPOINTS.HOSPITALS,
  'Hotel & GuestHouse Booking': API_ENDPOINTS.HOTELS,
  'Travel Booking': API_ENDPOINTS.TRAVEL,
  'Translators': API_ENDPOINTS.TRANSLATORS,
  'Chefs': API_ENDPOINTS.CHEFS,
  'Pharmacy': API_ENDPOINTS.PHARMACY,
  'pharmacyCategories': API_ENDPOINTS.PHARMACY_CATEGORIES,
};

const AppointmentSection = () => {
  const [doctorSearch, setDoctorSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState<
    Record<string, (ServiceItem)[]>
  >({
    'Find a Doctor': [],
    'Book a Test': [],
    'Spa': [],
    'Physiotherapy': [],
    'Locate Hospital': [],
    'Hotel & GuestHouse Booking': [],
    'Travel Booking': [],
    'Translators': [],
    'Chefs': [],
    'Pharmacy': [],
  });
  const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedService) return;

    const debounceFetch = setTimeout(() => {
      const fetchServiceData = async () => {
        console.log('Fetching data for:', selectedService);
        setLoading((prev) => ({ ...prev, [selectedService]: true }));
        setError((prev) => ({ ...prev, [selectedService]: '' }));

        try {
          if (selectedService === 'Pharmacy') {
            const [pharmaciesRes, categoriesRes] = await Promise.all([
              axios.get(apiEndpoints['Pharmacy']).then((res) => {
                console.log('Pharmacy API Response:', res.data);
                return res.data;
              }).catch((err) => {
                console.error('Pharmacy API Error:', err);
                return [];
              }),
              axios.get(apiEndpoints['pharmacyCategories']).then((res) => {
                console.log('Pharmacy Categories API Response:', res.data);
                return res.data;
              }).catch((err) => {
                console.error('Pharmacy Categories API Error:', err);
                return [];
              }),
            ]);
            setServiceData((prev) => ({
              ...prev,
              Pharmacy: filterActive(pharmaciesRes).slice(0, 3),
            }));
            setPharmacyCategories(filterActive(categoriesRes as PharmacyCategory[]).slice(0, 3));
          } else {
            const serviceTypeMap: Record<string, string> = {
              'Find a Doctor': 'Doctor',
              'Book a Test': 'LabTest',
              'Spa': 'SpaService',
              'Physiotherapy': 'Physio',
              'Locate Hospital': 'Hospital',
              'Hotel & GuestHouse Booking': 'Hotel',
              'Travel Booking': 'Travel',
              'Translators': 'Translator',
              'Chefs': 'Chef',
            };

            const type = serviceTypeMap[selectedService];
            let res: ServiceItem[] = [];

            switch (type) {
              case 'Doctor':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Doctor API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Doctor API Error:', err);
                  return [];
                });
                break;
              case 'LabTest':
                res = await axios.get<LabTest[]>(apiEndpoints[selectedService]).then((res) => {
                  console.log('LabTest API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('LabTest API Error:', err);
                  return [];
                });
                break;
              case 'SpaService':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('SpaService API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('SpaService API Error:', err);
                  return [];
                });
                break;
              case 'Physio':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Physio API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Physio API Error:', err);
                  return [];
                });
                break;
              case 'Hospital':
                res = await axios.get<Hospital[]>(apiEndpoints[selectedService]).then((res) => {
                  console.log('Hospital API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Hospital API Error:', err);
                  return [];
                });
                break;
              case 'Hotel':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Hotel API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Hotel API Error:', err);
                  return [];
                });
                break;
              case 'Travel':
                res = await axios.get(apiEndpoints['Travel Booking']).then((res) => {
                  console.log('Travel API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Travel API Error:', err);
                  return [];
                });
                break;
              case 'Translator':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Translator API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Translator API Error:', err);
                  return [];
                });
                break;
              case 'Chef':
                res = await axios.get(apiEndpoints['Chefs']).then((res) => {
                  console.log('Chef API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Chef API Error:', err);
                  return [];
                });
                break;
              default:
                res = [];
            }

            console.log('Filtered Data:', filterActive(res));
            setServiceData((prev) => ({
              ...prev,
              [selectedService]: filterActive(res).slice(0, 3),
            }));
          }
        } catch (err) {
          console.error('Fetch error:', err);
          setError((prev) => ({
            ...prev,
            [selectedService]: `Failed to fetch ${selectedService} data. Please check your network or try again later.`,
          }));
        } finally {
          setLoading((prev) => ({ ...prev, [selectedService]: false }));
        }
      };

      fetchServiceData();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [selectedService]);

  const filterActive = <T extends { status?: string | null }>(items: T[]): T[] => {
    console.log('Before Filtering:', items);
    const filtered = items.filter(
      (item) =>
        item.status === undefined ||
        !item.status ||
        item.status.trim().toUpperCase() === 'NULL' ||
        (typeof item.status === 'string' && 
          ['ACTIVE', 'active', '1'].includes(item.status.trim().toUpperCase()))
    );
    console.log('After Filtering:', filtered);
    return filtered;
  };

  const handleServiceClick = (service: string) => {
    if (service === 'Pharmacy') {
      navigate(serviceRoutes['Pharmacy']);
    } else {
      setSelectedService(selectedService === service ? null : service);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/PharmacyCategoryPage/list?category=${encodeURIComponent(categoryName)}`);
  };

  const getDetailRoute = (item: ServiceItem): string => {
    console.log('Generating Detail Route for:', item);
    if ('id' in item && 'department' in item) return `/hospitaldoctors/${item.id}`;
    if ('testTitle' in item) return `/tests/${item.id}`;
    if ('diognosticsName' in item) return `/diagnostics/${item.diognosticsId}`;
    if ('serviceName' in item) return `/ServiceListingPage/spa/${item.spaCenterId}`;
    if ('physioName' in item) return `/ServiceListingPage/physio/${item.physioId}`;
    if ('hospitalName' in item) return `/OurHospitals/${item.hospitalId}`;
    if ('hotelName' in item) return `/hotels/${item.hotelId}`;
    if ('travelName' in item) return `/travel/${item.travelId}`;
    if ('translatorName' in item) return `/translatorAndChefList/translators/${item.translatorID}`;
    if ('chefName' in item) return `/translatorAndChefList/chef/${item.chefID}`;
    if ('pharmacyName' in item) return `/PharmacyCategoryPage/${item.pharmacyId}`;
    return '#';
  };

  const getBookingRoute = (item: ServiceItem): string => {
    console.log('Generating Booking Route for:', item);
    if ('id' in item && 'department' in item) return `/booking/doctor/${item.id}`;
    if ('testTitle' in item) return `/booking/test/${item.id}`;
    if ('diognosticsName' in item) return `/booking/diagnostics/${item.diognosticsId}`;
    if ('serviceName' in item) return `/booking/spa/${item.spaCenterId}`;
    if ('physioName' in item) return `/booking/physio/${item.physioId}`;
    if ('hospitalName' in item) return `/booking/hospital/${item.hospitalId}`;
    if ('hotelName' in item) return `/booking/hotel/${item.hotelId}`;
    if ('travelName' in item) return `/booking/travel/${item.travelId}`;
    if ('translatorName' in item) return `/booking/translator/${item.translatorID}`;
    if ('chefName' in item) return `/booking/chef/${item.chefID}`;
    if ('pharmacyName' in item) return `/booking/pharmacy/${item.pharmacyId}`;
    return '#';
  };

  const renderItemFields = (item: ServiceItem) => {
    console.log('Rendering Item:', item);
    const defaultFields = {
      name: 'Unknown',
      details: 'No details available',
      description: 'No description available',
      image: 'https://placehold.co/300x200?text=No+Image',
    };

    if ('name' in item && 'department' in item) {
      return {
        name: item.name,
        details: item.department,
        description: item.description,
        image: item.profilepic || defaultFields.image,
      };
    }
    if ('testTitle' in item) {
      return {
        name: item.testTitle,
        details: item.testDepartment,
        description: item.testDescription,
        image: item.testImage || defaultFields.image,
      };
    }
    if ('diognosticsName' in item) {
      return {
        name: item.diognosticsName,
        details: item.diognosticsaddress || 'No address provided',
        description: item.diognosticsDescription || 'No description available',
        image: item.diognosticsImage || defaultFields.image,
      };
    }
    if ('serviceName' in item) {
      return {
        name: item.serviceName,
        details: item.rating ? `Rating: ${item.rating}` : 'No rating available',
        description: item.serviceDescription || 'No description provided',
        image: item.serviceImage || defaultFields.image,
      };
    }
    if ('physioName' in item) {
      return {
        name: item.physioName,
        details: `${item.address || 'No address provided'}${item.rating ? ` | Rating: ${item.rating}` : ''}`,
        description: item.physioDescription || 'No description provided',
        image: item.physioImage || defaultFields.image,
      };
    }
    if ('hospitalName' in item) {
      return {
        name: item.hospitalName,
        details: item.address || '',
        description: item.hospitalDescription,
        image: item.hospitalImage || defaultFields.image,
      };
    }
    if ('hotelName' in item) {
      return {
        name: item.hotelName,
        details: item.hotelDetails,
        description: item.hotelDescription,
        image: item.hotelImage || defaultFields.image,
      };
    }
    if ('travelName' in item) {
      return {
        name: item.travelName,
        details: item.travelDetails,
        description: item.travelDescription,
        image: item.travelImage || defaultFields.image,
      };
    }
    if ('translatorName' in item) {
      return {
        name: item.translatorName,
        details: `${item.translatorLanguages}${item.translatorRating ? ` | Rating: ${item.translatorRating}` : ''}`,
        description: item.translatorDescription,
        image: item.translatorImage || defaultFields.image,
      };
    }
    if ('chefName' in item) {
      return {
        name: item.chefName,
        details: `${item.styles} | ${item.experience} experience`,
        description: item.chefDescription,
        image: item.chefImage || defaultFields.image,
      };
    }
    if ('pharmacyName' in item) {
      return {
        name: item.pharmacyName,
        details: item.pharmacyDetails,
        description: item.pharmacyDescription,
        image: item.pharmacyImage || defaultFields.image,
      };
    }
    return defaultFields;
  };

  const getServiceType = (item: ServiceItem): ServiceType => {
    if ('chefName' in item) return 'chef';
    if ('testTitle' in item) return 'labtest';
    if ('diognosticsName' in item) return 'labtest';
    if ('name' in item && 'department' in item) return 'doctor';
    if ('serviceName' in item) return 'spa';
    if ('translatorName' in item) return 'translator';
    if ('physioName' in item) return 'physio';
    if ('hospitalName' in item) return 'hospital';
    if ('hotelName' in item) return 'hotel';
    if ('travelName' in item) return 'travel';
    if ('pharmacyName' in item) return 'pharmacy';
    throw new Error("Unknown service type");
  };

  const getServicePrice = (item: ServiceItem): number => {
    if ('price' in item && typeof item.price === 'number') return item.price;
    if ('price' in item && typeof item.price === 'string') return parseFloat(item.price) || 0;
    return 0;
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <img
                  src="/maditailr/doc1.png"
                  alt="Doctor giving thumbs up"
                  className="w-full h-auto rounded-lg shadow-sm object-cover"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                  Schedule Your Appointment Online
                </h2>
                <p className="text-center md:text-left text-sm text-gray-500 mb-6">
                  Time: {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for Doctor"
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      aria-label="Search for a doctor"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      aria-label="Choose a location"
                    >
                      <option value="">Choose Location...</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
                  {Object.keys(serviceRoutes).map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceClick(service)}
                      className={`border border-gray-200 rounded-xl bg-white shadow-sm p-4 hover:shadow-md transition-colors ${
                        selectedService === service ? 'border-blue-400 bg-blue-50' : ''
                      }`}
                      aria-label={`Select ${service}`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-3 p-3 bg-gray-100 rounded-full shadow-sm">
                          {service === 'Find a Doctor' && <User style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Book a Test' && <Calendar style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Spa' && <FaSpa style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Physiotherapy' && <TbPhysotherapist style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Locate Hospital' && <MapPin style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Hotel & GuestHouse Booking' && <Hotel style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Travel Booking' && <Plane style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Translators' && <PaperAirplaneIcon style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Chefs' && <FaUtensils style={{ color: '#499E14' }} className="h-6 w-6" />}
                          {service === 'Pharmacy' && <Pill style={{ color: '#499E14' }} className="h-6 w-6" />}
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center">{service}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedService && (
                  <div className="mt-10">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{selectedService}</h3>
                    {loading[selectedService] && (
                      <div className="flex justify-center py-4">
                        <svg
                          className="h-6 w-6 text-blue-500 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </div>
                    )}
                    {error[selectedService] && !loading[selectedService] && (
                      <div className="text-center py-4">
                        <p className="text-md text-red-500">{error[selectedService]}</p>
                      </div>
                    )}
                    {!loading[selectedService] && !error[selectedService] && (
                      <>
                        {serviceData[selectedService].length === 0 ? (
                          <div className="text-center py-4">
                            <p className="text-md text-gray-500">No active {selectedService} found.</p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {selectedService === 'Pharmacy'
                                ? pharmacyCategories.slice(0, 3).map((category) => (
                                    <div
                                      key={category.categoryId}
                                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 overflow-hidden"
                                    >
                                      <img
                                        src={category.categoryImage || 'https://placehold.co/300x200?text=No+Image'}
                                        alt={category.categoryName}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                        loading="lazy"
                                      />
                                      <h4 className="text-md font-semibold text-gray-800 mb-2 truncate">{category.categoryName}</h4>
                                      <p className="text-gray-500 text-xs line-clamp-3">{category.categoryDescription}</p>
                                      <button
                                        onClick={() => handleCategoryClick(category.categoryName)}
                                        style={{ backgroundColor: '#499E14' }}
                                        className="mt-2 w-full text-white font-medium py-1.5 px-3 rounded-lg shadow-sm hover:bg-[#3A7C10] transition"
                                        aria-label={`View ${category.categoryName}`}
                                      >
                                        Book now
                                      </button>
                                    </div>
                                  ))
                                : serviceData[selectedService].slice(0, 3).map((item, index) => {
                                    const { name, details, description, image } = renderItemFields(item);
                                    const serviceId =
                                      'id' in item
                                        ? item.id
                                        : 'physioId' in item
                                        ? item.physioId
                                        : 'spaCenterId' in item
                                        ? item.spaCenterId
                                        : 'hospitalId' in item
                                        ? item.hospitalId
                                        : 'hotelId' in item
                                        ? item.hotelId
                                        : 'travelId' in item
                                        ? item.travelId
                                        : 'translatorID' in item
                                        ? item.translatorID
                                        : 'chefID' in item
                                        ? item.chefID
                                        : 'pharmacyId' in item
                                        ? item.pharmacyId
                                        : 0;

                                    return (
                                      <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 overflow-hidden"
                                      >
                                        <div className="absolute top-2 right-2 z-10">
                                          <WishlistButton
                                            serviceId={serviceId}
                                            serviceType={getServiceType(item)}
                                            serviceName={name}
                                            price={getServicePrice(item)}
                                            description={description}
                                            serviceImageUrl={image}
                                          />
                                        </div>
                                        <Link to={getDetailRoute(item)} className="block">
                                          <img
                                            src={image}
                                            alt={name}
                                            className="w-full h-32 object-cover rounded-md mb-2"
                                            loading="lazy"
                                          />
                                          <h4 className="text-md font-semibold text-gray-800 mb-1 truncate">{name}</h4>
                                          <p className="text-gray-600 text-xs mb-1 truncate">{details}</p>
                                          <p className="text-gray-500 text-xs line-clamp-2">{description}</p>
                                        </Link>
                                        <Link
                                          to={getBookingRoute(item)}
                                          style={{ backgroundColor: '#499E14' }}
                                          className="mt-2 block text-white font-medium py-1.5 px-3 rounded-lg shadow-sm text-center hover:bg-[#3A7C10] transition"
                                          aria-label={`Book ${name}`}
                                        >
                                          Book now
                                        </Link>
                                      </div>
                                    );
                                  })}
                            </div>
                            <div className="mt-6 text-center">
                              <Link
                                to={serviceRoutes[selectedService]}
                                style={{ backgroundColor: '#499E14' }}
                                className="inline-block text-white font-medium py-2.5 px-4 rounded-lg shadow-md text-center hover:bg-[#3A7C10] transition"
                                aria-label="Explore More"
                              >
                                Explore more
                              </Link>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;