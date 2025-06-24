import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from '../admin/sidebar';  // Assuming Sidebar is exported as a named export
import { BASE_URL } from '@/config/config';
interface LocationOption {
  label: string;
  value: number;
  city: string;
  state: string;
  country: string;
}

const UploadChefs: React.FC = () => {
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [styles, setStyles] = useState<string>('');
  const [status, setStatus] = useState<string>('Active');
  const [price, setPrice] = useState<string>(''); // String to handle input
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchLocations();
  }, []);
  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/locations`);
      const formatted = res.data.map((loc: any) => ({
        value: loc.locationId,
        label: `${loc.city}, ${loc.state}, ${loc.country}`,
        city: loc.city,
        state: loc.state,
        country: loc.country,
      }));
      setLocations(formatted);
    } catch (err) {
      console.error('Error fetching locations', err);
      setMessage('Failed to load locations');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation || !name || !description || !image || !rating || !experience || !styles || !price) {
      setMessage('All fields are required');
      return;
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setMessage('Price must be a valid positive number');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const res = await axios.post(`${BASE_URL}/api/chefs/add/${selectedLocation.value}`, {
        chefName: name,
        chefDescription: description,
        chefImage: image,
        chefRating: rating,
        experience,
        styles,
        Status: status,
        price: parseFloat(price),
        locationId: selectedLocation.value,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage('Chef uploaded successfully!');
        handleReset();
      } else {
        setMessage('Failed to upload chef');
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || 'An error occurred while uploading chef');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setName('');
    setDescription('');
    setImage('');
    setRating('');
    setExperience('');
    setStyles('');
    setStatus('Active');
    setPrice('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Upload Chef
          </h1>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Dropdown */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Location
                </label>
                <Select
                  inputId="location"
                  options={locations}
                  value={selectedLocation}
                  onChange={(opt) => setSelectedLocation(opt)}
                  placeholder="Choose a location"
                  isSearchable
                  isDisabled={isLoading}
                  className="text-gray-800"
                />
              </div>

              {selectedLocation && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="chefName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Chef Name
                    </label>
                    <input
                      id="chefName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Image URL
                    </label>
                    <input
                      id="image"
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Rating
                    </label>
                    <input
                      id="rating"
                      type="text"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      placeholder="e.g. 4.8"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Experience
                    </label>
                    <input
                      id="experience"
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      placeholder="e.g. 10 years"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="styles"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Styles (comma-separated)
                    </label>
                    <input
                      id="styles"
                      type="text"
                      value={styles}
                      onChange={(e) => setStyles(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      placeholder="e.g. North Indian, Mughlai"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                      placeholder="e.g. 1200.00"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                            ></path>
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        "Upload"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={isLoading}
                      className="flex-1 px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div
                  className={`mt-4 text-center p-2 rounded text-sm ${
                    message.includes('success')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                  role="alert"
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

export default UploadChefs;
