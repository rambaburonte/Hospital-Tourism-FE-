// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// // Define Medicine interface with corrected types
// interface Medicine {
//   medicineId: number | null; // Added for completeness
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number; // Changed to number
//   medicineQuantity: number; // Changed to number
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const UpdateMedicine: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [medicine, setMedicine] = useState<Medicine>({
//     medicineId: null,
//     medicineName: '',
//     medicineType: '',
//     medicineDescription: '',
//     medicinePrice: 0,
//     medicineQuantity: 0,
//     medicineExpiryDate: '',
//     medicineManufacturer: '',
//     medicineImage: '',
//     medicineCategory: '',
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [formErrors, setFormErrors] = useState<Partial<Record<keyof Medicine, string>>>({});

//   const API_BASE = 'http://localhost:8080/pharmacy';

//   useEffect(() => {
//     const fetchMedicine = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`${API_BASE}/getMadicineById/${id}`); // Fixed typo
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicine.`);
//         }
//         const data: Medicine = await response.json();
//         // Parse string fields to numbers if necessary
//         setMedicine({
//           ...data,
//           medicinePrice: parseFloat(data.medicinePrice as unknown as string) || 0,
//           medicineQuantity: parseInt(data.medicineQuantity as unknown as string, 10) || 0,
//           // Ensure date is in YYYY-MM-DD format for input
//           medicineExpiryDate: data.medicineExpiryDate ? new Date(data.medicineExpiryDate).toISOString().split('T')[0] : '',
//         });
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'An unknown error occurred.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (id) fetchMedicine();
//   }, [id]);

//   const validateForm = (): boolean => {
//     const errors: Partial<Record<keyof Medicine, string>> = {};
//     if (!medicine.medicineName.trim()) errors.medicineName = 'Name is required';
//     if (!medicine.medicineType.trim()) errors.medicineType = 'Type is required';
//     if (!medicine.medicineDescription.trim()) errors.medicineDescription = 'Description is required';
//     if (medicine.medicinePrice <= 0) errors.medicinePrice = 'Price must be greater than 0';
//     if (medicine.medicineQuantity < 0) errors.medicineQuantity = 'Quantity cannot be negative';
//     if (!medicine.medicineExpiryDate) errors.medicineExpiryDate = 'Expiry date is required';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setMedicine((prev) => ({
//       ...prev,
//       [name]: name === 'medicinePrice' || name === 'medicineQuantity' ? parseFloat(value) || 0 : value,
//     }));
//     // Clear error for this field
//     setFormErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const response = await fetch(`${API_BASE}/updateMadicine/${id}`, { // Fixed typo
//         method: 'PUT', // Changed to PUT for updates (more RESTful)
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...medicine,
//           medicinePrice: medicine.medicinePrice.toString(), // Convert back to string if backend expects string
//           medicineQuantity: medicine.medicineQuantity.toString(),
//         }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Medicine updated successfully!');
//         setTimeout(() => navigate('/admin/medicine-list'), 2000);
//       } else {
//         throw new Error('Failed to update medicine.');
//       }
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to update medicine.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/admin/medicine-list');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Update Medicine</h2>

//         {isLoading && (
//           <div className="flex justify-center mb-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-400 text-center">
//             {error}
//           </div>
//         )}

//         {successMessage && (
//           <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-400 text-center">
//             {successMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">
//                 Medicine Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineName"
//                 name="medicineName"
//                 type="text"
//                 value={medicine.medicineName}
//                 onChange={handleChange}
//                 placeholder="Enter medicine name"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 aria-invalid={!!formErrors.medicineName}
//                 aria-describedby="medicineName-error"
//               />
//               {formErrors.medicineName && (
//                 <p id="medicineName-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineName}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="medicineType" className="block text-sm font-medium text-gray-700">
//                 Medicine Type <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineType"
//                 name="medicineType"
//                 type="text"
//                 value={medicine.medicineType}
//                 onChange={handleChange}
//                 placeholder="Enter medicine type"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 aria-invalid={!!formErrors.medicineType}
//                 aria-describedby="medicineType-error"
//               />
//               {formErrors.medicineType && (
//                 <p id="medicineType-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineType}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineDescription" className="block text-sm font-medium text-gray-700">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="medicineDescription"
//               name="medicineDescription"
//               value={medicine.medicineDescription}
//               onChange={handleChange}
//               placeholder="Enter medicine description"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               rows={4}
//               required
//               aria-invalid={!!formErrors.medicineDescription}
//               aria-describedby="medicineDescription-error"
//             />
//             {formErrors.medicineDescription && (
//               <p id="medicineDescription-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineDescription}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicinePrice" className="block text-sm font-medium text-gray-700">
//                 Price (₹) <span className="text-red-500">*</span>
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
//                 <input
//                   id="medicinePrice"
//                   name="medicinePrice"
//                   type="number"
//                   step="0.01"
//                   value={medicine.medicinePrice}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                   required
//                   aria-invalid={!!formErrors.medicinePrice}
//                   aria-describedby="medicinePrice-error"
//                 />
//               </div>
//               {formErrors.medicinePrice && (
//                 <p id="medicinePrice-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicinePrice}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="medicineQuantity" className="block text-sm font-medium text-gray-700">
//                 Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineQuantity"
//                 name="medicineQuantity"
//                 type="number"
//                 value={medicine.medicineQuantity}
//                 onChange={handleChange}
//                 placeholder="Enter quantity"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 min="0"
//                 aria-invalid={!!formErrors.medicineQuantity}
//                 aria-describedby="medicineQuantity-error"
//               />
//               {formErrors.medicineQuantity && (
//                 <p id="medicineQuantity-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineQuantity}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineExpiryDate" className="block text-sm font-medium text-gray-700">
//               Expiry Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="medicineExpiryDate"
//               name="medicineExpiryDate"
//               type="date"
//               value={medicine.medicineExpiryDate}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               required
//               aria-invalid={!!formErrors.medicineExpiryDate}
//               aria-describedby="medicineExpiryDate-error"
//             />
//             {formErrors.medicineExpiryDate && (
//               <p id="medicineExpiryDate-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineExpiryDate}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicineManufacturer" className="block text-sm font-medium text-gray-700">
//                 Manufacturer
//               </label>
//               <input
//                 id="medicineManufacturer"
//                 name="medicineManufacturer"
//                 type="text"
//                 value={medicine.medicineManufacturer}
//                 onChange={handleChange}
//                 placeholder="Enter manufacturer"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>

//             <div>
//               <label htmlFor="medicineCategory" className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <input
//                 id="medicineCategory"
//                 name="medicineCategory"
//                 type="text"
//                 value={medicine.medicineCategory}
//                 onChange={handleChange}
//                 placeholder="Enter category"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineImage" className="block text-sm font-medium text-gray-700">
//               Image URL
//             </label>
//             <input
//               id="medicineImage"
//               name="medicineImage"
//               type="url"
//               value={medicine.medicineImage}
//               onChange={handleChange}
//               placeholder="Enter image URL"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//             />
//           </div>

//           <div className="flex justify-between gap-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-semibold transition"
//               aria-label="Cancel and return to medicine list"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition ${
//                 isLoading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               aria-label="Update medicine"
//             >
//               {isLoading ? 'Updating...' : 'Update Medicine'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateMedicine;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// // Define Medicine interface with corrected types
// interface Medicine {
//   medicineid: number | null;
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

// const UpdateMedicine: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [medicine, setMedicine] = useState<Medicine>({
//     medicineid: null,
//     medicineName: '',
//     medicineType: '',
//     medicineDescription: '',
//     medicinePrice: 0,
//     medicineQuantity: 0,
//     medicineExpiryDate: '',
//     medicineManufacturer: '',
//     medicineImage: '',
//     medicineCategory: '',
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [formErrors, setFormErrors] = useState<Partial<Record<keyof Medicine, string>>>({});

//   const API_BASE = 'http://localhost:8080/pharmacy';

//   useEffect(() => {
//     const fetchMedicine = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`${API_BASE}/getMadicineById/${id}`); // Fixed typo
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicine.`);
//         }
//         const data: Medicine = await response.json();
//         setMedicine({
//           ...data,
//           medicinePrice: typeof data.medicinePrice === 'string' ? parseFloat(data.medicinePrice) || 0 : data.medicinePrice,
//           medicineQuantity: typeof data.medicineQuantity === 'string' ? parseInt(data.medicineQuantity, 10) || 0 : data.medicineQuantity,
//           medicineExpiryDate: data.medicineExpiryDate ? new Date(data.medicineExpiryDate).toISOString().split('T')[0] : '',
//         });
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'Network error or server is unreachable.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (id) fetchMedicine();
//   }, [id]);

//   const validateForm = (): boolean => {
//     const errors: Partial<Record<keyof Medicine, string>> = {};
//     if (!medicine.medicineName.trim()) errors.medicineName = 'Name is required';
//     if (!medicine.medicineType.trim()) errors.medicineType = 'Type is required';
//     if (!medicine.medicineDescription.trim()) errors.medicineDescription = 'Description is required';
//     if (medicine.medicinePrice <= 0) errors.medicinePrice = 'Price must be greater than 0';
//     if (medicine.medicineQuantity < 0) errors.medicineQuantity = 'Quantity cannot be negative';
//     if (!medicine.medicineExpiryDate) {
//       errors.medicineExpiryDate = 'Expiry date is required';
//     } else {
//       const expiryDate = new Date(medicine.medicineExpiryDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (expiryDate <= today) {
//         errors.medicineExpiryDate = 'Expiry date must be in the future';
//       }
//     }
//     if (medicine.medicineImage && !/\.(jpg|jpeg|png|gif)$/i.test(medicine.medicineImage)) {
//       errors.medicineImage = 'Please provide a valid image URL (jpg, jpeg, png, or gif)';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setMedicine((prev) => ({
//       ...prev,
//       [name]: name === 'medicinePrice' || name === 'medicineQuantity' ? parseFloat(value) || 0 : value,
//     }));
//     setFormErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const response = await fetch(`${API_BASE}/updateMedicine/${id}`, { // Fixed typo
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...medicine,
//           medicinePrice: medicine.medicinePrice.toString(),
//           medicineQuantity: medicine.medicineQuantity.toString(),
//         }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Medicine updated successfully!');
//         setTimeout(() => navigate('/admin/medicine-list'), 2000);
//       } else {
//         throw new Error('Failed to update medicine.');
//       }
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Network error or server is unreachable.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/admin/medicine-list');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Update Medicine</h2>

//         {isLoading && (
//           <div className="flex justify-center mb-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-400 text-center">
//             {error}
//           </div>
//         )}

//         {successMessage && (
//           <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-400 text-center">
//             {successMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">
//                 Medicine Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineName"
//                 name="medicineName"
//                 type="text"
//                 value={medicine.medicineName}
//                 onChange={handleChange}
//                 placeholder="Enter medicine name"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 aria-required="true"
//                 aria-invalid={!!formErrors.medicineName}
//                 aria-describedby="medicineName-error"
//               />
//               {formErrors.medicineName && (
//                 <p id="medicineName-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineName}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="medicineType" className="block text-sm font-medium text-gray-700">
//                 Medicine Type <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineType"
//                 name="medicineType"
//                 type="text"
//                 value={medicine.medicineType}
//                 onChange={handleChange}
//                 placeholder="Enter medicine type"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 aria-required="true"
//                 aria-invalid={!!formErrors.medicineType}
//                 aria-describedby="medicineType-error"
//               />
//               {formErrors.medicineType && (
//                 <p id="medicineType-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineType}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineDescription" className="block text-sm font-medium text-gray-700">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="medicineDescription"
//               name="medicineDescription"
//               value={medicine.medicineDescription}
//               onChange={handleChange}
//               placeholder="Enter medicine description"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               rows={4}
//               required
//               aria-required="true"
//               aria-invalid={!!formErrors.medicineDescription}
//               aria-describedby="medicineDescription-error"
//             />
//             {formErrors.medicineDescription && (
//               <p id="medicineDescription-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineDescription}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicinePrice" className="block text-sm font-medium text-gray-700">
//                 Price (₹) <span className="text-red-500">*</span>
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
//                 <input
//                   id="medicinePrice"
//                   name="medicinePrice"
//                   type="number"
//                   step="0.01"
//                   value={medicine.medicinePrice}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                   required
//                   aria-required="true"
//                   aria-invalid={!!formErrors.medicinePrice}
//                   aria-describedby="medicinePrice-error"
//                 />
//               </div>
//               {formErrors.medicinePrice && (
//                 <p id="medicinePrice-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicinePrice}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="medicineQuantity" className="block text-sm font-medium text-gray-700">
//                 Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineQuantity"
//                 name="medicineQuantity"
//                 type="number"
//                 value={medicine.medicineQuantity}
//                 onChange={handleChange}
//                 placeholder="Enter quantity"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 min="0"
//                 aria-required="true"
//                 aria-invalid={!!formErrors.medicineQuantity}
//                 aria-describedby="medicineQuantity-error"
//               />
//               {formErrors.medicineQuantity && (
//                 <p id="medicineQuantity-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineQuantity}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineExpiryDate" className="block text-sm font-medium text-gray-700">
//               Expiry Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="medicineExpiryDate"
//               name="medicineExpiryDate"
//               type="date"
//               value={medicine.medicineExpiryDate}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               required
//               aria-required="true"
//               aria-invalid={!!formErrors.medicineExpiryDate}
//               aria-describedby="medicineExpiryDate-error"
//             />
//             {formErrors.medicineExpiryDate && (
//               <p id="medicineExpiryDate-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineExpiryDate}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicineManufacturer" className="block text-sm font-medium text-gray-700">
//                 Manufacturer
//               </label>
//               <input
//                 id="medicineManufacturer"
//                 name="medicineManufacturer"
//                 type="text"
//                 value={medicine.medicineManufacturer}
//                 onChange={handleChange}
//                 placeholder="Enter manufacturer"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>

//             <div>
//               <label htmlFor="medicineCategory" className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <input
//                 id="medicineCategory"
//                 name="medicineCategory"
//                 type="text"
//                 value={medicine.medicineCategory}
//                 onChange={handleChange}
//                 placeholder="Enter category"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineImage" className="block text-sm font-medium text-gray-700">
//               Image URL
//             </label>
//             <input
//               id="medicineImage"
//               name="medicineImage"
//               type="url"
//               value={medicine.medicineImage}
//               onChange={handleChange}
//               placeholder="Enter image URL"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               aria-invalid={!!formErrors.medicineImage}
//               aria-describedby="medicineImage-error"
//             />
//             {formErrors.medicineImage && (
//               <p id="medicineImage-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineImage}
//               </p>
//             )}
//             {medicine.medicineImage && (
//               <div className="mt-2">
//                 <img
//                   src={medicine.medicineImage}
//                   alt="Medicine preview"
//                   className="h-20 w-20 object-cover rounded"
//                   onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/80')} // Fallback image
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between gap-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-semibold transition"
//               aria-label="Cancel and return to medicine list"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition ${
//                 isLoading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               aria-label="Update medicine"
//             >
//               {isLoading ? 'Updating...' : 'Update Medicine'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateMedicine;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// // Define Medicine interface with corrected types
// interface Medicine {
//   medicineid: number | null;
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

// const UpdateMedicine: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [medicine, setMedicine] = useState<Medicine>({
//     medicineid: null,
//     medicineName: '',
//     medicineType: '',
//     medicineDescription: '',
//     medicinePrice: 0,
//     medicineQuantity: 0,
//     medicineExpiryDate: '',
//     medicineManufacturer: '',
//     medicineImage: '',
//     medicineCategory: '',
//   });
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [formErrors, setFormErrors] = useState<Partial<Record<keyof Medicine, string>>>({});

//   const API_BASE = 'http://localhost:8080/pharmacy';

//   useEffect(() => {
//     const fetchMedicine = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`${API_BASE}/getMadicineById/${id}`); // Fixed typo
//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: Failed to fetch medicine.`);
//         }
//         const data: Medicine = await response.json();
//         setMedicine({
//           ...data,
//           medicinePrice: typeof data.medicinePrice === 'string' ? parseFloat(data.medicinePrice) || 0 : data.medicinePrice,
//           medicineQuantity: typeof data.medicineQuantity === 'string' ? parseInt(data.medicineQuantity, 10) || 0 : data.medicineQuantity,
//           medicineExpiryDate: data.medicineExpiryDate ? new Date(data.medicineExpiryDate).toISOString().split('T')[0] : '',
//         });
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'Network error or server is unreachable.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (id) fetchMedicine();
//   }, [id]);

//   // Hourly alert for medicine expiring today
//   useEffect(() => {
//     if (medicine.medicineExpiryDate) {
//       const expiryDate = new Date(medicine.medicineExpiryDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Normalize to start of day
//       expiryDate.setHours(0, 0, 0, 0);

//       if (expiryDate.getTime() === today.getTime()) {
//         const alertMessage = `Alert: ${medicine.medicineName} expires today!`;
//         setSuccessMessage(alertMessage); // Reuse successMessage to avoid new state
//         setTimeout(() => setSuccessMessage(null), 5000); // Clear after 5 seconds

//         const intervalId = setInterval(() => {
//           setSuccessMessage(alertMessage);
//           setTimeout(() => setSuccessMessage(null), 5000);
//         }, 3600 * 1000); // Every hour

//         // Clean up interval on unmount
//         return () => clearInterval(intervalId);
//       }
//     }
//   }, [medicine.medicineExpiryDate, medicine.medicineName]);

//   const validateForm = (): boolean => {
//     const errors: Partial<Record<keyof Medicine, string>> = {};
//     if (!medicine.medicineName.trim()) errors.medicineName = 'Name is required';
//     if (!medicine.medicineType.trim()) errors.medicineType = 'Type is required';
//     if (!medicine.medicineDescription.trim()) errors.medicineDescription = 'Description is required';
//     if (medicine.medicinePrice <= 0) errors.medicinePrice = 'Price must be greater than 0';
//     if (medicine.medicineQuantity < 0) errors.medicineQuantity = 'Quantity cannot be negative';
//     if (!medicine.medicineExpiryDate) {
//       errors.medicineExpiryDate = 'Expiry date is required';
//     } else {
//       const expiryDate = new Date(medicine.medicineExpiryDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (expiryDate <= today) {
//         errors.medicineExpiryDate = 'Expiry date must be in the future';
//       }
//     }
//     if (medicine.medicineImage && !/\.(jpg|jpeg|png|gif)$/i.test(medicine.medicineImage)) {
//       errors.medicineImage = 'Please provide a valid image URL (jpg, jpeg, png, or gif)';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setMedicine((prev) => ({
//       ...prev,
//       [name]: name === 'medicinePrice' || name === 'medicineQuantity' ? parseFloat(value) || 0 : value,
//     }));
//     setFormErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       const response = await fetch(`${API_BASE}/updateMadicine/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...medicine,
//           medicinePrice: medicine.medicinePrice.toString(),
//           medicineQuantity: medicine.medicineQuantity.toString(),
//         }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Medicine updated successfully!');
//         setTimeout(() => navigate('/admin/medicinelist'), 2000);
//       } else {
//         throw new Error('Failed to update medicine.');
//       }
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Network error or server is unreachable.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate('/admin/medicinelist');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Update Medicine</h2>

//         {isLoading && (
//           <div className="flex justify-center mb-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-400 text-center">
//             {error}
//           </div>
//         )}

//         {successMessage && (
//           <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-400 text-center">
//             {successMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">
//                 Medicine Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineName"
//                 name="medicineName"
//                 type="text"
//                 value={medicine.medicineName}
//                 onChange={handleChange}
//                 placeholder="Enter medicine name"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 aria-required="true"
//                 aria-invalid={!!formErrors.medicineName}
//                 aria-describedby="medicineName-error"
//               />
//               {formErrors.medicineName && (
//                 <p id="medicineName-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineName}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="medicineType" className="block text-sm font-medium text-gray-700">
//                 Medicine Type <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineType"
//                 name="medicineType"
//                 type="text"
//                 value={medicine.medicineType}
//                 onChange={handleChange}
//                 placeholder="Enter medicine type"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 aria-required="true"
//                 aria-invalid={!!formErrors.medicineType}
//                 aria-describedby="medicineType-error"
//               />
//               {formErrors.medicineType && (
//                 <p id="medicineType-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineType}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineDescription" className="block text-sm font-medium text-gray-700">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="medicineDescription"
//               name="medicineDescription"
//               value={medicine.medicineDescription}
//               onChange={handleChange}
//               placeholder="Enter medicine description"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               rows={4}
//               required
//               aria-required="true"
//               aria-invalid={!!formErrors.medicineDescription}
//               aria-describedby="medicineDescription-error"
//             />
//             {formErrors.medicineDescription && (
//               <p id="medicineDescription-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineDescription}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicinePrice" className="block text-sm font-medium text-gray-700">
//                 Price (₹) <span className="text-red-500">*</span>
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
//                 <input
//                   id="medicinePrice"
//                   name="medicinePrice"
//                   type="number"
//                   step="0.01"
//                   value={medicine.medicinePrice}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                   required
//                   aria-required="true"
//                   aria-invalid={!!formErrors.medicinePrice}
//                   aria-describedby="medicinePrice-error"
//                 />
//               </div>
//               {formErrors.medicinePrice && (
//                 <p id="medicinePrice-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicinePrice}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="medicineQuantity" className="block text-sm font-medium text-gray-700">
//                 Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="medicineQuantity"
//                 name="medicineQuantity"
//                 type="number"
//                 value={medicine.medicineQuantity}
//                 onChange={handleChange}
//                 placeholder="Enter quantity"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 required
//                 min="0"
//                 aria-required="true"
//                 aria-invalid={!!formErrors.medicineQuantity}
//                 aria-describedby="medicineQuantity-error"
//               />
//               {formErrors.medicineQuantity && (
//                 <p id="medicineQuantity-error" className="mt-1 text-sm text-red-600">
//                   {formErrors.medicineQuantity}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineExpiryDate" className="block text-sm font-medium text-gray-700">
//               Expiry Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="medicineExpiryDate"
//               name="medicineExpiryDate"
//               type="date"
//               value={medicine.medicineExpiryDate}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               required
//               aria-required="true"
//               aria-invalid={!!formErrors.medicineExpiryDate}
//               aria-describedby="medicineExpiryDate-error"
//             />
//             {formErrors.medicineExpiryDate && (
//               <p id="medicineExpiryDate-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineExpiryDate}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="medicineManufacturer" className="block text-sm font-medium text-gray-700">
//                 Manufacturer
//               </label>
//               <input
//                 id="medicineManufacturer"
//                 name="medicineManufacturer"
//                 type="text"
//                 value={medicine.medicineManufacturer}
//                 onChange={handleChange}
//                 placeholder="Enter manufacturer"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>

//             <div>
//               <label htmlFor="medicineCategory" className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <input
//                 id="medicineCategory"
//                 name="medicineCategory"
//                 type="text"
//                 value={medicine.medicineCategory}
//                 onChange={handleChange}
//                 placeholder="Enter category"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="medicineImage" className="block text-sm font-medium text-gray-700">
//               Image URL
//             </label>
//             <input
//               id="medicineImage"
//               name="medicineImage"
//               type="url"
//               value={medicine.medicineImage}
//               onChange={handleChange}
//               placeholder="Enter image URL"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               aria-invalid={!!formErrors.medicineImage}
//               aria-describedby="medicineImage-error"
//             />
//             {formErrors.medicineImage && (
//               <p id="medicineImage-error" className="mt-1 text-sm text-red-600">
//                 {formErrors.medicineImage}
//               </p>
//             )}
//             {medicine.medicineImage && (
//               <div className="mt-2">
//                 <img
//                   src={medicine.medicineImage}
//                   alt="Medicine preview"
//                   className="h-20 w-20 object-cover rounded"
//                   onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/80')} // Fallback image
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between gap-4">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-semibold transition"
//               aria-label="Cancel and return to medicine list"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition ${
//                 isLoading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               aria-label="Update medicine"
//             >
//               {isLoading ? 'Updating...' : 'Update Medicine'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateMedicine;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

// Define Medicine interface with corrected types
interface Medicine {
  medicineid: number | null;
  medicineName: string;
  medicineType: string;
  medicineDescription: string;
  medicinePrice: number;
  medicineQuantity: number;
  medicineExpiryDate: string; // Will store LocalDateTime as string (e.g., "2025-06-03T14:30:00")
  medicineManufacturer: string;
  medicineImage: string;
  medicineCategory: string;
}

const UpdateMedicine: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState<Medicine>({
    medicineid: null,
    medicineName: '',
    medicineType: '',
    medicineDescription: '',
    medicinePrice: 0,
    medicineQuantity: 0,
    medicineExpiryDate: '',
    medicineManufacturer: '',
    medicineImage: '',
    medicineCategory: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Medicine, string>>>({});
  // const base_url="https://healthtourism-5.onrender.com"
  const API_BASE = `${BASE_URL}/pharmacy`;

  useEffect(() => {
    const fetchMedicine = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/getMadicineById/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch medicine.`);
        }
        const data: Medicine = await response.json();
        setMedicine({
          ...data,
          medicinePrice: typeof data.medicinePrice === 'string' ? parseFloat(data.medicinePrice) || 0 : data.medicinePrice,
          medicineQuantity: typeof data.medicineQuantity === 'string' ? parseInt(data.medicineQuantity, 10) || 0 : data.medicineQuantity,
          // Format LocalDateTime for datetime-local input
          medicineExpiryDate: data.medicineExpiryDate ? new Date(data.medicineExpiryDate).toISOString().slice(0, 16) : '',
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Network error or server is unreachable.');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchMedicine();
  }, [id]);

  // Hourly alert for medicine expiring today
  useEffect(() => {
    if (medicine.medicineExpiryDate) {
      const expiryDate = new Date(medicine.medicineExpiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);

      if (expiryDate.getTime() === today.getTime()) {
        const alertMessage = `Alert: ${medicine.medicineName} expires today!`;
        setSuccessMessage(alertMessage);
        setTimeout(() => setSuccessMessage(null), 5000);

        const intervalId = setInterval(() => {
          setSuccessMessage(alertMessage);
          setTimeout(() => setSuccessMessage(null), 5000);
        }, 3600 * 1000);

        return () => clearInterval(intervalId);
      }
    }
  }, [medicine.medicineExpiryDate, medicine.medicineName]);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof Medicine, string>> = {};
    if (!medicine.medicineName.trim()) errors.medicineName = 'Please enter a valid name';
    if (!medicine.medicineType.trim()) errors.medicineType = 'Please enter a valid type';
    if (!medicine.medicineDescription.trim()) errors.medicineDescription = 'Please enter a valid description';
    if (medicine.medicinePrice <= 0) errors.medicinePrice = 'Price must be greater than 0';
    if (medicine.medicineQuantity < 0) errors.medicineQuantity = 'Quantity cannot be negative';
    if (!medicine.medicineExpiryDate) {
      errors.medicineExpiryDate = 'Please select a valid expiry date and time';
    } else {
      const expiryDate = new Date(medicine.medicineExpiryDate);
      const now = new Date();
      if (expiryDate <= now) {
        errors.medicineExpiryDate = 'Expiry date and time must be in the future';
      }
    }
    if (medicine.medicineImage && !/\.(jpg|jpeg|png|gif)$/i.test(medicine.medicineImage)) {
      errors.medicineImage = 'Please provide a valid image URL (jpg, jpeg, png, or gif)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMedicine((prev) => ({
      ...prev,
      [name]: name === 'medicinePrice' || name === 'medicineQuantity' ? parseFloat(value) || 0 : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // Ensure medicineExpiryDate is in LocalDateTime format (e.g., "2025-06-03T14:30:00")
      const formattedMedicine = {
        ...medicine,
        medicinePrice: medicine.medicinePrice.toString(),
        medicineQuantity: medicine.medicineQuantity.toString(),
        medicineExpiryDate: new Date(medicine.medicineExpiryDate).toISOString().slice(0, 19), // Format as YYYY-MM-DDTHH:MM:SS
      };

      const response = await fetch(`${API_BASE}/updateMadicine/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedMedicine),
      });

      if (response.ok) {
        setSuccessMessage('Medicine updated successfully!');
        setTimeout(() => navigate('/admin/medicinelist'), 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update medicine.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Network error or server is unreachable.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/medicinelist');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Update Medicine</h2>

        {isLoading && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-400 text-center">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-400 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">
                Medicine Name <span className="text-red-500">*</span>
              </label>
              <input
                id="medicineName"
                name="medicineName"
                type="text"
                value={medicine.medicineName}
                onChange={handleChange}
                placeholder="Enter medicine name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
                aria-required="true"
                aria-invalid={!!formErrors.medicineName}
                aria-describedby="medicineName-error"
              />
              {formErrors.medicineName && (
                <p id="medicineName-error" className="mt-1 text-sm text-red-600">
                  {formErrors.medicineName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="medicineType" className="block text-sm font-medium text-gray-700">
                Medicine Type <span className="text-red-500">*</span>
              </label>
              <input
                id="medicineType"
                name="medicineType"
                type="text"
                value={medicine.medicineType}
                onChange={handleChange}
                placeholder="Enter medicine type"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
                aria-required="true"
                aria-invalid={!!formErrors.medicineType}
                aria-describedby="medicineType-error"
              />
              {formErrors.medicineType && (
                <p id="medicineType-error" className="mt-1 text-sm text-red-600">
                  {formErrors.medicineType}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="medicineDescription" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="medicineDescription"
              name="medicineDescription"
              value={medicine.medicineDescription}
              onChange={handleChange}
              placeholder="Enter medicine description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows={4}
              required
              aria-required="true"
              aria-invalid={!!formErrors.medicineDescription}
              aria-describedby="medicineDescription-error"
            />
            {formErrors.medicineDescription && (
              <p id="medicineDescription-error" className="mt-1 text-sm text-red-600">
                  {formErrors.medicineDescription}
                </p>
              )}
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="medicinePrice" className="block text-sm font-medium text-gray-700">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                  <input
                    id="medicinePrice"
                    name="medicinePrice"
                    type="number"
                    step="0.01"
                    value={medicine.medicinePrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                    aria-required="true"
                    aria-invalid={!!formErrors.medicinePrice}
                    aria-describedby="medicinePrice-error"
                  />
                </div>
                {formErrors.medicinePrice && (
                  <p id="medicinePrice-error" className="mt-1 text-sm text-red-600">
                    {formErrors.medicinePrice}
                  </p>
                )}
              </div>
  
              <div>
                <label htmlFor="medicineQuantity" className="block text-sm font-medium text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="medicineQuantity"
                  name="medicineQuantity"
                  type="number"
                  value={medicine.medicineQuantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                  min="0"
                  aria-required="true"
                  aria-invalid={!!formErrors.medicineQuantity}
                  aria-describedby="medicineQuantity-error"
                />
                {formErrors.medicineQuantity && (
                  <p id="medicineQuantity-error" className="mt-1 text-sm text-red-600">
                    {formErrors.medicineQuantity}
                  </p>
                )}
              </div>
            </div>
  
            <div>
              <label htmlFor="medicineExpiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date and Time <span className="text-red-500">*</span>
              </label>
              <input
                id="medicineExpiryDate"
                name="medicineExpiryDate"
                type="datetime-local"
                value={medicine.medicineExpiryDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
                aria-required="true"
                aria-invalid={!!formErrors.medicineExpiryDate}
                aria-describedby="medicineExpiryDate-error"
              />
              {formErrors.medicineExpiryDate && (
                <p id="medicineExpiryDate-error" className="mt-1 text-sm text-red-600">
                  {formErrors.medicineExpiryDate}
                </p>
              )}
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="medicineManufacturer" className="block text-sm font-medium text-gray-700">
                  Manufacturer
                </label>
                <input
                  id="medicineManufacturer"
                  name="medicineManufacturer"
                  type="text"
                  value={medicine.medicineManufacturer}
                  onChange={handleChange}
                  placeholder="Enter manufacturer"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
  
              <div>
                <label htmlFor="medicineCategory" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  id="medicineCategory"
                  name="medicineCategory"
                  type="text"
                  value={medicine.medicineCategory}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="medicineImage" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                id="medicineImage"
                name="medicineImage"
                type="url"
                value={medicine.medicineImage}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                aria-invalid={!!formErrors.medicineImage}
                aria-describedby="medicineImage-error"
              />
              {formErrors.medicineImage && (
                <p id="medicineImage-error" className="mt-1 text-sm text-red-600">
                  {formErrors.medicineImage}
                </p>
              )}
              {medicine.medicineImage && (
                <div className="mt-2">
                  <img
                    src={medicine.medicineImage}
                    alt="Medicine preview"
                    className="h-20 w-20 object-cover rounded"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/80')}
                  />
                </div>
              )}
            </div>
  
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-semibold transition"
                aria-label="Cancel and return to medicine list"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Update medicine"
              >
                {isLoading ? 'Updating...' : 'Update Medicine'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default UpdateMedicine;