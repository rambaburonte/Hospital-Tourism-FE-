// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface LabTest {
//   id: number; // Changed from testId to id to match backend entity
//   testTitle: string;
//   testDescription: string;
//   testPrice: number;
//   testDepartment: string;
//   testImage: string;
//   status?: string;
// }

// const DeleteLabTests: React.FC = () => {
//   const [labTests, setLabTests] = useState<LabTest[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const { toast } = useToast();

//   const fetchLabTests = async () => {
//     setLoading(true);
//     try {
//       console.log('Fetching lab tests from:', `${BASE_URL}/api/labtests`);
//       const response = await axios.get<LabTest[]>(`${BASE_URL}/api/labtests`);
//       console.log('Lab tests response:', response.data);
//       setLabTests(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch lab tests',
//         variant: 'destructive',
//       });
//       console.error('Error fetching lab tests:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLabTests();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to soft delete this lab test? It will be marked as inactive.')) {
//       return;
//     }
    
//     setDeleting(true);
//     try {
//       console.log('Soft deleting lab test ID:', id);
//       // Using the soft-delete endpoint as found in the LabtestsController
//       await axios.put(`${BASE_URL}/api/labtests/soft-delete/${id}`);
      
//       toast({
//         title: 'Success',
//         description: 'Lab test marked as inactive successfully',
//       });
      
//       // Refresh the list
//       fetchLabTests();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete lab test',
//         variant: 'destructive',
//       });
//       console.error('Error deleting lab test:', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Error status:', error.response?.status);
//       }
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleActivate = async (id: number) => {
//     if (!window.confirm('Are you sure you want to activate this lab test?')) {
//       return;
//     }
    
//     setDeleting(true);
//     try {
//       console.log('Activating lab test ID:', id);
//       // Using the activate endpoint as found in the LabtestsController
//       await axios.put(`${BASE_URL}/api/labtests/activate/${id}`);
      
//       toast({
//         title: 'Success',
//         description: 'Lab test activated successfully',
//       });
      
//       // Refresh the list
//       fetchLabTests();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to activate lab test',
//         variant: 'destructive',
//       });
//       console.error('Error activating lab test:', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Error status:', error.response?.status);
//       }
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Delete Lab Test</h1>
        
//         {loading ? (
//           <p>Loading lab tests...</p>
//         ) : labTests.length === 0 ? (
//           <p className="text-gray-500">No lab tests available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Test Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Department
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
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
//                 {labTests.map((test) => (
//                   <tr key={test.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{test.testTitle}</div>
//                       <div className="text-xs text-blue-600 mt-1">ID: {test.id}</div>
//                       <div className="text-xs text-gray-500 mt-1 line-clamp-2">{test.testDescription}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{test.testDepartment}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">${test.testPrice}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         test.status === 'Active' 
//                           ? 'bg-green-100 text-green-800' 
//                           : test.status === 'Inactive'
//                           ? 'bg-red-100 text-red-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {test.status || 'Active'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       {test.status === 'Inactive' ? (
//                         <Button
//                           onClick={() => handleActivate(test.id)}
//                           variant="outline"
//                           size="sm"
//                           disabled={deleting}
//                           className="text-green-600 hover:text-green-800"
//                         >
//                           {deleting ? 'Activating...' : 'Activate'}
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={() => handleDelete(test.id)}
//                           variant="destructive"
//                           size="sm"
//                           disabled={deleting}
//                         >
//                           {deleting ? 'Deleting...' : 'Soft Delete'}
//                         </Button>
//                       )}
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

// export default DeleteLabTests;















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SpaService {
  serviceId: number;
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  rating: number;
  price: number;
  status: string;
  spaCenterId: number;
}

const DeleteSpaServices: React.FC = () => {
  const [spaServices, setSpaServices] = useState<SpaService[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchSpaServices = async () => {
    setLoading(true);
    try {
      console.log('Fetching spa services from:', `${BASE_URL}/spaServices/getAll/spaServices`);
      const response = await axios.get<SpaService[]>(`${BASE_URL}/spaServices/getAll/spaServices`);
      console.log('Spa services response:', response.data);
      // Ensure status is set to 'Active' if undefined
      const services = response.data.map(service => ({
        ...service,
        status: service.status || 'Active',
      }));
      setSpaServices(services);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch spa services',
        variant: 'destructive',
      });
      console.error('Error fetching spa services:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdating(id);
    try {
      const endpoint = newStatus === 'Active'
        ? `${BASE_URL}/spaServices/activate/${id}`
        : `${BASE_URL}/spaServices/updateSpaService/${id}`;
      
      console.log(`Updating spa service ${id} to status: ${newStatus} via ${endpoint}`);
      const response = await axios.put(endpoint);
      console.log('Update response:', response.data);

      toast({
        title: 'Success',
        description: `Spa service status updated to ${newStatus}`,
      });

      // Refetch data to ensure UI reflects server state
      await fetchSpaServices();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update spa service status',
        variant: 'destructive',
      });
      console.error('Error updating spa service status:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
      }
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Spa Services</h1>
        
        {loading ? (
          <p>Loading spa services...</p>
        ) : spaServices.length === 0 ? (
          <p className="text-gray-500">No spa services available.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spa Center ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
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
                {spaServices.map((service) => (
                  <tr key={service.serviceId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.serviceName}</div>
                      <div className="text-xs text-blue-600 mt-1">ID: {service.serviceId}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{service.serviceDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{service.spaCenterId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{service.rating}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${service.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                        service.status === 'Inactive' 
                          ? 'text-red-800 bg-red-100' 
                          : 'text-green-800 bg-green-100'
                      }`}>
                        {service.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <RadioGroup
                        value={service.status}
                        onValueChange={(value) => handleStatusChange(service.serviceId, value)}
                        disabled={updating === service.serviceId}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Active" id={`active-${service.serviceId}`} />
                          <Label htmlFor={`active-${service.serviceId}`}>Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Inactive" id={`inactive-${service.serviceId}`} />
                          <Label htmlFor={`inactive-${service.serviceId}`}>Inactive</Label>
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

export default DeleteSpaServices;