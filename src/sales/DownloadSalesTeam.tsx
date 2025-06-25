import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SalesTeam {
  id: number;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SalesStats {
  totalBookings: number;
  totalFollowUps: number;
  totalRevenue: number;
  confirmedBookings: number;
  paidBookings: number;
  conversionRate: number;
}

const DownloadSalesTeam: React.FC = () => {
  const [salesTeam, setSalesTeam] = useState<SalesTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [selectedView, setSelectedView] = useState<'all' | 'active' | 'inactive'>('all');
  const [salesStats, setSalesStats] = useState<Map<number, SalesStats>>(new Map());

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/sales-team/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch sales team data');
        }
        const data = await response.json();
        setSalesTeam(data);
        
        // Fetch stats for each sales member
        await fetchSalesStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const fetchSalesStats = async (teamMembers: SalesTeam[]) => {
    const statsMap = new Map<number, SalesStats>();
    
    for (const member of teamMembers) {
      try {
        const response = await fetch(`${BASE_URL}/api/sales-team/stats/${member.id}`);
        if (response.ok) {
          const stats = await response.json();
          statsMap.set(member.id, stats);
        }
      } catch (err) {
        // It's okay if stats fail for one member, so we just warn
      }
    }
    
    setSalesStats(statsMap);
  };

  const getFilteredSalesTeam = () => {
    if (selectedView === 'all') return salesTeam;
    if (selectedView === 'active') return salesTeam.filter(member => member.status !== 'inactive');
    if (selectedView === 'inactive') return salesTeam.filter(member => member.status === 'inactive');
    return salesTeam;
  };

  const downloadAsCSV = () => {
    setDownloading(true);
    try {
      const filteredTeam = getFilteredSalesTeam();
      const headers = [
        'ID',
        'Name',
        'Email',
        'Phone',
        'Department',
        'Role',
        'Status',
        'Total Bookings',
        'Total Revenue',
        'Confirmed Bookings',
        'Conversion Rate (%)',
        'Created Date',
        'Updated Date'
      ];

      const csvContent = [
        headers.join(','),
        ...filteredTeam.map(member => {
          const stats = salesStats.get(member.id);
          return [
            member.id,
            `"${member.name}"`,
            `"${member.email}"`,
            `"${member.phone || ''}"`,
            `"${member.department || ''}"`,
            `"${member.role || ''}"`,
            `"${member.status || 'active'}"`,
            stats?.totalBookings || 0,
            stats?.totalRevenue || 0,
            stats?.confirmedBookings || 0,
            stats?.conversionRate?.toFixed(2) || 0,
            member.createdAt || '',
            member.updatedAt || ''
          ].join(',');
        })
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `sales_team_${selectedView}_${new Date().toISOString().split('T')[0]}.csv`);
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
      const filteredTeam = getFilteredSalesTeam();
      const dataWithStats = filteredTeam.map(member => ({
        ...member,
        stats: salesStats.get(member.id) || null
      }));
      
      const jsonContent = JSON.stringify(dataWithStats, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `sales_team_${selectedView}_${new Date().toISOString().split('T')[0]}.json`);
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

  if (error && salesTeam.length === 0) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  const filteredTeam = getFilteredSalesTeam();
  const activeMembers = salesTeam.filter(member => member.status !== 'inactive');
  const inactiveMembers = salesTeam.filter(member => member.status === 'inactive');

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Download Sales Team Data</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800">Total Members</h3>
              <p className="text-2xl font-bold text-blue-600">{salesTeam.length}</p>
              <p className="text-sm text-blue-500">All team members</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800">Active Members</h3>
              <p className="text-2xl font-bold text-green-600">{activeMembers.length}</p>
              <p className="text-sm text-green-500">Currently working</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800">Inactive Members</h3>
              <p className="text-2xl font-bold text-gray-600">{inactiveMembers.length}</p>
              <p className="text-sm text-gray-500">Deactivated accounts</p>
            </div>
          </div>

          {/* View Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Data to Download</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedView('all')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Members ({salesTeam.length})
              </button>
              <button
                onClick={() => setSelectedView('active')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active Members ({activeMembers.length})
              </button>
              <button
                onClick={() => setSelectedView('inactive')}
                className={`px-4 py-2 rounded-md ${
                  selectedView === 'inactive'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Inactive Members ({inactiveMembers.length})
              </button>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Download Options</h2>
            <div className="flex gap-4">
              <button
                onClick={downloadAsCSV}
                disabled={downloading || filteredTeam.length === 0}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {downloading ? 'Downloading...' : 'Download as CSV'}
              </button>
              <button
                onClick={downloadAsJSON}
                disabled={downloading || filteredTeam.length === 0}
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
              Preview - {selectedView === 'all' ? 'All Members' : 
                       selectedView === 'active' ? 'Active Members' : 'Inactive Members'} 
              ({filteredTeam.length} items)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeam.slice(0, 10).map((member) => {
                  const stats = salesStats.get(member.id);
                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full p-2 mr-3">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                            {member.phone && (
                              <div className="text-sm text-gray-500">{member.phone}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.role || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{member.department || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stats ? (
                          <div className="text-sm">
                            <div className="text-gray-900">Bookings: {stats.totalBookings}</div>
                            <div className="text-gray-500">Revenue: ₹{stats.totalRevenue.toFixed(2)}</div>
                            <div className="text-gray-500">Conversion: {stats.conversionRate.toFixed(1)}%</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">No data available</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {member.status === 'inactive' ? 'Inactive' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTeam.length > 10 && (
            <div className="mt-4 text-center text-gray-500">
              ... and {filteredTeam.length - 10} more items (download to see all)
            </div>
          )}

          {filteredTeam.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sales team members found in the selected category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadSalesTeam;
