import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Search, User, Phone, Hotel, Plane, Clock, Pill } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { FaSpa } from 'react-icons/fa';
import { TbPhysotherapist } from 'react-icons/tb';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  email: string;
  rating: number;
  description: string;
  department: string;
  profilepic: string;
  hospital: {
    hospitalId: number;
    hositalName: string;
    hospitalDescription: string;
    hospitalImage: string;
    rating: string;
    address: string;
    status: string;
  };
  status: string | null;
}


interface LabTest {
  id: number;
  testTitle: string;
  testDescription: string;
  testImage: string;
  testDepartment: string;
  status: string | null;
}
interface Physio {
  physioId: number;
  physioName: string;
  physioDescription: string;
  physioImage: string;
  rating: string;
  address: string;
  price: string;
  location: any;
}

interface Spa {
  spaId: number;
  spaName: string;
  spaDescription: string | null;
  spaImage: string | null;
  rating: string | null;
  address: string | null;
  locationId: number | null;
}


interface Hospital {
  hospitalId: number;
  hositalName: string; // same typo from API, keep as is
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  doctors: Doctor[];
  status: string | null;
}
interface Hotel {
  hotelId: number;
  hotelName: string;
  hotelDescription: string;
  hotelImage: string;
  hotelDetails: string;
  status: string | null;
}

interface Travel {
  travelId: number;
  travelName: string;
  travelDescription: string;
  travelImage: string;
  travelDetails: string;
  status: string | null;
}

interface Translator {
  translatorID: number;
  translatorName: string;
  translatorDescription: string;
  translatorImage: string;
  translatorLanguages: string;
  status: string | null;
}

interface Pharmacy {
  pharmacyId: number;
  pharmacyName: string;
  pharmacyDescription: string;
  pharmacyImage: string;
  pharmacyDetails: string;
  status: string | null;
}

interface PharmacyCategory {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  route: string;
  status: string | null;
}

const AppointmentSection = () => {
  const [doctorSearch, setDoctorSearch] = useState('');
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState<
    Record<string, (Doctor | LabTest | Spa | Hospital | Hotel | Travel | Translator | Pharmacy)[]>
  >({
    'Find a Doctor': [],
    'Book a Test': [],
    'Spa & Physiotherapy': [],
    'Locate Hospital': [],
    'Hotel Booking': [],
    'Travel Booking': [],
    Translators: [],
    Pharmacy: [],
  });
  const [pharmacyCategories, setPharmacyCategories] = useState<PharmacyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const serviceRoutes: Record<string, string> = {
    'Find a Doctor': '/doctors',
    'Book a Test': '/tests',
    'Spa & Physiotherapy': '/ServiceListingPage',
    'Locate Hospital': '/OurHospitals',
    'Hotel Booking': '/hotels',
    'Travel Booking': '/travel',
    Translators: '/translatorList',
    Pharmacy: '/PharmacyCategoryPage',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          doctorsRes,
          testsRes,
          spasRes,
          physiosRes,
          hospitalsRes,
          hotelsRes,
          travelRes,
          translatorsRes,
          pharmaciesRes,
          categoriesRes,
        ] = await Promise.all([
          axios.get('http://localhost:8080/api/doctors').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/labtests').catch(() => ({ data: [] })),
                    axios.get('http://localhost:8080/physio').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/spaCenter/all').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/hospitals').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/hotels').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/travel').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/translators').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/pharmacies').catch(() => ({ data: [] })),
          axios.get('http://localhost:8080/api/pharmacy-categories').catch(() => ({ data: [] })),
        ]);

        const filterActive = (items: any[]) =>
          items.filter(
            (item) =>
              item.status &&
              typeof item.status === 'string' &&
              item.status.trim().toUpperCase() === 'ACTIVE'
          );
           const activePhysios = filterActive(physiosRes.data);
        const activeSpas = filterActive(spasRes.data);

        setServiceData({
          'Find a Doctor': filterActive(doctorsRes.data),
          'Book a Test': filterActive(testsRes.data),
         'Spa & Physiotherapy': [...activeSpas, ...activePhysios],
          'Locate Hospital': filterActive(hospitalsRes.data),
          'Hotel Booking': filterActive(hotelsRes.data),
          'Travel Booking': filterActive(travelRes.data),
          Translators: filterActive(translatorsRes.data),
          Pharmacy: filterActive(pharmaciesRes.data),
        });

        setPharmacyCategories(filterActive(categoriesRes.data));
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('API fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookAppointment = () => {
    console.log('Booking appointment:', { doctorSearch, location });
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(selectedService === service ? null : service);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/PharmacyCategoryPage?category=${encodeURIComponent(categoryName)}`);
  };

  const renderItemFields = (
    item: Doctor | LabTest | Spa | Physio | Hospital | Hotel | Travel | Translator | Pharmacy
  ) => {
   if ('name' in item && 'department' in item) {
  return {
    name: item.name,
    details: item.department,
    description: item.description,
    image: item.profilepic || 'https://via.placeholder.com/300x200?text=No+Image',
  };


    } else if ('testTitle' in item) {
      return {
        name: item.testTitle,
        details: item.testDepartment,
        description: item.testDescription,
        image: item.testImage || 'https://via.placeholder.com/300x200?text=No+Image',
      };
    }else if ('spaName' in item) {
    // Spa
    return {
      name: item.spaName,
      details: item.address || 'No address provided',
      description: item.spaDescription || 'No description provided',
      image: item.spaImage || 'https://via.placeholder.com/300x200?text=No+Image',
    };
  } else if ('physioName' in item) {
    // Physio
    return {
      name: item.physioName,
      details: item.address || 'No address provided',
      description: item.physioDescription || 'No description provided',
      image: item.physioImage || 'https://via.placeholder.com/300x200?text=No+Image',
    };
    } else if ('hositalName' in item && 'hospitalDescription' in item) {
  return {
    name: item.hositalName,
    details: item.address || '',
    description: item.hospitalDescription,
    image: item.hospitalImage || 'https://via.placeholder.com/300x200?text=No+Image',
  };
    } else if ('hotelName' in item) {
      return {
        name: item.hotelName,
        details: item.hotelDetails,
        description: item.hotelDescription,
        image: item.hotelImage || 'https://via.placeholder.com/300x200?text=No+Image',
      };
    } else if ('travelName' in item) {
      return {
        name: item.travelName,
        details: item.travelDetails,
        description: item.travelDescription,
        image: item.travelImage || 'https://via.placeholder.com/300x200?text=No+Image',
      };
    } else if ('translatorName' in item) {
      return {
        name: item.translatorName,
        details: item.translatorLanguages,
        description: item.translatorDescription,
        image: item.translatorImage || 'https://via.placeholder.com/300x200?text=No+Image',
      };
    } else if ('pharmacyName' in item) {
      return {
        name: item.pharmacyName,
        details: item.pharmacyDetails,
        description: item.pharmacyDescription,
        image: item.pharmacyImage || 'https://via.placeholder.com/300x200?text=No+Image',
      };
    }
    return {
      name: 'Unknown',
      details: 'No details available',
      description: 'No description available',
      image: 'https://via.placeholder.com/300x200?text=No+Image',
    };
  };

  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Schedule Your Appointment Online
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            {loading && (
              <div className="text-center py-4">
                <p className="text-lg text-gray-500">Loading services...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-4">
                <p className="text-lg text-red-500">{error}</p>
              </div>
            )}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search for Doctor"
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
                      aria-label="Search for a doctor"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#499E14] focus:border-[#499E14] transition-all duration-300"
                      aria-label="Choose a location"
                    >
                      <option value="">Choose Location</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                      <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                      <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                      <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                      <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleBookAppointment}
                      className="bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md transition-all duration-300"
                      aria-label="Book an appointment"
                    >
                      Book an Appointment
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
                  {Object.keys(serviceRoutes).map((service) => (
                    <div
                      key={service}
                      onClick={() => handleServiceClick(service)}
                      className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-[#499E14] transition-all duration-300 cursor-pointer ${
                        selectedService === service ? 'border-[#499E14] bg-[#f0f8e8]' : ''
                      }`}
                    >
                      <div className="p-4 flex flex-col items-center justify-center">
                        <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                          {service === 'Find a Doctor' && <User className="h-6 w-6 text-[#499E14]" />}
                          {service === 'Book a Test' && <Calendar className="h-6 w-6 text-[#499E14]" />}
                          {service === 'Spa & Physiotherapy' && (
                            <div className="flex gap-1">
                              <FaSpa className="h-6 w-6 text-[#499E14]" />
                              <TbPhysotherapist className="h-6 w-6 text-[#499E14]" />
                            </div>
                          )}
                          {service === 'Locate Hospital' && <MapPin className="h-6 w-6 text-[#499E14]" />}
                          {service === 'Hotel Booking' && <Hotel className="h-6 w-6 text-[#499E14]" />}
                          {service === 'Travel Booking' && <Plane className="h-6 w-6 text-[#499E14]" />}
                          {service === 'Translators' && (
                            <PaperAirplaneIcon className="h-6 w-6 text-[#499E14]" />
                          )}
                          {service === 'Pharmacy' && <Pill className="h-6 w-6 text-[#499E14]" />}
                        </div>
                        <p className="text-sm font-medium text-gray-800">{service}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedService && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedService}</h3>
                    {serviceData[selectedService].length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-lg text-gray-500">No active {selectedService} found.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedService === 'Pharmacy'
                          ? pharmacyCategories.slice(0, 6).map((category) => (
                              <div
                                key={category.categoryId}
                                onClick={() => handleCategoryClick(category.categoryName)}
                                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                              >
                                <img
                                  src={
                                    category.categoryImage ||
                                    'https://via.placeholder.com/300x200?text=No+Image'
                                  }
                                  alt={category.categoryName}
                                  className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                  {category.categoryName}
                                </h4>
                                <p className="text-gray-500 text-sm">{category.categoryDescription}</p>
                              </div>
                            ))
                          : serviceData[selectedService].slice(0, 6).map((item, index) => {
                              const { name, details, description, image } = renderItemFields(item);
                              return (
                                <div
                                  key={index}
                                  className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                  <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                  />
                                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{name}</h4>
                                  <p className="text-gray-600 text-sm mb-2">{details}</p>
                                  <p className="text-gray-500 text-sm italic">{description}</p>
                                </div>
                              );
                            })}
                      </div>
                    )}
                    <div className="mt-8 text-center">
                      <Link
                        to={serviceRoutes[selectedService]}
                        className="inline-block bg-[#499E14] hover:bg-[#3a7e10] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                      >
                        Explore More
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;