import React from 'react';
import { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: "Погана Мати", 
    author: "Міа Шарідан", 
    genre: "Трилер / Драма", 
    imageUrl: "https://framerusercontent.com/images/a9qCN0VoFeM9FsgQRMxIjMIR8jE.jpg?scale-down-to=1024&width=818&height=1209" 
  },
  { 
    id: 2, 
    title: "Порожній Пазл", 
    author: "Дмитро Палій", 
    genre: "Детектив", 
    imageUrl: "https://framerusercontent.com/images/RAmtHkw2gRbOze3nG6ZqieRBNc4.jpg?scale-down-to=1024&width=1859&height=2691" 
  },
  { 
    id: 3, 
    title: "Лють Богів", 
    author: "Джон Гвінн", 
    genre: "Епічне Фентезі", 
    imageUrl: "https://framerusercontent.com/images/MJITq9bGcFum0UN1cu6OiDkVEsQ.jpg?scale-down-to=1024&width=1741&height=2625" 
  },
  { 
    id: 4, 
    title: "Сон у морі зірок", 
    author: "Крістофер Паоліні", 
    genre: "Наукова Фантастика", 
    imageUrl: "https://framerusercontent.com/images/8qDEZ8a62Q4WpmpqVAU77OoMsCg.jpg?scale-down-to=1024&width=1330&height=1960" 
  },
  { 
    id: 5, 
    title: "Control: Dark Syndicate", 
    author: "Vivian Flame", 
    genre: "Dark Romance", 
    imageUrl: "https://framerusercontent.com/images/lW90EsUTNDOATcOz43WZjH2FTI.jpg?scale-down-to=1024&width=1748&height=2596" 
  },
  { 
    id: 6, 
    title: "Court of Embers", 
    author: "Lauren Lee King", 
    genre: "Фентезі", 
    imageUrl: "https://framerusercontent.com/images/7F9urZnxqCiMy8O9ZQ2eiAxidU.jpg?scale-down-to=1024&width=2194&height=3292" 
  },
  { 
    id: 7, 
    title: "Чорне Сонце", 
    author: "Ребекка Роангорс", 
    genre: "Фентезі", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Chorne+Sontse" 
  },
  { 
    id: 8, 
    title: "Останні дні", 
    author: "Адам Невілл", 
    genre: "Жахи / Містика", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Ostanni+Dni" 
  },
  { 
    id: 9, 
    title: "День, коли втрачено розум", 
    author: "Хав'єр Кастільйо", 
    genre: "Трилер", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Den+vtracheno+rozum" 
  },
  { 
    id: 10, 
    title: "Я стежу за тобою", 
    author: "Тереза Дрісколл", 
    genre: "Трилер", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Ya+stezhu" 
  },
  { 
    id: 11, 
    title: "Бий. Біжи. Замри.", 
    author: "Каміла Грін", 
    genre: "Трилер", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Byi+Bizhy+Zamry" 
  },
  { 
    id: 12, 
    title: "Острів ГУР", 
    author: "Максим Бутченко", 
    genre: "Військова Драма", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Ostriv+GUR" 
  },
  { 
    id: 13, 
    title: "Тіні Забутих Предків", 
    author: "М. Коцюбинський", 
    genre: "Класика", 
    imageUrl: "https://placehold.co/400x600/1e1e1e/c084fc?text=Tini+Zabutykh" 
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-dark-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Портфоліо</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
        </div>

        {/* Masonry-style grid for 13 items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-sm cursor-pointer shadow-xl shadow-black/50">
              <div className="aspect-[2/3] overflow-hidden bg-dark-800">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 border-b-4 border-purple-500">
                <span className="text-purple-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">{item.genre}</span>
                <h3 className="text-sm md:text-xl font-serif font-bold text-white mb-1 leading-tight">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-300">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;