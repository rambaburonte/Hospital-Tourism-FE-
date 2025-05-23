// import React from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './sidebar';


// // Dummy components for routes
// const DoctorUploadForm = () => <PlaceholderContent title="Upload Doctor" />;
// const ViewDoctors = () => <PlaceholderContent title="View Doctors" />;

// const DashboardContent: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex-1 bg-green-50 min-h-screen">
//       <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <i className="fas fa-user-circle text-xl text-green-600"></i>
//             <span className="text-sm font-semibold">Admin</span>
//           </div>
//           <div className="flex items-center gap-2">
//            <button
//               onClick={() => navigate('/subadminregister')}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//             >
//               <i className="fas fa-cog mr-2"></i>Sub-Admin Registerr
//             </button>
//           </div>
//           <button
//             onClick={() => navigate('/logout')}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//           >
//             <i className="fas fa-sign-out-alt mr-2"></i>Logout
//           </button>
//         </div>
//       </header>

//       <div className="p-8 ml-64">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <DashboardCard
//               icon="fas fa-users"
//               title="Total Users"
//               count="1,234"
//             />
//             <DashboardCard
//               icon="fas fa-user-md"
//               title="Total Doctors"
//               count="56"
//             />
//             <DashboardCard
//               icon="fas fa-shopping-cart"
//               title="Total Orders"
//               count="789"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DashboardCard: React.FC<{
//   icon: string;
//   title: string;
//   count: string;
// }> = ({ icon, title, count }) => (
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

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<DashboardContent />} />
//         <Route path="/users" element={<PlaceholderContent title="Users" />} />
//         <Route path="/doctors/upload" element={<DoctorUploadForm />} />
//         <Route path="/doctors/view" element={<ViewDoctors />} />
//         <Route path="/services/hospital" element={<PlaceholderContent title="Hospital Services" />} />
//         <Route path="/services/packages" element={<PlaceholderContent title="Packages" />} />
//         <Route path="/orders" element={<PlaceholderContent title="Orders" />} />
//         <Route path="/settings" element={<PlaceholderContent title="Settings" />} />
//       </Routes>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar';
import ProtectedRoute from '@/ProtectedRoute';

const DashboardContent: React.FC = () => (
  <div className="flex-1 bg-green-50 min-h-screen">
    <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </header>
    <div className="p-8 ml-64">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
      <p className="text-green-600">Welcome to the Admin Dashboard</p>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/admindashboard" element={<DashboardContent />} />
        <Route
          path="/doctors/upload"
          element={
            <ProtectedRoute allowedPermissions={['Hospital.UploadDoctors']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Doctors</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors/viewdoctors"
          element={
            <ProtectedRoute allowedPermissions={['Hospital.ViewDoctors']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Doctors</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadhospital"
          element={
            <ProtectedRoute allowedPermissions={['Hospital.UploadHospital']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Hospital</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewHospitals"
          element={
            <ProtectedRoute allowedPermissions={['Hospital.viewHospitals']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Hospitals</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadDiagnostics"
          element={
            <ProtectedRoute allowedPermissions={['Diagnostics.uploadDiagnostics']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Diagnostics</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadlabtests"
          element={
            <ProtectedRoute allowedPermissions={['Diagnostics.uploadLabtests']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Lab Tests</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewdiagnostics"
          element={
            <ProtectedRoute allowedPermissions={['Diagnostics.viewDiagnostics']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Diagnostics</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadTranslators"
          element={
            <ProtectedRoute allowedPermissions={['Translators.upload']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Translators</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewTranslators"
          element={
            <ProtectedRoute allowedPermissions={['Translators.view']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Translators</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadchefs"
          element={
            <ProtectedRoute allowedPermissions={['Personalized_chefs.upload']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Chefs</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewchefs"
          element={
            <ProtectedRoute allowedPermissions={['Personalized_chefs.view']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Chefs</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadPhysios"
          element={
            <ProtectedRoute allowedPermissions={['Physios.upload']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Physios</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewphysios"
          element={
            <ProtectedRoute allowedPermissions={['Physios.view']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Physios</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadCenters"
          element={
            <ProtectedRoute allowedPermissions={['SpaServices.UploadSpacenters']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Spa Centers</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadspaServices"
          element={
            <ProtectedRoute allowedPermissions={['SpaServices.UploadServices']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Upload Spa Services</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcenters"
          element={
            <ProtectedRoute allowedPermissions={['SpaServices.ViewSpaCenters']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">View Spa Centers</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subadminregister"
          element={
            <ProtectedRoute allowedPermissions={['Add Admin.Add Admin']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Add Admin</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedPermissions={['Users.Users']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Users</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/businessLocations"
          element={
            <ProtectedRoute allowedPermissions={['BusinessLocation.BusinessLocation']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Business Locations</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedPermissions={['Orders.Orders']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Orders</h1>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedPermissions={['Settings.Settings']}>
              <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
                <h1 className="text-4xl font-bold text-green-700">Settings</h1>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminDashboard;


// import React from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './sidebar';
// import ProtectedRoute from '@/ProtectedRoute';
// 6
// const DashboardContent: React.FC = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('adminUser');
//     localStorage.removeItem('permissions');
//     navigate('/login');
//   };

//   return (
//     <div className="flex-1 bg-green-50 min-h-screen">
//       <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <i className="fas fa-user-circle text-xl text-green-600"></i>
//             <span className="text-sm font-semibold">
//               {JSON.parse(localStorage.getItem('adminUser') || '{}').adminName || 'Admin'}
//             </span>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//           >
//             <i className="fas fa-sign-out-alt mr-2"></i>Logout
//           </button>
//         </div>
//       </header>
//       <div className="p-8 ml-64">
//         <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
//         <p className="text-green-600">Welcome to the Admin Dashboard</p>
//       </div>
//     </div>
//   );
// };

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <Routes>
//         <Route path="/admindashboard" element={<DashboardContent />} />
//         <Route
//           path="/doctors/upload"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.UploadDoctors']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Doctors</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/doctors/viewdoctors"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.ViewDoctors']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Doctors</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadhospital"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.UploadHospital']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Hospital</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewHospitals"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.viewHospitals']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Hospitals</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadDiagnostics"
//           element={
//             <ProtectedRoute allowedPermissions={['Diagnostics.uploadDiagnostics']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Diagnostics</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadlabtests"
//           element={
//             <ProtectedRoute allowedPermissions={['Diagnostics.uploadLabtests']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Lab Tests</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewdiagnostics"
//           element={
//             <ProtectedRoute allowedPermissions={['Diagnostics.viewDiagnostics']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Diagnostics</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadTranslators"
//           element={
//             <ProtectedRoute allowedPermissions={['Translators.upload']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Translators</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewTranslators"
//           element={
//             <ProtectedRoute allowedPermissions={['Translators.view']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Translators</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadchefs"
//           element={
//             <ProtectedRoute allowedPermissions={['Personalized_chefs.upload']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Chefs</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewchefs"
//           element={
//             <ProtectedRoute allowedPermissions={['Personalized_chefs.view']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Chefs</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadPhysios"
//           element={
//             <ProtectedRoute allowedPermissions={['Physios.upload']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Physios</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewphysios"
//           element={
//             <ProtectedRoute allowedPermissions={['Physios.view']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Physios</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadCenters"
//           element={
//             <ProtectedRoute allowedPermissions={['SpaServices.UploadSpacenters']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Spa Centers</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadspaServices"
//           element={
//             <ProtectedRoute allowedPermissions={['SpaServices.UploadServices']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Spa Services</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewcenters"
//           element={
//             <ProtectedRoute allowedPermissions={['SpaServices.ViewSpaCenters']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Spa Centers</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/subadminregister"
//           element={
//             <ProtectedRoute allowedPermissions={['Add Admin.Add Admin']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Add Admin</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute allowedPermissions={['Users.Users']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Users</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/businessLocations"
//           element={
//             <ProtectedRoute allowedPermissions={['BusinessLocation.BusinessLocation']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Business Locations</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute allowedPermissions={['Orders.Orders']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Orders</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute allowedPermissions={['Settings.Settings']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Settings</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './sidebar';
// import ProtectedRoute from '@/ProtectedRoute';
// import axios from 'axios';

// interface AdminAction {
//   id: number;
//   actionType: string;
//   description: string;
//   timestamp: string;
// }

// const DashboardContent: React.FC = () => {
//   const navigate = useNavigate();
//   const [actions, setActions] = useState<AdminAction[]>([]);
//   const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

//   useEffect(() => {
//     // Mock action log (replace with real API call)
//     const mockActions: AdminAction[] = [
//       {
//         id: 1,
//         actionType: 'Add Doctor',
//         description: 'Added Dr. John Smith to the hospital database',
//         timestamp: '2025-05-20T10:30:00Z',
//       },
//       {
//         id: 2,
//         actionType: 'View Doctors',
//         description: 'Viewed list of doctors in Hospital A',
//         timestamp: '2025-05-20T09:15:00Z',
//       },
//       {
//         id: 3,
//         actionType: 'Add Hospital',
//         description: 'Added City Hospital to the system',
//         timestamp: '2025-05-19T14:20:00Z',
//       },
//       {
//         id: 4,
//         actionType: 'Edit Lab Tests',
//         description: 'Updated Blood Test parameters',
//         timestamp: '2025-05-19T11:45:00Z',
//       },
//       {
//         id: 5,
//         actionType: 'Add Translators',
//         description: 'Added Translator Jane Doe for English-Spanish',
//         timestamp: '2025-05-18T16:10:00Z',
//       },
//     ];

//     // Filter actions based on admin's permissions
//     const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
//     const allowedActionTypes = [
//       'Add Doctor',
//       'View Doctors',
//       'Add Hospital',
//       'View Hospitals',
//       'Add Lab Tests',
//       'Edit Lab Tests',
//       'View Lab Tests',
//       'Delete Lab Tests',
//       'Download Lab Tests',
//       'Add Translators',
//     ];
//     const filteredActions = mockActions.filter((action) =>
//       allowedActionTypes.includes(action.actionType),
//     );

//     setActions(filteredActions);

//     // Optional: Fetch real actions from API
//     /*
//     const fetchActions = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/admin/actions', {
//           params: { adminId: adminUser.adminId },
//         });
//         setActions(response.data);
//       } catch (error) {
//         console.error('Error fetching actions:', error);
//       }
//     };
//     fetchActions();
//     */
//   }, [adminUser.adminId]);

//   const handleLogout = () => {
//     localStorage.removeItem('adminUser');
//     localStorage.removeItem('permissions');
//     navigate('/login');
//   };

//   return (
//     <div className="flex-1 bg-green-50 min-h-screen">
//       <header className="bg-white text-green-700 p-4 flex justify-between items-center shadow ml-64 border-b border-green-100">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <i className="fas fa-user-circle text-xl text-green-600"></i>
//             <span className="text-sm font-semibold">
//               {adminUser.adminName || 'Admin'}
//             </span>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
//           >
//             <i className="fas fa-sign-out-alt mr-2"></i>Logout
//           </button>
//         </div>
//       </header>
//       <div className="p-8 ml-64">
//         <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Overview</h2>
//         <p className="text-green-600 mb-8 text-center">
//           Welcome to the Admin Dashboard, {adminUser.adminName || 'Admin'}!
//         </p>
//         <div className="max-w-4xl mx-auto">
//           <h3 className="text-2xl font-semibold text-green-700 mb-4">Recent Activity</h3>
//           {actions.length === 0 ? (
//             <p className="text-green-600">No recent activity found.</p>
//           ) : (
//             <div className="bg-white rounded-xl shadow-sm border border-green-100">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="bg-green-50">
//                     <th className="p-4 text-green-700 font-medium">Action</th>
//                     <th className="p-4 text-green-700 font-medium">Description</th>
//                     <th className="p-4 text-green-700 font-medium">Timestamp</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {actions.map((action) => (
//                     <tr
//                       key={action.id}
//                       className="border-t border-green-100 hover:bg-green-50"
//                     >
//                       <td className="p-4 text-green-600">{action.actionType}</td>
//                       <td className="p-4 text-green-600">{action.description}</td>
//                       <td className="p-4 text-green-600">
//                         {new Date(action.timestamp).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <Routes>
//         <Route path="/admindashboard" element={<DashboardContent />} />
//         <Route
//           path="/doctors/upload"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.UploadDoctors']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Doctors</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/doctors/viewdoctors"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.ViewDoctors']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Doctors</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadhospital"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.UploadHospital']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Hospital</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewHospitals"
//           element={
//             <ProtectedRoute allowedPermissions={['Hospital.viewHospitals']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Hospitals</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadDiagnostics"
//           element={
//             <ProtectedRoute allowedPermissions={['Diagnostics.uploadDiagnostics']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Diagnostics</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadlabtests"
//           element={
//             <ProtectedRoute allowedPermissions={['Diagnostics.uploadLabtests']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Lab Tests</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewdiagnostics"
//           element={
//             <ProtectedRoute allowedPermissions={['Diagnostics.viewDiagnostics']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Diagnostics</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadTranslators"
//           element={
//             <ProtectedRoute allowedPermissions={['Translators.upload']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Translators</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewTranslators"
//           element={
//             <ProtectedRoute allowedPermissions={['Translators.view']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Translators</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadchefs"
//           element={
//             <ProtectedRoute allowedPermissions={['Personalized_chefs.upload']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Chefs</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewchefs"
//           element={
//             <ProtectedRoute allowedPermissions={['Personalized_chefs.view']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Chefs</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadPhysios"
//           element={
//             <ProtectedRoute allowedPermissions={['Physios.upload']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Physios</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewphysios"
//           element={
//             <ProtectedRoute allowedPermissions={['Physios.view']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Physios</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadCenters"
//           element={
//             <ProtectedRoute allowedPermissions={['SpaServices.UploadSpacenters']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Spa Centers</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/uploadspaServices"
//           element={
//             <ProtectedRoute allowedPermissions={['SpaServices.UploadServices']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Upload Spa Services</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/viewcenters"
//           element={
//             <ProtectedRoute allowedPermissions={['SpaServices.ViewSpaCenters']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">View Spa Centers</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/subadminregister"
//           element={
//             <ProtectedRoute allowedPermissions={['Add Admin.Add Admin']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Add Admin</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute allowedPermissions={['Users.Users']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Users</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/businessLocations"
//           element={
//             <ProtectedRoute allowedPermissions={['BusinessLocation.BusinessLocation']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Business Locations</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute allowedPermissions={['Orders.Orders']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Orders</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute allowedPermissions={['Settings.Settings']}>
//               <div className="flex-1 p-8 bg-green-50 min-h-screen ml-64">
//                 <h1 className="text-4xl font-bold text-green-700">Settings</h1>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default AdminDashboard;