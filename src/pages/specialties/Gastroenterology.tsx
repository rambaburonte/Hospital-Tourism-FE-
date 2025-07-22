

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

// const Gastroenterology: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Gastroenterology`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch gastroenterology hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for gastroenterology
//         const gastroenterologyHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'gastroenterology')
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
//         const sortedHospitals = gastroenterologyHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching gastroenterology hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Gastroenterology</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           The Gastroenterology Department provides expert care for disorders of the digestive system. Below is a list of our hospitals specializing in gastroenterology.
//         </p>

//         {/* Gastroenterology Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gastroenterology Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading gastroenterology hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No gastroenterology hospitals found.</p>
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

//         {/* Understanding Gastroenterology */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Gastroenterology</h2>
//           <p className="text-lg text-gray-600">
//             Gastroenterology focuses on the diagnosis and treatment of digestive system disorders, including the esophagus, stomach, intestines, liver, and pancreas. Our specialists address conditions like GERD, IBS, and liver disease with a combination of medical, endoscopic, and surgical approaches.
//           </p>
//         </section>

//         {/* Gastroenterology Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gastroenterology Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Endoscopy</h3>
//               <p className="text-gray-600">Upper endoscopy and colonoscopy for diagnosis and treatment.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Liver Disease Management</h3>
//               <p className="text-gray-600">Care for hepatitis, cirrhosis, and fatty liver disease.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">IBD Clinic</h3>
//               <p className="text-gray-600">Specialized care for Crohn’s disease and ulcerative colitis.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">GI Surgery</h3>
//               <p className="text-gray-600">Minimally invasive surgeries for gallstones, hernias, and more.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Counseling</h3>
//               <p className="text-gray-600">Diet plans to manage digestive disorders and promote health.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">ERCP</h3>
//               <p className="text-gray-600">Procedure to diagnose and treat bile and pancreatic duct issues.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common GI Conditions */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>GERD:</strong> Chronic acid reflux causing heartburn and esophageal damage.</li>
//             <li><strong>Irritable Bowel Syndrome (IBS):</strong> Abdominal pain and altered bowel habits.</li>
//             <li><strong>Hepatitis:</strong> Inflammation of the liver, often caused by viruses.</li>
//             <li><strong>Gallstones:</strong> Hardened deposits in the gallbladder causing pain.</li>
//             <li><strong>Pancreatitis:</strong> Inflammation of the pancreas, acute or chronic.</li>
//             <li><strong>Colorectal Polyps:</strong> Growths in the colon that may lead to cancer.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Gastroenterology</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.niddk.nih.gov/-/media/images/digestive-system.jpg"
//                 alt="Digestive System"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Digestive System</h3>
//                 <p className="text-gray-600 text-sm">An overview of the digestive system’s organs and functions.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/colonoscopy.jpg"
//                 alt="Colonoscopy"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Colonoscopy</h3>
//                 <p className="text-gray-600 text-sm">A procedure to examine the colon for polyps or cancer.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/liver-ultrasound.jpg"
//                 alt="Liver Ultrasound"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Liver Ultrasound</h3>
//                 <p className="text-gray-600 text-sm">Ultrasound imaging to assess liver health and detect abnormalities.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Gastroenterology</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into digestive health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/4bXZVg_95lE"
//                   title="Understanding the Digestive System"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Digestive System</h3>
//               <p className="text-gray-600 text-sm">An overview of the digestive system and its functions.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/7g4Jm6_r4gU"
//                   title="What is GERD?"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">What is GERD?</h3>
//               <p className="text-gray-600 text-sm">Learn about acid reflux causes, symptoms, and treatments.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Improve Your Digestive Health</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Our gastroenterology team is here to help. Schedule an appointment today for expert care.
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

// export default Gastroenterology;









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

// const Gastroenterology: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Gastroenterology`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch gastroenterology hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for gastroenterology
//         const gastroenterologyHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'gastroenterology')
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
//         const sortedHospitals = gastroenterologyHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching gastroenterology hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-800">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"> {/* Increased padding-top */}

//         {/* Header Section */}
//         <div className="text-center mb-16"> {/* Increased margin-bottom */}
//           <h1 className="text-6xl md:text-7xl font-extrabold text-blue-800 mb-8 tracking-tight leading-tight"> {/* Larger, deeper blue, tighter tracking */}
//             Expert Gastroenterology Care
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
//             Our Gastroenterology Department is dedicated to providing comprehensive and compassionate care for all disorders of the digestive system. We utilize advanced diagnostics and treatment methods to ensure optimal patient outcomes.
//           </p>
//         </div>

//         {/* Gastroenterology Hospitals List */}
//         <section className="mb-20"> {/* Increased margin-bottom */}
//           <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Specialized Gastroenterology Hospitals</h2> {/* Larger, bolder, more margin */}
//           {loading ? (
//             <p className="text-gray-600 text-center text-lg">Loading gastroenterology hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600 text-center text-lg">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600 text-center text-lg">No gastroenterology hospitals found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Slightly increased gap */}
//               {hospitals.map(hospital => (
//                 <div
//                   key={hospital.id}
//                   className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1" // Slightly more padding, rounded corners, subtle border, subtle lift on hover
//                 >
//                   <img
//                     src={hospital.image}
//                     alt={hospital.name}
//                     className="w-full h-60 object-cover rounded-lg mb-5 transform hover:scale-102 transition-transform duration-300" // Slightly taller image, subtle scale on hover
//                   />
//                   <h3 className="text-2xl font-bold text-blue-700 mb-3">{hospital.name}</h3> {/* Deeper blue, bolder */}
//                   <p className="text-gray-600 text-base leading-relaxed mb-2">
//                     <strong className="font-semibold">Description:</strong> {hospital.description}
//                   </p>
//                   <p className="text-gray-600 text-base leading-relaxed mb-2">
//                     <strong className="font-semibold">Location:</strong> {hospital.address}
//                   </p>
//                   <p className="text-gray-600 text-base leading-relaxed mb-2">
//                     <strong className="font-semibold">Rating:</strong> {hospital.rating}
//                   </p>
//                   <p className="text-gray-600 text-base leading-relaxed">
//                     <strong className="font-semibold">Specialization:</strong> {hospital.specialization}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Understanding Gastroenterology */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Gastroenterology</h2>
//           <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
//             Gastroenterology is the branch of medicine focused on the diagnosis, treatment, and prevention of diseases related to the digestive system. This includes the esophagus, stomach, small intestine, large intestine (colon), rectum, liver, gallbladder, and pancreas. Our specialists employ a holistic approach, integrating medical treatments, endoscopic procedures, and nutritional guidance.
//           </p>
//         </section>

//         {/* Gastroenterology Services */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Advanced Gastroenterology Services</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-2xl font-semibold text-blue-700 mb-3">Diagnostic & Therapeutic Endoscopy</h3>
//               <p className="text-gray-600 text-base leading-relaxed">Advanced procedures like upper endoscopy, colonoscopy, and capsule endoscopy for precise diagnosis and minimally invasive treatment.</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-2xl font-semibold text-blue-700 mb-3">Liver & Pancreatic Disease Management</h3>
//               <p className="text-gray-600 text-base leading-relaxed">Comprehensive care for conditions such as hepatitis, cirrhosis, fatty liver disease, pancreatitis, and pancreatic cysts.</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-2xl font-semibold text-blue-700 mb-3">Inflammatory Bowel Disease (IBD) Clinic</h3>
//               <p className="text-gray-600 text-base leading-relaxed">Specialized, multidisciplinary care for Crohn’s disease and ulcerative colitis, including biologic therapies and long-term management.</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-2xl font-semibold text-blue-700 mb-3">Gastrointestinal Oncology</h3>
//               <p className="text-gray-600 text-base leading-relaxed">Diagnosis, staging, and management of cancers affecting the digestive tract, in collaboration with oncology specialists.</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-2xl font-semibold text-blue-700 mb-3">Nutritional & Dietary Counseling</h3>
//               <p className="text-gray-600 text-base leading-relaxed">Personalized diet plans and nutritional support to manage symptoms, promote healing, and improve overall digestive health.</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-2xl font-semibold text-blue-700 mb-3">ERCP (Endoscopic Retrograde Cholangiopancreatography)</h3>
//               <p className="text-gray-600 text-base leading-relaxed">A specialized endoscopic procedure for diagnosing and treating conditions of the bile ducts and pancreatic duct.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common GI Conditions */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Conditions We Expertly Treat</h2>
//           <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg"> {/* Increased spacing, added left padding for list bullets */}
//             <li><strong className="text-gray-800">Gastroesophageal Reflux Disease (GERD):</strong> Chronic acid reflux causing heartburn, regurgitation, and potential esophageal damage.</li>
//             <li><strong className="text-gray-800">Irritable Bowel Syndrome (IBS):</strong> A common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, diarrhea or constipation.</li>
//             <li><strong className="text-gray-800">Hepatitis (A, B, C):</strong> Inflammation of the liver, often caused by viral infections, leading to liver damage.</li>
//             <li><strong className="text-gray-800">Gallstones & Biliary Tract Disorders:</strong> Hardened deposits in the gallbladder that can cause severe pain, blockages, and inflammation.</li>
//             <li><strong className="text-gray-800">Pancreatitis (Acute & Chronic):</strong> Inflammation of the pancreas, which can range from mild discomfort to severe, life-threatening illness.</li>
//             <li><strong className="text-gray-800">Colorectal Polyps & Cancer Screening:</strong> Growths in the colon and rectum that can sometimes develop into cancer, with a focus on early detection.</li>
//             <li><strong className="text-gray-800">Celiac Disease & Food Intolerances:</strong> Diagnosing and managing adverse reactions to certain foods, including gluten intolerance.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Visual Insights into Gastroenterology</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl transform hover:-translate-y-1"> {/* More rounded, larger shadow, subtle lift */}
//               <img
//                 src="https://www.niddk.nih.gov/-/media/images/digestive-system.jpg"
//                 alt="Digestive System"
//                 className="w-full h-56 object-cover rounded-t-xl" // Taller image, rounded top
//               />
//               <div className="p-6"> {/* More padding */}
//                 <h3 className="text-xl font-semibold text-blue-700 mb-2">The Human Digestive System</h3>
//                 <p className="text-gray-600 text-base leading-relaxed">An illustrative overview of the complex organs and functions involved in digestion and nutrient absorption.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl transform hover:-translate-y-1">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/colonoscopy.jpg"
//                 alt="Colonoscopy Procedure"
//                 className="w-full h-56 object-cover rounded-t-xl"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-blue-700 mb-2">Understanding Colonoscopy</h3>
//                 <p className="text-gray-600 text-base leading-relaxed">A visual guide to the colonoscopy procedure, used for examining the large intestine for abnormalities.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl transform hover:-translate-y-1">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/liver-ultrasound.jpg"
//                 alt="Liver Ultrasound Scan"
//                 className="w-full h-56 object-cover rounded-t-xl"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-blue-700 mb-2">Liver Ultrasound Imaging</h3>
//                 <p className="text-gray-600 text-base leading-relaxed">Learn how ultrasound imaging is used to assess liver health, detect diseases, and guide treatments.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Educational Videos on Digestive Health</h2>
//           <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
//             These informative videos provide deeper insights into common digestive conditions and the advanced treatments available at our hospital.
//             <br />
//             <span className="text-sm italic">[Note: Placeholder videos; replace `src` with actual YouTube embed URLs for your hospital’s content.]</span>
//           </p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Increased gap */}
//             <div className="bg-white rounded-xl shadow-lg p-6 transition-shadow duration-300 hover:shadow-xl"> {/* More rounded, larger shadow */}
//               <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden"> {/* Ensures aspect ratio for responsive video, rounded */}
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/g_C9B6A1k_E?si=your-video-id-1" // Replace with actual YouTube embed URL
//                   title="Understanding the Digestive System"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-2xl font-semibold text-blue-700 mt-6 mb-2">Understanding Your Digestive System</h3>
//               <p className="text-gray-600 text-base leading-relaxed">An animated overview explaining the journey of food and the vital roles of digestive organs.</p>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg p-6 transition-shadow duration-300 hover:shadow-xl">
//               <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/g_C9B6A1k_E?si=your-video-id-2" // Replace with actual YouTube embed URL
//                   title="What is GERD?"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-2xl font-semibold text-blue-700 mt-6 mb-2">What is GERD (Acid Reflux Disease)?</h3>
//               <p className="text-gray-600 text-base leading-relaxed">Learn about the causes, symptoms, and effective treatment options for Gastroesophageal Reflux Disease.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl"> {/* Darker blue, more padding, larger shadow, more rounded */}
//           <h2 className="text-4xl font-bold mb-6">Take the Next Step for Your Digestive Health</h2> {/* Larger, bolder heading */}
//           <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
//             Don't let digestive issues impact your quality of life. Our expert gastroenterology team is here to provide the specialized care you need.
//           </p>
//           <a
//             href="/contact-us"
//             className="inline-block bg-white text-blue-700 font-semibold px-12 py-5 rounded-full hover:bg-gray-100 transition duration-300 text-xl shadow-md hover:shadow-lg transform hover:-translate-y-1" // Larger button, deeper blue text, more shadow, subtle lift on hover
//           >
//             Book an Appointment
//           </a>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Gastroenterology;










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

const Gastroenterology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Gastroenterology`);
        if (!response.ok) {
          throw new Error('Failed to fetch gastroenterology hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for gastroenterology
        const gastroenterologyHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'gastroenterology')
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
        const sortedHospitals = gastroenterologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching gastroenterology hospital data. Please try again later.');
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
            Expert Gastroenterology Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our Gastroenterology Department is dedicated to providing comprehensive and compassionate care for all disorders of the digestive system. We utilize advanced diagnostics and treatment methods to ensure optimal patient outcomes.
          </p>
        </div>

        {/* Gastroenterology Hospitals List */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Specialized Gastroenterology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading gastroenterology hospitals...</p>
          ) : error ? (
            <p className="text-red-600 text-center text-lg">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No gastroenterology hospitals found.</p>
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

        {/* Understanding Gastroenterology */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Gastroenterology</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            Gastroenterology is the branch of medicine focused on the diagnosis, treatment, and prevention of diseases related to the digestive system. This includes the esophagus, stomach, small intestine, large intestine (colon), rectum, liver, gallbladder, and pancreas. Our specialists employ a holistic approach, integrating medical treatments, endoscopic procedures, and nutritional guidance.
          </p>
        </section>

        {/* Gastroenterology Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Advanced Gastroenterology Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Diagnostic & Therapeutic Endoscopy</h3>
              <p className="text-gray-600 text-base leading-relaxed">Advanced procedures like upper endoscopy, colonoscopy, and capsule endoscopy for precise diagnosis and minimally invasive treatment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Liver & Pancreatic Disease Management</h3>
              <p className="text-gray-600 text-base leading-relaxed">Comprehensive care for conditions such as hepatitis, cirrhosis, fatty liver disease, pancreatitis, and pancreatic cysts.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Inflammatory Bowel Disease (IBD) Clinic</h3>
              <p className="text-gray-600 text-base leading-relaxed">Specialized, multidisciplinary care for Crohn’s disease and ulcerative colitis, including biologic therapies and long-term management.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Gastrointestinal Oncology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Diagnosis, staging, and management of cancers affecting the digestive tract, in collaboration with oncology specialists.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Nutritional & Dietary Counseling</h3>
              <p className="text-gray-600 text-base leading-relaxed">Personalized diet plans and nutritional support to manage symptoms, promote healing, and improve overall digestive health.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">ERCP (Endoscopic Retrograde Cholangiopancreatography)</h3>
              <p className="text-gray-600 text-base leading-relaxed">A specialized endoscopic procedure for diagnosing and treating conditions of the bile ducts and pancreatic duct.</p>
            </div>
          </div>
        </section>

        {/* Common GI Conditions */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Conditions We Expertly Treat</h2>
          <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg">
            <li><strong className="text-gray-800">Gastroesophageal Reflux Disease (GERD):</strong> Chronic acid reflux causing heartburn, regurgitation, and potential esophageal damage.</li>
            <li><strong className="text-gray-800">Irritable Bowel Syndrome (IBS):</strong> A common disorder affecting the large intestine, causing cramping, abdominal pain, bloating, gas, diarrhea or constipation.</li>
            <li><strong className="text-gray-800">Hepatitis (A, B, C):</strong> Inflammation of the liver, often caused by viral infections, leading to liver damage.</li>
            <li><strong className="text-gray-800">Gallstones & Biliary Tract Disorders:</strong> Hardened deposits in the gallbladder that can cause severe pain, blockages, and inflammation.</li>
            <li><strong className="text-gray-800">Pancreatitis (Acute & Chronic):</strong> Inflammation of the pancreas, which can range from mild discomfort to severe, life-threatening illness.</li>
            <li><strong className="text-gray-800">Colorectal Polyps & Cancer Screening:</strong> Growths in the colon and rectum that can sometimes develop into cancer, with a focus on early detection.</li>
            <li><strong className="text-gray-800">Celiac Disease & Food Intolerances:</strong> Diagnosing and managing adverse reactions to certain foods, including gluten intolerance.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Take the Next Step for Your Digestive Health</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't let digestive issues impact your quality of life. Our expert gastroenterology team is here to provide the specialized care you need.
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

export default Gastroenterology;