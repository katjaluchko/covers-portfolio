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
            "https://media.discordapp.net/attachments/1448617451918069915/1448742140795420794/1.jpg?ex=693c5dc2&is=693b0c42&hm=7a354201f384a6ecf3f642fe79e788f81fbfe6acfe25bb96e68d07130bde3a4c&=&format=webp&width=943&height=800",
            "https://media.discordapp.net/attachments/1448617451918069915/1448742141164650730/Free_Book_Mockup_2.jpg?ex=693c5dc2&is=693b0c42&hm=d8356f9e97797d00730579c0c8635d8c90e16cd2a92503c90e456d68da4ff0c6&=&format=webp&width=1066&height=800",
            "https://media.discordapp.net/attachments/1448617451918069915/1448742141479096431/620f04763bb771c1.jpg?ex=693c5dc2&is=693b0c42&hm=d93520ae87c3bca4242eb809d58c239ff299a37be9d3cbd70e2237b8d703af33&=&format=webp&width=746&height=800"
        ]
    },
    { 
        id: 2, 
        title: "Порожній Пазл", 
        author: "Дмитро Палій", 
        genre: language === 'uk' ? "Нуарний трилер" : "Noir Thriller", 
        imageUrl: "https://framerusercontent.com/images/RAmtHkw2gRbOze3nG6ZqieRBNc4.jpg?scale-down-to=1024&width=1859&height=2691",
        gallery: [
            "https://media.discordapp.net/attachments/1448617451918069915/1448743326307188888/ffd8ddc1821b51e8.jpg?ex=693c5edd&is=693b0d5d&hm=553f817429b2e227a1b5626851037941ab64bbd1765b264770cbb8a739633ac5&=&format=webp&width=1110&height=804",
            "https://media.discordapp.net/attachments/1448617451918069915/1448742936350167184/b1bcb9be954c361b.jpg?ex=693c5e80&is=693b0d00&hm=16809df439f7e6b51a9799986f6b1d137af1d40797de2243b49a4aee981552ee&=&format=webp&width=1066&height=800",
            "https://media.discordapp.net/attachments/1448617451918069915/1448742937146953909/83dbcd6dd62a9189.jpg?ex=693c5e80&is=693b0d00&hm=e139ed2bd41f13112386f9cbc318fbd68e58881d5f60eaddafa2bb94cee89dbb&=&format=webp&width=1066&height=800"
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
            "https://media.discordapp.net/attachments/1448617451918069915/1448756072843317470/2.jpg?ex=693c6abc&is=693b193c&hm=5f3dac756feda5d331fd7f81ac10c97148034b1bccc17d0e0bfab5f542002735&=&format=webp&width=1194&height=800",
            "https://media.discordapp.net/attachments/1448617451918069915/1448756071807193321/13ebc344b828d2ad.jpg?ex=693c6abc&is=693b193c&hm=fc8864b0255d5c6accf4ea2d3383bddce90a9623c53c4c798817e4c1012a95e2&=&format=webp&width=1090&height=800",
            "https://media.discordapp.net/attachments/1448617451918069915/1448756123816562738/d0784eaf61596561.jpg?ex=693c6ac8&is=693b1948&hm=5739348f3209b4565347b2b9c570fa2d0ec270b2a5ece37095a9d7e669cfbbd8&=&format=webp&width=1193&height=800"
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
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448617734370758809/2025-12-04_180848.png?ex=693d3b65&is=693be9e5&hm=8425445da2fcf1b9ba98615a9e251c6c46de27a07358aa09700d92f29c3ed2cd&=&format=webp&quality=lossless&width=529&height=800"
    },
    { 
        id: 8, 
        title: "Court of Embers", 
        author: "Lauren Lee King", 
        genre: language === 'uk' ? "Роментезі" : "Romantasy", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448617734811287552/2025-12-04_182927.png?ex=693d3b65&is=693be9e5&hm=08b2b6e82e9d8add22f299aefa65ab2b6d416905eafedf5cdf76f28efd75ad69&=&format=webp&quality=lossless&width=504&height=800"
    },
    { 
        id: 9, 
        title: "Я стежу за тобою", 
        author: "Тереза Дрісколл", 
        genre: language === 'uk' ? "Триллер" : "Thriller", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448617735230849075/2025-12-04_180737.png?ex=693d3b66&is=693be9e6&hm=65820405ccf740b9a3c071a28d6c07b0025e9a88f56c4d45e4f4455e59256a9b&=&format=webp&quality=lossless&width=525&height=800"
    },
    { 
        id: 10, 
        title: "Острів ГУР", 
        author: "Максим Бутченко", 
        genre: "Нон-фікшн", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448618123518541824/2025-12-04_181326.png?ex=693d3bc2&is=693bea42&hm=2328fcbc4b46440d843ef711f699bbef19d91abff890b27f94cb31e2a241a7e2&=&format=webp&quality=lossless&width=278&height=438"
    },
    { 
        id: 11, 
        title: "Unwritten", 
        author: "Adger. R. Matthews 2", 
        genre: language === 'uk' ? "Грімдарк Фентезі" : "Grimdark Fantasy", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448619122706354371/front.jpg?ex=693d3cb0&is=693beb30&hm=1f124ea964a797225ade2c48f53ee15a237fc4331b24b84dd4eb7636eb1bcdda&=&format=webp&width=615&height=930",
        gallery: [
            "https://media.discordapp.net/attachments/1448617451918069915/1448748005879709879/-1.jpg?ex=693c6339&is=693b11b9&hm=ace006089c2d5b3f383e133f6ec1391b8760d8ebecddafd14f3fc9238671c387&=&format=webp&width=1110&height=866",
            "https://media.discordapp.net/attachments/1448617451918069915/1448747998501933066/512.jpg?ex=693c6337&is=693b11b7&hm=f26ebb4628e21108432a89d1077164dc116a90e94b809c8f677673a3ff9714de&=&format=webp&width=1416&height=800",
            "https://media.discordapp.net/attachments/1448617451918069915/1448747999617355950/14214.jpg?ex=693c6337&is=693b11b7&hm=ec32b99a2cd94a07bf927ebf422c7a412334b18567149cb519364429dc32f8b1&=&format=webp&width=1416&height=800"
        ]
    },
    { 
        id: 12, 
        title: "Waves of want", 
        author: "Faye Yu", 
        genre: language === 'uk' ? "Темний роман" : "Dark Romance", 
        imageUrl: "https://media.discordapp.net/attachments/1448617451918069915/1448778020482453554/52532.jpg?ex=693c7f2d&is=693b2dad&hm=b5066f08fe119460a2f007c42228b12d67926fb8170872986f02d40dbeb6e7ad&=&format=webp&width=616&height=930"
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