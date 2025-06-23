import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  hospital: string;
  email: string;
}

const DeleteDoctor: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(true);
    try {
      await axios.delete(`${BASE_URL}/api/doctors/${id}`);
      
      toast({
        title: 'Success',
        description: 'Doctor deleted successfully',
      });
      
      // Refresh the list
      fetchDoctors();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete doctor',
        variant: 'destructive',
      });
      console.error('Error deleting doctor:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Delete Doctor</h1>
        
        {loading ? (
          <p>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="text-gray-500">No doctors available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => handleDelete(doctor.id)}
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

export default DeleteDoctor;
