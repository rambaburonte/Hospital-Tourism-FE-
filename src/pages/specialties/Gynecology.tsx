










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

// const Gynecology: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Gynecology`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch gynecology hospitals');
//         }
//         const data = await response.json();

//         // Map API response to Hospital interface and filter for gynecology
//         const gynecologyHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'gynecology')
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
//         const sortedHospitals = gynecologyHospitals.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );

//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching gynecology hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Gynecology</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           The Gynecology Department provides comprehensive care for women’s reproductive health. Below is a list of our hospitals specializing in gynecology.
//         </p>

//         {/* Gynecology Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gynecology Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading gynecology hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No gynecology hospitals found.</p>
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

//         {/* Understanding Gynecology */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Gynecology</h2>
//           <p className="text-lg text-gray-600">
//             Gynecology focuses on the health of the female reproductive system, including the uterus, ovaries, and vagina. Our gynecologists address conditions like menstrual disorders, infertility, and gynecologic cancers, with a focus on prevention, early detection, and advanced treatments.
//           </p>
//         </section>

//         {/* Gynecology Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gynecology Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Well-Woman Exams</h3>
//               <p className="text-gray-600">Annual screenings, Pap smears, and breast exams for preventive care.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Obstetrics</h3>
//               <p className="text-gray-600">Comprehensive prenatal, delivery, and postpartum care.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Minimally Invasive Surgery</h3>
//               <p className="text-gray-600">Laparoscopic and robotic surgeries for fibroids and endometriosis.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Infertility Treatment</h3>
//               <p className="text-gray-600">Fertility assessments and assisted reproductive technologies.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Menopause Management</h3>
//               <p className="text-gray-600">Hormone therapy and lifestyle counseling for menopausal symptoms.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Gynecologic Oncology</h3>
//               <p className="text-gray-600">Specialized care for ovarian, uterine, and cervical cancers.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common Gynecologic Conditions */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>Fibroids:</strong> Non-cancerous growths in the uterus causing pain or bleeding.</li>
//             <li><strong>Endometriosis:</strong> Tissue growth outside the uterus causing pelvic pain.</li>
//             <li><strong>PCOS:</strong> Hormonal disorder affecting ovulation and menstrual cycles.</li>
//             <li><strong>Urinary Incontinence:</strong> Loss of bladder control, common in women.</li>
//             <li><strong>Cervical Cancer:</strong> Cancer of the cervix, often preventable with screening.</li>
//             <li><strong>Menstrual Disorders:</strong> Irregular or painful periods requiring management.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Gynecology</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.womenshealth.gov/-/media/images/female-reproductive-system.jpg"
//                 alt="Female Reproductive System"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Female Reproductive System</h3>
//                 <p className="text-gray-600 text-sm">An overview of the female reproductive organs.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/ultrasound-pregnancy.jpg"
//                 alt="Ultrasound"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Ultrasound</h3>
//                 <p className="text-gray-600 text-sm">Ultrasound imaging for pregnancy and gynecologic conditions.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/hysterosalpingography.jpg"
//                 alt="Hysterosalpingography"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Hysterosalpingography</h3>
//                 <p className="text-gray-600 text-sm">Imaging to assess the uterus and fallopian tubes.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Gynecology</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into women’s health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/8x6C3rWn2Xs"
//                   title="Women’s Reproductive Health"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Women’s Reproductive Health</h3>
//               <p className="text-gray-600 text-sm">An overview of gynecologic health and care.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/6t6x6r5Fds0"
//                   title="Understanding Endometriosis"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding Endometriosis</h3>
//               <p className="text-gray-600 text-sm">Learn about endometriosis symptoms and treatments.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Empowering Women’s Health</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Our gynecology team is here to support your health. Schedule an appointment today.
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

// export default Gynecology;














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

const Gynecology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Gynecology`);
        if (!response.ok) {
          throw new Error('Failed to fetch gynecology hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for gynecology
        const gynecologyHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'gynecology')
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
        const sortedHospitals = gynecologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching gynecology hospital data. Please try again later.');
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
            Expert Gynecology Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our Gynecology Department provides comprehensive care for women’s reproductive health, focusing on prevention, early detection, and advanced treatments for conditions affecting the female reproductive system.
          </p>
        </div>

        {/* Gynecology Hospitals List */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Specialized Gynecology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading gynecology hospitals...</p>
          ) : error ? (
            <p className="text-red-600 text-center text-lg">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No gynecology hospitals found.</p>
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

        {/* Understanding Gynecology */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Gynecology</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            Gynecology focuses on the health of the female reproductive system, including the uterus, ovaries, and vagina. Our gynecologists address conditions like menstrual disorders, infertility, and gynecologic cancers, with a focus on prevention, early detection, and advanced treatments.
          </p>
        </section>

        {/* Gynecology Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Advanced Gynecology Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Well-Woman Exams</h3>
              <p className="text-gray-600 text-base leading-relaxed">Annual screenings, Pap smears, and breast exams for preventive care.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Obstetrics</h3>
              <p className="text-gray-600 text-base leading-relaxed">Comprehensive prenatal, delivery, and postpartum care.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Minimally Invasive Surgery</h3>
              <p className="text-gray-600 text-base leading-relaxed">Laparoscopic and robotic surgeries for fibroids and endometriosis.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Infertility Treatment</h3>
              <p className="text-gray-600 text-base leading-relaxed">Fertility assessments and assisted reproductive technologies.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Menopause Management</h3>
              <p className="text-gray-600 text-base leading-relaxed">Hormone therapy and lifestyle counseling for menopausal symptoms.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Gynecologic Oncology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Specialized care for ovarian, uterine, and cervical cancers.</p>
            </div>
          </div>
        </section>

        {/* Common Gynecologic Conditions */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Conditions We Expertly Treat</h2>
          <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg">
            <li><strong className="text-gray-800">Fibroids:</strong> Non-cancerous growths in the uterus causing pain or bleeding.</li>
            <li><strong className="text-gray-800">Endometriosis:</strong> Tissue growth outside the uterus causing pelvic pain.</li>
            <li><strong className="text-gray-800">PCOS:</strong> Hormonal disorder affecting ovulation and menstrual cycles.</li>
            <li><strong className="text-gray-800">Urinary Incontinence:</strong> Loss of bladder control, common in women.</li>
            <li><strong className="text-gray-800">Cervical Cancer:</strong> Cancer of the cervix, often preventable with screening.</li>
            <li><strong className="text-gray-800">Menstrual Disorders:</strong> Irregular or painful periods requiring management.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Empowering Women’s Health</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Our gynecology team is here to support your health. Schedule an appointment today.
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

export default Gynecology;