// import React from 'react';

// const Oncology: React.FC = () => (
//   <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       {/* Header Section */}
//       <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Oncology</h1>
//       <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//         The Oncology Department provides compassionate, cutting-edge cancer care. Our multidisciplinary team of oncologists, surgeons, radiologists, and support staff delivers personalized treatment plans, combining advanced therapies with emotional support to guide patients through their cancer journey.
//       </p>

//       {/* Understanding Oncology */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Oncology</h2>
//         <p className="text-lg text-gray-600">
//           Oncology is the medical specialty dedicated to the diagnosis, treatment, and prevention of cancer. Our oncologists treat all types of cancer, using a combination of surgery, chemotherapy, radiation, immunotherapy, and targeted therapies to achieve the best outcomes.
//         </p>
//       </section>

//       {/* Oncology Services */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Oncology Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Cancer Screening</h3>
//             <p className="text-gray-600">Early detection through mammograms, colonoscopies, and other screenings.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Chemotherapy</h3>
//             <p className="text-gray-600">Advanced chemotherapy regimens tailored to each patient’s needs.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Radiation Therapy</h3>
//             <p className="text-gray-600">Precise radiation treatments using state-of-the-art technology.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Surgical Oncology</h3>
//             <p className="text-gray-600">Minimally invasive and complex surgeries to remove tumors.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Immunotherapy</h3>
//             <p className="text-gray-600">Harnessing the immune system to fight cancer cells.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Palliative Care</h3>
//             <p className="text-gray-600">Supportive care to improve quality of life for cancer patients.</p>
//           </div>
//         </div>
//       </section>

//       {/* Common Cancers Treated */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Cancers We Treat</h2>
//         <ul className="list-disc ml-6 text-gray-600 space-y-2">
//           <li><strong>Breast Cancer:</strong> Abnormal growth in breast tissue, often detected through screening.</li>
//           <li><strong>Lung Cancer:</strong> Cancer of the lungs, commonly linked to smoking.</li>
//           <li><strong>Colorectal Cancer:</strong> Cancer of the colon or rectum, often preventable with screening.</li>
//           <li><strong>Prostate Cancer:</strong> Cancer in the prostate gland, common in older men.</li>
//           <li><strong>Leukemia:</strong> Cancer of the blood and bone marrow.</li>
//           <li><strong>Skin Cancer:</strong> Abnormal growth of skin cells, including melanoma.</li>
//         </ul>
//       </section>

//       {/* Image Cards */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Oncology</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src="https://www.cancer.gov/-/media/images/cancer-gov/about-cancer/cancer-cells.jpg"
//               alt="Cancer Cells"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Cancer Cells</h3>
//               <p className="text-gray-600 text-sm">Microscopic view of cancer cells, highlighting their abnormal growth.</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/radiation-therapy.jpg"
//               alt="Radiation Therapy"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Radiation Therapy</h3>
//               <p className="text-gray-600 text-sm">Advanced equipment used to target cancer cells with radiation.</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/pet-scan.jpg"
//               alt="PET Scan"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">PET Scan</h3>
//               <p className="text-gray-600 text-sm">PET scans detect cancer spread and monitor treatment response.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Video Cards */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Oncology</h2>
//         <p className="text-gray-600 mb-6">These videos provide insights into cancer care and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="relative pb-56.25 h-0">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src="https://www.youtube.com/embed/9xLqO63z3rA"
//                 title="Understanding Cancer"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding Cancer</h3>
//             <p className="text-gray-600 text-sm">An overview of cancer, its causes, and treatment options.</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="relative pb-56.25 h-0">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src="https://www.youtube.com/embed/6tX6R5Fds0w"
//                 title="Chemotherapy Explained"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mt-4">Chemotherapy Explained</h3>
//             <p className="text-gray-600 text-sm">Learn about chemotherapy and its role in cancer treatment.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Fight Cancer with Confidence</h2>
//         <p className="text-lg mb-6 max-w-2xl mx-auto">
//           Our oncology team is here to support you every step of the way. Schedule a consultation today.
//         </p>
//         <a
//           href="/contact-us"
//           className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
//         >
//           Book an Appointment
//         </a>
//       </section>
//     </div>
//   </div>
// );

// export default Oncology;












// import React, { useEffect, useState } from 'react';

// interface Hospital {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   rating: string;
//   address: string;
//   specialization: string;
// }

// const Oncology: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch('http://localhost:4545/api/hospitals/specialization/cancer');
//         if (!response.ok) {
//           throw new Error('Failed to fetch oncology hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for oncology
//         const oncologyHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'oncology')
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
//         const sortedHospitals = oncologyHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching oncology hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Oncology</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           The Oncology Department provides compassionate, cutting-edge cancer care. Below is a list of our hospitals specializing in oncology.
//         </p>

//         {/* Oncology Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Oncology Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading oncology hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No oncology hospitals found.</p>
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

//         {/* Understanding Oncology */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Oncology</h2>
//           <p className="text-lg text-gray-600">
//             Oncology is the medical specialty dedicated to the diagnosis, treatment, and prevention of cancer. Our oncologists treat all types of cancer, using a combination of surgery, chemotherapy, radiation, immunotherapy, and targeted therapies to achieve the best outcomes.
//           </p>
//         </section>

//         {/* Oncology Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Oncology Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Cancer Screening</h3>
//               <p className="text-gray-600">Early detection through mammograms, colonoscopies, and other screenings.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Chemotherapy</h3>
//               <p className="text-gray-600">Advanced chemotherapy regimens tailored to each patient’s needs.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Radiation Therapy</h3>
//               <p className="text-gray-600">Precise radiation treatments using state-of-the-art technology.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Surgical Oncology</h3>
//               <p className="text-gray-600">Minimally invasive and complex surgeries to remove tumors.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Immunotherapy</h3>
//               <p className="text-gray-600">Harnessing the immune system to fight cancer cells.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Palliative Care</h3>
//               <p className="text-gray-600">Supportive care to improve quality of life for cancer patients.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common Cancers Treated */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Cancers We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>Breast Cancer:</strong> Abnormal growth in breast tissue, often detected through screening.</li>
//             <li><strong>Lung Cancer:</strong> Cancer of the lungs, commonly linked to smoking.</li>
//             <li><strong>Colorectal Cancer:</strong> Cancer of the colon or rectum, often preventable with screening.</li>
//             <li><strong>Prostate Cancer:</strong> Cancer in the prostate gland, common in older men.</li>
//             <li><strong>Leukemia:</strong> Cancer of the blood and bone marrow.</li>
//             <li><strong>Skin Cancer:</strong> Abnormal growth of skin cells, including melanoma.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Oncology</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.cancer.gov/-/media/images/cancer-gov/about-cancer/cancer-cells.jpg"
//                 alt="Cancer Cells"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Cancer Cells</h3>
//                 <p className="text-gray-600 text-sm">Microscopic view of cancer cells, highlighting their abnormal growth.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/radiation-therapy.jpg"
//                 alt="Radiation Therapy"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Radiation Therapy</h3>
//                 <p className="text-gray-600 text-sm">Advanced equipment used to target cancer cells with radiation.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/pet-scan.jpg"
//                 alt="PET Scan"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">PET Scan</h3>
//                 <p className="text-gray-600 text-sm">PET scans detect cancer spread and monitor treatment response.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Oncology</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into cancer care and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/9xLqO63z3rA"
//                   title="Understanding Cancer"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding Cancer</h3>
//               <p className="text-gray-600 text-sm">An overview of cancer, its causes, and treatment options.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/6tX6R5Fds0w"
//                   title="Chemotherapy Explained"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Chemotherapy Explained</h3>
//               <p className="text-gray-600 text-sm">Learn about chemotherapy and its role in cancer treatment.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Fight Cancer with Confidence</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Our oncology team is here to support you every step of the way. Schedule a consultation today.
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

// export default Oncology;











import React, { useEffect, useState } from 'react';

interface Hospital {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  address: string;
  specialization: string;
}

const Oncology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:4545/api/hospitals/specialization/cancer');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Validate and map API response to Hospital interface
        const oncologyHospitals: Hospital[] = data
          .filter((hospital: any) => 
            hospital && 
            hospital.specialization && 
            hospital.specialization.toLowerCase() === 'cancer'
          )
          .map((hospital: any) => ({
            id: hospital.hospitalId?.toString() || 'unknown',
            name: hospital.hospitalName || 'Unknown Hospital',
            description: hospital.hospitalDescription || 'No description available',
            image: hospital.hospitalImage || 'https://via.placeholder.com/150',
            rating: hospital.rating || 'Not rated',
            address: hospital.address || 'No address provided',
            specialization: hospital.specialization || 'cancer',
          }));

        // Sort hospitals alphabetically by name
        const sortedHospitals = oncologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching oncology hospitals:', err.message, err.stack);
        setError('Error fetching oncology hospital data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="specialty-page min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Oncology</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
          The Oncology Department provides compassionate, cutting-edge cancer care. Below is a list of our hospitals specializing in oncology.
        </p>

        {/* Oncology Hospitals List */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Oncology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600">Loading oncology hospitals...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600">No oncology hospitals found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map(hospital => (
                <div key={hospital.id} className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 mb-1"><strong>Description:</strong> {hospital.description}</p>
                  <p className="text-gray-600 mb-1"><strong>Location:</strong> {hospital.address}</p>
                  <p className="text-gray-600 mb-1"><strong>Rating:</strong> {hospital.rating}</p>
                  <p className="text-gray-600"><strong>Specialization:</strong> {hospital.specialization}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Understanding Oncology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Oncology</h2>
          <p className="text-lg text-gray-600">
            Oncology is the medical specialty dedicated to the diagnosis, treatment, and prevention of cancer. Our oncologists treat all types of cancer, using a combination of surgery, chemotherapy, radiation, immunotherapy, and targeted therapies to achieve the best outcomes.
          </p>
        </section>

        {/* Oncology Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Oncology Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cancer Screening</h3>
              <p className="text-gray-600">Early detection through mammograms, colonoscopies, and other screenings.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Chemotherapy</h3>
              <p className="text-gray-600">Advanced chemotherapy regimens tailored to each patient’s needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Radiation Therapy</h3>
              <p className="text-gray-600">Precise radiation treatments using state-of-the-art technology.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Surgical Oncology</h3>
              <p className="text-gray-600">Minimally invasive and complex surgeries to remove tumors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Immunotherapy</h3>
              <p className="text-gray-600">Harnessing the immune system to fight cancer cells.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Palliative Care</h3>
              <p className="text-gray-600">Supportive care to improve quality of life for cancer patients.</p>
            </div>
          </div>
        </section>

        {/* Common Cancers Treated */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Cancers We Treat</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li><strong>Breast Cancer:</strong> Abnormal growth in breast tissue, often detected through screening.</li>
            <li><strong>Lung Cancer:</strong> Cancer of the lungs, commonly linked to smoking.</li>
            <li><strong>Colorectal Cancer:</strong> Cancer of the colon or rectum, often preventable with screening.</li>
            <li><strong>Prostate Cancer:</strong> Cancer in the prostate gland, common in older men.</li>
            <li><strong>Leukemia:</strong> Cancer of the blood and bone marrow.</li>
            <li><strong>Skin Cancer:</strong> Abnormal growth of skin cells, including melanoma.</li>
          </ul>
        </section>

        {/* Image Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Oncology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.cancer.gov/-/media/images/cancer-gov/about-cancer/cancer-cells.jpg"
                alt="Cancer Cells"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Cancer Cells</h3>
                <p className="text-gray-600 text-sm">Microscopic view of cancer cells, highlighting their abnormal growth.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/radiation-therapy.jpg"
                alt="Radiation Therapy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Radiation Therapy</h3>
                <p className="text-gray-600 text-sm">Advanced equipment used to target cancer cells with radiation.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/pet-scan.jpg"
                alt="PET Scan"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">PET Scan</h3>
                <p className="text-gray-600 text-sm">PET scans detect cancer spread and monitor treatment response.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Oncology</h2>
          <p className="text-gray-600 mb-6">These videos provide insights into cancer care and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/9xLqO63z3rA"
                  title="Understanding Cancer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding Cancer</h3>
              <p className="text-gray-600 text-sm">An overview of cancer, its causes, and treatment options.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/6tX6R5Fds0w"
                  title="Chemotherapy Explained"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Chemotherapy Explained</h3>
              <p className="text-gray-600 text-sm">Learn about chemotherapy and its role in cancer treatment.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Fight Cancer with Confidence</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our oncology team is here to support you every step of the way. Schedule a consultation today.
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
};

export default Oncology;