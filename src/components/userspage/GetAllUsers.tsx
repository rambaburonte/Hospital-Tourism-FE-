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
  DialogDescription,
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
  Search,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  UserCircle,
} from 'lucide-react';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { BASE_URL } from '@/config/config';

// User interface based on API response
interface User {
  id: number;
  name: string | null;
  email: string;
  mobilenum: number;
  country: string;
  role: string;
  emailVerified: boolean;
  profilePictureUrl: string | null;
  prescriptionUrl: string | null;
  patientaxraysUrl: string | null;
  patientreportsUrl: string | null;
  address: string | null;
  bookingIds: string | null;
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
  users: User[];
  totalItems: number;
}

// Fetch users with pagination, search, and sorting
const fetchUsers = async (
  page: number,
  pageSize: number,
  search: string,
  sort: { field: keyof User; direction: 'asc' | 'desc' }
): Promise<{ data: User[]; total: number }> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
    sortField: sort.field,
    sortDirection: sort.direction,
  });

  const apiUrl = `${BASE_URL}/user/get-all-users?${queryParams.toString()}`;
  
  const response = await fetch(apiUrl);

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to fetch users. Status: ${response.status}. Details: ${errorData || 'No additional details'}`);
  }

  const responseData = await response.json();

  if ('users' in responseData && 'totalItems' in responseData) {
    return { data: responseData.users, total: responseData.totalItems };
  }

  if (Array.isArray(responseData)) {
    console.warn(
      'API returned an array instead of { users: [], totalItems: number }. ' +
      'Total count is set to array length, which may be inaccurate for pagination. ' +
      'Please update the backend to return totalItems for proper pagination.'
    );
    return { data: responseData as User[], total: responseData.length };
  }

  throw new Error('Invalid API response structure. Expected { users: User[], totalItems: number } or User[].');
};

const Users: React.FC = () => {
  const { theme, search, sort, isAdmin, toggleTheme, setSearch, setSort } = useAppStore();
  const [page, setPage] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'pdf' | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false); // New state for preview loading
  const pageSize = 10;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const { data, isLoading, error, isFetching, isPreviousData } = useQuery<{ data: User[]; total: number }, Error>({
    queryKey: ['users', page, search, sort],
    queryFn: () => fetchUsers(page, pageSize, search, sort),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
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

  const handleLinkClick = (url: string, user: User) => {
    setIsPreviewLoading(true);
    const extension = url.split('.').pop()?.toLowerCase();
    setPreviewType(extension === 'pdf' ? 'pdf' : (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '') ? 'image' : null));
    setPreviewError(null);
    setPreviewUrl(url);
    setSelectedUser(user);
  };

  const handleSwitchAttachment = (url: string) => {
    setIsPreviewLoading(true);
    const extension = url.split('.').pop()?.toLowerCase();
    setPreviewType(extension === 'pdf' ? 'pdf' : (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '') ? 'image' : null));
    setPreviewError(null);
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
    { label: 'Attachments', field: null },
  ];

  const attachmentTypes = [
    { key: 'profilePictureUrl', icon: UserCircle, title: 'Profile Picture' },
    { key: 'prescriptionUrl', icon: FileText, title: 'Prescription' },
    { key: 'patientaxraysUrl', icon: ImageIcon, title: 'X-Rays' },
    { key: 'patientreportsUrl', icon: FileText, title: 'Reports' },
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
                onChange={(e) => { setPage(1); setSearch(e.target.value); }}
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
                          onClick={() => { setPage(1); setSort(field); }}
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
                      <TableCell className="px-4 py-3 text-sm">
                        {user.emailVerified ? 
                          <span className="text-green-600 dark:text-green-400 font-medium">Yes</span> : 
                          <span className="text-orange-500 dark:text-orange-400 font-medium">No</span>}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          {[
                            { url: user.profilePictureUrl, icon: UserCircle, title: 'Profile Picture' },
                            { url: user.prescriptionUrl, icon: FileText, title: 'Prescription' },
                            { url: user.patientaxraysUrl, icon: ImageIcon, title: 'X-Rays' },
                            { url: user.patientreportsUrl, icon: FileText, title: 'Reports' },
                          ].map((item, index) => item.url && (
                            <Button
                              key={index}
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                              onClick={() => handleLinkClick(item.url!, user)}
                              title={`Preview ${item.title}`}
                            >
                              <item.icon className="h-4 w-4" />
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
        <Dialog open={!!previewUrl} onOpenChange={(isOpen) => { if (!isOpen) { setPreviewUrl(null); setPreviewError(null); setSelectedUser(null); setIsPreviewLoading(false); } }}>
          <DialogContent className="max-w-2xl w-[90vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl my-4 bg-white dark:bg-slate-800 p-0 shadow-xl rounded-lg">
            <DialogHeader className="p-4 sm:p-6 border-b dark:border-slate-700">
              <DialogTitle className="text-xl font-semibold">File Preview</DialogTitle>
              <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
                Previewing: {previewUrl ? previewUrl.substring(previewUrl.lastIndexOf('/') + 1) : 'File'} {selectedUser ? `for ${selectedUser.name || selectedUser.email}` : ''}
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="p-4 border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">User Attachments</h3>
                <div className="flex flex-wrap gap-2">
                  {attachmentTypes.map(({ key, icon: Icon, title }) => {
                    const url = selectedUser[key as keyof User] as string | null;
                    return (
                      <Button
                        key={key}
                        variant={url && url === previewUrl ? 'default' : 'outline'}
                        size="sm"
                        className={`flex items-center space-x-1 text-xs ${
                          !url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        onClick={() => url && handleSwitchAttachment(url)}
                        disabled={!url}
                        title={url ? `Preview ${title}` : `${title} not available`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{title}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-1 sm:p-4 h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-y-auto bg-slate-50 dark:bg-slate-800/50 relative">
              {isPreviewLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-800/80">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <span className="ml-2 text-slate-700 dark:text-slate-300">Loading preview...</span>
                </div>
              )}
              {previewError && !isPreviewLoading && (
                <div className="flex flex-col items-center justify-center h-full text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-md">
                  <AlertCircle className="w-10 h-10 mb-3" />
                  <p className="text-lg font-semibold">Preview Error</p>
                  <p className="text-sm text-center">{previewError}</p>
                  {previewUrl && (
                    <Button variant="outline" onClick={handleDownloadFromModal} className="mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Anyway
                    </Button>
                  )}
                </div>
              )}
              {!previewError && !isPreviewLoading && previewType === 'image' && previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-full object-contain rounded"
                  onLoad={() => setIsPreviewLoading(false)}
                  onError={() => {
                    console.error('Image load failed:', previewUrl);
                    setPreviewError('Failed to load image. The file might be corrupted, inaccessible, or not a valid image format.');
                    setIsPreviewLoading(false);
                  }}
                />
              )}
              {!previewError && !isPreviewLoading && previewType === 'pdf' && previewUrl && (
                <iframe
                  src={`${previewUrl}#view=FitH&toolbar=0`}
                  title="PDF Preview"
                  className="w-full h-full border-0 rounded"
                  onLoad={() => setIsPreviewLoading(false)}
                  onError={() => {
                    console.error('PDF load failed:', previewUrl);
                    setPreviewError('Failed to load PDF. The file might be corrupted, inaccessible, or not a valid PDF.');
                    setIsPreviewLoading(false);
                  }}
                />
              )}
              {!previewError && !isPreviewLoading && !previewType && previewUrl && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
                  <FileText className="w-12 h-12 mb-3" />
                  <p className="text-lg font-semibold">Preview Not Available</p>
                  <p className="text-sm text-center mt-1">This file type ({previewUrl.split('.').pop()?.toUpperCase()}) cannot be previewed.</p>
                  <Button variant="outline" onClick={handleDownloadFromModal} className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download File
                  </Button>
                </div>
              )}
            </div>
            <DialogFooter className="p-4 sm:p-6 border-t dark:border-slate-700 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              {isAdmin && previewUrl && !previewError && (previewType === 'image' || previewType === 'pdf') && (
                <Button onClick={handleDownloadFromModal}>
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
              )}
              <Button variant="outline" onClick={() => { setPreviewUrl(null); setPreviewError(null); setSelectedUser(null); setIsPreviewLoading(false); }}>
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