import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/admin/sidebar';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ClipLoader } from 'react-spinners';
import debounce from 'lodash.debounce';
import { FaSearch, FaDownload, FaFilter } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import Select from 'react-select';

interface Hospital {
  id: number;
  hospital: string;
  address: string;
  pictureUrl: string;
}

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospital: Hospital;
}

interface DisplayDoctor {
  id: number;
  name: string;
  email: string;
  mobileNum: string;
  rating: number;
  description: string;
  location: string;
  hospital: string;
  specialty: string;
  department: string;
}

const ViewDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<DisplayDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchHospital, setSearchHospital] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [isDownloading, setIsDownloading] = useState<'csv' | 'pdf' | 'excel' | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Parse address to extract city
  const parseAddress = (address: string): string => {
    const parts = address.split(',').map((part) => part.trim());
    return parts[1] || 'Unknown';
  };

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Doctor[]>('http://localhost:8080/api/doctors');
        const mappedDoctors: DisplayDoctor[] = response.data.map((doc) => ({
          id: doc.id,
          name: doc.name,
          email: doc.email,
          mobileNum: 'N/A',
          rating: doc.rating,
          description: doc.description,
          location: parseAddress(doc.hospital.address),
          hospital: doc.hospital.hospital,
          specialty: doc.department,
          department: doc.department,
        }));
        setDoctors(mappedDoctors);
        setError(null);
      } catch (err) {
        setError('Failed to fetch doctors from API');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Debounced search handler
  const debouncedSetSearchQuery = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  // Handle clicks outside to close dropdowns and filter panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadButtonRef.current &&
        downloadMenuRef.current &&
        !downloadButtonRef.current.contains(event.target as Node) &&
        !downloadMenuRef.current.contains(event.target as Node)
      ) {
        setIsDownloadOpen(false);
      }
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[aria-label="Toggle filter options"]')
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation for download dropdown
  const handleKeyDown = (e: React.KeyboardEvent, format: 'csv' | 'pdf' | 'excel') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (format === 'csv') downloadCSV();
      if (format === 'pdf') downloadPDF();
      if (format === 'excel') downloadExcel();
      setIsDownloadOpen(false);
    }
  };

  // Dynamic options for each search field
  const searchOptions = useMemo(() => {
    try {
      const names = [...new Set(doctors.map((doctor) => doctor.name))].sort();
      const locations = [...new Set(doctors.map((doctor) => doctor.location))].sort();
      const hospitals = [...new Set(doctors.map((doctor) => doctor.hospital))].sort();
      const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))].sort();
      const ratings = [
        '5 Star (4.5-5.0)',
        '4 Star (3.5-4.4)',
        '3 Star (2.5-3.4)',
        '2 Star (1.5-2.4)',
        '1 Star (0-1.4)',
      ];
      return { name: names, location: locations, hospital: hospitals, specialty: specialties, rating: ratings };
    } catch (err) {
      setError('Failed to generate search options');
      return { name: [], location: [], hospital: [], specialty: [], rating: [] };
    }
  }, [doctors]);

  const filteredAndSortedDoctors = useMemo(() => {
    try {
      let result = [...doctors];

      // Apply free-text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query) ||
            doctor.location.toLowerCase().includes(query) ||
            doctor.hospital.toLowerCase().includes(query)
        );
      }

      // Apply dropdown filters
      if (searchName) {
        result = result.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      if (searchLocation) {
        result = result.filter((doctor) =>
          doctor.location.toLowerCase() === searchLocation.toLowerCase()
        );
      }
      if (searchHospital) {
        result = result.filter((doctor) =>
          doctor.hospital.toLowerCase() === searchHospital.toLowerCase()
        );
      }
      if (searchSpecialty) {
        result = result.filter((doctor) =>
          doctor.specialty.toLowerCase() === searchSpecialty.toLowerCase()
        );
      }
      if (searchRating) {
        const ratingRange = searchRating.match(/(\d) Star \(([\d.]+)-([\d.]+)\)/);
        if (ratingRange) {
          const [, , min, max] = ratingRange.map(Number);
          result = result.filter(
            (doctor) => doctor.rating >= min && doctor.rating <= max
          );
        }
      }

      return result;
    } catch (err) {
      setError('Failed to filter doctors');
      return [];
    }
  }, [
    doctors,
    searchQuery,
    searchName,
    searchLocation,
    searchHospital,
    searchSpecialty,
    searchRating,
  ]);

  const averageRating = useMemo(() => {
    if (filteredAndSortedDoctors.length === 0) return 0;
    const total = filteredAndSortedDoctors.reduce((sum, doctor) => sum + doctor.rating, 0);
    return (total / filteredAndSortedDoctors.length).toFixed(1);
  }, [filteredAndSortedDoctors]);

  const clearFilters = () => {
    setSearchQuery('');
    setSearchName('');
    setSearchLocation('');
    setSearchHospital('');
    setSearchSpecialty('');
    setSearchRating('');
    setError(null);
  };

  // Download CSV
  const downloadCSV = async () => {
    try {
      setIsDownloading('csv');
      const data = filteredAndSortedDoctors.map((doctor) => ({
        Name: doctor.name,
        Email: doctor.email,
        Mobile: doctor.mobileNum,
        Rating: doctor.rating,
        Specialty: doctor.specialty,
        Location: doctor.location,
        Hospital: doctor.hospital,
      }));

      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'doctors.csv');
    } catch (err) {
      setError('Failed to download CSV');
    } finally {
      setIsDownloading(null);
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    try {
      setIsDownloading('pdf');
      const doc = new jsPDF();
      doc.setFontSize(12);
      const headers = ['Name', 'Email', 'Mobile', 'Rating', 'Specialty', 'Location', 'Hospital'];
      const rows = filteredAndSortedDoctors.map((doctor) => [
        doctor.name,
        doctor.email,
        doctor.mobileNum,
        doctor.rating.toFixed(1),
        doctor.specialty,
        doctor.location,
        doctor.hospital,
      ]);

      let y = 20;
      doc.text('Doctors List', 10, 10);
      doc.text(headers.join(' | '), 10, y);
      rows.forEach((row) => {
        y += 10;
        doc.text(row.join(' | '), 10, y);
      });
      doc.save('doctors.pdf');
    } catch (err) {
      setError('Failed to download PDF');
    } finally {
      setIsDownloading(null);
    }
  };

  // Download Excel
  const downloadExcel = async () => {
    try {
      setIsDownloading('excel');
      const data = filteredAndSortedDoctors.map((doctor) => ({
        Name: doctor.name,
        Email: doctor.email,
        Mobile: doctor.mobileNum,
        Rating: doctor.rating,
        Specialty: doctor.specialty,
        Location: doctor.location,
        Hospital: doctor.hospital,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Doctors');
      const xlsxBlob = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      saveAs(new Blob([xlsxBlob]), 'doctors.xlsx');
    } catch (err) {
      setError('Failed to download Excel');
    } finally {
      setIsDownloading(null);
    }
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      padding: '0.25rem',
      boxShadow: 'none',
      '&:hover': { borderColor: '#4f46e5' },
      backgroundColor: 'white',
      minHeight: '38px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#eef2ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '0.5rem 1rem',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      marginTop: '0.25rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#6b7280',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#1f2937',
    }),
  };

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div
          className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-20`}
        >
          <Sidebar />
        </div>
        <button
          className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50 text-center animate-fade-in">
              <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
              <button
                onClick={() => {
                  clearFilters();
                  setIsFilterOpen(false);
                  setError(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
     
        <Sidebar />
     

     

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight animate-fade-in">
            View All Doctors
          </h1>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 tracking-tight">
              Search & Filter
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md flex-wrap">
                <div className="relative flex-1 w-full">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:scale-105 transition-transform duration-150" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                    placeholder="Search doctors by name, specialty, or location..."
                    className="w-full pl-10 pr-10 p-2.5 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:border-indigo-500 bg-white text-sm text-gray-800 transition-all duration-200 hover:bg-indigo-50 focus:scale-[1.01] outline-none leading-snug"
                    aria-label="Search doctors"
                    aria-describedby="search-desc"
                    aria-controls="doctors-table"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-red-500 hover:scale-105 transition-all duration-150"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                  <span id="search-desc" className="sr-only">
                    Search doctors by name, specialty, or location
                  </span>
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 hover:ring-1 hover:ring-indigo-200 active:scale-95 transition-all duration-200 w-full sm:w-auto min-w-[120px] text-sm shadow-sm"
                  aria-label="Toggle filter options"
                  aria-expanded={isFilterOpen}
                  aria-controls="filter-panel"
                  aria-describedby="filter-desc"
                >
                  <FaFilter className="text-sm hover:scale-105 transition-transform duration-150" />
                  Filter
                </button>
                <span id="filter-desc" className="sr-only">
                  Toggle advanced filter options for doctors
                </span>
              </div>
              {isFilterOpen && (
                <div
                  id="filter-panel"
                  ref={filterPanelRef}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm animate-slide-in"
                  role="region"
                  aria-labelledby="filter-heading"
                  aria-hidden={!isFilterOpen}
                >
                  <h3
                    id="filter-heading"
                    className="text-base font-semibold text-gray-800 mb-3 flex items-center tracking-tight"
                  >
                    <FaFilter className="text-indigo-500 mr-1.5 text-sm hover:scale-105 transition-transform duration-150" />
                    Filters
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Select
                      options={searchOptions.name.map((name) => ({
                        value: name,
                        label: name,
                      }))}
                      value={searchName ? { value: searchName, label: searchName } : null}
                      onChange={(opt) => setSearchName(opt ? opt.value : '')}
                      placeholder="Select Specialist"
                      styles={selectStyles}
                      isClearable
                      aria-label="Filter by specialist"
                      className="min-w-full"
                    />
                    <Select
                      options={searchOptions.location.map((loc) => ({
                        value: loc,
                        label: loc,
                      }))}
                      value={searchLocation ? { value: searchLocation, label: searchLocation } : null}
                      onChange={(opt) => setSearchLocation(opt ? opt.value : '')}
                      placeholder="Select Location"
                      styles={selectStyles}
                      isClearable
                      aria-label="Filter by location"
                      className="min-w-full"
                    />
                    <Select
                      options={searchOptions.hospital.map((hos) => ({
                        value: hos,
                        label: hos,
                      }))}
                      value={searchHospital ? { value: searchHospital, label: searchHospital } : null}
                      onChange={(opt) => setSearchHospital(opt ? opt.value : '')}
                      placeholder="Select Hospital"
                      styles={selectStyles}
                      isClearable
                      aria-label="Filter by hospital"
                      className="min-w-full"
                    />
                    <Select
                      options={searchOptions.specialty.map((spec) => ({
                        value: spec,
                        label: spec,
                      }))}
                      value={searchSpecialty ? { value: searchSpecialty, label: searchSpecialty } : null}
                      onChange={(opt) => setSearchSpecialty(opt ? opt.value : '')}
                      placeholder="Select Specialty"
                      styles={selectStyles}
                      isClearable
                      aria-label="Filter by specialty"
                      className="min-w-full"
                    />
                    <Select
                      options={searchOptions.rating.map((rate) => ({
                        value: rate,
                        label: rate,
                      }))}
                      value={searchRating ? { value: searchRating, label: searchRating } : null}
                      onChange={(opt) => setSearchRating(opt ? opt.value : '')}
                      placeholder="Select Rating"
                      styles={selectStyles}
                      isClearable
                      aria-label="Filter by rating"
                      className="min-w-full"
                    />
                  </div>
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsFilterOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 mt-4 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 hover:shadow-sm active:scale-95 transition-all duration-200 w-full sm:w-auto min-w-[120px] text-sm"
                    aria-label="Clear all filters"
                  >
                    <i className="fas fa-times text-sm text-red-500 hover:scale-105 transition-transform duration-150"></i>
                    Clear Filters
                  </button>
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4" aria-live="polite">
                <div className="flex gap-3">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1.5 rounded-md shadow-sm leading-snug">
                    Showing {filteredAndSortedDoctors.length} doctors
                  </span>
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1.5 rounded-md shadow-sm leading-snug">
                    Avg. Rating: {averageRating}/5
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <button
                      ref={downloadButtonRef}
                      onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                      disabled={isDownloading !== null}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 hover:ring-1 hover:ring-indigo-200 active:scale-95 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto min-w-[120px] text-sm shadow-sm"
                      aria-label="Download data"
                      aria-haspopup="true"
                      aria-expanded={isDownloadOpen}
                      data-tooltip-id="download-tooltip"
                      data-tooltip-content="Download data in various formats"
                      data-tooltip-delay-show={200}
                    >
                      {isDownloading ? (
                        <ClipLoader size={16} color="#ffffff" className="animate-pulse" />
                      ) : (
                        <FaDownload className="text-sm hover:scale-105 transition-transform duration-150" />
                      )}
                      Download
                    </button>
                    {isDownloadOpen && (
                      <div
                        ref={downloadMenuRef}
                        className="absolute top-full right-0 mt-2 min-w-[120px] bg-white rounded-md shadow-lg z-50 animate-fade-in"
                        role="menu"
                      >
                        <div
                          onClick={downloadCSV}
                          onKeyDown={(e) => handleKeyDown(e, 'csv')}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer flex items-center gap-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                          role="menuitem"
                          tabIndex={0}
                          aria-label="Download as CSV"
                        >
                          <i className="fas fa-file-csv text-sm hover:scale-105 transition-transform duration-150"></i>
                          CSV
                        </div>
                        <div
                          onClick={downloadPDF}
                          onKeyDown={(e) => handleKeyDown(e, 'pdf')}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer flex items-center gap-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                          role="menuitem"
                          tabIndex={0}
                          aria-label="Download as PDF"
                        >
                          <i className="fas fa-file-pdf text-sm hover:scale-105 transition-transform duration-150"></i>
                          PDF
                        </div>
                        <div
                          onClick={downloadExcel}
                          onKeyDown={(e) => handleKeyDown(e, 'excel')}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer flex items-center gap-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                          role="menuitem"
                          tabIndex={0}
                          aria-label="Download as Excel"
                        >
                          <i className="fas fa-file-excel text-sm hover:scale-105 transition-transform duration-150"></i>
                          Excel
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            {isLoading ? (
              <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
                <ClipLoader size={40} color="#4f46e5" className="animate-pulse" />
                <p className="text-gray-600 text-sm mt-4 leading-snug">Loading doctors...</p>
              </div>
            ) : filteredAndSortedDoctors.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
                <p className="text-gray-600 text-sm leading-snug">No doctors found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-xl shadow-sm animate-fade-in">
                <table className="w-full border-collapse" id="doctors-table">
                  <thead>
                    <tr className="bg-indigo-50 sticky top-0 z-10">
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight">
                        Name
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight hidden md:table-cell">
                        Email
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight hidden md:table-cell">
                        Mobile
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight">
                        Rating
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight">
                        Specialty
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight">
                        Location
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight">
                        Hospital
                      </th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 tracking-tight">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedDoctors.map((doctor, index) => (
                      <tr
                        key={doctor.id}
                        className={`border-b border-gray-100 hover:bg-indigo-50 transition-all duration-150 ${
                          index % 2 === 0 ? 'bg-gray-50' : ''
                        }`}
                      >
                        <td scope="row" className="p-4 text-gray-600 text-sm leading-snug font-medium">
                          {doctor.name}
                        </td>
                        <td className="p-4 text-gray-600 text-sm leading-snug hidden md:table-cell">
                          {doctor.email}
                        </td>
                        <td className="p-4 text-gray-600 text-sm leading-snug hidden md:table-cell">
                          {doctor.mobileNum}
                        </td>
                        <td className="p-4 text-gray-600 text-sm leading-snug flex items-center gap-1">
                          {doctor.rating.toFixed(1)}/5
                          <span className="text-yellow-400 hover:animate-bounce">★</span>
                        </td>
                        <td className="p-4 text-gray-600 text-sm leading-snug">{doctor.specialty}</td>
                        <td className="p-4 text-gray-600 text-sm leading-snug">{doctor.location}</td>
                        <td className="p-4 text-gray-600 text-sm leading-snug">{doctor.hospital}</td>
                        <td className="p-4 text-gray-600 text-sm leading-snug">
                          <button
                            onClick={() => navigate(`/admin/doctordetails/${doctor.id}`)}
                            className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 text-xs shadow-sm"
                            aria-label={`View details for ${doctor.name}`}
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
      <Tooltip id="download-tooltip" />
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          @keyframes slide-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default ViewDoctors;