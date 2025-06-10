// // import React, { useState } from 'react';

// // // TypeScript interfaces for request and response
// // interface BookingRequest {
// //   slotInfo: string[];
// //   paymentMode: string;
// //   bookingType: string;
// //   remarks: string;
// // }

// // interface BookingResponse {
// //   bookingId: number;
// //   bookingDate: string;
// //   slotIdLong: number | null;
// //   bookingStatus: string;
// //   bookingType: string;
// //   bookingAmount: number;
// //   paymentMode: string;
// //   paymentStatus: string;
// //   discountApplied: string;
// //   slotInfo: string[];
// //   additionalRemarks: string | null;
// //   physioId: number | null;
// //   physioName: string | null;
// //   translatorId: number | null;
// //   translatorName: string | null;
// //   spaId: number | null;
// //   spaName: string | null;
// //   doctorId: number | null;
// //   doctorName: string | null;
// //   labtestId: number | null;
// //   labtestName: string | null;
// //   userId: number;
// //   userName: string;
// //   chefId: number | null;
// //   chefName: string | null;
// // }

// // const BookingForm: React.FC = () => {
// //   // State for form inputs
// //   const [userId, setUserId] = useState<string>('');
// //   const [serviceId, setServiceId] = useState<string>('');
// //   const [serviceType, setServiceType] = useState<string>('');
// //   const [slotInfoStart, setSlotInfoStart] = useState<string>('');
// //   const [slotInfoEnd, setSlotInfoEnd] = useState<string>('');
// //   const [paymentMode, setPaymentMode] = useState<string>('online');
// //   const [bookingType, setBookingType] = useState<string>('single');
// //   const [remarks, setRemarks] = useState<string>('');
// //   const [response, setResponse] = useState<BookingResponse | null>(null);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);

// //   // Fixed service types
// //   const serviceTypes = ['labtests', 'doctor', 'spa', 'translator', 'physio', 'chef'];

// //   // Handle form submission
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError(null);
// //     setResponse(null);
// //     setLoading(true);

// //     // Validate inputs
// //     if (!userId || !serviceId || !serviceType || !slotInfoStart || !slotInfoEnd) {
// //       setError('All fields are required.');
// //       setLoading(false);
// //       return;
// //     }

// //     if (!serviceTypes.includes(serviceType)) {
// //       setError('Invalid service type.');
// //       setLoading(false);
// //       return;
// //     }

// //     const requestBody: BookingRequest = {
// //       slotInfo: [slotInfoStart, slotInfoEnd],
// //       paymentMode,
// //       bookingType,
// //       remarks,
// //     };

// //     try {
// //       const response = await fetch(
// //         `http://localhost:8080/api/bookings/book/${userId}/${serviceId}/${serviceType}`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(requestBody),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! Status: ${response.status}`);
// //       }

// //       const data: BookingResponse = await response.json();
// //       setResponse(data);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : 'An error occurred');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
// //       <h1 className="text-2xl font-bold mb-4 text-center">Create Booking</h1>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">User ID</label>
// //           <input
// //             type="number"
// //             value={userId}
// //             onChange={(e) => setUserId(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Service ID</label>
// //           <input
// //             type="number"
// //             value={serviceId}
// //             onChange={(e) => setServiceId(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Service Type</label>
// //           <select
// //             value={serviceType}
// //             onChange={(e) => setServiceType(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //             required
// //           >
// //             <option value="" disabled>
// //               Select Service Type
// //             </option>
// //             {serviceTypes.map((type) => (
// //               <option key={type} value={type}>
// //                 {type}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Slot Start Time</label>
// //           <input
// //             type="datetime-local"
// //             value={slotInfoStart}
// //             onChange={(e) => setSlotInfoStart(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Slot End Time</label>
// //           <input
// //             type="datetime-local"
// //             value={slotInfoEnd}
// //             onChange={(e) => setSlotInfoEnd(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
// //           <select
// //             value={paymentMode}
// //             onChange={(e) => setPaymentMode(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           >
// //             <option value="online">Online</option>
// //             <option value="cash">Cash</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Booking Type</label>
// //           <select
// //             value={bookingType}
// //             onChange={(e) => setBookingType(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //           >
// //             <option value="single">Single</option>
// //             <option value="group">Group</option>
// //           </select>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Remarks</label>
// //           <textarea
// //             value={remarks}
// //             onChange={(e) => setRemarks(e.target.value)}
// //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
// //             rows={4}
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
// //         >
// //           {loading ? 'Submitting...' : 'Create Booking'}
// //         </button>
// //       </form>

// //       {/* Error Message */}
// //       {error && (
// //         <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
// //           <p>{error}</p>
// //         </div>
// //       )}

// //       {/* Response Display */}
// //       {response && (
// //         <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
// //           <h2 className="text-lg font-bold">Booking Created</h2>
// //           <p><strong>Booking ID:</strong> {response.bookingId}</p>
// //           <p><strong>User:</strong> {response.userName} (ID: {response.userId})</p>
// //           <p><strong>Service Type:</strong> {serviceType}</p>
// //           <p><strong>Booking Status:</strong> {response.bookingStatus}</p>
// //           <p><strong>Amount:</strong> {response.bookingAmount}</p>
// //           <p><strong>Payment Status:</strong> {response.paymentStatus}</p>
// //           <p><strong>Slot Info:</strong> {response.slotInfo.join(' to ')}</p>
// //           {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
// //           {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
// //           {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
// //           {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
// //           {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
// //           {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default BookingForm;



// import React, { useState, useEffect } from 'react';

// // TypeScript interfaces
// interface BookingRequest {
//   slotInfo: string[];
//   paymentMode: string;
//   bookingType: string;
//   remarks: string;
// }

// interface BookingResponse {
//   bookingId: number;
//   bookingDate: string;
//   slotIdLong: number | null;
//   bookingStatus: string;
//   bookingType: string;
//   bookingAmount: number;
//   paymentMode: string;
//   paymentStatus: string;
//   discountApplied: string;
//   slotInfo: string[];
//   additionalRemarks: string | null;
//   physioId: number | null;
//   physioName: string | null;
//   translatorId: number | null;
//   translatorName: string | null;
//   spaId: number | null;
//   spaName: string | null;
//   doctorId: number | null;
//   doctorName: string | null;
//   labtestId: number | null;
//   labtestName: string | null;
//   userId: number;
//   userName: string;
//   chefId: number | null;
//   chefName: string | null;
// }

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string;
//   serviceId: number;
//   bookedByUserId: number | null;
//   start: string; // ISO 8601 format
//   end: string; // ISO 8601 format
// }

// const BookingForm: React.FC = () => {
//   // State for form inputs
//   const [userId, setUserId] = useState<string>('');
//   const [serviceId, setServiceId] = useState<string>('');
//   const [serviceType, setServiceType] = useState<string>('');
//   const [selectedSlotId, setSelectedSlotId] = useState<string>('');
//   const [paymentMode, setPaymentMode] = useState<string>('online');
//   const [bookingType, setBookingType] = useState<string>('single');
//   const [remarks, setRemarks] = useState<string>('');
//   const [response, setResponse] = useState<BookingResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
//   const [slotsError, setSlotsError] = useState<string | null>(null);

//   // Fixed service types
//   const serviceTypes = ['labtests', 'doctor', 'spa', 'translator', 'physio', 'chef'];

//   // Fetch slots when serviceType changes
//   useEffect(() => {
//     if (!serviceType) return;

//     const fetchSlots = async () => {
//       setSlotsLoading(true);
//       setSlotsError(null);
//       setSelectedSlotId('');
//       setSlots([]);
//       try {
//         const response = await fetch(`http://localhost:8080/api/services/slots/${serviceType}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: { id: number; slotTime: string; bookingStatus: string; serviceType: string; serviceId: number; bookedByUserId: number | null }[] = await response.json();

//         // Transform slotTime (e.g., "10:00 AM - 11:00 AM") to ISO 8601 start and end times
//         const formattedSlots = data
//           .filter((slot) => slot.bookingStatus === 'AVAILABLE')
//           .map((slot) => {
//             const [startTime, endTime] = slot.slotTime.split(' - ');
//             // Assume slots are for the next day (2025-06-10) to align with previous example
//             const date = '2025-06-10'; // Adjust if API provides specific date
//             const start = new Date(`${date} ${startTime}`).toISOString();
//             const end = new Date(`${date} ${endTime}`).toISOString();
//             return { ...slot, start, end };
//           });
//         setSlots(formattedSlots);
//       } catch (err) {
//         setSlotsError(err instanceof Error ? err.message : 'Failed to fetch slots');
//       } finally {
//         setSlotsLoading(false);
//       }
//     };
//     fetchSlots();
//   }, [serviceType]);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setResponse(null);
//     setLoading(true);

//     // Validate inputs
//     if (!userId || !serviceId || !serviceType || !selectedSlotId) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     // Find the selected slot
//     const slot = slots.find((s) => s.id.toString() === selectedSlotId);
//     if (!slot) {
//       setError('Invalid slot selected.');
//       setLoading(false);
//       return;
//     }

//     const requestBody: BookingRequest = {
//       slotInfo: [slot.start, slot.end],
//       paymentMode,
//       bookingType,
//       remarks,
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/bookings/book/${userId}/${serviceId}/${serviceType}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data: BookingResponse = await response.json();
//       setResponse(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-center">Create Booking</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">User ID</label>
//           <input
//             type="number"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Service ID</label>
//           <input
//             type="number"
//             value={serviceId}
//             onChange={(e) => setServiceId(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Service Type</label>
//           <select
//             value={serviceType}
//             onChange={(e) => setServiceType(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             required
//           >
//             <option value="" disabled>
//               Select Service Type
//             </option>
//             {serviceTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Select Slot</label>
//           {slotsLoading ? (
//             <p className="mt-1 text-gray-500">Loading slots...</p>
//           ) : slotsError ? (
//             <p className="mt-1 text-red-500">{slotsError}</p>
//           ) : slots.length === 0 || !serviceType ? (
//             <p className="mt-1 text-gray-500">
//               {serviceType ? 'No slots available.' : 'Select a service type to view slots.'}
//             </p>
//           ) : (
//             <select
//               value={selectedSlotId}
//               onChange={(e) => setSelectedSlotId(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="" disabled>
//                 Select a slot
//               </option>
//               {slots.map((slot) => (
//                 <option key={slot.id} value={slot.id}>
//                   {slot.slotTime} on 2025-06-10
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
//           <select
//             value={paymentMode}
//             onChange={(e) => setPaymentMode(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="online">Online</option>
//             <option value="cash">Cash</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Booking Type</label>
//           <select
//             value={bookingType}
//             onChange={(e) => setBookingType(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="single">Single</option>
//             <option value="group">Group</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Remarks</label>
//           <textarea
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//             rows={4}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading || slotsLoading || !slots.length || !serviceType}
//           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {loading ? 'Submitting...' : 'Create Booking'}
//         </button>
//       </form>

//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Response Display */}
//       {response && (
//         <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
//           <h2 className="text-lg font-bold">Booking Created</h2>
//           <p><strong>Booking ID:</strong> {response.bookingId}</p>
//           <p><strong>User:</strong> {response.userName} (ID: {response.userId})</p>
//           <p><strong>Service Type:</strong> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
//           <p><strong>Booking Status:</strong> {response.bookingStatus}</p>
//           <p><strong>Amount:</strong> {response.bookingAmount}</p>
//           <p><strong>Payment Status:</strong> {response.paymentStatus}</p>
//           <p><strong>Slot Info:</strong> {response.slotInfo.join(' to ')}</p>
//           {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
//           {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
//           {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
//           {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
//           {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
//           {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // TypeScript interfaces
// interface BookingRequest {
//   slotInfo: string[];
//   paymentMode: string;
//   bookingType: string;
//   remarks: string;
// }

// interface BookingResponse {
//   bookingId: number;
//   bookingDate: string;
//   slotIdLong: number | null;
//   bookingStatus: string;
//   bookingType: string;
//   bookingAmount: number;
//   paymentMode: string;
//   paymentStatus: string;
//   discountApplied: string;
//   slotInfo: string[];
//   additionalRemarks: string | null;
//   physioId: number | null;
//   physioName: string | null;
//   translatorId: number | null;
//   translatorName: string | null;
//   spaId: number | null;
//   spaName: string | null;
//   doctorId: number | null;
//   doctorName: string | null;
//   labtestId: number | null;
//   labtestName: string | null;
//   userId: number;
//   userName: string;
//   chefId: number | null;
//   chefName: string | null;
// }

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string;
//   serviceId: number;
//   bookedByUserId: number | null;
//   start: string; // ISO 8601 format
//   end: string; // ISO 8601 format
// }

// interface UserData {
//   id: number;
//   userName: string;
//   [key: string]: any; // Allow additional fields
// }

// const BookingForm: React.FC = () => {
//   const navigate = useNavigate();
//   // State for form inputs
//   const [user, setUser] = useState<UserData | null>(null);
//   const [serviceId, setServiceId] = useState<string>('');
//   const [serviceType, setServiceType] = useState<string>('');
//   const [selectedSlotId, setSelectedSlotId] = useState<string>('');
//   const [paymentMode, setPaymentMode] = useState<string>('online');
//   const [bookingType, setBookingType] = useState<string>('single');
//   const [remarks, setRemarks] = useState<string>('');
//   const [response, setResponse] = useState<BookingResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
//   const [slotsError, setSlotsError] = useState<string | null>(null);

//   // Fixed service types
//   const serviceTypes = ['labtests', 'doctor', 'spa', 'translator', 'physio', 'chef'];

//   // Check for user in localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser: UserData = JSON.parse(storedUser);
//         if (parsedUser.id) {
//           setUser(parsedUser);
//         } else {
//           setError('Invalid user data in localStorage');
//         }
//       } catch (err) {
//         setError('Failed to parse user data from localStorage');
//       }
//     } else {
//       setError('Please log in to book a service');
//     }
//   }, []);

//   // Fetch slots when serviceType changes
//   useEffect(() => {
//     if (!serviceType) return;

//     const fetchSlots = async () => {
//       setSlotsLoading(true);
//       setSlotsError(null);
//       setSelectedSlotId('');
//       setSlots([]);
//       try {
//         const response = await fetch(`http://localhost:8080/api/services/slots/${serviceType}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: { id: number; slotTime: string; bookingStatus: string; serviceType: string; serviceId: number; bookedByUserId: number | null }[] = await response.json();

//         // Transform slotTime (e.g., "10:00 AM - 11:00 AM") to ISO 8601 start and end times
//         const formattedSlots = data
//           .filter((slot) => slot.bookingStatus === 'AVAILABLE')
//           .map((slot) => {
//             const [startTime, endTime] = slot.slotTime.split(' - ');
//             // Assume slots are for the next day (2025-06-10) to align with previous example
//             const date = '2025-06-10'; // Adjust if API provides specific date
//             const start = new Date(`${date} ${startTime}`).toISOString();
//             const end = new Date(`${date} ${endTime}`).toISOString();
//             return { ...slot, start, end };
//           });
//         setSlots(formattedSlots);
//       } catch (err) {
//         setSlotsError(err instanceof Error ? err.message : 'Failed to fetch slots');
//       } finally {
//         setSlotsLoading(false);
//       }
//     };
//     fetchSlots();
//   }, [serviceType]);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setResponse(null);
//     setLoading(true);

//     // Validate inputs
//     if (!user || !user.id) {
//       setError('Please log in to book a service');
//       setLoading(false);
//       navigate('/login'); // Redirect to login page
//       return;
//     }
//     if (!serviceId || !serviceType || !selectedSlotId) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     // Find the selected slot
//     const slot = slots.find((s) => s.id.toString() === selectedSlotId);
//     if (!slot) {
//       setError('Invalid slot selected.');
//       setLoading(false);
//       return;
//     }

//     const requestBody: BookingRequest = {
//       slotInfo: [slot.start, slot.end],
//       paymentMode,
//       bookingType,
//       remarks,
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/bookings/book/${user.id}/${serviceId}/${serviceType}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data: BookingResponse = await response.json();
//       setResponse(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-6">
//   <h1 className="text-3xl font-semibold text-center text-blue-700">Service Booking</h1>

//   {!user ? (
//     <div className="p-5 bg-yellow-100 text-yellow-800 rounded-lg text-center">
//       <p className="mb-3 font-medium">Please log in to book a service.</p>
//       <button
//         onClick={() => navigate('/login')}
//         className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//       >
//         Go to Login
//       </button>
//     </div>
//   ) : (
//     <>
//       <div className="text-sm text-gray-600">
//         Logged in as: <span className="font-medium">{user.userName}</span> (ID: {user.id})
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">

//         {/* Group 1: Service Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Service ID</label>
//             <input
//               type="number"
//               value={serviceId}
//               onChange={(e) => setServiceId(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Service Type</label>
//             <select
//               value={serviceType}
//               onChange={(e) => setServiceType(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="" disabled>Select Type</option>
//               {serviceTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Group 2: Slot Selection */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700">Available Slot</label>
//           {slotsLoading ? (
//             <p className="text-gray-500 mt-1">Loading slots...</p>
//           ) : slotsError ? (
//             <p className="text-red-600 mt-1">{slotsError}</p>
//           ) : (
//             <select
//               value={selectedSlotId}
//               onChange={(e) => setSelectedSlotId(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="" disabled>Select a slot</option>
//               {slots.map((slot) => (
//                 <option key={slot.id} value={slot.id}>
//                   {slot.slotTime} (2025-06-10)
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* Group 3: Payment & Booking Type */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Payment Mode</label>
//             <select
//               value={paymentMode}
//               onChange={(e) => setPaymentMode(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="online">Online</option>
//               <option value="cash">Cash</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Booking Type</label>
//             <select
//               value={bookingType}
//               onChange={(e) => setBookingType(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="single">Single</option>
//               <option value="group">Group</option>
//             </select>
//           </div>
//         </div>

//         {/* Group 4: Remarks */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700">Remarks</label>
//           <textarea
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             rows={4}
//             className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Optional remarks..."
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading || slotsLoading || !slots.length || !serviceType}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
//         >
//           {loading ? 'Booking...' : 'Submit Booking'}
//         </button>
//       </form>
//     </>
//   )}

//   {/* Error */}
//   {error && (
//     <div className="p-4 mt-4 bg-red-100 text-red-700 rounded">
//       <p>{error}</p>
//     </div>
//   )}

//   {/* Success Response */}
//   {response && (
//     <div className="p-5 mt-6 bg-green-100 text-green-800 rounded-lg space-y-2">
//       <h2 className="text-lg font-bold text-green-900">Booking Confirmed</h2>
//       <p><strong>Booking ID:</strong> {response.bookingId}</p>
//       <p><strong>Service:</strong> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
//       <p><strong>Status:</strong> {response.bookingStatus}</p>
//       <p><strong>Amount:</strong> ₹{response.bookingAmount}</p>
//       <p><strong>Slot:</strong> {response.slotInfo.join(' to ')}</p>
//       {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
//       {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
//       {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
//       {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
//       {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
//       {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
//     </div>
//   )}
// </div>

//   );
// };

// export default BookingForm;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // TypeScript interfaces
// interface BookingRequest {
//   slotInfo: string[];
//   paymentMode: string;
//   bookingType: string;
//   remarks: string;
// }

// interface BookingResponse {
//   bookingId: number;
//   bookingDate: string;
//   slotIdLong: number | null;
//   bookingStatus: string;
//   bookingType: string;
//   bookingAmount: number;
//   paymentMode: string;
//   paymentStatus: string;
//   discountApplied: string;
//   slotInfo: string[];
//   additionalRemarks: string | null;
//   physioId: number | null;
//   physioName: string | null;
//   translatorId: number | null;
//   translatorName: string | null;
//   spaId: number | null;
//   spaName: string | null;
//   doctorId: number | null;
//   doctorName: string | null;
//   labtestId: number | null;
//   labtestName: string | null;
//   userId: number;
//   userName: string;
//   chefId: number | null;
//   chefName: string | null;
// }

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string;
//   serviceId: number;
//   bookedByUserId: number | null;
//   start: string;
//   end: string;
// }

// interface UserData {
//   id: number;
//   userName: string;
//   [key: string]: any;
// }

// const BookingForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [serviceId, setServiceId] = useState<string>('');
//   const [serviceType, setServiceType] = useState<string>('');
//   const [selectedSlotId, setSelectedSlotId] = useState<string>('');
//   const [paymentMode, setPaymentMode] = useState<string>('online');
//   const [bookingType, setBookingType] = useState<string>('single');
//   const [remarks, setRemarks] = useState<string>('');
//   const [response, setResponse] = useState<BookingResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
//   const [slotsError, setSlotsError] = useState<string | null>(null);

//   const serviceTypes = ['labtests', 'doctor', 'spa', 'translator', 'physio', 'chef'];

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser: UserData = JSON.parse(storedUser);
//         if (parsedUser.id) {
//           setUser(parsedUser);
//         } else {
//           setError('Invalid user data in localStorage');
//         }
//       } catch (err) {
//         setError('Failed to parse user data from localStorage');
//       }
//     } else {
//       setError('Please log in to book a service');
//     }
//   }, []);

//   useEffect(() => {
//     if (!serviceType) return;

//     const fetchSlots = async () => {
//       setSlotsLoading(true);
//       setSlotsError(null);
//       setSelectedSlotId('');
//       setSlots([]);
//       try {
//         const response = await fetch(`http://localhost:8080/api/services/slots/${serviceType}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: { id: number; slotTime: string; bookingStatus: string; serviceType: string; serviceId: number; bookedByUserId: number | null }[] = await response.json();

//         const formattedSlots = data
//           .filter((slot) => slot.bookingStatus === 'AVAILABLE')
//           .map((slot) => {
//             const [startTime, endTime] = slot.slotTime.split(' - ');
//             const date = '2025-06-10';
//             const start = new Date(`${date} ${startTime}`).toISOString();
//             const end = new Date(`${date} ${endTime}`).toISOString();
//             return { ...slot, start, end };
//           });
//         setSlots(formattedSlots);
//       } catch (err) {
//         setSlotsError(err instanceof Error ? err.message : 'Failed to fetch slots');
//       } finally {
//         setSlotsLoading(false);
//       }
//     };
//     fetchSlots();
//   }, [serviceType]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setResponse(null);
//     setLoading(true);

//     if (!user || !user.id) {
//       setError('Please log in to book a service');
//       setLoading(false);
//       navigate('/login');
//       return;
//     }
//     if (!serviceId || !serviceType || !selectedSlotId) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     const slot = slots.find((s) => s.id.toString() === selectedSlotId);
//     if (!slot) {
//       setError('Invalid slot selected.');
//       setLoading(false);
//       return;
//     }

//     const requestBody: BookingRequest = {
//       slotInfo: [slot.start, slot.end],
//       paymentMode,
//       bookingType,
//       remarks,
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/bookings/book/${user.id}/${serviceId}/${serviceType}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data: BookingResponse = await response.json();
//       setResponse(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6"
//     >
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center text-indigo-700"
//         >
//           Book Your Service
//         </motion.h1>

//         <AnimatePresence>
//           {!user ? (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-6 bg-amber-100 rounded-lg text-center space-y-4"
//             >
//               <p className="text-amber-900 font-medium">Please log in to book a service.</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/login')}
//                 className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200"
//               >
//                 Go to Login
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="space-y-6"
//             >
//               <div className="text-sm text-gray-600 text-center">
//                 Logged in as: <span className="font-semibold text-indigo-700">{user.userName}</span> (ID: {user.id})
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Service ID</label>
//                     <input
//                       type="number"
//                       value={serviceId}
//                       onChange={(e) => setServiceId(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                       required
//                     />
//                   </motion.div>
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Service Type</label>
//                     <select
//                       value={serviceType}
//                       onChange={(e) => setServiceType(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                       required
//                     >
//                       <option value="" disabled>Select Type</option>
//                       {serviceTypes.map((type) => (
//                         <option key={type} value={type}>
//                           {type.charAt(0).toUpperCase() + type.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Available Slot</label>
//                   {slotsLoading ? (
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                       </svg>
//                       <span>Loading slots...</span>
//                     </div>
//                   ) : slotsError ? (
//                     <p className="text-red-600 text-sm">{slotsError}</p>
//                   ) : (
//                     <select
//                       value={selectedSlotId}
//                       onChange={(e) => setSelectedSlotId(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                       required
//                     >
//                       <option value="" disabled>Select a slot</option>
//                       {slots.map((slot) => (
//                         <option key={slot.id} value={slot.id}>
//                           {slot.slotTime} (2025-06-10)
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </motion.div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
//                     <select
//                       value={paymentMode}
//                       onChange={(e) => setPaymentMode(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     >
//                       <option value="online">Online</option>
//                       <option value="cash">Cash</option>
//                     </select>
//                   </motion.div>
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Booking Type</label>
//                     <select
//                       value={bookingType}
//                       onChange={(e) => setBookingType(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     >
//                       <option value="single">Single</option>
//                       <option value="group">Group</option>
//                     </select>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Remarks</label>
//                   <textarea
//                     value={remarks}
//                     onChange={(e) => setRemarks(e.target.value)}
//                     rows={4}
//                     className="w-full p- پوستر3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     placeholder="Optional remarks..."
//                   ></textarea>
//                 </motion.div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   disabled={loading || slotsLoading || !slots.length || !serviceType}
//                   className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                       </svg>
//                       <span>Booking...</span>
//                     </>
//                   ) : (
//                     <span>Submit Booking</span>
//                   )}
//                 </motion.button>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="p-4 bg-red-100 text-red-800 rounded-lg"
//             >
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {response && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//               className="p-6 bg-green-100 rounded-lg text-green-800 space-y-3"
//             >
//               <h2 className="text-xl font-semibold text-green-900">Booking Confirmed!</h2>
//               <p><strong>Booking ID:</strong> {response.bookingId}</p>
//               <p><strong>Service:</strong> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
//               <p><strong>Status:</strong> {response.bookingStatus}</p>
//               <p><strong>Amount:</strong> ₹{response.bookingAmount}</p>
//               <p><strong>Slot:</strong> {response.slotInfo.join(' to ')}</p>
//               {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
//               {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
//               {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
//               {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
//               {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
//               {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default BookingForm;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // TypeScript interfaces
// interface BookingRequest {
//   slotInfo: string[];
//   paymentMode: string;
//   bookingType: string;
//   remarks: string;
// }

// interface BookingResponse {
//   bookingId: number;
//   bookingDate: string;
//   slotIdLong: number | null;
//   bookingStatus: string;
//   bookingType: string;
//   bookingAmount: number;
//   paymentMode: string;
//   paymentStatus: string;
//   discountApplied: string;
//   slotInfo: string[];
//   additionalRemarks: string | null;
//   physioId: number | null;
//   physioName: string | null;
//   translatorId: number | null;
//   translatorName: string | null;
//   spaId: number | null;
//   spaName: string | null;
//   doctorId: number | null;
//   doctorName: string | null;
//   labtestId: number | null;
//   labtestName: string | null;
//   userId: number;
//   userName: string;
//   chefId: number | null;
//   chefName: string | null;
// }

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string;
//   serviceId: number;
//   bookedByUserId: number | null;
//   start: string;
//   end: string;
// }

// interface UserData {
//   id: number;
//   userName: string;
//   [key: string]: any;
// }

// const BookingForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [serviceType, setServiceType] = useState<string>('');
//   const [selectedSlotId, setSelectedSlotId] = useState<string>('');
//   const [paymentMode, setPaymentMode] = useState<string>('online');
//   const [bookingType, setBookingType] = useState<string>('single');
//   const [remarks, setRemarks] = useState<string>('');
//   const [response, setResponse] = useState<BookingResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
//   const [slotsError, setSlotsError] = useState<string | null>(null);
//   const [logoError, setLogoError] = useState<boolean>(false);

//   const serviceTypes = ['labtests', 'doctor', 'spa', 'translator', 'physio', 'chef'];

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser: UserData = JSON.parse(storedUser);
//         if (parsedUser.id) {
//           setUser(parsedUser);
//         } else {
//           setError('Invalid user data in localStorage');
//         }
//       } catch (err) {
//         setError('Failed to parse user data from localStorage');
//       }
//     } else {
//       setError('Please log in to book a service');
//     }
//   }, []);

//   useEffect(() => {
//     if (!serviceType) return;

//     const fetchSlots = async () => {
//       setSlotsLoading(true);
//       setSlotsError(null);
//       setSelectedSlotId('');
//       setSlots([]);
//       try {
//         const response = await fetch(`http://localhost:8080/api/services/slots/${serviceType}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: { id: number; slotTime: string; bookingStatus: string; serviceType: string; serviceId: number; bookedByUserId: number | null }[] = await response.json();

//         const formattedSlots = data
//           .filter((slot) => slot.bookingStatus === 'AVAILABLE')
//           .map((slot) => {
//             const [startTime, endTime] = slot.slotTime.split(' - ');
//             const date = '2025-06-10';
//             const start = new Date(`${date} ${startTime}`).toISOString();
//             const end = new Date(`${date} ${endTime}`).toISOString();
//             return { ...slot, start, end };
//           });
//         setSlots(formattedSlots);
//       } catch (err) {
//         setSlotsError(err instanceof Error ? err.message : 'Failed to fetch slots');
//       } finally {
//         setSlotsLoading(false);
//       }
//     };
//     fetchSlots();
//   }, [serviceType]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setResponse(null);
//     setLoading(true);

//     if (!user || !user.id) {
//       setError('Please log in to book a service');
//       setLoading(false);
//       navigate('/login');
//       return;
//     }
//     if (!serviceType || !selectedSlotId) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     const slot = slots.find((s) => s.id.toString() === selectedSlotId);
//     if (!slot) {
//       setError('Invalid slot selected.');
//       setLoading(false);
//       return;
//     }

//     const requestBody: BookingRequest = {
//       slotInfo: [slot.start, slot.end],
//       paymentMode,
//       bookingType,
//       remarks,
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/bookings/witout-servId/${user.id}/${serviceType}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data: BookingResponse = await response.json();
//       setResponse(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6"
//     >
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
//         {/* Header Section */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center justify-between"
//         >
//           <div className="flex items-center space-x-3">
//             {logoError ? (
//               <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
//                 Logo
//               </div>
//             ) : (
//               <img
//                 src="https://placehold.co/40x40?text=Logo"
//                 alt="Logo"
//                 className="w-10 h-10 rounded-full"
//                 onError={() => setLogoError(true)}
//               />
//             )}
//             <h2 className="text-xl font-semibold text-indigo-700">Service Booking</h2>
//           </div>
//           {user && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
//             >
//               Logout
//             </motion.button>
//           )}
//         </motion.header>

//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center text-indigo-700"
//         >
//           Book Your Service
//         </motion.h1>

//         <AnimatePresence>
//           {!user ? (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-6 bg-amber-100 rounded-lg text-center space-y-4"
//             >
//               <p className="text-amber-900 font-medium">Please log in to book a service.</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/login')}
//                 className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200"
//               >
//                 Go to Login
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="space-y-6"
//             >
//               <div className="text-sm text-gray-600 text-center">
//                 Logged in as: <span className="font-semibold text-indigo-700">{user.userName}</span> (ID: {user.id})
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Service Type</label>
//                   <select
//                     value={serviceType}
//                     onChange={(e) => setServiceType(e.target.value)}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     required
//                   >
//                     <option value="" disabled>Select Type</option>
//                     {serviceTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </motion.div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Available Slot</label>
//                   {slotsLoading ? (
//                     <div className="flex items-center space-x-2 text-gray-600">
//                       <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                       </svg>
//                       <span>Loading slots...</span>
//                     </div>
//                   ) : slotsError ? (
//                     <p className="text-red-600 text-sm">{slotsError}</p>
//                   ) : (
//                     <select
//                       value={selectedSlotId}
//                       onChange={(e) => setSelectedSlotId(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                       required
//                     >
//                       <option value="" disabled>Select a slot</option>
//                       {slots.map((slot) => (
//                         <option key={slot.id} value={slot.id}>
//                           {slot.slotTime} (2025-06-10)
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 </motion.div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
//                     <select
//                       value={paymentMode}
//                       onChange={(e) => setPaymentMode(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     >
//                       <option value="online">Online</option>
//                       <option value="cash">Cash</option>
//                     </select>
//                   </motion.div>
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Booking Type</label>
//                     <select
//                       value={bookingType}
//                       onChange={(e) => setBookingType(e.target.value)}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     >
//                       <option value="single">Single</option>
//                       <option value="group">Group</option>
//                     </select>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Remarks</label>
//                   <textarea
//                     value={remarks}
//                     onChange={(e) => setRemarks(e.target.value)}
//                     rows={4}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     placeholder="Optional remarks..."
//                   ></textarea>
//                 </motion.div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   disabled={loading || slotsLoading || !slots.length || !serviceType}
//                   className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                       </svg>
//                       <span>Booking...</span>
//                     </>
//                   ) : (
//                     <span>Submit Booking</span>
//                   )}
//                 </motion.button>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="p-4 bg-red-100 text-red-800 rounded-lg"
//             >
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {response && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//               className="p-6 bg-green-100 rounded-lg text-green-800 space-y-3"
//             >
//               <h2 className="text-xl font-semibold text-green-900">Booking Confirmed!</h2>
//               <p><strong>Booking ID:</strong> {response.bookingId}</p>
//               <p><strong>Service:</strong> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
//               <p><strong>Status:</strong> {response.bookingStatus}</p>
//               <p><strong>Amount:</strong> ₹{response.bookingAmount}</p>
//               <p><strong>Slot:</strong> {response.slotInfo.join(' to ')}</p>
//               {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
//               {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
//               {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
//               {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
//               {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
//               {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default BookingForm;




// import React, { useState, FormEvent } from 'react';
// import axios from 'axios';

// interface BookingRequest {
//   slotInfo: string[];
//   paymentMode: string;
//   bookingType: string;
//   remarks: string;
// }

// const serviceTypes = ['chef', 'physio', 'translator', 'spa', 'labtests'];

// const BookingForm: React.FC = () => {
//   const [formData, setFormData] = useState<BookingRequest>({
//     slotInfo: ['', ''],
//     paymentMode: 'online',
//     bookingType: 'single',
//     remarks: '',
//   });
//   const [serviceType, setServiceType] = useState<string>('translator');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name === 'startTime' || name === 'endTime') {
//       setFormData((prev) => {
//         const newSlotInfo = [...prev.slotInfo];
//         newSlotInfo[name === 'startTime' ? 0 : 1] = value;
//         return { ...prev, slotInfo: newSlotInfo };
//       });
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setServiceType(e.target.value);
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const storedUser = localStorage.getItem('user');
//       if (!storedUser) {
//         throw new Error('User not found. Please log in.');
//       }
//       const user = JSON.parse(storedUser);
//       const userId = user.id; // Assuming user object has an id field

//       const response = await axios.post(
//         `http://localhost:8080/api/bookings/book/witout-servId/${userId}/status`,
//         formData,
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       setSuccess('Booking created successfully!');
//       // Reset form
//       setFormData({
//         slotInfo: ['', ''],
//         paymentMode: 'online',
//         bookingType: 'single',
//         remarks: '',
//       });
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Book a Service</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Service Type</label>
//           <select
//             value={serviceType}
//             onChange={handleServiceTypeChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             {serviceTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Start Time</label>
//           <input
//             type="datetime-local"
//             name="startTime"
//             value={formData.slotInfo[0]}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">End Time</label>
//           <input
//             type="datetime-local"
//             name="endTime"
//             value={formData.slotInfo[1]}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Payment Mode</label>
//           <select
//             name="paymentMode"
//             value={formData.paymentMode}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="online">Online</option>
//             <option value="cash">Cash</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Booking Type</label>
//           <select
//             name="bookingType"
//             value={formData.bookingType}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="single">Single</option>
//             <option value="recurring">Recurring</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g., Please arrange vegan food"
//           />
//         </div>

//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {success && <p className="text-green-500 mb-4">{success}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? 'Booking...' : 'Book Now'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;


// import React, { useState, useEffect, FormEvent } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// interface BookingRequest {
//   slotInfo: string[];
//   paymentMode: string;
//   bookingType: string;
//   remarks: string;
// }

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string;
//   serviceId: number;
//   bookedByUserId: number | null;
//   start: string;
//   end: string;
// }

// interface BookingResponse {
//   bookingId: string;
//   bookingStatus: string;
//   bookingAmount: number;
//   slotInfo: string[];
//   doctorName?: string;
//   translatorName?: string;
//   physioName?: string;
//   labtestName?: string;
//   spaName?: string;
//   chefName?: string;
// }

// const serviceTypes = ['chef', 'physio', 'translator', 'spa', 'labtests'];

// const BookingForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<{ id: string; userName: string } | null>(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (err) {
//       console.error('Error parsing user from localStorage:', err);
//       return null;
//     }
//   });
//   const [formData, setFormData] = useState<BookingRequest>({
//     slotInfo: [],
//     paymentMode: 'online',
//     bookingType: 'single',
//     remarks: '',
//   });
//   const [serviceType, setServiceType] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [response, setResponse] = useState<BookingResponse | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
//   const [slotsError, setSlotsError] = useState<string | null>(null);
//   const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
//   const [logoError, setLogoError] = useState<boolean>(false);

//   useEffect(() => {
//     if (!serviceType) return;

//     const fetchSlots = async () => {
//       setSlotsLoading(true);
//       setSlotsError(null);
//       setSelectedSlotIds([]);
//       setSlots([]);
//       setFormData((prev) => ({ ...prev, slotInfo: [] }));
//       try {
//         const response = await fetch(`http://localhost:8080/api/services/slots/${serviceType}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: { id: number; slotTime: string; bookingStatus: string; serviceType: string; serviceId: number; bookedByUserId: number | null }[] = await response.json();

//         const formattedSlots = data
//           .filter((slot) => slot.bookingStatus === 'AVAILABLE')
//           .map((slot) => {
//             const [startTime, endTime] = slot.slotTime.split(' - ');
//             const date = '2025-06-09';
//             const start = new Date(`${date} ${startTime}`).toISOString();
//             const end = new Date(`${date} ${endTime}`).toISOString();
//             return { ...slot, start, end };
//           });
//         setSlots(formattedSlots);
//       } catch (err) {
//         setSlotsError(err instanceof Error ? err.message : 'Failed to fetch slots');
//       } finally {
//         setSlotsLoading(false);
//       }
//     };
//     fetchSlots();
//   }, [serviceType]);

//   const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setServiceType(e.target.value);
//     setSelectedSlotIds([]);
//     setFormData((prev) => ({ ...prev, slotInfo: [] }));
//   };

//   const handleSlotToggle = (slotId: string) => {
//     const isSelected = selectedSlotIds.includes(slotId);
//     let updatedSlotIds: string[];
//     if (isSelected) {
//       updatedSlotIds = selectedSlotIds.filter((id) => id !== slotId);
//     } else {
//       updatedSlotIds = [...selectedSlotIds, slotId];
//     }
//     setSelectedSlotIds(updatedSlotIds);
//     const selectedSlots = slots.filter((slot) => updatedSlotIds.includes(slot.id.toString()));
//     const slotInfo = selectedSlots.flatMap((slot) => [slot.start, slot.end]);
//     setFormData((prev) => ({ ...prev, slotInfo }));
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!serviceType) {
//       setError('Please select a service type');
//       return;
//     }
//     if (selectedSlotIds.length === 0) {
//       setError('Please select at least one slot');
//       return;
//     }
//     if (!user) {
//       setError('User not logged in');
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setResponse(null);

//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/bookings/book/witout-servId/${user.id}/${serviceType}`,
//         formData,
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       setResponse(response.data);
//       setFormData({
//         slotInfo: [],
//         paymentMode: 'online',
//         bookingType: 'single',
//         remarks: '',
//       });
//       setSelectedSlotIds([]);
//       const responseSlots = await fetch(`http://localhost:8080/api/services/slots/${serviceType}`);
//       const data = await responseSlots.json();
//       const formattedSlots = data
//         .filter((slot: any) => slot.bookingStatus === 'AVAILABLE')
//         .map((slot: any) => {
//           const [startTime, endTime] = slot.slotTime.split(' - ');
//           const date = '2025-06-09';
//           const start = new Date(`${date} ${startTime}`).toISOString();
//           const end = new Date(`${date} ${endTime}`).toISOString();
//           return { ...slot, start, end };
//         });
//       setSlots(formattedSlots);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6"
//     >
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center justify-between"
//         >
//           <div className="flex items-center space-x-3">
//             {logoError ? (
//               <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
//                 Logo
//               </div>
//             ) : (
//               <img
//                 src="https://placehold.co/40x40?text=Logo"
//                 alt="Logo"
//                 className="w-10 h-10 rounded-full"
//                 onError={() => setLogoError(true)}
//               />
//             )}
//             <h2 className="text-xl font-semibold text-indigo-700">Service Booking</h2>
//           </div>
//           {user && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
//             >
//               Logout
//             </motion.button>
//           )}
//         </motion.header>

//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center text-indigo-700"
//         >
//           Book Your Service
//         </motion.h1>

//         <AnimatePresence>
//           {!user ? (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="p-6 bg-amber-100 rounded-lg text-center space-y-4"
//             >
//               <p className="text-amber-900 font-medium">Please log in to book a service.</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/login')}
//                 className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200"
//               >
//                 Go to Login
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="space-y-6"
//             >
//               <div className="text-sm text-gray-600 text-center">
//                 Logged in as: <span className="font-semibold text-indigo-700">{user.userName}</span> (ID: {user.id})
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Service Type</label>
//                   <select
//                     value={serviceType}
//                     onChange={handleServiceTypeChange}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     required
//                   >
//                     <option value="" disabled>Select Type</option>
//                     {serviceTypes.map((type) => (
//                       <option key={type} value={type}>
//                         {type.charAt(0).toUpperCase() + type.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </motion.div>

//                 {serviceType && (
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Available Slots</label>
//                     {slotsLoading ? (
//                       <div className="flex items-center space-x-2 text-gray-600">
//                         <svg
//                           className="animate-spin h-5 w-5 text-indigo-500"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                         </svg>
//                         <span>Loading slots...</span>
//                       </div>
//                     ) : slotsError ? (
//                       <p className="text-red-600 text-sm">{slotsError}</p>
//                     ) : slots.length === 0 ? (
//                       <p className="text-gray-600 text-sm">No available slots for this service.</p>
//                     ) : (
//                       <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 space-y-2">
//                         <div className="flex items-center">
//                           <input
//                             type="checkbox"
//                             checked={selectedSlotIds.length === slots.length}
//                             onChange={() => {
//                               if (selectedSlotIds.length === slots.length) {
//                                 setSelectedSlotIds([]);
//                                 setFormData((prev) => ({ ...prev, slotInfo: [] }));
//                               } else {
//                                 const allSlotIds = slots.map((slot) => slot.id.toString());
//                                 setSelectedSlotIds(allSlotIds);
//                                 const slotInfo = slots.flatMap((slot) => [slot.start, slot.end]);
//                                 setFormData((prev) => ({ ...prev, slotInfo }));
//                               }
//                             }}
//                             className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                           />
//                           <label className="text-sm font-medium text-gray-700">Select All</label>
//                         </div>
//                         {slots.map((slot) => (
//                           <div key={slot.id} className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={selectedSlotIds.includes(slot.id.toString())}
//                               onChange={() => handleSlotToggle(slot.id.toString())}
//                               className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                             />
//                             <label className="text-sm text-gray-800">
//                               {new Date(slot.start).toLocaleTimeString([], {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                               })}{' '}
//                               -{' '}
//                               {new Date(slot.end).toLocaleTimeString([], {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                               })}{' '}
//                               ({new Date(slot.start).toLocaleDateString()})
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     {selectedSlotIds.length > 0 && (
//                       <div className="mt-2">
//                         <p className="text-sm font-medium text-gray-700">Selected Slots:</p>
//                         {selectedSlotIds.map((slotId) => {
//                           const slot = slots.find((s) => s.id.toString() === slotId);
//                           return (
//                             slot && (
//                               <p key={slotId} className="text-sm text-gray-600">
//                                 {new Date(slot.start).toLocaleTimeString([], {
//                                   hour: '2-digit',
//                                   minute: '2-digit',
//                                 })}{' '}
//                                 -{' '}
//                                 {new Date(slot.end).toLocaleTimeString([], {
//                                   hour: '2-digit',
//                                   minute: '2-digit',
//                                 })}{' '}
//                                 ({new Date(slot.start).toLocaleDateString()})
//                               </p>
//                             )
//                           );
//                         })}
//                       </div>
//                     )}
//                   </motion.div>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
//                     <select
//                       name="paymentMode"
//                       value={formData.paymentMode}
//                       onChange={handleInputChange}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     >
//                       <option value="online">Online</option>
//                       <option value="cash">Cash</option>
//                     </select>
//                   </motion.div>
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                     className="space-y-2"
//                   >
//                     <label className="block text-sm font-medium text-gray-700">Booking Type</label>
//                     <select
//                       name="bookingType"
//                       value={formData.bookingType}
//                       onChange={handleInputChange}
//                       className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     >
//                       <option value="single">Single</option>
//                       <option value="recurring">Recurring</option>
//                     </select>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ duration: 0.2 }}
//                   className="space-y-2"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Remarks</label>
//                   <textarea
//                     name="remarks"
//                     value={formData.remarks}
//                     onChange={handleInputChange}
//                     rows={4}
//                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
//                     placeholder="Optional remarks..."
//                   />
//                 </motion.div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   disabled={loading || slotsLoading || !serviceType || selectedSlotIds.length === 0}
//                   className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                 >
//                   {loading ? (
//                     <>
//                       <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
//                       </svg>
//                       <span>Booking...</span>
//                     </>
//                   ) : (
//                     <span>Confirm Booking</span>
//                   )}
//                 </motion.button>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="p-4 bg-red-100 text-red-800 rounded-lg"
//             >
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {response && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//               className="p-6 bg-green-100 rounded-lg text-green-800 space-y-3"
//             >
//               <h2 className="text-xl font-semibold text-green-900">Booking Confirmed!</h2>
//               <p><strong>Booking ID:</strong> {response.bookingId}</p>
//               <p><strong>Service:</strong> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
//               <p><strong>Status:</strong> {response.bookingStatus}</p>
//               <p><strong>Amount:</strong> ₹{response.bookingAmount}</p>
//               <p>
//                 <strong>Slots:</strong>{' '}
//                 {response.slotInfo
//                   .reduce((acc: string[][], curr, index) => {
//                     if (index % 2 === 0) acc.push([curr]);
//                     else acc[acc.length - 1].push(curr);
//                     return acc;
//                   }, [])
//                   .map(([start, end], index) => (
//                     <span key={index}>
//                       {new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
//                       {new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       {index < response.slotInfo.length / 2 - 1 ? ', ' : ''}
//                     </span>
//                   ))}
//               </p>
//               {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
//               {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
//               {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
//               {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
//               {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
//               {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default BookingForm;


import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface BookingRequest {
  serviceTypesMultiple: string[];
  slotInfo: string[];
  paymentMode: string;
  bookingType: string;
  additionalRemarks: string;
}

interface Slot {
  id: number;
  slotTime: string;
  bookingStatus: string;
  serviceType: string;
  serviceId: number;
  bookedByUserId: number | null;
  start: string;
  end: string;
}

interface BookingResponse {
  bookingId: string;
  bookingStatus: string;
  bookingAmount: number;
  slotInfo: string[];
  doctorName?: string;
  translatorName?: string;
  physioName?: string;
  labtestName?: string;
  spaName?: string;
  chefName?: string;
}

const serviceTypes = ['chef', 'physio', 'translator', 'spa', 'labtests', 'doctor'];

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ id: string; userName: string } | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
      return null;
    }
  });
  const [formData, setFormData] = useState<BookingRequest>({
    serviceTypesMultiple: [],
    slotInfo: [],
    paymentMode: 'online',
    bookingType: 'premium',
    additionalRemarks: '',
  });
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<BookingResponse | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [logoError, setLogoError] = useState<boolean>(false);

  useEffect(() => {
    if (selectedServiceTypes.length === 0) {
      setSlots([]);
      setSelectedSlotIds([]);
      setFormData((prev) => ({ ...prev, slotInfo: [] }));
      return;
    }

    const fetchSlots = async () => {
      setSlotsLoading(true);
      setSlotsError(null);
      setSelectedSlotIds([]);
      setSlots([]);
      setFormData((prev) => ({ ...prev, slotInfo: [] }));
      try {
        const slotPromises = selectedServiceTypes.map((serviceType) =>
          fetch(`https://healthtourism-5.onrender.com/api/services/slots/${serviceType}`).then((res) => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json().then((data) => ({ serviceType, data }));
          })
        );
        const results = await Promise.all(slotPromises);
        const formattedSlots = results
          .flatMap(({ serviceType, data }) =>
            data
              .filter((slot: any) => slot.bookingStatus === 'AVAILABLE')
              .map((slot: any) => {
                const [startTime, endTime] = slot.slotTime.split(' - ');
                const date = '2025-06-15';
                const start = new Date(`${date} ${startTime}`).toISOString();
                const end = new Date(`${date} ${endTime}`).toISOString();
                return { ...slot, start, end, serviceType };
              })
          )
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        setSlots(formattedSlots);
      } catch (err) {
        setSlotsError(err instanceof Error ? err.message : 'Failed to fetch slots');
      } finally {
        setSlotsLoading(false);
      }
    };
    fetchSlots();
  }, [selectedServiceTypes]);

  const handleClearServices = () => {
    setSelectedServiceTypes([]);
    setSelectedSlotIds([]);
    setSlots([]);
    setFormData((prev) => ({ ...prev, serviceTypesMultiple: [], slotInfo: [] }));
  };

  const handleSlotToggle = (slotId: string) => {
    const isSelected = selectedSlotIds.includes(slotId);
    let updatedSlotIds: string[];
    if (isSelected) {
      updatedSlotIds = selectedSlotIds.filter((id) => id !== slotId);
    } else {
      updatedSlotIds = [...selectedSlotIds, slotId];
    }
    setSelectedSlotIds(updatedSlotIds);
    const selectedSlots = slots.filter((slot) => updatedSlotIds.includes(slot.id.toString()));
    const slotInfo = selectedSlots.map((slot) => slot.start);
    setFormData((prev) => ({ ...prev, slotInfo }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedServiceTypes.length === 0) {
      setError('Please select at least one service type');
      return;
    }
    if (selectedSlotIds.length === 0) {
      setError('Please select at least one slot');
      return;
    }
    const selectedServicesWithSlots = new Set(
      slots
        .filter((slot) => selectedSlotIds.includes(slot.id.toString()))
        .map((slot) => slot.serviceType)
    );
    const missingServices = selectedServiceTypes.filter(
      (service) => !selectedServicesWithSlots.has(service)
    );
    if (missingServices.length > 0) {
      setError(`Please select at least one slot for: ${missingServices.join(', ')}`);
      return;
    }
    if (!user) {
      setError('User not logged in');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post(
        `https://healthtourism-5.onrender.com/api/bookings/multiple/${user.id}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      setResponse(response.data);
      setFormData({
        serviceTypesMultiple: [],
        slotInfo: [],
        paymentMode: 'online',
        bookingType: 'premium',
        additionalRemarks: '',
      });
      setSelectedServiceTypes([]);
      setSelectedSlotIds([]);
      setSlots([]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const slotsByService = slots.reduce((acc, slot) => {
    if (!acc[slot.serviceType]) {
      acc[slot.serviceType] = [];
    }
    acc[slot.serviceType].push(slot);
    return acc;
  }, {} as Record<string, Slot[]>);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            {logoError ? (
              <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                Logo
              </div>
            ) : (
              <img
                src="https://placehold.co/40x40?text=Logo"
                alt="Logo"
                className="w-10 h-10 rounded-full"
                onError={() => setLogoError(true)}
              />
            )}
            <h2 className="text-xl font-semibold text-indigo-700">Service Booking</h2>
          </div>
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </motion.button>
          )}
        </motion.header>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-indigo-700"
        >
          Book Your Services
        </motion.h1>

        <AnimatePresence>
          {!user ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-amber-100 rounded-lg text-center space-y-4"
            >
              <p className="text-amber-900 font-medium">Please log in to book a service.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200"
              >
                Go to Login
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="text-sm text-gray-600 text-center">
                Logged in as: <span className="font-semibold text-indigo-700">{user.userName}</span> (ID: {user.id})
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700">Service Types</label>
                  <p className="text-xs text-gray-500">Select one or more services</p>
                  <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 space-y-2">
                    {serviceTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          value={type}
                          checked={selectedServiceTypes.includes(type)}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            setSelectedServiceTypes((prev) =>
                              checked ? [...prev, value] : prev.filter((t) => t !== value)
                            );
                            setFormData((prev) => ({
                              ...prev,
                              serviceTypesMultiple: checked
                                ? [...prev.serviceTypesMultiple, value]
                                : prev.serviceTypesMultiple.filter((t) => t !== value),
                            }));
                          }}
                          className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label className="text-sm text-gray-800">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {selectedServiceTypes.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Selected:{' '}
                        {selectedServiceTypes
                          .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
                          .join(', ')}
                      </p>
                    )}
                    {selectedServiceTypes.length > 0 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearServices}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Clear Selection
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {selectedServiceTypes.length > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700">Available Slots</label>
                    {slotsLoading ? (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <svg
                          className="animate-spin h-5 w-5 text-indigo-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Loading slots...</span>
                      </div>
                    ) : slotsError ? (
                      <p className="text-red-600 text-sm">{slotsError}</p>
                    ) : slots.length === 0 ? (
                      <p className="text-gray-600 text-sm">No available slots for selected services.</p>
                    ) : (
                      <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 space-y-4">
                        {Object.entries(slotsByService).map(([serviceType, serviceSlots]) => (
                          <div key={serviceType}>
                            <h3 className="text-sm font-semibold text-gray-800">
                              {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
                            </h3>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={serviceSlots.every((slot) => selectedSlotIds.includes(slot.id.toString()))}
                                  onChange={() => {
                                    const serviceSlotIds = serviceSlots.map((slot) => slot.id.toString());
                                    if (serviceSlots.every((slot) => selectedSlotIds.includes(slot.id.toString()))) {
                                      setSelectedSlotIds((prev) => prev.filter((id) => !serviceSlotIds.includes(id)));
                                      setFormData((prev) => ({
                                        ...prev,
                                        slotInfo: slots
                                          .filter((slot) => prev.filter((id) => !serviceSlotIds.includes(id)).includes(slot.id.toString()))
                                          .map((slot) => slot.start),
                                      }));
                                    } else {
                                      const newSlotIds = [...new Set([...selectedSlotIds, ...serviceSlotIds])];
                                      setSelectedSlotIds(newSlotIds);
                                      setFormData((prev) => ({
                                        ...prev,
                                        slotInfo: slots
                                          .filter((slot) => newSlotIds.includes(slot.id.toString()))
                                          .map((slot) => slot.start),
                                      }));
                                    }
                                  }}
                                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label className="text-sm font-medium text-gray-700">
                                  Select All {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Slots
                                </label>
                              </div>
                              {serviceSlots.map((slot) => (
                                <div key={slot.id} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedSlotIds.includes(slot.id.toString())}
                                    onChange={() => handleSlotToggle(slot.id.toString())}
                                    className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label className="text-sm text-gray-800">
                                    {new Date(slot.start).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}{' '}
                                    -{' '}
                                    {new Date(slot.end).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}{' '}
                                    ({new Date(slot.start).toLocaleDateString()})
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedSlotIds.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Selected Slots:</p>
                        {Object.entries(
                          selectedSlotIds.reduce((acc, slotId) => {
                            const slot = slots.find((s) => s.id.toString() === slotId);
                            if (slot) {
                              if (!acc[slot.serviceType]) {
                                acc[slot.serviceType] = [];
                              }
                              acc[slot.serviceType].push(slot);
                            }
                            return acc;
                          }, {} as Record<string, Slot[]>)
                        ).map(([serviceType, serviceSlots]) => (
                          <div key={serviceType} className="mt-1">
                            <p className="text-sm font-semibold text-gray-800">
                              {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
                            </p>
                            {serviceSlots.map((slot) => (
                              <p key={slot.id} className="text-sm text-gray-600">
                                {new Date(slot.start).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}{' '}
                                -{' '}
                                {new Date(slot.end).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}{' '}
                                ({new Date(slot.start).toLocaleDateString()})
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                    <select
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                    >
                      <option value="online">Online</option>
                      <option value="cash">Cash</option>
                    </select>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700">Booking Type</label>
                    <select
                      name="bookingType"
                      value={formData.bookingType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                    >
                      <option value="premium">Premium</option>
                      <option value="single">Single</option>
                      <option value="recurring">Recurring</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700">Additional Remarks</label>
                  <textarea
                    name="additionalRemarks"
                    value={formData.additionalRemarks}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                    placeholder="Optional remarks..."
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading || slotsLoading || selectedServiceTypes.length === 0 || selectedSlotIds.length === 0}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-red-100 text-red-800 rounded-lg"
            >
              <p>{error}</p>
            </motion.div>
          )}

          {response && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-green-100 rounded-lg text-green-800 space-y-3"
            >
              <h2 className="text-xl font-semibold text-green-900">Booking Confirmed!</h2>
              <p><strong>Booking ID:</strong> {response.bookingId}</p>
              <p><strong>Services:</strong> {formData.serviceTypesMultiple.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</p>
              <p><strong>Status:</strong> {response.bookingStatus}</p>
              <p><strong>Amount:</strong> ₹{response.bookingAmount}</p>
              <p>
                <strong>Slots:</strong>{' '}
                {response.slotInfo.map((start, index) => (
                  <span key={index}>
                    {new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {index < response.slotInfo.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
              {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
              {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
              {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
              {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
              {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BookingForm;