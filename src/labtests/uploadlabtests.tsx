import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
interface DiagnosticsOption {
  label: string;
  value: number;
}

interface Diagnostics {
  diognosticsId: number;
  diognosticsName: string;
}

const UploadLabTests: React.FC = () => {
  const [diagnosticsOptions, setDiagnosticsOptions] = useState<DiagnosticsOption[]>([]);
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<DiagnosticsOption | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const fetchDiagnostics = async () => {
    try {
      console.log('Fetching diagnostics from:', `${BASE_URL}/api/diagnostics`);
      const res = await axios.get<Diagnostics[]>(`${BASE_URL}/api/diagnostics`);
      console.log('Diagnostics response:', res.data);
      const formatted = res.data.map((d: Diagnostics) => ({
        value: d.diognosticsId,
        label: d.diognosticsName,
      }));
      setDiagnosticsOptions(formatted);
    } catch (err) {
      console.error('Failed to fetch diagnostics', err);
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDiagnostics || !title || !description || !price || !department || !image) {
      setMessage('All fields are required');
      return;
    }

    try {
      const payload = {
        testTitle: title,
        testDescription: description,
        testPrice: parseFloat(price),
        testDepartment: department,
        testImage: image,
        diognosticsId: selectedDiagnostics.value,
      };
      
      console.log('Uploading lab test with payload:', payload);
      const res = await axios.post(`${BASE_URL}/api/labtests/add`, payload);
      console.log('Upload response:', res.data);

      if (res.status === 200 || res.status === 201) {
        setMessage('Lab test uploaded successfully!');
        handleReset();
      } else {
        setMessage('Failed to upload lab test');
      }
    } catch (err) {
      console.error('Upload error', err);
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
        setMessage(`Error: ${err.response?.data?.message || 'Failed to upload lab test'}`);
      } else {
        setMessage('An error occurred while uploading lab test');
      }
    }
  };

  const handleReset = () => {
    setSelectedDiagnostics(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setDepartment('');
    setImage('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Lab Test</h1>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Diagnostics Dropdown */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Diagnostics</label>
                <Select
                  options={diagnosticsOptions}
                  value={selectedDiagnostics}
                  onChange={(opt) => setSelectedDiagnostics(opt)}
                  placeholder="Choose diagnostics provider"
                  isSearchable
                />
              </div>

              {selectedDiagnostics && (
                <>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Test Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                    <label className="block font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
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

export default UploadLabTests;
