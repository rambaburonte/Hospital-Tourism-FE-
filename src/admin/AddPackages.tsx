import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; 
import { BASE_URL } from '@/config/config';

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
}

interface PackageServiceItem {
  id: number;
  serviceItemId: number | null;
  servicePackageId: number;
}

interface ServicePackage {
  id: number;
  name: string;
  description: string;
  totalPrice: number;
  durationDays: number;
  imageUrl?: string;
  featured: string;
  serviceItems: PackageServiceItem[];
}

const AdminPackagesPage: React.FC = () => {
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [newServiceItem, setNewServiceItem] = useState({
    name: '',
    description: '',
    type: '',
    price: '' as string | number, // Initialize as empty string to avoid NaN
  });
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    durationDays: '' as string | number, // Initialize as empty string to avoid NaN
    serviceItemIds: [] as number[],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchServiceItems();
  }, []);

  const fetchServiceItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/packege/All/service/items`);
      setServiceItems(res.data);
    } catch (error) {
      console.error('Error fetching service items:', error);
      setError('Failed to fetch service items.');
    }
  };

  const handleServiceItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceItem.name || !newServiceItem.description || !newServiceItem.type || !newServiceItem.price) {
      setError('All service item fields are required.');
      return;
    }
    const price = parseFloat(newServiceItem.price as string);
    if (isNaN(price) || price < 0) {
      setError('Price must be a valid non-negative number.');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/admin/packege/service`, {
        ...newServiceItem,
        price,
      });
      setServiceItems([...serviceItems, res.data]);
      setNewServiceItem({ name: '', description: '', type: '', price: '' });
      setError('');
    } catch (error) {
      console.error('Error creating service item:', error);
      setError('Failed to create service item.');
    }
  };

  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackage.name || !newPackage.description || !newPackage.durationDays || newPackage.serviceItemIds.length === 0) {
      setError('All package fields are required, and at least one service item must be selected.');
      return;
    }
    const durationDays = parseInt(newPackage.durationDays as string);
    if (isNaN(durationDays) || durationDays < 1) {
      setError('Duration must be a valid number greater than 0.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newPackage.name);
    formData.append('description', newPackage.description);
    formData.append('duration', durationDays.toString());
    newPackage.serviceItemIds.forEach(id => formData.append('serviceItemIds', id.toString()));
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      const res = await axios.post(`${BASE_URL}/admin/packege/package`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewPackage({ name: '', description: '', durationDays: '', serviceItemIds: [] });
      setImageFile(null);
      setError('');
      alert('Package created successfully!');
    } catch (error) {
      console.error('Error creating package:', error);
      setError('Failed to create package.');
    }
  };

  const handleServiceItemSelection = (id: number) => {
    setNewPackage(prev => ({
      ...prev,
      serviceItemIds: prev.serviceItemIds.includes(id)
        ? prev.serviceItemIds.filter(itemId => itemId !== id)
        : [...prev.serviceItemIds, id],
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Admin: Create Services & Packages
          </h1>
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Item Creation Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add New Service Item</h2>
              <form onSubmit={handleServiceItemSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newServiceItem.name}
                    onChange={(e) => setNewServiceItem({ ...newServiceItem, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Service Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newServiceItem.description}
                    onChange={(e) => setNewServiceItem({ ...newServiceItem, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Service Description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    value={newServiceItem.type}
                    onChange={(e) => setNewServiceItem({ ...newServiceItem, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Service Type"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={newServiceItem.price}
                    onChange={(e) => setNewServiceItem({ ...newServiceItem, price: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Service Price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Add Service Item
                </button>
              </form>
            </div>

            {/* Package Creation Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Create New Package</h2>
              <form onSubmit={handlePackageSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Package Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Package Description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                  <input
                    type="number"
                    value={newPackage.durationDays}
                    onChange={(e) => setNewPackage({ ...newPackage, durationDays: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Duration in Days"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Items</label>
                  <div className="mt-2 space-y-2">
                    {serviceItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newPackage.serviceItemIds.includes(item.id)}
                          onChange={() => handleServiceItemSelection(item.id)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-900">
                          {item.name} (${item.price})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-sm text-gray-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Create Package
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPackagesPage;