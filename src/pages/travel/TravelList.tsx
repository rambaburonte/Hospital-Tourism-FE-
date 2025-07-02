import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
}

interface TravelInterface {
  travelId: number;
  travelName: string;
  travelDescription: string;
  travelImage: string;
  price: number;
  rating: string;
  transportType: string;
  features: string[];
  city: string;
  state: string;
  country: string;
}

const TravelList: React.FC = () => {
  const [travelServices, setTravelServices] = useState<TravelInterface[]>([]);
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
        // Fetch travel services
        const travelResponse = await axios.get(`${BASE_URL}/api/travel-services`);
        setTravelServices(travelResponse.data);

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
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch travel services';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter travel services based on location
  const filteredServices = travelServices.filter((service) => {
    const matchCity = !selectedCity || service.city === selectedCity;
    const matchState = !selectedState || service.state === selectedState;
    const matchCountry = !selectedCountry || service.country === selectedCountry;
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
            <Plane className="h-8 w-8 text-blue-600" />
            Travel Services
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

        {/* Travel Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              No travel services found for the selected filters.
            </div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.travelId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={service.travelImage || 'https://placehold.co/600x400?text=Travel+Service'}
                  alt={service.travelName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{service.travelName}</h2>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                      {service.transportType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{service.travelDescription}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">
                      {[service.city, service.state, service.country].filter(Boolean).join(', ')}
                    </span>
                    <span className="text-yellow-500">{service.rating} ★</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features?.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">₹{service.price}</span>
                    <Link
                      to={`/booking/travel/${service.travelId}`}
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

export default TravelList;
