// import React, { useState, useEffect } from 'react';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface SpaService {
//   serviceId: number;
//   serviceName: string;
//   serviceDescription: string;
//   serviceImage: string;
//   rating: number;
//   price: number;
//   status: string;
//   spaCenterId: number;
// }

// const DeleteSpaServices: React.FC = () => {
//   const [spaServices, setSpaServices] = useState<SpaService[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchSpaServices();
//   }, []);

//   const fetchSpaServices = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/spaServices/getAll/spaServices`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch spa services');
//       }
//       const data = await response.json();
//       setSpaServices(data);
//     } catch (err) {
//       console.error('Error fetching spa services:', err);
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSoftDelete = async (id: number) => {
//     setDeleting(id);
//     setError(null);

//     try {
//       const response = await fetch(`${BASE_URL}/spaServices/updateSpaService/${id}`, {
//         method: 'PUT',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete spa service');
//       }

//       // Refresh the list
//       await fetchSpaServices();
//     } catch (err) {
//       console.error('Error deleting spa service:', err);
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const handleActivate = async (id: number) => {
//     setDeleting(id);
//     setError(null);

//     try {
//       const response = await fetch(`${BASE_URL}/spaServices/activate/${id}`, {
//         method: 'PUT',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to activate spa service');
//       }

//       // Refresh the list
//       await fetchSpaServices();
//     } catch (err) {
//       console.error('Error activating spa service:', err);
//       setError(err instanceof Error ? err.message : 'An error occurred');
//     } finally {
//       setDeleting(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex">
//         <AdminSidebar />
//         <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
//           <div className="text-center">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <AdminSidebar />
//       <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Spa Services</h1>
          
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="py-2 px-4 border-b text-left">ID</th>
//                   <th className="py-2 px-4 border-b text-left">Service Name</th>
//                   <th className="py-2 px-4 border-b text-left">Rating</th>
//                   <th className="py-2 px-4 border-b text-left">Price</th>
//                   <th className="py-2 px-4 border-b text-left">Spa Center ID</th>
//                   <th className="py-2 px-4 border-b text-left">Status</th>
//                   <th className="py-2 px-4 border-b text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {spaServices.map((service) => (
//                   <tr key={service.serviceId} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border-b">{service.serviceId}</td>
//                     <td className="py-2 px-4 border-b">{service.serviceName}</td>
//                     <td className="py-2 px-4 border-b">{service.rating}</td>
//                     <td className="py-2 px-4 border-b">${service.price}</td>
//                     <td className="py-2 px-4 border-b">{service.spaCenterId}</td>
//                     <td className="py-2 px-4 border-b">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         service.status === 'Active' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {service.status}
//                       </span>
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {service.status === 'Active' ? (
//                         <button
//                           onClick={() => handleSoftDelete(service.serviceId)}
//                           disabled={deleting === service.serviceId}
//                           className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
//                         >
//                           {deleting === service.serviceId ? 'Deactivating...' : 'Deactivate'}
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleActivate(service.serviceId)}
//                           disabled={deleting === service.serviceId}
//                           className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
//                         >
//                           {deleting === service.serviceId ? 'Activating...' : 'Activate'}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {spaServices.length === 0 && (
//             <div className="text-center text-gray-500 py-8">
//               No spa services found.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteSpaServices;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface SpaService {
//   serviceId: number;
//   serviceName: string;
//   serviceDescription: string;
//   serviceImage: string;
//   rating: number;
//   price: number;
//   status?: string;
//   spaCenterId: number;
// }

// const DeleteSpaServices: React.FC = () => {
//   const [spaServices, setSpaServices] = useState<SpaService[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState<number | null>(null);
//   const { toast } = useToast();

//   const fetchSpaServices = async () => {
//     setLoading(true);
//     try {
//       console.log('Fetching spa services from:', `${BASE_URL}/spaServices/getAll/spaServices`);
//       const response = await axios.get<SpaService[]>(`${BASE_URL}/spaServices/getAll/spaServices`);
//       console.log('Spa services response:', response.data);
//       setSpaServices(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch spa services',
//         variant: 'destructive',
//       });
//       console.error('Error fetching spa services:', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Error status:', error.response?.status);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSpaServices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleStatusChange = async (id: number, newStatus: string) => {
//     setUpdating(id);
//     try {
//       const endpoint = newStatus === 'Active'
//         ? `${BASE_URL}/spaServices/activate/${id}`
//         : `${BASE_URL}/spaServices/updateSpaService/${id}`;
      
//       console.log(`Updating spa service ${id} to status: ${newStatus} via ${endpoint}`);
//       await axios.put(endpoint);
      
//       toast({
//         title: 'Success',
//         description: `Spa service status updated to ${newStatus}`,
//       });
      
//       // Update local state optimistically
//       setSpaServices(prev =>
//         prev.map(service =>
//           service.serviceId === id
//             ? { ...service, status: newStatus }
//             : service
//         )
//       );

//       // Refetch to ensure consistency with server
//       await fetchSpaServices();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to update spa service status',
//         variant: 'destructive',
//       });
//       console.error('Error updating spa service status:', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Error status:', error.response?.status);
//       }
//     } finally {
//       setUpdating(null);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Manage Spa Services</h1>
        
//         {loading ? (
//           <p>Loading spa services...</p>
//         ) : spaServices.length === 0 ? (
//           <p className="text-gray-500">No spa services available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Service Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Spa Center ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
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
//                 {spaServices.map((service) => (
//                   <tr key={service.serviceId}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{service.serviceName}</div>
//                       <div className="text-xs text-blue-600 mt-1">ID: {service.serviceId}</div>
//                       <div className="text-xs text-gray-500 mt-1 line-clamp-2">{service.serviceDescription}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{service.spaCenterId}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{service.rating}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">${service.price}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-medium px-2 py-1 rounded-full ${
//                         service.status === 'Inactive' 
//                           ? 'text-red-800 bg-red-100' 
//                           : 'text-green-800 bg-green-100'
//                       }`}>
//                         {service.status || 'Active'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <RadioGroup
//                         value={service.status || 'Active'}
//                         onValueChange={(value) => handleStatusChange(service.serviceId, value)}
//                         disabled={updating === service.serviceId}
//                         className="flex space-x-4"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Active" id={`active-${service.serviceId}`} />
//                           <Label htmlFor={`active-${service.serviceId}`}>Active</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Inactive" id={`inactive-${service.serviceId}`} />
//                           <Label htmlFor={`inactive-${service.serviceId}`}>Inactive</Label>
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

// export default DeleteSpaServices;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface SpaService {
//   serviceId: number;
//   serviceName: string;
//   serviceDescription: string;
//   serviceImage: string;
//   rating: number;
//   price: number;
//   status?: string;
//   spaCenterId: number;
// }

// const DeleteSpaServices: React.FC = () => {
//   const [spaServices, setSpaServices] = useState<SpaService[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState<number | null>(null);
//   const { toast } = useToast();

//   const fetchSpaServices = async () => {
//     setLoading(true);
//     try {
//       console.log('Fetching spa services from:', `${BASE_URL}/spaServices/getAll/spaServices`);
//       const response = await axios.get<SpaService[]>(`${BASE_URL}/spaServices/getAll/spaServices`);
//       console.log('Spa services response:', response.data);
//       // Ensure status is set to 'Active' if undefined
//       const services = response.data.map(service => ({
//         ...service,
//         status: service.status || 'Active',
//       }));
//       setSpaServices(services);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch spa services',
//         variant: 'destructive',
//       });
//       console.error('Error fetching spa services:', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Error status:', error.response?.status);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSpaServices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleStatusChange = async (id: number, newStatus: string) => {
//     if (id === undefined || id === null || isNaN(id)) {
//       toast({
//         title: 'Error',
//         description: 'Invalid service ID',
//         variant: 'destructive',
//       });
//       console.error('Invalid serviceId:', id);
//       return;
//     }

//     setUpdating(id);
//     try {
//       const endpoint = newStatus === 'Active'
//         ? `${BASE_URL}/spaServices/activate/${id}`
//         : `${BASE_URL}/spaServices/updateSpaService/${id}`;
      
//       console.log(`Attempting to update spa service ${id} to status: ${newStatus} via ${endpoint}`);
//       const response = await axios.put(endpoint, { status: newStatus }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log('Update response:', response.data);
      
//       toast({
//         title: 'Success',
//         description: `Spa service status updated to ${newStatus}`,
//       });
      
//       // Optimistic local state update
//       setSpaServices(prev =>
//         prev.map(service =>
//           service.serviceId === id
//             ? { ...service, status: newStatus }
//             : service
//         )
//       );

//       // Refetch to ensure consistency with server
//       await fetchSpaServices();
//     } catch (error) {
//       let errorMessage = 'Failed to update spa service status';
//       if (axios.isAxiosError(error)) {
//         errorMessage = error.response?.data?.message || error.response?.data || error.message || errorMessage;
//         console.error('Detailed error:', {
//           message: errorMessage,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//       } else {
//         console.error('Non-Axios error:', error);
//       }
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setUpdating(null);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Manage Spa Services</h1>
        
//         {loading ? (
//           <p>Loading spa services...</p>
//         ) : spaServices.length === 0 ? (
//           <p className="text-gray-500">No spa services available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Service Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Spa Center ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
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
//                 {spaServices.map((service) => (
//                   <tr key={service.serviceId}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{service.serviceName}</div>
//                       <div className="text-xs text-blue-600 mt-1">ID: {service.serviceId}</div>
//                       <div className="text-xs text-gray-500 mt-1 line-clamp-2">{service.serviceDescription}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{service.spaCenterId}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{service.rating}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">${service.price}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-medium px-2 py-1 rounded-full ${
//                         service.status === 'Inactive' 
//                           ? 'text-red-800 bg-red-100' 
//                           : 'text-green-800 bg-green-100'
//                       }`}>
//                         {service.status || 'Active'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <RadioGroup
//                         value={service.status || 'Active'}
//                         onValueChange={(value) => handleStatusChange(service.serviceId, value)}
//                         disabled={updating === service.serviceId}
//                         className="flex space-x-4"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Active" id={`active-${service.serviceId}`} />
//                           <Label htmlFor={`active-${service.serviceId}`}>Active</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Inactive" id={`inactive-${service.serviceId}`} />
//                           <Label htmlFor={`inactive-${service.serviceId}`}>Inactive</Label>
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

// export default DeleteSpaServices;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface SpaService {
//   serviceIdLong: number;
//   serviceName: string;
//   serviceDescription: string;
//   rating: number | null;
//   price: number;
//   spaCenterId: number;
//   status: string | null;
// }

// const DeleteSpaServices: React.FC = () => {
//   const [spaServices, setSpaServices] = useState<SpaService[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [updating, setUpdating] = useState<number | null>(null);
//   const { toast } = useToast();

//   const fetchSpaServices = async () => {
//     setLoading(true);
//     try {
//       console.log('Fetching spa services from:', `${BASE_URL}/spaServices/getAll/spaServices`);
//       const response = await axios.get<SpaService[]>(`${BASE_URL}/spaServices/getAll/spaServices`);
//       console.log('Spa services response:', response.data);
//       // Map null status to 'Inactive' for consistency
//       const services = response.data.map(service => ({
//         ...service,
//         status: service.status || 'Inactive',
//       }));
//       setSpaServices(services);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch spa services',
//         variant: 'destructive',
//       });
//       console.error('Error fetching spa services:', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         console.error('Error status:', error.response?.status);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSpaServices();
//   }, []);

//   const handleStatusChange = async (id: number, newStatus: string) => {
//     if (id === undefined || id === null || isNaN(id)) {
//       toast({
//         title: 'Error',
//         description: 'Invalid service ID',
//         variant: 'destructive',
//       });
//       console.error('Invalid serviceIdLong:', id);
//       return;
//     }

//     setUpdating(id);
//     try {
//       const endpoint = newStatus === 'Active'
//         ? `${BASE_URL}/spaServices/activate/${id}`
//         : `${BASE_URL}/spaServices/updateSpaService/${id}`;
      
//       console.log(`Attempting to update spa service ${id} to status: ${newStatus} via ${endpoint}`);
//       const response = await axios.put(endpoint, { status: newStatus }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log('Update response:', response.data);
      
//       toast({
//         title: 'Success',
//         description: `Spa service status updated to ${newStatus}`,
//       });
      
//       // Optimistic local state update
//       setSpaServices(prev =>
//         prev.map(service =>
//           service.serviceIdLong === id
//             ? { ...service, status: newStatus }
//             : service
//         )
//       );

//       // Refetch to ensure consistency with server
//       await fetchSpaServices();
//     } catch (error) {
//       let errorMessage = 'Failed to update spa service status';
//       if (axios.isAxiosError(error)) {
//         errorMessage = error.response?.data?.message || error.response?.data || error.message || errorMessage;
//         console.error('Detailed error:', {
//           message: errorMessage,
//           status: error.response?.status,
//           data: error.response?.data,
//         });
//       } else {
//         console.error('Non-Axios error:', error);
//       }
//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setUpdating(null);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64">
//         <h1 className="text-3xl font-bold mb-6">Manage Spa Services</h1>
        
//         {loading ? (
//           <p>Loading spa services...</p>
//         ) : spaServices.length === 0 ? (
//           <p className="text-gray-500">No spa services available.</p>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Service Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Spa Center ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Rating
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
//                 {spaServices.map((service) => (
//                   <tr key={service.serviceIdLong}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{service.serviceName}</div>
//                       <div className="text-xs text-blue-600 mt-1">ID: {service.serviceIdLong}</div>
//                       <div className="text-xs text-gray-500 mt-1 line-clamp-2">{service.serviceDescription}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{service.spaCenterId}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{service.rating ?? 'No rating'}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">${service.price}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-medium px-2 py-1 rounded-full ${
//                         service.status === 'Inactive' 
//                           ? 'text-red-800 bg-red-100' 
//                           : 'text-green-800 bg-green-100'
//                       }`}>
//                         {service.status}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <RadioGroup
//                         value={service.status}
//                         onValueChange={(value) => handleStatusChange(service.serviceIdLong, value)}
//                         disabled={updating === service.serviceIdLong}
//                         className="flex space-x-4"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Active" id={`active-${service.serviceIdLong}`} />
//                           <Label htmlFor={`active-${service.serviceIdLong}`}>Active</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="Inactive" id={`inactive-${service.serviceIdLong}`} />
//                           <Label htmlFor={`inactive-${service.serviceIdLong}`}>Inactive</Label>
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

// export default DeleteSpaServices;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface SpaService {
  serviceIdLong: number;
  serviceName: string;
  serviceDescription: string;
  rating: number | null;
  price: number;
  spaCenterId: number;
  status: string | null;
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
      // Map null status to 'Inactive' for consistency
      const services = response.data.map(service => ({
        ...service,
        status: service.status || 'Inactive',
      }));
      setSpaServices(services);
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? `Failed to fetch spa services: ${error.response?.data?.message || error.message}`
        : 'An unexpected error occurred while fetching spa services';
      toast({
        title: 'Error',
        description: errorMessage,
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
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    if (id === undefined || id === null || isNaN(id)) {
      toast({
        title: 'Error',
        description: 'Invalid service ID',
        variant: 'destructive',
      });
      console.error('Invalid serviceIdLong:', id);
      return;
    }

    setUpdating(id);
    try {
      const endpoint = newStatus === 'Active'
        ? `${BASE_URL}/spaServices/activate/${id}`
        : `${BASE_URL}/spaServices/updateSpaService/${id}`;
      
      console.log(`Attempting to update spa service ${id} to status: ${newStatus} via ${endpoint}`);
      console.log('Request payload:', { status: newStatus });
      
      const response = await axios.put(endpoint, { status: newStatus }, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      console.log('Update response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
      
      toast({
        title: 'Success',
        description: `Spa service status updated to ${newStatus}`,
      });
      
      // Optimistic local state update
      setSpaServices(prev =>
        prev.map(service =>
          service.serviceIdLong === id
            ? { ...service, status: newStatus }
            : service
        )
      );

      // Refetch to ensure consistency with server
      await fetchSpaServices();
    } catch (error) {
      let errorMessage = `Failed to ${newStatus === 'Active' ? 'activate' : 'deactivate'} spa service`;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.response?.data || error.message || errorMessage;
        console.error('Detailed error:', {
          message: errorMessage,
          status: error.response?.status,
          data: error.response?.data,
          endpoint,
          id,
        });
      } else {
        console.error('Non-Axios error:', error);
      }
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
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
                  <tr key={service.serviceIdLong}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.serviceName}</div>
                      <div className="text-xs text-blue-600 mt-1">ID: {service.serviceIdLong}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{service.serviceDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{service.spaCenterId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{service.rating ?? 'No rating'}</div>
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
                        onValueChange={(value) => handleStatusChange(service.serviceIdLong, value)}
                        disabled={updating === service.serviceIdLong}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Active" id={`active-${service.serviceIdLong}`} />
                          <Label htmlFor={`active-${service.serviceIdLong}`}>Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Inactive" id={`inactive-${service.serviceIdLong}`} />
                          <Label htmlFor={`inactive-${service.serviceIdLong}`}>Inactive</Label>
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