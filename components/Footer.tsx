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
          {/* Logo - Updated to new image and adjusted size (h-24) */}
          <a href="#" className="inline-block mb-4 opacity-50 hover:opacity-100 transition-opacity duration-300 no-underline">
            <img 
              src="https://i.ibb.co/BK6bg5xv/1000023570.png" 
              alt="KateryDess Logo" 
              className="h-24 w-auto object-contain"
            />
          </a>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;