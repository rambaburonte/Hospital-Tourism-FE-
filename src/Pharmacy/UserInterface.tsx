
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

// Placeholder hero image (replace with your actual image URL)
const heroImage = 'https://via.placeholder.com/400x500?text=Doctor';

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory)));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-blue-500 mr-1">✨</span> Mecura
        </h1>
        <div className="flex items-center space-x-6">
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Home</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Doctor</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Services</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Stores</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Insights</span>
          <span
            onClick={() => navigate('/usercart')}
            className="text-sm cursor-pointer flex items-center"
            title="Go to Cart"
          >
            🛒 <span className="ml-1">{cartCount}</span>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-pink-50 py-12 px-6 flex items-center justify-between">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Pharmacy</h1>
          <div className="flex items-center bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="text-4xl font-bold text-gray-800 mr-4">98.5</div>
            <div>
              <p className="text-sm text-gray-600">Insights by Dr. Bryan Smith</p>
              <p className="text-xs text-gray-500">Cures every medicine-related problem</p>
              <button className="mt-2 text-blue-600 font-semibold text-sm">Shop Now →</button>
            </div>
          </div>
        </div>
        <img src={heroImage} alt="Doctor" className="w-1/3 rounded-lg" />
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
                className={`w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 ${
                  selectedCategories.includes(category) ? 'border-2 border-blue-600' : ''
                }`}
              >
                <span className="text-gray-600 text-sm">{category.charAt(0)}</span>
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
          {filteredMedicines.slice(0, 5).map((medicine) => {
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
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {expired ? 'Not Available' : 'Shop Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seasonal Solutions Section */}
      <div className="py-8 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Seasonal Exclusive Solutions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['Headache And Migraine Solutions'].map((solution, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold text-sm">{solution}</h4>
                <button className="text-blue-600 text-sm mt-1">Shop Now →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <div className="flex items-center mb-6">
          <div className="text-4xl font-bold text-gray-800 mr-4">4.5/5</div>
          <div>
            <p className="text-sm text-gray-600">Review from 7,000+ verified customers</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </p>
                <p className="text-xs text-gray-500 mt-2">The John Family</p>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 px-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-500 mr-1">✨</span> Mecura
            </h1>
            <p className="text-sm text-gray-600 mt-2">support@mecura.com</p>
          </div>
          <div className="flex space-x-4">
            <span className="text-gray-600">📞</span>
            <span className="text-gray-600">📍</span>
            <span className="text-gray-600">💬</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedicineCatalog;