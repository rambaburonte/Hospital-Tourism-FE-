 import React, { useState, useEffect } from 'react';

// Define the User interface based on API response
interface User {
  id: number;
  name: string | null;
  email: string;
  mobilenum: number;
  country: string;
  password: string;
  role: string;
  emailVerified: boolean;
  verificationToken: string | null;
  profilePictureUrl: string | null;
  prescriptionUrl: string | null;
  patientaxraysUrl: string | null;
  patientreportsUrl: string | null;
  address: string | null;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/get-all-users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users. Please try again later.');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Country</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Email Verified</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Profile Picture</th>
              <th className="py-2 px-4 border">Prescription</th>
              <th className="py-2 px-4 border">X-Rays</th>
              <th className="py-2 px-4 border">Reports</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.name || 'N/A'}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.mobilenum || 'N/A'}</td>
                <td className="py-2 px-4 border">{user.country}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">{user.emailVerified ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">{user.address || 'N/A'}</td>
                <td className="py-2 px-4 border">
                  {user.profilePictureUrl ? (
                    <a href={user.profilePictureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {user.prescriptionUrl ? (
                    <a href={user.prescriptionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {user.patientaxraysUrl ? (
                    <a href={user.patientaxraysUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {user.patientreportsUrl ? (
                    <a href={user.patientreportsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;