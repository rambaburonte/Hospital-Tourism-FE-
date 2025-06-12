import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
  price: number;
  locationId: number | null;
  location: string | null;
  status: string | null;
}

const ChefsList: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/chefs');
        const data = await response.json();
        setChefs(data);
      } catch (error) {
        console.error('Error fetching chefs:', error);
      }
    };

    fetchChefs();
  }, []);

  const handleBookClick = (chefID: number) => {
    navigate(`/chef/${chefID}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Chefs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefs.map((chef) => (
          <div
            key={chef.chefID}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={chef.chefImage}
              alt={chef.chefName}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300';
              }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{chef.chefName}</h2>
              <p className="text-gray-600 mb-2">{chef.chefDescription}</p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Rating:</span> {chef.chefRating} ⭐
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Experience:</span> {chef.experience}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Styles:</span> {chef.styles}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Price:</span> ${chef.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleBookClick(chef.chefID)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Book Here
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefsList;