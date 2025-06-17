import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import { BASE_URL } from '@/config/config';
interface Spa {
  spaId: number;
  spaName: string;
  spaDescription: string;
  rating: number;
  address: string;
  spaImage?: string;
  status?: string;
}

const SpaCentersList: React.FC = () => {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/spaCenter/all`)
      .then((res) => {
        setSpas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching spas:', err);
        setLoading(false);
      });
  }, []);

  const handleView = (id: number) => {
    navigate(`/admin/spaservices/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Spa Centers</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading spa centers...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spas.map((spa) => (
              <div key={spa.spaId} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                {spa.spaImage && (
                  <img
                    src={spa.spaImage}
                    alt={spa.spaName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">{spa.spaName}</h2>
                  <p className="text-gray-600 text-sm mt-1">{spa.spaDescription}</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Rating:</strong> {spa.rating} ⭐</p>
                  <p className="text-gray-700 text-sm"><strong>Address:</strong> {spa.address}</p>
                  {spa.status && <p className="text-sm text-green-600 mt-1"><strong>Status:</strong> {spa.status}</p>}

                  <button
                    onClick={() => handleView(spa.spaId)}
                    className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-4"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaCentersList;
