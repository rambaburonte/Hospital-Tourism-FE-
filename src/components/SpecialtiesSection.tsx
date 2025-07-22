// import React from 'react';
// import { Heart, Brain, Bone, Radiation, Stethoscope, Baby, Droplet, ArrowRight } from 'lucide-react';
// import { Card, CardContent } from "@/components/ui/card";
// import { useNavigate } from 'react-router-dom';

// const specialtiesList = [
//   { icon: <Heart className="h-6 w-6" />, title: "Cardiology", description: "Heart & Vascular Care", path: "/specialties/cardiology" },
//   { icon: <Brain className="h-6 w-6" />, title: "Neurology", description: "Brain & Nervous System", path: "/specialties/neurology" },
//   { icon: <Bone className="h-6 w-6" />, title: "Orthopedics", description: "Joint & Bone Care", path: "/specialties/orthopedics" },
//   { icon: <Radiation className="h-6 w-6" />, title: "Oncology", description: "Cancer Care", path: "/specialties/oncology" },
//   { icon: <Stethoscope className="h-6 w-6" />, title: "Gastroenterology", description: "Digestive Disorders", path: "/specialties/gastroenterology" },
//   { icon: <Baby className="h-6 w-6" />, title: "Pediatrics", description: "Children's Health", path: "/specialties/pediatrics" },
//   { icon: <Heart className="h-6 w-6" />, title: "Gynecology", description: "Women's Health", path: "/specialties/gynecology" },
//   { icon: <Droplet className="h-6 w-6" />, title: "Urology", description: "Urinary System", path: "/specialties/urology" },
// ];

// const SpecialtiesSection = () => {
//   const navigate = useNavigate();
//   return (
//     <section className="relative py-16 px-6 flex justify-center items-center bg-gradient-to-br from-gray-100/50 to-gray-50">
//       <div className="container mx-auto px-4 md:px-6">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">Specialties & Procedures</h2>
//         <div className="w-24 h-1 bg-[#499E14] mx-auto mb-10"></div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {specialtiesList.map((specialty, index) => (
//             <Card
//               key={index}
//               className="border border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg overflow-hidden cursor-pointer"
//               onClick={() => navigate(specialty.path)}
//               role="button"
//               tabIndex={0}
//               onKeyPress={e => { if (e.key === 'Enter') navigate(specialty.path); }}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">
//                     {React.cloneElement(specialty.icon, { className: "h-6 w-6 text-[#499E14]" })}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{specialty.title}</h3>
//                     <p className="text-sm text-gray-600">{specialty.description}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
        
//         {/* <div className="mt-12 text-center">
//           <a href="/specialities" className="flex items-center justify-center text-[#499E14] font-semibold hover:text-[#3d7c10] transition-colors duration-300">
//             View All Specialties
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </a>
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default SpecialtiesSection;










import React from 'react';
import { Heart, Brain, Bone, Radiation, Stethoscope, Baby, Droplet, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, Link } from 'react-router-dom';

const specialtiesList = [
  { icon: <Heart className="h-6 w-6" />, title: "Cardiology", description: "Heart & Vascular Care", path: "/specialties/cardiology" },
  { icon: <Brain className="h-6 w-6" />, title: "Neurology", description: "Brain & Nervous System", path: "/specialties/neurology" },
  { icon: <Bone className="h-6 w-6" />, title: "Orthopedics", description: "Joint & Bone Care", path: "/specialties/orthopedics" },
  { icon: <Radiation className="h-6 w-6" />, title: "Oncology", description: "Cancer Care", path: "/specialties/oncology" },
  { icon: <Stethoscope className="h-6 w-6" />, title: "Gastroenterology", description: "Digestive Disorders", path: "/specialties/gastroenterology" },
  { icon: <Baby className="h-6 w-6" />, title: "Pediatrics", description: "Children's Health", path: "/specialties/pediatrics" },
  { icon: <Heart className="h-6 w-6" />, title: "Gynecology", description: "Women's Health", path: "/specialties/gynecology" },
  { icon: <Droplet className="h-6 w-6" />, title: "Urology", description: "Urinary System", path: "/specialties/urology" },
];

const SpecialtiesSection = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="py-16 bg-gradient-to-br from-white to-blue-50 overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173fdabe37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Specialties & Procedures
        </h2>
        
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {specialtiesList.map((specialty, index) => (
            <Card
              key={index}
              className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate(specialty.path)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') navigate(specialty.path); }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-[#499E14]/10 p-3 rounded-full">
                    {React.cloneElement(specialty.icon, { className: "h-6 w-6 text-[#499E14]" })}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{specialty.title}</h3>
                    <p className="text-sm text-gray-800">{specialty.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div 
          className="mt-12 text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Link
            to="/specialities"
            className="group inline-block bg-[#499E14] text-white text-sm font-semibold py-2 px-6 rounded-lg border border-[#499E14] hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-xl"
            aria-label="View All Specialties"
          >
            View All Specialties
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;