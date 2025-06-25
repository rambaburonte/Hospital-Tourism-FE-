import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SpaCenter {
  spaId: number;
  spaName: string;
  spaDescription: string;
  spaImage: string;
  rating: string;
  address: string;
  locationId: number;
  status: string;
}

const EditSpaCenters: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [spaCenter, setSpaCenter] = useState<SpaCenter | null>(null);
  const [spaCenters, setSpaCenters] = useState<SpaCenter[]>([]);
  const [formData, setFormData] = useState<Partial<SpaCenter>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSpaCenter(id);
    } else {
      fetchAllSpaCenters();
    }
  }, [id]);

  const fetchSpaCenter = async (spaCenterId: string) => {
    try {
      // Fetch all spa centers and find the specific one
      const response = await fetch(`${BASE_URL}/spaCenter/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa centers');
      }
      const data = await response.json();
      
      const foundSpaCenter = data.find((spa: SpaCenter) => spa.spaId.toString() === spaCenterId);
      if (!foundSpaCenter) {
        throw new Error(`Spa center with ID ${spaCenterId} not found`);
      }
      
      setSpaCenter(foundSpaCenter);
      setFormData(foundSpaCenter);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching spa center:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSpaCenters = async () => {
    try {
      const response = await fetch(`${BASE_URL}/spaCenter/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa centers');
      }
      const data = await response.json();
      setSpaCenters(data);
    } catch (err) {
      console.error('Error fetching spa centers:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectSpaCenterForEdit = (selectedSpaCenter: SpaCenter) => {
    setSpaCenter(selectedSpaCenter);
    setFormData(selectedSpaCenter);
    setShowEditForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const spaCenterId = id || spaCenter?.spaId;
      
      const response = await fetch(`${BASE_URL}/spaCenter/update-spaCenter/${spaCenterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update spa center: ${errorData}`);
      }

      const updatedData = await response.json();

      navigate('/admin/viewcenters');
    } catch (err) {
      console.error('Error updating spa center:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
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

  if (error && !spaCenter) {
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
          {!showEditForm ? (
            // Show spa center list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Spa Center to Edit</h1>
              
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {spaCenters.map((spaCenterItem) => (
                      <tr key={spaCenterItem.spaId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {spaCenterItem.spaImage && (
                              <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={spaCenterItem.spaImage}
                                alt={spaCenterItem.spaName}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{spaCenterItem.spaName}</div>
                              <div className="text-sm text-gray-500">ID: {spaCenterItem.spaId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {spaCenterItem.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {spaCenterItem.rating}/5
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            spaCenterItem.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {spaCenterItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {spaCenterItem.locationId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectSpaCenterForEdit(spaCenterItem)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {spaCenters.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No spa centers found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Spa Center</h1>
                {!id && (
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Back to List
                  </button>
                )}
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="spaName"
                    value={formData.spaName || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="spaDescription"
                    value={formData.spaDescription || ''}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    name="spaImage"
                    value={formData.spaImage || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating || ''}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location ID</label>
                  <input
                    type="number"
                    name="locationId"
                    value={formData.locationId || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status || 'Active'}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Update Spa Center'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/viewcenters')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSpaCenters;
