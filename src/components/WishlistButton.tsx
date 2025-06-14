import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config/config';

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
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [wishlistId, setWishlistId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (storedUser && (storedUser.id || storedUser.userId)) {
      setUser({
        ...storedUser,
        id: storedUser.id || storedUser.userId
      });
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const checkWishlistStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/wishlist/${user.id}`);
        const wishlistItem = response.data.find(
          (item: any) => item.serviceId === serviceId && item.serviceType === serviceType
        );
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

  const toggleWishlist = async () => {
    if (!user?.id) {
      setError('Please login to add items to wishlist');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (isInWishlist && wishlistId) {
        await axios.delete(`${BASE_URL}/api/wishlist/remove/${wishlistId}`);
        setIsInWishlist(false);
        setWishlistId(null);
      } else {
        const payload = {
          serviceName,
          serviceDescription: description || '',
          serviceImageUrl: serviceImageUrl || '',
          price: price || 0,
          serviceType
        };
        
        const response = await axios.post(
          `${BASE_URL}/api/wishlist/add/${user.id}/${serviceType}/${serviceId}`,
          payload
        );
        
        if (response.data && response.data.wishlistId) {
          setIsInWishlist(true);
          setWishlistId(response.data.wishlistId);
        } else {
          throw new Error('Invalid response from server');
        }
      }
    } catch (err: any) {
      console.error('Failed to update wishlist:', err);
      setError(err.response?.data?.message || 'Failed to update wishlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleWishlist}
        disabled={isLoading}
        className={`p-2 rounded-full transition-colors duration-200 ${
          isInWishlist
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-red-500'
        } ${className}`}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          className="w-6 h-6"
          fill={isInWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      {error && (
        <div className="absolute top-full left-0 mt-1 bg-red-100 text-red-700 text-xs p-2 rounded shadow-lg z-50 whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

export default WishlistButton; 