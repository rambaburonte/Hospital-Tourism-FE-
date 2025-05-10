
// import React from 'react';
// import { Calendar, MapPin, Search, User, Phone } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";

// const AppointmentSection = () => {
//   return (
//     <section className="bg-slate-50 py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
//             Schedule Your Appointment Online
//           </h2>
          
//           <div className="bg-white rounded-lg shadow-md p-6 appointment-card">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <Input 
//                   type="text" 
//                   placeholder="Search for Doctor" 
//                   className="pl-10 pr-4 py-2 w-full"
//                 />
//               </div>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <Input 
//                   type="text" 
//                   placeholder="Choose Location" 
//                   className="pl-10 pr-4 py-2 w-full"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <Button className="bg-primary hover:bg-primary-dark text-white w-full">
//                   Book an Appointment
//                 </Button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
//               <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
//                 <CardContent className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full">
//                     <User className="h-6 w-6 text-primary" />
//                   </div>
//                   <p className="text-sm font-medium">Find a Doctor</p>
//                 </CardContent>
//               </Card>
              
//               <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
//                 <CardContent className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full">
//                     <Calendar className="h-6 w-6 text-primary" />
//                   </div>
//                   <p className="text-sm font-medium">Book a Test</p>
//                 </CardContent>
//               </Card>
              
//               <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
//                 <CardContent className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full">
//                     <Phone className="h-6 w-6 text-primary" />
//                   </div>
//                   <p className="text-sm font-medium">Teleconsult</p>
//                 </CardContent>
//               </Card>
              
//               <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
//                 <CardContent className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full">
//                     <MapPin className="h-6 w-6 text-primary" />
//                   </div>
//                   <p className="text-sm font-medium">Locate Hospital</p>
//                 </CardContent>
//               </Card>
              
//               <Card className="border border-gray-200 text-center specialty-icon hover:border-primary">
//                 <CardContent className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full">
//                     <Search className="h-6 w-6 text-primary" />
//                   </div>
//                   <p className="text-sm font-medium">Health Check</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Display Top 6 Items for the Selected Service */}
//             {selectedService && (
//               <div className="mt-12">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                   {selectedService}
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {serviceData[selectedService].slice(0, 6).map((item, index) => (
//                     <div
//                       key={index}
//                       className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-40 object-cover rounded-lg mb-4"
//                       />
//                       <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
//                       <p className="text-gray-600 text-sm mb-2">{item.details}</p>
//                       <p className="text-gray-500 text-xs italic">{item.description}</p>
//                     </div>
//                   ))}
//                 </div>
//                 {/* Explore More Link */}
//                 <div className="mt-8 text-center">
//                   <Link
//                     to={serviceRoutes[selectedService]}
//                     className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
//                   >
//                     Explore More
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Display Top 6 Items for the Selected Service */}
//           {selectedService && (
//             <div className="mt-12">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                 {selectedService}
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {serviceData[selectedService].slice(0, 6).map((item, index) => (
//                   <div
//                     key={index}
//                     className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-40 object-cover rounded-lg mb-4"
//                     />
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
//                     <p className="text-gray-600 text-sm mb-2">{item.details}</p>
//                     <p className="text-gray-500 text-xs italic">{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//               {/* Explore More Link */}
//               <div className="mt-8 text-center">
//                 <Link
//                   to={serviceRoutes[selectedService]}
//                   className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
//                 >
//                   Explore More
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppointmentSection;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, User, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Dummy service data for demonstration
const serviceData = {
  'Find a Doctor': [
    {
      image: 'https://via.placeholder.com/300x200',
      name: 'Dr. John Doe',
      details: 'Cardiologist, 10+ years exp',
      description: 'Available Mon-Fri, 9 AM - 5 PM',
    },
    // Add up to 6 items or more
  ],
  'Book a Test': [
    {
      image: 'https://via.placeholder.com/300x200',
      name: 'Blood Test',
      details: 'Includes CBC, Glucose, etc.',
      description: 'Home sample collection available',
    },
  ],
  Teleconsult: [
    {
      image: 'https://via.placeholder.com/300x200',
      name: 'Online Psychiatry',
      details: 'Mental health support via video call',
      description: 'Confidential & private',
    },
  ],
  'Locate Hospital': [
    {
      image: 'https://via.placeholder.com/300x200',
      name: 'Sunrise Hospital',
      details: 'Multi-specialty care',
      description: '24/7 Emergency available',
    },
  ],
  'Health Check': [
    {
      image: 'https://via.placeholder.com/300x200',
      name: 'Full Body Checkup',
      details: '40+ tests included',
      description: 'Results in 24 hours',
    },
  ],
};

// Dummy route links for each service
const serviceRoutes = {
  'Find a Doctor': '/doctors',
  'Book a Test': '/tests',
  Teleconsult: '/teleconsult',
  'Locate Hospital': '/hospitals',
  'Health Check': '/checkups',
};


const AppointmentSection = () => {
  const [selectedService, setSelectedService] = useState('');

  const handleCardClick = (serviceName) => {
    setSelectedService(serviceName);
  };

  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Schedule Your Appointment Online
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6 appointment-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search for Doctor"
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Choose Location"
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary hover:bg-primary-dark text-white w-full">
                  Book an Appointment
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {[
                { icon: <User className="h-6 w-6 text-primary" />, name: 'Find a Doctor' },
                { icon: <Calendar className="h-6 w-6 text-primary" />, name: 'Book a Test' },
                { icon: <Phone className="h-6 w-6 text-primary" />, name: 'Teleconsult' },
                { icon: <MapPin className="h-6 w-6 text-primary" />, name: 'Locate Hospital' },
                { icon: <Search className="h-6 w-6 text-primary" />, name: 'Health Check' },
              ].map((item, index) => (
                <Card
                  key={index}
                  onClick={() => handleCardClick(item.name)}
                  className="border border-gray-200 text-center specialty-icon hover:border-primary cursor-pointer"
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <div className="mb-2 bg-slate-100 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <p className="text-sm font-medium">{item.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Display Top 6 Items for the Selected Service */}
            {selectedService && serviceData[selectedService] && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedService}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceData[selectedService].slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{item.details}</p>
                      <p className="text-gray-500 text-xs italic">{item.description}</p>
                    </div>
                  ))}
                </div>
                {/* Explore More Link */}
                <div className="mt-8 text-center">
                  <Link
                    to={serviceRoutes[selectedService]}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
