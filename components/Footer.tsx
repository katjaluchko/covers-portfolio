import React from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          {/* Logo Image */}
          <a href="#" className="inline-block mb-2">
            <img 
                src="https://framerusercontent.com/images/pgXEt8k7gS1PCORXUnYHaniSes.svg?scale-down-to=512" 
                alt="Logo" 
                className="h-8 w-auto object-contain"
            />
          </a>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Всі права захищено.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="mailto:contact@designer.com" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;