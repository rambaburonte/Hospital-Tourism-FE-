import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

// Dummy components for routes
const DoctorUploadForm = () => <PlaceholderContent title="Upload Doctor" />;
const ViewDoctors = () => <PlaceholderContent title="View Doctors" />;

const DashboardContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-green-50 min-h-screen">
      <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-user-circle text-xl text-green-600"></i>
            <span className="text-sm font-semibold">Admin</span>
          </div>
          <button
            onClick={() => navigate('/logout')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </header>

      <div className="p-8 ml-64">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              icon="fas fa-users"
              title="Total Users"
              count="1,234"
            />
            <DashboardCard
              icon="fas fa-user-md"
              title="Total Doctors"
              count="56"
            />
            <DashboardCard
              icon="fas fa-shopping-cart"
              title="Total Orders"
              count="789"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{
  icon: string;
  title: string;
  count: string;
}> = ({ icon, title, count }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition transform hover:-translate-y-1">
    <div className="flex items-center gap-4">
      <i className={`${icon} text-3xl text-green-500`}></i>
      <div>
        <h3 className="text-lg font-semibold text-green-700">{title}</h3>
        <p className="text-2xl text-green-600 font-bold">{count}</p>
      </div>
    </div>
  </div>
);

const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
    <div className="flex justify-center mb-8">
      <h1 className="text-4xl font-bold text-green-700">{title}</h1>
    </div>
    <div className="max-w-3xl mx-auto">
      <p className="text-green-600">
        This is a placeholder for the <strong>{title}</strong> page.
      </p>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/users" element={<PlaceholderContent title="Users" />} />
        <Route path="/doctors/upload" element={<DoctorUploadForm />} />
        <Route path="/doctors/view" element={<ViewDoctors />} />
        <Route path="/services/hospital" element={<PlaceholderContent title="Hospital Services" />} />
        <Route path="/services/packages" element={<PlaceholderContent title="Packages" />} />
        <Route path="/orders" element={<PlaceholderContent title="Orders" />} />
        <Route path="/settings" element={<PlaceholderContent title="Settings" />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
