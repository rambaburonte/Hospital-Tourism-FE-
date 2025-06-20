// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config/config";

// const BookingPage = () => {
//   const { serviceType, id } = useParams(); // e.g., chef & 5
//   const navigate = useNavigate();

//   // ✅ Get logged-in user from localStorage
//   const userData = JSON.parse(localStorage.getItem("user") || "{}");
//   console.log('BookingPage: Raw userData from localStorage:', userData);
//   const userId = userData?.id || userData?.userId; // Prioritize 'id', then 'userId'
//   console.log('BookingPage: Assigned userId:', userId);

//   const [formData, setFormData] = useState({
//     bookingStartTime: "",
//     bookingEndTime: "",
//     paymentMode: "ONLINE",
  
//     bookingAmount: 0,
//     additionalRemarks: "",
//   });

//   const [basePrice, setBasePrice] = useState(0);
//   const [message, setMessage] = useState("");
//   const [serviceName, setServiceName] = useState("");
//   const [specialty, setSpecialty] = useState(""); // New state for specialty
//   const [serviceDetails, setServiceDetails] = useState<any>(null); // New state for full service details
//   const [endTimeError, setEndTimeError] = useState<string | null>(null); // New state for end time error

//   const serviceApiMap = {
//     chef: `/api/chefs/chef-By/Id/${id}`,
//     translator: `/api/translators/getone/${id}`,
//     spa: `/spaServices/spa/${id}`,
//     doctor: `/api/doctors/By/${id}`,
//     physio: `/physio/get/${id}`,
//   };

//   const serviceIdFieldMap = {
//     chef: "chefId",
//     translator: "translatorId",
//     spa: "spaId",
//     doctor: "doctorId",
//     physio: "physioId",
//   };

//   // ✅ Fetch base price, service name, and specialty
//   useEffect(() => {
//     const fetchPrice = async () => {
//       const apiPath = serviceApiMap[serviceType];
//       if (!apiPath) return;

//       try {
//         const res = await axios.get(`${BASE_URL}${apiPath}`);
//         const data = res.data;
//         setServiceDetails(data); // Save the entire data object

//         if (serviceType === "doctor") {
//           setBasePrice(0); // Doctors might have a fixed consultation fee or no base price for duration
//           setServiceName(data?.doctorName || "Doctor");
//           setSpecialty(data?.speciality || ""); // Doctors can also have specialties
//         } else {
//           setBasePrice(data?.price || 0);
//           let name = "";
//           let fetchedSpecialty = "";
//           switch (serviceType) {
//             case "chef":
//               name = data?.chefName;
//               fetchedSpecialty = data?.speciality || "";
//               break;
//             case "translator":
//               name = data?.translatorName;
//               break;
//             case "spa":
//               name = data?.spaServiceName;
//               break;
//             case "physio":
//               name = data?.physioName;
//               break;
//             default:
//               name = "Service";
//           }
//           setServiceName(name || "Service");
//           setSpecialty(fetchedSpecialty);
//         }
//       } catch (err) {
//         console.error("❌ Failed to load price", err);
//         setMessage("❌ Failed to load service details.");
//       }
//     };

//     fetchPrice();
//   }, [serviceType, id]);

//   // ✅ Calculate booking amount with discount
//   useEffect(() => {
//     if (
//       formData.bookingStartTime &&
//       formData.bookingEndTime &&
//       basePrice > 0 &&
//       serviceType !== "doctor"
//     ) {
//       const start = new Date(formData.bookingStartTime);
//       const end = new Date(formData.bookingEndTime);
//       const durationInMs = end.getTime() - start.getTime();

//       // Calculate duration in days, ensuring at least 1 day
//       const durationInDays = Math.max(Math.ceil(durationInMs / (1000 * 60 * 60 * 24)), 1);

//       let total = basePrice;
//       if (durationInDays > 1) {
//         // Apply 10% discount for each additional day
//         total += (durationInDays - 1) * (basePrice * 0.9);
//       }

//       setFormData((prev) => ({
//         ...prev,
//         bookingAmount: total,
//       }));
//     } else if (serviceType === "doctor") {
//       setFormData((prev) => ({
//         ...prev,
//         bookingAmount: 0, // Doctors might have a fixed consultation fee, set to 0 for now or handle separately
//       }));
//     }
//   }, [formData.bookingStartTime, formData.bookingEndTime, basePrice, serviceType]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = {
//         ...prev,
//         [name]: value,
//       };

//       if (name === "bookingEndTime" || name === "bookingStartTime") {
//         const startTime = new Date(newFormData.bookingStartTime);
//         const endTime = new Date(newFormData.bookingEndTime);

//         if (newFormData.bookingStartTime && newFormData.bookingEndTime && endTime < startTime) {
//           setEndTimeError("End time cannot be before start time");
//         } else {
//           setEndTimeError(null);
//         }
//       }
//       return newFormData;
//     });
//   };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();

//     const serviceIdField = serviceIdFieldMap[serviceType];
//     if (!serviceIdField || !id) {
//       setMessage("❌ Invalid service or ID.");
//       return;
//     }

//     // Construct the payload for the API
//     const payload = {
//       bookingStartTime: formData.bookingStartTime,
//       bookingEndTime: formData.bookingEndTime,
//       paymentMode: formData.paymentMode,
//       bookingType: formData.bookingType,
//       bookingAmount: formData.bookingAmount,
//       additionalRemarks: formData.additionalRemarks,
//       [serviceIdField]: parseInt(id), // e.g., chefId, doctorId, etc.
//     };

//     try {
//       const response = await axios.post(
       
//         `${BASE_URL}/api/AddToCart/addToCart/${userId}/${serviceType}`,
//         payload
        
//       );
//       setMessage("✅ Added to cart successfully!");
//       setTimeout(() => {
//         navigate("/", { state: { scrollToAppointment: true }, replace: true }); // Navigate to home page and indicate scrolling to appointment section
//       }, 2000);
//     } catch (error) {
//       console.error("Error adding to cart", error);
//       setMessage("❌ Failed to add to cart.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg pb-10">
//       <h2 className="text-2xl font-bold mb-2 text-center capitalize">
//         Book {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
//       </h2>

//       <div className="text-center mb-6 text-gray-700">
//         <p className="text-xl font-semibold">{serviceName}</p>
//         {specialty && serviceType === 'chef' && (
//           <p className="text-md">Specialty: {specialty}</p>
//         )}
//         {basePrice > 0 && serviceType !== "doctor" && (
//           <p className="text-md">Base Rate: ₹{basePrice} per day</p>
//         )}

//         {serviceType === 'chef' && serviceDetails && (
//           <div className="mt-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] transform border border-gray-100 relative overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//             <div className="relative z-10">
//               <h4 className="font-bold text-xl mb-3 text-gray-900">Chef Details:</h4>
//               {serviceDetails.chefImage && (
//                 <img src={serviceDetails.chefImage} alt="Chef" className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 shadow-md transition-transform duration-300 group-hover:scale-105" />
//               )}
//               {serviceDetails.chefDescription && (
//                 <p className="text-sm text-gray-700 leading-relaxed text-center">{serviceDetails.chefDescription}</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleAddToCart} className="space-y-4">
//         <div>
//           <label htmlFor="bookingStartTime" className="block text-sm font-medium text-gray-700">Start Time</label>
//           <input
//             type="datetime-local"
//             name="bookingStartTime"
//             id="bookingStartTime"
//             value={formData.bookingStartTime}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-blue-500 hover:shadow-md"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="bookingEndTime" className="block text-sm font-medium text-gray-700">End Time</label>
//           {endTimeError && <p className="text-red-500 text-xs mt-1">{endTimeError}</p>}
//           <input
//             type="datetime-local"
//             name="bookingEndTime"
//             id="bookingEndTime"
//             value={formData.bookingEndTime}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-blue-500 hover:shadow-md"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="additionalRemarks" className="block text-sm font-medium text-gray-700">Remarks (optional)</label>
//           <textarea
//             name="additionalRemarks"
//             id="additionalRemarks"
//             value={formData.additionalRemarks}
//             onChange={handleChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-blue-500 hover:shadow-md"
//             placeholder="Any special requests or notes"
//           />
//         </div>

//         <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 rounded">
//           <p className="font-semibold">Estimated Total: ₹{formData.bookingAmount.toFixed(2)}</p>
//           {formData.bookingStartTime && formData.bookingEndTime && (
//             <p className="text-sm">
//               Duration: {(() => {
//                 const start = new Date(formData.bookingStartTime);
//                 const end = new Date(formData.bookingEndTime);
//                 const diffMs = end.getTime() - start.getTime();
                
//                 if (diffMs <= 0) return "Invalid duration";

//                 const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//                 const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//                 const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//                 let durationText = [];
//                 if (diffDays > 0) durationText.push(`${diffDays} day${diffDays > 1 ? 's' : ''}`);
//                 if (diffHours > 0) durationText.push(`${diffHours} hour${diffHours > 1 ? 's' : ''}`);
//                 if (diffMinutes > 0) durationText.push(`${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`);
                
//                 return durationText.join(', ') || 'Less than a minute';
//               })()}
//             </p>
//           )}
//           {basePrice > 0 && serviceType !== "doctor" && (
//             <p className="text-sm">Daily Rate: ₹{basePrice} (10% off for additional days)</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 hover:shadow-lg hover:scale-105 transform"
//         >
//           Add to Cart ₹{formData.bookingAmount.toFixed(2)}
//         </button>
//       </form>

//       {message && (
//         <p className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BookingPage;


// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config/config";

// // Define the Patient interface
// interface Patient {
//   id: number;
//   name: string;
//   email: string;
//   country: string;
//   mobilenum: number;
//   profile_picture_url?: string;
//   prescription_url?: string | null;
//   patientaxrays_url?: string | null;
//   patientreports_url?: string | null;
//   address?: string;
//   password?: string;
//   role?: string;
//   email_verified?: boolean;
//   verification_token?: string | null;
//   package_booking_id?: number | null;
//   booking_ids?: number[] | null;
// }

// const BookingPage = () => {
//   const { serviceType, id } = useParams();
//   const navigate = useNavigate();

//   // Get logged-in user from localStorage
//   const userData = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = userData?.id || userData?.userId;

//   // State for booking form
//   const [formData, setFormData] = useState({
//     bookingStartTime: "",
//     bookingEndTime: "",
//     paymentMode: "", // No default value
//     bookingAmount: 0,
//     additionalRemarks: "",
//   });

//   // State for service and profile
//   const [basePrice, setBasePrice] = useState(0);
//   const [message, setMessage] = useState("");
//   const [serviceName, setServiceName] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [serviceDetails, setServiceDetails] = useState<any>(null);
//   const [endTimeError, setEndTimeError] = useState<string | null>(null);
//   const [patient, setPatient] = useState<Patient | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [profileLoading, setProfileLoading] = useState<boolean>(false);

//   const serviceApiMap = {
//     chef: `/api/chefs/chef-By/Id/${id}`,
//     translator: `/api/translators/getone/${id}`,
//     spa: `/spaServices/spa/${id}`,
//     doctor: `/api/doctors/By/${id}`,
//     physio: `/physio/get/${id}`,
//   };

//   const serviceIdFieldMap = {
//     chef: "chefId",
//     translator: "translatorId",
//     spa: "spaId",
//     doctor: "doctorId",
//     physio: "physioId",
//   };

//   // Fetch profile data
//   useEffect(() => {
//     if (userId) {
//       const fetchPatient = async () => {
//         try {
//           setProfileLoading(true);
//           const response = await axios.get<Patient>(`${BASE_URL}/user/get-patients/${userId}`);
//           setPatient(response.data);
//         } catch (error) {
//           setMessage("❌ Failed to load profile data.");
//           console.error(error);
//         } finally {
//           setProfileLoading(false);
//         }
//       };
//       fetchPatient();
//     } else {
//       setMessage("❌ Please log in to view your profile.");
//     }
//   }, [userId]);

//   // Fetch service details
//   useEffect(() => {
//     const fetchPrice = async () => {
//       const apiPath = serviceApiMap[serviceType];
//       if (!apiPath) return;

//       try {
//         const res = await axios.get(`${BASE_URL}${apiPath}`);
//         const data = res.data;
//         setServiceDetails(data);

//         if (serviceType === "doctor") {
//           setBasePrice(0);
//           setServiceName(data?.doctorName || "Doctor");
//           setSpecialty(data?.speciality || "");
//         } else {
//           setBasePrice(data?.price || 0);
//           let name = "";
//           let fetchedSpecialty = "";
//           switch (serviceType) {
//             case "chef":
//               name = data?.chefName;
//               fetchedSpecialty = data?.speciality || "";
//               break;
//             case "translator":
//               name = data?.translatorName;
//               break;
//             case "spa":
//               name = data?.spaServiceName;
//               break;
//             case "physio":
//               name = data?.physioName;
//               break;
//             default:
//               name = "Service";
//           }
//           setServiceName(name || "Service");
//           setSpecialty(fetchedSpecialty);
//         }
//       } catch (err) {
//         console.error("❌ Failed to load price", err);
//         setMessage("❌ Failed to load service details.");
//       }
//     };

//     fetchPrice();
//   }, [serviceType, id]);

//   // Calculate booking amount with discount
//   useEffect(() => {
//     if (
//       formData.bookingStartTime &&
//       formData.bookingEndTime &&
//       basePrice > 0 &&
//       serviceType !== "doctor"
//     ) {
//       const start = new Date(formData.bookingStartTime);
//       const end = new Date(formData.bookingEndTime);
//       const durationInMs = end.getTime() - start.getTime();

//       const durationInDays = Math.max(Math.ceil(durationInMs / (1000 * 60 * 60 * 24)), 1);

//       let total = basePrice;
//       if (durationInDays > 1) {
//         total += (durationInDays - 1) * (basePrice * 0.9);
//       }

//       setFormData((prev) => ({
//         ...prev,
//         bookingAmount: total,
//       }));
//     } else if (serviceType === "doctor") {
//       setFormData((prev) => ({
//         ...prev,
//         bookingAmount: 0,
//       }));
//     }
//   }, [formData.bookingStartTime, formData.bookingEndTime, basePrice, serviceType]);

//   // Handle form input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = {
//         ...prev,
//         [name]: value,
//       };

//       if (name === "bookingEndTime" || name === "bookingStartTime") {
//         const startTime = new Date(newFormData.bookingStartTime);
//         const endTime = new Date(newFormData.bookingEndTime);

//         if (newFormData.bookingStartTime && newFormData.bookingEndTime && endTime < startTime) {
//           setEndTimeError("End time cannot be before start time");
//         } else {
//           setEndTimeError(null);
//         }
//       }
//       return newFormData;
//     });
//   };

//   // Handle profile picture selection
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const selectedFile = event.target.files[0];
//       if (!selectedFile.type.startsWith('image/')) {
//         setMessage('❌ Please select an image file (e.g., PNG, JPEG).');
//         return;
//       }
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         setMessage('❌ File size exceeds 5MB limit.');
//         return;
//       }
//       setFile(selectedFile);
//       const filePreview = URL.createObjectURL(selectedFile);
//       setPreviewUrl(filePreview);
//       setMessage('');
//     }
//   };

//   // Clean up preview URL
//   useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   // Handle profile picture upload
//   const handleUpload = async () => {
//     if (!userId) {
//       setMessage('❌ Please log in to upload a profile picture.');
//       return;
//     }
//     if (!file) {
//       setMessage('❌ Please select an image to upload.');
//       return;
//     }

//     setProfileLoading(true);
//     const formData = new FormData();
//     formData.append('profilePicture', file);

//     try {
//       await axios.post(
//         `${BASE_URL}/user/upload-files/${userId}`,
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );
//       setMessage('✅ Profile picture uploaded successfully!');
//       setFile(null);
//       setPreviewUrl(null);
//       const response = await axios.get<Patient>(`${BASE_URL}/user/get-patients/${userId}`);
//       setPatient(response.data);
//     } catch (error) {
//       setMessage('❌ Failed to upload profile picture.');
//       console.error(error);
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   // Handle add to cart
//   const handleAddToCart = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const serviceIdField = serviceIdFieldMap[serviceType];
//     if (!serviceIdField || !id) {
//       setMessage("❌ Invalid service or ID.");
//       return;
//     }

//     if (!userId) {
//       setMessage("❌ Please log in to add to cart.");
//       return;
//     }

//     if (!formData.paymentMode) {
//       setMessage("❌ Please select a payment mode.");
//       return;
//     }

//     const payload = {
//       bookingStartTime: formData.bookingStartTime,
//       bookingEndTime: formData.bookingEndTime,
//       paymentMode: formData.paymentMode,
//       bookingAmount: formData.bookingAmount,
//       additionalRemarks: formData.additionalRemarks,
//       [serviceIdField]: parseInt(id),
//     };

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/AddToCart/addToCart/${userId}/${serviceType}`,
//         payload
//       );
//       setMessage("✅ Added to cart successfully!");
//       setTimeout(() => {
//         navigate("/", { state: { scrollToAppointment: true }, replace: true });
//       }, 2000);
//     } catch (error) {
//       console.error("Error adding to cart", error);
//       setMessage("❌ Failed to add to cart.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//           Book Your {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Service
//         </h1>

//         {message && (
//           <div className={`mb-6 p-4 rounded-md text-sm ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//             {message}
//           </div>
//         )}

//         <div className="bg-white shadow-lg rounded-xl p-8">
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-2">{serviceName}</h2>
//             {specialty && serviceType === 'chef' && (
//               <p className="text-gray-600">Specialty: {specialty}</p>
//             )}
//             {basePrice > 0 && serviceType !== "doctor" && (
//               <p className="text-gray-600">Base Rate: ₹{basePrice} per day</p>
//             )}

//             {serviceType === 'chef' && serviceDetails && (
//               <div className="mt-6 p-6 bg-gray-50 rounded-lg">
//                 <h3 className="font-semibold text-lg mb-4">About the Chef</h3>
//                 {serviceDetails.chefImage && (
//                   <img
//                     src={serviceDetails.chefImage}
//                     alt="Chef"
//                     className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
//                   />
//                 )}
//                 {serviceDetails.chefDescription && (
//                   <p className="text-gray-600 text-center">{serviceDetails.chefDescription}</p>
//                 )}
//               </div>
//             )}
//           </div>

//           <form onSubmit={handleAddToCart} className="space-y-6">
//             <div>
//               <label htmlFor="bookingStartTime" className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Date & Time
//               </label>
//               <input
//                 type="datetime-local"
//                 name="bookingStartTime"
//                 id="bookingStartTime"
//                 value={formData.bookingStartTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="bookingEndTime" className="block text-sm font-medium text-gray-700 mb-1">
//                 End Date & Time
//               </label>
//               {endTimeError && <p className="text-red-500 text-xs mt-1">{endTimeError}</p>}
//               <input
//                 type="datetime-local"
//                 name="bookingEndTime"
//                 id="bookingEndTime"
//                 value={formData.bookingStartTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-1">
//                 Payment Method
//               </label>
//               <select
//                 name="paymentMode"
//                 id="paymentMode"
//                 value={formData.paymentMode}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                 required
//               >
//                 <option value="">Select Payment Mode</option>
//                 <option value="ONLINE">Online</option>
//                 <option value="OFFLINE">Offline</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="additionalRemarks" className="block text-sm font-medium text-gray-700 mb-1">
//                 Additional Remarks (Optional)
//               </label>
//               <textarea
//                 name="additionalRemarks"
//                 id="additionalRemarks"
//                 value={formData.additionalRemarks}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                 placeholder="Any special requests or notes"
//                 rows={4}
//               />
//             </div>

//             <div className="bg-blue-50 p-4 rounded-md">
//               <p className="text-lg font-semibold text-blue-800">
//                 Estimated Total: ₹{formData.bookingAmount.toFixed(2)}
//               </p>
//               {formData.bookingStartTime && formData.bookingEndTime && (
//                 <p className="text-sm text-blue-600">
//                   Duration: {(() => {
//                     const start = new Date(formData.bookingStartTime);
//                     const end = new Date(formData.bookingEndTime);
//                     const diffMs = end.getTime() - start.getTime();
                    
//                     if (diffMs <= 0) return "Invalid duration";

//                     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//                     const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//                     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//                     let durationText = [];
//                     if (diffDays > 0) durationText.push(`${diffDays} day${diffDays > 1 ? 's' : ''}`);
//                     if (diffHours > 0) durationText.push(`${diffHours} hour${diffHours > 1 ? 's' : ''}`);
//                     if (diffMinutes > 0) durationText.push(`${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`);
                    
//                     return durationText.join(', ') || 'Less than a minute';
//                   })()}
//                 </p>
//               )}
//               {basePrice > 0 && serviceType !== "doctor" && (
//                 <p className="text-sm text-blue-600">Daily Rate: ₹{basePrice} (10% off for additional days)</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={endTimeError || profileLoading || !formData.paymentMode}
//               className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               Add to Cart (₹{formData.bookingAmount.toFixed(2)})
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

// Define the Patient interface
interface Patient {
  id: number;
  name: string;
  email: string;
  country: string;
  mobilenum: number;
  profile_picture_url?: string;
  prescription_url?: string | null;
  patientaxrays_url?: string | null;
  patientreports_url?: string | null;
  address?: string;
  password?: string;
  role?: string;
  email_verified?: boolean;
  verification_token?: string | null;
  package_booking_id?: number | null;
  booking_ids?: number[] | null;
}

const BookingPage = () => {
  const { serviceType, id } = useParams();
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData?.id || userData?.userId;

  // State for booking form
  const [formData, setFormData] = useState({
    bookingStartTime: "",
    bookingEndTime: "",
    paymentMode: "", // No default value
    bookingAmount: 0,
    additionalRemarks: "",
  });

  // State for service and profile
  const [basePrice, setBasePrice] = useState(0);
  const [message, setMessage] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [endTimeError, setEndTimeError] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [file, setFile] =  useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);

  const serviceApiMap = {
    chef: `/api/chefs/chef-By/Id/${id}`,
    translator: `/api/translators/getone/${id}`,
    spa: `/spaServices/spa/${id}`,
    doctor: `/api/doctors/By/${id}`,
    physio: `/physio/get/${id}`,
  };

  const serviceIdFieldMap = {
    chef: "chefId",
    translator: "translatorId",
    spa: "spaId",
    doctor: "doctorId",
    physio: "physioId",
  };

  // Fetch profile data
  useEffect(() => {
    if (userId) {
      const fetchPatient = async () => {
        try {
          setProfileLoading(true);
          const response = await axios.get<Patient>(`${BASE_URL}/user/get-patients/${userId}`);
          setPatient(response.data);
        } catch (error) {
          setMessage("❌ Failed to load profile data.");
          console.error(error);
        } finally {
          setProfileLoading(false);
        }
      };
      fetchPatient();
    } else {
      setMessage("❌ Please log in to view your profile.");
    }
  }, [userId]);

  // Fetch service details
  useEffect(() => {
    const fetchPrice = async () => {
      const apiPath = serviceApiMap[serviceType];
      if (!apiPath) return;

      try {
        const res = await axios.get(`${BASE_URL}${apiPath}`);
        const data = res.data;
        setServiceDetails(data);

        if (serviceType === "doctor") {
          setBasePrice(0);
          setServiceName(data?.doctorName || "Doctor");
          setSpecialty(data?.speciality || "");
        } else {
          setBasePrice(data?.price || 0);
          let name = "";
          let fetchedSpecialty = "";
          switch (serviceType) {
            case "chef":
              name = data?.chefName;
              fetchedSpecialty = data?.speciality || "";
              break;
            case "translator":
              name = data?.translatorName;
              break;
            case "spa":
              name = data?.spaServiceName;
              break;
            case "physio":
              name = data?.physioName;
              break;
            default:
              name = "Service";
          }
          setServiceName(name || "Service");
          setSpecialty(fetchedSpecialty);
        }
      } catch (err) {
        console.error("❌ Failed to load price", err);
        setMessage("❌ Failed to load service details.");
      }
    };

    fetchPrice();
  }, [serviceType, id]);

  // Calculate booking amount with discount
  useEffect(() => {
    if (
      formData.bookingStartTime &&
      formData.bookingEndTime &&
      basePrice > 0 &&
      serviceType !== "doctor"
    ) {
      const start = new Date(formData.bookingStartTime);
      const end = new Date(formData.bookingEndTime);
      const durationInMs = end.getTime() - start.getTime();

      const durationInDays = Math.max(Math.ceil(durationInMs / (1000 * 60 * 60 * 24)), 1);

      let total = basePrice;
      if (durationInDays > 1) {
        total += (durationInDays - 1) * (basePrice * 0.9);
      }

      setFormData((prev) => ({
        ...prev,
        bookingAmount: total,
      }));
    } else if (serviceType === "doctor") {
      setFormData((prev) => ({
        ...prev,
        bookingAmount: 0,
      }));
    }
  }, [formData.bookingStartTime, formData.bookingEndTime, basePrice, serviceType]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      };

      if (name === "bookingEndTime" || name === "bookingStartTime") {
        const startTime = new Date(newFormData.bookingStartTime);
        const endTime = new Date(newFormData.bookingEndTime);

        if (newFormData.bookingStartTime && newFormData.bookingEndTime && endTime < startTime) {
          setEndTimeError("End time cannot be before start time");
        } else {
          setEndTimeError(null);
        }
      }
      return newFormData;
    });
  };

  // Handle profile picture selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (!selectedFile.type.startsWith('image/')) {
        setMessage('❌ Please select an image file (e.g., PNG, JPEG).');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage('❌ File size exceeds 5MB limit.');
        return;
      }
      setFile(selectedFile);
      const filePreview = URL.createObjectURL(selectedFile);
      setPreviewUrl(filePreview);
      setMessage('');
    }
  };

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle profile picture upload
  const handleUpload = async () => {
    if (!userId) {
      setMessage('❌ Please log in to upload a profile picture.');
      return;
    }
    if (!file) {
      setMessage('❌ Please select an image to upload.');
      return;
    }

    setProfileLoading(true);
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await axios.post(
        `${BASE_URL}/user/upload-files/${userId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setMessage('✅ Profile picture uploaded successfully!');
      setFile(null);
      setPreviewUrl(null);
      const response = await axios.get<Patient>(`${BASE_URL}/user/get-patients/${userId}`);
      setPatient(response.data);
    } catch (error) {
      setMessage('❌ Failed to upload profile picture.');
      console.error(error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceIdField = serviceIdFieldMap[serviceType];
    if (!serviceIdField || !id) {
      setMessage("❌ Invalid service or ID.");
      return;
    }

    if (!userId) {
      setMessage("❌ Please log in to add to cart.");
      return;
    }

    if (!formData.paymentMode) {
      setMessage("❌ Please select a payment mode.");
      return;
    }

    const payload = {
      bookingStartTime: formData.bookingStartTime,
      bookingEndTime: formData.bookingEndTime,
      paymentMode: formData.paymentMode,
      bookingAmount: formData.bookingAmount,
      additionalRemarks: formData.additionalRemarks,
      [serviceIdField]: parseInt(id),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/AddToCart/addToCart/${userId}/${serviceType}`,
        payload
      );
      setMessage("✅ Added to cart successfully!");
      setTimeout(() => {
        navigate("/", { state: { scrollToAppointment: true }, replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart", error);
      setMessage("❌ Failed to add to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-teal-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Book Your {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Service
          </h1>

          

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{serviceName}</h2>
            {specialty && serviceType === 'chef' && (
              <p className="text-gray-600">Specialty: {specialty}</p>
            )}
            {basePrice > 0 && serviceType !== "doctor" && (
              <p className="text-gray-600">Base Rate: ₹{basePrice} per day</p>
            )}

            {serviceType === 'chef' && serviceDetails && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">About the Chef</h3>
                {serviceDetails.chefImage && (
                  <img
                    src={serviceDetails.chefImage}
                    alt="Chef"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                  />
                )}
                {serviceDetails.chefDescription && (
                  <p className="text-gray-600 text-center">{serviceDetails.chefDescription}</p>
                )}
              </div>
            )}
          </div>

          <form onSubmit={handleAddToCart} className="space-y-6">
            <div>
              <label htmlFor="bookingStartTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="bookingStartTime"
                id="bookingStartTime"
                value={formData.bookingStartTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="bookingEndTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time
              </label>
              {endTimeError && <p className="text-red-500 text-xs mt-1">{endTimeError}</p>}
              <input
                type="datetime-local"
                name="bookingEndTime"
                id="bookingEndTime"
                value={formData.bookingEndTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                name="paymentMode"
                id="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              >
                <option value="">Select Payment Mode</option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalRemarks" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Remarks (Optional)
              </label>
              <textarea
                name="additionalRemarks"
                id="additionalRemarks"
                value={formData.additionalRemarks}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Any special requests or notes"
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-lg font-semibold text-blue-800">
                Estimated Total: ₹{formData.bookingAmount.toFixed(2)}
              </p>
              {formData.bookingStartTime && formData.bookingEndTime && (
                <p className="text-sm text-blue-600">
                  Duration: {(() => {
                    const start = new Date(formData.bookingStartTime);
                    const end = new Date(formData.bookingEndTime);
                    const diffMs = end.getTime() - start.getTime();
                    
                    if (diffMs <= 0) return "Invalid duration";

                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                    let durationText = [];
                    if (diffDays > 0) durationText.push(`${diffDays} day${diffDays > 1 ? 's' : ''}`);
                    if (diffHours > 0) durationText.push(`${diffHours} hour${diffHours > 1 ? 's' : ''}`);
                    if (diffMinutes > 0) durationText.push(`${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`);
                    
                    return durationText.join(', ') || 'Less than a minute';
                  })()}
                </p>
              )}
              {basePrice > 0 && serviceType !== "doctor" && (
                <p className="text-sm text-blue-600">Daily Rate: ₹{basePrice} (10% off for additional days)</p>
              )}
            </div>

            <button
              type="submit"
              disabled={endTimeError || profileLoading || !formData.paymentMode}
              className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 disabled:bg-orange-400 disabled:cursor-not-allowed"
            >
              Add to Cart (₹{formData.bookingAmount.toFixed(2)})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;