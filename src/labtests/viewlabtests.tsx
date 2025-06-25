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

const ViewLabTests: React.FC = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

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

  useEffect(() => {
    fetchLabTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLabTests = searchTerm 
    ? labTests.filter(test => 
        test.testTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : labTests;

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">View Lab Tests</h1>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, department, or description..."
            className="w-full md:w-1/3 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <p>Loading lab tests...</p>
        ) : filteredLabTests.length === 0 ? (
          <p className="text-gray-500">
            {searchTerm ? 'No lab tests match your search.' : 'No lab tests available.'}
          </p>
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
                {filteredLabTests.map((test) => (
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

export default ViewLabTests;
