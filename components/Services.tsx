import React from 'react';
import { Zap, Tablet, Book } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Tablet className="w-12 h-12 text-white" />,
      title: t.services.ebook.title,
      price: "€140",
      description: t.services.ebook.desc,
      features: t.services.ebook.features
    },
    {
      icon: <Book className="w-12 h-12 text-white" />,
      title: t.services.print.title,
      price: "€170",
      description: t.services.print.desc,
      features: t.services.print.features,
      note: t.services.print.note
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-dark-800 border-t border-white/5">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{t.services.title}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-dark-700/80 backdrop-blur-sm p-8 md:p-12 rounded-sm hover:bg-dark-700/90 transition-colors border border-white/5 hover:border-purple-500/30 group flex flex-col relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/10"></div>
              
              <div className="mb-6 p-1 bg-dark-900 rounded-full w-24 h-24 group-hover:scale-110 transition-transform duration-300 border border-white/10 relative z-10 overflow-hidden flex items-center justify-center">
                 {/* Replaced Image with Icon */}
                 <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                 </div>
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