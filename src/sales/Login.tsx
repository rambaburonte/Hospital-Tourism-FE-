import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

const SubadmLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMsg('');
  setLoading(true);

  try {
    const response = await axios.post(`${BASE_URL}/api/bookings/login`, {
      email,
      password,
    });

    if (response.status === 200 && response.data) {
      const { id, name, email, phone } = response.data;

      const salesUser = {
        id,
        name,
        email,
        phone,
      };

      // ✅ Store in localStorage
      localStorage.setItem('salesUser', JSON.stringify(salesUser));

      // ✅ Redirect to sales dashboard
      navigate('/admin/sales/dashboard');
    } else {
      setErrorMsg('Login failed. Please try again.');
    }
  } catch (error: any) {
    console.error('Login error:', error);
    setErrorMsg(
      error.response?.data?.message || 'Invalid credentials or server error.'
    );
  } finally {
    setLoading(false);
  }
};


  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Sales Login
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
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
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
