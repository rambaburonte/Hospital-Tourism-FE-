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
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [pointerInteracting, setPointerInteracting] = useState<number | null>(null);
  const [pointerInteractionMovement, setPointerInteractionMovement] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

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
          // Sample data for demonstration
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
        // Fallback sample data
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
  // Update dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const container = canvasRef.current.parentElement;
        const containerRect = container.getBoundingClientRect();
        
        // Use the smaller dimension to ensure the globe fits properly
        const size = Math.min(containerRect.width, containerRect.height, window.innerWidth * 0.4, window.innerHeight * 0.6);
        
        setDimensions({
          width: size,
          height: size
        });
      }
    };

    // Initial size calculation
    updateDimensions();

    // Update on window resize
    window.addEventListener('resize', updateDimensions);
    
    // Use ResizeObserver for more accurate container size detection
    let resizeObserver: ResizeObserver | null = null;
    if (canvasRef.current && canvasRef.current.parentElement) {
      resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current || countryData.length === 0) return;// Convert country data to markers for cobe
    const markers = countryData.map(country => ({
      location: [country.latitude, country.longitude] as [number, number],
      size: Math.max(0.03, Math.min(0.1, country.userCount / 200)), // Scale marker size based on user count
      country: country.country,
      userCount: country.userCount,
    }));    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: dimensions.width * 2,
      height: dimensions.height * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.2, 0.3, 0.4], // Professional blue-grey for continents
      markerColor: [0.1, 0.7, 0.4], // Medical green for user markers
      glowColor: [0.8, 0.9, 1.0], // Subtle light blue glow
      markers,
      onRender: (state) => {
        // Auto-rotate
        if (!pointerInteracting) {
          phi += 0.005;
        }
        state.phi = phi + r.get();
        
        // Update pointer interaction with dynamic dimensions
        state.width = dimensions.width * 2;
        state.height = dimensions.height * 2;
      },
    });return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, [countryData, pointerInteracting, r, dimensions]);

  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current) {
        globeRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPointerInteracting(e.pointerId);
    setPointerInteractionMovement(0);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPointerInteracting(null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerOut = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPointerInteracting(null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerInteracting !== null) {
      const delta = e.clientX - pointerInteractionMovement;
      setPointerInteractionMovement(e.clientX);
      api.start({ r: delta / 200 });
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className={`relative w-full h-full ${className}`} style={{ zIndex: 10 }}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerOut}
        onPointerMove={handlePointerMove}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout style size',
          position: 'relative',
          zIndex: 1,
        }}
      />
        {/* Statistics overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs" style={{ zIndex: 20 }}>
        <h3 className="font-semibold text-gray-800 mb-2">Global Users</h3>
        <div className="space-y-1 text-sm">
          <p className="text-gray-600">
            Total Users: <span className="font-medium">{countryData.reduce((sum, country) => sum + country.userCount, 0)}</span>
          </p>
          <p className="text-gray-600">
            Countries: <span className="font-medium">{countryData.length}</span>
          </p>
        </div>
        
        {/* Top countries */}
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Top Countries:</p>
          {countryData
            .sort((a, b) => b.userCount - a.userCount)
            .slice(0, 3)
            .map((country, index) => (
              <div key={country.country} className="text-xs text-gray-600 flex justify-between">
                <span>{country.country}</span>
                <span className="font-medium">{country.userCount}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg" style={{ zIndex: 20 }}>
        <p className="text-xs text-gray-600">
          🌍 Drag to rotate • Dots show user locations
        </p>
      </div>
    </div>
  );
};

export default UserGlobe;
