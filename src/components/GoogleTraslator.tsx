// components/GoogleTranslate.tsx
import React, { useEffect } from 'react';

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const addTranslateScript = () => {
      if (!document.querySelector('#google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,ta,te,bn,gu,kn,ml,mr,pa,ur',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      };
    };

    addTranslateScript();
  }, []);

  // Function to change language
  const switchLanguage = (lang: string) => {
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      {/* Google Translate hidden widget */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Flag Buttons */}
      <img
        src="/flags/en.png"
        alt="English"
        className="w-6 h-6 cursor-pointer"
        onClick={() => switchLanguage('en')}
      />
      <img
        src="/flags/hi.png"
        alt="Hindi"
        className="w-6 h-6 cursor-pointer"
        onClick={() => switchLanguage('hi')}
      />
      <img
        src="/flags/ta.png"
        alt="Tamil"
        className="w-6 h-6 cursor-pointer"
        onClick={() => switchLanguage('ta')}
      />
    </div>
  );
};

export default GoogleTranslate;
