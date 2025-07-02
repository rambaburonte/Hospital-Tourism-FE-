import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string[];
  price: number;
  location: LocationFilters;
  status: string | null;
}

const ChefsList: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    city: '',
    state: '',
    country: '',
  });
  const [styleFilter, setStyleFilter] = useState('');
  const navigate = useNavigate();

  // Get unique locations from locations API and styles from chefs
  const uniqueValues = useMemo(
    () => ({
      cities: [...new Set(locations.map((l) => l.city))].sort(),
      states: [...new Set(locations.map((l) => l.state))].sort(),
      countries: [...new Set(locations.map((l) => l.country))].sort(),
      styles: [...new Set(chefs.flatMap((chef) => chef.styles))].sort(),
    }),
    [chefs, locations]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch chefs
        const chefsResponse = await fetch(`${BASE_URL}/api/chefs`);
        const chefsData = await chefsResponse.json();
        
        // Fetch locations
        const locationsResponse = await fetch(`${BASE_URL}/api/locations/getall`);
        const locationsData = await locationsResponse.json();
        setLocations(locationsData);
        
        // Transform the chef data to match our interface
        interface RawChef {
          chefID: number;
          chefName: string;
          chefDescription: string;
          chefImage: string;
          chefRating: string;
          experience: string;
          styles: string | string[];
          price: number;
          city?: string;
          state?: string;
          country?: string;
          status: string | null;
        }
        const formattedData: Chef[] = chefsData.map((chef: RawChef) => ({
          ...chef,
          styles: Array.isArray(chef.styles)
            ? chef.styles
            : chef.styles.split(',').map((s: string) => s.trim()),
          location: {
            city: chef.city || 'Unknown',
            state: chef.state || 'Unknown',
            country: chef.country || 'Unknown',
          },
        }));
        setChefs(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLocationFilterChange = (field: keyof LocationFilters, value: string) => {
    setLocationFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setLocationFilters({
      city: '',
      state: '',
      country: '',
    });
    setSearchQuery('');
    setStyleFilter('');
  };

  const filteredChefs = useMemo(() => {
    return chefs.filter((chef) => {
      const matchesSearch =
        chef.chefName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.chefDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        (!locationFilters.city || chef.location.city === locationFilters.city) &&
        (!locationFilters.state || chef.location.state === locationFilters.state) &&
        (!locationFilters.country || chef.location.country === locationFilters.country);
      const matchesStyle =
        !styleFilter || chef.styles.some((style) => style.toLowerCase().includes(styleFilter.toLowerCase()));

      return matchesSearch && matchesLocation && matchesStyle;
    });
  }, [chefs, searchQuery, locationFilters, styleFilter]);

  const handleBookClick = (chefID: number) => {
    navigate(`/booking/chef/${chefID}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Expert Chefs
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search chefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Location filters */}
            <Select
              value={locationFilters.city}
              onValueChange={(value) => handleLocationFilterChange('city', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by City" />
              </SelectTrigger>
              <SelectContent>
                {uniqueValues.cities.map((city) => (
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
              <SelectTrigger>
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent>
                {uniqueValues.states.map((state) => (
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
              <SelectTrigger>
                <SelectValue placeholder="Filter by Country" />
              </SelectTrigger>
              <SelectContent>
                {uniqueValues.countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Cuisine style filter */}
            <Select value={styleFilter || 'all'} onValueChange={(value) => setStyleFilter(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Cuisine Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                {uniqueValues.styles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear filters button */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={
                !searchQuery &&
                !styleFilter &&
                !locationFilters.city &&
                !locationFilters.state &&
                !locationFilters.country
              }
            >
              Clear Filters
            </button>
          </div>
        </div>

        {filteredChefs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No chefs found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChefs.map((chef) => (
              <div
                key={chef.chefID}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={chef.chefImage}
                  alt={chef.chefName}
                  className="w-full h-64 object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {chef.chefName}
                  </h2>
                  <p className="text-gray-600 mb-4">{chef.chefDescription}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Location:</span> {chef.location.city}, {chef.location.state}, {chef.location.country}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Experience:</span> {chef.experience}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Cuisine Styles:</span> {chef.styles.join(', ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Rating:</span> {chef.chefRating} ⭐
                    </p>
                    <p className="text-green-600 font-semibold">
                      Starting from ${chef.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBookClick(chef.chefID)}
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefsList;