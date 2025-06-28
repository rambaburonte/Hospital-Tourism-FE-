
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface Diagnostic {
//   diognosticsId: number;
//   diognosticsName: string;
//   diognosticsDescription: string;
//   diognosticsImage: string;
//   diognosticsrating: string;
//   diognosticsaddress: string;
//   Status?: string;
// }

// const DeleteDiagnostics: React.FC = () => {
//   const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const { toast } = useToast();

//   const fetchDiagnostics = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<Diagnostic[]>(`${BASE_URL}/api/diagnostics`);
//       setDiagnostics(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch diagnostics',
//         variant: 'destructive',
//       });
//       console.error('Error fetching diagnostics:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDiagnostics();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this diagnostic center? This action cannot be undone.')) {
//       return;
//     }
    
//     setDeleting(true);
//     try {
//       // Using the soft-delete endpoint as found in the DiognosticsController
//       await axios.put(`${BASE_URL}/api/diagnostics/soft-delete/${id}`);
      
//       toast({
//         title: 'Success',
//         description: 'Diagnostic center deleted successfully',
//       });
      
//       // Refresh the list
//       fetchDiagnostics();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete diagnostic center',
//         variant: 'destructive',
//       });
//       console.error('Error deleting diagnostic center:', error);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Delete Diagnostic Center</h1>
        
//         {loading ? (
//           <p>Loading diagnostic centers...</p>
//         ) : diagnostics.length === 0 ? (
//           <p className="text-gray-500">No diagnostic centers available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Address
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
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {diagnostics.map((diagnostic) => (
//                   <tr key={diagnostic.diognosticsId}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{diagnostic.diognosticsName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{diagnostic.diognosticsaddress}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{diagnostic.diognosticsrating}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{diagnostic.Status || 'Active'}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <Button
//                         onClick={() => handleDelete(diagnostic.diognosticsId)}
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

// export default DeleteDiagnostics;















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface Diagnostic {
//   diognosticsId: number;
//   diognosticsName: string;
//   diognosticsDescription: string;
//   diognosticsImage: string;
//   diognosticsrating: string;
//   diognosticsaddress: string;
//   Status?: string;
// }

// const DeleteDiagnostics: React.FC = () => {
//   const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState<number | null>(null);
//   const { toast } = useToast();

//   const fetchDiagnostics = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<Diagnostic[]>(`${BASE_URL}/api/diagnostics`);
//       setDiagnostics(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch diagnostics',
//         variant: 'destructive',
//       });
//       console.error('Error fetching diagnostics:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDiagnostics();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleStatusChange = async (id: number, newStatus: string) => {
//     setUpdating(id);
//     try {
//       const endpoint = newStatus === 'Active'
//         ? `${BASE_URL}/api/diagnostics/activate/${id}`
//         : `${BASE_URL}/api/diagnostics/soft-delete/${id}`;
      
//       await axios.put(endpoint);
      
//       toast({
//         title: 'Success',
//         description: `Diagnostic center status updated to ${newStatus}`,
//       });
      
//       // Update local state
//       setDiagnostics(prev =>
//         prev.map(diagnostic =>
//           diagnostic.diognosticsId === id
//             ? { ...diagnostic, Status: newStatus }
//             : diagnostic
//         )
//       );
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to update diagnostic center status',
//         variant: 'destructive',
//       });
//       console.error('Error updating diagnostic status:', error);
//     } finally {
//       setUpdating(null);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Manage Diagnostic Centers</h1>
        
//         {loading ? (
//           <p>Loading diagnostic centers...</p>
//         ) : diagnostics.length === 0 ? (
//           <p className="text-gray-500">No diagnostic centers available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Address
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
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {diagnostics.map((diagnostic) => (
//                   <tr key={diagnostic.diognosticsId}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{diagnostic.diognosticsName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{diagnostic.diognosticsaddress}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{diagnostic.diognosticsrating}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{diagnostic.Status || 'Active'}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <RadioGroup
//                         value={diagnostic.Status || 'Active'}
//                         onValueChange={(value) => handleStatusChange(diagnostic.diognosticsId, value)}
//                         disabled={updating === diagnostic.diognosticsId}
//                         className="flex space-x-4"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Active" id={`active-${diagnostic.diognosticsId}`} />
//                           <Label htmlFor={`active-${diagnostic.diognosticsId}`}>Active</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Inactive" id={`inactive-${diagnostic.diognosticsId}`} />
//                           <Label htmlFor={`inactive-${diagnostic.diognosticsId}`}>Inactive</Label>
//                         </div>
//                       </RadioGroup>
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

// export default DeleteDiagnostics;












import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Diagnostic {
  diognosticsId: number;
  diognosticsName: string;
  diognosticsDescription: string;
  diognosticsImage: string;
  diognosticsrating: string;
  diognosticsaddress: string;
  Status?: string;
}

const DeleteDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Diagnostic[]>(`${BASE_URL}/api/diagnostics`);
      setDiagnostics(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch diagnostics',
        variant: 'destructive',
      });
      console.error('Error fetching diagnostics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdating(id);
    try {
      const endpoint = newStatus === 'Active'
        ? `${BASE_URL}/api/diagnostics/activate/${id}`
        : `${BASE_URL}/api/diagnostics/soft-delete/${id}`;
      
      await axios.put(endpoint);
      
      toast({
        title: 'Success',
        description: `Diagnostic center status updated to ${newStatus}`,
      });
      
      // Update local state
      setDiagnostics(prev =>
        prev.map(diagnostic =>
          diagnostic.diognosticsId === id
            ? { ...diagnostic, Status: newStatus }
            : diagnostic
        )
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update diagnostic center status',
        variant: 'destructive',
      });
      console.error('Error updating diagnostic status:', error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Diagnostic Centers</h1>
        
        {loading ? (
          <p>Loading diagnostic centers...</p>
        ) : diagnostics.length === 0 ? (
          <p className="text-gray-500">No diagnostic centers available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {diagnostics.map((diagnostic) => (
                  <tr key={diagnostic.diognosticsId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{diagnostic.diognosticsName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{diagnostic.diognosticsaddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{diagnostic.diognosticsrating}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                        diagnostic.Status === 'Inactive' 
                          ? 'text-red-800 bg-red-100' 
                          : 'text-green-800 bg-green-100'
                      }`}>
                        {diagnostic.Status || 'Active'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <RadioGroup
                        value={diagnostic.Status || 'Active'}
                        onValueChange={(value) => handleStatusChange(diagnostic.diognosticsId, value)}
                        disabled={updating === diagnostic.diognosticsId}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Active" id={`active-${diagnostic.diognosticsId}`} />
                          <Label htmlFor={`active-${diagnostic.diognosticsId}`}>Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Inactive" id={`inactive-${diagnostic.diognosticsId}`} />
                          <Label htmlFor={`inactive-${diagnostic.diognosticsId}`}>Inactive</Label>
                        </div>
                      </RadioGroup>
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

export default DeleteDiagnostics;