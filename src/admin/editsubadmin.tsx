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
  id: number;
  name: string;
  email: string;
  role: string;
}

const EditSubAdmin: React.FC = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<SubAdmin | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const fetchSubAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get<SubAdmin[]>(`${BASE_URL}/api/admin/all-subadmins`);
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

  const handleSelectAdmin = (admin: SubAdmin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;
    
    setLoading(true);    try {
      await axios.put(`${BASE_URL}/api/admin/update-subadmin/${selectedAdmin.id}`, formData);
      
      toast({
        title: 'Success',
        description: 'Sub-admin updated successfully',
      });
      
      fetchSubAdmins();
      setSelectedAdmin(null);
      setFormData({ name: '', email: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update sub-admin',
        variant: 'destructive',
      });
      console.error('Error updating sub-admin:', error);
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
            
            {!loading && subAdmins.length === 0 && (
              <p className="text-gray-500">No sub-admins available.</p>
            )}
            
            {!loading && subAdmins.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {subAdmins.map(admin => (
                  <div 
                    key={admin.id}
                    className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      selectedAdmin?.id === admin.id ? 'bg-green-50 border-green-300' : ''
                    }`}
                    onClick={() => handleSelectAdmin(admin)}
                  >
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-gray-600">{admin.email}</p>
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
