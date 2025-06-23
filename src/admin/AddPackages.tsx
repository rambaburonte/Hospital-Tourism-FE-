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

const serviceTypes = [
  'Chef',
  'Translator',
  'Spa',
  'Physio',
  'Doctors',
  'Hotels/GuestHouse',
  'Flights',
  'Lab Tests',
];

const AdminPackagesPage: React.FC = () => {
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [newServiceItem, setNewServiceItem] = useState({
    name: '',
    description: '',
    type: '',
    price: '' as string | number,
  });
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    durationDays: '' as string | number,
    serviceItemIds: [] as number[],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showServiceForm, setShowServiceForm] = useState(true);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showChoice, setShowChoice] = useState(false);

  useEffect(() => {
    fetchServiceItems();
  }, []);

  const fetchServiceItems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/packege/All/service/items`);
      setServiceItems(res.data);
    } catch (error) {
      console.error('Error fetching service items:', error);
      setError('Failed to fetch service items.');
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/admin/packege/service`, {
        ...newServiceItem,
        price,
      });
      setServiceItems([...serviceItems, res.data]);
      setNewServiceItem({ name: '', description: '', type: '', price: '' });
      setError('');
      setSuccess('Service item created successfully!');
      setTimeout(() => setSuccess(''), 2000);
      setShowServiceForm(false);
      setShowChoice(true);
    } catch (error) {
      console.error('Error creating service item:', error);
      setError('Failed to create service item.');
    } finally {
      setIsLoading(false);
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

    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/admin/packege/package`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewPackage({ name: '', description: '', durationDays: '', serviceItemIds: [] });
      setImageFile(null);
      setError('');
      setSuccess('Package created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error creating package:', error);
      setError('Failed to create package.');
    } finally {
      setIsLoading(false);
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-green-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 sm:p-10 lg:p-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight drop-shadow animate-fade-in">
            Admin: Create Services & Packages
          </h1>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg shadow animate-slide-in border border-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg shadow animate-slide-in border border-green-300">
              {success}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Item Creation Form */}
            {showServiceForm && (
              <div className="bg-white/90 p-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-gray-200 transition-all duration-500 animate-fade-in flex flex-col gap-4 animate__animated animate__fadeInDown">
                <h2 className="text-2xl font-bold mb-2 text-green-700 tracking-tight">Add New Service Item</h2>
                <hr className="mb-4 border-green-100" />
                <form onSubmit={handleServiceItemSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newServiceItem.name}
                      onChange={(e) => setNewServiceItem({ ...newServiceItem, name: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50 placeholder-gray-400"
                      placeholder="Service Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newServiceItem.description}
                      onChange={(e) => setNewServiceItem({ ...newServiceItem, description: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50 placeholder-gray-400"
                      placeholder="Service Description"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Type</label>
                    <select
                      value={newServiceItem.type}
                      onChange={(e) => setNewServiceItem({ ...newServiceItem, type: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50"
                      required
                    >
                      <option value="" disabled>
                        Choose a Service Type
                      </option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type} className="text-base">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={newServiceItem.price}
                      onChange={(e) => setNewServiceItem({ ...newServiceItem, price: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50 placeholder-gray-400"
                      placeholder="Service Price"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg text-lg tracking-wide"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      'Add Service Item'
                    )}
                  </button>
                </form>
              </div>
            )}
            {/* Choice after adding service item */}
            {showChoice && (
              <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center gap-6 animate__animated animate__fadeInUp">
                <div className="bg-green-50 border border-green-200 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 animate-fade-in">
                  <h2 className="text-2xl font-bold text-green-700 mb-2">What would you like to do next?</h2>
                  <div className="flex gap-6 mt-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-lg transition-all duration-200 hover:scale-105 animate-bounce"
                      onClick={() => { setShowChoice(false); setShowPackageForm(true); }}
                    >
                      Create Package
                    </button>
                    <button
                      className="bg-white border border-green-400 text-green-700 font-bold py-3 px-8 rounded-xl shadow-lg text-lg transition-all duration-200 hover:bg-green-100 hover:scale-105 animate-bounce"
                      onClick={() => { setShowChoice(false); setShowServiceForm(true); }}
                    >
                      Add Another Service
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Package Creation Form */}
            {showPackageForm && (
              <div className="bg-white/90 p-8 rounded-2xl shadow-2xl hover:shadow-3xl border border-gray-200 transition-all duration-500 animate-fade-in flex flex-col gap-4 animate__animated animate__fadeInDown">
                <h2 className="text-2xl font-bold mb-2 text-green-700 tracking-tight">Create New Package</h2>
                <hr className="mb-4 border-green-100" />
                <form onSubmit={handlePackageSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newPackage.name}
                      onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50 placeholder-gray-400"
                      placeholder="Package Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newPackage.description}
                      onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50 placeholder-gray-400"
                      placeholder="Package Description"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      value={newPackage.durationDays}
                      onChange={(e) => setNewPackage({ ...newPackage, durationDays: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-300 shadow focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:scale-105 transition-all duration-200 text-lg py-4 px-4 bg-gray-50 placeholder-gray-400"
                      placeholder="Duration in Days"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Service Items</label>
                    <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-2 bg-gray-50 rounded-lg border border-gray-200 p-2">
                      {serviceItems.map((item) => (
                        <div key={item.id} className="flex items-center hover:bg-green-50 rounded px-2 py-1 transition">
                          <input
                            type="checkbox"
                            checked={newPackage.serviceItemIds.includes(item.id)}
                            onChange={() => handleServiceItemSelection(item.id)}
                            className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer mr-2"
                            title={`Select ${item.name}`}
                          />
                          <label className="ml-2 text-base text-gray-900 cursor-pointer" htmlFor={`service-item-${item.id}`}>
                            {item.name} <span className="text-gray-500">(${item.price})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="mt-1 block w-full text-base text-gray-900 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-base file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                      title="Upload package image"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-200 flex items-center justify-center shadow-lg text-lg tracking-wide"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      'Create Package'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .animate__animated { animation-duration: 0.7s; animation-fill-mode: both; }
        .animate__fadeInDown { animation-name: fadeInDown; }
        .animate__fadeInUp { animation-name: fadeInUp; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce {
          animation: bounce 1.2s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default AdminPackagesPage;