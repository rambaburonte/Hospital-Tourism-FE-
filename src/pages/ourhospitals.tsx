import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface Hospital {
  id: string;
  hospital: string;
  address: string;
  pictureUrl: string;
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<Hospital[]>("http://localhost:8080/api/hospitals");
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

  // Extract unique cities from addresses
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    hospitals.forEach((hospital) => {
      // Assume address format: "Street, City, State"
      const cityMatch = hospital.address.match(/,\s*([^,]+),\s*[^,]+$/);
      if (cityMatch) citySet.add(cityMatch[1].trim());
    });
    return ["All Cities", ...Array.from(citySet).sort()];
  }, [hospitals]);

  // Filter hospitals based on search query and selected city
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchesSearch =
        hospital.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                  aria-label="Search hospitals"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select city"
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
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
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
                key={hospital.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <img
                  src={hospital.pictureUrl}
                  alt={`${hospital.hospital} location`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => {
                    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${hospital.hospital} ${hospital.address}`
                    )}`;
                    window.open(searchUrl, "_blank");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${hospital.hospital} ${hospital.address}`
                      )}`;
                      window.open(searchUrl, "_blank");
                    }
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Hospital+Image";
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`View ${hospital.hospital} on Google Maps`}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {hospital.hospital}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <strong>Location:</strong> {hospital.address}
                  </p>
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