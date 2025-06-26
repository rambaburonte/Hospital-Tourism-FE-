import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

interface Medicine {
  madicineid: number;
  medicineName: string;
  medicinePrice: number;
  medicineQuantity: number;
  medicineExpiryDate: string;
  medicineImage: string;
  medicineCategory: string;
}

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [alertCount, setAlertCount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const API_URL = `${BASE_URL}/pharmacy/dashboard`;
  const DELETE_API_URL = `${BASE_URL}/pharmacy/deleteMadicine/`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch medicines.`);
        }

        const result = await response.json();
        const data: Medicine[] = result.allMedicines;
        console.log(data, "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(result, "resultaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        const currentDate = new Date();
        const sortedMedicines = data.sort((a, b) => {
          const aExpired = new Date(a.medicineExpiryDate) < currentDate;
          const bExpired = new Date(b.medicineExpiryDate) < currentDate;

          if (aExpired && !bExpired) return -1;
          if (!aExpired && bExpired) return 1;

          const aExpiringSoon = new Date(a.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          const bExpiringSoon = new Date(b.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          if (aExpiringSoon && !bExpiringSoon) return -1;
          if (!aExpiringSoon && bExpiringSoon) return 1;

          return 0;
        });

        setMedicines(sortedMedicines);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiringToday = medicines.filter((medicine) => {
      const expiryDate = new Date(medicine.medicineExpiryDate);
      expiryDate.setHours(0, 0, 0, 0);
      return expiryDate.getTime() === today.getTime();
    });

    if (expiringToday.length > 0 && alertCount < 5) {
      const names = expiringToday.map((m) => m.medicineName).join(', ');
      const alertMessage = `Alert: The following medicines expire today: ${names}`;

      setNotification(alertMessage);
      setTimeout(() => setNotification(null), 5000);
      setAlertCount((prev) => prev + 1);

      const intervalId = setInterval(() => {
        setAlertCount((prev) => {
          if (prev < 5) {
            setNotification(alertMessage);
            setTimeout(() => setNotification(null), 5000);
            return prev + 1;
          }
          clearInterval(intervalId);
          return prev;
        });
      }, 15 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [medicines, alertCount]);

  const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory || 'Other')));

  const filteredMedicines = selectedCategory
    ? medicines.filter((medicine) => (medicine.medicineCategory || 'Other') === selectedCategory)
    : medicines;

  const handleDelete = async (madicineid: number) => {
    if (!window.confirm(`Are you sure you want to delete medicine ID ${madicineid}?`)) return;

    try {
      const response = await fetch(`${DELETE_API_URL}${madicineid}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete medicine with id ${madicineid}.`);
      }

      setMedicines((prev) => prev.filter((m) => m.madicineid !== madicineid));
      alert(`Medicine with ID ${madicineid} deleted successfully.`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unknown error while deleting.');
    }
  };

  const handleUpdate = (madicineid: number) => {
    navigate(`/admin/updateMedicine/${madicineid}`);
    console.log(madicineid, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
        </div>
        <div className="flex space-x-6">
          <Link to="/admin/orders" className="text-gray-600 hover:text-gray-800 text-sm">Orders</Link>
          <Link to="/admin/PrescriptionList" className="text-gray-600 hover:text-gray-800 text-sm">Prescriptions</Link>
          <Link to="#" className="text-gray-600 hover:text-gray-800 text-sm">FAQ</Link>
        </div>
      </nav>      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex-1 py-6 px-6 sm:px-8 lg:px-12 ml-64 flex">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Category Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Product search for "Herbal"
                </h2>
                <p className="text-sm text-gray-600">
                  Found {filteredMedicines.length} products
                  {selectedCategory ? ` in "${selectedCategory}"` : ''}
                </p>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  Clear Filter
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {notification && (
              <div className="mb-6 p-3 bg-yellow-50 text-yellow-700 text-sm rounded">
                {notification}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-transparent p-2 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredMedicines.length === 0 ? (
              <div className="text-center py-12 bg-white rounded">
                <p className="text-gray-500 text-sm">No medicines found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMedicines.map((medicine) => (
                  <div
                    key={medicine.madicineid}
                    className={`bg-transparent relative cursor-pointer border border-gray-200 ${
                      selectedMedicineId === medicine.madicineid ? 'border-blue-500' : ''
                    }`}
                    onClick={() =>
                      setSelectedMedicineId((prev) =>
                        prev === medicine.madicineid ? null : medicine.madicineid
                      )
                    }
                  >
                    <div className="relative h-32">
                      <img
                        src={medicine.medicineImage}
                        alt={medicine.medicineName}
                        className="w-full h-full object-contain"
                        onError={(e) =>
                          (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
                        }
                      />
                      {new Date(medicine.medicineExpiryDate) < new Date() ? (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                          Expired
                        </span>
                      ) : new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
                        <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded">
                          Expiring Soon
                        </span>
                      ) : null}
                    </div>
                    <div className="p-2 text-green-700">
                      <h4 className="text-sm font-semibold">{medicine.medicineName}</h4>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-bold">₹{medicine.medicinePrice}</span>
                        <span className="text-xs">Qty: {medicine.medicineQuantity}</span>
                      </div>
                      <p className="text-xs">
                        Expires: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs">Category: {medicine.medicineCategory || 'Other'}</p>
                    </div>

                    {selectedMedicineId === medicine.madicineid && (
                      <div className="p-2 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdate(medicine.madicineid);
                          }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(medicine.madicineid);
                          }}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;