import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const portfolioItems: PortfolioItem[] = [
    { 
        id: 1, 
        title: "Чорне Сонце", 
        author: "Ребека Роангорс", 
        genre: language === 'uk' ? "Фентезі" : "Fantasy", 
        imageUrl: "https://framerusercontent.com/images/a9qCN0VoFeM9FsgQRMxIjMIR8jE.jpg?scale-down-to=1024&width=818&height=1209",
        gallery: [
            "https://framerusercontent.com/images/a9qCN0VoFeM9FsgQRMxIjMIR8jE.jpg?scale-down-to=1024&width=818&height=1209"
        ]
    },
    { 
        id: 2, 
        title: "Порожній Пазл", 
        author: "Дмитро Палій", 
        genre: language === 'uk' ? "Нуарний трилер" : "Noir Thriller", 
        imageUrl: "https://framerusercontent.com/images/RAmtHkw2gRbOze3nG6ZqieRBNc4.jpg?scale-down-to=1024&width=1859&height=2691",
        gallery: [
             "https://framerusercontent.com/images/RAmtHkw2gRbOze3nG6ZqieRBNc4.jpg?scale-down-to=1024&width=1859&height=2691"
        ]
    },
    { 
        id: 3, 
        title: "Останні дні", 
        author: "Адам Невіл", 
        genre: language === 'uk' ? "Горор" : "Horror", 
        imageUrl: "https://framerusercontent.com/images/MJITq9bGcFum0UN1cu6OiDkVEsQ.jpg?scale-down-to=1024&width=1741&height=2625"
    },
    { 
        id: 4, 
        title: "Тінь богів", 
        author: "Джон Гвінн", 
        genre: language === 'uk' ? "Епічне Фентезі" : "Epic Fantasy", 
        imageUrl: "https://framerusercontent.com/images/8qDEZ8a62Q4WpmpqVAU77OoMsCg.jpg?scale-down-to=1024&width=1330&height=1960",
        gallery: [
             "https://framerusercontent.com/images/8qDEZ8a62Q4WpmpqVAU77OoMsCg.jpg?scale-down-to=1024&width=1330&height=1960"
        ]
    },
    { 
        id: 5, 
        title: "Сон у морі зірок", 
        author: "Крістофер Паоліні", 
        genre: language === 'uk' ? "Наукова фантастика" : "Sci-Fi", 
        imageUrl: "https://framerusercontent.com/images/lW90EsUTNDOATcOz43WZjH2FTI.jpg?scale-down-to=1024&width=1748&height=2596"
    },
    { 
        id: 6, 
        title: "The Echokeepers", 
        author: "Gurmiz Publishing", 
        genre: language === 'uk' ? "Фентезі" : "Fantasy", 
        imageUrl: "https://framerusercontent.com/images/7F9urZnxqCiMy8O9ZQ2eiAxidU.jpg?scale-down-to=1024&width=2194&height=3292"
    },
    { 
        id: 7, 
        title: "День, коли втрачено розум", 
        author: "Ксав'єр Кастільо", 
        genre: language === 'uk' ? "Триллер" : "Thriller", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448617734370758809/2025-12-04_180848.png?ex=693e8ce5&is=693d3b65&hm=9a3391aeada1966bcf7987f972b9bd2f1028e6ad1a670b4f4d3127d18aa756ef&=&format=webp&quality=lossless&width=529&height=800"
    },
    { 
        id: 8, 
        title: "Court of Embers", 
        author: "Lauren Lee King", 
        genre: language === 'uk' ? "Роментезі" : "Romantasy", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448617734811287552/2025-12-04_182927.png?ex=693e8ce5&is=693d3b65&hm=eec6e78fb10b3f9f3b37b75fc11eda649591d46f97629eb0c85a4b87c573b55b&=&format=webp&quality=lossless&width=504&height=800"
    },
    { 
        id: 9, 
        title: "Я стежу за тобою", 
        author: "Тереза Дрісколл", 
        genre: language === 'uk' ? "Триллер" : "Thriller", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448617735230849075/2025-12-04_180737.png?ex=693e8ce6&is=693d3b66&hm=61a71dddef4ef3c6004c71e92c43b61a0f609ac3a6439ff91a79abc1e8e05d9a&=&format=webp&quality=lossless&width=525&height=800"
    },
    { 
        id: 10, 
        title: "Острів ГУР", 
        author: "Максим Бутченко", 
        genre: "Нон-фікшн", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448618123518541824/2025-12-04_181326.png?ex=693e8d42&is=693d3bc2&hm=7b73e062ef0ccd32ca33902e95effef60bb1d834c28608937f5b85159351e688&=&format=webp&quality=lossless&width=589&height=930"
    },
    { 
        id: 11, 
        title: "Unwritten", 
        author: "Adger. R. Matthews 2", 
        genre: language === 'uk' ? "Грімдарк Фентезі" : "Grimdark Fantasy", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448619122706354371/front.jpg?ex=693e8e30&is=693d3cb0&hm=858a23f66e9d1ab1a13dd24d538ad351b57ff18d93a6f6a5a6b9b3f1153bf70d&=&format=webp&width=615&height=930",
        gallery: [
            "https://media.discordapp.net/attachments/1448617451918069915/1448619122706354371/front.jpg?ex=693e8e30&is=693d3cb0&hm=858a23f66e9d1ab1a13dd24d538ad351b57ff18d93a6f6a5a6b9b3f1153bf70d&=&format=webp&width=615&height=930"
        ]
    },
    { 
        id: 12, 
        title: "Waves of want", 
        author: "Faye Yu", 
        genre: language === 'uk' ? "Темний роман" : "Dark Romance", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448778020482453554/52532.jpg?ex=693e796d&is=693d27ed&hm=a25b0486c96f0aabe9cdc403c1a8763366ce36a7658a512f206f4bdb9eb63088&=&format=webp&width=616&height=930"
    },
  ];

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevProject = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? portfolioItems.length - 1 : prev - 1) : null));
  }, [portfolioItems.length]);

  const nextProject = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === portfolioItems.length - 1 ? 0 : prev + 1) : null));
  }, [portfolioItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, prevProject, nextProject]);

  // Lock body scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIndex]);

  const selectedItem = selectedIndex !== null ? portfolioItems[selectedIndex] : null;

  return (
    <section id="portfolio" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-serif tracking-widest uppercase text-sm">{t.portfolio.label}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 mb-4">{t.portfolio.title}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group cursor-pointer relative aspect-[2/3] overflow-hidden rounded-sm"
              onClick={() => openModal(index)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.genre}</span>
                <h3 className="text-white font-serif text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{item.title}</h3>
                <p className="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{item.author}</p>
                <div className="mt-4 flex items-center gap-2 text-purple-400 text-xs uppercase font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                  <span>{t.portfolio.details}</span>
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal with Scrolling Content */}
      {selectedItem && (
        <div 
            className="fixed inset-0 z-[60] bg-dark-900 overflow-y-auto animate-in fade-in duration-300" 
            onClick={closeModal}
        >
          {/* Controls Container */}
          <div className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-[70] pointer-events-none">
             {/* Empty div to balance close button if needed, or back arrow */}
             <div className="pointer-events-auto">
                {/* Could put a logo or 'back' text here */}
             </div>
             <button 
                className="text-gray-400 hover:text-white transition-colors p-2 bg-black/50 backdrop-blur-md rounded-full pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); closeModal(); }}
             >
                <X className="w-8 h-8" />
            </button>
          </div>

          {/* Navigation Buttons (Fixed Center) */}
          <button 
            className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-2 transition-colors z-[70] hidden md:block"
            onClick={prevProject}
          >
            <ChevronLeft className="w-16 h-16" />
          </button>

          <button 
            className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white p-2 transition-colors z-[70] hidden md:block"
            onClick={nextProject}
          >
            <ChevronRight className="w-16 h-16" />
          </button>

          {/* Main Content Container */}
          <div 
            className="relative min-h-screen flex flex-col items-center pt-24 pb-24 px-6 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl w-full">
                {/* Header Info */}
                <div className="text-center mb-12">
                     <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-2 block">{selectedItem.genre}</span>
                     <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{selectedItem.title}</h2>
                     <p className="text-xl text-gray-300 font-serif italic mb-6">{selectedItem.author}</p>
                </div>

                {/* Main Image */}
                <div className="mb-12 shadow-2xl shadow-purple-900/10 rounded-sm overflow-hidden bg-black">
                     <img 
                        src={selectedItem.imageUrl} 
                        alt={selectedItem.title} 
                        className="w-full h-auto object-contain max-h-[80vh]"
                     />
                </div>

                {/* Gallery Grid */}
                {selectedItem.gallery && selectedItem.gallery.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 md:gap-12 mt-16">
                        {selectedItem.gallery.map((img, idx) => (
                            <div key={idx} className="relative group rounded-sm overflow-hidden shadow-lg shadow-black/50">
                                <img 
                                    src={img} 
                                    alt={`${selectedItem.title} detail ${idx + 1}`}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Mobile Navigation Buttons (Bottom) */}
                <div className="flex md:hidden justify-between mt-12 pt-8 border-t border-white/10">
                    <button 
                        className="flex items-center gap-2 text-gray-400 hover:text-white uppercase text-xs font-bold tracking-widest"
                        onClick={(e) => { e.stopPropagation(); prevProject(e); }}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Prev
                    </button>
                    <button 
                        className="flex items-center gap-2 text-gray-400 hover:text-white uppercase text-xs font-bold tracking-widest"
                        onClick={(e) => { e.stopPropagation(); nextProject(e); }}
                    >
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;