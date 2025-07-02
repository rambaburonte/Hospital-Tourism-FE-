import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Medicine {
  madicineid: number;
  medicineName: string;
  medicineType: string;
  medicineDescription: string;
  medicinePrice: number;
  medicineQuantity: number;
  medicineExpiryDate: string;
  medicineManufacturer: string;
  medicineImage: string;
  medicineCategory: string;
}

const medicineCategories: string[] = [
  'Pain Relief',
  'Antibiotics',
  'Antiseptics',
  'Antacid',
  'Allergy & Cold',
  'Vitamins & Supplements',
  'Diabetes Care',
  'Cardiac Care',
  'Skin Care',
  'Eye & Ear Care',
  'First Aid',
  'Herbal & Ayurvedic',
  'Other',
];

const EditMedicine: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [formData, setFormData] = useState<Partial<Medicine>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMedicine(id);
    } else {
      fetchAllMedicines();
    }
  }, [id]);

  const fetchMedicine = async (medicineId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/pharmacy/getMadicineById/${medicineId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch medicine');
      }
      const data = await response.json();
      setMedicine(data);
      setFormData(data);
      setShowEditForm(true);
    } catch (err) {
      console.error('Error fetching medicine:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMedicines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pharmacy/getAllMadicines`);
      if (!response.ok) {
        throw new Error('Failed to fetch medicines');
      }
      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectMedicineForEdit = (selectedMedicine: Medicine) => {
    setMedicine(selectedMedicine);
    setFormData(selectedMedicine);
    setImageFile(null); // Reset image file
    setShowEditForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const medicineId = id || medicine?.madicineid;
      
      const updateData = new FormData();
      if (formData.medicineName) updateData.append('medicineName', formData.medicineName);
      if (formData.medicineType) updateData.append('medicineType', formData.medicineType);
      if (formData.medicineDescription) updateData.append('medicineDescription', formData.medicineDescription);
      if (formData.medicinePrice) updateData.append('medicinePrice', formData.medicinePrice.toString());
      if (formData.medicineQuantity) updateData.append('medicineQuantity', formData.medicineQuantity.toString());
      if (formData.medicineExpiryDate) updateData.append('medicineExpiryDate', formData.medicineExpiryDate);
      if (formData.medicineManufacturer) updateData.append('medicineManufacturer', formData.medicineManufacturer);
      if (formData.medicineCategory) updateData.append('medicineCategory', formData.medicineCategory);
      
      if (imageFile) {
        updateData.append('medicineImage', imageFile);
      }

      const response = await fetch(`${BASE_URL}/pharmacy/updateMadicine/${medicineId}`, {
        method: 'PUT',
        body: updateData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update medicine: ${errorData}`);
      }

      const updatedData = await response.json();

      navigate('/admin/medicineList');
    } catch (err) {
      console.error('Error updating medicine:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !medicine) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showEditForm ? (
            // Show medicine list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Medicine to Edit</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicines.map((medicineItem) => (
                      <tr key={medicineItem.madicineid} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{medicineItem.medicineName}</div>
                          <div className="text-sm text-gray-500">ID: {medicineItem.madicineid}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medicineItem.medicineCategory}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{medicineItem.medicinePrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {medicineItem.medicineQuantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectMedicineForEdit(medicineItem)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {medicines.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No medicines found.
                </div>
              )}
            </>
          ) : (
            // Show edit form
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Edit Medicine</h1>
                {!id && (
                  <button
                    onClick={() => setShowEditForm(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Back to List
                  </button>
                )}
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                    <input
                      type="text"
                      name="medicineName"
                      value={formData.medicineName || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Medicine Type</label>
                    <select
                      name="medicineType"
                      value={formData.medicineType || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Injection">Injection</option>
                      <option value="Cream">Cream</option>
                      <option value="Drops">Drops</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="medicineCategory"
                    value={formData.medicineCategory || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select a category</option>
                    {medicineCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="number"
                      name="medicinePrice"
                      value={formData.medicinePrice || ''}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="medicineQuantity"
                      value={formData.medicineQuantity || ''}
                      onChange={handleChange}
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                  <input
                    type="text"
                    name="medicineManufacturer"
                    value={formData.medicineManufacturer || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="date"
                    name="medicineExpiryDate"
                    value={formData.medicineExpiryDate ? formData.medicineExpiryDate.split('T')[0] : ''}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="medicineDescription"
                    value={formData.medicineDescription || ''}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Update Image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {medicine?.medicineImage && (
                    <p className="text-sm text-gray-500 mt-1">
                      Current image: {medicine.medicineImage}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? 'Updating...' : 'Update Medicine'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/medicineList')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMedicine;
