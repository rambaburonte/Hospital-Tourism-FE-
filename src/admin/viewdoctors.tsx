import React, { useState, useMemo } from 'react';
import Sidebar from '@/admin/Sidebar';

interface Doctor {
  id: number;
  name: string;
  email: string;
  mobileNum: string;
  rating: number;
  description: string;
  location: string;
  hospital: string;
  specialty: string; // Changed from department to specialty
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    mobileNum: '1234567890',
    rating: 4.5,
    description: 'Expert in heart disease management with 15 years of experience.',
    location: 'New York',
    hospital: 'City Hospital',
    specialty: 'Cardiology',
  },
  {
    id: 2,
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@example.com',
    mobileNum: '0987654321',
    rating: 4.8,
    description: 'Specialist in migraine and neurological disorders.',
    location: 'Chicago',
    hospital: 'General Medical Center',
    specialty: 'Neurology',
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
    specialty: 'Orthopedics',
  },
  {
    id: 4,
    name: 'Dr. Sarah Davis',
    email: 'sarah.davis@example.com',
    mobileNum: '6677889900',
    rating: 4.9,
    description: 'Pediatrician focused on child development and wellness.',
    location: 'Chicago',
    hospital: 'Children’s Hospital',
    specialty: 'Pediatrics',
  },
  {
    id: 5,
    name: 'Dr. Lisa Patel',
    email: 'lisa.patel@example.com',
    mobileNum: '3344556677',
    rating: 4.7,
    description: 'Endocrinologist specializing in diabetes management.',
    location: 'Boston',
    hospital: 'Boston Medical Center',
    specialty: 'Diabetology',
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    email: 'robert.kim@example.com',
    mobileNum: '4455667788',
    rating: 4.6,
    description: 'Oncologist with expertise in cancer treatment.',
    location: 'Houston',
    hospital: 'MD Anderson Cancer Center',
    specialty: 'Oncology',
  },
  {
    id: 7,
    name: 'Dr. Anna Lee',
    email: 'anna.lee@example.com',
    mobileNum: '5566778899',
    rating: 4.4,
    description: 'Gastroenterologist treating digestive disorders.',
    location: 'San Francisco',
    hospital: 'UCSF Medical Center',
    specialty: 'Gastroenterology',
  },
  {
    id: 8,
    name: 'Dr. David Wong',
    email: 'david.wong@example.com',
    mobileNum: '7788990011',
    rating: 4.3,
    description: 'Pulmonologist specializing in respiratory diseases.',
    location: 'Miami',
    hospital: 'Miami General Hospital',
    specialty: 'Pulmonology',
  },
];

const ViewDoctors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<
    'name' | 'location' | 'hospital' | 'specialty' | 'email' | 'mobileNum' | ''
  >('');
  const [sortField, setSortField] = useState<
    'name' | 'specialty' | 'location' | 'hospital' | 'rating' | ''
  >('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedDoctors = useMemo(() => {
    let result = [...mockDoctors];

    // Search by selected field
    if (searchQuery && searchField) {
      const query = searchQuery.toLowerCase();
      result = result.filter((doctor) =>
        doctor[searchField].toLowerCase().includes(query)
      );
    }

    // Sort by selected field and order
    if (sortField) {
      result.sort((a, b) => {
        if (sortField === 'rating') {
          return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        const valueA = a[sortField].toLowerCase();
        const valueB = b[sortField].toLowerCase();
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }

    return result;
  }, [searchQuery, searchField, sortField, sortOrder]);

  const averageRating = useMemo(() => {
    if (filteredAndSortedDoctors.length === 0) return 0;
    const total = filteredAndSortedDoctors.reduce((sum, doctor) => sum + doctor.rating, 0);
    return (total / filteredAndSortedDoctors.length).toFixed(1);
  }, [filteredAndSortedDoctors]);

  const handleSortChange = (field: 'name' | 'specialty' | 'location' | 'hospital' | 'rating' | '') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchField('');
    setSortField('');
    setSortOrder('asc');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6">View All Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Search & Sort</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <select
                  value={searchField}
                  onChange={(e) =>
                    setSearchField(
                      e.target.value as
                        | 'name'
                        | 'location'
                        | 'hospital'
                        | 'specialty'
                        | 'email'
                        | 'mobileNum'
                        | ''
                    )
                  }
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  aria-label="Select search field"
                >
                  <option value="">Search by...</option>
                  <option value="name">Name</option>
                  <option value="location">Location</option>
                  <option value="hospital">Hospital</option>
                  <option value="specialty">Specialty</option>
                  <option value="email">Email</option>
                  <option value="mobileNum">Mobile Number</option>
                </select>
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder={
                      searchField ? `Search by ${searchField}...` : 'Select a field first'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={!searchField}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors disabled:bg-gray-100"
                    aria-label="Search doctors"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortField}
                  onChange={(e) =>
                    handleSortChange(
                      e.target.value as 'name' | 'specialty' | 'location' | 'hospital' | 'rating' | ''
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  aria-label="Select sort field"
                >
                  <option value="">Sort by...</option>
                  <option value="name">Name</option>
                  <option value="specialty">Specialty</option>
                  <option value="location">Location</option>
                  <option value="hospital">Hospital</option>
                  <option value="rating">Top Rating</option>
                </select>
                {sortField && (
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                    aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
                  >
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {filteredAndSortedDoctors.length} doctors | Avg. Rating: {averageRating}/5
                </p>
                <button
                  onClick={clearFilters}
                  className="text-green-500 hover:underline"
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          {filteredAndSortedDoctors.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No doctors found.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-50">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Mobile</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Specialty</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedDoctors.map((doctor) => (
                    <tr
                      key={doctor.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-gray-600">{doctor.name}</td>
                      <td className="p-4 text-gray-600">{doctor.email}</td>
                      <td className="p-4 text-gray-600">{doctor.mobileNum}</td>
                      <td className="p-4 text-gray-600">{doctor.rating}/5</td>
                      <td className="p-4 text-gray-600">{doctor.specialty}</td>
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