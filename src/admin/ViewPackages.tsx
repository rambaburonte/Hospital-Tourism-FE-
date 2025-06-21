import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Adjust import path as needed

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

interface Notification {
  type: 'success' | 'error';
  message: string;
}

const PackagesDisplayPage: React.FC = () => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [serviceItemsMap, setServiceItemsMap] = useState<{ [key: number]: ServiceItem }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [editPackage, setEditPackage] = useState<{
    name: string;
    description: string;
    durationDays: string | number;
    serviceItemIds: number[];
  } | null>(null);
  const [addPackage, setAddPackage] = useState<{
    name: string;
    description: string;
    durationDays: string | number;
    serviceItemIds: number[];
    imageFile: File | null;
  }>({
    name: '',
    description: '',
    durationDays: '',
    serviceItemIds: [],
    imageFile: null,
  });
  const [allServiceItems, setAllServiceItems] = useState<ServiceItem[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchPackages();
    fetchAllServiceItems();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:4545/admin/packege/All/packages');
      console.log('Fetched packages:', res.data); // Debug: Log fetched packages
      setPackages(res.data.map(pkg => ({
        ...pkg,
        featured: pkg.featured ? pkg.featured.toLowerCase() : 'yes' // Normalize to lowercase
      })));
      await fetchServiceItemsForPackages(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setNotification({ type: 'error', message: 'Failed to load packages. Please try again.' });
      setLoading(false);
    }
  };

  const fetchAllServiceItems = async () => {
    try {
      const res = await axios.get('http://localhost:4545/admin/packege/All/service/items');
      setAllServiceItems(res.data);
    } catch (error) {
      console.error('Error fetching service items:', error);
      setNotification({ type: 'error', message: 'Failed to load service items.' });
    }
  };

  const fetchServiceItemsForPackages = async (packages: ServicePackage[]) => {
    const uniqueServiceItemIds = new Set<number>();
    packages.forEach(pkg => {
      pkg.serviceItems.forEach(item => {
        if (item.serviceItemId) uniqueServiceItemIds.add(item.serviceItemId);
      });
    });

    const serviceItems: { [key: number]: ServiceItem } = {};
    await Promise.all(
      Array.from(uniqueServiceItemIds).map(async (id) => {
        try {
          const res = await axios.get(`http://localhost:4545/admin/packege/service/items/${id}`);
          serviceItems[id] = res.data;
        } catch (error) {
          console.error(`Error fetching service item ${id}:`, error);
        }
      })
    );
    setServiceItemsMap(serviceItems);
  };
const handleFeaturedChange = async (id: number, selectedStatus: string) => {
    try {
        const res = await axios.put(
            `http://localhost:4545/admin/packege/packages/featured/${id}`,
            {},
            { params: { featured: selectedStatus } }
        );
        console.log('Updated package:', res.data);
        if (!res.data || res.data.id !== id) {
            throw new Error('Invalid API response: ID mismatch or missing data');
        }
        setPackages(prevPackages => {
            const updatedPackages = prevPackages.map(pkg =>
                pkg.id === id ? { ...res.data, featured: res.data.featured.toLowerCase() } : pkg
            );
            console.log('Updated packages state:', updatedPackages); // Debug state
            return updatedPackages;
        });
        setNotification({
            type: 'success',
            message: `Package ${selectedStatus === 'no' ? 'set as Featured' : 'removed from Featured'}.`,
        });
    } catch (error: any) {
        console.error('Error updating featured status:', error, error.response?.data);
        setNotification({
            type: 'error',
            message: `Failed to update featured status: ${error.response?.data?.message || error.message || 'Unknown error'}`,
        });
    }
};

  const openPackageDetails = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setEditPackage({
      name: pkg.name,
      description: pkg.description,
      durationDays: pkg.durationDays,
      serviceItemIds: pkg.serviceItems.map(item => item.serviceItemId!).filter(id => id !== null) as number[],
    });
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setEditPackage(null);
    setShowAddModal(false);
    setAddPackage({
      name: '',
      description: '',
      durationDays: '',
      serviceItemIds: [],
      imageFile: null,
    });
    setError('');
  };
const handleUpdatePackage = async () => {
    if (!selectedPackage || !editPackage) return;

    if (!editPackage.name || !editPackage.description || !editPackage.durationDays || editPackage.serviceItemIds.length === 0) {
        setError('All fields are required, and at least one service item must be selected.');
        return;
    }

    const durationDays = parseInt(editPackage.durationDays as string);
    if (isNaN(durationDays) || durationDays < 1) {
        setError('Duration must be a valid number greater than 0.');
        return;
    }

    try {
        const res = await axios.put(`http://localhost:4545/admin/packege/packages/${selectedPackage.id}`, {
            name: editPackage.name,
            description: editPackage.description,
            durationDays,
            serviceItemIds: editPackage.serviceItemIds,
        });
        setPackages(packages.map(pkg => (pkg.id === selectedPackage.id ? { ...res.data, featured: res.data.featured.toLowerCase() } : pkg)));
        setNotification({ type: 'success', message: 'Package updated successfully.' });
        closeModal();
    } catch (error: any) {
        console.error('Error updating package:', error);
        const errorMessage = error.response?.data || 'Failed to update package. Please try again.';
        setError(errorMessage);
        setNotification({ type: 'error', message: errorMessage });
    }
};

  const handleDeletePackage = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4545/admin/packege/packages/delete/${id}`);
      setPackages(packages.filter(pkg => pkg.id !== id));
      setNotification({ type: 'success', message: 'Package deleted successfully.' });
      closeModal();
    } catch (error) {
      console.error('Error deleting package:', error);
      setError('Failed to delete package. Please try again.');
    }
  };

  const handleAddPackage = async () => {
    if (!addPackage.name || !addPackage.description || !addPackage.durationDays || addPackage.serviceItemIds.length === 0) {
      setError('All fields are required, and at least one service item must be selected.');
      return;
    }

    const durationDays = parseInt(addPackage.durationDays as string);
    if (isNaN(durationDays) || durationDays < 1) {
      setError('Duration must be a valid number greater than 0.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', addPackage.name);
      formData.append('description', addPackage.description);
      formData.append('duration', durationDays.toString());
      addPackage.serviceItemIds.forEach(id => formData.append('serviceItemIds', id.toString()));
      if (addPackage.imageFile) {
        formData.append('imageFile', addPackage.imageFile);
      }

      const res = await axios.post('http://localhost:4545/admin/packege/package', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Added package:', res.data); // Debug: Log added package
      setPackages([...packages, { ...res.data, featured: res.data.featured.toLowerCase() }]);
      setNotification({ type: 'success', message: 'Package added successfully.' });
      closeModal();
    } catch (error) {
      console.error('Error adding package:', error);
      setError('Failed to add package. Please try again.');
    }
  };

  const handleServiceItemSelection = (id: number, isAddModal: boolean) => {
    if (isAddModal) {
      setAddPackage({
        ...addPackage,
        serviceItemIds: addPackage.serviceItemIds.includes(id)
          ? addPackage.serviceItemIds.filter(itemId => itemId !== id)
          : [...addPackage.serviceItemIds, id],
      });
    } else if (editPackage) {
      setEditPackage({
        ...editPackage,
        serviceItemIds: editPackage.serviceItemIds.includes(id)
          ? editPackage.serviceItemIds.filter(itemId => itemId !== id)
          : [...editPackage.serviceItemIds, id],
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAddPackage({ ...addPackage, imageFile: e.target.files[0] });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Health & Wellness Packages
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Add Package
            </button>
          </div>
          {notification && (
            <div
              className={`mb-4 p-4 rounded-md flex justify-between items-center ${
                notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              <span>{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="text-sm font-semibold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openPackageDetails(pkg)}
              >
                <span
                  className={`absolute top-0 right-0 text-white text-xs font-bold px-2 py-1 rounded-bl ${
                    pkg.featured.toLowerCase() === 'no' ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  {pkg.featured.toLowerCase() === 'no' ? 'Featured' : 'Not Featured'}
                </span>
                <img
                  src={pkg.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={pkg.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">${pkg.totalPrice.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm">{pkg.durationDays} Day{pkg.durationDays > 1 ? 's' : ''}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm">Services Included:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {pkg.serviceItems.map((item) => (
                        <li key={item.id}>
                          {serviceItemsMap[item.serviceItemId!]?.name || 'Unknown Service'}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 text-sm mb-2">Featured Status:</p>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`featured-${pkg.id}`}
                          value="yes"
                          checked={pkg.featured.toLowerCase() === 'yes'}
                          onChange={() => handleFeaturedChange(pkg.id, 'yes')}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-900">Not Featured</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`featured-${pkg.id}`}
                          value="no"
                          checked={pkg.featured.toLowerCase() === 'no'}
                          onChange={() => handleFeaturedChange(pkg.id, 'no')}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-900">Featured</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Package Details and Edit */}
        {selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedPackage.name} Details</h2>
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Description:</p>
                  <p className="text-gray-900">{selectedPackage.description}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Price:</p>
                  <p className="text-gray-900">${selectedPackage.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Duration:</p>
                  <p className="text-gray-900">{selectedPackage.durationDays} Day{selectedPackage.durationDays > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Services Included:</p>
                  <ul className="list-disc pl-5 text-gray-900">
                    {selectedPackage.serviceItems.map((item) => (
                      <li key={item.id}>
                        {serviceItemsMap[item.serviceItemId!]?.name || 'Unknown Service'} - $
                        {serviceItemsMap[item.serviceItemId!]?.price.toFixed(2) || 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {editPackage && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Edit Package</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={editPackage.name}
                        onChange={(e) => setEditPackage({ ...editPackage, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Package Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editPackage.description}
                        onChange={(e) => setEditPackage({ ...editPackage, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Package Description"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                      <input
                        type="number"
                        value={editPackage.durationDays}
                        onChange={(e) => setEditPackage({ ...editPackage, durationDays: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Duration in Days"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service Items</label>
                      <div className="mt-2 space-y-2">
                        {allServiceItems.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editPackage.serviceItemIds.includes(item.id)}
                              onChange={() => handleServiceItemSelection(item.id, false)}
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-900">
                              {item.name} (${item.price.toFixed(2)})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={handleUpdatePackage}
                      className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                      Update Package
                    </button>
                    <button
                      onClick={() => handleDeletePackage(selectedPackage.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                      Delete Package
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal for Adding Package */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Add New Package</h2>
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={addPackage.name}
                    onChange={(e) => setAddPackage({ ...addPackage, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Package Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={addPackage.description}
                    onChange={(e) => setAddPackage({ ...addPackage, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Package Description"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                  <input
                    type="number"
                    value={addPackage.durationDays}
                    onChange={(e) => setAddPackage({ ...addPackage, durationDays: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Duration in Days"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Items</label>
                  <div className="mt-2 space-y-2">
                    {allServiceItems.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={addPackage.serviceItemIds.includes(item.id)}
                          onChange={() => handleServiceItemSelection(item.id, true)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-900">
                          {item.name} (${item.price.toFixed(2)})
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
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleAddPackage}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Add Package
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesDisplayPage;