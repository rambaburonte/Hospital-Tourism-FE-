import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
}

interface HotelInterface {
  hotelId: number;
  hotelName: string;
  hotelDescription: string;
  hotelImage: string;
  price: number;
  rating: string;
  amenities: string[];
  city: string;
  state: string;
  country: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<HotelInterface[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Location filters
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // Unique location options from locations API
  const [cities, setCities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hotels
        const hotelsResponse = await axios.get(`${BASE_URL}/api/hotels`);
        setHotels(hotelsResponse.data);

        // Fetch locations
        const locationsResponse = await axios.get(`${BASE_URL}/api/locations/getall`);
        setLocations(locationsResponse.data);

        // Extract unique location values from locations API
        const uniqueCities = Array.from(new Set(locationsResponse.data.map((location: Location) => location.city))) as string[];
        const uniqueStates = Array.from(new Set(locationsResponse.data.map((location: Location) => location.state))) as string[];
        const uniqueCountries = Array.from(new Set(locationsResponse.data.map((location: Location) => location.country))) as string[];

        setCities(uniqueCities);
        setStates(uniqueStates);
        setCountries(uniqueCountries);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hotels';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter hotels based on location
  const filteredHotels = hotels.filter((hotel) => {
    const matchCity = !selectedCity || hotel.city === selectedCity;
    const matchState = !selectedState || hotel.state === selectedState;
    const matchCountry = !selectedCountry || hotel.country === selectedCountry;
    return matchCity && matchState && matchCountry;
  });

  // Clear all filters
  const clearFilters = () => {
    setSelectedCity('');
    setSelectedState('');
    setSelectedCountry('');
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            Hotels & Accommodations
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              isClearable
              placeholder="Filter by City"
              value={selectedCity ? { value: selectedCity, label: selectedCity } : null}
              options={cities.map(city => ({ value: city, label: city }))}
              onChange={(option) => setSelectedCity(option?.value || '')}
              className="w-full"
            />
            <Select
              isClearable
              placeholder="Filter by State"
              value={selectedState ? { value: selectedState, label: selectedState } : null}
              options={states.map(state => ({ value: state, label: state }))}
              onChange={(option) => setSelectedState(option?.value || '')}
              className="w-full"
            />
            <Select
              isClearable
              placeholder="Filter by Country"
              value={selectedCountry ? { value: selectedCountry, label: selectedCountry } : null}
              options={countries.map(country => ({ value: country, label: country }))}
              onChange={(option) => setSelectedCountry(option?.value || '')}
              className="w-full"
            />
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Hotel List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              No hotels found for the selected filters.
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <div key={hotel.hotelId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={hotel.hotelImage || 'https://placehold.co/600x400?text=Hotel+Image'}
                  alt={hotel.hotelName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{hotel.hotelName}</h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{hotel.hotelDescription}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">
                      {[hotel.city, hotel.state, hotel.country].filter(Boolean).join(', ')}
                    </span>
                    <span className="text-yellow-500">{hotel.rating} ★</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities?.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">₹{hotel.price}/night</span>
                    <Link
                      to={`/booking/hotel/${hotel.hotelId}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
