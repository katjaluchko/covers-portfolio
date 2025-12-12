import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Testimonials: React.FC = () => {
  const { language, t } = useLanguage();

  const reviews = [
    {
        id: 1,
        name: "Adger Matthews",
        role: language === 'uk' ? "Замовник-автор з Upwork" : "Author client from Upwork",
        text: language === 'uk' 
            ? "Виняткова майстерність — втілення моєї візії. Катерина створила обкладинку для мого епічного фентезі-роману «UNWRITTEN: The Awakening» і просто вразила мене. З самого першого концепту вона зрозуміла похмурий тон і космічний масштаб, яких я прагнув. Кінцева обкладинка просто захоплює дух. Катерина - професіонал, комунікабельна і справді талановита."
            : "Exceptional craftsmanship — the embodiment of my vision. Kateryna created the cover for my epic fantasy novel 'UNWRITTEN: The Awakening' and just blew me away. From the very first concept, she understood the dark tone and cosmic scale I was aiming for. The final cover is simply breathtaking. Kateryna is a professional, communicative, and truly talented.",
        coverImage: "https://media.discordapp.net/attachments/1448617451918069915/1448619122706354371/front.jpg?ex=693beb30&is=693a99b0&hm=561b393d07148ecb5e3b4265211ff0e61c3710d03c1fb85d077d04cf53a7a13b&=&format=webp&width=615&height=930"
    },
    {
        id: 2,
        name: "Kimberly Ann Martin",
        role: language === 'uk' ? "Замовник-автор з Upwork" : "Author client from Upwork",
        text: language === 'uk'
            ? "Працювати з Катериною було абсолютним задоволенням! Вона була неймовірно доступною, завжди готовою приступити до роботи в будь-яку годину, і її відданість справі дійсно оживила мою обкладинку. Її редизайн був не що інше, як досконалість."
            : "Working with Kateryna was an absolute pleasure! She was incredibly accessible, always ready to start work at any hour, and her dedication truly brought my cover to life. Her redesign was nothing short of perfection."
    },
    {
        id: 3,
        name: language === 'uk' ? "Каміла Грін" : "Kamila Green",
        role: language === 'uk' ? "Авторка Самвидав" : "Self-Published Author",
        text: language === 'uk'
            ? "Дуже щаслива була попрацювати з Катериною. Вона є справжньою професіоналкою своєї справи, а також дуже приємна і відповідальна людина. Мої читачі теж особливо відмічають обкладинку."
            : "I was very happy to work with Kateryna. She is a true professional in her field, as well as a very pleasant and responsible person. My readers also especially note the cover."
    },
    {
        id: 4,
        name: "Anna D.",
        role: language === 'uk' ? "Клієнт з Upwork" : "Client from Upwork",
        text: language === 'uk'
            ? "З Катериною ДУЖЕ приємно працювати. Її навички чудові, як і її смак у виборі правильних моделей обкладинок, шрифту тощо. Вона чітко розуміє напрямок книги. З нею легко спілкуватися."
            : "It is VERY pleasant to work with Kateryna. Her skills are excellent, as is her taste in choosing the right cover models, fonts, etc. She clearly understands the direction of the book. She is easy to communicate with."
    },
    {
        id: 5,
        name: "Gurmiz Publishing",
        role: language === 'uk' ? "Видавець Amazon" : "Amazon Publisher",
        text: language === 'uk'
            ? "Працювати з Катериною було дуже приємно, вона справді зробила чудову роботу! Вона швидко відповідала на повідомлення і професійно відповідала на всі питання. Обкладинка, яку вона створила, вийшла просто чудовою."
            : "Working with Kateryna was very pleasant, she really did a great job! She responded quickly to messages and answered all questions professionally. The cover she created turned out just great.",
        coverImage: "https://framerusercontent.com/images/7F9urZnxqCiMy8O9ZQ2eiAxidU.jpg?scale-down-to=1024&width=2194&height=3292"
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{t.testimonials.title}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">{t.testimonials.subtitle}</p>
        </div>

        <div className="columns-1 md:columns-2 gap-8 space-y-8 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-dark-800/50 backdrop-blur-md p-8 rounded-sm border border-white/5 hover:border-purple-500/30 transition-all duration-300 break-inside-avoid relative group">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/10 group-hover:text-purple-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-purple-500 fill-purple-500" />
                ))}
              </div>
              
              <p className="text-gray-300 italic mb-6 leading-relaxed text-sm">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-4 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20 shrink-0">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                    <h4 className="text-white font-bold font-serif text-sm">{review.name}</h4>
                    <p className="text-purple-400 text-xs uppercase tracking-wider">{review.role}</p>
                    </div>
                </div>

                {/* Optional Linked Book Cover */}
                {review.coverImage && (
                    <div className="relative group/cover shrink-0">
                        <img 
                            src={review.coverImage} 
                            alt={`${review.name}'s Book`} 
                            className="w-12 h-auto rounded-sm border border-white/10 shadow-sm transition-transform duration-300 group-hover/cover:scale-150 group-hover/cover:z-50 relative origin-bottom-right"
                        />
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;