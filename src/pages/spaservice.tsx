import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, SortAsc, SortDesc, Star, IndianRupee } from 'lucide-react';
import axios from 'axios';

interface SpaService {
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  rating: string;
  price: string;
  spaCenterId: number | null;
}

const SpaServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [services, setServices] = useState<SpaService[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceFilter, setPriceFilter] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/spaServices/bySpaCenter/${id}`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error('Failed to fetch spa services:', err));
  }, [id]);

  const filteredAndSortedServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchesSearch =
          service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.serviceDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice =
          (!priceFilter.min || parseFloat(service.price) >= priceFilter.min) &&
          (!priceFilter.max || parseFloat(service.price) <= priceFilter.max);
        const matchesRating = ratingFilter ? parseFloat(service.rating || '0') >= ratingFilter : true;
        return matchesSearch && matchesPrice && matchesRating;
      })
      .sort((a, b) => {
        let compareValue = 0;
        if (sortOption === 'name') {
          compareValue = a.serviceName.localeCompare(b.serviceName);
        } else if (sortOption === 'price') {
          compareValue = parseFloat(a.price) - parseFloat(b.price);
        } else if (sortOption === 'rating') {
          compareValue = parseFloat(a.rating) - parseFloat(b.rating);
        }
        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
  }, [services, searchQuery, sortOption, sortOrder, priceFilter, ratingFilter]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Available Spa Services</h2>
          <p className="mt-3 text-lg text-gray-500">Discover the best wellness treatments tailored for you</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or description..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'name' | 'price' | 'rating')}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center border rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition"
              >
                {sortOrder === 'asc' ? (
                  <SortAsc className="w-4 h-4 mr-1" />
                ) : (
                  <SortDesc className="w-4 h-4 mr-1" />
                )}
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </button>

              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min Price"
                  className="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value ? parseFloat(e.target.value) : null })}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value ? parseFloat(e.target.value) : null })}
                />
              </div>

              <select
                value={ratingFilter || ''}
                onChange={(e) => setRatingFilter(e.target.value ? parseInt(e.target.value) : null)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {filteredAndSortedServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No services found. Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <img
                  src={service.serviceImage || 'https://via.placeholder.com/400x250?text=No+Image'}
                  alt={service.serviceName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{service.serviceName}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{service.serviceDescription}</p>
                  <div className="mt-2 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{service.rating || 'Not rated'}</span>
                  </div>
                  <div className="mt-2 text-base font-medium text-gray-900 flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {service.price}
                  </div>
                  <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Book Now
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

export default SpaServiceDetailsPage;