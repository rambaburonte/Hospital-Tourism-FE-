// import React, { useEffect, useRef, useState } from 'react';
// import createGlobe from 'cobe';
// import { useSpring } from '@react-spring/web';
// import axios from 'axios';
// import { BASE_URL } from '../config/config';

// interface CountryData {
//   country: string;
//   userCount: number;
//   latitude: number;
//   longitude: number;
// }

// interface UserGlobeProps {
//   className?: string;
// }

// const UserGlobe: React.FC<UserGlobeProps> = ({ className }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);  const [countryData, setCountryData] = useState<CountryData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
//   const [pointerInteracting, setPointerInteracting] = useState<number | null>(null);
//   const [pointerInteractionMovement, setPointerInteractionMovement] = useState(0);
//   const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

//   // Auto-rotation spring
//   const [{ r }, api] = useSpring(() => ({
//     r: 0,
//     config: {
//       mass: 1,
//       tension: 280,
//       friction: 40,
//       precision: 0.001,
//     },
//   }));
//   // Fetch user statistics
//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/user-stats/countries`);
//         if (response.ok) {
//           const data = await response.json();
//           setCountryData(data);
//         } else {
//           console.warn('Failed to fetch user stats, using sample data');
//           // Sample data for demonstration
//           setCountryData([
//             { country: "United States", userCount: 150, latitude: 38.9072, longitude: -77.0369 },
//             { country: "India", userCount: 120, latitude: 28.6139, longitude: 77.2090 },
//             { country: "United Kingdom", userCount: 95, latitude: 51.5074, longitude: -0.1278 },
//             { country: "Germany", userCount: 80, latitude: 52.5200, longitude: 13.4050 },
//             { country: "Canada", userCount: 70, latitude: 45.4215, longitude: -75.6972 },
//             { country: "Australia", userCount: 60, latitude: -35.2809, longitude: 149.1300 },
//           ]);
//         }
//       } catch (error) {
//         console.error('Error fetching user stats:', error);
//         // Fallback sample data
//         setCountryData([
//           { country: "United States", userCount: 150, latitude: 38.9072, longitude: -77.0369 },
//           { country: "India", userCount: 120, latitude: 28.6139, longitude: 77.2090 },
//           { country: "United Kingdom", userCount: 95, latitude: 51.5074, longitude: -0.1278 },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserStats();
//   }, []);
//   // Update dimensions based on container size
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (canvasRef.current && canvasRef.current.parentElement) {
//         const container = canvasRef.current.parentElement;
//         const containerRect = container.getBoundingClientRect();
        
//         // Use the smaller dimension to ensure the globe fits properly
//         const size = Math.min(containerRect.width, containerRect.height, window.innerWidth * 0.4, window.innerHeight * 0.6);
        
//         setDimensions({
//           width: size,
//           height: size
//         });
//       }
//     };

//     // Initial size calculation
//     updateDimensions();

//     // Update on window resize
//     window.addEventListener('resize', updateDimensions);
    
//     // Use ResizeObserver for more accurate container size detection
//     let resizeObserver: ResizeObserver | null = null;
//     if (canvasRef.current && canvasRef.current.parentElement) {
//       resizeObserver = new ResizeObserver(updateDimensions);
//       resizeObserver.observe(canvasRef.current.parentElement);
//     }

//     return () => {
//       window.removeEventListener('resize', updateDimensions);
//       if (resizeObserver) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let phi = 0;

//     if (!canvasRef.current || countryData.length === 0) return;// Convert country data to markers for cobe
//     const markers = countryData.map(country => ({
//       location: [country.latitude, country.longitude] as [number, number],
//       size: Math.max(0.03, Math.min(0.1, country.userCount / 200)), // Scale marker size based on user count
//       country: country.country,
//       userCount: country.userCount,
//     }));    globeRef.current = createGlobe(canvasRef.current, {
//       devicePixelRatio: 2,
//       width: dimensions.width * 2,
//       height: dimensions.height * 2,
//       phi: 0,
//       theta: 0.3,
//       dark: 0,
//       diffuse: 1.2,
//       mapSamples: 16000,
//       mapBrightness: 6,
//       baseColor: [0.2, 0.3, 0.4], // Professional blue-grey for continents
//       markerColor: [0.1, 0.7, 0.4], // Medical green for user markers
//       glowColor: [0.8, 0.9, 1.0], // Subtle light blue glow
//       markers,
//       onRender: (state) => {
//         // Auto-rotate
//         if (!pointerInteracting) {
//           phi += 0.005;
//         }
//         state.phi = phi + r.get();
        
//         // Update pointer interaction with dynamic dimensions
//         state.width = dimensions.width * 2;
//         state.height = dimensions.height * 2;
//       },
//     });return () => {
//       if (globeRef.current) {
//         globeRef.current.destroy();
//       }
//     };
//   }, [countryData, pointerInteracting, r, dimensions]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (globeRef.current) {
//         globeRef.current.resize();
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setPointerInteracting(e.pointerId);
//     setPointerInteractionMovement(0);
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = 'grabbing';
//     }
//   };

//   const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setPointerInteracting(null);
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = 'grab';
//     }
//   };

//   const handlePointerOut = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setPointerInteracting(null);
//     if (canvasRef.current) {
//       canvasRef.current.style.cursor = 'grab';
//     }
//   };

//   const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     if (pointerInteracting !== null) {
//       const delta = e.clientX - pointerInteractionMovement;
//       setPointerInteractionMovement(e.clientX);
//       api.start({ r: delta / 200 });
//     }
//   };

//   if (loading) {
//     return (
//       <div className={`flex items-center justify-center ${className}`}>
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }
//   return (
//     <div className={`relative w-full h-full ${className}`} style={{ zIndex: 10 }}>
//       <canvas
//         ref={canvasRef}
//         onPointerDown={handlePointerDown}
//         onPointerUp={handlePointerUp}
//         onPointerOut={handlePointerOut}
//         onPointerMove={handlePointerMove}
//         style={{
//           width: '100%',
//           height: '100%',
//           cursor: 'grab',
//           contain: 'layout style size',
//           position: 'relative',
//           zIndex: 1,
//         }}
//       />
//         {/* Statistics overlay */}
//       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs" style={{ zIndex: 20 }}>
//         <h3 className="font-semibold text-gray-800 mb-2">Global Users</h3>
//         <div className="space-y-1 text-sm">
//           <p className="text-gray-600">
//             Total Users: <span className="font-medium">{countryData.reduce((sum, country) => sum + country.userCount, 0)}</span>
//           </p>
//           <p className="text-gray-600">
//             Countries: <span className="font-medium">{countryData.length}</span>
//           </p>
//         </div>
        
//         {/* Top countries */}
//         <div className="mt-3">
//           <p className="text-xs text-gray-500 mb-1">Top Countries:</p>
//           {countryData
//             .sort((a, b) => b.userCount - a.userCount)
//             .slice(0, 3)
//             .map((country, index) => (
//               <div key={country.country} className="text-xs text-gray-600 flex justify-between">
//                 <span>{country.country}</span>
//                 <span className="font-medium">{country.userCount}</span>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Instructions */}
//       <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg" style={{ zIndex: 20 }}>
//         <p className="text-xs text-gray-600">
//           🌍 Drag to rotate • Dots show user locations
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserGlobe;



// import React, { useEffect, useRef, useState } from 'react';
// import createGlobe from 'cobe';
// import { useSpring } from '@react-spring/web';
// import axios from 'axios';
// import { BASE_URL } from '../config/config';

// interface CountryData {
//   country: string;
//   userCount: number;
//   latitude: number;
//   longitude: number;
// }

// interface UserGlobeProps {
//   className?: string;
// }

// const UserGlobe: React.FC<UserGlobeProps> = ({ className }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
//   const [countryData, setCountryData] = useState<CountryData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
//   const [pointerInteracting, setPointerInteracting] = useState<number | null>(null);
//   const [pointerInteractionMovement, setPointerInteractionMovement] = useState(0);
//   const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
//   const [isDarkTheme, setIsDarkTheme] = useState(true);
//   const [isRotating, setIsRotating] = useState(true);

//   // Auto-rotation spring
//   const [{ r }, api] = useSpring(() => ({
//     r: 0,
//     config: {
//       mass: 1,
//       tension: 280,
//       friction: 40,
//       precision: 0.001,
//     },
//   }));

//   // Fetch user statistics
//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/user-stats/countries`);
//         if (response.ok) {
//           const data = await response.json();
//           setCountryData(data);
//         } else {
//           console.warn('Failed to fetch user stats, using sample data');
//           setCountryData([
//             { country: "United States", userCount: 150, latitude: 38.9072, longitude: -77.0369 },
//             { country: "India", userCount: 120, latitude: 28.6139, longitude: 77.2090 },
//             { country: "United Kingdom", userCount: 95, latitude: 51.5074, longitude: -0.1278 },
//             { country: "Germany", userCount: 80, latitude: 52.5200, longitude: 13.4050 },
//             { country: "Canada", userCount: 70, latitude: 45.4215, longitude: -75.6972 },
//             { country: "Australia", userCount: 60, latitude: -35.2809, longitude: 149.1300 },
//           ]);
//         }
//       } catch (error) {
//         console.error('Error fetching user stats:', error);
//         setCountryData([
//           { country: "United States", userCount: 150, latitude: 38.9072, longitude: -77.0369 },
//           { country: "India", userCount: 120, latitude: 28.6139, longitude: 77.2090 },
//           { country: "United Kingdom", userCount: 95, latitude: 51.5074, longitude: -0.1278 },
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserStats();
//   }, []);

//   // Update dimensions
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (canvasRef.current && canvasRef.current.parentElement) {
//         const container = canvasRef.current.parentElement;
//         const containerRect = container.getBoundingClientRect();
//         const size = Math.min(containerRect.width, containerRect.height, window.innerWidth * 0.4, window.innerHeight * 0.6);
//         setDimensions({ width: size, height: size });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     const resizeObserver = new ResizeObserver(updateDimensions);
//     if (canvasRef.current?.parentElement) resizeObserver.observe(canvasRef.current.parentElement);

//     return () => {
//       window.removeEventListener('resize', updateDimensions);
//       resizeObserver.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     let phi = 0;
//     if (!canvasRef.current || countryData.length === 0) return;

//     const markers = countryData.map(country => ({
//       location: [country.latitude, country.longitude] as [number, number],
//       size: Math.max(0.03, Math.min(0.1, country.userCount / 200)),
//       country: country.country,
//       userCount: country.userCount,
//     }));

//     globeRef.current = createGlobe(canvasRef.current, {
//       devicePixelRatio: 2,
//       width: dimensions.width * 2,
//       height: dimensions.height * 2,
//       phi: 0,
//       theta: 0.3,
//       dark: isDarkTheme ? 1 : 0,
//       diffuse: 1.2,
//       mapSamples: 16000,
//       mapBrightness: 6,
//       baseColor: isDarkTheme ? [0.2, 0.3, 0.4] : [0.9, 0.95, 1.0],
//       markerColor: [0.1, 0.7, 0.4],
//       glowColor: isDarkTheme ? [0.8, 0.9, 1.0] : [0.2, 0.4, 0.6],
//       markers,
//       onRender: (state) => {
//         if (isRotating && !pointerInteracting) phi += 0.005;
//         state.phi = phi + r.get();
//         state.width = dimensions.width * 2;
//         state.height = dimensions.height * 2;
//       },
//     });

//     return () => {
//       if (globeRef.current) globeRef.current.destroy();
//     };
//   }, [countryData, pointerInteracting, r, dimensions, isDarkTheme, isRotating]);

//   const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setPointerInteracting(e.pointerId);
//     setPointerInteractionMovement(e.clientX);
//     if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
//   };

//   const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setPointerInteracting(null);
//     if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
//   };

//   const handlePointerOut = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     setPointerInteracting(null);
//     if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
//   };

//   const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     if (pointerInteracting !== null) {
//       const delta = e.clientX - pointerInteractionMovement;
//       setPointerInteractionMovement(e.clientX);
//       api.start({ r: delta / 200 });
//     }
//   };

//   const handleMarkerHover = (location: [number, number]) => {
//     const country = countryData.find(c => c.latitude === location[0] && c.longitude === location[1]);
//     setHoveredCountry(country || null);
//   };

//   if (loading) {
//     return (
//       <div className={`flex items-center justify-center ${className} bg-gradient-to-br from-gray-100 to-gray-200`}>
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`relative w-full h-full ${className} bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden`}
//       style={{ minHeight: '400px' }}
//     >
//       <canvas
//         ref={canvasRef}
//         onPointerDown={handlePointerDown}
//         onPointerUp={handlePointerUp}
//         onPointerOut={handlePointerOut}
//         onPointerMove={handlePointerMove}
//         onMouseMove={(e) => {
//           if (globeRef.current) {
//             const rect = canvasRef.current?.getBoundingClientRect();
//             if (rect) {
//               const x = e.clientX - rect.left;
//               const y = e.clientY - rect.top;
//               const width = rect.width;
//               const height = rect.height;
//               const hoverState = globeRef.current.getHoverState(x, y, width, height);
//               if (hoverState && hoverState.hoveredMarker) {
//                 handleMarkerHover(hoverState.hoveredMarker.location);
//               } else {
//                 setHoveredCountry(null);
//               }
//             }
//           }
//         }}
//         onMouseEnter={() => {
//           if (canvasRef.current) canvasRef.current.style.transform = 'scale(1.05)';
//         }}
//         onMouseLeave={() => {
//           if (canvasRef.current) canvasRef.current.style.transform = 'scale(1)';
//         }}
//         style={{
//           width: '100%',
//           height: '100%',
//           cursor: 'grab',
//           contain: 'layout style size',
//           position: 'absolute',
//           transition: 'transform 0.3s ease',
//         }}
//       />

//       {/* Statistics Overlay */}
//       <div
//         className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl max-w-sm transform transition-all duration-300 hover:shadow-2xl"
//         style={{ zIndex: 20 }}
//         aria-label="Global user statistics"
//       >
//         <h3 className="font-bold text-lg text-gray-800 mb-2">Global User Insights</h3>
//         <div className="grid grid-cols-2 gap-2 text-sm">
//           <p className="text-gray-600">Total Users:</p>
//           <p className="font-semibold text-green-700">{countryData.reduce((sum, c) => sum + c.userCount, 0)}</p>
//           <p className="text-gray-600">Countries:</p>
//           <p className="font-semibold text-green-700">{countryData.length}</p>
//         </div>
//         <div className="mt-3">
//           <p className="text-xs text-gray-500 mb-1">Top 3 Countries:</p>
//           {countryData
//             .sort((a, b) => b.userCount - a.userCount)
//             .slice(0, 3)
//             .map((country, index) => (
//               <div key={country.country} className="text-xs text-gray-600 flex justify-between items-center">
//                 <span>{country.country}</span>
//                 <span className="font-medium text-green-600">{country.userCount}</span>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Theme Toggle */}
//       <button
//         onClick={() => setIsDarkTheme(!isDarkTheme)}
//         className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
//         aria-label="Toggle theme"
//       >
//         {isDarkTheme ? '🌞' : '🌙'}
//       </button>

//       {/* Rotation Toggle */}
//       <button
//         onClick={() => setIsRotating(!isRotating)}
//         className="absolute top-16 right-4 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
//         aria-label="Toggle rotation"
//       >
//         {isRotating ? '⏸️' : '▶️'}
//       </button>

//       {/* Tooltip for Hovered Country */}
//       {hoveredCountry && (
//         <div
//           className="absolute bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-lg text-sm text-gray-800 transform -translate-x-1/2"
//           style={{
//             left: '50%',
//             top: '50%',
//             zIndex: 30,
//             pointerEvents: 'none',
//           }}
//         >
//           {hoveredCountry.country}: {hoveredCountry.userCount} users
//         </div>
//       )}

//       {/* Instructions */}
//       <div
//         className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-md text-xs text-gray-600"
//         style={{ zIndex: 20 }}
//         aria-label="Interaction instructions"
//       >
//         🌍 Drag to rotate • Hover for details • Dots pulse with users
//       </div>
//     </div>
//   );
// };

// export default UserGlobe;




import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { useSpring } from '@react-spring/web';
import axios from 'axios';
import { BASE_URL } from '../config/config';

interface CountryData {
  country: string;
  userCount: number;
  latitude: number;
  longitude: number;
}

interface UserGlobeProps {
  className?: string;
}

const UserGlobe: React.FC<UserGlobeProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [pointerInteracting, setPointerInteracting] = useState<number | null>(null);
  const [pointerInteractionMovement, setPointerInteractionMovement] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isRotating, setIsRotating] = useState(true);

  // Auto-rotation spring
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user-stats/countries`);
        if (response.ok) {
          const data = await response.json();
          setCountryData(data);
        } else {
          console.warn('Failed to fetch user stats, using sample data');
          setCountryData([
            { country: "United States", userCount: 150, latitude: 38.9072, longitude: -77.0369 },
            { country: "India", userCount: 120, latitude: 28.6139, longitude: 77.2090 },
            { country: "United Kingdom", userCount: 95, latitude: 51.5074, longitude: -0.1278 },
            { country: "Germany", userCount: 80, latitude: 52.5200, longitude: 13.4050 },
            { country: "Canada", userCount: 70, latitude: 45.4215, longitude: -75.6972 },
            { country: "Australia", userCount: 60, latitude: -35.2809, longitude: 149.1300 },
          ]);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
        setCountryData([
          { country: "United States", userCount: 150, latitude: 38.9072, longitude: -77.0369 },
          { country: "India", userCount: 120, latitude: 28.6139, longitude: 77.2090 },
          { country: "United Kingdom", userCount: 95, latitude: 51.5074, longitude: -0.1278 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const container = canvasRef.current.parentElement;
        const containerRect = container.getBoundingClientRect();
        const minSize = 300; // Minimum size in pixels
        const width = Math.max(minSize, Math.min(containerRect.width, window.innerWidth * 0.7));
        const height = Math.max(minSize, Math.min(containerRect.height, window.innerHeight * 0.6));
        const size = Math.min(width, height); // Use the smaller dimension
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (canvasRef.current?.parentElement) resizeObserver.observe(canvasRef.current.parentElement);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current || countryData.length === 0) return;

    const markers = countryData.map(country => ({
      location: [country.latitude, country.longitude] as [number, number],
      size: Math.max(0.03, Math.min(0.1, country.userCount / 200)),
      country: country.country,
      userCount: country.userCount,
    }));

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: dimensions.width * 2,
      height: dimensions.height * 2,
      phi: 0,
      theta: 0.3,
      dark: isDarkTheme ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: isDarkTheme ? [0.2, 0.3, 0.4] : [0.9, 0.95, 1.0],
      markerColor: [0.1, 0.7, 0.4],
      glowColor: isDarkTheme ? [0.8, 0.9, 1.0] : [0.2, 0.4, 0.6],
      markers,
      onRender: (state) => {
        if (isRotating && !pointerInteracting) phi += 0.005;
        state.phi = phi + r.get();
        state.width = dimensions.width * 2;
        state.height = dimensions.height * 2;
      },
    });

    return () => {
      if (globeRef.current) globeRef.current.destroy();
    };
  }, [countryData, pointerInteracting, r, dimensions, isDarkTheme, isRotating]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPointerInteracting(e.pointerId);
    setPointerInteractionMovement(e.clientX);
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPointerInteracting(null);
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  };

  const handlePointerOut = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPointerInteracting(null);
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting !== null) {
      const delta = e.clientX - pointerInteractionMovement;
      setPointerInteractionMovement(e.clientX);
      api.start({ r: delta / 200 });
    }
  };

  const handleMarkerHover = (location: [number, number]) => {
    const country = countryData.find(c => c.latitude === location[0] && c.longitude === location[1]);
    setHoveredCountry(country || null);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className} bg-gradient-to-br from-green-50 to-blue-50`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full ${className} bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden flex items-center justify-center`}
      style={{ minHeight: '400px', minWidth: '300px' }}
    >
      <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerOut={handlePointerOut}
          onPointerMove={handlePointerMove}
          onMouseMove={(e) => {
            if (globeRef.current) {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (rect) {
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const width = rect.width;
                const height = rect.height;
                const hoverState = globeRef.current.getHoverState(x, y, width, height);
                if (hoverState && hoverState.hoveredMarker) {
                  handleMarkerHover(hoverState.hoveredMarker.location);
                } else {
                  setHoveredCountry(null);
                }
              }
            }
          }}
          onMouseEnter={() => {
            if (canvasRef.current) canvasRef.current.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={() => {
            if (canvasRef.current) canvasRef.current.style.transform = 'scale(1)';
          }}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: `${dimensions.width}px`,
            maxHeight: `${dimensions.height}px`,
            cursor: 'grab',
            contain: 'layout style size',
            position: 'relative',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      {/* Statistics Overlay */}
      <div
        className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl max-w-sm transform transition-all duration-300 hover:shadow-2xl md:max-w-xs"
        style={{ zIndex: 20 }}
        aria-label="Global user statistics"
      >
        <h3 className="font-bold text-lg text-gray-800 mb-2">Global User Insights</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-600">Total Users:</p>
          <p className="font-semibold text-green-700">{countryData.reduce((sum, c) => sum + c.userCount, 0)}</p>
          <p className="text-gray-600">Countries:</p>
          <p className="font-semibold text-green-700">{countryData.length}</p>
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Top 3 Countries:</p>
          {countryData
            .sort((a, b) => b.userCount - a.userCount)
            .slice(0, 3)
            .map((country, index) => (
              <div key={country.country} className="text-xs text-gray-600 flex justify-between items-center">
                <span>{country.country}</span>
                <span className="font-medium text-green-600">{country.userCount}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {isDarkTheme ? '🌞' : '🌙'}
      </button>

      {/* Rotation Toggle */}
      <button
        onClick={() => setIsRotating(!isRotating)}
        className="absolute top-16 right-4 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        aria-label="Toggle rotation"
      >
        {isRotating ? '⏸️' : '▶️'}
      </button>

      {/* Tooltip for Hovered Country */}
      {hoveredCountry && (
        <div
          className="absolute bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-lg text-sm text-gray-800 transform -translate-x-1/2"
          style={{
            left: '50%',
            top: '50%',
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          {hoveredCountry.country}: {hoveredCountry.userCount} users
        </div>
      )}

      {/* Instructions */}
      <div
        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg p-2 shadow-md text-xs text-gray-600"
        style={{ zIndex: 20 }}
        aria-label="Interaction instructions"
      >
        🌍 Drag to rotate • Hover for details • Dots pulse with users
      </div>
    </div>
  );
};

export default UserGlobe;