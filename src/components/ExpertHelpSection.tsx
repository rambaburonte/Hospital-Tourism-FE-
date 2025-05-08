
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const ExpertHelpSection = () => {
  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Looking for an Expert Opinion?</h2>
              <p className="text-gray-600">
                Our team of expert consultants can help guide you through your treatment options.
                Get personalized advice from our specialists who are leaders in their field.
              </p>
              <div className="mt-6">
                <Button className="bg-secondary hover:bg-secondary/90 text-white">
                  Find a Doctor <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Doctor consultation" 
              className="rounded-lg shadow-lg max-w-full md:max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertHelpSection;
