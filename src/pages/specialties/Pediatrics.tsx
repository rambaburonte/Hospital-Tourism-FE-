import React from 'react';

const Pediatrics: React.FC = () => (
  <div className="specialty-page min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Pediatrics</h1>
      <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
        The Pediatrics Department is dedicated to providing compassionate, comprehensive care for infants, children, and adolescents. Our team of pediatricians, pediatric specialists, and child life specialists ensures the physical, emotional, and developmental health of young patients in a family-centered environment.
      </p>

      {/* Understanding Pediatrics */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Pediatrics</h2>
        <p className="text-lg text-gray-600">
          Pediatrics focuses on the medical care of children from birth through adolescence. Our pediatricians address a wide range of health issues, from routine check-ups to complex conditions, with a focus on prevention, early intervention, and family support.
        </p>
      </section>

      {/* Pediatric Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pediatric Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Well-Child Visits</h3>
            <p className="text-gray-600">Routine check-ups, vaccinations, and developmental screenings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Emergency Care</h3>
            <p className="text-gray-600">24/7 care for acute illnesses and injuries in children.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Neonatal Care</h3>
            <p className="text-gray-600">Specialized care for premature and critically ill newborns in our NICU.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Surgery</h3>
            <p className="text-gray-600">Surgical interventions for congenital and acquired conditions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Child Psychology</h3>
            <p className="text-gray-600">Support for behavioral and mental health challenges in children.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Allergy & Immunology</h3>
            <p className="text-gray-600">Diagnosis and treatment of allergies and immune disorders.</p>
          </div>
        </div>
      </section>

      {/* Common Pediatric Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li><strong>Asthma:</strong> Chronic respiratory condition causing wheezing and breathlessness.</li>
          <li><strong>Ear Infections:</strong> Common infections causing pain and hearing issues.</li>
          <li><strong>ADHD:</strong> Attention-deficit/hyperactivity disorder affecting focus and behavior.</li>
          <li><strong>Diabetes:</strong> Type 1 diabetes requiring insulin management in children.</li>
          <li><strong>Food Allergies:</strong> Immune responses to certain foods causing symptoms.</li>
          <li><strong>Congenital Heart Defects:</strong> Structural heart issues present at birth.</li>
        </ul>
      </section>

      {/* Image Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Pediatrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.cdc.gov/-/media/images/cdc/child-growth.jpg"
              alt="Child Growth Chart"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Child Growth Chart</h3>
              <p className="text-gray-600 text-sm">Tracking growth to monitor child development.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/pediatric-exam.jpg"
              alt="Pediatric Exam"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Pediatric Exam</h3>
              <p className="text-gray-600 text-sm">Routine check-ups ensure children’s health and development.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.nichd.nih.gov/-/media/images/nicu-baby.jpg"
              alt="NICU"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Neonatal Intensive Care</h3>
              <p className="text-gray-600 text-sm">Specialized care for premature or critically ill newborns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Pediatrics</h2>
        <p className="text-gray-600 mb-6">These videos provide insights into pediatric health and care. [Note: Placeholder videos; replace with your hospital’s content.]</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5P5z0g7I8_w"
                title="Pediatric Well-Child Visits"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Pediatric Well-Child Visits</h3>
            <p className="text-gray-600 text-sm">The importance of routine check-ups for children.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/8O4X6tM3Q8Q"
                title="Managing Childhood Asthma"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Managing Childhood Asthma</h3>
            <p className="text-gray-600 text-sm">Learn about asthma triggers and treatment in children.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Care for Your Child’s Future</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our pediatric team is dedicated to your child’s health. Schedule an appointment today.
        </p>
        <a
          href="[Insert appointment link]"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Book an Appointment
        </a>
      </section>
    </div>
  </div>
);

export default Pediatrics;