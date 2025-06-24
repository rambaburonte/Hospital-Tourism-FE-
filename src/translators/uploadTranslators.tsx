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

const UploadTranslators: React.FC = () => {
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [rating, setRating] = useState('');
  const [languages, setLanguages] = useState('');
  const [message, setMessage] = useState('');

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

  const validateRating = (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 5;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLocation || !name || !description || !imageFile || !rating || !languages) {
      setMessage('All fields are required');
      return;
    }

    if (!validateRating(rating)) {
      setMessage('Rating must be a number between 0 and 5 (e.g., 4.5)');
      return;
    }

    const formData = new FormData();
    formData.append("translatorName", name);
    formData.append("translatorDescription", description);
    formData.append("translatorRating", rating);
    formData.append("translatorLanguages", languages);
    formData.append("locationId", selectedLocation.value.toString());
    formData.append("image", imageFile);
    try {
      console.log('Sending FormData:', {
        translatorName: name,
        translatorDescription: description,
        translatorRating: rating,
        translatorLanguages: languages,
        locationId: selectedLocation.value,
        status: 'ACTIVE',
        image: imageFile.name,
      });

      const res = await axios.post('${BASE_URL}/api/translators/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', res.data);

      if (res.status === 200 || res.status === 201) {
        setMessage('Translator uploaded successfully!');
        handleReset();
      } else {
        setMessage(`Failed to upload translator: ${res.statusText}`);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data || 'An error occurred while uploading translator';
      setMessage(errorMessage);
    }
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setName('');
    setDescription('');
    setImageFile(null);
    setRating('');
    setLanguages('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Translator</h1>

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
                    <label className="block font-medium text-gray-700 mb-1">Translator Name</label>
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

               <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size > 512000) {
                    setMessage('Image size must be less than 500KB');
                    setImageFile(null);
                  } else {
                    setImageFile(file || null);
                  }
                }}
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              />


                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="text"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      placeholder="e.g. 4.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Languages (comma-separated)</label>
                    <input
                      type="text"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      placeholder="e.g. Hindi, English, Telugu"
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

export default UploadTranslators;