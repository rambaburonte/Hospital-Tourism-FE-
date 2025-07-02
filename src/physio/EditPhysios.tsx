import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Physio {
  physioId: number;
  physioName: string;
  physioDescription: string;
  physioImage: string;
  rating: number;
  address: string;
  price: number;
  status: string;
  locationId: number;
}

const EditPhysios: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [physio, setPhysio] = useState<Physio | null>(null);
  const [physios, setPhysios] = useState<Physio[]>([]);
  const [formData, setFormData] = useState<Partial<Physio>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPhysio(id);
    } else {
      fetchAllPhysios();
    }
  }, [id]);

  const fetchPhysio = async (physioId: string) => {
    try {
      console.log('Fetching physio from:', `${BASE_URL}/physio/get/${physioId}`);
      const response = await fetch(`${BASE_URL}/physio/get/${physioId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch physio');
      }
      const data = await response.json();
      console.log('Physio response:', data);
      setPhysio(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching physio:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPhysios = async () => {
    try {
      console.log('Fetching physios from:', `${BASE_URL}/physio/getall/pysios`);
      const response = await fetch(`${BASE_URL}/physio/getall/pysios`);
      if (!response.ok) {
        throw new Error('Failed to fetch physios');
      }
      const data = await response.json();
      console.log('Physios response:', data);
      setPhysios(data);
    } catch (err) {
      console.error('Error fetching physios:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectPhysioForEdit = (selectedPhysio: Physio) => {
    setPhysio(selectedPhysio);
    setFormData(selectedPhysio);
    setImageFile(null); // Reset image file
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
      const physioId = id || physio?.physioId;
      console.log('Updating physio ID:', physioId);
      
      const updateData = new FormData();
      if (formData.physioName) updateData.append('physioName', formData.physioName);
      if (formData.physioDescription) updateData.append('physioDescription', formData.physioDescription);
      if (formData.rating) updateData.append('rating', formData.rating.toString());
      if (formData.address) updateData.append('address', formData.address);
      if (formData.price) updateData.append('price', formData.price.toString());
      if (formData.status) updateData.append('status', formData.status);
      if (formData.locationId) updateData.append('locationId', formData.locationId.toString());
      
      if (imageFile) {
        updateData.append('physioImage', imageFile);
      }
      
      const response = await fetch(`${BASE_URL}/physio/update-physio/${physioId}`, {
        method: 'PUT',
        body: updateData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update physio: ${errorData}`);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData);

      navigate('/admin/Physios');
    } catch (err) {
      console.error('Error updating physio:', err);
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

  if (error && !physio) {
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
            // Show physio list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Physio to Edit</h1>
              
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {physios.map((physioItem) => (
                      <tr key={physioItem.physioId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {physioItem.physioImage && (
                              <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={physioItem.physioImage}
                                alt={physioItem.physioName}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{physioItem.physioName}</div>
                              <div className="text-sm text-gray-500">ID: {physioItem.physioId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {physioItem.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {physioItem.rating}/5
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            physioItem.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {physioItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${physioItem.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectPhysioForEdit(physioItem)}
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

              {physios.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No physios found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Physio</h1>
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
                name="physioName"
                value={formData.physioName || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="physioDescription"
                value={formData.physioDescription || ''}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Update Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {physio?.physioImage && (
                <p className="text-sm text-gray-500 mt-1">
                  Current image: {physio.physioImage}
                </p>
              )}
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
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                min="0"
                step="0.01"
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
                {saving ? 'Saving...' : 'Update Physio'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/Physios')}
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

export default EditPhysios;
