
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const TechnologySection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Medical Technology" 
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Edge Technology with Hybrids
            </h2>
            <p className="text-gray-600 mb-4">
              Our state-of-the-art hybrid operating rooms combine advanced imaging systems with 
              surgical facilities, enabling minimally invasive procedures with greater precision 
              and improved patient outcomes.
            </p>
            <p className="text-gray-600 mb-6">
              The integration of digital imaging, robotic assistance, and real-time visualization 
              allows our surgeons to perform complex procedures with enhanced accuracy and reduced 
              recovery times for patients.
            </p>
            <Button className="bg-primary hover:bg-primary-dark text-white">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
