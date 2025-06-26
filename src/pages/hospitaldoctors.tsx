import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/config/config";

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
}

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospital: Hospital;
}

const HospitalDoctors: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>(`${BASE_URL}/api/hospitals/${id}`);
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to load doctors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [id]);

  const hospital = doctors[0]?.hospital;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12">
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-300">Loading doctors...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {hospital && (
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{hospital.hospitalName}</h1>
              <p className="text-gray-600 dark:text-gray-300">{hospital.hospitalDescription}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{hospital.address}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-center p-6">
                  <img
                    src={doctor.profilepic || "https://via.placeholder.com/100"}
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/100")}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6 border-2 border-blue-500"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{doctor.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{doctor.department}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{doctor.email}</p>
                    <p className="text-yellow-500 font-medium mt-1">Rating: {doctor.rating} ⭐</p>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{doctor.description}</p>
                    <button
                      onClick={() => alert(`Booking appointment with ${doctor.name}`)}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HospitalDoctors;
