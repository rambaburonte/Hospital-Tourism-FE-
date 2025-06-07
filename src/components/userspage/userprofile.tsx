// import React, { useState, ChangeEvent } from 'react';

// interface Prescription {
//   id: string;
//   fileName: string;
//   fileType: 'image' | 'pdf';
//   fileUrl: string;
//   timestamp: string;
// }

// interface Patient {
//   name: string;
//   email: string;
//   phone: string;
//   dob: string;
//   bloodType: string;
//   allergies: string;
//   medicalHistory: string;
//   emergencyContact: string;
//   address: string;
//   avatar: string;
//   prescriptions: Prescription[];
//   timestamp?: string;
// }

// const PatientProfile: React.FC = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);


//   const [editing, setEditing] = useState<boolean>(false);
//   const [darkMode, setDarkMode] = useState<boolean>(false);
//   const [errors, setErrors] = useState<Partial<Record<keyof Patient, string>>>({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
//   const [isPrescriptionsOpen, setIsPrescriptionsOpen] = useState<boolean>(false);
//   const [fileError, setFileError] = useState<string>('');

  

//   const validateField = (name: keyof Patient, value: string): string => {
//     switch (name) {
//       case 'name':
//         return value.trim() ? '' : 'Name is required';
//       case 'email':
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
//       case 'phone':
//         return /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits';
//       case 'dob':
//         return value.match(/^\d{4}-\d{2}-\d{2}$/) ? '' : 'Use YYYY-MM-DD format';
//       case 'emergencyContact':
//         return value.trim() ? '' : 'Emergency contact is required';
//       default:
//         return '';
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setPatient({ ...patient, [name]: value });
//     setErrors({ ...errors, [name]: validateField(name as keyof Patient, value) });
//   };

//   const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         setErrors({ ...errors, avatar: 'Image size must be less than 2MB' });
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPatient((prev) => ({ ...prev, avatar: reader.result as string }));
//         setErrors({ ...errors, avatar: '' });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePrescriptionUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
//     if (!allowedTypes.includes(file.type)) {
//       setFileError('Only PNG, JPEG, or PDF files are allowed');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setFileError('File size must be less than 5MB');
//       return;
//     }

//     setFileError('');
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newPrescription: Prescription = {
//         id: crypto.randomUUID(),
//         fileName: file.name,
//         fileType: file.type === 'application/pdf' ? 'pdf' : 'image',
//         fileUrl: reader.result as string,
//         timestamp: new Date().toISOString(),
//       };
//       const updatedPrescriptions = [...patient.prescriptions, newPrescription];
//       const updatedPatient = { ...patient, prescriptions: updatedPrescriptions };
//       setPatient(updatedPatient);
//       setPatientHistory([...patientHistory, { ...updatedPatient, timestamp: new Date().toISOString() }]);
//       console.log('Uploaded Prescription:', newPrescription);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = () => {
//     const newErrors: Partial<Record<keyof Patient, string>> = {};
//     Object.keys(patient).forEach((key) => {
//       if (key !== 'avatar' && key !== 'timestamp' && key !== 'prescriptions') {
//         const value = patient[key as keyof Patient];
//         if (typeof value === 'string') {
//           newErrors[key as keyof Patient] = validateField(key as keyof Patient, value);
//         }
//       }
//     });
//     setErrors(newErrors);
//     if (Object.values(newErrors).some((error) => error)) return;

//     setPatientHistory([...patientHistory, { ...patient, timestamp: new Date().toISOString() }]);
//     setEditing(false);
//     console.log('Updated Patient Profile:', patient);
//   };

//   return (
//     <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 font-sans antialiased`}>
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
//         <div className="p-6 sm:p-8 lg:p-10">
//           <div className="flex flex-col items-center space-y-6">
//             <div className="relative group">
//               <img
//                 className="w-40 h-40 rounded-full object-cover border-4 border-[#499E14] dark:border-[#5cb91d] shadow-lg transition-transform duration-300 group-hover:scale-105"
//                 src={patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&size=150&background=0D8ABC&color=fff`}
//                 alt="Patient avatar"
//                 aria-label="Patient profile picture"
//               />
//               {editing && (
//                 <label className="absolute bottom-2 right-2 bg-[#499E14] text-white p-2 rounded-full cursor-pointer hover:bg-[#3a7e10] transition-colors duration-200">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleAvatarChange}
//                     className="hidden"
//                     aria-label="Upload profile picture"
//                   />
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6" />
//                   </svg>
//                 </label>
//               )}
//               {errors.avatar && (
//                 <p className="text-red-500 text-xs mt-2 text-center">{errors.avatar}</p>
//               )}
//             </div>

//             <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{patient.name}</h1>

//             {Object.values(errors).some((error) => error && !errors.avatar) && (
//               <div className="w-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg text-center">
//                 Please fix the errors in the form before saving.
//               </div>
//             )}

//             {editing ? (
//               <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                 <div className="space-y-1">
//                   <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
//                   <input
//                     id="name"
//                     name="name"
//                     value={patient.name}
//                     onChange={handleChange}
//                     placeholder="Enter full name"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                     aria-invalid={errors.name ? 'true' : 'false'}
//                     aria-describedby={errors.name ? 'name-error' : undefined}
//                   />
//                   {errors.name && <p id="name-error" className="text-red-500 text-xs">{errors.name}</p>}
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                   <input
//                     id="email"
//                     name="email"
//                     value={patient.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                     aria-invalid={errors.email ? 'true' : 'false'}
//                     aria-describedby={errors.email ? 'email-error' : undefined}
//                   />
//                   {errors.email && <p id="email-error" className="text-red-500 text-xs">{errors.email}</p>}
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     value={patient.phone}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                     aria-invalid={errors.phone ? 'true' : 'false'}
//                     aria-describedby={errors.phone ? 'phone-error' : undefined}
//                   />
//                   {errors.phone && <p id="phone-error" className="text-red-500 text-xs">{errors.phone}</p>}
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="dob" className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
//                   <input
//                     id="dob"
//                     name="dob"
//                     value={patient.dob}
//                     onChange={handleChange}
//                     placeholder="YYYY-MM-DD"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                     aria-invalid={errors.dob ? 'true' : 'false'}
//                     aria-describedby={errors.dob ? 'dob-error' : undefined}
//                   />
//                   {errors.dob && <p id="dob-error" className="text-red-500 text-xs">{errors.dob}</p>}
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="bloodType" className="text-sm font-medium text-gray-700 dark:text-gray-300">Blood Type</label>
//                   <input
//                     id="bloodType"
//                     name="bloodType"
//                     value={patient.bloodType}
//                     onChange={handleChange}
//                     placeholder="Enter blood type (e.g., O+)"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="allergies" className="text-sm font-medium text-gray-700 dark:text-gray-300">Allergies</label>
//                   <input
//                     id="allergies"
//                     name="allergies"
//                     value={patient.allergies}
//                     onChange={handleChange}
//                     placeholder="Enter allergies (if any)"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//                 <div className="space-y-1 sm:col-span-2">
//                   <label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700 dark:text-gray-300">Medical History</label>
//                   <textarea
//                     id="medicalHistory"
//                     name="medicalHistory"
//                     value={patient.medicalHistory}
//                     onChange={handleChange}
//                     placeholder="Enter medical history"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                     rows={4}
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact</label>
//                   <input
//                     id="emergencyContact"
//                     name="emergencyContact"
//                     value={patient.emergencyContact}
//                     onChange={handleChange}
//                     placeholder="Enter emergency contact"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                     aria-invalid={errors.emergencyContact ? 'true' : 'false'}
//                     aria-describedby={errors.emergencyContact ? 'emergencyContact-error' : undefined}
//                   />
//                   {errors.emergencyContact && <p id="emergencyContact-error" className="text-red-500 text-xs">{errors.emergencyContact}</p>}
//                 </div>
//                 <div className="space-y-1">
//                   <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
//                   <input
//                     id="address"
//                     name="address"
//                     value={patient.address}
//                     onChange={handleChange}
//                     placeholder="Enter address"
//                     className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="w-full bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-inner">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 dark:text-gray-200">
//                   <div>
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Email</p>
//                     <p><a href={`mailto:${patient.email}`} className="hover:underline text-[#499E14] dark:text-[#5cb91d]">{patient.email}</a></p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Phone</p>
//                     <p>{patient.phone}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Date of Birth</p>
//                     <p>{patient.dob}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Blood Type</p>
//                     <p>{patient.bloodType}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Allergies</p>
//                     <p>{patient.allergies}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Emergency Contact</p>
//                     <p>{patient.emergencyContact}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Medical History</p>
//                     <p>{patient.medicalHistory}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <p className="font-semibold text-gray-700 dark:text-gray-300">Address</p>
//                     <p>{patient.address}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex flex-wrap justify-center gap-4 mt-8">
//               <button
//                 className="px-8 py-3 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635] focus:outline-none shadow-md"
//                 onClick={() => setEditing(!editing)}
//                 aria-label={editing ? 'Cancel editing' : 'Edit profile'}
//               >
//                 {editing ? 'Cancel' : 'Edit Profile'}
//               </button>
//               {editing && (
//                 <button
//                   className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 focus:ring-4 focus:ring-green-300 focus:outline-none shadow-md"
//                   onClick={handleSave}
//                   aria-label="Save profile"
//                 >
//                   Save Profile
//                 </button>
//               )}
//             </div>

//             <div className="flex items-center space-x-3 mt-6">
//               <label htmlFor="darkModeToggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
//               <input
//                 id="darkModeToggle"
//                 type="checkbox"
//                 checked={darkMode}
//                 onChange={() => setDarkMode(!darkMode)}
//                 className="w-5 h-5 accent-[#499E14] rounded focus:ring-2 focus:ring-[#499E14]"
//                 aria-label="Toggle dark mode"
//               />
//               <span className="text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Prescriptions Section */}
//       <div className="max-w-4xl mx-auto mt-8">
//         <button
//           className="w-full flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
//           onClick={() => setIsPrescriptionsOpen(!isPrescriptionsOpen)}
//           aria-expanded={isPrescriptionsOpen}
//           aria-controls="prescriptions-panel"
//         >
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Prescriptions</h2>
//           <svg
//             className={`w-6 h-6 transform transition-transform duration-200 ${isPrescriptionsOpen ? 'rotate-180' : ''}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>
//         <div
//           id="prescriptions-panel"
//           className={`mt-4 overflow-hidden transition-all duration-300 ${isPrescriptionsOpen ? 'max-h-screen' : 'max-h-0'}`}
//         >
//           <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
//             <div className="mb-4">
//               <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Upload Prescription</label>
//               <input
//                 type="file"
//                 accept="image/png,image/jpeg,application/pdf"
//                 onChange={handlePrescriptionUpload}
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#499E14] file:text-white hover:file:bg-[#3a7e10]"
//                 aria-label="Upload prescription file"
//               />
//               {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
//             </div>

//             <div className="space-y-6">
//               {patient.prescriptions.length > 0 ? (
//                 patient.prescriptions
//                   .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
//                   .map((prescription, index) => (
//                     <div
//                       key={prescription.id}
//                       className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-green-500 dark:border-green-400 animate-fade-in"
//                     >
//                       <div className="absolute -left-2 top-6 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full" />
//                       <div className="flex justify-between items-center">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white">Prescription {index + 1}</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           {new Date(prescription.timestamp).toLocaleString()}
//                         </p>
//                       </div>
//                       <div className="mt-3">
//                         <p><span className="font-semibold">File:</span> {prescription.fileName}</p>
//                         {prescription.fileType === 'image' ? (
//                           <img
//                             src={prescription.fileUrl}
//                             alt={prescription.fileName}
//                             className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md"
//                           />
//                         ) : (
//                           <div className="mt-2">
//                             <a
//                               href={prescription.fileUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-[#499E14] hover:underline dark:text-[#5cb91d]"
//                               aria-label={`View ${prescription.fileName}`}
//                             >
//                               View PDF
//                             </a>
//                             <iframe
//                               src={prescription.fileUrl}
//                               title={prescription.fileName}
//                               className="mt-2 w-full h-64 rounded-lg border"
//                               aria-label={`Preview of ${prescription.fileName}`}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-center">No prescriptions available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Profile History Section */}
//       <div className="max-w-4xl mx-auto mt-8">
//         <button
//           className="w-full flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
//           onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//           aria-expanded={isHistoryOpen}
//           aria-controls="history-panel"
//         >
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile History</h2>
//           <svg
//             className={`w-6 h-6 transform transition-transform duration-200 ${isHistoryOpen ? 'rotate-180' : ''}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>
//         <div
//           id="history-panel"
//           className={`mt-4 overflow-hidden transition-all duration-300 ${isHistoryOpen ? 'max-h-screen' : 'max-h-0'}`}
//         >
//           <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
//             {patientHistory.length > 0 ? (
//               <div className="space-y-6">
//                 {patientHistory.map((history, index) => (
//                   <div
//                     key={index}
//                     className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-[#499E14] dark:border-[#5cb91d] animate-fade-in"
//                   >
//                     <div className="absolute -left-2 top-6 w-4 h-4 bg-[#499E14] dark:bg-[#5cb91d] rounded-full" />
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-medium text-gray-900 dark:text-white">Version {index + 1}</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         {new Date(history.timestamp || '').toLocaleString()}
//                       </p>
//                     </div>
//                     <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-200">
//                       <p><span className="font-semibold">Name:</span> {history.name}</p>
//                       <p><span className="font-semibold">Email:</span> {history.email}</p>
//                       <p><span className="font-semibold">Phone:</span> {history.phone}</p>
//                       <p><span className="font-semibold">Date of Birth:</span> {history.dob}</p>
//                       <p><span className="font-semibold">Blood Type:</span> {history.bloodType}</p>
//                       <p><span className="font-semibold">Allergies:</span> {history.allergies}</p>
//                       <p className="sm:col-span-2"><span className="font-semibold">Medical History:</span> {history.medicalHistory}</p>
//                       <p><span className="font-semibold">Emergency Contact:</span> {history.emergencyContact}</p>
//                       <p><span className="font-semibold">Address:</span> {history.address}</p>
//                       <div className="sm:col-span-2">
//                         <p className="font-semibold">Prescriptions:</p>
//                         {history.prescriptions.length > 0 ? (
//                           <ul className="list-disc pl-5">
//                             {history.prescriptions.map((p) => (
//                               <li key={p.id}>
//                                 <a
//                                   href={p.fileUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-[#499E14] hover:underline dark:text-[#5cb91d]"
//                                 >
//                                   {p.fileName}
//                                 </a>{' '}
//                                 ({p.fileType}, {new Date(p.timestamp).toLocaleDateString()})
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p>No prescriptions</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400 text-center">No changes in history.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientProfile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PatientProfile = () => {
//   const [patient, setPatient] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [message, setMessage] = useState('');
//   const [userId, setUserId] = useState(null);

//   // Get user ID from localStorage on component mount
//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     if (userData && userData.id) {
//       setUserId(userData.id);
//       fetchPatient(userData.id);
//     } else {
//       setMessage('No user data found in localStorage. Please log in.');
//     }
//   }, []);

//   const fetchPatient = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/user/get-patients/${id}`);
//       setPatient(response.data);
//     } catch (error) {
//       setMessage('Error fetching patient data: ' + error.message);
//     }
//   };

//   const handleFileChange = (e, type) => {
//     if (type === 'profilePicture') {
//       setProfilePicture(e.target.files[0]);
//     } else {
//       setPrescription(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId) {
//       setMessage('User ID not found. Please log in.');
//       return;
//     }

//     const formData = new FormData();
//     if (profilePicture) formData.append('profilePicture', profilePicture);
//     if (prescription) formData.append('prescription', prescription);

//     try {
//       const response = await axios.post(`http://localhost:8080/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files uploaded successfully!');
//       // Refresh patient data to show updated URLs
//       await fetchPatient(userId);
//       // Clear file inputs
//       setProfilePicture(null);
//       setPrescription(null);
//       document.getElementById('profilePicture').value = '';
//       document.getElementById('prescription').value = '';
//     } catch (error) {
//       setMessage('Error uploading files: ' + error.message);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Profile</h2>
//       {patient ? (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">{patient.name}</h3>
//           <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
//           <p className="text-gray-600"><strong>Mobile:</strong> {patient.mobilenum}</p>
//           <p className="text-gray-600"><strong>Country:</strong> {patient.country}</p>
//           <p className="text-gray-600"><strong>Address:</strong> {patient.address}</p>
//           <p className="text-gray-600"><strong>Role:</strong> {patient.role}</p>
//           <p className="text-gray-600"><strong>Email Verified:</strong> {patient.emailVerified ? 'Yes' : 'No'}</p>
//           {patient.profilePictureUrl && (
//             <div className="mt-4">
//               <strong className="text-gray-600">Profile Picture:</strong>
//               <img
//                 src={patient.profilePictureUrl}
//                 alt="Profile"
//                 className="mt-2 max-w-xs rounded-lg shadow-sm"
//               />
//             </div>
//           )}
//           {patient.prescriptionUrl && (
//             <div className="mt-4">
//               <strong className="text-gray-600">Prescription:</strong>
//               <a
//                 href={patient.prescriptionUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline ml-2"
//               >
//                 View Prescription
//               </a>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="text-gray-500">Loading patient data...</p>
//       )}

//       <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Files</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Profile Picture (Image):</label>
//           <input
//             type="file"
//             id="profilePicture"
//             accept="image/*"
//             onChange={(e) => handleFileChange(e, 'profilePicture')}
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Prescription (PDF):</label>
//           <input
//             type="file"
//             id="prescription"
//             accept=".pdf"
//             onChange={(e) => handleFileChange(e, 'prescription')}
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//         >
//           Upload Files
//         </button>
//       </form>
//       {message && (
//         <p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default PatientProfile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PatientProfile = () => {
//   const [patient, setPatient] = useState(null);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [message, setMessage] = useState('');
//   const [userId, setUserId] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   // Fetch user ID and patient data
//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     if (userData && userData.id) {
//       setUserId(userData.id);
//       fetchPatient(userData.id);
//     } else {
//       setMessage('No user data found in localStorage. Please log in.');
//     }
//   }, []);

//   const fetchPatient = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/user/get-patients/${id}`);
//       setPatient(response.data);
//     } catch (error) {
//       setMessage('Error fetching patient data: ' + error.message);
//     }
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (type === 'profilePicture') {
//       if (file && file.type.startsWith('image/')) {
//         setProfilePicture(file);
//       } else {
//         setMessage('Please select a valid image file for profile picture.');
//       }
//     } else {
//       if (file && file.type === 'application/pdf') {
//         setPrescription(file);
//       } else {
//         setMessage('Please select a valid PDF file for prescription.');
//       }
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e, type) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     const file = e.dataTransfer.files[0];
//     if (type === 'profilePicture') {
//       if (file && file.type.startsWith('image/')) {
//         setProfilePicture(file);
//       } else {
//         setMessage('Please drop a valid image file for profile picture.');
//       }
//     } else {
//       if (file && file.type === 'application/pdf') {
//         setPrescription(file);
//       } else {
//         setMessage('Please drop a valid PDF file for prescription.');
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId) {
//       setMessage('User ID not found. Please log in.');
//       return;
//     }

//     const formData = new FormData();
//     if (profilePicture) formData.append('profilePicture', profilePicture);
//     if (prescription) formData.append('prescription', prescription);

//     if (!profilePicture && !prescription) {
//       setMessage('Please select at least one file to upload.');
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:8080/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files uploaded successfully!');
//       await fetchPatient(userId);
//       setProfilePicture(null);
//       setPrescription(null);
//       document.getElementById('profilePicture').value = '';
//       document.getElementById('prescription').value = '';
//     } catch (error) {
//       setMessage('Error uploading files: ' + error.message);
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
//                 d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.115-15.096,16,0,16,0,64,0,0,36.05,64,0,64,0,8,0,16,0Z"
//               ></path>
//             </svg>
//           </button>
//           <div
//             className="relative group"
//             role="button"
//             tabIndex="0"
//             aria-label="Profile menu"
//           >
//             <img
//               src={patient?.profilePictureUrl || 'https://via.placeholder.com/40'}
//               alt="Profile"
//               className="size-10 rounded-full object-cover border-2 border-[#8845a1] shadow-sm group-hover:scale-105%] transition-transform duration-200"
//             />
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-200 hidden group-hover:block">
//               <div className="py-2">
//                 <p className="px-4 py-2 text-sm text-[#180c1d] font-medium">{patient?.name || 'User'}</p>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-[#180c1d] hover:bg-[#f0e6f4]"
//                 >
//                   Settings
//                 </a>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-[#180c1d] hover:bg-[#f0e6f4]"
//                 >
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
//             <div className="bg-gradient-to-r from-[#f0e6f4] to-[#fbf8fc] p-6 sm:p-8">
//               <div className="flex flex-col sm:flex-row items-center gap-6">
//                 <img
//                   src={patient?.profilePictureUrl || 'https://via.placeholder.com/120'}
//                   alt="Profile"
//                   className="size-24 sm:size-32 rounded-full object-cover border-4 border-white shadow-md"
//                 />
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
//                   <p className="text-[#8845a1] text-sm font-medium">Email Verified</p>
//                   <p className="text-[#180c1d] text-sm">{patient?.emailVerified ? 'Yes' : 'No'}</p>
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
//                 dragActive ? 'border-[#8845a1] bg-[#f0e6f4]' : 'border-[#e2cdea] bg-[#fbf8fc]'
//               } px-6 py-10 transition-colors duration-200`}
//               onDragEnter={handleDrag}
//               onDragOver={handleDrag}
//               onDragLeave={handleDrag}
//               onDrop={(e) => handleDrop(e, 'profilePicture')}
//             >
//               <div className="flex flex-col items-center gap-2 text-center">
//                 <p className="text-[#180c1d] text-lg font-bold tracking-tight">
//                   Upload Documents
//                 </p>
//                 <p className="text-[#180c1d] text-sm font-normal max-w-xs">
//                   Drag and drop files here, or click to browse
//                 </p>
//               </div>
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
//                 <div>
//                   <label htmlFor="profilePicture" className="block text-[#180c1d] text-sm font-medium mb-1">
//                     Profile Picture (Image)
//                   </label>
//                   <input
//                     type="file"
//                     id="profilePicture"
//                     accept="image/*"
//                     onChange={(e) => handleFileChange(e, 'profilePicture')}
//                     className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                     aria-describedby="profilePictureHelp"
//                   />
//                   <p id="profilePictureHelp" className="mt-1 text-xs text-[#8845a1]">
//                     {profilePicture ? profilePicture.name : 'Select an image file'}
//                   </p>
//                 </div>
//                 <div
//                   onDrop={(e) => handleDrop(e, 'prescription')}
//                   onDragEnter={handleDrag}
//                   onDragOver={handleDrag}
//                   onDragLeave={handleDrag}
//                 >
//                   <label htmlFor="prescription" className="block text-[#180c1d] text-sm font-medium mb-1">
//                     Prescription (PDF)
//                   </label>
//                   <input
//                     type="file"
//                     id="prescription"
//                     accept=".pdf"
//                     onChange={(e) => handleFileChange(e, 'prescription')}
//                     className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                     aria-describedby="prescriptionHelp"
//                   />
//                   <p id="prescriptionHelp" className="mt-1 text-xs text-[#8845a1]">
//                     {prescription ? prescription.name : 'Select a PDF file'}
//                   </p>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto px-6 py-2 bg-[#8845a1] text-white rounded-full text-sm font-bold hover:bg-[#6b3681] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:ring-offset-2"
//                   disabled={!profilePicture && !prescription}
//                 >
//                   Upload
//                 </button>
//               </form>
//               {message && (
//                 <p
//                   className={`mt-4 text-sm ${
//                     message.includes('Error') ? 'text-red-600' : 'text-green-600'
//                   } text-center`}
//                 >
//                   {message}
//                 </p>
//               )}
//               {patient?.prescriptionUrl && (
//                 <div className="mt-4 text-center">
//                   <p className="text-[#180c1d] text-sm font-medium">
//                     <strong>Current Prescription:</strong>{' '}
//                     <a
//                       href={patient.prescriptionUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#8845a1] hover:underline"
//                     >
//                       View Prescription
//                     </a>
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientProfile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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
// }

// const PatientProfile: React.FC = () => {
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [message, setMessage] = useState('');

//   const [profilePicture, setProfilePicture] = useState<File | null>(null);
//   const [prescription, setPrescription] = useState<File | null>(null);
//   const [patientAxrays, setPatientAxrays] = useState<File | null>(null);
//   const [patientReports, setPatientReports] = useState<File | null>(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user') || '{}');
//     if (userData.id) {
//       setUserId(userData.id);
//       fetchPatient(userData.id);
//     }
//   }, []);

//   const fetchPatient = async (id: number) => {
//     try {
//       const res = await axios.get<Patient>(`http://localhost:8080/user/get-patients/${id}`);
//       setPatient(res.data);
//     } catch (err) {
//       setMessage('Failed to fetch patient data.');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
//       setProfilePicture(file);
//     } else if (type === 'prescription' && file.type === 'application/pdf') {
//       setPrescription(file);
//     } else if (type === 'patientAxrays' && file.type === 'application/pdf') {
//       setPatientAxrays(file);
//     } else if (type === 'patientReports' && file.type === 'application/pdf') {
//       setPatientReports(file);
//     } else {
//       setMessage(`Invalid file type for ${type}`);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!userId) {
//       setMessage('User ID not found.');
//       return;
//     }

//     const formData = new FormData();
//     if (profilePicture) formData.append('profilePicture', profilePicture);
//     if (prescription) formData.append('prescription', prescription);
//     if (patientAxrays) formData.append('patientaxrays', patientAxrays);
//     if (patientReports) formData.append('patientreports', patientReports);

//     try {
//       await axios.post(`http://localhost:8080/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files uploaded successfully.');
//       fetchPatient(userId);
//     } catch (error) {
//       setMessage('Upload failed.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>

//       {message && <p className="text-red-500 mb-4">{message}</p>}

//       {patient && (
//         <div className="mb-6 bg-white p-4 rounded shadow">
//           <p><strong>Name:</strong> {patient.name}</p>
//           <p><strong>Email:</strong> {patient.email}</p>
//           <p><strong>Mobile:</strong> {patient.mobilenum}</p>
//           <p><strong>Country:</strong> {patient.country}</p>
//           <p><strong>Address:</strong> {patient.address}</p>
//           <div className="flex gap-4 mt-4">
//             <img src={patient.profilePictureUrl || 'https://via.placeholder.com/120'} alt="Profile" className="w-28 h-28 rounded border" />
//             {patient.prescriptionUrl && <a href={patient.prescriptionUrl} target="_blank" rel="noreferrer">View Prescription</a>}
//             {patient.patientaxraysUrl && <a href={patient.patientaxraysUrl} target="_blank" rel="noreferrer">View X-rays</a>}
//             {patient.patientreportsUrl && <a href={patient.patientreportsUrl} target="_blank" rel="noreferrer">View Reports</a>}
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Profile Picture (Image)</label>
//           <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePicture')} />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Prescription (PDF)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'prescription')} />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Patient X-rays (PDF)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'patientAxrays')} />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Patient Reports (PDF)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'patientReports')} />
//         </div>

//         <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
//           Upload Files
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PatientProfile;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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
// }

// const PatientProfile: React.FC = () => {
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [message, setMessage] = useState('');
//   const [profilePicture, setProfilePicture] = useState<File | null>(null);
//   const [prescription, setPrescription] = useState<File | null>(null);
//   const [patientAxrays, setPatientAxrays] = useState<File | null>(null);
//   const [patientReports, setPatientReports] = useState<File | null>(null);
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
//       const res = await axios.get<Patient>(`http://localhost:8080/user/get-patients/${id}`);
//       setPatient(res.data);
//     } catch (err) {
//       setMessage('Failed to fetch patient data.');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
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

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
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

//     if (!profilePicture && !prescription && !patientAxrays && !patientReports) {
//       setMessage('Please select at least one file to upload.');
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:8080/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files uploaded successfully.');
//       setProfilePicture(null);
//       setPrescription(null);
//       setPatientAxrays(null);
//       setPatientReports(null);
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
//             <div className="bg-gradient-to-r from-[#f0e6f4] to-[#fbf8fc] p-6 sm:p-8">
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
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, 'profilePicture')}
//                       className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                       aria-describedby="profilePictureHelp"
//                     />
//                     <p id="profilePictureHelp" className="mt-1 text-xs text-[#8845a1] text-center sm:text-left">
//                       {profilePicture ? profilePicture.name : 'Select an image file'}
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
//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto px-6 py-2 bg-[#8845a1] text-white rounded-full text-sm font-bold hover:bg-[#6b3681] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:ring-offset-2 disabled:opacity-50"
//                   disabled={!profilePicture && !prescription && !patientAxrays && !patientReports}
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
//               <div className="mt-6 flex flex-col gap-2 text-center">
//                 {patient?.prescriptionUrl && (
//                   <p className="text-[#180c1d] text-sm font-medium">
//                     <strong>Prescription:</strong>{' '}
//                     <a
//                       href={patient.prescriptionUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#8845a1] hover:underline"
//                     >
//                       View Prescription
//                     </a>
//                   </p>
//                 )}
//                 {patient?.patientaxraysUrl && (
//                   <p className="text-[#180c1d] text-sm font-medium">
//                     <strong>X-rays:</strong>{' '}
//                     <a
//                       href={patient.patientaxraysUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#8845a1] hover:underline"
//                     >
//                       View X-rays
//                     </a>
//                   </p>
//                 )}
//                 {patient?.patientreportsUrl && (
//                   <p className="text-[#180c1d] text-sm font-medium">
//                     <strong>Reports:</strong>{' '}
//                     <a
//                       href={patient.patientreportsUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#8845a1] hover:underline"
//                     >
//                       View Reports
//                     </a>
//                   </p>
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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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
// }

// const PatientProfile: React.FC = () => {
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [message, setMessage] = useState('');
//   const [profilePicture, setProfilePicture] = useState<File | null>(null);
//   const [prescription, setPrescription] = useState<File | null>(null);
//   const [patientAxrays, setPatientAxrays] = useState<File | null>(null);
//   const [patientReports, setPatientReports] = useState<File | null>(null);
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
//       const res = await axios.get<Patient>(`http://localhost:8080/user/get-patients/${id}`);
//       setPatient(res.data);
//     } catch (err) {
//       setMessage('Failed to fetch patient data.');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
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

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
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

//     if (!profilePicture && !prescription && !patientAxrays && !patientReports) {
//       setMessage('Please select at least one file to upload.');
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:8080/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files uploaded successfully.');
//       setProfilePicture(null);
//       setPrescription(null);
//       setPatientAxrays(null);
//       setPatientReports(null);
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
//       await axios.delete(`http://localhost:8080/user/delete-file/${userId}/${type}`);
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
//             <div className="bg-gradient-to-r from-[#f0e6f4] to-[#fbf8fc] p-6 sm:p-8">
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
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, 'profilePicture')}
//                       className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                       aria-describedby="profilePictureHelp"
//                     />
//                     <p id="profilePictureHelp" className="mt-1 text-xs text-[#8845a1] text-center sm:text-left">
//                       {profilePicture ? profilePicture.name : 'Select an image file'}
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
//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto px-6 py-2 bg-[#8845a1] text-white rounded-full text-sm font-bold hover:bg-[#6b3681] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:ring-offset-2 disabled:opacity-50"
//                   disabled={!profilePicture && !prescription && !patientAxrays && !patientReports}
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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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
//       const res = await axios.get<Patient>(`http://localhost:8080/user/get-patients/${id}`);
//       setPatient(res.data);
//       setAddress(res.data.address || '');
//     } catch (err) {
//       setMessage('Failed to fetch patient data.');
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
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

//     if (type === 'profilePicture' && file.type.startsWith('image/')) {
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

//     if (!profilePicture && !prescription && !patientAxrays && !patientReports) {
//       setMessage('Please select at least one file to upload.');
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:8080/user/upload-files/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMessage('Files and address uploaded successfully.');
//       setProfilePicture(null);
//       setPrescription(null);
//       setPatientAxrays(null);
//       setPatientReports(null);
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
//       await axios.delete(`http://localhost:8080/user/delete-file/${userId}/${type}`);
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
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
//             <div className="bg-gradient-to-r from-[#f0e6f4] to-[#faf9fc] p-6 sm:p-8">
//               <div className="flex flex-col sm:flex-row items-center gap-6">
//                 <div className="flex flex-col items-center sm:items-start gap-4">
//                   <img
//                     src={patient?.profilePictureUrl || 'https://via.placeholder.com/120'}
//                     alt="Profile"
//                     className="size-24 sm: rounded-full object-cover border-4 border-white shadow-md"
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
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, 'profilePicture')}
//                       className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
//                       aria-describedby="profilePictureHelp"
//                     />
//                     <p id="profilePictureHelp" className="mt-1 text-xs text-[#8845a1] text-center sm:text-left">
//                       {profilePicture ? profilePicture.name : 'Select an image file'}
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
//                   disabled={!profilePicture && !prescription && !patientAxrays && !patientReports}
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
  profilePictureUrl?: string;
  prescriptionUrl?: string;
  patientaxraysUrl?: string;
  patientreportsUrl?: string;
  address?: string;
  password?: string;
  role?: string;
  emailVerified?: boolean;
  verificationToken?: string | null;
}

const PatientProfile: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [prescription, setPrescription] = useState<File | null>(null);
  const [patientAxrays, setPatientAxrays] = useState<File | null>(null);
  const [patientReports, setPatientReports] = useState<File | null>(null);
  const [address, setAddress] = useState<string>('');
  const [dragActive, setDragActive] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.id) {
      setUserId(userData.id);
      fetchPatient(userData.id);
    } else {
      setMessage('No user data found in localStorage. Please log in.');
    }
  }, []);
   const base_url="https://healthtourism-5.onrender.com"
  const fetchPatient = async (id: number) => {
    try {
      const res = await axios.get<Patient>(`${base_url}/user/get-patients/${id}`);
      setPatient(res.data);
      setAddress(res.data.address || '');
    } catch (err) {
      setMessage('Failed to fetch patient data.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'profilePicture' && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setProfilePicture(file);
    } else if (
      (type === 'prescription' || type === 'patientAxrays' || type === 'patientReports') &&
      file.type === 'application/pdf'
    ) {
      if (type === 'prescription') setPrescription(file);
      if (type === 'patientAxrays') setPatientAxrays(file);
      if (type === 'patientReports') setPatientReports(file);
    } else {
      setMessage(`Invalid file type for ${type}.`);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive((prev) => ({ ...prev, [type]: true }));
    } else if (e.type === 'dragleave') {
      setDragActive((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [type]: false }));
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (type === 'profilePicture' && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setProfilePicture(file);
    } else if (
      (type === 'prescription' || type === 'patientAxrays' || type === 'patientReports') &&
      file.type === 'application/pdf'
    ) {
      if (type === 'prescription') setPrescription(file);
      if (type === 'patientAxrays') setPatientAxrays(file);
      if (type === 'patientReports') setPatientReports(file);
    } else {
      setMessage(`Invalid file type for ${type}.`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setMessage('User ID not found. Please log in.');
      return;
    }

    const formData = new FormData();
    if (profilePicture) formData.append('profilePicture', profilePicture);
    if (prescription) formData.append('prescription', prescription);
    if (patientAxrays) formData.append('patientaxrays', patientAxrays);
    if (patientReports) formData.append('patientreports', patientReports);
    formData.append('address', address);

    if (!profilePicture && !prescription && !patientAxrays && !patientReports && !address) {
      setMessage('Please select at least one file or provide an address to upload.');
      return;
    }
      const base_url="https://healthtourism-5.onrender.com"
    try {
      await axios.post(`${base_url}/user/upload-files/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Files and/or address uploaded successfully.');
      setProfilePicture(null);
      setPrescription(null);
      setPatientAxrays(null);
      setPatientReports(null);
      setAddress('');
      const inputs = ['profilePicture', 'prescription', 'patientAxrays', 'patientReports'];
      inputs.forEach((id) => {
        const input = document.getElementById(id) as HTMLInputElement;
        if (input) input.value = '';
      });
      fetchPatient(userId);
    } catch (error) {
      setMessage('Upload failed.');
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      setMessage('Failed to download file.');
    }
  };

  const handleDelete = async (type: string) => {
    if (!userId) {
      setMessage('User ID not found.');
      return;
    }
      const base_url="https://healthtourism-5.onrender.com"
    try {
      await axios.delete(`${base_url}/user/delete-file/${userId}/${type}`);
      setMessage(`${type} deleted successfully.`);
      fetchPatient(userId);
    } catch (error) {
      setMessage(`Failed to delete ${type}.`);
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#fbf8fc] overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-sm border-b border-[#f0e6f4] px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3 text-[#180c1d]">
          <div className="size-5">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#180c1d] text-xl font-bold tracking-tight">HealthHub</h2>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex gap-8">
            <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
              Home
            </a>
            <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
              Appointments
            </a>
            <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
              Messages
            </a>
            <a className="text-[#180c1d] text-sm font-medium hover:text-[#8845a1] transition-colors" href="#">
              Resources
            </a>
          </nav>
          <button
            className="p-2 rounded-full bg-[#f0e6f4] text-[#180c1d] hover:bg-[#e2cdea] transition-colors"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path
                d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
              ></path>
            </svg>
          </button>
          <div className="relative group" role="button" tabIndex={0} aria-label="Profile menu">
            <img
              src={patient?.profilePictureUrl || 'https://via.placeholder.com/40'}
              alt="Profile"
              className="size-10 rounded-full object-cover border-2 border-[#8845a1] shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-200 hidden group-hover:block">
              <div className="py-2">
                <p className="px-4 py-2 text-sm text-[#180c1d] font-medium">{patient?.name || 'User'}</p>
                <a href="#" className="block px-4 py-2 text-sm text-[#180c1d] hover:bg-[#f0e6f4]">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-[#180c1d] hover:bg-[#f0e6f4]">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e2cdea]">
            <div className="bg-gradient-to-r from-[#f0e6f4] to-[#faf9fc] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col items-center sm:items-start gap-4">
                  <img
                    src={patient?.profilePictureUrl || 'https://via.placeholder.com/120'}
                    alt="Profile"
                    className="size-24 sm:size-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="w-full max-w-xs">
                    <label
                      htmlFor="profilePicture"
                      className="block text-[#180c1d] text-sm font-medium mb-1 text-center sm:text-left"
                    >
                      Update Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, 'profilePicture')}
                      className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
                      aria-describedby="profilePictureHelp"
                    />
                    <p id="profilePictureHelp" className="mt-1 text-xs text-[#8845a1] text-center sm:text-left">
                      {profilePicture ? profilePicture.name : 'Select an image or PDF file'}
                    </p>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-[#180c1d] text-2xl sm:text-3xl font-bold tracking-tight">
                    {patient?.name || 'Loading...'}
                  </h2>
                  <p className="text-[#8845a1] text-lg font-medium mt-1">
                    Patient ID: {patient?.id || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-[#180c1d] text-xl font-bold tracking-tight mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[#8845a1] text-sm font-medium">Full Name</p>
                  <p className="text-[#180c1d] text-sm">{patient?.name || 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[#8845a1] text-sm font-medium">Contact Number</p>
                  <p className="text-[#180c1d] text-sm">{patient?.mobilenum || 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[#8845a1] text-sm font-medium">Email Address</p>
                  <p className="text-[#180c1d] text-sm">{patient?.email || 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[#8845a1] text-sm font-medium">Address</p>
                  <p className="text-[#180c1d] text-sm">{patient?.address || 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[#8845a1] text-sm font-medium">Country</p>
                  <p className="text-[#180c1d] text-sm">{patient?.country || 'N/A'}</p>
                </div>
                <div className="flex flex-col gap-1 py-2">
                  <p className="text-[#8845a1] text-sm font-medium">Role</p>
                  <p className="text-[#180c1d] text-sm">{patient?.role || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-[#e2cdea] p-6 sm:p-8">
            <h3 className="text-[#180c1d] text-xl font-bold tracking-tight mb-4">
              Documents
            </h3>
            <div
              className={`relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed ${
                dragActive.prescription || dragActive.patientAxrays || dragActive.patientReports
                  ? 'border-[#8845a1] bg-[#f0e6f4]'
                  : 'border-[#e2cdea] bg-[#fbf8fc]'
              } px-6 py-10 transition-colors duration-200`}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-[#180c1d] text-lg font-bold tracking-tight">
                  Upload Medical Documents
                </p>
                <p className="text-[#180c1d] text-sm font-normal max-w-xs">
                  Drag and drop files here, or click to browse
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                <div
                  onDragEnter={(e) => handleDrag(e, 'prescription')}
                  onDragOver={(e) => handleDrag(e, 'prescription')}
                  onDragLeave={(e) => handleDrag(e, 'prescription')}
                  onDrop={(e) => handleDrop(e, 'prescription')}
                >
                  <label
                    htmlFor="prescription"
                    className="block text-[#180c1d] text-sm font-medium mb-1"
                  >
                    Prescription (PDF)
                  </label>
                  <input
                    type="file"
                    id="prescription"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, 'prescription')}
                    className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
                    aria-describedby="prescriptionHelp"
                  />
                  <p id="prescriptionHelp" className="mt-1 text-xs text-[#8845a1]">
                    {prescription ? prescription.name : 'Select a PDF file'}
                  </p>
                </div>
                <div
                  onDragEnter={(e) => handleDrag(e, 'patientAxrays')}
                  onDragOver={(e) => handleDrag(e, 'patientAxrays')}
                  onDragLeave={(e) => handleDrag(e, 'patientAxrays')}
                  onDrop={(e) => handleDrop(e, 'patientAxrays')}
                >
                  <label
                    htmlFor="patientAxrays"
                    className="block text-[#180c1d] text-sm font-medium mb-1"
                  >
                    Patient X-rays (PDF)
                  </label>
                  <input
                    type="file"
                    id="patientAxrays"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, 'patientAxrays')}
                    className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
                    aria-describedby="patientAxraysHelp"
                  />
                  <p id="patientAxraysHelp" className="mt-1 text-xs text-[#8845a1]">
                    {patientAxrays ? patientAxrays.name : 'Select a PDF file'}
                  </p>
                </div>
                <div
                  onDragEnter={(e) => handleDrag(e, 'patientReports')}
                  onDragOver={(e) => handleDrag(e, 'patientReports')}
                  onDragLeave={(e) => handleDrag(e, 'patientReports')}
                  onDrop={(e) => handleDrop(e, 'patientReports')}
                >
                  <label
                    htmlFor="patientReports"
                    className="block text-[#180c1d] text-sm font-medium mb-1"
                  >
                    Patient Reports (PDF)
                  </label>
                  <input
                    type="file"
                    id="patientReports"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, 'patientReports')}
                    className="block w-full text-sm text-[#180c1d] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e6f4] file:text-[#180c1d] hover:file:bg-[#e2cdea] cursor-pointer"
                    aria-describedby="patientReportsHelp"
                  />
                  <p id="patientReportsHelp" className="mt-1 text-xs text-[#8845a1]">
                    {patientReports ? patientReports.name : 'Select a PDF file'}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-[#180c1d] text-sm font-medium mb-1"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="block w-full rounded-md border border-[#e2cdea] py-2 px-3 text-[#180c1d] text-sm focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:border-transparent"
                    rows={3}
                    aria-describedby="addressHelp"
                  />
                  <p id="addressHelp" className="mt-1 text-xs text-[#8845a1]">
                    Provide your current address (optional)
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-[#8845a1] text-white rounded-full text-sm font-bold hover:bg-[#6b3681] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8845a1] focus:ring-offset-2 disabled:opacity-50"
                  disabled={!profilePicture && !prescription && !patientAxrays && !patientReports && !address}
                >
                  Upload
                </button>
              </form>
              {message && (
                <p
                  className={`mt-4 text-sm ${
                    message.includes('failed') || message.includes('Invalid') || message.includes('not found')
                      ? 'text-red-600'
                      : 'text-green-600'
                  } text-center`}
                >
                  {message}
                </p>
              )}
              <div className="mt-6 w-full max-w-md">
                <h4 className="text-[#180c1d] text-sm font-bold mb-2 text-center">Uploaded Documents</h4>
                {patient?.prescriptionUrl && (
                  <div className="flex items-center justify-between py-2 border-b border-[#e2cdea]">
                    <span className="text-[#180c1d] text-sm font-medium">Prescription</span>
                    <div className="flex gap-2">
                      <a
                        href={patient.prescriptionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8845a1] hover:underline text-sm"
                        aria-label="View Prescription"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDownload(patient.prescriptionUrl!, 'prescription.pdf')}
                        className="text-[#8845a1] hover:underline text-sm"
                        aria-label="Download Prescription"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete('prescription')}
                        className="text-red-600 hover:underline text-sm"
                        aria-label="Delete Prescription"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                {patient?.patientaxraysUrl && (
                  <div className="flex items-center justify-between py-2 border-b border-[#e2cdea]">
                    <span className="text-[#180c1d] text-sm font-medium">X-rays</span>
                    <div className="flex gap-2">
                      <a
                        href={patient.patientaxraysUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8845a1] hover:underline text-sm"
                        aria-label="View X-rays"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDownload(patient.patientaxraysUrl!, 'x-rays.pdf')}
                        className="text-[#8845a1] hover:underline text-sm"
                        aria-label="Download X-rays"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete('patientaxrays')}
                        className="text-red-600 hover:underline text-sm"
                        aria-label="Delete X-rays"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                {patient?.patientreportsUrl && (
                  <div className="flex items-center justify-between py-2 border-b border-[#e2cdea]">
                    <span className="text-[#180c1d] text-sm font-medium">Reports</span>
                    <div className="flex gap-2">
                      <a
                        href={patient.patientreportsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8845a1] hover:underline text-sm"
                        aria-label="View Reports"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDownload(patient.patientreportsUrl!, 'reports.pdf')}
                        className="text-[#8845a1] hover:underline text-sm"
                        aria-label="Download Reports"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete('patientreports')}
                        className="text-red-600 hover:underline text-sm"
                        aria-label="Delete Reports"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                {!(patient?.prescriptionUrl || patient?.patientaxraysUrl || patient?.patientreportsUrl) && (
                  <p className="text-[#180c1d] text-sm text-center">No documents uploaded.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientProfile;