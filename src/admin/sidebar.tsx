// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// interface SubItem {
//   name: string;
//   path: string;
// }

// interface MenuItem {
//   name: string;
//   icon: string;
//   path?: string;
//   subItems?: SubItem[];
// }

// const Sidebar: React.FC = () => {
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

//   const menuItems: MenuItem[] = [
//     { name: 'Dashboard', icon: 'fas fa-home', path: '/admin/admindashboard' },
//     { name: 'Users', icon: 'fas fa-users', path: '/users' },
//     {
//       name: 'Hospital',
//       icon: 'fas fa-user-md',
//       subItems: [
//         { name: 'UploadDoctors', path: '/admin/doctors/upload' },
//         { name: 'ViewDoctors', path: '/admin/doctors/viewdoctors' },
//         { name: 'UploadHospital', path: '/admin/uploadhospital' },
//         { name: 'viewHopitals', path: '/admin/viewHospitals' },
        
//       ],
//     },
   
//     {
//       name: 'Diogonostics',
//       icon: 'fas fa-briefcase-medical',
//       subItems: [
//         { name: 'uploadDioagnostics', path: '/admin/uploadDiagnostics' },
//         { name: 'uploadLabtests', path: '/admin/uploadlabtests' },
//         { name: 'viewDiagnostics', path: '/admin/viewdiagnostics' },
//       ],
//     },
//     {
//       name: 'Translators',
//       icon: 'fas fa-briefcase-medical',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadTanslators' },
//         { name: 'view', path: '/admin/viewTranslators' },
//       ],
//     },
//     {
//       name: 'Personalized_chefs',
//       icon: 'fas fa-utensils',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadchefs' },
//         { name: 'view', path: '/admin/viewchefs' },
//       ],
//     },
//     {
//       name: 'Physios',
//       icon: 'fas fa-dumbbell',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadPhysios' },
//         { name: 'view', path: '/admin/viewphysios' },
//       ],
//     },
//     {
//       name: 'SpaServices',
//       icon: 'fas fa-spa',
//       subItems: [
//         { name: 'UploadSpacenters', path: '/admin/uploadCenters' },
//         { name: 'UploadServies', path: '/admin/uploadspaServices' },
//         { name: 'ViwSpaCenters', path: '/admin/viewcenters' },
//       ],
//     },
   
//     { name: 'BusinessLocation', icon: 'fas fa-map-marker-alt', path: '/admin/businessLocations' },
//     { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
//     { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
//   ];

//   const toggleSubMenu = (name: string) => {
//     setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
//   };

//   return (
//     <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm flex flex-col">
//       {/* Header */}
//       <div className="p-6 text-2xl font-bold border-b border-green-100 text-green-700">
//         Admin Panel
//       </div>

//       {/* Scrollable Menu */}
//       <nav className="flex-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <div key={item.name} className="border-b border-green-100">
//             {item.subItems ? (
//               <>
//                 <button
//                   onClick={() => toggleSubMenu(item.name)}
//                   className="flex items-center w-full p-4 hover:bg-green-100 transition-all"
//                 >
//                   <i className={`${item.icon} mr-3 text-green-600`}></i>
//                   <span className="font-medium">{item.name}</span>
//                   <i
//                     className={`fas fa-chevron-${
//                       openMenus[item.name] ? 'up' : 'down'
//                     } ml-auto text-sm text-green-500`}
//                   ></i>
//                 </button>
//                 {openMenus[item.name] && (
//                   <div className="pl-8 bg-white border-t border-green-100">
//                     {item.subItems.map((subItem) => (
//                       <Link
//                         key={subItem.name}
//                         to={subItem.path}
//                         className="block py-2 px-4 text-sm text-green-700 hover:bg-green-100 rounded transition"
//                       >
//                         {subItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               item.path && (
//                 <Link
//                   to={item.path}
//                   className="flex items-center p-4 hover:bg-green-100 transition-colors"
//                 >
//                   <i className={`${item.icon} mr-3 text-green-600`}></i>
//                   <span className="font-medium">{item.name}</span>
//                 </Link>
//               )
//             )}
//           </div>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 border-t border-green-100">
//         <Link
//           to="/logout"
//           className="flex items-center text-red-600 hover:text-red-800 transition-colors"
//         >
//           <i className="fas fa-sign-out-alt mr-3"></i>
//           <span className="font-medium">Logout</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { set } from 'date-fns';

// interface SubItem {
//   name: string;
//   path: string;
// }

// interface MenuItem {
//   name: string;
//   icon: string;
//   path?: string;
//   subItems?: SubItem[];
// }

// const Sidebar: React.FC = () => {
//   const[permissions, setPermissions] = useState<string[]>([]);
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
// const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
// useEffect(() => {
//   console.log("Admin User from localStorage:", adminUser);
// }, []);
//   const menuItems: MenuItem[] = [
//     { name: 'Dashboard', icon: 'fas fa-home', path: '/admin/admindashboard' },
//     { name: 'Add Admin', icon: 'fas fa-user-plus', path: '/subadminregister' }, // New item
//     { name: 'Users', icon: 'fas fa-users', path: '/users' },
//     {
//       name: 'Hospital',
//       icon: 'fas fa-user-md',
//       subItems: [
//         { name: 'UploadDoctors', path: '/admin/doctors/upload' },
//         { name: 'ViewDoctors', path: '/admin/doctors/viewdoctors' },
//         { name: 'UploadHospital', path: '/admin/uploadhospital' },
//         { name: 'viewHospitals', path: '/admin/viewHospitals' },
//       ],
//     },
//     {
//       name: 'Diagnostics',
//       icon: 'fas fa-briefcase-medical',
//       subItems: [
//         { name: 'uploadDiagnostics', path: '/admin/uploadDiagnostics' },
//         { name: 'uploadLabtests', path: '/admin/uploadlabtests' },
//         { name: 'viewDiagnostics', path: '/admin/viewdiagnostics' },
//       ],
//     },
//     {
//       name: 'Translators',
//       icon: 'fas fa-briefcase-medical',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadTranslators' },
//         { name: 'view', path: '/admin/viewTranslators' },
//       ],
//     },
//     {
//       name: 'Personalized_chefs',
//       icon: 'fas fa-utensils',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadchefs' },
//         { name: 'view', path: '/admin/viewchefs' },
//       ],
//     },
//     {
//       name: 'Physios',
//       icon: 'fas fa-dumbbell',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadPhysios' },
//         { name: 'view', path: '/admin/viewphysios' },
//       ],
//     },
//     {
//       name: 'SpaServices',
//       icon: 'fas fa-spa',
//       subItems: [
//         { name: 'UploadSpacenters', path: '/admin/uploadCenters' },
//         { name: 'UploadServices', path: '/admin/uploadspaServices' },
//         { name: 'ViewSpaCenters', path: '/admin/viewcenters' },
//       ],
//     },
//     { name: 'BusinessLocation', icon: 'fas fa-map-marker-alt', path: '/admin/businessLocations' },
//     { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
//     { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
//   ];

//   const toggleSubMenu = (name: string) => {
//     setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
//   };

//   // Animation variants for the Add Admin button
//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       boxShadow: "0 0 10px rgba(22, 163, 74, 0.5)", // Green glow
//       transition: { duration: 0.3 },
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.2 },
//     },
//   };

//   return (
//     <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm flex flex-col">
//       {/* Header */}
//       <div className="p-6 text-2xl font-bold border-b border-green-100 text-green-700">
//         Admin Panel
//       </div>

//       {/* Scrollable Menu */}
//       <nav className="flex-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <div key={item.name} className="border-b border-green-100">
//             {item.subItems ? (
//               <>
//                 <button
//                   onClick={() => toggleSubMenu(item.name)}
//                   className="flex items-center w-full p-4 hover:bg-green-100 transition-all"
//                 >
//                   <i className={`${item.icon} mr-3 text-green-600`}></i>
//                   <span className="font-medium">{item.name}</span>
//                   <i
//                     className={`fas fa-chevron-${openMenus[item.name] ? 'up' : 'down'} ml-auto text-sm text-green-500`}
//                   ></i>
//                 </button>
//                 {openMenus[item.name] && (
//                   <div className="pl-8 bg-white border-t border-green-100">
//                     {item.subItems.map((subItem) => (
//                       <Link
//                         key={subItem.name}
//                         to={subItem.path}
//                         className="block py-2 px-4 text-sm text-green-700 hover:bg-green-100 rounded transition"
//                       >
//                         {subItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               item.path && (
//                 <motion.div
//                   variants={item.name === 'Add Admin' ? buttonVariants : {}}
//                   whileHover={item.name === 'Add Admin' ? 'hover' : undefined}
//                   whileTap={item.name === 'Add Admin' ? 'tap' : undefined}
//                 >
//                   <Link
//                     to={item.path}
//                     className="flex items-center p-4 hover:bg-green-100 transition-colors"
//                   >
//                     <i className={`${item.icon} mr-3 text-green-600`}></i>
//                     <span className="font-medium">{item.name}</span>
//                   </Link>
//                 </motion.div>
//               )
//             )}
//           </div>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 border-t border-green-100">
//         <Link
//           to="/logout"
//           className="flex items-center text-red-600 hover:text-red-800 transition-colors"
//         >
//           <i className="fas fa-sign-out-alt mr-3"></i>
//           <span className="font-medium">Logout</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// interface SubItem {
//   name: string;
//   path: string;
// }

// interface MenuItem {
//   name: string;
//   icon: string;
//   path?: string;
//   subItems?: SubItem[];
// }

// const Sidebar: React.FC = () => {
//   const [permissions, setPermissions] = useState<string[]>([]);
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
//   const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

//   useEffect(() => {
//     const storedPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
//     setPermissions(storedPermissions);
//     console.log('Admin User from localStorage:', adminUser);
//     console.log('Permissions from localStorage:', storedPermissions);
//   }, []);

//   const menuItems: MenuItem[] = [
//     { name: 'Dashboard', icon: 'fas fa-home', path: '/admin/admindashboard' },
//     { name: 'Add Admin', icon: 'fas fa-user-plus', path: '/subadminregister' },
//     { name: 'Users', icon: 'fas fa-users', path: '/users' },
//     {
//       name: 'Hospital',
//       icon: 'fas fa-user-md',
//       subItems: [
//         { name: 'UploadDoctors', path: '/admin/doctors/upload' },
//         { name: 'ViewDoctors', path: '/admin/doctors/viewdoctors' },
//         { name: 'UploadHospital', path: '/admin/uploadhospital' },
//         { name: 'viewHospitals', path: '/admin/viewHospitals' },
//       ],
//     },
//     {
//       name: 'Diagnostics',
//       icon: 'fas fa-briefcase-medical',
//       subItems: [
//         { name: 'uploadDiagnostics', path: '/admin/uploadDiagnostics' },
//         { name: 'uploadLabtests', path: '/admin/uploadlabtests' },
//         { name: 'viewDiagnostics', path: '/admin/viewdiagnostics' },
//       ],
//     },
//     {
//       name: 'Translators',
//       icon: 'fas fa-language',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadTranslators' },
//         { name: 'view', path: '/admin/viewTranslators' },
//       ],
//     },
//     {
//       name: 'Personalized_chefs',
//       icon: 'fas fa-utensils',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadchefs' },
//         { name: 'view', path: '/admin/viewchefs' },
//       ],
//     },
//     {
//       name: 'Physios',
//       icon: 'fas fa-dumbbell',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadPhysios' },
//         { name: 'view', path: '/admin/viewphysios' },
//       ],
//     },
//     {
//       name: 'SpaServices',
//       icon: 'fas fa-spa',
//       subItems: [
//         { name: 'UploadSpacenters', path: '/admin/uploadCenters' },
//         { name: 'UploadServices', path: '/admin/uploadspaServices' },
//         { name: 'ViewSpaCenters', path: '/admin/viewcenters' },
//       ],
//     },
//     { name: 'BusinessLocation', icon: 'fas fa-map-marker-alt', path: '/admin/businessLocations' },
//     { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
//     { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
//   ];

//   const toggleSubMenu = (name: string) => {
//     setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       boxShadow: "0 0 10px rgba(22, 163, 74, 0.5)",
//       transition: { duration: 0.3 },
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.2 },
//     },
//   };

//   const hasAccess = (path: string): boolean => {
//     const access = adminUser?.role === 'ADMIN' || permissions.includes(path);
//     return access;
//   };

//   return (
//     <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm flex flex-col">
//       {/* Header */}
//       <div className="p-6 text-2xl font-bold border-b border-green-100 text-green-700">
//         Admin Panel
//       </div>

//       {/* Scrollable Menu */}
//       <nav className="flex-1 overflow-y-auto">
//         {menuItems.map((item) => (
//           <div key={item.name} className="border-b border-green-100">
//             {item.subItems ? (
//               <>
//                 <button
//                   onClick={() => toggleSubMenu(item.name)}
//                   className="flex items-center w-full p-4 hover:bg-green-100 transition-all"
//                 >
//                   <i className={`${item.icon} mr-3 text-green-600`}></i>
//                   <span className="font-medium">{item.name}</span>
//                   <i
//                     className={`fas fa-chevron-${openMenus[item.name] ? 'up' : 'down'} ml-auto text-sm text-green-500`}
//                   ></i>
//                 </button>
//                 {openMenus[item.name] && (
//                   <div className="pl-8 bg-white border-t border-green-100">
//                     {item.subItems.map((subItem) => (
//                       <Link
//                         key={subItem.name}
//                         to={hasAccess(subItem.path) ? subItem.path : '#'}
//                         className={`block py-2 px-4 text-sm rounded transition ${
//                           hasAccess(subItem.path)
//                             ? 'text-green-700 hover:bg-green-100'
//                             : 'text-gray-400 cursor-not-allowed'
//                         }`}
//                         onClick={(e) => {
//                           if (!hasAccess(subItem.path)) e.preventDefault();
//                         }}
//                       >
//                         {subItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </>
//             ) : (
//               item.path && (
//                 <motion.div
//                   variants={item.name === 'Add Admin' ? buttonVariants : {}}
//                   whileHover={item.name === 'Add Admin' ? 'hover' : undefined}
//                   whileTap={item.name === 'Add Admin' ? 'tap' : undefined}
//                 >
//                   <Link
//                     to={hasAccess(item.path) ? item.path : '#'}
//                     className={`flex items-center p-4 transition-colors ${
//                       hasAccess(item.path)
//                         ? 'hover:bg-green-100 text-green-800'
//                         : 'text-gray-400 cursor-not-allowed'
//                     }`}
//                     onClick={(e) => {
//                       if (!hasAccess(item.path)) e.preventDefault();
//                     }}
//                   >
//                     <i
//                       className={`${item.icon} mr-3 ${
//                         hasAccess(item.path) ? 'text-green-600' : 'text-gray-400'
//                       }`}
//                     ></i>
//                     <span className="font-medium">{item.name}</span>
//                   </Link>
//                 </motion.div>
//               )
//             )}
//           </div>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 border-t border-green-100">
//         <Link
//           to="/logout"
//           className="flex items-center text-red-600 hover:text-red-800 transition-colors"
//         >
//           <i className="fas fa-sign-out-alt mr-3"></i>
//           <span className="font-medium">Logout</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// interface SubItem {
//   name: string;
//   path: string;
// }

// interface MenuItem {
//   name: string;
//   icon: string;
//   path?: string;
//   subItems?: SubItem[];
// }

// interface Permission {
//   [key: string]: string[];
// }

// const Sidebar: React.FC = () => {
//   const navigate = useNavigate();
//   const [permissions, setPermissions] = useState<Permission>({});
//   const [adminUser, setAdminUser] = useState<{ role?: string }>({});
//   const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
//     const storedPermissions = JSON.parse(localStorage.getItem('permissions') || '{}');
//     setAdminUser(storedUser);
//     setPermissions(storedPermissions);
//     console.log('Admin User from localStorage:', storedUser);
//     console.log('Permissions from localStorage:', storedPermissions);
//   }, []);

//   const allMenuItems: MenuItem[] = [
//     { name: 'Dashboard', icon: 'fas fa-home', path: '/admin/admindashboard' },
//     { name: 'Add Admin', icon: 'fas fa-user-plus', path: '/subadminregister' },
//     { name: 'Users', icon: 'fas fa-users', path: '/users' },
//     {
//       name: 'Hospital',
//       icon: 'fas fa-user-md',
//       subItems: [
//         { name: 'UploadDoctors', path: '/admin/doctors/upload' },
//         { name: 'ViewDoctors', path: '/admin/doctors/viewdoctors' },
//         { name: 'UploadHospital', path: '/admin/uploadhospital' },
//         { name: 'viewHospitals', path: '/admin/viewHospitals' },
//       ],
//     },
//     {
//       name: 'Diagnostics',
//       icon: 'fas fa-briefcase-medical',
//       subItems: [
//         { name: 'uploadDiagnostics', path: '/admin/uploadDiagnostics' },
//         { name: 'uploadLabtests', path: '/admin/uploadlabtests' },
//         { name: 'viewDiagnostics', path: '/admin/viewdiagnostics' },
//       ],
//     },
//     {
//       name: 'Translators',
//       icon: 'fas fa-language',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadTranslators' },
//         { name: 'view', path: '/admin/viewTranslators' },
//       ],
//     },
//     {
//       name: 'Personalized_chefs',
//       icon: 'fas fa-utensils',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadchefs' },
//         { name: 'view', path: '/admin/viewchefs' },
//       ],
//     },
//     {
//       name: 'Physios',
//       icon: 'fas fa-dumbbell',
//       subItems: [
//         { name: 'upload', path: '/admin/uploadPhysios' },
//         { name: 'view', path: '/admin/viewphysios' },
//       ],
//     },
//     {
//       name: 'SpaServices',
//       icon: 'fas fa-spa',
//       subItems: [
//         { name: 'UploadSpacenters', path: '/admin/uploadCenters' },
//         { name: 'UploadServices', path: '/admin/uploadspaServices' },
//         { name: 'ViewSpaCenters', path: '/admin/viewcenters' },
//       ],
//     },
//     { name: 'BusinessLocation', icon: 'fas fa-map-marker-alt', path: '/admin/businessLocations' },
//     { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
//     { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
//   ];

//   const getFilteredMenuItems = (): MenuItem[] => {
//     if (!adminUser || !adminUser.role) {
//       console.log('No user or role found, returning empty menu');
//       return [];
//     }

//     // Admins see all menu items
//     if (adminUser.role === 'ADMIN') {
//       console.log('Admin role detected, showing all menu items');
//       return allMenuItems;
//     }

//     const filteredItems: MenuItem[] = [];

//     allMenuItems.forEach((item) => {
//       if (item.subItems) {
//         // Filter sub-items based on permissions
//         const allowedSubItems = item.subItems.filter((subItem) => {
//           const hasPermission = permissions[item.name]?.includes(subItem.name);
//           console.log(`Checking ${item.name}.${subItem.name}: ${hasPermission}`);
//           return hasPermission;
//         });
//         if (allowedSubItems.length > 0) {
//           filteredItems.push({
//             ...item,
//             subItems: allowedSubItems,
//           });
//         }
//       } else {
//         // Handle top-level items
//         const permissionName = item.name === 'Add Admin' ? 'Add Admin' : item.name;
//         if (permissions[permissionName] || item.name === 'Dashboard') {
//           console.log(`Including top-level item: ${item.name}`);
//           filteredItems.push(item);
//         }
//       }
//     });

//     console.log('Filtered menu items:', filteredItems);
//     return filteredItems;
//   };

//   const menuItems = getFilteredMenuItems();

//   const toggleSubMenu = (name: string) => {
//     setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       boxShadow: '0 0 10px rgba(22, 163, 74, 0.5)',
//       transition: { duration: 0.3 },
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.2 },
//     },
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminUser');
//     localStorage.removeItem('permissions');
//     navigate('/login');
//   };

//   return (
//     <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm flex flex-col">
//       <div className="p-6 text-2xl font-bold border-b border-green-100 text-green-700">
//         Admin Panel
//       </div>
//       <nav className="flex-1 overflow-y-auto">
//         {menuItems.length === 0 ? (
//           <div className="p-4 text-sm text-green-600">No permissions available</div>
//         ) : (
//           menuItems.map((item) => (
//             <div key={item.name} className="border-b border-green-100">
//               {item.subItems ? (
//                 <>
//                   <button
//                     onClick={() => toggleSubMenu(item.name)}
//                     className="flex items-center w-full p-4 hover:bg-green-100 transition-all"
//                     aria-expanded={openMenus[item.name]}
//                     aria-controls={`submenu-${item.name}`}
//                   >
//                     <i className={`${item.icon} mr-3 text-green-600`}></i>
//                     <span className="font-medium">{item.name}</span>
//                     <i
//                       className={`fas fa-chevron-${openMenus[item.name] ? 'up' : 'down'} ml-auto text-sm text-green-500`}
//                     ></i>
//                   </button>
//                   {openMenus[item.name] && (
//                     <div
//                       id={`submenu-${item.name}`}
//                       className="pl-8 bg-white border-t border-green-100"
//                     >
//                       {item.subItems.map((subItem) => (
//                         <Link
//                           key={subItem.name}
//                           to={subItem.path}
//                           className="block py-2 px-4 text-sm text-green-700 hover:bg-green-100 rounded transition"
//                         >
//                           {subItem.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 item.path && (
//                   <motion.div
//                     variants={item.name === 'Add Admin' ? buttonVariants : {}}
//                     whileHover={item.name === 'Add Admin' ? 'hover' : undefined}
//                     whileTap={item.name === 'Add Admin' ? 'tap' : undefined}
//                   >
//                     <Link
//                       to={item.path}
//                       className="flex items-center p-4 hover:bg-green-100 transition-colors text-green-800"
//                     >
//                       <i className={`${item.icon} mr-3 text-green-600`}></i>
//                       <span className="font-medium">{item.name}</span>
//                     </Link>
//                   </motion.div>
//                 )
//               )}
//             </div>
//           ))
//         )}
//       </nav>
//       <div className="p-4 border-t border-green-100">
//         <button
//           onClick={handleLogout}
//           className="flex items-center text-red-600 hover:text-red-800 transition-colors"
//           aria-label="Logout"
//         >
//           <i className="fas fa-sign-out-alt mr-3"></i>
//           <span className="font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SubItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  subItems?: SubItem[];
}

interface Permission {
  [key: string]: string[];
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission>({});
  const [adminUser, setAdminUser] = useState<{ role?: string }>({});
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    const storedPermissions = JSON.parse(localStorage.getItem('permissions') || '{}');
    setAdminUser(storedUser);
    setPermissions(storedPermissions);
    console.log('Admin User from localStorage:', storedUser);
    console.log('Permissions from localStorage:', storedPermissions);
  }, []);

  const allMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'fas fa-home', path: '/admin/admindashboard' },
    { name: 'Add Admin', icon: 'fas fa-user-plus', path: '/subadminregister' },
    { name: 'Users', icon: 'fas fa-users', path: '/users' },
    {
      name: 'Hospital',
      icon: 'fas fa-user-md',
      subItems: [
        { name: 'UploadDoctors', path: '/admin/doctors/upload' },
        { name: 'ViewDoctors', path: '/admin/doctors/viewdoctors' },
        { name: 'UploadHospital', path: '/admin/uploadhospital' },
        { name: 'viewHospitals', path: '/admin/viewHospitals' },
      ],
    },
    {
      name: 'Diagnostics',
      icon: 'fas fa-briefcase-medical',
      subItems: [
        { name: 'uploadDiagnostics', path: '/admin/uploadDiagnostics' },
        { name: 'uploadLabtests', path: '/admin/uploadlabtests' },
        { name: 'viewDiagnostics', path: '/admin/viewdiagnostics' },
      ],
    },
    {
      name: 'Translators',
      icon: 'fas fa-language',
      subItems: [
        { name: 'upload', path: '/admin/uploadTranslators' },
        { name: 'view', path: '/admin/viewTranslators' },
      ],
    },
    {
      name: 'Personalized_chefs',
      icon: 'fas fa-utensils',
      subItems: [
        { name: 'upload', path: '/admin/uploadchefs' },
        { name: 'view', path: '/admin/viewchefs' },
      ],
    },
    {
      name: 'Physios',
      icon: 'fas fa-dumbbell',
      subItems: [
        { name: 'upload', path: '/admin/uploadPhysios' },
        { name: 'view', path: '/admin/viewphysios' },
      ],
    },
    {
      name: 'SpaServices',
      icon: 'fas fa-spa',
      subItems: [
        { name: 'UploadSpacenters', path: '/admin/uploadCenters' },
        { name: 'UploadServices', path: '/admin/uploadspaServices' },
        { name: 'ViewSpaCenters', path: '/admin/viewcenters' },
      ],
    },
    { name: 'BusinessLocation', icon: 'fas fa-map-marker-alt', path: '/admin/businessLocations' },
    { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
    { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
  ];

  const getFilteredMenuItems = (): MenuItem[] => {
    if (!adminUser || !adminUser.role) {
      console.log('No user or role found, returning empty menu');
      return [];
    }

    // Admins see all menu items
    if (adminUser.role === 'ADMIN') {
      console.log('Admin role detected, showing all menu items');
      return allMenuItems;
    }

    const filteredItems: MenuItem[] = [];

    allMenuItems.forEach((item) => {
      if (item.subItems) {
        // Filter sub-items based on permissions
        const allowedSubItems = item.subItems.filter((subItem) => {
          const hasPermission = permissions[item.name]?.includes(subItem.name);
          console.log(`Checking ${item.name}.${subItem.name}: ${hasPermission}`);
          return hasPermission;
        });
        if (allowedSubItems.length > 0) {
          filteredItems.push({
            ...item,
            subItems: allowedSubItems,
          });
        }
      } else {
        // Handle top-level items
        const permissionName = item.name === 'Add Admin' ? 'Add Admin' : item.name;
        if (permissions[permissionName] || item.name === 'Dashboard') {
          console.log(`Including top-level item: ${item.name}`);
          filteredItems.push(item);
        }
      }
    });

    console.log('Filtered menu items:', filteredItems);
    return filteredItems;
  };

  const menuItems = getFilteredMenuItems();

  const toggleSubMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 0 10px rgba(22, 163, 74, 0.5)',
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('permissions');
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-green-100 text-green-700">
        Admin Panel
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.length === 0 ? (
          <div className="p-4 text-sm text-green-600">No permissions available</div>
        ) : (
          menuItems.map((item) => (
            <div key={item.name} className="border-b border-green-100">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    className="flex items-center w-full p-4 hover:bg-green-100 transition-all"
                    aria-expanded={openMenus[item.name]}
                    aria-controls={`submenu-${item.name}`}
                  >
                    <i className={`${item.icon} mr-3 text-green-600`}></i>
                    <span className="font-medium">{item.name}</span>
                    <i
                      className={`fas fa-chevron-${openMenus[item.name] ? 'up' : 'down'} ml-auto text-sm text-green-500`}
                    ></i>
                  </button>
                  {openMenus[item.name] && (
                    <div
                      id={`submenu-${item.name}`}
                      className="pl-8 bg-white border-t border-green-100"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block py-2 px-4 text-sm text-green-700 hover:bg-green-100 rounded transition"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                item.path && (
                  <motion.div
                    variants={item.name === 'Add Admin' ? buttonVariants : {}}
                    whileHover={item.name === 'Add Admin' ? 'hover' : undefined}
                    whileTap={item.name === 'Add Admin' ? 'tap' : undefined}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center p-4 hover:bg-green-100 transition-colors text-green-800"
                    >
                      <i className={`${item.icon} mr-3 text-green-600`}></i>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          ))
        )}
      </nav>
      <div className="p-4 border-t border-green-100">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          aria-label="Logout"
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;