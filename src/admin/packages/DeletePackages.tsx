import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
import { toast } from 'sonner';

interface ServicePackage {
  id: number;
  name: string;
  description: string;
  totalPrice?: number;
  durationDays: number;
  imageUrl?: string;
  featured: string;
}

const DeletePackages: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPackage(id);
    } else {
      fetchAllPackages();
    }
  }, [id]);

  const fetchPackage = async (packageId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/packege/packages/${packageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch package');
      }
      const data = await response.json();
      setSelectedPackage(data);
      setShowDeleteConfirm(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPackages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/packege/All/packages`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setPackages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectPackageForDelete = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedPackage) return;

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/admin/packege/packages/delete/${selectedPackage.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete package');
      }

      toast.success('Package deleted successfully!');
      setPackages(packages.filter(pkg => pkg.id !== selectedPackage.id));
      setShowDeleteConfirm(false);
      setSelectedPackage(null);
      
      if (id) {
        navigate('/admin/deletepackages');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedPackage(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !selectedPackage) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showDeleteConfirm ? (
            // Show package list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Package to Delete</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                          <div className="text-sm text-gray-500">ID: {pkg.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{pkg.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {pkg.durationDays} days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 py-1 rounded-full text-xs ${pkg.featured === 'YES' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {pkg.featured}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectPackageForDelete(pkg)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {packages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No packages found.
                </div>
              )}
            </>
          ) : (
            // Show delete confirmation
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Confirm Package Deletion</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <i className="fas fa-exclamation-triangle text-red-600 mr-3"></i>
                  <h3 className="text-lg font-medium text-red-800">Warning: This action cannot be undone!</h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900">Package Details:</h4>
                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    <p><strong>Name:</strong> {selectedPackage?.name}</p>
                    <p><strong>Description:</strong> {selectedPackage?.description}</p>
                    <p><strong>Duration:</strong> {selectedPackage?.durationDays} days</p>
                    <p><strong>Featured:</strong> {selectedPackage?.featured}</p>
                  </div>
                </div>
                
                <p className="text-red-700">
                  Are you sure you want to delete this package? This will permanently remove the package and all associated data.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete Package'}
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletePackages;
