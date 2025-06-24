
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Patient {
  id: number;
  name: string;
  email: string;
  country: string;
  mobilenum: number;
  profilePictureUrls?: string;
  address?: string;
  role?: string;
  email_verified?: boolean;
}

const PatientProfile: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.id) {
      setUserId(userData.id);
      fetchPatient(userData.id);
    } else {
      setMessage('No user data found. Please log in.');
    }
  }, []);

  const fetchPatient = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.get<Patient>(`http://localhost:4545/user/get-patients/${id}`);
      setPatient(response.data);
    } catch (error) {
      setMessage('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setMessage('Please select an image file.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage('File size exceeds 5MB.');
      return;
    }

    setProfilePicture(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setMessage('');
  };

  const handleUpload = async () => {
    if (!userId || !profilePicture) {
      setMessage('No file selected.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      await axios.post(`http://localhost:4545/user/upload-files/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Profile picture uploaded successfully!');
      setProfilePicture(null);
      setPreviewUrl(null);
      await fetchPatient(userId); // refresh data
    } catch (error) {
      setMessage('Failed to upload profile picture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Your Profile</h1>

        {message && (
          <div
            className={`p-4 mb-4 rounded-lg text-white ${
              message.includes('Failed') ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {message}
          </div>
        )}

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={
                previewUrl ||
                patient?.profilePictureUrls ||
                'https://via.placeholder.com/150'
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/150';
              }}
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
          {profilePicture && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-4 px-6 py-2 rounded-full font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition"
            >
              {loading ? 'Uploading...' : 'Update Picture'}
            </button>
          )}
        </div>

        {/* Basic Info */}
        {patient && !loading ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg"><strong>ID:</strong> {patient.id}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Name:</strong> {patient.name}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Email:</strong> {patient.email}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Mobile:</strong> {patient.mobilenum}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Country:</strong> {patient.country}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Address:</strong> {patient.address || 'N/A'}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Role:</strong> {patient.role || 'N/A'}</div>
            <div className="p-4 bg-gray-50 rounded-lg"><strong>Email Verified:</strong> {patient.email_verified ? 'Yes' : 'No'}</div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {loading ? 'Loading your profile...' : 'No profile data available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;