import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProcessProps {
  onOpenTerms: () => void;
}

const Process: React.FC<ProcessProps> = ({ onOpenTerms }) => {
  const { t } = useLanguage();

  return (
    <section id="process" className="py-24 bg-dark-900 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-dark-800 to-transparent opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 md:sticky md:top-32">
                <button 
                    onClick={onOpenTerms}
                    className="w-full md:w-auto mb-8 px-8 py-4 bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-black border border-purple-500/50 hover:border-transparent transition-all duration-300 font-bold uppercase tracking-widest text-sm md:text-base flex items-center justify-center gap-3 rounded-sm group shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                >
                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t.process.btn}</span>
                </button>

                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">{t.process.title}</h2>

                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {t.process.subtitle}
                </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.process.steps.map((step: any, idx: number) => (
                    <div key={idx} className="bg-white/5 p-8 backdrop-blur-sm border border-white/5 hover:border-purple-500/50 transition-all duration-300">
                        <span className="text-6xl font-serif font-bold text-white/10 mb-4 block">{step.num}</span>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;