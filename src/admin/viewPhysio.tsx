import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Adjust path as needed
import { BASE_URL } from '@/config/config';
interface Physio {
  physioId: number;
  physioName: string;
  physioDescription: string;
  physioImage: string;
  rating: string;
  address: string;
  price: string;
}

const PhysioList: React.FC = () => {
  const [physios, setPhysios] = useState<Physio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/physio`)
      .then(res => {
        const onlyPhysios = res.data.map((item: any) => ({
          physioId: item.physioId,
          physioName: item.physioName,
          physioDescription: item.physioDescription,
          physioImage: item.physioImage,
          rating: item.rating,
          address: item.address,
          price: item.price
        }));
        setPhysios(onlyPhysios);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch physios:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Physiotherapy Centers</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {physios.map(physio => (
              <div key={physio.physioId} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all">
                <img
                  src={physio.physioImage}
                  alt={physio.physioName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{physio.physioName}</h2>
                <p className="text-gray-700 mt-2">{physio.physioDescription}</p>
                <p className="text-sm text-gray-600 mt-2"><strong>Address:</strong> {physio.address}</p>
                <p className="text-sm text-gray-600"><strong>Price:</strong> {physio.price}</p>
                <div className="flex items-center mt-3">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-700 font-medium">{physio.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysioList;
