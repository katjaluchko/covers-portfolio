import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
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
        imageUrl: "https://drive.google.com/uc?export=view&id=1fuJfF-d53VWG3SYVmiPOG74QVeHaVpcg"
    },
    { 
        id: 8, 
        title: "Court of Embers", 
        author: "Lauren Lee King", 
        genre: language === 'uk' ? "Роментезі" : "Romantasy", 
        imageUrl: "https://drive.google.com/uc?export=view&id=1VvCkCLAp0CEHVZytbJQyHwolUQe2X2_f"
    },
    { 
        id: 9, 
        title: "Я стежу за тобою", 
        author: "Тереза Дрісколл", 
        genre: language === 'uk' ? "Триллер" : "Thriller", 
        imageUrl: "https://drive.google.com/uc?export=view&id=1rw0r-f0-h8feNQ-76JZhKS8JsAFI7x8n"
    },
    { 
        id: 10, 
        title: "Острів ГУР", 
        author: "Максим Бутченко", 
        genre: "Нон-фікшн", 
        imageUrl: "https://drive.google.com/uc?export=view&id=1aGjLvRUKsi_r66380VjBz92jq1-qmfFp"
    },
    { 
        id: 11, 
        title: "Unwritten", 
        author: "Adger. R. Matthews 2", 
        genre: language === 'uk' ? "Грімдарк Фентезі" : "Grimdark Fantasy", 
        imageUrl: "https://drive.google.com/uc?export=view&id=1wLOgtH2yEnMyy74GYvYrIruy7H704UQS",
        gallery: [
            "https://drive.google.com/uc?export=view&id=1wLOgtH2yEnMyy74GYvYrIruy7H704UQS"
        ]
    },
    { 
        id: 12, 
        title: "Waves of want", 
        author: "Faye Yu", 
        genre: language === 'uk' ? "Темний роман" : "Dark Romance", 
        imageUrl: "https://drive.google.com/uc?export=view&id=1rUKp8_vQVakZYBpwA1y7RvXsYyp4kvH_"
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-serif tracking-widest uppercase text-sm">{t.portfolio.label}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 mb-4">{t.portfolio.title}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {portfolioItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-[2/3] overflow-hidden rounded-sm cursor-default"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;