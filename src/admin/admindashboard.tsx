import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

// Placeholder component
const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen ml-64">
    <div className="flex justify-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
    </div>
    <div className="max-w-3xl mx-auto">
      <p className="text-gray-600">
        This is a placeholder for the <strong>{title}</strong> page.
      </p>
    </div>
  </div>
);

// Modern Dashboard Card with Clean Design
const DashboardCard: React.FC<{ 
  icon: string; 
  title: string; 
  count?: string; 
  gradient: string;
  onClick?: () => void;
  loading?: boolean;
}> = ({ icon, title, count, gradient, onClick, loading }) => (
  <div
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${gradient} group`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <i className={`${icon} text-2xl text-white`} />
        <div className="text-right">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 w-12 bg-white bg-opacity-30 rounded"></div>
            </div>
          ) : (
            <span className="text-2xl font-bold">{count || '0'}</span>
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold opacity-90 mb-2">{title}</h3>
      <div className="flex items-center text-sm opacity-75">
        <span>View details</span>
        <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
      </div>
    </div>
  </div>
);

// Stats Overview Cards
const StatsCard: React.FC<{
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}> = ({ title, value, change, changeType, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
          </span>
          <span className="text-xs text-gray-500 ml-1">from last month</span>
        </div>
      </div>
      {/* <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        <i className={`${icon} text-xl text-gray-600`}></i>
      </div> */}
    </div>
  </div>
);

// Quick Actions Component
const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}> = ({ title, description, icon, color, onClick }) => (
  <div 
    onClick={onClick}
    className={`${color} rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 text-white`}
  >
    <div className="flex items-center mb-4">
      {/* <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
        <i className={`${icon} text-lg`}></i>
      </div> */}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

// Dashboard page content
const DashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState<string>('0');
  const [totalSubAdmins, setTotalSubAdmins] = useState<string>('0');
  const [totalDoctors, setTotalDoctors] = useState<string>('0');
  const [totalHospitals, setTotalHospitals] = useState<string>('0');
  const [totalDiagnostics, setTotalDiagnostics] = useState<string>('0');
  const [totalChefs, setTotalChefs] = useState<string>('0');
  const [totalPhysios, setTotalPhysios] = useState<string>('0');
  const [totalTranslators, setTotalTranslators] = useState<string>('0');
  const [totalSpaServices, setTotalSpaServices] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const isMajorAdmin = adminUser.email?.toLowerCase() === 'major@gmail.com';

  // Fetch data for all dashboard cards
  useEffect(() => {
    const fetchData = async (url: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Data from ${url}:`, data); // Debug log
        // Handle different response formats - some APIs return arrays, others return objects with data
        if (Array.isArray(data)) {
          setState(data.length.toString());
        } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
          setState(data.data.length.toString());
        } else if (data && typeof data === 'object' && typeof data.count === 'number') {
          setState(data.count.toString());
        } else {
          console.warn(`Unexpected data format from ${url}:`, data);
          setState('0');
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setState('Error');
      }
    };

    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData(`${BASE_URL}/user/get-all-users`, setTotalUsers),
        fetchData(`${BASE_URL}/sub/admin/get-all`, setTotalSubAdmins),
        fetchData(`${BASE_URL}/api/doctors`, setTotalDoctors),
        fetchData(`${BASE_URL}/api/hospitals/getall/hospitals`, setTotalHospitals),
        fetchData(`${BASE_URL}/api/diagnostics`, setTotalDiagnostics),
        fetchData(`${BASE_URL}/api/chefs`, setTotalChefs),
        fetchData(`${BASE_URL}/physio/getall/pysios`, setTotalPhysios),
        fetchData(`${BASE_URL}/api/translators/getAll/traslators`, setTotalTranslators),
        fetchData(`${BASE_URL}/spaServices/getAll/spaServices`, setTotalSpaServices),
      ]);
      setLoading(false);
    };

    loadAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 ml-64 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your hospital today.</p>
            </div>
            <div className="flex items-center space-x-4">
              {isMajorAdmin && (
                <button
                  onClick={() => navigate('/admin/subadminregister')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <i className="fas fa-user-plus mr-2" />
                  Add Sub-Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-sign-out-alt mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 ml-64">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Revenue"
              value="$47,329"
              change="+12.5%"
              changeType="positive"
              icon="fas fa-dollar-sign"
            />
            <StatsCard
              title="Active Users"
              value={totalUsers}
              change="+8.2%"
              changeType="positive"
              icon="fas fa-users"
            />
            <StatsCard
              title="New Appointments"
              value="156"
              change="+23.1%"
              changeType="positive"
              icon="fas fa-calendar-plus"
            />
            <StatsCard
              title="Satisfaction Rate"
              value="98.5%"
              change="+0.3%"
              changeType="positive"
              icon="fas fa-smile"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                title="View Sub-Admins"
                description="Manage all sub-administrator accounts"
                icon="fas fa-user-shield"
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                onClick={() => navigate('/admin/viewsubadmins')}
              />
              <QuickActionCard
                title="Add Doctor"
                description="Register a new doctor to the system"
                icon="fas fa-user-md"
                color="bg-gradient-to-br from-green-500 to-green-600"
                onClick={() => navigate('/admin/doctors/upload')}
              />
              <QuickActionCard
                title="View Orders"
                description="Check recent patient orders"
                icon="fas fa-shopping-cart"
                color="bg-gradient-to-br from-orange-500 to-orange-600"
                onClick={() => navigate('/admin/AllOrders')}
              />
              <QuickActionCard
                title="Analytics"
                description="View detailed reports and insights"
                icon="fas fa-chart-line"
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                onClick={() => navigate('/admin/analytics')}
              />
            </div>
          </div>

          {/* Main Dashboard Cards */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <DashboardCard 
                icon="fas fa-users" 
                title="Total Users" 
                count={totalUsers}
                gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                loading={loading}
                onClick={() => navigate('/admin/users')}
              />
              <DashboardCard 
                icon="fas fa-user-shield" 
                title="Sub Admins" 
                count={totalSubAdmins}
                gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                loading={loading}
                onClick={() => navigate('/admin/viewsubadmins')}
              />
              <DashboardCard 
                icon="fas fa-user-md" 
                title="Doctors" 
                count={totalDoctors}
                gradient="bg-gradient-to-br from-green-500 to-green-600"
                loading={loading}
                onClick={() => navigate('/admin/doctors/viewdoctors')}
              />
              <DashboardCard 
                icon="fas fa-hospital" 
                title="Hospitals" 
                count={totalHospitals}
                gradient="bg-gradient-to-br from-red-500 to-red-600"
                loading={loading}
                onClick={() => navigate('/admin/viewHospitals')}
              />
              <DashboardCard 
                icon="fas fa-vial" 
                title="Diagnostics" 
                count={totalDiagnostics}
                gradient="bg-gradient-to-br from-yellow-500 to-orange-500"
                loading={loading}
                onClick={() => navigate('/admin/viewdiagnostics')}
              />
              <DashboardCard 
                icon="fas fa-utensils" 
                title="Chefs" 
                count={totalChefs}
                gradient="bg-gradient-to-br from-pink-500 to-rose-500"
                loading={loading}
                onClick={() => navigate('/admin/chefs')}
              />
              <DashboardCard 
                icon="fas fa-language" 
                title="Translators" 
                count={totalTranslators}
                gradient="bg-gradient-to-br from-indigo-500 to-purple-500"
                loading={loading}
                onClick={() => navigate('/admin/translators')}
              />
              <DashboardCard 
                icon="fas fa-running" 
                title="Physios" 
                count={totalPhysios}
                gradient="bg-gradient-to-br from-teal-500 to-cyan-500"
                loading={loading}
                onClick={() => navigate('/admin/Physios')}
              />
              <DashboardCard 
                icon="fas fa-spa" 
                title="Spa Services" 
                count={totalSpaServices}
                gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
                loading={loading}
                onClick={() => navigate('/admin/viewspaservices')}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user-plus text-green-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New doctor registered</p>
                  <p className="text-sm text-gray-600">Dr. John Smith joined the cardiology department</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-calendar text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New appointment scheduled</p>
                  <p className="text-sm text-gray-600">Patient consultation for tomorrow at 2:00 PM</p>
                </div>
                <span className="text-sm text-gray-500">4 hours ago</span>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user-shield text-purple-600"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Sub-admin permissions updated</p>
                  <p className="text-sm text-gray-600">Admin permissions modified for better access control</p>
                </div>
                <span className="text-sm text-gray-500">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard with routes
const AdminDashboard: React.FC = () => (
  <div className="flex">
    <AdminSidebar />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/userdocuments" element={<PlaceholderContent title="User Documents" />} />
        <Route path="/subadminregister" element={<PlaceholderContent title="Sub-Admin Register" />} />
        <Route path="/users" element={<PlaceholderContent title="Users" />} />
        <Route path="/doctors/upload" element={<PlaceholderContent title="Upload Doctor" />} />
        <Route path="/doctors/view" element={<PlaceholderContent title="View Doctors" />} />
        <Route path="/services/hospital" element={<PlaceholderContent title="Hospital Services" />} />
        <Route path="/services/packages" element={<PlaceholderContent title="Packages" />} />
        <Route path="/orders" element={<PlaceholderContent title="Orders" />} />
        <Route path="/settings" element={<PlaceholderContent title="Settings" />} />
        <Route path="/profile" element={<PlaceholderContent title="Profile" />} />
      </Routes>
    </div>
  </div>
);

export default AdminDashboard;