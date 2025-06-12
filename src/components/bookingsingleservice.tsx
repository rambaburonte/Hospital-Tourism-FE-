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

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const { serviceType, id } = useParams(); // e.g., chef & 5
  const userId = 1; // 🔒 Hardcoded user ID

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

  // Fetch base price
  useEffect(() => {
    const fetchPrice = async () => {
      const apiPath = serviceApiMap[serviceType!];
      if (!apiPath) return;

      try {
        const res = await axios.get(`https://healthtourism-5.onrender.com${apiPath}`);
        const data = res.data;

        if (serviceType === "doctor") {
          setBasePrice(0); // Doctor pays offline
        } else {
          setBasePrice(data?.price || 0);
        }
      } catch (err) {
        console.error("❌ Failed to load price", err);
        setMessage("❌ Failed to load service details.");
      }
    };

    fetchPrice();
  }, [serviceType, id]);

  // Dynamically calculate bookingAmount
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
        `https://healthtourism-5.onrender.com/api/bookings/book-service/${userId}/${serviceType}`,
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center capitalize">
        Book {serviceType} (ID: {id})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          name="bookingStartTime"
          value={formData.bookingStartTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="datetime-local"
          name="bookingEndTime"
          value={formData.bookingEndTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="paymentMode"
          value={formData.paymentMode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
        </select>

        <select
          name="bookingType"
          value={formData.bookingType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="SINGLE">Single</option>
          <option value="MULTIPLE">Multiple</option>
        </select>

        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Remarks (optional)"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          {serviceType === "doctor"
            ? "Confirm Booking (Pay at Clinic)"
            : `Confirm Booking ₹${formData.bookingAmount}`}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
    </div>
  );
};

export default BookingPage;
