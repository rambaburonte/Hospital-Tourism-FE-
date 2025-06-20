import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Language = 'en' | 'fr';

const HospitalAdvertisement: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const navigate = useNavigate();
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

  const translations: Record<Language, {
    title: string;
    header: string;
    description: string;
    points: string[];
    button: string;
  }> = {
    en: {
      title: 'Our Trusted Healthcare Partners',
      header: 'Your Journey to Better Health Starts Here',
      description: 'Experience world-class medical care with our comprehensive healthcare solutions:',
      points: [
        'World-Class Treatments: Access premium healthcare at affordable costs.',
        'Seamless Experience: Complete support from consultation to recovery.',
        'Holistic Wellness: Comprehensive care with recovery and wellness programs.',
        'Expert Guidance: 24/7 support from qualified healthcare professionals.',
      ],
      button: 'Schedule Your Consultation',
    },
    fr: {
      title: 'Nos partenaires de santé de confiance',
      header: 'Votre parcours vers une meilleure santé commence ici',
      description: 'Découvrez des soins médicaux de classe mondiale avec nos solutions de santé complètes :',
      points: [
        'Traitements de classe mondiale : Accès aux soins de santé premium à des coûts abordables.',
        'Expérience transparente : Support complet de la consultation au rétablissement.',
        'Bien-être holistique : Soins complets avec programmes de récupération et de bien-être.',
        'Conseil d\'expert : Support 24/7 par des professionnels de santé qualifiés.',
      ],
      button: 'Planifiez votre consultation',
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

  const handleConsultationClick = () => {
    navigate('/ContactUsPage');
  };

  const t = translations[language];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">

        {/* Theme and Language Toggle - More subtle */}
        <div className="fixed top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300"
          >
            <option value="en">🇺🇸 EN</option>            <option value="fr">🇫🇷 FR</option>
          </select>
        </div>

        {/* Logo Header - More subtle and integrated */}
        <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-800/20 py-6 sm:py-8 shadow-sm border-b border-green-100 dark:border-emerald-800/30">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-green-800 dark:text-green-200 mb-6">
            {t.title}
          </h2>
          <div className="relative w-full h-32 sm:h-36 overflow-hidden group">
            <div
              className="absolute flex items-center h-full animate-scroll-logos group-hover:[animation-play-state:paused]"
              style={{ whiteSpace: 'nowrap', animationDuration: `${animationDuration}s` }}
            >
              {/* Create multiple copies to ensure seamless loop */}
              {[...hospitals, ...hospitals, ...hospitals, ...hospitals].map((h, index) => (
                <a key={index} href={h.link} target="_blank" rel="noreferrer" className="inline-block flex-shrink-0 px-4 text-center min-w-[200px] sm:min-w-[250px]">
                  <div className="relative">
                    <img src={h.logo} alt={h.name} className="h-16 sm:h-24 object-contain mx-auto transition-transform hover:scale-105 rounded-lg shadow-sm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent hover:from-black/20 rounded-lg"></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium truncate">{h.name}</p>
                </a>
              ))}
            </div>
          </div>

          <style>
            {`
              @keyframes scroll-logos {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-250px * ${hospitals.length})); }
              }
              .animate-scroll-logos {
                animation: scroll-logos linear infinite;
              }
            `}
          </style>
        </div>        {/* Main Advertisement Section - Proper spacing and sizing */}
        <div
          className="w-full min-h-[75vh] bg-fixed bg-center bg-cover relative"
          style={{ backgroundImage: "url('/medical_background.jpg')" }}
        >          {/* Overlay with subtle colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-800/70"></div>
          
          {/* Content Container with proper spacing */}
          <div className="relative z-10 flex items-center justify-center min-h-[75vh] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center max-w-5xl mx-auto">
              {/* Main Content Card */}
              <div className="bg-white/96 dark:bg-gray-900/96 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8">
                
                {/* Header */}
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
                    {t.header}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    {t.description}
                  </p>
                </div>

                {/* Features List with better spacing */}
                <div className="max-w-4xl mx-auto py-4 sm:py-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
                    {t.points.map((point: string, i: number) => (
                      <li key={i} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300">                        <span className="flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mt-2"></span>
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed hover:text-green-600 dark:hover:text-green-400 transition-colors">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button */}
                <div className="pt-4 sm:pt-6">
                  <button 
                    onClick={handleConsultationClick}
                    className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-base sm:text-lg lg:text-xl rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:ring-offset-2"
                  >
                    {t.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdvertisement;

