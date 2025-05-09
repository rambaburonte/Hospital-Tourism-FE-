import React from 'react';
import { FaUsers, FaCalendarAlt, FaCommentDots, FaPlane, FaHotel, FaGift } from 'react-icons/fa';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define TypeScript interface for each service specialty
interface Specialty {
  title: string;
  description: string;
  icon: JSX.Element; // React Icon component
  imageUrl: string; // Image URL for card background
}

// Sample data for specialties with realistic Unsplash images
const specialties: Specialty[] = [
  {
    title: 'Personalized Experience',
    description: 'Get custom suggestions for travel destinations, doctors, spa services, and more based on your preferences and past activities.',
    icon: <FaUsers />,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Seamless Booking & Scheduling',
    description: 'Book flights, hotels, health consultations, and more in just a few clicks. Manage your bookings and reschedule as needed.',
    icon: <FaCalendarAlt />,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Enhanced Communication Tools',
    description: 'Chat directly with doctors, service providers, or customer support for real-time inquiries and requests.',
    icon: <FaCommentDots />,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Flight Booking',
    description: 'Search and book flights quickly, with information on available airlines, schedules, and pricing.',
    icon: <FaPlane />,
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Hotel Booking',
    description: 'Browse and book hotels, view room options, amenities, and pricing for your stay.',
    icon: <FaHotel />,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Exclusive Offers & Discounts',
    description: 'Access to special deals, promo codes, and discounts on travel, health services, and more.',
    icon: <FaGift />,
    imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
];

// The component for rendering the specialties
const SpecialtiesPage: React.FC = () => {
  return (
    <>
   
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Specialties</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the unique features and services we offer to enhance your travel and health experiences.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Card Image with Overlay */}
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${specialty.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                  <div className="text-white text-4xl">{specialty.icon}</div>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{specialty.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{specialty.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </>
  );
};

export default SpecialtiesPage;