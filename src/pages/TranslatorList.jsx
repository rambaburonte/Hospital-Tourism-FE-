import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Mail, Phone, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from '@/config/config';
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

const TranslatorList = () => {
  const [translators, setTranslators] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredTranslators, setFilteredTranslators] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    country: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch translators
        const translatorsResponse = await axios.get(`${BASE_URL}/api/translators/getAll/traslators`);
        const formatted = translatorsResponse.data.map((t) => ({
          id: t.translatorID,
          name: t.translatorName,
          languages: t.translatorLanguages
            .split(",")
            .map((lang) => lang.trim()),
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

        // Fetch locations
        const locationsResponse = await axios.get(`${BASE_URL}/api/locations/getall`);
        setLocations(locationsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Get unique values for filters from locations API
  const uniqueLocations = {
    cities: [...new Set(locations.map(l => l.city))].sort(),
    states: [...new Set(locations.map(l => l.state))].sort(),
    countries: [...new Set(locations.map(l => l.country))].sort(),
    languages: ["All", ...new Set(translators.flatMap(t => t.languages))].sort(),
  };

  // Apply filters whenever filters or selectedLanguage changes
  useEffect(() => {
    let filtered = [...translators];
    
    // Apply location filters
    if (filters.city) {
      filtered = filtered.filter(t => t.city === filters.city);
    }
    if (filters.state) {
      filtered = filtered.filter(t => t.state === filters.state);
    }
    if (filters.country) {
      filtered = filtered.filter(t => t.country === filters.country);
    }

    // Apply language filter
    if (selectedLanguage !== "All") {
      filtered = filtered.filter(t => t.languages.includes(selectedLanguage));
    }

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f8e8] to-gray-100 py-12 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#3a7e10] mb-10 tracking-tight">
          Meet Our Expert Translators
        </h1>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
              aria-label="Filter by language"
            >
              <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg bg-white">
                {uniqueLocations.languages.map((lang) => (
                  <SelectItem
                    key={lang}
                    value={lang}
                    className="hover:bg-[#f0f8e8]"
                  >
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.city}
              onValueChange={(value) => handleFilterChange("city", value)}
            >
              <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
                <SelectValue placeholder="Filter by City" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg bg-white">
                {uniqueLocations.cities.map((city) => (
                  <SelectItem key={city} value={city} className="hover:bg-[#f0f8e8]">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.state}
              onValueChange={(value) => handleFilterChange("state", value)}
            >
              <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg bg-white">
                {uniqueLocations.states.map((state) => (
                  <SelectItem key={state} value={state} className="hover:bg-[#f0f8e8]">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.country}
              onValueChange={(value) => handleFilterChange("country", value)}
            >
              <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
                <SelectValue placeholder="Filter by Country" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg bg-white">
                {uniqueLocations.countries.map((country) => (
                  <SelectItem key={country} value={country} className="hover:bg-[#f0f8e8]">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="bg-white hover:bg-gray-50"
              disabled={!filters.city && !filters.state && !filters.country && selectedLanguage === "All"}
            >
              Clear Filters
            </Button>
          </div>

          {filteredTranslators.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No translators found matching the selected filters.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTranslators.map((translator, index) => (
            <Card
              key={translator.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl transform hover:-translate-y-1"
              style={{
                animation: `fadeIn 0.3s ease-in ${index * 0.1}s both`,
              }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={translator.avatar}
                    alt={`${translator.name} avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#e6f4e0]"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-[#3a7e10]">
                      {translator.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {translator.city}, {translator.state}, {translator.country}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(translator.rating)}
                      <span className="text-sm text-gray-500 ml-2">
                        ({translator.rating})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 flex flex-col gap-3">
                  <p className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#499E14]" />
                    {translator.languages.join(", ")}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#499E14]" />
                    {translator.experience.years} years
                    <span className="ml-2 inline-block bg-[#e6f4e0] text-[#3a7e10] text-xs px-2 py-1 rounded-full">
                      {translator.experience.specialization}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#499E14]" />
                    {translator.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#499E14]" />
                    {translator.phone}
                  </p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full bg-[#499E14] text-white hover:bg-[#3a7e10] transition-all rounded-lg"
                        aria-label={`Contact ${translator.name}`}
                        onClick={() => handleAddToCart(translator.id)}
                      >
                        Add To Cart
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TranslatorList;