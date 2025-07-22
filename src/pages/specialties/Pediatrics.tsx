










// import React, { useEffect, useState } from 'react';
// import { BASE_URL } from '@/config/config'; // Adjust the import path as necessary
// interface Hospital {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   rating: string;
//   address: string;
//   specialization: string;
// }

// const Pediatrics: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/pediatrics`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch pediatrics hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for pediatrics
//         const pediatricsHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'pediatrics')
//           .map((hospital: any) => ({
//             id: hospital.hospitalId.toString(),
//             name: hospital.hospitalName,
//             description: hospital.hospitalDescription,
//             image: hospital.hospitalImage,
//             rating: hospital.rating,
//             address: hospital.address,
//             specialization: hospital.specialization,
//           }));

//         // Sort hospitals alphabetically by name
//         const sortedHospitals = pediatricsHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching pediatrics hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Pediatrics</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           The Pediatrics Department is dedicated to providing compassionate, comprehensive care for infants, children, and adolescents. Below is a list of our hospitals specializing in pediatrics.
//         </p>

//         {/* Pediatrics Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pediatrics Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading pediatrics hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No pediatrics hospitals found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {hospitals.map(hospital => (
//                 <div key={hospital.id} className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
//                   <img
//                     src={hospital.image}
//                     alt={hospital.name}
//                     className="w-full h-48 object-cover mb-4"
//                   />
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name}</h3>
//                   <p className="text-gray-600 mb-1"><strong>Description:</strong> {hospital.description}</p>
//                   <p className="text-gray-600 mb-1"><strong>Location:</strong> {hospital.address}</p>
//                   <p className="text-gray-600 mb-1"><strong>Rating:</strong> {hospital.rating}</p>
//                   <p className="text-gray-600"><strong>Specialization:</strong> {hospital.specialization}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Understanding Pediatrics */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Pediatrics</h2>
//           <p className="text-lg text-gray-600">
//             Pediatrics focuses on the medical care of children from birth through adolescence. Our pediatricians address a wide range of health issues, from routine check-ups to complex conditions, with a focus on prevention, early intervention, and family support.
//           </p>
//         </section>

//         {/* Pediatric Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Pediatric Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Well-Child Visits</h3>
//               <p className="text-gray-600">Routine check-ups, vaccinations, and developmental screenings.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Emergency Care</h3>
//               <p className="text-gray-600">24/7 care for acute illnesses and injuries in children.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Neonatal Care</h3>
//               <p className="text-gray-600">Specialized care for premature and critically ill newborns in our NICU.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Surgery</h3>
//               <p className="text-gray-600">Surgical interventions for congenital and acquired conditions.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Child Psychology</h3>
//               <p className="text-gray-600">Support for behavioral and mental health challenges in children.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Allergy & Immunology</h3>
//               <p className="text-gray-600">Diagnosis and treatment of allergies and immune disorders.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common Pediatric Conditions */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>Asthma:</strong> Chronic respiratory condition causing wheezing and breathlessness.</li>
//             <li><strong>Ear Infections:</strong> Common infections causing pain and hearing issues.</li>
//             <li><strong>ADHD:</strong> Attention-deficit/hyperactivity disorder affecting focus and behavior.</li>
//             <li><strong>Diabetes:</strong> Type 1 diabetes requiring insulin management in children.</li>
//             <li><strong>Food Allergies:</strong> Immune responses to certain foods causing symptoms.</li>
//             <li><strong>Congenital Heart Defects:</strong> Structural heart issues present at birth.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Pediatrics</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.cdc.gov/-/media/images/cdc/child-growth.jpg"
//                 alt="Child Growth Chart"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Child Growth Chart</h3>
//                 <p className="text-gray-600 text-sm">Tracking growth to monitor child development.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/pediatric-exam.jpg"
//                 alt="Pediatric Exam"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Pediatric Exam</h3>
//                 <p className="text-gray-600 text-sm">Routine check-ups ensure children’s health and development.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.nichd.nih.gov/-/media/images/nicu-baby.jpg"
//                 alt="NICU"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Neonatal Intensive Care</h3>
//                 <p className="text-gray-600 text-sm">Specialized care for premature or critically ill newborns.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Pediatrics</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into pediatric health and care. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/5P5z0g7I8_w"
//                   title="Pediatric Well-Child Visits"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Pediatric Well-Child Visits</h3>
//               <p className="text-gray-600 text-sm">The importance of routine check-ups for children.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/8O4X6tM3Q8Q"
//                   title="Managing Childhood Asthma"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Managing Childhood Asthma</h3>
//               <p className="text-gray-600 text-sm">Learn about asthma triggers and treatment in children.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Care for Your Child’s Future</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Our pediatric team is dedicated to your child’s health. Schedule an appointment today.
//           </p>
//           <a
//             href="/contact-us"
//             className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
//           >
//             Book an Appointment
//           </a>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Pediatrics;










import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/config/config'; // Adjust the import path as necessary

interface Hospital {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  address: string;
  specialization: string;
}

const Pediatrics: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/pediatrics`);
        if (!response.ok) {
          throw new Error('Failed to fetch pediatrics hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for pediatrics
        const pediatricsHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'pediatrics')
          .map((hospital: any) => ({
            id: hospital.hospitalId.toString(),
            name: hospital.hospitalName,
            description: hospital.hospitalDescription,
            image: hospital.hospitalImage,
            rating: hospital.rating,
            address: hospital.address,
            specialization: hospital.specialization,
          }));

        // Sort hospitals alphabetically by name
        const sortedHospitals = pediatricsHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching pediatrics hospital data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="specialty-page min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold text-blue-800 mb-8 tracking-tight leading-tight">
            Expert Pediatric Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our Pediatrics Department is dedicated to providing compassionate, comprehensive care for infants, children, and adolescents, focusing on prevention, early intervention, and family support.
          </p>
        </div>

        {/* Pediatrics Hospitals List */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Specialized Pediatric Hospitals</h2>
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading pediatrics hospitals...</p>
          ) : error ? (
            <p className="text-red-600 text-center text-lg">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No pediatrics hospitals found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {hospitals.map(hospital => (
                <div
                  key={hospital.id}
                  className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1"
                >
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-60 object-cover rounded-lg mb-5 transform hover:scale-102 transition-transform duration-300"
                  />
                  <h3 className="text-2xl font-bold text-blue-700 mb-3">{hospital.name}</h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-2">
                    <strong className="font-semibold">Description:</strong> {hospital.description}
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed mb-2">
                    <strong className="font-semibold">Location:</strong> {hospital.address}
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed mb-2">
                    <strong className="font-semibold">Rating:</strong> {hospital.rating}
                  </p>
                  <p className="text-gray-600 text-base leading-relaxed">
                    <strong className="font-semibold">Specialization:</strong> {hospital.specialization}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Understanding Pediatrics */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Pediatrics</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            Pediatrics focuses on the medical care of children from birth through adolescence. Our pediatricians address a wide range of health issues, from routine check-ups to complex conditions, with a focus on prevention, early intervention, and family support.
          </p>
        </section>

        {/* Pediatric Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Advanced Pediatric Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Well-Child Visits</h3>
              <p className="text-gray-600 text-base leading-relaxed">Routine check-ups, vaccinations, and developmental screenings.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Pediatric Emergency Care</h3>
              <p className="text-gray-600 text-base leading-relaxed">24/7 care for acute illnesses and injuries in children.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Neonatal Care</h3>
              <p className="text-gray-600 text-base leading-relaxed">Specialized care for premature and critically ill newborns in our NICU.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Pediatric Surgery</h3>
              <p className="text-gray-600 text-base leading-relaxed">Surgical interventions for congenital and acquired conditions.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Child Psychology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Support for behavioral and mental health challenges in children.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Allergy & Immunology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Diagnosis and treatment of allergies and immune disorders.</p>
            </div>
          </div>
        </section>

        {/* Common Pediatric Conditions */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Conditions We Expertly Treat</h2>
          <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg">
            <li><strong className="text-gray-800">Asthma:</strong> Chronic respiratory condition causing wheezing and breathlessness.</li>
            <li><strong className="text-gray-800">Ear Infections:</strong> Common infections causing pain and hearing issues.</li>
            <li><strong className="text-gray-800">ADHD:</strong> Attention-deficit/hyperactivity disorder affecting focus and behavior.</li>
            <li><strong className="text-gray-800">Diabetes:</strong> Type 1 diabetes requiring insulin management in children.</li>
            <li><strong className="text-gray-800">Food Allergies:</strong> Immune responses to certain foods causing symptoms.</li>
            <li><strong className="text-gray-800">Congenital Heart Defects:</strong> Structural heart issues present at birth.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Care for Your Child’s Future</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Our pediatric team is dedicated to your child’s health. Schedule an appointment today.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-white text-blue-700 font-semibold px-12 py-5 rounded-full hover:bg-gray-100 transition duration-300 text-xl shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Book an Appointment
          </a>
        </section>
      </div>
    </div>
  );
};

export default Pediatrics;