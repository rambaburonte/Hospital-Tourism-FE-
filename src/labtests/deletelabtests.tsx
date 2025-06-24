import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface LabTest {
  testId: number;
  testTitle: string;
  testDescription: string;
  testPrice: number;
  testDepartment: string;
  testImage: string;
  status?: string;
}

const DeleteLabTests: React.FC = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const fetchLabTests = async () => {
    setLoading(true);
    try {
      const response = await axios.get<LabTest[]>(`${BASE_URL}/api/labtests`);
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

  useEffect(() => {
    fetchLabTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this lab test? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(true);
    try {
      // Using the soft-delete endpoint as found in the LabtestsController
      await axios.put(`${BASE_URL}/api/labtests/soft-delete/${id}`);
      
      toast({
        title: 'Success',
        description: 'Lab test deleted successfully',
      });
      
      // Refresh the list
      fetchLabTests();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete lab test',
        variant: 'destructive',
      });
      console.error('Error deleting lab test:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Delete Lab Test</h1>
        
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {labTests.map((test) => (
                  <tr key={test.testId}>
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
                      <div className="text-sm text-gray-500">{test.status || 'Active'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => handleDelete(test.testId)}
                        variant="destructive"
                        size="sm"
                        disabled={deleting}
                      >
                        {deleting ? 'Deleting...' : 'Delete'}
                      </Button>
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

export default DeleteLabTests;
