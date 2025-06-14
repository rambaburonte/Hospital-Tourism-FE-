





// import React, { useEffect, useState, useCallback } from 'react';
// import { motion } from 'framer-motion';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// const bannerImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80",
//     alt: "Modern hospital facility",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
//     alt: "Healthcare professionals",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical equipment and labs",
//   },
// ];

// const HeroBanner = () => {
//   const [api, setApi] = useState<any>(null);
//   const [current, setCurrent] = useState(0);

//   const onSelect = useCallback(() => {
//     if (!api) return;
//     setCurrent(api.selectedScrollSnap());
//   }, [api]);

//   useEffect(() => {
//     if (!api) return;
//     api.on("select", onSelect);

//     const autoplayInterval = setInterval(() => {
//       if (api.canScrollNext()) {
//         api.scrollNext();
//       } else {
//         api.scrollTo(0);
//       }
//     }, 5000);

//     return () => {
//       api.off("select", onSelect);
//       clearInterval(autoplayInterval);
//     };
//   }, [api, onSelect]);

//   return (
//    <section className="w-full py-16 bg-gradient-to-br from-white to-gray-100">
//   <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
    
//     {/* Image Carousel */}
//     <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
//       <AspectRatio ratio={16 / 9}>
//         <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//           <CarouselContent>
//             {bannerImages.map((image) => (
//               <CarouselItem key={image.id}>
//                 <div className="relative w-full h-full overflow-hidden rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out">
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="w-full h-full object-cover brightness-75 transition-transform duration-500 ease-in-out"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/40">
//                     <div className="text-center text-white px-6 backdrop-blur-md">
//                       <motion.h2 
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-md"
//                       >
//                         Excellence in Healthcare
//                       </motion.h2>
//                       <motion.p 
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                         className="mt-2 text-sm md:text-base"
//                       >
//                         Providing comprehensive care with cutting-edge technology
//                       </motion.p>
//                       <motion.button 
//                         whileHover={{ scale: 1.05 }}
//                         className="mt-4 px-5 py-2 bg-white text-gray-800 rounded-md shadow-md hover:bg-gray-100 transition"
//                       >
//                         Learn More
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </AspectRatio>
//     </div>
//     {/* Video Section */}
//     <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
//       <AspectRatio ratio={16 / 10.5}>
//         <video
//           src="https://www.w3schools.com/html/mov_bbb.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
//         />
//       </AspectRatio>
//     </div>
//   </div>
// </section>
//   );
// };

// export default HeroBanner;





// import React, { useEffect, useState, useCallback } from 'react';
// import { motion } from 'framer-motion';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// const bannerImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80",
//     alt: "Modern hospital facility",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
//     alt: "Healthcare professionals",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical equipment and labs",
//   },
// ];

// const HeroBanner = () => {
//   const [api, setApi] = useState<any>(null);
//   const [current, setCurrent] = useState(0);

//   const onSelect = useCallback(() => {
//     if (!api) return;
//     setCurrent(api.selectedScrollSnap());
//   }, [api]);

//   useEffect(() => {
//     if (!api) return;
//     api.on("select", onSelect);

//     const autoplayInterval = setInterval(() => {
//       if (api.canScrollNext()) {
//         api.scrollNext();
//       } else {
//         api.scrollTo(0);
//       }
//     }, 5000);

//     return () => {
//       api.off("select", onSelect);
//       clearInterval(autoplayInterval);
//     };
//   }, [api, onSelect]);

//   return (
//     <section className="w-full py-16 bg-gradient-to-br from-green-50 to-green-100">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        
//         {/* Image Carousel */}
//         <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-green-200 bg-white">
//           <AspectRatio ratio={16 / 9}>
//             <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//               <CarouselContent>
//                 {bannerImages.map((image) => (
//                   <CarouselItem key={image.id}>
//                     <div className="relative w-full h-full overflow-hidden rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out">
//                       <img
//                         src={image.src}
//                         alt={image.alt}
//                         className="w-full h-full object-cover brightness-75 transition-transform duration-500 ease-in-out"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center bg-green-900/50">
//                         <div className="text-center text-white px-6 backdrop-blur-md">
//                           <motion.h2 
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6 }}
//                             className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-md"
//                           >
//                             Excellence in Healthcare
//                           </motion.h2>
//                           <motion.p 
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             className="mt-2 text-sm md:text-base"
//                           >
//                             Providing comprehensive care with cutting-edge technology
//                           </motion.p>
//                           <motion.button 
//                             whileHover={{ scale: 1.05 }}
//                             className="mt-4 px-5 py-2 bg-[#499E14] text-white rounded-md shadow-md hover:bg-[#3c8610] transition"
//                           >
//                             Learn More
//                           </motion.button>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious className="bg-[#499E14] text-white hover:bg-[#3c8610]" />
//               <CarouselNext className="bg-[#499E14] text-white hover:bg-[#3c8610]" />
//             </Carousel>
//           </AspectRatio>
//         </div>

//         {/* Video Section */}
//         <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-green-200 bg-white">
//           <AspectRatio ratio={16 / 10.5}>
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover rounded-xl"
//             />
//           </AspectRatio>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React, { useEffect, useState, useCallback } from 'react';
// import { motion } from 'framer-motion';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// const bannerImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80",
//     alt: "Modern hospital facility",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
//     alt: "Healthcare professionals",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical equipment and labs",
//   },
// ];

// const HeroBanner = () => {
//   const [api, setApi] = useState<any>(null);
//   const [current, setCurrent] = useState(0);

//   const onSelect = useCallback(() => {
//     if (!api) return;
//     setCurrent(api.selectedScrollSnap());
//   }, [api]);

//   useEffect(() => {
//     if (!api) return;
//     api.on("select", onSelect);

//     const autoplayInterval = setInterval(() => {
//       if (api.canScrollNext()) {
//         api.scrollNext();
//       } else {
//         api.scrollTo(0);
//       }
//     }, 5000);

//     return () => {
//       api.off("select", onSelect);
//       clearInterval(autoplayInterval);
//     };
//   }, [api, onSelect]);

//   return (
//     <section className="w-full py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        
//         {/* Image Carousel */}
//         <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-green-200 bg-white">
//           <AspectRatio ratio={16 / 9}>
//             <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//               <CarouselContent>
//                 {bannerImages.map((image) => (
//                   <CarouselItem key={image.id}>
//                     <div className="relative w-full h-full overflow-hidden rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out">
//                       <img
//                         src={image.src}
//                         alt={image.alt}
//                         className="w-full h-full object-cover brightness-75 transition-transform duration-500 ease-in-out"
//                       />
//                       {/* Header Overlay - Green Section */}
//                       <div className="absolute inset-0 flex items-center justify-center bg-green-700/80">
//                         <div className="text-center text-white px-6">
//                           <motion.h2 
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6 }}
//                             className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-md"
//                           >
//                             Excellence in Healthcare
//                           </motion.h2>
//                           <motion.p 
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             className="mt-2 text-sm md:text-base"
//                           >
//                             Providing comprehensive care with cutting-edge technology
//                           </motion.p>
//                           <motion.button 
//                             whileHover={{ scale: 1.05 }}
//                             className="mt-4 px-5 py-2 bg-white text-green-700 rounded-md shadow-md hover:bg-gray-100 transition"
//                           >
//                             Learn More
//                           </motion.button>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious className="bg-green-600 text-white hover:bg-green-700" />
//               <CarouselNext className="bg-green-600 text-white hover:bg-green-700" />
//             </Carousel>
//           </AspectRatio>
//         </div>

//         {/* Video Section */}
//         <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg border border-green-200 bg-white">
//           <AspectRatio ratio={16 / 10.5}>
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover rounded-xl"
//             />
//           </AspectRatio>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const bannerImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern hospital facility",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    alt: "Healthcare professionals",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=1200&q=80",
    alt: "Medical equipment and labs",
  },
];

const HeroBanner = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);

    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => {
      api.off("select", onSelect);
      clearInterval(autoplayInterval);
    };
  }, [api, onSelect]);

  return (
   <section className="w-full py-16 bg-opacity-50 from-white to-gray-100 ">
  <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
    
    {/* Image Carousel */}
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
      <AspectRatio ratio={19 / 9}>
        <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
          <CarouselContent>
            {bannerImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative w-full h-full overflow-hidden rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover brightness-75 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center text-white px-6 backdrop-blur-md">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-md"
                      >
                        Excellence in Healthcare
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-2 text-sm md:text-base"
                      >
                        Providing comprehensive care with cutting-edge technology
                      </motion.p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 px-5 py-2 bg-white text-gray-800 rounded-md shadow-md hover:bg-gray-100 transition"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </AspectRatio>
    </div>
    {/* Video Section */}
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
      <AspectRatio ratio={20 / 10.5}>
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
        />
      </AspectRatio>
    </div>
  </div>
</section>
  );
};

export default HeroBanner;



