
import React, { useEffect, useState, useCallback } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const bannerImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
    alt: "Modern hospital facility with advanced medical technology",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
    alt: "Compassionate healthcare team providing patient care",
  },
  {
    id: 3,
    src: "/lovable-uploads/d255c6d0-9b7b-486a-972b-65a7adbf62e4.png",
    alt: "Edge Technology with Hybrids - Medical heart model",
    title: "Edge Technology with Hybrids",
    description: "Our state-of-the-art hybrid operating rooms combine advanced imaging systems with surgical facilities, enabling minimally invasive procedures with greater precision and improved patient outcomes.",
    additionalText: "The integration of digital imaging, robotic assistance, and real-time visualization allows our surgeons to perform complex procedures with enhanced accuracy and reduced recovery times for patients."
  }
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
    
    // Auto-advance the carousel
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
    <div className="w-full mb-8">
      <Carousel className="w-full" opts={{ loop: true, align: "start" }} setApi={setApi}>
        <CarouselContent>
          {bannerImages.map((image, index) => (
            <CarouselItem key={image.id}>
              <div className="p-1">
                <AspectRatio ratio={3 / 1} className="bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 flex items-center">
                    {index === 2 ? (
                      // Special layout for the third slide (the heart image)
                      <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div></div> {/* Empty div to push content to the right */}
                          <div className="text-gray-800 bg-white/90 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">{image.title}</h2>
                            <p className="text-gray-600 mb-4">{image.description}</p>
                            <p className="text-gray-600 mb-6">{image.additionalText}</p>
                            <Button className="bg-primary hover:bg-primary-dark text-white">
                              Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Default layout for other slides
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                        <div className="text-white p-6 md:p-12 max-w-xl">
                          <h2 className="text-2xl md:text-4xl font-bold mb-2">Excellence in Healthcare</h2>
                          <p className="text-sm md:text-base mb-4">Providing comprehensive care with cutting-edge technology</p>
                        </div>
                      </div>
                    )}
                  </div>
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4" />
        <CarouselNext className="right-2 md:right-4" />
      </Carousel>
    </div>
  );
};

export default HeroBanner;
