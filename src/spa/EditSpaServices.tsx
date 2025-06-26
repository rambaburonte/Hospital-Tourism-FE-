import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const EditSpaServices: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [spaService, setSpaService] = useState<SpaService | null>(null);
  const [spaServices, setSpaServices] = useState<SpaService[]>([]);
  const [formData, setFormData] = useState<Partial<SpaService>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSpaService(id);
    } else {
      fetchAllSpaServices();
    }
  }, [id]);

  const fetchSpaService = async (spaServiceId: string) => {
    try {
      console.log('Fetching spa service from:', `${BASE_URL}/spaServices/getSpaService/${spaServiceId}`);
      const response = await fetch(`${BASE_URL}/spaServices/getSpaService/${spaServiceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa service');
      }
      const data = await response.json();
      console.log('Spa service response:', data);
      setSpaService(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching spa service:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSpaServices = async () => {
    try {
      console.log('Fetching spa services from:', `${BASE_URL}/spaServices/getAll/spaServices`);
      const response = await fetch(`${BASE_URL}/spaServices/getAll/spaServices`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa services');
      }
      const data = await response.json();
      console.log('Spa services response:', data);
      setSpaServices(data);
    } catch (err) {
      console.error('Error fetching spa services:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectSpaServiceForEdit = (selectedSpaService: SpaService) => {
    setSpaService(selectedSpaService);
    setFormData(selectedSpaService);
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
      const spaServiceId = id || spaService?.serviceId;
      console.log('Updating spa service ID:', spaServiceId);
      console.log('Update payload:', formData);
      
      const response = await fetch(`${BASE_URL}/spaServices/update-spaService/${spaServiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update spa service: ${errorData}`);
      }

      const updatedData = await response.json();
      console.log('Update response:', updatedData);

      navigate('/admin/viewspaservices');
    } catch (err) {
      console.error('Error updating spa service:', err);
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

  if (error && !spaService) {
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Spa Service</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Name</label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="serviceDescription"
                value={formData.serviceDescription || ''}
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
                name="serviceImage"
                value={formData.serviceImage || ''}
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
              <label className="block text-sm font-medium text-gray-700">Spa Center ID</label>
              <input
                type="number"
                name="spaCenterId"
                value={formData.spaCenterId || ''}
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
                {saving ? 'Saving...' : 'Update Spa Service'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/viewspaservices')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSpaServices;
