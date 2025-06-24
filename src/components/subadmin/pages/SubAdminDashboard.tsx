import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../admin/AdminSidebar';

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
        const storedPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
        
        console.log('SubAdminDashboard: Checking stored user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            
            // Ensure permissions are included in the user object
            const userWithPermissions = {
                ...user,
                permissions: user.permissions || storedPermissions || []
            };
            
            console.log('SubAdminDashboard: Loaded admin user:', userWithPermissions);
            console.log('SubAdminDashboard: User role:', userWithPermissions.role);
            console.log('SubAdminDashboard: User permissions:', userWithPermissions.permissions);
            
            // Normalize role comparison
            if (userWithPermissions.role?.toLowerCase() === 'subadmin') {
                setAdminUser(userWithPermissions);
            } else {
                console.log('SubAdminDashboard: User is not a sub-admin, redirecting');
                navigate('/admin/login');
            }
        } else {
            console.log('SubAdminDashboard: No stored user found, redirecting to login');
            navigate('/admin/login');
        }
    }, [navigate]);    if (!adminUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }    return (
        <div className="min-h-screen bg-gray-100">
            
            <div className="flex pt-32">
                {/* Sidebar */}
                <AdminSidebar />
                
                {/* Main Content */}
                <div className="flex-1 ml-64">
                {/* Dashboard Content */}
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Sub-Admin Dashboard</h1>
                            <p className="mt-2 text-gray-600">Welcome back, {adminUser.adminName}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-user-check text-2xl text-green-600"></i>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Active Permissions
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900">
                                                    {adminUser.permissions.length}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-shield-alt text-2xl text-blue-600"></i>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Role
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900 capitalize">
                                                    {adminUser.role}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-calendar text-2xl text-purple-600"></i>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Login Status
                                                </dt>
                                                <dd className="text-lg font-medium text-green-600">
                                                    Online
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <i className="fas fa-clock text-2xl text-orange-600"></i>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">
                                                    Last Login
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900">
                                                    Today
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Permissions Info */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Your Permissions
                                </h3>
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
                                    <div className="flex flex-wrap gap-2">
                                        {adminUser.permissions.map((permission) => (
                                            <span
                                                key={permission}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                                            >
                                                {permission}
                                            </span>
                                        ))}
                                    </div>
                                )}                                
                                <div className="mt-6">
                                    <p className="text-sm text-gray-600">
                                        Use the sidebar navigation to access the features you have permissions for. 
                                        Each menu item corresponds to your assigned permissions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>                
                </div>
            </div>
        </div>
    );
};

export default SubAdminDashboard;
