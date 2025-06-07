import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar";

interface Hospital {
  hospitalId: number;
  hositalName: string;
  address: string;
  hospitalDescription: string;
  hospitalImage: string;
  location?: string;
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const navigate = useNavigate();
const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hospitals")
      .then((res) => {
        setHospitals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch hospitals", err);
        setLoading(false);
      });
  }, []);

  const locations = Array.from(
    new Set(hospitals.map((hospital) => hospital.location).filter(Boolean))
  );

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.hositalName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLocation =
      locationFilter === "all" || hospital.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const clearFilters = () => {
    setSearch("");
    setLocationFilter("all");
  };

  return (
    <div className="flex">
      {/* Sidebar (fixed width) */}
      <div className="w-64 fixed h-full z-10">
        <Sidebar />
      </div>

      {/* Main content (margin-left same as sidebar width) */}
      <div className="ml-64 flex-1 min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Find Hospitals
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by hospital name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredHospitals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hospitals found.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.hospitalId}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={hospital.hospitalImage}
                    alt={hospital.hositalName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {hospital.hositalName}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      {hospital.address}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {hospital.hospitalDescription}
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          navigate(`/admin/hospitalDoctor/${hospital.hospitalId}`)
                        }
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        View Doctors
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
