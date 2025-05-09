import React from 'react';
import HospitalCard from '../components/HospitalCard';

interface Hospital {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: 'Apollo Hospitals',
    category: 'Cardiology',
    location: 'Hyderabad, India',
    image: '/images/apollo.jpg',
    description: 'Leading heart care center with advanced facilities.',
  },
  {
    id: 2,
    name: 'Fortis Hospital',
    category: 'Neurology',
    location: 'Delhi, India',
    image: '/images/fortis.jpg',
    description: 'Expert neurology treatments and patient care.',
  },
  {
    id: 3,
    name: 'Rainbow Children’s Hospital',
    category: 'Pediatrics',
    location: 'Bangalore, India',
    image: '/images/rainbow.jpg',
    description: 'Comprehensive child healthcare services.',
  },
  {
    id: 4,
    name: 'AIIMS',
    category: 'Oncology',
    location: 'New Delhi, India',
    image: '/images/aiims.jpg',
    description: 'Premier institute for cancer treatment and research.',
  },
  {
    id: 5,
    name: 'Care Hospitals',
    category: 'Orthopedics',
    location: 'Hyderabad, India',
    image: '/images/care.jpg',
    description: 'Specialized in bone and joint care.',
  },
  // Add more hospital entries as needed
];

const categories = Array.from(new Set(hospitals.map(hospital => hospital.category)));

const OurHospitals: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Hospitals</h1>
      {categories.map(category => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hospitals
              .filter(hospital => hospital.category === category)
              .map(hospital => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default OurHospitals;
