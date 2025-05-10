import React, { useState, useMemo } from 'react';
import { MapPin, Search, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the type for service items
interface ServiceItem {
  name: string;
  details: string;
  image: string;
  description: string;
  name_es: string;
  details_es: string;
  description_es: string;
  name_fr: string;
  details_fr: string;
  description_fr: string;
  price: number;
  category: 'Spa' | 'Physiotherapy';
}

// Define the type for translators
interface Translator {
  name: string;
  availability_date: string;
}

const ServiceListingPage = () => {
  // State for input fields
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('name-asc');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Spa' | 'Physiotherapy'>('All');

  // Mock translator data
  const translators: Translator[] = [
    { name: 'Maria Gonzalez', availability_date: '2025-06-01' },
    { name: 'Pierre Dubois', availability_date: '2025-06-05' },
    { name: 'Anita Sharma', availability_date: '2025-06-10' },
  ];

  // Translation map for UI text
  const uiTranslations: Record<string, { en: string; es: string; fr: string }> = {
    title: {
      en: 'Explore Spa & Physiotherapy Services',
      es: 'Explora Servicios de Spa y Fisioterapia',
      fr: 'Découvrez les Services de Spa et Physiothérapie',
    },
    searchPlaceholder: {
      en: 'Search Services',
      es: 'Buscar Servicios',
      fr: 'Rechercher des Services',
    },
    locationPlaceholder: {
      en: 'Choose Location',
      es: 'Elegir Ubicación',
      fr: 'Choisir un Emplacement',
    },
    translatorsTitle: {
      en: 'Available Translators',
      es: 'Traductores Disponibles',
      fr: 'Traducteurs Disponibles',
    },
    availableFrom: {
      en: 'Available from',
      es: 'Disponible desde',
      fr: 'Disponible à partir de',
    },
    sortLabel: {
      en: 'Sort By',
      es: 'Ordenar Por',
      fr: 'Trier Par',
    },
    categoryLabel: {
      en: 'Filter by Category',
      es: 'Filtrar por Categoría',
      fr: 'Filtrer par Catégorie',
    },
    addToCart: {
      en: 'Add to Cart',
      es: 'Añadir al Carrito',
      fr: 'Ajouter au Panier',
    },
  };

  // Service data with unique images
  const services: ServiceItem[] = [
    {
      name: 'Therapeutic Massage',
      details: 'Relieves muscle tension',
      image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Relaxing massage to ease stress and muscle pain.',
      name_es: 'Masaje Terapéutico',
      details_es: 'Alivia la tensión muscular',
      description_es: 'Masaje relajante para aliviar el estrés y el dolor muscular.',
      name_fr: 'Massage Thérapeutique',
      details_fr: 'Soulage la tension musculaire',
      description_fr: 'Massage relaxant pour soulager le stress et les douleurs musculaires.',
      price: 80,
      category: 'Spa',
    },
    {
      name: 'Physiotherapy Session',
      details: 'Post-surgery recovery',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Tailored sessions to aid recovery and improve mobility.',
      name_es: 'Sesión de Fisioterapia',
      details_es: 'Recuperación post-cirugía',
      description_es: 'Sesiones personalizadas para ayudar en la recuperación y mejorar la movilidad.',
      name_fr: 'Séance de Physiothérapie',
      details_fr: 'Récupération post-chirurgicale',
      description_fr: 'Séances personnalisées pour aider à la récupération et améliorer la mobilité.',
      price: 100,
      category: 'Physiotherapy',
    },
    {
      name: 'Aromatherapy',
      details: 'Stress relief and relaxation',
      image: 'https://images.unsplash.com/photo-1517649763966-506a2083f781?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Uses essential oils to promote mental and physical well-being.',
      name_es: 'Aromaterapia',
      details_es: 'Alivio del estrés y relajación',
      description_es: 'Utiliza aceites esenciales para promover el bienestar mental y físico.',
      name_fr: 'Aromathérapie',
      details_fr: 'Soulagement du stress et relaxation',
      description_fr: 'Utilise des huiles essentielles pour promouvoir le bien-être mental et physique.',
      price: 70,
      category: 'Spa',
    },
    {
      name: 'Hydrotherapy',
      details: 'Joint pain relief',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Water-based therapy to alleviate joint discomfort.',
      name_es: 'Hidroterapia',
      details_es: 'Alivio del dolor articular',
      description_es: 'Terapia basada en agua para aliviar las molestias articulares.',
      name_fr: 'Hydrothérapie',
      details_fr: 'Soulagement des douleurs articulaires',
      description_fr: 'Thérapie à base d’eau pour soulager les inconforts articulaires.',
      price: 90,
      category: 'Physiotherapy',
    },
    {
      name: 'Yoga Therapy',
      details: 'Improves flexibility and strength',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Guided yoga sessions for physical and mental health.',
      name_es: 'Terapia de Yoga',
      details_es: 'Mejora la flexibilidad y la fuerza',
      description_es: 'Sesiones de yoga guiadas para la salud física y mental.',
      name_fr: 'Thérapie par le Yoga',
      details_fr: 'Améliore la flexibilité et la force',
      description_fr: 'Séances de yoga guidées pour la santé physique et mentale.',
      price: 60,
      category: 'Spa',
    },
    {
      name: 'Acupuncture',
      details: 'Pain management',
      image: 'https://images.unsplash.com/photo-1595733750589-7e1c7eb7b3ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Traditional therapy to relieve chronic pain and stress.',
      name_es: 'Acupuntura',
      details_es: 'Manejo del dolor',
      description_es: 'Terapia tradicional para aliviar el dolor crónico y el estrés.',
      name_fr: 'Acupuncture',
      details_fr: 'Gestion de la douleur',
      description_fr: 'Thérapie traditionnelle pour soulager la douleur chronique et le stress.',
      price: 120,
      category: 'Physiotherapy',
    },
  ];

  // Memoized filtered and sorted services
  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const name = selectedLanguage === 'en' ? service.name : selectedLanguage === 'es' ? service.name_es : service.name_fr;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .filter((service) => categoryFilter === 'All' || service.category === categoryFilter)
      .sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        const nameA = (selectedLanguage === 'en' ? a.name : selectedLanguage === 'es' ? a.name_es : a.name_fr).toLowerCase();
        const nameB = (selectedLanguage === 'en' ? b.name : selectedLanguage === 'es' ? b.name_es : b.name_fr).toLowerCase();
        if (sortOption === 'name-asc') return nameA.localeCompare(nameB);
        return nameB.localeCompare(nameA);
      });
  }, [searchQuery, selectedLanguage, categoryFilter, sortOption]);

  return (
    <section className="bg-slate-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
            {uiTranslations.title[selectedLanguage]}
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Search, Location, and Language Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder={uiTranslations.searchPlaceholder[selectedLanguage]}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label={uiTranslations.searchPlaceholder[selectedLanguage]}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label={uiTranslations.locationPlaceholder[selectedLanguage]}
                >
                  <option value="">{uiTranslations.locationPlaceholder[selectedLanguage]}</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                  <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                  <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                </select>
              </div>
              <div className="relative">
                <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'es' | 'fr')}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>

            {/* Sort and Category Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  {uiTranslations.sortLabel[selectedLanguage]}
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc')}
                  className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label={uiTranslations.sortLabel[selectedLanguage]}
                >
                  <option value="name-asc">{selectedLanguage === 'en' ? 'Name (A-Z)' : selectedLanguage === 'es' ? 'Nombre (A-Z)' : 'Nom (A-Z)'}</option>
                  <option value="name-desc">{selectedLanguage === 'en' ? 'Name (Z-A)' : selectedLanguage === 'es' ? 'Nombre (Z-A)' : 'Nom (Z-A)'}</option>
                  <option value="price-asc">{selectedLanguage === 'en' ? 'Price (Low to High)' : selectedLanguage === 'es' ? 'Precio (Bajo a Alto)' : 'Prix (Croissant)'}</option>
                  <option value="price-desc">{selectedLanguage === 'en' ? 'Price (High to Low)' : selectedLanguage === 'es' ? 'Precio (Alto a Bajo)' : 'Prix (Décroissant)'}</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">{uiTranslations.categoryLabel[selectedLanguage]}</label>
                <div className="mt-1 flex gap-2">
                  <button
                    onClick={() => setCategoryFilter('All')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm ${categoryFilter === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-indigo-700 hover:text-white transition-all duration-300`}
                    aria-pressed={categoryFilter === 'All'}
                  >
                    {selectedLanguage === 'en' ? 'All' : selectedLanguage === 'es' ? 'Todos' : 'Tous'}
                  </button>
                  <button
                    onClick={() => setCategoryFilter('Spa')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm ${categoryFilter === 'Spa' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-indigo-700 hover:text-white transition-all duration-300`}
                    aria-pressed={categoryFilter === 'Spa'}
                  >
                    Spa
                  </button>
                  <button
                    onClick={() => setCategoryFilter('Physiotherapy')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm ${categoryFilter === 'Physiotherapy' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-indigo-700 hover:text-white transition-all duration-300`}
                    aria-pressed={categoryFilter === 'Physiotherapy'}
                  >
                    {selectedLanguage === 'en' ? 'Physiotherapy' : selectedLanguage === 'es' ? 'Fisioterapia' : 'Physiothérapie'}
                  </button>
                </div>
              </div>
            </div>

            {/* Translator Information */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {uiTranslations.translatorsTitle[selectedLanguage]}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {translators.map((translator, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-800 font-medium">{translator.name}</p>
                    <p className="text-gray-600 text-sm">
                      {uiTranslations.availableFrom[selectedLanguage]}: {translator.availability_date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={service.image}
                    alt={selectedLanguage === 'en' ? service.name : selectedLanguage === 'es' ? service.name_es : service.name_fr}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {selectedLanguage === 'en' ? service.name : selectedLanguage === 'es' ? service.name_es : service.name_fr}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {selectedLanguage === 'en' ? service.details : selectedLanguage === 'es' ? service.details_es : service.details_fr}
                  </p>
                  <p className="text-gray-500 text-xs italic mb-2">
                    {selectedLanguage === 'en' ? service.description : selectedLanguage === 'es' ? service.description_es : service.description_fr}
                  </p>
                  <p className="text-gray-800 font-semibold mb-4">${service.price.toFixed(2)}</p>
                  <Link
                    to={`/cart?service=${encodeURIComponent(selectedLanguage === 'en' ? service.name : selectedLanguage === 'es' ? service.name_es : service.name_fr)}`}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300"
                    aria-label={`${uiTranslations.addToCart[selectedLanguage]} ${selectedLanguage === 'en' ? service.name : selectedLanguage === 'es' ? service.name_es : service.name_fr}`}
                  >
                    {uiTranslations.addToCart[selectedLanguage]}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceListingPage;