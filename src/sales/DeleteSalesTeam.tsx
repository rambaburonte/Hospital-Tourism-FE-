import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SalesTeam {
  id: number;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role?: string;
  status?: string;
  createdAt?: string;
}

const DeleteSalesTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [salesMember, setSalesMember] = useState<SalesTeam | null>(null);
  const [salesTeam, setSalesTeam] = useState<SalesTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<SalesTeam | null>(null);

  useEffect(() => {
    if (id) {
      fetchSalesMember(id);
    } else {
      fetchAllSalesTeam();
    }
  }, [id]);

  const fetchSalesMember = async (memberId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/sales-team/${memberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales team member');
      }
      const data = await response.json();
      setSalesMember(data);
      setShowDeleteConfirm(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSalesTeam = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/sales-team/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch sales team');
      }
      const data = await response.json();
      setSalesTeam(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectMemberForDelete = (memberToDelete: SalesTeam) => {
    setSelectedMember(memberToDelete);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    const memberToDelete = selectedMember || salesMember;
    if (!memberToDelete) return;

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/sales-team/${memberToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete sales team member');
      }

      setSalesTeam(salesTeam.filter((member) => member.id !== memberToDelete.id));
      setShowDeleteConfirm(false);
      setSelectedMember(null);
      if (id) {
        navigate('/admin/sales/delete');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedMember(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !salesMember && salesTeam.length === 0) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showDeleteConfirm ? (
            // Show sales team list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Sales Team Member to Delete</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesTeam.filter(member => member.status !== 'inactive').map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">ID: {member.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.role || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {member.department || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectMemberForDelete(member)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {salesTeam.filter(member => member.status !== 'inactive').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No active sales team members found.
                </div>
              )}
            </>
          ) : (
            // Show delete confirmation
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Confirm Delete Sales Team Member</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-800">Delete Sales Team Member</h3>
                    <p className="text-red-600">This will deactivate the member (they can be reactivated later)</p>
                  </div>
                </div>

                {(selectedMember || salesMember) && (
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 rounded-full p-3">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {(selectedMember || salesMember)?.name}
                        </h4>
                        <p className="text-gray-600">
                          {(selectedMember || salesMember)?.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(selectedMember || salesMember)?.role} • {(selectedMember || salesMember)?.department}
                        </p>
                        {(selectedMember || salesMember)?.phone && (
                          <p className="text-sm text-gray-500">
                            Phone: {(selectedMember || salesMember)?.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? 'Deactivating...' : 'Yes, Deactivate Member'}
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                {!id && (
                  <button
                    onClick={() => navigate('/admin/salesTeam')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    Back to List
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteSalesTeam;
