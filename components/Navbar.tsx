import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onGoHome: () => void;
  isHomePage: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onGoHome, isHomePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.pricing, href: '#services' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!isHomePage) {
      onGoHome();
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onGoHome();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsOpen(false);
  }

  const toggleLanguage = () => {
    setLanguage(language === 'uk' ? 'en' : 'uk');
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        <div className="flex items-center gap-6">
            {/* Logo Image */}
            <a href="#" onClick={handleLogoClick} className="block cursor-pointer relative z-50 group">
            <img 
                src="https://media.discordapp.net/attachments/1448617451918069915/1448625723928613027/c5ff6cff3e9568a4.png?ex=693d42d6&is=693bf156&hm=05a970834c3944c914bf0b4d19a96258238cc7996f9dd1ac7a6428b0de90a0b8&=&format=webp&quality=lossless&width=1110&height=920" 
                alt="Logo" 
                className="h-32 md:h-56 w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-3 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            />
            </a>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:flex items-center gap-1 border border-white/20 rounded-full p-1 bg-black/40 backdrop-blur-sm">
                <button 
                    onClick={() => setLanguage('uk')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${language === 'uk' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    UA
                </button>
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    ENG
                </button>
            </div>
        </div>

        {isHomePage ? (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-2 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative px-6 py-2 group cursor-pointer"
                >
                  <span className="absolute inset-0 bg-white/5 rounded-sm scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-hover:w-1/2 transition-all duration-300 ease-out delay-100"></span>
                  <span className="relative z-10 text-gray-300 group-hover:text-purple-300 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300">
                    {link.name}
                  </span>
                </a>
              ))}

              <div className="w-px h-6 bg-white/10 mx-2"></div>

              {/* Blog Button */}
              <a 
                href="https://www.threads.com/@katerydess" 
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-2 border border-purple-500/50 text-white font-bold text-xs uppercase tracking-widest overflow-hidden group rounded-sm hover:border-purple-400 transition-colors cursor-pointer"
              >
                 <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t.nav.blog}</span>
                 <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </a>

              {/* Order Button */}
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="relative px-6 py-2 border border-purple-500/50 text-white font-bold text-xs uppercase tracking-widest overflow-hidden group rounded-sm hover:border-purple-400 transition-colors cursor-pointer"
              >
                 <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t.nav.order}</span>
                 <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-4">
                 {/* Language Switcher - Mobile */}
                <button onClick={toggleLanguage} className="flex items-center gap-1 text-xs font-bold text-white border border-white/20 px-2 py-1 rounded-sm">
                    <Globe className="w-3 h-3" />
                    <span>{language === 'uk' ? 'UA' : 'EN'}</span>
                </button>

                <button className="text-white relative z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>
          </>
        ) : (
           <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 border border-white/20 rounded-full p-1 bg-black/40 backdrop-blur-sm">
                <button 
                    onClick={() => setLanguage('uk')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${language === 'uk' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    UA
                </button>
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    ENG
                </button>
              </div>
              <button onClick={onGoHome} className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold transition-colors">
                  <span>{t.nav.home}</span>
              </button>
           </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => {
                  scrollToSection(e, link.href);
                  setIsOpen(false);
              }}
              className="text-2xl font-serif text-white hover:text-purple-400 transition-colors relative group"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="group-hover:mr-4 transition-all duration-300">{link.name}</span>
              <span className="opacity-0 group-hover:opacity-100 absolute -right-6 top-1/2 -translate-y-1/2 text-purple-500 text-lg">→</span>
            </a>
          ))}

          <a 
             href="https://www.threads.com/@katerydess"
             target="_blank"
             rel="noopener noreferrer"
             className="text-2xl font-serif text-white hover:text-purple-400 transition-colors relative group"
             style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
             <span className="group-hover:mr-4 transition-all duration-300">{t.nav.blog}</span>
             <span className="opacity-0 group-hover:opacity-100 absolute -right-6 top-1/2 -translate-y-1/2 text-purple-500 text-lg">→</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
                scrollToSection(e, '#contact');
                setIsOpen(false);
            }}
            className="mt-8 px-8 py-3 bg-purple-600 text-white font-bold uppercase tracking-widest rounded-sm hover:bg-purple-500 transition-colors"
          >
            {t.nav.order}
          </a>
      </div>
    </nav>
  );
};

export default Navbar;