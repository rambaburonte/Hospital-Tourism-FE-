import React, { useState, useEffect, useCallback } from 'react';
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
  const [documents, setDocuments] = useState<Record[]>([]);
  const [testResults, setTestResults] = useState<Record[]>([]);  const [scans, setScans] = useState<Record[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<'documents' | 'testResults' | 'scans'>('documents');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  // Function to extract filename without extension from URL
  const extractFilenameFromUrl = (url: string): string => {
    try {
      const urlParts = url.split('/');
      const filename = urlParts[urlParts.length - 1];
      
      // For complex URLs with multiple underscores and IDs, extract the actual filename
      // e.g., "emp17_d4e97b2c-365d-40be-b872-9cc6634eca20_emp15_68a9c601-682e-4d40-ac47-965ee54e37ae_E Call Letter.pdf"
      // Should extract "E Call Letter"
      const parts = filename.split('_');
      let actualFilename = '';
      
      if (parts.length > 2) {
        // Take the part after the last underscore before the extension
        actualFilename = parts[parts.length - 1];
      } else {
        actualFilename = filename;
      }
      
      // Remove file extension
      const nameWithoutExtension = actualFilename.replace(/\.[^/.]+$/, '');
      return nameWithoutExtension || 'Document';
    } catch {
      return 'Document';
    }
  };

  // Function to fetch medical records from backend
  const fetchMedicalRecords = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/user/get-doc-and-adrs/${userId}`);
      const userData = response.data;

      console.log('API Response:', userData); // Debug log      // Process documents (prescriptions) - handle array URLs with backward compatibility
      let prescriptionUrls = userData.prescriptionUrls;
      
      // Backward compatibility: check for old field names or single URL format
      if (!prescriptionUrls || !Array.isArray(prescriptionUrls) || prescriptionUrls.length === 0) {
        if (userData.prescriptionUrl && typeof userData.prescriptionUrl === 'string' && userData.prescriptionUrl.trim() !== '') {
          prescriptionUrls = [userData.prescriptionUrl];
        }
      }
      
      if (prescriptionUrls && Array.isArray(prescriptionUrls) && prescriptionUrls.length > 0) {
        const prescriptionRecords = prescriptionUrls
          .filter((url: string) => url && url.trim() !== '')
          .map((url: string, index: number) => ({
            id: `prescription-${index + 1}`,
            name: extractFilenameFromUrl(url),
            date: new Date().toISOString().split('T')[0],
            type: 'Prescription',
            fileUrl: url,
          }));
        setDocuments(prescriptionRecords);
      } else {
        setDocuments([]);
      }      // Process test results (reports) - handle array URLs with backward compatibility
      let patientReportsUrls = userData.patientReportsUrls;
      
      // Backward compatibility: check for old field names or single URL format
      if (!patientReportsUrls || !Array.isArray(patientReportsUrls) || patientReportsUrls.length === 0) {
        if (userData.patientreportsUrl && typeof userData.patientreportsUrl === 'string' && userData.patientreportsUrl.trim() !== '') {
          patientReportsUrls = [userData.patientreportsUrl];
        }
      }
      
      if (patientReportsUrls && Array.isArray(patientReportsUrls) && patientReportsUrls.length > 0) {
        const reportRecords = patientReportsUrls
          .filter((url: string) => url && url.trim() !== '')
          .map((url: string, index: number) => ({
            id: `report-${index + 1}`,
            name: extractFilenameFromUrl(url),
            date: new Date().toISOString().split('T')[0],
            type: 'Test Report',
            fileUrl: url,
          }));
        setTestResults(reportRecords);
      } else {
        setTestResults([]);
      }      // Process scans (X-rays) - handle array URLs with backward compatibility
      let patientAxraysUrls = userData.patientAxraysUrls;
      
      // Backward compatibility: check for old field names or single URL format
      if (!patientAxraysUrls || !Array.isArray(patientAxraysUrls) || patientAxraysUrls.length === 0) {
        if (userData.patientaxraysUrl && typeof userData.patientaxraysUrl === 'string' && userData.patientaxraysUrl.trim() !== '') {
          patientAxraysUrls = [userData.patientaxraysUrl];
        }
      }
      
      if (patientAxraysUrls && Array.isArray(patientAxraysUrls) && patientAxraysUrls.length > 0) {
        const xrayRecords = patientAxraysUrls
          .filter((url: string) => url && url.trim() !== '')
          .map((url: string, index: number) => ({
            id: `xray-${index + 1}`,
            name: extractFilenameFromUrl(url),
            date: new Date().toISOString().split('T')[0],
            type: 'X-Ray',
            fileUrl: url,
          }));
        setScans(xrayRecords);
      } else {
        setScans([]);
      }
      
    } catch (error) {
      console.error('Error fetching medical records:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('Stored user from localStorage:', storedUser); // Debug log
    
    if (storedUser && (storedUser.id || storedUser.userId)) {
      const userId = storedUser.id || storedUser.userId;
      console.log('Using user ID:', userId); // Debug log
      
      setUser({
        ...storedUser,
        id: userId,
      });
      
      // Fetch medical records when user is set
      fetchMedicalRecords(userId);
    } else {
      console.log('No valid user found in localStorage'); // Debug log
    }
  }, [fetchMedicalRecords]);

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
  };  const getFieldName = () => {
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
  const getFieldNameForUpload = (docType: 'documents' | 'testResults' | 'scans') => {
    switch (docType) {
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

  const getDocumentTypeName = (docType: 'documents' | 'testResults' | 'scans') => {
    switch (docType) {
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
  const getApiFieldName = () => {
    switch (activeTab) {
      case 'documents':
        return 'prescriptionUrls';
      case 'testResults':
        return 'patientReportsUrls';
      case 'scans':
        return 'patientAxraysUrls';
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
      const file = e.target.files[0];
      
      // Check if the file is a PDF
      if (file.type !== 'application/pdf') {
        setUploadError('Please select a PDF file only');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setUploadError(null);
    }
  };  const handleUpload = async () => {
    if (!user?.id) {
      setUploadError('User not logged in');
      return;
    }

    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }    const formData = new FormData();
    const fieldName = getFieldNameForUpload(selectedDocumentType);
    formData.append(fieldName, selectedFile);

    console.log('Upload Debug Info:');
    console.log('User ID:', user.id);
    console.log('Selected Document Type:', selectedDocumentType);
    console.log('Field Name:', fieldName);
    console.log('Selected File:', selectedFile.name, selectedFile.type, selectedFile.size);
    console.log('Upload URL:', `${BASE_URL}/user/upload-files/${user.id}`);

    try {
      setUploading(true);
      const response = await axios.post(
        `${BASE_URL}/user/upload-files/${user.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('Upload Success - API Response:', response.data);

      // Refresh the medical records after successful upload
      await fetchMedicalRecords(user.id);      setShowUploadModal(false);
      setSelectedFile(null);
      setSelectedDocumentType('documents');
      setUploadError(null);
    } catch (error: unknown) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Failed to upload file. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; error?: string } }; message?: string };
        const responseData = axiosError.response?.data;
        console.log('Error Response Data:', responseData);
        errorMessage = responseData?.message || responseData?.error || axiosError.message || errorMessage;
      }
      
      setUploadError(errorMessage);
    } finally {
      setUploading(false);
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
          </div>          {/* Tabs - Only show if URL has specific tab parameter */}
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
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                    {documents.length}
                  </span>
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
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                    {testResults.length}
                  </span>
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
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                    {scans.length}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Content - Show all three sections when tabs are hidden */}
          {!showTabs ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{getTabTitle()}</h2>
                <button
                  className="px-4 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                  onClick={() => {
                    setSelectedDocumentType(activeTab);
                    setShowUploadModal(true);
                  }}
                >
                  Upload New
                </button>
              </div>

              {/* Records List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Loading records...</p>
                  </div>
                ) : getRecords().length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No records found.</p>
                  </div>
                ) : (
                  getRecords().map((record) => (
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
                          onClick={() => window.open(record.fileUrl, '_blank')}
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1 text-sm text-[#499E14] hover:bg-[#499E14] hover:bg-opacity-10 rounded-md transition-colors duration-200"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = record.fileUrl;
                            link.download = record.name;
                            link.click();
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            // Show all three sections when tabs are visible (default view)
            <div className="space-y-6">
              {/* Documents Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 text-[#499E14] mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Documents & Prescriptions</h2>
                    <span className="ml-3 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                      {documents.length}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                    onClick={() => {
                      setSelectedDocumentType('documents');
                      setShowUploadModal(true);
                    }}
                  >
                    Upload Document
                  </button>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">Loading documents...</p>
                    </div>
                  ) : documents.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No documents found.</p>
                    </div>
                  ) : (
                    documents.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-[#499E14] bg-opacity-10 rounded-lg">
                            <FileText className="w-6 h-6 text-[#499E14]" />
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
                            onClick={() => window.open(record.fileUrl, '_blank')}
                          >
                            View
                          </button>
                          <button
                            className="px-3 py-1 text-sm text-[#499E14] hover:bg-[#499E14] hover:bg-opacity-10 rounded-md transition-colors duration-200"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = record.fileUrl;
                              link.download = record.name;
                              link.click();
                            }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Test Results Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Microscope className="w-6 h-6 text-[#499E14] mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test Results & Reports</h2>
                    <span className="ml-3 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                      {testResults.length}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                    onClick={() => {
                      setSelectedDocumentType('testResults');
                      setShowUploadModal(true);
                    }}
                  >
                    Upload Report
                  </button>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">Loading test results...</p>
                    </div>
                  ) : testResults.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No test results found.</p>
                    </div>
                  ) : (
                    testResults.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-[#499E14] bg-opacity-10 rounded-lg">
                            <Microscope className="w-6 h-6 text-[#499E14]" />
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
                            onClick={() => window.open(record.fileUrl, '_blank')}
                          >
                            View
                          </button>
                          <button
                            className="px-3 py-1 text-sm text-[#499E14] hover:bg-[#499E14] hover:bg-opacity-10 rounded-md transition-colors duration-200"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = record.fileUrl;
                              link.download = record.name;
                              link.click();
                            }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Scans Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Scan className="w-6 h-6 text-[#499E14] mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">X-rays & Scans</h2>
                    <span className="ml-3 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                      {scans.length}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-[#499E14] text-white rounded-lg hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635]"
                    onClick={() => {
                      setSelectedDocumentType('scans');
                      setShowUploadModal(true);
                    }}
                  >
                    Upload Scan
                  </button>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">Loading scans...</p>
                    </div>
                  ) : scans.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No scans found.</p>
                    </div>
                  ) : (
                    scans.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-[#499E14] bg-opacity-10 rounded-lg">
                            <Scan className="w-6 h-6 text-[#499E14]" />
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
                            onClick={() => window.open(record.fileUrl, '_blank')}
                          >
                            View
                          </button>
                          <button
                            className="px-3 py-1 text-sm text-[#499E14] hover:bg-[#499E14] hover:bg-opacity-10 rounded-md transition-colors duration-200"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = record.fileUrl;
                              link.download = record.name;
                              link.click();
                            }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Upload Medical Document
                  </h3>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                      setSelectedDocumentType('documents');
                      setUploadError(null);
                      setUploading(false);
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
                      Document Type
                    </label>
                    <select
                      value={selectedDocumentType}
                      onChange={(e) => setSelectedDocumentType(e.target.value as 'documents' | 'testResults' | 'scans')}
                      className="w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                    >
                      <option value="documents">Prescription / Documents</option>
                      <option value="testResults">Test Results / Reports</option>
                      <option value="scans">X-rays / Scans</option>
                    </select>
                  </div>                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select PDF file for {getDocumentTypeName(selectedDocumentType)}
                    </label>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Only PDF files are supported
                    </p>
                  </div>
                  {uploadError && <p className="text-sm text-red-600 mt-2">{uploadError}</p>}                  <button
                    onClick={handleUpload}
                    className="w-full bg-[#499E14] text-white rounded-lg py-2 hover:bg-[#3a7e10] transition-colors duration-200 focus:ring-4 focus:ring-[#a3e635] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedFile || uploading}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
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