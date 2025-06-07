// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '@/admin/sidebar';
// import { ClipLoader } from 'react-spinners';
// import { Menu, X } from 'lucide-react';

// interface Hospital {
//   id: number;
//   hospital: string;
//   address: string;
//   pictureUrl: string;
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

// interface DisplayDoctor {
//   id: number;
//   name: string;
//   email: string;
//   mobileNum: string;
//   rating: number;
//   description: string;
//   address : string;
//   location: string;
//   hospital: string;
//   specialty: string;
//   profilepic: string;
// }

// const DoctorDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState<DisplayDoctor | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Parse address to extract city
//   const parseAddress = (address: string): string => {
//     const parts = address.split(',').map((part) => part.trim());
//     return parts[1] || 'Unknown';
//   };

//   // Fetch doctor details
//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get<Doctor>(`http://localhost:8080/api/doctors/${id}`);
//         const doc = response.data;
//         const mappedDoctor: DisplayDoctor = {
//           id: doc.id,
//           name: doc.name,
//           email: doc.email,
//           mobileNum: 'N/A',
//           rating: doc.rating,
//           description: doc.description,
//           location: parseAddress(doc.hospital.address),
//           address:doc.hospital.address,
//           hospital: doc.hospital.hospital,
//           specialty: doc.department,
//           profilepic: doc.profilepic,
//         };
//         setDoctor(mappedDoctor);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch doctor details');
//         console.error('Fetch error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDoctor();
//   }, [id]);

//   if (error) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <div
//           className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           } z-20`}
//         >
//           <Sidebar />
//         </div>
//         <button
//           className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//           aria-expanded={isSidebarOpen}
//         >
//           {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//         <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50 text-center animate-fade-in">
//               <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
//               <button
//                 onClick={() => navigate('/admin/doctors/viewdoctors')}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
//                 aria-label="Back to doctors list"
//               >
//                 Back to Doctors
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading || !doctor) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <div
//           className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           } z-20`}
//         >
//           <Sidebar />
//         </div>
//         <button
//           className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//           aria-expanded={isSidebarOpen}
//         >
//           {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//         <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
//               <ClipLoader size={40} color="#4f46e5" className="animate-pulse" />
//               <p className="text-gray-600 text-sm mt-4 leading-snug">Loading doctor details...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         } z-20`}
//       >
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar Toggle */}
//       <button
//         className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//         aria-expanded={isSidebarOpen}
//       >
//         {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </button>

//       {/* Main Content */}
//       <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//         <div className="max-w-3xl mx-auto">
//           <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
//             <header className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//             <img
//   src={doctor.profilepic || 'https://via.placeholder.com/128'}
//   alt={`Profile picture of ${doctor.name}`}
//   className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
//   onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128')}
// />

//               <div className="text-center sm:text-left">
//                 <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{doctor.name}</h1>
//                 <p className="text-lg text-indigo-600 font-medium">{doctor.specialty}</p>
//                 <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
//                   <span className="text-gray-600 text-sm">{doctor.rating.toFixed(1)}/5</span>
//                   <span className="text-yellow-400">★</span>
//                 </div>
//               </div>
//             </header>
//             <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Email</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.email}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Mobile</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.mobileNum}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Location</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.location}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Hospital</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.hospital}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Hospital Address</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.address}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Description</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.description}</p>
//               </div>
//             </article>
//             <div className="mt-6">
//               <button
//                 onClick={() => navigate('/admin/doctors/viewdoctors')}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
//                 aria-label="Back to doctors list"
//               >
//                 Back to Doctors
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//       <style>
//         {`
//           @keyframes fade-in {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in {
//             animation: fade-in 1s ease-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default DoctorDetails;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '@/admin/sidebar';
// import { ClipLoader } from 'react-spinners';
// import { Menu, X } from 'lucide-react';

// interface Hospital {
//   id: number;
//   hospital: string;
//   address: string;
//   pictureUrl: string;
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

// interface DisplayDoctor {
//   id: number;
//   name: string;
//   email: string;
//   mobileNum: string;
//   rating: number;
//   description: string;
//   address: string;
//   location: string;
//   hospital: string;
//   specialty: string;
//   profilepic: string;
// }

// const DoctorDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState<DisplayDoctor | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isActive, setIsActive] = useState<boolean>(true); // Track doctor active status
//   const [actionMessage, setActionMessage] = useState<string | null>(null); // For success/error messages

//   // Parse address to extract city
//   const parseAddress = (address: string): string => {
//     const parts = address.split(',').map((part) => part.trim());
//     return parts[1] || 'Unknown';
//   };

//   // Fetch doctor details
//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get<Doctor>(`http://localhost:8080/api/doctors/${id}`);
//         const doc = response.data;
//         const mappedDoctor: DisplayDoctor = {
//           id: doc.id,
//           name: doc.name,
//           email: doc.email,
//           mobileNum: 'N/A',
//           rating: doc.rating,
//           description: doc.description,
//           location: parseAddress(doc.hospital.address),
//           address: doc.hospital.address,
//           hospital: doc.hospital.hospital,
//           specialty: doc.department,
//           profilepic: doc.profilepic,
//         };
//         setDoctor(mappedDoctor);
//         setError(null);
//         // Assuming the doctor is active initially (modify if API provides status)
//         setIsActive(true);
//       } catch (err) {
//         setError('Failed to fetch doctor details');
//         console.error('Fetch error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDoctor();
//   }, [id]);

//   // Handle status change (activate/deactivate)
//   const handleStatusChange = async (status: string) => {
//     try {
//       if (status === 'active') {
//         await axios.put(`http://localhost:8080/api/restore/${id}`);
//         setIsActive(true);
//         setActionMessage('Doctor activated successfully');
//       } else {
//         await axios.delete(`http://localhost:8080/api/soft-delete/${id}`);
//         setIsActive(false);
//         setActionMessage('Doctor deactivated successfully');
//       }
//     } catch (err) {
//       setActionMessage(status === 'active' ? 'Failed to activate doctor' : 'Failed to deactivate doctor');
//       console.error('Status change error:', err);
//     }
//   };

//   if (error) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <div
//           className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           } z-20`}
//         >
//           <Sidebar />
//         </div>
//         <button
//           className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//           aria-expanded={isSidebarOpen}
//         >
//           {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//         <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50 text-center animate-fade-in">
//               <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
//               <button
//                 onClick={() => navigate('/admin/doctors/viewdoctors')}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
//                 aria-label="Back to doctors list"
//               >
//                 Back to Doctors
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading || !doctor) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <div
//           className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           } z-20`}
//         >
//           <Sidebar />
//         </div>
//         <button
//           className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//           aria-expanded={isSidebarOpen}
//         >
//           {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//         <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
//               <ClipLoader size={40} color="#4f46e5" className="animate-pulse" />
//               <p className="text-gray-600 text-sm mt-4 leading-snug">Loading doctor details...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         } z-20`}
//       >
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar Toggle */}
//       <button
//         className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//         aria-expanded={isSidebarOpen}
//       >
//         {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </button>

//       {/* Main Content */}
//       <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//         <div className="max-w-3xl mx-auto">
//           <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
//             <header className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//               <img
//                 src={doctor.profilepic || 'https://via.placeholder.com/128'}
//                 alt={`Profile picture of ${doctor.name}`}
//                 className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
//                 onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128')}
//               />
//               <div className="text-center sm:text-left">
//                 <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{doctor.name}</h1>
//                 <p className="text-lg text-indigo-600 font-medium">{doctor.specialty}</p>
//                 <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
//                   <span className="text-gray-600 text-sm">{doctor.rating.toFixed(1)}/5</span>
//                   <span className="text-yellow-400">★</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Status: <span className={isActive ? 'text-green-500' : 'text-red-500'}>{isActive ? 'Active' : 'Deactivated'}</span>
//                 </p>
//               </div>
//             </header>
//             <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Email</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.email}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Mobile</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.mobileNum}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Location</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.location}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Hospital</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.hospital}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Hospital Address</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.address}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Description</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.description}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Change Status</h2>
//                 <div className="flex gap-4 mt-2">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="active"
//                       checked={isActive}
//                       onChange={() => handleStatusChange('active')}
//                       className="mr-2"
//                     />
//                     <span className="text-gray-600 text-sm">Active</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="deactivated"
//                       checked={!isActive}
//                       onChange={() => handleStatusChange('deactivated')}
//                       className="mr-2"
//                     />
//                     <span className="text-gray-600 text-sm">Deactivated</span>
//                   </label>
//                 </div>
//               </div>
//             </article>
//             {actionMessage && (
//               <p
//                 className={`text-sm mt-4 leading-snug ${
//                   actionMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'
//                 }`}
//               >
//                 {actionMessage}
//               </p>
//             )}
//             <div className="mt-6">
//               <button
//                 onClick={() => navigate('/admin/doctors/viewdoctors')}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
//                 aria-label="Back to doctors list"
//               >
//                 Back to Doctors
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//       <style>
//         {`
//           @keyframes fade-in {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in {
//             animation: fade-in 1s ease-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default DoctorDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '@/admin/sidebar';
// import { ClipLoader } from 'react-spinners';
// import { Menu, X } from 'lucide-react';

// interface Doctor {
//   id: number;
//   name: string;
//   email: string;
//   rating: number;
//   description: string;
//   department: string;
//   profilepic: string;
//   status: string;
//   hospitalId: number;
//   hospitalName: string;
// }

// interface DisplayDoctor {
//   id: number;
//   name: string;
//   email: string;
//   mobileNum: string;
//   rating: number;
//   description: string;
//   hospital: string;
//   specialty: string;
//   profilepic: string;
//   status: string;
// }

// const DoctorDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState<DisplayDoctor | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isActive, setIsActive] = useState<boolean>(true);
//   const [actionMessage, setActionMessage] = useState<string | null>(null);

//   // Fetch doctor details
//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get<Doctor>(`http://localhost:8080/api/doctors/${id}`);
//         const doc = response.data;
//         const mappedDoctor: DisplayDoctor = {
//           id: doc.id,
//           name: doc.name,
//           email: doc.email,
//           mobileNum: 'N/A',
//           rating: doc.rating,
//           description: doc.description,
//           hospital: doc.hospitalName,
//           specialty: doc.department,
//           profilepic: doc.profilepic,
//           status: doc.status,
//         };
//         setDoctor(mappedDoctor);
//         setError(null);
//         setIsActive(doc.status === 'active');
//       } catch (err) {
//         setError('Failed to fetch doctor details');
//         console.error('Fetch error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDoctor();
//   }, [id]);

//   // Handle status change (activate/deactivate)
//   const handleStatusChange = async (status: string) => {
//     try {
//       if (status === 'active') {
//         await axios.put(`http://localhost:8080/api/restore/${id}`);
//         setIsActive(true);
//         setActionMessage('Doctor activated successfully');
//         if (doctor) {
//           setDoctor({ ...doctor, status: 'active' });
//         }
//       } else {
//         await axios.delete(`http://localhost:8080/api/soft-delete/${id}`);
//         setIsActive(false);
//         setActionMessage('Doctor deactivated successfully');
//         if (doctor) {
//           setDoctor({ ...doctor, status: 'deactivated' });
//         }
//       }
//     } catch (err) {
//       setActionMessage(status === 'active' ? 'Failed to activate doctor' : 'Failed to deactivate doctor');
//       console.error('Status change error:', err);
//     }
//   };

//   if (error) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <div
//           className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           } z-20`}
//         >
//           <Sidebar />
//         </div>
//         <button
//           className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//           aria-expanded={isSidebarOpen}
//         >
//           {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//         <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50 text-center animate-fade-in">
//               <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
//               <button
//                 onClick={() => navigate('/admin/doctors/viewdoctors')}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
//                 aria-label="Back to doctors list"
//               >
//                 Back to Doctors
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading || !doctor) {
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <div
//           className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//             isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//           } z-20`}
//         >
//           <Sidebar />
//         </div>
//         <button
//           className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//           aria-expanded={isSidebarOpen}
//         >
//           {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//         <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//           <div className="max-w-3xl mx-auto">
//             <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
//               <ClipLoader size={40} color="#4f46e5" className="animate-pulse" />
//               <p className="text-gray-600 text-sm mt-4 leading-snug">Loading doctor details...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
//         } z-20`}
//       >
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar Toggle */}
//       <button
//         className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//         aria-expanded={isSidebarOpen}
//       >
//         {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </button>

//       {/* Main Content */}
//       <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
//         <div className="max-w-3xl mx-auto">
//           <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
//             <header className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//               <img
//                 src={doctor.profilepic || 'https://via.placeholder.com/128'}
//                 alt={`Profile picture of ${doctor.name}`}
//                 className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
//                 onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128')}
//               />
//               <div className="text-center sm:text-left">
//                 <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{doctor.name}</h1>
//                 <p className="text-lg text-indigo-600 font-medium">{doctor.specialty}</p>
//                 <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
//                   <span className="text-gray-600 text-sm">{doctor.rating.toFixed(1)}/5</span>
//                   <span className="text-yellow-400">★</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Status: <span className={isActive ? 'text-green-500' : 'text-red-500'}>{isActive ? 'Active' : 'Deactivated'}</span>
//                 </p>
//               </div>
//             </header>
//             <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Email</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.email}</p>
//               </div>
//               <div>
//                 <h2 className="text-sm font-semibold text-gray-700">Hospital</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.hospital}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Description</h2>
//                 <p className="text-gray-600 text-sm leading-snug">{doctor.description}</p>
//               </div>
//               <div className="sm:col-span-2">
//                 <h2 className="text-sm font-semibold text-gray-700">Change Status</h2>
//                 <div className="flex gap-4 mt-2">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="active"
//                       checked={isActive}
//                       onChange={() => handleStatusChange('active')}
//                       className="mr-2"
//                     />
//                     <span className="text-gray-600 text-sm">Active</span>
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="deactivated"
//                       checked={!isActive}
//                       onChange={() => handleStatusChange('deactivated')}
//                       className="mr-2"
//                     />
//                     <span className="text-gray-600 text-sm">Deactivated</span>
//                   </label>
//                 </div>
//               </div>
//             </article>
//             {actionMessage && (
//               <p
//                 className={`text-sm mt-4 leading-snug ${
//                   actionMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'
//                 }`}
//               >
//                 {actionMessage}
//               </p>
//             )}
//             <div className="mt-6">
//               <button
//                 onClick={() => navigate('/admin/doctors/viewdoctors')}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
//                 aria-label="Back to doctors list"
//               >
//                 Back to Doctors
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//       <style>
//         {`
//           @keyframes fade-in {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in {
//             animation: fade-in 1s ease-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default DoctorDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '@/admin/sidebar';
import { ClipLoader } from 'react-spinners';
import { Menu, X } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  status: string;
  hospitalId: number;
  hospitalName: string;
}

interface DisplayDoctor {
  id: number;
  name: string;
  email: string;
  mobileNum: string;
  rating: number;
  description: string;
  hospital: string;
  specialty: string;
  profilepic: string;
  status: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DisplayDoctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    description: '',
    specialty: '',
    profilepic: '',
    status: '',
    hospitalId: 0,
    hospitalName: '',
  });
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
const base_url="https://healthtourism-5.onrender.com"
  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Doctor>(`http://localhost:8080/api/doctors/${id}`);
        const doc = response.data;
        const mappedDoctor: DisplayDoctor = {
          id: doc.id,
          name: doc.name,
          email: doc.email,
          mobileNum: 'N/A',
          rating: doc.rating,
          description: doc.description,
          hospital: doc.hospitalName,
          specialty: doc.department,
          profilepic: doc.profilepic,
          status: doc.status,
        };
        setDoctor(mappedDoctor);
        setFormData({
          name: doc.name,
          email: doc.email,
          rating: doc.rating,
          description: doc.description,
          specialty: doc.department,
          profilepic: doc.profilepic,
          status: doc.status,
          hospitalId: doc.hospitalId,
          hospitalName: doc.hospitalName,
        });
        setError(null);
        setIsActive(doc.status === 'active');
      } catch (err) {
        setError('Failed to fetch doctor details');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  // Handle status change (activate/deactivate) in the main section
  const handleStatusChange = async (status: string) => {
    try {
      if (status === 'active') {
        await axios.put(`http://localhost:8080/api/restore/${id}`);
        setIsActive(true);
        setActionMessage('Doctor activated successfully');
        if (doctor) {
          setDoctor({ ...doctor, status: 'active' });
        }
      } else {
        await axios.delete(`http://localhost:8080/api/soft-delete/${id}`);
        setIsActive(false);
        setActionMessage('Doctor deactivated successfully');
        if (doctor) {
          setDoctor({ ...doctor, status: 'deactivated' });
        }
      }
    } catch (err) {
      setActionMessage(status === 'active' ? 'Failed to activate doctor' : 'Failed to deactivate doctor');
      console.error('Status change error:', err);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' || name === 'hospitalId' ? parseFloat(value) : value,
    }));
  };

  // Handle form submission to update doctor details
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedDoctor = {
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        description: formData.description,
        department: formData.specialty,
        profilepic: formData.profilepic,
        status: formData.status,
        hospitalId: formData.hospitalId,
        hospitalName: formData.hospitalName,
      };
      const response = await axios.put<Doctor>(`http://localhost:8080/api/doctors/update/${id}`, updatedDoctor);
      const updatedDoc = response.data;
      setDoctor((prev) =>
        prev
          ? {
              ...prev,
              name: updatedDoc.name,
              email: updatedDoc.email,
              description: updatedDoc.description,
              specialty: updatedDoc.department,
              profilepic: updatedDoc.profilepic,
              status: updatedDoc.status,
              hospital: updatedDoc.hospitalName,
              rating: updatedDoc.rating,
            }
          : prev
      );
      setIsActive(updatedDoc.status === 'active');
      setUpdateMessage('Doctor details updated successfully');
      setTimeout(() => {
        setIsModalOpen(false);
        setTimeout(() => setUpdateMessage(null), 3000);
      }, 1500);
    } catch (err) {
      setUpdateMessage('Failed to update doctor details');
      console.error('Update error:', err);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div
          className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-20`}
        >
          <Sidebar />
        </div>
        <button
          className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50 text-center animate-fade-in">
              <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
              <button
                onClick={() => navigate('/admin/doctors/viewdoctors')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
                aria-label="Back to doctors list"
              >
                Back to Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !doctor) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div
          className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-20`}
        >
          <Sidebar />
        </div>
        <button
          className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
              <ClipLoader size={40} color="#4f46e5" className="animate-pulse" />
              <p className="text-gray-600 text-sm mt-4 leading-snug">Loading doctor details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-20`}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-200 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <header className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <img
                src={doctor.profilepic || 'https://via.placeholder.com/128'}
                alt={`Profile picture of ${doctor.name}`}
                className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128')}
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{doctor.name}</h1>
                <p className="text-lg text-indigo-600 font-medium">{doctor.specialty}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <span className="text-gray-600 text-sm">{doctor.rating.toFixed(1)}/5</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Status:{' '}
                  <span className={isActive ? 'text-green-500' : 'text-red-500'}>
                    {isActive ? 'Active' : 'Deactivated'}
                  </span>
                </p>
              </div>
            </header>
            <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-700">Email</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.email}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-700">Hospital</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.hospital}</p>
              </div>
              <div className="sm:col-span-2">
                <h2 className="text-sm font-semibold text-gray-700">Description</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.description}</p>
              </div>
              <div className="sm:col-span-2">
                <h2 className="text-sm font-semibold text-gray-700">Change Status</h2>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={isActive}
                      onChange={() => handleStatusChange('active')}
                      className="mr-2"
                    />
                    <span className="text-gray-600 text-sm">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="deactivated"
                      checked={!isActive}
                      onChange={() => handleStatusChange('deactivated')}
                      className="mr-2"
                    />
                    <span className="text-gray-600 text-sm">Deactivated</span>
                  </label>
                </div>
              </div>
            </article>
            {actionMessage && (
              <p
                className={`text-sm mt-4 leading-snug animate-fade-in ${
                  actionMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {actionMessage}
              </p>
            )}
            {updateMessage && (
              <p className="text-sm mt-4 leading-snug animate-fade-in text-green-500">
                {updateMessage}
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate('/admin/doctors/viewdoctors')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
                aria-label="Back to doctors list"
              >
                Back to Doctors
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-md"
                aria-label="Update doctor details"
              >
                Update Details
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Modal for Update Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-gray-50 rounded-xl p-8 w-full max-w-lg shadow-xl border border-gray-200 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Update Doctor Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="rating" className="block text-base font-semibold text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  rows={3}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="specialty"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Specialty
                </label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="profilepic"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="profilepic"
                  name="profilepic"
                  value={formData.profilepic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                />
              </div>
              <div className="mb-5">
                <label className="block text-base font-semibold text-gray-700 mb-2">Status</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleInputChange}
                      className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200">
                      Active
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="deactivated"
                      checked={formData.status === 'deactivated'}
                      onChange={handleInputChange}
                      className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="text-gray-600 text-sm hover:text-blue-600 transition-colors duration-200">
                      Deactivated
                    </span>
                  </label>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="hospitalId"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Hospital ID
                </label>
                <input
                  type="number"
                  id="hospitalId"
                  name="hospitalId"
                  value={formData.hospitalId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="hospitalName"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-200"
                  required
                />
              </div>
              {updateMessage && (
                <p
                  className={`text-sm mb-4 ${
                    updateMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {updateMessage}
                </p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all duration-200 flex-1 text-sm shadow-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 hover:scale-105 active:scale-95 transition-all duration-200 flex-1 text-sm shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
          .scrollbar-thin {
            scrollbar-width: thin;
          }
          .scrollbar-thumb-gray-300 {
            scrollbar-color: #d1d5db #f3f4f6;
          }
          .scrollbar-track-gray-100 {
            background: #f3f4f6;
          }
        `}
      </style>
    </div>
  );
};

export default DoctorDetails;