import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Search, X, ChevronDown } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
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

  // Validate category; fallback to 'all' if invalid
  let selectedCategoryFromUrl = category || 'all';
  if (!Object.keys(categoryDisplayNames).includes(selectedCategoryFromUrl) && selectedCategoryFromUrl !== 'all') {
    selectedCategoryFromUrl = 'all';
    navigate('/pharmacy/all', { replace: true });
  }

  // State for cart, search, category filter, and cart visibility
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromUrl);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Medicines data (unchanged)
  const medicinesData: Medicine[] = [
    // Summer Essentials
    {
      id: 'se1',
      name: 'Sunscreen SPF 50',
      description: 'Broad-spectrum protection against UVA/UVB rays, water-resistant.',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se2',
      name: 'Electrolyte Powder',
      description: 'Replenishes hydration with essential minerals for summer activities.',
      price: 12.49,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se3',
      name: 'Aloe Vera Gel',
      description: 'Soothes sunburns and hydrates skin after sun exposure.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se4',
      name: 'Cooling Mist Spray',
      description: 'Refreshes and cools skin during hot summer days.',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se5',
      name: 'Hydration Tablets',
      description: 'Effervescent tablets for quick hydration on the go.',
      price: 10.49,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se6',
      name: 'UV-Protective Lip Balm',
      description: 'Moisturizes lips with SPF 30 protection.',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se7',
      name: 'Insect Repellent Spray',
      description: 'DEET-free formula to protect against mosquitoes and ticks.',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se8',
      name: 'Cooling Neck Wrap',
      description: 'Reusable wrap to keep you cool during outdoor activities.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    {
      id: 'se9',
      name: 'Anti-Slip Water Shoes',
      description: 'Protects feet during beach and water activities.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'summer-essentials',
    },
    // Vitamins & Supplements
    {
      id: 'vs1',
      name: 'Multivitamin Capsules',
      description: 'Daily dose of 13 essential vitamins and minerals for overall health.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs2',
      name: 'Vitamin C 1000mg',
      description: 'Boosts immunity and supports skin health with antioxidant properties.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs3',
      name: 'Omega-3 Fish Oil',
      description: 'Supports heart health, brain function, and reduces inflammation.',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs4',
      name: 'Vitamin D3 2000 IU',
      description: 'Promotes bone health and immune function.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs5',
      name: 'Probiotic Capsules',
      description: 'Supports gut health with 10 billion CFU per serving.',
      price: 18.49,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs6',
      name: 'Zinc 50mg',
      description: 'Enhances immune support and skin health.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs7',
      name: 'Magnesium 400mg',
      description: 'Supports muscle relaxation and nerve function.',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs8',
      name: 'Collagen Peptides',
      description: 'Promotes healthy skin, hair, and joints.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    {
      id: 'vs9',
      name: 'Iron 18mg',
      description: 'Supports red blood cell production and energy levels.',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'vitamins-supplements',
    },
    // Sports Nutrition
    {
      id: 'sn1',
      name: 'Whey Protein Powder',
      description: '27g protein per serving for muscle growth and recovery.',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn2',
      name: 'BCAA Energy Drink',
      description: 'Branched-chain amino acids for endurance and muscle repair.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn3',
      name: 'Creatine Monohydrate',
      description: 'Enhances strength and performance during high-intensity workouts.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn4',
      name: 'Pre-Workout Formula',
      description: 'Boosts energy and focus for intense workouts.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn5',
      name: 'Post-Workout Recovery',
      description: 'Carb-protein blend for muscle recovery and glycogen replenishment.',
      price: 32.49,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn6',
      name: 'Electrolyte Gel',
      description: 'Quick energy and hydration for endurance athletes.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn7',
      name: 'Vegan Protein Powder',
      description: 'Plant-based protein for muscle support, 25g per serving.',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn8',
      name: 'Energy Chews',
      description: 'Fast-acting carbs for quick energy during workouts.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    {
      id: 'sn9',
      name: 'L-Glutamine Powder',
      description: 'Supports muscle recovery and immune function.',
      price: 17.99,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'sports-nutrition',
    },
    // Personal Care & Skincare
    {
      id: 'pc1',
      name: 'Hydrating Moisturizer',
      description: 'Non-greasy formula with hyaluronic acid for all-day hydration.',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc2',
      name: 'Vitamin C Serum',
      description: 'Brightens skin and reduces dark spots with 20% vitamin C.',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc3',
      name: 'Gentle Cleanser',
      description: 'Removes impurities without stripping skin’s natural oils.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc4',
      name: 'Retinol Cream',
      description: 'Reduces fine lines and improves skin texture overnight.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc5',
      name: 'SPF 30 Face Cream',
      description: 'Daily moisturizer with sun protection for sensitive skin.',
      price: 16.49,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc6',
      name: 'Exfoliating Scrub',
      description: 'Gently removes dead skin for a smoother complexion.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc7',
      name: 'Eye Cream',
      description: 'Reduces puffiness and dark circles with caffeine.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc8',
      name: 'Clay Mask',
      description: 'Detoxifies and purifies skin for a clearer complexion.',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    {
      id: 'pc9',
      name: 'Lip Scrub',
      description: 'Exfoliates and hydrates lips for a smooth finish.',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'personal-care-skincare',
    },
    // Health Food & Drinks
    {
      id: 'hf1',
      name: 'Nutritional Shake',
      description: 'Meal replacement with 20g protein and essential nutrients.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf2',
      name: 'Herbal Green Tea',
      description: 'Antioxidant-rich tea for relaxation and metabolism support.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf3',
      name: 'Protein Bars',
      description: '15g protein per bar, low sugar, ideal for on-the-go snacking.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf4',
      name: 'Chia Seed Pudding',
      description: 'High-fiber, omega-3-rich snack for healthy digestion.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf5',
      name: 'Kombucha Drink',
      description: 'Probiotic-rich fermented tea for gut health.',
      price: 8.49,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf6',
      name: 'Almond Milk',
      description: 'Plant-based milk, low-calorie, fortified with vitamins.',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf7',
      name: 'Coconut Water',
      description: 'Natural hydration with electrolytes, low sugar.',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf8',
      name: 'Quinoa Granola',
      description: 'High-protein, gluten-free snack for healthy breakfasts.',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    {
      id: 'hf9',
      name: 'Turmeric Latte Mix',
      description: 'Anti-inflammatory drink mix with turmeric and spices.',
      price: 11.49,
      image: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'health-food-drinks',
    },
    // General Medicines
    {
      id: 'gm1',
      name: 'Paracetamol 500mg',
      description: 'Relieves mild to moderate pain and reduces fever.',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm2',
      name: 'Ibuprofen 400mg',
      description: 'Anti-inflammatory for pain relief and swelling reduction.',
      price: 6.49,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm3',
      name: 'Cetirizine 10mg',
      description: 'Antihistamine for allergy relief, non-drowsy formula.',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm4',
      name: 'Antacid Tablets',
      description: 'Relieves heartburn and acid indigestion quickly.',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm5',
      name: 'Loperamide 2mg',
      description: 'Treats diarrhea by slowing intestinal movement.',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm6',
      name: 'Aspirin 75mg',
      description: 'Low-dose aspirin for cardiovascular health and pain relief.',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm7',
      name: 'Loratadine 10mg',
      description: 'Non-drowsy antihistamine for seasonal allergy relief.',
      price: 8.49,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm8',
      name: 'Cough Syrup',
      description: 'Relieves dry and chesty coughs with soothing formula.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
    {
      id: 'gm9',
      name: 'Nasal Decongestant',
      description: 'Clears nasal congestion due to colds or allergies.',
      price: 7.49,
      image: 'https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'general-medicines',
    },
  ];

  // Filter medicines based on search term and selected category
  const filteredMedicines = medicinesData.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-20 rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 relative">
            Pharmacy Store
            <span className="absolute left-0 bottom-0 h-1 w-16 bg-indigo-600"></span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <input
                type="text"
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-10 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                aria-label="Search medicines"
              />
            </div>
            <div className="relative">
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const newCategory = e.target.value;
                  setSelectedCategory(newCategory);
                  navigate(`/pharmacy/${encodeURIComponent(newCategory)}`);
                }}
                className="pl-4 pr-10 py-3 w-full sm:w-64 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none text-sm bg-white"
                aria-label="Select category"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryDisplayNames).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Cart Summary */}
        {cart.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="w-full flex justify-between items-center"
              aria-expanded={isCartOpen}
              aria-controls="cart-content"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ShoppingCart className="h-6 w-6 mr-2 text-indigo-600" />
                Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-indigo-600">${cartTotal.toFixed(2)}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${isCartOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            <div
              id="cart-content"
              className={`overflow-hidden transition-all duration-300 ${
                isCartOpen ? 'max-h-[1000px] mt-4' : 'max-h-0'
              }`}
            >
              <div className="grid gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-100 rounded-l-lg"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-sm w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => navigate('/checkout', { state: { items: cart } })}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all"
                  aria-label="Proceed to checkout"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMedicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {categoryDisplayNames[medicine.category] || 'All'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {medicine.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
                  {medicine.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">
                    ${medicine.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(medicine)}
                      className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors"
                      aria-label={`Add ${medicine.name} to cart`}
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                    <button
                      onClick={() => buyNow(medicine)}
                      className="px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors"
                      aria-label={`Buy ${medicine.name} now`}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredMedicines.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <img
              src="https://images.unsplash.com/photo-1584308666747-84e2d92f41d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="No products found"
              className="mx-auto h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 text-lg font-medium mb-2">
              No products found matching your criteria
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your search or explore other categories.
            </p>
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Suggested Products</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {suggestedProducts.map((medicine) => (
                  <div
                    key={medicine.id}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {medicine.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
                      {medicine.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-indigo-600">
                        ${medicine.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(medicine)}
                        className="px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors"
                        aria-label={`Add ${medicine.name} to cart`}
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PharmacyCategoryPage;