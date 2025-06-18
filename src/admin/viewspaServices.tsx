import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar'; // Adjust the path as needed
import { BASE_URL } from '@/config/config';
interface SpaService {
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  rating: string;
  price: string;
}

const SpaServicesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [services, setServices] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE_URL}/spaServices/bySpaCenter/${id}`)
        .then((res) => {
          setServices(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch spa services:', err);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />

      {/* Main content with margin to prevent sidebar overlap */}
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Spa Services for Spa Center ID: {id}
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading spa services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-500">No services available for this spa center.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {service.serviceImage && (
                  <img
                    src={service.serviceImage}
                    alt={service.serviceName}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-800">{service.serviceName}</h2>
                <p className="text-gray-600 mt-2">{service.serviceDescription}</p>
                <p className="mt-2 text-sm text-gray-500">Rating: {service.rating}</p>
                <p className="text-sm text-green-600 font-bold">Price: ₹{service.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaServicesPage;
