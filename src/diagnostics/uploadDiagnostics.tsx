import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
interface LocationOption {
  label: string;
  value: number;
  city: string;
  state: string;
  country: string;
}

const UploadDiagnostics: React.FC = () => {
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [rating, setRating] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/locations`);
      const data = res.data;
      const formatted = data.map((loc: any) => ({
        value: loc.locationId,
        label: `${loc.city}, ${loc.state}, ${loc.country}`,
        city: loc.city,
        state: loc.state,
        country: loc.country,
      }));
      setLocations(formatted);
    } catch (err) {
      console.error('Error fetching locations', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLocation || !name || !description || !imageFile || !rating || !customAddress) {
      setMessage('All fields are required');
      return;
    }

    const fullAddress = `${selectedLocation.city},${customAddress}`.toUpperCase();
    
    const formData = new FormData();
    formData.append('diognosticsName', name);
    formData.append('diognosticsDescription', description);
    formData.append('diognosticsrating', rating);
    formData.append('diognosticsaddress', fullAddress);
    formData.append('locationId', selectedLocation.value.toString());
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/diagnostics/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200 || res.status === 201) {
        setMessage('Diagnostics uploaded successfully!');
        handleReset();
      } else {
        setMessage('Failed to upload diagnostics');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while uploading diagnostics');
    }
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setName('');
    setDescription('');
    setImageFile(null);
    setRating('');
    setCustomAddress('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Diagnostics</h1>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Dropdown */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Location</label>
                <Select
                  options={locations.sort((a, b) => a.label.localeCompare(b.label))}
                  value={selectedLocation}
                  onChange={(opt) => setSelectedLocation(opt)}
                  placeholder="Choose a location"
                  isSearchable
                />
              </div>

              {selectedLocation && (
                <>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Diagnostics Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Image Upload</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="text"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      placeholder="4.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Additional Address (e.g., 50095 or STREET-12)
                    </label>
                    <input
                      type="text"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      placeholder="50095"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}

              {message && (
                <div
                  className={`mt-4 text-center p-2 rounded ${
                    message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDiagnostics;
