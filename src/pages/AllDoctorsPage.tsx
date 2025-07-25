// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   FaSearch, FaTimes, FaStar, FaMapMarkerAlt, FaGlobe, FaHeart,
//   FaBrain, FaStethoscope, FaBaby, FaHeadSideVirus, FaUserMd,
// } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import Modal from 'react-modal';
// import debounce from 'lodash.debounce';
// import Select, { SingleValue, StylesConfig } from 'react-select';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';

// Modal.setAppElement('#root');

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface Hospital {
//   hospitalId: number;
//   hospitalName: string;
//   hospitalDescription: string;
//   hospitalImage: string;
//   rating: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface Location {
//   id: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface Doctor {
//   id: number;
//   name: string;
//   email: string;
//   rating: number;
//   description: string;
//   department: string;
//   profilepic: string;
//   hospital: Hospital;
//   city: string;
//   state: string;
//   country: string;
// }

// interface SpecializationOption {
//   value: string;
//   label: string;
//   icon: React.ReactNode;
// }

// const AllDoctorsPage: React.FC = () => {
//   const [groupedDoctors, setGroupedDoctors] = useState<{ [key: string]: Doctor[] }>({});
//   const [filteredDoctors, setFilteredDoctors] = useState<{ [key: string]: Doctor[] }>({});
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [specializationFilter, setSpecializationFilter] = useState<SingleValue<SpecializationOption>>(null);
//   const [hospitalFilter, setHospitalFilter] = useState('All Hospitals');
//   const [locationFilters, setLocationFilters] = useState({
//     city: '',
//     state: '',
//     country: '',
//   });
//   const [quickFilter, setQuickFilter] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [experienceFilter, setExperienceFilter] = useState<'All' | '0-5 Years' | '5-10 Years' | '10+ Years'>('All');
//   const [showFeedback, setShowFeedback] = useState<string | null>(null);

//   const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
//   const navigate = useNavigate();

//   const fetchDoctors = async () => {
//     try {
//       // Fetch doctors
//       const doctorsResponse = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
//       const doctors = doctorsResponse.data;
//       setAllDoctors(doctors);

//       // Fetch locations
//       const locationsResponse = await axios.get<Location[]>(`${BASE_URL}/api/locations/getall`);
//       setLocations(locationsResponse.data);

//       const grouped = doctors.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
//         const hospitalName = doctor.hospital?.hospitalName || 'Unknown Hospital';
//         if (!acc[hospitalName]) acc[hospitalName] = [];
//         acc[hospitalName].push(doctor);
//         return acc;
//       }, {});
//       setGroupedDoctors(grouped);
//       setFilteredDoctors(grouped);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const debouncedSearch = useMemo(
//     () => debounce((term: string) => setSearchTerm(term), 300),
//     []
//   );

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     debouncedSearch(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setShowFeedback('Search cleared!');
//     setTimeout(() => setShowFeedback(null), 2000);
//   };

//   const getSpecializationIcon = (spec: string): React.ReactNode => {
//     const icons: { [key: string]: React.ReactNode } = {
//       Orthopedic: <FaHeart />,
//       Neurology: <FaBrain />,
//       Dermatology: <FaStethoscope />,
//       Pediatrician: <FaBaby />,
//       Psychiatrist: <FaHeadSideVirus />,
//     };
//     return icons[spec] || <FaUserMd />;
//   };

//   const specializations: SpecializationOption[] = useMemo(() => {
//     const uniqueSpecs = Array.from(new Set(allDoctors.map((d) => d.department)));
//     return [
//       { value: '', label: 'All Specializations', icon: <FaGlobe /> },
//       ...uniqueSpecs.map((spec) => ({
//         value: spec,
//         label: spec,
//         icon: getSpecializationIcon(spec),
//       })),
//     ];
//   }, [allDoctors]);

//   const hospitals = useMemo(() => {
//     return ['All Hospitals', ...Array.from(new Set(allDoctors.map((d) => d.hospital?.hospitalName || 'Unknown Hospital')))];
//   }, [allDoctors]);

//   // Get unique locations from locations API
//   const uniqueLocations = useMemo(() => {
//     return {
//       cities: [...new Set(locations.map(l => l.city))].sort(),
//       states: [...new Set(locations.map(l => l.state))].sort(),
//       countries: [...new Set(locations.map(l => l.country))].sort(),
//     };
//   }, [locations]);

//   useEffect(() => {
//     let filtered = { ...groupedDoctors };
    
//     // Apply location filters
//     if (locationFilters.city || locationFilters.state || locationFilters.country) {
//       Object.keys(filtered).forEach(key => {
//         filtered[key] = filtered[key].filter(doctor => 
//           (!locationFilters.city || doctor.city === locationFilters.city) &&
//           (!locationFilters.state || doctor.state === locationFilters.state) &&
//           (!locationFilters.country || doctor.country === locationFilters.country)
//         );
//       });
//     }

//     // Apply existing filters
//     if (searchTerm) {
//       Object.keys(filtered).forEach(key => {
//         filtered[key] = filtered[key].filter(doctor =>
//           doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       });
//     }

//     if (specializationFilter) {
//       Object.keys(filtered).forEach(key => {
//         filtered[key] = filtered[key].filter(doctor =>
//           doctor.department === specializationFilter.value
//         );
//       });
//     }

//     if (hospitalFilter !== 'All Hospitals') {
//       Object.keys(filtered).forEach(key => {
//         filtered[key] = filtered[key].filter(doctor =>
//           doctor.hospital.hospitalName === hospitalFilter
//         );
//       });
//     }

//     // Remove empty categories
//     filtered = Object.fromEntries(
//       Object.entries(filtered).filter(([_, doctors]) => doctors.length > 0)
//     );

//     setFilteredDoctors(filtered);
//   }, [groupedDoctors, searchTerm, specializationFilter, hospitalFilter, locationFilters]);

//   const openModal = (doctor: Doctor) => {
//     setSelectedDoctor(doctor);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedDoctor(null);
//   };

//   const handleLocationFilterChange = (field: 'city' | 'state' | 'country', value: string) => {
//     setLocationFilters(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const clearFilters = () => {
//     setSpecializationFilter(null);
//     setHospitalFilter('All Hospitals');
//     setSearchTerm('');
//     setQuickFilter('');
//     setExperienceFilter('All');
//     setLocationFilters({ city: '', state: '', country: '' });
//     setShowFeedback('Filters cleared!');
//     setTimeout(() => setShowFeedback(null), 2000);
//   };

//   const handleBookNow = (doctorId: number) => {
//     navigate(`/booking/doctor/${doctorId}`);
//   };

//   const totalDoctors = Object.values(filteredDoctors).reduce((sum, docs) => sum + docs.length, 0);

//   const selectStyles: StylesConfig<SelectOption> = {
//     control: (baseStyles) => ({
//       ...baseStyles,
//       borderRadius: '0.5rem',
//       border: '1px solid #e5e7eb',
//       backgroundColor: '#ffffff',
//       fontSize: '0.875rem',
//       minHeight: '2.5rem',
//       boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//       '&:hover': { borderColor: '#3b82f6' },
//     }),
//     menu: (baseStyles) => ({
//       ...baseStyles,
//       borderRadius: '0.5rem',
//       backgroundColor: '#ffffff',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//     }),
//     option: (baseStyles, { isSelected, isFocused }) => ({
//       ...baseStyles,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.75rem 1rem',
//       backgroundColor: isSelected ? '#3b82f6' : isFocused ? '#f3f4f6' : '#ffffff',
//       color: isSelected ? '#ffffff' : '#111827',
//       '&:hover': { backgroundColor: isSelected ? '#3b82f6' : '#f3f4f6' },
//     }),
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col space-y-4 mb-8">
//           {/* Search and filters */}
//           <div className="flex flex-wrap gap-4 items-center justify-center bg-white p-4 rounded-lg shadow">
//             {/* Existing search input */}
//             <div className="relative flex-1 min-w-[200px] max-w-md">
//               <input
//                 type="text"
//                 placeholder="Search doctors by name or specialization..."
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm('')}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimes />
//                 </button>
//               )}
//             </div>

//             {/* Location filters */}
//             <Select<SelectOption>
//               className="min-w-[200px]"
//               placeholder="Filter by City"
//               value={locationFilters.city ? { value: locationFilters.city, label: locationFilters.city } : null}
//               onChange={(option) => handleLocationFilterChange('city', option?.value || '')}
//               options={uniqueLocations.cities.map(city => ({ value: city, label: city }))}
//               isClearable
//               styles={selectStyles}
//             />

//             <Select<SelectOption>
//               className="min-w-[200px]"
//               placeholder="Filter by State"
//               value={locationFilters.state ? { value: locationFilters.state, label: locationFilters.state } : null}
//               onChange={(option) => handleLocationFilterChange('state', option?.value || '')}
//               options={uniqueLocations.states.map(state => ({ value: state, label: state }))}
//               isClearable
//               styles={selectStyles}
//             />

//             <Select<SelectOption>
//               className="min-w-[200px]"
//               placeholder="Filter by Country"
//               value={locationFilters.country ? { value: locationFilters.country, label: locationFilters.country } : null}
//               onChange={(option) => handleLocationFilterChange('country', option?.value || '')}
//               options={uniqueLocations.countries.map(country => ({ value: country, label: country }))}
//               isClearable
//               styles={selectStyles}
//             />

//             {/* Existing specialization filter */}
//             <Select
//               className="min-w-[200px]"
//               placeholder="Filter by Specialization"
//               value={specializationFilter}
//               onChange={(option) => setSpecializationFilter(option as SingleValue<SpecializationOption>)}
//               options={specializations}
//               isClearable
//               styles={selectStyles}
//             />

//             {/* Clear all filters button */}
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSpecializationFilter(null);
//                 setHospitalFilter('All Hospitals');
//                 setLocationFilters({ city: '', state: '', country: '' });
//                 setShowFeedback('Filters cleared!');
//                 setTimeout(() => setShowFeedback(null), 2000);
//               }}
//               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
//               disabled={!searchTerm && !specializationFilter && !locationFilters.city && !locationFilters.state && !locationFilters.country && hospitalFilter === 'All Hospitals'}
//             >
//               Clear All Filters
//             </button>
//           </div>

//           {/* No results message */}
//           {Object.keys(filteredDoctors).length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-500 text-lg">No doctors found matching your filters.</p>
//             </div>
//           )}

//           {/* Doctors List */}
//           {isLoading ? (
//             <div className="text-center text-gray-600">Loading doctors...</div>
//           ) : Object.entries(filteredDoctors).length === 0 ? (
//             <div className="text-center text-gray-600">No doctors found matching your criteria.</div>
//           ) : (
//             Object.entries(filteredDoctors).map(([hospitalName, doctors]) => (
//               <div key={hospitalName} className="mb-8">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">{hospitalName}</h3>
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   {doctors.map((doctor) => (
//                     <motion.div
//                       key={doctor.id}
//                       className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
//                       whileHover={{ scale: 1.03 }}
//                       onClick={() => openModal(doctor)}
//                     >
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={doctor.profilepic}
//                           alt={doctor.name}
//                           className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
//                         />
//                         <div>
//                          Name: <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
//                          Department: <p className="text-sm text-gray-600">{doctor.department}</p>
//                          Rating: <p className="text-sm text-yellow-500 flex items-center gap-1">
//                             <FaStar /> {doctor.rating}
//                           </p>
//                          Description: <p className="text-sm text-gray-500">
//                             {doctor.description}
//                           </p>
                          
//                         </div>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleBookNow(doctor.id);
//                         }}
//                         className="mt-4 w-full bg-[#499E14] text-white px-4 py-2 rounded-lg hover:bg-[#3D8211] transition-colors text-sm font-medium"
//                       >
//                         Book Now
//                       </button>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}

//           {/* Modal */}
//           <Modal
//             isOpen={modalIsOpen}
//             onRequestClose={closeModal}
//             className="max-w-lg mx-auto mt-20 bg-white rounded-xl shadow-2xl p-6 outline-none"
//             overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//           >
//             {selectedDoctor && (
//               <div className="relative">
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
//                 >
//                   <FaTimes className="w-5 h-5" />
//                 </button>
//                 <div className="flex flex-col items-center">
//                   <img
//                     src={selectedDoctor.profilepic}
//                     alt={selectedDoctor.name}
//                     className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-100"
//                   />
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedDoctor.name}</h2>
//                   <p className="text-sm text-gray-600 mb-4">{selectedDoctor.department}</p>
//                 </div>
//                 <div className="space-y-3 text-sm text-gray-700">
//                   <p><strong className="font-medium">Rating:</strong> {selectedDoctor.rating} <FaStar className="inline text-yellow-500" /></p>
//                   <p><strong className="font-medium">Description:</strong> {selectedDoctor.description}</p>
//                   <p><strong className="font-medium">Hospital:</strong> {selectedDoctor.hospital.hospitalName}</p>
//                   <p className="flex items-start">
//                     <strong className="font-medium">Address:</strong>
//                     <span className="ml-1">{selectedDoctor.hospital.address}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleBookNow(selectedDoctor.id)}
//                   className="mt-6 w-full bg-[#499E14] text-white px-4 py-2 rounded-lg hover:bg-[#3D8211] transition-colors text-sm font-medium"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             )}
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllDoctorsPage;
import React, { useState, useEffect, useMemo } from "react";
import {
  FaStar, FaHeart, FaBrain, FaStethoscope, FaBaby,
  FaHeadSideVirus, FaUserMd, FaSearch, FaTimes
} from "react-icons/fa";
import debounce from "lodash.debounce";
import Select, { SingleValue, StylesConfig } from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/config";

// Make sure Tailwind's line-clamp plugin is enabled in your tailwind.config.js!

interface SelectOption { value: string; label: string; }
interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  city: string; state: string; country: string;
}
interface Location { id: string; city: string; state: string; country: string; }
interface Doctor {
  id: number; name: string; email: string; rating: number;
  description: string; department: string; profilepic: string;
  hospital: Hospital; city: string; state: string; country: string;
  experience?: string; gender?: string;
}
interface SpecializationOption { value: string; label: string; icon: React.ReactNode; }

const AllDoctorsPage: React.FC = () => {
  const [groupedDoctors, setGroupedDoctors] = useState<{ [key: string]: Doctor[] }>({});
  const [filteredDoctors, setFilteredDoctors] = useState<{ [key: string]: Doctor[] }>({});
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState<SingleValue<SpecializationOption>>(null);
  const [hospitalFilter, setHospitalFilter] = useState("All Hospitals");
  const [locationFilters, setLocationFilters] = useState({ city: "", state: "", country: "" });
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const doctorsResponse = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
      setAllDoctors(doctorsResponse.data);
      const locationsResponse = await axios.get<Location[]>(`${BASE_URL}/api/locations/getall`);
      setLocations(locationsResponse.data);
      const grouped = doctorsResponse.data.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
        const hospitalName = doctor.hospital?.hospitalName || "Unknown Hospital";
        if (!acc[hospitalName]) acc[hospitalName] = [];
        acc[hospitalName].push(doctor);
        return acc;
      }, {});
      setGroupedDoctors(grouped);
      setFilteredDoctors(grouped);
    } catch {}
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchDoctors(); }, []);
  const debouncedSearch = useMemo(() => debounce((term: string) => setSearchTerm(term), 300), []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { debouncedSearch(e.target.value); };
  const clearSearch = () => {
    setSearchTerm("");
    setShowFeedback("Search cleared!");
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const deptColor = (spec: string) => {
    const color: { [k: string]: string } = {
      Orthopedic: "bg-blue-200 text-blue-800",
      Neurology: "bg-purple-200 text-purple-700",
      Dermatology: "bg-pink-200 text-pink-700",
      Pediatrician: "bg-yellow-200 text-yellow-700",
      Psychiatrist: "bg-rose-200 text-rose-700",
    };
    return color[spec] ?? "bg-cyan-100 text-cyan-700";
  };
  const getSpecializationIcon = (spec: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Orthopedic: <FaHeart className="text-blue-500"/>,
      Neurology: <FaBrain className="text-purple-600"/>,
      Dermatology: <FaStethoscope className="text-pink-600"/>,
      Pediatrician: <FaBaby className="text-yellow-600"/>,
      Psychiatrist: <FaHeadSideVirus className="text-rose-600"/>,
    };
    return icons[spec] || <FaUserMd className="text-gray-400"/>;
  };
  const specializations: SpecializationOption[] = useMemo(() => {
    const uniqueSpecs = Array.from(new Set(allDoctors.map((d) => d.department)));
    return [
      { value: "", label: "All Specializations", icon: <FaUserMd className="text-gray-500"/> },
      ...uniqueSpecs.map(spec => ({
        value: spec, label: spec, icon: getSpecializationIcon(spec)
      }))
    ];
  }, [allDoctors]);
  const hospitals = useMemo(() => [
    "All Hospitals",
    ...Array.from(new Set(allDoctors.map(d => d.hospital?.hospitalName || "Unknown Hospital")))
  ], [allDoctors]);
  const uniqueLocations = useMemo(() => ({
    cities: [...new Set(locations.map(l => l.city))].sort(),
    states: [...new Set(locations.map(l => l.state))].sort(),
    countries: [...new Set(locations.map(l => l.country))].sort(),
  }), [locations]);

  useEffect(() => {
    let filtered = { ...groupedDoctors };
    if (locationFilters.city || locationFilters.state || locationFilters.country)
      Object.keys(filtered).forEach(key => {
        filtered[key] = filtered[key].filter(doctor =>
          (!locationFilters.city || doctor.city === locationFilters.city) &&
          (!locationFilters.state || doctor.state === locationFilters.state) &&
          (!locationFilters.country || doctor.country === locationFilters.country)
        );
      });
    if (searchTerm)
      Object.keys(filtered).forEach(key => {
        filtered[key] = filtered[key].filter(doctor =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    if (specializationFilter)
      Object.keys(filtered).forEach(key => {
        filtered[key] = filtered[key].filter(doctor =>
          doctor.department === specializationFilter.value
        );
      });
    if (hospitalFilter !== "All Hospitals")
      Object.keys(filtered).forEach(key => {
        filtered[key] = filtered[key].filter(doctor =>
          doctor.hospital.hospitalName === hospitalFilter
        );
      });
    filtered = Object.fromEntries(Object.entries(filtered).filter(([_, d]) => d.length > 0));
    setFilteredDoctors(filtered);
  }, [groupedDoctors, searchTerm, specializationFilter, hospitalFilter, locationFilters]);

  const handleLocationFilterChange = (
    field: "city" | "state" | "country",
    value: string
  ) => setLocationFilters(prev => ({ ...prev, [field]: value }));

  const clearFilters = () => {
    setSpecializationFilter(null);
    setHospitalFilter("All Hospitals");
    setSearchTerm("");
    setLocationFilters({ city: "", state: "", country: "" });
    setShowFeedback("Filters cleared!");
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const handleBookNow = (doctorId: number) =>
    navigate(`/booking/doctor/${doctorId}`);

  const selectStyles: StylesConfig<SelectOption> = {
    control: base => ({
      ...base, borderRadius: "1rem", border: "1px solid #e1e4ea",
      minHeight: "2.8rem", background: "rgba(255,255,255,0.90)",
      boxShadow: "0 4px 16px -5px #b0b5c9"
    }),
    menu: base => ({
      ...base, borderRadius: "1rem", boxShadow: "0 2px 16px -3px #b0b5c9"
    }),
    option: (base, { isSelected, isFocused }) => ({
      ...base,
      display: "flex", alignItems: "center", gap: ".7rem", fontWeight: 500,
      background: isSelected ? "#2563eb" : isFocused ? "#eff2fe" : "#fff",
      color: isSelected ? "#fff" : "#222", minHeight: "2.3rem"
    }),
  };

  return (
    <div className="min-h-screen bg-blue-50/50 py-8 px-2 sm:px-4">
      {showFeedback &&
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 bg-black/80 px-6 py-3 text-white rounded-xl shadow-xl transition">
          {showFeedback}
        </div>
      }
      <div className="max-w-7xl mx-auto">

        {/* FILTER BAR */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-8 flex flex-wrap gap-4 items-center justify-center">
          {/* Search field */}
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="w-full pl-11 pr-7 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-lg" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-pink-500"
              >
                <FaTimes />
              </button>
            )}
          </div>
          {/* Filters */}
          <Select<SelectOption>
            className="min-w-[160px]"
            placeholder="City"
            value={locationFilters.city ? { value: locationFilters.city, label: locationFilters.city } : null}
            onChange={option => handleLocationFilterChange("city", option?.value || "")}
            options={uniqueLocations.cities.map(city => ({ value: city, label: city }))}
            isClearable styles={selectStyles}
          />
          <Select<SelectOption>
            className="min-w-[160px]"
            placeholder="State"
            value={locationFilters.state ? { value: locationFilters.state, label: locationFilters.state } : null}
            onChange={option => handleLocationFilterChange("state", option?.value || "")}
            options={uniqueLocations.states.map(state => ({ value: state, label: state }))}
            isClearable styles={selectStyles}
          />
          <Select<SelectOption>
            className="min-w-[160px]"
            placeholder="Country"
            value={locationFilters.country ? { value: locationFilters.country, label: locationFilters.country } : null}
            onChange={option => handleLocationFilterChange("country", option?.value || "")}
            options={uniqueLocations.countries.map(country => ({ value: country, label: country }))}
            isClearable styles={selectStyles}
          />
          <Select
            className="min-w-[180px]"
            placeholder="Specialization"
            value={specializationFilter}
            onChange={option => setSpecializationFilter(option as SingleValue<SpecializationOption>)}
            options={specializations}
            isClearable styles={selectStyles}
            formatOptionLabel={option => (
              <span className="flex items-center gap-1">
                {option.icon}{option.label}
              </span>
            )}
          />
          <Select<SelectOption>
            className="min-w-[180px]"
            placeholder="Hospital"
            value={hospitalFilter !== "All Hospitals"
              ? { value: hospitalFilter, label: hospitalFilter }
              : null
            }
            onChange={option => setHospitalFilter(option?.value || "All Hospitals")}
            options={hospitals.map(name => ({
              value: name,
              label: name === "Unknown Hospital" ? "Doctors" : name
            }))}
            isClearable styles={selectStyles}
          />
          <button
            onClick={clearFilters}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-200 to-blue-100 hover:from-blue-400 hover:to-blue-200 text-blue-800 shadow-md transition disabled:opacity-30 font-medium"
            disabled={
              !searchTerm && !specializationFilter &&
              !locationFilters.city && !locationFilters.state && !locationFilters.country &&
              hospitalFilter === "All Hospitals"
            }
          >Clear All</button>
        </div>

        {!isLoading && Object.keys(filteredDoctors).length === 0 &&
          <div className="text-center py-12"><p className="text-gray-500 text-xl">No doctors found matching your filters.</p></div>
        }

        {isLoading ? (
          <div className="text-center text-lg text-blue-600 pt-12">Loading doctors...</div>
        ) : (
          Object.entries(filteredDoctors).map(([hospitalName, doctors]) => (
            <section key={hospitalName} className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-5 px-2">
                {hospitalName === "Unknown Hospital" ? "Doctors" : hospitalName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white border border-blue-100 px-5 py-6 rounded-2xl shadow-xl flex flex-col h-full transition-all"
                  >
                    <div className="flex sm:flex-row flex-col items-start gap-6">
                      <img
                        src={doctor.profilepic}
                        alt={doctor.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-blue-200 shadow-md mx-auto sm:mx-0"
                      />
                      <div className="flex-1 w-full flex flex-col gap-2">
                        <div>
                          <span className="block text-xs font-bold text-blue-700 mb-0.5">Name</span>
                          <span className="text-blue-700 font-bold text-base block truncate">{doctor.name}</span>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-blue-700 mb-0.5">Description</span>
                          <span
                            className="block text-gray-800 font-medium text-sm line-clamp-2 overflow-hidden text-ellipsis"
                            title={doctor.description}
                          >
                            {doctor.description || "-"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-blue-700">Specialization</span>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl font-medium text-xs mt-1 ${deptColor(doctor.department)}`}>
                            {getSpecializationIcon(doctor.department)}
                            {doctor.department}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <div>
                            <span className="block text-xs font-bold text-blue-700">Experience</span>
                            <span className="text-gray-800 text-xs block">
                              {doctor.experience ?? "---"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-blue-700">Gender</span>
                            <span className="text-gray-800 text-xs block">
                              {doctor.gender ?? "N/A"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-blue-700">Hospital</span>
                          <span className="text-gray-700 text-sm font-semibold truncate">
                            {doctor?.hospital?.hospitalName === "Unknown Hospital" ? "Doctors" : doctor?.hospital?.hospitalName}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 gap-2">
                          <span className="block text-xs font-bold text-blue-700">Rating</span>
                          <span className="text-yellow-500 flex items-center gap-1 text-xs">
                            <FaStar />{doctor.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5">
                      <button
                        onClick={() => navigate(`/doctor-profile/${doctor.id}`)}
                        className="flex-1 text-blue-800 hover:underline text-xs font-semibold py-2 border border-blue-200 rounded-lg bg-slate-100 hover:bg-blue-50 transition"
                      >View Profile</button>
                      <button
                        onClick={() => handleBookNow(doctor.id)}
                        className="flex-1 bg-blue-900 text-white rounded-lg py-2 text-xs font-semibold shadow hover:bg-blue-800 transition"
                      >Book an Appointment</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default AllDoctorsPage;
