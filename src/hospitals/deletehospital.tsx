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

const DeleteHospital: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
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

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this hospital? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(true);
    try {
      // Using the soft-delete endpoint as found in the HospitalController
      await axios.put(`${BASE_URL}/api/hospitals/soft-delete/${id}`);
      
      toast({
        title: 'Success',
        description: 'Hospital deleted successfully',
      });
      
      // Refresh the list
      fetchHospitals();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete hospital',
        variant: 'destructive',
      });
      console.error('Error deleting hospital:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Delete Hospital</h1>
        
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">                {hospitals.map((hospital) => (
                  <tr key={hospital.hospitalId}>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => handleDelete(hospital.hospitalId)}
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

export default DeleteHospital;
