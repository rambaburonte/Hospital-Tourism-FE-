import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { BASE_URL } from '@/config/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Hospital {
  id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  status: string;
}

interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    country: "",
  });

  // Get unique values for filters from locations API
  const uniqueLocations = {
    cities: [...new Set(locations.map(l => l.city))].sort(),
    states: [...new Set(locations.map(l => l.state))].sort(),
    countries: [...new Set(locations.map(l => l.country))].sort(),
  };

  // Filter hospitals based on selected filters
  useEffect(() => {
    let filtered = [...hospitals];
    
    if (filters.city) {
      filtered = filtered.filter(h => h.city === filters.city);
    }
    if (filters.state) {
      filtered = filtered.filter(h => h.state === filters.state);
    }
    if (filters.country) {
      filtered = filtered.filter(h => h.country === filters.country);
    }

    setFilteredHospitals(filtered);
  }, [hospitals, filters]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hospitals
        const hospitalsResponse = await fetch(`${BASE_URL}/api/hospitals/getall/hospitals`);
        if (!hospitalsResponse.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const hospitalsData: Hospital[] = await hospitalsResponse.json();
        setHospitals(hospitalsData);

        // Fetch locations
        const locationsResponse = await fetch(`${BASE_URL}/api/locations/getall`);
        if (!locationsResponse.ok) {
          throw new Error('Failed to fetch locations');
        }
        const locationsData: Location[] = await locationsResponse.json();
        setLocations(locationsData);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ city: "", state: "", country: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading hospitals...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="text-red-500 bg-red-100 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-semibold">Error: {error}</p>
          <Button
            className="mt-4 bg-primary hover:bg-primary-dark"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Hospitals</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <Select
            value={filters.city}
            onValueChange={(value) => handleFilterChange("city", value)}
          >
            <SelectTrigger className="w-[180px]">
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
            value={filters.state}
            onValueChange={(value) => handleFilterChange("state", value)}
          >
            <SelectTrigger className="w-[180px]">
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
            value={filters.country}
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger className="w-[180px]">
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

          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={!filters.city && !filters.state && !filters.country}
          >
            Clear Filters
          </Button>
        </div>

        {/* Hospital Cards */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {filteredHospitals.length === 0 ? (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg text-muted-foreground text-center">
                  No hospitals found matching the selected filters.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredHospitals.map((hospital) => (
                    <motion.div
                      key={hospital.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                        <p className="text-muted-foreground mb-4">{hospital.description}</p>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm"><span className="font-semibold">Location:</span> {hospital.city}, {hospital.state}, {hospital.country}</p>
                          <p className="text-sm"><span className="font-semibold">Status:</span> {hospital.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalList;