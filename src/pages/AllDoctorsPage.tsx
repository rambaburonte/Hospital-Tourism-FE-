import React, { useState, useEffect, useMemo } from 'react';
import {
  FaSearch, FaTimes, FaStar, FaMapMarkerAlt, FaGlobe, FaHeart,
  FaBrain, FaStethoscope, FaBaby, FaHeadSideVirus, FaUserMd,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import debounce from 'lodash.debounce';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

Modal.setAppElement('#root');

interface Hospital {
  hospitalId: number;
  hositalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
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

  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  // const base_url="https://healthtourism-5.onrender.com"
  const fetchDoctors = async () => {
    try {
      const response = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
      const doctors = response.data;
      setAllDoctors(doctors);

      const grouped = doctors.reduce((acc: { [key: string]: Doctor[] }, doctor) => {
        const hospitalName = doctor.hospital?.hositalName || 'Unknown Hospital';
        if (!acc[hospitalName]) acc[hospitalName] = [];
        acc[hospitalName].push(doctor);
        return acc;
      }, {});
      setGroupedDoctors(grouped);
      setFilteredDoctors(grouped);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
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

  const getSpecializationIcon = (spec: string): React.ReactNode => {
    const icons: { [key: string]: React.ReactNode } = {
      Orthopedic: <FaHeart />,
      Neurology: <FaBrain />,
      Dermatology: <FaStethoscope />,
      Pediatrician: <FaBaby />,
      Psychiatrist: <FaHeadSideVirus />,
    };
    return icons[spec] || <FaUserMd />;
  };

  const specializations: SpecializationOption[] = useMemo(() => {
    const uniqueSpecs = Array.from(new Set(allDoctors.map((d) => d.department)));
    return [
      { value: '', label: 'All Specializations', icon: <FaGlobe /> },
      ...uniqueSpecs.map((spec) => ({
        value: spec,
        label: spec,
        icon: getSpecializationIcon(spec),
      })),
    ];
  }, [allDoctors]);

  const hospitals = useMemo(() => {
    return ['All Hospitals', ...Array.from(new Set(allDoctors.map((d) => d.hospital?.hositalName || 'Unknown Hospital')))];
  }, [allDoctors]);

  useEffect(() => {
    const filtered = Object.entries(groupedDoctors).reduce((acc: { [key: string]: Doctor[] }, [hospital, doctors]) => {
      const filteredDocs = doctors.filter((doctor) =>
        (searchTerm === '' ||
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!specializationFilter || doctor.department === specializationFilter.value) &&
        (hospitalFilter === 'All Hospitals' || hospital === hospitalFilter)
      );
      if (filteredDocs.length > 0) acc[hospital] = filteredDocs;
      return acc;
    }, {});
    setFilteredDoctors(filtered);
  }, [searchTerm, specializationFilter, hospitalFilter, groupedDoctors]);

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

  const totalDoctors = Object.values(filteredDoctors).reduce((sum, docs) => sum + docs.length, 0);

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      border: '1px solid #d1d5db',
      backgroundColor: '#f9fafb',
      fontSize: '0.875rem',
      minHeight: '2.25rem',
      '&:hover': { borderColor: '#2563eb' },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      backgroundColor: '#fff',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#eff6ff' : '#fff',
      color: state.isSelected ? '#fff' : '#1a202c',
    }),
  };

  return (
    <div className="p-4 md:ml-64">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Doctors ({totalDoctors})</h2>
        <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">Clear Filters</button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search doctors..."
          className="w-full md:w-1/3 p-2 border rounded"
          onChange={handleSearchChange}
        />
        <Select
          options={specializations}
          value={specializationFilter}
          onChange={setSpecializationFilter}
          styles={selectStyles}
          isClearable
          placeholder="Filter by specialization"
        />
        <select
          value={hospitalFilter}
          onChange={(e) => setHospitalFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border rounded"
        >
          {hospitals.map((hospital, index) => (
            <option key={index} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(filteredDoctors).map(([hospitalName, doctors]) => (
        <div key={hospitalName} className="mb-6">
          <h3 className="text-lg font-bold mb-2">{hospitalName}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                onClick={() => openModal(doctor)}
              >
                <img src={doctor.profilepic} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
                <h4 className="text-center font-semibold">{doctor.name}</h4>
                <p className="text-sm text-center text-gray-600">{doctor.department}</p>
                <p className="text-sm text-center text-yellow-600"><FaStar className="inline" /> {doctor.rating}</p>
                    <button
                      onClick={() => alert(`Booking appointment with ${doctor.name}`)}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Book Appointment
                    </button>
                  
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="modal-overlay">
        {selectedDoctor && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{selectedDoctor.name}</h2>
            <img src={selectedDoctor.profilepic} alt={selectedDoctor.name} className="w-32 h-32 rounded-full mb-2" />
            <p><strong>Specialization:</strong> {selectedDoctor.department}</p>
            <p><strong>Rating:</strong> {selectedDoctor.rating}</p>
            <p><strong>Description:</strong> {selectedDoctor.description}</p>
            <p><strong>Hospital:</strong> {selectedDoctor.hospital.hositalName}</p>
            <p><strong>Address:</strong> {selectedDoctor.hospital.address}</p>
            <button onClick={closeModal} className="mt-4 text-sm text-red-600 hover:underline">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllDoctorsPage;
