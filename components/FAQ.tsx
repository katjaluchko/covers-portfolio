import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQProps {
  onOpenBrief: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onOpenBrief }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-dark-900 border-t border-white/5 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <HelpCircle className="w-6 h-6 text-purple-400" />
                </div>
            </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{t.faq.title}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq: any, index: number) => (
            <div 
              key={index}
              className={`bg-dark-800 border ${openIndex === index ? 'border-purple-500/50' : 'border-white/5'} rounded-sm overflow-hidden transition-all duration-300`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-white/5 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`text-lg font-serif font-bold ${openIndex === index ? 'text-purple-400' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`p-1 rounded-full ${openIndex === index ? 'bg-purple-500 text-black' : 'bg-white/10 text-gray-400'} transition-all`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-dashed border-white/10 mt-2">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button moved outside of the FAQ items */}
        <div className="mt-12 flex justify-center" id="faq-brief-trigger">
            <button 
                onClick={onOpenBrief}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500/10 hover:bg-purple-500 hover:text-white text-purple-400 border border-purple-500/30 rounded-sm transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
                <FileText className="w-5 h-5" />
                <span>{t.faq.btn}</span>
            </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;