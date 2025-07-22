





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

// const Urology: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/urology`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch urology hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for urology
//         const urologyHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'urology')
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
//         const sortedHospitals = urologyHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching urology hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Urology</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           The Urology Department provides expert care for disorders of the urinary tract and male reproductive system. Below is a list of our hospitals specializing in urology.
//         </p>

//         {/* Urology Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Urology Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading urology hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No urology hospitals found.</p>
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

//         {/* Understanding Urology */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Urology</h2>
//           <p className="text-lg text-gray-600">
//             Urology focuses on the diagnosis and treatment of conditions affecting the urinary tract (kidneys, ureters, bladder, urethra) and male reproductive organs. Our urologists manage conditions like urinary incontinence, prostate cancer, and erectile dysfunction with a combination of medical and surgical approaches.
//           </p>
//         </section>

//         {/* Urology Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Urology Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Kidney Stone Treatment</h3>
//               <p className="text-gray-600">Non-invasive and surgical options for kidney stone removal.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Prostate Care</h3>
//               <p className="text-gray-600">Management of BPH and prostate cancer with medication or surgery.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Bladder Health</h3>
//               <p className="text-gray-600">Treatment for incontinence, infections, and bladder cancer.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Urologic Surgery</h3>
//               <p className="text-gray-600">Minimally invasive and robotic surgeries for urologic conditions.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Male Infertility</h3>
//               <p className="text-gray-600">Evaluation and treatment for male reproductive issues.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Urology</h3>
//               <p className="text-gray-600">Care for congenital urologic conditions in children.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common Urologic Conditions */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>Kidney Stones:</strong> Hard deposits in the kidneys causing pain and obstruction.</li>
//             <li><strong>Prostate Cancer:</strong> Cancer of the prostate gland, common in older men.</li>
//             <li><strong>Urinary Incontinence:</strong> Loss of bladder control, affecting quality of life.</li>
//             <li><strong>BPH:</strong> Enlarged prostate causing urinary symptoms.</li>
//             <li><strong>Bladder Infections:</strong> Recurrent infections requiring medical management.</li>
//             <li><strong>Erectile Dysfunction:</strong> Inability to maintain an erection, treatable with medication or surgery.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Urology</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.niddk.nih.gov/-/media/images/urinary-system.jpg"
//                 alt="Urinary System"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Urinary System</h3>
//                 <p className="text-gray-600 text-sm">An overview of the urinary tract and its functions.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/kidney-stone.jpg"
//                 alt="Kidney Stone"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Kidney Stone</h3>
//                 <p className="text-gray-600 text-sm">Imaging of kidney stones for diagnosis and treatment planning.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/cystoscopy.jpg"
//                 alt="Cystoscopy"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Cystoscopy</h3>
//                 <p className="text-gray-600 text-sm">A procedure to examine the bladder and urethra.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Urology</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into urologic health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/2Xz8A5vBWrU"
//                   title="Understanding the Urinary System"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Urinary System</h3>
//               <p className="text-gray-600 text-sm">An overview of the urinary tract and its role in health.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/5P5z0g7I8_w"
//                   title="Managing Kidney Stones"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//              τί
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Managing Kidney Stones</h3>
//               <p className="text-gray-600 text-sm">Learn about kidney stone causes and treatments.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Take Charge of Your Urologic Health</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Our urology team is here to provide expert care. Schedule an appointment today.
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

// export default Urology;









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

const Urology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/urology`);
        if (!response.ok) {
          throw new Error('Failed to fetch urology hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for urology
        const urologyHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'urology')
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
        const sortedHospitals = urologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching urology hospital data. Please try again later.');
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
            Expert Urology Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our Urology Department provides expert care for disorders of the urinary tract and male reproductive system, utilizing advanced medical and surgical approaches for optimal outcomes.
          </p>
        </div>

        {/* Urology Hospitals List */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Specialized Urology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading urology hospitals...</p>
          ) : error ? (
            <p className="text-red-600 text-center text-lg">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No urology hospitals found.</p>
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

        {/* Understanding Urology */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Urology</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            Urology focuses on the diagnosis and treatment of conditions affecting the urinary tract (kidneys, ureters, bladder, urethra) and male reproductive organs. Our urologists manage conditions like urinary incontinence, prostate cancer, and erectile dysfunction with a combination of medical and surgical approaches.
          </p>
        </section>

        {/* Urology Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Advanced Urology Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Kidney Stone Treatment</h3>
              <p className="text-gray-600 text-base leading-relaxed">Non-invasive and surgical options for kidney stone removal.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Prostate Care</h3>
              <p className="text-gray-600 text-base leading-relaxed">Management of BPH and prostate cancer with medication or surgery.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Bladder Health</h3>
              <p className="text-gray-600 text-base leading-relaxed">Treatment for incontinence, infections, and bladder cancer.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Urologic Surgery</h3>
              <p className="text-gray-600 text-base leading-relaxed">Minimally invasive and robotic surgeries for urologic conditions.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Male Infertility</h3>
              <p className="text-gray-600 text-base leading-relaxed">Evaluation and treatment for male reproductive issues.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Pediatric Urology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Care for congenital urologic conditions in children.</p>
            </div>
          </div>
        </section>

        {/* Common Urologic Conditions */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Conditions We Expertly Treat</h2>
          <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg">
            <li><strong className="text-gray-800">Kidney Stones:</strong> Hard deposits in the kidneys causing pain and obstruction.</li>
            <li><strong className="text-gray-800">Prostate Cancer:</strong> Cancer of the prostate gland, common in older men.</li>
            <li><strong className="text-gray-800">Urinary Incontinence:</strong> Loss of bladder control, affecting quality of life.</li>
            <li><strong className="text-gray-800">BPH:</strong> Enlarged prostate causing urinary symptoms.</li>
            <li><strong className="text-gray-800">Bladder Infections:</strong> Recurrent infections requiring medical management.</li>
            <li><strong className="text-gray-800">Erectile Dysfunction:</strong> Inability to maintain an erection, treatable with medication or surgery.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Take Charge of Your Urologic Health</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Our urology team is here to provide expert care. Schedule an appointment today.
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

export default Urology;