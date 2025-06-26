
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';
// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   price: number;
//   locationId: number | null;
//   location: string | null;
//   status: string | null;
// }

// const ChefsList: React.FC = () => {
//   const [chefs, setChefs] = useState<Chef[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchChefs = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/chefs`);
//         const data = await response.json();
//         setChefs(data);
//       } catch (error) {
//         console.error('Error fetching chefs:', error);
//       }
//     };

//     fetchChefs();
//   }, []);

//   const handleBookClick = (chefID: number) => {
//     navigate(`/chef/${chefID}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Our Chefs</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {chefs.map((chef) => (
//           <div
//             key={chef.chefID}
//             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//           >
//             <img
//               src={chef.chefImage}
//               alt={chef.chefName}
//               className="w-full h-48 object-cover"
//               onError={(e) => {
//                 e.currentTarget.src = 'https://via.placeholder.com/300';
//               }}
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{chef.chefName}</h2>
//               <p className="text-gray-600 mb-2">{chef.chefDescription}</p>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Rating:</span> {chef.chefRating} ⭐
//               </p>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Experience:</span> {chef.experience}
//               </p>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Styles:</span> {chef.styles}
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 <span className="font-medium">Price:</span> ${chef.price.toFixed(2)}
//               </p>
//               <button
//                 onClick={() => handleBookClick(chef.chefID)}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
//               >
//                 Book Here
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChefsList;










// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '@/config/config';

// interface Chef {
//   chefID: number;
//   chefName: string;
//   chefDescription: string;
//   chefImage: string;
//   chefRating: string;
//   experience: string;
//   styles: string;
//   price: number;
//   locationId: number | null;
//   location: string | null;
//   status: string | null;
// }

// const ChefsList: React.FC = () => {
//   const [chefs, setChefs] = useState<Chef[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchChefs = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/chefs`);
//         const data = await response.json();
//         setChefs(data);
//       } catch (error) {
//         console.error('Error fetching chefs:', error);
//       }
//     };

//     fetchChefs();
//   }, []);

//   const handleBookClick = (chefID: number) => {
//     navigate(`/booking/chef/${chefID}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Our Chefs</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {chefs.map((chef) => (
//           <div
//             key={chef.chefID}
//             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//           >
//             <img
//               src={chef.chefImage}
//               alt={chef.chefName}
//               className="w-full h-48 object-cover"
//               onError={(e) => {
//                 e.currentTarget.src = 'https://via.placeholder.com/300';
//               }}
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{chef.chefName}</h2>
//               <p className="text-gray-600 mb-2">{chef.chefDescription}</p>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Rating:</span> {chef.chefRating} ⭐
//               </p>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Experience:</span> {chef.experience}
//               </p>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Styles:</span> {chef.styles}
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 <span className="font-medium">Price:</span> ${chef.price.toFixed(2)}
//               </p>
//               <button
//                 onClick={() => handleBookClick(chef.chefID)}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
//               >
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChefsList;














import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Mail, Phone, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BASE_URL } from '@/config/config';

interface Chef {
  id: number;
  name: string;
  description: string;
  avatar: string;
  rating: number;
  experience: {
    years: string;
    specialization: string;
  };
  styles: string[];
  price: number;
  location: string | null;
  email: string;
  phone: string;
}

const ChefsList: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/chefs`);
        const data = await response.json();
        const formatted = data.map((chef: any) => ({
          id: chef.chefID,
          name: chef.chefName,
          description: chef.chefDescription,
          avatar: chef.chefImage,
          rating: parseFloat(chef.chefRating) || 0,
          experience: {
            years: chef.experience,
            specialization: chef.styles.split(',')[0]?.trim() || 'General Cuisine',
          },
          styles: chef.styles.split(',').map((style: string) => style.trim()),
          price: chef.price,
          location: chef.location || 'N/A',
          email: 'N/A',
          phone: 'N/A',
        }));
        setChefs(formatted);
      } catch (error) {
        console.error('Error fetching chefs:', error);
      }
    };

    fetchChefs();
  }, []);

  const filteredChefs =
    selectedStyle === 'All'
      ? chefs
      : chefs.filter((chef) => chef.styles.includes(selectedStyle));

  const styles = ['All', ...new Set(chefs.flatMap((chef) => chef.styles))].sort();

  const handleAddToCart = (chefId: number) => {
    navigate(`/booking/chef/${chefId}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
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
          Meet Our Expert Chefs
        </h1>

        <div className="mb-8 flex justify-center">
          <Select
            onValueChange={setSelectedStyle}
            defaultValue="All"
            aria-label="Filter by culinary style"
          >
            <SelectTrigger className="w-full sm:w-64 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#499E14]">
              <SelectValue placeholder="Select Culinary Style" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg bg-white">
              {styles.map((style) => (
                <SelectItem
                  key={style}
                  value={style}
                  className="hover:bg-[#f0f8e8]"
                >
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChefs.map((chef, index) => (
            <Card
              key={chef.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl transform hover:-translate-y-1"
              style={{
                animation: `fadeIn 0.3s ease-in ${index * 0.1}s both`,
              }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={chef.avatar}
                    alt={`${chef.name} avatar`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#e6f4e0]"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-[#3a7e10]">
                      {chef.name}
                    </h2>
                    <p className="text-sm text-gray-600">{chef.location}</p>
                    <div className="flex ITEMS-center gap-1 mt-1">
                      {renderStars(chef.rating)}
                      <span className="text-sm text-gray-500 ml-2">
                        ({chef.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-700 flex flex-col gap-3">
                  <p className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#499E14]" />
                    {chef.styles.join(', ')}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#499E14]" />
                    {chef.experience.years}
                    <span className="ml-2 inline-block bg-[#e6f4e0] text-[#3a7e10] text-xs px-2 py-1 rounded-full">
                      {chef.experience.specialization}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#499E14]" />
                    {chef.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#499E14]" />
                    {chef.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Price:</span> ${chef.price.toFixed(2)}
                  </p>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full bg-[#499E14] text-white hover:bg-[#3a7e10] transition-all rounded-lg"
                        aria-label={`Book ${chef.name}`}
                        onClick={() => handleAddToCart(chef.id)}
                      >
                        Add To Cart
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Book {chef.name} for culinary services</p>
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

export default ChefsList;