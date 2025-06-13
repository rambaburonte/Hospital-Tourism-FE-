import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, SortAsc, SortDesc, Star, MapPin, Home, TestTube, LayoutDashboard } from 'lucide-react';
import { BASE_URL } from '@/config/config';


interface Diagnostic {
  diognosticsId: number;
  diognosticsName: string;
  diognosticsDescription: string;
  diognosticsImage: string;
  diognosticsrating: string;
  diognosticsaddress: string;
}

const DiagnosticsList: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [addressFilter, setAddressFilter] = useState('');
  const navigate = useNavigate();
  // const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/diagnostics`)
      .then((res) => setDiagnostics(res.data))
      .catch((err) => console.error('Failed to fetch diagnostics:', err));
  }, []);

  const filteredDiagnostics = useMemo(() => {
    return diagnostics
      .filter((d) => {
        const matchesSearch =
          d.diognosticsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.diognosticsDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRating = ratingFilter
          ? parseFloat(d.diognosticsrating || '0') >= ratingFilter
          : true;
        const matchesAddress = addressFilter
          ? d.diognosticsaddress.toLowerCase().includes(addressFilter.toLowerCase())
          : true;
        return matchesSearch && matchesRating && matchesAddress;
      })
      .sort((a, b) => {
        let compareValue = 0;
        if (sortOption === 'name') {
          compareValue = a.diognosticsName.localeCompare(b.diognosticsName);
        } else if (sortOption === 'rating') {
          compareValue = parseFloat(b.diognosticsrating) - parseFloat(a.diognosticsrating);
        }
        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
  }, [diagnostics, searchQuery, sortOption, sortOrder, ratingFilter, addressFilter]);

  return (
    <div className="flex min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Diagnostic Centers</h2>
            <p className="mt-3 text-lg text-gray-500">Explore top diagnostic centers for your healthcare needs</p>
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
                  onChange={(e) => setSortOption(e.target.value as 'name' | 'rating')}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
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

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Filter by address..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={addressFilter}
                    onChange={(e) => setAddressFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {filteredDiagnostics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No diagnostic centers found. Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDiagnostics.map((d) => (
                <div
                  key={d.diognosticsId}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <img
                    src={d.diognosticsImage || 'https://via.placeholder.com/400x250?text=No+Image'}
                    alt={d.diognosticsName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{d.diognosticsName}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{d.diognosticsDescription}</p>
                    <div className="mt-2 flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{d.diognosticsrating || 'Not rated'}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {d.diognosticsaddress || 'No address available'}
                    </p>
                    <button
                      onClick={() => navigate(`/viewtests/${d.diognosticsId}`)}
                      className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Tests
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsList;