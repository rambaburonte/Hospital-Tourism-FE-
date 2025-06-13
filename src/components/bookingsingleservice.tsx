// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// const BookingPage = () => {
//   const { serviceType, id } = useParams(); // 👈 id = dynamic service ID
//   const userId = 1; // Hardcoded userId for now

//   const [formData, setFormData] = useState({
//     bookingStartTime: "",
//     bookingEndTime: "",
//     paymentMode: "ONLINE",
//     bookingType: "SINGLE",
//     bookingAmount: 0,
//     remarks: "",
//   });

//   const [message, setMessage] = useState("");

//   const serviceIdFieldMap: Record<string, string> = {
//     chef: "chef",
//     doctor: "doctor",
//     physio: "physio",
//     translator: "translator",
//     spa: "spa",
//     test: "labtest",
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const serviceIdField = serviceIdFieldMap[serviceType!];
//     if (!serviceIdField) {
//       setMessage("❌ Unsupported service type.");
//       return;
//     }

//     const payload: any = {
//       ...formData,
//       [serviceIdField]: parseInt(id!), // 👈 dynamic ID injected into correct field
//     };

//     try {
//       const response = await axios.post(
//         `http://localhost:9090/api/bookings/book-service/${userId}/${serviceType}`,
//         payload
//       );
//       console.log("✅ Booking successful", response.data);
//       setMessage("✅ Booking successful!");
//     } catch (error) {
//       console.error("❌ Booking failed", error);
//       setMessage("❌ Booking failed. Please check details.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center capitalize">
//         Book {serviceType} (ID: {id})
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="datetime-local"
//           name="bookingStartTime"
//           value={formData.bookingStartTime}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="datetime-local"
//           name="bookingEndTime"
//           value={formData.bookingEndTime}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="number"
//           name="bookingAmount"
//           value={formData.bookingAmount}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Amount"
//           required
//         />

//         <textarea
//           name="remarks"
//           value={formData.remarks}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Remarks (optional)"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           Confirm Booking
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default BookingPage;




// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const BookingPage = () => {
//   const { serviceType, id } = useParams(); // e.g., chef & 5

//   // ✅ Get logged-in user from localStorage
//   const userData = JSON.parse(localStorage.getItem("user") || "{}");
//   const userId = userData?.userId || 1;

//   const [formData, setFormData] = useState({
//     bookingStartTime: "",
//     bookingEndTime: "",
//     paymentMode: "ONLINE",
//     bookingType: "SINGLE",
//     bookingAmount: 0,
//     remarks: "",
//   });

//   const [basePrice, setBasePrice] = useState(0);
//   const [message, setMessage] = useState("");
//   const [serviceName, setServiceName] = useState("");

//   const serviceApiMap: Record<string, string> = {
//     chef: `/api/chefs/chef-By/Id/${id}`,
//     translator: `/api/translators/getone/${id}`,
//     spa: `/spaServices/spa/${id}`,
//     doctor: `/api/doctors/By/${id}`,
//     physio: `/physio/get/${id}`,
//   };

//   const serviceIdFieldMap: Record<string, string> = {
//     chef: "chefId",
//     translator: "translatorId",
//     spa: "spaId",
//     doctor: "doctorId",
//     physio: "physioId",
//   };

//   // ✅ Fetch base price and service name
//   useEffect(() => {
//     const fetchPrice = async () => {
//       const apiPath = serviceApiMap[serviceType!];
//       if (!apiPath) return;

//       try {
//         const res = await axios.get(`http://localhost:9090${apiPath}`);
//         const data = res.data;

//         if (serviceType === "doctor") {
//           setBasePrice(0);
//           setServiceName(data?.doctorName || "Doctor");
//         } else {
//           setBasePrice(data?.price || 0);
//           let name = "";
//           switch (serviceType) {
//             case "chef":
//               name = data?.chefName;
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
//           }
//           setServiceName(name || "Service");
//         }
//       } catch (err) {
//         console.error("❌ Failed to load price", err);
//         setMessage("❌ Failed to load service details.");
//       }
//     };

//     fetchPrice();
//   }, [serviceType, id]);

//   // ✅ Calculate booking amount
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
//       const total = durationInDays * basePrice;
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

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const serviceIdField = serviceIdFieldMap[serviceType!];
//     if (!serviceIdField || !id) {
//       setMessage("❌ Invalid service or ID.");
//       return;
//     }

//     const payload: any = {
//       ...formData,
//       [serviceIdField]: parseInt(id),
//     };

//     try {
//       const response = await axios.post(
//         `http://localhost:9090/api/bookings/book-service/${userId}/${serviceType}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("✅ Booking successful:", response.data);
//       setMessage("✅ Booking successful!");
//     } catch (error) {
//       console.error("❌ Booking failed:", error);
//       setMessage("❌ Booking failed. Please check and try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center capitalize">
//         Book {serviceType}: <span className="text-green-700">{serviceName}</span>
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="datetime-local"
//           name="bookingStartTime"
//           value={formData.bookingStartTime}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="datetime-local"
//           name="bookingEndTime"
//           value={formData.bookingEndTime}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <select
//           name="paymentMode"
//           value={formData.paymentMode}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="ONLINE">Online</option>
//           <option value="OFFLINE">Offline</option>
//         </select>

//         <select
//           name="bookingType"
//           value={formData.bookingType}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="SINGLE">Single</option>
//           <option value="MULTIPLE">Multiple</option>
//         </select>

//         <textarea
//           name="remarks"
//           value={formData.remarks}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Remarks (optional)"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           {serviceType === "doctor"
//             ? "Confirm Booking (Pay at Clinic)"
//             : `Confirm Booking ₹${formData.bookingAmount}`}
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default BookingPage;






import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const { serviceType, id } = useParams(); // e.g., chef & 5
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData?.userId || 1;

  const [formData, setFormData] = useState({
    bookingStartTime: "",
    bookingEndTime: "",
    paymentMode: "ONLINE",
    bookingType: "SINGLE",
    bookingAmount: 0,
    remarks: "",
  });

  const [basePrice, setBasePrice] = useState(0);
  const [message, setMessage] = useState("");
  const [serviceName, setServiceName] = useState("");

  const serviceApiMap: Record<string, string> = {
    chef: `/api/chefs/chef-By/Id/${id}`,
    translator: `/api/translators/getone/${id}`,
    spa: `/spaServices/spa/${id}`,
    doctor: `/api/doctors/By/${id}`,
    physio: `/physio/get/${id}`,
  };

  const serviceIdFieldMap: Record<string, string> = {
    chef: "chefId",
    translator: "translatorId",
    spa: "spaId",
    doctor: "doctorId",
    physio: "physioId",
  };

  useEffect(() => {
    const fetchPrice = async () => {
      const apiPath = serviceApiMap[serviceType!];
      if (!apiPath) return;

      try {
        const res = await axios.get(`http://localhost:9090${apiPath}`);
        const data = res.data;

        if (serviceType === "doctor") {
          setBasePrice(0);
          setServiceName(data?.doctorName || "Doctor");
        } else {
          setBasePrice(data?.price || 0);
          let name = "";
          switch (serviceType) {
            case "chef":
              name = data?.chefName;
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
          }
          setServiceName(name || "Service");
        }
      } catch (err) {
        console.error("❌ Failed to load price", err);
        setMessage("❌ Failed to load service details.");
      }
    };

    fetchPrice();
  }, [serviceType, id]);

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
      const total = durationInDays * basePrice;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceIdField = serviceIdFieldMap[serviceType!];
    if (!serviceIdField || !id) {
      setMessage("❌ Invalid service or ID.");
      return;
    }

    const payload: any = {
      ...formData,
      [serviceIdField]: parseInt(id),
    };

    try {
      const response = await axios.post(
        `http://localhost:9090/api/bookings/book-service/${userId}/${serviceType}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Booking successful:", response.data);
      setMessage("✅ Booking successful!");
    } catch (error) {
      console.error("❌ Booking failed:", error);
      setMessage("❌ Booking failed. Please check and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 transform transition-all duration-500 scale-100 animate-scaleIn">
        <div className="bg-gradient-to-r from-[#499E14] to-[#3a7e10] text-white rounded-t-2xl p-6 mb-6">
          <h2 className="text-3xl font-bold text-center capitalize">
            Book {serviceType}: <span className="text-white">{serviceName}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="bookingStartTime" className="block text-sm font-medium text-gray-800">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="bookingStartTime"
              name="bookingStartTime"
              value={formData.bookingStartTime}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:scale-[1.02]"
              required
            />
          </div>

          <div>
            <label htmlFor="bookingEndTime" className="block text-sm font-medium text-gray-800">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="bookingEndTime"
              name="bookingEndTime"
              value={formData.bookingEndTime}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:scale-[1.02]"
              required
            />
          </div>

          <div>
            <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-800">
              Payment Mode
            </label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:scale-[1.02]"
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>

          <div>
            <label htmlFor="bookingType" className="block text-sm font-medium text-gray-800">
              Booking Type
            </label>
            <select
              id="bookingType"
              name="bookingType"
              value={formData.bookingType}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:scale-[1.02]"
            >
              <option value="SINGLE">Single</option>
              <option value="MULTIPLE">Multiple</option>
            </select>
          </div>

          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-800">
              Remarks (Optional)
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300 hover:scale-[1.02]"
              placeholder="Add any special instructions"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-4 rounded-lg transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2"
          >
            {serviceType === "doctor"
              ? "Confirm Booking (Pay at Clinic)"
              : `Confirm Booking ₹${formData.bookingAmount}`}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center text-base font-medium animate-fadeIn ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* CSS for Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
