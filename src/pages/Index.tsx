import React, { useEffect, useRef } from 'react';
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
import { useLocation } from 'react-router-dom';
import HospitalAdvertisement from '@/components/Advertisement';

const Watermark = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10 select-none"
      aria-hidden="true"
    >
      
      {/* For image watermark, uncomment below and place logo in public/ */}
      {/* <img
        src="/ZylogicLogo.png"
        alt="Watermark"
        className="w-[300px] md:w-[400px] lg:w-[500px] transform -rotate-45"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x100?text=Watermark'; }}
      /> */}
    </div>
  );
};

const Index = () => {
  const appointmentSectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  useEffect(() => {
    if (location.state && (location.state as { scrollToAppointment?: boolean }).scrollToAppointment) {
      appointmentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Watermark />
      <main className="flex-grow relative z-10">
        <HeroBanner />
        <div ref={appointmentSectionRef}>
          <AppointmentSection />
        </div>
        <SpecialtiesSection />
        <ExpertHelpSection />
        <TechnologySection />
        {/* <HospitalNetworkSection /> */}
        {/* <PatientStorySection /> */}
        <HospitalAdvertisement />
        <TopTourPlans />
        <VideoSection />
        <HealthBlogsSection />
        <AwardsSection />
      </main>
   
    </div>
  );
};

export default Index;
