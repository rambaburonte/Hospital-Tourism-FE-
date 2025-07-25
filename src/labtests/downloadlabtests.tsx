import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface LabTest {
  id: number; // Changed from testId to id to match backend entity
  testTitle: string;
  testDescription: string;
  testPrice: number;
  testDepartment: string;
  testImage: string;
  status?: string;
}

const DownloadLabTests: React.FC = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLabTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLabTests = async () => {
    setLoading(true);
    try {
      console.log('Fetching lab tests from:', `${BASE_URL}/api/labtests`);
      const response = await axios.get<LabTest[]>(`${BASE_URL}/api/labtests`);
      console.log('Lab tests response:', response.data);
      setLabTests(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch lab tests',
        variant: 'destructive',
      });
      console.error('Error fetching lab tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (labTests.length === 0) {
      toast({
        title: 'Warning',
        description: 'No lab tests data to download',
        variant: 'destructive',
      });
      return;
    }

    // Convert lab tests data to CSV format
    const headers = ['ID', 'Title', 'Description', 'Department', 'Price', 'Status'];
    const csvData = labTests.map((test) => 
      [
        test.id, // Changed from testId to id
        `"${test.testTitle}"`, // Wrap in quotes in case title contains commas
        `"${test.testDescription}"`, // Wrap in quotes in case description contains commas
        test.testDepartment, 
        test.testPrice,
        test.status || 'Active'
      ].join(',')
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
    link.setAttribute('download', `labtests_${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link to download the file
    link.click();
    
    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(csvUrl);
    
    toast({
      title: 'Success',
      description: 'Lab tests data downloaded successfully',
    });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Lab Tests List</h1>
          <Button 
            onClick={handleDownload} 
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={loading || labTests.length === 0}
          >
            Download CSV
          </Button>
        </div>
        
        {loading ? (
          <p>Loading lab tests...</p>
        ) : labTests.length === 0 ? (
          <p className="text-gray-500">No lab tests available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labTests.map((test) => (
                  <tr key={test.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">#{test.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{test.testTitle}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{test.testDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{test.testDepartment}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${test.testPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        test.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : test.status === 'Inactive'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {test.status || 'Active'}
                      </span>
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

export default DownloadLabTests;
