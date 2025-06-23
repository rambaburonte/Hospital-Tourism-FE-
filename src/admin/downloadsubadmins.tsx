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
  permissions?: string[];
}

const DownloadSubAdmins: React.FC = () => {
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    fetchSubAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-all-subadmins`);
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

  const handleDownload = () => {
    // Convert sub-admins data to CSV format
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Permissions'];
    const csvData = subAdmins.map((admin: SubAdmin) => 
      [
        admin.id, 
        admin.adminName, 
        admin.adminEmail, 
        admin.role, 
        admin.status,
        Array.isArray(admin.permissions) ? admin.permissions.join(';') : ''
      ].join(',')
    );
    
    const csvContent = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sub-admins.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Success',
      description: 'Sub-admins data downloaded successfully',
    });
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Download Sub-Admins</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Download a CSV file containing all sub-admin information.</p>
          
          <Button 
            onClick={handleDownload}
            disabled={loading || subAdmins.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Loading...' : 'Download CSV'}
          </Button>
          
          {subAdmins.length === 0 && !loading && (
            <p className="mt-4 text-gray-500">No sub-admins available to download.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadSubAdmins;
