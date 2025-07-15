


import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/config/config';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaBars, FaPlus, FaAddressBook, FaSpinner, FaTrashAlt } from 'react-icons/fa';

interface EmergencyContact {
  emergencyContactId: number;
  cityOrStateName: string;
  phoneNumber: number;
}

const EmergencyPage: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    cityOrStateName: '',
    phoneNumber: '',
  });
  const [addFormData, setAddFormData] = useState({
    cityOrStateName: '',
    phoneNumber: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [addFormErrors, setAddFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/emergency-contact/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`Failed to fetch contacts: ${res.statusText}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid response format');
      setContacts(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching contacts';
      setError(message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const validateForm = (data: typeof formData, isEdit: boolean = true): boolean => {
    const errors: { [key: string]: string } = {};

    if (!data.cityOrStateName.trim()) {
      errors.cityOrStateName = 'City/State Name is required';
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be exactly 10 digits';
    }

    if (isEdit) {
      setFormErrors(errors);
    } else {
      setAddFormErrors(errors);
    }
    return Object.keys(errors).length === 0;
  };

  const handleSelect = (contact: EmergencyContact) => {
    setSelectedContact(contact);
    setFormData({
      cityOrStateName: contact.cityOrStateName,
      phoneNumber: contact.phoneNumber.toString(),
    });
    setFormErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
    if (addFormErrors[name]) {
      setAddFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !validateForm(formData)) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/emergency-contact/update/${selectedContact.emergencyContactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityOrStateName: formData.cityOrStateName,
          phoneNumber: parseInt(formData.phoneNumber, 10),
        }),
      });
      if (!res.ok) throw new Error(`Failed to update contact: ${res.statusText}`);
      await fetchContacts();
      setSelectedContact(null);
      setFormData({ cityOrStateName: '', phoneNumber: '' });
      setFormErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error updating contact';
      setError(message);
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(addFormData, false)) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/emergency-contact/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityOrStateName: addFormData.cityOrStateName,
          phoneNumber: parseInt(addFormData.phoneNumber, 10),
        }),
      });
      if (!res.ok) throw new Error(`Failed to add contact: ${res.statusText}`);
      await fetchContacts();
      setShowAddModal(false);
      setAddFormData({ cityOrStateName: '', phoneNumber: '' });
      setAddFormErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error adding contact';
      setError(message);
      console.error('Add error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this emergency contact?')) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/emergency-contact/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`Failed to delete contact: ${res.statusText}`);
      await fetchContacts();
      if (selectedContact?.emergencyContactId === id) {
        setSelectedContact(null);
        setFormData({ cityOrStateName: '', phoneNumber: '' });
        setFormErrors({});
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error deleting contact';
      setError(message);
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setAddFormData({ cityOrStateName: '', phoneNumber: '' });
    setAddFormErrors({});
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {isSidebarOpen && (
        <div className="w-full md:w-64 flex-shrink-0">
          <AdminSidebar />
        </div>
      )}
      <div className="flex-1 p-6 min-w-0">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden mb-4 p-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
        >
          {isSidebarOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <FaPlus size={14} />
                Add Emergency Contact
              </button>
            </div>
            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact List */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Select Contact</h3>
                  {loading ? (
                    <div className="text-center py-8">
                      <FaSpinner className="animate-spin text-2xl text-gray-400 mx-auto" />
                      <p className="text-gray-600 mt-2">Loading contacts...</p>
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-8">
                      <FaAddressBook className="text-4xl text-gray-400 mb-4" />
                      <p className="text-gray-600">No contacts found</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {contacts.map((contact) => (
                        <div
                          key={contact.emergencyContactId}
                          className={`relative w-full p-4 rounded-lg border ${
                            selectedContact?.emergencyContactId === contact.emergencyContactId
                              ? 'bg-blue-50 border-blue-300'
                              : 'border-gray-300'
                          } hover:bg-gray-50 transition-colors`}
                        >
                          <button
                            onClick={() => handleSelect(contact)}
                            className="w-full text-left pr-6"
                          >
                            <div className="space-y-1">
                              <p className="font-medium text-gray-900">{contact.cityOrStateName}</p>
                              <p className="text-xs text-blue-600">ID: {contact.emergencyContactId}</p>
                              <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                            </div>
                          </button>
                          <button
                            onClick={() => handleDelete(contact.emergencyContactId)}
                            className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                            title="Delete Contact"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Edit Form */}
                <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900">Edit Contact</h3>
                  {selectedContact ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="cityOrStateName" className="block text-sm font-medium text-gray-700 mb-1">
                          City/State Name *
                        </label>
                        <input
                          id="cityOrStateName"
                          name="cityOrStateName"
                          value={formData.cityOrStateName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter city or state name"
                        />
                        {formErrors.cityOrStateName && (
                          <p className="text-red-600 text-xs mt-1">{formErrors.cityOrStateName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter 10-digit phone number"
                        />
                        {formErrors.phoneNumber && (
                          <p className="text-red-600 text-xs mt-1">{formErrors.phoneNumber}</p>
                        )}
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 transition"
                        >
                          {loading ? 'Updating...' : 'Update Contact'}
                        </button>
                        <button
                          type="button"
                          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                          onClick={() => {
                            setSelectedContact(null);
                            setFormData({ cityOrStateName: '', phoneNumber: '' });
                            setFormErrors({});
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-gray-500">Select a contact to edit</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Contact Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-6 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add Emergency Contact</h3>
                <button onClick={handleCloseAddModal} className="text-gray-400 hover:text-gray-600">
                  <FaTimes size={16} />
                </button>
              </div>
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div>
                  <label htmlFor="addCityOrStateName" className="block text-sm font-medium text-gray-700 mb-1">
                    City/State Name *
                  </label>
                  <input
                    id="addCityOrStateName"
                    name="cityOrStateName"
                    value={addFormData.cityOrStateName}
                    onChange={handleAddInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city or state name"
                  />
                  {addFormErrors.cityOrStateName && (
                    <p className="text-red-600 text-xs mt-1">{addFormErrors.cityOrStateName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="addPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="addPhoneNumber"
                    name="phoneNumber"
                    value={addFormData.phoneNumber}
                    onChange={handleAddInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 10-digit phone number"
                  />
                  {addFormErrors.phoneNumber && (
                    <p className="text-red-600 text-xs mt-1">{addFormErrors.phoneNumber}</p>
                  )}
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 transition"
                  >
                    {loading ? 'Adding...' : 'Add Contact'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseAddModal}
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyPage;
