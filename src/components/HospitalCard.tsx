import React from 'react';

interface Hospital {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
}

interface Props {
  hospital: Hospital;
}

const HospitalCard: React.FC<Props> = ({ hospital }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
        <p className="text-gray-600 mb-1">{hospital.location}</p>
        <p className="text-gray-700">{hospital.description}</p>
      </div>
    </div>
  );
};

export default HospitalCard;
