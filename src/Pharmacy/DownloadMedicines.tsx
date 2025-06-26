import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Medicine {
  madicineid: number;
  medicineName: string;
  medicineType: string;
  medicineDescription: string;
  medicinePrice: number;
  medicineQuantity: number;
  medicineExpiryDate: string;
  medicineManufacturer: string;
  medicineImage: string;
  medicineCategory: string;
}

interface PharmacyDashboard {
  allMedicines: Medicine[];
  lowStockMedicines: Medicine[];
  expiredMedicines: Medicine[];
  nearExpiryMedicines: Medicine[];
  totalMedicines: number;
  totalValue: number;
  lowStockCount: number;
  expiredCount: number;
  nearExpiryCount: number;
}

const DownloadMedicines: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [dashboard, setDashboard] = useState<PharmacyDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [selectedView, setSelectedView] = useState<'all' | 'lowStock' | 'expired' | 'nearExpiry'>('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pharmacy/dashboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboard(data);
      setMedicines(data.allMedicines || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecificMedicines = async (endpoint: string) => {
    try {
      const response = await fetch(`${BASE_URL}/pharmacy/medicines/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} medicines`);
      }
      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      console.error(`Error fetching ${endpoint} medicines:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleViewChange = (view: 'all' | 'lowStock' | 'expired' | 'nearExpiry') => {
    setSelectedView(view);
    setError(null);
    
    if (view === 'all' && dashboard) {
      setMedicines(dashboard.allMedicines);
    } else if (view === 'lowStock' && dashboard) {
      setMedicines(dashboard.lowStockMedicines);
    } else if (view === 'expired' && dashboard) {
      setMedicines(dashboard.expiredMedicines);
    } else if (view === 'nearExpiry' && dashboard) {
      setMedicines(dashboard.nearExpiryMedicines);
    }
  };

  const downloadAsCSV = () => {
    setDownloading(true);
    try {
      const headers = [
        'Medicine ID',
        'Medicine Name',
        'Type',
        'Category',
        'Price (₹)',
        'Quantity',
        'Manufacturer',
        'Expiry Date',
        'Description'
      ];

      const csvContent = [
        headers.join(','),
        ...medicines.map(medicine => [
          medicine.madicineid,
          `"${medicine.medicineName}"`,
          `"${medicine.medicineType}"`,
          `"${medicine.medicineCategory}"`,
          medicine.medicinePrice,
          medicine.medicineQuantity,
          `"${medicine.medicineManufacturer}"`,
          medicine.medicineExpiryDate,
          `"${medicine.medicineDescription?.replace(/"/g, '""') || ''}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `medicines_${selectedView}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Error downloading CSV:', err);
      setError('Failed to download CSV file');
    } finally {
      setDownloading(false);
    }
  };

  const downloadAsJSON = () => {
    setDownloading(true);
    try {
      const jsonContent = JSON.stringify(medicines, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `medicines_${selectedView}_${new Date().toISOString().split('T')[0]}.json`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Error downloading JSON:', err);
      setError('Failed to download JSON file');
    } finally {
      setDownloading(false);
    }
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

  if (error && !dashboard) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Download Medicines Data</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Dashboard Summary */}
          {dashboard && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800">Total Medicines</h3>
                <p className="text-2xl font-bold text-blue-600">{dashboard.totalMedicines}</p>
                <p className="text-sm text-blue-500">Total Value: ₹{dashboard.totalValue?.toFixed(2)}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-800">Low Stock</h3>
                <p className="text-2xl font-bold text-yellow-600">{dashboard.lowStockCount}</p>
                <p className="text-sm text-yellow-500">Needs restocking</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800">Expired</h3>
                <p className="text-2xl font-bold text-red-600">{dashboard.expiredCount}</p>
                <p className="text-sm text-red-500">Remove from inventory</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-800">Near Expiry</h3>
                <p className="text-2xl font-bold text-orange-600">{dashboard.nearExpiryCount}</p>
                <p className="text-sm text-orange-500">Within 30 days</p>
              </div>
            </div>
          )}

          {/* View Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Medicine Category to Download</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleViewChange('all')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Medicines ({dashboard?.totalMedicines || 0})
              </button>
              <button
                onClick={() => handleViewChange('lowStock')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'lowStock'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Low Stock ({dashboard?.lowStockCount || 0})
              </button>
              <button
                onClick={() => handleViewChange('expired')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'expired'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Expired ({dashboard?.expiredCount || 0})
              </button>
              <button
                onClick={() => handleViewChange('nearExpiry')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'nearExpiry'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Near Expiry ({dashboard?.nearExpiryCount || 0})
              </button>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Download Options</h2>
            <div className="flex gap-4">
              <button
                onClick={downloadAsCSV}
                disabled={downloading || medicines.length === 0}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {downloading ? 'Downloading...' : 'Download as CSV'}
              </button>
              <button
                onClick={downloadAsJSON}
                disabled={downloading || medicines.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {downloading ? 'Downloading...' : 'Download as JSON'}
              </button>
            </div>
          </div>

          {/* Preview Table */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Preview - {selectedView === 'all' ? 'All Medicines' : 
                       selectedView === 'lowStock' ? 'Low Stock Medicines' :
                       selectedView === 'expired' ? 'Expired Medicines' : 'Near Expiry Medicines'} 
              ({medicines.length} items)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medicines.slice(0, 10).map((medicine) => {
                  const expiryDate = new Date(medicine.medicineExpiryDate);
                  const currentDate = new Date();
                  const isExpired = expiryDate < currentDate;
                  const isNearExpiry = !isExpired && expiryDate <= new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
                  const isLowStock = medicine.medicineQuantity <= 10;

                  return (
                    <tr key={medicine.madicineid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {medicine.medicineImage && (
                            <img
                              src={medicine.medicineImage}
                              alt={medicine.medicineName}
                              className="h-10 w-10 rounded-full mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{medicine.medicineName}</div>
                            <div className="text-sm text-gray-500">{medicine.medicineType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {medicine.medicineCategory}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{medicine.medicinePrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${isLowStock ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                          {medicine.medicineQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expiryDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1">
                          {isExpired && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Expired
                            </span>
                          )}
                          {isNearExpiry && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Near Expiry
                            </span>
                          )}
                          {isLowStock && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Low Stock
                            </span>
                          )}
                          {!isExpired && !isNearExpiry && !isLowStock && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Good
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {medicines.length > 10 && (
            <div className="mt-4 text-center text-gray-500">
              ... and {medicines.length - 10} more items (download to see all)
            </div>
          )}

          {medicines.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No medicines found in the selected category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadMedicines;
