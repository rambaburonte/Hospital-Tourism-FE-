// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { BASE_URL } from '@/config/config';

// type ServiceType = 'chef' | 'labtest' | 'doctor' | 'spa' | 'translator' | 'physio' | 'hospital' | 'hotel' | 'travel' | 'pharmacy';

// interface OrderItem {
//   productId: number;
//   productName: string;
//   productImage: string;
//   price: number;
//   quantity: number;
// }

// interface Order {
//   id: string;
//   status: 'All' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'Pending';
//   date: string;
//   time: string;
//   orderNumber: string;
//   total: number;
//   items: OrderItem[];
//   bookingId?: number;
//   bookingDate?: string;
//   bookingAmount?: number;
//   bookingStatus?: string;
//   bookingType?: ServiceType;
//   bookingStartTime?: string;
//   bookingEndTime?: string;
//   paymentMode?: string;
//   paymentStatus?: string;
//   userName?: string;
//   chefName?: string;
//   chefId?: number;
//   doctorName?: string;
//   doctorId?: number;
//   labtestName?: string;
//   labtestId?: number;
//   spaName?: string;
//   spaId?: number;
//   translatorName?: string;
//   translatorId?: number;
//   physioName?: string;
//   physioId?: number;
//   hospitalName?: string;
//   hospitalId?: number;
//   hotelName?: string;
//   hotelId?: number;
//   travelName?: string;
//   travelId?: number;
//   pharmacyName?: string;
//   pharmacyId?: number;
//   remarks?: string | null;
//   additionalRemarks?: string | null;
//   userId?: string;
// }

// const AllOrders: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState<Order['status'] | 'All'>('All');
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
//   const [userDetails, setUserDetails] = useState<Record<string, any>>({});
//   const [userLoading, setUserLoading] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // Fetch user details for all unique user IDs in orders
//   useEffect(() => {
//     const userIds = Array.from(new Set(orders.map((order) => order.userId).filter(Boolean)));
//     userIds.forEach((userId) => {
//       if (userId && !userDetails[userId] && !userLoading[userId]) {
//         fetchUserDetails(userId);
//       }
//     });
//     // eslint-disable-next-line
//   }, [orders]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get('http://localhost:9090/api/AddToCart/admin/bookings/success', {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const transformedOrders: Order[] = response.data.map((order: any) => {
//         const bookingDate = new Date(order.bookingDate);
//         let productName = 'Unknown Service';
//         switch (order.bookingType?.toLowerCase() as ServiceType) {
//           case 'chef':
//             productName = order.chefName || `Chef ID: ${order.chefId || 'Unknown'}`;
//             break;
//           case 'labtest':
//             productName = order.labtestName || `Lab Test ID: ${order.labtestId || 'Unknown'}`;
//             break;
//           case 'doctor':
//             productName = order.doctorName || `Doctor ID: ${order.doctorId || 'Unknown'}`;
//             break;
//           case 'spa':
//             productName = order.spaName || `Spa ID: ${order.spaId || 'Unknown'}`;
//             break;
//           case 'translator':
//             productName = order.translatorName || `Translator ID: ${order.translatorId || 'Unknown'}`;
//             break;
//           case 'physio':
//             productName = order.physioName || `Physiotherapist ID: ${order.physioId || 'Unknown'}`;
//             break;
//           case 'hospital':
//             productName = order.hospitalName || `Hospital ID: ${order.hospitalId || 'Unknown'}`;
//             break;
//           case 'hotel':
//             productName = order.hotelName || `Hotel ID: ${order.hotelId || 'Unknown'}`;
//             break;
//           case 'travel':
//             productName = order.travelName || `Travel ID: ${order.travelId || 'Unknown'}`;
//             break;
//           case 'pharmacy':
//             productName = order.pharmacyName || `Pharmacy ID: ${order.pharmacyId || 'Unknown'}`;
//             break;
//           default:
//             productName = order.serviceName || 'Unknown Service';
//         }

//         const items = order.items && Array.isArray(order.items) ? order.items : [{
//           productId: order.bookingId || 0,
//           productName,
//           productImage: order.serviceImageUrl || 'https://placehold.co/60x60?text=No+Image',
//           price: order.bookingAmount || 0,
//           quantity: 1,
//         }];

//         return {
//           id: (order.bookingId || '').toString(),
//           status: order.bookingStatus || 'Pending',
//           date: bookingDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
//           time: bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//           orderNumber: order.orderNumber || `ORD${order.bookingId || 'UNKNOWN'}`,
//           total: order.bookingAmount || 0,
//           items: items.map((item: any) => ({
//             productId: item.productId || item.id || order.bookingId || 0,
//             productName: item.productName || item.serviceName || productName,
//             productImage: item.productImage || item.serviceImageUrl || 'https://placehold.co/60x60?text=No+Image',
//             price: item.price || item.bookingAmount || order.bookingAmount || 0,
//             quantity: item.quantity || 1,
//           })),
//           bookingId: order.bookingId,
//           bookingDate: order.bookingDate,
//           bookingAmount: order.bookingAmount,
//           bookingStatus: order.bookingStatus,
//           bookingType: order.bookingType,
//           bookingStartTime: order.bookingStartTime,
//           bookingEndTime: order.bookingEndTime,
//           paymentMode: order.paymentMode,
//           paymentStatus: order.paymentStatus,
//           userName: order.userName,
//           chefName: order.chefName,
//           chefId: order.chefId,
//           doctorName: order.doctorName,
//           doctorId: order.doctorId,
//           labtestName: order.labtestName,
//           labtestId: order.labtestId,
//           spaName: order.spaName,
//           spaId: order.spaId,
//           translatorName: order.translatorName,
//           translatorId: order.translatorId,
//           physioName: order.physioName,
//           physioId: order.physioId,
//           hospitalName: order.hospitalName,
//           hospitalId: order.hospitalId,
//           hotelName: order.hotelName,
//           hotelId: order.hotelId,
//           travelName: order.travelName,
//           travelId: order.travelId,
//           pharmacyName: order.pharmacyName,
//           pharmacyId: order.pharmacyId,
//           remarks: order.remarks,
//           additionalRemarks: order.additionalRemarks,
//           userId: order.userId,
//         };
//       });

//       setOrders(transformedOrders);
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || 'Failed to fetch orders. Please try again later.';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter((order) =>
//     selectedTab === 'All' ? true : order.status === selectedTab
//   );

//   const getStatusColor = (status: Order['status']) => {
//     switch (status) {
//       case 'Delivered':
//         return 'bg-green-500';
//       case 'Shipped':
//         return 'bg-yellow-500';
//       case 'Cancelled':
//         return 'bg-red-500';
//       case 'Returned':
//         return 'bg-gray-500';
//       case 'Pending':
//         return 'bg-blue-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const formatDateTime = (dateStr?: string) => {
//     if (!dateStr) return 'N/A';
//     const date = new Date(dateStr);
//     return date.toLocaleString('en-US', {
//       month: '2-digit',
//       day: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const getServiceDetails = (order: Order) => {
//     switch (order.bookingType?.toLowerCase() as ServiceType) {
//       case 'chef':
//         return { name: order.chefName || 'N/A', id: order.chefId || 'N/A' };
//       case 'doctor':
//         return { name: order.doctorName || 'N/A', id: order.doctorId || 'N/A' };
//       case 'labtest':
//         return { name: order.labtestName || 'N/A', id: order.labtestId || 'N/A' };
//       case 'spa':
//         return { name: order.spaName || 'N/A', id: order.spaId || 'N/A' };
//       case 'translator':
//         return { name: order.translatorName || 'N/A', id: order.translatorId || 'N/A' };
//       case 'physio':
//         return { name: order.physioName || 'N/A', id: order.physioId || 'N/A' };
//       case 'hospital':
//         return { name: order.hospitalName || 'N/A', id: order.hospitalId || 'N/A' };
//       case 'hotel':
//         return { name: order.hotelName || 'N/A', id: order.hotelId || 'N/A' };
//       case 'travel':
//         return { name: order.travelName || 'N/A', id: order.travelId || 'N/A' };
//       case 'pharmacy':
//         return { name: order.pharmacyName || 'N/A', id: order.pharmacyId || 'N/A' };
//       default:
//         return { name: 'Unknown Service', id: 'N/A' };
//     }
//   };

//   // Fetch user details by userId
//   const fetchUserDetails = async (userId: string) => {
//     if (!userId || userDetails[userId] || userLoading[userId]) return;
//     setUserLoading((prev) => ({ ...prev, [userId]: true }));
//     try {
//       const response = await axios.get(`${BASE_URL}/user/get-patients/${userId}`);
//       setUserDetails((prev) => ({ ...prev, [userId]: response.data }));
//     } catch (err) {
//       setUserDetails((prev) => ({ ...prev, [userId]: { error: 'Failed to load user details' } }));
//     } finally {
//       setUserLoading((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 py-8">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
//             <p className="text-red-500">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto px-4">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h1>

//         <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//           <div className="flex space-x-4 border-b border-gray-200 pb-4">
//             {['All', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending'].map((tab) => (
//               <button
//                 key={tab}
//                 className={`py-2 px-4 rounded-md text-sm font-medium ${
//                   selectedTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//                 onClick={() => setSelectedTab(tab as Order['status'] | 'All')}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="mt-4">
//             {filteredOrders.length === 0 ? (
//               <p className="text-gray-500 text-center py-10">No orders found for this status.</p>
//             ) : (
//               filteredOrders.map((order) => {
//                 const expanded = expandedOrderId === order.id;
//                 const serviceDetails = getServiceDetails(order);
//                 const user = order.userId ? userDetails[order.userId] : null;
//                 const isUserLoading = order.userId ? userLoading[order.userId] : false;
//                 return (
//                   <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 transition-all">
//                     <div className="flex justify-between items-center mb-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(order.status)}`}
//                       >
//                         {order.paymentStatus}
//                       </span>
//                       <button
//                         className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium border border-gray-300 rounded-md px-3 py-1"
//                         onClick={() => setExpandedOrderId(expanded ? null : order.id)}
//                         aria-expanded={expanded}
//                         aria-controls={`order-details-${order.id}`}
//                       >
//                         {expanded ? (
//                           <>
//                             Less Details <ChevronUp className="ml-1 w-4 h-4" />
//                           </>
//                         ) : (
//                           <>
//                             More Details <ChevronDown className="ml-1 w-4 h-4" />
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//                       <span>
//                         {order.date} {order.time}
//                       </span>
//                       <span>Order No: {order.orderNumber}</span>
//                       <span className="font-semibold text-gray-800">Total: ₹{order.total}</span>
//                     </div>

//                     {/* User Information Section (always visible) */}
//                     <div className="mb-2">
//                       <h3 className="text-xs font-semibold text-gray-600 mb-1">User Information</h3>
//                       <div className="text-sm text-gray-700">
//                         {isUserLoading ? (
//                           <span>Loading user details...</span>
//                         ) : user && !user.error ? (
//                           <>
//                             <div><strong>Name:</strong> {user.name || order.userName || 'N/A'}</div>
//                             {user.email && <div><strong>Email:</strong> {user.email}</div>}
//                             {user.mobilenum && <div><strong>Mobile:</strong> {user.mobilenum}</div>}
//                             {user.country && <div><strong>Country:</strong> {user.country}</div>}
//                           </>
//                         ) : (
//                           <span><strong>Name:</strong> {order.userName || 'N/A'}</span>
//                         )}
//                       </div>
//                     </div>

//                     {order.items.map((item) => (
//                       <div
//                         key={item.productId}
//                         className="flex items-center space-x-4 py-2 border-t border-gray-100 first:border-t-0"
//                       >
//                         <img
//                           src={item.productImage}
//                           alt={item.productName}
//                           className="w-16 h-16 object-cover rounded-md"
//                         />
//                         <div className="flex-1">
//                           <p className="text-gray-800 font-medium">{item.productName}</p>
//                           <p className="text-gray-600 text-sm">
//                             ₹{item.price} x {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                     ))}

//                     {expanded && (
//                       <div id={`order-details-${order.id}`} className="mt-6 border-t pt-4 space-y-4">
//                         <div>
//                           <h3 className="text-sm font-semibold text-gray-600">Order Information</h3>
//                           <p><strong>Order Number:</strong> {order.orderNumber || 'N/A'}</p>
//                           <p><strong>Order Date & Time:</strong> {formatDateTime(order.bookingDate)}</p>
//                           <p><strong>Total Amount:</strong> ₹{order.total.toFixed(2)}</p>
//                           <p><strong>Payment Mode:</strong> {order.paymentMode || 'N/A'}</p>
//                           <p><strong>Payment Status:</strong> {order.paymentStatus || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-gray-600">Service Details</h3>
//                           <p><strong>Service:</strong> {order.bookingType || 'N/A'}</p>
//                           <p><strong>Name:</strong> {serviceDetails.name}</p>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-gray-600">Booking Schedule</h3>
//                           <p><strong>Start Time:</strong> {formatDateTime(order.bookingStartTime)}</p>
//                           <p><strong>End Time:</strong> {formatDateTime(order.bookingEndTime)}</p>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-gray-600">User Information</h3>
//                           <p><strong>User Name:</strong> {order.userName || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <h3 className="text-sm font-semibold text-gray-600">Additional Information</h3>
//                           <p><strong>Remarks:</strong> {order.remarks || 'None'}</p>
//                           <p><strong>Additional Remarks:</strong> {order.additionalRemarks || 'None'}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllOrders;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp, UserCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

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
  status: 'All' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'Pending' | 'Completed' | 'InProgress' | 'New';
  date: string;
  time: string;
  orderNumber: string;
  total: number;
  items: OrderItem[];
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
  userId?: string;
}

const TABS = [
  { label: 'Orders', key: 'orders' }
];

const ORDERS_PER_PAGE = 12;

const statusMap: Record<string, { label: string; color: string }> = {
  Completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  InProgress: { label: 'InProgress', color: 'bg-blue-100 text-blue-700' },
  Pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  Cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  New: { label: 'New', color: 'bg-gray-100 text-gray-700' },
  Delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700' },
  Shipped: { label: 'Shipped', color: 'bg-blue-100 text-blue-700' },
  Returned: { label: 'Returned', color: 'bg-gray-100 text-gray-700' },
  Paid: { label: 'Paid', color: 'bg-green-100 text-green-700' },
  Unpaid: { label: 'Unpaid', color: 'bg-red-100 text-red-700' },
};

const paymentStatusMap = {
  Paid: { label: 'Paid', color: 'bg-green-100 text-green-700' },
  Unpaid: { label: 'Unpaid', color: 'bg-red-100 text-red-700' },
  // Add more if needed
};

const AllOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedTab, setSelectedTab] = useState<Order['status'] | 'All'>('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<Record<string, any>>({});
  const [userLoading, setUserLoading] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const userIds = Array.from(new Set(orders.map((order) => order.userId).filter(Boolean)));
    userIds.forEach((userId) => {
      if (userId && !userDetails[userId] && !userLoading[userId]) {
        fetchUserDetails(userId);
      }
    });
    // eslint-disable-next-line
  }, [orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/api/AddToCart/admin/bookings/success`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const transformedOrders: Order[] = response.data.map((order: any) => {
        const bookingDate = new Date(order.bookingDate);
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
        // Map bookingStatus to UI status
        let status: Order['status'] = 'New';
        if (order.bookingStatus) {
          const s = order.bookingStatus.toLowerCase();
          if (s === 'completed' || s === 'delivered') status = 'Completed';
          else if (s === 'pending') status = 'Pending';
          else if (s === 'cancelled') status = 'Cancelled';
          else if (s === 'inprogress' || s === 'shipped') status = 'InProgress';
          else status = (order.bookingStatus as Order['status']);
        }
        const statusInfo = statusMap[status] || statusMap['New'];
        const paymentInfo = paymentStatusMap[order.paymentStatus] || paymentStatusMap['Unpaid'];
        return {
          id: (order.bookingId || '').toString(),
          status,
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
          userId: order.userId,
        };
      });
      setOrders(transformedOrders);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details by userId
  const fetchUserDetails = async (userId: string) => {
    if (!userId || userDetails[userId] || userLoading[userId]) return;
    setUserLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await axios.get(`${BASE_URL}/user/get-patients/${userId}`);
      setUserDetails((prev) => ({ ...prev, [userId]: response.data }));
    } catch (err) {
      setUserDetails((prev) => ({ ...prev, [userId]: { error: 'Failed to load user details' } }));
    } finally {
      setUserLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // Pagination logic
  // Sort orders by bookingDate descending (latest first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.bookingDate || a.date).getTime();
    const dateB = new Date(b.bookingDate || b.date).getTime();
    return dateB - dateA;
  });
  const filteredOrders = sortedOrders.filter((order) =>
    selectedTab === 'All' ? true : order.status === selectedTab
  );
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((page - 1) * ORDERS_PER_PAGE, page * ORDERS_PER_PAGE);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Back Arrow */}
        <button
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 text-base font-medium"
          onClick={() => navigate('/admin/admindashboard')}
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Dashboard
        </button>
        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'border-blue-500 bg-white text-blue-600'
                  : 'border-transparent bg-gray-50 text-gray-500 hover:bg-white'
              }`}
              onClick={() => setActiveTab(tab.key)}
              disabled={tab.key !== 'orders'}
            >
              {tab.label}
              {tab.key === 'orders' && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {orders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Order Status Tabs */}
        <div className="flex space-x-2 mb-4">
          {['All'].map((tab) => (
            <button
              key={tab}
              className={`py-1 px-3 rounded-md text-xs font-medium border transition-colors duration-200 ${
                selectedTab === tab ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => { setSelectedTab(tab as Order['status'] | 'All'); setPage(1); }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedOrders.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-10">No orders found for this status.</div>
              ) : (
                paginatedOrders.map((order) => {
                  const expanded = expandedOrderId === order.id;
                  const statusInfo = statusMap[order.status] || statusMap['New'];
                  const paymentInfo = paymentStatusMap[order.paymentStatus] || paymentStatusMap['Unpaid'];
                  const user = order.userId ? userDetails[order.userId] : null;
                  const isUserLoading = order.userId ? userLoading[order.userId] : false;
                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl shadow-md p-5 flex flex-col relative transition-all border border-gray-100 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Order Header */}
                      <div className="flex items-center mb-2">
                        <UserCircle2 className="w-10 h-10 text-gray-300 mr-3" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-base">Order <span className="text-gray-500">{order.orderNumber}</span></div>
                        </div>
                        
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${paymentInfo.color}`}>{paymentInfo.label}</span>
                        <button
                          className="ml-2 p-1 rounded hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedOrderId(expanded ? null : order.id);
                          }}
                          aria-expanded={expanded}
                          aria-controls={`order-details-${order.id}`}
                        >
                          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                      {/* Order Price */}
                      <div className="text-2xl font-bold text-gray-900 mb-2">₹{order.total.toLocaleString()}</div>
                      {/* Created Date & Items */}
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>Created: {formatDate(order.bookingDate)}</span>
                        <span className="mx-2">•</span>
                        <span>Number of items: {order.items.length}</span>
                      </div>
                      {/* User Info */}
                      <div className="mb-2">
                        <h3 className="text-xs font-semibold text-gray-600 mb-1">User Information</h3>
                        <div className="text-sm text-gray-700">
                          {isUserLoading ? (
                            <span>Loading user details...</span>
                          ) : user && !user.error ? (
                            <>
                              <div><strong>Name:</strong> {user.name || order.userName || 'N/A'}</div>
                              {user.email && <div><strong>Email:</strong> {user.email}</div>}
                              {user.mobilenum && <div><strong>Mobile:</strong> {user.mobilenum}</div>}
                              {user.country && <div><strong>Country:</strong> {user.country}</div>}
                            </>
                          ) : (
                            <span><strong>Name:</strong> {order.userName || 'N/A'}</span>
                          )}
                        </div>
                      </div>
                      {/* Expandable Details */}
                      {expanded && (
                        <div id={`order-details-${order.id}`} className="mt-4 border-t pt-4 space-y-2">
                          <div>
                            <h3 className="text-xs font-semibold text-gray-600">Order Details</h3>
                            <div className="text-sm text-gray-700">
                              <div><strong>Order Number:</strong> {order.orderNumber || 'N/A'}</div>
                              <div><strong>Order Date & Time:</strong> {order.date} {order.time}</div>
                              <div><strong>Total Amount:</strong> ₹{order.total.toLocaleString()}</div>
                              <div><strong>Payment Mode:</strong> {order.paymentMode || 'N/A'}</div>
                              <div><strong>Payment Status:</strong> {order.paymentStatus || 'N/A'}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-600">Service Details</h3>
                            <div className="text-sm text-gray-700">
                              <div><strong>Service:</strong> {order.bookingType || 'N/A'}</div>
                              <div><strong>Name:</strong> {order.chefName || order.doctorName || order.labtestName || order.spaName || order.translatorName || order.physioName || order.hospitalName || order.hotelName || order.travelName || order.pharmacyName || 'N/A'}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-600">Booking Schedule</h3>
                            <div className="text-sm text-gray-700">
                              <div><strong>Start Time:</strong> {order.bookingStartTime ? formatDate(order.bookingStartTime) : 'N/A'}</div>
                              <div><strong>End Time:</strong> {order.bookingEndTime ? formatDate(order.bookingEndTime) : 'N/A'}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-600">Additional Information</h3>
                            <div className="text-sm text-gray-700">
                              <div><strong>Remarks:</strong> {order.remarks || 'None'}</div>
                              <div><strong>Additional Remarks:</strong> {order.additionalRemarks || 'None'}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-gray-600">Items</h3>
                            {order.items.map((item) => (
                              <div key={item.productId} className="flex items-center space-x-4 py-2 border-t border-gray-100">
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="w-10 h-10 object-cover rounded-md"
                                />
                                <div>
                                  <p className="text-gray-800 font-medium">{item.productName}</p>
                                  <p className="text-gray-600 text-xs">₹{item.price.toLocaleString()} x {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8">
                <div className="text-xs text-gray-500">Items per page: {ORDERS_PER_PAGE}</div>
                <div className="flex space-x-1">
                  <button
                    className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                    disabled={page === 1}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={`px-2 py-1 rounded border text-xs ${p === page ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-200'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPage(p);
                      }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className="px-2 py-1 rounded border text-xs disabled:opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    disabled={page === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
