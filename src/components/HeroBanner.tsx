
// import React, { useEffect, useState, useCallback } from 'react';
// import { 
//   Carousel, 
//   CarouselContent, 
//   CarouselItem, 
//   CarouselPrevious, 
//   CarouselNext 
// } from "@/components/ui/carousel";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import { ArrowRight } from 'lucide-react';

// const bannerImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
//     alt: "Modern hospital facility with advanced medical technology",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
//     alt: "Compassionate healthcare team providing patient care",
//   },
//   {
//     id: 3,
//     src: "/lovable-uploads/d255c6d0-9b7b-486a-972b-65a7adbf62e4.png",
//     alt: "Edge Technology with Hybrids - Medical heart model",
//     title: "Edge Technology with Hybrids",
//     description: "Our state-of-the-art hybrid operating rooms combine advanced imaging systems with surgical facilities, enabling minimally invasive procedures with greater precision and improved patient outcomes.",
//     additionalText: "The integration of digital imaging, robotic assistance, and real-time visualization allows our surgeons to perform complex procedures with enhanced accuracy and reduced recovery times for patients."
//   }
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
    
//     // Auto-advance the carousel
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
//     <div className="w-full mb-8">
//       <Carousel className="w-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//         <CarouselContent>
//           {bannerImages.map((image, index) => (
//             <CarouselItem key={image.id}>
//               <div className="p-1">
//                 <AspectRatio ratio={3 / 1} className="bg-muted">
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                   <div className="absolute inset-0 flex items-center">
//                     {index === 2 ? (
//                       // Special layout for the third slide (the heart image)
//                       <div className="container mx-auto px-4 md:px-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                           <div></div> {/* Empty div to push content to the right */}
//                           <div className="text-gray-800 bg-white/90 p-6 rounded-lg shadow-lg">
//                             <h2 className="text-2xl md:text-3xl font-bold mb-4">{image.title}</h2>
//                             <p className="text-gray-600 mb-4">{image.description}</p>
//                             <p className="text-gray-600 mb-6">{image.additionalText}</p>
//                             <Button className="bg-primary hover:bg-primary-dark text-white">
//                               Read More <ArrowRight className="ml-2 h-4 w-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       // Default layout for other slides
//                       <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
//                         <div className="text-white p-6 md:p-12 max-w-xl">
//                           <h2 className="text-2xl md:text-4xl font-bold mb-2">Excellence in Healthcare</h2>
//                           <p className="text-sm md:text-base mb-4">Providing comprehensive care with cutting-edge technology</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </AspectRatio>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="left-2 md:left-4" />
//         <CarouselNext className="right-2 md:right-4" />
//       </Carousel>
//     </div>
//   );
// };

// export default HeroBanner;i








// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, PlayCircle } from "lucide-react";

// const bannerImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80",
//     alt: "Hospital reception",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
//     alt: "Healthcare professionals",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1580281657527-47d5f6f32b1c?auto=format&fit=crop&w=800&q=80",
//     alt: "Modern equipment",
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

//     const interval = setInterval(() => {
//       if (api.canScrollNext()) api.scrollNext();
//       else api.scrollTo(0);
//     }, 4000);

//     return () => {
//       api.off("select", onSelect);
//       clearInterval(interval);
//     };
//   }, [api, onSelect]);

//   return (
//     <div className="w-full bg-white py-12">
//       <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
//         {/* Left Text Content */}
//         <div className="space-y-6">
//           <p className="text-green-600 uppercase tracking-wide font-medium">
//             Welcome to Meditailor
//           </p>
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             Tailored Global Healthcare Journeys – Precision, Care, and Beyond
//           </h1>
//           <p className="text-gray-600 text-lg">
//             At Meditailor Healthcare, we craft end-to-end medical tourism experiences—combining India’s finest hospitals, personalised care, and recovery-focused travel. From cardiac surgeries to wellness retreats, our consensus-driven approach ensures optimal outcomes, seamless logistics, and memories that heal.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Button className="bg-green-500 hover:bg-green-600 text-white">
//               Free Consultations
//             </Button>
//             <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-100">
//               Discover More <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Right Image/Carousel Content */}
//         <div className="relative">
//           <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
//             <CarouselContent>
//               {bannerImages.map((img) => (
//                 <CarouselItem key={img.id}>
//                   <img
//                     src={img.src}
//                     alt={img.alt}
//                     className="rounded-xl shadow-lg object-cover w-full h-[350px]"
//                   />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-2" />
//             <CarouselNext className="right-2" />
//           </Carousel>

//           {/* Play Button Overlay */}
//           <button
//             onClick={() => alert("Play video")}
//             className="absolute left-6 bottom-6 bg-white rounded-full p-3 shadow-md hover:scale-105 transition"
//           >
//             <PlayCircle className="h-10 w-10 text-green-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;







// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, PlayCircle } from "lucide-react";

// const bannerImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80",
//     alt: "Modern hospital facility with advanced medical technology",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
//     alt: "Compassionate healthcare team providing patient care",
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
//     <section className="w-full py-8 md:py-16 bg-white">
//       <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//         {/* Left Side - Carousel */}
//         <div className="w-full">
//           <Carousel className="w-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//             <CarouselContent>
//               {bannerImages.map((image) => (
//                 <CarouselItem key={image.id}>
//                   <AspectRatio ratio={3 / 2} className="relative">
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                     <div className="absolute inset-0 bg-black/30 flex items-center p-6">
//                       <div className="text-white max-w-md">
//                         <h2 className="text-3xl md:text-4xl font-bold mb-3">
//                           Excellence in Healthcare
//                         </h2>
//                         <p className="text-sm md:text-base">
//                           Discover top-notch medical services with world-class care.
//                         </p>
//                       </div>
//                     </div>
//                   </AspectRatio>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-2 md:left-4" />
//             <CarouselNext className="right-2 md:right-4" />
//           </Carousel>
//         </div>

//         {/* Right Side - Video Section */}
//         <div className="relative w-full flex justify-center items-center">
//           <div className="relative">
//             <img
//               src="https://images.unsplash.com/photo-1588776814546-ec7ec9bc73b3?auto=format&fit=crop&w=800&q=80"
//               alt="Play healthcare video"
//               className="rounded-lg shadow-lg"
//             />
//             <button
//               className="absolute inset-0 flex items-center justify-center"
//               onClick={() => alert("Play video functionality here")}
//             >
//               <PlayCircle size={72} className="text-green-600 hover:text-green-700 transition duration-200" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;








// import React, { useEffect, useState, useCallback } from 'react';
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
//     alt: "Modern hospital facility with advanced medical technology",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
//     alt: "Compassionate healthcare team providing patient care",
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
//     <section className="w-full py-8 md:py-16 bg-white">
//       <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//         {/* Left Side - Carousel */}
//         <div className="w-full">
//           <Carousel className="w-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//             <CarouselContent>
//               {bannerImages.map((image) => (
//                 <CarouselItem key={image.id}>
//                   <AspectRatio ratio={3 / 2} className="relative">
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                     <div className="absolute inset-0 bg-black/30 flex items-center p-6">
//                       <div className="text-white max-w-md">
//                         <h2 className="text-3xl md:text-4xl font-bold mb-3">
//                           Excellence in Healthcare
//                         </h2>
//                         <p className="text-sm md:text-base">
//                           Discover top-notch medical services with world-class care.
//                         </p>
//                       </div>
//                     </div>
//                   </AspectRatio>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="left-2 md:left-4" />
//             <CarouselNext className="right-2 md:right-4" />
//           </Carousel>
//         </div>

//         {/* Right Side - Autoplay Video */}
//         <div className="w-full">
//           <div className="rounded-lg overflow-hidden shadow-lg">
//             <AspectRatio ratio={16 / 9}>
//               <video
//                 src="https://www.w3schools.com/html/mov_bbb.mp4"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//             </AspectRatio>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;/





// import React, { useEffect, useState, useCallback } from 'react';
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
//     alt: "Modern hospital facility with advanced medical technology",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
//     alt: "Compassionate healthcare team providing patient care",
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
//     <section className="w-full py-8 md:py-16 bg-white">
//       <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 items-stretch gap-8">
//         {/* Image Carousel */}
//         <div className="w-full h-full">
//           <AspectRatio ratio={16 / 9}>
//             <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//               <CarouselContent>
//                 {bannerImages.map((image) => (
//                   <CarouselItem key={image.id}>
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious className="left-2 md:left-4" />
//               <CarouselNext className="right-2 md:right-4" />
//             </Carousel>
//           </AspectRatio>
//         </div>

//         {/* Video Section */}
//         <div className="w-full h-full">
//           <AspectRatio ratio={16 / 9}>
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover rounded-lg shadow-lg"
//             />
//           </AspectRatio>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;





// import React from 'react';
// import { AspectRatio } from "@/components/ui/aspect-ratio";

// const HeroBanner = () => {
//   return (
//     <section className="w-full py-8 md:py-16 bg-white">
//       <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 items-stretch gap-8">
        
//         {/* Left: Background Image with Text Overlay */}
//         <div className="relative w-full h-full">
//           <AspectRatio ratio={16 / 9}>
//             <div className="relative w-full h-full rounded-lg overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80"
//                 alt="Healthcare background"
//                 className="w-full h-full object-cover brightness-90"
//               />
//               <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
//                 <div className="text-center p-6">
//                   <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
//                     Excellence in Healthcare
//                   </h2>
//                   <p className="text-gray-700 text-sm md:text-base max-w-md mx-auto">
//                     Providing comprehensive care with cutting-edge technology
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </AspectRatio>
//         </div>

//         {/* Right: Auto-playing Video */}
//         <div className="w-full h-full">
//           <AspectRatio ratio={16 / 9}>
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover rounded-lg shadow-lg"
//             />
//           </AspectRatio>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React, { useEffect, useState, useCallback } from 'react';
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
//     <section className="w-full py-8 md:py-16 bg-white">
//       <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 items-stretch gap-8">
        
//         {/* Left: Scrolling Image Carousel with Text Overlay */}
//         <div className="relative w-full h-full">
//           <AspectRatio ratio={16 / 9}>
//             <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//               <CarouselContent>
//                 {bannerImages.map((image) => (
//                   <CarouselItem key={image.id}>
//                     <div className="relative w-full h-full rounded-lg overflow-hidden">
//                       <img
//                         src={image.src}
//                         alt={image.alt}
//                         className="w-full h-full object-cover brightness-75"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                         <div className="text-center text-white p-6">
//                           <h2 className="text-2xl md:text-4xl font-bold mb-2">
//                             Excellence in Healthcare
//                           </h2>
//                           <p className="text-sm md:text-base">
//                             Providing comprehensive care with cutting-edge technology
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious className="left-2 md:left-4" />
//               <CarouselNext className="right-2 md:right-4" />
//             </Carousel>
//           </AspectRatio>
//         </div>

//         {/* Right: Auto-playing Video */}
//         <div className="w-full h-full">
//           <AspectRatio ratio={16 / 9}>
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover rounded-lg shadow-lg"
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
   <section className="w-full py-16 bg-gradient-to-br from-white to-gray-100">
  <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
    
    {/* Image Carousel */}
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
      <AspectRatio ratio={16 / 9}>
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
      <AspectRatio ratio={16 / 10.5}>
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




