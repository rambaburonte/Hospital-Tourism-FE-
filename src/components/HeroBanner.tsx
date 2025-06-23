
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
//     src: "./madical.jpg",
//     alt: "Modern hospital facility",
//   },
//   {
//     id: 2,
//     src: "./Doctors.jpg",
//     alt: "Healthcare professionals",
//   },
//   {
//     id: 3,
//     src: "./spaAndPysio.jpg",
//     alt: "Medical equipment and labs",
//   },
//   {
//     id: 4,
//     src: "./Hospital.jpg",
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
//    <section className="w-full py-16 bg-opacity-50 from-white to-gray-100 ">
//   <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">
    
//     {/* Image Carousel */}
//     <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
//       <AspectRatio ratio={19 / 9}>
//         <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
//           <CarouselContent>
//             {bannerImages.map((image) => (
//               <CarouselItem key={image.id}>
//                 <div className="relative w-full h-full overflow-hidden rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out">
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="w-full h-full object-cover  transition-transform duration-500 ease-in-out"
//                   />
                 
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
//       <AspectRatio ratio={20 / 10.5}>
//         <video
//           src="video1.mp4"
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











import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  { id: 1, src: "./madical.jpg", alt: "Modern hospital facility" },
  { id: 2, src: "./Doctors.jpg", alt: "Healthcare professionals" },
  { id: 3, src: "./spaAndPysio.jpg", alt: "Medical equipment and labs" },
  { id: 4, src: "./Hospital.jpg", alt: "Medical equipment and labs" },
];

const HeroBanner = () => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 5000);
    return () => {
      api.off("select", onSelect);
      clearInterval(autoplayInterval);
    };
  }, [api, onSelect]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onVol = () => setIsMuted(video.muted);
    video.addEventListener("volumechange", onVol);
    return () => video.removeEventListener("volumechange", onVol);
  }, []);

  return (
    <section className="w-full py-16 bg-opacity-50 from-white to-gray-100">
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
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </AspectRatio>
        </div>

        {/* Video Section with Mute/Unmute */}
        <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
          <AspectRatio ratio={20 / 10.5}>
            <video
              ref={videoRef}
              src="video1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200"
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 rounded-full p-2 text-white focus:outline-none"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 9v6h4l5 5V4l-5 5H9z"/>
                  <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 9v6h4l5 5V4l-5 5H9z"/>
                  <path d="M16.5 7.5c1.5 1.5 1.5 4 0 5.5"/>
                  <path d="M14 5c2.5 2.5 2.5 6.5 0 9"/>
                </svg>
              )}
            </button>
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;



