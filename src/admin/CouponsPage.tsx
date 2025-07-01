import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface ApplicableService {
    id?: number;
    serviceType: string;
    serviceId?: number;
}

interface CouponEntity {
    id?: number;
    code: string;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountAmount: number;
    type: 'SINGLE' | 'COMBO';
    name: string;
    description?: string;
    active: boolean;
    validFrom: string;
    validTill: string;
    applicableServices: ApplicableService[];
}

const CouponsPage: React.FC = () => {
    const [coupons, setCoupons] = useState<CouponEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editingCoupon, setEditingCoupon] = useState<CouponEntity | null>(null);
    const [formData, setFormData] = useState<CouponEntity>({
        code: '',
        discountType: 'PERCENTAGE',
        discountAmount: 0,
        type: 'SINGLE',
        name: '',
        description: '',
        active: true,
        validFrom: '',
        validTill: '',
        applicableServices: []
    });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Available service types based on backend
    const availableServiceTypes = [
        { value: 'spa', label: 'Spa Services' },
        { value: 'chef', label: 'Chef Services' },
        { value: 'doctor', label: 'Doctor Services' },
        { value: 'translator', label: 'Translator Services' },
        { value: 'labtests', label: 'Lab Tests' },
        { value: 'physio', label: 'Physiotherapy' }
    ];

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/coupons`);
            setCoupons(Array.isArray(response.data) ? response.data : []);
            setError('');
        } catch (err) {
            setError('Failed to fetch coupons');
            console.error('Error fetching coupons:', err);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!formData.code.trim()) {
            errors.code = 'Coupon code is required';
        }

        if (!formData.name.trim()) {
            errors.name = 'Coupon name is required';
        }

        if (formData.discountAmount <= 0) {
            errors.discountAmount = 'Discount amount must be greater than 0';
        }

        if (formData.discountType === 'PERCENTAGE' && formData.discountAmount > 100) {
            errors.discountAmount = 'Percentage discount cannot exceed 100%';
        }

        if (!formData.validTill) {
            errors.validTill = 'Expiry date is required';
        } else {
            const expiryDate = new Date(formData.validTill);
            const today = new Date();
            if (expiryDate <= today) {
                errors.validTill = 'Expiry date must be in the future';
            }
        }

        if (!formData.validFrom) {
            errors.validFrom = 'Valid from date is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | number | boolean = value;

        if (type === 'checkbox') {
            processedValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            processedValue = parseFloat(value) || 0;
        }

        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
        if (checked) {
            setSelectedServiceTypes(prev => [...prev, serviceType]);
        } else {
            setSelectedServiceTypes(prev => prev.filter(type => type !== serviceType));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            // Format dates to include seconds for the API
            const apiData = {
                ...formData,
                validFrom: formData.validFrom ? new Date(formData.validFrom).toISOString() : '',
                validTill: formData.validTill ? new Date(formData.validTill).toISOString() : '',
                applicableServices: selectedServiceTypes.map(serviceType => ({
                    serviceType
                }))
            };

            if (editingCoupon) {
                // Update existing coupon
                await axios.put(`${BASE_URL}/api/coupons/${editingCoupon.id}`, apiData);
            } else {
                // Create new coupon
                await axios.post(`${BASE_URL}/api/coupons`, apiData);
            }
            
            await fetchCoupons();
            handleCloseModal();
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            setError(axiosError.response?.data?.message || 'Failed to save coupon');
        }
    };

    const handleEdit = (coupon: CouponEntity) => {
        setEditingCoupon(coupon);
        setFormData({
            ...coupon,
            validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().slice(0, 16) : '',
            validTill: coupon.validTill ? new Date(coupon.validTill).toISOString().slice(0, 16) : ''
        });
        setSelectedServiceTypes(coupon.applicableServices?.map(service => service.serviceType) || []);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await axios.delete(`${BASE_URL}/api/coupons/${id}`);
                await fetchCoupons();
            } catch (err) {
                setError('Failed to delete coupon');
            }
        }
    };

    const handleToggleStatus = async (coupon: CouponEntity) => {
        try {
            const updatedCoupon = { ...coupon, active: !coupon.active };
            await axios.put(`${BASE_URL}/api/coupons/${coupon.id}`, updatedCoupon);
            await fetchCoupons();
        } catch (err) {
            setError('Failed to update coupon status');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCoupon(null);
        setFormData({
            code: '',
            discountType: 'PERCENTAGE',
            discountAmount: 0,
            type: 'SINGLE',
            name: '',
            description: '',
            active: true,
            validFrom: '',
            validTill: '',
            applicableServices: []
        });
        setFormErrors({});
        setSelectedServiceTypes([]);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const isExpired = (dateString: string) => {
        return new Date(dateString) < new Date();
    };

    const handleSort = (field: string) => {
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newDirection);

        const sortedCoupons = [...coupons].sort((a, b) => {
            let aValue: string | number | boolean | Date;
            let bValue: string | number | boolean | Date;

            switch (field) {
                case 'code':
                    aValue = a.code.toLowerCase();
                    bValue = b.code.toLowerCase();
                    break;
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'discountAmount':
                    aValue = a.discountAmount;
                    bValue = b.discountAmount;
                    break;
                case 'discountType':
                    aValue = a.discountType;
                    bValue = b.discountType;
                    break;
                case 'type':
                    aValue = a.type;
                    bValue = b.type;
                    break;
                case 'validTill':
                    aValue = new Date(a.validTill);
                    bValue = new Date(b.validTill);
                    break;
                case 'active':
                    aValue = a.active;
                    bValue = b.active;
                    break;
                case 'applicableServices':
                    aValue = a.applicableServices.length;
                    bValue = b.applicableServices.length;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return newDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return newDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setCoupons(sortedCoupons);
    };

    const getSortIcon = (field: string) => {
        if (sortField !== field) {
            return <i className="fas fa-sort text-gray-400 ml-1"></i>;
        }
        return sortDirection === 'asc' 
            ? <i className="fas fa-sort-up text-blue-600 ml-1"></i>
            : <i className="fas fa-sort-down text-blue-600 ml-1"></i>;
    };

    const getFieldDisplayName = (field: string) => {
        const fieldNames: { [key: string]: string } = {
            code: 'Code',
            name: 'Name',
            discountAmount: 'Discount Amount',
            discountType: 'Discount Type',
            type: 'Type',
            validTill: 'Expiry Date',
            active: 'Status',
            applicableServices: 'Applicable Services Count'
        };
        return fieldNames[field] || field;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <h1 className="text-2xl font-bold text-gray-900">Coupon Management</h1>
                                {sortField && (
                                    <button
                                        onClick={() => {
                                            setSortField('');
                                            setSortDirection('asc');
                                            fetchCoupons();
                                        }}
                                        className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 px-2 py-1 rounded border border-gray-300 hover:border-gray-400 transition"
                                        title="Clear sorting"
                                    >
                                        <i className="fas fa-times text-xs"></i>
                                        Clear Sort
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                            >
                                <i className="fas fa-plus"></i>
                                Add New Coupon
                            </button>
                        </div>

                        {error && (
                            <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {sortField && (
                            <div className="mx-6 mt-4 p-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm flex items-center">
                                <i className="fas fa-info-circle mr-2"></i>
                                Sorted by: <strong className="ml-1">{getFieldDisplayName(sortField)}</strong> 
                                <span className="ml-1">({sortDirection === 'asc' ? 'ascending' : 'descending'})</span>
                            </div>
                        )}

                        <div className="p-6">
                            {loading ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                                    <p className="text-gray-600 mt-2">Loading coupons...</p>
                                </div>
                            ) : coupons.length === 0 ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-ticket-alt text-4xl text-gray-400 mb-4"></i>
                                    <p className="text-gray-600">No coupons found</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-50 text-left">
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    <button 
                                                        onClick={() => handleSort('code')} 
                                                        className="flex items-center hover:text-blue-600 transition-colors"
                                                    >
                                                        Code & Name
                                                        {getSortIcon('code')}
                                                    </button>
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    <button 
                                                        onClick={() => handleSort('discountAmount')} 
                                                        className="flex items-center hover:text-blue-600 transition-colors"
                                                    >
                                                        Discount
                                                        {getSortIcon('discountAmount')}
                                                    </button>
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    <button 
                                                        onClick={() => handleSort('applicableServices')} 
                                                        className="flex items-center hover:text-blue-600 transition-colors"
                                                    >
                                                        Applicable Services
                                                        {getSortIcon('applicableServices')}
                                                    </button>
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    <button 
                                                        onClick={() => handleSort('type')} 
                                                        className="flex items-center hover:text-blue-600 transition-colors"
                                                    >
                                                        Usage
                                                        {getSortIcon('type')}
                                                    </button>
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    <button 
                                                        onClick={() => handleSort('validTill')} 
                                                        className="flex items-center hover:text-blue-600 transition-colors"
                                                    >
                                                        Expiry Date
                                                        {getSortIcon('validTill')}
                                                    </button>
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    <button 
                                                        onClick={() => handleSort('active')} 
                                                        className="flex items-center hover:text-blue-600 transition-colors"
                                                    >
                                                        Status
                                                        {getSortIcon('active')}
                                                    </button>
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {coupons.map((coupon) => (
                                                <tr key={coupon.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{coupon.code}</p>
                                                            <p className="text-sm text-gray-600">{coupon.name}</p>
                                                            {coupon.description && (
                                                                <p className="text-sm text-gray-600">{coupon.description}</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm text-gray-900">
                                                            {coupon.discountType === 'PERCENTAGE' 
                                                                ? `${coupon.discountAmount}%` 
                                                                : `₹${coupon.discountAmount}`}
                                                        </span>
                                                        <p className="text-xs text-gray-600">Type: {coupon.type}</p>
                                                    </td>                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        {coupon.applicableServices && coupon.applicableServices.length > 0 ? (
                                            <div className="space-y-1">
                                                {coupon.applicableServices.map((service, index) => (
                                                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                                                        {availableServiceTypes.find(type => type.value === service.serviceType)?.label || service.serviceType}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-600 italic">All services</span>
                                        )}
                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        Active
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`text-sm ${isExpired(coupon.validTill) ? 'text-red-600' : 'text-gray-900'}`}>
                                                            {formatDate(coupon.validTill)}
                                                        </span>
                                                        {isExpired(coupon.validTill) && (
                                                            <p className="text-xs text-red-600">Expired</p>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={() => handleToggleStatus(coupon)}
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                coupon.active
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                        >
                                                            {coupon.active ? 'Active' : 'Inactive'}
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleEdit(coupon)}
                                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(coupon.id!)}
                                                                className="text-red-600 hover:text-red-800 text-sm"
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
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
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Coupon Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter coupon code"
                                    />
                                    {formErrors.code && (
                                        <p className="text-red-600 text-xs mt-1">{formErrors.code}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Coupon Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter coupon name"
                                    />
                                    {formErrors.name && (
                                        <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        placeholder="Enter coupon description"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Discount Type *
                                        </label>
                                        <select
                                            name="discountType"
                                            value={formData.discountType}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="PERCENTAGE">Percentage</option>
                                            <option value="FIXED">Fixed Amount</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Discount Amount *
                                        </label>
                                        <input
                                            type="number"
                                            name="discountAmount"
                                            value={formData.discountAmount}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder={formData.discountType === 'PERCENTAGE' ? '10' : '100'}
                                            min="0"
                                            step="0.01"
                                        />
                                        {formErrors.discountAmount && (
                                            <p className="text-red-600 text-xs mt-1">{formErrors.discountAmount}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Coupon Type *
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="SINGLE">Single Service</option>
                                        <option value="COMBO">Combo Services</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Valid From *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="validFrom"
                                            value={formData.validFrom}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {formErrors.validFrom && (
                                            <p className="text-red-600 text-xs mt-1">{formErrors.validFrom}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Valid Till *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="validTill"
                                            value={formData.validTill}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {formErrors.validTill && (
                                            <p className="text-red-600 text-xs mt-1">{formErrors.validTill}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Applicable Service Types
                                    </label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                                        {availableServiceTypes.map((serviceType) => (
                                            <label key={serviceType.value} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedServiceTypes.includes(serviceType.value)}
                                                    onChange={(e) => handleServiceTypeChange(serviceType.value, e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{serviceType.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Leave empty to apply to all services
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">
                                        Active
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                                    >
                                        {editingCoupon ? 'Update' : 'Create'} Coupon
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CouponsPage;
