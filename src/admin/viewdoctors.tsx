
import React, { useState, useMemo } from 'react';
import Sidebar from './sidebar';

interface Doctor {
  id: number;
  name: string;
  email: string;
  mobileNum: string;
  rating: number;
  description: string;
  location: string;
  hospital: string;
  department: string;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    mobileNum: '1234567890',
    rating: 4.5,
    description: 'Cardiologist with 15 years of experience.',
    location: 'New York',
    hospital: 'City Hospital',
    department: 'Cardiology',
  },
  {
    id: 2,
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@example.com',
    mobileNum: '0987654321',
    rating: 4.8,
    description: 'Neurologist specializing in migraines.',
    location: 'Chicago',
    hospital: 'General Medical Center',
    department: 'Neurology',
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    email: 'michael.brown@example.com',
    mobileNum: '1122334455',
    rating: 4.2,
    description: 'Orthopedic surgeon with expertise in sports injuries.',
    location: 'Los Angeles',
    hospital: 'Sunset Clinic',
    department: 'Orthopedics',
  },
  {
    id: 4,
    name: 'Dr. Sarah Davis',
    email: 'sarah.davis@example.com',
    mobileNum: '6677889900',
    rating: 4.9,
    description: 'Pediatrician focused on child development.',
    location: 'Chicago',
    hospital: 'Children’s Hospital',
    department: 'Pediatrics',
  },
];

const ViewDoctors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'department' | 'location' | 'rating' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedDoctors = useMemo(() => {
    let result = [...mockDoctors];

    // Search by name, location, or hospital
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.location.toLowerCase().includes(query) ||
          doctor.hospital.toLowerCase().includes(query)
      );
    }

    // Sort by selected field and order
    if (sortField) {
      result.sort((a, b) => {
        if (sortField === 'rating') {
          const order = sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
          return order;
        }
        const valueA = a[sortField].toLowerCase();
        const valueB = b[sortField].toLowerCase();
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }

    return result;
  }, [searchQuery, sortField, sortOrder]);

  const handleSortChange = (field: 'department' | 'location' | 'rating' | '') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-white min-h-screen">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">View Doctors</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search by name, location, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select
                value={sortField}
                onChange={(e) => handleSortChange(e.target.value as 'department' | 'location' | 'rating' | '')}
                className="w-full sm:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Sort by...</option>
                <option value="department">Department</option>
                <option value="location">Location</option>
                <option value="rating">Rating</option>
              </select>
              {sortField && (
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                >
                  <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                </button>
              )}
            </div>
          </div>
          {filteredAndSortedDoctors.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No doctors found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-50">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Mobile</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-600">{doctor.name}</td>
                      <td className="p-4 text-gray-600">{doctor.email}</td>
                      <td className="p-4 text-gray-600">{doctor.mobileNum}</td>
                      <td className="p-4 text-gray-600">{doctor.rating}/5</td>
                      <td className="p-4 text-gray-600">{doctor.department}</td>
                      <td className="p-4 text-gray-600">{doctor.location}</td>
                      <td className="p-4 text-gray-600">{doctor.hospital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDoctors;
