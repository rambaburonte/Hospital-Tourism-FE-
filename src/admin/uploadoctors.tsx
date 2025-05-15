import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { MapPin, X, Menu, Star } from 'lucide-react';
import Sidebar from './sidebar';

interface Hospital {
  id: number;
  name: string;
  address: string; // Format: "Hospital Name, City, State, Country - Pincode"
}

interface Doctor {
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  hospitalId: number;
  profilepic: string;
}

export default function DoctorUploadPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');

  const parseAddress = (address: string) => {
    const normalized = address.replace(/\s*-\s*/, ',');
    const parts = normalized.split(',').map(p => p.trim());
    const [, city = '', state = '', country = '', pincode = ''] = parts.slice(-5);
    return { city, state, country, pincode };
  };

  useEffect(() => {
    axios.get<Hospital[]>('http://localhost:8080/api/hospitals')
      .then(res => {
        setHospitals(res.data);
        setFilteredHospitals(res.data);
      })
      .catch(err => console.error('Error fetching hospitals:', err));
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/doctors')
  //     .then(res => setDoctors(res.data))
  //     .catch(err => console.error('Error fetching doctors:', err));
  // }, []);

  const unique = (field: 'country' | 'state' | 'city') => {
    const values = hospitals.map(h => parseAddress(h.address)[field]);
    return Array.from(new Set(values)).filter(Boolean);
  };

  useEffect(() => {
    let filtered = hospitals;
    if (selectedCountry) {
      filtered = filtered.filter(h => parseAddress(h.address).country === selectedCountry);
    }
    if (selectedState) {
      filtered = filtered.filter(h => parseAddress(h.address).state === selectedState);
    }
    if (selectedCity) {
      filtered = filtered.filter(h => parseAddress(h.address).city === selectedCity);
    }
    setFilteredHospitals(filtered);
  }, [selectedCountry, selectedState, selectedCity, hospitals]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleHospitalChange = (option: any) => {
    const hospital = hospitals.find(h => h.id === option.value);
    setSelectedHospital(hospital || null);
    setFormData(prev => ({ ...prev, hospitalId: option.value }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name.toLowerCase()]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hospitalId) {
      setMessage('Please select a hospital');
      return;
    }
    try {
      new URL(formData.profilepic || '');
    } catch {
      setMessage('Invalid profile picture URL');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/doctorsupload', formData); // Correct endpoint
      setMessage('Doctor uploaded successfully');
      setDoctors([...doctors, formData]);
      setFormData({});
      setSelectedHospital(null);
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Error uploading doctor');
    }
  };

  const handleReset = () => {
    setFormData({});
    setSelectedHospital(null);
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setMessage('');
  };

  const hospitalOptions = filteredHospitals.map(h => ({
    value: h.id,
    label: `${h.name} (${h.address})`
  }));

  // Custom styles for react-select
  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      boxShadow: 'none',
      '&:hover': { borderColor: '#4f46e5' },
      backgroundColor: 'white',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#eef2ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '0.75rem 1rem',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      marginTop: '0.25rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#6b7280',
    }),
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      
        <Sidebar />
     
      <section className="flex-1 p-6 md:p-10 lg:ml-64 min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
            Upload Doctor Profile
          </h2>

          {/* Filters */}
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg bg-gradient-to-b from-white to-gray-50 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
              Filter Hospitals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Country</label>
                <Select
                  options={unique('country').map(c => ({ value: c, label: c }))}
                  onChange={opt => setSelectedCountry(opt ? opt.value : null)}
                  isClearable
                  placeholder="India"
                  styles={selectStyles}
                  aria-label="Filter by country"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">State</label>
                <Select
                  options={unique('state').map(s => ({ value: s, label: s }))}
                  onChange={opt => setSelectedState(opt ? opt.value : null)}
                  isClearable
                  placeholder="Select state"
                  styles={selectStyles}
                  aria-label="Filter by state"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">City</label>
                <Select
                  options={unique('city').map(c => ({ value: c, label: c }))}
                  onChange={opt => setSelectedCity(opt ? opt.value : null)}
                  isClearable
                  placeholder="All Cities"
                  styles={selectStyles}
                  aria-label="Filter by city"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
            {/* Hospital Selection */}
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-700">Select Hospital</label>
              <Select
                options={hospitalOptions}
                onChange={handleHospitalChange}
                placeholder="Search hospital by name/address"
                styles={selectStyles}
                aria-label="Select hospital"
              />
            </div>

            {/* Selected Hospital Info */}
            {selectedHospital && (
              <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{selectedHospital.name}</h4>
                <div className="space-y-1 text-gray-600">
                  <p><span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2">Address</span>{selectedHospital.address}</p>
                  <p><span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2">City</span>{parseAddress(selectedHospital.address).city}</p>
                  <p><span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2">State</span>{parseAddress(selectedHospital.address).state}</p>
                  <p><span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2">Country</span>{parseAddress(selectedHospital.address).country}</p>
                  <p><span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2">Pincode</span>{parseAddress(selectedHospital.address).pincode}</p>
                </div>
              </div>
            )}

            {/* Doctor Upload Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Doctor Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter doctor name"
                  required
                  value={formData.name || ''}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  onChange={handleFormChange}
                  aria-label="Doctor name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  value={formData.email || ''}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  onChange={handleFormChange}
                  aria-label="Email"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  placeholder="Enter rating (1-5)"
                  required
                  min="1"
                  max="5"
                  value={formData.rating || ''}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  onChange={handleFormChange}
                  aria-label="Rating"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  required
                  value={formData.department || ''}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  onChange={handleFormChange}
                  aria-label="Department"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  required
                  value={formData.description || ''}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[100px]"
                  onChange={handleFormChange}
                  aria-label="Description"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Profile Picture URL</label>
                <textarea
                  name="profilepic"
                  placeholder="Paste profile picture link"
                  required
                  value={formData.profilepic || ''}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 min-h-[100px]"
                  onChange={handleFormChange}
                  aria-label="Profile picture URL"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
                >
                  Upload Doctor
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
              {message && (
                <p
                  className={`text-center text-sm mt-4 p-2 rounded-lg ${
                    message.includes('successfully')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>

            {/* Doctor List */}
            {/* <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Doctors List</h3>
              {doctors.length === 0 ? (
                <p className="text-gray-600">No doctors found.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {doctors.map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      role="article"
                      aria-label={`Doctor ${doc.name}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">{doc.name}</p>
                          <p className="text-gray-600">{doc.department}</p>
                          <p className="text-gray-500 text-sm">{doc.email}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="text-gray-800 font-medium">{doc.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </section>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>
    </div>
  );
}