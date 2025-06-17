
import React, { useState, FormEvent, FC } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';
interface BookingRequest {
  serviceTypes: string[];
  bookingAmounts: number[];
  bookingStartDate: string;
  bookingEndDate: string;
  paymentMode: string;
  bookingType: string;
  remarks: string;
}

interface BookingResponse {
  bookingId: string;
  bookingStatus: string;
  bookingAmount: number;
  doctorName?: string;
  translatorName?: string;
  physioName?: string;
  labtestName?: string;
  spaName?: string;
  chefName?: string;
}

const serviceTypes = ['chef', 'physio', 'translator', 'spa', 'labtests', 'doctor'];

const BookingForm: FC = () => {
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
    serviceTypes: [],
    bookingAmounts: [],
    bookingStartDate: '2025-06-12T10:00:00',
    bookingEndDate: '2025-06-12T12:00:00',
    paymentMode: 'online',
    bookingType: 'package',
    remarks: 'Health and wellness combo',
  });
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [bookingAmounts, setBookingAmounts] = useState<{ [key: string]: number }>({
    chef: 1000.0,
    spa: 1500.0,
    doctor: 1200.0,
    physio: 0,
    translator: 0,
    labtests: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<BookingResponse | null>(null);
  const [logoError, setLogoError] = useState<boolean>(false);

  const handleClearServices = () => {
    setSelectedServiceTypes([]);
    setFormData((prev) => ({ ...prev, serviceTypes: [], bookingAmounts: [] }));
    setBookingAmounts({
      chef: 1000.0,
      spa: 1500.0,
      doctor: 1200.0,
      physio: 0,
      translator: 0,
      labtests: 0,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountChange = (service: string, value: string) => {
    setBookingAmounts((prev) => ({
      ...prev,
      [service]: parseFloat(value) || 0,
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedServiceTypes((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value)
    );
    setFormData((prev) => ({
      ...prev,
      serviceTypes: checked
        ? [...prev.serviceTypes, value]
        : prev.serviceTypes.filter((t) => t !== value),
      bookingAmounts: checked
        ? [...prev.bookingAmounts, bookingAmounts[value]]
        : prev.bookingAmounts.filter((_, i) => prev.serviceTypes[i] !== value),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedServiceTypes.length === 0) {
      setError('Please select at least one service type');
      return;
    }
    if (!formData.bookingStartDate || !formData.bookingEndDate) {
      setError('Please provide valid start and end dates');
      return;
    }
    if (!user) {
      setError('User not logged in');
      return;
    }
    if (selectedServiceTypes.some((service) => bookingAmounts[service] <= 0)) {
      setError('Please provide valid amounts for all selected services');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/bookings/book-package/${user.id}`,
        {
          ...formData,
          bookingAmounts: selectedServiceTypes.map((service) => bookingAmounts[service]),
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setResponse(response.data);
      setFormData({
        serviceTypes: [],
        bookingAmounts: [],
        bookingStartDate: '2025-06-12T10:00:00',
        bookingEndDate: '2025-06-12T12:00:00',
        paymentMode: 'online',
        bookingType: 'package',
        remarks: 'Health and wellness combo',
      });
      setSelectedServiceTypes([]);
      setBookingAmounts({
        chef: 1000.0,
        spa: 1500.0,
        doctor: 1200.0,
        physio: 0,
        translator: 0,
        labtests: 0,
      });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
        <header className="flex items-center justify-between">
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
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          )}
        </header>

        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Book Your Package
        </h1>

        {!user ? (
          <div className="p-6 bg-amber-100 rounded-lg text-center space-y-4">
            <p className="text-amber-900 font-medium">Please log in to book a package.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-sm text-gray-600 text-center">
              Logged in as: <span className="font-semibold text-indigo-700">{user.userName}</span> (ID: {user.id})
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Service Types</label>
                <p className="text-xs text-gray-500">Select one or more services and specify amounts</p>
                <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 space-y-2">
                  {serviceTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          value={type}
                          checked={selectedServiceTypes.includes(type)}
                          onChange={handleServiceChange}
                          className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label className="text-sm text-gray-800">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      </div>
                      {selectedServiceTypes.includes(type) && (
                        <input
                          type="number"
                          value={bookingAmounts[type]}
                          onChange={(e) => handleAmountChange(type, e.target.value)}
                          step="0.01"
                          min="0"
                          placeholder="Amount"
                          className="w-32 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                        />
                      )}
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
                    <button
                      type="button"
                      onClick={handleClearServices}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="datetime-local"
                    name="bookingStartDate"
                    value={formData.bookingStartDate.slice(0, 16)}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="datetime-local"
                    name="bookingEndDate"
                    value={formData.bookingEndDate.slice(0, 16)}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
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
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="Optional remarks..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || selectedServiceTypes.length === 0}
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
                  <span>Confirm Package Booking</span>
                )}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="p-6 bg-green-100 rounded-lg text-green-800 space-x-auto">
            <h2 className="text-xl font-semibold text-green-900">Booking Confirmed!</h2>
            <p><strong>Booking ID:</strong> {response.bookingId}</p>
            <p><strong>Services:</strong> {formData.serviceTypes.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</p>
            <p><strong>Status:</strong> {response.bookingStatus}</p>
            <p><strong>Total Amount:</strong> ₹{response.bookingAmount}</p>
            <p>
              <strong>Slot:</strong>{' '}
              {formData.bookingStartDate &&
                `${new Date(formData.bookingStartDate).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })} - ${new Date(formData.bookingEndDate).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })} (${new Date(formData.bookingStartDate).toLocaleDateString()})`}
            </p>
            {response.doctorName && <p><strong>Doctor:</strong> {response.doctorName}</p>}
            {response.translatorName && <p><strong>Translator:</strong> {response.translatorName}</p>}
            {response.physioName && <p><strong>Physio:</strong> {response.physioName}</p>}
            {response.labtestName && <p><strong>Lab Test:</strong> {response.labtestName}</p>}
            {response.spaName && <p><strong>Spa:</strong> {response.spaName}</p>}
            {response.chefName && <p><strong>Chef:</strong> {response.chefName}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;