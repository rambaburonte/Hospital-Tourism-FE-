import React, { useState, useEffect } from 'react';
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

const DeleteChefs: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/chefs/all-chefs`);
      if (!response.ok) {
        throw new Error('Failed to fetch chefs');
      }
      const data = await response.json();
      setChefs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id: number) => {
    setDeleting(id);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/chefs/soft-delete/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chef');
      }

      // Refresh the list
      await fetchChefs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(null);
    }
  };

  const handleActivate = async (id: number) => {
    setDeleting(id);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/chefs/activate/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to activate chef');
      }

      // Refresh the list
      await fetchChefs();
    } catch (err) {
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Chefs</h1>
          
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
                  <th className="py-2 px-4 border-b text-left">Experience</th>
                  <th className="py-2 px-4 border-b text-left">Styles</th>
                  <th className="py-2 px-4 border-b text-left">Rating</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {chefs.map((chef) => (
                  <tr key={chef.chefID} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{chef.chefID}</td>
                    <td className="py-2 px-4 border-b">{chef.chefName}</td>
                    <td className="py-2 px-4 border-b">{chef.experience}</td>
                    <td className="py-2 px-4 border-b">{chef.styles}</td>
                    <td className="py-2 px-4 border-b">{chef.chefRating}</td>
                    <td className="py-2 px-4 border-b">${chef.price}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        chef.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {chef.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {chef.status === 'Active' ? (
                        <button
                          onClick={() => handleSoftDelete(chef.chefID)}
                          disabled={deleting === chef.chefID}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          {deleting === chef.chefID ? 'Deactivating...' : 'Deactivate'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(chef.chefID)}
                          disabled={deleting === chef.chefID}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {deleting === chef.chefID ? 'Activating...' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {chefs.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No chefs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteChefs;
