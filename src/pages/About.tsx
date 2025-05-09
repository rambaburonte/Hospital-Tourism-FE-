import React from 'react';
import { FaHeartbeat, FaHandsHelping, FaShieldAlt, FaUsers } from 'react-icons/fa';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutPage: React.FC = () => {
  // Values data for the "Our Values" section
  const values = [
    {
      title: 'Compassion',
      description: 'We prioritize empathy and care in every interaction, ensuring patients feel supported.',
      icon: <FaHeartbeat className="text-indigo-600 text-3xl mb-4" />,
    },
    {
      title: 'Integrity',
      description: 'Our services are built on trust, transparency, and ethical practices.',
      icon: <FaShieldAlt className="text-indigo-600 text-3xl mb-4" />,
    },
    {
      title: 'Collaboration',
      description: 'We work closely with healthcare providers and travel partners to deliver seamless experiences.',
      icon: <FaHandsHelping className="text-indigo-600 text-3xl mb-4" />,
    },
    {
      title: 'Community',
      description: 'We foster a sense of belonging, connecting patients and providers globally.',
      icon: <FaUsers className="text-indigo-600 text-3xl mb-4" />,
    },
  ];

  // Leaders data for the "Our Leaders" section
  const leaders = [
    {
      name: 'Abhy Soi',
      role: 'Chairman & Managing Director',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
    },
    {
      name: 'Rahul Mehta',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
    },
    {
      name: 'Anita Rao',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d8779911a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
    },
  ];

  // Journey milestones
  const journey = [
    { year: '2015', event: 'Max Healthcare expanded its focus to healthcare tourism.' },
    { year: '2018', event: 'Launched Max@Home for at-home health services.' },
    { year: '2020', event: 'Expanded to 22 facilities across India.' },
    { year: '2023', event: 'Introduced integrated travel and hotel booking features.' },
    { year: '2025', event: 'Reached 35,000+ employees and 5,000+ clinicians.' },
  ];

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        {/* Hero Section with Stats */}
        <section className="relative bg-gradient-to-r from-indigo-700 to-indigo-500 text-white py-16 px-6 lg:px-20">
          <div className="absolute inset-0 bg-opacity-50 bg-black" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=60')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Max Healthcare</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
              <div>
                <p className="text-4xl font-semibold">22</p>
                <p className="text-lg">Facilities</p>
              </div>
              <div>
                <p className="text-4xl font-semibold">5,000+</p>
                <p className="text-lg">Bed Capacity</p>
              </div>
              <div>
                <p className="text-4xl font-semibold">5,000+</p>
                <p className="text-lg">Clinicians</p>
              </div>
              <div>
                <p className="text-4xl font-semibold">35,000+</p>
                <p className="text-lg">Employees</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story with Expansion and Map */}
        <section className="py-12 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Max Healthcare Institute Limited is one of India’s largest healthcare organizations. We operate 22 facilities
                  (5,000+ beds), 30+ specialties, and 5,000+ clinicians across the NCR Delhi, Haryana, Punjab, Uttarakhand,
                  Maharashtra, and Uttar Pradesh. Almost 85% of our bed capacity is in Metro/Tier 1 cities.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Apart from hospitals, Max Healthcare also operates a homecare business and pathology business under brand names
                  Max@Home and Max Labs respectively. Max@Home offers health and wellness services at home while Max Labs
                  provides Pathology Services outside our hospital network.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Max Healthcare is promoted and led by Abhy Soi as its Chairman and Managing Director. The amalgamated company was formed
                  subsequent to the acquisition of a 49.7% stake in Max Healthcare by Radiant Life Care in 2019.
                </p>
              </div>
              <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-800 mb-2">Our Presence</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    {/* Embedded Google Map */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d23504.888780368106!2d78.3938281240379!3d17.433783331510444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1746787425633!5m2!1sen!2sin" 
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Max Healthcare Locations in India"
                    />
                    {/* Location Markers (Overlay) */}
                    <div className="absolute top-4 left-8 bg-white px-2 py-1 rounded shadow z-10">
                      <p className="text-sm font-medium text-indigo-700">NCR: 586</p>
                    </div>
                    <div className="absolute top-6 left-12 bg-white px-2 py-1 rounded shadow z-10">
                      <p className="text-sm font-medium text-indigo-700">BLK: 538</p>
                    </div>
                    <div className="absolute bottom-12 right-8 bg-white px-2 py-1 rounded shadow z-10">
                      <p className="text-sm font-medium text-indigo-700">Mumbai: 450</p>
                    </div>
                    <div className="absolute bottom-10 right-4 bg-white px-2 py-1 rounded shadow z-10">
                      <p className="text-sm font-medium text-indigo-700">Pune: 320</p>
                    </div>
                    <div className="absolute bottom-4 left-12 bg-white px-2 py-1 rounded shadow z-10">
                      <p className="text-sm font-medium text-indigo-700">Chennai: 280</p>
                    </div>
                    <div className="absolute bottom-6 left-16 bg-white px-2 py-1 rounded shadow z-10">
                      <p className="text-sm font-medium text-indigo-700">Bangalore: 410</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Max Healthcare */}
        <section className="py-12 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Why Choose Max Healthcare?</h2>
            <p className="text-gray-700 mb-6">
              Our platform is designed to streamline the entire healthcare and tourism process, ensuring a smooth experience
              for users from search to checkout. With integrated support, scalable design, and secure data management, Max Healthcare
              empowers users to access the right healthcare and travel services effortlessly.
            </p>
          </div>
        </section>

        {/* Chairman's Message */}
        <section className="py-12 px-6 lg:px-20 bg-indigo-50">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
                alt="Chairman Abhy Soi"
                className="rounded-lg shadow-md w-full h-80 object-cover object-top"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Message from Our Chairman</h2>
              <p className="text-gray-700 leading-relaxed">
                At Max Healthcare, our mission is to bridge the gap between healthcare and travel, providing seamless and compassionate
                services to patients worldwide. As Chairman, I am proud to lead a team dedicated to innovation and excellence in
                medical tourism. We are committed to enhancing lives by ensuring access to top-tier healthcare and travel solutions,
                all while maintaining the highest standards of care and integrity.
              </p>
              <p className="text-gray-700 mt-4 italic">— Abhy Soi, Chairman & Managing Director</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300"
                >
                  {value.icon}
                  <h3 className="text-xl font-medium text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Leaders */}
        <section className="py-12 px-6 lg:px-20 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">Our Leaders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{leader.name}</h3>
                    <p className="text-gray-600 text-sm">{leader.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Journey */}
        <section className="py-12 px-6 lg:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">Our Journey</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200" />
              {journey.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 px-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-indigo-700">{milestone.year}</h3>
                      <p className="text-gray-600">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-1/2 px-4">
                    {/* Empty space for alternating layout */}
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
     
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;