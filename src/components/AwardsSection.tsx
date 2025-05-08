
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const awards = [
  {
    title: "Accredited by NABH & NABL",
    icon: "🏆",
    description: "National Accreditation Board for Hospitals & Healthcare Providers"
  },
  {
    title: "Quality and Patient Safety",
    icon: "🛡️",
    description: "Recognized for excellence in healthcare quality standards"
  },
  {
    title: "JCI Accreditation",
    icon: "🌐",
    description: "Joint Commission International Certified Hospital"
  },
  {
    title: "Operational Excellence",
    icon: "⭐",
    description: "Award for operational efficiency and hospital management"
  },
  {
    title: "Healthcare Innovation",
    icon: "💡",
    description: "Recognized for implementing innovative medical technologies"
  },
  {
    title: "Best Medical Tourism Hospital",
    icon: "✈️",
    description: "Award for excellence in international patient care"
  },
  {
    title: "Green Hospital Award",
    icon: "🌱",
    description: "Sustainability and environmental consciousness in healthcare"
  },
  {
    title: "COVID-19 Response Excellence",
    icon: "🏥",
    description: "Recognition for pandemic response and management"
  }
];

const AwardsSection = () => {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">Awards</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {awards.slice(0, 4).map((award, index) => (
            <Card key={index} className="border-0 shadow-sm award-card">
              <CardContent className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="text-3xl mb-2">{award.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{award.title}</h3>
                <p className="text-xs text-gray-600">{award.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            View All Awards
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
