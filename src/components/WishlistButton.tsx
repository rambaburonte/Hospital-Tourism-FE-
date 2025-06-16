import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

export type ServiceType = 'chef' | 'labtest' | 'doctor' | 'spa' | 'translator' | 'physio' | 'hospital' | 'hotel' | 'travel' | 'pharmacy';

interface WishlistButtonProps {
  serviceId: number;
  serviceType: ServiceType;
  serviceName: string;
  price: number;
  description?: string;
  serviceImageUrl?: string;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  serviceId,
  serviceType,
  serviceName,
  price,
  description,
  serviceImageUrl = '',
  className = ''
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [wishlistId, setWishlistId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    bookingStartTime: '',
    bookingEndTime: '',
    paymentMode: 'ONLINE',
    bookingType: 'SINGLE',
    bookingAmount: 0,
    remarks: '',
  });
  const [basePrice, setBasePrice] = useState(price);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [specialty, setSpecialty] = useState('');
  const [isServiceDetailsLoading, setIsServiceDetailsLoading] = useState(true);

  const serviceApiMap = {
    chef: `/api/chefs/chef-By/Id/${serviceId}`,
    translator: `/api/translators/getone/${serviceId}`,
    spa: `/spaServices/spa/${serviceId}`,
    doctor: `/api/doctors/By/${serviceId}`,
    physio: `/physio/get/${serviceId}`,
    hospital: `/api/hospitals/get/${serviceId}`,
    hotel: `/api/hotels/get/${serviceId}`,
    travel: `/api/travel/get/${serviceId}`,
    pharmacy: `/api/pharmacies/get/${serviceId}`,
    labtest: `/api/labtests/get/${serviceId}`,
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (storedUser && (storedUser.id || storedUser.userId)) {
      setUser({
        ...storedUser,
        id: storedUser.id || storedUser.userId
      });
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const checkWishlistStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/wishlist/${user.id}`);
        const wishlistItem = response.data.find(
          (item: any) => item.serviceId === serviceId && item.serviceType === serviceType
        );
        setIsInWishlist(!!wishlistItem);
        if (wishlistItem) {
          setWishlistId(wishlistItem.wishlistId);
        }
      } catch (err) {
        console.error('Failed to check wishlist status:', err);
        setError('Failed to check wishlist status');
      }
    };

    checkWishlistStatus();
  }, [user, serviceId, serviceType]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const apiPath = serviceApiMap[serviceType];
      if (!apiPath) {
        setIsServiceDetailsLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}${apiPath}`);
        const data = res.data;
        setServiceDetails(data);

        if (serviceType === 'doctor') {
          setBasePrice(0); // Doctors have no base price
          setSpecialty(data?.speciality || '');
        } else {
          setBasePrice(data?.price || price || 0);
          let fetchedSpecialty = '';
          switch (serviceType) {
            case 'chef':
              fetchedSpecialty = data?.speciality || '';
              break;
            default:
              // No special handling needed for other service types for specialty
              break;
          }
          setSpecialty(fetchedSpecialty);
        }
        setError(null); // Clear any previous error
      } catch (err) {
        console.error('Failed to load service details:', err);
        setError('Failed to load service details.');
      } finally {
        setIsServiceDetailsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceType, serviceId, price, serviceName]);

  useEffect(() => {
    if (isServiceDetailsLoading) return; // Wait for service details to load

    console.log('Calculating booking amount...');
    console.log('Start Time:', formData.bookingStartTime);
    console.log('End Time:', formData.bookingEndTime);
    console.log('Base Price:', basePrice);
    console.log('Service Type:', serviceType);

    if (
      formData.bookingStartTime &&
      formData.bookingEndTime &&
      basePrice > 0 &&
      serviceType !== 'doctor'
    ) {
      const start = new Date(formData.bookingStartTime);
      const end = new Date(formData.bookingEndTime);

      if (start.getTime() >= end.getTime()) {
        setFormData((prev) => ({ ...prev, bookingAmount: 0 }));
        setError('End time must be after start time.');
        return;
      } else {
        setError(null); // Clear error if dates are valid
      }

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
    } else if (serviceType === 'doctor') {
      setFormData((prev) => ({
        ...prev,
        bookingAmount: 0,
      }));
    } else {
      // Reset booking amount if conditions are not met
      setFormData((prev) => ({
        ...prev,
        bookingAmount: 0,
      }));
    }
  }, [formData.bookingStartTime, formData.bookingEndTime, basePrice, serviceType, isServiceDetailsLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setError('Please login to add items to wishlist');
      setIsPopupOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const payload = {
        serviceName: serviceDetails?.chefName || serviceDetails?.translatorName || serviceDetails?.spaServiceName || serviceDetails?.doctorName || serviceDetails?.physioName || serviceName,
        serviceDescription: description || serviceDetails?.description || serviceDetails?.speciality || '',
        serviceImageUrl: serviceImageUrl || serviceDetails?.chefImage || serviceDetails?.image || 'https://placehold.co/400x300?text=No+Image',
        price: formData.bookingAmount || basePrice || 0,
        serviceType,
        bookingStartTime: formData.bookingStartTime,
        bookingEndTime: formData.bookingEndTime,
        paymentMode: formData.paymentMode,
        bookingType: formData.bookingType,
        remarks: formData.remarks,
      };

      console.log('Wishlist payload:', payload);

      const response = await axios.post(
        `${BASE_URL}/api/AddToCart/addToCart/${user.id}/${serviceType.toLowerCase()}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data && response.data.wishlistId) {
        setIsInWishlist(true);
        setWishlistId(response.data.wishlistId);
        setMessage('✅ Added to wishlist!');
        setTimeout(() => {
          setMessage(null);
          setIsPopupOpen(false);
        }, 2000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Failed to add to wishlist:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add to wishlist. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = () => {
    if (!user?.id) {
      setError('Please login to add items to wishlist');
      return;
    }

    if (isInWishlist && wishlistId) {
      setIsLoading(true);
      axios.delete(`${BASE_URL}/api/wishlist/remove/${wishlistId}`, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(() => {
          setIsInWishlist(false);
          setWishlistId(null);
          setMessage('Removed from wishlist.');
          setTimeout(() => setMessage(null), 2000);
        })
        .catch((err) => {
          console.error('Failed to remove from wishlist:', err);
          setError(err.response?.data?.message || 'Failed to remove from wishlist.');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      bookingStartTime: '',
      bookingEndTime: '',
      paymentMode: 'ONLINE',
      bookingType: 'SINGLE',
      bookingAmount: 0,
      remarks: '',
    });
    setError(null);
  };

  // Helper to format date for datetime-local input
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Initialize form data with current date/time when popup opens
  useEffect(() => {
    if (isPopupOpen && !formData.bookingStartTime && !formData.bookingEndTime) {
      const now = new Date();
      const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      setFormData((prev) => ({
        ...prev,
        bookingStartTime: formatDateTimeLocal(now),
        bookingEndTime: formatDateTimeLocal(twentyFourHoursLater),
      }));
    }
  }, [isPopupOpen]);

  return (
    
    <div className="relative">
     
      <button
        onClick={toggleWishlist}
        disabled={isLoading}
        className={`p-2 rounded-full transition-colors duration-200 ${
          isInWishlist
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-red-500'
        } ${className}`}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          className="w-6 h-6"
          fill={isInWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-10">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]">
            <h2 className="text-2xl font-bold mb-2 text-center capitalize">
              Add {serviceType} to Wishlist
            </h2>
            <div className="text-center mb-6 text-gray-700">
              <p className="text-xl font-semibold">
                {isServiceDetailsLoading ? 'Loading service details...' : (
                  serviceDetails?.chefName || serviceDetails?.translatorName || serviceDetails?.spaServiceName || serviceDetails?.doctorName || serviceDetails?.physioName || serviceName
                )}
              </p>
              {isServiceDetailsLoading && (
                <div className="flex justify-center items-center mt-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
              {error && !isServiceDetailsLoading && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
              {specialty && serviceType === 'chef' && (
                <p className="text-md">Specialty: {specialty}</p>
              )}
              {basePrice > 0 && serviceType !== 'doctor' && (
                <p className="text-md">Base Rate: ₹{basePrice.toFixed(2)} per day</p>
              )}
              {serviceDetails?.chefImage && serviceType === 'chef' && (
                <img
                  src={serviceDetails.chefImage || 'https://placehold.co/400x300?text=No+Image'}
                  alt="Chef"
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 shadow-md"
                />
              )}
            </div>

            <form onSubmit={handleAddToWishlist} className="space-y-4">
              <div>
                <label htmlFor="bookingStartTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  name="bookingStartTime"
                  id="bookingStartTime"
                  value={formData.bookingStartTime}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700">Payment Mode</label>
                <select
                  name="paymentMode"
                  id="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ONLINE">Online</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
              <div>
                <label htmlFor="bookingType" className="block text-sm font-medium text-gray-700">Booking Type</label>
                <select
                  name="bookingType"
                  id="bookingType"
                  value={formData.bookingType}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="SINGLE">Single</option>
                  <option value="RECURRING">Recurring</option>
                </select>
              </div>
              <div>
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks (optional)</label>
                <textarea
                  name="remarks"
                  id="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special requests or notes"
                />
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 rounded">
                <p className="font-semibold">Estimated Total: ₹{formData.bookingAmount.toFixed(2)}</p>
                {basePrice > 0 && formData.bookingStartTime && formData.bookingEndTime && serviceType !== 'doctor' && (
                  <p className="text-sm">Daily Rate: ₹{basePrice.toFixed(2)} (10% off for additional days)</p>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isServiceDetailsLoading || !formData.bookingStartTime || !formData.bookingEndTime || (serviceType !== 'doctor' && formData.bookingAmount <= 0) || (serviceType === 'doctor' && !formData.remarks)}
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isLoading ? 'Adding...' : `Add to Wishlist ₹${formData.bookingAmount.toFixed(2)}`}
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-4 text-center text-red-600">{error}</p>
            )}
            {message && (
              <p className="mt-4 text-center text-green-600">{message}</p>
            )}
          </div>
        </div>
      )}

      {error && !isPopupOpen && (
        <div className="absolute top-full left-0 mt-1 bg-red-100 text-red-700 text-xs p-2 rounded shadow-lg z-50 whitespace-nowrap">
          {error}
        </div>
      )}
      {message && !isPopupOpen && (
        <div className="absolute top-full left-0 mt-1 bg-green-100 text-green-700 text-xs p-2 rounded shadow-lg z-50 whitespace-nowrap">
          {message}
        </div>
      )}
    </div>
  );
};

export default WishlistButton;