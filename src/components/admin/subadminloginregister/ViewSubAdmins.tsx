import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/config/config';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface SubAdmin {
  adminId: number;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  employeeId?: string;
  permissions: string[];
  status: string;
  role: string;
}

const ViewSubAdmins = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [resetPassword, setResetPassword] = useState<{ id: number; password: string } | null>(null);
  const [selectedAdminPermissions, setSelectedAdminPermissions] = useState<{ adminName: string; permissions: string[] } | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState<{ adminId: number; adminName: string; permissions: string[] } | null>(null);

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sub/admin/get-all`);
        setSubAdmins(response.data);
      } catch (err) {
        setError('Failed to fetch sub-admins.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubAdmins();
  }, []);

  const handleDelete = async (adminId: number) => {
    if (window.confirm('Are you sure you want to delete this sub-admin?')) {
      try {
        await axios.delete(`${BASE_URL}/sub/admin/delete-subadmin/${adminId}`);
        setSubAdmins((prev) => prev.filter((admin) => admin.adminId !== adminId));
        setSuccess('Sub-admin deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete sub-admin.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleResetPassword = async (adminId: number) => {
    if (window.confirm("Are you sure you want to reset this sub-admin's password?")) {
      try {
        const response = await axios.post(`${BASE_URL}/sub/admin/reset-password/${adminId}`);
        setResetPassword({ id: adminId, password: response.data.newPassword });
        setSuccess('Password reset successfully');
        setTimeout(() => setSuccess(''), 10000);
      } catch (err) {
        setError('Failed to reset password.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sub-Admin Management</h1>
              <p className="mt-1 text-sm text-gray-600">Manage and monitor all sub-administrator accounts</p>
            </div>
            <Link
              to="/admin/subadminregister"
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Sub-Admin
            </Link>
          </div>
        </div>

        {/* Alerts Section */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        {resetPassword && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Password Reset Successful</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    <strong>New Password for {subAdmins.find((a) => a.adminId === resetPassword.id)?.adminName}:</strong>
                  </p>
                  <p className="mt-1 font-mono bg-yellow-100 px-2 py-1 rounded text-xs">{resetPassword.password}</p>
                  <p className="mt-1 text-xs">⚠️ Please save this password. It will not be shown again.</p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => setResetPassword(null)}
                    className="text-xs font-medium text-yellow-800 hover:text-yellow-900 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
              <p className="text-lg font-medium text-gray-900">Loading sub-admins...</p>
              <p className="mt-1 text-sm text-gray-500">Please wait while we fetch the data</p>
            </div>
          ) : subAdmins.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900">No sub-admins found</p>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first sub-administrator account</p>
              <div className="mt-6">
                <Link
                  to="/admin/subadminregister"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Sub-Admin
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sub-Admin Details
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Employee ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role & Status
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Permissions
                      </th>
                      <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subAdmins.map((admin, index) => (
                      <tr key={admin.adminId} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        {/* Sub-Admin Details */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {admin.adminName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">{admin.adminName}</div>
                              <div className="text-sm text-gray-500">{admin.adminEmail}</div>
                              <div className="text-xs text-gray-400">ID: {admin.adminId}</div>
                            </div>
                          </div>
                        </td>

                        {/* Employee ID */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {admin.employeeId ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {admin.employeeId}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic">Not assigned</span>
                            )}
                          </div>
                        </td>

                        {/* Role & Status */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {admin.role}
                            </span>
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                admin.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  admin.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                                }`}></div>
                                {admin.status}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Permissions */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {admin.permissions.length > 0 ? (
                              <div className="space-y-1">
                                <div className="text-xs text-gray-500">
                                  {admin.permissions.length} permission{admin.permissions.length !== 1 ? 's' : ''}
                                </div>
                                <div className="max-w-xs">
                                  {admin.permissions.slice(0, 3).map((permission, idx) => (
                                    <span key={idx} className="inline-block mr-1 mb-1">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                        {permission}
                                      </span>
                                    </span>
                                  ))}
                                  {admin.permissions.length > 3 && (
                                    <button
                                      onClick={() => setSelectedAdminPermissions({
                                        adminName: admin.name,
                                        permissions: admin.permissions
                                      })}
                                      className="text-xs text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors duration-200"
                                    >
                                      +{admin.permissions.length - 3} more
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400 italic text-sm">No permissions assigned</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Link
                              to={`/admin/update-subadmin/${admin.adminId}`}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </Link>
                            <button
                              onClick={() => handleResetPassword(admin.adminId)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2L4.257 10.257a6 6 0 018.986-8.986L16 4h2v2a2 2 0 012 2z" />
                              </svg>
                              Reset
                            </button>
                            <button
                              onClick={() => handleDelete(admin.adminId)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {!loading && subAdmins.length > 0 && (
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-6">
                <span>Total Sub-Admins: <span className="font-semibold text-gray-900">{subAdmins.length}</span></span>
                <span>Active: <span className="font-semibold text-green-600">{subAdmins.filter(a => a.status === 'active').length}</span></span>
                <span>Inactive: <span className="font-semibold text-red-600">{subAdmins.filter(a => a.status !== 'active').length}</span></span>
              </div>
              <div className="text-xs text-gray-400">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Permissions Modal */}
      {selectedAdminPermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Permissions for {selectedAdminPermissions.adminName}
                </h3>
                <button
                  onClick={() => setSelectedAdminPermissions(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-4 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {selectedAdminPermissions.permissions.map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-md bg-gray-50 border border-gray-200"
                  >
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Total: {selectedAdminPermissions.permissions.length} permissions</span>
                <button
                  onClick={() => setSelectedAdminPermissions(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSubAdmins;
