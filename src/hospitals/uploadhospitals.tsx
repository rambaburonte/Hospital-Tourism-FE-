// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';
// const UploadHospitals: React.FC = () => {
//   const [locations, setLocations] = useState<LocationOption[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
//   const [hospitalName, setHospitalName] = useState('');
//   const [hospitalDescription, setHospitalDescription] = useState('');
//   const [rating, setRating] = useState('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [hospitalAddress, setHospitalAddress] = useState('');

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const fetchLocations = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/locations`);
//       const formatted = res.data.map((loc: any) => ({
//         value: loc.locationId,
//         label: `${loc.city}, ${loc.state}, ${loc.country}`,
//       }));
//       setLocations(formatted);
//     } catch (err) {
//       console.error('Error fetching locations', err);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedLocation || !hospitalName || !hospitalDescription || !rating || !imageFile || !hospitalAddress ) {
//       setMessage('All fields are required');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('hospitalName', hospitalName);
//     formData.append('hospitalDescription', hospitalDescription);
//     formData.append('hospitalRating', rating);
//     formData.append('locationId', selectedLocation.value.toString());
//     formData.append('hospitalAdress', hospitalAddress);
//     formData.append('image', imageFile);

//     try {
//       const res = await axios.post(`${BASE_URL}/api/hospitals/add`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (res.status === 200) {
//         setMessage('Hospital uploaded successfully!');
//         handleReset();
//       } else {
//         setMessage('Failed to upload hospital');
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('An error occurred while uploading hospital');
//     }
//   };

//   const handleReset = () => {
//     setSelectedLocation(null);
//     setHospitalName('');
//     setHospitalDescription('');
//     setRating('');
//     setImageFile(null);
//     setMessage('');
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="flex-1 p-6 md:p-10 lg:ml-64">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-3xl font-bold mb-6 text-center">Upload Hospital</h1>
//           <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block font-medium text-gray-700 mb-2">Select Location</label>
//                 <Select
//                   options={locations}
//                   value={selectedLocation}
//                   onChange={(opt) => setSelectedLocation(opt)}
//                   placeholder="Choose a location"
//                   isSearchable
//                 />
//               </div>

//               {selectedLocation && (
//                 <>
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1">Hospital Name</label>
//                     <input
//                       type="text"
//                       value={hospitalName}
//                       onChange={(e) => setHospitalName(e.target.value)}
//                       className="w-full border border-gray-300 rounded px-4 py-2"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       value={hospitalDescription}
//                       onChange={(e) => setHospitalDescription(e.target.value)}
//                       className="w-full border border-gray-300 rounded px-4 py-2"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1">Rating</label>
//                     <input
//                       type="number"
//                       min="0"
//                       max="5"
//                       step="0.1"
//                       value={rating}
//                       onChange={(e) => setRating(e.target.value)}
//                       className="w-full border border-gray-300 rounded px-4 py-2"
//                       required
//                     />
//                   </div>
//                  <label className="block font-medium text-gray-700 mb-1">Address</label>
// <textarea
//   value={hospitalAddress}
//   onChange={(e) => setHospitalAddress(e.target.value)}
//   className="w-full border border-gray-300 rounded px-4 py-2"
//   placeholder="e.g. Street Name, Area, Landmark, Zip Code"
//   required
// />


//                   <input
//   type="file"
//   accept="image/*"
//   onChange={(e) => {
//     const file = e.target.files?.[0];
//     if (file && file.size > 512000) {
//       setMessage('Image size must be less than 500KB');
//       setImageFile(null);
//     } else {
//       setImageFile(file || null);
//     }
//   }}
//   className="w-full border border-gray-300 rounded px-4 py-2"
//   required
// />


//                   <div className="flex gap-4">
//                     <button
//                       type="submit"
//                       className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//                     >
//                       Upload
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleReset}
//                       className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </>
//               )}

//               {message && (
//                 <div
//                   className={`mt-4 text-center p-2 rounded ${
//                     message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                   }`}
//                 >
//                   {message}
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadHospitals;

// interface LocationOption {
//   value: number;
//   label: string;
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface LocationOption {
  value: number;
  label: string;
}

const UploadHospitals: React.FC = () => {
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalDescription, setHospitalDescription] = useState('');
  const [rating, setRating] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/locations`);
      const formatted = res.data.map((loc: any) => ({
        value: loc.locationId,
        label: `${loc.city}, ${loc.state}, ${loc.country}`,
      }));
      setLocations(formatted);
    } catch (err) {
      console.error('Error fetching locations', err);
      setMessage('Failed to fetch locations');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedLocation ||
      !hospitalName ||
      !hospitalDescription ||
      !rating ||
      !imageFile ||
      !hospitalAddress ||
      !specialization
    ) {
      setMessage('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('hospitalName', hospitalName);
    formData.append('hospitalDescription', hospitalDescription);
    formData.append('hospitalRating', rating);
    formData.append('locationId', selectedLocation.value.toString());
    formData.append('hospitalAdress', hospitalAddress); // Note: 'hospitalAdress' matches backend spelling
    formData.append('image', imageFile);
    formData.append('specialization', specialization);

    try {
      const res = await axios.post(`${BASE_URL}/api/hospitals/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        setMessage('Hospital added successfully');
        handleReset();
      } else {
        setMessage('Failed to add hospital');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while adding hospital');
    }
  };

  const handleReset = () => {
    setSelectedLocation(null);
    setHospitalName('');
    setHospitalDescription('');
    setRating('');
    setImageFile(null);
    setHospitalAddress('');
    setSpecialization('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Upload Hospital</h1>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Select Location</label>
                <Select
                  options={locations}
                  value={selectedLocation}
                  onChange={(opt) => setSelectedLocation(opt)}
                  placeholder="Choose a location"
                  isSearchable
                  className="text-sm"
                />
              </div>

              {selectedLocation && (
                <>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Hospital Name</label>
                    <input
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={hospitalDescription}
                      onChange={(e) => setHospitalDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={hospitalAddress}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. Street Name, Area, Landmark, Zip Code"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g. Cardiology, Neurology"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Hospital Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > 512000) {
                          setMessage('Image size must be less than 500KB');
                          setImageFile(null);
                        } else {
                          setImageFile(file || null);
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                      required
                    />
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}

              {message && (
                <div
                  className={`mt-4 text-center p-3 rounded-lg transition-all duration-300 ${
                    message.includes('success')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadHospitals;