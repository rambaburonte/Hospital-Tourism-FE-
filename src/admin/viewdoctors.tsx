import React, { useEffect, useRef, useState, useCallback } from 'react';
import Select from 'react-select';
import { FaSearch, FaFilter, FaDownload } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { X, Menu } from 'lucide-react';
import Sidebar from './sidebar';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '@/config/config';
// Debounce utility
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: '9999px',
    paddingLeft: '0.5rem',
  }),
};

const DoctorsList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchHospital, setSearchHospital] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchRating, setSearchRating] = useState('');

  const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 300), []);
  const searchOptions = {
    name: [...new Set(doctors.map((d) => d.specialty))],
    location: [...new Set(doctors.map((d) => d.location))],
    hospital: [...new Set(doctors.map((d) => d.hospital))],
    specialty: [...new Set(doctors.map((d) => d.specialty))],
    rating: [...new Set(doctors.map((d) => d.rating.toString()))],
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (searchName) filtered = filtered.filter((d) => d.specialty === searchName);
    if (searchLocation) filtered = filtered.filter((d) => d.location === searchLocation);
    if (searchHospital) filtered = filtered.filter((d) => d.hospital === searchHospital);
    if (searchSpecialty) filtered = filtered.filter((d) => d.specialty === searchSpecialty);
    if (searchRating) filtered = filtered.filter((d) => d.rating.toString() === searchRating);

    setFilteredDoctors(filtered);
  }, [searchQuery, searchName, searchLocation, searchHospital, searchSpecialty, searchRating, doctors]);

  const clearFilters = () => {
    setSearchName('');
    setSearchLocation('');
    setSearchHospital('');
    setSearchSpecialty('');
    setSearchRating('');
    setSearchQuery('');
  };

  const averageRating = (
    filteredDoctors.reduce((acc, doc) => acc + parseFloat(doc.rating || 0), 0) /
    (filteredDoctors.length || 1)
  ).toFixed(1);

  const downloadCSV = () => {
    setIsDownloading('csv');
    // fake delay
    setTimeout(() => setIsDownloading(null), 1000);
    // Logic to convert and download CSV
  };

  const downloadPDF = () => {
    setIsDownloading('pdf');
    setTimeout(() => setIsDownloading(null), 1000);
  };

  const downloadExcel = () => {
    setIsDownloading('excel');
    setTimeout(() => setIsDownloading(null), 1000);
  };
  const navigate = useNavigate(); 

  return (
    <>
        <Sidebar />
      

      <button
        className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="flex-1 p-6 lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight">View All Doctors</h1>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search doctors by name, specialty, or location..."
                  value={searchQuery}
                  onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-indigo-500 focus:ring-2 outline-none"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                <FaFilter className="inline-block mr-2" /> Filter
              </button>
            </div>

            {isFilterOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <Select
                  options={searchOptions.name.map((name) => ({ value: name, label: name }))}
                  value={searchName ? { value: searchName, label: searchName } : null}
                  onChange={(opt) => setSearchName(opt ? opt.value : '')}
                  placeholder="Select Specialist"
                  styles={selectStyles}
                  isClearable
                />
                <Select
                  options={searchOptions.location.map((loc) => ({ value: loc, label: loc }))}
                  value={searchLocation ? { value: searchLocation, label: searchLocation } : null}
                  onChange={(opt) => setSearchLocation(opt ? opt.value : '')}
                  placeholder="Select Location"
                  styles={selectStyles}
                  isClearable
                />
                <Select
                  options={searchOptions.hospital.map((hos) => ({ value: hos, label: hos }))}
                  value={searchHospital ? { value: searchHospital, label: searchHospital } : null}
                  onChange={(opt) => setSearchHospital(opt ? opt.value : '')}
                  placeholder="Select Hospital"
                  styles={selectStyles}
                  isClearable
                />
                <Select
                  options={searchOptions.specialty.map((spec) => ({ value: spec, label: spec }))}
                  value={searchSpecialty ? { value: searchSpecialty, label: searchSpecialty } : null}
                  onChange={(opt) => setSearchSpecialty(opt ? opt.value : '')}
                  placeholder="Select Specialty"
                  styles={selectStyles}
                  isClearable
                />
                <Select
                  options={searchOptions.rating.map((rate) => ({ value: rate, label: rate }))}
                  value={searchRating ? { value: searchRating, label: searchRating } : null}
                  onChange={(opt) => setSearchRating(opt ? opt.value : '')}
                  placeholder="Select Rating"
                  styles={selectStyles}
                  isClearable
                />
              </div>
            )}

            <div className="mt-4 text-sm text-gray-700">
              Showing {filteredDoctors.length} doctors | Avg. Rating: {averageRating}/5
            </div>
          </div>

          <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
            {isLoading ? (
              <div className="text-center py-10">
                <ClipLoader size={40} color="#4f46e5" />
                <p className="mt-2 text-sm text-gray-600">Loading doctors...</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm text-gray-600">No doctors found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3 hidden md:table-cell">Email</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Specialty</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Hospital</th>
                      <th className='p-3'>Actions</th>
                    </tr>
                  </thead>
<tbody>
  {filteredDoctors.map((doctor) => (
    <tr key={doctor.id} className="border-b hover:bg-indigo-50">
      <td className="p-3 font-medium text-gray-800">{doctor.name}</td>
      <td className="p-3 hidden md:table-cell">{doctor.email}</td>
      <td className="p-3">{doctor.rating}</td>
      <td className="p-3">{doctor.department}</td>
      <td className="p-3">{doctor.hospital?.address}</td>
      <td className="p-3">{doctor.hospital?.hositalName}</td>
      <td className="p-3">
        <button
          onClick={() => navigate(`/doctor-profile/${doctor.id}`)}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
        >
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>


                </table>
              </div>
            )}
          </div>
        </div>
      </div>
  </>
  );
};

export default DoctorsList;
