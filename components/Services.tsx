import React, { useEffect } from 'react';
import { BookOpen, Layers, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

const Services: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const scriptId = 'unicorn-studio-script';
    
    // Check if script already exists (it might be loaded by Hero component)
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
      // Re-init to catch new data-us-project elements
      if (window.UnicornStudio && window.UnicornStudio.init) {
        window.UnicornStudio.init();
      }
    }
  }, []);

  const services = [
    {
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      title: t.services.ebook.title,
      price: "€150",
      description: t.services.ebook.desc,
      features: t.services.ebook.features
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      title: t.services.print.title,
      price: "€200",
      description: t.services.print.desc,
      features: t.services.print.features,
      note: t.services.print.note
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-dark-800 border-t border-white/5">
      {/* Unicorn Studio Background */}
      <div 
        className="absolute inset-0 z-0"
        data-us-project="2qKYrGcuKo2eJpK07yrp" 
        style={{ width: '100%', height: '100%' }}
      ></div>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-dark-900/80 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{t.services.title}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-dark-700/80 backdrop-blur-sm p-8 md:p-12 rounded-sm hover:bg-dark-700/90 transition-colors border border-white/5 hover:border-purple-500/30 group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/10"></div>
              
              <div className="mb-6 p-4 bg-dark-900 rounded-full w-fit group-hover:scale-110 transition-transform duration-300 border border-white/10 relative z-10">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.title}</h3>
              <p className="text-4xl font-bold text-purple-400 mb-2">{service.price}</p>
              <p className="text-gray-400 mb-8 border-b border-white/5 pb-8 italic text-sm">{service.description}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {service.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm">
                    <Zap className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {service.note && (
                  <p className="text-xs text-purple-300/80 italic mt-auto pt-4 border-t border-white/5">
                      * {service.note}
                  </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;