
import React, { useState, useEffect, useMemo } from 'react';
import {
  FaSearch,
  FaTimes,
  FaStar,
  FaMapMarkerAlt,
  FaGlobe,
  FaHeart,
  FaBrain,
  FaStethoscope,
  FaBaby,
  FaHeadSideVirus,
  FaUserMd,
  FaChevronDown,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import Select, { SingleValue } from 'react-select';

Modal.setAppElement('#root');

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  hospitalName: string;
  imageUrl: string;
  bio: string;
  rating: number;
  availableToday: boolean;
  gender: 'Male' | 'Female';
  experience: number;
  languages: string[];
}

interface SpecializationOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const AllDoctorsPage: React.FC = () => {
  const [groupedDoctors, setGroupedDoctors] = useState<{ [key: string]: Doctor[] }>({});
  const [filteredDoctors, setFilteredDoctors] = useState<{ [key: string]: Doctor[] }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [specializationFilter, setSpecializationFilter] = useState<SingleValue<SpecializationOption>>(null);
  const [hospitalFilter, setHospitalFilter] = useState('All Hospitals');
  const [quickFilter, setQuickFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState<'All' | '0-5 Years' | '5-10 Years' | '10+ Years'>('All');
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const staticDoctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Ayesha Khan',
      specialization: 'Cardiologist',
      hospitalName: 'Apollo Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Expert in cardiovascular diseases with 12 years of experience.',
      rating: 4.8,
      availableToday: true,
      gender: 'Female',
      experience: 12,
      languages: ['English', 'Hindi'],
    },
    {
      id: 2,
      name: 'Dr. Rohan Mehta',
      specialization: 'Neurologist',
      hospitalName: 'Apollo Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Specializes in neurological disorders and brain health.',
      rating: 4.5,
      availableToday: false,
      gender: 'Male',
      experience: 8,
      languages: ['English', 'Hindi', 'Spanish'],
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialization: 'Dermatologist',
      hospitalName: 'Fortis Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Renowned for skin care and cosmetic dermatology.',
      rating: 4.9,
      availableToday: true,
      gender: 'Female',
      experience: 15,
      languages: ['English'],
    },
    {
      id: 4,
      name: 'Dr. Arjun Patel',
      specialization: 'Pediatrician',
      hospitalName: 'Fortis Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Dedicated to child health and development.',
      rating: 4.7,
      availableToday: true,
      gender: 'Male',
      experience: 6,
      languages: ['English', 'Hindi'],
    },
    {
      id: 5,
      name: 'Dr. Neha Verma',
      specialization: 'Psychiatrist',
      hospitalName: 'Max Healthcare',
      imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
      bio: 'Focuses on mental health and therapy.',
      rating: 4.6,
      availableToday: false,
      gender: 'Female',
      experience: 4,
      languages: ['English', 'Hindi', 'Spanish'],
    },
  ];

  const specializations: SpecializationOption[] = useMemo(
    () => [
      { value: '', label: 'All Specializations', icon: <FaGlobe className="text-sm" /> },
      ...[...new Set(staticDoctors.map((d) => d.specialization))]
        .sort()
        .map((spec) => ({
          value: spec,
          label: spec,
          icon: getSpecializationIcon(spec),
        })),
    ],
    []
  );

  const hospitals = useMemo(
    () => ['All Hospitals', ...[...new Set(staticDoctors.map((d) => d.hospitalName))].sort()],
    []
  );

  function getSpecializationIcon(spec: string): React.ReactNode {
    const icons: { [key: string]: React.ReactNode } = {
      Cardiologist: <FaHeart className="text-sm" />,
      Neurologist: <FaBrain className="text-sm" />,
      Dermatologist: <FaStethoscope className="text-sm" />,
      Pediatrician: <FaBaby className="text-sm" />,
      Psychiatrist: <FaHeadSideVirus className="text-sm" />,
    };
    return icons[spec] || <FaUserMd className="text-sm" />;
  }

  useEffect(() => {
    setTimeout(() => {
      const grouped = staticDoctors.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
        const hospital = doctor.hospitalName || 'Unknown Hospital';
        if (!acc[hospital]) acc[hospital] = [];
        acc[hospital].push(doctor);
        return acc;
      }, {});
      setGroupedDoctors(grouped);
      setFilteredDoctors(grouped);
      setIsLoading(false);
    }, 1000);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowFeedback('Search cleared!');
    setTimeout(() => setShowFeedback(null), 2000);
  };

  useEffect(() => {
    const filtered = Object.entries(groupedDoctors).reduce((acc: { [key: string]: Doctor[] }, [hospital, doctors]) => {
      const filteredDocs = doctors.filter(
        (doctor) =>
          (searchTerm === '' ||
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (!specializationFilter || doctor.specialization === specializationFilter.value) &&
          (hospitalFilter === 'All Hospitals' || hospital === hospitalFilter) &&
          (quickFilter === '' ||
            (quickFilter === 'top-rated' && doctor.rating >= 4.8) ||
            (quickFilter === 'available-today' && doctor.availableToday)) &&
          (experienceFilter === 'All' ||
            (experienceFilter === '0-5 Years' && doctor.experience <= 5) ||
            (experienceFilter === '5-10 Years' && doctor.experience > 5 && doctor.experience <= 10) ||
            (experienceFilter === '10+ Years' && doctor.experience > 10))
      );
      if (filteredDocs.length > 0) acc[hospital] = filteredDocs;
      return acc;
    }, {});

    setFilteredDoctors(filtered);
  }, [searchTerm, specializationFilter, hospitalFilter, quickFilter, experienceFilter, groupedDoctors]);

  const openModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDoctor(null);
  };

  const clearFilters = () => {
    setSpecializationFilter(null);
    setHospitalFilter('All Hospitals');
    setSearchTerm('');
    setQuickFilter('');
    setExperienceFilter('All');
    setShowFeedback('Filters cleared!');
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const totalDoctors = Object.values(filteredDoctors).reduce((sum, doctors) => sum + doctors.length, 0);

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      border: '1px solid #d1d5db',
      padding: '0.25rem',
      backgroundColor: '#f9fafb',
      boxShadow: 'none',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      minHeight: '2.25rem',
      '&:hover': { borderColor: '#2563eb' },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontSize: '0.875rem',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#eff6ff' : '#fff',
      color: state.isSelected ? '#fff' : '#1a202c',
      fontSize: '0.875rem',
    }),
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-teal-100 py-10 px-4 sm:px-8 lg:px-20 font-inter"
      data-testid="all-doctors-page"
    >
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          data-testid="feedback-toast"
        >
          {showFeedback}
        </motion.div>
      )}
      <div
        className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg rounded-xl shadow-md p-4 mb-8"
        data-testid="filter-bar"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="relative">
            <label
              htmlFor="search"
              id="search-label"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/4 text-gray-500 text-base" />
            {searchTerm && (
              <FaTimes
                className="absolute right-3 top-1/2 transform -translate-y-1/4 text-gray-500 cursor-pointer hover:text-gray-700 text-base"
                onClick={clearSearch}
                aria-label="Clear search"
                data-testid="clear-search"
              />
            )}
            <input
              id="search"
              type="text"
              placeholder="Name, specialization, hospital"
              defaultValue={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm text-gray-800 placeholder-gray-500"
              aria-label="Search doctors"
              aria-describedby="search-label"
              data-testid="search-input"
            />
          </div>
          <div>
            <label
              htmlFor="specialization"
              id="specialization-label"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Specialization
            </label>
            <Select
              id="specialization"
              options={specializations}
              value={specializationFilter}
              onChange={setSpecializationFilter}
              placeholder="All Specializations"
              styles={selectStyles}
              formatOptionLabel={({ label, icon }) => (
                <div className="flex items-center gap-2">
                  {icon}
                  <span>{label}</span>
                </div>
              )}
              aria-label="Filter by specialization"
              aria-describedby="specialization-label"
              data-testid="specialization-filter"
            />
          </div>
          <div>
            <label
              htmlFor="hospital"
              id="hospital-label"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Hospital
            </label>
            <select
              id="hospital"
              value={hospitalFilter}
              onChange={(e) => setHospitalFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm text-gray-800"
              aria-label="Filter by hospital"
              aria-describedby="hospital-label"
              data-testid="hospital-filter"
            >
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="sm:hidden mb-2">
          <button
            onClick={toggleFilterPanel}
            className="w-full bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-all duration-200 text-sm font-medium"
            aria-label={isFilterOpen ? 'Hide filters' : 'Show filters'}
            data-testid="toggle-filter-panel"
          >
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            <motion.span
              animate={{ rotate: isFilterOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              data-testid="filter-toggle-icon"
            >
              <FaChevronDown className="text-base" />
            </motion.span>
          </button>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isFilterOpen || window.innerWidth >= 640 ? 'auto' : 0,
            opacity: isFilterOpen || window.innerWidth >= 640 ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden sm:block"
        >
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="w-full sm:w-1/3">
              <label
                htmlFor="experience"
                id="experience-label"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Experience
              </label>
              <select
                id="experience"
                value={experienceFilter}
                onChange={(e) =>
                  setExperienceFilter(e.target.value as 'All' | '0-5 Years' | '5-10 Years' | '10+ Years')
                }
                className="w-full rounded-lg border border-gray-300 p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm text-gray-800"
                aria-label="Filter by experience"
                aria-describedby="experience-label"
                data-testid="experience-filter"
              >
                {['All', '0-5 Years', '5-10 Years', '10+ Years'].map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-3">
              <button
                onClick={() => setQuickFilter(quickFilter === 'top-rated' ? '' : 'top-rated')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  quickFilter === 'top-rated'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                aria-label="Filter top-rated doctors"
                data-testid="quick-filter-top-rated"
              >
                Top Rated
              </button>
              <button
                onClick={() => setQuickFilter(quickFilter === 'available-today' ? '' : 'available-today')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  quickFilter === 'available-today'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                aria-label="Filter doctors available today"
                data-testid="quick-filter-available-today"
              >
                Available Today
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-xs text-gray-600" data-testid="filter-summary">
              Showing {totalDoctors} doctor{totalDoctors !== 1 ? 's' : ''}{' '}
              {specializationFilter?.label &&
                specializationFilter.label !== 'All Specializations' &&
                `for ${specializationFilter.label}`}
              {hospitalFilter !== 'All Hospitals' && ` at ${hospitalFilter}`}
              {[
                experienceFilter !== 'All' && `${experienceFilter}`,
                quickFilter === 'top-rated' && 'top rated',
                quickFilter === 'available-today' && 'available today',
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
            {(searchTerm ||
              specializationFilter?.value ||
              hospitalFilter !== 'All Hospitals' ||
              quickFilter ||
              experienceFilter !== 'All') && (
              <button
                onClick={clearFilters}
                className="text-blue-700 hover:text-blue-800 text-xs font-medium transition-colors duration-200"
                aria-label="Clear all filters"
                data-testid="clear-filters"
              >
                Clear All
              </button>
            )}
          </div>
        </motion.div>
      </div>
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          data-testid="loading-skeleton"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 mx-auto mb-4"></div>
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/4 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          {Object.entries(filteredDoctors).length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
              data-testid="no-results"
            >
              <p className="text-lg text-gray-700 font-medium">
                No doctors found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-700 hover:text-blue-800 text-sm font-medium underline"
                aria-label="Clear all filters"
              >
                Clear Filters and Try Again
              </button>
            </motion.div>
          ) : (
            Object.entries(filteredDoctors).map(([hospital, doctors]) => (
              <motion.div
                key={hospital}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
                data-testid={`hospital-section-${hospital}`}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
                  {hospital}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {doctors.map((doctor: Doctor) => (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-600 hover:border-blue-700 transition-all duration-300"
                      data-testid={`doctor-card-${doctor.id}`}
                    >
                      <div className="p-6 flex flex-col items-center text-center relative">
                        <img
                          src={doctor.imageUrl || 'https://via.placeholder.com/150'}
                          alt={doctor.name}
                          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                          loading="lazy"
                          onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                        />
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{doctor.specialization}</p>
                        <p className="text-xs text-gray-500 mt-1">{doctor.experience} years experience</p>
                        <div className="flex items-center gap-1 mt-2">
                          <FaStar className="text-yellow-400" />
                          <span className="text-sm text-gray-600">{doctor.rating}</span>
                        </div>
                        <span
                          className={`mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                            doctor.availableToday ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {doctor.availableToday ? 'Available Today' : 'Next Available Tomorrow'}
                        </span>
                        <div className="mt-5 flex gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openModal(doctor)}
                            className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-sm text-sm font-medium"
                            aria-label={`View profile of ${doctor.name}`}
                            data-testid={`view-profile-${doctor.id}`}
                          >
                            View Profile
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => console.log(`Book appointment for ${doctor.name}`)}
                            className="bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition-all duration-300 shadow-sm text-sm font-medium"
                            aria-label={`Book appointment with ${doctor.name}`}
                            data-testid={`book-appointment-${doctor.id}`}
                          >
                            Book Appointment
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 max-w-lg mx-auto mt-24 shadow-2xl relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
        data-testid="doctor-modal"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
          data-testid="modal-close-icon"
        >
          <FaTimes className="text-xl" />
        </button>
        {selectedDoctor && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <img
              src={selectedDoctor.imageUrl || 'https://via.placeholder.com/150'}
              alt={selectedDoctor.name}
              className="w-36 h-36 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-lg"
            />
            <h2 className="text-2xl font-semibold text-gray-900">{selectedDoctor.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{selectedDoctor.specialization}</p>
            <div className="flex items-center justify-center gap-1 mt-3">
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-gray-600">{selectedDoctor.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mt-3 flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" /> {selectedDoctor.hospitalName}
            </p>
            <p className="text-gray-700 mt-4 text-sm text-left leading-relaxed">{selectedDoctor.bio}</p>
            <p className="text-sm text-gray-600 mt-3">
              {selectedDoctor.availableToday ? 'Available Today' : 'Next Available Tomorrow'}
            </p>
            <p className="text-sm text-gray-600 mt-2">Experience: {selectedDoctor.experience} years</p>
            <p className="text-sm text-gray-600 mt-2">
              Languages: {selectedDoctor.languages.join(', ')}
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium"
                aria-label="Close modal"
                data-testid="modal-close"
              >
                Close
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => console.log(`Book appointment for ${selectedDoctor.name}`)}
                className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-all duration-300 text-sm font-medium"
                aria-label={`Book appointment with ${selectedDoctor.name}`}
                data-testid="modal-book-appointment"
              >
                Book Appointment
              </motion.button>
            </div>
          </motion.div>
        )}
      </Modal>
    </div>
  );
};

export default AllDoctorsPage;
