







// import React, { useEffect, useState } from 'react';
// import { BASE_URL } from '@/config/config';
// interface Hospital {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   rating: string;
//   address: string;
//   specialization: string;
// }

// const Cardiology: React.FC = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Cardiology`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch cardiology hospitals');
//         }
//         const data = await response.json();
        
//         // Map API response to Hospital interface and filter for cardiology
//         const cardiologyHospitals: Hospital[] = data
//           .filter((hospital: any) => hospital.specialization.toLowerCase() === 'cardiology')
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
//         const sortedHospitals = cardiologyHospitals.sort((a, b) => 
//           a.name.localeCompare(b.name)
//         );
        
//         setHospitals(sortedHospitals);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching cardiology hospital data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header Section */}
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Cardiology</h1>
//         <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
//           Our Cardiology Department is committed to delivering world-class heart care. Below is a list of our hospitals specializing in cardiology.
//         </p>

//         {/* Cardiology Hospitals List */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Cardiology Hospitals</h2>
//           {loading ? (
//             <p className="text-gray-600">Loading cardiology hospitals...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : hospitals.length === 0 ? (
//             <p className="text-gray-600">No cardiology hospitals found.</p>
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

//         {/* Understanding Cardiology */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Cardiology</h2>
//           <p className="text-lg text-gray-600">
//             Cardiology focuses on the diagnosis and treatment of diseases affecting the heart and blood vessels, known as the cardiovascular system.
//           </p>
//         </section>

//         {/* Cardiology Services */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Cardiology Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Diagnostic Testing</h3>
//               <p className="text-gray-600">Advanced imaging and testing, including ECG, echocardiograms, stress tests, and cardiac CT/MRI, for accurate diagnosis.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Interventional Cardiology</h3>
//               <p className="text-gray-600">Minimally invasive procedures like angioplasty and stent placement to treat blocked arteries.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Electrophysiology</h3>
//               <p className="text-gray-600">Diagnosis and treatment of heart rhythm disorders, including pacemaker and defibrillator implantation.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardiac Surgery</h3>
//               <p className="text-gray-600">Expert surgical interventions, such as coronary artery bypass grafting (CABG) and valve repair/replacement.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Preventive Cardiology</h3>
//               <p className="text-gray-600">Risk assessments and lifestyle counseling to manage cholesterol, blood pressure, and prevent heart disease.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardiac Rehabilitation</h3>
//               <p className="text-gray-600">Personalized exercise and education programs to support recovery and long-term heart health.</p>
//             </div>
//           </div>
//         </section>

//         {/* Common Heart Conditions */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Heart Conditions We Treat</h2>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li><strong>Coronary Artery Disease (CAD):</strong> Narrowing of arteries causing chest pain or heart attacks.</li>
//             <li><strong>Heart Failure:</strong> Inability of the heart to pump blood effectively, leading to fatigue and fluid retention.</li>
//             <li><strong>Arrhythmias:</strong> Irregular heart rhythms, such as atrial fibrillation, managed with medication or devices.</li>
//             <li><strong>Valvular Heart Disease:</strong> Issues with heart valves causing leakage or obstruction of blood flow.</li>
//             <li><strong>Hypertension:</strong> High blood pressure, a key risk factor for heart disease.</li>
//             <li><strong>Congenital Heart Defects:</strong> Structural heart issues present at birth, treated surgically or with catheters.</li>
//           </ul>
//         </section>

//         {/* Image Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Heart Health</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.heart.org/-/media/images/health-topics/heart-anatomy/heart-anatomy-illustration.jpg?h=400&w=600"
//                 alt="Heart Anatomy"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Heart Anatomy</h3>
//                 <p className="text-gray-600 text-sm">A detailed view of the human heart, showcasing its chambers, valves, and major blood vessels.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/echocardiogram_650x450.jpg"
//                 alt="Echocardiogram"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Echocardiogram</h3>
//                 <p className="text-gray-600 text-sm">An echocardiogram uses ultrasound waves to create images of the heart’s structure and function.</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/coronary-angiography.jpg?h=400&w=600"
//                 alt="Coronary Angiography"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Coronary Angiography</h3>
//                 <p className="text-gray-600 text-sm">This procedure visualizes the coronary arteries to detect blockages or narrowing.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Video Cards */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Cardiology</h2>
//           <p className="text-gray-600 mb-6">These videos provide insights into heart health and cardiology procedures. [Note: Placeholder videos; replace with your hospital’s content.]</p>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/0B7iqtWNLB4"
//                   title="The Cardiovascular System: An Overview"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Cardiovascular System</h3>
//               <p className="text-gray-600 text-sm">An introduction to the cardiovascular system, covering heart anatomy, blood vessels, and the cardiac cycle.</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <div className="relative pb-[56.25%] h-0">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src="https://www.youtube.com/embed/5bWHS0NKp0E"
//                   title="Cardiac Ultrasound (Echocardiography) Made Easy"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mt-4">Cardiac Ultrasound (Echocardiography) Made Easy</h3>
//               <p className="text-gray-600 text-sm">A step-by-step guide to performing and interpreting cardiac ultrasound, a key diagnostic tool.</p>
//             </div>
//           </div>
//         </section>

//         {/* Deep Description */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">The Importance of Heart Health</h2>
//           <p className="text-lg text-gray-600 mb-4">
//             The heart, a vital organ that beats approximately 100,000 times daily, pumps about 2,000 gallons of blood to deliver oxygen and nutrients throughout the body. Maintaining heart health is crucial, as cardiovascular disease is the leading cause of death globally.
//           </p>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Risk Factors for Heart Disease</h3>
//           <p className="text-gray-600 mb-4">
//             Key risk factors include modifiable factors like smoking, poor diet, physical inactivity, and obesity, as well as non-modifiable factors like age and family history. Our preventive cardiology programs help patients reduce these risks through lifestyle changes and medical management.
//           </p>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Diagnostic Tools</h3>
//           <p className="text-gray-600 mb-4">
//             We utilize state-of-the-art tools, including ECG, echocardiography, cardiac CT/MRI, stress testing, and coronary angiography, to diagnose heart conditions with precision.
//           </p>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Choose [Your Hospital Name]?</h3>
//           <ul className="list-disc ml-6 text-gray-600 space-y-2">
//             <li>Expert team of cardiologists with advanced training.</li>
//             <li>Cutting-edge diagnostic and treatment technologies.</li>
//             <li>Patient-centered care with individualized treatment plans.</li>
//             <li>Comprehensive services, from prevention to rehabilitation.</li>
//           </ul>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
//           <h2 className="text-3xl font-bold mb-4">Take the First Step Toward Heart Health</h2>
//           <p className="text-lg mb-6 max-w-2xl mx-auto">
//             Your heart deserves the best care. Schedule an appointment with our cardiology team today to start your journey to better heart health.
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

// export default Cardiology;









import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/config/config'; // Ensure this path is correct for your project

interface Hospital {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  address: string;
  specialization: string;
}

const Cardiology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Cardiology`);
        if (!response.ok) {
          throw new Error('Failed to fetch cardiology hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for cardiology
        const cardiologyHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'cardiology')
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
        const sortedHospitals = cardiologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching cardiology hospital data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="specialty-page min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"> {/* Increased padding-top */}

        {/* Header Section */}
        <div className="text-center mb-16"> {/* Increased margin-bottom */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-blue-800 mb-8 tracking-tight leading-tight"> {/* Larger, deeper blue, tighter tracking */}
            Exceptional Cardiology Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our Cardiology Department is committed to delivering world-class heart care through
            cutting-edge technology, experienced specialists, and patient-centered treatment protocols.
            We specialize in the prevention, diagnosis, and treatment of a wide range of cardiovascular
            conditions, including coronary artery disease, heart failure, arrhythmias, and congenital heart disorders.
          </p>
        </div>

        {/* Cardiology Hospitals List */}
        <section className="mb-20"> {/* Increased margin-bottom */}
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Trusted Cardiology Hospitals</h2> {/* Larger, bolder, more margin */}
          {loading ? (
            <p className="text-gray-600 text-center text-lg">Loading cardiology hospitals...</p>
          ) : error ? (
            <p className="text-red-600 text-center text-lg">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No cardiology hospitals found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Slightly increased gap */}
              {hospitals.map(hospital => (
                <div
                  key={hospital.id}
                  className="bg-white p-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1" // Slightly more padding, rounded corners, subtle border, subtle lift on hover
                >
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-60 object-cover rounded-lg mb-5 transform hover:scale-102 transition-transform duration-300" // Slightly taller image, subtle scale on hover
                  />
                  <h3 className="text-2xl font-bold text-blue-700 mb-3">{hospital.name}</h3> {/* Deeper blue, bolder */}
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

        {/* Understanding Cardiology */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Understanding Cardiology</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            Cardiology focuses on the diagnosis and treatment of diseases affecting the heart and blood vessels, known as the cardiovascular system.
          </p>
        </section>

        {/* Cardiology Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Our Comprehensive Cardiology Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Diagnostic Testing</h3>
              <p className="text-gray-600 text-base leading-relaxed">Advanced imaging and testing, including ECG, echocardiograms, stress tests, and cardiac CT/MRI, for accurate diagnosis.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Interventional Cardiology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Minimally invasive procedures like angioplasty and stent placement to treat blocked arteries.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Electrophysiology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Diagnosis and treatment of heart rhythm disorders, including pacemaker and defibrillator implantation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Cardiac Surgery</h3>
              <p className="text-gray-600 text-base leading-relaxed">Expert surgical interventions, such as coronary artery bypass grafting (CABG) and valve repair/replacement.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Preventive Cardiology</h3>
              <p className="text-gray-600 text-base leading-relaxed">Risk assessments and lifestyle counseling to manage cholesterol, blood pressure, and prevent heart disease.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">Cardiac Rehabilitation</h3>
              <p className="text-gray-600 text-base leading-relaxed">Personalized exercise and education programs to support recovery and long-term heart health.</p>
            </div>
          </div>
        </section>

        {/* Common Heart Conditions */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Common Heart Conditions We Treat</h2>
          <ul className="list-disc text-gray-600 space-y-4 max-w-3xl mx-auto pl-6 text-lg"> {/* Increased spacing, added left padding for list bullets */}
            <li><strong className="text-gray-800">Coronary Artery Disease (CAD):</strong> Narrowing of arteries causing chest pain or heart attacks.</li>
            <li><strong className="text-gray-800">Heart Failure:</strong> Inability of the heart to pump blood effectively, leading to fatigue and fluid retention.</li>
            <li><strong className="text-gray-800">Arrhythmias:</strong> Irregular heart rhythms, such as atrial fibrillation, managed with medication or devices.</li>
            <li><strong className="text-gray-800">Valvular Heart Disease:</strong> Issues with heart valves causing leakage or obstruction of blood flow.</li>
            <li><strong className="text-gray-800">Hypertension:</strong> High blood pressure, a key risk factor for heart disease.</li>
            <li><strong className="text-gray-800">Congenital Heart Defects:</strong> Structural heart issues present at birth, treated surgically or with catheters.</li>
          </ul>
        </section>

        {/* Deep Description */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">The Importance of Heart Health</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              The heart, a vital organ that beats approximately 100,000 times daily, pumps about 2,000 gallons of blood to deliver oxygen and nutrients throughout the body. Maintaining heart health is crucial, as cardiovascular disease is the leading cause of death globally.
            </p>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Risk Factors for Heart Disease</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Key risk factors include modifiable factors like smoking, poor diet, physical inactivity, and obesity, as well as non-modifiable factors like age and family history. Our preventive cardiology programs help patients reduce these risks through lifestyle changes and medical management.
            </p>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Advanced Diagnostic Tools</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We utilize state-of-the-art tools, including ECG, echocardiography, cardiac CT/MRI, stress testing, and coronary angiography, to diagnose heart conditions with precision.
            </p>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">Why Choose Our Hospital?</h3>
            <ul className="list-disc text-gray-600 space-y-3 pl-6 text-lg">
              <li><strong className="text-gray-800">Expert Team:</strong> A dedicated team of highly skilled cardiologists with advanced training.</li>
              <li><strong className="text-gray-800">Cutting-Edge Technology:</strong> Access to the latest diagnostic and treatment technologies.</li>
              <li><strong className="text-gray-800">Patient-Centered Care:</strong> Individualized treatment plans tailored to each patient's unique needs.</li>
              <li><strong className="text-gray-800">Comprehensive Services:</strong> From preventive care and early diagnosis to advanced interventions and rehabilitation.</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-700 text-white py-14 px-8 rounded-2xl shadow-2xl"> {/* Darker blue, more padding, larger shadow, more rounded */}
          <h2 className="text-4xl font-bold mb-6">Prioritize Your Heart Health</h2> {/* Larger, bolder heading */}
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Your heart deserves the best care. Schedule an appointment with our dedicated cardiology team today to start your journey to better heart health.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-white text-blue-700 font-semibold px-12 py-5 rounded-full hover:bg-gray-100 transition duration-300 text-xl shadow-md hover:shadow-lg transform hover:-translate-y-1" // Larger button, deeper blue text, more shadow, subtle lift on hover
          >
            Book an Appointment
          </a>
        </section>
      </div>
    </div>
  );
};

export default Cardiology;