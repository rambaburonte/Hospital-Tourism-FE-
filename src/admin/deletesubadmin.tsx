import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SubAdmin {
  id: number;
  adminName: string;
  adminEmail: string;
  role: string;
  status: string;
}

const DeleteSubAdmin: React.FC = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const fetchSubAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/sub/admin/get-all-subadmins`);
      setSubAdmins(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch sub-admins',
        variant: 'destructive',
      });
      console.error('Error fetching sub-admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sub-admin? This action cannot be undone.')) {
      return;
    }
    
    setDeleting(true);
    try {
      await axios.delete(`${BASE_URL}/sub/admin/delete-subadmin/${id}`);
      
      toast({
        title: 'Success',
        description: 'Sub-admin deleted successfully',
      });
      
      // Refresh the list
      fetchSubAdmins();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete sub-admin',
        variant: 'destructive',
      });
      console.error('Error deleting sub-admin:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Delete Sub-Admin</h1>
        
        {loading ? (
          <p>Loading sub-admins...</p>
        ) : subAdmins.length === 0 ? (
          <p className="text-gray-500">No sub-admins available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subAdmins.map((admin) => (
                  <tr key={admin.id}>                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{admin.adminName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{admin.adminEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{admin.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        onClick={() => handleDelete(admin.id)}
                        variant="destructive"
                        size="sm"
                        disabled={deleting}
                      >
                        Delete
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

export default DeleteSubAdmin;
