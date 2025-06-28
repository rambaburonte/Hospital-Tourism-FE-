// import React from 'react';

// const Gastroenterology: React.FC = () => (
//   <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       {/* Header Section */}
//       <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Gastroenterology</h1>
//       <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//         The Gastroenterology Department provides expert care for disorders of the digestive system. Our team of gastroenterologists, endoscopists, and nutritionists uses advanced diagnostics and treatments to manage conditions affecting the stomach, intestines, liver, and pancreas, ensuring optimal digestive health.
//       </p>

//       {/* Understanding Gastroenterology */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Gastroenterology</h2>
//         <p className="text-lg text-gray-600">
//           Gastroenterology focuses on the diagnosis and treatment of digestive system disorders, including the esophagus, stomach, intestines, liver, and pancreas. Our specialists address conditions like GERD, IBS, and liver disease with a combination of medical, endoscopic, and surgical approaches.
//         </p>
//       </section>

//       {/* Gastroenterology Services */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gastroenterology Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Endoscopy</h3>
//             <p className="text-gray-600">Upper endoscopy and colonoscopy for diagnosis and treatment.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Liver Disease Management</h3>
//             <p className="text-gray-600">Care for hepatitis, cirrhosis, and fatty liver disease.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">IBD Clinic</h3>
//             <p className="text-gray-600">Specialized care for Crohn’s disease and ulcerative colitis.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">GI Surgery</h3>
//             <p className="text-gray-600">Minimally invasive surgeries for gallstones, hernias, and more.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Counseling</h3>
//             <p className="text-gray-600">Diet plans to manage digestive disorders and promote health.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">ERCP</h3>
//             <p className="text-gray-600">Procedure to diagnose and treat bile and pancreatic duct issues.</p>
//           </div>
//         </div>
//       </section>

//       {/* Common GI Conditions */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
//         <ul className="list-disc ml-6 text-gray-600 space-y-2">
//           <li><strong>GERD:</strong> Chronic acid reflux causing heartburn and esophageal damage.</li>
//           <li><strong>Irritable Bowel Syndrome (IBS):</strong> Abdominal pain and altered bowel habits.</li>
//           <li><strong>Hepatitis:</strong> Inflammation of the liver, often caused by viruses.</li>
//           <li><strong>Gallstones:</strong> Hardened deposits in the gallbladder causing pain.</li>
//           <li><strong>Pancreatitis:</strong> Inflammation of the pancreas, acute or chronic.</li>
//           <li><strong>Colorectal Polyps:</strong> Growths in the colon that may lead to cancer.</li>
//         </ul>
//       </section>

//       {/* Image Cards */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Gastroenterology</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src="https://www.niddk.nih.gov/-/media/images/digestive-system.jpg"
//               alt="Digestive System"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Digestive System</h3>
//               <p className="text-gray-600 text-sm">An overview of the digestive system’s organs and functions.</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/colonoscopy.jpg"
//               alt="Colonoscopy"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Colonoscopy</h3>
//               <p className="text-gray-600 text-sm">A procedure to examine the colon for polyps or cancer.</p>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/liver-ultrasound.jpg"
//               alt="Liver Ultrasound"
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Liver Ultrasound</h3>
//               <p className="text-gray-600 text-sm">Ultrasound imaging to assess liver health and detect abnormalities.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Video Cards */}
//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Gastroenterology</h2>
//         <p className="text-gray-600 mb-6">These videos provide insights into digestive health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="relative pb-56.25 h-0">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src="https://www.youtube.com/embed/4bXZVg_95lE"
//                 title="Understanding the Digestive System"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Digestive System</h3>
//             <p className="text-gray-600 text-sm">An overview of the digestive system and its functions.</p>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="relative pb-56.25 h-0">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src="https://www.youtube.com/embed/7g4Jm6_r4gU"
//                 title="What is GERD?"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mt-4">What is GERD?</h3>
//             <p className="text-gray-600 text-sm">Learn about acid reflux causes, symptoms, and treatments.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Improve Your Digestive Health</h2>
//         <p className="text-lg mb-6 max-w-2xl mx-auto">
//           Our gastroenterology team is here to help. Schedule an appointment today for expert care.
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

// export default Gastroenterology;















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

const Gastroenterology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:4545/api/hospitals/specialization/Gastroenterology');
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
    <div className="specialty-page min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Gastroenterology</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
          The Gastroenterology Department provides expert care for disorders of the digestive system. Below is a list of our hospitals specializing in gastroenterology.
        </p>

        {/* Gastroenterology Hospitals List */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gastroenterology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600">Loading gastroenterology hospitals...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600">No gastroenterology hospitals found.</p>
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

        {/* Understanding Gastroenterology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Gastroenterology</h2>
          <p className="text-lg text-gray-600">
            Gastroenterology focuses on the diagnosis and treatment of digestive system disorders, including the esophagus, stomach, intestines, liver, and pancreas. Our specialists address conditions like GERD, IBS, and liver disease with a combination of medical, endoscopic, and surgical approaches.
          </p>
        </section>

        {/* Gastroenterology Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gastroenterology Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Endoscopy</h3>
              <p className="text-gray-600">Upper endoscopy and colonoscopy for diagnosis and treatment.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Liver Disease Management</h3>
              <p className="text-gray-600">Care for hepatitis, cirrhosis, and fatty liver disease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">IBD Clinic</h3>
              <p className="text-gray-600">Specialized care for Crohn’s disease and ulcerative colitis.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">GI Surgery</h3>
              <p className="text-gray-600">Minimally invasive surgeries for gallstones, hernias, and more.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Counseling</h3>
              <p className="text-gray-600">Diet plans to manage digestive disorders and promote health.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">ERCP</h3>
              <p className="text-gray-600">Procedure to diagnose and treat bile and pancreatic duct issues.</p>
            </div>
          </div>
        </section>

        {/* Common GI Conditions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li><strong>GERD:</strong> Chronic acid reflux causing heartburn and esophageal damage.</li>
            <li><strong>Irritable Bowel Syndrome (IBS):</strong> Abdominal pain and altered bowel habits.</li>
            <li><strong>Hepatitis:</strong> Inflammation of the liver, often caused by viruses.</li>
            <li><strong>Gallstones:</strong> Hardened deposits in the gallbladder causing pain.</li>
            <li><strong>Pancreatitis:</strong> Inflammation of the pancreas, acute or chronic.</li>
            <li><strong>Colorectal Polyps:</strong> Growths in the colon that may lead to cancer.</li>
          </ul>
        </section>

        {/* Image Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Gastroenterology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.niddk.nih.gov/-/media/images/digestive-system.jpg"
                alt="Digestive System"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Digestive System</h3>
                <p className="text-gray-600 text-sm">An overview of the digestive system’s organs and functions.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/colonoscopy.jpg"
                alt="Colonoscopy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Colonoscopy</h3>
                <p className="text-gray-600 text-sm">A procedure to examine the colon for polyps or cancer.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/liver-ultrasound.jpg"
                alt="Liver Ultrasound"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Liver Ultrasound</h3>
                <p className="text-gray-600 text-sm">Ultrasound imaging to assess liver health and detect abnormalities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Gastroenterology</h2>
          <p className="text-gray-600 mb-6">These videos provide insights into digestive health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/4bXZVg_95lE"
                  title="Understanding the Digestive System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Digestive System</h3>
              <p className="text-gray-600 text-sm">An overview of the digestive system and its functions.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/7g4Jm6_r4gU"
                  title="What is GERD?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">What is GERD?</h3>
              <p className="text-gray-600 text-sm">Learn about acid reflux causes, symptoms, and treatments.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Improve Your Digestive Health</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our gastroenterology team is here to help. Schedule an appointment today for expert care.
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

export default Gastroenterology;