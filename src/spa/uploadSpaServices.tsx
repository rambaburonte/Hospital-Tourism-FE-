import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
interface SpaCenter {
  spaId: number;
  spaName: string;
  spaDescription: string;
  spaImage: string;
  rating: string;
  address: string | null;
}

interface OptionType {
  value: number;
  label: string;
}

const UploadSpaService: React.FC = () => {
  const [spaOptions, setSpaOptions] = useState<OptionType[]>([]);
  const [selectedSpa, setSelectedSpa] = useState<OptionType | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSpaCenters = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/spaCenter/all`);
        const options = res.data.map((spa: SpaCenter) => ({
          value: spa.spaId,
          label: `${spa.spaName} (${spa.address || 'No address'})`,
        }));
        setSpaOptions(options);
      } catch (err) {
        console.error('Failed to fetch spa centers:', err);
        setMessage('Error fetching spa centers');
      }
    };

    fetchSpaCenters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!selectedSpa || !name || !description || !price || !imageFile) {
        setMessage('All fields are required');
        return;
      }

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        setMessage('Price must be a valid non-negative number');
        return;
      }

      if (imageFile.size > 512000) {
        setMessage('Image must be under 500KB');
        return;
      }

      const formData = new FormData();
      formData.append('serviceName', name);
      formData.append('description', description);
      formData.append('spaPrice', parsedPrice.toString());
      formData.append('spaCenterId', selectedSpa.value.toString());
      formData.append('image', imageFile);

      console.log('Uploading spa service with data:', {
        serviceName: name,
        description: description,
        spaPrice: parsedPrice,
        spaCenterId: selectedSpa.value,
        imageFileName: imageFile.name
      });

      const res = await axios.post(`${BASE_URL}/spaServices/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload response:', res.data);

      if (res.status === 200 || res.status === 201) {
        setMessage('Spa service uploaded successfully!');
        setName('');
        setDescription('');
        setPrice('');
        setSelectedSpa(null);
        setImageFile(null);
      } else {
        setMessage('Failed to upload service');
      }
    } catch (err: unknown) {
      console.error('Upload failed:', err);
      let errorMessage = 'Server error during upload';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as { response?: { data?: string } };
        errorMessage = axiosError.response?.data || errorMessage;
      }
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Upload Spa Service</h1>

          <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
            <div>
              <label className="block font-medium mb-1">Select Spa Center</label>
              <Select
                options={spaOptions}
                value={selectedSpa}
                onChange={(opt) => setSelectedSpa(opt)}
                placeholder="Choose a spa center"
                isSearchable
              />
            </div>

            {selectedSpa && (
              <>
                <div>
                  <label className="block mb-1">Service Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    placeholder="e.g. 499"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Service Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size > 512000) {
                        setMessage('Image must be under 500KB');
                        setImageFile(null);
                      } else {
                        setImageFile(file || null);
                      }
                    }}
                    className="w-full"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Upload Service
                </button>
              </>
            )}

            {message && (
              <div
                className={`mt-4 text-center p-2 rounded ${
                  message.toLowerCase().includes('success')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadSpaService;
