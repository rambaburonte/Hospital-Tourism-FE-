
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from 'lucide-react';

const PatientStorySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-1 bg-primary text-white p-6">
                <h2 className="text-xl font-bold mb-4">Mrs. Vijay Lakshmi's Recovery from Severe Pneumonia</h2>
                <div className="flex items-center mt-4">
                  <span className="bg-white text-primary px-2 py-1 rounded text-xs font-medium">#MaxSuccessStory</span>
                </div>
              </div>
              <div className="md:col-span-2 p-6">
                <CardContent className="p-0">
                  <Quote className="h-8 w-8 text-primary opacity-30 mb-2" />
                  <p className="text-gray-600 mb-6">
                    After struggling with severe pneumonia and high CO2 levels, I received exceptional care at Max Healthcare. 
                    The medical team's expertise and dedication led to my full recovery. I am grateful for their compassionate 
                    approach and the advanced treatments they provided.
                  </p>
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Patient" 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">Mrs. Vijay Lakshmi</h4>
                      <p className="text-sm text-gray-600">Recovered from Severe Pneumonia at Max Hospital</p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PatientStorySection;
