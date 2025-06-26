import React, { useState, useEffect } from 'react';
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

const DeleteTranslators: React.FC = () => {
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTranslators();
  }, []);

  const fetchTranslators = async () => {
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

  const handleSoftDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to soft delete this translator? It will be marked as inactive.')) {
      return;
    }

    setDeleting(id);
    setError(null);

    try {
      console.log('Soft deleting translator ID:', id);
      const response = await fetch(`${BASE_URL}/api/translators/translators/soft-delete/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete translator: ${errorData}`);
      }

      console.log('Translator soft deleted successfully');
      // Refresh the list
      await fetchTranslators();
    } catch (err) {
      console.error('Error deleting translator:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(null);
    }
  };

  const handleActivate = async (id: number) => {
    if (!window.confirm('Are you sure you want to activate this translator?')) {
      return;
    }

    setDeleting(id);
    setError(null);

    try {
      console.log('Activating translator ID:', id);
      const response = await fetch(`${BASE_URL}/api/translators/activate/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to activate translator: ${errorData}`);
      }

      console.log('Translator activated successfully');
      // Refresh the list
      await fetchTranslators();
    } catch (err) {
      console.error('Error activating translator:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(null);
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

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Translators</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Languages</th>
                  <th className="py-2 px-4 border-b text-left">Rating</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {translators.map((translator) => (
                  <tr key={translator.translatorID} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{translator.translatorID}</td>
                    <td className="py-2 px-4 border-b">{translator.translatorName}</td>
                    <td className="py-2 px-4 border-b">{translator.translatorLanguages}</td>
                    <td className="py-2 px-4 border-b">{translator.translatorRating}</td>
                    <td className="py-2 px-4 border-b">${translator.price}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        translator.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {translator.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {translator.status === 'Active' ? (
                        <button
                          onClick={() => handleSoftDelete(translator.translatorID)}
                          disabled={deleting === translator.translatorID}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          {deleting === translator.translatorID ? 'Deactivating...' : 'Deactivate'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(translator.translatorID)}
                          disabled={deleting === translator.translatorID}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {deleting === translator.translatorID ? 'Activating...' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {translators.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No translators found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteTranslators;
