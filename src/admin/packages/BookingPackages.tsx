import React, { useState, useEffect } from 'react';
import { Eye, Search, Calendar, User, Package, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface BookingPackage {
  id: number;
  userId: number;
  servicePackageId: number;
  bookingDate: string;
  status: string;
  totalPrice: number;
  userName: string;
  phNumber: number;
  email: string;
  address: string;
  servicePackageName: string;
  servicePackageDescription: string;
  servicePackageImageUrl: string;
  servicePackageCategory: string;
  servicePackageType: string;
  servicePackageDuration: string;
  servicePackagePrice: string;
  servicePackageStatus: string;
}

const BookingPackages: React.FC = () => {
  const [bookings, setBookings] = useState<BookingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<BookingPackage | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/admin/packege/bookings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.servicePackageName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      CONFIRMED: 'bg-green-100 text-green-800 border-green-200',
      CANCELLED: 'bg-red-100 text-red-800 border-red-200',
      COMPLETED: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    const statusIcons = {
      PENDING: <Clock className="w-3 h-3" />,
      CONFIRMED: <CheckCircle className="w-3 h-3" />,
      CANCELLED: <XCircle className="w-3 h-3" />,
      COMPLETED: <CheckCircle className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {statusIcons[status as keyof typeof statusIcons]}
        {status}
      </span>
    );
  };

  const handleViewDetails = (booking: BookingPackage) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Bookings</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchBookings}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Package Bookings Management</h1>
          <p className="text-gray-600">Manage and monitor all package bookings</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by customer name, email, or package name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.filter(b => b.status === 'CONFIRMED').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No bookings found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-2" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{booking.userName}</p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {booking.servicePackageImageUrl && (
                            <img
                              src={booking.servicePackageImageUrl}
                              alt={booking.servicePackageName}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                              {booking.servicePackageName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.servicePackageDuration} days
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                          {booking.totalPrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Details Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedBooking.userName}</p>
                      <p><span className="font-medium">Email:</span> {selectedBooking.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedBooking.phNumber}</p>
                      <p><span className="font-medium">Address:</span> {selectedBooking.address}</p>
                    </div>
                  </div>

                  {/* Package Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Package Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        {selectedBooking.servicePackageImageUrl && (
                          <img
                            src={selectedBooking.servicePackageImageUrl}
                            alt={selectedBooking.servicePackageName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-lg">{selectedBooking.servicePackageName}</p>
                          <p className="text-gray-600">{selectedBooking.servicePackageDescription}</p>
                        </div>
                      </div>
                      <p><span className="font-medium">Category:</span> {selectedBooking.servicePackageCategory}</p>
                      <p><span className="font-medium">Type:</span> {selectedBooking.servicePackageType}</p>
                      <p><span className="font-medium">Duration:</span> {selectedBooking.servicePackageDuration} days</p>
                      <p><span className="font-medium">Package Price:</span> ${selectedBooking.servicePackagePrice}</p>
                      <p><span className="font-medium">Package Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedBooking.servicePackageStatus === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedBooking.servicePackageStatus}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><span className="font-medium">Booking ID:</span> #{selectedBooking.id}</p>
                      <p><span className="font-medium">Booking Date:</span> {new Date(selectedBooking.bookingDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Status:</span> {getStatusBadge(selectedBooking.status)}</p>
                      <p><span className="font-medium">Total Price:</span> <span className="text-lg font-bold text-green-600">${selectedBooking.totalPrice.toLocaleString()}</span></p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default BookingPackages;
