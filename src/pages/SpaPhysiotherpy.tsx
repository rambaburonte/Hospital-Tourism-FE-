import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Search, Star, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/config/config';
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

interface SpaItem {
  spaId: number;
  spaName: string;
  spaDescription: string | null;
  spaImage: string | null;
  rating: string | null;
  address: string | null;
  locationId: number | null;
  city: string;
  state: string;
  country: string;
}

interface PhysioItem {
  physioId: number;
  physioName: string;
  physioDescription: string;
  physioImage: string;
  rating: string;
  address: string;
  price: string;
  city: string;
  state: string;
  country: string;
}

const ServiceListingPage: React.FC = () => {
  const [spaData, setSpaData] = useState<SpaItem[]>([]);
  const [physioData, setPhysioData] = useState<PhysioItem[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  // Search states
  const [spaSearch, setSpaSearch] = useState('');
  const [physioSearch, setPhysioSearch] = useState('');
  
  // Sort states
  const [spaSort, setSpaSort] = useState<'name-asc' | 'name-desc' | 'rating-desc'>('name-asc');
  const [physioSort, setPhysioSort] = useState<'name-asc' | 'name-desc' | 'rating-desc'>('name-asc');
  
  // Rating filter states
  const [spaRating, setSpaRating] = useState<number | null>(null);
  const [physioRating, setPhysioRating] = useState<number | null>(null);
  
  // Location filter states
  const [spaLocationFilters, setSpaLocationFilters] = useState<LocationFilters>({
    city: '',
    state: '',
    country: ''
  });
  const [physioLocationFilters, setPhysioLocationFilters] = useState<LocationFilters>({
    city: '',
    state: '',
    country: ''
  });

  // Language state
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr'>('en');

  // Navigation hook
  const navigate = useNavigate();

  // Booking redirect function
  const handleBooking = (serviceId: number, serviceType: 'spa' | 'physio') => {
    const bookingRoute = serviceType === 'spa' 
      ? `/booking/spa/${serviceId}` 
      : `/booking/physio/${serviceId}`;
    navigate(bookingRoute);
  };

  // Get unique locations from locations API
  const spaLocations = useMemo(() => ({
    cities: [...new Set(locations.map(l => l.city))].sort(),
    states: [...new Set(locations.map(l => l.state))].sort(),
    countries: [...new Set(locations.map(l => l.country))].sort(),
  }), [locations]);

  // Get unique locations from locations API (same for both services)
  const physioLocations = useMemo(() => ({
    cities: [...new Set(locations.map(l => l.city))].sort(),
    states: [...new Set(locations.map(l => l.state))].sort(),
    countries: [...new Set(locations.map(l => l.country))].sort(),
  }), [locations]);

  const handleSpaLocationChange = (field: keyof LocationFilters, value: string) => {
    setSpaLocationFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhysioLocationChange = (field: keyof LocationFilters, value: string) => {
    setPhysioLocationFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearSpaFilters = () => {
    setSpaLocationFilters({ city: '', state: '', country: '' });
    setSpaSearch('');
    setSpaRating(null);
  };

  const clearPhysioFilters = () => {
    setPhysioLocationFilters({ city: '', state: '', country: '' });
    setPhysioSearch('');
    setPhysioRating(null);
  };

  // Translation helper
  const getTranslatedText = (en: string, es: string, fr: string) =>
    selectedLanguage === 'en' ? en : selectedLanguage === 'es' ? es : fr || en;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch spa data
        const spaResponse = await axios.get(`${BASE_URL}/spaCenter/all`);
        setSpaData(spaResponse.data);

        // Fetch physio data
        const physioResponse = await axios.get(`${BASE_URL}/physio/getall/pysios`);
        setPhysioData(physioResponse.data);

        // Fetch locations
        const locationsResponse = await axios.get<Location[]>(`${BASE_URL}/api/locations/getall`);
        setLocations(locationsResponse.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  // Filter and sort spa data
  const filteredSpaData = useMemo(() => {
    return spaData
      .filter(item => {
        const matchesSearch = item.spaName.toLowerCase().includes(spaSearch.toLowerCase());
        const matchesRating = !spaRating || (item.rating && parseFloat(item.rating) >= spaRating);
        const matchesLocation = 
          (!spaLocationFilters.city || item.city === spaLocationFilters.city) &&
          (!spaLocationFilters.state || item.state === spaLocationFilters.state) &&
          (!spaLocationFilters.country || item.country === spaLocationFilters.country);
        return matchesSearch && matchesRating && matchesLocation;
      })
      .sort((a, b) => {
        if (spaSort === 'name-asc') return a.spaName.localeCompare(b.spaName);
        if (spaSort === 'name-desc') return b.spaName.localeCompare(a.spaName);
        return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
      });
  }, [spaData, spaSearch, spaRating, spaSort, spaLocationFilters]);

  // Filter and sort physio data
  const filteredPhysioData = useMemo(() => {
    return physioData
      .filter(item => {
        const matchesSearch = item.physioName.toLowerCase().includes(physioSearch.toLowerCase());
        const matchesRating = !physioRating || (item.rating && parseFloat(item.rating) >= physioRating);
        const matchesLocation = 
          (!physioLocationFilters.city || item.city === physioLocationFilters.city) &&
          (!physioLocationFilters.state || item.state === physioLocationFilters.state) &&
          (!physioLocationFilters.country || item.country === physioLocationFilters.country);
        return matchesSearch && matchesRating && matchesLocation;
      })
      .sort((a, b) => {
        if (physioSort === 'name-asc') return a.physioName.localeCompare(b.physioName);
        if (physioSort === 'name-desc') return b.physioName.localeCompare(a.physioName);
        return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
      });
  }, [physioData, physioSearch, physioRating, physioSort, physioLocationFilters]);

  const renderControls = (
    searchValue: string,
    setSearch: (v: string) => void,
    sortValue: 'name-asc' | 'name-desc' | 'rating-desc',
    setSort: (v: 'name-asc' | 'name-desc' | 'rating-desc') => void,
    ratingValue: number | null,
    setRating: (v: number | null) => void,
    locationValue: string,
    setLocation: (v: string) => void
  ) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={getTranslatedText('Search services...', 'Buscar servicios...', 'Rechercher des services...')}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchValue}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={sortValue}
            onChange={e => setSort(e.target.value as 'name-asc' | 'name-desc' | 'rating-desc')}
            className="border rounded-lg px-3 py-2"
          >
            <option value="name-asc">{getTranslatedText('Name (A-Z)', 'Nombre (A-Z)', 'Nom (A-Z)')}</option>
            <option value="name-desc">{getTranslatedText('Name (Z-A)', 'Nombre (Z-A)', 'Nom (Z-A)')}</option>
            <option value="rating-desc">{getTranslatedText('Rating (High to Low)', 'Calificación (Alta a Baja)', 'Note (Élevée à Faible)')}</option>
          </select>

          <select
            value={ratingValue || ''}
            onChange={e => setRating(e.target.value ? parseInt(e.target.value) : null)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">{getTranslatedText('All Ratings', 'Todas las Calificaciones', 'Toutes les Notes')}</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={getTranslatedText('Filter by address...', 'Filtrar por ubicación...', 'Filtrer par emplacement...')}
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={locationValue}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Spa Centers Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {getTranslatedText('Explore Spa Services', 'Explora Servicios de Spa', 'Découvrez les Services de Spa')}
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder={getTranslatedText('Search spa centers...', 'Buscar centros de spa...', 'Rechercher des centres de spa...')}
                value={spaSearch}
                onChange={(e) => setSpaSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Location filters for Spa */}
            <Select
              value={spaLocationFilters.city || 'all'}
              onValueChange={(value) => handleSpaLocationChange('city', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={getTranslatedText('Filter by City', 'Filtrar por Ciudad', 'Filtrer par Ville')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslatedText('All Cities', 'Todas las Ciudades', 'Toutes les Villes')}</SelectItem>
                {spaLocations.cities.filter(city => city && city.trim() !== '').map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={spaLocationFilters.state || 'all'}
              onValueChange={(value) => handleSpaLocationChange('state', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={getTranslatedText('Filter by State', 'Filtrar por Estado', 'Filtrer par État')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslatedText('All States', 'Todos los Estados', 'Tous les États')}</SelectItem>
                {spaLocations.states.filter(state => state && state.trim() !== '').map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={spaLocationFilters.country || 'all'}
              onValueChange={(value) => handleSpaLocationChange('country', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={getTranslatedText('Filter by Country', 'Filtrar por País', 'Filtrer par Pays')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslatedText('All Countries', 'Todos los Países', 'Tous les Pays')}</SelectItem>
                {spaLocations.countries.filter(country => country && country.trim() !== '').map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional filters and clear button */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <Select
                value={spaRating?.toString() || 'all'}
                onValueChange={(value) => setSpaRating(value === 'all' ? null : Number(value))}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={getTranslatedText('Rating', 'Calificación', 'Évaluation')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getTranslatedText('All Ratings', 'Todas las Calificaciones', 'Toutes les Notes')}</SelectItem>
                  {[4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}+ Stars
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={spaSort}
                onValueChange={(value: 'name-asc' | 'name-desc' | 'rating-desc') => setSpaSort(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={getTranslatedText('Sort by', 'Ordenar por', 'Trier par')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">{getTranslatedText('Name (A-Z)', 'Nombre (A-Z)', 'Nom (A-Z)')}</SelectItem>
                  <SelectItem value="name-desc">{getTranslatedText('Name (Z-A)', 'Nombre (Z-A)', 'Nom (Z-A)')}</SelectItem>
                  <SelectItem value="rating-desc">{getTranslatedText('Highest Rated', 'Mejor Calificado', 'Mieux Noté')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={clearSpaFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={!spaSearch && !spaRating && !spaLocationFilters.city && !spaLocationFilters.state && !spaLocationFilters.country}
            >
              {getTranslatedText('Clear Filters', 'Limpiar Filtros', 'Effacer les Filtres')}
            </button>
          </div>
        </div>

        {/* Spa Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaData.map((spa) => (
            <div key={spa.spaId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={spa.spaImage || '/placeholder-spa.jpg'}
                alt={spa.spaName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{spa.spaName}</h3>
                <p className="text-gray-600 mb-4">{spa.spaDescription}</p>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span>{spa.city}, {spa.state}</span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span>{spa.rating || 'N/A'}</span>
                </div>
                <button
                  onClick={() => handleBooking(spa.spaId, 'spa')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={16} />
                  {getTranslatedText('Book Appointment', 'Reservar Cita', 'Prendre Rendez-vous')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Physiotherapy Centers Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {getTranslatedText('Explore Physiotherapy Services', 'Explora Servicios de Fisioterapia', 'Découvrez les Services de Physiothérapie')}
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder={getTranslatedText('Search physiotherapy centers...', 'Buscar centros de fisioterapia...', 'Rechercher des centres de physiothérapie...')}
                value={physioSearch}
                onChange={(e) => setPhysioSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Location filters for Physiotherapy */}
            <Select
              value={physioLocationFilters.city || 'all'}
              onValueChange={(value) => handlePhysioLocationChange('city', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={getTranslatedText('Filter by City', 'Filtrar por Ciudad', 'Filtrer par Ville')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslatedText('All Cities', 'Todas las Ciudades', 'Toutes les Villes')}</SelectItem>
                {physioLocations.cities.filter(city => city && city.trim() !== '').map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={physioLocationFilters.state || 'all'}
              onValueChange={(value) => handlePhysioLocationChange('state', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={getTranslatedText('Filter by State', 'Filtrar por Estado', 'Filtrer par État')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslatedText('All States', 'Todos los Estados', 'Tous les États')}</SelectItem>
                {physioLocations.states.filter(state => state && state.trim() !== '').map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={physioLocationFilters.country || 'all'}
              onValueChange={(value) => handlePhysioLocationChange('country', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={getTranslatedText('Filter by Country', 'Filtrar por País', 'Filtrer par Pays')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getTranslatedText('All Countries', 'Todos los Países', 'Tous les Pays')}</SelectItem>
                {physioLocations.countries.filter(country => country && country.trim() !== '').map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional filters and clear button */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <Select
                value={physioRating?.toString() || 'all'}
                onValueChange={(value) => setPhysioRating(value === 'all' ? null : Number(value))}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={getTranslatedText('Rating', 'Calificación', 'Évaluation')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{getTranslatedText('All Ratings', 'Todas las Calificaciones', 'Toutes les Notes')}</SelectItem>
                  {[4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}+ Stars
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={physioSort}
                onValueChange={(value: 'name-asc' | 'name-desc' | 'rating-desc') => setPhysioSort(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={getTranslatedText('Sort by', 'Ordenar por', 'Trier par')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">{getTranslatedText('Name (A-Z)', 'Nombre (A-Z)', 'Nom (A-Z)')}</SelectItem>
                  <SelectItem value="name-desc">{getTranslatedText('Name (Z-A)', 'Nombre (Z-A)', 'Nom (Z-A)')}</SelectItem>
                  <SelectItem value="rating-desc">{getTranslatedText('Highest Rated', 'Mejor Calificado', 'Mieux Noté')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              onClick={clearPhysioFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={!physioSearch && !physioRating && !physioLocationFilters.city && !physioLocationFilters.state && !physioLocationFilters.country}
            >
              {getTranslatedText('Clear Filters', 'Limpiar Filtros', 'Effacer les Filtres')}
            </button>
          </div>
        </div>

        {/* Physiotherapy Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhysioData.map((physio) => (
            <div key={physio.physioId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={physio.physioImage || '/placeholder-physio.jpg'}
                alt={physio.physioName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{physio.physioName}</h3>
                <p className="text-gray-600 mb-4">{physio.physioDescription}</p>
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <MapPin size={16} />
                  <span>{physio.city}, {physio.state}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span>{physio.rating || 'N/A'}</span>
                  </div>
                  <span className="text-green-600 font-semibold">{physio.price}</span>
                </div>
                <button
                  onClick={() => handleBooking(physio.physioId, 'physio')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar size={16} />
                  {getTranslatedText('Book Appointment', 'Reservar Cita', 'Prendre Rendez-vous')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceListingPage;