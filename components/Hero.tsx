import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

const Hero: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const scriptId = 'unicorn-studio-script';
    
    // Check if script already exists to avoid duplication
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js";
      script.onload = () => {
        // Init if available immediately after load
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.body.appendChild(script);
    } else {
      // If script exists, re-initialize if needed (for navigation/re-mounts)
      if (window.UnicornStudio && window.UnicornStudio.init) {
        window.UnicornStudio.init();
      }
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Unicorn Studio Background */}
      <div 
        className="absolute inset-0 z-0"
        data-us-project="CGLqcVQJllcKuhjSMchl" 
        style={{ width: '100%', height: '100%' }}
      ></div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-transparent to-dark-900/80 z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,1)] flex flex-col items-center gap-2 md:gap-4">
          
          {/* Line 1 */}
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5">
            {t.hero.line1.map((word: string, index: number) => (
                <span 
                    key={index}
                    className={`${index === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300' : ''}`} 
                >
                    {word}
                </span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5">
             {t.hero.line2.map((word: string, index: number) => (
                <span key={index}>
                    {word}
                </span>
            ))}
          </div>

        </h1>
        
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          {t.hero.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Hero;