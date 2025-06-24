import React from 'react';
import Sidebar from '@/admin/sidebar';
import { Link } from 'react-router-dom';

interface Order {
  orderId: number;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const dummyOrders: Order[] = [
  {
    orderId: 1001,
    customerName: 'John Doe',
    orderDate: '2025-06-20',
    totalAmount: 1500,
    status: 'Delivered',
  },
  {
    orderId: 1002,
    customerName: 'Jane Smith',
    orderDate: '2025-06-19',
    totalAmount: 800,
    status: 'Shipped',
  },
  {
    orderId: 1003,
    customerName: 'Alice Johnson',
    orderDate: '2025-06-18',
    totalAmount: 2500,
    status: 'Pending',
  },
  {
    orderId: 1004,
    customerName: 'Bob Brown',
    orderDate: '2025-06-17',
    totalAmount: 1200,
    status: 'Cancelled',
  },
  {
    orderId: 1005,
    customerName: 'Emma Wilson',
    orderDate: '2025-06-16',
    totalAmount: 1800,
    status: 'Delivered',
  },
];

const OrderList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Medical Visions</h1>
        </div>
        <div className="flex space-x-8">
          <Link to="/admin/orders" className="text-blue-600 border-b-2 border-blue-600 text-sm font-semibold">Orders</Link>
          <Link to="/admin/PrescriptionList" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200">Prescriptions</Link>
          <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200">FAQ</Link>
        </div>
      </nav>

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">All Orders</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Found {dummyOrders.length} orders
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dummyOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h4 className="text-sm font-semibold text-gray-900 capitalize mb-2">
                    Order #{order.orderId}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">Customer: {order.customerName}</p>
                  <p className="text-xs text-gray-600 mb-1">
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">Total: ₹{order.totalAmount}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;