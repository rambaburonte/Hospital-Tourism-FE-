import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from './sidebar';

interface Hospital {
  hospitalId: number;
  hositalName: string; // matches backend field
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
}

interface OptionType {
  value: number;
  label: string;
}

const UploadDoctors: React.FC = () => {
  const [hospitals, setHospitals] = useState<OptionType[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<OptionType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/hospitals');
        const options = res.data.map((hospital: Hospital) => ({
          value: hospital.hospitalId,
          label: `${hospital.hositalName} (${hospital.address})`,
        }));
        setHospitals(options);
      } catch (err) {
        console.error('Failed to fetch hospitals:', err);
        setMessage('Error fetching hospitals');
      }
    };

    fetchHospitals();
  }, []);

  const validateRating = (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 5;
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRating('');
    setDescription('');
    setDepartment('');
    setImageFile(null);
    setSelectedHospital(null);
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedHospital || !name || !email || !description || !rating || !department || !imageFile) {
      setMessage('All fields are required');
      return;
    }

    if (!validateRating(rating)) {
      setMessage('Rating must be a number between 0 and 5');
      return;
    }

    if (imageFile.size > 512000) {
      setMessage('Image must be under 500KB');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('rating', rating);
    formData.append('description', description);
    formData.append('department', department);
    formData.append('hospitalId', selectedHospital.value.toString());
    formData.append('image', imageFile);

    try {
      const res = await axios.post('http://localhost:8080/api/doctorsupload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 200 || res.status === 201) {
        setMessage('Doctor uploaded successfully!');
        resetForm();
      } else {
        setMessage(`Failed to upload doctor: ${res.statusText}`);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setMessage(err.response?.data || 'Server error while uploading doctor');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Doctor</h1>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Hospital</label>
                <Select
                  options={hospitals}
                  value={selectedHospital}
                  onChange={(opt) => setSelectedHospital(opt)}
                  placeholder="Choose a hospital"
                  isSearchable
                />
              </div>

              {selectedHospital && (
                <>
                  <div>
                    <label className="block mb-1">Doctor Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Rating</label>
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
                    <label className="block mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Profile Picture</label>
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
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
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

export default UploadDoctors;
