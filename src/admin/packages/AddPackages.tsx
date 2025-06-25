import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
import { toast } from 'sonner';

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface PackageFormData {
  name: string;
  description: string;
  duration: number;
  serviceItemIds: number[];
  imageFile?: File | null;
}

const AddPackages: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PackageFormData>({
    name: '',
    description: '',
    duration: 1,
    serviceItemIds: [],
    imageFile: null,
  });
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(true);

  useEffect(() => {
    fetchServiceItems();
  }, []);

  const fetchServiceItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/packege/All/service/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch service items');
      }
      const data = await response.json();
      setServiceItems(data);
    } catch (error) {
      toast.error('Failed to fetch service items');
    } finally {
      setFetchingItems(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleServiceItemToggle = (itemId: number) => {
    setFormData(prev => ({
      ...prev,
      serviceItemIds: prev.serviceItemIds.includes(itemId)
        ? prev.serviceItemIds.filter(id => id !== itemId)
        : [...prev.serviceItemIds, itemId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('duration', formData.duration.toString());
      
      formData.serviceItemIds.forEach(id => {
        formDataToSend.append('serviceItemIds', id.toString());
      });

      if (formData.imageFile) {
        formDataToSend.append('imageFile', formData.imageFile);
      }

      const response = await fetch(`${BASE_URL}/admin/packege/package`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create package');
      }

      toast.success('Package created successfully!');
      navigate('/admin/viewpackages');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingItems) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <div className="text-center">Loading service items...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Service Package</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Package Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Service Items</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-4">
                {serviceItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`service-${item.id}`}
                      checked={formData.serviceItemIds.includes(item.id)}
                      onChange={() => handleServiceItemToggle(item.id)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor={`service-${item.id}`} className="text-sm">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-500">${item.price}</div>
                    </label>
                  </div>
                ))}
              </div>
              {serviceItems.length === 0 && (
                <p className="text-gray-500 text-sm">No service items available. Please create service items first.</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || formData.serviceItemIds.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Package'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/viewpackages')}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
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

export default AddPackages;
