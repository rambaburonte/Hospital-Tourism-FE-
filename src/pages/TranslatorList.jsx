// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Globe, Mail, Phone, Briefcase, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from '@/config/config';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import axios from "axios";

// const TranslatorList = () => {
//   const [translators, setTranslators] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [filteredTranslators, setFilteredTranslators] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("All");
//   const [filters, setFilters] = useState({
//     city: "",
//     state: "",
//     country: "",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch translators
//         const translatorsResponse = await axios.get(`${BASE_URL}/api/translators/getAll/traslators`);
//         const formatted = translatorsResponse.data.map((t) => ({
//           id: t.translatorID,
//           name: t.translatorName,
//           languages: t.translatorLanguages
//             .split(",")
//             .map((lang) => lang.trim()),
//           experience: {
//             years: Math.floor(Math.random() * 11) + 5,
//             specialization: "General Translation",
//           },
//           email: t.email || "N/A",
//           phone: t.phone || "N/A",
//           city: t.city || "Unknown",
//           state: t.state || "Unknown",
//           country: t.country || "Unknown",
//           avatar: t.translatorImage,
//           rating: parseFloat(t.translatorRating),
//           description: t.translatorDescription,
//         }));
//         setTranslators(formatted);
//         setFilteredTranslators(formatted);

//         // Fetch locations
//         const locationsResponse = await axios.get(`${BASE_URL}/api/locations/getall`);
//         setLocations(locationsResponse.data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Get unique values for filters from locations API
//   const uniqueLocations = {
//     cities: [...new Set(locations.map(l => l.city))].sort(),
//     states: [...new Set(locations.map(l => l.state))].sort(),
//     countries: [...new Set(locations.map(l => l.country))].sort(),
//     languages: ["All", ...new Set(translators.flatMap(t => t.languages))].sort(),
//   };

//   // Apply filters whenever filters or selectedLanguage changes
//   useEffect(() => {
//     let filtered = [...translators];
    
//     // Apply location filters
//     if (filters.city) {
//       filtered = filtered.filter(t => t.city === filters.city);
//     }
//     if (filters.state) {
//       filtered = filtered.filter(t => t.state === filters.state);
//     }
//     if (filters.country) {
//       filtered = filtered.filter(t => t.country === filters.country);
//     }

//     // Apply language filter
//     if (selectedLanguage !== "All") {
//       filtered = filtered.filter(t => t.languages.includes(selectedLanguage));
//     }

//     setFilteredTranslators(filtered);
//   }, [translators, filters, selectedLanguage]);

//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//   };

//   const clearFilters = () => {
//     setFilters({ city: "", state: "", country: "" });
//     setSelectedLanguage("All");
//   };

//   const handleAddToCart = (translatorId) => {
//     navigate(`/booking/translator/${translatorId}`);
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Star
//           key={i}
//           className={`h-4 w-4 ${
//             i <= Math.round(rating)
//               ? "text-yellow-400 fill-yellow-400"
//               : "text-gray-300"
//           }`}
//         />
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#f0f8e8] to-gray-100 py-12 px-6 sm:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-[#3a7e10] mb-10 tracking-tight">
//           Meet Our Expert Translators
//         </h1>

//         <div className="mb-8 space-y-4">
//           <div className="flex flex-wrap justify-center gap-4">
//             <Select
//               value={selectedLanguage}
//               onValueChange={setSelectedLanguage}
//               aria-label="Filter by language"
//             >
//               <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
//                 <SelectValue placeholder="Select Language" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg bg-white">
//                 {uniqueLocations.languages.map((lang) => (
//                   <SelectItem
//                     key={lang}
//                     value={lang}
//                     className="hover:bg-[#f0f8e8]"
//                   >
//                     {lang}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={filters.city}
//               onValueChange={(value) => handleFilterChange("city", value)}
//             >
//               <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
//                 <SelectValue placeholder="Filter by City" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg bg-white">
//                 {uniqueLocations.cities.map((city) => (
//                   <SelectItem key={city} value={city} className="hover:bg-[#f0f8e8]">
//                     {city}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={filters.state}
//               onValueChange={(value) => handleFilterChange("state", value)}
//             >
//               <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
//                 <SelectValue placeholder="Filter by State" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg bg-white">
//                 {uniqueLocations.states.map((state) => (
//                   <SelectItem key={state} value={state} className="hover:bg-[#f0f8e8]">
//                     {state}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={filters.country}
//               onValueChange={(value) => handleFilterChange("country", value)}
//             >
//               <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
//                 <SelectValue placeholder="Filter by Country" />
//               </SelectTrigger>
//               <SelectContent className="rounded-xl shadow-lg bg-white">
//                 {uniqueLocations.countries.map((country) => (
//                   <SelectItem key={country} value={country} className="hover:bg-[#f0f8e8]">
//                     {country}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Button
//               variant="outline"
//               onClick={clearFilters}
//               className="bg-white hover:bg-gray-50"
//               disabled={!filters.city && !filters.state && !filters.country && selectedLanguage === "All"}
//             >
//               Clear Filters
//             </Button>
//           </div>

//           {filteredTranslators.length === 0 && (
//             <p className="text-center text-gray-500 mt-4">
//               No translators found matching the selected filters.
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTranslators.map((translator, index) => (
//             <Card
//               key={translator.id}
//               className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl transform hover:-translate-y-1"
//               style={{
//                 animation: `fadeIn 0.3s ease-in ${index * 0.1}s both`,
//               }}
//             >
//               <CardContent className="p-6 space-y-4">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={translator.avatar}
//                     alt={`${translator.name} avatar`}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-[#e6f4e0]"
//                     onError={(e) =>
//                       (e.target.src = "https://via.placeholder.com/150")
//                     }
//                   />
//                   <div>
//                     <h2 className="text-lg font-semibold text-[#3a7e10]">
//                       {translator.name}
//                     </h2>
//                     <p className="text-sm text-gray-600">
//                       {translator.city}, {translator.state}, {translator.country}
//                     </p>
//                     <div className="flex items-center gap-1 mt-1">
//                       {renderStars(translator.rating)}
//                       <span className="text-sm text-gray-500 ml-2">
//                         ({translator.rating})
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-700 flex flex-col gap-3">
//                   <p className="flex items-center gap-2">
//                     <Globe className="h-4 w-4 text-[#499E14]" />
//                     {translator.languages.join(", ")}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Briefcase className="h-4 w-4 text-[#499E14]" />
//                     {translator.experience.years} years
//                     <span className="ml-2 inline-block bg-[#e6f4e0] text-[#3a7e10] text-xs px-2 py-1 rounded-full">
//                       {translator.experience.specialization}
//                     </span>
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Mail className="h-4 w-4 text-[#499E14]" />
//                     {translator.email}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-[#499E14]" />
//                     {translator.phone}
//                   </p>
//                 </div>
//                 <TooltipProvider>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="default"
//                         size="lg"
//                         className="w-full bg-[#499E14] text-white hover:bg-[#3a7e10] transition-all rounded-lg"
//                         aria-label={`Contact ${translator.name}`}
//                         onClick={() => handleAddToCart(translator.id)}
//                       >
//                         Add To Cart
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Contact {translator.name} for translation services</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TranslatorList;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Mail, Phone, Briefcase, Star, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";

const Avatar = ({ src, name }) => (
  src ? (
    <img
      src={src}
      alt={name}
      className="w-14 h-14 rounded-full object-cover border border-gray-200 bg-white"
      onError={e => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96`)}
    />
  ) : (
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 text-gray-300">
      <User2 className="w-7 h-7" />
    </div>
  )
);

const TranslatorList = () => {
  const [translators, setTranslators] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredTranslators, setFilteredTranslators] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [filters, setFilters] = useState({ city: "", state: "", country: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translatorsResponse = await axios.get(`${BASE_URL}/api/translators/getAll/traslators`);
        const formatted = translatorsResponse.data.map((t) => ({
          id: t.translatorID,
          name: t.translatorName,
          languages: t.translatorLanguages.split(",").map((lang) => lang.trim()),
          experience: {
            years: Math.floor(Math.random() * 11) + 5,
            specialization: "General Translation",
          },
          email: t.email || "N/A",
          phone: t.phone || "N/A",
          city: t.city || "Unknown",
          state: t.state || "Unknown",
          country: t.country || "Unknown",
          avatar: t.translatorImage,
          rating: parseFloat(t.translatorRating),
          description: t.translatorDescription,
        }));
        setTranslators(formatted);
        setFilteredTranslators(formatted);

        const locationsResponse = await axios.get(`${BASE_URL}/api/locations/getall`);
        setLocations(locationsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const uniqueLocations = {
    cities: [...new Set(locations.map(l => l.city))].sort(),
    states: [...new Set(locations.map(l => l.state))].sort(),
    countries: [...new Set(locations.map(l => l.country))].sort(),
    languages: ["All", ...new Set(translators.flatMap(t => t.languages))].sort(),
  };

  useEffect(() => {
    let filtered = [...translators];
    if (filters.city) filtered = filtered.filter(t => t.city === filters.city);
    if (filters.state) filtered = filtered.filter(t => t.state === filters.state);
    if (filters.country) filtered = filtered.filter(t => t.country === filters.country);
    if (selectedLanguage !== "All") filtered = filtered.filter(t => t.languages.includes(selectedLanguage));
    setFilteredTranslators(filtered);
  }, [translators, filters, selectedLanguage]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  const clearFilters = () => {
    setFilters({ city: "", state: "", country: "" });
    setSelectedLanguage("All");
  };
  const handleAddToCart = (translatorId) => {
    navigate(`/booking/translator/${translatorId}`);
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= Math.round(rating) ? "text-yellow-400 fill-yellow-300" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-3">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-10">
          Translator Directory
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 px-4 py-3 bg-white shadow border border-gray-100 rounded-xl">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[160px] bg-gray-50 border border-gray-200 rounded-lg">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.languages.map(lang => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.city} onValueChange={val => handleFilterChange("city", val)}>
            <SelectTrigger className="w-[140px] bg-gray-50 border border-gray-200 rounded-lg">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.state} onValueChange={val => handleFilterChange("state", val)}>
            <SelectTrigger className="w-[140px] bg-gray-50 border border-gray-200 rounded-lg">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.country} onValueChange={val => handleFilterChange("country", val)}>
            <SelectTrigger className="w-[140px] bg-gray-50 border border-gray-200 rounded-lg">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="rounded-lg border border-green-200 text-green-700 hover:bg-green-50 px-5"
            onClick={clearFilters}
            disabled={!filters.city && !filters.state && !filters.country && selectedLanguage === "All"}
          >
            Clear
          </Button>
        </div>

        {/* Friendly empty state */}
        {filteredTranslators.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-14">
            <User2 className="w-14 h-14 text-gray-200 mb-2" />
            <span className="text-lg text-gray-400 font-medium">No translators match those criteria.</span>
          </div>
        )}

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredTranslators.map((translator, index) => (
            <Card
              key={translator.id}
              className="group rounded-xl shadow-sm border border-gray-100 bg-white hover:shadow-md transition-all"
              style={{ animation: `fadeIn .24s cubic-bezier(.44,.09,.48,.98) ${index * .07 + .12}s both` }}
            >
              <CardContent className="p-6 flex flex-col gap-2 h-full">
                <div className="flex items-center gap-3">
                  <Avatar src={translator.avatar} name={translator.name} />
                  <div className="flex-1 min-w-0">
                    <h2 className="truncate text-lg font-semibold text-gray-800">{translator.name}</h2>
                    <div className="text-xs text-gray-400 truncate">
                      {translator.city}, {translator.state}, {translator.country}
                    </div>
                    {renderStars(translator.rating)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {translator.languages.map(lang => (
                    <span key={lang} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-green-900 border border-gray-200 font-semibold">
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                  <Briefcase className="h-4 w-4 text-green-400" />
                  <span>{translator.experience.years} yrs</span>
                  <span className="ml-2 bg-green-50 text-green-700 px-2 rounded-full text-xs">{translator.experience.specialization}</span>
                </div>
                {translator.description && (
                  <div className="text-xs text-gray-500 italic mt-1 line-clamp-2">{translator.description}</div>
                )}
                <div className="flex flex-col gap-1 pt-2 text-xs mt-2 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-300" />
                    <span className="truncate">{translator.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-300" />
                    <span className="truncate">{translator.phone}</span>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
                        aria-label={`Book ${translator.name}`}
                        onClick={() => handleAddToCart(translator.id)}
                      >
                        Book
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contact {translator.name} for translation services</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(22px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default TranslatorList;
