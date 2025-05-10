import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Clock, Phone } from 'lucide-react';

// Define the type for tour plan items
interface TourPlan {
  name: string;
  details: string;
  image: string;
  description: string;
  category: string;
  route: string;
}

const TopTourPlans = () => {
  // Sample tour plan data combining Travel Booking, Appointment Booking, and Spa & Physiotherapy
  const tourPlans: TourPlan[] = [
    {
      name: "Delhi Medical Travel Package",
      details: "Flight + Cardiology Checkup + Spa Therapy",
      image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Includes direct flight to Delhi, a cardiology checkup at Max Hospital, and a therapeutic massage for recovery.",
      category: "Travel Booking",
      route: "/travel",
    },
    {
      name: "Mumbai Neurology Recovery Plan",
      details: "Neurology Consultation + Physiotherapy",
      image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Neurology consultation at Max Hospital Mumbai with post-treatment physiotherapy for optimal recovery.",
      category: "Appointment Booking",
      route: "/appointments",
    },
    {
      name: "Bangalore Wellness Journey",
      details: "Flight + Dermatology + Yoga Therapy",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Direct flight to Bangalore, dermatology appointment, and guided yoga therapy for holistic wellness.",
      category: "Spa & Physiotherapy",
      route: "/spa-physiotherapy",
    },
    {
      name: "Chennai Orthopedic Care Package",
      details: "Flight + Orthopedic Consultation + Hydrotherapy",
      image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Direct flight to Chennai, orthopedic consultation at Max Hospital, and hydrotherapy for joint pain relief.",
      category: "Travel Booking",
      route: "/travel",
    },
  ];

  // Map categories to their respective icons
  const categoryIcons: Record<string, JSX.Element> = {
    "Travel Booking": <Plane className="h-6 w-6 text-indigo-600" />,
    "Appointment Booking": <Clock className="h-6 w-6 text-indigo-600" />,
    "Spa & Physiotherapy": <Phone className="h-6 w-6 text-indigo-600" />,
  };

  return (
    <section className="bg-slate-50 py-12 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-[90%] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Medical Tour Plans
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourPlans.slice(0, 4).map((plan, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center mb-2">
                  <div className="bg-slate-100 p-3 rounded-full shadow-sm mr-3">
                    {categoryIcons[plan.category]}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">{plan.name}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-2">{plan.details}</p>
                <p className="text-gray-500 text-xs italic mb-4">{plan.description}</p>
                <Link
                  to={plan.route}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/tours"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTourPlans;