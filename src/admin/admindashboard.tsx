
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar';
import DoctorUploadForm from './uploadoctors';

const DashboardContent: React.FC = () => {
  return (
    <div className="ml-64 p-8 bg-white min-h-screen">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Users</h2>
          <p className="text-3xl text-green-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Doctors</h2>
          <p className="text-3xl text-green-600">56</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Orders</h2>
          <p className="text-3xl text-green-600">789</p>
        </div>
      </div>
    </div>
  );
};

const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="ml-64 p-8 bg-white min-h-screen">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-600">This is a placeholder for the {title} page.</p>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/users" element={<PlaceholderContent title="Users" />} />
        <Route path="/doctors/upload" element={<DoctorUploadForm />} />
        <Route path="/doctors/view" element={<PlaceholderContent title="View Doctors" />} />
        <Route path="/services/hospital" element={<PlaceholderContent title="Hospital Services" />} />
        <Route path="/services/packages" element={<PlaceholderContent title="Packages" />} />
        <Route path="/orders" element={<PlaceholderContent title="Orders" />} />
        <Route path="/settings" element={<PlaceholderContent title="Settings" />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
