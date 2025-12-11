import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ 
            backgroundImage: 'url("https://media.discordapp.net/attachments/1448617451918069915/1448781456167010428/0_1_22.jpg?ex=693c8260&is=693b30e0&hm=83c54b14cbcd7ea9bc020597042c7c99a2f4c98ac4fc9a7fe659f49e0a42e0e2&=&format=webp&width=748&height=930")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-transparent to-dark-900/80 z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tight leading-tight drop-shadow-2xl flex flex-col items-center gap-2 md:gap-4">
          
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
        
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>
    </div>
  );
};

export default Hero;