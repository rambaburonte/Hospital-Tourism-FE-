import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { MapPin, X, Menu } from 'lucide-react';
import { Country, State } from 'country-state-city';
import Sidebar from './sidebar';

interface Option {
  name: string;
  isoCode: string;
}

const UploadHospitals: React.FC = () => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [hospital, setHospital] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const stateList = State.getStatesOfCountry(selectedCountry.isoCode);
      setStates(stateList);
      setSelectedState(null);
      setCity('');
    } else {
      setStates([]);
      setCity('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState || !city || !pincode || !hospital || !pictureUrl) {
      setMessage('All fields are required');
      return;
    }

    try {
      new URL(pictureUrl);
    } catch {
      setMessage('Invalid picture URL');
      return;
    }

    const address = `${hospital}, ${city}, ${selectedState.name}, ${selectedCountry.name} - ${pincode}`;

    try {
      const response = await axios.post('http://localhost:8080/api/hospitals', {
        hospital,
        address,
        pictureUrl,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Hospital uploaded successfully');
        handleReset();
      } else {
        setMessage('Failed to upload hospital');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  const handleReset = () => {
    setSelectedCountry(null);
    setSelectedState(null);
    setCity('');
    setPincode('');
    setHospital('');
    setPictureUrl('');
    setMessage('');
  };

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
    
        <Sidebar />
    

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
            Upload Hospital
          </h1>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Country Dropdown */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Country</label>
                <Select
                  options={countries.map(c => ({ value: c.isoCode, label: c.name }))}
                  value={selectedCountry ? { value: selectedCountry.isoCode, label: selectedCountry.name } : null}
                  onChange={(opt) => setSelectedCountry(opt ? { isoCode: opt.value, name: opt.label } : null)}
                  isClearable
                  placeholder="Select Country"
                  styles={selectStyles}
                  aria-label="Select country"
                />
              </div>

              {/* State Dropdown */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">State</label>
                <Select
                  options={states.map(s => ({ value: s.isoCode, label: s.name }))}
                  value={selectedState ? { value: selectedState.isoCode, label: selectedState.name } : null}
                  onChange={(opt) => setSelectedState(opt ? { isoCode: opt.value, name: opt.label } : null)}
                  isClearable
                  placeholder="Select State"
                  styles={selectStyles}
                  isDisabled={!selectedCountry}
                  aria-label="Select state"
                />
              </div>

              {/* City Input */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  required
                  aria-label="City"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  required
                  aria-label="Pincode"
                />
              </div>

              {/* Hospital Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Hospital Name</label>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="Enter hospital name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  required
                  aria-label="Hospital name"
                />
              </div>

              {/* Picture URL */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Picture URL</label>
                <input
                  type="url"
                  value={pictureUrl}
                  onChange={(e) => setPictureUrl(e.target.value)}
                  placeholder="Paste picture URL"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  required
                  aria-label="Picture URL"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
                >
                  Upload Hospital
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 text-gray-800 p-4 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              {/* Message */}
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
          </div>
        </div>
      </div>
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
};

export default UploadHospitals;