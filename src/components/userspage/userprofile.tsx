// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// interface Patient {
//   id: number;
//   name: string;
//   email: string;
//   country: string;
//   mobilenum: number;
//   profilePictureUrl?: string;
//   prescriptionUrl?: string;
//   patientaxraysUrl?: string;
//   patientreportsUrl?: string;
//   address?: string;
//   password?: string;
//   role?: string;
//   emailVerified?: boolean;
//   verificationToken?: string | null;
// }

// const PatientProfile: React.FC = () => {
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [message, setMessage] = useState('');
//   const [profilePicture, setProfilePicture] = useState<File | null>(null);
//   const [prescription, setPrescription] = useState<File | null>(null);
//   const [patientAxrays, setPatientAxrays] = useState<File | null>(null);
//   const [patientReports, setPatientReports] = useState<File | null>(null);
//   const [address, setAddress] = useState<string>('');
//   const [dragActive, setDragActive] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user') || '{}');
//     if (userData.id) {
//       setUserId(userData.id);
//       fetchPatient(userData.id);
//     } else {
//       setMessage('No user data found in localStorage. Please log in.');
//     }
//   }, []);
//   const fetchPatient = async (id: number) => {
//     try {
//       const res = await axios.get<Patient>(`${BASE_URL}/user/get-patients/${id}`);
//       setPatient(res.data);
//       setAddress(res.data.address || '');
//     } catch (err) {
//       setMessage('Failed to fetch patient data.');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (type === 'profilePicture' && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
//       setProfilePicture(file);
//     } else if (
//       (type === 'prescription' || type === 'patientAxrays' || type === 'patientReports') &&
//       file.type === 'application/pdf'
//     ) {
//       if (type === 'prescription') setPrescription(file);
//       if (type === 'patientAxrays') setPatientAxrays(file);
//       if (type === 'patientReports') setPatientReports(file);
//     } else {
//       setMessage(`Invalid file type for ${type}.`);
//     }
//   };

//   const handleDrag = (e: React.DragEvent<HTMLDivElement>, type: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive((prev) => ({ ...prev, [type]: true }));
//     } else if (e.type === 'dragleave') {
//       setDragActive((prev) => ({ ...prev, [type]: false }));
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive((prev) => ({ ...prev, [type]: false }));
//     const file = e.dataTransfer.files[0];
//     if (!file) return;

//     if (type === 'profilePicture' && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
//       setProfilePicture(file);
//     } else if (
//       (type === 'prescription' || type === 'patientAxrays' || type === 'patientReports') &&
//       file.type === 'application/pdf'
//     ) {
//       if (type === 'prescription') setPrescription(file);
//       if (type === 'patientAxrays') setPatientAxrays(file);
//       if (type === 'patientReports') setPatientReports(file);
//     } else {
//       setMessage(`Invalid file type for ${type}.`);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId) {
//       setMessage('User ID not found. Please log in.');
//       return;
//     }

//     const formData = new FormData();
//     if (profilePicture) formData.append('profilePicture', profilePicture);
//     if (prescription) formData.append('prescription', prescription);
//     if (patientAxrays) formData.append('patientaxrays', patientAxrays);
//     if (patientReports) formData.append('patientreports', patientReports);
//     formData.append('address', address);

//     if (!profilePicture && !prescription && !patientAxrays && !patientReports && !address) {
//       setMessage('Please select at least one file or provide an address to upload.');
//       return;
//     }
//     try {
//       await axios.post(`${BASE_URL}/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files and/or address uploaded successfully.');
//       setProfilePicture(null);
//       setPrescription(null);
//       setPatientAxrays(null);
//       setPatientReports(null);
//       setAddress('');
//       const inputs = ['profilePicture', 'prescription', 'patientAxrays', 'patientReports'];
//       inputs.forEach((id) => {
//         const input = document.getElementById(id) as HTMLInputElement;
//         if (input) input.value = '';
//       });
//       fetchPatient(userId);
//     } catch (error) {
//       setMessage('Upload failed.');
//     }
//   };

//   const handleDownload = async (url: string, filename: string) => {
//     try {
//       const response = await axios.get(url, { responseType: 'blob' });
//       const blob = new Blob([response.data]);
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = filename;
//       link.click();
//       window.URL.revokeObjectURL(link.href);
//     } catch (error) {
//       setMessage('Failed to download file.');
//     }
//   };

//   const handleDelete = async (type: string) => {
//     if (!userId) {
//       setMessage('User ID not found.');
//       return;
//     }
//     try {
//       await axios.delete(`${BASE_URL}/user/delete-file/${userId}/${type}`);
//       setMessage(`${type} deleted successfully.`);
//       fetchPatient(userId);
//     } catch (error) {
//       setMessage(`Failed to delete ${type}.`);
//     }
//   };

//   return (
//     <div
//       className="relative flex min-h-screen flex-col bg-[#fbf8fc] overflow-x-hidden"
//       style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
//     >
//       <header className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-sm border-b border-[#f0e6f4] px-6 py-4 sm:px-10">
//         <div className="flex items-center gap-3 text-[#180c1d]">
//           <div className="size-5">
//             <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
//                 fill="currentColor"
//               ></path>
//             </svg>
//           </div>
//           <h2 className="text-[#180c1d] text-xl font-bold tracking-tight">HealthHub</h2>
//         </div>
//         <div className="flex items-center gap-6">
//           <nav className="hidden sm:flex gap-8">
//             <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
//               Home
//             </a>
//             <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
//               Appointments
//             </a>
//             <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
//               Messages
//             </a>
//             <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
//               Resources
//             </a>
//           </nav>
//           <button
//             className="p-2 rounded-full bg-[#f0e6f4] text-[#180c1d] hover:bg-[#e2cdea] transition-colors"
//             aria-label="Notifications"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="currentColor"
//               viewBox="0 0 256 256"
//             >
//               <path
//                 d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
//               ></path>
//             </svg>
//           </button>
//           <div className="relative group" role="button" tabIndex={0} aria-label="Profile menu">
//             <img
//               src={patient?.profilePictureUrl || 'https://via.placeholder.com/40'}
//               alt="Profile"
//               className="size-10 rounded-full object-cover border-2 border-[#8845a1] shadow-sm group-hover:scale-105 transition-transform duration-200"
//             />
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-200 hidden group-hover:block">
//               <div className="py-2">
//                 <p className="px-4 py-2 text-sm text-[#180c1d] font-medium">{patient?.name || 'User'}</p>
//                 <a href="#" className="block px-4 py-2 text-sm text-[#180c1d] hover:bg-[#f0e6f4]">
//                   Settings
//                 </a>
//                 <a href="#" className="block px-4 py-2 text-sm text-[#180c1d] hover:bg-[#f0e6f4]">
//                   Log Out
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//       <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-4xl flex flex-col gap-8">
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e2cdea]">
//             <div className="bg-gradient-to-r from-[#f0e6f4] to-[#faf9fc] p-6 sm:p-8">
//               <div className="flex flex-col sm:flex-row items-center gap-6">
//                 <div className="flex flex-col items-center sm:items-start gap-4">
//                   <img
//                     src={patient?.profilePictureUrl || 'https://via.placeholder.com/120'}
//                     alt="Profile"
//                     className="size-24 sm:size-32 rounded-full object-cover border-4 border-white shadow-md"
//                   />
//                   <div className="w-full max-w-xs">
//                     <label
//                       htmlFor="profilePicture"
//                       className="block text-[#180c1d] text-sm font-medium mb-1 text-center sm:text-left"
//                     >
//                       Update Profile Picture
//                     </label>
//                     <input
//                       type="file"
//                       id="profilePicture"
//                       accept="image/*,application/pdf"
//                       onChange={(e) => handleFileChange(e, 'profilePicture')}
//                       className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                       aria-describedby="profilePictureHelp"
//                     />
//                     <p id="profilePictureHelp" className="mt-1 text-xs text-[#8845a1] text-center sm:text-left">
//                       {profilePicture ? profilePicture.name : 'Select an image or PDF file'}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-center sm:text-left">
//                   <h2 className="text-[#180c1d] text-2xl sm:text-3xl font-bold tracking-tight">
//                     {patient?.name || 'Loading...'}
//                   </h2>
//                   <p className="text-[#8845a1] text-lg font-medium mt-1">
//                     Patient ID: {patient?.id || 'N/A'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6 sm:p-8">
//               <h3 className="text-[#180c1d] text-xl font-bold tracking-tight mb-4">
//                 Personal Information
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-1 py-2">
//                   <p className="text-[#8845a1] text-sm font-medium">Full Name</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.name || 'N/A'}</p>
//                 </div>
//                 <div className="flex flex-col gap-1 py-2">
//                   <p className="text-[#8845a1] text-sm font-medium">Contact Number</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.mobilenum || 'N/A'}</p>
//                 </div>
//                 <div className="flex flex-col gap-1 py-2">
//                   <p className="text-[#8845a1] text-sm font-medium">Email Address</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.email || 'N/A'}</p>
//                 </div>
//                 <div className="flex flex-col gap-1 py-2">
//                   <p className="text-[#8845a1] text-sm font-medium">Address</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.address || 'N/A'}</p>
//                 </div>
//                 <div className="flex flex-col gap-1 py-2">
//                   <p className="text-[#8845a1] text-sm font-medium">Country</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.country || 'N/A'}</p>
//                 </div>
//                 <div className="flex flex-col gap-1 py-2">
//                   <p className="text-[#8845a1] text-sm font-medium">Role</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.role || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl shadow-lg border border-[#e2cdea] p-6 sm:p-8">
//             <h3 className="text-[#180c1d] text-xl font-bold tracking-tight mb-4">
//               Documents
//             </h3>
//             <div
//               className={`relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed ${
//                 dragActive.prescription || dragActive.patientAxrays || dragActive.patientReports
//                   ? 'border-[#8845a1] bg-[#f0e6f4]'
//                   : 'border-[#e2cdea] bg-[#fbf8fc]'
//               } px-6 py-10 transition-colors duration-200`}
//             >
//               <div className="flex flex-col items-center gap-2 text-center">
//                 <p className="text-[#180c1d] text-lg font-bold tracking-tight">
//                   Upload Medical Documents
//                 </p>
//                 <p className="text-[#180c1d] text-sm font-normal max-w-xs">
//                   Drag and drop files here, or click to browse
//                 </p>
//               </div>
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
//                 <div
//                   onDragEnter={(e) => handleDrag(e, 'prescription')}
//                   onDragOver={(e) => handleDrag(e, 'prescription')}
//                   onDragLeave={(e) => handleDrag(e, 'prescription')}
//                   onDrop={(e) => handleDrop(e, 'prescription')}
//                 >
//                   <label
//                     htmlFor="prescription"
//                     className="block text-[#180c1d] text-sm font-medium mb-1"
//                   >
//                     Prescription (PDF)
//                   </label>
//                   <input
//                     type="file"
//                     id="prescription"
//                     accept="application/pdf"
//                     onChange={(e) => handleFileChange(e, 'prescription')}
//                     className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                     aria-describedby="prescriptionHelp"
//                   />
//                   <p id="prescriptionHelp" className="mt-1 text-xs text-[#8845a1]">
//                     {prescription ? prescription.name : 'Select a PDF file'}
//                   </p>
//                 </div>
//                 <div
//                   onDragEnter={(e) => handleDrag(e, 'patientAxrays')}
//                   onDragOver={(e) => handleDrag(e, 'patientAxrays')}
//                   onDragLeave={(e) => handleDrag(e, 'patientAxrays')}
//                   onDrop={(e) => handleDrop(e, 'patientAxrays')}
//                 >
//                   <label
//                     htmlFor="patientAxrays"
//                     className="block text-[#180c1d] text-sm font-medium mb-1"
//                   >
//                     Patient X-rays (PDF)
//                   </label>
//                   <input
//                     type="file"
//                     id="patientAxrays"
//                     accept="application/pdf"
//                     onChange={(e) => handleFileChange(e, 'patientAxrays')}
//                     className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                     aria-describedby="patientAxraysHelp"
//                   />
//                   <p id="patientAxraysHelp" className="mt-1 text-xs text-[#8845a1]">
//                     {patientAxrays ? patientAxrays.name : 'Select a PDF file'}
//                   </p>
//                 </div>
//                 <div
//                   onDragEnter={(e) => handleDrag(e, 'patientReports')}
//                   onDragOver={(e) => handleDrag(e, 'patientReports')}
//                   onDragLeave={(e) => handleDrag(e, 'patientReports')}
//                   onDrop={(e) => handleDrop(e, 'patientReports')}
//                 >
//                   <label
//                     htmlFor="patientReports"
//                     className="block text-[#180c1d] text-sm font-medium mb-1"
//                   >
//                     Patient Reports (PDF)
//                   </label>
//                   <input
//                     type="file"
//                     id="patientReports"
//                     accept="application/pdf"
//                     onChange={(e) => handleFileChange(e, 'patientReports')}
//                     className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                     aria-describedby="patientReportsHelp"
//                   />
//                   <p id="patientReportsHelp" className="mt-1 text-xs text-[#8845a1]">
//                     {patientReports ? patientReports.name : 'Select a PDF file'}
//                   </p>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="block text-[#180c1d] text-sm font-medium mb-1"
//                   >
//                     Address
//                   </label>
//                   <textarea
//                     id="address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     placeholder="Enter your address"
//                     className="block w-full rounded-md border border-[#e2cdea] py-2 px-3 text-[#180c1d] text-sm focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:border-transparent"
//                     rows={3}
//                     aria-describedby="addressHelp"
//                   />
//                   <p id="addressHelp" className="mt-1 text-xs text-[#8845a1]">
//                     Provide your current address (optional)
//                   </p>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto px-6 py-2 bg-[#8845a1] text-white rounded-full text-sm font-bold hover:bg-[#6b3681] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:ring-offset-2 disabled:opacity-50"
//                   disabled={!profilePicture && !prescription && !patientAxrays && !patientReports && !address}
//                 >
//                   Upload
//                 </button>
//               </form>
//               {message && (
//                 <p
//                   className={`mt-4 text-sm ${
//                     message.includes('failed') || message.includes('Invalid') || message.includes('not found')
//                       ? 'text-red-600'
//                       : 'text-green-600'
//                   } text-center`}
//                 >
//                   {message}
//                 </p>
//               )}
//               <div className="mt-6 w-full max-w-md">
//                 <h4 className="text-[#180c1d] text-sm font-bold mb-2 text-center">Uploaded Documents</h4>
//                 {patient?.prescriptionUrl && (
//                   <div className="flex items-center justify-between py-2 border-b border-[#e2cdea]">
//                     <span className="text-[#180c1d] text-sm font-medium">Prescription</span>
//                     <div className="flex gap-2">
//                       <a
//                         href={patient.prescriptionUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#8845a1] hover:underline text-sm"
//                         aria-label="View Prescription"
//                       >
//                         View
//                       </a>
//                       <button
//                         onClick={() => handleDownload(patient.prescriptionUrl!, 'prescription.pdf')}
//                         className="text-[#8845a1] hover:underline text-sm"
//                         aria-label="Download Prescription"
//                       >
//                         Download
//                       </button>
//                       <button
//                         onClick={() => handleDelete('prescription')}
//                         className="text-red-600 hover:underline text-sm"
//                         aria-label="Delete Prescription"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 {patient?.patientaxraysUrl && (
//                   <div className="flex items-center justify-between py-2 border-b border-[#e2cdea]">
//                     <span className="text-[#180c1d] text-sm font-medium">X-rays</span>
//                     <div className="flex gap-2">
//                       <a
//                         href={patient.patientaxraysUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#8845a1] hover:underline text-sm"
//                         aria-label="View X-rays"
//                       >
//                         View
//                       </a>
//                       <button
//                         onClick={() => handleDownload(patient.patientaxraysUrl!, 'x-rays.pdf')}
//                         className="text-[#8845a1] hover:underline text-sm"
//                         aria-label="Download X-rays"
//                       >
//                         Download
//                       </button>
//                       <button
//                         onClick={() => handleDelete('patientaxrays')}
//                         className="text-red-600 hover:underline text-sm"
//                         aria-label="Delete X-rays"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 {patient?.patientreportsUrl && (
//                   <div className="flex items-center justify-between py-2 border-b border-[#e2cdea]">
//                     <span className="text-[#180c1d] text-sm font-medium">Reports</span>
//                     <div className="flex gap-2">
//                       <a
//                         href={patient.patientreportsUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#8845a1] hover:underline text-sm"
//                         aria-label="View Reports"
//                       >
//                         View
//                       </a>
//                       <button
//                         onClick={() => handleDownload(patient.patientreportsUrl!, 'reports.pdf')}
//                         className="text-[#8845a1] hover:underline text-sm"
//                         aria-label="Download Reports"
//                       >
//                         Download
//                       </button>
//                       <button
//                         onClick={() => handleDelete('patientreports')}
//                         className="text-red-600 hover:underline text-sm"
//                         aria-label="Delete Reports"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 {!(patient?.prescriptionUrl || patient?.patientaxraysUrl || patient?.patientreportsUrl) && (
//                   <p className="text-[#180c1d] text-sm text-center">No documents uploaded.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  email: string;
  country: string;
  mobilenum: number;
  profile_picture_url?: string;
  address?: string;
  role?: string;
  email_verified?: boolean;
}

const PatientProfile: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.id) {
      setUserId(userData.id);
      fetchPatient(userData.id);
    } else {
      setMessage('No user data found. Please log in.');
    }
  }, []);

  const fetchPatient = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.get<Patient>(`http://localhost:4545/user/get-patients/${id}`);
      setPatient(response.data);
    } catch (error) {
      setMessage('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setMessage('Please select an image file.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage('File size exceeds 5MB.');
      return;
    }

    setProfilePicture(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setMessage('');
  };

  const handleUpload = async () => {
    if (!userId || !profilePicture) {
      setMessage('No file selected.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      await axios.post(`http://localhost:4545/user/upload-files/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Profile picture uploaded successfully!');
      setProfilePicture(null);
      setPreviewUrl(null);
      await fetchPatient(userId); // refresh data
    } catch (error) {
      setMessage('Failed to upload profile picture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Your Profile</h1>

        {message && (
          <div
            className={`p-4 mb-4 rounded-lg text-white ${
              message.includes('Failed') ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {message}
          </div>
        )}

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={
                previewUrl ||
                patient?.profile_picture_url ||
                'https://via.placeholder.com/150'
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150';
              }}
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
          {profilePicture && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-4 px-6 py-2 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              {loading ? 'Uploading...' : 'Update Picture'}
            </button>
          )}
        </div>

        {/* Basic Info */}
        {patient && !loading ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg"><strong>ID:</strong> {patient.id}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Name:</strong> {patient.name}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Email:</strong> {patient.email}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Mobile:</strong> {patient.mobilenum}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Country:</strong> {patient.country}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Address:</strong> {patient.address || 'N/A'}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Role:</strong> {patient.role || 'N/A'}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Email Verified:</strong> {patient.email_verified ? 'Yes' : 'No'}</div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {loading ? 'Loading your profile...' : 'No profile data available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
