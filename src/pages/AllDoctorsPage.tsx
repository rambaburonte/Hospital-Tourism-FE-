
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   FaSearch, FaTimes, FaStar, FaMapMarkerAlt, FaGlobe, FaHeart,
//   FaBrain, FaStethoscope, FaBaby, FaHeadSideVirus, FaUserMd,
// } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import Modal from 'react-modal';
// import debounce from 'lodash.debounce';
// import Select, { SingleValue } from 'react-select';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// Modal.setAppElement('#root');

// interface Hospital {
//   hospitalId: number;
//   hositalName: string;
//   hospitalDescription: string;
//   hospitalImage: string;
//   rating: string;
//   address: string;
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
// }

// interface SpecializationOption {
//   value: string;
//   label: string;
//   icon: React.ReactNode;
// }

// const AllDoctorsPage: React.FC = () => {
//   const [groupedDoctors, setGroupedDoctors] = useState<{ [key: string]: Doctor[] }>({});
//   const [filteredDoctors, setFilteredDoctors] = useState<{ [key: string]: Doctor[] }>({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [specializationFilter, setSpecializationFilter] = useState<SingleValue<SpecializationOption>>(null);
//   const [hospitalFilter, setHospitalFilter] = useState('All Hospitals');
//   const [quickFilter, setQuickFilter] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [experienceFilter, setExperienceFilter] = useState<'All' | '0-5 Years' | '5-10 Years' | '10+ Years'>('All');
//   const [showFeedback, setShowFeedback] = useState<string | null>(null);

//   const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
//   // const base_url="https://healthtourism-5.onrender.com"
//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
//       const doctors = response.data;
//       setAllDoctors(doctors);

//       const grouped = doctors.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
//         const hospitalName = doctor.hospital?.hositalName || 'Unknown Hospital';
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
//     return ['All Hospitals', ...Array.from(new Set(allDoctors.map((d) => d.hospital?.hositalName || 'Unknown Hospital')))];
//   }, [allDoctors]);

//   useEffect(() => {
//     const filtered = Object.entries(groupedDoctors).reduce((acc: { [key: string]: Doctor[] }, [hospital, doctors]) => {
//       const filteredDocs = doctors.filter((doctor) =>
//         (searchTerm === '' ||
//           doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           hospital.toLowerCase().includes(searchTerm.toLowerCase())) &&
//         (!specializationFilter || doctor.department === specializationFilter.value) &&
//         (hospitalFilter === 'All Hospitals' || hospital === hospitalFilter)
//       );
//       if (filteredDocs.length > 0) acc[hospital] = filteredDocs;
//       return acc;
//     }, {});
//     setFilteredDoctors(filtered);
//   }, [searchTerm, specializationFilter, hospitalFilter, groupedDoctors]);

//   const openModal = (doctor: Doctor) => {
//     setSelectedDoctor(doctor);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedDoctor(null);
//   };

//   const clearFilters = () => {
//     setSpecializationFilter(null);
//     setHospitalFilter('All Hospitals');
//     setSearchTerm('');
//     setQuickFilter('');
//     setExperienceFilter('All');
//     setShowFeedback('Filters cleared!');
//     setTimeout(() => setShowFeedback(null), 2000);
//   };

//   const totalDoctors = Object.values(filteredDoctors).reduce((sum, docs) => sum + docs.length, 0);

//   const selectStyles = {
//     control: (provided: any) => ({
//       ...provided,
//       borderRadius: '0.5rem',
//       border: '1px solid #d1d5db',
//       backgroundColor: '#f9fafb',
//       fontSize: '0.875rem',
//       minHeight: '2.25rem',
//       '&:hover': { borderColor: '#2563eb' },
//     }),
//     menu: (provided: any) => ({
//       ...provided,
//       borderRadius: '0.5rem',
//       backgroundColor: '#fff',
//     }),
//     option: (provided: any, state: any) => ({
//       ...provided,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.5rem 0.75rem',
//       backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#eff6ff' : '#fff',
//       color: state.isSelected ? '#fff' : '#1a202c',
//     }),
//   };

//   return (
//     <div className="p-4 md:ml-64">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold">All Doctors ({totalDoctors})</h2>
//         <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">Clear Filters</button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search doctors..."
//           className="w-full md:w-1/3 p-2 border rounded"
//           onChange={handleSearchChange}
//         />
//         <Select
//           options={specializations}
//           value={specializationFilter}
//           onChange={setSpecializationFilter}
//           styles={selectStyles}
//           isClearable
//           placeholder="Filter by specialization"
//         />
//         <select
//           value={hospitalFilter}
//           onChange={(e) => setHospitalFilter(e.target.value)}
//           className="w-full md:w-1/4 p-2 border rounded"
//         >
//           {hospitals.map((hospital, index) => (
//             <option key={index} value={hospital}>
//               {hospital}
//             </option>
//           ))}
//         </select>
//       </div>

//       {Object.entries(filteredDoctors).map(([hospitalName, doctors]) => (
//         <div key={hospitalName} className="mb-6">
//           <h3 className="text-lg font-bold mb-2">{hospitalName}</h3>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {doctors.map((doctor) => (
//               <motion.div
//                 key={doctor.id}
//                 className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md"
//                 whileHover={{ scale: 1.02 }}
//                 onClick={() => openModal(doctor)}
//               >
//                 <img src={doctor.profilepic} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
//                 <h4 className="text-center font-semibold">{doctor.name}</h4>
//                 <p className="text-sm text-center text-gray-600">{doctor.department}</p>
//                 <p className="text-sm text-center text-yellow-600"><FaStar className="inline" /> {doctor.rating}</p>
//                     <button
//                       onClick={() => alert(`Booking appointment with ${doctor.name}`)}
//                       className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//                     >
//                       Book Appointment
//                     </button>
                  
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       ))}

//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="modal-overlay">
//         {selectedDoctor && (
//           <div className="p-4">
//             <h2 className="text-xl font-bold mb-2">{selectedDoctor.name}</h2>
//             <img src={selectedDoctor.profilepic} alt={selectedDoctor.name} className="w-32 h-32 rounded-full mb-2" />
//             <p><strong>Specialization:</strong> {selectedDoctor.department}</p>
//             <p><strong>Rating:</strong> {selectedDoctor.rating}</p>
//             <p><strong>Description:</strong> {selectedDoctor.description}</p>
//             <p><strong>Hospital:</strong> {selectedDoctor.hospital.hositalName}</p>
//             <p><strong>Address:</strong> {selectedDoctor.hospital.address}</p>
//             <button onClick={closeModal} className="mt-4 text-sm text-red-600 hover:underline">Close</button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AllDoctorsPage;















// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   FaSearch, FaTimes, FaStar, FaMapMarkerAlt, FaGlobe, FaHeart,
//   FaBrain, FaStethoscope, FaBaby, FaHeadSideVirus, FaUserMd,
// } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import Modal from 'react-modal';
// import debounce from 'lodash.debounce';
// import Select, { SingleValue } from 'react-select';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';

// Modal.setAppElement('#root');

// interface Hospital {
//   hospitalId: number;
//   hositalName: string;
//   hospitalDescription: string;
//   hospitalImage: string;
//   rating: string;
//   address: string;
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
// }

// interface SpecializationOption {
//   value: string;
//   label: string;
//   icon: React.ReactNode;
// }

// const AllDoctorsPage: React.FC = () => {
//   const [groupedDoctors, setGroupedDoctors] = useState<{ [key: string]: Doctor[] }>({});
//   const [filteredDoctors, setFilteredDoctors] = useState<{ [key: string]: Doctor[] }>({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [specializationFilter, setSpecializationFilter] = useState<SingleValue<SpecializationOption>>(null);
//   const [hospitalFilter, setHospitalFilter] = useState('All Hospitals');
//   const [quickFilter, setQuickFilter] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [experienceFilter, setExperienceFilter] = useState<'All' | '0-5 Years' | '5-10 Years' | '10+ Years'>('All');
//   const [showFeedback, setShowFeedback] = useState<string | null>(null);

//   const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
//   const navigate = useNavigate();

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
//       const doctors = response.data;
//       setAllDoctors(doctors);

//       const grouped = doctors.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
//         const hospitalName = doctor.hospital?.hositalName || 'Unknown Hospital';
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
//     return ['All Hospitals', ...Array.from(new Set(allDoctors.map((d) => d.hospital?.hositalName || 'Unknown Hospital')))];
//   }, [allDoctors]);

//   useEffect(() => {
//     const filtered = Object.entries(groupedDoctors).reduce((acc: { [key: string]: Doctor[] }, [hospital, doctors]) => {
//       const filteredDocs = doctors.filter((doctor) =>
//         (searchTerm === '' ||
//           doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           hospital.toLowerCase().includes(searchTerm.toLowerCase())) &&
//         (!specializationFilter || doctor.department === specializationFilter.value) &&
//         (hospitalFilter === 'All Hospitals' || hospital === hospitalFilter)
//       );
//       if (filteredDocs.length > 0) acc[hospital] = filteredDocs;
//       return acc;
//     }, {});
//     setFilteredDoctors(filtered);
//   }, [searchTerm, specializationFilter, hospitalFilter, groupedDoctors]);

//   const openModal = (doctor: Doctor) => {
//     setSelectedDoctor(doctor);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedDoctor(null);
//   };

//   const clearFilters = () => {
//     setSpecializationFilter(null);
//     setHospitalFilter('All Hospitals');
//     setSearchTerm('');
//     setQuickFilter('');
//     setExperienceFilter('All');
//     setShowFeedback('Filters cleared!');
//     setTimeout(() => setShowFeedback(null), 2000);
//   };

//   const handleBookNow = (doctorId: number) => {
//     navigate(`/booking/doctor/${doctorId}`);
//   };

//   const totalDoctors = Object.values(filteredDoctors).reduce((sum, docs) => sum + docs.length, 0);

//   const selectStyles = {
//     control: (provided: any) => ({
//       ...provided,
//       borderRadius: '0.5rem',
//       border: '1px solid #e5e7eb',
//       backgroundColor: '#ffffff',
//       fontSize: '0.875rem',
//       minHeight: '2.5rem',
//       boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//       '&:hover': { borderColor: '#3b82f6' },
//     }),
//     menu: (provided: any) => ({
//       ...provided,
//       borderRadius: '0.5rem',
//       backgroundColor: '#ffffff',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//     }),
//     option: (provided: any, state: any) => ({
//       ...provided,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.75rem 1rem',
//       backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : '#ffffff',
//       color: state.isSelected ? '#ffffff' : '#111827',
//       '&:hover': { backgroundColor: state.isSelected ? '#3b82f6' : '#f3f4f6' },
//     }),
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">All Doctors ({totalDoctors})</h2>
//         <button
//           onClick={clearFilters}
//           className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           Clear All Filters
//         </button>
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="Search doctors by name, specialization, or hospital..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
//             onChange={handleSearchChange}
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>
//         <Select
//           options={specializations}
//           value={specializationFilter}
//           onChange={setSpecializationFilter}
//           styles={selectStyles}
//           isClearable
//           placeholder="Filter by specialization"
//           className="flex-1"
//         />
//         <select
//           value={hospitalFilter}
//           onChange={(e) => setHospitalFilter(e.target.value)}
//           className="flex-1 p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
//         >
//           {hospitals.map((hospital, index) => (
//             <option key={index} value={hospital}>
//               {hospital}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Feedback Notification */}
//       {showFeedback && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm"
//         >
//           {showFeedback}
//         </motion.div>
//       )}

//       {/* Doctors List */}
//       {isLoading ? (
//         <div className="text-center text-gray-600">Loading doctors...</div>
//       ) : Object.entries(filteredDoctors).length === 0 ? (
//         <div className="text-center text-gray-600">No doctors found matching your criteria.</div>
//       ) : (
//         Object.entries(filteredDoctors).map(([hospitalName, doctors]) => (
//           <div key={hospitalName} className="mb-8">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">{hospitalName}</h3>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {doctors.map((doctor) => (
//                 <motion.div
//                   key={doctor.id}
//                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
//                   whileHover={{ scale: 1.03 }}
//                   onClick={() => openModal(doctor)}
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={doctor.profilepic}
//                       alt={doctor.name}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
//                     />
//                     <div>
//                       <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
//                       <p className="text-sm text-gray-600">{doctor.department}</p>
//                       <p className="text-sm text-yellow-500 text-sm group items-center gap-1">
//                         <FaStar /> {doctor.rating}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleBookNow(doctor.id);
//                     }}
//                     className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                   >
//                     Book Now
//                   </button>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}

//       {/* Modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className="max-w-lg mx-auto mt-20 bg-white rounded-xl shadow-2xl p-6 outline-none"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         {selectedDoctor && (
//           <div className="relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
//             >
//               <FaTimes className="w-5 h-5" />
//             </button>
//             <div className="flex flex-col items-center">
//               <img
//                 src={selectedDoctor.profilepic}
//                 alt={selectedDoctor.name}
//                 className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-100"
//               />
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedDoctor.name}</h2>
//               <p className="text-sm text-gray-600 mb-4">{selectedDoctor.department}</p>
//             </div>
//             <div className="space-y-3 text-sm text-gray-700">
//               <p><strong className="font-medium">Rating:</strong> {selectedDoctor.rating} <FaStar className="inline text-yellow-500" /></p>
//               <p><strong className="font-medium">Description:</strong> {selectedDoctor.description}</p>
//               <p><strong className="font-medium">Hospital:</strong> {selectedDoctor.hospital.hositalName}</p>
//               <p className="flex items-start">
//                 <strong className="font-medium">Address:</strong>
//                 <span className="ml-1">{selectedDoctor.hospital.address}</span>
//               </p>
//             </div>
//             <button
//               onClick={() => handleBookNow(selectedDoctor.id)}
//               className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//             >
//               Book Now
//             </button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default AllDoctorsPage;


















import React, { useState, useEffect, useMemo } from 'react';
import {
  FaSearch, FaTimes, FaStar, FaMapMarkerAlt, FaGlobe, FaHeart,
  FaBrain, FaStethoscope, FaBaby, FaHeadSideVirus, FaUserMd,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

Modal.setAppElement('#root');

interface Hospital {
  hospitalId: number;
  hositalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
}

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospital: Hospital;
}

interface SpecializationOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const AllDoctorsPage: React.FC = () => {
  const [groupedDoctors, setGroupedDoctors] = useState<{ [key: string]: Doctor[] }>({});
  const [filteredDoctors, setFilteredDoctors] = useState<{ [key: string]: Doctor[] }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [specializationFilter, setSpecializationFilter] = useState<SingleValue<SpecializationOption>>(null);
  const [hospitalFilter, setHospitalFilter] = useState('All Hospitals');
  const [quickFilter, setQuickFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState<'All' | '0-5 Years' | '5-10 Years' | '10+ Years'>('All');
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
      const doctors = response.data;
      setAllDoctors(doctors);

      const grouped = doctors.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
        const hospitalName = doctor.hospital?.hositalName || 'Unknown Hospital';
        if (!acc[hospitalName]) acc[hospitalName] = [];
        acc[hospitalName].push(doctor);
        return acc;
      }, {});
      setGroupedDoctors(grouped);
      setFilteredDoctors(grouped);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowFeedback('Search cleared!');
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const getSpecializationIcon = (spec: string): React.ReactNode => {
    const icons: { [key: string]: React.ReactNode } = {
      Orthopedic: <FaHeart />,
      Neurology: <FaBrain />,
      Dermatology: <FaStethoscope />,
      Pediatrician: <FaBaby />,
      Psychiatrist: <FaHeadSideVirus />,
    };
    return icons[spec] || <FaUserMd />;
  };

  const specializations: SpecializationOption[] = useMemo(() => {
    const uniqueSpecs = Array.from(new Set(allDoctors.map((d) => d.department)));
    return [
      { value: '', label: 'All Specializations', icon: <FaGlobe /> },
      ...uniqueSpecs.map((spec) => ({
        value: spec,
        label: spec,
        icon: getSpecializationIcon(spec),
      })),
    ];
  }, [allDoctors]);

  const hospitals = useMemo(() => {
    return ['All Hospitals', ...Array.from(new Set(allDoctors.map((d) => d.hospital?.hositalName || 'Unknown Hospital')))];
  }, [allDoctors]);

  useEffect(() => {
    const filtered = Object.entries(groupedDoctors).reduce((acc: { [key: string]: Doctor[] }, [hospital, doctors]) => {
      const filteredDocs = doctors.filter((doctor) =>
        (searchTerm === '' ||
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!specializationFilter || doctor.department === specializationFilter.value) &&
        (hospitalFilter === 'All Hospitals' || hospital === hospitalFilter)
      );
      if (filteredDocs.length > 0) acc[hospital] = filteredDocs;
      return acc;
    }, {});
    setFilteredDoctors(filtered);
  }, [searchTerm, specializationFilter, hospitalFilter, groupedDoctors]);

  const openModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDoctor(null);
  };

  const clearFilters = () => {
    setSpecializationFilter(null);
    setHospitalFilter('All Hospitals');
    setSearchTerm('');
    setQuickFilter('');
    setExperienceFilter('All');
    setShowFeedback('Filters cleared!');
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const handleBookNow = (doctorId: number) => {
    navigate(`/booking/doctor/${doctorId}`);
  };

  const totalDoctors = Object.values(filteredDoctors).reduce((sum, docs) => sum + docs.length, 0);

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      fontSize: '0.875rem',
      minHeight: '2.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': { borderColor: '#3b82f6' },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#111827',
      '&:hover': { backgroundColor: state.isSelected ? '#3b82f6' : '#f3f4f6' },
    }),
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Doctors ({totalDoctors})</h2>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Clear All Filters
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search doctors by name, specialization, or hospital..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select
          options={specializations}
          value={specializationFilter}
          onChange={setSpecializationFilter}
          styles={selectStyles}
          isClearable
          placeholder="Filter by specialization"
          className="flex-1"
        />
        <select
          value={hospitalFilter}
          onChange={(e) => setHospitalFilter(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
        >
          {hospitals.map((hospital, index) => (
            <option key={index} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>
      </div>

      {/* Feedback Notification */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm"
        >
          {showFeedback}
        </motion.div>
      )}

      {/* Doctors List */}
      {isLoading ? (
        <div className="text-center text-gray-600">Loading doctors...</div>
      ) : Object.entries(filteredDoctors).length === 0 ? (
        <div className="text-center text-gray-600">No doctors found matching your criteria.</div>
      ) : (
        Object.entries(filteredDoctors).map(([hospitalName, doctors]) => (
          <div key={hospitalName} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{hospitalName}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openModal(doctor)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={doctor.profilepic}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">{doctor.department}</p>
                      <p className="text-sm text-yellow-500 flex items-center gap-1">
                        <FaStar /> {doctor.rating}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(doctor.id);
                    }}
                    className="mt-4 w-full bg-[#499E14] text-white px-4 py-2 rounded-lg hover:bg-[#3D8211] transition-colors text-sm font-medium"
                  >
                    Book Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="max-w-lg mx-auto mt-20 bg-white rounded-xl shadow-2xl p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedDoctor && (
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedDoctor.profilepic}
                alt={selectedDoctor.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-100"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedDoctor.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{selectedDoctor.department}</p>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong className="font-medium">Rating:</strong> {selectedDoctor.rating} <FaStar className="inline text-yellow-500" /></p>
              <p><strong className="font-medium">Description:</strong> {selectedDoctor.description}</p>
              <p><strong className="font-medium">Hospital:</strong> {selectedDoctor.hospital.hositalName}</p>
              <p className="flex items-start">
                <strong className="font-medium">Address:</strong>
                <span className="ml-1">{selectedDoctor.hospital.address}</span>
              </p>
            </div>
            <button
              onClick={() => handleBookNow(selectedDoctor.id)}
              className="mt-6 w-full bg-[#499E14] text-white px-4 py-2 rounded-lg hover:bg-[#3D8211] transition-colors text-sm font-medium"
            >
              Book Now
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllDoctorsPage;