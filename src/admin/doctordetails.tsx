import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '@/admin/sidebar';
import { ClipLoader } from 'react-spinners';
import { Menu, X } from 'lucide-react';

interface Hospital {
  id: number;
  hospital: string;
  address: string;
  pictureUrl: string;
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

interface DisplayDoctor {
  id: number;
  name: string;
  email: string;
  mobileNum: string;
  rating: number;
  description: string;
  address : string;
  location: string;
  hospital: string;
  specialty: string;
  profilepic: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DisplayDoctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Parse address to extract city
  const parseAddress = (address: string): string => {
    const parts = address.split(',').map((part) => part.trim());
    return parts[1] || 'Unknown';
  };

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Doctor>(`http://localhost:8080/api/doctors/${id}`);
        const doc = response.data;
        const mappedDoctor: DisplayDoctor = {
          id: doc.id,
          name: doc.name,
          email: doc.email,
          mobileNum: 'N/A',
          rating: doc.rating,
          description: doc.description,
          location: parseAddress(doc.hospital.address),
          address:doc.hospital.address,
          hospital: doc.hospital.hospital,
          specialty: doc.department,
          profilepic: doc.profilepic,
        };
        setDoctor(mappedDoctor);
        setError(null);
      } catch (err) {
        setError('Failed to fetch doctor details');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div
          className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-20`}
        >
          <Sidebar />
        </div>
        <button
          className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50 text-center animate-fade-in">
              <p className="text-red-500 text-sm mb-4 leading-snug">{error}</p>
              <button
                onClick={() => navigate('/doctors')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
                aria-label="Back to doctors list"
              >
                Back to Doctors
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !doctor) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div
          className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-20`}
        >
          <Sidebar />
        </div>
        <button
          className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm text-center py-8 animate-fade-in">
              <ClipLoader size={40} color="#4f46e5" className="animate-pulse" />
              <p className="text-gray-600 text-sm mt-4 leading-snug">Loading doctor details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:static lg:w-64 bg-gradient-to-b from-white to-gray-50 h-full p-6 shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-20`}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transition-all duration-300 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <header className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <img
                src={"doctor.profilepic"}
                alt={`Profile picture of ${doctor.name}`}
                className="w-32 h-32 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128')}
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{doctor.name}</h1>
                <p className="text-lg text-indigo-600 font-medium">{doctor.specialty}</p>
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <span className="text-gray-600 text-sm">{doctor.rating.toFixed(1)}/5</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
            </header>
            <article className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-700">Email</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.email}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-700">Mobile</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.mobileNum}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-700">Location</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.location}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-700">Hospital</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.hospital}</p>
              </div>
              <div className="sm:col-span-2">
                <h2 className="text-sm font-semibold text-gray-700">Hospital Address</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.address}</p>
              </div>
              <div className="sm:col-span-2">
                <h2 className="text-sm font-semibold text-gray-700">Description</h2>
                <p className="text-gray-600 text-sm leading-snug">{doctor.description}</p>
              </div>
            </article>
            <div className="mt-6">
              <button
                onClick={() => navigate('/doctors')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 min-w-[120px] text-sm shadow-sm"
                aria-label="Back to doctors list"
              >
                Back to Doctors
              </button>
            </div>
          </section>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default DoctorDetails;