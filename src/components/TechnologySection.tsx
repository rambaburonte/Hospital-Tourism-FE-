
// import React from 'react';
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from 'lucide-react';
// import UserGlobe from './UserGlobe';

// const TechnologySection = () => {
//    return (     <section className="py-12 overflow-hidden">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center p-4 relative">
//              <UserGlobe className="w-full h-full" />
//            </div>
          
//            <div>
//              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
//                Global Health Tourism Network
//              </h2>
//              <p className="text-gray-600 mb-4">
//                Our platform connects patients from around the world with premium healthcare 
//                facilities. The interactive globe shows our growing community of users across 
//                different countries seeking world-class medical treatments.
//              </p>
//              <p className="text-gray-600 mb-6">
//                With advanced technology and personalized care coordination, we're making 
//                quality healthcare accessible globally. Each dot represents registered users 
//                in that region, showcasing our international reach and trusted network.
//              </p>            
//              <Button className="bg-[#499E14] hover:bg-green-500 text-white border border-[#499E14]">
//                Join Our Network <ArrowRight className="ml-2 h-4 w-4" />
//              </Button>
//            </div>
//          </div>
//        </div>
//      </section>
//    );
//  };

//  export default TechnologySection;














import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserGlobe from './UserGlobe';

const TechnologySection = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/ContactUsPage');
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div 
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center p-4 relative"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <UserGlobe className="w-full h-full transform hover:scale-105 transition-transform duration-300" />
          </div>

          <div 
            className="backdrop-blur-md bg-white/15 border border-white/20 shadow-lg rounded-xl p-6 space-y-6"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Global Health Tourism Network
            </h2>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-prose">
              Our platform connects patients from around the world with premium healthcare facilities. 
              The interactive globe showcases our growing community of users across different countries seeking world-class medical treatments.
            </p>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-prose">
              With advanced technology and personalized care coordination, we're making quality healthcare accessible globally. 
              Each dot represents registered users in that region, highlighting our international reach and trusted network.
            </p>
            <Button 
              onClick={handleJoinClick}
              className="group bg-[#499E14] hover:bg-white/20 hover:border-white/50 text-white text-base sm:text-lg px-6 py-2 rounded-lg border border-[#499E14] transition-all duration-300 hover:shadow-xl focus:ring-2 focus:ring-[#499E14] focus:ring-opacity-50"
              aria-label="Join our global healthcare network"
            >
              Join Our Network 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;