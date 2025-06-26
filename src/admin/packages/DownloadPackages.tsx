import React, { useState, useEffect } from 'react';
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
  createdAt?: string;
}

const DownloadPackages: React.FC = () => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv'>('csv');

  useEffect(() => {
    fetchAllPackages();
  }, []);

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

  const downloadAsJSON = () => {
    const dataStr = JSON.stringify(packages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `packages_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsCSV = () => {
    const headers = ['ID', 'Name', 'Description', 'Total Price', 'Duration Days', 'Featured', 'Image URL'];
    const csvContent = [
      headers.join(','),
      ...packages.map(pkg => [
        pkg.id,
        `"${pkg.name.replace(/"/g, '""')}"`,
        `"${pkg.description.replace(/"/g, '""')}"`,
        pkg.totalPrice || '',
        pkg.durationDays,
        pkg.featured,
        pkg.imageUrl || ''
      ].join(','))
    ].join('\n');

    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `packages_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      if (selectedFormat === 'json') {
        downloadAsJSON();
        toast.success('Packages exported as JSON successfully!');
      } else {
        downloadAsCSV();
        toast.success('Packages exported as CSV successfully!');
      }
    } catch (err) {
      toast.error('Failed to download packages');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <div className="text-center">Loading packages...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-6">
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Download Packages</h1>
          
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Export Package Data</h3>
              <p className="text-blue-700 mb-4">
                Download all package information in your preferred format. This includes package details, 
                pricing, duration, and other relevant information.
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Export Format:</label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value as 'json' | 'csv')}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="csv">CSV (Excel Compatible)</option>
                    <option value="json">JSON (Raw Data)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleDownload}
                  disabled={downloading || packages.length === 0}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <i className="fas fa-download"></i>
                  {downloading ? 'Downloading...' : `Download ${selectedFormat.toUpperCase()}`}
                </button>
                
                <div className="text-sm text-gray-600">
                  {packages.length} package{packages.length !== 1 ? 's' : ''} available
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Package Preview</h3>
            <div className="text-sm text-gray-600 mb-3">
              Below is a preview of the packages that will be included in your download:
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{pkg.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.durationDays} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pkg.totalPrice ? `$${pkg.totalPrice}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${pkg.featured === 'YES' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {pkg.featured}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {packages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No packages found to download.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPackages;
