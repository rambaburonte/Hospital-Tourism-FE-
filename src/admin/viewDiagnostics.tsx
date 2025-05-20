import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

interface Diagnostic {
  diognosticsId: number;
  diognosticsName: string;
  diognosticsDescription: string;
  diognosticsImage: string;
  diognosticsrating: string;
  diognosticsaddress: string;
}

const DiagnosticsList: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'rating'>('name');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/diagnostics')
      .then(res => setDiagnostics(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredDiagnostics = diagnostics
    .filter(d =>
      d.diognosticsName.toLowerCase().includes(search.toLowerCase()) ||
      d.diognosticsDescription.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortKey === 'name'
        ? a.diognosticsName.localeCompare(b.diognosticsName)
        : parseFloat(b.diognosticsrating) - parseFloat(a.diognosticsrating)
    );

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Diagnostic Centers</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as 'name' | 'rating')}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDiagnostics.map(d => (
              <div
                key={d.diognosticsId}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={d.diognosticsImage}
                    alt={d.diognosticsName}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{d.diognosticsName}</h3>
                  <p className="text-gray-600 mb-2">{d.diognosticsDescription}</p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Address:</span> {d.diognosticsaddress}
                  </p>
                  <div className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-700">{d.diognosticsrating}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/admin/labtests/${d.diognosticsId}`)}
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                >
                  View Tests
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsList;
