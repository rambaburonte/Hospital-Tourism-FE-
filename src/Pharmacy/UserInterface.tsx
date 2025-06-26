import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

// Placeholder hero image (replace with a doctor image)
const doctorImage = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

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

interface User {
  id: number;
}

const MedicineCatalog: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('low to high');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // 10 items per page

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    axios
      .get<Medicine[]>(`${BASE_URL}/cart-item/user/capsules-user`)
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => console.error('Error fetching medicines:', err));
  }, []);

  const addToCart = (medicineId: number, qty: number) => {
    if (!user) {
      alert('Please login to add items to cart.');
      return;
    }
    axios
      .post(`${BASE_URL}/cart-item/user/cart/add?userId=${user.id}&madicineid=${medicineId}&qty=${qty}`)
      .then(() => setCartCount((prev) => prev + 1))
      .catch((err) => console.error('Add to cart failed:', err));
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  const isExpiringSoon = (date: string) => {
    const now = new Date();
    const expiry = new Date(date);
    return expiry > now && expiry < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  };

  const filteredMedicines = medicines
    .filter((m) =>
      m.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(m.medicineCategory))
    )
    .sort((a, b) => {
      return sortOrder === 'low to high'
        ? a.medicinePrice - b.medicinePrice
        : b.medicinePrice - a.medicinePrice;
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when categories change
  };

  const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory)));

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <br />
      {/* Navbar */}
      <nav className="bg-white py-5 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-green-800 bg-green-100 px-3 py-1 rounded hover:text-green-700 transition-colors duration-200">
            Pharmacy
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-6">
            <span
              className="text-gray-700 hover:text-green-600 cursor-pointer font-medium transition-colors duration-200"
              aria-label="View all categories"
            >
              All Categories
            </span>
            <span
              className="text-gray-700 hover:text-green-600 cursor-pointer font-medium transition-colors duration-200"
              aria-label="Search products"
            >
              Search
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search medicines or products..."
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search medicines or products"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
          </div>
          <span
            onClick={() => navigate('/usercart')}
            className="text-sm cursor-pointer flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200 relative"
            title="Go to Cart"
            aria-label="Go to cart"
          >
            🛒 <span className="ml-1 font-medium">{cartCount}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-green-700 text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-md z-10">
          <h1 className="text-4xl font-bold mb-4">Your Prescription for Affordable Health Solutions!</h1>
          <p className="text-lg mb-6">Elevate your health journey with exclusive discounts and unparalleled convenience. Your path to well-being starts here, where every purchase is a prescription for savings.</p>

        </div>
        <img
          src="/maditailr/pharmacy.png"
          alt="Doctor"
          className="w-full md:w-1/3 rounded-lg mt-4 md:mt-0"
          onError={(e) => (e.currentTarget.src = doctorImage)} // Fallback to placeholder
        />
      </div>

      {/* Categories Section */}
      <div className="py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Popular Categories</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              <div
                className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2 ${
                  selectedCategories.includes(category) ? 'border-2 border-green-600' : ''
                }`}
              >
                <span className="text-green-600 text-sm">{category.charAt(0)}</span>
              </div>
              <span className="text-sm text-gray-600">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Sort */}
      <div className="px-6 py-4 flex justify-between items-center bg-white border-t border-b border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-lg text-sm w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <label className="text-sm text-gray-600 mr-2">Sort by price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-2 py-1 text-sm rounded"
          >
            <option value="low to high">Low to High</option>
            <option value="high to low">High to Low</option>
          </select>
        </div>
      </div>

      {/* Best Offer Section */}
      <div className="py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Best Offer Just For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentMedicines.map((medicine) => {
            const expired = isExpired(medicine.medicineExpiryDate);
            const expiringSoon = isExpiringSoon(medicine.medicineExpiryDate);
            return (
              <div
                key={medicine.madicineid}
                className={`border rounded-lg overflow-hidden bg-white shadow-sm relative ${
                  expired ? 'opacity-50' : ''
                }`}
              >
                <div className="relative h-40 bg-white">
                  <img
                    src={medicine.medicineImage}
                    alt={medicine.medicineName}
                    className="w-full h-full object-contain p-4"
                    onError={(e) =>
                      (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
                    }
                  />
                  {expired && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Expired
                    </span>
                  )}
                  {!expired && expiringSoon && (
                    <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                      Expiring Soon
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm truncate">{medicine.medicineName}</h4>
                  <p className="text-xs text-gray-600">{medicine.medicineCategory}</p>
                  <p className="font-bold text-lg mt-1">₹{medicine.medicinePrice.toFixed(2)}</p>
                  <button
                    disabled={expired}
                    onClick={() => addToCart(medicine.madicineid, 1)}
                    className={`mt-2 w-full px-4 py-2 text-sm rounded ${
                      expired
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {expired ? 'Not Available' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCatalog;