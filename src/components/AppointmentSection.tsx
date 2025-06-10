// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Search, User, Hotel, Plane, Clock, Pill } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
// import { FaSpa, FaUtensils } from 'react-icons/fa';
// import { TbPhysotherapist } from 'react-icons/tb';
// import axios from 'axios';

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
//     hositalName: string;
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
//   testDescription: string;
//   testImage: string;
//   testDepartment: string;
//   status: string | null;
// }

// interface Physio {
//   physioId: number;
//   physioName: string;
//   physioDescription: string;
//   physioImage: string;
//   rating: string;
//   address: string;
//   price: string;
//   location: any;
//   status: string | null;
// }

// interface Spa {
//   spaId: number;
//   spaName: string;
//   spaDescription: string | null;
//   spaImage: string | null;
//   rating: string | null;
//   address: string | null;
//   locationId: number | null;
//   status: string | null;
// }

// interface Hospital {
//   hospitalId: number;
//   hositalName: string;
//   hospitalDescription: string;
//   hospitalImage: string;
//   rating: string;
//   address: string;
//   doctors: Doctor[];
//   status: string | null;
// }

// interface Hotel {
//   hotelId: number;
//   hotelName: string;
//   hotelDescription: string;
//   hotelImage: string;
//   hotelDetails: string;
//   status: string | null;
// }

// interface Travel {
//   travelId: number;
//   travelName: string;
//   travelDescription: string;
//   travelImage: string;
//   travelDetails: string;
//   status: string | null;
// }

// interface Translator {
//   translatorID: number;
//   translatorName: string;
//   translatorDescription: string;
//   translatorImage: string;
//   translatorLanguages: string;
//   status: string | null;
// }

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   status: string | null;
// }

// interface Pharmacy {
//   pharmacyId: number;
//   pharmacyName: string;
//   pharmacyDescription: string;
//   pharmacyImage: string;
//   pharmacyDetails: string;
//   status: string | null;
// }

// interface PharmacyCategory {
//   categoryId: number;
//   categoryName: string;
//   categoryDescription: string;
//   categoryImage: string;
//   route: string;
//   status: string | null;
// }

// const AppointmentSection = () => {
//   const [doctorSearch, setDoctorSearch] = useState('');
//   const [location, setLocation] = useState('');
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [serviceData, setServiceData] = useState<
//     Record<string, (Doctor | LabTest | Spa | Physio | Hospital | Hotel | Travel | Translator | Chef | Pharmacy)[]
//   >>({
//     'Find a Doctor': [],
//     'Book a Test': [],
//     'Spa & Physiotherapy': [],
//     'Locate Hospital': [],
//     'Hotel Booking': [],
//     'Travel Booking': [],
//     'Translators & Chefs': [],
//     Pharmacy: [],
//   });
//   const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const serviceRoutes: Record<string, string> = {
//     'Find a Doctor': '/doctors',
//     'Book a Test': '/tests',
//     'Spa & Physiotherapy': '/ServiceListingPage',
//     'Spa': '/ServiceListingPage/spa',
//     'Physiotherapy': '/ServiceListingPage/physio',
//     'Locate Hospital': '/OurHospitals',
//     'Hotel Booking': '/hotels',
//     'Travel Booking': '/travel',
//     'Translators & Chefs': '/translatorAndChefList',
//     'Translators': '/translatorAndChefList/translator',
//     'Chefs': '/translatorAndChefList/chef',
//     'Pharmacy': '/medicinecatalog',
//   };
//    const base_url="https://healthtourism-5.onrender.com"
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [
//           doctorsRes,
//           testsRes,
//           physiosRes,
//           spasRes,
//           hospitalsRes,
//           hotelsRes,
//           travelRes,
//           translatorsRes,
//           chefsRes,
//           pharmaciesRes,
//           categoriesRes,
//         ] = await Promise.all([
//           // axios.get(`${base_url}/api/doctors`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/diagnostics`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/physio/all`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/spaCenter/all`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/hospitals`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/hotels`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/travel`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/translators`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/chefs`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/cart-item/user/capsules-user`).catch(() => ({ data: [] })),
//           // axios.get(`${base_url}/api/pharmacy-categories`).catch(() => ({ data: [] })),

//            axios.get('http://localhost:8080/api/doctors').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/diagnostics').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/physio/all').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/spaCenter/all').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/hospitals').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/hotels').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/travel').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/translators').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/chefs').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/cart-item/user/capsules-user').catch(() => ({ data: [] })),
//           axios.get('http://localhost:8080/api/pharmacy-categories').catch(() => ({ data: [] })),
//         ]);

//         const filterActive = (items: any[]) =>
//           items.filter(
//             (item) =>
//               item.status &&
//               typeof item.status === 'string' &&
//               item.status.trim().toUpperCase() === 'ACTIVE'
//           );

//         // Log API responses for debugging
//         console.log('Spas:', spasRes.data);
//         console.log('Physios:', physiosRes.data);
//         console.log('Translators:', translatorsRes.data);
//         console.log('Chefs:', chefsRes.data);

//         const activePhysios = filterActive(physiosRes.data).slice(0, 3);
//         const activeSpas = filterActive(spasRes.data).slice(0, 3);
//         const activeTranslators = filterActive(translatorsRes.data).slice(0, 3);
//         const activeChefs = filterActive(chefsRes.data).slice(0, 3);

//         // Log filtered data
//         console.log('Active Spas:', activeSpas);
//         console.log('Active Physios:', activePhysios);
//         console.log('Active Translators:', activeTranslators);
//         console.log('Active Chefs:', activeChefs);

//         setServiceData({
//           'Find a Doctor': filterActive(doctorsRes.data).slice(0, 6),
//           'Book a Test': filterActive(testsRes.data).slice(0, 6),
//           'Spa & Physiotherapy': [...activeSpas, ...activePhysios].slice(0, 6),
//           'Locate Hospital': filterActive(hospitalsRes.data).slice(0, 6),
//           'Hotel Booking': filterActive(hotelsRes.data).slice(0, 6),
//           'Travel Booking': filterActive(travelRes.data).slice(0, 6),
//           'Translators & Chefs': [...activeTranslators, ...activeChefs].slice(0, 6),
//           Pharmacy: filterActive(pharmaciesRes.data).slice(0, 6),
//         });

//         setPharmacyCategories(filterActive(categoriesRes.data).slice(0, 6));
//       } catch (err) {
//         setError('Failed to fetch data. Please try again later.');
//         console.error('API fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleBookAppointment = () => {
//     console.log('Booking appointment:', { doctorSearch, location });
//   };

//   const handleServiceClick = (service: string) => {
//     setSelectedService(selectedService === service ? null : service);
//   };

//   const handleCategoryClick = (categoryName: string) => {
//     navigate(`/PharmacyCategoryPage?category=${encodeURIComponent(categoryName)}`);
//   };

//   const getDetailRoute = (
//     item: Doctor | LabTest | Spa | Physio | Hospital | Hotel | Travel | Translator | Chef | Pharmacy
//   ) => {
//     if ('id' in item && 'department' in item) {
//       return `/hospitaldoctors/${item.id}`;
//     } else if ('testTitle' in item) {
//       return `/tests/${item.id}`;
//     } else if ('spaName' in item) {
//       return `/ServiceListingPage/spa/${item.spaId}`;
//     } else if ('physioName' in item) {
//       return `/ServiceListingPage/physio/${item.physioId}`;
//     } else if ('hositalName' in item) {
//       return `/OurHospitals/${item.hospitalId}`;
//     } else if ('hotelName' in item) {
//       return `/hotels/${item.hotelId}`;
//     } else if ('travelName' in item) {
//       return `/travel/${item.travelId}`;
//     } else if ('translatorName' in item) {
//       return `/translatorAndChefList/translator/${item.translatorID}`;
//     } else if ('chefName' in item) {
//       return `/translatorAndChefList/chef/${item.chefID}`;
//     } else if ('pharmacyName' in item) {
//       return `/PharmacyCategoryPage/${item.pharmacyId}`;
//     }
//     return '#';
//   };

//   const renderItemFields = (
//     item: Doctor | LabTest | Spa | Physio | Hospital | Hotel | Travel | Translator | Chef | Pharmacy
//   ) => {
//     if ('name' in item && 'department' in item) {
//       return {
//         name: item.name,
//         details: item.department,
//         description: item.description,
//         image: item.profilepic || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('testTitle' in item) {
//       return {
//         name: item.testTitle,
//         details: item.testDepartment,
//         description: item.testDescription,
//         image: item.testImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('spaName' in item || 'physioName' in item) {
//       return {
//         name: 'spaName' in item ? item.spaName : item.physioName,
//         details: item.address || 'No address provided',
//         description:
//           'spaDescription' in item
//             ? item.spaDescription || 'No description provided'
//             : item.physioDescription || 'No description provided',
//         image:
//           'spaImage' in item
//             ? item.spaImage || 'https://placehold.co/300x200?text=No+Image'
//             : item.physioImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('hositalName' in item && 'hospitalDescription' in item) {
//       return {
//         name: item.hositalName,
//         details: item.address || '',
//         description: item.hospitalDescription,
//         image: item.hospitalImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('hotelName' in item) {
//       return {
//         name: item.hotelName,
//         details: item.hotelDetails,
//         description: item.hotelDescription,
//         image: item.hotelImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('travelName' in item) {
//       return {
//         name: item.travelName,
//         details: item.travelDetails,
//         description: item.travelDescription,
//         image: item.travelImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('translatorName' in item || 'chefName' in item) {
//       return {
//         name: 'translatorName' in item ? item.translatorName : item.chefName,
//         details: 'translatorLanguages' in item ? item.translatorLanguages : item.styles,
//         description:
//           'translatorDescription' in item
//             ? item.translatorDescription
//             : item.chefDescription,
//         image:
//           'translatorImage' in item
//             ? item.translatorImage || 'https://placehold.co/300x200?text=No+Image'
//             : item.chefImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     } else if ('pharmacyName' in item) {
//       return {
//         name: item.pharmacyName,
//         details: item.pharmacyDetails,
//         description: item.pharmacyDescription,
//         image: item.pharmacyImage || 'https://placehold.co/300x200?text=No+Image',
//       };
//     }
//     return {
//       name: 'Unknown',
//       details: 'No details available',
//       description: 'No description available',
//       image: 'https://placehold.co/300x200?text=No+Image',
//     };
//   };

//   return (
//     <section className="bg-slate-50 py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
//             Schedule Your Appointment Online
//           </h2>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             {loading && (
//               <div className="text-center py-4">
//                 <p className="text-lg text-gray-500">Loading services...</p>
//               </div>
//             )}
//             {error && (
//               <div className="text-center py-4">
//                 <p className="text-lg text-red-500">{error}</p>
//               </div>
//             )}
//             {!loading && !error && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                     <input
//                       type="text"
//                       placeholder="Search for Doctor"
//                       value={doctorSearch}
//                       onChange={(e) => setDoctorSearch(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
//                       aria-label="Search for a doctor"
//                     />
//                   </div>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                     <select
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
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
//                       className="bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md transition-all duration-300"
//                       aria-label="Book an appointment"
//                     >
//                       Book an Appointment
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
//                   {Object.keys(serviceRoutes)
//                     .filter(
//                       (service) =>
//                         !['Spa', 'Physiotherapy', 'Translators', 'Chefs'].includes(service)
//                     )
//                     .map((service) => (
//                       <div
//                         key={service}
//                         onClick={() => handleServiceClick(service)}
//                         className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-[#499E14] transition-all duration-300 cursor-pointer ${
//                           selectedService === service ? 'border-[#499E14] bg-[#f0f8e8]' : ''
//                         }`}
//                       >
//                         <div className="p-4 flex flex-col items-center justify-center">
//                           <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                             {service === 'Find a Doctor' && <User className="h-6 w-6 text-[#499E14]" />}
//                             {service === 'Book a Test' && <Calendar className="h-6 w-6 text-[#499E14]" />}
//                             {service === 'Spa & Physiotherapy' && (
//                               <div className="flex gap-1">
//                                 <FaSpa className="h-6 w-6 text-[#499E14]" />
//                                 <TbPhysotherapist className="h-6 w-6 text-[#499E14]" />
//                               </div>
//                             )}
//                             {service === 'Locate Hospital' && <MapPin className="h-6 w-6 text-[#499E14]" />}
//                             {service === 'Hotel Booking' && <Hotel className="h-6 w-6 text-[#499E14]" />}
//                             {service === 'Travel Booking' && <Plane className="h-6 w-6 text-[#499E14]" />}
//                             {service === 'Translators & Chefs' && (
//                               <div className="flex gap-1">
//                                 <PaperAirplaneIcon className="h-6 w-6 text-[#499E14]" />
//                                 <FaUtensils className="h-6 w-6 text-[#499E14]" />
//                               </div>
//                             )}
//                             {service === 'Pharmacy' && <Pill className="h-6 w-6 text-[#499E14]" />}
//                           </div>
//                           <p className="text-sm font-medium text-gray-800">{service}</p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>

//                 {selectedService && (
//                   <div className="mt-12">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedService}</h3>
//                     {serviceData[selectedService].length === 0 ? (
//                       <div className="text-center py-4">
//                         <p className="text-lg text-gray-500">No active {selectedService} found.</p>
//                       </div>
//                     ) : (
//                       <>
//                         {selectedService === 'Spa & Physiotherapy' && (
//                           <>
//                             <h4 className="text-xl font-semibold text-gray-800 mb-4">Spas</h4>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                               {serviceData[selectedService]
//                                 .filter((item): item is Spa => 'spaName' in item)
//                                 .slice(0, 3)
//                                 .map((item, index) => {
//                                   const { name, details, description, image } = renderItemFields(item);
//                                   return (
//                                     <Link
//                                       to={getDetailRoute(item)}
//                                       key={index}
//                                       className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                                     >
//                                       <img
//                                         src={image}
//                                         alt={name}
//                                         className="w-full h-40 object-cover rounded-lg mb-4"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
//                                       <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                       <p className="text-gray-500 text-sm italic">{description}</p>
//                                     </Link>
//                                   );
//                                 })}
//                               {serviceData[selectedService].filter((item): item is Spa => 'spaName' in item).length ===
//                                 0 && (
//                                 <div className="text-center py-4 col-span-full">
//                                   <p className="text-lg text-gray-500">No active spas found.</p>
//                                 </div>
//                               )}
//                             </div>
//                             <div className="mt-8 text-center">
//                               <Link
//                                 to={serviceRoutes['Spa']}
//                                 className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 mr-4"
//                               >
//                                 Explore Spas
//                               </Link>
//                             </div>
//                             <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Physiotherapy</h4>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                               {serviceData[selectedService]
//                                 .filter((item): item is Physio => 'physioName' in item)
//                                 .slice(0, 3)
//                                 .map((item, index) => {
//                                   const { name, details, description, image } = renderItemFields(item);
//                                   return (
//                                     <Link
//                                       to={getDetailRoute(item)}
//                                       key={index}
//                                       className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                                     >
//                                       <img
//                                         src={image}
//                                         alt={name}
//                                         className="w-full h-40 object-cover rounded-lg mb-4"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
//                                       <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                       <p className="text-gray-500 text-sm italic">{description}</p>
//                                     </Link>
//                                   );
//                                 })}
//                               {serviceData[selectedService].filter((item): item is Physio => 'physioName' in item)
//                                 .length === 0 && (
//                                 <div className="text-center py-4 col-span-full">
//                                   <p className="text-lg text-gray-500">No active physiotherapy services found.</p>
//                                 </div>
//                               )}
//                             </div>
//                             <div className="mt-8 text-center">
//                               <Link
//                                 to={serviceRoutes['Physiotherapy']}
//                                 className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
//                               >
//                                 Explore Physiotherapy
//                               </Link>
//                             </div>
//                           </>
//                         )}
//                         {selectedService === 'Translators & Chefs' && (
//                           <>
//                             <h4 className="text-xl font-semibold text-gray-800 mb-4">Translators</h4>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                               {serviceData[selectedService]
//                                 .filter((item): item is Translator => 'translatorName' in item)
//                                 .slice(0, 3)
//                                 .map((item, index) => {
//                                   const { name, details, description, image } = renderItemFields(item);
//                                   return (
//                                     <Link
//                                       to={getDetailRoute(item)}
//                                       key={index}
//                                       className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                                     >
//                                       <img
//                                         src={image}
//                                         alt={name}
//                                         className="w-full h-40 object-cover rounded-lg mb-4"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
//                                       <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                       <p className="text-gray-500 text-sm italic">{description}</p>
//                                     </Link>
//                                   );
//                                 })}
//                               {serviceData[selectedService].filter((item): item is Translator => 'translatorName' in item)
//                                 .length === 0 && (
//                                 <div className="text-center py-4 col-span-full">
//                                   <p className="text-lg text-gray-500">No active translators found.</p>
//                                 </div>
//                               )}
//                             </div>
//                             <div className="mt-8 text-center">
//                               <Link
//                                 to={serviceRoutes['Translators']}
//                                 className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 mr-4"
//                               >
//                                 Explore Translators
//                               </Link>
//                             </div>
//                             <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Chefs</h4>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                               {serviceData[selectedService]
//                                 .filter((item): item is Chef => 'chefName' in item)
//                                 .slice(0, 3)
//                                 .map((item, index) => {
//                                   const { name, details, description, image } = renderItemFields(item);
//                                   return (
//                                     <Link
//                                       to={getDetailRoute(item)}
//                                       key={index}
//                                       className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                                     >
//                                       <img
//                                         src={image}
//                                         alt={name}
//                                         className="w-full h-40 object-cover rounded-lg mb-4"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
//                                       <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                       <p className="text-gray-500 text-sm italic">{description}</p>
//                                     </Link>
//                                   );
//                                 })}
//                               {serviceData[selectedService].filter((item): item is Chef => 'chefName' in item).length ===
//                                 0 && (
//                                 <div className="text-center py-4 col-span-full">
//                                   <p className="text-lg text-gray-500">No active chefs found.</p>
//                                 </div>
//                               )}
//                             </div>
//                             <div className="mt-8 text-center">
//                               <Link
//                                 to={serviceRoutes['Chefs']}
//                                 className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
//                               >
//                                 Explore Chefs
//                               </Link>
//                             </div>
//                           </>
//                         )}
//                         {selectedService !== 'Spa & Physiotherapy' && selectedService !== 'Translators & Chefs' && (
//                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {selectedService === 'Pharmacy'
//                               ? pharmacyCategories.slice(0, 6).map((category) => (
//                                   <div
//                                     key={category.categoryId}
//                                     onClick={() => handleCategoryClick(category.categoryName)}
//                                     className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                                   >
//                                     <img
//                                       src={
//                                         category.categoryImage ||
//                                         'https://placehold.co/300x200?text=No+Image'
//                                       }
//                                       alt={category.categoryName}
//                                       className="w-full h-40 object-cover rounded-lg mb-4"
//                                     />
//                                     <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                                       {category.categoryName}
//                                     </h4>
//                                     <p className="text-gray-500 text-sm">{category.categoryDescription}</p>
//                                   </div>
//                                 ))
//                               : serviceData[selectedService].slice(0, 6).map((item, index) => {
//                                   const { name, details, description, image } = renderItemFields(item);
//                                   return (
//                                     <Link
//                                       to={getDetailRoute(item)}
//                                       key={index}
//                                       className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                                     >
//                                       <img
//                                         src={image}
//                                         alt={name}
//                                         className="w-full h-40 object-cover rounded-lg mb-4"
//                                       />
//                                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
//                                       <p className="text-gray-600 text-sm mb-2">{details}</p>
//                                       <p className="text-gray-500 text-sm italic">{description}</p>
//                                     </Link>
//                                   );
//                                 })}
//                           </div>
//                         )}
//                         {selectedService !== 'Spa & Physiotherapy' && selectedService !== 'Translators & Chefs' && (
//                           <div className="mt-8 text-center">
//                             <Link
//                               to={serviceRoutes[selectedService]}
//                               className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
//                             >
//                               Explore More
//                             </Link>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
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
    hositalName: string;
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
  testDescription: string;
  testImage: string;
  testDepartment: string;
  status: string | null;
}

interface Physio {
  physioId: number;
  physioName: string;
  physioDescription: string;
  physioImage: string;
  rating: string;
  address: string;
  price: string;
  location: any;
  status: string | null;
}

interface Spa {
  spaId: number;
  spaName: string;
  spaDescription: string | null;
  spaImage: string | null;
  rating: string | null;
  address: string | null;
  locationId: number | null;
  status: string | null;
}

interface Hospital {
  hospitalId: number;
  hositalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  doctors: Doctor[];
  status: string | null;
}

interface Hotel {
  hotelId: number;
  hotelName: string;
  hotelDescription: string;
  hotelImage: string;
  hotelDetails: string;
  status: string | null;
}

interface Travel {
  travelId: number;
  travelName: string;
  travelDescription: string;
  travelImage: string;
  travelDetails: string;
  status: string | null;
}

interface Translator {
  translatorID: number;
  translatorName: string;
  translatorDescription: string;
  translatorImage: string;
  translatorLanguages: string;
  status: string | null;
}

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
  status: string | null;
}

interface Pharmacy {
  pharmacyId: number;
  pharmacyName: string;
  pharmacyDescription: string;
  pharmacyImage: string;
  pharmacyDetails: string;
  status: string | null;
}

interface PharmacyCategory {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  route: string;
  status: string | null;
}

type ServiceItem = Doctor | LabTest | Spa | Physio | Hospital | Hotel | Travel | Translator | Chef | Pharmacy;

const AppointmentSection = () => {
  const [doctorSearch, setDoctorSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState<
    Record<string, (Doctor | LabTest | Spa | Physio | Hospital | Hotel | Travel | Translator | Chef | Pharmacy)[]>
  >({
    'Find a Doctor': [],
    'Book a Test': [],
    'Spa & Physiotherapy': [],
    'Locate Hospital': [],
    'Hotel Booking': [],
    'Travel Booking': [],
    'Translators & Chefs': [],
    Pharmacy: [],
  });
  const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const serviceRoutes: Record<string, string> = {
    'Find a Doctor': '/doctors',
    'Book a Test': '/tests',
    'Spa & Physiotherapy': '/ServiceListingPage',
    Spa: '/ServiceListingPage/spa',
    Physiotherapy: '/ServiceListingPage/physio',
    'Locate Hospital': '/OurHospitals',
    'Hotel Booking': '/hotels',
    'Travel Booking': '/travel',
    'Translators & Chefs': '/translatorAndChefList',
    Translators: '/translatorAndChefList/translator',
    Chefs: '/translatorAndChefList/chef',
    Pharmacy: '/medicinecatalog',
  };
const base_url = 'https://healthtourism-5.onrender.com';
  const apiEndpoints: Record<string, string> = {
    'Find a Doctor': 'https://healthtourism-5.onrender.com/api/doctors',
    'Book a Test': 'https://healthtourism-5.onrender.com/api/diagnostics',
    Spa: 'https://healthtourism-5.onrender.com/spaCenter/all',
    Physiotherapy: 'https://healthtourism-5.onrender.com/physio/all',
    'Locate Hospital': 'https://healthtourism-5.onrender.com/api/hospitals',
    'Hotel Booking': 'https://healthtourism-5.onrender.com/api/hotels',
    'Travel Booking': 'https://healthtourism-5.onrender.com/api/travel',
    Translators: 'https://healthtourism-5.onrender.com/api/translators',
    Chefs: 'https://healthtourism-5.onrender.com/api/chefs',
    Pharmacy: 'https://healthtourism-5.onrender.com/cart-item/user/capsules-user',
    pharmacyCategories: 'https://healthtourism-5.onrender.com/api/pharmacy-categories',
  };

  useEffect(() => {
    if (!selectedService) return;

    const fetchServiceData = async () => {
      setLoading((prev) => ({ ...prev, [selectedService]: true }));
      setError((prev) => ({ ...prev, [selectedService]: '' }));

      try {
        if (selectedService === 'Spa & Physiotherapy') {
          const [spasRes, physiosRes] = await Promise.all([
            axios.get(apiEndpoints['Spa']).catch(() => ({ data: [] })),
            axios.get(apiEndpoints['Physiotherapy']).catch(() => ({ data: [] })),
          ]);
          const activeSpas = filterActive(spasRes.data).slice(0, 3);
          const activePhysios = filterActive(physiosRes.data).slice(0, 3);
          setServiceData((prev) => ({
            ...prev,
            'Spa & Physiotherapy': [...activeSpas, ...activePhysios],
          }));
        } else if (selectedService === 'Translators & Chefs') {
          const [translatorsRes, chefsRes] = await Promise.all([
            axios.get(apiEndpoints['Translators']).catch(() => ({ data: [] })),
            axios.get(apiEndpoints['Chefs']).catch(() => ({ data: [] })),
          ]);
          const activeTranslators = filterActive(translatorsRes.data).slice(0, 3);
          const activeChefs = filterActive(chefsRes.data).slice(0, 3);
          setServiceData((prev) => ({
            ...prev,
            'Translators & Chefs': [...activeTranslators, ...activeChefs],
          }));
        } else if (selectedService === 'Pharmacy') {
          const [pharmaciesRes, categoriesRes] = await Promise.all([
            axios.get(apiEndpoints['Pharmacy']).catch(() => ({ data: [] })),
            axios.get(apiEndpoints['pharmacyCategories']).catch(() => ({ data: [] })),
          ]);
          setServiceData((prev) => ({
            ...prev,
            Pharmacy: filterActive(pharmaciesRes.data).slice(0, 6),
          }));
          setPharmacyCategories(filterActive(categoriesRes.data).slice(0, 6));
        } else {
          const res = await axios.get(apiEndpoints[selectedService]).catch(() => ({ data: [] }));
          setServiceData((prev) => ({
            ...prev,
            [selectedService]: filterActive(res.data).slice(0, 6),
          }));
        }
      } catch (err) {
        setError((prev) => ({
          ...prev,
          [selectedService]: `Failed to fetch ${selectedService} data. Please try again later.`,
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [selectedService]: false }));
      }
    };

    fetchServiceData();
  }, [selectedService]);

  const filterActive = <T extends { status: string | null }>(items: T[]): T[] => {
    return items.filter(
      (item) =>
        item.status &&
        typeof item.status === 'string' &&
        item.status.trim().toUpperCase() === 'ACTIVE'
    );
  };

  const handleBookAppointment = () => {
    if (!doctorSearch || !location) {
      alert('Please enter a doctor search term and select a location.');
      return;
    }
    navigate(`/booking?doctor=${encodeURIComponent(doctorSearch)}&location=${encodeURIComponent(location)}`);
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(selectedService === service ? null : service);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/PharmacyCategoryPage?category=${encodeURIComponent(categoryName)}`);
  };

  const getDetailRoute = (item: ServiceItem): string => {
    if ('id' in item && 'department' in item) return `/hospitaldoctors/${item.id}`;
    if ('testTitle' in item) return `/tests/${item.id}`;
    if ('spaName' in item) return `/ServiceListingPage/spa/${item.spaId}`;
    if ('physioName' in item) return `/ServiceListingPage/physio/${item.physioId}`;
    if ('hositalName' in item) return `/OurHospitals/${item.hospitalId}`;
    if ('hotelName' in item) return `/hotels/${item.hotelId}`;
    if ('travelName' in item) return `/travel/${item.travelId}`;
    if ('translatorName' in item) return `/translatorAndChefList/translator/${item.translatorID}`;
    if ('chefName' in item) return `/translatorAndChefList/chef/${item.chefID}`;
    if ('pharmacyName' in item) return `/PharmacyCategoryPage/${item.pharmacyId}`;
    return '#';
  };

  const renderItemFields = (item: ServiceItem) => {
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
    if ('spaName' in item || 'physioName' in item) {
      return {
        name: 'spaName' in item ? item.spaName : item.physioName,
        details: item.address || 'No address provided',
        description:
          'spaDescription' in item
            ? item.spaDescription || 'No description provided'
            : item.physioDescription || 'No description provided',
        image:
          'spaImage' in item
            ? item.spaImage || defaultFields.image
            : item.physioImage || defaultFields.image,
      };
    }
    if ('hositalName' in item && 'hospitalDescription' in item) {
      return {
        name: item.hositalName,
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
    if ('translatorName' in item || 'chefName' in item) {
      return {
        name: 'translatorName' in item ? item.translatorName : item.chefName,
        details: 'translatorLanguages' in item ? item.translatorLanguages : item.styles,
        description:
          'translatorDescription' in item
            ? item.translatorDescription
            : item.chefDescription,
        image:
          'translatorImage' in item
            ? item.translatorImage || defaultFields.image
            : item.chefImage || defaultFields.image,
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

  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Schedule Your Appointment Online
          </h2>
          <p className="text-center text-sm text-gray-600 mb-4">
            Current time: {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
          </p>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for Doctor"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
                  aria-label="Search for a doctor"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
                  aria-label="Choose a location"
                >
                  <option value="">Choose Location</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                  <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                  <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleBookAppointment}
                  className="bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                  aria-label="Book an appointment"
                >
                  Book an Appointment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
              {Object.keys(serviceRoutes)
                .filter((service) => !['Spa', 'Physiotherapy', 'Translators', 'Chefs'].includes(service))
                .map((service) => (
                  <button
                    key={service}
                    onClick={() => handleServiceClick(service)}
                    className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-[#499E14] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2 ${
                      selectedService === service ? 'border-[#499E14] bg-[#f0f8e8]' : ''
                    }`}
                    aria-label={`Select ${service}`}
                  >
                    <div className="p-4 flex flex-col items-center justify-center">
                      <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                        {service === 'Find a Doctor' && <User className="h-6 w-6 text-[#499E14]" />}
                        {service === 'Book a Test' && <Calendar className="h-6 w-6 text-[#499E14]" />}
                        {service === 'Spa & Physiotherapy' && (
                          <div className="flex gap-1">
                            <FaSpa className="h-6 w-6 text-[#499E14]" />
                            <TbPhysotherapist className="h-6 w-6 text-[#499E14]" />
                          </div>
                        )}
                        {service === 'Locate Hospital' && <MapPin className="h-6 w-6 text-[#499E14]" />}
                        {service === 'Hotel Booking' && <Hotel className="h-6 w-6 text-[#499E14]" />}
                        {service === 'Travel Booking' && <Plane className="h-6 w-6 text-[#499E14]" />}
                        {service === 'Translators & Chefs' && (
                          <div className="flex gap-1">
                            <PaperAirplaneIcon className="h-6 w-6 text-[#499E14]" />
                            <FaUtensils className="h-6 w-6 text-[#499E14]" />
                          </div>
                        )}
                        {service === 'Pharmacy' && <Pill className="h-6 w-6 text-[#499E14]" />}
                      </div>
                      <p className="text-sm font-medium text-gray-800">{service}</p>
                    </div>
                  </button>
                ))}
            </div>

            {selectedService && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedService}</h3>
                {loading[selectedService] && (
                  <div className="flex justify-center py-4">
                    <svg
                      className="animate-spin h-6 w-6 text-[#499E14]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  </div>
                )}
                {error[selectedService] && !loading[selectedService] && (
                  <div className="text-center py-4">
                    <p className="text-lg text-red-500">{error[selectedService]}</p>
                  </div>
                )}
                {!loading[selectedService] && !error[selectedService] && (
                  <>
                    {serviceData[selectedService].length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-lg text-gray-500">No active {selectedService} found.</p>
                      </div>
                    ) : (
                      <>
                        {selectedService === 'Spa & Physiotherapy' && (
                          <>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Spas</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {serviceData[selectedService]
                                .filter((item): item is Spa => 'spaName' in item)
                                .slice(0, 3)
                                .map((item, index) => {
                                  const { name, details, description, image } = renderItemFields(item);
                                  return (
                                    <Link
                                      to={getDetailRoute(item)}
                                      key={index}
                                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                      aria-label={`View details for ${name}`}
                                    >
                                      <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                        loading="lazy"
                                      />
                                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
                                      <p className="text-gray-600 text-sm mb-2">{details}</p>
                                      <p className="text-gray-500 text-sm italic">{description}</p>
                                    </Link>
                                  );
                                })}
                              {serviceData[selectedService].filter((item): item is Spa => 'spaName' in item).length === 0 && (
                                <div className="text-center py-4 col-span-full">
                                  <p className="text-lg text-gray-500">No active spas found.</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-8 text-center">
                              <Link
                                to={serviceRoutes['Spa']}
                                className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 mr-4 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                aria-label="Explore more spas"
                              >
                                Explore Spas
                              </Link>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Physiotherapy</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {serviceData[selectedService]
                                .filter((item): item is Physio => 'physioName' in item)
                                .slice(0, 3)
                                .map((item, index) => {
                                  const { name, details, description, image } = renderItemFields(item);
                                  return (
                                    <Link
                                      to={getDetailRoute(item)}
                                      key={index}
                                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                      aria-label={`View details for ${name}`}
                                    >
                                      <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                        loading="lazy"
                                      />
                                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
                                      <p className="text-gray-600 text-sm mb-2">{details}</p>
                                      <p className="text-gray-500 text-sm italic">{description}</p>
                                    </Link>
                                  );
                                })}
                              {serviceData[selectedService].filter((item): item is Physio => 'physioName' in item).length === 0 && (
                                <div className="text-center py-4 col-span-full">
                                  <p className="text-lg text-gray-500">No active physiotherapy services found.</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-8 text-center">
                              <Link
                                to={serviceRoutes['Physiotherapy']}
                                className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                aria-label="Explore more physiotherapy services"
                              >
                                Explore Physiotherapy
                              </Link>
                            </div>
                          </>
                        )}
                        {selectedService === 'Translators & Chefs' && (
                          <>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Translators</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {serviceData[selectedService]
                                .filter((item): item is Translator => 'translatorName' in item)
                                .slice(0, 3)
                                .map((item, index) => {
                                  const { name, details, description, image } = renderItemFields(item);
                                  return (
                                    <Link
                                      to={getDetailRoute(item)}
                                      key={index}
                                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                      aria-label={`View details for ${name}`}
                                    >
                                      <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                        loading="lazy"
                                      />
                                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
                                      <p className="text-gray-600 text-sm mb-2">{details}</p>
                                      <p className="text-gray-500 text-sm italic">{description}</p>
                                    </Link>
                                  );
                                })}
                              {serviceData[selectedService].filter((item): item is Translator => 'translatorName' in item).length === 0 && (
                                <div className="text-center py-4 col-span-full">
                                  <p className="text-lg text-gray-500">No active translators found.</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-8 text-center">
                              <Link
                                to={serviceRoutes['Translators']}
                                className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 mr-4 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                aria-label="Explore more translators"
                              >
                                Explore Translators
                              </Link>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Chefs</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {serviceData[selectedService]
                                .filter((item): item is Chef => 'chefName' in item)
                                .slice(0, 3)
                                .map((item, index) => {
                                  const { name, details, description, image } = renderItemFields(item);
                                  return (
                                    <Link
                                      to={getDetailRoute(item)}
                                      key={index}
                                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                      aria-label={`View details for ${name}`}
                                    >
                                      <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                        loading="lazy"
                                      />
                                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
                                      <p className="text-gray-600 text-sm mb-2">{details}</p>
                                      <p className="text-gray-500 text-sm italic">{description}</p>
                                    </Link>
                                  );
                                })}
                              {serviceData[selectedService].filter((item): item is Chef => 'chefName' in item).length === 0 && (
                                <div className="text-center py-4 col-span-full">
                                  <p className="text-lg text-gray-500">No active chefs found.</p>
                                </div>
                              )}
                            </div>
                            <div className="mt-8 text-center">
                              <Link
                                to={serviceRoutes['Chefs']}
                                className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                aria-label="Explore more chefs"
                              >
                                Explore Chefs
                              </Link>
                            </div>
                          </>
                        )}
                        {selectedService !== 'Spa & Physiotherapy' && selectedService !== 'Translators & Chefs' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedService === 'Pharmacy'
                              ? pharmacyCategories.slice(0, 6).map((category) => (
                                  <button
                                    key={category.categoryId}
                                    onClick={() => handleCategoryClick(category.categoryName)}
                                    className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                    aria-label={`View ${category.categoryName} category`}
                                  >
                                    <img
                                      src={category.categoryImage || 'https://placehold.co/300x200?text=No+Image'}
                                      alt={category.categoryName}
                                      className="w-full h-40 object-cover rounded-lg mb-4"
                                      loading="lazy"
                                    />
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{category.categoryName}</h4>
                                    <p className="text-gray-500 text-sm">{category.categoryDescription}</p>
                                  </button>
                                ))
                              : serviceData[selectedService].slice(0, 6).map((item, index) => {
                                  const { name, details, description, image } = renderItemFields(item);
                                  return (
                                    <Link
                                      to={getDetailRoute(item)}
                                      key={index}
                                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                                      aria-label={`View details for ${name}`}
                                    >
                                      <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                        loading="lazy"
                                      />
                                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
                                      <p className="text-gray-600 text-sm mb-2">{details}</p>
                                      <p className="text-gray-500 text-sm italic">{description}</p>
                                    </Link>
                                  );
                                })}
                          </div>
                        )}
                        {selectedService !== 'Spa & Physiotherapy' && selectedService !== 'Translators & Chefs' && (
                          <div className="mt-8 text-center">
                            <Link
                              to={serviceRoutes[selectedService]}
                              className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
                              aria-label={`Explore more ${selectedService}`}
                            >
                              Explore More
                            </Link>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;