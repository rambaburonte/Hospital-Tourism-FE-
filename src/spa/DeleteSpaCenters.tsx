import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SpaCenter {
  spaId: number;
  spaName: string;
  spaDescription: string;
  spaImage: string;
  rating: number;
  address: string;
  locationId: number;
  status: string;
}

const DeleteSpaCenters: React.FC = () => {
  const [spaCenters, setSpaCenters] = useState<SpaCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpaCenters();
  }, []);

  const fetchSpaCenters = async () => {
    try {
      const response = await fetch(`${BASE_URL}/spaCenter/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa centers');
      }
      const data = await response.json();
      setSpaCenters(data);
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
      const response = await fetch(`${BASE_URL}/spaCenter/soft-delete/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to delete spa center');
      }

      // Refresh the list
      await fetchSpaCenters();
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
      const response = await fetch(`${BASE_URL}/spaCenter/activate/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to activate spa center');
      }

      // Refresh the list
      await fetchSpaCenters();
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Spa Centers</h1>
          
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
                  <th className="py-2 px-4 border-b text-left">Address</th>
                  <th className="py-2 px-4 border-b text-left">Rating</th>
                  <th className="py-2 px-4 border-b text-left">Location ID</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {spaCenters.map((spaCenter) => (
                  <tr key={spaCenter.spaId} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{spaCenter.spaId}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.spaName}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.address}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.rating}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.locationId}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        spaCenter.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {spaCenter.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {spaCenter.status === 'Active' ? (
                        <button
                          onClick={() => handleSoftDelete(spaCenter.spaId)}
                          disabled={deleting === spaCenter.spaId}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          {deleting === spaCenter.spaId ? 'Deactivating...' : 'Deactivate'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(spaCenter.spaId)}
                          disabled={deleting === spaCenter.spaId}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {deleting === spaCenter.spaId ? 'Activating...' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {spaCenters.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No spa centers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteSpaCenters;
