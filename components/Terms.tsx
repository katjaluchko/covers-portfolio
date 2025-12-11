import React, { useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TermsProps {
  onBack: () => void;
}

const Terms: React.FC<TermsProps> = ({ onBack }) => {
  const { t } = useLanguage();
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-dark-900 pt-32 pb-24 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-12 group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>{t.terms.back}</span>
        </button>

        <div className="bg-dark-800 p-8 md:p-16 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-8">
              <div className="p-3 bg-purple-500/10 rounded-full text-purple-400">
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">{t.terms.title}</h1>
            </div>

            <div className="space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
              
              <div className="p-4 bg-white/5 border-l-4 border-purple-500 rounded-r-sm italic text-gray-400">
                <p>{t.terms.intro}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-500">1.</span> {t.terms.s1.t}
                </h3>
                <p>{t.terms.s1.p}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-500">2.</span> {t.terms.s2.t}
                </h3>
                <ul className="space-y-3 pl-4">
                  <li><strong className="text-gray-200">2.1.</strong> {t.terms.s2.l1}</li>
                  <li><strong className="text-gray-200">2.2.</strong> {t.terms.s2.l2}</li>
                  <li><strong className="text-gray-200">2.3.</strong> {t.terms.s2.l3}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-500">3.</span> {t.terms.s3.t}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2"><strong className="text-gray-200">3.1.</strong> {t.terms.s3.l1}</p>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-gray-200">3.2.</strong> {t.terms.s3.l2}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-500">4.</span> {t.terms.s4.t}
                </h3>
                <ul className="space-y-3 pl-4">
                  <li><strong className="text-gray-200">4.1.</strong> {t.terms.s4.l1}</li>
                  <li><strong className="text-gray-200">4.2.</strong> {t.terms.s4.l2}</li>
                  <li><strong className="text-gray-200">4.3.</strong> {t.terms.s4.l3}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-purple-500">5.</span> {t.terms.s5.t}
                </h3>
                <ul className="space-y-3 pl-4">
                  <li><strong className="text-gray-200">5.1.</strong> {t.terms.s5.p}</li>
                </ul>
              </div>

            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
             <button 
              onClick={onBack}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-colors"
             >
               {t.terms.btn}
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;