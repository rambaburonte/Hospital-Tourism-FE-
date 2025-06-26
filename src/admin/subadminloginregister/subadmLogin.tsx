
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// interface LoginResponse {
//   adminName: string;
//   adminEmail: string;
//   adminPassword: string;
//   employeeId: string;
//   permissions: string[];
//   role: 'admin' | 'subadmin';
// }

// interface StructuredPermissions {
//   [module: string]: string[];
// }

// const SubadmLoginForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const mapPermissions = (permissions: string[]): StructuredPermissions => {
//     const mapped: StructuredPermissions = {
//       Hospital: [],
//       SpaServices: [],
//       Lab: [],
//     };

//     for (const perm of permissions) {
//       switch (perm) {
//         case 'Add Doctor':
//         case 'Edit Doctor':
//           mapped.Hospital.push('UploadDoctors');
//           break;
//         case 'View Doctors':
//           mapped.Hospital.push('ViewDoctors');
//           break;
//         case 'View Spa Services':
//           mapped.SpaServices.push('ViewSpaCenters');
//           break;
//         case 'Add Lab Tests':
//         case 'Edit Lab Tests':
//         case 'Delete Lab Tests':
//         case 'Download Lab Tests':
//           mapped.Lab.push('ManageLabTests');
//           break;
//         case 'View Lab Tests':
//           mapped.Lab.push('ViewLabTests');
//           break;
//         default:
//           break;
//       }
//     }

//     // Clean up empty modules
//     Object.keys(mapped).forEach((key) => {
//       if (mapped[key].length === 0) delete mapped[key];
//     });

//     return mapped;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setLoading(true);

//     try {
//       const response = await axios.post<LoginResponse>('${BASE_URL}/admin/login', {
//         adminEmail: email,
//         adminPassword: password,
//       });

//       const data = response.data;

//       const structuredPermissions = mapPermissions(data.permissions);

//       const storedUser = {
//         adminName: data.adminName,
//         adminEmail: data.adminEmail,
//         employeeId: data.employeeId,
//         role: data.role,
//         originalPermissions: data.permissions,
//         permissions: structuredPermissions,
//       };

//       console.log('Original permissions:', data.permissions);
//       console.log('Structured permissions:', structuredPermissions);

//       localStorage.setItem('adminUser', JSON.stringify(storedUser));
//       navigate('/admin/admindashboard');
//     } catch (error: any) {
//       console.error('Login error:', error);
//       setErrorMsg(error.response?.data?.message || 'Invalid credentials or server error.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-200"
//       >
//         <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">Admin Login</h2>

//         <AnimatePresence>
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex justify-between items-center"
//             >
//               <span>{errorMsg}</span>
//               <button
//                 onClick={() => setErrorMsg('')}
//                 className="text-red-700 hover:text-red-900"
//                 aria-label="Dismiss error"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <form onSubmit={handleLogin} noValidate>
//           <div className="mb-5">
//             <label htmlFor="email" className="block text-green-800 font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-green-800 font-medium mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 required
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
//               >
//                 <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//               </button>
//             </div>
//           </div>

//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <i className="fas fa-spinner fa-spin mr-2"></i> Logging in...
//               </span>
//             ) : (
//               'Login'
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default SubadmLoginForm;
///////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// interface LoginResponse {
//   adminId: number;
//   adminName: string;
//   adminEmail: string;
//   adminPassword: string;
//   employeeId: string;
//   permissions: string[];
//   role?: string;
// }

// const SubadmLoginForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [errorMsg, setErrorMsg] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showPassword, setShowPassword] = useState<boolean>(false);

//   // Map flat API permissions to nested structure for sidebar
//   const mapPermissions = (permissions: string[]): { [key: string]: string[] } => {
//     const mapped: { [key: string]: string[] } = {
//       Hospital: [],
//       Diagnostics: [],
//       Translators: [],
//       Personalized_chefs: [],
//       Physios: [],
//       SpaServices: [],
//       'Add Admin': [],
//       Users: [],
//       BusinessLocation: [],
//       Orders: [],
//       Settings: [],
//     };

//     permissions.forEach((perm) => {
//       // Hospital
//       if (perm === 'Add Doctor') {
//         mapped.Hospital.push('UploadDoctors');
//       }
//       if (perm === 'View Doctors') {
//         mapped.Hospital.push('ViewDoctors');
//       }
//       if (perm === 'Add Hospital') {
//         mapped.Hospital.push('UploadHospital');
//       }
//       if (perm === 'View Hospitals') {
//         mapped.Hospital.push('viewHospitals');
//       }
//       // Diagnostics
//       if (perm === 'Add Lab Tests' || perm === 'Edit Lab Tests') {
//         mapped.Diagnostics.push('uploadLabtests');
//       }
//       if (perm === 'View Lab Tests' || perm === 'Delete Lab Tests') {
//         mapped.Diagnostics.push('viewDiagnostics');
//       }
//       // Translators
//       if (perm === 'Add Translators') {
//         mapped.Translators.push('upload');
//       }
//       if (perm === 'View Translators') {
//         mapped.Translators.push('view');
//       }
//       // Personalized_chefs
//       if (perm === 'UploadChefs') {
//         mapped.Personalized_chefs.push('upload');
//       }
//       if (perm === 'ViewChefs') {
//         mapped.Personalized_chefs.push('view');
//       }
//       // Physios
//       if (perm === 'UploadPhysios') {
//         mapped.Physios.push('upload');
//       }
//       if (perm === 'ViewPhysios') {
//         mapped.Physios.push('view');
//       }
//       // SpaServices
//       if (perm === 'UploadSpacenters') {
//         mapped.SpaServices.push('UploadSpacenters');
//       }
//       if (perm === 'UploadServices') {
//         mapped.SpaServices.push('UploadServices');
//       }
//       if (perm === 'ViewSpaCenters') {
//         mapped.SpaServices.push('ViewSpaCenters');
//       }
//       // Top-level items
//       if (perm === 'Add Admin') {
//         mapped['Add Admin'].push('Add Admin');
//       }
//       if (perm === 'Users') {
//         mapped.Users.push('Users');
//       }
//       if (perm === 'BusinessLocation') {
//         mapped.BusinessLocation.push('BusinessLocation');
//       }
//       if (perm === 'Orders') {
//         mapped.Orders.push('Orders');
//       }
//       if (perm === 'Settings') {
//         mapped.Settings.push('Settings');
//       }
//       // Ignore unmapped permissions like 'Download Lab Tests'
//     });

//     // Remove empty categories
//     Object.keys(mapped).forEach((key) => {
//       if (mapped[key].length === 0) {
//         delete mapped[key];
//       }
//     });

//     return mapped;
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setLoading(true);

//     try {
//       const response = await axios.post('${BASE_URL}/admin/login', {
//         adminEmail: email,
//         adminPassword: password,
//       });

//       if (response.status === 200 && response.data) {
//         const data: LoginResponse = response.data;

//         // Map permissions to the nested structure
//         const mappedPermissions = mapPermissions(data.permissions);

//         // Store user data and permissions in localStorage
//         const userData = {
//           adminId: data.adminId,
//           adminName: data.adminName,
//           adminEmail: data.adminEmail,
//           employeeId: data.employeeId,
//           role: data.role || (data.permissions.length > 0 ? 'SUBADMIN' : 'ADMIN'),
//         };
//         localStorage.setItem('adminUser', JSON.stringify(userData));
//         localStorage.setItem('permissions', JSON.stringify(mappedPermissions));

//         console.log('Stored adminUser:', userData);
//         console.log('Stored permissions:', mappedPermissions);

//         navigate('/admin/admindashboard');
//       } else {
//         setErrorMsg('Login failed. Please try again.');
//       }
//     } catch (error: any) {
//       console.error('Login error:', error);
//       setErrorMsg(
//         error.response?.data?.message || 'Invalid credentials or server error.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
//           Admin Login
//         </h2>
//         <AnimatePresence>
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex justify-between items-center"
//             >
//               <span>{errorMsg}</span>
//               <button
//                 onClick={() => setErrorMsg('')}
//                 className="text-red-700 hover:text-red-900"
//                 aria-label="Dismiss error"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <form onSubmit={handleLogin} noValidate>
//           <div className="mb-5">
//             <label
//               htmlFor="email"
//               className="block text-green-700 font-medium mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//               required
//               placeholder="Enter your email"
//               aria-describedby="email-error"
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block text-green-700 font-medium mb-2"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                 required
//                 placeholder="Enter your password"
//                 aria-describedby="password-error"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//               </button>
//             </div>
//           </div>
//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition font-semibold ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             aria-label="Login"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <i className="fas fa-spinner fa-spin mr-2"></i>
//                 Logging in...
//               </span>
//             ) : (
//               'Login'
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default SubadmLoginForm;














import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
interface LoginResponse {
  adminId: number;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  employeeId: string;
  permissions: string[];
  role?: string;
}

const SubadmLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const allPermissions = [
    'Add Doctor', 'View Doctors', 'Add Hospital', 'View Hospitals',
    'Add Lab Tests', 'Edit Lab Tests', 'View Lab Tests', 'Delete Lab Tests', 'Download Lab Tests',
    'Add Translators', 'View Translators',
    'UploadChefs', 'ViewChefs',
    'UploadPhysios', 'ViewPhysios',
    'UploadSpacenters', 'UploadServices', 'ViewSpaCenters',
    'Add Admin', 'Users', 'BusinessLocation', 'Orders', 'Settings'
  ];

  const mapPermissions = (permissions: string[]): { [key: string]: string[] } => {
    const mapped: { [key: string]: string[] } = {
      Hospital: [],
      Diagnostics: [],
      Translators: [],
      Personalized_chefs: [],
      Physios: [],
      SpaServices: [],
      'Add Admin': [],
      Users: [],
      BusinessLocation: [],
      Orders: [],
      Settings: [],
    };

    permissions.forEach((perm) => {
      if (perm === 'Add Doctor') mapped.Hospital.push('UploadDoctors');
      if (perm === 'View Doctors') mapped.Hospital.push('ViewDoctors');
      if (perm === 'Add Hospital') mapped.Hospital.push('UploadHospital');
      if (perm === 'View Hospitals') mapped.Hospital.push('viewHospitals');
      if (perm === 'Add Lab Tests' || perm === 'Edit Lab Tests') mapped.Diagnostics.push('uploadLabtests');
      if (perm === 'View Lab Tests' || perm === 'Delete Lab Tests') mapped.Diagnostics.push('viewDiagnostics');
      if (perm === 'Add Translators') mapped.Translators.push('upload');
      if (perm === 'View Translators') mapped.Translators.push('view');
      if (perm === 'UploadChefs') mapped.Personalized_chefs.push('upload');
      if (perm === 'ViewChefs') mapped.Personalized_chefs.push('view');
      if (perm === 'UploadPhysios') mapped.Physios.push('upload');
      if (perm === 'ViewPhysios') mapped.Physios.push('view');
      if (perm === 'UploadSpacenters') mapped.SpaServices.push('UploadSpacenters');
      if (perm === 'UploadServices') mapped.SpaServices.push('UploadServices');
      if (perm === 'ViewSpaCenters') mapped.SpaServices.push('ViewSpaCenters');
      if (perm === 'Add Admin') mapped['Add Admin'].push('Add Admin');
      if (perm === 'Users') mapped.Users.push('Users');
      if (perm === 'BusinessLocation') mapped.BusinessLocation.push('BusinessLocation');
      if (perm === 'Orders') mapped.Orders.push('Orders');
      if (perm === 'Settings') mapped.Settings.push('Settings');
    });

    Object.keys(mapped).forEach((key) => {
      if (mapped[key].length === 0) delete mapped[key];
    });

    return mapped;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {      if (email === 'major@gmail.com' && password === 'major@123') {
        // Super-admin login
        const mappedPermissions = mapPermissions(allPermissions);
        const superAdminData = {
          adminId: 1,
          adminName: 'Major',
          adminEmail: 'major@gmail.com',
          employeeId: 'admin001',
          role: 'admin',
          permissions: mappedPermissions, // Include permissions in the main user object
        };

        localStorage.setItem('adminUser', JSON.stringify(superAdminData));
        localStorage.setItem('permissions', JSON.stringify(mappedPermissions)); // Keep for backward compatibility
        console.log('Stored super-admin user:', superAdminData);
        console.log('Stored permissions:', mappedPermissions);
        navigate('/admin/admindashboard');
      } else {
        // Regular admin/sub-admin login
        const response = await axios.post(`${BASE_URL}/admin/login`, {
          adminEmail: email,
          adminPassword: password,
        });

        if (response.status === 200 && response.data) {
          const data: LoginResponse = response.data;
          const mappedPermissions = mapPermissions(data.permissions);          const userData = {
            adminId: data.adminId,
            adminName: data.adminName,
            adminEmail: data.adminEmail,
            employeeId: data.employeeId,
            role: data.role || (data.permissions.length > 0 ? 'subadmin' : 'admin'),
            permissions: mappedPermissions, // Include permissions in the main user object
          };
          localStorage.setItem('adminUser', JSON.stringify(userData));
          localStorage.setItem('permissions', JSON.stringify(mappedPermissions)); // Keep for backward compatibility
          console.log('Stored adminUser:', userData);
          console.log('Stored permissions:', mappedPermissions);
          navigate('/admin/admindashboard');
        } else {
          setErrorMsg('Login failed. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(
        error.response?.data?.message || 'Invalid credentials or server error.',
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Admin Login
        </h2>
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex justify-between items-center"
            >
              <span>{errorMsg}</span>
              <button
                onClick={() => setErrorMsg('')}
                className="text-red-700 hover:text-red-900"
                aria-label="Dismiss error"
              >
                <i className="fas fa-times"></i>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-green-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
              placeholder="Enter your email"
              aria-describedby="email-error"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-green-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
                placeholder="Enter your password"
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition font-semibold ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Login"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SubadmLoginForm;