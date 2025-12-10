import React from 'react';
import { BookOpen, Layers, Zap } from 'lucide-react';

const services = [
  {
    icon: <BookOpen className="w-8 h-8 text-purple-400" />,
    title: "E-Book обкладинка",
    price: "€150",
    description: "(ціна середня, залежить від складності)",
    features: [
      "Дизайн обкладинки електронної книги",
      "1 Мокап",
      "Усі вихідні файли",
      "+€5 рекламне оформлення в соцмережі"
    ]
  },
  {
    icon: <Layers className="w-8 h-8 text-purple-400" />,
    title: "Hardback/paperback обкладинка",
    price: "€200",
    description: "(ціна середня, залежить від складності)",
    features: [
      "Повний E-BOOK Пакет",
      "Дизайн обкладинки в м'якій чи твердій обкладинці",
      "Усі вихідні файли",
      "+€5 рекламне оформлення в соцмережі"
    ]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-dark-800 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Ціни</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-dark-700 p-8 md:p-12 rounded-sm hover:bg-dark-700/80 transition-colors border border-white/5 hover:border-purple-500/30 group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/10"></div>
              
              <div className="mb-6 p-4 bg-dark-900 rounded-full w-fit group-hover:scale-110 transition-transform duration-300 border border-white/10 relative z-10">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white mb-2">{service.title}</h3>
              <p className="text-4xl font-bold text-purple-400 mb-2">{service.price}</p>
              <p className="text-gray-400 mb-8 border-b border-white/5 pb-8 italic text-sm">{service.description}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm">
                    <Zap className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="block text-center w-full py-4 border border-gray-600 text-white font-medium hover:bg-purple-500 hover:text-black hover:border-purple-500 transition-all uppercase text-sm tracking-widest rounded-sm">
                Замовити
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;