import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Search, User, Hotel, Plane, Pill } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { FaSpa, FaUtensils } from 'react-icons/fa';
import { TbPhysotherapist } from 'react-icons/tb';
import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from '@/config/config';
import WishlistButton, { ServiceType } from './WishlistButton';

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospitalId: number;
  hospitalName: string;
  city: string;
  state: string;
  country: string;
  status: string | null;
}

interface LabTest {
  id: number;
  testTitle: string;
  testDepartment: string;
  testDescription: string;
  testPrice: number;
  testImage?: string;
  status?: string;
  diagnosticsId: number;
  diagnosticsName: string;
  diagnosticsAddress: string;
  diagnosticsRating: string;
  city: string;
  state: string;
  country: string;
}

interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage?: string;
  hospitallocationId: number;
  hospitallocationName: string;
  city: string;
  state: string;
  country: string;
  status?: string;
}

interface ServiceItem {
  id?: number;
  status?: string | null;
  name?: string;
  department?: string;
  description?: string;
  profilepic?: string;
  testTitle?: string;
  testDepartment?: string;
  testDescription?: string;
  testImage?: string;
  testPrice?: number;
  diagnosticsId?: number;
  diagnosticsName?: string;
  diagnosticsAddress?: string;
  diagnosticsRating?: string;
  diognosticsId?: number;
  diognosticsName?: string;
  diognosticsDescription?: string;
  diognosticsImage?: string;
  diognosticsrating?: string;
  diognosticsaddress?: string;
  hospitalId?: number;
  hospitalName?: string;
  hospitalDescription?: string;
  hospitalImage?: string;
  hospitallocationId?: number;
  hospitallocationName?: string;
  serviceName?: string;
  serviceDescription?: string;
  serviceImage?: string;
  spaCenterId?: number;
  spaName?: string;
  spaDescription?: string;
  spaImage?: string;
  rating?: string;
  physioId?: number;
  physioName?: string;
  physioDescription?: string;
  physioImage?: string;
  hotelId?: number;
  hotelName?: string;
  hotelDescription?: string;
  hotelImage?: string;
  hotelDetails?: string;
  travelId?: number;
  travelName?: string;
  travelDescription?: string;
  travelImage?: string;
  travelDetails?: string;
  translatorID?: number;
  translatorName?: string;
  translatorDescription?: string;
  translatorImage?: string;
  translatorLanguages?: string;
  translatorRating?: string;
  chefID?: number;
  chefName?: string;
  chefDescription?: string;
  chefImage?: string;
  styles?: string;
  experience?: string;
  pharmacyId?: number;
  pharmacyName?: string;
  pharmacyDescription?: string;
  pharmacyImage?: string;
  pharmacyDetails?: string;
  price?: number | string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
  locationId?: number;
}

interface PharmacyCategory {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage?: string;
  status?: string;
}

const serviceRoutes: Record<string, string> = {
  'Find a Doctor': '/doctors',
  'Book a Test': '/tests',
  'Spa': '/ServiceListingPage',
  'Physiotherapy': '/ServiceListingPage',
  'Locate Hospital': '/HospitalList',
  'Hotel & GuestHouse Booking': '/hotels/list',
  'Travel Booking': '/travel/list',
  'Translators': '/translatorList',
  'Chefs': '/chef-list',
  'Pharmacy': '/medicinecatalog',
};

const apiEndpoints: Record<string, string> = {
  'Find a Doctor': API_ENDPOINTS.DOCTORS,
  'Book a Test': `${BASE_URL}/api/labtests/all`,
  'Spa': `${BASE_URL}/spaCenter/all`,
  'Physiotherapy': `${BASE_URL}/physio/getall/pysios`,
  'Locate Hospital': API_ENDPOINTS.HOSPITALS,
  'Hotel & GuestHouse Booking': API_ENDPOINTS.HOTELS,
  'Travel Booking': API_ENDPOINTS.TRAVEL,
  'Translators': API_ENDPOINTS.TRANSLATORS,
  'Chefs': API_ENDPOINTS.CHEFS,
  'Pharmacy': API_ENDPOINTS.PHARMACY,
  'pharmacyCategories': API_ENDPOINTS.PHARMACY_CATEGORIES,
};

const AppointmentSection = () => {
  const [doctorSearch, setDoctorSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState<
    Record<string, (ServiceItem)[]>
  >({
    'Find a Doctor': [],
    'Book a Test': [],
    'Spa': [],
    'Physiotherapy': [],
    'Locate Hospital': [],
    'Hotel & GuestHouse Booking': [],
    'Travel Booking': [],
    'Translators': [],
    'Chefs': [],
    'Pharmacy': [],
  });
  const [filteredData, setFilteredData] = useState<ServiceItem[]>([]);
  const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [cities, setCities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const navigate = useNavigate();

  // Filter data based on search and location
  useEffect(() => {
    if (!selectedService || !serviceData[selectedService]) {
      setFilteredData([]);
      return;
    }

    let filtered = [...serviceData[selectedService]];

    // Apply search filter
    if (doctorSearch.trim()) {
      const searchTerm = doctorSearch.toLowerCase();
      filtered = filtered.filter((item) => {
        const searchFields = [
          item.name,
          item.chefName,
          item.testTitle,
          item.diognosticsName,
          item.serviceName,
          item.physioName,
          item.hospitalName,
          item.hotelName,
          item.travelName,
          item.translatorName,
          item.pharmacyName,
          item.department,
          item.testDepartment,
          item.description,
          item.chefDescription,
          item.testDescription,
          item.diognosticsDescription,
          item.serviceDescription,
          item.physioDescription,
          item.hospitalDescription,
          item.hotelDescription,
          item.travelDescription,
          item.translatorDescription,
          item.pharmacyDescription,
        ].filter(Boolean);

        return searchFields.some(field => 
          field?.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Apply location filters
    if (selectedCity) {
      filtered = filtered.filter(item => item.city === selectedCity);
    }
    if (selectedState) {
      filtered = filtered.filter(item => item.state === selectedState);
    }
    if (selectedCountry) {
      filtered = filtered.filter(item => item.country === selectedCountry);
    }
    // Apply text-based location filter
    if (location.trim()) {
      const locationTerm = location.toLowerCase();
      filtered = filtered.filter((item) => {
        const locationFields = [
          item.city,
          item.state,
          item.country,
          item.address,
          item.diognosticsaddress,
          item.hospitallocationName,
        ].filter(Boolean);

        return locationFields.some(field => 
          field?.toLowerCase().includes(locationTerm)
        );
      });
    }

    setFilteredData(filtered);
  }, [selectedService, serviceData, doctorSearch, location, selectedCity, selectedState, selectedCountry]);

  useEffect(() => {
    if (!selectedService) return;

    const debounceFetch = setTimeout(() => {
      const fetchServiceData = async () => {
        console.log('Fetching data for:', selectedService);
        setLoading((prev) => ({ ...prev, [selectedService]: true }));
        setError((prev) => ({ ...prev, [selectedService]: '' }));

        try {
          if (selectedService === 'Pharmacy') {
            const [pharmaciesRes, categoriesRes] = await Promise.all([
              axios.get(apiEndpoints['Pharmacy']).then((res) => {
                console.log('Pharmacy API Response:', res.data);
                return res.data;
              }).catch((err) => {
                console.error('Pharmacy API Error:', err);
                return [];
              }),
              axios.get(apiEndpoints['pharmacyCategories']).then((res) => {
                console.log('Pharmacy Categories API Response:', res.data);
                return res.data;
              }).catch((err) => {
                console.error('Pharmacy Categories API Error:', err);
                return [];
              }),
            ]);
            const activePharmacies = filterActive(pharmaciesRes);
            setServiceData((prev) => ({
              ...prev,
              Pharmacy: activePharmacies,
            }));
            setPharmacyCategories(filterActive(categoriesRes as PharmacyCategory[]));
            extractUniqueLocations(activePharmacies);
          } else {
            const serviceTypeMap: Record<string, string> = {
              'Find a Doctor': 'Doctor',
              'Book a Test': 'LabTest',
              'Spa': 'SpaService',
              'Physiotherapy': 'Physio',
              'Locate Hospital': 'Hospital',
              'Hotel & GuestHouse Booking': 'Hotel',
              'Travel Booking': 'Travel',
              'Translators': 'Translator',
              'Chefs': 'Chef',
            };

            const type = serviceTypeMap[selectedService];
            let res: ServiceItem[] = [];

            switch (type) {
              case 'Doctor':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Doctor API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Doctor API Error:', err);
                  return [];
                });
                break;
              case 'LabTest':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('LabTest API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('LabTest API Error:', err);
                  return [];
                });
                break;
              case 'SpaService':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('SpaService API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('SpaService API Error:', err);
                  return [];
                });
                break;
              case 'Physio':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Physio API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Physio API Error:', err);
                  return [];
                });
                break;
              case 'Hospital':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Hospital API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Hospital API Error:', err);
                  return [];
                });
                break;
              case 'Hotel':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Hotel API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Hotel API Error:', err);
                  return [];
                });
                break;
              case 'Travel':
                res = await axios.get(apiEndpoints['Travel Booking']).then((res) => {
                  console.log('Travel API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Travel API Error:', err);
                  return [];
                });
                break;
              case 'Translator':
                res = await axios.get(apiEndpoints[selectedService]).then((res) => {
                  console.log('Translator API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Translator API Error:', err);
                  return [];
                });
                break;
              case 'Chef':
                res = await axios.get(apiEndpoints['Chefs']).then((res) => {
                  console.log('Chef API Response:', res.data);
                  return res.data;
                }).catch((err) => {
                  console.error('Chef API Error:', err);
                  return [];
                });
                break;
              default:
                res = [];
            }

            const activeData = filterActive(res);
            console.log('Filtered Data:', activeData);
            setServiceData((prev) => ({
              ...prev,
              [selectedService]: activeData,
            }));
            extractUniqueLocations(activeData);
          }
        } catch (err) {
          console.error('Fetch error:', err);
          setError((prev) => ({
            ...prev,
            [selectedService]: `Failed to fetch ${selectedService} data. Please check your network or try again later.`,
          }));
        } finally {
          setLoading((prev) => ({ ...prev, [selectedService]: false }));
        }
      };

      fetchServiceData();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [selectedService]);

  const filterActive = <T extends { status?: string | null }>(items: T[]): T[] => {
    console.log('Before Filtering:', items);
    const filtered = items.filter(
      (item) =>
        item.status === undefined ||
        !item.status ||
        item.status.trim().toUpperCase() === 'NULL' ||
        (typeof item.status === 'string' && 
          ['ACTIVE', 'active', '1'].includes(item.status.trim().toUpperCase()))
    );
    console.log('After Filtering:', filtered);
    return filtered;
  };

  const handleServiceClick = (service: string) => {
    if (service === 'Pharmacy') {
      navigate(serviceRoutes['Pharmacy']);
    } else {
      // Clear all filters when changing service
      if (selectedService !== service) {
        setDoctorSearch('');
        setLocation('');
        setSelectedCity('');
        setSelectedState('');
        setSelectedCountry('');
      }
      setSelectedService(selectedService === service ? null : service);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/PharmacyCategoryPage/list?category=${encodeURIComponent(categoryName)}`);
  };

  const getDetailRoute = (item: ServiceItem): string => {
    console.log('Generating Detail Route for:', item);
    if ('id' in item && 'department' in item) return `/hospitaldoctors/${item.id}`;
    if ('testTitle' in item) return `/tests/${item.id}`;
    if ('diagnosticsId' in item) return `/diagnostics/${item.diagnosticsId}`;
    if ('diognosticsName' in item) return `/diagnostics/${item.diognosticsId}`;
    if ('serviceName' in item) return `/ServiceListingPage/spa/${item.spaCenterId}`;
    if ('spaName' in item) return `/ServiceListingPage/spa/${item.spaCenterId || item.id}`;
    if ('physioName' in item) return `/ServiceListingPage/physio/${item.physioId}`;
    if ('hospitalName' in item) return `/OurHospitals/${item.hospitalId}`;
    if ('hotelName' in item) return `/hotels/${item.hotelId}`;
    if ('travelName' in item) return `/travel/${item.travelId}`;
    if ('translatorName' in item) return `/translatorAndChefList/translators/${item.translatorID}`;
    if ('chefName' in item) return `/booking/chef/${item.chefID}`;
    if ('pharmacyName' in item) return `/PharmacyCategoryPage/${item.pharmacyId}`;
    return '#';
  };

  const getBookingRoute = (item: ServiceItem): string => {
    console.log('Generating Booking Route for:', item);
    if ('id' in item && 'department' in item) return `/booking/doctor/${item.id}`;
    if ('testTitle' in item) return `/booking/test/${item.id}`;
    if ('diagnosticsId' in item) return `/booking/diagnostics/${item.diagnosticsId}`;
    if ('diognosticsName' in item) return `/booking/diagnostics/${item.diognosticsId}`;
    if ('serviceName' in item) return `/booking/spa/${item.spaCenterId}`;
    if ('spaName' in item) return `/booking/spa/${item.spaCenterId || item.id}`;
    if ('physioName' in item) return `/booking/physio/${item.physioId}`;
    if ('hospitalName' in item) return `/booking/hospital/${item.hospitalId}`;
    if ('hotelName' in item) return `/booking/hotel/${item.hotelId}`;
    if ('travelName' in item) return `/booking/travel/${item.travelId}`;
    if ('translatorName' in item) return `/booking/translator/${item.translatorID}`;
    if ('chefName' in item) return `/booking/chef/${item.chefID}`;
    if ('pharmacyName' in item) return `/booking/pharmacy/${item.pharmacyId}`;
    return '#';
  };

  const renderItemFields = (item: ServiceItem) => {
    console.log('Rendering Item:', item);
    const defaultFields = {
      name: 'Unknown',
      details: 'No details available',
      description: 'No description available',
      image: 'https://placehold.co/300x200?text=No+Image',
    };

    if ('name' in item && 'department' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.name,
        details: `${item.department}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.description,
        image: item.profilepic || defaultFields.image,
      };
    }
    if ('testTitle' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.testTitle,
        details: `${item.testDepartment || 'General'}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.testDescription,
        image: item.testImage || defaultFields.image,
      };
    }
    if ('diognosticsName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.diognosticsName,
        details: locationStr || item.diognosticsaddress || 'No address provided',
        description: item.diognosticsDescription || 'No description available',
        image: item.diognosticsImage || defaultFields.image,
      };
    }
    if ('serviceName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.serviceName,
        details: `${item.rating ? `Rating: ${item.rating}` : 'No rating available'}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.serviceDescription || 'No description provided',
        image: item.serviceImage || defaultFields.image,
      };
    }
    if ('spaName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.spaName,
        details: `${item.rating ? `Rating: ${item.rating}` : 'No rating available'}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.spaDescription || 'No description provided',
        image: item.spaImage || defaultFields.image,
      };
    }
    if ('physioName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.physioName,
        details: `${locationStr || item.address || 'No address provided'}${item.rating ? ` | Rating: ${item.rating}` : ''}`,
        description: item.physioDescription || 'No description provided',
        image: item.physioImage || defaultFields.image,
      };
    }
    if ('hospitalName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.hospitalName,
        details: locationStr || item.hospitallocationName || '',
        description: item.hospitalDescription,
        image: item.hospitalImage || defaultFields.image,
      };
    }
    if ('hotelName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.hotelName,
        details: `${item.hotelDetails || ''}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.hotelDescription,
        image: item.hotelImage || defaultFields.image,
      };
    }
    if ('travelName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.travelName,
        details: `${item.travelDetails || ''}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.travelDescription,
        image: item.travelImage || defaultFields.image,
      };
    }
    if ('translatorName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.translatorName,
        details: `${item.translatorLanguages || 'Languages not specified'}${item.translatorRating ? ` | Rating: ${item.translatorRating}` : ''}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.translatorDescription,
        image: item.translatorImage || defaultFields.image,
      };
    }
    if ('chefName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.chefName,
        details: `${item.styles || 'Various styles'} | ${item.experience || 'Experience not specified'}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.chefDescription,
        image: item.chefImage || defaultFields.image,
      };
    }
    if ('pharmacyName' in item) {
      const locationStr = [item.city, item.state, item.country].filter(Boolean).join(', ');
      return {
        name: item.pharmacyName,
        details: `${item.pharmacyDetails || ''}${locationStr ? ` | ${locationStr}` : ''}`,
        description: item.pharmacyDescription,
        image: item.pharmacyImage || defaultFields.image,
      };
    }
    return defaultFields;
  };

  const getServiceType = (item: ServiceItem): ServiceType => {
    if ('chefName' in item) return 'chef';
    if ('testTitle' in item) return 'labtest';
    if ('diognosticsName' in item) return 'labtest';
    if ('name' in item && 'department' in item) return 'doctor';
    if ('serviceName' in item || 'spaName' in item || 'spaCenterId' in item) return 'spa';
    if ('translatorName' in item) return 'translator';
    if ('physioName' in item) return 'physio';
    if ('hospitalName' in item) return 'hospital';
    if ('hotelName' in item) return 'hotel';
    if ('travelName' in item) return 'travel';
    if ('pharmacyName' in item) return 'pharmacy';
    throw new Error("Unknown service type");
  };

  const getServicePrice = (item: ServiceItem): number => {
    if ('price' in item && typeof item.price === 'number') return item.price;
    if ('price' in item && typeof item.price === 'string') return parseFloat(item.price) || 0;
    return 0;
  };

  const getSearchPlaceholder = () => {
    if (!selectedService) return "Search for services...";
    switch (selectedService) {
      case 'Find a Doctor': return "Search for doctors, specialties...";
      case 'Book a Test': return "Search for lab tests, departments...";
      case 'Spa': return "Search for spa services...";
      case 'Physiotherapy': return "Search for physiotherapy services...";
      case 'Locate Hospital': return "Search for hospitals...";
      case 'Hotel & GuestHouse Booking': return "Search for hotels, guest houses...";
      case 'Travel Booking': return "Search for travel services...";
      case 'Translators': return "Search for translators, languages...";
      case 'Chefs': return "Search for chefs, cuisines...";
      case 'Pharmacy': return "Search for medicines, pharmacies...";
      default: return "Search for services...";
    }
  };

  const getLocationPlaceholder = () => {
    return "Search by city, state, country...";
  };

  // Helper function to get unique location values
  const extractUniqueLocations = (data: ServiceItem[]) => {
    const uniqueCities = new Set<string>();
    const uniqueStates = new Set<string>();
    const uniqueCountries = new Set<string>();

    data.forEach(item => {
      if (item.city) uniqueCities.add(item.city);
      if (item.state) uniqueStates.add(item.state);
      if (item.country) uniqueCountries.add(item.country);
    });

    setCities(Array.from(uniqueCities).sort());
    setStates(Array.from(uniqueStates).sort());
    setCountries(Array.from(uniqueCountries).sort());
  };

  useEffect(() => {
    if (selectedService && serviceData[selectedService]) {
      extractUniqueLocations(serviceData[selectedService]);
    }
  }, [selectedService, serviceData]);

  return (
  <section className="relative py-12 px-6 flex justify-center items-center bg-gradient-to-br from-white/40 to-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <img
                  src="/maditailr/doc1.png"
                  alt="Doctor giving thumbs up"
                  className="w-full h-auto rounded-lg shadow-sm object-cover"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                  Schedule Your Appointment Online
                </h2>
                <p className="text-center md:text-left text-sm text-gray-500 mb-6">
                  Time: {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={getSearchPlaceholder()}
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      aria-label="Search for services"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={getLocationPlaceholder()}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      aria-label="Search by location"
                    />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    {selectedService 
                      ? `Showing results for ${selectedService.toLowerCase()}`
                      : "Select a service below to get started"
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
  {Object.keys(serviceRoutes).map((service) => (
    <button
      key={service}
      onClick={() => handleServiceClick(service)}
      className={`relative border border-gray-200 rounded-2xl bg-white/80 shadow-md p-4 backdrop-blur-md transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:bg-white/60 focus:ring-2 focus:ring-blue-200 ${
        selectedService === service
          ? 'border-blue-400 bg-blue-50 backdrop-blur-lg shadow-lg'
          : ''
      }`}
      aria-label={`Select ${service}`}
      style={{ WebkitBackdropFilter: 'blur(4px)' }} // Glassmorphism
    >
      {/* Subtle animated ring on selection */}
      {selectedService === service && (
        <span className="absolute inset-0 rounded-2xl ring-2 ring-blue-200 animate-pulse pointer-events-none"></span>
      )}

      <div className="flex flex-col items-center">
        <div className="mb-3 p-3 bg-gray-100 rounded-full shadow-md transition-transform duration-200 group-hover:scale-110">
          {/* ICONS (retain the current color!) */}
          {service === 'Find a Doctor' && <User style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Book a Test' && <Calendar style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Spa' && <FaSpa style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Physiotherapy' && <TbPhysotherapist style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Locate Hospital' && <MapPin style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Hotel & GuestHouse Booking' && <Hotel style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Travel Booking' && <Plane style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Translators' && <PaperAirplaneIcon style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Chefs' && <FaUtensils style={{ color: '#499E14' }} className="h-6 w-6" />}
          {service === 'Pharmacy' && <Pill style={{ color: '#499E14' }} className="h-6 w-6" />}
        </div>
        <p className="text-sm font-semibold text-gray-800 tracking-wide text-center">
          {service}
        </p>
      </div>
    </button>
  ))}
</div>


                {selectedService && (
                  <div className="mt-10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{selectedService}</h3>
                      {!loading[selectedService] && !error[selectedService] && (
                        <span className="text-sm text-gray-500">
                          {selectedService === 'Pharmacy' 
                            ? `${pharmacyCategories.length} categories found`
                            : `${filteredData.length} result${filteredData.length !== 1 ? 's' : ''} found`
                          }
                        </span>
                      )}
                    </div>
                    {loading[selectedService] && (
                      <div className="flex justify-center py-4">
                        <svg
                          className="h-6 w-6 text-blue-500 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </div>
                    )}
                    {error[selectedService] && !loading[selectedService] && (
                      <div className="text-center py-4">
                        <p className="text-md text-red-500">{error[selectedService]}</p>
                      </div>
                    )}
                    {!loading[selectedService] && !error[selectedService] && (
                      <>
                        {(selectedService === 'Pharmacy' ? pharmacyCategories : filteredData).length === 0 ? (
                          <div className="text-center py-4">
                            <p className="text-md text-gray-500">
                              No {selectedService} found{(doctorSearch || location) ? ' matching your search criteria' : ''}.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {selectedService === 'Pharmacy'
                                ? pharmacyCategories.slice(0, 3).map((category) => (
                                    <div
                                      key={category.categoryId}
                                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 overflow-hidden"
                                    >
                                      <img
                                        src={category.categoryImage || 'https://placehold.co/300x200?text=No+Image'}
                                        alt={category.categoryName}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                        loading="lazy"
                                      />
                                      <h4 className="text-md font-semibold text-gray-800 mb-2 truncate">{category.categoryName}</h4>
                                      <p className="text-gray-500 text-xs line-clamp-3">{category.categoryDescription}</p>
                                      <button
                                        onClick={() => handleCategoryClick(category.categoryName)}
                                        style={{ backgroundColor: '#499E14' }}
                                        className="mt-2 w-full text-white font-medium py-1.5 px-3 rounded-lg shadow-sm hover:bg-[#3A7C10] transition"
                                        aria-label={`View ${category.categoryName}`}
                                      >
                                        Book now
                                      </button>
                                    </div>
                                  ))
                                : filteredData.slice(0, 3).map((item, index) => {
                                    const { name, details, description, image } = renderItemFields(item);
                                    const serviceId =
                                      'id' in item
                                        ? item.id
                                        : 'physioId' in item
                                        ? item.physioId
                                        : 'spaCenterId' in item
                                        ? item.spaCenterId
                                        : 'hospitalId' in item
                                        ? item.hospitalId
                                        : 'hotelId' in item
                                        ? item.hotelId
                                        : 'travelId' in item
                                        ? item.travelId
                                        : 'translatorID' in item
                                        ? item.translatorID
                                        : 'chefID' in item
                                        ? item.chefID
                                        : 'pharmacyId' in item
                                        ? item.pharmacyId
                                        : 0;

                                    return (
                                      <div
  key={index}
  className="relative group bg-gradient-to-br from-white via-slate-50 to-slate-200 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col"
>
  {/* Wishlist floating button */}
  <div className="absolute top-4 right-4 z-10">
   
      <WishlistButton
                                            serviceId={serviceId}
                                            serviceType={getServiceType(item)}
                                            serviceName={name}
                                            price={getServicePrice(item)}
                                            description={description}
                                            serviceImageUrl={image}
                                          />
    /
  </div>

  <Link to={getDetailRoute(item)} className="block group">
    {/* Image with fallback bg, aspect ratio */}
    <div className="w-full aspect-[4/3] bg-slate-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center border-2 border-slate-200 group-hover:border-indigo-400 transition-colors duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>

    {/* Title + Promotion Badge */}
    <div className="flex items-center justify-between mb-1">
      <h4 className="text-xl font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors duration-150">
        {name}
      </h4>
      {/* Add badges or price here if needed */}
    </div>
    <p className="text-slate-500 text-sm mb-1 font-medium truncate">{details}</p>
    <p className="text-slate-600 text-[15px] mb-2 line-clamp-2 min-h-[40px]">{description}</p>
  </Link>

  {/* CTA Action Button */}
  <Link
    to={getBookingRoute(item)}
    className="mt-auto block w-full bg-[#499E14] hover:bg-[#3A7C10] text-white font-semibold py-2 px-4 rounded-xl shadow-md text-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    aria-label={`Book ${name}`}
  >
    Book now
  </Link>
</div>

                                    );
                                  })}
                            </div>
                            <div className="mt-6 text-center">
                              <Link
                                to={serviceRoutes[selectedService]}
                                style={{ backgroundColor: '#499E14' }}
                                className="inline-block text-white font-medium py-2.5 px-4 rounded-lg shadow-md text-center hover:bg-[#3A7C10] transition"
                                aria-label="Explore More"
                              >
                                {filteredData.length > 3 || (doctorSearch || location) 
                                  ? `View all ${selectedService}` 
                                  : 'Explore more'
                                }
                              </Link>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;