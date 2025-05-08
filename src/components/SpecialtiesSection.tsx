
import React from 'react';
import { Heart, Brain, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const specialtiesList = [
  { icon: <Heart className="h-6 w-6 text-primary" />, title: "Cardiology", description: "Heart & Vascular Care" },
  { icon: <Brain className="h-6 w-6 text-primary" />, title: "Neurology", description: "Brain & Nervous System" },
  { icon: <Check className="h-6 w-6 text-primary" />, title: "Orthopedics", description: "Joint & Bone Care" },
  { icon: <Check className="h-6 w-6 text-primary" />, title: "Oncology", description: "Cancer Care" },
  { icon: <Check className="h-6 w-6 text-primary" />, title: "Gastroenterology", description: "Digestive Disorders" },
  { icon: <Check className="h-6 w-6 text-primary" />, title: "Pediatrics", description: "Children's Health" },
  { icon: <Check className="h-6 w-6 text-primary" />, title: "Gynecology", description: "Women's Health" },
  { icon: <Check className="h-6 w-6 text-primary" />, title: "Urology", description: "Urinary System" },
];

const SpecialtiesSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Specialties & Procedures</h2>
        <div className="w-20 h-1 bg-primary mb-8"></div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {specialtiesList.map((specialty, index) => (
            <Card key={index} className="border border-gray-200 specialty-icon hover:border-primary">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-slate-50 p-3 rounded-full">
                    {specialty.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{specialty.title}</h3>
                    <p className="text-sm text-gray-600">{specialty.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <a href="#" className="flex items-center text-primary font-medium hover:underline">
            View All Specialties
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
