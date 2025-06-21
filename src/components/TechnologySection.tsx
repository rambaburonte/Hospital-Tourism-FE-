
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import UserGlobe from './UserGlobe';

const TechnologySection = () => {
   return (     <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center p-4 relative">
             <UserGlobe className="w-full h-full" />
           </div>
          
           <div>
             <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
               Global Health Tourism Network
             </h2>
             <p className="text-gray-600 mb-4">
               Our platform connects patients from around the world with premium healthcare 
               facilities. The interactive globe shows our growing community of users across 
               different countries seeking world-class medical treatments.
             </p>
             <p className="text-gray-600 mb-6">
               With advanced technology and personalized care coordination, we're making 
               quality healthcare accessible globally. Each dot represents registered users 
               in that region, showcasing our international reach and trusted network.
             </p>
             <Button className="bg-primary hover:bg-primary-dark text-white">
               Join Our Network <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
           </div>
         </div>
       </div>
     </section>
   );
 };

 export default TechnologySection;


