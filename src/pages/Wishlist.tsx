import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import WishlistButton, { ServiceType } from '@/components/WishlistButton';

type ServiceType = 'chef' | 'labtest' | 'doctor' | 'spa' | 'translator' | 'physio' | 'hospital' | 'hotel' | 'travel' | 'pharmacy';

interface WishlistItem {
  wishlistId: number;
  userId: number;
  userName: string;
  userEmail: string;
  serviceType: ServiceType;
  serviceId: number;
  serviceName: string;
  serviceDescription: string;
  serviceImageUrl: string;
  notes: string | null;
  price?: number;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (storedUser && (storedUser.id || storedUser.userId)) {
      setUser({
        ...storedUser,
        id: storedUser.id || storedUser.userId
      });
    } else {
      setError('Please login to view your wishlist');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist/${user?.id}`);
      setWishlistItems(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch wishlist items');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/wishlist/remove/${wishlistId}`);
      setWishlistItems(items => items.filter(item => item.wishlistId !== wishlistId));
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      setError('Failed to remove item from wishlist');
    }
  };

  const getServiceRoute = (item: WishlistItem) => {
    switch (item.serviceType.toLowerCase()) {
      case 'doctor':
        return `/doctor/${item.serviceId}`;
      case 'labtest':
        return `/labtest/${item.serviceId}`;
      case 'spa':
        return `/spa/${item.serviceId}`;
      case 'physiotherapy':
        return `/physio/${item.serviceId}`;
      case 'hospital':
        return `/hospital/${item.serviceId}`;
      case 'hotel':
        return `/hotel/${item.serviceId}`;
      case 'travel':
        return `/travel/${item.serviceId}`;
      case 'translator':
        return `/translator/${item.serviceId}`;
      case 'chef':
        return `/chef/${item.serviceId}`;
      case 'pharmacy':
        return `/pharmacy/${item.serviceId}`;
      default:
        return '/';
    }
  };

  const totalWishlistPrice = wishlistItems.reduce((acc, item) => acc + (item.price || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
            <p className="text-red-500">{error}</p>
            {error.includes('login') && (
              <Link
                to="/login"
                className="mt-4 inline-block bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-purple-600">uxnuin</h1>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/categories" className="text-gray-600 hover:text-purple-600">Categories</Link>
              <Link to="/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Hoodies with backprint"
                className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            <Link to="/wishlist" className="text-gray-600 hover:text-purple-600">
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-purple-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Wishlist ({wishlistItems.length})</h1>
            <div className="flex space-x-2">
              <Link to="/cart" className="text-purple-600 hover:underline text-sm">Cart</Link>
              <span className="text-gray-500">&gt;</span>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
              <Link
                to="/"
                className="inline-block bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.wishlistId}
                  className="bg-white rounded-lg shadow-sm overflow-hidden relative group"
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <img
                      src={item.serviceImageUrl || 'https://placehold.co/400x300?text=No+Image'}
                      alt={item.serviceName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link
                        to={getServiceRoute(item)}
                        className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100"
                      >
                        Quick View
                      </Link>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => removeFromWishlist(item.wishlistId)}
                        className="p-2 rounded-full bg-purple-600 text-white shadow-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-200"
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase font-medium">{item.serviceType}</p>
                    <h3 className="text-base font-semibold text-gray-800 mt-1 mb-1">
                      {item.serviceName}
                    </h3>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-xs text-gray-600">4.2 (12)</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">${(item.price || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-80">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm sticky top-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Cart ({wishlistItems.length})</h2>
            {wishlistItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No items in cart</p>
            ) : (
              <>
                {wishlistItems.slice(0, 1).map((item) => (
                  <div key={item.wishlistId} className="flex items-center mb-4">
                    <img
                      src={item.serviceImageUrl || 'https://placehold.co/50x50?text=No+Image'}
                      alt={item.serviceName}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.serviceName}</p>
                      <p className="text-sm text-gray-600">${(item.price || 0).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.wishlistId)}
                      className="text-gray-500 hover:text-purple-600"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
                    <span>Subtotal</span>
                    <span>${totalWishlistPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition mb-2">
                    Continue to checkout
                  </button>
                  <Link to="/cart" className="block text-center text-purple-600 hover:underline text-sm">
                    View & edit cart
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;