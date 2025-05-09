import React, { useState, useEffect } from 'react';
import { FaHospital, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AllDoctorsPage = () => {
  const [groupedDoctors, setGroupedDoctors] = useState({});
  const [filteredDoctors, setFilteredDoctors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const staticDoctors = [
    {
      id: 1,
      name: 'Dr. Ayesha Khan',
      specialization: 'Cardiologist',
      hospitalName: 'Apollo Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Expert in cardiovascular diseases with 10+ years of pectin.',
    },
    {
      id: 2,
      name: 'Dr. Rohan Mehta',
      specialization: 'Neurologist',
      hospitalName: 'Apollo Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Specializes in neurological disorders and brain health.',
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialization: 'Dermatologist',
      hospitalName: 'Fortis Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Renowned for skin care and cosmetic dermatology.',
    },
    {
      id: 4,
      name: 'Dr. Arjun Patel',
      specialization: 'Pediatrician',
      hospitalName: 'Fortis Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Dedicated to child health and development.',
    },
    {
      id: 5,
      name: 'Dr. Neha Verma',
      specialization: 'Psychiatrist',
      hospitalName: 'Max Healthcare',
      imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
      bio: 'Focuses on mental health and therapy.',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const grouped = staticDoctors.reduce((acc, doctor) => {
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

  useEffect(() => {
    const filtered = Object.entries(groupedDoctors).reduce((acc, [hospital, doctors]) => {
      const filteredDocs = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredDocs.length > 0) acc[hospital] = filteredDocs;
      return acc;
    }, {});
    setFilteredDoctors(filtered);
  }, [searchTerm, groupedDoctors]);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-6 md:px-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-8 flex items-center gap-4"
      >
        <FaHospital className="text-blue-700" /> Find Your Doctor
      </motion.h1>

      <div className="relative mb-10">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, specialization, or hospital..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          aria-label="Search doctors"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      ) : (
        <AnimatePresence>
          {Object.entries(filteredDoctors).length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-600 text-lg"
            >
              No doctors found matching your search.
            </motion.p>
          ) : (
            Object.entries(filteredDoctors).map(([hospital, doctors]) => (
              <motion.div
                key={hospital}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
                  {hospital}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {doctors.map((doctor) => (
                    <motion.div
                      key={doctor.id}
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-blue-500"
                    >
                      <div className="p-6 flex flex-col items-center text-center">
                        <img
                          src={doctor.imageUrl || 'https://via.placeholder.com/150'}
                          alt={doctor.name}
                          className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white shadow-sm"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{doctor.specialization}</p>
                        <span className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          {doctor.specialization}
                        </span>
                        <div className="mt-5 flex gap-3">
                          <button
                            onClick={() => openModal(doctor)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                            aria-label={`View profile of ${doctor.name}`}
                          >
                            View Profile
                          </button>
                          <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm"
                            aria-label={`Book appointment with ${doctor.name}`}
                          >
                            Book Appointment
                          </button>
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
        className="bg-white rounded-2xl p-8 max-w-lg mx-auto mt-20 shadow-2xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedDoctor && (
          <div className="text-center">
            <img
              src={selectedDoctor.imageUrl || 'https://via.placeholder.com/150'}
              alt={selectedDoctor.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{selectedDoctor.name}</h2>
            <p className="text-gray-500">{selectedDoctor.specialization}</p>
            <p className="text-gray-600 mt-2">{selectedDoctor.hospitalName}</p>
            <p className="text-gray-600 mt-4">{selectedDoctor.bio}</p>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllDoctorsPage;