import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

interface Prescription {
  name: string;
  email: string;
  mobilenum: number;
  country: string;
  prescriptionUrls: string[];
}

const PrescriptionList: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrescriptionUrl, setSelectedPrescriptionUrl] = useState<string | null>(null);

  const API_URL = `${BASE_URL}/user/get-all-prescriptions`;

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch prescriptions.`);
        }

        const data: Prescription[] = await response.json();
        setPrescriptions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleViewPrescription = (url: string) => {
    setSelectedPrescriptionUrl(url);
  };

  const handleClosePopup = () => {
    setSelectedPrescriptionUrl(null);
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const contentType = response.headers.get('content-type');

      let pdfBlob: Blob;

      if (contentType?.includes('pdf') || url.endsWith('.pdf')) {
        pdfBlob = blob;
      } else if (contentType?.includes('image/jpeg') || contentType?.includes('image/jpg') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        const imgBlobUrl = window.URL.createObjectURL(blob);
        img.src = imgBlobUrl;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error('Failed to load image for conversion.'));
        });

        const doc = new jsPDF({
          orientation: img.width > img.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [img.width, img.height],
        });

        doc.addImage(img, 'JPEG', 0, 0, img.width, img.height);
        pdfBlob = doc.output('blob');

        window.URL.revokeObjectURL(imgBlobUrl);
      } else {
        throw new Error('Unsupported file type. Only JPG and PDF are supported.');
      }

      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the prescription as PDF. Please check the file URL or try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Medical Visions</h1>
        </div>
        <div className="flex space-x-8">
          <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200">Orders</Link>
          <Link to="/admin/PrescriptionList" className="text-blue-600 border-b-2 border-blue-600 text-sm font-semibold">Prescriptions</Link>
          <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-200">FAQ</Link>
        </div>
      </nav>      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 py-8 px-6 sm:px-8 lg:px-12 ml-64">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">All Prescriptions</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Found {prescriptions.length} patient records
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg shadow-sm">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : prescriptions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">No prescriptions found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {prescriptions.map((patient, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 capitalize mb-2">
                      {patient.name}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">Email: {patient.email}</p>
                    <p className="text-xs text-gray-600 mb-1">Mobile: {patient.mobilenum}</p>
                    <p className="text-xs text-gray-600 mb-3">Country: {patient.country}</p>
                    <div className="space-y-2">
                      {patient.prescriptionUrls.map((url, urlIndex) => (
                        <button
                          key={urlIndex}
                          onClick={() => handleViewPrescription(url)}
                          className="w-full px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          View Prescription {urlIndex + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup for Viewing Prescription */}
      {selectedPrescriptionUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[85vh] overflow-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Prescription Preview</h3>
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700 text-2xl font-medium transition-colors duration-200"
              >
                ×
              </button>
            </div>
            {selectedPrescriptionUrl.endsWith('.pdf') ? (
              <iframe
                src={selectedPrescriptionUrl}
                className="w-full h-[60vh] border border-gray-200 rounded-lg"
                title="Prescription PDF"
              />
            ) : (
              <img
                src={selectedPrescriptionUrl}
                alt="Prescription"
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                onError={(e) =>
                  (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found')
                }
              />
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() =>
                  handleDownload(
                    selectedPrescriptionUrl,
                    `prescription-${new Date().toISOString()}`
                  )
                }
                className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Download as PDF
              </button>
              <button
                onClick={handleClosePopup}
                className="px-6 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;