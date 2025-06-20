

// import React from 'react';

// const Cardiology: React.FC = () => (
//   <div className="specialty-page">
//     <h1 className="text-3xl font-bold mb-4">Cardiology</h1>
//     <p className="mb-2">Cardiology is the branch of medicine that deals with disorders of the heart and blood vessels. Our expert cardiologists provide comprehensive care for heart disease, arrhythmias, and more.</p>
//     <ul className="list-disc ml-6">
//       <li>Heart Disease Diagnosis & Treatment</li>
//       <li>Cardiac Rehabilitation</li>
//       <li>Interventional Cardiology</li>
//       <li>Electrocardiograms (ECG/EKG)</li>
//       <li>Heart Surgery Referrals</li>
//     </ul>
//   </div>
// );

// export default Cardiology;








// import React from 'react';

// const Cardiology: React.FC = () => (
//   <div className="specialty-page min-h-screen bg-gray-50 pt-20">
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Cardiology</h1>
//       <p className="text-lg text-gray-700 mb-6 max-w-3xl">
//         Cardiology is the branch of medicine that deals with disorders of the heart and blood vessels. Our expert cardiologists provide comprehensive care for heart disease, arrhythmias, and more.
//       </p>
//       <ul className="list-disc ml-6 text-gray-700 space-y-2">
//         <li>Heart Disease Diagnosis & Treatment</li>
//         <li>Cardiac Rehabilitation</li>
//         <li>Interventional Cardiology</li>
//         <li>Electrocardiograms (ECG/EKG)</li>
//         <li>Heart Surgery Referrals</li>
//       </ul>
//     </div>
//   </div>
// );

// export default Cardiology;









import React from 'react';

const Cardiology: React.FC = () => (
  <div className="specialty-page min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Cardiology</h1>
      <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
        Our Cardiology Department is committed to delivering world-class heart care. Our team of board-certified cardiologists, advanced imaging specialists, and dedicated support staff use cutting-edge technology and evidence-based practices to diagnose, treat, and prevent heart and vascular conditions. We provide personalized care, from routine screenings to complex interventions, to improve heart health and quality of life.
      </p>

      {/* Understanding Cardiology */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Cardiology</h2>
        <p className="text-lg text-gray-600">
          Cardiology focuses on the diagnosis and treatment of diseases affecting the heart and blood vessels, known as the cardiovascular system. Our cardiologists manage conditions such as coronary artery disease, heart failure, arrhythmias, hypertension, and congenital heart defects, emphasizing prevention, early detection, and comprehensive care.
        </p>
      </section>

      {/* Cardiology Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Cardiology Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Diagnostic Testing</h3>
            <p className="text-gray-600">Advanced imaging and testing, including ECG, echocardiograms, stress tests, and cardiac CT/MRI, for accurate diagnosis.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interventional Cardiology</h3>
            <p className="text-gray-600">Minimally invasive procedures like angioplasty and stent placement to treat blocked arteries.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Electrophysiology</h3>
            <p className="text-gray-600">Diagnosis and treatment of heart rhythm disorders, including pacemaker and defibrillator implantation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardiac Surgery</h3>
            <p className="text-gray-600">Expert surgical interventions, such as coronary artery bypass grafting (CABG) and valve repair/replacement.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Preventive Cardiology</h3>
            <p className="text-gray-600">Risk assessments and lifestyle counseling to manage cholesterol, blood pressure, and prevent heart disease.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardiac Rehabilitation</h3>
            <p className="text-gray-600">Personalized exercise and education programs to support recovery and long-term heart health.</p>
          </div>
        </div>
      </section>

      {/* Common Heart Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Heart Conditions We Treat</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li><strong>Coronary Artery Disease (CAD):</strong> Narrowing of arteries causing chest pain or heart attacks.</li>
          <li><strong>Heart Failure:</strong> Inability of the heart to pump blood effectively, leading to fatigue and fluid retention.</li>
          <li><strong>Arrhythmias:</strong> Irregular heart rhythms, such as atrial fibrillation, managed with medication or devices.</li>
          <li><strong>Valvular Heart Disease:</strong> Issues with heart valves causing leakage or obstruction of blood flow.</li>
          <li><strong>Hypertension:</strong> High blood pressure, a key risk factor for heart disease.</li>
          <li><strong>Congenital Heart Defects:</strong> Structural heart issues present at birth, treated surgically or with catheters.</li>
        </ul>
      </section>

      {/* Image Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Heart Health</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.heart.org/-/media/images/health-topics/heart-anatomy/heart-anatomy-illustration.jpg?h=400&w=600"
              alt="Heart Anatomy"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Heart Anatomy</h3>
              <p className="text-gray-600 text-sm">A detailed view of the human heart, showcasing its chambers, valves, and major blood vessels.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/echocardiogram_650x450.jpg"
              alt="Echocardiogram"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Echocardiogram</h3>
              <p className="text-gray-600 text-sm">An echocardiogram uses ultrasound waves to create images of the heart’s structure and function.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/coronary-angiography.jpg?h=400&w=600"
              alt="Coronary Angiography"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Coronary Angiography</h3>
              <p className="text-gray-600 text-sm">This procedure visualizes the coronary arteries to detect blockages or narrowing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Cardiology</h2>
        <p className="text-gray-600 mb-6">These videos provide insights into heart health and cardiology procedures. [Note: Placeholder videos; replace with your hospital’s content.]</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/0B7iqtWNLB4"
                title="The Cardiovascular System: An Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Cardiovascular System</h3>
            <p className="text-gray-600 text-sm">An introduction to the cardiovascular system, covering heart anatomy, blood vessels, and the cardiac cycle.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5bWHS0NKp0E"
                title="Cardiac Ultrasound (Echocardiography) Made Easy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Cardiac Ultrasound (Echocardiography) Made Easy</h3>
            <p className="text-gray-600 text-sm">A step-by-step guide to performing and interpreting cardiac ultrasound, a key diagnostic tool.</p>
          </div>
        </div>
      </section>

      {/* Deep Description */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Importance of Heart Health</h2>
        <p className="text-lg text-gray-600 mb-4">
          The heart, a vital organ that beats approximately 100,000 times daily, pumps about 2,000 gallons of blood to deliver oxygen and nutrients throughout the body. Maintaining heart health is crucial, as cardiovascular disease is the leading cause of death globally.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Risk Factors for Heart Disease</h3>
        <p className="text-gray-600 mb-4">
          Key risk factors include modifiable factors like smoking, poor diet, physical inactivity, and obesity, as well as non-modifiable factors like age and family history. Our preventive cardiology programs help patients reduce these risks through lifestyle changes and medical management.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Diagnostic Tools</h3>
        <p className="text-gray-600 mb-4">
          We utilize state-of-the-art tools, including ECG, echocardiography, cardiac CT/MRI, stress testing, and coronary angiography, to diagnose heart conditions with precision.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Choose [Your Hospital Name]?</h3>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li>Expert team of cardiologists with advanced training.</li>
          <li>Cutting-edge diagnostic and treatment technologies.</li>
          <li>Patient-centered care with individualized treatment plans.</li>
          <li>Comprehensive services, from prevention to rehabilitation.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Take the First Step Toward Heart Health</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Your heart deserves the best care. Schedule an appointment with our cardiology team today to start your journey to better heart health.
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

export default Cardiology;