import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  status: string;
  specialization: string | null;
  hospitallocationId: number;
  hospitallocationName: string;
}

const HospitalResults: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4545/api/hospitals/search-by-location?location=${location}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data = await response.json();
        setHospitals(data);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setError('Failed to load hospitals. Please try again.');
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchHospitals();
    } else {
      setError('No location specified.');
      setLoading(false);
    }
  }, [location]);

  // Normalize location for display (e.g., "delhi-ncr" to "NCR Delhi")
  const displayLocation = location
    ? location
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Unknown';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hospitals in {displayLocation}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading hospitals...</p>
      ) : hospitals.length === 0 ? (
        <div>
          <p className="text-gray-600">No hospitals found for {displayLocation}.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.map((hospital) => (
            <div key={hospital.hospitalId} className="border rounded-lg p-4 shadow-md">
              <img
                src={hospital.hospitalImage}
                alt={hospital.hospitalName}
                className="w-full h-48 object-cover rounded-md mb-2"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/150'; // Fallback image
                }}
              />
              <h2 className="text-xl font-semibold">{hospital.hospitalName}</h2>
              <p className="text-gray-600">{hospital.hospitalDescription}</p>
              <p className="text-gray-600">Rating: {hospital.rating}</p>
              <p className="text-gray-600">{hospital.address}</p>
              <p className="text-gray-600">Status: {hospital.status}</p>
              {hospital.specialization && (
                <p className="text-gray-600">Specialization: {hospital.specialization}</p>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default HospitalResults;