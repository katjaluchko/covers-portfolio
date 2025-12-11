import React, { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

const UnicornHero: React.FC = () => {
  useEffect(() => {
    // Logic to load Unicorn Studio script dynamically and safely
    const scriptId = 'unicorn-studio-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.body.appendChild(script);
    } else {
      // If script is already loaded, try to re-init if needed or it handles itself
      if (window.UnicornStudio && window.UnicornStudio.init) {
        window.UnicornStudio.init();
      }
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Unicorn Studio Background Container */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        data-us-project="V94n8jv7cecYlKgzW5D3" 
        style={{ width: '100%', height: '100%' }}
      ></div>

      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-transparent to-dark-900 z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
          Шукаєш дизайнера <br/>
          для своєї книги?
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-pulse">
          Гортай униз, щоб дізнатися більше.
        </p>
      </div>
    </div>
  );
};

export default UnicornHero;