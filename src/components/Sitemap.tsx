import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Sitemap</h1>
        <p className="text-gray-700 mb-6">
          Explore all the pages and resources available on the Meditailor website for your medical tourism needs.
        </p>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Main Pages</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><Link to="/" className="text-sm text-green-600 hover:text-red-600">Home</Link></li>
            <li><Link to="/ContactUsPage" className="text-sm text-green-600 hover:text-red-600">About Us</Link></li>
            <li><Link to="/careers" className="text-sm text-green-600 hover:text-red-600">Careers</Link></li>
            <li><Link to="/ContactUsPage" className="text-sm text-green-600 hover:text-red-600">Contact Us</Link></li>
            <li><Link to="/media" className="text-sm text-green-600 hover:text-red-600">Media</Link></li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">For Patients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><Link to="/doctors" className="text-sm text-green-600 hover:text-red-600">Find a Doctor</Link></li>
            <li><Link to="/ContactUsPage" className="text-sm text-green-600 hover:text-red-600">Book Appointment</Link></li>
            <li><Link to="/tours" className="text-sm text-green-600 hover:text-red-600">Health Packages</Link></li>
            <li><Link to="/tests" className="text-sm text-green-600 hover:text-red-600">Lab Tests</Link></li>
            <li><Link to="/patient-stories" className="text-sm text-green-600 hover:text-red-600">Patient Stories</Link></li>
            <li><Link to="/HospitalList" className="text-sm text-green-600 hover:text-red-600">Hospital Information</Link></li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Services</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><Link to="/chef-list" className="text-sm text-green-600 hover:text-red-600">Chefs</Link></li>
            <li><Link to="/spa-service-details" className="text-sm text-green-600 hover:text-red-600">Spa Services</Link></li>
            <li><Link to="/spa-service-details" className="text-sm text-green-600 hover:text-red-600">Physiotherapy</Link></li>
            <li><Link to="/translatorList" className="text-sm text-green-600 hover:text-red-600">Translators</Link></li>
            <li><Link to="/medicinecatalog" className="text-sm text-green-600 hover:text-red-600">Pharmacy</Link></li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Our Hospitals</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><Link to="/hospitals/delhi-ncr" className="text-sm text-green-600 hover:text-red-600">Delhi NCR</Link></li>
            <li><Link to="/hospitals/mumbai" className="text-sm text-green-600 hover:text-red-600">Mumbai</Link></li>
            <li><Link to="/hospitals/punjab" className="text-sm text-green-600 hover:text-red-600">Punjab</Link></li>
            <li><Link to="/hospitals/uttarakhand" className="text-sm text-green-600 hover:text-red-600">Uttarakhand</Link></li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Specialties</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><Link to="/specialties/oncology" className="text-sm text-green-600 hover:text-red-600">Cancer Care</Link></li>
            <li><Link to="/specialties/cardiology" className="text-sm text-green-600 hover:text-red-600">Cardiac Sciences</Link></li>
            <li><Link to="/specialties/neurology" className="text-sm text-green-600 hover:text-red-600">Neurosciences</Link></li>
            <li><Link to="/specialties/orthopedics" className="text-sm text-green-600 hover:text-red-600">Orthopaedics</Link></li>
            <li><Link to="/specialties/gynecology" className="text-sm text-green-600 hover:text-red-600">Gynecology</Link></li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Legal Pages</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li><Link to="/privacy-policy" className="text-sm text-green-600 hover:text-red-600">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="text-sm text-green-600 hover:text-red-600">Terms & Conditions</Link></li>
            <li><Link to="/sitemap" className="text-sm text-green-600 hover:text-red-600">Sitemap</Link></li>
          </ul>
        </section>

        <div className="text-center">
          <Link to="/" className="text-green-600 hover:text-red-600 font-semibold">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;