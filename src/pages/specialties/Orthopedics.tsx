import React from 'react';

const Orthopedics: React.FC = () => (
  <div className="specialty-page min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Orthopedics</h1>
      <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
        The Orthopedics Department specializes in the diagnosis, treatment, and rehabilitation of musculoskeletal conditions. Our team of expert orthopedic surgeons, physical therapists, and sports medicine specialists provides comprehensive care for bones, joints, muscles, and ligaments, helping patients regain mobility and live pain-free.
      </p>

      {/* Understanding Orthopedics */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Orthopedics</h2>
        <p className="text-lg text-gray-600">
          Orthopedics focuses on conditions affecting the musculoskeletal system, including fractures, arthritis, and sports injuries. Our orthopedic specialists use advanced surgical and non-surgical techniques to treat conditions, restore function, and enhance quality of life.
        </p>
      </section>

      {/* Orthopedic Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Orthopedic Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Joint Replacement</h3>
            <p className="text-gray-600">Hip, knee, and shoulder replacements using minimally invasive techniques.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sports Medicine</h3>
            <p className="text-gray-600">Treatment of sports-related injuries, including ACL tears and rotator cuff injuries.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Spine Surgery</h3>
            <p className="text-gray-600">Surgical and non-surgical treatments for herniated discs and spinal deformities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fracture Care</h3>
            <p className="text-gray-600">Management of fractures with casting, surgery, or internal fixation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Physical Therapy</h3>
            <p className="text-gray-600">Customized rehabilitation programs to restore strength and mobility.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Orthopedics</h3>
            <p className="text-gray-600">Care for congenital and developmental musculoskeletal conditions in children.</p>
          </div>
        </div>
      </section>

      {/* Common Orthopedic Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li><strong>Osteoarthritis:</strong> Degenerative joint disease causing pain and stiffness.</li>
          <li><strong>Fractures:</strong> Broken bones requiring immobilization or surgery.</li>
          <li><strong>Rotator Cuff Injuries:</strong> Tears or inflammation in shoulder muscles.</li>
          <li><strong>Herniated Disc:</strong> Spinal disc rupture causing back or leg pain.</li>
          <li><strong>ACL Tears:</strong> Ligament injuries in the knee, common in athletes.</li>
          <li><strong>Carpal Tunnel Syndrome:</strong> Nerve compression causing hand pain and numbness.</li>
        </ul>
      </section>

      {/* Image Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Orthopedics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.orthoinfo.org/-/media/images/orthoinfo/knee-anatomy.jpg"
              alt="Knee Anatomy"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Knee Anatomy</h3>
              <p className="text-gray-600 text-sm">A view of the knee joint, showing bones, ligaments, and cartilage.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/xray-fracture.jpg"
              alt="Fracture X-Ray"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Fracture X-Ray</h3>
              <p className="text-gray-600 text-sm">X-rays help diagnose and monitor bone fractures.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/arthroscopy.jpg"
              alt="Arthroscopy"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Arthroscopy</h3>
              <p className="text-gray-600 text-sm">Minimally invasive surgery to diagnose and treat joint issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Orthopedics</h2>
        <p className="text-gray-600 mb-6">These videos provide insights into orthopedic health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/8k6B1x8k6y4"
                title="Knee Replacement Surgery"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Knee Replacement Surgery</h3>
            <p className="text-gray-600 text-sm">An overview of knee replacement procedures and recovery.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/9Zd6wo9C6g8"
                title="Managing Arthritis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Managing Arthritis</h3>
            <p className="text-gray-600 text-sm">Learn about arthritis causes, symptoms, and treatment options.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Restore Your Mobility</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our orthopedic team is dedicated to helping you move pain-free. Schedule an appointment today.
        </p>
        <a
          href="/contact-us"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Book an Appointment
        </a>
      </section>
    </div>
  </div>
);

export default Orthopedics;