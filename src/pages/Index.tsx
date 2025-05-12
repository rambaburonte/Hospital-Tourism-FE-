// src/pages/Index.tsx
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import AppointmentSection from '@/components/AppointmentSection';
import SpecialtiesSection from '@/components/SpecialtiesSection';
import ExpertHelpSection from '@/components/ExpertHelpSection';
import HospitalNetworkSection from '@/components/HospitalNetworkSection';
import PatientStorySection from '@/components/PatientStorySection';
import HealthBlogsSection from '@/components/HealthBlogsSection';
import AwardsSection from '@/components/AwardsSection';
import TechnologySection from '@/components/TechnologySection';
import TopTourPlans from '@/components/Tourplans';
import Footer from '@/components/Footer';
import VideoSection from '@/components/Videos';

const Index = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/6821a62df3613e190ca8896c/1ir1n28q5';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroBanner />
        <AppointmentSection />
        <SpecialtiesSection />
        <ExpertHelpSection />
        <TechnologySection />
        <HospitalNetworkSection />
        {/* <PatientStorySection /> */}
        <TopTourPlans />
        <VideoSection />
        <HealthBlogsSection />
        <AwardsSection />
      </main>
<<<<<<< HEAD
      
=======

>>>>>>> b48ae0f6ee4f3757b712133997439714739c1e37
    </div>
  );
};

export default Index;
