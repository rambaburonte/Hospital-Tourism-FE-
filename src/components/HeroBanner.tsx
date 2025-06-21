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
    src: "./madical.jpg",
    alt: "Modern hospital facility",
  },
  {
    id: 2,
    src: "./Doctors.jpg",
    alt: "Healthcare professionals",
  },
  {
    id: 3,
    src: "./spaAndPysio.jpg",
    alt: "Medical equipment and labs",
  },
  {
    id: 4,
    src: "./Hospital.jpg",
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
                    className="w-full h-full object-cover  transition-transform duration-500 ease-in-out"
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
    {/* Video Section */}
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
      <AspectRatio ratio={20 / 10.5}>
        <video
          src="video1.mp4"
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



