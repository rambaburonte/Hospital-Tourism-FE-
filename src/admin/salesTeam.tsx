import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { BASE_URL } from '@/config/config';

interface SalesTeam {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  department?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const SalesTeamPage: React.FC = () => {
  const [salesTeam, setSalesTeam] = useState<SalesTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSalesman, setNewSalesman] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchSalesTeam();
  }, []);

  const fetchSalesTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/api/bookings/all`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSalesTeam(response.data);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch sales team data. Please try again later.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      console.error('Error fetching sales team:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalesman = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormError(null);
      const response = await axios.post(`${BASE_URL}/api/bookings/register`, newSalesman, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSalesTeam([...salesTeam, response.data]);
      setNewSalesman({ name: '', email: '', phone: '', password: '' });
      setShowAddForm(false);
    } catch (err: unknown) {
      let errorMessage = 'Failed to add salesman. Please try again.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      setFormError(errorMessage);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Sales Team</h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Salesman
            </button>
            <button
              onClick={fetchSalesTeam}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Salesman</h2>
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600">{formError}</p>
              </div>
            )}
            <form onSubmit={handleAddSalesman} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newSalesman.name}
                  onChange={(e) => setNewSalesman({ ...newSalesman, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newSalesman.email}
                  onChange={(e) => setNewSalesman({ ...newSalesman, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newSalesman.phone}
                  onChange={(e) => setNewSalesman({ ...newSalesman, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={newSalesman.password}
                  onChange={(e) => setNewSalesman({ ...newSalesman, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Salesman
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading sales team data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">Error Loading Data</p>
            <p className="text-red-500 mt-2">{error}</p>
            <button
              onClick={fetchSalesTeam}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : salesTeam.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No sales team members found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Department</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTeam.map((member, index) => (
                    <tr key={member.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3 font-medium">{member.id}</td>
                      <td className="px-4 py-3">{member.name || 'N/A'}</td>
                      <td className="px-4 py-3">{member.email}</td>
                      <td className="px-4 py-3">{member.phone || 'N/A'}</td>
                      <td className="px-4 py-3">{member.department || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {member.role || 'Sales'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${getStatusColor(member.status)}`}>
                          {member.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatDate(member.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs border border-blue-300 hover:border-blue-500 px-2 py-1 rounded transition-colors">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-800 text-xs border border-green-300 hover:border-green-500 px-2 py-1 rounded transition-colors">
                            Edit
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
    </div>
  );
};

export default SalesTeamPage;