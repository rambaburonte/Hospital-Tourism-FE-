import React, { useState, useMemo, useEffect, useRef } from 'react';
import Sidebar from '@/admin/Sidebar'; // Adjust path as needed
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ClipLoader } from 'react-spinners';
import debounce from 'lodash.debounce';
import { FaSearch, FaDownload, FaFilter } from 'react-icons/fa';

interface Doctor {
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
    specialty: 'Cardiology',
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
    specialty: 'Pediatrics',
    department: 'Pediatrics',
  },
];

const ViewDoctors: React.FC = () => {
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
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);

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
      const names = [...new Set(mockDoctors.map((doctor) => doctor.name))].sort();
      const locations = [...new Set(mockDoctors.map((doctor) => doctor.location))].sort();
      const hospitals = [...new Set(mockDoctors.map((doctor) => doctor.hospital))].sort();
      const specialties = [...new Set(mockDoctors.map((doctor) => doctor.specialty))].sort();
      const departments = [...new Set(mockDoctors.map((doctor) => doctor.department))].sort();
      const ratings = [
        '5 Star (4.5-5.0)',
        '4 Star (3.5-4.4)',
        '3 Star (2.5-3.4)',
        '2 Star (1.5-2.4)',
        '1 Star (0-1.4)',
      ];
      return { name: names, location: locations, hospital: hospitals, specialty: specialties, department: departments, rating: ratings };
    } catch (err) {
      setError('Failed to generate search options');
      return { name: [], location: [], hospital: [], specialty: [], department: [], rating: [] };
    }
  }, []);

  const filteredAndSortedDoctors = useMemo(() => {
    try {
      let result = [...mockDoctors];

      // Apply free-text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query) ||
            doctor.location.toLowerCase().includes(query) ||
            doctor.hospital.toLowerCase().includes(query) ||
            doctor.department.toLowerCase().includes(query)
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
      if (searchDepartment) {
        result = result.filter((doctor) =>
          doctor.department.toLowerCase() === searchDepartment.toLowerCase()
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
    searchQuery,
    searchName,
    searchLocation,
    searchHospital,
    searchSpecialty,
    searchDepartment,
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
    setSearchDepartment('');
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
        Department: doctor.department,
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
      const headers = ['Name', 'Email', 'Mobile', 'Rating', 'Specialty', 'Department', 'Location', 'Hospital'];
      const rows = filteredAndSortedDoctors.map((doctor) => [
        doctor.name,
        doctor.email,
        doctor.mobileNum,
        doctor.rating.toFixed(1),
        doctor.specialty,
        doctor.department,
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
        Department: doctor.department,
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

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen w-full transition-all duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-red-50 dark:border-red-900 text-center">
              <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
              <button
                onClick={() => {
                  clearFilters();
                  setIsFilterOpen(false);
                }}
                className="px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:ring-1 hover:ring-sky-200 active:bg-sky-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
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
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen w-full transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">View All Doctors</h1>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">Search & Filter</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md flex-wrap">
                <div className="relative flex-1 w-full">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:scale-105 transition-transform duration-150" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                    placeholder="Search doctors by name, specialty, or location..."
                    className="w-full pl-10 pr-10 p-2.5 border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 focus:scale-[1.01] outline-none leading-snug"
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
                  <span id="search-desc" className="sr-only">Search doctors by name, specialty, or location</span>
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:ring-1 hover:ring-sky-200 active:bg-sky-700 active:scale-95 transition-all duration-200 w-full sm:w-auto min-w-[120px] text-sm shadow-sm"
                  aria-label="Toggle filter options"
                  aria-expanded={isFilterOpen}
                  aria-controls="filter-panel"
                  aria-describedby="filter-desc"
                >
                  <FaFilter className="text-sm hover:scale-105 transition-transform duration-150" />
                  Filter
                </button>
                <span id="filter-desc" className="sr-only">Toggle advanced filter options for doctors</span>
              </div>
              {isFilterOpen && (
                <div
                  id="filter-panel"
                  ref={filterPanelRef}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm animate-slide-in"
                  role="region"
                  aria-labelledby="filter-heading"
                  aria-hidden={!isFilterOpen}
                >
                  <h3 id="filter-heading" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center tracking-tight">
                    <FaFilter className="text-sky-500 dark:text-sky-300 mr-1.5 text-sm hover:scale-105 transition-transform duration-150" />
                    Filters
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <select
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className={`min-w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-sm leading-snug ${searchName ? 'bg-sky-200 dark:bg-sky-800' : ''}`}
                      aria-label="Filter by specialist"
                      aria-describedby="specialist-desc"
                      aria-controls="doctors-table"
                    >
                      <option value="" className="text-gray-500 italic text-xs">Select Specialist</option>
                      {searchOptions.name.map((name) => (
                        <option key={name} value={name} aria-selected={searchName === name}>{name}</option>
                      ))}
                    </select>
                    <select
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className={`min-w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-sm leading-snug ${searchLocation ? 'bg-sky-200 dark:bg-sky-800' : ''}`}
                      aria-label="Filter by location"
                      aria-describedby="location-desc"
                      aria-controls="doctors-table"
                    >
                      <option value="" className="text-gray-500 italic text-xs">Select Location</option>
                      {searchOptions.location.map((loc) => (
                        <option key={loc} value={loc} aria-selected={searchLocation === loc}>{loc}</option>
                      ))}
                    </select>
                    <select
                      value={searchHospital}
                      onChange={(e) => setSearchHospital(e.target.value)}
                      className={`min-w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-sm leading-snug ${searchHospital ? 'bg-sky-200 dark:bg-sky-800' : ''}`}
                      aria-label="Filter by hospital"
                      aria-describedby="hospital-desc"
                      aria-controls="doctors-table"
                    >
                      <option value="" className="text-gray-500 italic text-xs">Select Hospital</option>
                      {searchOptions.hospital.map((hos) => (
                        <option key={hos} value={hos} aria-selected={searchHospital === hos}>{hos}</option>
                      ))}
                    </select>
                    <select
                      value={searchSpecialty}
                      onChange={(e) => setSearchSpecialty(e.target.value)}
                      className={`min-w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-sm leading-snug ${searchSpecialty ? 'bg-sky-200 dark:bg-sky-800' : ''}`}
                      aria-label="Filter by specialty"
                      aria-describedby="specialty-desc"
                      aria-controls="doctors-table"
                    >
                      <option value="" className="text-gray-500 italic text-xs">Select Specialty</option>
                      {searchOptions.specialty.map((spec) => (
                        <option key={spec} value={spec} aria-selected={searchSpecialty === spec}>{spec}</option>
                      ))}
                    </select>
                    <select
                      value={searchDepartment}
                      onChange={(e) => setSearchDepartment(e.target.value)}
                      className={`min-w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-sm leading-snug ${searchDepartment ? 'bg-sky-200 dark:bg-sky-800' : ''}`}
                      aria-label="Filter by department"
                      aria-describedby="department-desc"
                      aria-controls="doctors-table"
                    >
                      <option value="" className="text-gray-500 italic text-xs">Select Department</option>
                      {searchOptions.department.map((dep) => (
                        <option key={dep} value={dep} aria-selected={searchDepartment === dep}>{dep}</option>
                      ))}
                    </select>
                    <select
                      value={searchRating}
                      onChange={(e) => setSearchRating(e.target.value)}
                      className={`min-w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 focus:border-sky-400 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-all duration-200 hover:bg-sky-50 dark:hover:bg-gray-700 hover:shadow-sm leading-snug ${searchRating ? 'bg-sky-200 dark:bg-sky-800' : ''}`}
                      aria-label="Filter by rating"
                      aria-describedby="rating-desc"
                      aria-controls="doctors-table"
                    >
                      <option value="" className="text-gray-500 italic text-xs">Select Rating</option>
                      {searchOptions.rating.map((rate) => (
                        <option key={rate} value={rate} aria-selected={searchRating === rate}>{rate}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsFilterOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 mt-4 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 hover:shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 active:scale-95 transition-all duration-200 w-full sm:w-auto min-w-[120px] text-sm"
                    aria-label="Clear all filters"
                  >
                    <i className="fas fa-times text-sm text-red-500 hover:scale-105 transition-transform duration-150"></i>
                    Clear Filters
                  </button>
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4" aria-live="polite">
                <div className="flex gap-3">
                  <span className="inline-block bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1.5 rounded-md shadow-sm animate-pulse dark:bg-sky-900 dark:text-sky-300 hover:scale-102 transition-transform duration-200 leading-snug">
                    Showing {filteredAndSortedDoctors.length} doctors
                  </span>
                  <span className="inline-block bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1.5 rounded-md shadow-sm animate-pulse dark:bg-sky-900 dark:text-sky-300 hover:scale-102 transition-transform duration-200 leading-snug">
                    Avg. Rating: {averageRating}/5
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <button
                      ref={downloadButtonRef}
                      onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                      disabled={isDownloading !== null}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 hover:ring-1 hover:ring-sky-200 active:bg-sky-700 active:scale-95 disabled:bg-sky-300 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto min-w-[120px] text-sm shadow-sm"
                      aria-label="Download data"
                      aria-haspopup="true"
                      aria-expanded={isDownloadOpen}
                      data-tooltip-id="download-tooltip"
                      data-tooltip-content="Download data in various formats"
                      data-tooltip-delay-show={200}
                    >
                      {isDownloading ? (
                        <ClipLoader size={16} color="#0ea5e9" className="animate-pulse" />
                      ) : (
                        <FaDownload className="text-sm hover:scale-105 transition-transform duration-150" />
                      )}
                      Download
                    </button>
                    {isDownloadOpen && (
                      <div
                        ref={downloadMenuRef}
                        className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 animate-fade-in"
                        role="menu"
                      >
                        <div
                          onClick={downloadCSV}
                          onKeyDown={(e) => handleKeyDown(e, 'csv')}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 cursor-pointer flex items-center gap-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
                          role="menuitem"
                          tabIndex={0}
                          aria-label="Download as CSV"
                        >
                          <i className="fas fa-file-csv text-sm hover:scale-105 transition-transform duration-150"></i> CSV
                        </div>
                        <div
                          onClick={downloadPDF}
                          onKeyDown={(e) => handleKeyDown(e, 'pdf')}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 cursor-pointer flex items-center gap-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
                          role="menuitem"
                          tabIndex={0}
                          aria-label="Download as PDF"
                        >
                          <i className="fas fa-file-pdf text-sm hover:scale-105 transition-transform duration-150"></i> PDF
                        </div>
                        <div
                          onClick={downloadExcel}
                          onKeyDown={(e) => handleKeyDown(e, 'excel')}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 cursor-pointer flex items-center gap-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1"
                          role="menuitem"
                          tabIndex={0}
                          aria-label="Download as Excel"
                        >
                          <i className="fas fa-file-excel text-sm hover:scale-105 transition-transform duration-150"></i> Excel
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            {filteredAndSortedDoctors.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-snug">No doctors found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <table className="w-full border-collapse" id="doctors-table">
                  <thead>
                    <tr className="bg-sky-50 dark:bg-sky-900 sticky top-0 z-10">
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">Name</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight hidden md:table-cell">Email</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight hidden md:table-cell">Mobile</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">Rating</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">Specialty</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">Department</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">Location</th>
                      <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">Hospital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedDoctors.map((doctor, index) => (
                      <tr
                        key={doctor.id}
                        className={`border-b border-gray-100 dark:border-gray-600 hover:bg-sky-50 dark:hover:bg-sky-900 transition-all duration-150 ${
                          index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''
                        }`}
                      >
                        <td scope="row" className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug font-medium">{doctor.name}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug hidden md:table-cell">{doctor.email}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug hidden md:table-cell">{doctor.mobileNum}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug flex items-center gap-1">
                          {doctor.rating}/5
                          <span className="text-yellow-400 hover:animate-bounce">★</span>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug">{doctor.specialty}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug">{doctor.department}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug">{doctor.location}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-300 text-sm leading-snug">{doctor.hospital}</td>
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
    </div>
  );
};

export default ViewDoctors;