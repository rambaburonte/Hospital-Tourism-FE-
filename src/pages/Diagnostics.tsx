// import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Search, SortAsc, SortDesc, Star, MapPin, Home, TestTube, LayoutDashboard } from 'lucide-react';
// import { BASE_URL } from '@/config/config';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Location {
//   id: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface LocationFilters {
//   city: string;
//   state: string;
//   country: string;
// }

// interface Diagnostic {
//   diognosticsId: number;
//   diognosticsName: string;
//   diognosticsDescription: string;
//   diognosticsImage: string;
//   diognosticsrating: string;
//   diognosticsaddress: string;
//   city: string;
//   state: string;
//   country: string;
// }

// const DiagnosticsList: React.FC = () => {
//   const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOption, setSortOption] = useState<'name' | 'rating'>('name');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [ratingFilter, setRatingFilter] = useState<number | null>(null);
//   const [addressFilter, setAddressFilter] = useState('');
//   const [locationFilters, setLocationFilters] = useState<LocationFilters>({
//     city: '',
//     state: '',
//     country: '',
//   });
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch diagnostics
//         const diagnosticsResponse = await axios.get<Diagnostic[]>(`${BASE_URL}/api/diagnostics`);
//         setDiagnostics(diagnosticsResponse.data);

//         // Fetch locations
//         const locationsResponse = await axios.get<Location[]>(`${BASE_URL}/api/locations/getall`);
//         setLocations(locationsResponse.data);
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   // Get unique locations from locations API
//   const uniqueLocations = useMemo(() => ({
//     cities: [...new Set(locations.map(l => l.city))].sort(),
//     states: [...new Set(locations.map(l => l.state))].sort(),
//     countries: [...new Set(locations.map(l => l.country))].sort(),
//   }), [locations]);

//   const handleLocationFilterChange = (field: keyof LocationFilters, value: string) => {
//     setLocationFilters(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const clearFilters = () => {
//     setLocationFilters({
//       city: '',
//       state: '',
//       country: ''
//     });
//     setSearchQuery('');
//     setRatingFilter(null);
//     setAddressFilter('');
//     setSortOption('name');
//     setSortOrder('asc');
//   };

//   const filteredDiagnostics = useMemo(() => {
//     return diagnostics
//       .filter((d) => {
//         const matchesSearch =
//           d.diognosticsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           d.diognosticsDescription.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesRating = ratingFilter
//           ? parseFloat(d.diognosticsrating || '0') >= ratingFilter
//           : true;
//         const matchesAddress = addressFilter
//           ? d.diognosticsaddress.toLowerCase().includes(addressFilter.toLowerCase())
//           : true;
//         const matchesLocation = 
//           (!locationFilters.city || d.city === locationFilters.city) &&
//           (!locationFilters.state || d.state === locationFilters.state) &&
//           (!locationFilters.country || d.country === locationFilters.country);

//         return matchesSearch && matchesRating && matchesAddress && matchesLocation;
//       })
//       .sort((a, b) => {
//         if (sortOption === 'name') {
//           const comparison = a.diognosticsName.localeCompare(b.diognosticsName);
//           return sortOrder === 'asc' ? comparison : -comparison;
//         } else {
//           const ratingA = parseFloat(a.diognosticsrating || '0');
//           const ratingB = parseFloat(b.diognosticsrating || '0');
//           return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
//         }
//       });
//   }, [diagnostics, searchQuery, sortOption, sortOrder, ratingFilter, addressFilter, locationFilters]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Diagnostic Centers</h1>
        
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {/* Search input */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search diagnostics..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>

//             {/* Location filters */}
//             <Select
//               value={locationFilters.city}
//               onValueChange={(value) => handleLocationFilterChange('city', value)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Filter by City" />
//               </SelectTrigger>
//               <SelectContent>
//                 {uniqueLocations.cities.map((city) => (
//                   <SelectItem key={city} value={city}>
//                     {city}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={locationFilters.state}
//               onValueChange={(value) => handleLocationFilterChange('state', value)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Filter by State" />
//               </SelectTrigger>
//               <SelectContent>
//                 {uniqueLocations.states.map((state) => (
//                   <SelectItem key={state} value={state}>
//                     {state}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={locationFilters.country}
//               onValueChange={(value) => handleLocationFilterChange('country', value)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Filter by Country" />
//               </SelectTrigger>
//               <SelectContent>
//                 {uniqueLocations.countries.map((country) => (
//                   <SelectItem key={country} value={country}>
//                     {country}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <div className="flex gap-4">
//               {/* Rating filter */}
//               <Select
//                 value={ratingFilter?.toString() || 'all'}
//                 onValueChange={(value) => setRatingFilter(value === 'all' ? null : Number(value))}
//               >
//                 <SelectTrigger className="w-[150px]">
//                   <SelectValue placeholder="Rating" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Ratings</SelectItem>
//                   {[4, 3, 2, 1].map((rating) => (
//                     <SelectItem key={rating} value={rating.toString()}>
//                       {rating}+ Stars
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {/* Sort options */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setSortOption('name')}
//                   className={`px-3 py-2 rounded ${
//                     sortOption === 'name' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
//                   }`}
//                 >
//                   Name
//                 </button>
//                 <button
//                   onClick={() => setSortOption('rating')}
//                   className={`px-3 py-2 rounded ${
//                     sortOption === 'rating' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
//                   }`}
//                 >
//                   Rating
//                 </button>
//                 <button
//                   onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                   className="p-2 rounded bg-gray-100"
//                 >
//                   {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Clear filters button */}
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
//               disabled={!searchQuery && !ratingFilter && !locationFilters.city && !locationFilters.state && !locationFilters.country}
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Results grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredDiagnostics.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-lg text-gray-500">
//                 No diagnostic centers found. Try adjusting your filters or search query.
//               </p>
//             </div>
//           ) : (
//             filteredDiagnostics.map((d) => (
//               <div
//                 key={d.diognosticsId}
//                 className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
//               >
//                 <img
//                   src={d.diognosticsImage || 'https://via.placeholder.com/400x250?text=No+Image'}
//                   alt={d.diognosticsName}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-5 flex flex-col flex-1">
//                   <h3 className="text-xl font-semibold text-gray-900">{d.diognosticsName}</h3>
//                   <p className="mt-2 text-sm text-gray-600 line-clamp-3">{d.diognosticsDescription}</p>
//                   <div className="mt-2 flex items-center">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="ml-1 text-sm text-gray-600">{d.diognosticsrating || 'Not rated'}</span>
//                   </div>
//                   <p className="mt-2 text-sm text-gray-600 flex items-center">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {d.diognosticsaddress || 'No address available'}
//                   </p>
//                   <button
//                     onClick={() => navigate(`/viewtests/${d.diognosticsId}`)}
//                     className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     View Tests
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiagnosticsList;

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/config";
import {
  Search,
  Star,
  MapPin,
} from "lucide-react";
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

interface Diagnostic {
  diognosticsId: number;
  diognosticsName: string;
  diognosticsDescription: string;
  diognosticsImage: string;
  diognosticsrating: string;
  diognosticsaddress: string;
  city: string;
  state: string;
  country: string;
  experience?: string;
  gender?: string;
}

const DiagnosticsList: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    city: "",
    state: "",
    country: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diagnosticsResponse = await axios.get<Diagnostic[]>(
          `${BASE_URL}/api/diagnostics`
        );
        setDiagnostics(diagnosticsResponse.data);

        const locationsResponse = await axios.get<Location[]>(
          `${BASE_URL}/api/locations/getall`
        );
        setLocations(locationsResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const uniqueLocations = useMemo(
    () => ({
      cities: [...new Set(locations.map((l) => l.city))].sort(),
      states: [...new Set(locations.map((l) => l.state))].sort(),
      countries: [...new Set(locations.map((l) => l.country))].sort(),
    }),
    [locations]
  );

  const handleLocationFilterChange = (
    field: keyof LocationFilters,
    value: string
  ) => {
    setLocationFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setLocationFilters({
      city: "",
      state: "",
      country: "",
    });
    setSearchQuery("");
  };

  const filteredDiagnostics = useMemo(() => {
    return diagnostics.filter((d) => {
      const matchesSearch =
        d.diognosticsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.diognosticsDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesLocation =
        (!locationFilters.city || d.city === locationFilters.city) &&
        (!locationFilters.state || d.state === locationFilters.state) &&
        (!locationFilters.country || d.country === locationFilters.country);

      return matchesSearch && matchesLocation;
    });
  }, [diagnostics, searchQuery, locationFilters]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Diagnostic Centers
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-wrap gap-4 items-center">
          {/* Search input */}
          <div className="relative flex-1 min-w-[220px] max-w-xs">
            <input
              type="text"
              placeholder="Search diagnostics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Location filters */}
          <Select
            value={locationFilters.city}
            onValueChange={(value) => handleLocationFilterChange("city", value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by City" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={locationFilters.state}
            onValueChange={(value) => handleLocationFilterChange("state", value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by State" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={locationFilters.country}
            onValueChange={(value) => handleLocationFilterChange("country", value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by Country" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={clearFilters}
            className="px-4 py-2 ml-auto text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            disabled={
              !searchQuery &&
              !locationFilters.city &&
              !locationFilters.state &&
              !locationFilters.country
            }
          >
            Clear Filters
          </button>
        </div>

        {/* Diagnostic Cards */}
        <div className="space-y-7">
          {filteredDiagnostics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No diagnostic centers found. Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            filteredDiagnostics.map((d) => (
              <div
                key={d.diognosticsId}
                className="bg-white rounded-xl shadow flex flex-col md:flex-row items-stretch p-5 gap-4 md:gap-7"
              >
                <img
                  src={d.diognosticsImage || "https://via.placeholder.com/120"}
                  alt={d.diognosticsName}
                  className="w-28 h-28 min-w-[112px] rounded-lg object-cover border border-gray-200 bg-gray-100"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-row flex-wrap gap-2 items-baseline">
                    <span className="text-blue-800 text-lg font-bold leading-tight">{d.diognosticsName}</span>
                  </div>
                  <div className="mt-1 text-gray-800 text-sm mb-1">
                    {/* Description */}
                    <div>{d.diognosticsDescription}</div>
                  </div>
                  <div className="border-t my-2"></div>
                  {/* Meta fields */}
                  <div className="mb-1 text-sm">
                    <span className="font-semibold">Address: </span>
                    <span>{d.diognosticsaddress}</span>
                  </div>
                  <div className="mb-1 text-sm">
                    <span className="font-semibold">Location: </span>
                    <span>
                      {d.city}, {d.state}, {d.country}
                    </span>
                  </div>
                  <div className="mb-1 text-sm flex gap-6 flex-wrap">
                    <span>
                      <span className="font-semibold">Experience: </span>
                      {/* Optional, adjust if you have in API */}
                      {d.experience ?? "N/A"}
                    </span>
                    <span>
                      <span className="font-semibold">Gender: </span>
                      {d.gender ?? "N/A"}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">Rating:</span>
                      <span className="ml-1">{d.diognosticsrating || "Not rated"}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/viewtests/${d.diognosticsId}`)}
                    className="mt-4 self-end px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-md font-semibold text-base transition shadow"
                  >
                    Book an Appointment
                  </button>
                  {/* <button
                    className="mt-2 text-blue-800 underline text-sm self-start"
                    onClick={() => navigate(`/diagnostics/${d.diognosticsId}`)}
                  >
                    View Profile
                  </button> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsList;
