import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/admin/sidebar';
import { Country, State, City } from 'country-state-city';

interface Option {
  name: string;
  isoCode: string;
}

export default function LocationUploadPage() {
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
  });

  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('');
  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadedCountries = Country.getAllCountries().map(c => ({
      name: c.name,
      isoCode: c.isoCode,
    }));
    setCountries(loadedCountries);
  }, []);

  useEffect(() => {
    if (selectedCountryCode) {
      const loadedStates = State.getStatesOfCountry(selectedCountryCode).map(s => ({
        name: s.name,
        isoCode: s.isoCode,
      }));
      setStates(loadedStates);
      setCities([]); // reset cities
    }
  }, [selectedCountryCode]);

  useEffect(() => {
    if (selectedCountryCode && selectedStateCode) {
      const loadedCities = City.getCitiesOfState(selectedCountryCode, selectedStateCode).map(
        c => ({
          name: c.name,
          isoCode: c.name,
        })
      );
      setCities(loadedCities);
    }
  }, [selectedCountryCode, selectedStateCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { country, state, city } = formData;

    if (!country || !state || !city) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/locations', formData);
      setMessage('Location uploaded successfully!');
      setFormData({ country: '', state: '', city: '' });
      setStates([]);
      setCities([]);
    } catch (error) {
      console.error('Error uploading location:', error);
      setMessage('Failed to upload location');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Business Location</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Country Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={e => {
                  const selectedCode = countries.find(c => c.name === e.target.value)?.isoCode || '';
                  setFormData(prev => ({ ...prev, country: e.target.value, state: '', city: '' }));
                  setSelectedCountryCode(selectedCode);
                  setSelectedStateCode('');
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country.isoCode} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={e => {
                  const selectedCode = states.find(s => s.name === e.target.value)?.isoCode || '';
                  setFormData(prev => ({ ...prev, state: e.target.value, city: '' }));
                  setSelectedStateCode(selectedCode);
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state.isoCode} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
        {/* City Input with Suggestions */}
<div>
  <label className="block text-sm font-medium text-gray-700">City</label>
  <input
    list="city-options"
    name="city"
    value={formData.city}
    onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
    placeholder="Select or enter a city"
    className="w-full border border-gray-300 rounded px-3 py-2"
    required
  />
  <datalist id="city-options">
    {cities.map(city => (
      <option key={city.isoCode} value={city.name} />
    ))}
  </datalist>
</div>


            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Upload Location
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 text-center p-2 rounded ${
                message.includes('success')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
