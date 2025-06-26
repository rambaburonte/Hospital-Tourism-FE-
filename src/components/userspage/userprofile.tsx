
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '@/config/config';

interface Patient {
  id: number;
  name: string;
  email: string;
  country: string;
  mobilenum: number;
  profilePictureUrls?: string[];
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<Patient>>({});

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
      const response = await axios.get<Patient>(`${BASE_URL}/user/get-patients/${id}`);
      setPatient(response.data);
      setEditFormData(response.data); // Initialize edit form with current data
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
  };  const handleUpload = async () => {
    if (!userId || !profilePicture) {
      setMessage('No file selected.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      console.log('Uploading profile picture...'); // Debug log
      const response = await axios.post(`${BASE_URL}/user/upload-files/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Upload response:', response.data); // Debug log
      
      // Update the editFormData with the new profile picture URL
      if (response.data && response.data.profilePictureUrls) {
        setEditFormData(prev => ({
          ...prev,
          profilePictureUrls: response.data.profilePictureUrls
        }));
      }

      setMessage('Profile picture uploaded successfully!');
      setProfilePicture(null);
      setPreviewUrl(null);
      await fetchPatient(userId); // refresh data
    } catch (error) {
      console.error('Profile picture upload error:', error); // Debug log
      if (axios.isAxiosError(error)) {
        setMessage(`Failed to upload profile picture: ${error.response?.data || error.message}`);
      } else {
        setMessage('Failed to upload profile picture.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && patient) {
      setEditFormData(patient); // Reset form data when starting to edit
    }
    setMessage('');
  };  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value // Store all values as-is, we'll convert when sending to the server
    }));
  };const handleUpdateProfile = async () => {
    if (!userId || !editFormData) {
      setMessage('No user data to update.');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: editFormData.name || '',
        email: editFormData.email || '',
        mobilenum: typeof editFormData.mobilenum === 'string' 
          ? parseInt(editFormData.mobilenum) 
          : editFormData.mobilenum || 0,
        country: editFormData.country || '',
        address: editFormData.address || '',
        profilePictureUrls: Array.isArray(patient?.profilePictureUrls) 
          ? patient.profilePictureUrls
          : patient?.profilePictureUrls 
            ? [patient.profilePictureUrls] 
            : [],
        role: patient?.role || '',
        email_verified: patient?.email_verified || false
      };

      console.log('Sending update data:', updateData); // Debug log
      const response = await axios.put(`${BASE_URL}/user/update-user/${userId}`, updateData);
      console.log('Update response:', response.data); // Debug log

      setMessage('Profile updated successfully!');
      setIsEditing(false);
      await fetchPatient(userId); // Refresh data
    } catch (error) {
      console.error('Profile update error:', error); // Debug log
      if (axios.isAxiosError(error)) {
        setMessage(`Failed to update profile: ${error.response?.data || error.message}`);
      } else {
        setMessage('Failed to update profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">Your Profile</h1>
          {patient && !loading && (
            <button
              onClick={handleEditToggle}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isEditing 
                  ? 'bg-gray-500 text-white hover:bg-gray-600' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

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
          <div className="relative">            <img
              src={
                previewUrl ||
                (patient?.profilePictureUrls && patient.profilePictureUrls[0]) ||
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
        </div>        {/* Basic Info */}
        {patient && !loading ? (
          <div className="grid grid-cols-1 gap-4">
            {!isEditing ? (
              // View Mode
              <>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>ID:</strong> {patient.id}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Name:</strong> {patient.name}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Email:</strong> {patient.email}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Mobile:</strong> {patient.mobilenum}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Country:</strong> {patient.country}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Address:</strong> {patient.address || 'N/A'}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Role:</strong> {patient.role || 'N/A'}</div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Email Verified:</strong> {patient.email_verified ? 'Yes' : 'No'}</div>
              </>
            ) : (
              // Edit Mode
              <>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>ID:</strong> {patient.id} <span className="text-sm text-gray-500">(Cannot be edited)</span></div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ''}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email || ''}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="text"
                    name="mobilenum"
                    value={editFormData.mobilenum || ''}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={editFormData.country || ''}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={editFormData.address || ''}
                    onChange={handleEditInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg"><strong>Role:</strong> {patient.role || 'N/A'} <span className="text-sm text-gray-500">(Cannot be edited)</span></div>
                <div className="p-4 bg-gray-50 rounded-lg"><strong>Email Verified:</strong> {patient.email_verified ? 'Yes' : 'No'} <span className="text-sm text-gray-500">(Cannot be edited)</span></div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>        ) : (
          <div className="text-center text-gray-500">
            {loading ? 'Loading your profile...' : 'No profile data available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;