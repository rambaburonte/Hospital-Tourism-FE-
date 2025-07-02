
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
  price: number;
  locationId: string | null;
  status: string | null;
}

const ChefList: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/chefs`);
        if (!response.ok) {
          throw new Error('Failed to fetch chefs data');
        }
        const data: Chef[] = await response.json();
        setChefs(data);
        setFilteredChefs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  useEffect(() => {
    const filtered = chefs.filter(
      (chef) =>
        chef.chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chef.styles.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChefs(filtered);
  }, [searchTerm, chefs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdate = (chefID: number) => {
    navigate(`/update-chef/${chefID}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 text-base font-semibold">{error}</p>
        <button
          className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
            Chef Management Dashboard
          </h1>

          {/* Search Bar */}
          <div className="mb-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by chef name or cuisine style..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2.5 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>

          {/* Chef Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredChefs.length > 0 ? (
              filteredChefs.map((chef) => (
                <div
                  key={chef.chefID}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative">
                    <img
                      src={chef.chefImage}
                      alt={chef.chefName}
                      className="w-full h-36 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x150?text=Chef+Image';
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-bl-md">
                      {chef.chefRating} ★
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1.5">{chef.chefName}</h2>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{chef.chefDescription}</p>
                    <div className="grid grid-cols-2 gap-1.5 mb-2 text-xs">
                      <span className="text-gray-500">Exp: {chef.experience}</span>
                      <span className="text-gray-500">Styles: {chef.styles}</span>
                      <span className="text-gray-500 col-span-2">Price: ${chef.price.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => handleUpdate(chef.chefID)}
                      className="w-full py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-xs"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-base">
                No chefs found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefList;