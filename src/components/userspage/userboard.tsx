import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Userdashboard() {
  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome, User!</h1>
        <p className="text-gray-600 mb-6">
          This is your dashboard. Use this space to view your activity, manage your account, and access important information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="text-gray-500 mt-2">No recent actions yet.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Account Status</h2>
            <p className="text-green-500 mt-2 font-medium">Active</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Support</h2>
            <p className="text-gray-500 mt-2">Need help? Contact support.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

