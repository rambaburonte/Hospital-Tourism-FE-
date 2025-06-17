
// import React from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { MapPin, Star, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const hospitals = [
//   {
//     name: "Max Super Specialty Hospital, Saket",
//     location: "New Delhi",
//     image: "https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     rating: 4.8
//   },
//   {
//     name: "Max Super Specialty Hospital, Patparganj",
//     location: "Delhi",
//     image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     rating: 4.7
//   },
//   {
//     name: "Max Super Specialty Hospital, Shalimar Bagh",
//     location: "Delhi",
//     image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     rating: 4.9
//   },
//   {
//     name: "Max Super Specialty Hospital, Mohali",
//     location: "Punjab",
//     image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//     rating: 4.8
//   }
// ];

// const HospitalNetworkSection = () => {
//   return (
//     <section className="py-12 bg-[#f0f8e8]">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Our Hospital Network</h2>
//           <p className="text-gray-600">
//             We have a network of 16+ world-class hospitals and 3500+ doctors across India
//             providing care in over 30 medical specialties.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {hospitals.map((hospital, index) => (
//             <Card key={index} className="overflow-hidden border-0 shadow-md hospital-card">
//               <div className="relative h-40">
//                 <img 
//                   src={hospital.image} 
//                   alt={hospital.name} 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold text-gray-800 mb-1">{hospital.name}</h3>
//                 <div className="flex items-center text-sm text-gray-600 mb-2">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   <span>{hospital.location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="flex mr-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm font-medium">{hospital.rating}/5</span>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
        
//         <div className="mt-8 text-center">
//           <Link to="/HospitalList">
//   <Button className="bg-primary hover:bg-primary-dark">
//     View All Hospitals <ArrowRight className="ml-2 h-4 w-4" />
//   </Button>
// </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HospitalNetworkSection;





import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/config/config';


const HospitalNetworkSection = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/getall/hospitals`);
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data = await response.json();
        // Map API data to match component expectations
        const formattedHospitals = data.map(hospital => ({
          id: hospital.hospitalId,
          name: hospital.hositalName,
          image: hospital.hospitalImage,
          rating: parseFloat(hospital.rating),
          location: hospital.address.split(',').slice(-3, -1).join(',').trim() || 'Unknown', // Extract city from address
        }));
        setHospitals(formattedHospitals);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <section className="py-12 bg-[#f0f8e8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Our Hospital Network</h2>
          <p className="text-gray-600">
            We have a network of 16+ world-class hospitals and 3500+ doctors across India
            providing care in over 30 medical specialties.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {hospitals.slice(0, 4).map((hospital) => (
            <Card key={hospital.id} className="overflow-hidden border-0 shadow-md hospital-card">
              <div className="relative h-40">
                <img 
                  src={hospital.image} 
                  alt={hospital.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{hospital.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{hospital.rating}/5</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/HospitalList" state={{ hospitals }}>
            <Button className="bg-primary hover:bg-primary-dark">
              View All Hospitals <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HospitalNetworkSection;