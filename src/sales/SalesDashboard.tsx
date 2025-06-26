import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

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
    salesTeam?: {
      id: number;
      name: string;
      email: string;
    } | null;
    doctors?: {
      id: number;
      name: string;
    };
    user?: {
      id: number;
      name: string;
      email: string;
      mobilenum: string;
    };
  };
  salesTeam: {
    id: number;
    name: string;
    email: string;
  };
}

interface Booking {
  bookingId: number;
  userId: number;
  userName?: string;
  userEmail?: string;
  userMobile?: string;
  bookingType: string;
  bookingAmount: number;
  bookingDate: string;
  bookingStartTime?: string;
  bookingEndTime?: string;
  bookingStatus: string;
  paymentMode?: string;
  paymentStatus: string;
  remarks?: string;
  additionalRemarks?: string;
  salesTeam?: {
    id: number;
    name: string;
    email: string;
  } | null;
  doctors?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
    mobilenum: string;
  };
}

const SalesTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Booking[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpTask, setFollowUpTask] = useState<Booking | null>(null);
  const [followUpHistory, setFollowUpHistory] = useState<SalesFollowUp[]>([]);

  useEffect(() => {
    console.log('Component mounted, fetching tasks...');
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log('Search query changed:', searchQuery, 'Tasks:', tasks.length);
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = tasks.filter(
      (task) =>
        task.userName?.toLowerCase().includes(lowerQuery) ||
        task.doctors?.name.toLowerCase().includes(lowerQuery) 
        // task.userMobile?.toLowerCase().includes(lowerQuery)
    );
    console.log('Filtered tasks:', filtered.length);
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const salesUser = JSON.parse(localStorage.getItem('salesUser') || '{}');
      const salesId = salesUser?.id;

      if (!salesId) {
        setError('Sales user ID not found in localStorage.');
        console.error('No salesId found in localStorage:', salesUser);
        setLoading(false);
        return;
      }

      console.log('Fetching tasks for salesId:', salesId);
      const response = await axios.get(`${BASE_URL}/api/bookings/followups/sales/${salesId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      const bookingsMap = new Map<number, Booking>();
      response.data.forEach((followUp: SalesFollowUp) => {
        if (followUp.booking) {
          bookingsMap.set(followUp.booking.bookingId, {
            ...followUp.booking,
            bookingAmount: followUp.booking.bookingAmount ?? 0,
            userId: followUp.booking.userId ?? 0,
            userName: followUp.booking.user?.name ?? 'N/A',
            userEmail: followUp.booking.user?.email ?? 'N/A',
            userMobile: followUp.booking.user?.mobilenum ?? 'N/A',
            doctors: followUp.booking.doctors ?? undefined,
            user: followUp.booking.user ?? undefined,
          });
        }
      });
      const bookings = Array.from(bookingsMap.values());
      console.log('Fetched bookings:', bookings.length);
      setTasks(bookings);
      setFilteredTasks(bookings);

      if (bookings.length === 0) {
        setError('No tasks found.');
      }
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch sales tasks. Please try again later.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowUpHistory = async (bookingId: number) => {
    try {
      console.log('Fetching follow-up history for bookingId:', bookingId);
      const response = await axios.get(`${BASE_URL}/api/bookings/followups/booking/${bookingId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const history = response.data
        .map((item: any) => ({
          id: item.id,
          bookingId: item.booking.bookingId,
          salesId: item.salesTeam.id,
          remark: item.remarks,
          status: item.status,
          followUpDate: item.followUpDate,
          booking: {
            bookingId: item.booking.bookingId,
            userEmail: item.booking.user?.email ?? 'N/A',
            userMobile: item.booking.user?.mobilenum ?? 'N/A',
          },
          salesTeam: {
            id: item.salesTeam.id,
            name: item.salesTeam.name,
            email: item.salesTeam.email,
          },
        }))
        .sort((a: SalesFollowUp, b: SalesFollowUp) =>
          new Date(b.followUpDate).getTime() - new Date(a.followUpDate).getTime()
        );
      console.log('Follow-up history fetched:', history.length);
      setFollowUpHistory(history);
    } catch (err) {
      console.error('Error fetching follow-up history:', err);
      setFollowUpHistory([]);
    }
  };

  const getServiceName = (booking: Booking) => {
    switch (booking.bookingType?.toLowerCase()) {
      case 'doctor':
        return booking.doctors?.name || `Doctor ID: ${booking.doctors?.id || 'Unknown'}`;
      default:
        return `${booking.bookingType} Service`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'assigned':
        return 'text-purple-600 bg-purple-100';
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewTask = async (task: Booking) => {
    setFollowUpTask(task);
    await fetchFollowUpHistory(task.bookingId);
    setShowFollowUpModal(true);
  };

  const handleAddFollowUp = async (bookingId: number, salesId: number, remark: string, status: string) => {
    try {
      await axios.post(`${BASE_URL}/api/bookings/followup`, null, {
        params: { bookingId, salesId, remark, status },
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Follow-up added successfully!');
      await fetchFollowUpHistory(bookingId);
      fetchTasks();
    } catch (err: unknown) {
      let errorMessage = 'Failed to add follow-up.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      alert(`Error: ${errorMessage}`);
      console.error('Error adding follow-up:', err);
    }
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('salesUser');
    window.location.href = '/login';
  };

  console.log('Rendering SalesTasksPage', { loading, error, tasks: tasks.length, filteredTasks: filteredTasks.length });

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">My Assigned Tasks</h1>
        <div className="flex space-x-3">
          <button
            onClick={fetchTasks}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username, doctor name, or mobile number..."
          className="w-full max-w-md border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">Error Loading Data</p>
            <p className="text-red-500 mt-2">{error}</p>
            <button
              onClick={fetchTasks}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No assigned tasks found.</p>
            <p className="text-gray-500 mt-2">You have no tasks assigned to you at the moment.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No matching data found.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Booking ID</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Doctor Name</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <tr key={task.bookingId} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 font-medium">{task.bookingId}</td>
                    <td className="px-4 py-3 font-medium">{task.userName || `User ${task.userId}`}</td>
                    <td className="px-4 py-3">{task.doctors?.name || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        {task.bookingType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ${typeof task.bookingAmount === 'number' ? task.bookingAmount.toFixed(2) : '0.00'}
                    </td>
                    <td className="px-4 py-3">{formatDate(task.bookingDate)}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <div>Start: {formatTime(task.bookingStartTime)}</div>
                        <div>End: {formatTime(task.bookingEndTime)}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.bookingStatus)}`}>
                        {task.bookingStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <span className={`px-2 py-1 rounded-full font-medium ${getPaymentStatusColor(task.paymentStatus)}`}>
                          {task.paymentStatus}
                        </span>
                        {task.paymentMode && <div className="mt-1 text-gray-500">{task.paymentMode}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleViewTask(task)}
                        className="text-blue-600 hover:text-blue-800 text-xs border border-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showFollowUpModal && followUpTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-blue-800">
                Task Details - Booking #{followUpTask.bookingId}
              </h2>
              <button
                onClick={() => setShowFollowUpModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Booking Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Booking ID:</span> {followUpTask.bookingId}
                  </div>
                  <div>
                    <span className="font-medium">Username:</span> {followUpTask.userName || `User ${followUpTask.userId}`}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {followUpTask.userEmail || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Mobile:</span> {followUpTask.userMobile || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Doctor Name:</span> {followUpTask.doctors?.name || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Service Type:</span> {followUpTask.bookingType}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span>
                    ${typeof followUpTask.bookingAmount === 'number' ? followUpTask.bookingAmount.toFixed(2) : '0.00'}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {formatDate(followUpTask.bookingDate)}
                  </div>
                  <div>
                    <span className="font-medium">Start Time:</span> {formatTime(followUpTask.bookingStartTime)}
                  </div>
                  <div>
                    <span className="font-medium">End Time:</span> {formatTime(followUpTask.bookingEndTime)}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUpTask.bookingStatus)}`}>
                      {followUpTask.bookingStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Payment:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(followUpTask.paymentStatus)}`}>
                      {followUpTask.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Payment Mode:</span> {followUpTask.paymentMode || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Assigned Sales:</span>
                    {followUpTask.salesTeam
                      ? `${followUpTask.salesTeam.name} (${followUpTask.salesTeam.email})`
                      : 'Not Assigned'}
                  </div>
                  {followUpTask.remarks && (
                    <div className="col-span-2">
                      <span className="font-medium">Remarks:</span> {followUpTask.remarks}
                    </div>
                  )}
                  {followUpTask.additionalRemarks && (
                    <div className="col-span-2">
                      <span className="font-medium">Additional Remarks:</span> {followUpTask.additionalRemarks}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Add Follow-up</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const remark = formData.get('remark') as string;
                    const status = formData.get('status') as string;
                    const salesUser = JSON.parse(localStorage.getItem('salesUser') || '{}');
                    const salesId = salesUser?.id;

                    if (remark && status && salesId) {
                      handleAddFollowUp(followUpTask.bookingId, salesId, remark, status);
                    } else {
                      alert('Unable to add follow-up. Sales ID not found.');
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sales Person</label>
                      <div className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-100">
                        {followUpTask.salesTeam
                          ? `${followUpTask.salesTeam.name} (${followUpTask.salesTeam.email})`
                          : 'Not Assigned'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select name="status" required className="w-full border rounded-lg px-3 py-2 text-sm">
                        <option value="">Select Status</option>
                        <option value="contacted">Contacted</option>
                        <option value="interested">Interested</option>
                        <option value="not_interested">Not Interested</option>
                        <option value="follow_up_later">Follow Up Later</option>
                        <option value="converted">Converted</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">Action</label>
                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Add Follow-up
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Remark</label>
                    <textarea
                      name="remark"
                      required
                      rows={3}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Enter follow-up remarks..."
                    ></textarea>
                  </div>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Follow-up History</h3>
                {followUpHistory.length === 0 ? (
                  <p className="text-gray-600">No follow-ups recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {followUpHistory.map((followUp) => (
                      <div key={followUp.id} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {followUp.salesTeam.name || `Sales ID: ${followUp.salesId}`}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.status)}`}>
                              {followUp.status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{formatDateTime(followUp.followUpDate)}</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {followUp.remark || 'No remarks provided'}
                        </p>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">User Email:</span> {followUp.booking.userEmail}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">User Mobile:</span> {followUp.booking.userMobile}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTasksPage;