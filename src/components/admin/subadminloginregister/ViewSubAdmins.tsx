// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';

// interface SubAdmin {
//     id: number;
//     adminName: string;
//     adminEmail: string;
//     employeeId?: string;
//     role: string;
//     permissions: string[];
//     status: string;
// }

// const ViewSubAdmins = () => {
//     const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [resetPassword, setResetPassword] = useState<{id: number, password: string} | null>(null);

//     useEffect(() => {
//         const fetchSubAdmins = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/admin/get-all-subadmins`);
//                 setSubAdmins(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch sub-admins.');
//                 setLoading(false);
//             }
//         };

//         fetchSubAdmins();
//     }, []);

//     const handleDelete = async (id: number) => {
//         if (window.confirm('Are you sure you want to delete this sub-admin?')) {
//             try {
//                 await axios.delete(`${BASE_URL}/admin/delete-subadmin/${id}`);
//                 setSubAdmins(subAdmins.filter((subAdmin) => subAdmin.id !== id));
//                 setSuccess('Sub-admin deleted successfully');
//                 setTimeout(() => setSuccess(''), 3000);
//             } catch (err) {
//                 setError('Failed to delete sub-admin.');
//                 setTimeout(() => setError(''), 3000);
//             }
//         }
//     };

//     const handleResetPassword = async (id: number) => {
//         if (window.confirm('Are you sure you want to reset this sub-admin\'s password?')) {
//             try {
//                 const response = await axios.post(`${BASE_URL}/admin/reset-password/${id}`);
//                 setResetPassword({ id, password: response.data.newPassword });
//                 setSuccess('Password reset successfully');
//                 setTimeout(() => setSuccess(''), 10000);
//             } catch (err) {
//                 setError('Failed to reset password.');
//                 setTimeout(() => setError(''), 3000);
//             }
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <div className="bg-white rounded-lg shadow-md">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <h1 className="text-2xl font-bold text-gray-800">Sub-Admin Management</h1>
//                 </div>
                
//                 {error && (
//                     <div className="mx-6 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//                         {error}
//                     </div>
//                 )}

//                 {success && (
//                     <div className="mx-6 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//                         {success}
//                     </div>
//                 )}
                
//                 {resetPassword && (
//                     <div className="mx-6 mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
//                         <p><strong>New Password for {subAdmins.find(a => a.id === resetPassword.id)?.adminName}:</strong> {resetPassword.password}</p>
//                         <p className="text-sm mt-1">Please save this password. It will not be shown again.</p>
//                         <button 
//                             onClick={() => setResetPassword(null)} 
//                             className="mt-2 text-xs font-medium text-yellow-800 hover:text-yellow-900"
//                         >
//                             Dismiss
//                         </button>
//                     </div>
//                 )}
                
//                 {loading ? (
//                     <div className="p-6 text-center">
//                         <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//                         <p className="mt-2 text-gray-600">Loading sub-admins...</p>
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">                            <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {subAdmins.length === 0 ? (
//                                     <tr>
//                                         <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
//                                             No sub-admins found
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     subAdmins.map((subAdmin) => (
//                                         <tr key={subAdmin.id} className="hover:bg-gray-50">
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                 {subAdmin.adminName}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {subAdmin.adminEmail}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {subAdmin.employeeId || 'Not set'}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                                                     {subAdmin.role || 'sub-admin'}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                                                     subAdmin.status === 'active' 
//                                                         ? 'bg-green-100 text-green-800' 
//                                                         : 'bg-red-100 text-red-800'
//                                                 }`}>
//                                                     {subAdmin.status || 'inactive'}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {subAdmin.permissions && subAdmin.permissions.length > 0 
//                                                     ? subAdmin.permissions.join(', ') 
//                                                     : 'No permissions'
//                                                 }
//                                             </td>                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                                                 <Link 
//                                                     to={`/admin/update-subadmin/${subAdmin.employeeId || subAdmin.id}`} 
//                                                     className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                                 >
//                                                     Edit
//                                                 </Link>
//                                                 <button 
//                                                     onClick={() => handleDelete(subAdmin.id)} 
//                                                     className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                                 <button 
//                                                     onClick={() => handleResetPassword(subAdmin.id)} 
//                                                     className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//                                                 >
//                                                     Reset Password
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
                
//                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//                     <Link 
//                         to="/admin/subadminregister" 
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                     >
//                         <i className="fas fa-plus mr-2"></i>
//                         Add New Sub-Admin
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewSubAdmins;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Direct API URL since it's fixed
const API_URL = 'http://localhost:4545/sub/admin/get-all';

interface SubAdmin {
  adminId: number;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
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

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get(API_URL);
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
        await axios.delete(`http://localhost:4545/admin/delete-subadmin/${adminId}`);
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
        const response = await axios.post(`http://localhost:4545/admin/reset-password/${adminId}`);
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
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Sub-Admin Management</h1>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mx-6 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {resetPassword && (
          <div className="mx-6 mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
            <p>
              <strong>
                New Password for{' '}
                {subAdmins.find((a) => a.adminId === resetPassword.id)?.adminName}:
              </strong>{' '}
              {resetPassword.password}
            </p>
            <p className="text-sm mt-1">Please save this password. It will not be shown again.</p>
            <button
              onClick={() => setResetPassword(null)}
              className="mt-2 text-xs font-medium text-yellow-800 hover:text-yellow-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Loading sub-admins...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No sub-admins found
                    </td>
                  </tr>
                ) : (
                  subAdmins.map((admin) => (
                    <tr key={admin.adminId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {admin.adminName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.adminEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            admin.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.permissions.length > 0
                          ? admin.permissions.join(', ')
                          : 'No permissions'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          to={`/admin/update-subadmin/${admin.adminId}`}
                          className="px-3 py-1 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(admin.adminId)}
                          className="px-3 py-1 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleResetPassword(admin.adminId)}
                          className="px-3 py-1 text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                        >
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link
            to="/admin/subadminregister"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            + Add New Sub-Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewSubAdmins;
