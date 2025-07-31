
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
import { Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

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
        } catch (err) {
            console.error('Login error:', err);

            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError(err.response.data || 'Invalid credentials');
                } else if (err.request) {
                    setError('Network error: Unable to connect to server');
                } else {
                    setError('Login failed. Please try again.');
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#3a7e10]">
                    Admin Portal
                </h2>
                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm animate-fade-in">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                            placeholder="Enter your email"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-transparent transition-colors duration-200 placeholder-gray-400"
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                            isLoading
                                ? 'bg-[#3a7e10]/70 cursor-not-allowed'
                                : 'bg-[#499E14] hover:bg-[#3a7e10] focus:ring-2 focus:ring-[#499E14] focus:ring-offset-2'
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            'Log In'
                        )}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Forgot your password?{' '}
                    <a href="/forgot-password" className="text-[#499E14] hover:underline">
                        Reset it
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;