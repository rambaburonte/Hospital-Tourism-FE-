import React, { useState, useMemo } from 'react';
<<<<<<< HEAD
import { FaSearch, FaDownload, FaFilter } from 'react-icons/fa';
import Sidebar from './sidebar';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
=======
import Sidebar from '@/admin/Sidebar';
>>>>>>> 1bb957c5c06dbc3d4ca24e632ca91633f2fbb90a

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
    name: 'Dr. John Doe',
    email: 'john@example.com',
    mobileNum: '1234567890',
<<<<<<< HEAD
    rating: 4,
    description: 'Experienced Cardiologist',
    location: 'New York',
    hospital: 'NYC Health',
    department: 'Cardiology',
  },
  {
    id: 2,
    name: 'Dr. Sarah Lee',
    email: 'sarah@example.com',
    mobileNum: '9876543210',
    rating: 5,
    description: 'Pediatric specialist',
    location: 'Los Angeles',
    hospital: 'LA Care',
    department: 'Pediatrics',
=======
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
>>>>>>> 1bb957c5c06dbc3d4ca24e632ca91633f2fbb90a
  },
];

const ViewDoctors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
<<<<<<< HEAD
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'xlsx' | ''>('');
=======
  const [searchField, setSearchField] = useState<
    'name' | 'location' | 'hospital' | 'specialty' | 'email' | 'mobileNum' | ''
  >('');
  const [sortField, setSortField] = useState<
    'name' | 'specialty' | 'location' | 'hospital' | 'rating' | ''
  >('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
>>>>>>> 1bb957c5c06dbc3d4ca24e632ca91633f2fbb90a

  const allDepartments = [...new Set(mockDoctors.map(d => d.department))];
  const allRatings = [...new Set(mockDoctors.map(d => d.rating.toString()))];
  const allLocations = [...new Set(mockDoctors.map(d => d.location))];
  const allHospitals = [...new Set(mockDoctors.map(d => d.hospital))];

<<<<<<< HEAD
  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        doctor.name.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query) ||
        doctor.hospital.toLowerCase().includes(query);

      const matchesDepartment = selectedDepartment ? doctor.department === selectedDepartment : true;
      const matchesRating = selectedRating ? doctor.rating.toString() === selectedRating : true;
      const matchesLocation = selectedLocation ? doctor.location === selectedLocation : true;
      const matchesHospital = selectedHospital ? doctor.hospital === selectedHospital : true;

      return matchesQuery && matchesDepartment && matchesRating && matchesLocation && matchesHospital;
    });
  }, [searchQuery, selectedDepartment, selectedRating, selectedLocation, selectedHospital]);

  const exportData = () => {
    const headers = ['Name', 'Email', 'Mobile', 'Rating', 'Department', 'Location', 'Hospital'];
    const rows = filteredDoctors.map(d => [
      d.name, d.email, d.mobileNum, d.rating.toString(), d.department, d.location, d.hospital,
    ]);

    if (exportFormat === 'csv') {
      const csv = [headers, ...rows].map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      saveAs(blob, 'doctors.csv');
    }

    if (exportFormat === 'pdf') {
      const doc = new jsPDF();
      doc.setFontSize(12);
      let y = 20;
      doc.text(headers.join(' | '), 10, y);
      rows.forEach(row => {
        y += 10;
        doc.text(row.join(' | '), 10, y);
=======
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
>>>>>>> 1bb957c5c06dbc3d4ca24e632ca91633f2fbb90a
      });
      doc.save('doctors.pdf');
    }

<<<<<<< HEAD
    if (exportFormat === 'xlsx') {
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Doctors');
      const xlsxBlob = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      saveAs(new Blob([xlsxBlob]), 'doctors.xlsx');
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-50">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="ml-64 w-full min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">View Doctors</h1>

        {/* Controls row */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          {/* Search */}
          <div className="flex items-center w-full md:w-1/3 bg-white border border-gray-300 rounded-lg px-3">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border-none outline-none"
            />
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-800"
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Export format dropdown */}
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as any)}
            className="p-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="">Select Export Format</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
            <option value="xlsx">XLSX</option>
          </select>

          {/* Download button (only if format is selected) */}
          {exportFormat && (
            <button
              onClick={exportData}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <FaDownload /> Download
            </button>
=======
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
>>>>>>> 1bb957c5c06dbc3d4ca24e632ca91633f2fbb90a
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} className="p-3 border border-gray-300 rounded-lg">
              <option value="">All Departments</option>
              {allDepartments.map(dep => <option key={dep}>{dep}</option>)}
            </select>

            <select value={selectedRating} onChange={e => setSelectedRating(e.target.value)} className="p-3 border border-gray-300 rounded-lg">
              <option value="">All Ratings</option>
              {allRatings.map(r => <option key={r}>{r}</option>)}
            </select>

            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="p-3 border border-gray-300 rounded-lg">
              <option value="">All Locations</option>
              {allLocations.map(loc => <option key={loc}>{loc}</option>)}
            </select>

            <select value={selectedHospital} onChange={e => setSelectedHospital(e.target.value)} className="p-3 border border-gray-300 rounded-lg">
              <option value="">All Hospitals</option>
              {allHospitals.map(hosp => <option key={hosp}>{hosp}</option>)}
            </select>
          </div>
        )}

        {/* Doctors table */}
        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No doctors found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-green-100 text-left">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Hospital</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map(d => (
                  <tr key={d.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{d.name}</td>
                    <td className="px-4 py-3">{d.email}</td>
                    <td className="px-4 py-3">{d.mobileNum}</td>
                    <td className="px-4 py-3">{d.rating}/5</td>
                    <td className="px-4 py-3">{d.department}</td>
                    <td className="px-4 py-3">{d.location}</td>
                    <td className="px-4 py-3">{d.hospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDoctors;