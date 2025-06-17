// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number;
//   medicineQuantity: number;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineCatalog: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [sortOrder, setSortOrder] = useState<string>('low to high');

//   useEffect(() => {
//     axios
//       .get<Medicine[]>('http://localhost:8080/cart-item/user/capsules-user')
//       .then((res) => {
//         const sortedMedicines = res.data.sort((a: Medicine, b: Medicine) => {
//           const currentDate = new Date();
//           const aExpired = new Date(a.medicineExpiryDate) < currentDate;
//           const bExpired = new Date(b.medicineExpiryDate) < currentDate;

//           if (aExpired && !bExpired) return -1;
//           if (!aExpired && bExpired) return 1;

//           const aExpiringSoon = new Date(a.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//           const bExpiringSoon = new Date(b.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

//           if (aExpiringSoon && !bExpiringSoon) return -1;
//           if (!aExpiringSoon && bExpiringSoon) return 1;

//           return sortOrder === 'low to high'
//             ? a.medicinePrice - b.medicinePrice
//             : b.medicinePrice - a.medicinePrice;
//         });
//         setMedicines(sortedMedicines);
//       })
//       .catch((err) => console.error('Error fetching medicines:', err));
//   }, [sortOrder]);

//   const groupedMedicines = medicines.reduce((acc: { [key: string]: Medicine[] }, medicine) => {
//     const category = medicine.medicineCategory || 'Other';
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(medicine);
//     return acc;
//   }, {});

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOrder(e.target.value);
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Top Navigation Bar */}
//       <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
//         <div className="flex items-center">
//           <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
//         </div>
//         <div className="flex space-x-6">
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Categories</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Orders</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Prescriptions</a>
//           <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">FAQ</a>
//         </div>
//         <div className="flex items-center space-x-4">
//           <span className="text-gray-600 text-sm">Herbal</span>
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600 text-sm">🛒 12</span>
//           </div>
//         </div>
//       </nav>

//       <div className="flex flex-1">
//         <div className="flex-1 py-6 px-6 sm:px-8 lg:px-12 flex">
//           {/* Main Content Area */}
//           <div className="flex-1">
//             {/* Search and Sort Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Product search for "Herbal"</h2>
//                 <p className="text-sm text-gray-600">Found {medicines.length} products</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <label className="text-sm text-gray-600">Sort by price:</label>
//                 <select
//                   value={sortOrder}
//                   onChange={handleSortChange}
//                   className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-600"
//                 >
//                   <option value="low to high">low to high</option>
//                   <option value="high to low">high to low</option>
//                 </select>
//               </div>
//             </div>

//             {medicines.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded">
//                 <p className="text-gray-500 text-sm">No medicines found.</p>
//               </div>
//             ) : (
//               Object.keys(groupedMedicines).map((category) => (
//                 <div key={category} className="mb-8">
//                   <h3 className="text-md font-semibold text-gray-800 mb-4">{category}</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {groupedMedicines[category].map((medicine) => (
//                       <div
//                         key={medicine.madicineid}
//                         className="bg-transparent relative border border-gray-200"
//                       >
//                         <div className="relative h-32">
//                           <img
//                             src={medicine.medicineImage}
//                             alt={medicine.medicineName}
//                             className="w-full h-full object-contain"
//                             onError={(e) =>
//                               (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
//                             }
//                           />
//                           {new Date(medicine.medicineExpiryDate) < new Date() ? (
//                             <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
//                               Expired
//                             </span>
//                           ) : new Date(medicine.medicineExpiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
//                             <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded">
//                               Expiring Soon
//                             </span>
//                           ) : null}
//                         </div>
//                         <div className="p-2 text-green-700">
//                           <h4 className="text-sm font-semibold">{medicine.medicineName}</h4>
//                           <p className="text-xs line-clamp-2 mb-1">
//                             {medicine.medicineType} - {medicine.medicineCategory}
//                           </p>
//                           <p className="text-xs line-clamp-2 mb-1">{medicine.medicineDescription}</p>
//                           <p className="text-sm font-bold mb-1">
//                             ₹{medicine.medicinePrice.toFixed(2)}
//                           </p>
//                           <p className="text-xs">
//                             Exp: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                           </p>
//                           <p className="text-xs">Mfg: {medicine.medicineManufacturer}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Filter Sidebar */}
//           <div className="w-64 bg-gray-50 p-4 shadow-md ml-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-4">Pharmaceutical Form</h3>
//             <h3 className="text-sm font-semibold text-gray-800 mb-2">Prescription Type</h3>
//             <div className="space-y-2">
//               <label className="flex items-center">
//                 <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded" />
//                 <span className="text-sm text-gray-600">prescription</span>
//               </label>
//               <label className="flex items-center">
//                 <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded" />
//                 <span className="text-sm text-gray-600">without prescription</span>
//               </label>
//             </div>

//             <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-2">Categories</h3>
//             <div className="space-y-2">
//               {[
//                 'animal-free',
//                 'herbal',
//                 'vegan',
//                 'allergy',
//                 'eyes, nose & ears',
//                 'dental & oral care',
//                 'diabetes',
//                 'colds',
//                 'cosmetics',
//                 'family',
//                 'fitness',
//                 'heart, circulation & veins',
//                 'home & travel pharmacy',
//                 'home care',
//                 'homoeopathy',
//                 'medical devices',
//                 'muscles, bones & joints',
//                 'calm & sleep'
//               ].map((category) => (
//                 <label key={category} className="flex items-center">
//                   <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded" />
//                   <span className="text-sm text-gray-600">{category}</span>
//                 </label>
//               ))}
//             </div>

//             <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-2">Price</h3>
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>8,99€</span>
//               <span>3799€</span>
//             </div>
//             <input
//               type="range"
//               min="8.99"
//               max="3799"
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               style={{
//                 background: 'linear-gradient(to right, #2563EB 0%, #2563EB 50%, #D1D5DB 50%, #D1D5DB 100%)'
//               }}
//               disabled
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCatalog;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number;
//   medicineQuantity: number;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// const MedicineCatalog: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [sortOrder, setSortOrder] = useState<string>('low to high');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [cartCount, setCartCount] = useState<number>(0);

//   const userId = 17; // Replace with dynamic ID if needed
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .get<Medicine[]>('http://localhost:8080/cart-item/user/capsules-user')
//       .then((res) => {
//         setMedicines(res.data);
//       })
//       .catch((err) => console.error('Error fetching medicines:', err));
//   }, []);

//   const addToCart = (medicineId: number, qty: number) => {
//     axios
//       .post(`http://localhost:8080/cart-item/user/cart/add?userId=${userId}&madicineid=${medicineId}&qty=${qty}`)
//       .then(() => setCartCount((prev) => prev + 1))
//       .catch((err) => console.error('Add to cart failed:', err));
//   };

//   const isExpired = (date: string) => new Date(date) < new Date();

//   const isExpiringSoon = (date: string) => {
//     const now = new Date();
//     const expiry = new Date(date);
//     return expiry > now && expiry < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
//   };

//   const filteredMedicines = medicines
//     .filter((m) =>
//       m.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategories.length === 0 || selectedCategories.includes(m.medicineCategory))
//     )
//     .sort((a, b) => {
//       return sortOrder === 'low to high'
//         ? a.medicinePrice - b.medicinePrice
//         : b.medicinePrice - a.medicinePrice;
//     });

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory)));

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
//         <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border px-2 py-1 text-sm rounded"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <span className="text-sm">🛒 {cartCount}</span>
//         </div>
//       </nav>

//       <div className="flex flex-1 flex-col lg:flex-row">
//         {/* Sidebar Filters */}
//         <div className="w-full lg:w-64 bg-gray-50 p-4 border-r">
//           <h3 className="text-sm font-semibold mb-2">Categories</h3>
//           <div className="space-y-2">
//             {categories.map((category) => (
//               <label key={category} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => handleCategoryChange(category)}
//                 />
//                 <span className="text-sm text-gray-600">{category}</span>
//               </label>
//             ))}
//           </div>

//           <div className="mt-4">
//             <label className="text-sm text-gray-600">Sort by price:</label>
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="w-full border px-2 py-1 text-sm rounded"
//             >
//               <option value="low to high">Low to High</option>
//               <option value="high to low">High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//           {filteredMedicines.length === 0 ? (
//             <p className="text-center col-span-full text-gray-500">No products found.</p>
//           ) : (
//             filteredMedicines.map((medicine) => {
//               const expired = isExpired(medicine.medicineExpiryDate);
//               const expiringSoon = isExpiringSoon(medicine.medicineExpiryDate);
//               return (
//                 <div
//                   key={medicine.madicineid}
//                   className={`border rounded overflow-hidden relative text-xs ${
//                     expired ? 'opacity-50 filter blur-sm hover:blur-none transition' : ''
//                   }`}
//                 >
//                   <div className="relative h-28 bg-white">
//                     <img
//                       src={medicine.medicineImage}
//                       alt={medicine.medicineName}
//                       className="w-full h-full object-contain"
//                       onError={(e) =>
//                         (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
//                       }
//                     />
//                     {expired && (
//                       <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded">
//                         Expired
//                       </span>
//                     )}
//                     {!expired && expiringSoon && (
//                       <span className="absolute top-1 right-1 bg-yellow-600 text-white text-[10px] px-1 py-0.5 rounded">
//                         Expiring Soon
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-1 text-gray-700">
//                     <h4 className="font-semibold text-sm truncate">{medicine.medicineName}</h4>
//                     <p className="text-[11px] truncate">
//                       {medicine.medicineType} - {medicine.medicineCategory}
//                     </p>
//                     <p className="text-[11px] line-clamp-2">{medicine.medicineDescription}</p>
//                     <p className="font-bold mt-1">₹{medicine.medicinePrice.toFixed(2)}</p>
//                     <p className="text-[11px]">
//                       Exp: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                     </p>
//                     <p className="text-[11px]">Mfg: {medicine.medicineManufacturer}</p>
//                     <button
//                       disabled={expired}
//                       onClick={() => addToCart(medicine.madicineid, 1)}
//                       className={`mt-1 w-full px-2 py-1 text-xs rounded ${
//                         expired
//                           ? 'bg-gray-400 text-white cursor-not-allowed'
//                           : 'bg-blue-600 hover:bg-blue-700 text-white'
//                       }`}
//                     >
//                       {expired ? 'Not Available' : 'Add to Cart'}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCatalog;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number;
//   medicineQuantity: number;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// interface User {
//   id: number; // Adjust this if your user ID key is different
//   // add other user fields if needed
// }

// const MedicineCatalog: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [sortOrder, setSortOrder] = useState<string>('low to high');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [cartCount, setCartCount] = useState<number>(0);

//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .get<Medicine[]>('https://healthtourism-5.onrender.com/cart-item/user/capsules-user')
//       .then((res) => {
//         setMedicines(res.data);
//       })
//       .catch((err) => console.error('Error fetching medicines:', err));
//   }, []);

//   const addToCart = (medicineId: number, qty: number) => {
//     if (!user) {
//       alert('Please login to add items to cart.');
//       return;
//     }
//     axios
//       .post(`https://healthtourism-5.onrender.com/cart-item/user/cart/add?userId=${user.id}&madicineid=${medicineId}&qty=${qty}`)
//       .then(() => setCartCount((prev) => prev + 1))
//       .catch((err) => console.error('Add to cart failed:', err));
//   };

//   const isExpired = (date: string) => new Date(date) < new Date();

//   const isExpiringSoon = (date: string) => {
//     const now = new Date();
//     const expiry = new Date(date);
//     return expiry > now && expiry < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
//   };

//   const filteredMedicines = medicines
//     .filter((m) =>
//       m.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategories.length === 0 || selectedCategories.includes(m.medicineCategory))
//     )
//     .sort((a, b) => {
//       return sortOrder === 'low to high'
//         ? a.medicinePrice - b.medicinePrice
//         : b.medicinePrice - a.medicinePrice;
//     });

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory)));

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
//         <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border px-2 py-1 text-sm rounded"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//             <span
//     onClick={() => navigate('/usercart')}
//     className="text-sm cursor-pointer"
//     title="Go to Cart"
//   >
//     🛒 {cartCount}
//   </span>
//         </div>
//       </nav>

//       <div className="flex flex-1 flex-col lg:flex-row">
//         {/* Sidebar Filters */}
//         <div className="w-full lg:w-64 bg-gray-50 p-4 border-r">
//           <h3 className="text-sm font-semibold mb-2">Categories</h3>
//           <div className="space-y-2">
//             {categories.map((category) => (
//               <label key={category} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => handleCategoryChange(category)}
//                 />
//                 <span className="text-sm text-gray-600">{category}</span>
//               </label>
//             ))}
//           </div>

//           <div className="mt-4">
//             <label className="text-sm text-gray-600">Sort by price:</label>
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="w-full border px-2 py-1 text-sm rounded"
//             >
//               <option value="low to high">Low to High</option>
//               <option value="high to low">High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//           {filteredMedicines.length === 0 ? (
//             <p className="text-center col-span-full text-gray-500">No products found.</p>
//           ) : (
//             filteredMedicines.map((medicine) => {
//               const expired = isExpired(medicine.medicineExpiryDate);
//               const expiringSoon = isExpiringSoon(medicine.medicineExpiryDate);
//               return (
//                 <div
//                   key={medicine.madicineid}
//                   className={`border rounded overflow-hidden relative text-xs ${
//                     expired ? 'opacity-50 filter blur-sm hover:blur-none transition' : ''
//                   }`}
//                 >
//                   <div className="relative h-28 bg-white">
//                     <img
//                       src={medicine.medicineImage}
//                       alt={medicine.medicineName}
//                       className="w-full h-full object-contain"
//                       onError={(e) =>
//                         (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
//                       }
//                     />
//                     {expired && (
//                       <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded">
//                         Expired
//                       </span>
//                     )}
//                     {!expired && expiringSoon && (
//                       <span className="absolute top-1 right-1 bg-yellow-600 text-white text-[10px] px-1 py-0.5 rounded">
//                         Expiring Soon
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-1 text-gray-700">
//                     <h4 className="font-semibold text-sm truncate">{medicine.medicineName}</h4>
//                     <p className="text-[11px] truncate">
//                       {medicine.medicineType} - {medicine.medicineCategory}
//                     </p>
//                     <p className="text-[11px] line-clamp-2">{medicine.medicineDescription}</p>
//                     <p className="font-bold mt-1">₹{medicine.medicinePrice.toFixed(2)}</p>
//                     <p className="text-[11px]">
//                       Exp: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                     </p>
//                     <p className="text-[11px]">Mfg: {medicine.medicineManufacturer}</p>
//                     <button
//                       disabled={expired}
//                       onClick={() => addToCart(medicine.madicineid, 1)}
//                       className={`mt-1 w-full px-2 py-1 text-xs rounded ${
//                         expired
//                           ? 'bg-gray-400 text-white cursor-not-allowed'
//                           : 'bg-blue-600 hover:bg-blue-700 text-white'
//                       }`}
//                     >
//                       {expired ? 'Not Available' : 'Add to Cart'}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCatalog;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';


// interface Medicine {
//   madicineid: number;
//   medicineName: string;
//   medicineType: string;
//   medicineDescription: string;
//   medicinePrice: number;
//   medicineQuantity: number;
//   medicineExpiryDate: string;
//   medicineManufacturer: string;
//   medicineImage: string;
//   medicineCategory: string;
// }

// interface User {
//   id: number; // Adjust this if your user ID key is different
//   // add other user fields if needed
// }

// const MedicineCatalog: React.FC = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [sortOrder, setSortOrder] = useState<string>('low to high');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [cartCount, setCartCount] = useState<number>(0);

//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .get<Medicine[]>(`${BASE_URL}/cart-item/user/capsules-user`)
//       .then((res) => {
//         setMedicines(res.data);
//       })
//       .catch((err) => console.error('Error fetching medicines:', err));
//   }, []);

//   const addToCart = (medicineId: number, qty: number) => {
//     if (!user) {
//       alert('Please login to add items to cart.');
//       return;
//     }
//     axios
//       .post(`${BASE_URL}/cart-item/user/cart/add?userId=${user.id}&madicineid=${medicineId}&qty=${qty}`)
//       .then(() => setCartCount((prev) => prev + 1))
//       .catch((err) => console.error('Add to cart failed:', err));
//   };

//   const isExpired = (date: string) => new Date(date) < new Date();

//   const isExpiringSoon = (date: string) => {
//     const now = new Date();
//     const expiry = new Date(date);
//     return expiry > now && expiry < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
//   };

//   const filteredMedicines = medicines
//     .filter((m) =>
//       m.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       (selectedCategories.length === 0 || selectedCategories.includes(m.medicineCategory))
//     )
//     .sort((a, b) => {
//       return sortOrder === 'low to high'
//         ? a.medicinePrice - b.medicinePrice
//         : b.medicinePrice - a.medicinePrice;
//     });

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//     );
//   };

//   const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory)));

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-gray-50 py-4 px-6 flex justify-between items-center border-b border-gray-200">
//         <h1 className="text-lg font-bold text-gray-800">Medical Visions</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border px-2 py-1 text-sm rounded"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <span
//             onClick={() => navigate('/usercart')}
//             className="text-sm cursor-pointer"
//             title="Go to Cart"
//           >
//             🛒 {cartCount}
//           </span>
//         </div>
//       </nav>

//       <div className="flex flex-1 flex-col lg:flex-row">
//         {/* Sidebar Filters */}
//         <div className="w-full lg:w-64 bg-gray-50 p-4 border-r">
//           <h3 className="text-sm font-semibold mb-2">Categories</h3>
//           <div className="space-y-2">
//             {categories.map((category) => (
//               <label key={category} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selectedCategories.includes(category)}
//                   onChange={() => handleCategoryChange(category)}
//                 />
//                 <span className="text-sm text-gray-600">{category}</span>
//               </label>
//             ))}
//           </div>

//           <div className="mt-4">
//             <label className="text-sm text-gray-600">Sort by price:</label>
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="w-full border px-2 py-1 text-sm rounded"
//             >
//               <option value="low to high">Low to High</option>
//               <option value="high to low">High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//           {filteredMedicines.length === 0 ? (
//             <p className="text-center col-span-full text-gray-500">No products found.</p>
//           ) : (
//             filteredMedicines.map((medicine) => {
//               const expired = isExpired(medicine.medicineExpiryDate);
//               const expiringSoon = isExpiringSoon(medicine.medicineExpiryDate);
//               return (
//                 <div
//                   key={medicine.madicineid}
//                   className={`border rounded overflow-hidden relative text-xs ${
//                     expired ? 'opacity-50' : ''
//                   }`}
//                 >
//                   <div className="relative h-28 bg-white">
//                     <img
//                       src={medicine.medicineImage}
//                       alt={medicine.medicineName}
//                       className="w-full h-full object-contain"
//                       onError={(e) =>
//                         (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
//                       }
//                     />
//                     {expired && (
//                       <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded">
//                         Expired
//                       </span>
//                     )}
//                     {!expired && expiringSoon && (
//                       <span className="absolute top-1 right-1 bg-yellow-600 text-white text-[10px] px-1 py-0.5 rounded">
//                         Expiring Soon
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-1 text-gray-700">
//                     <h4 className="font-semibold text-sm truncate">{medicine.medicineName}</h4>
//                     <p className="text-[11px] truncate">
//                       {medicine.medicineType} - {medicine.medicineCategory}
//                     </p>
//                     <p className="text-[11px] line-clamp-2">{medicine.medicineDescription}</p>
//                     <p className="font-bold mt-1">₹{medicine.medicinePrice.toFixed(2)}</p>
//                     <p className="text-[11px]">
//                       Exp: {new Date(medicine.medicineExpiryDate).toLocaleDateString()}
//                     </p>
//                     <p className="text-[11px]">Mfg: {medicine.medicineManufacturer}</p>
//                     <button
//                       disabled={expired}
//                       onClick={() => addToCart(medicine.madicineid, 1)}
//                       className={`mt-1 w-full px-2 py-1 text-xs rounded ${
//                         expired
//                           ? 'bg-gray-400 text-white cursor-not-allowed'
//                           : 'bg-blue-600 hover:bg-blue-700 text-white'
//                       }`}
//                     >
//                       {expired ? 'Not Available' : 'Add to Cart'}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCatalog;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/config/config';

// Placeholder hero image (replace with your actual image URL)
const heroImage = 'https://via.placeholder.com/400x500?text=Doctor';

interface Medicine {
  madicineid: number;
  medicineName: string;
  medicineType: string;
  medicineDescription: string;
  medicinePrice: number;
  medicineQuantity: number;
  medicineExpiryDate: string;
  medicineManufacturer: string;
  medicineImage: string;
  medicineCategory: string;
}

interface User {
  id: number;
}

const MedicineCatalog: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('low to high');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    axios
      .get<Medicine[]>(`${BASE_URL}/cart-item/user/capsules-user`)
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => console.error('Error fetching medicines:', err));
  }, []);

  const addToCart = (medicineId: number, qty: number) => {
    if (!user) {
      alert('Please login to add items to cart.');
      return;
    }
    axios
      .post(`${BASE_URL}/cart-item/user/cart/add?userId=${user.id}&madicineid=${medicineId}&qty=${qty}`)
      .then(() => setCartCount((prev) => prev + 1))
      .catch((err) => console.error('Add to cart failed:', err));
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  const isExpiringSoon = (date: string) => {
    const now = new Date();
    const expiry = new Date(date);
    return expiry > now && expiry < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  };

  const filteredMedicines = medicines
    .filter((m) =>
      m.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(m.medicineCategory))
    )
    .sort((a, b) => {
      return sortOrder === 'low to high'
        ? a.medicinePrice - b.medicinePrice
        : b.medicinePrice - a.medicinePrice;
    });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const categories = Array.from(new Set(medicines.map((m) => m.medicineCategory)));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-blue-500 mr-1">✨</span> Mecura
        </h1>
        <div className="flex items-center space-x-6">
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Home</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Doctor</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Services</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Stores</span>
          <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Insights</span>
          <span
            onClick={() => navigate('/usercart')}
            className="text-sm cursor-pointer flex items-center"
            title="Go to Cart"
          >
            🛒 <span className="ml-1">{cartCount}</span>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-pink-50 py-12 px-6 flex items-center justify-between">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Pharmacy</h1>
          <div className="flex items-center bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="text-4xl font-bold text-gray-800 mr-4">98.5</div>
            <div>
              <p className="text-sm text-gray-600">Insights by Dr. Bryan Smith</p>
              <p className="text-xs text-gray-500">Cures every medicine-related problem</p>
              <button className="mt-2 text-blue-600 font-semibold text-sm">Shop Now →</button>
            </div>
          </div>
        </div>
        <img src={heroImage} alt="Doctor" className="w-1/3 rounded-lg" />
      </div>

      {/* Categories Section */}
      <div className="py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Popular Categories</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              <div
                className={`w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 ${
                  selectedCategories.includes(category) ? 'border-2 border-blue-600' : ''
                }`}
              >
                <span className="text-gray-600 text-sm">{category.charAt(0)}</span>
              </div>
              <span className="text-sm text-gray-600">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Sort */}
      <div className="px-6 py-4 flex justify-between items-center bg-white border-t border-b border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-lg text-sm w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <label className="text-sm text-gray-600 mr-2">Sort by price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-2 py-1 text-sm rounded"
          >
            <option value="low to high">Low to High</option>
            <option value="high to low">High to Low</option>
          </select>
        </div>
      </div>

      {/* Best Offer Section */}
      <div className="py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Best Offer Just For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedicines.slice(0, 5).map((medicine) => {
            const expired = isExpired(medicine.medicineExpiryDate);
            const expiringSoon = isExpiringSoon(medicine.medicineExpiryDate);
            return (
              <div
                key={medicine.madicineid}
                className={`border rounded-lg overflow-hidden bg-white shadow-sm relative ${
                  expired ? 'opacity-50' : ''
                }`}
              >
                <div className="relative h-40 bg-white">
                  <img
                    src={medicine.medicineImage}
                    alt={medicine.medicineName}
                    className="w-full h-full object-contain p-4"
                    onError={(e) =>
                      (e.currentTarget.src = 'https://via.placeholder.com/200x128?text=No+Image')
                    }
                  />
                  {expired && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Expired
                    </span>
                  )}
                  {!expired && expiringSoon && (
                    <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                      Expiring Soon
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm truncate">{medicine.medicineName}</h4>
                  <p className="text-xs text-gray-600">{medicine.medicineCategory}</p>
                  <p className="font-bold text-lg mt-1">₹{medicine.medicinePrice.toFixed(2)}</p>
                  <button
                    disabled={expired}
                    onClick={() => addToCart(medicine.madicineid, 1)}
                    className={`mt-2 w-full px-4 py-2 text-sm rounded ${
                      expired
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {expired ? 'Not Available' : 'Shop Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seasonal Solutions Section */}
      <div className="py-8 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Seasonal Exclusive Solutions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['Headache And Migraine Solutions'].map((solution, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold text-sm">{solution}</h4>
                <button className="text-blue-600 text-sm mt-1">Shop Now →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
        <div className="flex items-center mb-6">
          <div className="text-4xl font-bold text-gray-800 mr-4">4.5/5</div>
          <div>
            <p className="text-sm text-gray-600">Review from 7,000+ verified customers</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </p>
                <p className="text-xs text-gray-500 mt-2">The John Family</p>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 px-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-blue-500 mr-1">✨</span> Mecura
            </h1>
            <p className="text-sm text-gray-600 mt-2">support@mecura.com</p>
          </div>
          <div className="flex space-x-4">
            <span className="text-gray-600">📞</span>
            <span className="text-gray-600">📍</span>
            <span className="text-gray-600">💬</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedicineCatalog;