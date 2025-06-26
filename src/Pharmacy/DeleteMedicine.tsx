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

const DeleteMedicine: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

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
      setShowDeleteConfirm(true);
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

  const selectMedicineForDelete = (medicineToDelete: Medicine) => {
    setSelectedMedicine(medicineToDelete);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    const medicineToDelete = selectedMedicine || medicine;
    if (!medicineToDelete) return;

    setDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/pharmacy/deleteMadicine/${medicineToDelete.madicineid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete medicine');
      }

      const result = await response.text();

      // If we came from a direct ID, navigate back to list
      if (id) {
        navigate('/admin/medicineList');
      } else {
        // Refresh the list
        await fetchAllMedicines();
        setShowDeleteConfirm(false);
        setSelectedMedicine(null);
      }
    } catch (err) {
      console.error('Error deleting medicine:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedMedicine(null);
    setError(null);
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

  if (error && !medicine && medicines.length === 0) {
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
          {!showDeleteConfirm ? (
            // Show medicine list for selection
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Select Medicine to Delete</h1>
              
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicines.map((medicineItem) => (
                      <tr key={medicineItem.madicineid} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {medicineItem.medicineImage && (
                              <img
                                src={medicineItem.medicineImage}
                                alt={medicineItem.medicineName}
                                className="h-10 w-10 rounded-full mr-3"
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{medicineItem.medicineName}</div>
                              <div className="text-sm text-gray-500">ID: {medicineItem.madicineid}</div>
                            </div>
                          </div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(medicineItem.medicineExpiryDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => selectMedicineForDelete(medicineItem)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                          >
                            Delete
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
            // Show delete confirmation
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Confirm Delete Medicine</h1>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-red-800">Delete Medicine</h3>
                    <p className="text-red-600">This action cannot be undone!</p>
                  </div>
                </div>

                {(selectedMedicine || medicine) && (
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center space-x-4">
                      {(selectedMedicine || medicine)?.medicineImage && (
                        <img
                          src={(selectedMedicine || medicine)?.medicineImage}
                          alt={(selectedMedicine || medicine)?.medicineName}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {(selectedMedicine || medicine)?.medicineName}
                        </h4>
                        <p className="text-gray-600">
                          {(selectedMedicine || medicine)?.medicineCategory} • ₹{(selectedMedicine || medicine)?.medicinePrice}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {(selectedMedicine || medicine)?.medicineQuantity} • 
                          Expires: {(selectedMedicine || medicine)?.medicineExpiryDate && 
                            new Date((selectedMedicine || medicine)!.medicineExpiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete Medicine'}
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                {!id && (
                  <button
                    onClick={() => navigate('/admin/medicineList')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    Back to List
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteMedicine;
