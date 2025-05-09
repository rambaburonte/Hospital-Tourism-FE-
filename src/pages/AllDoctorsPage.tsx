import React, { useState, useEffect } from 'react';
import { FaHospital } from 'react-icons/fa';

const AllDoctorsPage = () => {
  const [groupedDoctors, setGroupedDoctors] = useState({});

  // Static doctor data
  const staticDoctors = [
    {
      id: 1,
      name: 'Dr. Ayesha Khan',
      specialization: 'Cardiologist',
      hospitalName: 'Apollo Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      name: 'Dr. Rohan Mehta',
      specialization: 'Neurologist',
      hospitalName: 'Apollo Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialization: 'Dermatologist',
      hospitalName: 'Fortis Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 4,
      name: 'Dr. Arjun Patel',
      specialization: 'Pediatrician',
      hospitalName: 'Fortis Hospital',
      imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      id: 5,
      name: 'Dr. Neha Verma',
      specialization: 'Psychiatrist',
      hospitalName: 'Max Healthcare',
      imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
    },
  ];

  useEffect(() => {
    const grouped = staticDoctors.reduce((acc, doctor) => {
      const hospital = doctor.hospitalName || 'Unknown Hospital';
      if (!acc[hospital]) acc[hospital] = [];
      acc[hospital].push(doctor);
      return acc;
    }, {});
    setGroupedDoctors(grouped);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-3">
        <FaHospital /> All Doctors by Hospital
      </h1>

      {Object.entries(groupedDoctors).map(([hospital, doctors]) => (
        <div key={hospital} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">{hospital}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-xl transition duration-300"
              >
                <img
                  src={doctor.imageUrl || 'https://via.placeholder.com/150'}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-blue-500"
                />
                <h3 className="text-lg font-semibold text-center text-gray-800">{doctor.name}</h3>
                <p className="text-center text-sm text-gray-600">{doctor.specialization}</p>
                <div className="mt-3 flex justify-center">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDoctorsPage;
