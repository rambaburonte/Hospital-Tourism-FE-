

// import React, { useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Sidebar from './sidebar';

// // Dummy components
// const DoctorUploadForm = () => <PlaceholderContent title="Upload Doctor" />;
// const ViewDoctors = () => <PlaceholderContent title="View Doctors" />;
// const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
//   <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//     <div className="flex justify-center mb-8">
//       <h1 className="text-4xl font-bold text-green-700">{title}</h1>
//     </div>
//     <div className="max-w-3xl mx-auto">
//       <p className="text-green-600">
//         This is a placeholder for the <strong>{title}</strong> page.
//       </p>
//     </div>
//   </div>
// );

// // Dashboard card
// const DashboardCard: React.FC<{ icon: string; title: string; count: string }> = ({ icon, title, count }) => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition transform hover:-translate-y-1">
//     <div className="flex items-center gap-4">
//       <i className={`${icon} text-3xl text-green-500`}></i>
//       <div>
//         <h3 className="text-lg font-semibold text-green-700">{title}</h3>
//         <p className="text-2xl text-green-600 font-bold">{count}</p>
//       </div>
//     </div>
//   </div>
// );

// // Dashboard content
// const DashboardContent: React.FC = () => {
//   const navigate = useNavigate();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
//   const isMajorAdmin = adminUser?.email?.toLowerCase() === 'major@gmail.com';

//   const handleLogout = () => {
//     localStorage.removeItem('adminUser');
//     navigate('/');
//   };

//   return (
//     <div className="flex-1 bg-green-50 min-h-screen">
//       <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button onClick={() => navigate('/userdocuments')}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"  
//         >

//           priscription
//           </button>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-semibold">{isMajorAdmin ? 'Admin' : adminUser?.email || 'User'}</span>
//           </div>

//           {/* Show only for Major Admin */}
//           {isMajorAdmin && (
//             <button
//               onClick={() => navigate('/subadminregister')}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//             >
//               <i className="fas fa-cog mr-2"></i>Sub-Admin Register
//             </button>
//           )}

//           {/* Show only for other admins */}
//           {!isMajorAdmin && (
//             <div className="relative">
//               <i
//                 className="fas fa-user text-xl text-green-600 cursor-pointer hover:text-green-700 transition"
//                 onClick={() => setIsProfileOpen((prev) => !prev)}
//               ></i>
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100 z-10">
//                   <button
//                     onClick={() => {
//                       navigate('/');
//                       setIsProfileOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-50"
//                   >
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate('/profile');
//                       setIsProfileOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-50"
//                   >
//                     Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//           >
//             <i className="fas fa-sign-out-alt mr-2"></i>Logout
//           </button>
//         </div>
//       </header>

//       {/* Dashboard Cards */}
//       <div className="p-8 ml-64">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <DashboardCard icon="fas fa-users" title="Total Users" count="1,234" />
//             <DashboardCard icon="fas fa-Sub Admins" title="Total Sub Admins" count="1" />
//             <DashboardCard icon="fas fa-user-md" title="Total Doctors" count="56" />
//             <DashboardCard icon="fas fa-shopping-cart" title="Total Orders" count="789" />


//             <DashboardCard icon="fas fa-hospital" title="Hospital Services" count="12" />
//             <DashboardCard icon="fas fa-Diagnostics" title="Total Diagnostics" count="34" />
//             <DashboardCard icon="fas fa-Chefs " title="Total Chefs" count="5" />
//             <DashboardCard icon="fas fa-Translators" title="Total Translators" count="1" />

//             <DashboardCard icon="fas fa-physio" title="Total Physios" count="100" />
//             <DashboardCard icon="fas fa-Spa" title="Total Spa Services" count="1" />
            

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // AdminDashboard with routing
// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Routes>
//           <Route path="/" element={<DashboardContent />} />
//           <Route path="/users" element={<PlaceholderContent title="Users" />} />
//           <Route path="/doctors/upload" element={<DoctorUploadForm />} />
//           <Route path="/doctors/view" element={<ViewDoctors />} />
//           <Route path="/services/hospital" element={<PlaceholderContent title="Hospital Services" />} />
//           <Route path="/services/packages" element={<PlaceholderContent title="Packages" />} />
//           <Route path="/orders" element={<PlaceholderContent title="Orders" />} />
//           <Route path="/settings" element={<PlaceholderContent title="Settings" />} />
//           <Route path="/profile" element={<PlaceholderContent title="Profile" />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;








// import React, { useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Sidebar from './sidebar';

// // Placeholder component
// const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
//   <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//     <div className="flex justify-center mb-8">
//       <h1 className="text-4xl font-bold text-green-700">{title}</h1>
//     </div>
//     <div className="max-w-3xl mx-auto">
//       <p className="text-green-600">
//         This is a placeholder for the <strong>{title}</strong> page.
//       </p>
//     </div>
//   </div>
// );

// // Dashboard card component
// const DashboardCard: React.FC<{ icon: string; title: string; count?: string; onClick?: () => void }> = ({
//   icon,
//   title,
//   count,
//   onClick,
// }) => (
//   <div
//     onClick={onClick}
//     className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer"
//   >
//     <div className="flex items-center gap-4">
//       <i className={`${icon} text-3xl text-green-500`} />
//       <div>
//         <h3 className="text-lg font-semibold text-green-700">{title}</h3>
//         {count !== undefined && (
//           <p className="text-2xl text-green-600 font-bold">{count}</p>
//         )}
//       </div>
//     </div>
//   </div>
// );

// // Dashboard page content
// const DashboardContent: React.FC = () => {
//   const navigate = useNavigate();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
//   const isMajorAdmin = adminUser.email?.toLowerCase() === 'major@gmail.com';

//   const handleLogout = () => {
//     localStorage.removeItem('adminUser');
//     navigate('/');
//   };

//   return (
//     <div className="flex-1 bg-green-50 min-h-screen">
//       <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <span className="text-sm font-semibold">
//             {isMajorAdmin ? 'Admin' : adminUser.email || 'User'}
//           </span>

//           {isMajorAdmin && (
//             <button
//               onClick={() => navigate('/subadminregister')}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//             >
//               <i className="fas fa-cog mr-2" />
//               Sub-Admin Register
//             </button>
//           )}

//           {!isMajorAdmin && (
//             <div className="relative">
//               <i
//                 className="fas fa-user text-xl text-green-600 cursor-pointer hover:text-green-700 transition"
//                 onClick={() => setIsProfileOpen((prev) => !prev)}
//               />
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100 z-10">
//                   <button
//                     onClick={() => {
//                       navigate('/');
//                       setIsProfileOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-50"
//                   >
//                     Dashboard
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate('/profile');
//                       setIsProfileOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-50"
//                   >
//                     Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           <button
//             onClick={handleLogout}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//           >
//             <i className="fas fa-sign-out-alt mr-2" />
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Dashboard Cards Section */}
//       <div className="p-8 ml-64">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <DashboardCard icon="fas fa-users" title="Total Users" count="1,234" />
//             <DashboardCard icon="fas fa-user-shield" title="Total Sub Admins" count="1" />
//             <DashboardCard icon="fas fa-user-md" title="Total Doctors" count="56" />
//             <DashboardCard icon="fas fa-shopping-cart" title="Total Orders" count="789" />
//             <DashboardCard icon="fas fa-hospital" title="Hospital Services" count="12" />
//             <DashboardCard icon="fas fa-vial" title="Total Diagnostics" count="34" />
//             <DashboardCard icon="fas fa-utensils" title="Total Chefs" count="5" />
//             <DashboardCard icon="fas fa-language" title="Total Translators" count="1" />
//             <DashboardCard icon="fas fa-running" title="Total Physios" count="100" />
//             <DashboardCard icon="fas fa-spa" title="Total Spa Services" count="1" />
//             {/* Prescription Card */}
//             <DashboardCard
//               icon="fas fa-file-medical"
//               title="Prescription"
//               onClick={() => navigate('/userdocuments')}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Admin Dashboard with routes
// const AdminDashboard: React.FC = () => (
//   <div className="flex">
//     <Sidebar />
//     <div className="flex-1">
//       <Routes>
//         <Route path="/" element={<DashboardContent />} />
//         <Route path="/userdocuments" element={<PlaceholderContent title="User Documents" />} />
//         <Route path="/subadminregister" element={<PlaceholderContent title="Sub-Admin Register" />} />
//         <Route path="/users" element={<PlaceholderContent title="Users" />} />
//         <Route path="/doctors/upload" element={<PlaceholderContent title="Upload Doctor" />} />
//         <Route path="/doctors/view" element={<PlaceholderContent title="View Doctors" />} />
//         <Route path="/services/hospital" element={<PlaceholderContent title="Hospital Services" />} />
//         <Route path="/services/packages" element={<PlaceholderContent title="Packages" />} />
//         <Route path="/orders" element={<PlaceholderContent title="Orders" />} />
//         <Route path="/settings" element={<PlaceholderContent title="Settings" />} />
//         <Route path="/profile" element={<PlaceholderContent title="Profile" />} />
//       </Routes>
//     </div>
//   </div>
// );

// export default AdminDashboard;














import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import { BASE_URL } from '@/config/config';

// Placeholder component
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

// Dashboard card component
const DashboardCard: React.FC<{ icon: string; title: string; count?: string; onClick?: () => void }> = ({
  icon,
  title,
  count,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <i className={`${icon} text-3xl text-green-500`} />
      <div>
        <h3 className="text-lg font-semibold text-green-700">{title}</h3>
        {count !== undefined && (
          <p className="text-2xl text-green-600 font-bold">{count}</p>
        )}
      </div>
    </div>
  </div>
);

// Dashboard page content
const DashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState<string>('0');
  const [totalSubAdmins, setTotalSubAdmins] = useState<string>('0');
  const [totalDoctors, setTotalDoctors] = useState<string>('0');
  const [totalHospitals, setTotalHospitals] = useState<string>('0');
  const [totalDiagnostics, setTotalDiagnostics] = useState<string>('0');
  const [totalChefs, setTotalChefs] = useState<string>('0');
  const [totalPhysios, setTotalPhysios] = useState<string>('0');
  const [totalTranslators, setTotalTranslators] = useState<string>('0');
  const [totalSpaServices, setTotalSpaServices] = useState<string>('0');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const isMajorAdmin = adminUser.email?.toLowerCase() === 'major@gmail.com';

  // Fetch data for all dashboard cards
  useEffect(() => {
    const fetchData = async (url: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }
        const data = await response.json();
        // Assuming the API returns an array of items
        setState(data.length.toString());
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setState('Error');
      }
    };

    fetchData(`${BASE_URL}/user/get-all-users`, setTotalUsers);
    fetchData(`${BASE_URL}/admin/get-all-subadmins`, setTotalSubAdmins);
    fetchData(`${BASE_URL}/api/doctors`, setTotalDoctors);
    fetchData(`${BASE_URL}/api/hospitals/getall/hospitals`, setTotalHospitals);
    fetchData(`${BASE_URL}/api/diagnostics`, setTotalDiagnostics);
    fetchData(`${BASE_URL}/api/chefs`, setTotalChefs);
    fetchData(`${BASE_URL}/physio/getall/pysios`, setTotalPhysios);
    fetchData(`${BASE_URL}/api/translators/getAll/traslators`, setTotalTranslators);
    fetchData(`${BASE_URL}/spaServices/getAll/spaServices`, setTotalSpaServices);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  return (
    <div className="flex-1 bg-green-50 min-h-screen">
      <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">
            {isMajorAdmin ? 'Admin' : adminUser.email || 'User'}
          </span>

          {isMajorAdmin && (
            <button
              onClick={() => navigate('/subadminregister')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              <i className="fas fa-cog mr-2" />
              Sub-Admin Register
            </button>
          )}

          {!isMajorAdmin && (
            <div className="relative">
              <i
                className="fas fa-user text-xl text-green-600 cursor-pointer hover:text-green-700 transition"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100 z-10">
                  <button
                    onClick={() => {
                      navigate('/');
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-50"
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            <i className="fas fa-sign-out-alt mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Cards Section */}
      <div className="p-8 ml-64">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard icon="fas fa-users" title="Total Users" count={totalUsers} />
            <DashboardCard icon="fas fa-user-shield" title="Total Sub Admins" count={totalSubAdmins} />
            <DashboardCard icon="fas fa-user-md" title="Total Doctors" count={totalDoctors} />
            <DashboardCard icon="fas fa-shopping-cart" title="Total Orders" count="789" />
            <DashboardCard icon="fas fa-hospital" title="Hospital Services" count={totalHospitals} />
            <DashboardCard icon="fas fa-vial" title="Total Diagnostics" count={totalDiagnostics} />
            <DashboardCard icon="fas fa-utensils" title="Total Chefs" count={totalChefs} />
            <DashboardCard icon="fas fa-language" title="Total Translators" count={totalTranslators} />
            <DashboardCard icon="fas fa-running" title="Total Physios" count={totalPhysios} />
            <DashboardCard icon="fas fa-spa" title="Total Spa Services" count={totalSpaServices} />
            {/* Prescription Card */}
            <DashboardCard
              icon="fas fa-file-medical"
              title="Prescription"
              onClick={() => navigate('/userdocuments')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard with routes
const AdminDashboard: React.FC = () => (
  <div className="flex">
    <Sidebar />
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







