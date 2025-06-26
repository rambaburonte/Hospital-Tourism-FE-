import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SubAdmin {
  id?: number;
  adminId?: number;
  adminName: string;
  adminEmail: string;
  role: string;
  status?: string;
}

const EditSubAdmin: React.FC = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<SubAdmin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const fetchSubAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try multiple endpoints to find the correct one
      let response;
      try {
        response = await axios.get<SubAdmin[]>(`${BASE_URL}/sub/admin/get-all-subadmins`);
      } catch (error) {
        // Try alternative endpoint
        response = await axios.get<SubAdmin[]>(`${BASE_URL}/sub/admin/get-all`);
      }
      
      console.log('API Response:', response.data); // Debug log
      setSubAdmins(response.data || []);
    } catch (error) {
      console.error('Error fetching sub-admins:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to fetch sub-admins. Please check if the backend is running.';
      setError(errorMessage);
      toast({
        title: 'Error Loading Sub-Admins',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAdmin = (admin: SubAdmin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.adminName,
      email: admin.adminEmail,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;
    
    setLoading(true);
    try {
      const adminId = selectedAdmin.id || selectedAdmin.adminId;
      const payload = {
        adminName: formData.name,
        adminEmail: formData.email,
      };
      
      console.log('Updating admin:', adminId, 'with data:', payload); // Debug log
      
      await axios.put(`${BASE_URL}/sub/admin/subadmin/update/${adminId}`, payload);
      
      toast({
        title: 'Success',
        description: 'Sub-admin updated successfully',
      });
      
      fetchSubAdmins();
      setSelectedAdmin(null);
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error updating sub-admin:', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to update sub-admin',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Edit Sub-Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select a Sub-Admin</h2>
            
            {loading && <p>Loading sub-admins...</p>}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Sub-Admins</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <div className="flex gap-2">
                  <Button onClick={fetchSubAdmins} size="sm" variant="outline">
                    Retry
                  </Button>
                  <Button onClick={() => navigate('/admin/viewsubadmins')} size="sm" variant="outline">
                    Back to Sub-Admins List
                  </Button>
                </div>
              </div>
            )}
            
            {!loading && !error && subAdmins.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No sub-admins available.</p>
                <Button onClick={() => navigate('/admin/subadminregister')} size="sm">
                  Add New Sub-Admin
                </Button>
              </div>
            )}
            
            {!loading && !error && subAdmins.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {subAdmins.map(admin => (
                  <div 
                    key={admin.id || admin.adminId}
                    className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      (selectedAdmin?.id || selectedAdmin?.adminId) === (admin.id || admin.adminId) ? 'bg-green-50 border-green-300' : ''
                    }`}
                    onClick={() => handleSelectAdmin(admin)}
                  >
                    <p className="font-medium">{admin.adminName}</p>
                    <p className="text-sm text-gray-600">{admin.adminEmail}</p>
                    <p className="text-xs text-gray-400">ID: {admin.id || admin.adminId}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            
            {!selectedAdmin ? (
              <p className="text-gray-500">Please select a sub-admin to edit.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 mr-2"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedAdmin(null);
                      setFormData({ name: '', email: '' });
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubAdmin;
