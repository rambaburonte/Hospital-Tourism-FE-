import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  hospital: string;
  email: string;
  phone: string;
  experience: number;
}

const DownloadDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch doctors',
        variant: 'destructive',
      });
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Convert doctors data to CSV format
    const headers = ['ID', 'Name', 'Specialization', 'Hospital', 'Email', 'Phone', 'Experience'];
    const csvData = doctors.map((doctor) => 
      [doctor.id, doctor.name, doctor.specialization, doctor.hospital, doctor.email, doctor.phone, doctor.experience].join(',')
    );
    
    const csvContent = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'doctors.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Success',
      description: 'Doctors data downloaded successfully',
    });
  };

  const handleDownloadExcel = () => {
    // For Excel, we'd typically use a library like ExcelJS, but for simplicity
    // we'll just create a CSV that Excel can open
    handleDownload();
  };

  const handleDownloadPDF = () => {
    toast({
      title: 'Info',
      description: 'PDF download is not implemented in this example. Please use CSV or Excel format.',
    });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Download Doctors</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Export Options</h2>
          <div className="flex space-x-4">
            <Button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700"
              disabled={loading || doctors.length === 0}
            >
              Download CSV
            </Button>
            
            <Button
              onClick={handleDownloadExcel}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading || doctors.length === 0}
            >
              Download Excel
            </Button>
            
            <Button
              onClick={handleDownloadPDF}
              className="bg-red-600 hover:bg-red-700"
              disabled={loading || doctors.length === 0}
            >
              Download PDF
            </Button>
          </div>
        </div>
        
        {loading ? (
          <p>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="text-gray-500">No doctors available for download.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-semibold p-6 bg-gray-50 border-b">Preview</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{doctor.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doctor.specialization}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doctor.hospital}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doctor.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{doctor.experience} years</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadDoctors;
