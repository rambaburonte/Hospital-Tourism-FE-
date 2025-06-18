// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string | null;
//   serviceId: string | null;
//   bookedByUserId: string | null;
// }

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   price: number;
//   locationId: string | null;
//   slots: Slot[];
//   status: string | null;
// }

// const UpdateChef: React.FC = () => {
//   const { chefID } = useParams<{ chefID: string }>();
//   const navigate = useNavigate();
//   const [chef, setChef] = useState<Chef | null>(null);
//   const [formData, setFormData] = useState<Partial<Chef>>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showSlotsModal, setShowSlotsModal] = useState<boolean>(false);
//   const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
// //const base_url = 'https://healthtourism-5.onrender.com/api/chefs';
// const base_url= '${BASE_URL}';
//   useEffect(() => {
//     const fetchChef = async () => {
//       try {
//         const response = await fetch(`${base_url}/api/chefs/chef-By/Id/${chefID}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch chef data');
//         }
//         const data: Chef = await response.json();
//         setChef(data);
//         setFormData({
//           chefName: data.chefName,
//           chefDescription: data.chefDescription,
//           chefImage: data.chefImage,
//           chefRating: data.chefRating,
//           experience: data.experience,
//           styles: data.styles,
//           price: data.price,
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (chefID) {
//       fetchChef();
//     }
//   }, [chefID]);

//   const validateForm = () => {
//     const errors: { [key: string]: string } = {};
//     if (!formData.chefName?.trim()) errors.chefName = 'Name is required';
//     if (!formData.chefDescription?.trim()) errors.chefDescription = 'Description is required';
//     if (!formData.chefImage?.trim()) errors.chefImage = 'Image URL is required';
//     if (!formData.chefRating || isNaN(Number(formData.chefRating)) || Number(formData.chefRating) < 0 || Number(formData.chefRating) > 5) {
//       errors.chefRating = 'Rating must be a number between 0 and 5';
//     }
//     if (!formData.experience?.trim()) errors.experience = 'Experience is required';
//     if (!formData.styles?.trim()) errors.styles = 'Styles are required';
//     if (!formData.price || formData.price <= 0) errors.price = 'Price must be a positive number';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setFormErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const response = await fetch(`${base_url}/api/chefs/${chefID}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update chef');
//       }
//       alert('Chef updated successfully');
//       navigate('/'); // Redirect back to chef list
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     }
//   };

//   const openSlotsModal = () => {
//     setShowSlotsModal(true);
//   };

//   const closeSlotsModal = () => {
//     setShowSlotsModal(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6">
//         <p className="text-red-600 text-base font-semibold">{error}</p>
//         <button
//           className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!chef) {
//     return <div className="text-center p-6 text-gray-500 text-base">Chef not found</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
//         Chef Profile: {chef.chefName}
//       </h1>

//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Chef Image and Summary */}
//           <div className="md:col-span-1">
//             <div className="relative mb-4">
//               <img
//                 src={formData.chefImage || 'https://via.placeholder.com/300x300?text=Chef+Image'}
//                 alt={formData.chefName}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
//                 Rating: {formData.chefRating} ★
//               </div>
//             </div>
//             <div className="space-y-2 text-sm text-gray-600">
//               <p><span className="font-medium text-gray-800">Experience:</span> {formData.experience}</p>
//               <p><span className="font-medium text-gray-800">Styles:</span> {formData.styles}</p>
//               <p><span className="font-medium text-gray-800">Price:</span> ${formData.price?.toFixed(2)}</p>
//               <button
//                 onClick={openSlotsModal}
//                 className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm mt-4"
//               >
//                 View Availability
//               </button>
//             </div>
//           </div>

//           {/* Update Form */}
//           <div className="md:col-span-2">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Chef Details</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Chef Name</label>
//                 <input
//                   type="text"
//                   name="chefName"
//                   value={formData.chefName || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefName && <p className="text-red-600 text-xs mt-1">{formErrors.chefName}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="chefDescription"
//                   value={formData.chefDescription || ''}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefDescription && <p className="text-red-600 text-xs mt-1">{formErrors.chefDescription}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Image URL</label>
//                 <input
//                   type="text"
//                   name="chefImage"
//                   value={formData.chefImage || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefImage && <p className="text-red-600 text-xs mt-1">{formErrors.chefImage}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
//                 <input
//                   type="text"
//                   name="chefRating"
//                   value={formData.chefRating || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefRating && <p className="text-red-600 text-xs mt-1">{formErrors.chefRating}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Experience</label>
//                 <input
//                   type="text"
//                   name="experience"
//                   value={formData.experience || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.experience && <p className="text-red-600 text-xs mt-1">{formErrors.experience}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Styles</label>
//                 <input
//                   type="text"
//                   name="styles"
//                   value={formData.styles || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.styles && <p className="text-red-600 text-xs mt-1">{formErrors.styles}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.price && <p className="text-red-600 text-xs mt-1">{formErrors.price}</p>}
//               </div>

//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => navigate('/')}
//                   className="flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Slots Modal */}
//       {showSlotsModal && chef && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
//             <button
//               onClick={closeSlotsModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
//               aria-label="Close modal"
//             >
//               ×
//             </button>
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               {chef.chefName}'s Availability
//             </h2>
//             {chef.slots.length > 0 ? (
//               <div className="space-y-2">
//                 {chef.slots.map((slot) => (
//                   <div
//                     key={slot.id}
//                     className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-200"
//                   >
//                     <span>{slot.slotTime}</span>
//                     <span
//                       className={`${
//                         slot.bookingStatus === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'
//                       } font-medium`}
//                     >
//                       {slot.bookingStatus}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm">No slots available</p>
//             )}
//             <button
//               onClick={closeSlotsModal}
//               className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateChef;











// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';
// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string | null; // Kept for compatibility with fetched data
// }

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   price: number;
//   locationId: string | null;
//   slots: Slot[];
//   status: string | null;
// }

// const UpdateChef: React.FC = () => {
//   const { chefID } = useParams<{ chefID: string }>();
//   const navigate = useNavigate();
//   const [chef, setChef] = useState<Chef | null>(null);
//   const [formData, setFormData] = useState<Partial<Chef>>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showSlotsModal, setShowSlotsModal] = useState<boolean>(false);
//   const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
//   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
//   const [slotFormData, setSlotFormData] = useState<Slot | null>(null);
//   const [slotFormErrors, setSlotFormErrors] = useState<{ [key: string]: string }>({});
  

//   useEffect(() => {
//     const fetchChef = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/chefs/chef-By/Id/${chefID}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch chef data');
//         }
//         const data: Chef = await response.json();
//         setChef(data);
//         setFormData({
//           chefName: data.chefName,
//           chefDescription: data.chefDescription,
//           chefImage: data.chefImage,
//           chefRating: data.chefRating,
//           experience: data.experience,
//           styles: data.styles,
//           price: data.price,
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (chefID) {
//       fetchChef();
//     }
//   }, [chefID]);

//   const validateForm = () => {
//     const errors: { [key: string]: string } = {};
//     if (!formData.chefName?.trim()) errors.chefName = 'Name is required';
//     if (!formData.chefDescription?.trim()) errors.chefDescription = 'Description is required';
//     if (!formData.chefImage?.trim()) errors.chefImage = 'Image URL is required';
//     if (!formData.chefRating || isNaN(Number(formData.chefRating)) || Number(formData.chefRating) < 0 || Number(formData.chefRating) > 5) {
//       errors.chefRating = 'Rating must be a number between 0 and 5';
//     }
//     if (!formData.experience?.trim()) errors.experience = 'Experience is required';
//     if (!formData.styles?.trim()) errors.styles = 'Styles are required';
//     if (!formData.price || formData.price <= 0) errors.price = 'Price must be a positive number';
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const validateSlotForm = (slot: Slot) => {
//     const errors: { [key: string]: string } = {};
//     if (!slot.slotTime?.trim()) errors.slotTime = 'Slot time is required';
//     if (!slot.bookingStatus?.trim()) errors.bookingStatus = 'Booking status is required';
//     setSlotFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setFormErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleSlotChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setSlotFormData((prev) => prev ? ({ ...prev, [name]: value }) : null);
//     setSlotFormErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const response = await fetch(`${BASE_URL}/api/chefs/${chefID}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update chef');
//       }
//       alert('Chef updated successfully');
//       navigate(-1); // Redirect to previous page
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     }
//   };

//   const handleUpdateSlot = async () => {
//     if (!slotFormData || !validateSlotForm(slotFormData)) return;

//     try {
//       const updatedSlots = chef?.slots.map((slot) =>
//         slot.id === slotFormData.id
//           ? { id: slotFormData.id, slotTime: slotFormData.slotTime, bookingStatus: slotFormData.bookingStatus }
//           : { id: slot.id, slotTime: slot.slotTime, bookingStatus: slot.bookingStatus }
//       ) || [];

//       const response = await fetch(`${BASE_URL}/api/chefs/update/${chefID}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedSlots),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to update slot');
//       }
      
//       const updatedChef: Chef = await response.json();
//       setChef(updatedChef);
//       setSelectedSlot(null);
//       setSlotFormData(null);
//       alert('Slot updated successfully');
//       navigate(-1); // Redirect to previous page
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     }
//   };

//   const openSlotsModal = () => {
//     setShowSlotsModal(true);
//     setSelectedSlot(null);
//     setSlotFormData(null);
//   };

//   const closeSlotsModal = () => {
//     setShowSlotsModal(false);
//     setSelectedSlot(null);
//     setSlotFormData(null);
//   };

//   const handleEditSlot = (slot: Slot) => {
//     setSelectedSlot(slot);
//     setSlotFormData({ ...slot });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6">
//         <p className="text-red-600 text-base font-semibold">{error}</p>
//         <button
//           className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!chef) {
//     return <div className="text-center p-6 text-gray-500 text-base">Chef not found</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
//         Chef Profile: {chef.chefName}
//       </h1>

//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="md:col-span-1">
//             <div className="relative mb-4">
//               <img
//                 src={formData.chefImage || 'https://via.placeholder.com/300x300?text=Chef+Image'}
//                 alt={formData.chefName}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
//                 Rating: {formData.chefRating} ★
//               </div>
//             </div>
//             <div className="space-y-2 text-sm text-gray-600">
//               <p><span className="font-medium text-gray-800">Experience:</span> {formData.experience}</p>
//               <p><span className="font-medium text-gray-800">Styles:</span> {formData.styles}</p>
//               <p><span className="font-medium text-gray-800">Price:</span> ${formData.price?.toFixed(2)}</p>
//               <button
//                 onClick={openSlotsModal}
//                 className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm mt-4"
//               >
//                 Manage Availability
//               </button>
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Chef Details</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Chef Name</label>
//                 <input
//                   type="text"
//                   name="chefName"
//                   value={formData.chefName || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefName && <p className="text-red-600 text-xs mt-1">{formErrors.chefName}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="chefDescription"
//                   value={formData.chefDescription || ''}
//                   onChange={handleChange}
//                   rows={4}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefDescription && <p className="text-red-600 text-xs mt-1">{formErrors.chefDescription}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Image URL</label>
//                 <input
//                   type="text"
//                   name="chefImage"
//                   value={formData.chefImage || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefImage && <p className="text-red-600 text-xs mt-1">{formErrors.chefImage}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
//                 <input
//                   type="text"
//                   name="chefRating"
//                   value={formData.chefRating || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.chefRating && <p className="text-red-600 text-xs mt-1">{formErrors.chefRating}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Experience</label>
//                 <input
//                   type="text"
//                   name="experience"
//                   value={formData.experience || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.experience && <p className="text-red-600 text-xs mt-1">{formErrors.experience}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Styles</label>
//                 <input
//                   type="text"
//                   name="styles"
//                   value={formData.styles || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.styles && <p className="text-red-600 text-xs mt-1">{formErrors.styles}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price || ''}
//                   onChange={handleChange}
//                   className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                 />
//                 {formErrors.price && <p className="text-red-600 text-xs mt-1">{formErrors.price}</p>}
//               </div>

//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showSlotsModal && chef && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
//             <button
//               onClick={closeSlotsModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
//               aria-label="Close modal"
//             >
//               ×
//             </button>
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">
//               {chef.chefName}'s Availability
//             </h2>
            
//             {!selectedSlot ? (
//               <div>
//                 {chef.slots.filter(slot => slot.bookingStatus === 'AVAILABLE').length > 0 ? (
//                   <div className="space-y-2">
//                     {chef.slots
//                       .filter(slot => slot.bookingStatus === 'AVAILABLE')
//                       .map((slot) => (
//                         <div
//                           key={slot.id}
//                           className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-200"
//                         >
//                           <span>{slot.slotTime}</span>
//                           <button
//                             onClick={() => handleEditSlot(slot)}
//                             className="py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//                           >
//                             Edit
//                           </button>
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-sm">No available slots</p>
//                 )}
//                 <button
//                   onClick={closeSlotsModal}
//                   className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Slot Time</label>
//                   <input
//                     type="text"
//                     name="slotTime"
//                     value={slotFormData?.slotTime || ''}
//                     onChange={handleSlotChange}
//                     className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                     placeholder="e.g., 09:00 AM - 10:00 AM"
//                   />
//                   {slotFormErrors.slotTime && <p className="text-red-600 text-xs mt-1">{slotFormErrors.slotTime}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Booking Status</label>
//                   <select
//                     name="bookingStatus"
//                     value={slotFormData?.bookingStatus || ''}
//                     onChange={handleSlotChange}
//                     className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//                   >
//                     <option value="AVAILABLE">AVAILABLE</option>
//                     <option value="BOOKED">BOOKED</option>
//                   </select>
//                   {slotFormErrors.bookingStatus && <p className="text-red-600 text-xs mt-1">{slotFormErrors.bookingStatus}</p>}
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => setSelectedSlot(null)}
//                     className="flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-sm"
//                   >
//                     Back
//                   </button>
//                   <button
//                     onClick={handleUpdateSlot}
//                     className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//                   >
//                     Save Slot
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateChef;







import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
  price: number;
  locationId: string | null;
  status: string | null;
}

const UpdateChef: React.FC = () => {
  const { chefID } = useParams<{ chefID: string }>();
  const navigate = useNavigate();
  const [chef, setChef] = useState<Chef | null>(null);
  const [formData, setFormData] = useState<Partial<Chef>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/chefs/chef-By/Id/${chefID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chef data');
        }
        const data: Chef = await response.json();
        setChef(data);
        setFormData({
          chefName: data.chefName,
          chefDescription: data.chefDescription,
          chefImage: data.chefImage,
          chefRating: data.chefRating,
          experience: data.experience,
          styles: data.styles,
          price: data.price,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (chefID) {
      fetchChef();
    }
  }, [chefID]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.chefName?.trim()) errors.chefName = 'Name is required';
    if (!formData.chefDescription?.trim()) errors.chefDescription = 'Description is required';
    if (!formData.chefImage?.trim()) errors.chefImage = 'Image URL is required';
    if (!formData.chefRating || isNaN(Number(formData.chefRating)) || Number(formData.chefRating) < 0 || Number(formData.chefRating) > 5) {
      errors.chefRating = 'Rating must be a number between 0 and 5';
    }
    if (!formData.experience?.trim()) errors.experience = 'Experience is required';
    if (!formData.styles?.trim()) errors.styles = 'Styles are required';
    if (!formData.price || formData.price <= 0) errors.price = 'Price must be a positive number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/chefs/${chefID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update chef');
      }
      alert('Chef updated successfully');
      navigate(-1); // Redirect to previous page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 text-base font-semibold">{error}</p>
        <button
          className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!chef) {
    return <div className="text-center p-6 text-gray-500 text-base">Chef not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
        Chef Profile: {chef.chefName}
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="relative mb-4">
              <img
                src={formData.chefImage || 'https://via.placeholder.com/300x300?text=Chef+Image'}
                alt={formData.chefName}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
                Rating: {formData.chefRating} ★
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium text-gray-800">Experience:</span> {formData.experience}</p>
              <p><span className="font-medium text-gray-800">Styles:</span> {formData.styles}</p>
              <p><span className="font-medium text-gray-800">Price:</span> ${formData.price?.toFixed(2)}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Chef Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Chef Name</label>
                <input
                  type="text"
                  name="chefName"
                  value={formData.chefName || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefName && <p className="text-red-600 text-xs mt-1">{formErrors.chefName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="chefDescription"
                  value={formData.chefDescription || ''}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefDescription && <p className="text-red-600 text-xs mt-1">{formErrors.chefDescription}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="chefImage"
                  value={formData.chefImage || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefImage && <p className="text-red-600 text-xs mt-1">{formErrors.chefImage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                <input
                  type="text"
                  name="chefRating"
                  value={formData.chefRating || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.chefRating && <p className="text-red-600 text-xs mt-1">{formErrors.chefRating}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.experience && <p className="text-red-600 text-xs mt-1">{formErrors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Styles</label>
                <input
                  type="text"
                  name="styles"
                  value={formData.styles || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.styles && <p className="text-red-600 text-xs mt-1">{formErrors.styles}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
                {formErrors.price && <p className="text-red-600 text-xs mt-1">{formErrors.price}</p>}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChef;