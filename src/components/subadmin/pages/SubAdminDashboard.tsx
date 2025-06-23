import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AdminUser {
    id: number;
    adminName: string;
    adminEmail: string;
    role: string;
    permissions: string[];
}

const SubAdminDashboard = () => {
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
    const navigate = useNavigate();    useEffect(() => {
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            console.log('Loaded admin user:', user);
            if (user.role === 'subadmin') {
                setAdminUser(user);
            } else {
                // Redirect non-subadmins
                navigate('/admin/login');
            }
        } else {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };    const hasPermission = (permission: string) => {
        console.log(`Checking permission: ${permission}`);
        console.log('User permissions:', adminUser?.permissions);
        
        // Case-insensitive check
        if (adminUser?.permissions) {
            return adminUser.permissions.some(p => 
                p.toLowerCase() === permission.toLowerCase()
            );
        }
        return false;
    };const permissionPages = [
        { permission: 'VIEW_DASHBOARD', path: '/subadmin/view-dashboard', label: 'View Dashboard', icon: 'fas fa-chart-bar' },
        { permission: 'MANAGE_USERS', path: '/subadmin/manage-users', label: 'Manage Users', icon: 'fas fa-users' },
        { permission: 'EDIT_PROFILE', path: '/subadmin/edit-profile', label: 'Edit Profile', icon: 'fas fa-user-edit' },
        { permission: 'MANAGE_CONTENT', path: '/subadmin/manage-content', label: 'Manage Content', icon: 'fas fa-file-alt' },
        { permission: 'VIEW_REPORTS', path: '/subadmin/view-reports', label: 'View Reports', icon: 'fas fa-chart-line' },
        // Added permissions that match the categories in SubAdminRegister
        { permission: 'Add Doctor', path: '/admin/doctors/upload', label: 'Add Doctor', icon: 'fas fa-user-md' },
        { permission: 'View Doctors', path: '/admin/doctors/viewdoctors', label: 'View Doctors', icon: 'fas fa-user-md' },
        { permission: 'Add Hospital', path: '/admin/uploadhospital', label: 'Add Hospital', icon: 'fas fa-hospital' },
        { permission: 'View Hospitals', path: '/admin/viewHospitals', label: 'View Hospitals', icon: 'fas fa-hospital' },
    ];

    if (!adminUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Sub-Admin Dashboard</h1>
                            <p className="text-gray-600">Welcome, {adminUser.adminName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Actions</h2>
                        
                        {adminUser.permissions.length === 0 ? (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-exclamation-triangle text-yellow-400"></i>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800">
                                            No Permissions Assigned
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700">
                                            <p>You don't have any permissions assigned. Please contact your administrator.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {permissionPages
                                    .filter(page => hasPermission(page.permission))
                                    .map((page) => (
                                        <Link
                                            key={page.permission}
                                            to={page.path}
                                            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow"
                                        >
                                            <div>
                                                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                                                    <i className={`${page.icon} text-xl`}></i>
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {page.label}
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Access your {page.label.toLowerCase()} section
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Permissions Info */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                Your Permissions
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {adminUser.permissions.map((permission) => (
                                    <span
                                        key={permission}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                                    >
                                        {permission.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SubAdminDashboard;
