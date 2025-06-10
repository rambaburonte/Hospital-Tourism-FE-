// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from './sidebar'; // Include this only if you are using a sidebar

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
// }

// const ChefList: React.FC = () => {
//   const [chefs, setChefs] = useState<Chef[]>([]);
//   const [loading, setLoading] = useState(true);
// const base_url="https://healthtourism-5.onrender.com"
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/chefs')
//       .then(res => {
//         setChefs(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching chefs:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-64 w-full bg-gray-100 min-h-screen py-10 px-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Chefs</h1>

//         {loading ? (
//           <p className="text-gray-600">Loading chefs...</p>
//         ) : chefs.length === 0 ? (
//           <p className="text-gray-600">No chefs available.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {chefs.map(chef => (
//               <div key={chef.chefID} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all">
//                 <img
//                   src={chef.chefImage}
//                   alt={chef.chefName}
//                   className="w-full h-48 object-cover rounded-md mb-4"
//                 />
//                 <h2 className="text-xl font-semibold text-gray-900">{chef.chefName}</h2>
//                 <p className="text-gray-700 mt-2">{chef.chefDescription}</p>
//                 <p className="text-sm text-gray-500 mt-2"><strong>Experience:</strong> {chef.experience} years</p>
//                 <p className="text-sm text-gray-500"><strong>Styles:</strong> {chef.styles}</p>
//                 <div className="flex items-center mt-3">
//                   <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   <span className="text-gray-700 font-medium">{chef.chefRating}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChefList;


// import React, { useEffect, useState } from 'react';

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string | null;
//   serviceId: string | null;
//   bookedByUserId: string | null;
// }

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   price: number;
//   locationId: string | null;
//   slots: Slot[];
//   status: string | null;
// }

// const ChefList: React.FC = () => {
//   const [chefs, setChefs] = useState<Chef[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchChefs = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/chefs');
//         if (!response.ok) {
//           throw new Error('Failed to fetch chefs data');
//         }
//         const data: Chef[] = await response.json();
//         setChefs(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChefs();
//   }, []);

//   if (loading) {
//     return <div className="text-center p-4">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center p-4 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Chefs</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {chefs.map((chef) => (
//           <div
//             key={chef.chefID}
//             className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 duration-300"
//           >
//             <img
//               src={chef.chefImage}
//               alt={chef.chefName}
//               className="w-full h-48 object-cover"
//               onError={(e) => {
//                 e.currentTarget.src = 'https://via.placeholder.com/300x200';
//               }}
//             />
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{chef.chefName}</h2>
//               <p className="text-gray-600 mb-4">{chef.chefDescription}</p>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-yellow-500 font-semibold">Rating: {chef.chefRating} ★</span>
//                 <span className="text-gray-500">Exp: {chef.experience}</span>
//               </div>
//               <p className="text-gray-700 mb-2">Styles: {chef.styles}</p>
//               <p className="text-green-600 font-bold mb-4">Price: ${chef.price.toFixed(2)}</p>
//               {chef.slots.length > 0 ? (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-semibold text-gray-800">Available Slots:</h3>
//                   <ul className="list-disc list-inside text-gray-600 max-h-40 overflow-y-auto">
//                     {chef.slots.map((slot) => (
//                       <li key={slot.id} className="mt-1">
//                         {slot.slotTime} - {slot.bookingStatus}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No slots available</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChefList;


// import React, { useEffect, useState } from 'react';

// interface Slot {
//   id: number;
//   slotTime: string;
//   bookingStatus: string;
//   serviceType: string | null;
//   serviceId: string | null;
//   bookedByUserId: string | null;
// }

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   price: number;
//   locationId: string | null;
//   slots: Slot[];
//   status: string | null;
// }

// const ChefList: React.FC = () => {
//   const [chefs, setChefs] = useState<Chef[]>([]);
//   const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [openSlots, setOpenSlots] = useState<{ [key: number]: boolean }>({});

//   useEffect(() => {
//     const fetchChefs = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/chefs');
//         if (!response.ok) {
//           throw new Error('Failed to fetch chefs data');
//         }
//         const data: Chef[] = await response.json();
//         setChefs(data);
//         setFilteredChefs(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChefs();
//   }, []);

//   useEffect(() => {
//     const filtered = chefs.filter(
//       (chef) =>
//         chef.chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         chef.styles.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredChefs(filtered);
//   }, [searchTerm, chefs]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const toggleSlots = (chefID: number) => {
//     setOpenSlots((prev) => ({
//       ...prev,
//       [chefID]: !prev[chefID],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6">
//         <p className="text-red-600 text-base font-semibold">{error}</p>
//         <button
//           className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
//         Chef Management Dashboard
//       </h1>

//       {/* Search Bar */}
//       <div className="mb-6 max-w-md mx-auto">
//         <input
//           type="text"
//           placeholder="Search by chef name or cuisine style..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-full p-2.5 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
//         />
//       </div>

//       {/* Chef Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
//         {filteredChefs.length > 0 ? (
//           filteredChefs.map((chef) => (
//             <div
//               key={chef.chefID}
//               className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
//             >
//               <div className="relative">
//                 <img
//                   src={chef.chefImage}
//                   alt={chef.chefName}
//                   className="w-full h-36 object-cover"
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/300x150?text=Chef+Image';
//                   }}
//                 />
//                 <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-bl-md">
//                   {chef.chefRating} ★
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-1.5">{chef.chefName}</h2>
//                 <p className="text-gray-600 text-xs mb-2 line-clamp-2">{chef.chefDescription}</p>
//                 <div className="grid grid-cols-2 gap-1.5 mb-2 text-xs">
//                   <span className="text-gray-500">Exp: {chef.experience}</span>
//                   <span className="text-gray-500">Styles: {chef.styles}</span>
//                   <span className="text-gray-500 col-span-2">Price: ${chef.price.toFixed(2)}</span>
//                 </div>
//                 <button
//                   onClick={() => toggleSlots(chef.chefID)}
//                   className="w-full py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-xs"
//                 >
//                   {openSlots[chef.chefID] ? 'Hide Slots' : 'View Slots'}
//                 </button>
//                 {openSlots[chef.chefID] && (
//                   <div className="mt-3">
//                     <h3 className="text-xs font-semibold text-gray-800 mb-1.5">Available Slots:</h3>
//                     {chef.slots.length > 0 ? (
//                       <div className="max-h-28 overflow-y-auto pr-1.5">
//                         {chef.slots.map((slot) => (
//                           <div
//                             key={slot.id}
//                             className="flex justify-between items-center py-1 text-xs text-gray-600 border-b border-gray-200"
//                           >
//                             <span>{slot.slotTime}</span>
//                             <span
//                               className={`${
//                                 slot.bookingStatus === 'AVAILABLE'
//                                   ? 'text-green-600'
//                                   : 'text-red-600'
//                               } font-medium`}
//                             >
//                               {slot.bookingStatus}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-xs">No slots available</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-500 text-base">
//             No chefs found matching your search.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChefList;/


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Slot {
  id: number;
  slotTime: string;
  bookingStatus: string;
  serviceType: string | null;
  serviceId: string | null;
  bookedByUserId: string | null;
}

interface Chef {
  chefID: number;
  chefName: string;
  chefDescription: string;
  chefImage: string;
  chefRating: string;
  experience: string;
  styles: string;
  price: number;
  locationId: string | null;
  slots: Slot[];
  status: string | null;
}

const ChefList: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [filteredChefs, setFilteredChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/chefs');
        if (!response.ok) {
          throw new Error('Failed to fetch chefs data');
        }
        const data: Chef[] = await response.json();
        setChefs(data);
        setFilteredChefs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  useEffect(() => {
    const filtered = chefs.filter(
      (chef) =>
        chef.chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chef.styles.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChefs(filtered);
  }, [searchTerm, chefs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const openSlotsModal = (chef: Chef) => {
    setSelectedChef(chef);
  };

  const closeSlotsModal = () => {
    setSelectedChef(null);
  };

  const handleUpdate = (chefID: number) => {
    navigate(`/update-chef/${chefID}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 text-base font-semibold">{error}</p>
        <button
          className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
        Chef Management Dashboard
      </h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by chef name or cuisine style..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2.5 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
        />
      </div>

      {/* Chef Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredChefs.length > 0 ? (
          filteredChefs.map((chef) => (
            <div
              key={chef.chefID}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="relative">
                <img
                  src={chef.chefImage}
                  alt={chef.chefName}
                  className="w-full h-36 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x150?text=Chef+Image';
                  }}
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-bl-md">
                  {chef.chefRating} ★
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1.5">{chef.chefName}</h2>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{chef.chefDescription}</p>
                <div className="grid grid-cols-2 gap-1.5 mb-2 text-xs">
                  <span className="text-gray-500">Exp: {chef.experience}</span>
                  <span className="text-gray-500">Styles: {chef.styles}</span>
                  <span className="text-gray-500 col-span-2">Price: ${chef.price.toFixed(2)}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openSlotsModal(chef)}
                    className="flex-1 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-xs"
                  >
                    View Slots
                  </button>
                  <button
                    onClick={() => handleUpdate(chef.chefID)}
                    className="flex-1 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium text-xs"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-base">
            No chefs found matching your search.
          </div>
        )}
      </div>

      {/* Slots Modal */}
      {selectedChef && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeSlotsModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedChef.chefName}'s Available Slots
            </h2>
            {selectedChef.slots.length > 0 ? (
              <div className="space-y-2">
                {selectedChef.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-200"
                  >
                    <span>{slot.slotTime}</span>
                    <span
                      className={`${
                        slot.bookingStatus === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'
                      } font-medium`}
                    >
                      {slot.bookingStatus}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No slots available</p>
            )}
            <button
              onClick={closeSlotsModal}
              className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefList;