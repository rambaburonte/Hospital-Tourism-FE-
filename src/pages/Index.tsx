
import React from 'react';
import Header from '@/components/Header';
import AppointmentSection from '@/components/AppointmentSection';
import SpecialtiesSection from '@/components/SpecialtiesSection';
import ExpertHelpSection from '@/components/ExpertHelpSection';
import HospitalNetworkSection from '@/components/HospitalNetworkSection';
import PatientStorySection from '@/components/PatientStorySection';
import HealthBlogsSection from '@/components/HealthBlogsSection';
import AwardsSection from '@/components/AwardsSection';
import TechnologySection from '@/components/TechnologySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AppointmentSection />
        <SpecialtiesSection />
        <ExpertHelpSection />
        <TechnologySection />
        <HospitalNetworkSection />
        <PatientStorySection />
        <HealthBlogsSection />
        <AwardsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
