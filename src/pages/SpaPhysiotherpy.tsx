import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface SpaItem {
  spaId: number;
  spaName: string;
  spaDescription: string | null;
  spaImage: string | null;
  rating: string | null;
  address: string | null;
  locationId: number | null;
}

interface PhysioItem {
  physioId: number;
  physioName: string;
  physioDescription: string;
  physioImage: string;
  rating: string;
  address: string;
  price: string;
  location: any;
}

const ServiceListingPage: React.FC = () => {
  const [spaData, setSpaData] = useState<SpaItem[]>([]);
  const [spaSearch, setSpaSearch] = useState('');
  const [spaSort, setSpaSort] = useState<'name-asc' | 'name-desc' | 'rating-desc'>('name-asc');
  const [spaRating, setSpaRating] = useState<number | null>(null);
  const [spaLocation, setSpaLocation] = useState('');

  const [physioData, setPhysioData] = useState<PhysioItem[]>([]);
  const [physioSearch, setPhysioSearch] = useState('');
  const [physioSort, setPhysioSort] = useState<'name-asc' | 'name-desc' | 'rating-desc'>('name-asc');
  const [physioRating, setPhysioRating] = useState<number | null>(null);
  const [physioLocation, setPhysioLocation] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr'>('en');

  const getTranslatedText = (en: string, es: string, fr: string) =>
    selectedLanguage === 'en' ? en : selectedLanguage === 'es' ? es : fr || en;
  const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios.get(`${base_url}/spaCenter/all`)
      .then(res => setSpaData(res.data))
      .catch(err => console.error('Failed to fetch spa data:', err));
   const base_url="https://healthtourism-5.onrender.com"
    axios.get(`${base_url}/physio`)
      .then(res => setPhysioData(res.data))
      .catch(err => console.error('Failed to fetch physio data:', err));
  }, []);

  const filteredSpas = useMemo(() => {
    return spaData
      .filter(spa => {
        const matchesSearch = spa.spaName.toLowerCase().includes(spaSearch.toLowerCase());
        const matchesRating = spaRating ? parseFloat(spa.rating || '0') >= spaRating : true;
        const matchesLocation = spaLocation ? (spa.address || '').toLowerCase().includes(spaLocation.toLowerCase()) : true;
        return matchesSearch && matchesRating && matchesLocation;
      })
      .sort((a, b) => {
        if (spaSort === 'rating-desc') return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
        const nameA = a.spaName.toLowerCase();
        const nameB = b.spaName.toLowerCase();
        return spaSort === 'name-asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  }, [spaData, spaSearch, spaRating, spaLocation, spaSort]);

  const filteredPhysios = useMemo(() => {
    return physioData
      .filter(physio => {
        const matchesSearch = physio.physioName.toLowerCase().includes(physioSearch.toLowerCase());
        const matchesRating = physioRating ? parseFloat(physio.rating || '0') >= physioRating : true;
        const matchesLocation = physioLocation ? (physio.address || '').toLowerCase().includes(physioLocation.toLowerCase()) : true;
        return matchesSearch && matchesRating && matchesLocation;
      })
      .sort((a, b) => {
        if (physioSort === 'rating-desc') return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
        const nameA = a.physioName.toLowerCase();
        const nameB = b.physioName.toLowerCase();
        return physioSort === 'name-asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  }, [physioData, physioSearch, physioRating, physioLocation, physioSort]);

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
            onChange={e => setSort(e.target.value as any)}
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
              placeholder={getTranslatedText('Filter by location...', 'Filtrar por ubicación...', 'Filtrer par emplacement...')}
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SPA SECTION */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {getTranslatedText('Explore Spa Services', 'Explora Servicios de Spa', 'Découvrez les Services de Spa')}
          </h2>
        </div>
        {renderControls(spaSearch, setSpaSearch, spaSort, setSpaSort, spaRating, setSpaRating, spaLocation, setSpaLocation)}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSpas.map(spa => (
            <div key={spa.spaId} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <img src={spa.spaImage || 'https://via.placeholder.com/300x200?text=No+Image'} alt={spa.spaName} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">{spa.spaName}</h3>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{spa.rating || 'Not rated'}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{spa.spaDescription || 'No description provided.'}</p>
                <p className="mt-2 text-xs text-gray-400 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />{spa.address || 'No address available'}
                </p>
                <div className="mt-4">
                  <Link to={`/viewtests/${spa.spaId}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    {getTranslatedText('View Services', 'Explorar Más', 'Découvrir Plus')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PHYSIOTHERAPY SECTION */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {getTranslatedText('Explore Physiotherapy Services', 'Explora Servicios de Fisioterapia', 'Découvrez les Services de Physiothérapie')}
          </h2>
        </div>
        {renderControls(physioSearch, setPhysioSearch, physioSort, setPhysioSort, physioRating, setPhysioRating, physioLocation, setPhysioLocation)}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhysios.map(physio => (
            <div key={physio.physioId} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <img src={physio.physioImage || 'https://via.placeholder.com/300x200?text=No+Image'} alt={physio.physioName} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">{physio.physioName}</h3>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{physio.rating || 'Not rated'}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{physio.physioDescription || 'No description provided.'}</p>
                <p className="mt-2 text-xs text-gray-400 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />{physio.address || 'No address available'}
                </p>
                <div className="mt-4">
                  <Link to={`/viewphysios/${physio.physioId}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    {getTranslatedText('Book now', 'Explorar Más', 'Découvrir Plus')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceListingPage;
