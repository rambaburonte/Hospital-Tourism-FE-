
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '@/config/config';

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();    const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
        
//         try {
//             console.log('Attempting login with:', { email, password: password ? '***' : 'empty' });
//             console.log('API URL:', `${BASE_URL}/admin/login`);
            
//             const response = await axios.post(`${BASE_URL}/admin/login`, { 
//                 adminEmail: email, 
//                 adminPassword: password 
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 timeout: 10000 // 10 second timeout
//             });
            
//             console.log('Login response:', response.data);
            
//             const admin = response.data;
//             const { role, permissions } = admin;            // Store admin info in localStorage
//             localStorage.setItem('adminUser', JSON.stringify(admin));
            
//             if (role === 'admin') {
//                 navigate('/admin/admindashboard');
//             } else if (role === 'subadmin') {
//                 // Always navigate to the sub-admin dashboard first
//                 navigate('/subadmin/dashboard');
//             } else {
//                 setError('Access denied. Unknown role.');
//             }
//         }
//         catch (err: unknown) {
//             console.error('Login error:', err);
            
//             if (axios.isAxiosError(err)) {
//                 if (err.response) {
//                     // Server responded with error status
//                     console.error('Error response:', err.response.data);
//                     console.error('Error status:', err.response.status);
//                     setError(err.response.data || 'Login failed');
//                 } else if (err.request) {
//                     // Request was made but no response received
//                     console.error('No response received:', err.request);
//                     setError('Network error: Unable to connect to server');
//                 } else {
//                     // Something else happened
//                     console.error('Error message:', err.message);
//                     setError(err.message || 'Login failed');
//                 }
//             } else {
//                 setError('An unexpected error occurred');
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
//                 <h2 className="text-2xl font-semibold text-center mb-6 text-[#3a7e10]">
//                     Admin / Sub-Admin Login
//                 </h2>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
//                             placeholder="admin@example.com"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
//                             placeholder="••••••••"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-[#499E14] text-white py-2 rounded-xl hover:bg-[#3a7e10] transition"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const trimmedEmail = email.trim().toLowerCase();
            const encodedEmail = encodeURIComponent(trimmedEmail);
            const encodedPassword = encodeURIComponent(password);

            const apiUrl = `${BASE_URL}/sub/admin/login/${encodedEmail}/${encodedPassword}`;
            console.log('API URL:', apiUrl);

            const response = await axios.post(apiUrl, null, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000
            });

            const admin = response.data;
            const { role } = admin;

            localStorage.setItem('adminUser', JSON.stringify(admin));

            if (role === 'admin') {
                navigate('/admin/admindashboard');
            } else if (role === 'subadmin') {
                navigate('/subadmin/dashboard');
            } else {
                setError('Access denied. Unknown role.');
            }

        } catch (err: unknown) {
            console.error('Login error:', err);

            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError(err.response.data || 'Login failed');
                } else if (err.request) {
                    setError('Network error: Unable to connect to server');
                } else {
                    setError(err.message || 'Login failed');
                }
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6 text-[#3a7e10]">
                    Admin / Sub-Admin Login
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#499E14] text-white py-2 rounded-xl hover:bg-[#3a7e10] transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
