import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { BASE_URL } from '@/config/config';

interface SalesFollowUp {
  id: number;
  bookingId: number;
  salesId: number;
  remark: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface SalesTeam {
  id: number;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  department?: string;
}

interface Booking {
  bookingId: number;
  userId: number;
  userName?: string;
  userEmail?: string;
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
  salesAssigned?: boolean;
  salesId?: number;
  createdAt?: string;
  updatedAt?: string;
  // Service-specific fields
  chefId?: number;
  chefName?: string;
  doctorId?: number;
  doctorName?: string;
  labtestId?: number;
  labtestName?: string;
  spaId?: number;
  spaName?: string;
  translatorId?: number;
  translatorName?: string;
  physioId?: number;
  physioName?: string;
  hospitalId?: number;
  hospitalName?: string;
  hotelId?: number;
  hotelName?: string;
  travelId?: number;
  travelName?: string;
  pharmacyId?: number;
  pharmacyName?: string;
}

const SalesTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [salesTeam, setSalesTeam] = useState<SalesTeam[]>([]);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpTask, setFollowUpTask] = useState<Booking | null>(null);
  const [followUpHistory, setFollowUpHistory] = useState<SalesFollowUp[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchSalesTeam();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/api/bookings/free-offline-unpaid`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTasks(response.data);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch sales tasks. Please try again later.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      setError(errorMessage);
      console.error('Error fetching sales tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesTeam = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/bookings/all`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSalesTeam(response.data);
    } catch (err) {
      console.error('Error fetching sales team:', err);
    }
  };

  const fetchFollowUpHistory = async (bookingId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/bookings/followups/history/booking/${bookingId}`);
      setFollowUpHistory(response.data);
    } catch (err) {
      console.error('Error fetching follow-up history:', err);
      setFollowUpHistory([]);
    }
  };

  const getServiceName = (booking: Booking) => {
    switch (booking.bookingType?.toLowerCase()) {
      case 'chef':
        return booking.chefName || `Chef ID: ${booking.chefId || 'Unknown'}`;
      case 'labtest':
        return booking.labtestName || `Lab Test ID: ${booking.labtestId || 'Unknown'}`;
      case 'doctor':
        return booking.doctorName || `Doctor ID: ${booking.doctorId || 'Unknown'}`;
      case 'spa':
        return booking.spaName || `Spa ID: ${booking.spaId || 'Unknown'}`;
      case 'translator':
        return booking.translatorName || `Translator ID: ${booking.translatorId || 'Unknown'}`;
      case 'physio':
        return booking.physioName || `Physiotherapist ID: ${booking.physioId || 'Unknown'}`;
      case 'hospital':
        return booking.hospitalName || `Hospital ID: ${booking.hospitalId || 'Unknown'}`;
      case 'hotel':
        return booking.hotelName || `Hotel ID: ${booking.hotelId || 'Unknown'}`;
      case 'travel':
        return booking.travelName || `Travel ID: ${booking.travelId || 'Unknown'}`;
      case 'pharmacy':
        return booking.pharmacyName || `Pharmacy ID: ${booking.pharmacyId || 'Unknown'}`;
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
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleTaskSelection = (bookingId: number) => {
    setSelectedTasks(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.bookingId));
    }
  };
  const handleAssignToSales = async () => {
    if (selectedTasks.length === 0) {
      alert('Please select at least one task to assign.');
      return;
    }
    setShowAssignModal(true);
  };

  const performAssignment = async (salesId: number, remark: string) => {
    try {
      setAssignLoading(true);
      await axios.post(`${BASE_URL}/api/bookings/assign`, selectedTasks, {
        params: { salesId, remark },
        headers: { 'Content-Type': 'application/json' },
      });
      
      alert('Tasks assigned successfully!');
      setSelectedTasks([]);
      setShowAssignModal(false);
      fetchTasks(); // Refresh the list
    } catch (err: unknown) {
      let errorMessage = 'Failed to assign tasks. Please try again.';
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        errorMessage = response?.data?.message || errorMessage;
      }
      alert(`Error: ${errorMessage}`);
      console.error('Error assigning tasks:', err);
    } finally {
      setAssignLoading(false);
    }
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
      fetchTasks(); // Refresh tasks
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

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Sales Tasks</h1>
          <div className="flex space-x-3">
            {selectedTasks.length > 0 && (
              <button
                onClick={handleAssignToSales}
                disabled={assignLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                {assignLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Assigning...
                  </>
                ) : (
                  `Assign ${selectedTasks.length} Task${selectedTasks.length > 1 ? 's' : ''}`
                )}
              </button>
            )}
            <button
              onClick={fetchTasks}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading sales tasks...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">Error Loading Data</p>
            <p className="text-red-500 mt-2">{error}</p>
            <button
              onClick={fetchTasks}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No unassigned tasks found.</p>
            <p className="text-gray-500 mt-2">All tasks have been assigned or there are no free/offline/unpaid bookings.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTasks.length === tasks.length && tasks.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium">
                      Select All ({tasks.length} tasks)
                    </span>
                  </label>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedTasks.length} of {tasks.length} selected
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Select</th>
                    <th className="px-4 py-3 text-left">Booking ID</th>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-left">Service</th>
                    <th className="px-4 py-3 text-left">Service Name</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Time</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Payment</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task.bookingId} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.bookingId)}
                          onChange={() => handleTaskSelection(task.bookingId)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{task.bookingId}</td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium">{task.userName || `User ${task.userId}`}</div>
                          {task.userEmail && <div className="text-xs text-gray-500">{task.userEmail}</div>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          {task.bookingType}
                        </span>
                      </td>
                      <td className="px-4 py-3">{getServiceName(task)}</td>
                      <td className="px-4 py-3 font-medium">${task.bookingAmount.toFixed(2)}</td>
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
                      </td>                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewTask(task)}
                            className="text-blue-600 hover:text-blue-800 text-xs border border-blue-300 hover:border-blue-500 px-2 py-1 rounded transition-colors"
                          >
                            View Details
                          </button>
                          <button 
                            onClick={() => handleTaskSelection(task.bookingId)}
                            className="text-green-600 hover:text-green-800 text-xs border border-green-300 hover:border-green-500 px-2 py-1 rounded transition-colors"
                          >
                            {selectedTasks.includes(task.bookingId) ? 'Deselect' : 'Select'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>          </div>
        )}
      </div>

      {/* Task Details Modal */}
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
              {/* Task Information */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Booking Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Booking ID:</span> {followUpTask.bookingId}
                  </div>
                  <div>
                    <span className="font-medium">User:</span> {followUpTask.userName || `User ${followUpTask.userId}`}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {followUpTask.userEmail || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Service Type:</span> {followUpTask.bookingType}
                  </div>
                  <div>
                    <span className="font-medium">Service Name:</span> {getServiceName(followUpTask)}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> ${followUpTask.bookingAmount.toFixed(2)}
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
                </div>
                {followUpTask.remarks && (
                  <div className="mt-3">
                    <span className="font-medium">Remarks:</span> {followUpTask.remarks}
                  </div>
                )}
                {followUpTask.additionalRemarks && (
                  <div className="mt-2">
                    <span className="font-medium">Additional Remarks:</span> {followUpTask.additionalRemarks}
                  </div>
                )}
              </div>

              {/* Add Follow-up Form */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Add Follow-up</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const salesId = parseInt(formData.get('salesId') as string);
                  const remark = formData.get('remark') as string;
                  const status = formData.get('status') as string;
                  
                  if (salesId && remark && status) {
                    handleAddFollowUp(followUpTask.bookingId, salesId, remark, status);
                  }
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sales Person</label>
                      <select name="salesId" required className="w-full border rounded-lg px-3 py-2 text-sm">
                        <option value="">Select Sales Person</option>
                        {salesTeam.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.email})
                          </option>
                        ))}
                      </select>
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

              {/* Follow-up History */}
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
                              {salesTeam.find(s => s.id === followUp.salesId)?.name || `Sales ID: ${followUp.salesId}`}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(followUp.status)}`}>
                              {followUp.status}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{formatDateTime(followUp.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{followUp.remark}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-blue-800">
                Assign Tasks to Sales Team
              </h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const salesId = parseInt(formData.get('salesId') as string);
              const remark = formData.get('remark') as string || '';
              
              if (salesId) {
                performAssignment(salesId, remark);
              }
            }}>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    You are assigning {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} to a sales team member.
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Sales Person</label>
                    <select name="salesId" required className="w-full border rounded-lg px-3 py-2">
                      <option value="">Choose a sales person...</option>
                      {salesTeam.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.email})
                          {member.department && ` - ${member.department}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Assignment Remark (Optional)</label>
                    <textarea
                      name="remark"
                      rows={3}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder="Enter assignment remarks or instructions..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assignLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center"
                >
                  {assignLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Assigning...
                    </>
                  ) : (
                    'Assign Tasks'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTasksPage;
