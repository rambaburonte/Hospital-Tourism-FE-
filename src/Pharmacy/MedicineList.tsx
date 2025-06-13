// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';

// interface Medicine {
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: string;
//   medicineQuantity: string;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = 'http://localhost:8080/pharmacy/getAllMadicines';

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }
//         const data = await response.json();
//         // Sort medicines by expiry date within each category
//         const sortedMedicines = data.sort((a: Medicine, b: Medicine) =>
//           new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime()
//         );
//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred.');
//         console.error('Failed to fetch medicines:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   // Group medicines by category
//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center sm:text-3xl">
//             Medicine Inventory
//           </h1>

//           {error && (
//             <div
//               className="mb-6 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2 animate-fade-in"
//               role="alert"
//               aria-live="assertive"
//             >
//               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded-md mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-gray-500 text-base">No medicines found in the inventory.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine, index) => (
//                     <div
//                       key={`${medicine.medicineName}-${index}`}
//                       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-md"
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image';
//                           }}
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
//                           <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                             Expiring Soon
//                           </span>
//                         )}
//                       </div>
//                       <div className="p-3">
//                         <h3 className="text-base font-semibold text-gray-800 truncate">
//                           {medicine.medicineName}
//                         </h3>
//                         <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                         <p className="text-xs text-gray-600 line-clamp-2 mb-2">
//                           {medicine.medicineDescription}
//                         </p>
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-base font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                           <span className="text-xs text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                         </div>
//                         <p className="text-xs text-gray-500">
//                           Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;



// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';

// interface Medicine {
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: string;
//   medicineQuantity: string;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = 'http://localhost:8080/pharmacy/getAllMadicines';

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }
//         const data: Medicine[] = await response.json();

//         const currentDate = new Date();

//         // Sort: expired medicines first, then by expiry date ascending
//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           return new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime();
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred.');
//         console.error('Failed to fetch medicines:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   // Group medicines by category
//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center sm:text-3xl">
//             Medicine Inventory
//           </h1>

//           {error && (
//             <div
//               className="mb-6 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2 animate-fade-in"
//               role="alert"
//               aria-live="assertive"
//             >
//               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded-md mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-gray-500 text-base">No medicines found in the inventory.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine, index) => (
//                     <div
//                       key={`${medicine.medicineName}-${index}`}
//                       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-md"
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image';
//                           }}
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date() && (
//                           <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                             Expired
//                           </span>
//                         )}
//                         {new Date(medicine.medicineExpiryDate) >= new Date() &&
//                           new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
//                             <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                               Expiring Soon
//                             </span>
//                           )}
//                       </div>
//                       <div className="p-3">
//                         <h3 className="text-base font-semibold text-gray-800 truncate">
//                           {medicine.medicineName}
//                         </h3>
//                         <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                         <p className="text-xs text-gray-600 line-clamp-2 mb-2">
//                           {medicine.medicineDescription}
//                         </p>
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="text-base font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                           <span className="text-xs text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                         </div>
//                         <p className="text-xs text-gray-500">
//                           Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;


// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';
// import { useNavigate } from 'react-router-dom';
// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: string;
//   medicineQuantity: string;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = 'http://localhost:8080/pharmacy/getAllMadicines';
//   const DELETE_API_URL = 'http://localhost:8080/pharmacy/deleteMadicine/';

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }
//         const data: Medicine[] = await response.json();

//         const currentDate = new Date();

//         // Sort: expired medicines first, then by expiry date ascending
//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           return new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime();
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred.');
//         console.error('Failed to fetch medicines:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   // Group medicines by category
//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   // Delete handler calls your API and updates UI on success
//   const handleDelete = async (madicineid: number) => {
//     if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

//     try {
//       const response = await fetch(`${DELETE_API_URL}${madicineid}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete medicine with id ${madicineid}. Status: ${response.status}`);
//       }

//       // On successful delete, remove medicine from state to update UI
//       setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
//       alert(`Medicine with ID ${madicineid} deleted successfully.`);
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Unknown error while deleting medicine.');
//       console.error('Delete error:', error);
//     }
//   };
// const navigate = useNavigate();
//   // Placeholder update handler
//   const handleUpdate = (madicineid: number) => {
//     navigate(`/admin/updateMedicine/${madicineid}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center sm:text-3xl">
//             Medicine Inventory
//           </h1>

//           {error && (
//             <div
//               className="mb-6 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-2 animate-fade-in"
//               role="alert"
//               aria-live="assertive"
//             >
//               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded-md mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-gray-500 text-base">No medicines found in the inventory.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine, index) => (
//                     <div
//                       key={`${medicine.madicineid}-${index}`}
//                       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-md flex flex-col"
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image';
//                           }}
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date() && (
//                           <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                             Expired
//                           </span>
//                         )}
//                         {new Date(medicine.medicineExpiryDate) >= new Date() &&
//                           new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
//                             <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                               Expiring Soon
//                             </span>
//                           )}
//                       </div>
//                       <div className="p-3 flex-1 flex flex-col justify-between">
//                         <div>
//                           <h3 className="text-base font-semibold text-gray-800 truncate">
//                             {medicine.medicineName}
//                           </h3>
//                           <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                           <p className="text-xs text-gray-600 line-clamp-2 mb-2">
//                             {medicine.medicineDescription}
//                           </p>
//                           <div className="flex justify-between items-center mb-1">
//                             <span className="text-base font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                             <span className="text-xs text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                         <div className="mt-3 flex gap-2">
//                           <button
//                             onClick={() => handleUpdate(medicine.madicineid)}
//                             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                             aria-label={`Update ${medicine.madicineid}`}
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={() => handleDelete(medicine.madicineid)}
//                             className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                             aria-label={`Delete ${medicine.medicineName}`}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;



// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';
// import { useNavigate } from 'react-router-dom';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: string;
//   medicineQuantity: string;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = 'http://localhost:8080/pharmacy/getAllMadicines';
//   const DELETE_API_URL = 'http://localhost:8080/pharmacy/deleteMadicine/';

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }
//         const data: Medicine[] = await response.json();

//         const currentDate = new Date();

//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           return new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime();
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   const handleDelete = async (madicineid: number) => {
//     if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

//     try {
//       const response = await fetch(`${DELETE_API_URL}${madicineid}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete medicine with id ${madicineid}. Status: ${response.status}`);
//       }

//       setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
//       alert(`Medicine with ID ${madicineid} deleted successfully.`);
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Unknown error while deleting medicine.');
//     }
//   };

//   const handleUpdate = (madicineid: number) => {
//     navigate(`/admin/updateMedicine/${madicineid}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center sm:text-3xl">
//             Medicine Inventory
//           </h1>

//           {error && (
//             <div className="mb-6 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700">
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-gray-500 text-base">No medicines found in the inventory.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine, index) => (
//                     <div
//                       key={`${medicine.madicineid}-${index}`}
//                       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-md flex flex-col group relative"
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image';
//                           }}
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date() && (
//                           <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                             Expired
//                           </span>
//                         )}
//                         {new Date(medicine.medicineExpiryDate) >= new Date() &&
//                           new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
//                             <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                               Expiring Soon
//                             </span>
//                           )}
//                       </div>
//                       <div className="p-3 flex-1 flex flex-col justify-between">
//                         <div>
//                           <h3 className="text-base font-semibold text-gray-800 truncate">{medicine.medicineName}</h3>
//                           <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                           <p className="text-xs text-gray-600 line-clamp-2 mb-2">{medicine.medicineDescription}</p>
//                           <div className="flex justify-between items-center mb-1">
//                             <span className="text-base font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                             <span className="text-xs text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Hover buttons */}
//                       <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <button
//                           onClick={() => handleUpdate(medicine.madicineid)}
//                           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                           aria-label={`Update ${medicine.madicineid}`}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDelete(medicine.madicineid)}
//                           className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                           aria-label={`Delete ${medicine.medicineName}`}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;



// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';
// import { useNavigate } from 'react-router-dom';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: string;
//   medicineQuantity: string;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);

//   const API_URL = 'http://localhost:8080/pharmacy/getAllMadicines';
//   const DELETE_API_URL = 'http://localhost:8080/pharmacy/deleteMadicine/';

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }
//         const data: Medicine[] = await response.json();

//         const currentDate = new Date();

//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           return new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime();
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   const handleDelete = async (madicineid: number) => {
//     if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

//     try {
//       const response = await fetch(`${DELETE_API_URL}${madicineid}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete medicine with id ${madicineid}. Status: ${response.status}`);
//       }

//       setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
//       alert(`Medicine with ID ${madicineid} deleted successfully.`);
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Unknown error while deleting medicine.');
//     }
//   };

//   const handleUpdate = (madicineid: number) => {
//     navigate(`/admin/updateMedicine/${madicineid}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center sm:text-3xl">
//             Medicine Inventory
//           </h1>

//           {error && (
//             <div className="mb-6 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700">
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-gray-500 text-base">No medicines found in the inventory.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine, index) => (
//                     <div
//                       key={`${medicine.madicineid}-${index}`}
//                       className={`bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 flex flex-col relative cursor-pointer ${
//                         selectedMedicineId === medicine.madicineid ? 'ring-2 ring-blue-500' : ''
//                       }`}
//                       onClick={() =>
//                         setSelectedMedicineId((prev) =>
//                           prev === medicine.madicineid ? null : medicine.madicineid
//                         )
//                       }
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image';
//                           }}
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date() && (
//                           <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                             Expired
//                           </span>
//                         )}
//                         {new Date(medicine.medicineExpiryDate) >= new Date() &&
//                           new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
//                             <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                               Expiring Soon
//                             </span>
//                           )}
//                       </div>
//                       <div className="p-3 flex-1 flex flex-col justify-between">
//                         <div>
//                           <h3 className="text-base font-semibold text-gray-800 truncate">{medicine.medicineName}</h3>
//                           <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                           <p className="text-xs text-gray-600 line-clamp-2 mb-2">{medicine.medicineDescription}</p>
//                           <div className="flex justify-between items-center mb-1">
//                             <span className="text-base font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                             <span className="text-xs text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>

//                       {selectedMedicineId === medicine.madicineid && (
//                         <div className="absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleUpdate(medicine.madicineid);
//                             }}
//                             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                             aria-label={`Update ${medicine.madicineid}`}
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(medicine.madicineid);
//                             }}
//                             className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                             aria-label={`Delete ${medicine.medicineName}`}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;




// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';
// import { useNavigate } from 'react-router-dom';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: string;
//   medicineQuantity: string;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);
//   const [notification, setNotification] = useState<string | null>(null); // Added for alerts
//   const [alertCount, setAlertCount] = useState<number>(0); // Added to track alert occurrences

//   const API_URL = 'http://localhost:8080/pharmacy/dashboard';
//   const DELETE_API_URL = 'http://localhost:8080/pharmacy/deleteMadicine/';

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }
//         const data: Medicine[] = await response.json();

//         const currentDate = new Date();

//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           return new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime();
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchMedicines();
//   }, []);

//   // Added: Alert every 15 minutes for medicines expiring today, up to 5 times
//   useEffect(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Normalize to start of day
//     const expiringToday = medicines.filter((medicine) => {
//       const expiryDate = new Date(medicine.medicineExpiryDate);
//       expiryDate.setHours(0, 0, 0, 0);
//       return expiryDate.getTime() === today.getTime();
//     });

//     if (expiringToday.length > 0 && alertCount < 5) {
//       const medicineNames = expiringToday.map((m) => m.medicineName).join(', ');
//       const alertMessage = `Alert: The following medicines expire today: ${medicineNames}`;

//       // Initial alert
//       setNotification(alertMessage);
//       setTimeout(() => setNotification(null), 5000); // Clear after 5 seconds
//       setAlertCount((prev) => prev + 1);

//       // Set up 15-minute interval
//       const intervalId = setInterval(() => {
//         setAlertCount((prev) => {
//           if (prev < 5) {
//             setNotification(alertMessage);
//             setTimeout(() => setNotification(null), 5000);
//             return prev + 1;
//           }
//           clearInterval(intervalId); // Stop after 5 alerts
//           return prev;
//         });
//       }, 15 * 60 * 1000); // Every 15 minutes

//       // Clean up interval on unmount
//       return () => clearInterval(intervalId);
//     }
//   }, [medicines, alertCount]);

//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   const handleDelete = async (madicineid: number) => {
//     if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

//     try {
//       const response = await fetch(`${DELETE_API_URL}${madicineid}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to delete medicine with id ${madicineid}. Status: ${response.status}`);
//       }

//       setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
//       alert(`Medicine with ID ${madicineid} deleted successfully.`);
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Unknown error while deleting medicine.');
//     }
//   };

//   const handleUpdate = (madicineid: number) => {
//     navigate(`/admin/updateMedicine/${madicineid}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold tracking-tight text-gray-800 mb-8 text-center sm:text-3xl">
//             Medicine Inventory
//           </h1>

//           {error && (
//             <div className="mb-6 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700">
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           {notification && (
//             <div className="mb-6 p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700">
//               <span className="text-sm">{notification}</span>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//               <p className="text-gray-500 text-base">No medicines found in the inventory.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
//                   {category}
//                 </h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine, index) => (
//                     <div
//                       key={`${medicine.madicineid}-${index}`}
//                       className={`bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 flex flex-col relative cursor-pointer ${
//                         selectedMedicineId === medicine.madicineid ? 'ring-2 ring-blue-500' : ''
//                       }`}
//                       onClick={() =>
//                         setSelectedMedicineId((prev) =>
//                           prev === medicine.madicineid ? null : medicine.madicineid
//                         )
//                       }
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) => {
//                             e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image';
//                           }}
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date() && (
//                           <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                             Expired
//                           </span>
//                         )}
//                         {new Date(medicine.medicineExpiryDate) >= new Date() &&
//                           new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
//                             <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
//                               Expiring Soon
//                             </span>
//                           )}
//                       </div>
//                       <div className="p-3 flex-1 flex flex-col justify-between">
//                         <div>
//                           <h3 className="text-base font-semibold text-gray-800 truncate">{medicine.medicineName}</h3>
//                           <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                           <p className="text-xs text-gray-600 line-clamp-2 mb-2">{medicine.medicineDescription}</p>
//                           <div className="flex justify-between items-center mb-1">
//                             <span className="text-base font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                             <span className="text-xs text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                           </div>
//                           <p className="text-xs text-gray-500">
//                             Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>

//                       {selectedMedicineId === medicine.madicineid && (
//                         <div className="absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleUpdate(medicine.madicineid);
//                             }}
//                             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                             aria-label={`Update ${medicine.madicineid}`}
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(medicine.madicineid);
//                             }}
//                             className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1 rounded-md transition"
//                             aria-label={`Delete ${medicine.medicineName}`}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;
// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';
// import { useNavigate } from 'react-router-dom';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number;
//   medicineQuantity: number;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);
//   const [notification, setNotification] = useState<string | null>(null);
//   const [alertCount, setAlertCount] = useState<number>(0);

//   const API_URL = 'http://localhost:8080/pharmacy/dashboard';
//   const DELETE_API_URL = 'http://localhost:8080/pharmacy/deleteMadicine/';

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }

//         const result = await response.json();
//         const data: Medicine[] = result.allMedicines;

//         const currentDate = new Date();
//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           return new Date(a.medicineExpiryDate).getTime() - new Date(b.medicineExpiryDate).getTime();
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMedicines();
//   }, []);

//   // Alert system for expiring today
//   useEffect(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const expiringToday = medicines.filter((medicine) => {
//       const expiryDate = new Date(medicine.medicineExpiryDate);
//       expiryDate.setHours(0, 0, 0, 0);
//       return expiryDate.getTime() === today.getTime();
//     });

//     if (expiringToday.length > 0 && alertCount < 5) {
//       const names = expiringToday.map((m) => m.medicineName).join(', ');
//       const alertMessage = `Alert: The following medicines expire today: ${names}`;

//       setNotification(alertMessage);
//       setTimeout(() => setNotification(null), 5000);
//       setAlertCount((prev) => prev + 1);

//       const intervalId = setInterval(() => {
//         setAlertCount((prev) => {
//           if (prev < 5) {
//             setNotification(alertMessage);
//             setTimeout(() => setNotification(null), 5000);
//             return prev + 1;
//           }
//           clearInterval(intervalId);
//           return prev;
//         });
//       }, 15 * 60 * 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [medicines, alertCount]);

//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   const handleDelete = async (madicineid: number) => {
//     if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

//     try {
//       const response = await fetch(`${DELETE_API_URL}${madicineid}`, { method: 'DELETE' });
//       if (!response.ok) {
//         throw new Error(`Failed to delete medicine with id ${madicineid}.`);
//       }

//       setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
//       alert(`Medicine with ID ${madicineid} deleted successfully.`);
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Unknown error while deleting.');
//     }
//   };

//   const handleUpdate = (madicineid: number) => {
//     navigate(`/admin/updateMedicine/${madicineid}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       <Sidebar />
//       <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Medicine Inventory</h1>

//           {error && (
//             <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           {notification && (
//             <div className="mb-6 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
//               {notification}
//             </div>
//           )}

//           {isLoading ? (
//             <div className="grid grid-cols-4 gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded shadow-sm p-3 animate-pulse">
//                   <div className="h-32 bg-gray-200 rounded mb-3"></div>
//                   <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               ))}
//             </div>
//           ) : medicines.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded shadow">
//               <p className="text-gray-500">No medicines found.</p>
//             </div>
//           ) : (
//             Object.keys(groupedMedicines).map((category) => (
//               <div key={category} className="mb-12">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">{category}</h2>
//                 <div className="grid grid-cols-4 gap-6">
//                   {groupedMedicines[category].map((medicine) => (
//                     <div
//                       key={medicine.madicineid}
//                       className={`bg-white rounded-lg shadow relative cursor-pointer transition-transform duration-300 ${
//                         selectedMedicineId === medicine.madicineid ? 'ring-2 ring-blue-500' : ''
//                       }`}
//                       onClick={() =>
//                         setSelectedMedicineId((prev) =>
//                           prev === medicine.madicineid ? null : medicine.madicineid
//                         )
//                       }
//                     >
//                       <div className="relative h-32">
//                         <img
//                           src={medicine.medicineImage}
//                           alt={medicine.medicineName}
//                           className="w-full h-full object-cover rounded-t-lg"
//                           onError={(e) =>
//                             (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
//                           }
//                         />
//                         {new Date(medicine.medicineExpiryDate) < new Date() ? (
//                           <span className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
//                             Expired
//                           </span>
//                         ) : new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
//                           <span className="absolute top-1 right-1 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">
//                             Expiring Soon
//                           </span>
//                         ) : null}
//                       </div>
//                       <div className="p-3">
//                         <h3 className="text-sm font-semibold text-gray-800">{medicine.medicineName}</h3>
//                         <p className="text-xs text-gray-500 mb-1">{medicine.medicineType}</p>
//                         <p className="text-xs text-gray-600 line-clamp-2 mb-2">{medicine.medicineDescription}</p>
//                         <div className="flex justify-between items-center text-sm mb-1">
//                           <span className="font-bold text-blue-600">₹{medicine.medicinePrice}</span>
//                           <span className="text-gray-500">Qty: {medicine.medicineQuantity}</span>
//                         </div>
//                         <p className="text-xs text-gray-500">
//                           Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                         </p>
//                       </div>

//                       {selectedMedicineId === medicine.madicineid && (
//                         <div className="absolute bottom-3 left-3 right-3 flex gap-2">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleUpdate(medicine.madicineid);
//                             }}
//                             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 rounded"
//                           >
//                             Update
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(medicine.madicineid);
//                             }}
//                             className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;


// import React, { useState, useEffect } from 'react';
// import Sidebar from '@/admin/sidebar';
// import { useNavigate } from 'react-router-dom';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number;
//   medicineQuantity: number;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineList: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);
//   const [notification, setNotification] = useState<string | null>(null);
//   const [alertCount, setAlertCount] = useState<number>(0);
//   const [sortOrder, setSortOrder] = useState<string>('low to high');

//   const API_URL = 'http://localhost:8080/pharmacy/dashboard';
//   const DELETE_API_URL = 'http://localhost:8080/pharmacy/deleteMadicine/';

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
//         }

//         const result = await response.json();
//         const data: Medicine[] = result.allMedicines;

//         const currentDate = new Date();
//         const sortedMedicines = data.sort((a, b) => {
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           const aExpiringSoon = new Date(a.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//           const bExpiringSoon = new Date(b.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

//           if (aExpiringSoon && !bExpiringSoon) return -1;
//           if (!aExpiringSoon && bExpiringSoon) return 1;

//           return sortOrder === 'low to high'
//             ? a.medicinePrice - b.medicinePrice
//             : b.medicinePrice - a.medicinePrice;
//         });

//         setMedicines(sortedMedicines);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMedicines();
//   }, [sortOrder]);

//   useEffect(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const expiringToday = medicines.filter((medicine) => {
//       const expiryDate = new Date(medicine.medicineExpiryDate);
//       expiryDate.setHours(0, 0, 0, 0);
//       return expiryDate.getTime() === today.getTime();
//     });

//     if (expiringToday.length > 0 && alertCount < 5) {
//       const names = expiringToday.map((m) => m.medicineName).join(', ');
//       const alertMessage = `Alert: The following medicines expire today: ${names}`;

//       setNotification(alertMessage);
//       setTimeout(() => setNotification(null), 5000);
//       setAlertCount((prev) => prev + 1);

//       const intervalId = setInterval(() => {
//         setAlertCount((prev) => {
//           if (prev < 5) {
//             setNotification(alertMessage);
//             setTimeout(() => setNotification(null), 5000);
//             return prev + 1;
//           }
//           clearInterval(intervalId);
//           return prev;
//         });
//       }, 15 * 60 * 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [medicines, alertCount]);

//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   const handleDelete = async (madicineid: number) => {
//     if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

//     try {
//       const response = await fetch(`${DELETE_API_URL}${madicineid}`, { method: 'DELETE' });
//       if (!response.ok) {
//         throw new Error(`Failed to delete medicine with id ${madicineid}.`);
//       }

//       setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
//       alert(`Medicine with ID ${madicineid} deleted successfully.`);
//     } catch (error) {
//       alert(error instanceof Error ? error.message : 'Unknown error while deleting.');
//     }
//   };

//   const handleUpdate = (madicineid: number) => {
//     navigate(`/admin/updateMedicine/${madicineid}`);
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOrder(e.target.value);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Top Navigation Bar */}
//       <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
//         <div className="flex items-center">
//           <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
//         </div>
//         <div className="flex space-x-6">
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Categories</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Orders</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Prescriptions</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">FAQ</a>
//         </div>
//         <div className="flex items-center space-x-4">
//           <span className="text-gray-600 text-sm">Herbal</span>
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600 text-sm">🛒 12</span>
//           </div>
//         </div>
//       </nav>

//       <div className="flex flex-1">
//         <Sidebar />
//         <div className="flex-1 py-6 px-6 sm:px-8 lg:px-12 ml-64 flex">
//           {/* Main Content Area */}
//           <div className="flex-1">
//             {/* Search and Sort Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Product search for "Herbal"</h2>
//                 <p className="text-sm text-gray-600">Found {medicines.length} products</p>
//               </div>
              
//             </div>
//             {error && (
//               <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded">
//                 {error}
//               </div>
//             )}

//             {notification && (
//               <div className="mb-6 p-3 bg-yellow-50 text-yellow-700 text-sm rounded">
//                 {notification}
//               </div>
//             )}

//             {isLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {[...Array(8)].map((_, index) => (
//                   <div key={index} className="bg-transparent p-2 animate-pulse">
//                     <div className="h-32 bg-gray-200 rounded mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
//                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : medicines.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded">
//                 <p className="text-gray-500 text-sm">No medicines found.</p>
//               </div>
//             ) : (
//               Object.keys(groupedMedicines).map((category) => (
//                 <div key={category} className="mb-8">
//                   <h3 className="text-md font-semibold text-gray-800 mb-4">{category}</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {groupedMedicines[category].map((medicine) => (
//                       <div
//                         key={medicine.madicineid}
//                         className={`bg-transparent relative cursor-pointer border border-gray-200 ${
//                           selectedMedicineId === medicine.madicineid ? 'border-blue-500' : ''
//                         }`}
//                         onClick={() =>
//                           setSelectedMedicineId((prev) =>
//                             prev === medicine.madicineid ? null : medicine.madicineid
//                           )
//                         }
//                       >
//                         <div className="relative h-32">
//                           <img
//                             src={medicine.medicineImage}
//                             alt={medicine.medicineName}
//                             className="w-full h-full object-contain"
//                             onError={(e) =>
//                               (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
//                             }
//                           />
//                           {new Date(medicine.medicineExpiryDate) < new Date() ? (
//                             <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
//                               Expired
//                             </span>
//                           ) : new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
//                             <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded">
//                               Expiring Soon
//                             </span>
//                           ) : null}
//                         </div>
//                         <div className="p-2 text-green-700">
//                           <h4 className="text-sm font-semibold">{medicine.medicineName}</h4>
//                           <p className="text-xs line-clamp-2 mb-1">{medicine.medicineDescription}</p>
//                           <div className="flex justify-between items-center text-sm mb-1">
//                             <span className="font-bold">₹{medicine.medicinePrice}</span>
//                             <span className="text-xs">Qty: {medicine.medicineQuantity}</span>
//                           </div>
//                           <p className="text-xs">
//                             Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                           </p>
//                         </div>

//                         {selectedMedicineId === medicine.madicineid && (
//                           <div className="p-2 flex gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleUpdate(medicine.madicineid);
//                               }}
//                               className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1"
//                             >
//                               Update
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDelete(medicine.madicineid);
//                               }}
//                               className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineList;

import React, { useState, useEffect } from 'react';
import Sidebar from '@/admin/sidebar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

interface Medicine {
  madicineid: number;
  medicineName: string;
  medicinePrice: number;
  medicineQuantity: number;
  medicineExpiryDate: string;
  medicineImage: string;
  medicineCategory: string;
}

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [alertCount, setAlertCount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const API_URL = `${BASE_URL}/pharmacy/dashboard`;
  const DELETE_API_URL = `${BASE_URL}/pharmacy/deleteMadicine/`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
        }

        
        const result = await response.json();
        const data: Medicine[] = result.allMedicines;
        console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(result,"resultaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        // Sort medicines by expiry status (expired first, then expiring soon)
        const currentDate = new Date();
        const sortedMedicines = data.sort((a, b) => {
          const aExpired = new Date(a.medicineExpiryDate) < currentDate;
          const bExpired = new Date(b.medicineExpiryDate) < currentDate;

          if (aExpired && !bExpired) return -1;
          if (!aExpired && bExpired) return 1;

          const aExpiringSoon = new Date(a.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          const bExpiringSoon = new Date(b.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          if (aExpiringSoon && !bExpiringSoon) return -1;
          if (!aExpiringSoon && bExpiringSoon) return 1;

          return 0; // No price sorting
        });

        setMedicines(sortedMedicines);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiringToday = medicines.filter((medicine) => {
      const expiryDate = new Date(medicine.medicineExpiryDate);
      expiryDate.setHours(0, 0, 0, 0);
      return expiryDate.getTime() === today.getTime();
    });

    if (expiringToday.length > 0 && alertCount < 5) {
      const names = expiringToday.map((m) => m.medicineName).join(', ');
      const alertMessage = `Alert: The following medicines expire today: ${names}`;

      setNotification(alertMessage);
      setTimeout(() => setNotification(null), 5000);
      setAlertCount((prev) => prev + 1);

      const intervalId = setInterval(() => {
        setAlertCount((prev) => {
          if (prev < 5) {
            setNotification(alertMessage);
            setTimeout(() => setNotification(null), 5000);
            return prev + 1;
          }
          clearInterval(intervalId);
          return prev;
        });
      }, 15 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [medicines, alertCount]);

  // Get unique categories
  const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory || 'Other')));

  // Filter medicines by selected category
  const filteredMedicines = selectedCategory
    ? medicines.filter((medicine) => (medicine.medicineCategory || 'Other') === selectedCategory)
    : medicines;

  const handleDelete = async (madicineid: number) => {
    if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

    try {
      const response = await fetch(`${DELETE_API_URL}${madicineid}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete medicine with id ${madicineid}.`);
      }

      setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
      alert(`Medicine with ID ${madicineid} deleted successfully.`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unknown error while deleting.');
    }
  };

  const handleUpdate = (madicineid: number) => {
    navigate(`/admin/updateMedicine/${madicineid}`);
    console.log(madicineid,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Categories</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Orders</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Prescriptions</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">FAQ</a>
        </div>
        
      </nav>

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 py-6 px-6 sm:px-8 lg:px-12 ml-64 flex">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Category Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Product search for "Herbal"
                </h2>
                <p className="text-sm text-gray-600">
                  Found {filteredMedicines.length} products
                  {selectedCategory ? ` in "${selectedCategory}"` : ''}
                </p>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  Clear Filter
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {notification && (
              <div className="mb-6 p-3 bg-yellow-50 text-yellow-700 text-sm rounded">
                {notification}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-transparent p-2 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredMedicines.length === 0 ? (
              <div className="text-center py-12 bg-white rounded">
                <p className="text-gray-500 text-sm">No medicines found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMedicines.map((medicine) => (
                  <div
                    key={medicine.madicineid}
                    className={`bg-transparent relative cursor-pointer border border-gray-200 ${
                      selectedMedicineId === medicine.madicineid ? 'border-blue-500' : ''
                    }`}
                    onClick={() =>
                      setSelectedMedicineId((prev) =>
                        prev === medicine.madicineid ? null : medicine.madicineid
                      )
                    }
                  >
                    <div className="relative h-32">
                      <img
                        src={medicine.medicineImage}
                        alt={medicine.medicineName}
                        className="w-full h-full object-contain"
                        onError={(e) =>
                          (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
                        }
                      />
                      {new Date(medicine.medicineExpiryDate) < new Date() ? (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                          Expired
                        </span>
                      ) : new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
                        <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded">
                          Expiring Soon
                        </span>
                      ) : null}
                    </div>
                    <div className="p-2 text-green-700">
                      <h4 className="text-sm font-semibold">{medicine.medicineName}</h4>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-bold">₹{medicine.medicinePrice}</span>
                        <span className="text-xs">Qty: {medicine.medicineQuantity}</span>
                      </div>
                      <p className="text-xs">
                        Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs">Category: {medicine.medicineCategory || 'Other'}</p>
                    </div>

                    {selectedMedicineId === medicine.madicineid && (
                      <div className="p-2 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdate(medicine.madicineid);
                          }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(medicine.madicineid);
                          }}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;