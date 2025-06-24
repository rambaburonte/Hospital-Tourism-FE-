import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '@/config/config';
import Sidebar from '../AdminSidebar';

interface SubAdmin {
    id: number;
    adminName: string;
    adminEmail: string;
    employeeId?: string;
    permissions: string[];
    role: string;
    status: string;
}

// Permission categories and their actions (same as in SubAdminRegister)
const permissionCategories = [
  {
    name: 'Doctors',
    permissions: ['Add Doctor', 'Edit Doctor', 'View Doctors', 'Delete Doctor', 'Download Doctors'],
  },
  {
    name: 'Hospitals',
    permissions: ['Add Hospital', 'Edit Hospital', 'View Hospitals', 'Delete Hospital', 'Download Hospitals'],
  },
  {
    name: 'Diagnostics',
    permissions: ['Add Diagnostics', 'Edit Diagnostics', 'View Diagnostics', 'Delete Diagnostics', 'Download Diagnostics'],
  },
  {
    name: 'Lab Tests',
    permissions: ['Add Lab Tests', 'Edit Lab Tests', 'View Lab Tests', 'Delete Lab Tests', 'Download Lab Tests'],
  },
  {
    name: 'Translators',
    permissions: ['Add Translators', 'Edit Translators', 'View Translators', 'Delete Translators', 'Download Translators'],
  },
  {
    name: 'Chefs',
    permissions: ['Add Chefs', 'Edit Chefs', 'View Chefs', 'Delete Chefs', 'Download Chefs'],
  },
  {
    name: 'Physios',
    permissions: ['Add Physios', 'Edit Physios', 'View Physios', 'Delete Physios', 'Download Physios'],
  },
  {
    name: 'Spa Centers',
    permissions: ['Add Spa Centers', 'Edit Spa Centers', 'View Spa Centers', 'Delete Spa Centers', 'Download Spa Centers'],
  },
  {
    name: 'Spa Services',
    permissions: ['Add Spa Services', 'Edit Spa Services', 'View Spa Services', 'Delete Spa Services', 'Download Spa Services'],
  },
];

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const inputVariants = {
  focus: {
    scale: 1.02,
    boxShadow: '0 0 8px rgba(22, 163, 74, 0.5)',
    transition: { duration: 0.3 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.1, ease: 'easeOut' },
  }),
};

const UpdateSubAdmin = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const navigate = useNavigate();
    const [subAdmin, setSubAdmin] = useState<SubAdmin>({
        id: 0,
        adminName: '',
        adminEmail: '',
        employeeId: '',
        permissions: [],
        role: 'subadmin',
        status: 'active'
    });
    const [originalSubAdmin, setOriginalSubAdmin] = useState<SubAdmin | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectAllState, setSelectAllState] = useState<Record<string, boolean>>(
        permissionCategories.reduce((acc, category) => {
            acc[category.name] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );    useEffect(() => {
        const fetchSubAdmin = async () => {
            if (!employeeId) {
                setError('No sub-admin Employee ID provided');
                setLoading(false);
                toast.error('No sub-admin Employee ID provided');
                return;
            }            try {
                console.log('Fetching sub-admin with Employee ID:', employeeId);
                const response = await axios.get(`${BASE_URL}/admin/get-subadmin-by-employee/${employeeId}`, {
                    timeout: 10000 // 10 second timeout
                });
                console.log('Fetched sub-admin data:', response.data);
                
                const fetchedSubAdmin = response.data;
                
                // Verify this is actually a sub-admin
                if (fetchedSubAdmin.role !== 'subadmin') {
                    setError('This user is not a sub-admin');
                    setLoading(false);
                    toast.error('This user is not a sub-admin');
                    return;
                }
                
                setSubAdmin(fetchedSubAdmin);
                setOriginalSubAdmin(fetchedSubAdmin);
                
                // Set initial select all state based on fetched permissions
                const initialSelectAllState = permissionCategories.reduce((acc, category) => {
                    const allCategoryPermissions = category.permissions.every(perm => 
                        fetchedSubAdmin.permissions && fetchedSubAdmin.permissions.includes(perm)
                    );
                    acc[category.name] = allCategoryPermissions;
                    return acc;
                }, {} as Record<string, boolean>);
                setSelectAllState(initialSelectAllState);
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching sub-admin:', err);
                let errorMessage = 'Failed to fetch sub-admin details.';
                
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        errorMessage = 'Sub-admin not found';
                    } else if (err.response?.data) {
                        errorMessage = err.response.data;
                    }
                }
                
                setError(errorMessage);
                setLoading(false);
                toast.error(errorMessage);
            }
        };

        fetchSubAdmin();
    }, [employeeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSubAdmin((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handlePermissionChange = (permission: string) => {
        setSubAdmin((prev) => {
            const newPermissions = prev.permissions.includes(permission)
                ? prev.permissions.filter(p => p !== permission)
                : [...prev.permissions, permission];
            return { ...prev, permissions: newPermissions };
        });
        
        // Update "Select All" state for the category
        const category = permissionCategories.find((cat) =>
            cat.permissions.includes(permission)
        );
        if (category) {
            const currentPermissions = subAdmin.permissions.includes(permission)
                ? subAdmin.permissions.filter(p => p !== permission)
                : [...subAdmin.permissions, permission];
            
            const allSelected = category.permissions.every((perm) =>
                currentPermissions.includes(perm)
            );
            
            setSelectAllState((prev) => ({
                ...prev,
                [category.name]: allSelected,
            }));
        }
        setError('');
    };

    const handleSelectAll = (category: { name: string; permissions: string[] }) => {
        const newSelectAllState = !selectAllState[category.name];
        setSelectAllState((prev) => ({
            ...prev,
            [category.name]: newSelectAllState,
        }));

        setSubAdmin((prev) => {
            let updatedPermissions = [...prev.permissions];
            if (newSelectAllState) {
                // Add all permissions from this category
                category.permissions.forEach((perm) => {
                    if (!updatedPermissions.includes(perm)) {
                        updatedPermissions.push(perm);
                    }
                });
            } else {
                // Remove all permissions from this category
                updatedPermissions = updatedPermissions.filter(
                    (perm) => !category.permissions.includes(perm)
                );
            }
            return { ...prev, permissions: updatedPermissions };
        });
        setError('');
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSubAdmin(originalSubAdmin!);
        
        // Reset select all state
        const resetSelectAllState = permissionCategories.reduce((acc, category) => {
            const allCategoryPermissions = category.permissions.every(perm => 
                originalSubAdmin!.permissions.includes(perm)
            );
            acc[category.name] = allCategoryPermissions;
            return acc;
        }, {} as Record<string, boolean>);
        setSelectAllState(resetSelectAllState);
        
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!subAdmin.adminName || subAdmin.adminName.trim().length < 2) {
            setError('Name must be at least 2 characters');
            return false;
        }
        if (!subAdmin.adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subAdmin.adminEmail)) {
            setError('Valid email is required');
            return false;
        }
        if (!subAdmin.employeeId || subAdmin.employeeId.trim().length < 4) {
            setError('Employee ID must be at least 4 characters');
            return false;
        }
        if (subAdmin.permissions.length === 0) {
            setError('At least one permission is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the form errors');
            return;
        }
        
        setUpdating(true);
        setError('');
        
        try {
            const response = await axios.put(`${BASE_URL}/admin/update-subadmin/${subAdmin.id}`, {
                adminName: subAdmin.adminName,
                adminEmail: subAdmin.adminEmail,
                employeeId: subAdmin.employeeId,
                permissions: subAdmin.permissions,
                role: subAdmin.role,
                status: subAdmin.status
            });
            
            setOriginalSubAdmin(subAdmin);
            setIsEditing(false);
            setSuccess('Sub-admin updated successfully!');
            toast.success('Sub-admin updated successfully!');
            
            // Optionally redirect after success
            setTimeout(() => {
                navigate('/admin/viewsubadmins');
            }, 2000);        } catch (err: unknown) {
            let errorMsg = 'Failed to update sub-admin.';
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosError = err as { response?: { data?: string } };
                errorMsg = axiosError.response?.data || errorMsg;
            }
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setUpdating(false);
        }
    };    if (loading) {
        return (
            <div className="min-h-screen bg-green-50 flex">
                <Sidebar />
                <div className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-green-700 font-medium">Loading sub-admin details...</p>
                        <p className="mt-2 text-sm text-gray-500">Employee ID: {employeeId || 'Not provided'}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-green-50 flex">
                <Sidebar />
                <div className="flex-1 p-6 flex items-center justify-center">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-red-200 p-6 text-center">
                        <div className="text-red-500 text-6xl mb-4">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Sub-Admin</h2>
                        <p className="text-red-600 mb-4">{error}</p>
                        <div className="space-x-3">
                            <button
                                onClick={() => navigate('/admin/viewsubadmins')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>
                                Back to Sub-Admins List
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 flex">
            <Sidebar />
            <div className="flex-1 p-6">
                <Toaster position="top-right" />
                <motion.div
                    className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-green-100"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-green-200 bg-green-50">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-green-800">
                                {isEditing ? 'Edit Sub-Admin' : 'Sub-Admin Details'}
                            </h1>
                            <div className="flex space-x-3">
                                {!isEditing ? (
                                    <>
                                        <button
                                            onClick={handleEdit}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        >
                                            <i className="fas fa-edit mr-2"></i>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => navigate('/admin/viewsubadmins')}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                        >
                                            <i className="fas fa-arrow-left mr-2"></i>
                                            Back to List
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Messages */}
                    {error && (
                        <div className="mx-6 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="mx-6 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            <i className="fas fa-check-circle mr-2"></i>
                            {success}
                        </div>
                    )}
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Admin Name */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Name *
                                </label>
                                {isEditing ? (
                                    <motion.input
                                        type="text"
                                        name="adminName"
                                        value={subAdmin.adminName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                        variants={inputVariants}
                                        whileFocus="focus"
                                    />
                                ) : (
                                    <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                                        {subAdmin.adminName}
                                    </div>
                                )}
                            </div>
                            
                            {/* Admin Email */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Email *
                                </label>
                                {isEditing ? (
                                    <motion.input
                                        type="email"
                                        name="adminEmail"
                                        value={subAdmin.adminEmail}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                        variants={inputVariants}
                                        whileFocus="focus"
                                    />
                                ) : (
                                    <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                                        {subAdmin.adminEmail}
                                    </div>
                                )}
                            </div>
                            
                            {/* Employee ID */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Employee ID
                                </label>
                                {isEditing ? (
                                    <motion.input
                                        type="text"
                                        name="employeeId"
                                        value={subAdmin.employeeId || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        variants={inputVariants}
                                        whileFocus="focus"
                                    />
                                ) : (
                                    <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                                        {subAdmin.employeeId || 'Not provided'}
                                    </div>
                                )}
                            </div>
                            
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Status
                                </label>
                                <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        subAdmin.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {subAdmin.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Permissions */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-green-700 mb-3">
                                Permissions {isEditing && '*'}
                            </label>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {permissionCategories.map((category, index) => (
                                    <motion.div
                                        key={category.name}
                                        className="bg-green-50 p-4 rounded-md border border-green-200"
                                        custom={index}
                                        variants={categoryVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-green-700 font-semibold">{category.name}</h3>
                                            {isEditing && (
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectAllState[category.name]}
                                                        onChange={() => handleSelectAll(category)}
                                                        className="h-4 w-4 text-green-600 border-green-200 rounded focus:ring-green-500"
                                                    />
                                                    <span className="text-sm text-green-700">Select All</span>
                                                </label>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {category.permissions.map((permission) => (
                                                <label key={permission} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={subAdmin.permissions.includes(permission)}
                                                        onChange={() => isEditing && handlePermissionChange(permission)}
                                                        disabled={!isEditing}
                                                        className="h-4 w-4 text-green-600 border-green-200 rounded focus:ring-green-500 disabled:opacity-50"
                                                    />
                                                    <span className="text-sm text-green-700">{permission}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {subAdmin.permissions.length === 0 && (
                                <p className="mt-2 text-sm text-gray-500">No permissions assigned</p>
                            )}
                        </div>
                        
                        {/* Submit Button */}
                        {isEditing && (
                            <div className="mt-6 flex justify-end">
                                <motion.button
                                    type="submit"
                                    disabled={updating}
                                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    whileHover={{ scale: updating ? 1 : 1.02 }}
                                    whileTap={{ scale: updating ? 1 : 0.98 }}
                                >
                                    {updating ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-save mr-2"></i>
                                            Update Sub-Admin
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateSubAdmin;
