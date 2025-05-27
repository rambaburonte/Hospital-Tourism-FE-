// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaUser, FaVenusMars, FaEnvelope, FaIdBadge, FaExclamationTriangle } from 'react-icons/fa';
// import { MdCalendarToday } from 'react-icons/md';
// import Sidebar from '../sidebar';
// const SubAdminDashboard = () => {
//   const [subAdmins, setSubAdmins] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/admin/get-all-subadmins')
//       .then(response => setSubAdmins(response.data))
//       .catch(error => console.error("Error fetching sub-admins:", error));
//   }, []);

//  return (
//   <div className="flex">
//     {/* Sidebar - fixed width */}
//     <Sidebar />

//     {/* Main content - shifted right */}
//     <div className="flex-1 min-h-screen bg-gray-100 p-6 ml-64">
//       <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Sub-Admin List</h1>

//       <div className="flex justify-between flex-wrap mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search Sub-Admins..."
//           className="w-full md:max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <div className="flex items-center gap-2">
//           <label className="text-gray-700 font-semibold">Gender:</label>
//           <button className="px-3 py-1 border rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">All</button>
//           <button className="px-3 py-1 border rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">Male</button>
//           <button className="px-3 py-1 border rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">Female</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {subAdmins.map((admin) => (
//           <div
//             key={admin.adminId}
//             className="bg-white p-5 rounded-xl shadow hover:shadow-lg border border-gray-200"
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <img
//                 src={`https://api.dicebear.com/7.x/initials/svg?seed=${admin.adminName}`}
//                 alt="avatar"
//                 className="w-16 h-16 rounded-full border-2 border-blue-500"
//               />
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800">{admin.adminName}</h2>
//                 <p className="text-sm text-gray-500 flex items-center gap-1">
//                   <FaEnvelope /> {admin.adminEmail}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
//               <p className="flex items-center gap-1"><FaVenusMars className="text-pink-500" /> {admin.gender || 'N/A'}</p>
//               <p className="flex items-center gap-1"><FaIdBadge className="text-blue-400" /> ID: {admin.adminId}</p>
//               <p className="flex items-center gap-1"><MdCalendarToday className="text-green-500" /> Joined: 2024</p>
//               <p className="flex items-center gap-1"><FaExclamationTriangle className="text-red-500" /> Warnings: 0</p>
//             </div>

//             <div className="flex gap-2 text-xs">
//               <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Studies: 7</span>
//               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Sports: 5</span>
//               <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Rating: 7.5</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// };

// export default SubAdminDashboard;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaUser, FaVenusMars, FaEnvelope, FaIdBadge, FaExclamationTriangle } from 'react-icons/fa';
// import { MdCalendarToday } from 'react-icons/md';
// import Sidebar from '../sidebar';

// const SubAdminDashboard = () => {
//   const [subAdmins, setSubAdmins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [genderFilter, setGenderFilter] = useState('All');

//   useEffect(() => {
//     axios.get('http://localhost:8080/admin/get-all-subadmins')
//       .then(response => setSubAdmins(response.data))
//       .catch(error => console.error("Error fetching sub-admins:", error));
//   }, []);

//   const filteredSubAdmins = subAdmins.filter((admin) =>
//     admin.adminName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (genderFilter === 'All' || admin.gender?.toLowerCase() === genderFilter.toLowerCase())
//   );

//   return (
//     <div className="flex">
//       {/* Sidebar - fixed width */}
//       <Sidebar />

//       {/* Main content - shifted right */}
//       <div className="flex-1 min-h-screen bg-gray-100 p-6 ml-64">
//         <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Sub-Admin List</h1>

//         <div className="flex justify-between flex-wrap mb-6 gap-4">
//           <input
//             type="text"
//             placeholder="Search Sub-Admins..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-semibold">Gender:</label>
//             {['All', 'Male', 'Female'].map((gender) => (
//               <button
//                 key={gender}
//                 onClick={() => setGenderFilter(gender)}
//                 className={`px-3 py-1 border rounded-md ${
//                   genderFilter === gender
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//                 }`}
//               >
//                 {gender}
//               </button>
//             ))}
//           </div>
//         </div>

//         <p className="text-sm text-gray-600 mb-4">Showing {filteredSubAdmins.length} Sub-Admins</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredSubAdmins.length === 0 ? (
//             <p className="text-center text-gray-500 col-span-full">No Sub-Admins found.</p>
//           ) : (
//             filteredSubAdmins.map((admin) => (
//               <div
//                 key={admin.adminId}
//                 className="bg-white p-5 rounded-xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={`https://api.dicebear.com/7.x/initials/svg?seed=${admin.adminName}`}
//                     alt="avatar"
//                     className="w-16 h-16 rounded-full border-2 border-blue-500"
//                   />
//                   <div>
//                     <h2 className="text-lg font-bold text-gray-800 capitalize">{admin.adminName}</h2>
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <FaEnvelope /> {admin.adminEmail}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
//                   <p className="flex items-center gap-1"><FaVenusMars className="text-pink-500" /> {admin.gender || 'N/A'}</p>
//                   <p className="flex items-center gap-1"><FaIdBadge className="text-blue-400" /> ID: {admin.adminId}</p>
//                   <p className="flex items-center gap-1"><MdCalendarToday className="text-green-500" /> Joined: 2024</p>
//                   <p className="flex items-center gap-1"><FaExclamationTriangle className="text-red-500" /> Warnings: 0</p>
//                 </div>

//                 <div className="flex gap-2 text-xs font-medium">
//                   <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full"><FaUser /> Studies: 7</span>
//                   <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">🏅 Sports: 5</span>
//                   <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">⭐ Rating: 7.5</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubAdminDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaVenusMars, FaEnvelope, FaIdBadge, FaExclamationTriangle } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar';

const SubAdminDashboard = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/admin/get-all-subadmins')
      .then(response => setSubAdmins(response.data))
      .catch(error => console.error("Error fetching sub-admins:", error));
  }, []);

  const filteredSubAdmins = subAdmins.filter(admin => {
    const matchesSearch = admin.adminName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'All' || (admin.gender && admin.gender.toLowerCase() === genderFilter.toLowerCase());
    return matchesSearch && matchesGender;
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 p-6 ml-64">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Sub-Admin List</h1>

        <div className="flex justify-between flex-wrap mb-6 gap-4">
          <input
            type="text"
            placeholder="Search Sub-Admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold">Gender:</label>
            {['All', 'Male', 'Female'].map(gender => (
              <button
                key={gender}
                onClick={() => setGenderFilter(gender)}
                className={`px-3 py-1 border rounded-md ${
                  genderFilter === gender ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubAdmins.map((admin) => (
            <div
              key={admin.adminId}
              onClick={() => navigate(`/subadmin-details/${admin.adminId}`)}
              className="cursor-pointer bg-white p-5 rounded-xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${admin.adminName}`}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{admin.adminName}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaEnvelope /> {admin.adminEmail}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                <p className="flex items-center gap-1"><FaVenusMars className="text-pink-500" /> {admin.gender || 'N/A'}</p>
                <p className="flex items-center gap-1"><FaIdBadge className="text-blue-400" /> ID: {admin.adminId}</p>
                <p className="flex items-center gap-1"><MdCalendarToday className="text-green-500" /> Joined: 2024</p>
                <p className="flex items-center gap-1"><FaExclamationTriangle className="text-red-500" /> Warnings: 0</p>
              </div>

              <div className="flex gap-2 text-xs">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Studies: 7</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Sports: 5</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Rating: 7.5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
