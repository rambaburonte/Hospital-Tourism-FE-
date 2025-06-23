import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Terms & Conditions</h1>
        <p className="text-sm text-gray-600 mb-4">Last Updated: June 23, 2025</p>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Introduction</h2>
          <p className="text-gray-700">
            Welcome to Meditailor. By accessing or using our website, mobile apps, or services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Use of Services</h2>
          <p className="text-gray-700">
            Our services include facilitating medical tourism, such as hospital bookings, doctor consultations, travel arrangements, and additional services like translation and spa treatments. You agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Provide accurate and complete information during booking or consultation.</li>
            <li>Use our services only for lawful purposes.</li>
            <li>Not misuse our website or services, including attempting unauthorized access.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Bookings and Payments</h2>
          <p className="text-gray-700">
            All bookings are subject to availability. Payments must be made through our secure payment gateways. Cancellation and refund policies are as follows:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Cancellations made 7 days prior to the appointment are eligible for a full refund, minus processing fees.</li>
            <li>No refunds for cancellations within 48 hours of the appointment.</li>
            <li>Refunds, if applicable, will be processed within 10 business days.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Medical Services</h2>
          <p className="text-gray-700">
            Meditailor facilitates medical services but is not responsible for the quality or outcome of treatments provided by hospitals or doctors. You acknowledge that:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Medical treatments carry inherent risks, and outcomes are not guaranteed.</li>
            <li>You are responsible for verifying the credentials of healthcare providers.</li>
            <li>Meditailor is not liable for any medical complications or dissatisfaction.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700">
            To the fullest extent permitted by law, Meditailor is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services, including but not limited to travel disruptions, medical outcomes, or data breaches.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            For questions about these Terms & Conditions, please contact us at:
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

export default TermsConditions;