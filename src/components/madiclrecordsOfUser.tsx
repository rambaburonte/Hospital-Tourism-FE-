
import React, { useState, useEffect } from 'react';
import { FileText, Microscope, Scan } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

interface Record {
  id: string;
  name: string;
  date: string;
  type: string;
  fileUrl: string;
}

const MedicalRecords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'documents' | 'testResults' | 'scans'>('documents');
  const [showTabs, setShowTabs] = useState(true);
  const [documents, setDocuments] = useState<Record[]>([
    { id: '1', name: 'Prescription - Dr. Smith', date: '2024-03-15', type: 'Prescription', fileUrl: '#' },
    { id: '2', name: 'Medical Report - Cardiology', date: '2024-03-10', type: 'Medical Report', fileUrl: '#' },
  ]);
  const [testResults, setTestResults] = useState<Record[]>([
    { id: '1', name: 'Blood Test Results', date: '2024-03-15', type: 'Blood Test', fileUrl: '#' },
    { id: '2', name: 'Urine Analysis Report', date: '2024-03-10', type: 'Urine Test', fileUrl: '#' },
  ]);
  const [scans, setScans] = useState<Record[]>([
    { id: '1', name: 'Chest X-Ray', date: '2024-03-15', type: 'X-Ray', fileUrl: '#' },
    { id: '2', name: 'Brain MRI Scan', date: '2024-03-10', type: 'MRI', fileUrl: '#' },
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser && (storedUser.id || storedUser.userId)) {
      setUser({
        ...storedUser,
        id: storedUser.id || storedUser.userId,
      });
    }
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'documents' || tab === 'testResults' || tab === 'scans') {
      setActiveTab(tab);
      setShowTabs(false);
    } else {
      setShowTabs(true);
    }
  }, [searchParams]);

  const getRecords = () => {
    switch (activeTab) {
      case 'documents':
        return documents;
      case 'testResults':
        return testResults;
      case 'scans':
        return scans;
      default:
        return [];
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'documents':
        return 'Your Documents';
      case 'testResults':
        return 'Your Test Results';
      case 'scans':
        return 'Your Scans';
      default:
        return '';
    }
  };

  const getFieldName = () => {
    switch (activeTab) {
      case 'documents':
        return 'prescription';
      case 'testResults':
        return 'patientreportsUrl';
      case 'scans':
        return 'patientaxraysUrl';
      default:
        return '';
    }
  };

  const getApiFieldName = () => {
    switch (activeTab) {
      case 'documents':
        return 'prescriptionUrl';
      case 'testResults':
        return 'patientreportsUrl'; // Adjust based on actual API response
      case 'scans':
        return 'patientaxraysUrl'; // Adjust based on actual API response

        return 'patientreportsUrl';
      case 'scans':
        return 'patientaxraysUrl';

      default:
        return '';
    }
  };

  const getRecordType = () => {
    switch (activeTab) {
      case 'documents':
        return 'Prescription';
      case 'testResults':
        return 'Test Report';
      case 'scans':
        return 'Scan';
      default:
        return '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!user?.id) {
      setUploadError('User not logged in');
      return;
    }

    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    const fieldName = getFieldName();
    formData.append(fieldName, selectedFile);

    try {
      const response = await axios.post(
        `${BASE_URL}/user/upload-files/${user.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('API Response:', response.data);

      const data = response.data as { [key: string]: string };
      const apiFieldName = getApiFieldName();
      const fileUrl = data[apiFieldName];

      if (!fileUrl) {
        console.error('Expected API field:', apiFieldName, 'Available fields:', Object.keys(data));
        setUploadError(
          `API response missing file URL for field "${apiFieldName}". Please check the API response structure.`
        );
        return;
      }

      const newRecord: Record = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: selectedFile.name,
        date: new Date().toISOString().split('T')[0],
        type: getRecordType(),
        fileUrl,
      };

      switch (activeTab) {
        case 'documents':
          setDocuments((prev) => [...prev, newRecord]);
          break;
        case 'testResults':
          setTestResults((prev) => [...prev, newRecord]);
          break;
        case 'scans':
          setScans((prev) => [...prev, newRecord]);
          break;
      }

      setShowUploadModal(false);
      setSelectedFile(null);
      setUploadError(null);
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to upload file. Please try again.';
      setUploadError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Medical Records</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Access and manage your medical documents, test results, and scans in one place.
            </p>
          </div>

          {/* Tabs */}
          {showTabs && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeTab === 'documents'
                      ? 'text-[#499E14] border-b-2 border-[#499E14]'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('documents')}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Documents
                </button>
                <button
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeTab === 'testResults'
                      ? 'text-[#499E14] border-b-2 border-[#499E14]'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('testResults')}
                >
                  <Microscope className="w-5 h-5 mr-2" />
                  Test Results
                </button>
                <button
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeTab === 'scans'
                      ? 'text-[#499E14] border-b-2 border-[#499E14]'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('scans')}
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Scans
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{getTabTitle()}</h2>
              <button
                className="px-4 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                onClick={() => setShowUploadModal(true)}
              >
                Upload New
              </button>
            </div>

            {/* Records List */}
            <div className="space-y-4">
              {getRecords().map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-[#499E14] bg-opacity-10 rounded-lg">
                      {activeTab === 'documents' && <FileText className="w-6 h-6 text-[#499E14]" />}
                      {activeTab === 'testResults' && <Microscope className="w-6 h-6 text-[#499E14]" />}
                      {activeTab === 'scans' && <Scan className="w-6 h-6 text-[#499E14]" />}
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium">{record.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {record.type} • {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 text-sm text-[#499E14] hover:bg-[#499E14] hover:bg-opacity-10 rounded-md transition-colors duration-200"
                      onClick={() => {
                        /* Handle view */
                      }}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-sm text-[#499E14] hover:bg-[#499E14] hover:bg-opacity-10 rounded-md transition-colors duration-200"
                      onClick={() => {
                        /* Handle download */
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}

              {getRecords().length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No records found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Upload {getTabTitle().replace('Your ', '')}
                  </h3>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                      setUploadError(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {getRecordType()}
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                    />
                  </div>
                  {uploadError && <p className="text-sm text-red-600 mt-2">{uploadError}</p>}
                  <button
                    onClick={handleUpload}
                    className="w-full bg-[#499E14] text-white rounded-lg py-2 hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                    disabled={!selectedFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;