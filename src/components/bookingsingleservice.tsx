import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";

const BookingPage = () => {
  const { serviceType, id } = useParams(); // e.g., chef & 5
  const navigate = useNavigate();

  // ✅ Get logged-in user from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData?.userId || 1; // Default to 1 if not found

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
  const [specialty, setSpecialty] = useState(""); // New state for specialty
  const [serviceDetails, setServiceDetails] = useState<any>(null); // New state for full service details

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

  // ✅ Fetch base price, service name, and specialty
  useEffect(() => {
    const fetchPrice = async () => {
      const apiPath = serviceApiMap[serviceType];
      if (!apiPath) return;

      try {
        const res = await axios.get(`${BASE_URL}${apiPath}`);
        const data = res.data;
        setServiceDetails(data); // Save the entire data object

        if (serviceType === "doctor") {
          setBasePrice(0); // Doctors might have a fixed consultation fee or no base price for duration
          setServiceName(data?.doctorName || "Doctor");
          setSpecialty(data?.speciality || ""); // Doctors can also have specialties
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

  // ✅ Calculate booking amount with discount
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

      // Calculate duration in days, ensuring at least 1 day
      const durationInDays = Math.max(Math.ceil(durationInMs / (1000 * 60 * 60 * 24)), 1);

      let total = basePrice;
      if (durationInDays > 1) {
        // Apply 10% discount for each additional day
        total += (durationInDays - 1) * (basePrice * 0.9);
      }

      setFormData((prev) => ({
        ...prev,
        bookingAmount: total,
      }));
    } else if (serviceType === "doctor") {
      setFormData((prev) => ({
        ...prev,
        bookingAmount: 0, // Doctors might have a fixed consultation fee, set to 0 for now or handle separately
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

  const handleAddToCart = async (e) => {
    e.preventDefault();

    const serviceIdField = serviceIdFieldMap[serviceType];
    if (!serviceIdField || !id) {
      setMessage("❌ Invalid service or ID.");
      return;
    }

    // Construct the payload for the API
    const payload = {
      bookingStartTime: formData.bookingStartTime,
      bookingEndTime: formData.bookingEndTime,
      paymentMode: formData.paymentMode,
      bookingType: formData.bookingType,
      bookingAmount: formData.bookingAmount,
      remarks: formData.remarks,
      [serviceIdField]: parseInt(id), // e.g., chefId, doctorId, etc.
    };

    try {
      const response = await axios.post(
        // `${BASE_URL}/api/bookings/book-service/${userId}/${serviceType}`,
        `${BASE_URL}/api/AddToCart/addToCart/${userId}/${serviceType}`,
        payload
        // http://localhost:9090/api/AddToCart/addToCart/3/chef
      );
      setMessage("✅ Added to cart successfully!");
      setTimeout(() => {
        navigate("/bookingcart", { replace: true }); // Navigate to cart after success
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart", error);
      setMessage("❌ Failed to add to cart.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg pb-10">
      <h2 className="text-2xl font-bold mb-2 text-center capitalize">
        Book {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
      </h2>

      <div className="text-center mb-6 text-gray-700">
        <p className="text-xl font-semibold">{serviceName}</p>
        {specialty && serviceType === 'chef' && (
          <p className="text-md">Specialty: {specialty}</p>
        )}
        {basePrice > 0 && serviceType !== "doctor" && (
          <p className="text-md">Base Rate: ₹{basePrice} per day</p>
        )}

        {serviceType === 'chef' && serviceDetails && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] transform border border-gray-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <div className="relative z-10">
              <h4 className="font-bold text-xl mb-3 text-gray-900">Chef Details:</h4>
              {serviceDetails.chefImage && (
                <img src={serviceDetails.chefImage} alt="Chef" className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 shadow-md transition-transform duration-300 group-hover:scale-105" />
              )}
              {serviceDetails.chefDescription && (
                <p className="text-sm text-gray-700 leading-relaxed text-center">{serviceDetails.chefDescription}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleAddToCart} className="space-y-4">
        <div>
          <label htmlFor="bookingStartTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            name="bookingStartTime"
            id="bookingStartTime"
            value={formData.bookingStartTime}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-blue-500 hover:shadow-md"
            required
          />
        </div>

        <div>
          <label htmlFor="bookingEndTime" className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            name="bookingEndTime"
            id="bookingEndTime"
            value={formData.bookingEndTime}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-blue-500 hover:shadow-md"
            required
          />
        </div>

        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks (optional)</label>
          <textarea
            name="remarks"
            id="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 hover:border-blue-500 hover:shadow-md"
            placeholder="Any special requests or notes"
          />
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 rounded">
          <p className="font-semibold">Estimated Total: ₹{formData.bookingAmount.toFixed(2)}</p>
          {basePrice > 0 && formData.bookingStartTime && formData.bookingEndTime && serviceType !== "doctor" && (
            <p className="text-sm">Daily Rate: ₹{basePrice} (10% off for additional days)</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 hover:shadow-lg hover:scale-105 transform"
        >
          Add to Cart ₹{formData.bookingAmount.toFixed(2)}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default BookingPage;