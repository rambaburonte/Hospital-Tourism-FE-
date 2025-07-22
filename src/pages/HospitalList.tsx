// // // import React, { useEffect, useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Button } from "@/components/ui/button";
// // // import { BASE_URL } from '@/config/config';
// // // import {
// // //   Select,
// // //   SelectContent,
// // //   SelectItem,
// // //   SelectTrigger,
// // //   SelectValue,
// // // } from "@/components/ui/select";

// // // interface Hospital {
// // //   id: string;
// // //   name: string;
// // //   description: string;
// // //   city: string;
// // //   state: string;
// // //   country: string;
// // //   status: string;
// // // }

// // // interface Location {
// // //   id: string;
// // //   city: string;
// // //   state: string;
// // //   country: string;
// // // }

// // // const HospitalList: React.FC = () => {
// // //   const [hospitals, setHospitals] = useState<Hospital[]>([]);
// // //   const [locations, setLocations] = useState<Location[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
// // //   const [filters, setFilters] = useState({
// // //     city: "",
// // //     state: "",
// // //     country: "",
// // //   });

// // //   // Get unique values for filters from locations API
// // //   const uniqueLocations = {
// // //     cities: [...new Set(locations.map(l => l.city))].sort(),
// // //     states: [...new Set(locations.map(l => l.state))].sort(),
// // //     countries: [...new Set(locations.map(l => l.country))].sort(),
// // //   };

// // //   // Filter hospitals based on selected filters
// // //   useEffect(() => {
// // //     let filtered = [...hospitals];
    
// // //     if (filters.city) {
// // //       filtered = filtered.filter(h => h.city === filters.city);
// // //     }
// // //     if (filters.state) {
// // //       filtered = filtered.filter(h => h.state === filters.state);
// // //     }
// // //     if (filters.country) {
// // //       filtered = filtered.filter(h => h.country === filters.country);
// // //     }

// // //     setFilteredHospitals(filtered);
// // //   }, [hospitals, filters]);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         // Fetch hospitals
// // //         const hospitalsResponse = await fetch(`${BASE_URL}/api/hospitals/getall/hospitals`);
// // //         if (!hospitalsResponse.ok) {
// // //           throw new Error('Failed to fetch hospitals');
// // //         }
// // //         const hospitalsData: Hospital[] = await hospitalsResponse.json();
// // //         setHospitals(hospitalsData);

// // //         // Fetch locations
// // //         const locationsResponse = await fetch(`${BASE_URL}/api/locations/getall`);
// // //         if (!locationsResponse.ok) {
// // //           throw new Error('Failed to fetch locations');
// // //         }
// // //         const locationsData: Location[] = await locationsResponse.json();
// // //         setLocations(locationsData);

// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError(err instanceof Error ? err.message : 'An error occurred');
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const handleFilterChange = (field: keyof typeof filters, value: string) => {
// // //     setFilters(prev => ({ ...prev, [field]: value }));
// // //   };

// // //   const clearFilters = () => {
// // //     setFilters({ city: "", state: "", country: "" });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <motion.div
// // //           className="flex flex-col items-center"
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="w-16 h-16 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
// // //           <p className="mt-4 text-lg text-gray-600">Loading hospitals...</p>
// // //         </motion.div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen">
// // //         <motion.div
// // //           className="text-red-500 bg-red-100 p-6 rounded-lg shadow-md"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <p className="text-lg font-semibold">Error: {error}</p>
// // //           <Button
// // //             className="mt-4 bg-primary hover:bg-primary-dark"
// // //             onClick={() => window.location.reload()}
// // //           >
// // //             Retry
// // //           </Button>
// // //         </motion.div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <div className="container mx-auto py-8">
// // //         <h1 className="text-4xl font-bold mb-8 text-center">Our Hospitals</h1>

// // //         {/* Filters */}
// // //         <div className="flex flex-wrap gap-4 mb-6 justify-center">
// // //           <Select
// // //             value={filters.city}
// // //             onValueChange={(value) => handleFilterChange("city", value)}
// // //           >
// // //             <SelectTrigger className="w-[180px]">
// // //               <SelectValue placeholder="Filter by City" />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {uniqueLocations.cities.map((city) => (
// // //                 <SelectItem key={city} value={city}>
// // //                   {city}
// // //                 </SelectItem>
// // //               ))}
// // //             </SelectContent>
// // //           </Select>

// // //           <Select
// // //             value={filters.state}
// // //             onValueChange={(value) => handleFilterChange("state", value)}
// // //           >
// // //             <SelectTrigger className="w-[180px]">
// // //               <SelectValue placeholder="Filter by State" />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {uniqueLocations.states.map((state) => (
// // //                 <SelectItem key={state} value={state}>
// // //                   {state}
// // //                 </SelectItem>
// // //               ))}
// // //             </SelectContent>
// // //           </Select>

// // //           <Select
// // //             value={filters.country}
// // //             onValueChange={(value) => handleFilterChange("country", value)}
// // //           >
// // //             <SelectTrigger className="w-[180px]">
// // //               <SelectValue placeholder="Filter by Country" />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {uniqueLocations.countries.map((country) => (
// // //                 <SelectItem key={country} value={country}>
// // //                   {country}
// // //                 </SelectItem>
// // //               ))}
// // //             </SelectContent>
// // //           </Select>

// // //           <Button
// // //             variant="outline"
// // //             onClick={clearFilters}
// // //             disabled={!filters.city && !filters.state && !filters.country}
// // //           >
// // //             Clear Filters
// // //           </Button>
// // //         </div>

// // //         {/* Hospital Cards */}
// // //         {loading ? (
// // //           <div className="flex justify-center items-center min-h-[400px]">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
// // //           </div>
// // //         ) : (
// // //           <>
// // //             {filteredHospitals.length === 0 ? (
// // //               <motion.div
// // //                 className="flex flex-col items-center"
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //                 transition={{ duration: 0.3 }}
// // //               >
// // //                 <p className="text-lg text-muted-foreground text-center">
// // //                   No hospitals found matching the selected filters.
// // //                 </p>
// // //               </motion.div>
// // //             ) : (
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                 <AnimatePresence>
// // //                   {filteredHospitals.map((hospital) => (
// // //                     <motion.div
// // //                       key={hospital.id}
// // //                       initial={{ opacity: 0, y: 20 }}
// // //                       animate={{ opacity: 1, y: 0 }}
// // //                       exit={{ opacity: 0, y: -20 }}
// // //                       transition={{ duration: 0.3 }}
// // //                       className="bg-card rounded-lg shadow-lg overflow-hidden"
// // //                     >
// // //                       <div className="p-6">
// // //                         <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
// // //                         <p className="text-muted-foreground mb-4">{hospital.description}</p>
// // //                         <div className="flex flex-col gap-2">
// // //                           <p className="text-sm"><span className="font-semibold">Location:</span> {hospital.city}, {hospital.state}, {hospital.country}</p>
// // //                           <p className="text-sm"><span className="font-semibold">Status:</span> {hospital.status}</p>
// // //                         </div>
// // //                       </div>
// // //                     </motion.div>
// // //                   ))}
// // //                 </AnimatePresence>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HospitalList;

// // import React, { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Button } from "@/components/ui/button";
// // import { BASE_URL } from '@/config/config';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { MapPin, Building2, Star, ShieldAlert, ImageOff } from "lucide-react";

// // interface Hospital {
// //   hospitalId: number;
// //   hospitalName: string;
// //   hospitalDescription: string;
// //   hospitalImage: string;
// //   rating: string;
// //   address: string;
// //   status: string;
// //   hospitallocationId: number;
// //   hospitallocationName: string;
// //   city: string | null; // Always null, ignore for filter!
// //   state: string | null;
// //   country: string | null;
// // }
// // interface Location {
// //   locationId: number;
// //   city: string;
// //   state: string;
// //   country: string;
// // }

// // const HospitalLocationList: React.FC = () => {
// //   const [hospitals, setHospitals] = useState<Hospital[]>([]);
// //   const [locations, setLocations] = useState<Location[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
// //   const [filters, setFilters] = useState({ city: "", state: "", country: "" });

// //   // GET unique filter options from locations API (NOT FROM hospitals)
// //   const uniqueLocations = {
// //     cities: [...new Set(locations.map(l => l.city).filter(Boolean))].sort(),
// //     states: [...new Set(locations.map(l => l.state).filter(Boolean))].sort(),
// //     countries: [...new Set(locations.map(l => l.country).filter(Boolean))].sort(),
// //   };

// //   // Filtering logic!
// //   useEffect(() => {
// //     let filtered = [...hospitals];
// //     if (filters.city) {
// //       filtered = filtered.filter(h => h.hospitallocationName === filters.city);
// //     }
// //     if (filters.state) {
// //       filtered = filtered.filter(h => h.state === filters.state);
// //     }
// //     if (filters.country) {
// //       filtered = filtered.filter(h => h.country === filters.country);
// //     }
// //     setFilteredHospitals(filtered);
// //   }, [hospitals, filters]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Hospitals
// //         const hospitalsResponse = await fetch(`${BASE_URL}/api/hospitals/getall/hospitals/active`);
// //         if (!hospitalsResponse.ok) throw new Error('Failed to fetch hospitals');
// //         const hospitalsData: Hospital[] = await hospitalsResponse.json();
// //         setHospitals(hospitalsData);

// //         // Locations
// //         const locationsResponse = await fetch(`${BASE_URL}/api/locations/getall`);
// //         if (!locationsResponse.ok) throw new Error('Failed to fetch locations');
// //         const locationsData: Location[] = await locationsResponse.json();
// //         setLocations(locationsData);

// //         setLoading(false);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : 'An error occurred');
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const handleFilterChange = (field: keyof typeof filters, value: string) => {
// //     setFilters(prev => ({ ...prev, [field]: value }));
// //   };

// //   const clearFilters = () => setFilters({ city: "", state: "", country: "" });

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen bg-background">
// //         <motion.div
// //           className="flex flex-col items-center"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <div className="w-16 h-16 border-4 border-blue-700/40 border-t-blue-700 border-t-4 rounded-full animate-spin"></div>
// //           <p className="mt-4 text-lg text-blue-600">Loading hospitals...</p>
// //         </motion.div>
// //       </div>
// //     );
// //   }
// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-screen bg-background">
// //         <motion.div
// //           className="text-red-500 bg-red-100 p-6 rounded-lg shadow-md flex flex-col items-center"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <ShieldAlert className="mb-3 w-8 h-8" />
// //           <p className="text-lg font-semibold mb-3">Error: {error}</p>
// //           <Button className="bg-primary hover:bg-primary-dark" onClick={() => window.location.reload()}>
// //             Retry
// //           </Button>
// //         </motion.div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
// //       <div className="max-w-7xl mx-auto py-10 px-2 sm:px-6">
// //         <h1 className="text-4xl font-black mb-12 text-center text-blue-900 tracking-tight">Our Hospitals</h1>
// //         {/* FILTERS */}
// //         <div className="flex flex-wrap gap-4 mb-10 bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow sticky top-4 z-20 justify-center items-center">
// //           <Select
// //             value={filters.city}
// //             onValueChange={(value) => handleFilterChange("city", value)}
// //           >
// //             <SelectTrigger className="w-[170px]"><SelectValue placeholder="City" /></SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="">All Cities</SelectItem>
// //               {uniqueLocations.cities.map(city => (
// //                 <SelectItem key={city} value={city}>{city}</SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //           <Select
// //             value={filters.state}
// //             onValueChange={(value) => handleFilterChange("state", value)}
// //           >
// //             <SelectTrigger className="w-[170px]"><SelectValue placeholder="State" /></SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="">All States</SelectItem>
// //               {uniqueLocations.states.map(state => (
// //                 <SelectItem key={state} value={state}>{state}</SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //           <Select
// //             value={filters.country}
// //             onValueChange={(value) => handleFilterChange("country", value)}
// //           >
// //             <SelectTrigger className="w-[170px]"><SelectValue placeholder="Country" /></SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="">All Countries</SelectItem>
// //               {uniqueLocations.countries.map(country => (
// //                 <SelectItem key={country} value={country}>{country}</SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //           <Button variant="outline" className="ml-2"
// //             onClick={clearFilters}
// //             disabled={!filters.city && !filters.state && !filters.country}>
// //             Clear Filters
// //           </Button>
// //         </div>
// //         {/* HOSPITAL CARD GRID */}
// //         {filteredHospitals.length === 0 ? (
// //           <motion.div
// //             className="flex flex-col items-center py-10"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <Building2 className="w-12 h-12 text-blue-200 mb-4" />
// //             <p className="text-lg text-gray-400 text-center font-semibold">
// //               No hospitals found
// //               <br />
// //               <span className="text-base font-normal">Try changing filters above.</span>
// //             </p>
// //           </motion.div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
// //             <AnimatePresence>
// //               {filteredHospitals.map((hospital) => (
// //                 <motion.div
// //                   key={hospital.hospitalId}
// //                   initial={{ opacity: 0, y: 16 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -16 }}
// //                   transition={{ duration: 0.27 }}
// //                   className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl border border-blue-100 flex flex-col"
// //                 >
// //                   {hospital.hospitalImage ? (
// //                     <img
// //                       src={hospital.hospitalImage}
// //                       alt={hospital.hospitalName}
// //                       className="w-full h-44 object-cover bg-blue-50"
// //                     />
// //                   ) : (
// //                     <div className="flex items-center justify-center w-full h-44 bg-gray-100">
// //                       <ImageOff className="w-14 h-14 text-gray-300" />
// //                     </div>
// //                   )}
// //                   <div className="flex-1 p-6 flex flex-col">
// //                     <div className="flex items-center gap-3 mb-2">
// //                       <Building2 className="w-7 h-7 text-blue-700" />
// //                       <span className="text-xl text-blue-800 font-extrabold truncate">
// //                         {hospital.hospitalName}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center gap-2 mb-3">
// //                       <span className="flex items-center gap-1 text-yellow-600 font-semibold text-xs">
// //                         <Star className="w-4 h-4 fill-yellow-400" />
// //                         {hospital.rating || "N/A"}
// //                       </span>
// //                       <span className={"uppercase font-bold px-2 py-1 rounded bg-green-50 text-green-800 text-xs"}>
// //                         {hospital.status}
// //                       </span>
// //                     </div>
// //                     <div className="text-gray-700 font-medium line-clamp-2 mb-2">
// //                       {hospital.hospitalDescription}
// //                     </div>
// //                     {hospital.address &&
// //                       <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
// //                         <MapPin className="w-4 h-4" />
// //                         <span>{hospital.address}</span>
// //                       </div>
// //                     }
// //                     <div className="flex flex-wrap gap-2 mb-3 mt-auto">
// //                       {hospital.hospitallocationName && (
// //                         <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">{hospital.hospitallocationName}</span>
// //                       )}
// //                       {hospital.state && (
// //                         <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">{hospital.state}</span>
// //                       )}
// //                       {hospital.country && (
// //                         <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">{hospital.country}</span>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default HospitalLocationList;
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from "@/components/ui/button";
// import { BASE_URL } from '@/config/config';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MapPin, Building2, Star, ShieldAlert, ImageOff } from "lucide-react";

// interface Hospital {
//   hospitalId: number;
//   hospitalName: string;
//   hospitalDescription: string;
//   hospitalImage: string;
//   rating: string;
//   address: string;
//   status: string;
//   hospitallocationId: number;
//   hospitallocationName: string;
//   city: string | null;
//   state: string | null;
//   country: string | null;
// }
// interface Location {
//   locationId: number;
//   city: string;
//   state: string;
//   country: string;
// }

// const HospitalList: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
//   const [filters, setFilters] = useState({ city: "", state: "", country: "" });

//   // Use locations list as source of truth for selects
//   const uniqueLocations = {
//     cities: [...new Set(locations.map(l => (l.city || "").trim()).filter(Boolean))].sort(),
//     states: [...new Set(locations.map(l => (l.state || "").trim()).filter(Boolean))].sort(),
//     countries: [...new Set(locations.map(l => (l.country || "").trim()).filter(Boolean))].sort(),
//   };

//   useEffect(() => {
//     let filtered = [...hospitals];
//     if (filters.city) {
//       filtered = filtered.filter(h => h.hospitallocationName === filters.city);
//     }
//     if (filters.state) {
//       filtered = filtered.filter(h => h.state === filters.state);
//     }
//     if (filters.country) {
//       filtered = filtered.filter(h => h.country === filters.country);
//     }
//     setFilteredHospitals(filtered);
//   }, [hospitals, filters]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Hospitals (active)
//         const hospitalsResponse = await fetch(`${BASE_URL}/api/hospitals/getall/hospitals/active`);
//         if (!hospitalsResponse.ok) throw new Error('Failed to fetch hospitals');
//         const hospitalsData: Hospital[] = await hospitalsResponse.json();
//         setHospitals(hospitalsData);

//         // Locations
//         const locationsResponse = await fetch(`${BASE_URL}/api/locations/getall`);
//         if (!locationsResponse.ok) throw new Error('Failed to fetch locations');
//         const locationsData: Location[] = await locationsResponse.json();
//         setLocations(locationsData);

//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilterChange = (field: keyof typeof filters, value: string) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//   };

//   const clearFilters = () => setFilters({ city: "", state: "", country: "" });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-background">
//         <motion.div
//           className="flex flex-col items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="w-16 h-16 border-4 border-blue-700/40 border-t-blue-700 border-t-4 rounded-full animate-spin"></div>
//           <p className="mt-4 text-lg text-blue-600">Loading hospitals...</p>
//         </motion.div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-background">
//         <motion.div
//           className="text-red-500 bg-red-100 p-6 rounded-lg shadow-md flex flex-col items-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <ShieldAlert className="mb-3 w-8 h-8" />
//           <p className="text-lg font-semibold mb-3">Error: {error}</p>
//           <Button className="bg-primary hover:bg-primary-dark" onClick={() => window.location.reload()}>
//             Retry
//           </Button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <div className="max-w-7xl mx-auto py-10 px-2 sm:px-6">
//         <h1 className="text-4xl font-black mb-12 text-center text-blue-900 tracking-tight">Our Hospitals</h1>
//         {/* FILTERS */}
//         <div className="flex flex-wrap gap-4 mb-10 bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow sticky top-4 z-20 justify-center items-center">
//           {/* CITY */}
//           <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
//             <SelectTrigger className="w-[170px]"><SelectValue placeholder="City" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="">All Cities</SelectItem>
//               {uniqueLocations.cities.map(city =>
//                 <SelectItem key={city} value={city}>{city}</SelectItem>
//               )}
//             </SelectContent>
//           </Select>
//           {/* STATE */}
//           <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
//             <SelectTrigger className="w-[170px]"><SelectValue placeholder="State" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="">All States</SelectItem>
//               {uniqueLocations.states.map(state =>
//                 <SelectItem key={state} value={state}>{state}</SelectItem>
//               )}
//             </SelectContent>
//           </Select>
//           {/* COUNTRY */}
//           <Select value={filters.country} onValueChange={(value) => handleFilterChange("country", value)}>
//             <SelectTrigger className="w-[170px]"><SelectValue placeholder="Country" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="">All Countries</SelectItem>
//               {uniqueLocations.countries.map(country =>
//                 <SelectItem key={country} value={country}>{country}</SelectItem>
//               )}
//             </SelectContent>
//           </Select>
//           <Button variant="outline" className="ml-2"
//             onClick={clearFilters}
//             disabled={!filters.city && !filters.state && !filters.country}>
//             Clear Filters
//           </Button>
//         </div>
//         {/* HOSPITAL CARD GRID */}
//         {filteredHospitals.length === 0 ? (
//           <motion.div
//             className="flex flex-col items-center py-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Building2 className="w-12 h-12 text-blue-200 mb-4" />
//             <p className="text-lg text-gray-400 text-center font-semibold">
//               No hospitals found
//               <br />
//               <span className="text-base font-normal">Try changing filters above.</span>
//             </p>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//             <AnimatePresence>
//               {filteredHospitals.map((hospital) => (
//                 <motion.div
//                   key={hospital.hospitalId}
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -16 }}
//                   transition={{ duration: 0.27 }}
//                   className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl border border-blue-100 flex flex-col"
//                 >
//                   {hospital.hospitalImage ? (
//                     <img
//                       src={hospital.hospitalImage}
//                       alt={hospital.hospitalName}
//                       className="w-full h-44 object-cover bg-blue-50"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-44 bg-gray-100">
//                       <ImageOff className="w-14 h-14 text-gray-300" />
//                     </div>
//                   )}
//                   <div className="flex-1 p-6 flex flex-col">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Building2 className="w-7 h-7 text-blue-700" />
//                       <span className="text-xl text-blue-800 font-extrabold truncate">
//                         {hospital.hospitalName}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className="flex items-center gap-1 text-yellow-600 font-semibold text-xs">
//                         <Star className="w-4 h-4 fill-yellow-400" />
//                         {hospital.rating || "N/A"}
//                       </span>
//                       <span className={"uppercase font-bold px-2 py-1 rounded bg-green-50 text-green-800 text-xs"}>
//                         {hospital.status}
//                       </span>
//                     </div>
//                     <div className="text-gray-700 font-medium line-clamp-2 mb-2">
//                       {hospital.hospitalDescription}
//                     </div>
//                     {hospital.address &&
//                       <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
//                         <MapPin className="w-4 h-4" />
//                         <span>{hospital.address}</span>
//                       </div>
//                     }
//                     <div className="flex flex-wrap gap-2 mb-3 mt-auto">
//                       {hospital.hospitallocationName && (
//                         <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">{hospital.hospitallocationName}</span>
//                       )}
//                       {hospital.state && (
//                         <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">{hospital.state}</span>
//                       )}
//                       {hospital.country && (
//                         <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">{hospital.country}</span>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HospitalLocationList;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Building2, Star, ShieldAlert, ImageOff, Info } from "lucide-react";

// Example Tooltip component (You may add a prebuilt tooltip package for more robustness)
function Tooltip({ text, children }) {
  return (
    <span className="group relative">
      {children}
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full
        bg-gray-900 text-xs text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100
        transition-opacity z-40 whitespace-nowrap"
      >
        {text}
      </span>
    </span>
  );
}

// Interfaces
interface Location { locationId: number; city: string; state: string; country: string; }
interface Hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalDescription: string;
  hospitalImage: string;
  rating: string;
  address: string;
  status: string;
  specialization: string | null;
  hospitallocationId: number;
  hospitallocationName: string;
  city: string | null;
  state: string | null;
  country: string | null;
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [filters, setFilters] = useState({city: "", state: "", country: ""});

  // For searchable filter dropdowns
  const [search, setSearch] = useState({ city: "", state: "", country: "" });

  // Get unique, cleaned and sorted locations
  const uniqueLocations = {
    cities: [
      ...new Set(
        locations
          .map((l) => l.city)
          .filter((city) => !!city && city.trim() !== "")
      ),
    ].sort(),
    states: [
      ...new Set(
        locations
          .map((l) => l.state)
          .filter((state) => !!state && state.trim() !== "")
      ),
    ].sort(),
    countries: [
      ...new Set(
        locations
          .map((l) => l.country)
          .filter((country) => !!country && country.trim() !== "")
      ),
    ].sort(),
  };

  // Filter hospitals based on filters
  useEffect(() => {
    let filtered = [...hospitals];
    if (filters.city) filtered = filtered.filter(
      (h) => h.hospitallocationName === filters.city
    );
    if (filters.state) filtered = filtered.filter((h) => h.state === filters.state);
    if (filters.country) filtered = filtered.filter((h) => h.country === filters.country);
    setFilteredHospitals(filtered);
  }, [hospitals, filters]);

  // Fetch hospitals and locations on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalsResponse, locationsResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/hospitals/getall/hospitals/active`),
          fetch(`${BASE_URL}/api/locations/getall`)
        ]);

        if (!hospitalsResponse.ok) throw new Error("Failed to fetch hospitals");
        if (!locationsResponse.ok) throw new Error("Failed to fetch locations");
        setHospitals(await hospitalsResponse.json());
        setLocations(await locationsResponse.json());
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred loading data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (field: keyof typeof filters, value: string) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  const clearFilters = () => setFilters({ city: "", state: "", country: "" });

  // Responsive grid columns
  const gridCols = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 border-t-4 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-blue-600 font-semibold">Loading hospitals...</p>
        </motion.div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <motion.div
          className="text-red-500 bg-red-50 p-8 rounded-lg shadow-md flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShieldAlert className="mb-3 w-8 h-8" />
          <p className="text-lg font-semibold mb-3">Error: {error}</p>
          <Button
            className="bg-primary hover:bg-primary-dark"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100/30 to-white">
      <div className="max-w-7xl mx-auto py-10 px-3 sm:px-8">
        <motion.h1
          className="text-4xl font-black mb-12 text-center text-blue-900 tracking-tight"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Find a Hospital
        </motion.h1>

        {/* FILTERS */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10 bg-white/90 shadow backdrop-blur rounded-xl p-5 sticky top-3 z-20 justify-center items-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Improved Searchable Filter Example */}
          <div>
            <label className="block text-xs font-bold mb-1 text-blue-800">City</label>
            <Select
              value={filters.city || "all"}
              onValueChange={value => handleFilterChange("city", value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {uniqueLocations.cities
                  .filter(city =>
                    city.toLowerCase().includes(search.city.toLowerCase())
                  )
                  .map(city => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                <div className="px-2 py-1">
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full border-none text-xs rounded px-2 py-1 bg-gray-100 mt-2"
                    value={search.city}
                    onChange={e => setSearch(s => ({ ...s, city: e.target.value }))}
                  />
                </div>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 text-blue-800">State</label>
            <Select
              value={filters.state || "all"}
              onValueChange={value => handleFilterChange("state", value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {uniqueLocations.states
                  .filter(state =>
                    state.toLowerCase().includes(search.state.toLowerCase())
                  )
                  .map(state => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                <div className="px-2 py-1">
                  <input
                    type="text"
                    placeholder="Search state..."
                    className="w-full border-none text-xs rounded px-2 py-1 bg-gray-100 mt-2"
                    value={search.state}
                    onChange={e => setSearch(s => ({ ...s, state: e.target.value }))}
                  />
                </div>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1 text-blue-800">Country</label>
            <Select
              value={filters.country || "all"}
              onValueChange={value => handleFilterChange("country", value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {uniqueLocations.countries
                  .filter(country =>
                    country.toLowerCase().includes(search.country.toLowerCase())
                  )
                  .map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                <div className="px-2 py-1">
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full border-none text-xs rounded px-2 py-1 bg-gray-100 mt-2"
                    value={search.country}
                    onChange={e => setSearch(s => ({ ...s, country: e.target.value }))}
                  />
                </div>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="h-10 px-4 py-1 ml-2"
            onClick={clearFilters}
            disabled={!filters.city && !filters.state && !filters.country}
          >
            Clear Filters
          </Button>
        </motion.div>

        {/* LIST / CARD GRID */}
        {filteredHospitals.length === 0 ? (
          <motion.div
            className="flex flex-col items-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Building2 className="w-14 h-14 text-blue-200 mb-3" />
            <p className="text-lg text-gray-400 text-center font-semibold">
              No hospitals found
              <br />
              <span className="text-base font-normal text-gray-500">
                Try changing filters above.
              </span>
            </p>
          </motion.div>
        ) : (
          <div className={`grid ${gridCols} gap-7`}>
            <AnimatePresence>
              {filteredHospitals.map((hospital) => (
                <motion.div
                  key={hospital.hospitalId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.23 }}
                  className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl border border-blue-100 flex flex-col transform hover:scale-[1.024] transition-all cursor-pointer group"
                  tabIndex={0}
                  aria-label={`${hospital.hospitalName} hospital card`}
                >
                  {/* Image with fallback */}
                  {hospital.hospitalImage ? (
                    <img
                      src={hospital.hospitalImage}
                      alt={hospital.hospitalName}
                      className="w-full h-44 object-cover bg-blue-50 group-hover:scale-105 transition-transform"
                      onError={e => (e.currentTarget.src = "/no-image.svg")}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-44 bg-gray-100">
                      <ImageOff className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  <div className="flex-1 p-6 flex flex-col gap-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Tooltip text="Hospital">
                        <Building2 className="w-7 h-7 text-blue-700" />
                      </Tooltip>
                      <span className="text-xl text-blue-900 font-bold truncate">
                        {hospital.hospitalName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tooltip text="Rating">
                        <span className="flex items-center gap-1 text-yellow-600 font-medium text-sm">
                          <Star className="w-4 h-4 fill-yellow-300 text-yellow-500" />
                          {hospital.rating || "N/A"}
                        </span>
                      </Tooltip>
                      <span className={"uppercase ml-1 px-2 py-0.5 rounded bg-green-50 text-green-800 text-xs font-semibold"}>
                        {hospital.status}
                      </span>
                    </div>
                    {/* Description & Info tooltip */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-gray-700 font-medium text-sm line-clamp-2 flex-1">
                        {hospital.hospitalDescription}
                      </div>
                      {hospital.specialization &&
                        <Tooltip text={`Specialization: ${hospital.specialization}`}>
                          <Info className="w-4 h-4 text-blue-400 ml-1.5" />
                        </Tooltip>
                      }
                    </div>
                    {hospital.address && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{hospital.address}</span>
                      </div>
                    )}
                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {hospital.hospitallocationName &&
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-900 text-xs rounded">{hospital.hospitallocationName}</span>}
                      {hospital.state &&
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">{hospital.state}</span>}
                      {hospital.country &&
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">{hospital.country}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalList;
