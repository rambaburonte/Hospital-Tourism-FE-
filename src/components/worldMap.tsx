import React from "react";

type CountryUserData = {
  country: string;
  count: number;
  top: number;  // % from top
  left: number; // % from left
};

const countries: CountryUserData[] = [
  { country: "USA", count: 1042, top: 38, left: 23 },
  { country: "India", count: 875, top: 50, left: 68 },
  { country: "China", count: 690, top: 42, left: 76 },
  { country: "Dubai", count: 132, top: 45, left: 59 },
  { country: "South Korea", count: 289, top: 40, left: 82 },
];

const WorldUserHeatmap: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* World Map */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution_gray_political.png/1600px-World_map_-_low_resolution_gray_political.png"
        alt="World Map"
        className="w-full h-auto rounded-xl shadow-lg"
      />

      {/* Country User Counters */}
      {countries.map((country, idx) => (
        <div
          key={idx}
          className="absolute flex flex-col items-center text-xs text-white"
          style={{
            top: `${country.top}%`,
            left: `${country.left}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-blue-600 px-2 py-1 rounded-full shadow-md text-center font-semibold">
            {country.count}
          </div>
          <span className="mt-1 text-[10px] font-medium text-black">
            {country.country}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WorldUserHeatmap;
