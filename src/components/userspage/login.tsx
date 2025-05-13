import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here if needed
    navigate("/dashboard");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleAdminLogin = () => {
    navigate("/admin/admindashboard");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#3a7e10]">
            Patient Portal Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#499E14]"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
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

          <div className="text-center mt-4 space-y-2">
            <a href="/forgot-password" className="text-sm text-[#499E14] hover:underline">
              Forgot password?
            </a>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Don't have an account?</span>
              <button
                onClick={handleSignUp}
                className="ml-2 text-sm text-green-600 hover:underline"
              >
                Sign up
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={handleAdminLogin}
                className="text-sm text-purple-600 hover:underline"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
