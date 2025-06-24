import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { BASE_URL } from '@/config/config';

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  hospitalMap?: string; // Optional map URL
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/getall/hospitals`);
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data: Hospital[] = await response.json();
        setHospitals(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading hospitals...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="text-red-500 bg-red-100 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-semibold">Error: {error}</p>
          <Button
            className="mt-4 bg-primary hover:bg-primary-dark"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <main className="flex-grow p-6 sm:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Hospitals</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover our network of world-class hospitals across India, offering top-tier medical care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitals.map((hospital) => (
              <div
                key={hospital.hospitalId}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={hospital.hospitalImage}
                    alt={hospital.hospitalName}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {hospital.hospitalName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {hospital.address}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-gray-600 dark:text-gray-300">{hospital.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {hospital.hospitalDescription}
                  </p>
                  {hospital.hospitalMap && (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={hospital.hospitalMap}
                        className="w-full h-48 border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${hospital.hospitalName}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HospitalList;