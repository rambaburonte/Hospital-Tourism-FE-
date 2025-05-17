import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from './sidebar';

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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('');
  const [experience, setExperience] = useState('');
  const [styles, setStyles] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/locations');
      const formatted = res.data.map((loc: any) => ({
        value: loc.locationId,
        label: `${loc.city}, ${loc.state}, ${loc.country}`,
      }));
      setLocations(formatted);
    } catch (err) {
      console.error('Error fetching locations', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation || !name || !description || !image || !rating || !experience || !styles) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/chefs/add', {
        chefName: name,
        chefDescription: description,
        chefImage: image,
        chefRating: rating,
        experience,
        styles,
        locationId: selectedLocation.value,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage('Chef uploaded successfully!');
        handleReset();
      } else {
        setMessage('Failed to upload chef');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while uploading chef');
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
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Chef</h1>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Dropdown */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Location</label>
                <Select
                  options={locations}
                  value={selectedLocation}
                  onChange={(opt) => setSelectedLocation(opt)}
                  placeholder="Choose a location"
                  isSearchable
                />
              </div>

              {selectedLocation && (
                <>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Chef Name</label>
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
                    <label className="block font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
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
                      placeholder="e.g. 4.8"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Experience</label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      placeholder="e.g. 10 years"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Styles (comma-separated)</label>
                    <input
                      type="text"
                      value={styles}
                      onChange={(e) => setStyles(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      placeholder="e.g. North Indian, Mughlai"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
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

export default UploadChefs;
