// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface Hospital {
//   hospitalId: number;
//   hospitalName: string;  // Note: this is spelled with one 'p', matching the backend
//   hospitalDescription: string;
//   hospitalImage: string;
//   rating: string;
//   address: string;
//   status: string;
//   hospitallocationId?: number;
//   hospitallocationName?: string;
// }

// const DeleteHospital: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const { toast } = useToast();
//   const fetchHospitals = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<Hospital[]>(`${BASE_URL}/api/hospitals/getall/hospitals`);
//       setHospitals(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch hospitals',
//         variant: 'destructive',
//       });
//       console.error('Error fetching hospitals:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHospitals();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this hospital? This action cannot be undone.')) {
//       return;
//     }
    
//     setDeleting(true);
//     try {
//       // Using the soft-delete endpoint as found in the HospitalController
//       await axios.put(`${BASE_URL}/api/hospitals/soft-delete/${id}`);
      
//       toast({
//         title: 'Success',
//         description: 'Hospital deleted successfully',
//       });
      
//       // Refresh the list
//       fetchHospitals();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete hospital',
//         variant: 'destructive',
//       });
//       console.error('Error deleting hospital:', error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Delete Hospital</h1>
        
//         {loading ? (
//           <p>Loading hospitals...</p>
//         ) : hospitals.length === 0 ? (
//           <p className="text-gray-500">No hospitals available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">                {hospitals.map((hospital) => (
//                   <tr key={hospital.hospitalId}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{hospital.hospitalName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{hospital.hospitallocationName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{hospital.rating}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{hospital.status}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <Button
//                         onClick={() => handleDelete(hospital.hospitalId)}
//                         variant="destructive"
//                         size="sm"
//                         disabled={deleting}
//                       >
//                         {deleting ? 'Deleting...' : 'Delete'}
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeleteHospital;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  status: string;
  hospitallocationId?: number;
  hospitallocationName?: string;
}

const ManageHospitalStatus: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Hospital[]>(`${BASE_URL}/api/hospitals/getall/hospitals`);
      setHospitals(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch hospitals',
        variant: 'destructive',
      });
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (hospitalId: number, newStatus: string) => {
    setStatusLoading((prev) => ({ ...prev, [hospitalId]: true }));
    try {
      const endpoint =
        newStatus === 'Active'
          ? `${BASE_URL}/api/hospitals/activate/${hospitalId}`
          : `${BASE_URL}/api/hospitals/soft-delete/${hospitalId}`;
      await axios.put(endpoint);

      toast({
        title: 'Success',
        description: `Hospital status updated to ${newStatus}`,
      });

      // Update the hospital list to reflect the new status
      setHospitals((prev) =>
        prev.map((hospital) =>
          hospital.hospitalId === hospitalId ? { ...hospital, status: newStatus } : hospital
        )
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to update hospital status to ${newStatus}`,
        variant: 'destructive',
      });
      console.error(`Error updating hospital status to ${newStatus}:`, error);
    } finally {
      setStatusLoading((prev) => ({ ...prev, [hospitalId]: false }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-6 sm:p-8 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Hospital Status</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-gray-500 text-lg">No hospitals available.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hospitals.map((hospital) => (
                  <tr key={hospital.hospitalId} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{hospital.hospitalName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{hospital.hospitallocationName || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{hospital.rating || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold uppercase ${
                          hospital.status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                      >
                        {hospital.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`status-${hospital.hospitalId}`}
                            value="Active"
                            checked={hospital.status === 'Active'}
                            onChange={() => handleStatusChange(hospital.hospitalId, 'Active')}
                            disabled={statusLoading[hospital.hospitalId]}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Active</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`status-${hospital.hospitalId}`}
                            value="Inactive"
                            checked={hospital.status === 'Inactive'}
                            onChange={() => handleStatusChange(hospital.hospitalId, 'Inactive')}
                            disabled={statusLoading[hospital.hospitalId]}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Inactive</span>
                        </label>
                      </div>
                    </td>
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

export default ManageHospitalStatus;
