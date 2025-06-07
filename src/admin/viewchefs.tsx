import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Include this only if you are using a sidebar

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
}

const ChefList: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios.get('http://localhost:8080/api/chefs')
      .then(res => {
        setChefs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching chefs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full bg-gray-100 min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Chefs</h1>

        {loading ? (
          <p className="text-gray-600">Loading chefs...</p>
        ) : chefs.length === 0 ? (
          <p className="text-gray-600">No chefs available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chefs.map(chef => (
              <div key={chef.chefID} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all">
                <img
                  src={chef.chefImage}
                  alt={chef.chefName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-900">{chef.chefName}</h2>
                <p className="text-gray-700 mt-2">{chef.chefDescription}</p>
                <p className="text-sm text-gray-500 mt-2"><strong>Experience:</strong> {chef.experience} years</p>
                <p className="text-sm text-gray-500"><strong>Styles:</strong> {chef.styles}</p>
                <div className="flex items-center mt-3">
                  <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-700 font-medium">{chef.chefRating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefList;
