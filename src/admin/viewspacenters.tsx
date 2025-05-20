import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

interface Spa {
  spaId: number;
  spaName: string;
}

const SpaCentersList: React.FC = () => {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/spaCenter/all')
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Spa Centers</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading spa centers...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spas.map((spa) => (
              <div key={spa.spaId} className="bg-white p-5 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{spa.spaName}</h2>
                <button
                  onClick={() => handleView(spa.spaId)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaCentersList;
