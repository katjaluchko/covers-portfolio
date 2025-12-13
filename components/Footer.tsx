import React, { useState } from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col items-center gap-8">
        
        {/* Social Networks Centered with "Windows" styling */}
        <div className="flex items-center gap-6">
          <a 
            href="https://www.instagram.com/katerydess/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/5 rounded-full hover:bg-purple-500 hover:text-white text-gray-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] group"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          
          <a 
            href="https://www.upwork.com/freelancers/katerydesign" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 rounded-full hover:bg-purple-500 text-gray-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center group"
             aria-label="Upwork"
          >
            <img 
              src="https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/upwork.svg"
              alt="Upwork"
              className="w-6 h-6 object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert transition-all duration-300"
            />
          </a>

          <a 
            href="mailto:katjaluchko@gmail.com" 
            className="p-3 bg-white/5 rounded-full hover:bg-purple-500 hover:text-white text-gray-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] group"
             aria-label="Email"
          >
             <Mail className="w-6 h-6" />
          </a>
        </div>

        <div className="text-center">
          {/* Logo (Replaced Text with Image) */}
          <a href="#" className="inline-block mb-4 opacity-50 hover:opacity-100 transition-opacity duration-300 no-underline">
            <img 
              src="https://media.discordapp.net/attachments/1448617451918069915/1448625723928613027/c5ff6cff3e9568a4.png?ex=693e9456&is=693d42d6&hm=bf30802c2b4a111c1fb02a5b3a95f714c7d267fd938bccee13cbc782d25974b1&=&format=webp&quality=lossless&width=1110&height=920" 
              alt="KateryDess Logo" 
              className="h-16 w-auto object-contain"
            />
          </a>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;