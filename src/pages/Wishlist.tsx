import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Trash2 } from 'lucide-react';
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
  price: number;
  bookingStartTime?: string;
  bookingEndTime?: string;
  paymentMode?: string;
  bookingType?: string;
  bookingAmount?: number;
  remarks?: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const navigate = useNavigate();

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
      let response = await axios.get(`${BASE_URL}/api/wishlist/${user?.id}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.data && response.status === 404) {
        console.log('Trying alternative wishlist endpoint');
        response = await axios.get(`${BASE_URL}/api/wishlist/user/${user?.id}`, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (response.data) {
        setWishlistItems(response.data);
        setError(null);
      } else {
        setError('No wishlist items found');
      }
    } catch (err: any) {
      console.error('Error fetching wishlist:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch wishlist items. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/wishlist/remove/${wishlistId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      setWishlistItems(items => items.filter(item => item.wishlistId !== wishlistId));
      setError(null);
    } catch (err: any) {
      console.error('Error removing item from wishlist:', err);
      const errorMessage = err.response?.data?.message || 'Failed to remove item from wishlist. Please try again.';
      setError(errorMessage);
    }
  };

  const moveToCart = async () => {
    if (!user?.id) {
      setError('Please login to move items to cart');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let failedItems: string[] = [];

      for (const item of wishlistItems) {
        try {
          const serviceIdField = getServiceIdField(item.serviceType);
          if (!serviceIdField) {
            throw new Error(`Invalid service type: ${item.serviceType}`);
          }

          const payload = {
            userId: user.id,
            bookingStartTime: item.bookingStartTime || new Date().toISOString(),
            bookingEndTime: item.bookingEndTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            paymentMode: item.paymentMode || 'ONLINE',
            bookingType: item.bookingType || 'SINGLE',
            bookingAmount: item.bookingAmount || item.price || 100,
            remarks: item.remarks || item.notes || '',
            serviceName: item.serviceName,
            serviceDescription: item.serviceDescription,
            serviceImageUrl: item.serviceImageUrl || 'https://placehold.co/400x300?text=No+Image',
            [serviceIdField]: item.serviceId,
          };

          console.log(`Adding to cart: ${item.serviceName} (${item.serviceType})`, payload);

          const cartResponse = await axios.post(
            `${BASE_URL}/api/AddToCart/addToCart/${user.id}/${item.serviceType.toLowerCase()}`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(`Cart response for ${item.serviceName}:`, cartResponse.data);

          await axios.delete(`${BASE_URL}/api/wishlist/remove/${item.wishlistId}`);
        } catch (err: any) {
          console.error(`Failed to move item ${item.serviceName} to cart:`, err);
          const errorMessage = err.response?.data?.message || `Server error (status: ${err.response?.status || 'unknown'})`;
          console.error(`Error details for ${item.serviceName}:`, errorMessage);
          failedItems.push(`${item.serviceName} (${errorMessage})`);
        }
      }

      await fetchWishlist();

      if (failedItems.length > 0) {
        setError(`Failed to move ${failedItems.length} item(s) to cart: ${failedItems.join(', ')}. Please try a different time slot.`);
      } else {
        navigate('/bookingcart');
      }
    } catch (err: any) {
      console.error('Error in moveToCart:', err);
      const errorMessage = err.response?.data?.message || 'Failed to move items to cart. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIdField = (serviceType: ServiceType): string => {
    const normalizedType = serviceType.toLowerCase();
    switch (normalizedType) {
      case 'doctor':
        return 'doctorId';
      case 'labtest':
        return 'testId';
      case 'spa':
        return 'spaCenterId';
      case 'physio':
      case 'physiotherapy':
        return 'physioId';
      case 'hospital':
        return 'hospitalId';
      case 'hotel':
        return 'hotelId';
      case 'travel':
        return 'travelId';
      case 'translator':
        return 'translatorId';
      case 'chef':
        return 'chefId';
      case 'pharmacy':
        return 'pharmacyId';
      default:
        throw new Error(`Unknown service type: ${serviceType}`);
    }
  };

  const getServiceRoute = (item: WishlistItem) => {
    const normalizedType = item.serviceType.toLowerCase();
    switch (normalizedType) {
      case 'doctor':
        return `/doctor/${item.serviceId}`;
      case 'labtest':
        return `/labtest/${item.serviceId}`;
      case 'spa':
        return `/spa/${item.serviceId}`;
      case 'physio':
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

  const totalWishlistPrice = wishlistItems.reduce((acc, item) => acc + (item.bookingAmount || item.price || 0), 0);

  const getSafeImageUrl = (url: string) => {
    if (url.includes('img.youtube.com') && !url.includes('default.jpg')) {
      return 'https://placehold.co/400x300?text=No+Image';
    }
    return url || 'https://placehold.co/400x300?text=No+Image';
  };

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
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Wishlist ({wishlistItems.length})</h1>
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
                      src={getSafeImageUrl(item.serviceImageUrl)}
                      alt={item.serviceName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
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
                    <p className="text-lg font-bold text-gray-900">₹{(item.bookingAmount || item.price || 0).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromWishlist(item.wishlistId)}
                      className="mt-2 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
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
                      src={getSafeImageUrl(item.serviceImageUrl)}
                      alt={item.serviceName}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.serviceName}</p>
                      <p className="text-sm text-gray-600">₹{(item.bookingAmount || item.price || 0).toFixed(2)}</p>
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
                    <span>₹{totalWishlistPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={moveToCart}
                    disabled={loading || wishlistItems.length === 0}
                    className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Moving to cart...' : 'Continue to checkout'}
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