import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/config/config';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';

interface EmergencyContact {
  emergencyContactId: number;
  cityOrStateName: string;
  phoneNumber: number;
}

const EmergencyPage: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cityOrStateName: '',
    phoneNumber: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/emergency-contact/all`);
      if (!res.ok) throw new Error('Failed to fetch emergency contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSelect = (contact: EmergencyContact) => {
    setSelectedContact(contact);
    setFormData({
      cityOrStateName: contact.cityOrStateName,
      phoneNumber: contact.phoneNumber.toString(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/emergency-contact/update/${selectedContact.emergencyContactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityOrStateName: formData.cityOrStateName,
          phoneNumber: formData.phoneNumber,
        }),
      });
      if (!res.ok) throw new Error('Failed to update contact');
      await fetchContacts();
      setSelectedContact(null);
      setFormData({ cityOrStateName: '', phoneNumber: '' });
    } catch (err: any) {
      setError(err.message || 'Error updating contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Edit Emergency Contacts</h2>
        <div className="grid grid-cols-3 gap-8">
          {/* Contact List */}
          <div className="col-span-1 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Select Contact</h3>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact.emergencyContactId}
                  onClick={() => handleSelect(contact)}
                  className={`w-full text-left p-4 rounded-lg border ${selectedContact?.emergencyContactId === contact.emergencyContactId ? 'bg-red-50 border-red-300' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <div className="space-y-1">
                    <p className="font-medium">{contact.cityOrStateName}</p>
                    <p className="text-xs text-blue-600">ID: {contact.emergencyContactId}</p>
                    <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Edit Form */}
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-6">Edit Contact</h3>
            {selectedContact ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="cityOrStateName" className="block text-sm font-medium text-gray-700 mb-1">City/State Name</label>
                  <input
                    id="cityOrStateName"
                    name="cityOrStateName"
                    value={formData.cityOrStateName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
                  >
                    {loading ? 'Updating...' : 'Update Contact'}
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 px-6 py-2 rounded font-semibold"
                    onClick={() => {
                      setSelectedContact(null);
                      setFormData({ cityOrStateName: '', phoneNumber: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              </form>
            ) : (
              <p className="text-gray-500">Select a contact to edit</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
