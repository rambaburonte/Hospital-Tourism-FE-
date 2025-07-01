import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

const loadExternalAssets = () => {
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
  document.head.appendChild(faLink);
};

interface BookingItem {
  bookingId: number;
  bookingStatus: string;
  bookingAmount: number;
  bookingStartTime: string;
  bookingEndTime: string;
  serviceTypes: string;
  serviceName: string;
  serviceId?: number; // Add optional serviceId field
}

interface AddressFields {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentDetails {
  upiId?: string;
  upiApp?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
}

interface PaymentErrors {
  upiId?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
}

interface CouponEntity {
  id: number;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountAmount: number;
  type: 'SINGLE' | 'COMBO';
  name: string;
  description?: string;
  active: boolean;
  validFrom: string;
  validTill: string;
}

interface ApiBookingItem {
  bookingId: number;
  bookingStatus: string;
  bookingAmount: number;
  bookingStartTime: string;
  bookingEndTime: string;
  serviceTypes: string;
  serviceName: string;
  serviceId?: number; // Add optional serviceId field
}

const BookingCart: React.FC = () => {
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addressFields, setAddressFields] = useState<AddressFields>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [addressConfirmed, setAddressConfirmed] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
  const [paymentGatewayError, setPaymentGatewayError] = useState<string | null>(null);
  const [cardIssuer, setCardIssuer] = useState<string | null>(null);
  const [selectedUPIApp, setSelectedUPIApp] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponEntity | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [availableCoupons, setAvailableCoupons] = useState<CouponEntity[]>([]);
  const [showCoupons, setShowCoupons] = useState<boolean>(false);

  const paymentOptions = [
    { name: 'Cash on Delivery', icon: 'fa-money-bill', label: 'Cash on Delivery', requiresDetails: false },
    { name: 'UPI', icon: 'fa-mobile-alt', label: 'UPI', requiresDetails: true },
    { name: 'Debit Card', icon: 'fa-credit-card', label: 'Debit Card', requiresDetails: true },
    { name: 'Credit Card', icon: 'fa-credit-card', label: 'Credit Card', requiresDetails: true },
    { name: 'Net Banking', icon: 'fa-university', label: 'Net Banking', requiresDetails: true },
  ];

  const upiApps = [
    { name: 'PhonePe', handle: 'phonepe', icon: 'fa-mobile-alt' },
    { name: 'Google Pay', handle: 'okicici', icon: 'fa-google' },
    { name: 'Paytm', handle: 'paytm', icon: 'fa-wallet' },
    { name: 'BharatPe', handle: 'bharatpe', icon: 'fa-rupee-sign' },
  ];

  const banks = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank'];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (storedUser && (storedUser.id || storedUser.userId)) {
      setUser({
        ...storedUser,
        id: storedUser.id || storedUser.userId
      });
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/AddToCart/user/${user.id}`);
        const bookings = response.data
          .filter((item: ApiBookingItem) => item.serviceTypes.toLowerCase() !== 'pharmacy')
          .map((item: ApiBookingItem) => ({
            bookingId: item.bookingId,
            bookingStatus: item.bookingStatus,
            bookingAmount: item.bookingAmount,
            bookingStartTime: item.bookingStartTime,
            bookingEndTime: item.bookingEndTime,
            serviceTypes: item.serviceTypes,
            serviceName: item.serviceName,
            serviceId: item.serviceId, // Include serviceId if available
          }));
        setBookingItems(bookings);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings from server');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  useEffect(() => {
    loadExternalAssets();
  }, []);

  const total = bookingItems
    .filter(item => selectedItems.includes(item.bookingId))
    .reduce((acc, item) => acc + item.bookingAmount, 0);

  const finalTotal = total - couponDiscount;

  const handleAddressFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmAddress = () => {
    const { street, city, country } = addressFields;
    if (!street || !city || !country) {
      setError('Please fill in at least Street Address, City, and Country.');
      return;
    }
    setAddressConfirmed(true);
    setError(null);
  };

  const detectCardIssuer = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'MasterCard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
    return null;
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'upiId') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (value && !upiRegex.test(value)) {
        error = 'Invalid UPI ID (e.g., user@okicici)';
      }
    } else if (name === 'cardNumber') {
      const cardRegex = /^\d{16}$/;
      const cleaned = value.replace(/\D/g, '');
      if (cleaned && !cardRegex.test(cleaned)) {
        error = 'Card number must be 16 digits';
      } else {
        setCardIssuer(detectCardIssuer(cleaned));
      }
    } else if (name === 'expiryDate') {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (value && !expiryRegex.test(value)) {
        error = 'Invalid expiry date (MM/YY)';
      } else if (value) {
        const [month, year] = value.split('/').map(Number);
        const currentDate = new Date();
        const expiry = new Date(2000 + year, month - 1);
        if (expiry < currentDate) {
          error = 'Card has expired';
        }
      }
    } else if (name === 'cvv') {
      const cvvRegex = /^\d{3}$/;
      if (value && !cvvRegex.test(value)) {
        error = 'CVV must be 3 digits';
      }
    } else if (name === 'bankName' && !value) {
      error = 'Please select a bank';
    }
    setPaymentErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handlePaymentDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      let cleaned = value.replace(/\D/g, '');
      cleaned = cleaned.replace(/(.{4})/g, '$1 ').trim();
      setPaymentDetails((prev) => ({ ...prev, [name]: cleaned }));
    } else if (name === 'expiryDate') {
      let cleaned = value.replace(/\D/g, '');
      if (cleaned.length > 2) {
        cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      setPaymentDetails((prev) => ({ ...prev, [name]: cleaned }));
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '');
      setPaymentDetails((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }
    validateField(name, value);
  };

  const validatePaymentDetails = (): boolean => {
    let isValid = true;
    if (!paymentMethod) return false;

    const selectedOption = paymentOptions.find(option => option.name === paymentMethod);
    if (!selectedOption?.requiresDetails) return true;

    if (paymentMethod === 'UPI') {
      isValid = validateField('upiId', paymentDetails.upiId || '') && isValid;
    } else if (paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') {
      isValid = validateField('cardNumber', paymentDetails.cardNumber || '') && isValid;
      isValid = validateField('expiryDate', paymentDetails.expiryDate || '') && isValid;
      isValid = validateField('cvv', paymentDetails.cvv || '') && isValid;
    } else if (paymentMethod === 'Net Banking') {
      isValid = validateField('bankName', paymentDetails.bankName || '') && isValid;
    }
    return isValid;
  };

  const handleConfirmPaymentDetails = () => {
    if (validatePaymentDetails()) {
      setShowPaymentModal(false);
      setPaymentConfirmed(true);
      setPaymentSuccess('Payment method confirmed successfully!');
      setTimeout(() => setPaymentSuccess(null), 3000);
    }
  };

  const handleSelectPaymentMethod = (method: string) => {
    setPaymentMethod(method);
    setPaymentDetails({});
    setPaymentErrors({});
    setCardIssuer(null);
    setSelectedUPIApp(null);
    const selectedOption = paymentOptions.find(option => option.name === method);
    if (selectedOption?.requiresDetails) {
      setShowPaymentModal(true);
    } else {
      setPaymentConfirmed(true);
      setPaymentSuccess('Payment method confirmed successfully!');
      setTimeout(() => setPaymentSuccess(null), 3000);
    }
  };

  const handleSelectUPIApp = (app: string) => {
    setSelectedUPIApp(app);
    const appHandle = upiApps.find(upi => upi.name === app)?.handle || '';
    setPaymentDetails((prev) => ({ ...prev, upiApp: app, upiId: prev.upiId || `@${appHandle}` }));
  };

  const mockProcessPayment = async (): Promise<boolean> => {
    setProcessingPayment(true);
    setPaymentGatewayError(null);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const success = Math.random() > 0.3;
    setProcessingPayment(false);
    if (!success) {
      setPaymentGatewayError('Payment failed due to a gateway error. Please try again.');
    }
    return success;
  };

  const handleConfirmPurchase = async () => {
    if (!addressConfirmed || !paymentConfirmed) {
      alert('Please confirm an address and payment method.');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one booking to confirm.');
      return;
    }

    const paymentSuccess = await mockProcessPayment();
    if (paymentSuccess) {
      try {
        // Send array of bookingIds
        console.log('Sending bookingIds to backend:', selectedItems);
        const response = await axios.put(`${BASE_URL}/api/AddToCart/bookings/update-payment-status`, selectedItems, {
          headers: { 'Content-Type': 'application/json' }
        });        console.log('Backend response:', response.data);

        // Check if any bookings were successfully updated
        const updatedCount = response.data?.length || selectedItems.length;
        
        // Update local state
        const updatedBookings = bookingItems.filter(item => !selectedItems.includes(item.bookingId));
        setBookingItems(updatedBookings);
        setSelectedItems([]);
        
        // Show success message with count
        const successMsg = updatedCount === 1 
          ? '✅ Booking confirmed and payment processed successfully!' 
          : `✅ ${updatedCount} bookings confirmed and payments processed successfully!`;
        setSuccessMessage(successMsg);
        setTimeout(() => setSuccessMessage(null), 5000);

        // Reset address and payment states
        setAddressFields({ street: '', city: '', state: '', postalCode: '', country: '' });
        setPaymentMethod('');
        setPaymentDetails({});
        setAddressConfirmed(false);
        setPaymentConfirmed(false);      } catch (apiError: unknown) {
        console.error('Error updating payment status in backend:', apiError);
        
        let errorMessage = 'Failed to confirm booking. Please try again.';
        if (apiError && typeof apiError === 'object' && 'response' in apiError) {
          const axiosError = apiError as { response?: { data?: { message?: string; error?: string }; status?: number } };
          if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          } else if (axiosError.response?.data?.error === 'PAYMENT_UPDATE_FAILED') {
            errorMessage = 'Payment update failed. Please check your booking details and try again.';
          } else if (axiosError.response?.status === 400) {
            errorMessage = 'Invalid booking data. Please refresh the page and try again.';
          } else if (axiosError.response?.status === 404) {
            errorMessage = 'Booking not found. Please refresh the page.';
          } else if (axiosError.response?.status === 500) {
            errorMessage = 'Server error occurred. Please try again later.';
          }
        }
        
        setPaymentGatewayError(errorMessage);
      }
    }
  };

  const handleSelectItem = (bookingId: number) => {
    setSelectedItems((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === bookingItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(bookingItems.map((item) => item.bookingId));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/AddToCart/delete-multiple`, {
        data: selectedItems
      });
      const updatedBookings = bookingItems.filter(item => !selectedItems.includes(item.bookingId));
      setBookingItems(updatedBookings);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error deleting selected items:', error);
      setError('Failed to delete selected items. Please try again.');
    }
  };

  const handleDeleteSingleItem = async (bookingId: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/AddToCart/delete/${bookingId}`);
      const updatedBookings = bookingItems.filter(item => item.bookingId !== bookingId);
      setBookingItems(updatedBookings);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again.');
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const getAddressSummary = () => {
    const { street, city, state, postalCode, country } = addressFields;
    return [street, city, state, postalCode, country].filter(Boolean).join(', ');
  };

  const getPaymentSummary = () => {
    if (!paymentMethod) return '';
    if (paymentMethod === 'UPI') {
      const appName = paymentDetails.upiApp || 'UPI';
      return `${appName}: ${paymentDetails.upiId}`;
    }
    if (paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') {
      const cardNumber = paymentDetails.cardNumber || '';
      return `${paymentMethod}: **** **** **** ${cardNumber.slice(-4)}`;
    }
    if (paymentMethod === 'Net Banking') return `Net Banking: ${paymentDetails.bankName}`;
    return paymentMethod;
  };

  const formatDateTime = (time: string) => {
    return new Date(time).toLocaleString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleRemoveBooking = (index: number) => {
    const updatedBookings = bookingItems.filter((_, i) => i !== index);
    setBookingItems(updatedBookings);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (selectedItems.length === 0) {
      setCouponError('Please select at least one service to apply coupon');
      return;
    }

    // Calculate total for selected items
    const selectedBookings = bookingItems.filter(item => selectedItems.includes(item.bookingId));
    const totalAmount = selectedBookings.reduce((sum, booking) => sum + booking.bookingAmount, 0);

    if (totalAmount === 0) {
      setCouponError('Coupons cannot be applied to free services');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    try {
      console.log('Validating coupon:', {
        couponCode: couponCode.trim(),
        totalAmount,
        selectedBookings: selectedBookings.map(b => ({
          bookingId: b.bookingId,
          serviceType: b.serviceTypes,
          amount: b.bookingAmount,
          serviceName: b.serviceName
        }))
      });

      // Try the validate endpoint first
      try {
        const validateResponse = await axios.get(`${BASE_URL}/api/coupons/validate`, {
          params: {
            code: couponCode.trim(),
            total: totalAmount
          }
        });

        console.log('Validation successful:', validateResponse.data);

        // If validation succeeds, fetch coupon details and apply the discount
        const couponResponse = await axios.get(`${BASE_URL}/api/coupons/${couponCode.trim()}`);
        
        setAppliedCoupon(couponResponse.data);
        setCouponDiscount(validateResponse.data.discount);
        setCouponError('');
        
      } catch (validateError) {
        console.log('Validation failed, trying apply endpoint...');
        
        // If validation fails, try the apply endpoint as fallback
        const serviceIds: number[] = [];
        const serviceTypes: string[] = [];

        selectedBookings.forEach(booking => {
          // Use actual serviceId if available, otherwise fallback to bookingId
          const serviceIdToUse = booking.serviceId || booking.bookingId;
          serviceIds.push(serviceIdToUse);
          serviceTypes.push(booking.serviceTypes.toLowerCase());
        });

        console.log('Applying coupon with service data:', {
          serviceIds,
          serviceTypes,
          couponCode: couponCode.trim()
        });

        const response = await axios.post(`${BASE_URL}/api/coupons/apply`, {
          serviceIds,
          serviceTypes,
          couponCode: couponCode.trim()
        });

        const couponData = response.data;
        
        // Fetch coupon details to display
        const couponResponse = await axios.get(`${BASE_URL}/api/coupons/${couponCode.trim()}`);
        
        setAppliedCoupon(couponResponse.data);
        setCouponDiscount(couponData.discount);
        setCouponError('');
      }
      
    } catch (error: unknown) {
      console.error('Coupon application error:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      setCouponError(axiosError.response?.data?.message || 'Invalid coupon code');
      setAppliedCoupon(null);
      setCouponDiscount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponError('');
  };

  const fetchAvailableCoupons = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/coupons`);
      const activeCoupons = response.data.filter((coupon: CouponEntity) => 
        coupon.active && new Date(coupon.validTill) > new Date()
      );
      setAvailableCoupons(activeCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const applyCouponFromList = (coupon: CouponEntity) => {
    setCouponCode(coupon.code);
    setShowCoupons(false);
  };

  return (
    <div className="min-h-screen bg-Opacity-50 flex flex-col font-sans">
      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-800">Booking Cart</span>
            </div>
            <div className="w-8 sm:w-12 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Checkout</span>
            </div>
            <div className="w-8 sm:w-12 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center">
                <div className="w-full h-8 text-gray-700 flex items-center justify-center text-sm font-semibold">
                  3
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-600">Booking Complete</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Your Bookings</h2>

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <div className="w-full lg:max-w-2xl space-y-6">
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Bookings ({bookingItems.length})</h3>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === bookingItems.length && bookingItems.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    Select All
                  </label>
                  <button
                    onClick={handleDeleteSelected}
                    className={`flex items-center text-sm py-2 px-3 rounded border transition ${
                      selectedItems.length === 0
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-red-500 text-red-500 hover:bg-red-50'
                    }`}
                    disabled={selectedItems.length === 0}
                  >
                    <i className="fas fa-trash-alt mr-2 text-red-500"></i>
                    Delete
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="p-4 text-center text-gray-600 text-sm">Loading bookings...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600 text-sm">{error}</div>
              ) : bookingItems.length === 0 ? (
                <div className="p-4 text-center text-gray-600 text-sm">You have no bookings.</div>
              ) : (
                <ul className="space-y-4">
                  {bookingItems.map((item, index) => (
                    <li
                      key={item.bookingId}
                      className="flex items-center bg-white border border-gray-200 p-4 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.bookingId)}
                        onChange={() => handleSelectItem(item.bookingId)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-3 sm:mr-4"
                      />
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded mr-3 sm:mr-4 flex items-center justify-center">
                        <i className={`fas fa-${item.serviceTypes === 'translator' ? 'language' : item.serviceTypes === 'chef' ? 'utensils' : item.serviceTypes === 'spa' ? 'spa' : 'stethoscope'} text-gray-500 text-2xl`}></i>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{item.serviceName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Service: {item.serviceTypes.charAt(0).toUpperCase() + item.serviceTypes.slice(1)}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Schedule: {formatDateTime(item.bookingStartTime)} to {formatDateTime(item.bookingEndTime)}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Price: ₹{item.bookingAmount.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDeleteSingleItem(item.bookingId)}
                          className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md relative">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                Delivery Address
              </h3>
              {addressConfirmed ? (
                <div className="text-sm text-gray-700">
                  <p className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {getAddressSummary()}
                  </p>
                  <button
                    onClick={() => setAddressConfirmed(false)}
                    className="text-blue-500 hover:underline text-sm mt-2"
                  >
                    Change Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={addressFields.street}
                        onChange={handleAddressFieldChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={addressFields.city}
                          onChange={handleAddressFieldChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={addressFields.state}
                          onChange={handleAddressFieldChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="Enter state"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={addressFields.postalCode}
                          onChange={handleAddressFieldChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={addressFields.country}
                          onChange={handleAddressFieldChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="Enter country"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleConfirmAddress}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg transition"
                    >
                      Confirm Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                <i className="fas fa-credit-card mr-2 text-blue-500"></i>
                Payment Method
              </h3>
              {paymentConfirmed ? (
                <div className="text-sm text-gray-700">
                  <p className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {getPaymentSummary()}
                  </p>
                  <button
                    onClick={() => setPaymentConfirmed(false)}
                    className="text-blue-500 hover:underline text-sm mt-2"
                  >
                    Change Payment Method
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => handleSelectPaymentMethod(option.name)}
                        className={`flex items-center justify-between bg-gray-50 border ${
                          paymentMethod === option.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        } p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200`}
                      >
                        <div className="flex items-center">
                          <i className={`fas ${option.icon} text-gray-600 mr-3 text-xl`}></i>
                          <span className="text-sm font-medium text-gray-800">{option.label}</span>
                        </div>
                        {paymentMethod === option.name && (
                          <i className="fas fa-check-circle text-blue-500"></i>
                        )}
                      </button>
                    ))}
                  </div>
                  {paymentSuccess && (
                    <p className="text-xs text-green-600 text-center">{paymentSuccess}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md sticky top-20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Service Fee</span>
                <span>Free</span>
              </div>
              
              {/* Coupon Section */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="text-sm font-medium text-gray-800 mb-3">
                  <i className="fas fa-ticket-alt mr-2 text-blue-500"></i>
                  Apply Coupon
                </h4>
                {!appliedCoupon ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={couponLoading}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim() || selectedItems.length === 0 || total === 0}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm px-4 py-2 rounded-lg transition flex items-center"
                      >
                        {couponLoading ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-1"></i>
                            Applying...
                          </>
                        ) : (
                          'Apply'
                        )}
                      </button>
                    </div>
                    {selectedItems.length === 0 && (
                      <p className="text-xs text-amber-600">
                        <i className="fas fa-info-circle mr-1"></i>
                        Please select at least one service to apply coupon
                      </p>
                    )}
                    {total === 0 && selectedItems.length > 0 && (
                      <p className="text-xs text-amber-600">
                        <i className="fas fa-info-circle mr-1"></i>
                        Coupons cannot be applied to free services
                      </p>
                    )}
                    {couponError && (
                      <p className="text-xs text-red-600">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        {couponError}
                      </p>
                    )}
                    <div className="mt-2">
                      <button
                        onClick={() => {
                          setShowCoupons(true);
                          fetchAvailableCoupons();
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs underline"
                      >
                        View available coupons
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <i className="fas fa-check-circle text-green-500 mr-2"></i>
                          <p className="text-sm font-medium text-green-800">{appliedCoupon.code}</p>
                        </div>
                        <p className="text-xs text-green-600 mb-1">
                          {appliedCoupon.name}
                        </p>
                        <p className="text-xs text-green-600">
                          Discount: {appliedCoupon.discountType === 'PERCENTAGE' 
                            ? `${appliedCoupon.discountAmount}% off` 
                            : `₹${appliedCoupon.discountAmount} off`}
                        </p>
                        {appliedCoupon.description && (
                          <p className="text-xs text-gray-600 mt-1">{appliedCoupon.description}</p>
                        )}
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700 text-sm ml-2 p-1"
                        title="Remove coupon"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600 mb-2">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleConfirmPurchase}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!addressConfirmed || !paymentConfirmed || selectedItems.length === 0}
              >
                {processingPayment ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Booking <i className="fas fa-arrow-right ml-2"></i>
                  </>
                )}
              </button>
              {paymentGatewayError && (
                <p className="text-xs text-red-600 mt-2 text-center">{paymentGatewayError}</p>
              )}
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{paymentMethod} Details</h3>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentMethod('');
                    setPaymentDetails({});
                    setPaymentErrors({});
                    setCardIssuer(null);
                    setSelectedUPIApp(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              {paymentMethod === 'UPI' && (
                <div className="space-y-4">
                  {!selectedUPIApp ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select UPI App</label>
                      <div className="grid grid-cols-2 gap-3">
                        {upiApps.map((app) => (
                          <button
                            key={app.name}
                            onClick={() => handleSelectUPIApp(app.name)}
                            className="flex items-center bg-gray-50 border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                          >
                            <i className={`fas ${app.icon} text-gray-600 mr-2 text-lg`}></i>
                            <span className="text-sm text-gray-800">{app.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <button
                          onClick={() => setSelectedUPIApp(null)}
                          className="text-blue-500 hover:underline text-sm mr-2"
                        >
                          Change App
                        </button>
                        <span className="text-sm text-gray-700">Selected: {selectedUPIApp}</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                        <input
                          type="text"
                          name="upiId"
                          value={paymentDetails.upiId || ''}
                          onChange={handlePaymentDetailChange}
                          className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder={`Enter UPI ID (e.g., user@${upiApps.find(app => app.name === selectedUPIApp)?.handle})`}
                        />
                        {paymentErrors.upiId && (
                          <p className="text-xs text-red-600 mt-1">{paymentErrors.upiId}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber || ''}
                        onChange={handlePaymentDetailChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {cardIssuer && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          {cardIssuer}
                        </span>
                      )}
                    </div>
                    {paymentErrors.cardNumber && (
                      <p className="text-xs text-red-600 mt-1">{paymentErrors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate || ''}
                        onChange={handlePaymentDetailChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {paymentErrors.expiryDate && (
                        <p className="text-xs text-red-600 mt-1">{paymentErrors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv || ''}
                        onChange={handlePaymentDetailChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="123"
                        maxLength={3}
                      />
                      {paymentErrors.cvv && (
                        <p className="text-xs text-red-600 mt-1">{paymentErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {paymentMethod === 'Net Banking' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                    <select
                      name="bankName"
                      value={paymentDetails.bankName || ''}
                      onChange={handlePaymentDetailChange}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select a bank</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                    {paymentErrors.bankName && (
                      <p className="text-xs text-red-600 mt-1">{paymentErrors.bankName}</p>
                    )}
                  </div>
                </div>
              )}
              {(paymentMethod !== 'UPI' || selectedUPIApp) && (
                <button
                  onClick={handleConfirmPaymentDetails}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg mt-4 transition"
                >
                  Confirm Details
                </button>
              )}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="fixed bottom-4 right-4 p-4 bg-green-100 border border-green-300 text-green-700 text-sm rounded-lg shadow-lg flex items-center space-x-2">
            <span>{successMessage}</span>
            <button onClick={handleCloseSuccessMessage} className="text-green-700 hover:text-green-900">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* Available Coupons Modal */}
        {showCoupons && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Available Coupons</h2>
                <button
                  onClick={() => setShowCoupons(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="p-6">
                {availableCoupons.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-ticket-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600">No coupons available at the moment</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableCoupons.map((coupon) => (
                      <div key={coupon.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                {coupon.code}
                              </span>
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {coupon.discountType === 'PERCENTAGE' 
                                  ? `${coupon.discountAmount}% OFF` 
                                  : `₹${coupon.discountAmount} OFF`}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1">{coupon.name}</h4>
                            {coupon.description && (
                              <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                            )}
                            <p className="text-xs text-gray-500">
                              Valid till: {new Date(coupon.validTill).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => applyCouponFromList(coupon)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCart;