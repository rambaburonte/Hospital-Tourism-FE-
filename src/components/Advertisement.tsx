// import React from 'react';


// const HospitalAdvertisement: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-gray-100">
//       <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Visit Our Top Hospitals!</h1>
//       <div className="flex flex-wrap justify-center gap-6">
//         <div className="flex flex-col items-center">
//           <img
//                   src="/maditailr/madi1.jpg"
//                   alt="Doctor giving thumbs up"
//                   className="w-full h-auto rounded-lg shadow-lg"
//                 />

                 
//           <p className="text-center text-lg">Experience world-class care at CK Birla Hospital.</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <img  src="/maditailr/med2.jpg"
//                   alt="Doctor giving thumbs up"
//                   className="w-full h-auto rounded-lg shadow-lg"
//                 />
//           <p className="text-center text-lg">Trust Fortis for exceptional healthcare services.</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <img  src="/maditailr/med3.jpg"
//                   alt="Doctor giving thumbs up"
//                   className="w-full h-auto rounded-lg shadow-lg"
//                 />
//           <p className="text-center text-lg">Sarvodaya Healthcare - Your health, our priority.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalAdvertisement;


// import React from 'react';

// const HospitalAdvertisement: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
//       {/* Header with Hospital Logos */}
//       <div className="w-full bg-gradient-to-r from-green-100 to-green-200 p-8 flex justify-around items-center shadow-lg sticky top-0 z-10">
//         <img src="/maditailr/med3.jpg" alt="Sarvodaya Healthcare Logo" className="h-20 transition-transform hover:scale-110" />
//         <img src="/maditailr/med2.jpg" alt="Fortis Logo" className="h-20 transition-transform hover:scale-110" />
//         <img src="/maditailr/madi1.jpg" alt="CK Birla Hospital Logo" className="h-20 transition-transform hover:scale-110" />
//       </div>

//       {/* Main Advertisement Section with Parallax Effect */}
//       <div
//         className="w-full min-h-[80vh] bg-fixed bg-center bg-cover relative"
//         style={{ backgroundImage: "url('/medical_background.jpg')" }}
//       >
//         {/* Overlay for Readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 to-teal-800/60"></div>

//         <div className="relative z-10 flex items-center justify-center h-full p-6">
//           <div className="text-center max-w-4xl p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-300 transform hover:scale-105 transition duration-500">
//             <h1 className="text-6xl font-extrabold mb-8 text-yellow-400 animate-pulse-slow drop-shadow-2xl">
//               Your Ultimate Medical Tourism Revolution!
//             </h1>
//             <p className="text-2xl mb-8 text-white leading-loose animate-fade-in">
//               Transform your health journey in India with cutting-edge solutions:
//               <ul className="list-disc list-inside mt-6 space-y-4 text-left max-w-2xl mx-auto text-lg">
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Premium Treatments:</strong> Enjoy 60-90% cost savings with world-class care.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Seamless Travel:</strong> All-in-one bookings for flights, hotels, and hospitals.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Wellness Focus:</strong> Personalized recovery with cultural tours and retreats.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Round-the-Clock Support:</strong> 24/7 expert guidance from medical pros.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Top Facilities:</strong> Powered by CK Birla, Fortis, and Sarvodaya Healthcare.</li>
//               </ul>
//             </p>
//             <button className="mt-8 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-extrabold text-xl rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl animate-bounce-slow">
//               Secure Your Free Consultation Now – Offer Ends Soon!
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalAdvertisement;


// import React from 'react';

// const HospitalAdvertisement: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
// {/* Header with Hospital Logos Scrolling Animation */}
// <div className="w-full bg-gradient-to-r from-green-100 to-green-200 p-8 shadow-lg sticky top-0 z-10 overflow-hidden">
//   <div className="relative w-full h-32">
//     <div
//       className="absolute flex items-center h-32 animate-scroll-logos"
//       style={{ whiteSpace: 'nowrap', minWidth: '100%' }}
//     >
//       <img
//         src="/maditailr/med3.jpg"
//         alt="Sarvodaya Healthcare Logo"
//         className="h-32 object-contain px-4 transition-transform hover:scale-110"
//       />
//       <img
//         src="/maditailr/med2.jpg"
//         alt="Fortis Logo"
//         className="h-32 object-contain px-4 transition-transform hover:scale-110"
//       />
//       <img
//         src="/maditailr/madi1.jpg"
//         alt="CK Birla Hospital Logo"
//         className="h-32 object-contain px-4 transition-transform hover:scale-110"
//       />
//       {/* Duplicate for seamless loop */}
//       <img
//         src="/maditailr/med3.jpg"
//         alt="Sarvodaya Healthcare Logo"
//         className="h-32 object-contain px-4 transition-transform hover:scale-110"
//       />
//       <img
//         src="/maditailr/med2.jpg"
//         alt="Fortis Logo"
//         className="h-32 object-contain px-4 transition-transform hover:scale-110"
//       />
//       <img
//         src="/maditailr/madi1.jpg"
//         alt="CK Birla Hospital Logo"
//         className="h-32 object-contain px-4 transition-transform hover:scale-110"
//       />
//     </div>
//   </div>
//   <style>
//     {`
//       @keyframes scroll-logos {
//         0% { transform: translateX(0); }
//         100% { transform: translateX(-50%); }
//       }
//       .animate-scroll-logos {
//         animation: scroll-logos 20s linear infinite;
//       }
//     `}
//   </style>
// </div>

//       {/* Main Advertisement Section with Parallax Effect */}
//       <div
//         className="w-full min-h-[80vh] bg-fixed bg-center bg-cover relative"
//         style={{ backgroundImage: "url('/medical_background.jpg')" }}
//       >
//         {/* Overlay for Readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 to-teal-800/60"></div>

//         <div className="relative z-10 flex items-center justify-center h-full p-6">
//           <div className="text-center max-w-4xl p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-300 transform hover:scale-105 transition duration-500">
//             <h1 className="text-6xl font-extrabold mb-8 text-yellow-400 animate-pulse-slow drop-shadow-2xl">
//               Your Ultimate Medical Tourism Revolution!
//             </h1>
//             <p className="text-2xl mb-8 text-white leading-loose animate-fade-in">
//               Transform your health journey in India with cutting-edge solutions:
//               <ul className="list-disc list-inside mt-6 space-y-4 text-left max-w-2xl mx-auto text-lg">
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Premium Treatments:</strong> Enjoy 60-90% cost savings with world-class care.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Seamless Travel:</strong> All-in-one bookings for flights, hotels, and hospitals.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Wellness Focus:</strong> Personalized recovery with cultural tours and retreats.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Round-the-Clock Support:</strong> 24/7 expert guidance from medical pros.</li>
//                 <li className="hover:text-yellow-300 transition-colors"><strong>Top Facilities:</strong> Powered by CK Birla, Fortis, and Sarvodaya Healthcare.</li>
//               </ul>
//             </p>
//             <button className="mt-8 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-extrabold text-xl rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl animate-bounce-slow">
//               Secure Your Free Consultation Now – Offer Ends Soon!
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalAdvertisement;

import React, { useEffect, useState } from 'react';

type Language = 'en' | 'fr';

const HospitalAdvertisement: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const animationDuration = 30;

  const hospitals = [
    {
      name: 'Sarvodaya Healthcare',
      logo: '/maditailr/med3.jpg',
      link: 'https://www.sarvodayahospital.com/',
    },
    {
      name: 'Fortis Hospital',
      logo: '/maditailr/med2.jpg',
      link: 'https://www.fortishealthcare.com/',
    },
    {
      name: 'CK Birla Hospital',
      logo: '/maditailr/madi1.jpg',
      link: 'https://www.ckbhospital.com/',
    },
  ];

  const translations: Record<Language, any> = {
    en: {
      title: 'Our Trusted Healthcare Partners',
      header: 'Your Ultimate Medical Tourism Revolution!',
      description: 'Transform your health journey in India with cutting-edge solutions:',
      points: [
        'Premium Treatments: Save up to 90% with world-class care.',
        'Seamless Travel: One-stop bookings for travel & hospitals.',
        'Wellness Focus: Recovery with retreats & cultural tours.',
        '24/7 Support: Ongoing guidance from trusted professionals.',
      ],
      button: 'Secure Your Free Consultation Now!',
    },
    fr: {
      title: 'Nos partenaires de santé de confiance',
      header: 'Votre révolution ultime du tourisme médical !',
      description: 'Transformez votre parcours de santé en Inde avec des solutions de pointe :',
      points: [
        'Traitements Premium : Économisez jusqu\'à 90 % avec des soins de qualité mondiale.',
        'Voyage sans couture : Réservations uniques pour voyages et hôpitaux.',
        'Accent sur le bien-être : Récupération avec retraites et visites culturelles.',
        'Support 24/7 : Accompagnement continu par des professionnels de confiance.',
      ],
      button: 'Réservez votre consultation gratuite maintenant !',
    },
  };

  // Detect theme and language on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const savedLang = localStorage.getItem('language') as Language;

    // Auto-detect system dark mode
    if (savedTheme === null) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('darkMode', prefersDark.toString());
    } else {
      setDarkMode(savedTheme === 'true');
    }

    // Language preference
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Save dark mode and language on change
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('language', language);
  }, [darkMode, language]);

  const t = translations[language];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">

        {/* Theme and Language Toggle */}
        <div className="fixed top-4 right-4 z-20 flex gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded bg-gray-800 text-white dark:bg-yellow-400 dark:text-black font-semibold shadow hover:scale-105 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-3 py-2 rounded bg-white dark:bg-gray-700 dark:text-white font-semibold shadow"
          >
            <option value="en">🇺🇸 EN</option>
            <option value="fr">🇫🇷 FR</option>
          </select>
        </div>

        {/* Logo Header */}
        <div className="w-full bg-gradient-to-r from-green-100 to-green-200 dark:from-emerald-900 dark:to-emerald-800 p-6 sm:p-8 shadow-lg sticky top-0 z-10 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-green-800 dark:text-green-200 mb-4">
            {t.title}
          </h2>

          <div className="relative w-full h-36 sm:h-40 overflow-hidden group">
            <div
              className="absolute flex items-center h-full animate-scroll-logos group-hover:[animation-play-state:paused]"
              style={{ whiteSpace: 'nowrap', minWidth: '100%', animationDuration: `${animationDuration}s` }}
            >
              {[...hospitals, ...hospitals].map((h, index) => (
                <a key={index} href={h.link} target="_blank" rel="noreferrer" className="inline-block w-[33vw] sm:w-auto px-4 text-center">
                  <div className="relative">
                    <img src={h.logo} alt={h.name} className="h-20 sm:h-32 object-contain mx-auto transition-transform hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent hover:from-black/50 rounded"></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{h.name}</p>
                </a>
              ))}
            </div>
          </div>

          <style>
            {`
              @keyframes scroll-logos {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-logos {
                animation: scroll-logos linear infinite;
              }
            `}
          </style>
        </div>

        {/* Main Advertisement Section */}
        <div
          className="w-full min-h-[80vh] bg-fixed bg-center bg-cover relative"
          style={{ backgroundImage: "url('/medical_background.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 to-teal-800/60"></div>

          <div className="relative z-10 flex items-center justify-center h-full p-4 sm:p-6">
            <div className="text-center max-w-4xl p-6 sm:p-10 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-300 transform hover:scale-105 transition duration-500">
              <h1 className="text-3xl sm:text-6xl font-extrabold mb-6 sm:mb-8 text-yellow-400 animate-pulse drop-shadow-2xl">
                {t.header}
              </h1>
              <p className="text-lg sm:text-2xl mb-6 sm:mb-8 text-white leading-loose">
                {t.description}
                <ul className="list-disc list-inside mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-left max-w-2xl mx-auto text-base sm:text-lg">
                  {t.points.map((point: string, i: number) => (
                    <li key={i} className="hover:text-yellow-300 transition-colors">{point}</li>
                  ))}
                </ul>
              </p>
              <button className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-extrabold text-lg sm:text-xl rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl animate-bounce">
                {t.button}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdvertisement;

