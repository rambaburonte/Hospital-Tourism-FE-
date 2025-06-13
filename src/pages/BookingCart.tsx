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
    if (storedUser && storedUser.id) {
      setUser(storedUser);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      const storedBookings = JSON.parse(localStorage.getItem("bookingCart") || "[]");
      setBookingItems(storedBookings);
        setLoading(false);
    } catch (err) {
      setError('Failed to load bookings from cart');
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExternalAssets();
  }, []);

  const total = bookingItems.reduce((acc, item) => acc + item.bookingAmount, 0);

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

    const paymentSuccess = await mockProcessPayment();
    if (paymentSuccess) {
      setSuccessMessage('Booking confirmed successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);

      setAddressFields({ street: '', city: '', state: '', postalCode: '', country: '' });
      setPaymentMethod('');
      setPaymentDetails({});
      setBookingItems([]);
      setSelectedItems([]);
      setAddressConfirmed(false);
      setPaymentConfirmed(false);
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

  const handleDeleteSelected = () => {
    const updatedBookings = bookingItems.filter(item => !selectedItems.includes(item.bookingId));
    setBookingItems(updatedBookings);
    setSelectedItems([]);
    localStorage.setItem("bookingCart", JSON.stringify(updatedBookings));
  };

  const handleDeleteSingleItem = (bookingId: number) => {
    const updatedBookings = bookingItems.filter(item => item.bookingId !== bookingId);
    setBookingItems(updatedBookings);
    localStorage.setItem("bookingCart", JSON.stringify(updatedBookings));
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

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRemoveBooking = (index: number) => {
    const updatedBookings = bookingItems.filter((_, i) => i !== index);
    setBookingItems(updatedBookings);
    localStorage.setItem("bookingCart", JSON.stringify(updatedBookings));
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
                        <p className="text-xs sm:text-sm text-gray-600">Time: {formatTime(item.bookingStartTime)} - {formatTime(item.bookingEndTime)}</p>
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
                          placeholder="Enter postal code"
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
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Service Fee</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleConfirmPurchase}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!addressConfirmed || !paymentConfirmed || bookingItems.length === 0}
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
      </div>
    </div>
  );
};

export default BookingCart;