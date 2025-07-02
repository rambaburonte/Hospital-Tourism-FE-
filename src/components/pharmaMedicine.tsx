import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Search, X, ChevronDown, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
}

interface LocationFilters {
  city: string;
  state: string;
  country: string;
}

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: LocationFilters;
  availability: number;
}

interface CartItem extends Medicine {
  quantity: number;
}

const PharmacyCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Category display names
  const categoryDisplayNames: Record<string, string> = {
    'summer-essentials': 'Summer Essentials',
    'vitamins-supplements': 'Vitamins & Supplements',
    'sports-nutrition': 'Sports Nutrition',
    'personal-care-skincare': 'Personal Care & Skincare',
    'health-food-drinks': 'Health Food & Drinks',
    'general-medicines': 'General Medicines',
  };

  // Validate category and set initial state
  const selectedCategoryFromUrl = category && Object.keys(categoryDisplayNames).includes(category) ? category : 'all';

  // State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromUrl);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    city: '',
    state: '',
    country: '',
  });

  // Sample data (replace with API call)
  const [medicinesData, setMedicinesData] = useState<Medicine[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchMedicines = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration
        const mockMedicines: Medicine[] = [
          {
            id: '1',
            name: 'Paracetamol',
            description: 'Pain reliever and fever reducer',
            price: 5.99,
            image: '/images/paracetamol.jpg',
            category: 'general-medicines',
            location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
            availability: 100
          },
          // Add more mock medicines as needed
        ];
        setMedicinesData(mockMedicines);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Get unique locations
  const uniqueLocations = useMemo(() => ({
    cities: [...new Set(medicinesData.map(med => med.location.city))].sort(),
    states: [...new Set(medicinesData.map(med => med.location.state))].sort(),
    countries: [...new Set(medicinesData.map(med => med.location.country))].sort(),
  }), [medicinesData]);

  const handleLocationFilterChange = (field: keyof Location, value: string) => {
    setLocationFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setLocationFilters({
      city: '',
      state: '',
      country: ''
    });
    setSearchTerm('');
    if (selectedCategory !== 'all') {
      setSelectedCategory('all');
      navigate('/pharmacy/all');
    }
  };

  // Filter medicines
  const filteredMedicines = useMemo(() => {
    return medicinesData.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      const matchesLocation = 
        (!locationFilters.city || medicine.location.city === locationFilters.city) &&
        (!locationFilters.state || medicine.location.state === locationFilters.state) &&
        (!locationFilters.country || medicine.location.country === locationFilters.country);
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [medicinesData, searchTerm, selectedCategory, locationFilters]);

  // Simulate loading for filtering
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Debug filtering
  useEffect(() => {
    console.log('Selected Category:', selectedCategory);
    console.log('Filtered Medicines:', filteredMedicines.map((m) => m.name));
  }, [selectedCategory, filteredMedicines]);

  // Add to cart handler
  const addToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      console.log(`Added ${medicine.name} to cart`);
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  // Update quantity in cart
  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove from cart handler
  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item) {
        console.log(`Removed ${item.name} from cart`);
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  // Buy now handler
  const buyNow = (medicine: Medicine) => {
    console.log(`Initiating purchase for ${medicine.name} at $${medicine.price}`);
    navigate('/checkout', { state: { items: [{ ...medicine, quantity: 1 }] } });
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Update selectedCategory when URL category changes
  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  // Suggested products for empty state
  const suggestedProducts = medicinesData
    .filter((medicine) => ['se1', 'vs1', 'sn1'].includes(medicine.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header and Search Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Online Pharmacy</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[250px]">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Location Filters */}
              <div className="flex flex-wrap gap-4">
                <Select
                  value={locationFilters.city}
                  onValueChange={(value) => handleLocationFilterChange('city', value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by City" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={locationFilters.state}
                  onValueChange={(value) => handleLocationFilterChange('state', value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by State" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={locationFilters.country}
                  onValueChange={(value) => handleLocationFilterChange('country', value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  disabled={!searchTerm && !locationFilters.city && !locationFilters.state && !locationFilters.country && selectedCategory === 'all'}
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  navigate('/pharmacy/all');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {Object.entries(categoryDisplayNames).map(([key, display]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key);
                    navigate(`/pharmacy/${key}`);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {display}
                </button>
              ))}
            </div>
          </div>

          {/* Results Section */}
          {filteredMedicines.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">No medicines found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-48 object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Medicine+Image';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{medicine.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      <span>{medicine.location.city}, {medicine.location.state}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">₹{medicine.price}</span>
                      <button
                        onClick={() => addToCart(medicine)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                    {medicine.availability < 5 && (
                      <p className="text-sm text-orange-500 mt-2">
                        Only {medicine.availability} left in stock
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyCategoryPage;