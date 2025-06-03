// import React, { useState, useEffect } from 'react';

// // Define the User interface based on API response
// interface User {
//   id: number;
//   name: string | null;
//   email: string;
//   mobilenum: number;
//   country: string;
//   password: string;
//   role: string;
//   emailVerified: boolean;
//   verificationToken: string | null;
//   profilePictureUrl: string | null;
//   prescriptionUrl: string | null;
//   patientaxraysUrl: string | null;
//   patientreportsUrl: string | null;
//   address: string | null;
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch users from the API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/user/get-all-users');
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data: User[] = await response.json();
//         setUsers(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching users. Please try again later.');
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Render loading state
//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   // Render error state
//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User List</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Email</th>
//               <th className="py-2 px-4 border">Mobile</th>
//               <th className="py-2 px-4 border">Country</th>
//               <th className="py-2 px-4 border">Role</th>
//               <th className="py-2 px-4 border">Email Verified</th>
//               <th className="py-2 px-4 border">Address</th>
//               <th className="py-2 px-4 border">Profile Picture</th>
//               <th className="py-2 px-4 border">Prescription</th>
//               <th className="py-2 px-4 border">X-Rays</th>
//               <th className="py-2 px-4 border">Reports</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border">{user.id}</td>
//                 <td className="py-2 px-4 border">{user.name || 'N/A'}</td>
//                 <td className="py-2 px-4 border">{user.email}</td>
//                 <td className="py-2 px-4 border">{user.mobilenum || 'N/A'}</td>
//                 <td className="py-2 px-4 border">{user.country}</td>
//                 <td className="py-2 px-4 border">{user.role}</td>
//                 <td className="py-2 px-4 border">{user.emailVerified ? 'Yes' : 'No'}</td>
//                 <td className="py-2 px-4 border">{user.address || 'N/A'}</td>
//                 <td className="py-2 px-4 border">
//                   {user.profilePictureUrl ? (
//                     <a href={user.profilePictureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       View
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {user.prescriptionUrl ? (
//                     <a href={user.prescriptionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       View
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {user.patientaxraysUrl ? (
//                     <a href={user.patientaxraysUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       View
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {user.patientreportsUrl ? (
//                     <a href={user.patientreportsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                       View
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Users;

// import React, { useState, Suspense } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { create } from 'zustand';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { AlertCircle, Loader2, Download, Moon, Sun, FileText } from 'lucide-react';
// import * as Papa from 'papaparse';
// import * as XLSX from 'xlsx';

// // Zustand store for theme, filters, and admin state
// interface AppState {
//   theme: 'light' | 'dark';
//   search: string;
//   sort: { field: keyof User; direction: 'asc' | 'desc' };
//   isAdmin: boolean;
//   toggleTheme: () => void;
//   setSearch: (search: string) => void;
//   setSort: (field: keyof User) => void;
// }

// const useAppStore = create<AppState>((set) => ({
//   theme: 'light',
//   search: '',
//   sort: { field: 'id', direction: 'asc' },
//   isAdmin: true, // Simulate admin role; integrate with your auth system
//   toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
//   setSearch: (search) => set({ search }),
//   setSort: (field) =>
//     set((state) => ({
//       sort: {
//         field,
//         direction: state.sort.field === field && state.sort.direction === 'asc' ? 'desc' : 'asc',
//       },
//     })),
// }));

// // User interface based on API response
// interface User {
//   id: number;
//   name: string | null;
//   email: string;
//   mobilenum: number;
//   country: string;
//   password: string;
//   role: string;
//   emailVerified: boolean;
//   verificationToken: string | null;
//   profilePictureUrl: string | null;
//   prescriptionUrl: string | null;
//   patientaxraysUrl: string | null;
//   patientreportsUrl: string | null;
//   address: string | null;
// }

// // Fetch users with pagination, search, and sorting
// const fetchUsers = async (
//   page: number,
//   pageSize: number,
//   search: string,
//   sort: { field: keyof User; direction: 'asc' | 'desc' }
// ): Promise<{ data: User[]; total: number }> => {
//   const response = await fetch(
//     `http://localhost:8080/user/get-all-users?page=${page}&size=${pageSize}&search=${search}&sort=${sort.field},${sort.direction}`
//   );
//   if (!response.ok) throw new Error('Failed to fetch users');
//   const data = await response.json();
//   return { data, total: data.length }; // Adjust if backend provides total
// };

// const Users: React.FC = () => {
//   const { theme, search, sort, isAdmin, toggleTheme, setSearch, setSort } = useAppStore();
//   const [page, setPage] = useState(1);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [previewType, setPreviewType] = useState<'image' | 'pdf' | null>(null);
//   const pageSize = 5;

//   // Fetch users with React Query
//   const { data, isLoading, error } = useQuery<{ data: User[]; total: number }, Error>({
//     queryKey: ['users', page, search, sort],
//     queryFn: () => fetchUsers(page, pageSize, search, sort),
//   });

//   // Export to CSV
//   const exportToCSV = () => {
//     if (!data?.data) return;
//     const csv = Papa.unparse(
//       data.data.map((user) => ({
//         ID: user.id,
//         Name: user.name || 'N/A',
//         Email: user.email,
//         Mobile: user.mobilenum || 'N/A',
//         Country: user.country,
//         Role: user.role,
//         'Email Verified': user.emailVerified ? 'Yes' : 'No',
//         Address: user.address || 'N/A',
//       }))
//     );
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'users.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Export to Excel
//   const exportToExcel = () => {
//     if (!data?.data) return;
//     const worksheet = XLSX.utils.json_to_sheet(
//       data.data.map((user) => ({
//         ID: user.id,
//         Name: user.name || 'N/A',
//         Email: user.email,
//         Mobile: user.mobilenum || 'N/A',
//         Country: user.country,
//         Role: user.role,
//         'Email Verified': user.emailVerified ? 'Yes' : 'No',
//         Address: user.address || 'N/A',
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
//     XLSX.writeFile(workbook, 'users.xlsx');
//   };

//   // Handle link click for preview
//   const handleLinkClick = (url: string) => {
//     console.log('Opening preview for URL:', url); // Debug log
//     const extension = url.split('.').pop()?.toLowerCase();
//     setPreviewType(extension === 'pdf' ? 'pdf' : 'image');
//     setPreviewUrl(url);
//   };

//   // Download from modal
//   const handleDownload = () => {
//     if (previewUrl) {
//       console.log('Downloading file:', previewUrl); // Debug log
//       const link = document.createElement('a');
//       link.href = previewUrl;
//       link.setAttribute('download', '');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       setPreviewUrl(null); // Close modal after download
//     }
//   };

//   return (
//     <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">User Management</h1>
//         <div className="flex space-x-4">
//           <Input
//             placeholder="Search by name or email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-64"
//           />
//           <Button onClick={toggleTheme} variant="outline" size="icon">
//             {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">
//                 <Download className="h-5 w-5 mr-2" />
//                 Export
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onClick={exportToCSV}>
//                 Export as CSV
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={exportToExcel}>
//                 Export as Excel
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="flex justify-center items-center h-64">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="flex justify-center items-center h-64 text-red-500">
//           <AlertCircle className="w-6 h-6 mr-2" />
//           <span>Error: {error.message}</span>
//         </div>
//       )}

//       {/* User Table */}
//       {!isLoading && !error && data?.data && (
//         <>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {[
//                   { label: 'ID', field: 'id' },
//                   { label: 'Name', field: 'name' },
//                   { label: 'Email', field: 'email' },
//                   { label: 'Mobile', field: 'mobilenum' },
//                   { label: 'Country', field: 'country' },
//                   { label: 'Role', field: 'role' },
//                   { label: 'Email Verified', field: 'emailVerified' },
//                   { label: 'Links', field: null },
//                 ].map(({ label, field }) => (
//                   <TableHead key={label}>
//                     {field ? (
//                       <Button
//                         variant="ghost"
//                         onClick={() => setSort(field as keyof User)}
//                         className="flex items-center space-x-1"
//                       >
//                         <span>{label}</span>
//                         {sort.field === field && (
//                           <span>{sort.direction === 'asc' ? '↑' : '↓'}</span>
//                         )}
//                       </Button>
//                     ) : (
//                       label
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.data.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name || 'N/A'}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.mobilenum || 'N/A'}</TableCell>
//                   <TableCell>{user.country}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       {user.profilePictureUrl && (
//                         <button
//                           onClick={() => handleLinkClick(user.profilePictureUrl!)}
//                           className="text-blue-500 hover:underline"
//                           type="button"
//                         >
//                           Profile
//                         </button>
//                       )}
//                       {user.prescriptionUrl && (
//                         <button
//                           onClick={() => handleLinkClick(user.prescriptionUrl!)}
//                           className="text-blue-500 hover:underline"
//                           type="button"
//                         >
//                           Prescription
//                         </button>
//                       )}
//                       {user.patientaxraysUrl && (
//                         <button
//                           onClick={() => handleLinkClick(user.patientaxraysUrl!)}
//                           className="text-blue-500 hover:underline"
//                           type="button"
//                         >
//                           X-Rays
//                         </button>
//                       )}
//                       {user.patientreportsUrl && (
//                         <button
//                           onClick={() => handleLinkClick(user.patientreportsUrl!)}
//                           className="text-blue-500 hover:underline"
//                           type="button"
//                         >
//                           Reports
//                         </button>
//                       )}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-4">
//             <Button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               variant="outline"
//             >
//               Previous
//             </Button>
//             <span>Page {page} of {Math.ceil((data.total || 0) / pageSize)}</span>
//             <Button
//               onClick={() => setPage((prev) => prev + 1)}
//               disabled={data.data.length < pageSize}
//               variant="outline"
//             >
//               Next
//             </Button>
//           </div>
//         </>
//       )}

//       {/* Preview Modal */}
//       <Suspense fallback={<div>Loading modal...</div>}>
//         <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
//           <DialogContent className="max-w-4xl z-[1000] bg-white dark:bg-gray-800">
//             <DialogHeader>
//               <DialogTitle>File Preview</DialogTitle>
//             </DialogHeader>
//             <div className="mt-4 h-[60vh] overflow-auto">
//               {previewType === 'image' && previewUrl && (
//                 <img
//                   src={previewUrl}
//                   alt="Preview"
//                   className="w-full h-auto max-h-[60vh] object-contain"
//                   onError={() => {
//                     console.error('Image load failed:', previewUrl);
//                     setPreviewUrl(null);
//                   }}
//                 />
//               )}
//               {previewType === 'pdf' && previewUrl && (
//                 <iframe
//                   src={`${previewUrl}#toolbar=0`}
//                   title="PDF Preview"
//                   className="w-full h-[60vh] border-0"
//                   onError={() => {
//                     console.error('PDF load failed:', previewUrl);
//                     setPreviewUrl(null);
//                   }}
//                 />
//               )}
//               {!previewType && previewUrl && (
//                 <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300">
//                   <FileText className="w-6 h-6 mr-2" />
//                   <span>Preview not available for this file type</span>
//                 </div>
//               )}
//             </div>
//             <DialogFooter>
//               {isAdmin && (
//                 <Button onClick={handleDownload}>
//                   <Download className="h-5 w-5 mr-2" />
//                   Download
//                 </Button>
//               )}
//               <Button variant="outline" onClick={() => setPreviewUrl(null)}>
//                 Close
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </Suspense>
//     </div>
//   );
// };

// export default Users;



import React, { useState, Suspense, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription, // Added for potential use
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertCircle,
  Loader2,
  Download,
  Moon,
  Sun,
  FileText,
  Search,      // Added
  ChevronUp,   // Added
  ChevronDown, // Added
  Image as ImageIcon, // Added (renamed to avoid conflict)
  UserCircle,  // Added
} from 'lucide-react';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';

// User interface based on API response
interface User {
  id: number;
  name: string | null;
  email: string;
  mobilenum: number; // Assuming this is always a number; if it can be null, handle accordingly
  country: string;
  password: string; // Consider if this should be exposed in the UI
  role: string;
  emailVerified: boolean;
  verificationToken: string | null;
  profilePictureUrl: string | null;
  prescriptionUrl: string | null;
  patientaxraysUrl: string | null;
  patientreportsUrl: string | null;
  address: string | null;
}

// Zustand store for theme, filters, and admin state
interface AppState {
  theme: 'light' | 'dark';
  search: string;
  sort: { field: keyof User; direction: 'asc' | 'desc' };
  isAdmin: boolean;
  toggleTheme: () => void;
  setSearch: (search: string) => void;
  setSort: (field: keyof User) => void;
}

const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  search: '',
  sort: { field: 'id', direction: 'asc' },
  isAdmin: true, // Simulate admin role; integrate with your auth system
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSearch: (search) => set({ search }),
  setSort: (field) =>
    set((state) => ({
      sort: {
        field,
        direction: state.sort.field === field && state.sort.direction === 'asc' ? 'desc' : 'asc',
      },
    })),
}));

// Define the expected API response structure for users
interface UsersApiResponse {
  users: User[];       // Or 'content', 'data', etc., depending on your backend
  totalItems: number;  // Or 'totalElements', 'totalCount', etc.
}

// Fetch users with pagination, search, and sorting
const fetchUsers = async (
  page: number, // API typically expects 0-indexed page for pagination, UI is 1-indexed
  pageSize: number,
  search: string,
  sort: { field: keyof User; direction: 'asc' | 'desc' }
): Promise<{ data: User[]; total: number }> => {
  // Adjust page for 0-indexed APIs if necessary, e.g., `apiPage = page - 1`
  // For this example, we'll assume the API endpoint is flexible or expects 1-indexed
  const apiUrl = "http://localhost:8080/user/get-all-users";
  
  const response = await fetch(apiUrl);

  if (!response.ok) {
    const errorData = await response.text(); // Try to get more details
    throw new Error(`Failed to fetch users. Status: ${response.status}. Details: ${errorData || 'No additional details'}`);
  }

  // IMPORTANT: This assumes your backend returns data in UsersApiResponse format
  const responseData: UsersApiResponse = await response.json();

  if (typeof responseData.users === 'undefined' || typeof responseData.totalItems === 'undefined') {
    console.error("API response for users is not in the expected format { users: [], totalItems: number }.", responseData);
    // Fallback: If the API returns just an array of users for the current page
    // This will lead to incorrect "Page X of Y" and "Next" button logic.
    // It's highly recommended to adjust the backend to provide a total count.
    if (Array.isArray(responseData)) {
        console.warn("Assuming the response is the user array itself for this page. Total count will be inaccurate.");
        return { data: responseData as User[], total: responseData.length }; // Highly problematic for total count
    }
    throw new Error("Invalid API response structure for users. Expected { users: User[], totalItems: number }.");
  }
  
  return { data: responseData.users, total: responseData.totalItems };
};


const Users: React.FC = () => {
  const { theme, search, sort, isAdmin, toggleTheme, setSearch, setSort } = useAppStore();
  const [page, setPage] = useState(1); // UI page is 1-indexed
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'pdf' | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const pageSize = 10; // Consider a slightly larger page size

  // Apply theme to HTML element for global Shadcn styles
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const { data, isLoading, error, isFetching, isPreviousData } = useQuery<{ data: User[]; total: number }, Error>({
    queryKey: ['users', page, search, sort],
    // If API is 0-indexed: queryFn: () => fetchUsers(page - 1, pageSize, search, sort),
    queryFn: () => fetchUsers(page, pageSize, search, sort), // Assuming API page is 1-indexed or flexible
    keepPreviousData: true, // Keeps previous data visible while new data is fetched
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  const exportToCSV = () => {
    if (!data?.data) return;
    const csvData = data.data.map((user) => ({
      ID: user.id,
      Name: user.name || 'N/A',
      Email: user.email,
      Mobile: user.mobilenum ? String(user.mobilenum) : 'N/A',
      Country: user.country,
      Role: user.role,
      'Email Verified': user.emailVerified ? 'Yes' : 'No',
      Address: user.address || 'N/A',
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    if (!data?.data) return;
    const excelData = data.data.map((user) => ({
      ID: user.id,
      Name: user.name || 'N/A',
      Email: user.email,
      Mobile: user.mobilenum ? String(user.mobilenum) : 'N/A',
      Country: user.country,
      Role: user.role,
      'Email Verified': user.emailVerified ? 'Yes' : 'No',
      Address: user.address || 'N/A',
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };

  const handleLinkClick = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    setPreviewType(extension === 'pdf' ? 'pdf' : (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '') ? 'image' : null));
    setPreviewError(null); // Reset error on new preview
    setPreviewUrl(url);
  };

  const handleDownloadFromModal = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.setAttribute('download', previewUrl.substring(previewUrl.lastIndexOf('/') + 1) || 'downloaded_file');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Optionally close modal after download: setPreviewUrl(null);
    }
  };
  
  const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 0;

  const tableHeaders = [
    { label: 'ID', field: 'id' as keyof User },
    { label: 'Name', field: 'name' as keyof User },
    { label: 'Email', field: 'email' as keyof User },
    { label: 'Mobile', field: 'mobilenum' as keyof User },
    { label: 'Country', field: 'country' as keyof User },
    { label: 'Role', field: 'role' as keyof User },
    { label: 'Verified', field: 'emailVerified' as keyof User },
    { label: 'Attachments', field: null }, // No sorting for this column
  ];

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
      <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search users..."
                value={search}
                onChange={(e) => {setPage(1); setSearch(e.target.value)}} // Reset to page 1 on search
                className="pl-10 w-full bg-white dark:bg-slate-800"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={toggleTheme} variant="outline" size="icon" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={exportToCSV}>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={exportToExcel}>Export as Excel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {(isLoading || (isFetching && isPreviousData)) && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-3 text-lg text-slate-700 dark:text-slate-300">Loading users...</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex flex-col justify-center items-center h-64 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-md">
          <AlertCircle className="w-12 h-12 mb-3" />
          <p className="text-xl font-semibold">Error Fetching Users</p>
          <p className="text-sm text-center mt-1 mb-4">{error.message}</p>
          <Button variant="destructive" onClick={() => window.location.reload()} className="mt-2">
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <Table>
              <TableHeader className="bg-slate-100 dark:bg-slate-800">
                <TableRow>
                  {tableHeaders.map(({ label, field }) => (
                    <TableHead key={label} className="px-4 py-3 text-xs sm:text-sm font-semibold uppercase text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {field ? (
                        <Button
                          variant="ghost"
                          onClick={() => {setPage(1); setSort(field)}} // Reset to page 1 on sort
                          className={`hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1 text-left w-full justify-start ${sort.field === field ? 'text-blue-600 dark:text-blue-400' : ''}`}
                        >
                          {label}
                          {sort.field === field && (
                            sort.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </Button>
                      ) : (
                        label
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={tableHeaders.length} className="h-32 text-center text-slate-500 dark:text-slate-400 text-lg">
                      <Search className="w-10 h-10 mx-auto mb-2 text-slate-400 dark:text-slate-500" />
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150">
                      <TableCell className="px-4 py-3 text-sm">{user.id}</TableCell>
                      <TableCell className="px-4 py-3 text-sm font-medium">{user.name || <span className="text-slate-400 dark:text-slate-500 italic">N/A</span>}</TableCell>
                      <TableCell className="px-4 py-3 text-sm">{user.email}</TableCell>
                      <TableCell className="px-4 py-3 text-sm">{user.mobilenum || <span className="text-slate-400 dark:text-slate-500 italic">N/A</span>}</TableCell>
                      <TableCell className="px-4 py-3 text-sm">{user.country}</TableCell>
                      <TableCell className="px-4 py-3 text-sm">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            user.role?.toLowerCase() === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300' :
                            user.role?.toLowerCase() === 'user' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300' :
                            'bg-slate-200 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300'
                        }`}>
                          {user.role || 'Unknown'}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm">{user.emailVerified ? 
                        <span className="text-green-600 dark:text-green-400 font-medium">Yes</span> : 
                        <span className="text-orange-500 dark:text-orange-400 font-medium">No</span>}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          {[
                            { url: user.profilePictureUrl, icon: UserCircle, title: "Profile Picture" },
                            { url: user.prescriptionUrl, icon: FileText, title: "Prescription" },
                            { url: user.patientaxraysUrl, icon: ImageIcon, title: "X-Rays" },
                            { url: user.patientreportsUrl, icon: FileText, title: "Reports" },
                          ].map((item, index) => item.url && (
                            <Button
                              key={index}
                              variant="ghost" // Changed from link for better click target with icon only
                              size="icon" 
                              className="h-7 w-7 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                              onClick={() => handleLinkClick(item.url!)}
                              title={`View ${item.title}`}
                            >
                              <item.icon className="h-4 w-4"/>
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Page {page} of {totalPages} <span className="hidden sm:inline">(Showing {data.data.length} of {data.total} users)</span>
              </p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1 || isFetching}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages || isFetching}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <Suspense fallback={
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[1001]">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
        </div>
      }>
        <Dialog open={!!previewUrl} onOpenChange={(isOpen) => { if (!isOpen) { setPreviewUrl(null); setPreviewError(null); } }}>
          <DialogContent className="max-w-2xl w-[90vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl z-[1000] bg-white dark:bg-slate-800 p-0 shadow-xl rounded-lg">
            <DialogHeader className="p-4 sm:p-6 border-b dark:border-slate-700">
              <DialogTitle className="text-xl font-semibold">File Preview</DialogTitle>
              <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
                Viewing: {previewUrl ? previewUrl.substring(previewUrl.lastIndexOf('/') + 1) : 'File'}
              </DialogDescription>
            </DialogHeader>
            <div className="p-1 sm:p-4 h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-y-auto bg-slate-50 dark:bg-slate-800/50">
              {previewError && (
                <div className="flex flex-col items-center justify-center h-full text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-md">
                  <AlertCircle className="w-10 h-10 mb-3" />
                  <p className="text-lg font-semibold">Preview Error</p>
                  <p className_name="text-sm text-center">{previewError}</p>
                </div>
              )}
              {!previewError && previewType === 'image' && previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-full object-contain rounded"
                  onError={() => {
                    console.error('Image load failed:', previewUrl);
                    setPreviewError('Failed to load image. The file might be corrupted, inaccessible, or not a valid image format.');
                  }}
                />
              )}
              {!previewError && previewType === 'pdf' && previewUrl && (
                <iframe
                  src={`${previewUrl}#view=FitH&toolbar=0`} // FitH for better initial view, toolbar hidden
                  title="PDF Preview"
                  className="w-full h-full border-0 rounded" // Use h-full to fill container
                  onError={() => { // Note: iframe onError is not always reliable for content errors
                    console.error('PDF load failed:', previewUrl);
                    setPreviewError('Failed to load PDF. The file might be corrupted, inaccessible, or not a valid PDF.');
                  }}
                />
              )}
              {!previewError && !previewType && previewUrl && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
                  <FileText className="w-12 h-12 mb-3" />
                  <p className="text-lg">Preview not available for this file type.</p>
                  <p className="text-sm mt-1">You can try downloading it to view.</p>
                </div>
              )}
            </div>
            <DialogFooter className="p-4 sm:p-6 border-t dark:border-slate-700 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              {isAdmin && previewUrl && !previewError && (previewType === 'image' || previewType === 'pdf' || !previewType /* Allow download for unknown too */) && (
                <Button onClick={handleDownloadFromModal}>
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
              )}
              <Button variant="outline" onClick={() => { setPreviewUrl(null); setPreviewError(null); }}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Suspense>
    </div>
  );
};

export default Users;