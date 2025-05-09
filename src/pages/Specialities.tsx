import React from 'react';
import { FaHeartbeat, FaBrain, FaStethoscope, FaTooth, FaBaby, FaLungs } from 'react-icons/fa';

const specialities = [
  { icon: <FaHeartbeat />, name: 'Cardiology', description: 'Heart and blood vessel care' },
  { icon: <FaBrain />, name: 'Neurology', description: 'Nervous system and brain disorders' },
  { icon: <FaStethoscope />, name: 'General Medicine', description: 'Primary and internal care' },
  { icon: <FaTooth />, name: 'Dentistry', description: 'Oral and dental treatments' },
  { icon: <FaBaby />, name: 'Pediatrics', description: 'Child and newborn health' },
  { icon: <FaLungs />, name: 'Pulmonology', description: 'Lung and respiratory treatment' },
];

const Specialities = () => {
  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Our Specialities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialities.map((spec, index) => (
          <div
            key={index}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <div className="text-4xl text-blue-600 mb-4">{spec.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{spec.name}</h2>
            <p className="text-gray-600 text-sm">{spec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialities;
