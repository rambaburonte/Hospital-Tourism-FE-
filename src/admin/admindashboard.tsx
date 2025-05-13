
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'fas fa-home', path: '/' },
    { name: 'Users', icon: 'fas fa-users', path: '/users' },
    { name: 'Products', icon: 'fas fa-box', path: '/products' },
    { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
    { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center p-4 hover:bg-gray-700 transition-colors"
            onClick={() => console.log(`Navigating to ${item.name}`)}
          >
            <i className={`${item.icon} mr-3`}></i>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/logout"
          className="flex items-center p-2 hover:bg-gray-700 transition-colors"
          onClick={() => console.log('Logging out')}
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

const DashboardContent: React.FC = () => {
  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Users</h2>
          <p className="text-3xl">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Products</h2>
          <p className="text-3xl">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
          <p className="text-3xl">789</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default AdminDashboard;