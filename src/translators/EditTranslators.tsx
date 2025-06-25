import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Translator {
  translatorID: number;
  translatorName: string;
  translatorDescription: string;
  translatorImage: string;
  translatorRating: string; // Changed from number to string to match entity
  translatorLanguages: string;
  status?: string;
  price?: number;
  translatorLocIdInteger?: number;
  translatorAddress?: string;
}

const EditTranslators: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [translator, setTranslator] = useState<Translator | null>(null);
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [formData, setFormData] = useState<Partial<Translator>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTranslator(id);
    } else {
      fetchAllTranslators();
    }
  }, [id]);
  const fetchTranslator = async (translatorId: string) => {
    try {
      console.log('Fetching translator from:', `${BASE_URL}/api/translators/getone/${translatorId}`);
      const response = await fetch(`${BASE_URL}/api/translators/getone/${translatorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch translator');
      }
      const data = await response.json();
      console.log('Translator response:', data);
      setTranslator(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching translator:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTranslators = async () => {
    try {
      console.log('Fetching translators from:', `${BASE_URL}/api/translators/getAll/traslators`);
      const response = await fetch(`${BASE_URL}/api/translators/getAll/traslators`);
      if (!response.ok) {
        throw new Error('Failed to fetch translators');
      }
      const data = await response.json();
      console.log('Translators response:', data);
      setTranslators(data);
    } catch (err) {
      console.error('Error fetching translators:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectTranslatorForEdit = (selectedTranslator: Translator) => {
    setTranslator(selectedTranslator);
    setFormData(selectedTranslator);
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
      const translatorId = id || translator?.translatorID;
      console.log('Updating translator ID:', translatorId);
      console.log('Update payload:', formData);
      
      const response = await fetch(`${BASE_URL}/api/translators/update-translator/${translatorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update translator: ${errorData}`);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData);

      navigate('/admin/translators');
    } catch (err) {
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

  if (error && !translator) {
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
            // Show translator list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Translator to Edit</h1>
              
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Languages</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {translators.map((translatorItem) => (
                      <tr key={translatorItem.translatorID} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {translatorItem.translatorImage && (
                              <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={translatorItem.translatorImage}
                                alt={translatorItem.translatorName}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{translatorItem.translatorName}</div>
                              <div className="text-sm text-gray-500">{translatorItem.translatorAddress}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {translatorItem.translatorLanguages}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {translatorItem.translatorRating}/5
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            translatorItem.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {translatorItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${translatorItem.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectTranslatorForEdit(translatorItem)}
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

              {translators.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No translators found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Translator</h1>
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
                name="translatorName"
                value={formData.translatorName || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="translatorDescription"
                value={formData.translatorDescription || ''}
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
                name="translatorImage"
                value={formData.translatorImage || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                name="translatorRating"
                value={formData.translatorRating || ''}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Languages</label>
              <input
                type="text"
                name="translatorLanguages"
                value={formData.translatorLanguages || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="translatorAddress"
                value={formData.translatorAddress || ''}
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
                {saving ? 'Saving...' : 'Update Translator'}              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/translators')}
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

export default EditTranslators;
