import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Adjust path based on your project structure

interface User {
  id: number;
  name?: string;
  email: string;
  mobilenum: number;
  country: string;
  password: string;
  role: string;
  emailVerified: boolean;
  verificationToken?: string | null;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios.get('https://healthtourism-5.onrender.com/user')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">All Users</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow text-sm">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Mobile</th>
                  <th className="px-4 py-2">Country</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Verified</th>
                  {/* <th className="px-4 py-2">Token</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-center">{user.id}</td>
                    <td className="px-4 py-2 text-center">{user.name ?? 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{user.email}</td>
                    <td className="px-4 py-2 text-center">{user.mobilenum}</td>
                    <td className="px-4 py-2 text-center">{user.country}</td>
                    <td className="px-4 py-2 text-center">{user.role}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={user.emailVerified ? 'text-green-600' : 'text-red-600'}>
                        {user.emailVerified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    {/* <td className="px-4 py-2 text-center break-all">{user.verificationToken ?? '—'}</td> */}
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

export default UsersPage;
