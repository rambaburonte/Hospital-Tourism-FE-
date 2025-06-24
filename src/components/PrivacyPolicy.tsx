import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-4">Last Updated: June 23, 2025</p>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Introduction</h2>
          <p className="text-gray-700">
            At Meditailor, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our medical tourism services, including our website, mobile apps, and related services.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li><strong>Personal Information:</strong> Name, email address, phone number, passport details, and medical history provided during booking or consultation.</li>
            <li><strong>Payment Information:</strong> Credit card details or other payment methods processed through secure third-party providers.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and interaction with our services.</li>
            <li><strong>Health Information:</strong> Medical records or health-related data shared to facilitate treatment planning.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Facilitate medical tourism services, including hospital bookings, doctor appointments, and travel arrangements.</li>
            <li>Communicate with you regarding your treatment plans, follow-ups, and customer support.</li>
            <li>Process payments securely and issue invoices.</li>
            <li>Improve our website and services based on usage analytics.</li>
            <li>Comply with legal obligations and protect against fraud.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Sharing Your Information</h2>
          <p className="text-gray-700">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Hospitals, doctors, and medical staff involved in your treatment.</li>
            <li>Third-party service providers for payment processing, travel logistics, or translation services.</li>
            <li>Legal authorities when required by law or to protect our rights.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            We do not sell your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Your Rights</h2>
          <p className="text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Access, correct, or delete your personal information.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request a copy of your data in a portable format.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            To exercise these rights, please contact us at <a href="mailto:Info.meditailor@gmail.com" className="text-green-600 hover:text-red-600">Info.meditailor@gmail.com</a>.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            Email: <a href="mailto:Info.meditailor@gmail.com" className="text-green-600 hover:text-red-600">Info.meditailor@gmail.com</a><br />
            Phone: 8595114141
          </p>
        </section>

        <div className="text-center">
          <Link to="/" className="text-green-600 hover:text-red-600 font-semibold">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;