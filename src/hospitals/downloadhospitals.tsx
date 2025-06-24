import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Hospital {
  hospitalId: number;
  hositalName: string;  // Note: this is spelled with one 'p', matching the backend
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  status: string;
  hospitallocationId?: number;
  hospitallocationName?: string;
}

const DownloadHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Hospital[]>(`${BASE_URL}/api/hospitals/getall/hospitals`);
      setHospitals(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch hospitals',
        variant: 'destructive',
      });
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = () => {
    // Convert hospitals data to CSV format
    const headers = ['ID', 'Name', 'Location', 'Address', 'Rating', 'Status'];
    const csvData = hospitals.map((hospital) => 
      [hospital.hospitalId, hospital.hositalName, hospital.hospitallocationName, hospital.address, hospital.rating, hospital.status].join(',')
    );
    
    // Add headers to the beginning
    csvData.unshift(headers.join(','));
    
    // Create a blob with the CSV data
    const csvBlob = new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8;' });
    
    // Create a URL for the blob
    const csvUrl = URL.createObjectURL(csvBlob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'hospitals.csv');
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link to download the file
    link.click();
    
    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(csvUrl);
    
    toast({
      title: 'Success',
      description: 'Hospitals data downloaded successfully',
    });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Hospitals List</h1>
          <Button 
            onClick={handleDownload} 
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={loading || hospitals.length === 0}
          >
            Download CSV
          </Button>
        </div>
        
        {loading ? (
          <p>Loading hospitals...</p>
        ) : hospitals.length === 0 ? (
          <p className="text-gray-500">No hospitals available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">                {hospitals.map((hospital) => (
                  <tr key={hospital.hospitalId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{hospital.hospitalId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{hospital.hositalName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{hospital.hospitallocationName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{hospital.rating}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{hospital.status}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadHospitals;
