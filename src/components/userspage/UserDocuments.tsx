// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   mobilenum: number;
//   country: string;
//   profilePictureUrl: string;
//   prescriptionUrl: string;
//   patientaxraysUrl: string;
//   patientreportsUrl: string;
//   address: string;
// }

// const UserDocuments: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8080/user/get-doc-and-adrs/17')
//       .then((res) => {
//         setUserData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!userData) return <div className="text-center mt-10 text-red-600">No data found</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Patient Information</h2>

//       <div className="mb-4">
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Mobile Number:</strong> {userData.mobilenum}</p>
//         <p><strong>Country:</strong> {userData.country}</p>
//         <p><strong>Address:</strong> {userData.address}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FileLink label="Profile Picture" url={userData.profilePictureUrl} />
//         <FileLink label="Prescription" url={userData.prescriptionUrl} />
//         <FileLink label="Patient X-Rays" url={userData.patientaxraysUrl} />
//         <FileLink label="Patient Reports" url={userData.patientreportsUrl} />
//       </div>
//     </div>
//   );
// };

// const FileLink: React.FC<{ label: string; url: string }> = ({ label, url }) => (
//   <div className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition duration-200">
//     <p className="font-medium text-gray-700">{label}</p>
//     <a
//       href={url}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-blue-500 hover:underline break-all"
//     >
//       View Document
//     </a>
//   </div>
// );

// export default UserDocuments;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   mobilenum: number;
//   country: string;
//   profilePictureUrl: string;
//   prescriptionUrl: string;
//   patientaxraysUrl: string;
//   patientreportsUrl: string;
//   address: string;
// }

// const UserDocuments: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8080/user/get-doc-and-adrs/17')
//       .then((res) => {
//         setUserData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!userData) return <div className="text-center mt-10 text-red-600">No data found</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Patient Information</h2>

//       <div className="mb-6 space-y-1 text-gray-700">
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Mobile:</strong> {userData.mobilenum}</p>
//         <p><strong>Country:</strong> {userData.country}</p>
//         <p><strong>Address:</strong> {userData.address}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <PDFViewer label="Profile Picture" url={userData.profilePictureUrl} />
//         <PDFViewer label="Prescription" url={userData.prescriptionUrl} />
//         <PDFViewer label="Patient X-Rays" url={userData.patientaxraysUrl} />
//         <PDFViewer label="Patient Reports" url={userData.patientreportsUrl} />
//       </div>
//     </div>
//   );
// };

// const PDFViewer: React.FC<{ label: string; url: string }> = ({ label, url }) => {
//   if (!url.endsWith(".pdf")) {
//     return (
//       <div className="border rounded-lg p-4 bg-gray-50 shadow">
//         <p className="font-semibold text-gray-700 mb-2">{label}</p>
//         <p className="text-sm text-red-500">This file is not a PDF. Open it in a new tab:</p>
//         <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">
//           {url}
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="border rounded-lg p-4 bg-gray-50 shadow">
//       <p className="font-semibold text-gray-700 mb-2">{label}</p>
//       <iframe
//         src={url}
//         className="w-full h-96 border rounded"
//         title={label}
//       />
//     </div>
//   );
// };

// export default UserDocuments;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   mobilenum: number;
//   country: string;
//   profilePictureUrl: string;
//   prescriptionUrl: string;
//   patientaxraysUrl: string;
//   patientreportsUrl: string;
//   address: string;
// }

// const UserDocuments: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8080/user/get-doc-and-adrs/17')
//       .then((res) => {
//         setUserData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!userData) return <div className="text-center mt-10 text-red-600">No data found</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Patient Information</h2>

//       <div className="mb-6 space-y-1 text-gray-700">
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Mobile:</strong> {userData.mobilenum}</p>
//         <p><strong>Country:</strong> {userData.country}</p>
//         <p><strong>Address:</strong> {userData.address}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <PDFViewer label="Profile Picture" url={userData.profilePictureUrl} />
//         <PDFViewer label="Prescription" url={userData.prescriptionUrl} />
//         <PDFViewer label="Patient X-Rays" url={userData.patientaxraysUrl} />
//         <PDFViewer label="Patient Reports" url={userData.patientreportsUrl} />
//       </div>
//     </div>
//   );
// };

// const PDFViewer: React.FC<{ label: string; url: string }> = ({ label, url }) => {
//   const isPdf = url.toLowerCase().endsWith('.pdf');

//   return (
//     <div className="border rounded-lg p-4 bg-gray-50 shadow">
//       <p className="font-semibold text-gray-700 mb-2">{label}</p>
//       {isPdf ? (
//         <iframe
//           src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
//           className="w-full h-96 border rounded"
//           title={label}
//         />
//       ) : (
//         <>
//           <p className="text-sm text-red-500">This is not a PDF. Open in new tab:</p>
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline break-all"
//           >
//             {url}
//           </a>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserDocuments;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   mobilenum: number;
//   country: string;
//   profilePictureUrl: string;
//   prescriptionUrl: string;
//   patientaxraysUrl: string;
//   patientreportsUrl: string;
//   address: string;
// }

// const UserDocuments: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8080/user/get-doc-and-adrs/17')
//       .then((res) => {
//         setUserData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!userData) return <div className="text-center mt-10 text-red-600">No data found</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Patient Information</h2>

//       <div className="mb-6 space-y-1 text-gray-700">
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Mobile:</strong> {userData.mobilenum}</p>
//         <p><strong>Country:</strong> {userData.country}</p>
//         <p><strong>Address:</strong> {userData.address}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <PDFViewer label="Profile Picture" url={userData.profilePictureUrl} />
//         <PDFViewer label="Prescription" url={userData.prescriptionUrl} />
//         <PDFViewer label="Patient X-Rays" url={userData.patientaxraysUrl} />
//         <PDFViewer label="Patient Reports" url={userData.patientreportsUrl} />
//       </div>
//     </div>
//   );
// };

// const PDFViewer: React.FC<{ label: string; url: string }> = ({ label, url }) => {
//   const isPdf = url.toLowerCase().endsWith('.pdf');

//   // Extract filename from URL
//   const getFileName = (fileUrl: string): string => {
//     try {
//       return decodeURIComponent(fileUrl.split('/').pop() || 'file');
//     } catch {
//       return 'file';
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-gray-50 shadow">
//       <p className="font-semibold text-gray-700 mb-2">{label}</p>

//       {isPdf ? (
//         <iframe
//           src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
//           className="w-full h-96 border rounded mb-4"
//           title={label}
//         />
//       ) : (
//         <>
//           <p className="text-sm text-red-500">This is not a PDF. Open in new tab:</p>
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline break-all block mb-4"
//           >
//             {url}
//           </a>
//         </>
//       )}

//       <a
//         href={url}
//         download={getFileName(url)}
//         className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//       >
//         Download
//       </a>
//     </div>
//   );
// };

// export default UserDocuments;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   id: number;
//   name: string;
//   email: string;
//   mobilenum: number;
//   country: string;
//   profilePictureUrl: string;
//   prescriptionUrl: string;
//   patientaxraysUrl: string;
//   patientreportsUrl: string;
//   address: string;
// }

// const UserDocuments: React.FC = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8080/user/get-doc-and-adrs/17')
//       .then((res) => {
//         setUserData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (!userData) return <div className="text-center mt-10 text-red-600">No data found</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-600">Patient Information</h2>

//       <div className="mb-6 space-y-1 text-gray-700">
//         <p><strong>Name:</strong> {userData.name}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Mobile:</strong> {userData.mobilenum}</p>
//         <p><strong>Country:</strong> {userData.country}</p>
//         <p><strong>Address:</strong> {userData.address}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <PDFViewer label="Profile Picture" url={userData.profilePictureUrl} />
//         <PDFViewer label="Prescription" url={userData.prescriptionUrl} />
//         <PDFViewer label="Patient X-Rays" url={userData.patientaxraysUrl} />
//         <PDFViewer label="Patient Reports" url={userData.patientreportsUrl} />
//       </div>
//     </div>
//   );
// };

// const PDFViewer: React.FC<{ label: string; url: string }> = ({ label, url }) => {
//   const isPdf = url.toLowerCase().endsWith('.pdf');

//   const getFileName = (fileUrl: string): string => {
//     try {
//       return decodeURIComponent(fileUrl.split('/').pop() || 'file');
//     } catch {
//       return 'file';
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const response = await fetch(url, { method: 'GET' });
//       const blob = await response.blob();
//       const downloadUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.download = getFileName(url);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//       console.error('Download failed:', error);
//       alert('Failed to download file. Please try again later.');
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-gray-50 shadow">
//       <p className="font-semibold text-gray-700 mb-2">{label}</p>

//       {isPdf ? (
//         <iframe
//           src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
//           className="w-full h-96 border rounded mb-4"
//           title={label}
//         />
//       ) : (
//         <>
//           <p className="text-sm text-red-500">This is not a PDF. Open in new tab:</p>
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline break-all block mb-4"
//           >
//             {url}
//           </a>
//         </>
//       )}

//       <button
//         onClick={handleDownload}
//         className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//       >
//         Download
//       </button>
//     </div>
//   );
// };

// export default UserDocuments;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
  id: number;
  name: string;
  email: string;
  mobilenum: string; // Changed to string
  country: string;
  profilePictureUrl: string;
  prescriptionUrl?: string;
  patientaxraysUrl?: string;
  patientreportsUrl?: string;
  address?: string;
}

const UserDocuments: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: 'error' } | null>(null);

  useEffect(() => {
    axios
      .get<UserData>('http://localhost:8080/user/get-doc-and-adrs/17')
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setMessage({ text: 'Failed to load patient data.', type: 'error' });
        setLoading(false);
      });

    return () => {
      if (message) setMessage(null); // Clear message on unmount
    };
  }, []);

  const handleProfileDownload = async () => {
    try {
      const response = await fetch(userData!.profilePictureUrl, { method: 'GET' });
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = getFileName(userData!.profilePictureUrl);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      link.remove();
    } catch (error) {
      console.error('Profile download failed:', error);
      setMessage({ text: 'Failed to download profile picture.', type: 'error' });
    }
  };

  const getFileName = (fileUrl: string): string => {
    try {
      return decodeURIComponent(fileUrl.split('/').pop() || 'profile');
    } catch {
      return 'profile';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 mt-12">
        <div className="bg-white shadow-lg rounded-2xl p-8 animate-pulse">
          <div className="flex flex-col items-center gap-6">
            <div className="size-32 rounded-full bg-gray-200"></div>
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!userData || message) {
    return (
      <div className="max-w-6xl mx-auto p-8 mt-12 text-center text-red-600 font-medium">
        {message?.text || 'No data available.'}
      </div>
    );
  }

  const isProfilePdf = userData.profilePictureUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="max-w-6xl mx-auto p-8 bg-[#f7f7f7] min-h-screen">
      {/* Toast Notification */}
      {message && (
        <div className="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg bg-red-500 text-white text-sm font-medium flex items-center gap-4">
          {message.text}
          <button
            onClick={() => setMessage(null)}
            className="text-white hover:text-gray-200"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-2xl p-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-6 mb-10">
          {isProfilePdf ? (
            <div className="size-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-blue-100 shadow-md">
              <span className="text-gray-500 text-sm text-center">PDF Profile</span>
            </div>
          ) : (
            <img
              src={userData.profilePictureUrl}
              alt={`${userData.name}'s profile picture`}
              className="size-32 rounded-full object-cover border-4 border-blue-100 shadow-md hover:scale-105 transition-transform duration-300"
            />
          )}
          <button
            onClick={handleProfileDownload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors duration-300"
            aria-label="Download profile picture"
          >
            Download Profile
          </button>
        </div>

        {/* Patient Information */}
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Patient Information</h2>
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-blue-600">Name</span>
            <p className="text-base">{userData.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-blue-600">Email</span>
            <p className="text-base">{userData.email}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-blue-600">Mobile</span>
            <p className="text-base">{userData.mobilenum}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-blue-600">Country</span>
            <p className="text-base">{userData.country}</p>
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-sm font-semibold text-blue-600">Address</span>
            <p className="text-base">{userData.address || 'N/A'}</p>
          </div>
        </div>

        {/* Documents Grid */}
        <h3 className="text-2xl font-bold mb-6 text-blue-600">Medical Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userData.prescriptionUrl && <PDFViewer label="Prescription" url={userData.prescriptionUrl} />}
          {userData.patientaxraysUrl && <PDFViewer label="Patient X-Rays" url={userData.patientaxraysUrl} />}
          {userData.patientreportsUrl && <PDFViewer label="Patient Reports" url={userData.patientreportsUrl} />}
          {!userData.prescriptionUrl && !userData.patientaxraysUrl && !userData.patientreportsUrl && (
            <p className="text-gray-600 text-center col-span-2">No documents available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const PDFViewer: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const isPdf = url.toLowerCase().endsWith('.pdf');

  const getFileName = (fileUrl: string): string => {
    try {
      return decodeURIComponent(fileUrl.split('/').pop() || 'document');
    } catch {
      return 'document';
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = getFileName(url);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300">
      <p className="font-semibold text-gray-700 text-lg mb-4">{label}</p>
      {isPdf ? (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          className="w-full h-80 border border-gray-300 rounded-md mb-4"
          title={label}
          loading="lazy"
        />
      ) : (
        <div className="mb-4">
          <p className="text-sm text-red-600 mb-2">This is not a PDF file.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all hover:text-blue-800 transition-colors duration-300"
          >
            View in new tab
          </a>
        </div>
      )}
      <button
        onClick={handleDownload}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        disabled={isDownloading}
        aria-label={`Download ${label}`}
      >
        {isDownloading ? (
          <>
            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Downloading...
          </>
        ) : (
          'Download'
        )}
      </button>
    </div>
  );
};

export default UserDocuments;