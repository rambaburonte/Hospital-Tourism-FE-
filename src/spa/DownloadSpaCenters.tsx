import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SpaCenter {
  spaId: number;
  spaName: string;
  spaDescription: string;
  spaImage: string;
  rating: string;
  address: string;
  locationId: number;
  status: string;
}

const DownloadSpaCenters: React.FC = () => {
  const [spaCenters, setSpaCenters] = useState<SpaCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpaCenters();
  }, []);

  const fetchSpaCenters = async () => {
    try {
      const response = await fetch(`${BASE_URL}/spaCenter/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch spa centers');
      }
      const data = await response.json();
      setSpaCenters(data);
    } catch (err) {
      console.error('Error fetching spa centers:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    setDownloading(true);
    
    const headers = [
      'ID',
      'Name',
      'Description',
      'Address',
      'Rating',
      'Location ID',
      'Status'
    ];

    const csvContent = [
      headers.join(','),
      ...spaCenters.map(spaCenter => [
        spaCenter.spaId,
        `"${spaCenter.spaName}"`,
        `"${spaCenter.spaDescription}"`,
        `"${spaCenter.address}"`,
        spaCenter.rating,
        spaCenter.locationId,
        spaCenter.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `spa_centers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloading(false);
  };

  const downloadJSON = () => {
    setDownloading(true);
    
    const jsonContent = JSON.stringify(spaCenters, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `spa_centers_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setDownloading(false);
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Download Spa Centers Data</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Total Spa Centers: <span className="font-semibold">{spaCenters.length}</span>
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={downloadCSV}
                disabled={downloading || spaCenters.length === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {downloading ? 'Downloading...' : 'Download CSV'}
              </button>
              
              <button
                onClick={downloadJSON}
                disabled={downloading || spaCenters.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {downloading ? 'Downloading...' : 'Download JSON'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Address</th>
                  <th className="py-2 px-4 border-b text-left">Rating</th>
                  <th className="py-2 px-4 border-b text-left">Location ID</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {spaCenters.map((spaCenter) => (
                  <tr key={spaCenter.spaId} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{spaCenter.spaId}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.spaName}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.address}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.rating}</td>
                    <td className="py-2 px-4 border-b">{spaCenter.locationId}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        spaCenter.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {spaCenter.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {spaCenters.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No spa centers found to download.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadSpaCenters;
