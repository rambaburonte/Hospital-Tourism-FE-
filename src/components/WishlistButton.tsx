import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
import { Heart } from 'lucide-react';

export type ServiceType = 'chef' | 'labtest' | 'doctor' | 'spa' | 'translator' | 'physio' | 'hospital' | 'hotel' | 'travel' | 'pharmacy';

interface WishlistButtonProps {
  serviceId: number;
  serviceType: ServiceType;
  serviceName: string;
  price: number;
  description?: string;
  serviceImageUrl?: string;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  serviceId,
  serviceType,
  serviceName,
  price,
  description,
  serviceImageUrl = '',
  className = ''
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ id: number; name?: string; email?: string } | null>(null);
  const [wishlistId, setWishlistId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [isServiceDetailsLoading, setIsServiceDetailsLoading] = useState(true);

  const serviceApiMap = {
    chef: `/api/chefs/chef-By/Id/${serviceId}`,
    translator: `/api/translators/getone/${serviceId}`,
    spa: `/spaServices/spa/${serviceId}`,
    doctor: `/api/doctors/By/${serviceId}`,
    physio: `/physio/get/${serviceId}`,
    hospital: `/api/hospitals/get/${serviceId}`,
    hotel: `/api/hotels/get/${serviceId}`,
    travel: `/api/travel/get/${serviceId}`,
    pharmacy: `/api/pharmacies/get/${serviceId}`,
    labtest: `/api/labtests/get/${serviceId}`,
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (storedUser && (storedUser.id || storedUser.userId)) {
      setUser({
        ...storedUser,
        id: storedUser.id || storedUser.userId,
        name: storedUser.name || storedUser.userName,
        email: storedUser.email || storedUser.userEmail
      });
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const checkWishlistStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/wishlist/${user.id}`);
        console.log('Wishlist items:', response.data);
        const wishlistItem = response.data.find(
          (item: any) => item.serviceId === serviceId && item.serviceType.toLowerCase() === serviceType.toLowerCase()
        );
        console.log('Found wishlist item:', wishlistItem);
        setIsInWishlist(!!wishlistItem);
        if (wishlistItem) {
          setWishlistId(wishlistItem.wishlistId);
        }
      } catch (err) {
        console.error('Failed to check wishlist status:', err);
        setError('Failed to check wishlist status');
      }
    };

    checkWishlistStatus();
  }, [user, serviceId, serviceType]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const apiPath = serviceApiMap[serviceType];
      if (!apiPath) {
        setIsServiceDetailsLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}${apiPath}`);
        const data = res.data;
        setServiceDetails(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load service details:', err);
        setError('Failed to load service details.');
      } finally {
        setIsServiceDetailsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceType, serviceId]);

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

  const toggleWishlist = async () => {
    if (!user?.id) {
      setError('Please login to manage wishlist');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isInWishlist && wishlistId) {
        console.log('Removing from wishlist:', wishlistId);
        await axios.delete(`${BASE_URL}/api/wishlist/remove/${wishlistId}`);
        setIsInWishlist(false);
        setWishlistId(null);
      } else {
        const serviceIdFieldName = getServiceIdField(serviceType);
        const payload = {
          userId: user.id,
          userName: user.name || 'User',
          userEmail: user.email || '',
          serviceName: serviceDetails?.chefName || serviceDetails?.translatorName || serviceDetails?.spaServiceName || serviceDetails?.doctorName || serviceDetails?.physioName || serviceName,
          serviceDescription: description || serviceDetails?.description || serviceDetails?.speciality || '',
          serviceImageUrl: serviceImageUrl || serviceDetails?.chefImage || serviceDetails?.image || 'https://placehold.co/400x300?text=No+Image',
          price: price || 0,
          serviceType: serviceType.toLowerCase(),
          [serviceIdFieldName]: serviceId,
          notes: '',
          paymentMode: 'ONLINE',
          bookingType: 'SINGLE',
          bookingAmount: price || 0,
          serviceId: serviceId // Add this to ensure serviceId is included
        };

        console.log('Adding to wishlist with payload:', payload);
        const response = await axios.post(`${BASE_URL}/api/wishlist/add/${user.id}/${serviceType.toLowerCase()}/${serviceId}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Wishlist response:', response.data);
        
        if (response.data) {
          setIsInWishlist(true);
          setWishlistId(response.data.wishlistId);
        } else {
          throw new Error('No response data received');
        }
      }
    } catch (err: any) {
      console.error('Failed to toggle wishlist:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update wishlist';
      setError(errorMessage);
      // Reset the wishlist state on error
      setIsInWishlist(false);
      setWishlistId(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`flex items-center justify-center p-2 rounded-full transition-colors ${
        isInWishlist
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500'
      } ${className}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
    </button>
  );
};

export default WishlistButton; 