import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/config";

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  hospitalMap?: string;
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();
  // const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<Hospital[]>(`${BASE_URL}/api/hospitals/getall/hospitals`);
        setHospitals(response.data);
      } catch (err) {
        setError("Failed to load hospitals.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const cities = useMemo(() => {
    const citySet = new Set<string>();
    hospitals.forEach((hospital) => {
      const parts = hospital.address.split(",");
      if (parts.length >= 1) {
        citySet.add(parts[0].trim()); // use first part as city
      }
    });
    return ["All Cities", ...Array.from(citySet).sort()];
  }, [hospitals]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchesSearch =
        hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "All Cities" ||
        selectedCity === "" ||
        hospital.address.includes(selectedCity);

      return matchesSearch && matchesCity;
    });
  }, [hospitals, searchQuery, selectedCity]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="flex-grow p-6 sm:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Top Hospitals in India
            </h1>
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or address..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && filteredHospitals.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              No hospitals found matching your criteria.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.hospitalId}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <img
                  src={hospital.hospitalImage || "https://via.placeholder.com/300x200?text=Hospital+Image"}
                  alt={hospital.hospitalName}
                  className="w-full h-48 object-cover cursor-pointer"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Hospital+Image";
                  }}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {hospital.hospitalName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{hospital.hospitalDescription}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <strong>Address:</strong> {hospital.address}
                  </p>
                  <button
                    onClick={() => navigate(`/hospitaldoctors/${hospital.hospitalId}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Doctors
                  </button>
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
