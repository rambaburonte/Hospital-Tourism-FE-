










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

// const Orthopedics: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Orthopedics`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch orthopedics hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for orthopedics
//         const orthopedicsHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'orthopedics')
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
//         const sortedHospitals = orthopedicsHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching orthopedics hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Orthopedics</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           The Orthopedics Department specializes in the diagnosis, treatment, and rehabilitation of musculoskeletal conditions. Below is a list of our hospitals specializing in orthopedics.
//         </p>

//         {/* Orthopedics Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Orthopedics Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading orthopedics hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No orthopedics hospitals found.</p>
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

//         {/* Understanding Orthopedics */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Orthopedics</h2>
//           <p className="text-lg text-gray-600">
//             Orthopedics focuses on conditions affecting the musculoskeletal system, including fractures, arthritis, and sports injuries. Our orthopedic specialists use advanced surgical and non-surgical techniques to treat conditions, restore function, and enhance quality of life.
//           </p>
//         </section>

//         {/* Orthopedic Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Orthopedic Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Joint Replacement</h3>
//               <p className="text-gray-600">Hip, knee, and shoulder replacements using minimally invasive techniques.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Sports Medicine</h3>
//               <p className="text-gray-600">Treatment of sports-related injuries, including ACL tears and rotator cuff injuries.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Spine Surgery</h3>
//               <p className="text-gray-600">Surgical and non-surgical treatments for herniated discs and spinal deformities.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Fracture Care</h3>
//               <p className="text-gray-600">Management of fractures with casting, surgery, or internal fixation.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Physical Therapy</h3>
//               <p className="text-gray-600">Customized rehabilitation programs to restore strength and mobility.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Orthopedics</h3>
//               <p className="text-gray-600">Care for congenital and developmental musculoskeletal conditions in children.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common Orthopedic Conditions */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>Osteoarthritis:</strong> Degenerative joint disease causing pain and stiffness.</li>
//             <li><strong>Fractures:</strong> Broken bones requiring immobilization or surgery.</li>
//             <li><strong>Rotator Cuff Injuries:</strong> Tears or inflammation in shoulder muscles.</li>
//             <li><strong>Herniated Disc:</strong> Spinal disc rupture causing back or leg pain.</li>
//             <li><strong>ACL Tears:</strong> Ligament injuries in the knee, common in athletes.</li>
//             <li><strong>Carpal Tunnel Syndrome:</strong> Nerve compression causing hand pain and numbness.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Orthopedics</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.orthoinfo.org/-/media/images/orthoinfo/knee-anatomy.jpg"
//                 alt="Knee Anatomy"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Knee Anatomy</h3>
//                 <p className="text-gray-600 text-sm">A view of the knee joint, showing bones, ligaments, and cartilage.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/xray-fracture.jpg"
//                 alt="Fracture X-Ray"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Fracture X-Ray</h3>
//                 <p className="text-gray-600 text-sm">X-rays help diagnose and monitor bone fractures.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/arthroscopy.jpg"
//                 alt="Arthroscopy"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Arthroscopy</h3>
//                 <p className="text-gray-600 text-sm">Minimally invasive surgery to diagnose and treat joint issues.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Orthopedics</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into orthopedic health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/8k6B1x8k6y4"
//                   title="Knee Replacement Surgery"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Knee Replacement Surgery</h3>
//               <p className="text-gray-600 text-sm">An overview of knee replacement procedures and recovery.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/9Zd6wo9C6g8"
//                   title="Managing Arthritis"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Managing Arthritis</h3>
//               <p className="text-gray-600 text-sm">Learn about arthritis causes, symptoms, and treatment options.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Restore Your Mobility</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Our orthopedic team is dedicated to helping you move pain-free. Schedule an appointment today.
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

// export default Orthopedics;












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

const Orthopedics: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Orthopedics`);
        if (!response.ok) {
          throw new Error('Failed to fetch orthopedics hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for orthopedics
        const orthopedicsHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'orthopedics')
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
        const sortedHospitals = orthopedicsHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orthopedics hospital data. Please try again later.');
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
            Expert Orthopedic Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our Orthopedics Department specializes in the diagnosis, treatment, and rehabilitation of musculoskeletal conditions, using advanced surgical and non-surgical techniques to restore function and enhance quality of life.
          </p>
        </div>

        {/* Orthopedics Hospitals List */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Specialized Orthopedic Hospitals</h2>
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading orthopedics hospitals...</p>
          ) : error ? (
            <p className="text-red-600 text-center text-lg">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No orthopedics hospitals found.</p>
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

        {/* Understanding Orthopedics */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Orthopedics</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            Orthopedics focuses on conditions affecting the musculoskeletal system, including fractures, arthritis, and sports injuries. Our orthopedic specialists use advanced surgical and non-surgical techniques to treat conditions, restore function, and enhance quality of life.
          </p>
        </section>

        {/* Orthopedic Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Advanced Orthopedic Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Joint Replacement</h3>
              <p className="text-gray-600 text-base leading-relaxed">Hip, knee, and shoulder replacements using minimally invasive techniques.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Sports Medicine</h3>
              <p className="text-gray-600 text-base leading-relaxed">Treatment of sports-related injuries, including ACL tears and rotator cuff injuries.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Spine Surgery</h3>
              <p className="text-gray-600 text-base leading-relaxed">Surgical and non-surgical treatments for herniated discs and spinal deformities.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Fracture Care</h3>
              <p className="text-gray-600 text-base leading-relaxed">Management of fractures with casting, surgery, or internal fixation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Physical Therapy</h3>
              <p className="text-gray-600 text-base leading-relaxed">Customized rehabilitation programs to restore strength and mobility.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Pediatric Orthopedics</h3>
              <p className="text-gray-600 text-base leading-relaxed">Care for congenital and developmental musculoskeletal conditions in children.</p>
            </div>
          </div>
        </section>

        {/* Common Orthopedic Conditions */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Conditions We Expertly Treat</h2>
          <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg">
            <li><strong className="text-gray-800">Osteoarthritis:</strong> Degenerative joint disease causing pain and stiffness.</li>
            <li><strong className="text-gray-800">Fractures:</strong> Broken bones requiring immobilization or surgery.</li>
            <li><strong className="text-gray-800">Rotator Cuff Injuries:</strong> Tears or inflammation in shoulder muscles.</li>
            <li><strong className="text-gray-800">Herniated Disc:</strong> Spinal disc rupture causing back or leg pain.</li>
            <li><strong className="text-gray-800">ACL Tears:</strong> Ligament injuries in the knee, common in athletes.</li>
            <li><strong className="text-gray-800">Carpal Tunnel Syndrome:</strong> Nerve compression causing hand pain and numbness.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Restore Your Mobility</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Our orthopedic team is dedicated to helping you move pain-free. Schedule an appointment today.
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

export default Orthopedics;