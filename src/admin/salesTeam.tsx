
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

interface SalesFollowUp {
  id: number;
  bookingId: number;
  salesId: number;
  remark: string;
  status: string;
  followUpDate: string;
  booking: {
    bookingId: number;
    userId?: number;
    userName?: string;
    userEmail?: string;
    userMobile?: string;
    bookingType: string;
    bookingAmount?: number;
    bookingDate: string;
    bookingStartTime?: string;
    bookingEndTime?: string;
    bookingStatus: string;
    paymentMode?: string;
    paymentStatus: string;
    remarks?: string;
    additionalRemarks?: string;
    doctors?: {
      id: number;
      name: string;
      email?: string;
    };
    user?: {
      id: number;
      name: string;
      email: string;
      mobilenum: string;
      country?: string;
    };
  };
  salesTeam: {
    id: number;
    name: string;
    email: string;
    phone?: string;
  };
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
  const [showLeadsModal, setShowLeadsModal] = useState(false);
  const [selectedSalesId, setSelectedSalesId] = useState<number | null>(null);
  const [leads, setLeads] = useState<SalesFollowUp[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSalesTeam, setFilteredSalesTeam] = useState<SalesTeam[]>([]);

  useEffect(() => {
    fetchSalesTeam();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = salesTeam.filter(
      (member) =>
        (member.name || '').toLowerCase().includes(lowerQuery) ||
        (member.email || '').toLowerCase().includes(lowerQuery) ||
        (member.phone || '').toLowerCase().includes(lowerQuery)
    );
    setFilteredSalesTeam(filtered);
  }, [searchQuery, salesTeam]);

  const fetchSalesTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/api/bookings/all`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSalesTeam(response.data);
      setFilteredSalesTeam(response.data);
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

  const fetchLeads = async (salesId: number) => {
    try {
      setLeadsLoading(true);
      setLeadsError(null);
      const response = await axios.get(`${BASE_URL}/api/bookings/followups/sales/${salesId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const leadsData = response.data.map((item: any) => ({
        id: item.id,
        bookingId: item.booking.bookingId,
        salesId: item.salesTeam.id,
        remark: item.remarks || 'N/A',
        status: item.status,
        followUpDate: item.followUpDate,
        booking: {
          bookingId: item.booking.bookingId,
          userId: item.booking.user?.id ?? 0,
          userName: item.booking.user?.name ?? 'N/A',
          userEmail: item.booking.user?.email ?? 'N/A',
          userMobile: item.booking.user?.mobilenum ?? 'N/A',
          bookingType: item.booking.bookingType,
          bookingAmount: item.booking.bookingAmount ?? 0,
          bookingDate: item.booking.bookingDate,
          bookingStartTime: item.booking.bookingStartTime,
          bookingEndTime: item.booking.bookingEndTime,
          bookingStatus: item.booking.bookingStatus,
          paymentMode: item.booking.paymentMode,
          paymentStatus: item.booking.paymentStatus,
          remarks: item.booking.remarks,
          additionalRemarks: item.booking.additionalRemarks,
          doctors: item.booking.doctors
            ? {
                id: item.booking.doctors.id,
                name: item.booking.doctors.name,
                email: item.booking.doctors.email,
              }
            : undefined,
          user: item.booking.user
            ? {
                id: item.booking.user.id,
                name: item.booking.user.name,
                email: item.booking.user.email,
                mobilenum: item.booking.user.mobilenum,
                country: item.booking.user.country,
              }
            : undefined,
        },
        salesTeam: {
          id: item.salesTeam.id,
          name: item.salesTeam.name,
          email: item.salesTeam.email,
          phone: item.salesTeam.phone,
        },
      }));
      setLeads(leadsData);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch leads data. Please try again later.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      setLeadsError(errorMessage);
      console.error('Error fetching leads:', err);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleAddSalesman = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormError(null);
      const response = await axios.post(`${BASE_URL}/api/salesteam/register`, newSalesman, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSalesTeam([...salesTeam, response.data]);
      setFilteredSalesTeam([...filteredSalesTeam, response.data]);
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

  const handleViewLeads = (salesId: number) => {
    setSelectedSalesId(salesId);
    fetchLeads(salesId);
    setShowLeadsModal(true);
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'booked':
        return 'text-green-600 bg-green-100';
      case 'inactive':
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'interested':
        return 'text-teal-600 bg-teal-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'unpaid':
        return 'text-red-600 bg-red-100';
      case 'partial':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toString() === 'Invalid Date'
      ? 'N/A'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toString() === 'Invalid Date'
      ? 'N/A'
      : date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Sales Team</h1>
          <div className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add
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
            <h2 className="text-xl font-bold mb-4">Add Salesman</h2>
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600">{formError}</p>
              </div>
            )}
            <form onSubmit={handleAddSalesman} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={newSalesman.name}
                  onChange={(e) => setNewSalesman({ ...newSalesman, name: e.target.value })}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={newSalesman.email}
                  onChange={(e) => setNewSalesman({ ...newSalesman, email: e.target.value })}
                  className="w-full mt-1 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  value={newSalesman.phone}
                  onChange={(e) => setNewSalesman({ ...newSalesman, phone: e.target.value })}
                  className="w-full mt-1 border-gray-600 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={newSalesman.password}
                  onChange={(e) => setNewSalesman({ ...newSalesman, password: e.target.value })}
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
        ) : filteredSalesTeam.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No sales team members found.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search query or add a new salesman.</p>
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
                  {filteredSalesTeam.map((member, index) => (
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{formatDate(member.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleViewLeads(member.id)}
                          className="text-blue-600 hover:text-blue-800 text-xs border border-blue-300 hover:border-blue-500 px-2 py-1 rounded transition-colors"
                        >
                          View Leads
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showLeadsModal && selectedSalesId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-blue-800">
                  Leads for Sales ID #{selectedSalesId}
                </h2>
                <button
                  onClick={() => setShowLeadsModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {leadsLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading leads...</p>
                  </div>
                ) : leadsError ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-medium">Error Loading Leads</p>
                    <p className="text-red-500 mt-2">{leadsError}</p>
                    <button
                      onClick={() => fetchLeads(selectedSalesId)}
                      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No leads found for this sales member.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Booking ID:</span> {lead.booking.bookingId}
                          </div>
                          <div>
                            <span className="font-medium">User Name:</span> {lead.booking.userName || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">User Email:</span> {lead.booking.userEmail || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">User Mobile:</span> {lead.booking.userMobile || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Doctor:</span> {lead.booking.doctors?.name || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Service Type:</span> {lead.booking.bookingType}
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span> ${lead.booking.bookingAmount?.toFixed(2) || '0.00'}
                          </div>
                          <div>
                            <span className="font-medium">Booking Date:</span> {formatDate(lead.booking.bookingDate)}
                          </div>
                          <div>
                            <span className="font-medium">Follow-up Date:</span> {formatDateTime(lead.followUpDate)}
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Payment:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(lead.booking.paymentStatus)}`}>
                              {lead.booking.paymentStatus}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Payment Mode:</span> {lead.booking.paymentMode || 'N/A'}
                          </div>
                        </div>
                        {lead.remark && lead.remark !== 'N/A' && (
                          <div className="mt-3">
                            <span className="font-medium">Remark:</span> {lead.remark}
                          </div>
                        )}
                        {lead.booking.additionalRemarks && (
                          <div className="mt-2">
                            <span className="font-medium">Additional Remarks:</span> {lead.booking.additionalRemarks}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTeamPage;
