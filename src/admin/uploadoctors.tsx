import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from './sidebar';

interface Hospital {
  hospitalId: number;
  hositalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
}

interface Doctor {
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospitalId: number;
}

const UploadDoctors: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<{ value: number; label: string } | null>(null);

  const [doctor, setDoctor] = useState<Omit<Doctor, 'hospitalId'>>({
    name: '',
    email: '',
    rating: 0,
    description: '',
    department: '',
    profilepic: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/hospitals');
      const options = res.data.map((hospital: Hospital) => ({
        value: hospital.hospitalId,
        label: `${hospital.hositalName || 'Unnamed'} (${hospital.address || 'No Address'})`,
      }));
      setHospitals(options);
    } catch (err) {
      console.error('Failed to fetch hospitals:', err);
    }
  };

  const handleChange = (field: keyof Doctor) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDoctor({ ...doctor, [field]: field === 'rating' ? parseFloat(e.target.value) : e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHospital) {
      setMessage('Please select a hospital');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/doctorsupload', {
        ...doctor,
        hospitalId: selectedHospital.value,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage('Doctor uploaded successfully!');
        setDoctor({
          name: '',
          email: '',
          rating: 0,
          description: '',
          department: '',
          profilepic: '',
        });
        setSelectedHospital(null);
      } else {
        setMessage('Failed to upload doctor');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error uploading doctor');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Doctor</h1>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Hospital</label>
                <Select
                  options={hospitals.sort((a, b) => a.label.localeCompare(b.label))}
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
                      value={doctor.name}
                      onChange={handleChange('name')}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      value={doctor.email}
                      onChange={handleChange('email')}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={doctor.rating}
                      onChange={handleChange('rating')}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Department</label>
                    <input
                      type="text"
                      value={doctor.department}
                      onChange={handleChange('department')}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                      value={doctor.description}
                      onChange={handleChange('description')}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Profile Picture URL</label>
                    <input
                      type="url"
                      value={doctor.profilepic}
                      onChange={handleChange('profilepic')}
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
                      onClick={() => {
                        setDoctor({
                          name: '',
                          email: '',
                          rating: 0,
                          description: '',
                          department: '',
                          profilepic: '',
                        });
                        setSelectedHospital(null);
                        setMessage('');
                      }}
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
