import React, { useState, ChangeEvent } from 'react';

interface Prescription {
  id: string;
  fileName: string;
  fileType: 'image' | 'pdf';
  fileUrl: string;
  timestamp: string;
}

interface Patient {
  name: string;
  email: string;
  phone: string;
  dob: string;
  bloodType: string;
  allergies: string;
  medicalHistory: string;
  emergencyContact: string;
  address: string;
  avatar: string;
  prescriptions: Prescription[];
  timestamp?: string;
}

const PatientProfile: React.FC = () => {
  const [patient, setPatient] = useState<Patient>({
    name: 'Anil Kumar',
    email: 'anil@example.com',
    phone: '9876543210',
    dob: '1990-05-15',
    bloodType: 'O+',
    allergies: 'None',
    medicalHistory: 'No major illnesses',
    emergencyContact: 'Priya Kumar, 9876543211',
    address: '123 Main St, Hyderabad, India',
    avatar: '',
    prescriptions: [
      {
        id: '1',
        fileName: 'lisinopril_prescription.jpg',
        fileType: 'image',
        fileUrl: 'https://via.placeholder.com/150?text=Lisinopril+Prescription',
        timestamp: '2025-01-01T10:00:00Z',
      },
      {
        id: '2',
        fileName: 'metformin_prescription.pdf',
        fileType: 'pdf',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        timestamp: '2025-03-01T12:00:00Z',
      },
    ],
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Patient, string>>>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isPrescriptionsOpen, setIsPrescriptionsOpen] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>('');

  const [patientHistory, setPatientHistory] = useState<Patient[]>([
    {
      name: 'Anil Kumar',
      email: 'anil.kumar@example.com',
      phone: '9876543210',
      dob: '1990-05-15',
      bloodType: 'O+',
      allergies: 'Peanut allergy',
      medicalHistory: 'Asthma diagnosed in 2015',
      emergencyContact: 'Priya Kumar, 9876543211',
      address: '456 Old St, Hyderabad, India',
      avatar: '',
      prescriptions: [
        {
          id: '1',
          fileName: 'lisinopril_prescription.jpg',
          fileType: 'image',
          fileUrl: 'https://via.placeholder.com/150?text=Lisinopril+Prescription',
          timestamp: '2025-01-01T10:00:00Z',
        },
      ],
      timestamp: '2025-01-10T14:30:00Z',
    },
    {
      name: 'Anil K.',
      email: 'anil@example.com',
      phone: '9876543210',
      dob: '1990-05-15',
      bloodType: 'O+',
      allergies: 'None',
      medicalHistory: 'No major illnesses',
      emergencyContact: 'Priya Kumar, 9876543211',
      address: '123 Main St, Hyderabad, India',
      avatar: '',
      prescriptions: [
        {
          id: '1',
          fileName: 'lisinopril_prescription.jpg',
          fileType: 'image',
          fileUrl: 'https://via.placeholder.com/150?text=Lisinopril+Prescription',
          timestamp: '2025-01-01T10:00:00Z',
        },
        {
          id: '2',
          fileName: 'metformin_prescription.pdf',
          fileType: 'pdf',
          fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          timestamp: '2025-03-01T12:00:00Z',
        },
      ],
      timestamp: '2025-03-15T09:45:00Z',
    },
  ]);

  const validateField = (name: keyof Patient, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
      case 'phone':
        return /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits';
      case 'dob':
        return value.match(/^\d{4}-\d{2}-\d{2}$/) ? '' : 'Use YYYY-MM-DD format';
      case 'emergencyContact':
        return value.trim() ? '' : 'Emergency contact is required';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
    setErrors({ ...errors, [name]: validateField(name as keyof Patient, value) });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, avatar: 'Image size must be less than 2MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatient((prev) => ({ ...prev, avatar: reader.result as string }));
        setErrors({ ...errors, avatar: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrescriptionUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only PNG, JPEG, or PDF files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB');
      return;
    }

    setFileError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPrescription: Prescription = {
        id: crypto.randomUUID(),
        fileName: file.name,
        fileType: file.type === 'application/pdf' ? 'pdf' : 'image',
        fileUrl: reader.result as string,
        timestamp: new Date().toISOString(),
      };
      const updatedPrescriptions = [...patient.prescriptions, newPrescription];
      const updatedPatient = { ...patient, prescriptions: updatedPrescriptions };
      setPatient(updatedPatient);
      setPatientHistory([...patientHistory, { ...updatedPatient, timestamp: new Date().toISOString() }]);
      console.log('Uploaded Prescription:', newPrescription);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const newErrors: Partial<Record<keyof Patient, string>> = {};
    Object.keys(patient).forEach((key) => {
      if (key !== 'avatar' && key !== 'timestamp' && key !== 'prescriptions') {
        newErrors[key as keyof Patient] = validateField(key as keyof Patient, patient[key as keyof Patient]);
      }
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    setPatientHistory([...patientHistory, { ...patient, timestamp: new Date().toISOString() }]);
    setEditing(false);
    console.log('Updated Patient Profile:', patient);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 font-sans antialiased`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <img
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg transition-transform duration-300 group-hover:scale-105"
                src={patient.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&size=150&background=0D8ABC&color=fff`}
                alt="Patient avatar"
                aria-label="Patient profile picture"
              />
              {editing && (
                <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    aria-label="Upload profile picture"
                  />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6" />
                  </svg>
                </label>
              )}
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-2 text-center">{errors.avatar}</p>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{patient.name}</h1>

            {Object.values(errors).some((error) => error && !errors.avatar) && (
              <div className="w-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg text-center">
                Please fix the errors in the form before saving.
              </div>
            )}

            {editing ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    value={patient.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-red-500 text-xs">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    id="email"
                    name="email"
                    value={patient.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-xs">{errors.email}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={patient.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-xs">{errors.phone}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="dob" className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                  <input
                    id="dob"
                    name="dob"
                    value={patient.dob}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    aria-invalid={errors.dob ? 'true' : 'false'}
                    aria-describedby={errors.dob ? 'dob-error' : undefined}
                  />
                  {errors.dob && <p id="dob-error" className="text-red-500 text-xs">{errors.dob}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="bloodType" className="text-sm font-medium text-gray-700 dark:text-gray-300">Blood Type</label>
                  <input
                    id="bloodType"
                    name="bloodType"
                    value={patient.bloodType}
                    onChange={handleChange}
                    placeholder="Enter blood type (e.g., O+)"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="allergies" className="text-sm font-medium text-gray-700 dark:text-gray-300">Allergies</label>
                  <input
                    id="allergies"
                    name="allergies"
                    value={patient.allergies}
                    onChange={handleChange}
                    placeholder="Enter allergies (if any)"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="medicalHistory" className="text-sm font-medium text-gray-700 dark:text-gray-300">Medical History</label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={patient.medicalHistory}
                    onChange={handleChange}
                    placeholder="Enter medical history"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact</label>
                  <input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={patient.emergencyContact}
                    onChange={handleChange}
                    placeholder="Enter emergency contact"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    aria-invalid={errors.emergencyContact ? 'true' : 'false'}
                    aria-describedby={errors.emergencyContact ? 'emergencyContact-error' : undefined}
                  />
                  {errors.emergencyContact && <p id="emergencyContact-error" className="text-red-500 text-xs">{errors.emergencyContact}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                  <input
                    id="address"
                    name="address"
                    value={patient.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-inner">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 dark:text-gray-200">
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Email</p>
                    <p><a href={`mailto:${patient.email}`} className="hover:underline text-blue-500 dark:text-blue-400">{patient.email}</a></p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Phone</p>
                    <p>{patient.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Date of Birth</p>
                    <p>{patient.dob}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Blood Type</p>
                    <p>{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Allergies</p>
                    <p>{patient.allergies}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Emergency Contact</p>
                    <p>{patient.emergencyContact}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Medical History</p>
                    <p>{patient.medicalHistory}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Address</p>
                    <p>{patient.address}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-md"
                onClick={() => setEditing(!editing)}
                aria-label={editing ? 'Cancel editing' : 'Edit profile'}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
              {editing && (
                <button
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 focus:ring-4 focus:ring-green-300 focus:outline-none shadow-md"
                  onClick={handleSave}
                  aria-label="Save profile"
                >
                  Save Profile
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <label htmlFor="darkModeToggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
              <input
                id="darkModeToggle"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5 accent-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle dark mode"
              />
              <span className="text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <button
          className="w-full flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          onClick={() => setIsPrescriptionsOpen(!isPrescriptionsOpen)}
          aria-expanded={isPrescriptionsOpen}
          aria-controls="prescriptions-panel"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Prescriptions</h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${isPrescriptionsOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          id="prescriptions-panel"
          className={`mt-4 overflow-hidden transition-all duration-300 ${isPrescriptionsOpen ? 'max-h-screen' : 'max-h-0'}`}
        >
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Upload Prescription</label>
              <input
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                onChange={handlePrescriptionUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                aria-label="Upload prescription file"
              />
              {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
            </div>

            <div className="space-y-6">
              {patient.prescriptions.length > 0 ? (
                patient.prescriptions
                  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                  .map((prescription, index) => (
                    <div
                      key={prescription.id}
                      className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-green-500 dark:border-green-400 animate-fade-in"
                    >
                      <div className="absolute -left-2 top-6 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full" />
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Prescription {index + 1}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(prescription.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p><span className="font-semibold">File:</span> {prescription.fileName}</p>
                        {prescription.fileType === 'image' ? (
                          <img
                            src={prescription.fileUrl}
                            alt={prescription.fileName}
                            className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md"
                          />
                        ) : (
                          <div className="mt-2">
                            <a
                              href={prescription.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline dark:text-blue-400"
                              aria-label={`View ${prescription.fileName}`}
                            >
                              View PDF
                            </a>
                            <iframe
                              src={prescription.fileUrl}
                              title={prescription.fileName}
                              className="mt-2 w-full h-64 rounded-lg border"
                              aria-label={`Preview of ${prescription.fileName}`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">No prescriptions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile History Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <button
          className="w-full flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          aria-expanded={isHistoryOpen}
          aria-controls="history-panel"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile History</h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${isHistoryOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          id="history-panel"
          className={`mt-4 overflow-hidden transition-all duration-300 ${isHistoryOpen ? 'max-h-screen' : 'max-h-0'}`}
        >
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
            {patientHistory.length > 0 ? (
              <div className="space-y-6">
                {patientHistory.map((history, index) => (
                  <div
                    key={index}
                    className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-blue-500 dark:border-blue-400 animate-fade-in"
                  >
                    <div className="absolute -left-2 top-6 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full" />
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Version {index + 1}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(history.timestamp || '').toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-200">
                      <p><span className="font-semibold">Name:</span> {history.name}</p>
                      <p><span className="font-semibold">Email:</span> {history.email}</p>
                      <p><span className="font-semibold">Phone:</span> {history.phone}</p>
                      <p><span className="font-semibold">Date of Birth:</span> {history.dob}</p>
                      <p><span className="font-semibold">Blood Type:</span> {history.bloodType}</p>
                      <p><span className="font-semibold">Allergies:</span> {history.allergies}</p>
                      <p className="sm:col-span-2"><span className="font-semibold">Medical History:</span> {history.medicalHistory}</p>
                      <p><span className="font-semibold">Emergency Contact:</span> {history.emergencyContact}</p>
                      <p><span className="font-semibold">Address:</span> {history.address}</p>
                      <div className="sm:col-span-2">
                        <p className="font-semibold">Prescriptions:</p>
                        {history.prescriptions.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {history.prescriptions.map((p) => (
                              <li key={p.id}>
                                <a
                                  href={p.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline dark:text-blue-400"
                                >
                                  {p.fileName}
                                </a>{' '}
                                ({p.fileType}, {new Date(p.timestamp).toLocaleDateString()})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No prescriptions</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">No changes in history.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;