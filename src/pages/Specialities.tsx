import React from 'react';
import { FaHeartbeat, FaBrain, FaStethoscope, FaTooth, FaBaby, FaLungs, FaBone, FaVenus, FaVial, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const specialities = [
  { icon: <FaHeartbeat />, name: 'Cardiology', description: 'Heart and blood vessel care', path: '/specialties/cardiology' },
  { icon: <FaBrain />, name: 'Neurology', description: 'Nervous system and brain disorders', path: '/specialties/neurology' },
  { icon: <FaBone />, name: 'Orthopedics', description: 'Bones, joints, and muscles', path: '/specialties/orthopedics' },
  { icon: <FaVenus />, name: 'Gynecology', description: 'Women’s reproductive health', path: '/specialties/gynecology' },
  { icon: <FaVial />, name: 'Oncology', description: 'Cancer diagnosis and treatment', path: '/specialties/oncology' },
  { icon: <FaStethoscope />, name: 'General Medicine', description: 'Primary and internal care', path: '#' },
  { icon: <FaTooth />, name: 'Dentistry', description: 'Oral and dental treatments', path: '#' },
  { icon: <FaBaby />, name: 'Pediatrics', description: 'Child and newborn health', path: '/specialties/pediatrics' },
  { icon: <FaLungs />, name: 'Pulmonology', description: 'Lung and respiratory treatment', path: '#' },
  { icon: <FaUserMd />, name: 'Gastroenterology', description: 'Digestive system care', path: '/specialties/gastroenterology' },
  { icon: <FaUserMd />, name: 'Urology', description: 'Urinary tract and male health', path: '/specialties/urology' },
];

const Specialities = () => {
  return (
    <div className="min-h-screen bg-white px-6 md:px-20 py-12">
      <h1 className="text-4xl font-bold text-center text-[#499E14] mb-10">Our Specialities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialities.map((spec, index) => (
          <Link
            to={spec.path}
            key={index}
            className={[
              'bg-[#f0f8e8] border border-[#d0e8b8] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 block',
              spec.path === '#' ? 'pointer-events-none opacity-60' : ''
            ].join(' ')}
          >
            <div className="text-4xl text-[#499E14] mb-4">{spec.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{spec.name}</h2>
            <p className="text-gray-600 text-sm">{spec.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Specialities;
