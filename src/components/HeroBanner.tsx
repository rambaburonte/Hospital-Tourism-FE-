
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





// 


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
//     <section className="w-full py-10 bg-[#f9f9f9]">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
//         {/* Image Carousel */}
//         <div className="w-full">
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
//                       <div className="absolute inset-0 flex flex-col justify-center p-8 text-white bg-black/30">
//                         <h2 className="text-3xl md:text-5xl font-bold leading-tight">
//                           Excellence in Healthcare
//                         </h2>
//                         <p className="text-lg mt-3 max-w-md">
//                           Providing comprehensive care with cutting-edge technology
//                         </p>
//                       </div>
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </AspectRatio>
//         </div>

//         {/* Video Section */}
//         <div className="w-full">
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




// import React from "react";

// const rightCards = [
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
//     title: "Mountain Sounds",
//     date: "January 27.12:24 PM",
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=800&q=80",
//     title: "The Bahamas",
//     date: "January 27.12:24 PM",
//   },
// ];

// const HeroBanner = () => {
//   return (
//     <section className="w-full min-h-screen relative bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1500&q=80')` }}>
//       <div className="w-full h-full bg-black/40 py-16">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          
//           {/* Left Content */}
//           <div className="text-white space-y-6">
//             <h1 className="text-[6rem] font-bold text-gray-300 leading-none">01</h1>
//             <div className="border-t border-white w-20 my-2" />
//             <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
//               NEVER STOP <br /> EXPLORING THE <br /> WORLD
//             </h2>
//             <p className="text-gray-200 text-sm max-w-md">
//               Lorem ipsum dolor sit amet consectetur. Tellus cursus at nulla in ut feugiat vestibulum. Ac ultrices pellentesque pulvinar pellentesque.
//             </p>
//           </div>

//           {/* Right Vertical Scroll Cards */}
//           <div className="space-y-6 overflow-y-auto max-h-[500px] pr-4">
//             {rightCards.map((card, index) => (
//               <div key={card.id} className="relative rounded-lg overflow-hidden shadow-lg">
//                 <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
//                 <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-4 text-white">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
//                       <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold">{card.title}</h3>
//                     <p className="text-sm">{card.date}</p>
//                   </div>
//                   <span className="absolute top-2 right-4 text-[3rem] font-bold text-white/70 z-10">{String(card.id).padStart(2, '0')}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React from "react";

// const carouselImages = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1579154204601-01588f351e85?auto=format&fit=crop&w=800&q=80",
//     title: "State-of-the-Art Lab",
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1588776814546-ec7d73820b1b?auto=format&fit=crop&w=800&q=80",
//     title: "Modern Hospital",
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1588776814458-dc445b0d9d5a?auto=format&fit=crop&w=800&q=80",
//     title: "Healthcare Heroes",
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1603415526960-f8f82f06d9e6?auto=format&fit=crop&w=800&q=80",
//     title: "Emergency Response",
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1583912268185-901a431fd78c?auto=format&fit=crop&w=800&q=80",
//     title: "Patient Care",
//   },
// ];

// const videoCards = [
//   {
//     id: 1,
//     title: "Surgical Innovations",
//     date: "May 09, 10:00 AM",
//     video: "https://www.w3schools.com/html/mov_bbb.mp4",
//   },
//   {
//     id: 2,
//     title: "Patient Success Stories",
//     date: "May 09, 11:30 AM",
//     video: "https://www.w3schools.com/html/movie.mp4",
//   },
// ];

// const HeroBanner = () => {
//   return (
//     <section
//       className="w-full min-h-screen relative bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1588776814546-ec7d73820b1b?auto=format&fit=crop&w=1500&q=80')",
//       }}
//     >
//       <div className="w-full h-full bg-black/60 py-16">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          
//           {/* Left: Scrolling Medical Images */}
//           <div className="space-y-6 overflow-y-auto max-h-[600px] pr-4">
//             {carouselImages.map((item, idx) => (
//               <div
//                 key={item.id}
//                 className="relative rounded-lg overflow-hidden shadow-lg"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white">
//                   <h3 className="text-lg font-semibold">{item.title}</h3>
//                   <span className="absolute top-2 right-4 text-[2.5rem] font-bold text-white/70 z-10">
//                     {String(item.id).padStart(2, "0")}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right: Video Cards */}
//           <div className="space-y-6">
//             {videoCards.map((video) => (
//               <div
//                 key={video.id}
//                 className="relative rounded-lg overflow-hidden shadow-lg"
//               >
//                 <video
//                   src={video.video}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-4 text-white">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
//                       <svg
//                         className="w-5 h-5"
//                         fill="white"
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold">{video.title}</h3>
//                     <p className="text-sm">{video.date}</p>
//                   </div>
//                   <span className="absolute top-2 right-4 text-[3rem] font-bold text-white/70 z-10">
//                     {String(video.id + 5).padStart(2, "0")}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React from "react";

// const medicalImages = [
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
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1588776814546-ec7ee0b97e0d?auto=format&fit=crop&w=1200&q=80",
//     alt: "Surgical team at work",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1603394579321-08be8d6c76c3?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical consultation",
//   },
// ];

// const mockVideos = [
//   {
//     id: 1,
//     title: "Hospital Tour",
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//   },
//   {
//     id: 2,
//     title: "Advanced Equipment",
//     src: "https://www.w3schools.com/html/movie.mp4",
//   },
// ];

// const HeroBanner = () => {
//   return (
//     <section className="w-full min-h-screen bg-black text-white">
//       <div className="max-w-7xl mx-auto py-12 px-6 space-y-10">
//         {/* Horizontal Image Scroll */}
//         <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
//           {medicalImages.map((img) => (
//             <div key={img.id} className="inline-block w-[300px] h-[180px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
//               <img
//                 src={img.src}
//                 alt={img.alt}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Mock Videos Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {mockVideos.map((video) => (
//             <div key={video.id} className="rounded-lg overflow-hidden shadow-lg">
//               <video
//                 src={video.src}
//                 controls
//                 className="w-full h-[250px] object-cover"
//               />
//               <div className="p-4 bg-gray-900">
//                 <h3 className="text-lg font-semibold">{video.title}</h3>
//                 <p className="text-sm text-gray-400">Mock video uploaded</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React from "react";

// const medicalImages = [
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
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1588776814546-ec7ee0b97e0d?auto=format&fit=crop&w=1200&q=80",
//     alt: "Surgical team at work",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1603394579321-08be8d6c76c3?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical consultation",
//   },
// ];

// const HeroBanner = () => {
//   return (
//     <section className="w-full min-h-screen bg-white text-gray-900 flex items-center justify-center">
//       <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 min-h-screen">
//         {/* Left Text */}
//         <div className="flex flex-col justify-center px-10 py-12 bg-gray-50 space-y-6">
//           <h5 className="text-green-600 font-semibold uppercase">Welcome to Meditailor</h5>
//           <h1 className="text-5xl font-bold leading-tight">
//             Tailored Global Healthcare Journeys –<br />
//             Precision, Care, and Beyond
//           </h1>
//           <p className="text-gray-600 text-lg">
//             At Meditailor Healthcare, we craft end-to-end medical tourism experiences—combining India's finest hospitals,
//             personalised care, and recovery-focused travel. From cardiac surgeries to wellness retreats, our consensus-driven
//             approach ensures optimal outcomes, seamless logistics, and memories that heal.
//           </p>
//           <div className="flex gap-4">
//             <button className="bg-green-500 text-white px-6 py-3 rounded-full text-sm hover:bg-green-600">Free Consultations</button>
//             <button className="border border-green-500 text-green-500 px-6 py-3 rounded-full text-sm hover:bg-green-100">Discover More</button>
//           </div>
//         </div>

//         {/* Right Side: Scrolling Images + Video */}
//         <div className="relative bg-gradient-to-b from-green-800 to-green-600 overflow-hidden">
//           {/* Scrollable Images */}
//           <div className="flex overflow-x-auto space-x-4 px-4 py-6 scrollbar-hide">
//             {medicalImages.map((img) => (
//               <div key={img.id} className="flex-shrink-0 w-[300px] h-[200px] rounded-lg overflow-hidden shadow-lg">
//                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
//               </div>
//             ))}
//           </div>

//           {/* Play Video Button - Mock Overlay */}
//           <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 z-10">
//             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition">
//               <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//           </div>

//           {/* Mock Video */}
//           <div className="mt-24 px-4 pb-6">
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               controls
//               className="w-full h-[300px] object-cover rounded-lg shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;





// import React from "react";

// const medicalImages = [
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
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1588776814546-ec7ee0b97e0d?auto=format&fit=crop&w=1200&q=80",
//     alt: "Surgical team at work",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1603394579321-08be8d6c76c3?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical consultation",
//   },
// ];

// const HeroBanner = () => {
//   return (
//     <section className="w-full min-h-screen bg-white text-gray-900 flex items-center justify-center">
//       <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 min-h-screen">

//         {/* Left Side: Text & Scrollable Images */}
//         <div className="relative bg-gray-100 px-6 py-10 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold mb-6">
//             Excellence in Healthcare
//           </h2>
//           <p className="text-lg text-gray-600 mb-8">
//             Providing comprehensive care with cutting-edge technology
//           </p>
//           <div className="overflow-x-auto whitespace-nowrap flex space-x-4 pr-2">
//             {medicalImages.map((img) => (
//               <div key={img.id} className="inline-block w-[280px] h-[180px] flex-shrink-0 rounded-lg overflow-hidden shadow-md">
//                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side: Video Section */}
//         <div className="bg-green-900 text-white flex flex-col justify-center px-6 py-10">
//           <h3 className="text-3xl font-bold mb-4">Explore Our Facilities</h3>
//           <p className="text-gray-200 mb-6">
//             A virtual tour of our advanced medical centers and technologies.
//           </p>
//           <div className="rounded-lg overflow-hidden shadow-2xl">
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               controls
//               className="w-full h-[300px] object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React from "react";

// const medicalImages = [
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
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1588776814546-ec7ee0b97e0d?auto=format&fit=crop&w=1200&q=80",
//     alt: "Surgical team at work",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1603394579321-08be8d6c76c3?auto=format&fit=crop&w=1200&q=80",
//     alt: "Medical consultation",
//   },
// ];

// const HeroBanner = () => {
//   return (
//     <section className="w-full min-h-screen bg-white text-gray-900 flex items-center justify-center">
//       <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 min-h-screen">

//         {/* Left Side: Text & Scrollable Images */}
//         <div className="relative bg-gray-100 px-6 py-10 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold mb-6">
//             Excellence in Healthcare
//           </h2>
//           <p className="text-lg text-gray-600 mb-8">
//             Providing comprehensive care with cutting-edge technology
//           </p>
//           <div className="overflow-x-auto whitespace-nowrap flex space-x-6 pr-2">
//             {medicalImages.map((img) => (
//               <div
//                 key={img.id}
//                 className="inline-block w-[400px] h-[300px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
//               >
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side: Video Section */}
//         <div className="bg-green-900 text-white flex flex-col justify-center px-6 py-10">
//           <h3 className="text-3xl font-bold mb-4">Explore Our Facilities</h3>
//           <p className="text-gray-200 mb-6">
//             A virtual tour of our advanced medical centers and technologies.
//           </p>
//           <div className="rounded-xl overflow-hidden shadow-2xl">
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               controls
//               className="w-full h-[300px] object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




// import React, { useEffect, useRef } from "react";

// const medicalImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=80",
//     alt: "Modern hospital facility",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80",
//     alt: "Healthcare professionals",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=1600&q=80",
//     alt: "Medical equipment and labs",
//   },
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1588776814546-ec7ee0b97e0d?auto=format&fit=crop&w=1600&q=80",
//     alt: "Surgical team at work",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1603394579321-08be8d6c76c3?auto=format&fit=crop&w=1600&q=80",
//     alt: "Medical consultation",
//   },
// ];

// const HeroBanner = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
//         // Loop to start
//         const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
//         if (scrollRef.current.scrollLeft >= maxScroll - 420) {
//           setTimeout(() => scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" }), 1000);
//         }
//       }
//     }, 3000); // change every 3 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full min-h-screen bg-white text-gray-900 flex items-center justify-center">
//       <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 min-h-screen">

//         {/* Left: Scrolling Large Images with Text */}
//         <div className="bg-gray-50 px-6 py-12 flex flex-col justify-center">
//           <h2 className="text-5xl font-bold mb-4 leading-tight">
//             Excellence in Healthcare
//           </h2>
//           <p className="text-xl text-gray-600 mb-10">
//             Providing comprehensive care with cutting-edge technology
//           </p>
//           <div
//             className="overflow-x-auto flex space-x-6 scrollbar-hide"
//             ref={scrollRef}
//           >
//             {medicalImages.map((img) => (
//               <div
//                 key={img.id}
//                 className="flex-shrink-0 w-[600px] h-[400px] rounded-xl overflow-hidden shadow-xl"
//               >
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right: Video Section */}
//         <div className="bg-green-900 text-white flex flex-col justify-center px-6 py-12">
//           <h3 className="text-4xl font-bold mb-4">Explore Our Facilities</h3>
//           <p className="text-lg text-gray-300 mb-6">
//             A virtual tour of our advanced medical centers and technologies.
//           </p>
//           <div className="rounded-xl overflow-hidden shadow-2xl">
//             <video
//               src="https://www.w3schools.com/html/mov_bbb.mp4"
//               controls
//               autoPlay
//               loop
//               muted
//               className="w-full h-[400px] object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroBanner;




import React, { useEffect, useRef } from "react";

const medicalImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern hospital facility",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80",
    alt: "Healthcare professionals",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1580281657527-47d6b9b6038e?auto=format&fit=crop&w=1600&q=80",
    alt: "Medical equipment and labs",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1588776814546-ec7ee0b97e0d?auto=format&fit=crop&w=1600&q=80",
    alt: "Surgical team at work",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1603394579321-08be8d6c76c3?auto=format&fit=crop&w=1600&q=80",
    alt: "Medical consultation",
  },
];

const HeroBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 420, behavior: "smooth" });
        // Loop to start
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollRef.current.scrollLeft >= maxScroll - 420) {
          setTimeout(() => scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" }), 1000);
        }
      }
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen bg-white text-gray-900 flex items-center justify-center">
      <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* Left: Scrolling Large Images with Text */}
        <div className="bg-gray-50 px-6 py-12 flex flex-col justify-center">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            Excellence in Healthcare
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Providing comprehensive care with cutting-edge technology
          </p>
          <div
            className="overflow-x-auto flex space-x-6 scrollbar-hide"
            ref={scrollRef}
          >
            {medicalImages.map((img) => (
              <div
                key={img.id}
                className="flex-shrink-0 w-[600px] h-[400px] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Video Section */}
        <div className="bg-green-900 text-white flex flex-col justify-center px-6 py-12">
          <h3 className="text-4xl font-bold mb-4">Explore Our Facilities</h3>
          <p className="text-lg text-gray-300 mb-6">
            A virtual tour of our advanced medical centers and technologies.
          </p>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;











