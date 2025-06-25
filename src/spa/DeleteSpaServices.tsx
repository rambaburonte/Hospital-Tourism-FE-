import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SpaService {
  serviceId: number;
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  rating: number;
  price: number;
  status: string;
  spaCenterId: number;
}

const DeleteSpaServices: React.FC = () => {
  const [spaServices, setSpaServices] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpaServices();
  }, []);

  const fetchSpaServices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/spaServices/getAll/spaServices`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa services');
      }
      const data = await response.json();
      setSpaServices(data);
    } catch (err) {
      console.error('Error fetching spa services:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id: number) => {
    setDeleting(id);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/spaServices/updateSpaService/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to delete spa service');
      }

      // Refresh the list
      await fetchSpaServices();
    } catch (err) {
      console.error('Error deleting spa service:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(null);
    }
  };

  const handleActivate = async (id: number) => {
    setDeleting(id);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/spaServices/activate/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to activate spa service');
      }

      // Refresh the list
      await fetchSpaServices();
    } catch (err) {
      console.error('Error activating spa service:', err);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Spa Services</h1>
          
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
                  <th className="py-2 px-4 border-b text-left">Service Name</th>
                  <th className="py-2 px-4 border-b text-left">Rating</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Spa Center ID</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {spaServices.map((service) => (
                  <tr key={service.serviceId} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{service.serviceId}</td>
                    <td className="py-2 px-4 border-b">{service.serviceName}</td>
                    <td className="py-2 px-4 border-b">{service.rating}</td>
                    <td className="py-2 px-4 border-b">${service.price}</td>
                    <td className="py-2 px-4 border-b">{service.spaCenterId}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        service.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {service.status === 'Active' ? (
                        <button
                          onClick={() => handleSoftDelete(service.serviceId)}
                          disabled={deleting === service.serviceId}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                        >
                          {deleting === service.serviceId ? 'Deactivating...' : 'Deactivate'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(service.serviceId)}
                          disabled={deleting === service.serviceId}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                        >
                          {deleting === service.serviceId ? 'Activating...' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {spaServices.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No spa services found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteSpaServices;
