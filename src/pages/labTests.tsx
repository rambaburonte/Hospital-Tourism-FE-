import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, SortAsc, SortDesc, IndianRupee, TestTube, Home, LayoutDashboard, FlaskConical } from 'lucide-react';
import { BASE_URL } from '@/config/config';


interface LabTest {
  id: number;
  testTitle: string;
  testDescription: string;
  testPrice: number;
  testDepartment: string;
  testImage: string;
}

const LabTests: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'title' | 'price' | 'department'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceFilter, setPriceFilter] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const navigate = useNavigate();
  // const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/diagnostics/${id}`)
      .then((res) => {
        setLabTests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch lab tests:', err);
        setLoading(false);
      });
  }, [id]);

  const departments = useMemo(() => {
    return Array.from(new Set(labTests.map((test) => test.testDepartment))).sort();
  }, [labTests]);

  const filteredAndSortedTests = useMemo(() => {
    return labTests
      .filter((test) => {
        const matchesSearch =
          test.testTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.testDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice =
          (!priceFilter.min || test.testPrice >= priceFilter.min) &&
          (!priceFilter.max || test.testPrice <= priceFilter.max);
        const matchesDepartment = departmentFilter
          ? test.testDepartment.toLowerCase() === departmentFilter.toLowerCase()
          : true;
        return matchesSearch && matchesPrice && matchesDepartment;
      })
      .sort((a, b) => {
        let compareValue = 0;
        if (sortOption === 'title') {
          compareValue = a.testTitle.localeCompare(b.testTitle);
        } else if (sortOption === 'price') {
          compareValue = a.testPrice - b.testPrice;
        } else if (sortOption === 'department') {
          compareValue = a.testDepartment.localeCompare(b.testDepartment);
        }
        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
  }, [labTests, searchQuery, sortOption, sortOrder, priceFilter, departmentFilter]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Available Lab Tests</h2>
            <p className="mt-3 text-lg text-gray-500">Find and book the right diagnostic tests for your needs</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by test name or description..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as 'title' | 'price' | 'department')}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="title">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="department">Sort by Department</option>
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
                    onChange={(e) =>
                      setPriceFilter({ ...priceFilter, min: e.target.value ? parseFloat(e.target.value) : null })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setPriceFilter({ ...priceFilter, max: e.target.value ? parseFloat(e.target.value) : null })
                    }
                  />
                </div>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Loading tests...</p>
            </div>
          ) : filteredAndSortedTests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No lab tests found. Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <img
                    src={test.testImage || 'https://via.placeholder.com/400x250?text=No+Image'}
                    alt={test.testTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{test.testTitle}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{test.testDescription}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Department:</span> {test.testDepartment}
                    </p>
                    <p className="mt-2 text-base font-medium text-gray-900 flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {test.testPrice.toFixed(2)}
                    </p>
                    <button
                      className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => alert(`Booking ${test.testTitle}...`)}
                    >
                      Book Now
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

export default LabTests;