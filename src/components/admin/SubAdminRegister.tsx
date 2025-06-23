import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from '@/config/config';
import Sidebar from '../admin/AdminSidebar';

// Permission categories and their actions
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

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 12px rgba(22, 163, 74, 0.6)',
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
  pulse: {
    boxShadow: [
      '0 0 0 rgba(22, 163, 74, 0)',
      '0 0 10px rgba(22, 163, 74, 0.5)',
      '0 0 0 rgba(22, 163, 74, 0)',
    ],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
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

const SubAdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    employeeId: '',
    permissions: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isLoading, setIsLoading] = useState(false);
  const [selectAllState, setSelectAllState] = useState<Record<string, boolean>>(
    permissionCategories.reduce((acc, category) => {
      acc[category.name] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.adminName || formData.adminName.length < 2) {
      newErrors.adminName = 'Name must be at least 2 characters';
    }
    if (!formData.adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Valid email is required';
    }
    if (!formData.adminPassword || formData.adminPassword.length < 8 || !/[!@#$%^&*]/.test(formData.adminPassword)) {
      newErrors.adminPassword = 'Password must be 8+ characters with a special character';
    }
    if (!formData.employeeId || formData.employeeId.length < 4 || !/^[a-zA-Z0-9]+$/.test(formData.employeeId)) {
      newErrors.employeeId = 'Employee ID must be 4+ alphanumeric characters';
    }
    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePermissionChange = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
    setErrors((prev) => ({ ...prev, permissions: '' }));

    // Update "Select All" state for the category
    const category = permissionCategories.find((cat) =>
      cat.permissions.includes(permission)
    );
    if (category) {
      const allSelected = category.permissions.every((perm) =>
        formData.permissions.includes(perm) || perm === permission
      );
      const noneSelected = category.permissions.every(
        (perm) => !formData.permissions.includes(perm) && perm !== permission
      );
      setSelectAllState((prev) => ({
        ...prev,
        [category.name]: allSelected && !noneSelected,
      }));
    }
  };

  const handleSelectAll = (category: { name: string; permissions: string[] }) => {
    const newSelectAllState = !selectAllState[category.name];
    setSelectAllState((prev) => ({
      ...prev,
      [category.name]: newSelectAllState,
    }));

    setFormData((prev) => {
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

    setErrors((prev) => ({ ...prev, permissions: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/admin/subadminregister`, {
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        adminPassword: formData.adminPassword,
        employeeId: formData.employeeId,
        permissions: formData.permissions,
        role: 'subadmin',
        status: 'active'
      });
      toast.success(response.data.message || 'Sub-Admin registered successfully!');
      setFormData({
        adminName: '',
        adminEmail: '',
        adminPassword: '',
        employeeId: '',
        permissions: [],
      });      setSelectAllState(
        permissionCategories.reduce((acc, category) => {
          acc[category.name] = false;
          return acc;
        }, {} as Record<string, boolean>)
      );
      setTimeout(() => navigate('/admin/viewsubadmins'), 1500);    } catch (error) {
      const errorMsg = error?.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex">
      <Sidebar />
      <div className="flex-1 p-6 flex items-center justify-center">
        <Toaster position="top-right" />
        <motion.div
          className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg border border-green-100"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Register Sub-Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin Name */}
            <div>
              <label htmlFor="adminName" className="block text-sm font-medium text-green-700">
                Name
              </label>
              <motion.input
                type="text"
                id="adminName"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-green-200 rounded-md bg-white text-green-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter name"
                aria-invalid={errors.adminName ? 'true' : 'false'}
                whileFocus="focus"
                variants={inputVariants}
              />
              {errors.adminName && (
                <p className="mt-1 text-sm text-red-600">{errors.adminName}</p>
              )}
            </div>

            {/* Admin Email */}
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-green-700">
                Email
              </label>
              <motion.input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-green-200 rounded-md bg-white text-green-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter email"
                aria-invalid={errors.adminEmail ? 'true' : 'false'}
                whileFocus="focus"
                variants={inputVariants}
              />
              {errors.adminEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.adminEmail}</p>
              )}
            </div>

            {/* Admin Password */}
            <div>
              <label htmlFor="adminPassword" className="block text-sm font-medium text-green-700">
                Password
              </label>
              <motion.input
                type="password"
                id="adminPassword"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-green-200 rounded-md bg-white text-green-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter password"
                aria-invalid={errors.adminPassword ? 'true' : 'false'}
                whileFocus="focus"
                variants={inputVariants}
              />
              {errors.adminPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.adminPassword}</p>
              )}
            </div>

            {/* Employee ID */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-green-700">
                Employee ID
              </label>
              <motion.input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="mt-1 w-full p-3 border border-green-200 rounded-md bg-white text-green-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter employee ID"
                aria-invalid={errors.employeeId ? 'true' : 'false'}
                whileFocus="focus"
                variants={inputVariants}
              />
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
              )}
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-green-700 mb-3">Permissions</label>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {permissionCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="bg-green-100/50 backdrop-blur-sm p-4 rounded-md border border-green-200"
                    custom={index}
                    variants={categoryVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-green-700 font-semibold">{category.name}</h3>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectAllState[category.name]}
                          onChange={() => handleSelectAll(category)}
                          className="h-4 w-4 text-green-600 border-green-200 rounded focus:ring-green-500"
                          aria-label={`Select all ${category.name} permissions`}
                        />
                        <span className="text-sm text-green-700">Select All</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.permissions.map((permission) => (
                        <label key={permission} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission)}
                            onChange={() => handlePermissionChange(permission)}
                            className="h-4 w-4 text-green-600 border-green-200 rounded focus:ring-green-500"
                            aria-label={`Select ${permission} permission`}
                          />
                          <span className="text-sm text-green-700">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              {errors.permissions && (
                <p className="mt-1 text-sm text-red-600">{errors.permissions}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3 px-4 bg-green-600 text-white rounded-md
                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center
              `}
              variants={buttonVariants}
              whileHover={!isLoading ? 'hover' : undefined}
              whileTap={!isLoading ? 'tap' : undefined}
              animate={!isLoading ? 'pulse' : undefined}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <i className="fas fa-user-plus mr-2"></i>
              )}
              {isLoading ? 'Registering...' : 'Register Sub-Admin'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubAdminRegister;
