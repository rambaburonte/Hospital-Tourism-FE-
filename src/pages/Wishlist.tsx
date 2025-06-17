import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Trash2 } from 'lucide-react';
import WishlistButton, { ServiceType } from '@/components/WishlistButton';

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
  const [user, setUser] = useState<{ id: number; name?: string; email?: string } | null>(null);
  const navigate = useNavigate();

  const serviceApiMap = {
    chef: `/api/chefs/chef-By/Id/`,
    translator: `/api/translators/getone/`,
    spa: `/spaServices/spa/`,
    doctor: `/api/doctors/By/`,
    physio: `/physio/get/`,
    hospital: `/api/hospitals/get/`,
    hotel: `/api/hotels/get/`,
    travel: `/api/travel/get/`,
    pharmacy: `/api/pharmacies/get/`,
    labtest: `/api/labtests/get/`,
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    console.log('Wishlist.tsx: Raw stored user from localStorage:', storedUser);
    if (storedUser && (storedUser.id || storedUser.userId)) {
      const userIdToSet = storedUser.id || storedUser.userId;
      const userNameToSet = storedUser.name || storedUser.userName;
      const userEmailToSet = storedUser.email || storedUser.userEmail;

      setUser({
        id: userIdToSet,
        name: userNameToSet,
        email: userEmailToSet,
      });
      console.log('Wishlist.tsx: User state set to:', { id: userIdToSet, name: userNameToSet, email: userEmailToSet });
    } else {
      setError('Please login to view your wishlist');
      setLoading(false);
      console.log('Wishlist.tsx: No user found in localStorage or invalid user data.');
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchWishlist();
    }
  }, [user]);

  const fetchServiceBasePrice = async (serviceType: string, serviceId: number): Promise<number> => {
    const apiPath = serviceApiMap[serviceType.toLowerCase()];
    if (!apiPath) {
      console.warn(`No API path defined for service type: ${serviceType}`);
      return 0;
    }
    try {
      const url = `${BASE_URL}${apiPath}${serviceId}`;
      console.log(`Fetching base price for ${serviceType} ID ${serviceId} from: ${url}`);
      const response = await axios.get(url);
      const data = response.data;
      console.log(`Received data for ${serviceType} ID ${serviceId}:`, data);

      switch (serviceType.toLowerCase()) {
        case 'doctor':
          return data?.consultationFee || data?.price || 0;
        case 'chef':
          return data?.price || data?.chefPrice || data?.hourlyRate || 0;
        case 'translator':
          return data?.price || data?.hourlyRate || 0;
        case 'spa':
          return data?.price || 0;
        case 'physio':
          return data?.price || 0;
        case 'hospital':
          return data?.averageCost || data?.price || 0;
        case 'hotel':
          return data?.pricePerNight || data?.price || 0;
        case 'travel':
          return data?.pricePerPerson || data?.price || 0;
        case 'pharmacy':
          return data?.price || 0;
        case 'labtest':
          return data?.testPrice || data?.price || 0;
        default:
          return data?.price || 0;
      }
    } catch (err) {
      console.error(`Failed to fetch base price for ${serviceType} ID ${serviceId}:`, err);
      return 0;
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist/${user?.id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        console.log("Fetched raw wishlist data:", response.data);
        const fetchedItems: WishlistItem[] = response.data;

        const itemsWithPrices = await Promise.all(
          fetchedItems.map(async (item: WishlistItem) => {
            if (item.price === 0 || item.price === null || item.price === undefined) {
              const basePrice = await fetchServiceBasePrice(item.serviceType, item.serviceId);
              return { ...item, price: basePrice };
            }
            return item;
          })
        );

        setWishlistItems(itemsWithPrices);
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
      const response = await axios.delete(`${BASE_URL}/api/wishlist/remove/${wishlistId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(`Remove from wishlist response for ID ${wishlistId}:`, response.data);
      setWishlistItems((items) => items.filter((item) => item.wishlistId !== wishlistId));
      setError(null);
      return true;
    } catch (err: any) {
      console.error('Error removing item from wishlist:', err);
      const errorMessage = err.response?.data?.message || 'Failed to remove item from wishlist. Please try again.';
      setError(errorMessage);
      return false;
    }
  };

  const addIndividualItemToCart = async (item: WishlistItem) => {
    if (!user?.id) {
      setError('Please login to add items to cart');
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const serviceIdField = getServiceIdField(item.serviceType);
      if (!serviceIdField) {
        throw new Error(`Invalid service type: ${item.serviceType}`);
      }

      const payload = {
        userName: user.name || 'User',
        userEmail: user.email || '',
        serviceType: item.serviceType,
        serviceName: item.serviceName,
        serviceDescription: item.serviceDescription,
        serviceImageUrl: item.serviceImageUrl || 'https://placehold.co/400x300?text=No+Image',
        bookingAmount: item.bookingAmount || item.price || 100,
        bookingStartTime: item.bookingStartTime || new Date().toISOString(),
        bookingEndTime: item.bookingEndTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        notes: item.remarks || item.notes || '',
        [serviceIdField]: item.serviceId,
      };

      console.log(`User ID for addIndividualItemToCart: ${user.id}`);
      console.log(`Adding to cart: ${item.serviceName} (${item.serviceType})`, payload);

      const cartResponse = await axios.post(
        `${BASE_URL}/api/AddToCart/addToCart/${user.id}/${item.serviceType.toLowerCase()}`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(`Cart response for ${item.serviceName}:`, cartResponse.data);

      if (cartResponse.data && cartResponse.status >= 200 && cartResponse.status < 300) {
        const removed = await removeFromWishlist(item.wishlistId);
        if (removed) {
          alert(`${item.serviceName} moved to cart successfully!`);
        } else {
          throw new Error('Failed to remove item from wishlist after adding to cart');
        }
      } else {
        throw new Error('Failed to add item to cart: Invalid response');
      }
    } catch (err: any) {
      console.error(`Failed to add item ${item.serviceName} to cart:`, err);
      const errorMessage = err.response?.data?.message || `Failed to add ${item.serviceName} to cart. Please try again.`;
      setError(errorMessage);
    } finally {
      setLoading(false);
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
            userName: user.name || 'User',
            userEmail: user.email || '',
            serviceType: item.serviceType,
            serviceName: item.serviceName,
            serviceDescription: item.serviceDescription,
            serviceImageUrl: item.serviceImageUrl || 'https://placehold.co/400x300?text=No+Image',
            bookingAmount: item.bookingAmount || item.price || 100,
            bookingStartTime: item.bookingStartTime || new Date().toISOString(),
            bookingEndTime: item.bookingEndTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            notes: item.remarks || item.notes || '',
            [serviceIdField]: item.serviceId,
          };

          console.log(`User ID for moveToCart: ${user.id}`);
          console.log(`Adding to cart: ${item.serviceName} (${item.serviceType})`, payload);

          const cartResponse = await axios.post(
            `${BASE_URL}/api/AddToCart/addToCart/${user.id}/${item.serviceType.toLowerCase()}`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(`Cart response for ${item.serviceName}:`, cartResponse.data);

          if (cartResponse.data && cartResponse.status >= 200 && cartResponse.status < 300) {
            const removed = await removeFromWishlist(item.wishlistId);
            if (!removed) {
              throw new Error(`Failed to remove item ${item.serviceName} from wishlist`);
            }
          } else {
            throw new Error('Failed to add item to cart: Invalid response');
          }
        } catch (err: any) {
          console.error(`Failed to move item ${item.serviceName} to cart:`, err);
          const errorMessage = err.response?.data?.message || `Server error (status: ${err.response?.status || 'unknown'})`;
          failedItems.push(`${item.serviceName} (${errorMessage})`);
        }
      }

      if (failedItems.length > 0) {
        setError(`Failed to move ${failedItems.length} item(s) to cart: ${failedItems.join(', ')}. Please try again.`);
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
                className="mt-4 inline-block bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition"
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
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="w-full">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-10">
              <Heart className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-4 text-xl text-gray-600">Your wishlist is empty.</p>
              <p className="mt-2 text-gray-500">Start adding services you're interested in!</p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => {
                console.log(`Rendering item ${item.wishlistId}: serviceType=${item.serviceType}, serviceId=${item.serviceId}, price=${item.price}`);
                return (
                <div
                  key={item.wishlistId}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow duration-300"
                >
                    <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                        src={getSafeImageUrl(item.serviceImageUrl)}
                      alt={item.serviceName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                      <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => removeFromWishlist(item.wishlistId)}
                          className="p-2 bg-white/90 rounded-full text-gray-500 hover:text-red-600 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => addIndividualItemToCart(item)}
                          className="p-2 bg-white/90 rounded-full text-purple-600 hover:text-purple-800 transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                    <div className="p-3">
                      <Link to={getServiceRoute(item)} className="block">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-purple-700 transition-colors">
                      {item.serviceName}
                    </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.serviceDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-bold">
                          {item.price === 0
                            ? 'Free'
                            : item.price === null || item.price === undefined
                            ? 'Loading...'
                            : `₹${item.price.toFixed(2)}`}
                        </span>
                        <Link
                          to={`/booking/${item.serviceType}/${item.serviceId}`}
                          onClick={() => addIndividualItemToCart(item)}
                          className="mt-4 block bg-[#499E14] text-white font-semibold py-2 px-4 rounded-lg text-center shadow-md"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;