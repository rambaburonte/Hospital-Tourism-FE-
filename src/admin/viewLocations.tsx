import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Adjust import path if needed

interface Location {
  locationId: number;
  city: string;
  state: string;
  country: string;
}

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios.get('http://localhost:8080/api/locations')
      .then((res) => {
        setLocations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching locations:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content: shifted right using ml-64 to prevent overlap */}
      <div className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">All Locations</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading locations...</p>
        ) : locations.length === 0 ? (
          <p className="text-center text-gray-500">No locations found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.locationId}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">Location ID: {loc.locationId}</h2>
                <p className="text-gray-700 mt-1">City: {loc.city}</p>
                <p className="text-gray-700">State: {loc.state}</p>
                <p className="text-gray-700">Country: {loc.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;
