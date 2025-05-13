import React, { useState, useMemo } from 'react';
import { FaSearch, FaDownload, FaFilter } from 'react-icons/fa';
import Sidebar from './sidebar';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    name: 'Dr. John Doe',
    email: 'john@example.com',
    mobileNum: '1234567890',
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
  },
];

const ViewDoctors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'xlsx' | ''>('');

  const allDepartments = [...new Set(mockDoctors.map(d => d.department))];
  const allRatings = [...new Set(mockDoctors.map(d => d.rating.toString()))];
  const allLocations = [...new Set(mockDoctors.map(d => d.location))];
  const allHospitals = [...new Set(mockDoctors.map(d => d.hospital))];

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
      });
      doc.save('doctors.pdf');
    }

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
