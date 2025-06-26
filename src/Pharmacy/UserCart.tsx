import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BASE_URL } from '@/config/config';


// Fix Leaflet marker icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const loadExternalAssets = () => {
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
  document.head.appendChild(faLink);

  const leafletLink = document.createElement('link');
  leafletLink.rel = 'stylesheet';
  leafletLink.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
  document.head.appendChild(leafletLink);
};

interface CartItem {
  cartId: number;
  userId: number;
  medicineid: number;
  medicineName: string;
  medicineImage: string;
  medicinePrice: number;
  quantity: number;
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

const UserCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [addressFields, setAddressFields] = useState<AddressFields>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fetchingLocation, setFetchingLocation] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [addressConfirmed, setAddressConfirmed] = useState<boolean>(false);
  const [locationSuccess, setLocationSuccess] = useState<string | null>(null);
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
      setLoading(false); // Stop loading if no user is found
    }
  }, []);

  // const base_url = "https://healthtourism-5.onrender.com";

  useEffect(() => {
    if (!user?.id) return; // Only fetch cart items if user ID exists

    setLoading(true);
    axios
      .get<CartItem[]>(`${BASE_URL}/cart-item/user/cart/${user.id}`)
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch cart items');
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    loadExternalAssets();
  }, []);

  // If no user is logged in, show the login message
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-sm text-gray-600 mb-4">You need to be logged in to view your cart.</p>
          <a
            href="/login" // Adjust this to your login route
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Rest of the existing code remains unchanged
  const total = cartItems.reduce((acc, item) => acc + item.medicinePrice * item.quantity, 0);

  const handleGetLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setFetchingLocation(true);
    setLocationError(null);
    setCoordinates(null);
    setLocationSuccess(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                'User-Agent': 'MedicalVisions/1.0 (contact: support@medicalvisions.com)',
              },
            }
          );
          const addressData = response.data;
          if (addressData && addressData.address) {
            setAddressFields({
              street: addressData.address.road || addressData.address.street || '',
              city: addressData.address.city || addressData.address.town || addressData.address.village || '',
              state: addressData.address.state || '',
              postalCode: addressData.address.postcode || '',
              country: addressData.address.country || '',
            });
            setLocationSuccess('Location fetched successfully!');
            setTimeout(() => setLocationSuccess(null), 3000);
          } else {
            setLocationError('Unable to fetch address from location.');
          }
        } catch (err) {
          setLocationError('Failed to fetch address from location.');
        } finally {
          setFetchingLocation(false);
        }
      },
      (err) => {
        setLocationError('Permission denied or location unavailable. Please select a location on the map or enter manually.');
        setFetchingLocation(false);
      }
    );
  };

  const handleMapClick = async (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocationError(null);
    setLocationSuccess(null);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            'User-Agent': 'MedicalVisions/1.0 (contact: support@medicalvisions.com)',
          },
        }
      );
      const addressData = response.data;
      if (addressData && addressData.address) {
        setAddressFields({
          street: addressData.address.road || addressData.address.street || '',
          city: addressData.address.city || addressData.address.town || addressData.address.village || '',
          state: addressData.address.state || '',
          postalCode: addressData.address.postcode || '',
          country: addressData.address.country || '',
        });
        setLocationSuccess('Location updated from map selection!');
        setTimeout(() => setLocationSuccess(null), 3000);
      } else {
        setLocationError('Unable to fetch address from map selection.');
      }
    } catch (err) {
      setLocationError('Failed to fetch address from map selection.');
    }
  };

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        handleMapClick(lat, lng);
      },
    });
    return null;
  };

  const handleAddressFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmAddress = () => {
    const { street, city, country } = addressFields;
    if (!street || !city || !country) {
      setLocationError('Please fill in at least Street Address, City, and Country.');
      return;
    }
    setAddressConfirmed(true);
    setLocationError(null);
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
      setSuccessMessage('Purchase confirmed successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);

      setAddressFields({ street: '', city: '', state: '', postalCode: '', country: '' });
      setPaymentMethod('');
      setPaymentDetails({});
      setCoordinates(null);
      setCartItems([]);
      setSelectedItems([]);
      setAddressConfirmed(false);
      setPaymentConfirmed(false);
    }
  };

  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSelectItem = (cartId: number) => {
    setSelectedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.cartId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    try {
      const queryString = selectedItems.map(id => `cartIds=${id}`).join('&');
      await axios.delete(`${BASE_URL}/cart-item/user/cart/clear?${queryString}`);
      setCartItems((prev) => prev.filter((item) => !selectedItems.includes(item.cartId)));
      setSelectedItems([]);
    } catch (err) {
      setError('Failed to delete selected items. Please try again.');
    }
  };

  const handleDeleteSingleItem = async (cartId: number) => {
    try {
      await axios.delete(`${BASE_URL}/cart-item/user/cart/clear/${cartId}`);
      setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
      setSelectedItems((prev) => prev.filter((id) => id !== cartId));
    } catch (err) {
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <div className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-800">Shopping Cart</span>
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
              <span className="ml-2 text-sm text-gray-600">Order Complete</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3 text-gray-900 font-bold text-black mb-6 text-center">Your Order</h2>

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <div className="w-full lg:max-w-2xl space-y-6">
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Cart Items ({cartItems.length})</h3>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length && cartItems.length > 0}
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
                <div className="p-4 text-center text-gray-600 text-sm">Loading cart items...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600 text-sm">{error}</div>
              ) : cartItems.length === 0 ? (
                <div className="p-4 text-center text-gray-600 text-sm">Your cart is empty.</div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.cartId}
                      className="flex items-center bg-white border border-gray-200 p-4 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.cartId)}
                        onChange={() => handleSelectItem(item.cartId)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-3 sm:mr-4"
                      />
                      <img
                        src={item.medicineImage}
                        alt={item.medicineName}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded mr-3 sm:mr-4"
                        onError={(e) =>
                          (e.currentTarget.src = 'https://via.placeholder.com/80x80?text=No+Image')
                        }
                      />
                      <div className="flex-grow">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-800">{item.medicineName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Price: ₹{item.medicinePrice.toFixed(2)}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                          className="bg-gray-200 text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 transition"
                          disabled={item.quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="text-sm text-gray-800 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                          className="bg-gray-200 text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 transition"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteSingleItem(item.cartId)}
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

            {/* Address Section - Always Visible */}
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
                  <div className="w-full h-64 rounded-lg border border-gray-200 relative overflow-hidden">
                    <MapContainer
                      center={coordinates ? [coordinates.lat, coordinates.lon] : [20.5937, 78.9629]}
                      zoom={coordinates ? 15 : 5}
                      style={{ height: '100%', width: '100%', position: 'relative', zIndex: 10 }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {coordinates && (
                        <Marker position={[coordinates.lat, coordinates.lon]} />
                      )}
                      <MapClickHandler />
                    </MapContainer>
                  </div>
                  <button
                    onClick={handleGetLiveLocation}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg transition flex items-center justify-center"
                    disabled={fetchingLocation}
                  >
                    {fetchingLocation ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Fetching Location...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-location-arrow mr-2"></i>
                        Use Current Location
                      </>
                    )}
                  </button>
                  {locationSuccess && (
                    <p className="text-xs text-green-600 text-center">{locationSuccess}</p>
                  )}
                  {locationError && (
                    <p className="text-xs text-red-600 text-center">{locationError}</p>
                  )}
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

            {/* Payment Section - Always Visible */}
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleConfirmPurchase}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!addressConfirmed || !paymentConfirmed || cartItems.length === 0}
              >
                {processingPayment ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order <i className="fas fa-arrow-right ml-2"></i>
                  </>
                )}
              </button>
              {paymentGatewayError && (
                <p className="text-xs text-red-600 mt-2 text-center">{paymentGatewayError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Details Modal */}
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

export default UserCart;