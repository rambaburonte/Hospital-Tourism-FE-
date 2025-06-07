import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar';
// Define the type for the form data
interface SubAdminData {
    adminId: number;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    employeeId: string;
    permissions: string[];
}

const UpdateSubAdminForm: React.FC = () => {
    // State for form data
    const [formData, setFormData] = useState<SubAdminData>({
        adminId: 2,
        adminName: "Srikar kandhukuri",
        adminEmail: "ramronte@gmail.com",
        adminPassword: "r@123456",
        employeeId: "EMP124",
        permissions: ["Add Doctor"]
    });
const base_url="https://healthtourism-5.onrender.com"
    // State for selected permission in dropdown
    const [selectedPermission, setSelectedPermission] = useState<string>("Add Doctor");

    // Available permissions for dropdown
    const permissionOptions: string[] = ["Add Doctor", "View Reports", "Manage Users"];

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle permission dropdown change
    const handlePermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const permission = e.target.value;
        setSelectedPermission(permission);
        setFormData(prev => ({ ...prev, permissions: [permission] }));
    };

    // Handle save button click
    const handleSave = async () => {
        try {
            const response = await axios.put("http://localhost:8080/admin/update-subadmin", formData);
            alert("Sub-Admin updated successfully!");
            console.log(response.data);
        } catch (error: any) {
            alert("Error updating Sub-Admin: " + (error.response?.data?.message || error.message));
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-purple-50 p-6">
             <Sidebar />
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <h1 className="text-2xl font-bold text-purple-700 mb-4">Update Sub-Admin</h1>

                {/* Account Information Section */}
                <h2 className="text-lg font-semibold mb-2">Account Information</h2>
                <div className="space-y-4">
                    {/* Admin ID (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Admin ID</label>
                        <input
                            type="number"
                            name="adminId"
                            value={formData.adminId}
                            disabled
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>

                    {/* Admin Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="adminName"
                            value={formData.adminName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Admin Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="adminEmail"
                            value={formData.adminEmail}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Admin Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="adminPassword"
                            value={formData.adminPassword}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Job Information Section */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Job Information</h2>
                <div className="space-y-4">
                    {/* Employee ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Permissions Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Permissions</label>
                        <select
                            value={selectedPermission}
                            onChange={handlePermissionChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {permissionOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateSubAdminForm;