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

  // Check if user is logged in on component mount
  useEffect(() => {
    if (!userId) {
      alert("⚠️ You need to login first to book services!");
      navigate("/login", { replace: true });
      return;
    }
  }, [userId, navigate]);

  // State for booking form
  const [formData, setFormData] = useState({
    bookingStartTime: "",
    bookingEndTime: "",
    paymentMode: "", // No default value
    bookingType: "Cost", // Add bookingType field
    bookingAmount: 0,
    additionalRemarks: "",
  });
  // State for service and profile
  const [basePrice, setBasePrice] = useState(0);
  const [message, setMessage] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [serviceDetails, setServiceDetails] = useState<Record<string, unknown> | null>(null);
  const [endTimeError, setEndTimeError] = useState<string | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
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
      const serviceApiMap = {
        chef: `/api/chefs/chef-By/Id/${id}`,
        translator: `/api/translators/getone/${id}`,
        spa: `/spaServices/spa/${id}`,
        doctor: `/api/doctors/By/${id}`,
        physio: `/physio/get/${id}`,
      };
      
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

    // Create the correct payload structure that matches the backend expectations
    const payload = {
      bookingStartTime: formData.bookingStartTime,
      bookingEndTime: formData.bookingEndTime,
      paymentMode: formData.paymentMode,
      bookingType: formData.bookingType || "Cost",
      bookingAmount: formData.bookingAmount,
      additionalRemarks: formData.additionalRemarks,
      bookingStatus: "Pending",
      // Set the correct service ID based on service type
      chefId: serviceType === 'chef' ? parseInt(id) : null,
      physioId: serviceType === 'physio' ? parseInt(id) : null,
      translatorId: serviceType === 'translator' ? parseInt(id) : null,
      spaId: serviceType === 'spa' ? parseInt(id) : null,
      doctorId: serviceType === 'doctor' ? parseInt(id) : null,
      labtestId: serviceType === 'labtest' ? parseInt(id) : null,
    };    try {
      setIsCheckingAvailability(true);
      setMessage("⏳ Adding to cart...");
      
      const response = await axios.post(
        `${BASE_URL}/api/AddToCart/addToCart/${userId}/${serviceType}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Add to cart response:', response.data);
      setMessage("✅ Added to cart successfully!");
      
      setTimeout(() => {
        navigate("/bookingcart", { replace: true });
      }, 2000);} catch (error: unknown) {
      console.error("Error adding to cart:", error);
      
      // Better error handling
      let errorMessage = "❌ Failed to add to cart.";
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; error?: string }; status?: number } };
        if (axiosError.response?.data?.message) {
          // Check if it's a time slot conflict
          if (axiosError.response.status === 409 || axiosError.response.data.error === 'TIME_SLOT_CONFLICT') {
            errorMessage = `⏰ ${axiosError.response.data.message} Please select a different time slot.`;
          } else {
            errorMessage = `❌ ${axiosError.response.data.message}`;
          }
        } else if (axiosError.response?.status === 400) {
          errorMessage = "❌ Invalid booking details. Please check your input.";
        } else if (axiosError.response?.status === 404) {
          errorMessage = "❌ Service not found.";
        } else if (axiosError.response?.status === 409) {
          errorMessage = "⏰ Service is already booked for this time slot. Please select a different time.";
        } else if (axiosError.response?.status === 500) {
          errorMessage = "❌ Server error. Please try again later.";
        }      }
      
      setMessage(errorMessage);
    } finally {
      setIsCheckingAvailability(false);
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

            {serviceType === 'chef' && serviceDetails && (              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">About the Chef</h3>
                {serviceDetails && 'chefImage' in serviceDetails && serviceDetails.chefImage && (
                  <img
                    src={serviceDetails.chefImage as string}
                    alt="Chef"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                  />
                )}
                {serviceDetails && 'chefDescription' in serviceDetails && serviceDetails.chefDescription && (
                  <p className="text-gray-600 text-center">{serviceDetails.chefDescription as string}</p>
                )}
              </div>
            )}
          </div>

          {message && (
            <div className={`p-4 rounded-md mb-6 ${
              message.startsWith('✅') ? 'bg-green-50 text-green-800' : 
              message.startsWith('⏰') ? 'bg-yellow-50 text-yellow-800' :
              'bg-red-50 text-red-800'
            }`}>
              <p className="text-sm font-medium">{message}</p>
              {message.includes('time slot') && (
                <div className="mt-2">
                  <p className="text-xs">💡 Tip: Try selecting different dates or times, or check back later for availability.</p>
                  <div className="mt-2 text-xs">
                    <p><strong>Suggestions:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Try booking for the next day at the same time</li>
                      <li>Consider earlier or later hours (e.g., morning vs evening)</li>
                      <li>Check for weekend availability if booking on weekdays</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

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
                    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));                    const durationText: string[] = [];
                    if (diffDays > 0) durationText.push(`${diffDays} day${diffDays > 1 ? 's' : ''}`);
                    if (diffHours > 0) durationText.push(`${diffHours} hour${diffHours > 1 ? 's' : ''}`);
                    if (diffMinutes > 0) durationText.push(`${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`);
                    
                    return durationText.join(', ') || 'Less than a minute';
                  })()}
                </p>
              )}
              {basePrice > 0 && serviceType !== "doctor" && (
                <p className="text-sm text-blue-600">Daily Rate: ₹{basePrice}</p>
              )}
            </div>            <button
              type="submit"
              disabled={!!endTimeError || profileLoading || !formData.paymentMode || isCheckingAvailability}
              className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-200 disabled:bg-orange-400 disabled:cursor-not-allowed"
            >
              {isCheckingAvailability ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Checking availability...
                </>
              ) : (
                `Add to Cart (₹${formData.bookingAmount.toFixed(2)})`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;