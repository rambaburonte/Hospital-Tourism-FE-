import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

type ServiceType = 'chef' | 'labtest' | 'doctor' | 'spa' | 'translator' | 'physio' | 'hospital' | 'hotel' | 'travel' | 'pharmacy';

interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  status: 'All' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'Pending';
  date: string;
  time: string;
  orderNumber: string;
  total: number;
  items: OrderItem[];
  // Additional fields from API for modal
  bookingId?: number;
  bookingDate?: string;
  bookingAmount?: number;
  bookingStatus?: string;
  bookingType?: ServiceType;
  bookingStartTime?: string;
  bookingEndTime?: string;
  paymentMode?: string;
  paymentStatus?: string;
  userName?: string;
  chefName?: string;
  chefId?: number;
  doctorName?: string;
  doctorId?: number;
  labtestName?: string;
  labtestId?: number;
  spaName?: string;
  spaId?: number;
  translatorName?: string;
  translatorId?: number;
  physioName?: string;
  physioId?: number;
  hospitalName?: string;
  hospitalId?: number;
  hotelName?: string;
  hotelId?: number;
  travelName?: string;
  travelId?: number;
  pharmacyName?: string;
  pharmacyId?: number;
  remarks?: string | null;
  additionalRemarks?: string | null;
}

const OrderDetailsModal: React.FC<{ order: Order | null; onClose: () => void }> = ({ order, onClose }) => {
  if (!order) return null;

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getServiceDetails = () => {
    switch (order.bookingType?.toLowerCase() as ServiceType) {
      case 'chef':
        return { name: order.chefName || 'N/A', id: order.chefId || 'N/A' };
      case 'doctor':
        return { name: order.doctorName || 'N/A', id: order.doctorId || 'N/A' };
      case 'labtest':
        return { name: order.labtestName || 'N/A', id: order.labtestId || 'N/A' };
      case 'spa':
        return { name: order.spaName || 'N/A', id: order.spaId || 'N/A' };
      case 'translator':
        return { name: order.translatorName || 'N/A', id: order.translatorId || 'N/A' };
      case 'physio':
        return { name: order.physioName || 'N/A', id: order.physioId || 'N/A' };
      case 'hospital':
        return { name: order.hospitalName || 'N/A', id: order.hospitalId || 'N/A' };
      case 'hotel':
        return { name: order.hotelName || 'N/A', id: order.hotelId || 'N/A' };
      case 'travel':
        return { name: order.travelName || 'N/A', id: order.travelId || 'N/A' };
      case 'pharmacy':
        return { name: order.pharmacyName || 'N/A', id: order.pharmacyId || 'N/A' };
      default:
        return { name: 'Unknown Service', id: 'N/A' };
    }
  };

  const serviceDetails = getServiceDetails();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Order Information</h3>
              <p><strong>Order Number:</strong> {order.orderNumber || 'N/A'}</p>
              
              <p><strong>Order Date & Time:</strong> {formatDateTime(order.bookingDate)}</p>
              <p><strong>Total Amount:</strong> ₹{order.total.toFixed(2)}</p>
              <p><strong>Payment Mode:</strong> {order.paymentMode || 'N/A'}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Service Details</h3>
              <p><strong>Service:</strong> {order.bookingType || 'N/A'}</p>
              <p><strong>Name:</strong> {serviceDetails.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Booking Schedule</h3>
              <p><strong>Start Time:</strong> {formatDateTime(order.bookingStartTime)}</p>
              <p><strong>End Time:</strong> {formatDateTime(order.bookingEndTime)}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">User Information</h3>
              <p><strong>User Name:</strong> {order.userName || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Additional Information</h3>
              <p><strong>Remarks:</strong> {order.remarks || 'None'}</p>
              <p><strong>Additional Remarks:</strong> {order.additionalRemarks || 'None'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Items</h3>
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 py-2 border-t border-gray-100">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.productName}</p>
                    <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyOrders: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Order['status'] | 'All'>('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('MyOrders.tsx: Raw stored user from localStorage:', storedUser);
    if (storedUser && (storedUser.id || storedUser.userId)) {
      const userIdToSet = storedUser.id || storedUser.userId;
      setUser({ id: userIdToSet });
      console.log('MyOrders.tsx: User state set to:', { id: userIdToSet });
    } else {
      setError('Please login to view your orders');
      setLoading(false);
      console.log('MyOrders.tsx: No user found in localStorage or invalid user data.');
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:9090/api/AddToCart/user-successful/${user?.id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('MyOrders.tsx: Fetched orders data:', response.data);

      // Transform API data to match Order interface
      const transformedOrders: Order[] = response.data.map((order: any) => {
        const bookingDate = new Date(order.bookingDate);
        // Determine productName based on bookingType
        let productName = 'Unknown Service';
        switch (order.bookingType?.toLowerCase() as ServiceType) {
          case 'chef':
            productName = order.chefName || `Chef ID: ${order.chefId || 'Unknown'}`;
            break;
          case 'labtest':
            productName = order.labtestName || `Lab Test ID: ${order.labtestId || 'Unknown'}`;
            break;
          case 'doctor':
            productName = order.doctorName || `Doctor ID: ${order.doctorId || 'Unknown'}`;
            break;
          case 'spa':
            productName = order.spaName || `Spa ID: ${order.spaId || 'Unknown'}`;
            break;
          case 'translator':
            productName = order.translatorName || `Translator ID: ${order.translatorId || 'Unknown'}`;
            break;
          case 'physio':
            productName = order.physioName || `Physiotherapist ID: ${order.physioId || 'Unknown'}`;
            break;
          case 'hospital':
            productName = order.hospitalName || `Hospital ID: ${order.hospitalId || 'Unknown'}`;
            break;
          case 'hotel':
            productName = order.hotelName || `Hotel ID: ${order.hotelId || 'Unknown'}`;
            break;
          case 'travel':
            productName = order.travelName || `Travel ID: ${order.travelId || 'Unknown'}`;
            break;
          case 'pharmacy':
            productName = order.pharmacyName || `Pharmacy ID: ${order.pharmacyId || 'Unknown'}`;
            break;
          default:
            productName = order.serviceName || 'Unknown Service';
        }

        const items = order.items && Array.isArray(order.items) ? order.items : [{
          productId: order.bookingId || 0,
          productName,
          productImage: order.serviceImageUrl || 'https://placehold.co/60x60?text=No+Image',
          price: order.bookingAmount || 0,
          quantity: 1,
        }];

        return {
          id: (order.bookingId || '').toString(),
          status: order.bookingStatus || 'Pending',
          date: bookingDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
          time: bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          orderNumber: order.orderNumber || `ORD${order.bookingId || 'UNKNOWN'}`,
          total: order.bookingAmount || 0,
          items: items.map((item: any) => ({
            productId: item.productId || item.id || order.bookingId || 0,
            productName: item.productName || item.serviceName || productName,
            productImage: item.productImage || item.serviceImageUrl || 'https://placehold.co/60x60?text=No+Image',
            price: item.price || item.bookingAmount || order.bookingAmount || 0,
            quantity: item.quantity || 1,
          })),
          // Store additional API fields for modal
          bookingId: order.bookingId,
          bookingDate: order.bookingDate,
          bookingAmount: order.bookingAmount,
          bookingStatus: order.bookingStatus,
          bookingType: order.bookingType,
          bookingStartTime: order.bookingStartTime,
          bookingEndTime: order.bookingEndTime,
          paymentMode: order.paymentMode,
          paymentStatus: order.paymentStatus,
          userName: order.userName,
          chefName: order.chefName,
          chefId: order.chefId,
          doctorName: order.doctorName,
          doctorId: order.doctorId,
          labtestName: order.labtestName,
          labtestId: order.labtestId,
          spaName: order.spaName,
          spaId: order.spaId,
          translatorName: order.translatorName,
          translatorId: order.translatorId,
          physioName: order.physioName,
          physioId: order.physioId,
          hospitalName: order.hospitalName,
          hospitalId: order.hospitalId,
          hotelName: order.hotelName,
          hotelId: order.hotelId,
          travelName: order.travelName,
          travelId: order.travelId,
          pharmacyName: order.pharmacyName,
          pharmacyId: order.pharmacyId,
          remarks: order.remarks,
          additionalRemarks: order.additionalRemarks,
        };
      });

      setOrders(transformedOrders);
    } catch (err: any) {
      console.error('MyOrders.tsx: Error fetching orders:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    selectedTab === 'All' ? true : order.status === selectedTab
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Shipped':
        return 'bg-yellow-500';
      case 'Cancelled':
        return 'bg-red-500';
      case 'Returned':
        return 'bg-gray-500';
      case 'Pending':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
            <p className="text-red-500">{error}</p>
            {error.includes('login') && (
              <button
                onClick={() => window.location.href = '/login'}
                className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex space-x-4 border-b border-gray-200 pb-4">
            {['All', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 rounded-md text-sm font-medium ${
                  selectedTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab(tab as Order['status'] | 'All')}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {filteredOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No orders found for this status.</p>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                    {order.status === 'Delivered' && (
                      <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                        <Star className="w-4 h-4 mr-1 fill-current" /> Rate & Review Product
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>
                      {order.date} {order.time}
                    </span>
                    <span>Order No: {order.orderNumber}</span>
                    <span className="font-semibold text-gray-800">Total: ₹{order.total}</span>
                  </div>

                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center space-x-4 py-2 border-t border-gray-100 first:border-t-0"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{item.productName}</p>
                        <p className="text-gray-600 text-sm">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium border border-gray-300 rounded-md px-3 py-1"
                      >
                        Order Details
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default MyOrders;