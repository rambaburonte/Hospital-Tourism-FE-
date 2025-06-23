import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Diagnostic {
  diognosticsId: number;
  diognosticsName: string;
  diognosticsDescription: string;
  diognosticsImage: string;
  diognosticsrating: string;
  diognosticsaddress: string;
  Status?: string;
}

const DownloadDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDiagnostics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Diagnostic[]>(`${BASE_URL}/api/diagnostics`);
      setDiagnostics(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch diagnostics',
        variant: 'destructive',
      });
      console.error('Error fetching diagnostics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Convert diagnostics data to CSV format
    const headers = ['ID', 'Name', 'Description', 'Address', 'Rating', 'Status'];
    const csvData = diagnostics.map((diagnostic) => 
      [
        diagnostic.diognosticsId, 
        diagnostic.diognosticsName, 
        diagnostic.diognosticsDescription, 
        diagnostic.diognosticsaddress, 
        diagnostic.diognosticsrating, 
        diagnostic.Status || 'Active'
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
    link.setAttribute('download', 'diagnostics.csv');
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Click the link to download the file
    link.click();
    
    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(csvUrl);
    
    toast({
      title: 'Success',
      description: 'Diagnostics data downloaded successfully',
    });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Diagnostics Centers List</h1>
          <Button 
            onClick={handleDownload} 
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={loading || diagnostics.length === 0}
          >
            Download CSV
          </Button>
        </div>
        
        {loading ? (
          <p>Loading diagnostic centers...</p>
        ) : diagnostics.length === 0 ? (
          <p className="text-gray-500">No diagnostic centers available.</p>
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
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {diagnostics.map((diagnostic) => (
                  <tr key={diagnostic.diognosticsId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{diagnostic.diognosticsId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{diagnostic.diognosticsName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{diagnostic.diognosticsaddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{diagnostic.diognosticsrating}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{diagnostic.Status || 'Active'}</div>
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

export default DownloadDiagnostics;
