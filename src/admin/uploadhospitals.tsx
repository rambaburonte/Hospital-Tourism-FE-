import React, { useState } from 'react';
import Sidebar from './sidebar';

const UploadHospitals: React.FC = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!country || !state || !city || !hospital) {
      setMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, state, city, hospital })
      });

      if (response.ok) {
        setMessage('Hospital uploaded successfully');
        setCountry('');
        setState('');
        setCity('');
        setHospital('');
      } else {
        setMessage('Failed to upload hospital');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-white min-h-screen">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Upload Hospital</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital Name</label>
            <input type="text" value={hospital} onChange={(e) => setHospital(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">Upload Hospital</button>
          {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UploadHospitals;
