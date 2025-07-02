import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: number;
  experience: string;
  styles: string;
  status: string;
  price: number;
}

const EditChefs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chef, setChef] = useState<Chef | null>(null);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [formData, setFormData] = useState<Partial<Chef>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchChef(id);
    } else {
      fetchAllChefs();
    }
  }, [id]);

  const fetchChef = async (chefId: string) => {
    try {
      console.log('Fetching chef from:', `${BASE_URL}/api/chefs/chef-By/Id/${chefId}`);
      const response = await fetch(`${BASE_URL}/api/chefs/chef-By/Id/${chefId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chef');
      }
      const data = await response.json();
      console.log('Chef response:', data);
      setChef(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching chef:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllChefs = async () => {
    try {
      console.log('Fetching chefs from:', `${BASE_URL}/api/chefs`);
      const response = await fetch(`${BASE_URL}/api/chefs`);
      if (!response.ok) {
        throw new Error('Failed to fetch chefs');
      }
      const data = await response.json();
      console.log('Chefs response:', data);
      setChefs(data);
    } catch (err) {
      console.error('Error fetching chefs:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectChefForEdit = (selectedChef: Chef) => {
    setChef(selectedChef);
    setFormData(selectedChef);
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
      const chefId = id || chef?.chefID;
      console.log('Updating chef ID:', chefId);
      
      const updateData = new FormData();
      if (formData.chefName) updateData.append('chefName', formData.chefName);
      if (formData.chefDescription) updateData.append('chefDescription', formData.chefDescription);
      if (formData.chefRating) updateData.append('chefRating', formData.chefRating.toString());
      if (formData.experience) updateData.append('experience', formData.experience);
      if (formData.styles) updateData.append('styles', formData.styles);
      if (formData.status) updateData.append('status', formData.status);
      if (formData.price) updateData.append('price', formData.price.toString());
      
      if (imageFile) {
        updateData.append('chefImage', imageFile);
      }
      
      const response = await fetch(`${BASE_URL}/api/chefs/update-chef/${chefId}`, {
        method: 'PUT',
        body: updateData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update chef: ${errorData}`);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData);

      navigate('/admin/ChefList');
    } catch (err) {
      console.error('Error updating chef:', err);
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

  if (error && !chef) {
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
            // Show chef list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Chef to Edit</h1>
              
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {chefs.map((chefItem) => (
                      <tr key={chefItem.chefID} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {chefItem.chefImage && (
                              <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={chefItem.chefImage}
                                alt={chefItem.chefName}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{chefItem.chefName}</div>
                              <div className="text-sm text-gray-500">ID: {chefItem.chefID}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {chefItem.experience}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {chefItem.chefRating}/5
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            chefItem.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {chefItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${chefItem.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectChefForEdit(chefItem)}
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

              {chefs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No chefs found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Chef</h1>
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
                    name="chefName"
                    value={formData.chefName || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="chefDescription"
                    value={formData.chefDescription || ''}
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
                  {chef?.chefImage && (
                    <p className="text-sm text-gray-500 mt-1">
                      Current image: {chef.chefImage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input
                    type="number"
                    name="chefRating"
                    value={formData.chefRating || ''}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cooking Styles</label>
                  <input
                    type="text"
                    name="styles"
                    value={formData.styles || ''}
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
                    {saving ? 'Saving...' : 'Update Chef'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/ChefList')}
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

export default EditChefs;
