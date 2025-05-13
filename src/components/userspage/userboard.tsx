import React from "react";
import { useNavigate } from "react-router-dom";

export default function Userdashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">


      <main className="flex-grow p-6 sm:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome, User!
            </h1>
            <button
              onClick={() => navigate('/PatientProfile')}
              className="px-6 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635] focus:outline-none shadow-md"
              aria-label="View patient profile"
            >
              View Profile
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
            Your dashboard provides quick access to your activity, account details, and support resources. Manage your health information seamlessly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h2>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#499E14] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Updated profile on May 8, 2025
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#499E14] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Uploaded prescription on May 5, 2025
                </li>
              </ul>
              <button
                onClick={() => navigate('/activity')}
                className="mt-4 text-[#499E14] dark:text-[#5cb91d] hover:underline focus:outline-none"
                aria-label="View all activity"
              >
                View All
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Status</h2>
              <p className="text-green-500 font-medium text-lg mb-2">Active</p>
              <p className="text-gray-600 dark:text-gray-300">Your account is fully verified and ready to use.</p>
              <button
                onClick={() => navigate('/settings')}
                className="mt-4 text-[#499E14] dark:text-[#5cb91d] hover:underline focus:outline-none"
                aria-label="Manage account settings"
              >
                Manage Settings
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Support</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Need assistance? Our team is here to help with any questions or issues.</p>
              <button
                onClick={() => navigate('/support')}
                className="px-4 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                aria-label="Contact support"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}