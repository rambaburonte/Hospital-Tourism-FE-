
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80",
    alt: "State-of-the-art medical equipment for precise diagnostics",
  }
];

const HeroBanner = () => {
  return (
    <div className="w-full mb-8">
      <Carousel className="w-full" opts={{ loop: true, align: "start" }} autoplay={true}>
        <CarouselContent>
          {bannerImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="p-1">
                <AspectRatio ratio={3 / 1} className="bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                    <div className="text-white p-6 md:p-12 max-w-xl">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2">Excellence in Healthcare</h2>
                      <p className="text-sm md:text-base mb-4">Providing comprehensive care with cutting-edge technology</p>
                    </div>
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
