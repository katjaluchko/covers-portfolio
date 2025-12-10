import React from 'react';
import { Quote, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Adger Matthews",
    role: "Замовник-автор з Upwork",
    text: "Виняткова майстерність — втілення моєї візії. Катерина створила обкладинку для мого епічного фентезі-роману «UNWRITTEN: The Awakening» і просто вразила мене. З самого першого концепту вона зрозуміла похмурий тон і космічний масштаб, яких я прагнув. Кінцева обкладинка просто захоплює дух — дракон, атмосферне освітлення, відчуття епічного конфлікту — все це ідеально поєднується. Найбільше мене вразила її увага до деталей і готовність повторювати процес, поки кожен елемент не став ідеальним. Вона вловила суть моєї історії таким чином, що читачі зупиняються і хочуть дізнатися більше. Катерина - професіонал, комунікабельна і справді талановита. Її роботи не просто виглядають добре - вони продають книги. Я вже отримав неймовірні відгуки про обкладинку і з нетерпінням чекаю на подальшу співпрацю з нею над майбутніми проектами серії. Якщо ви шукаєте художника обкладинок, який може створити роботу видавничої якості і справді розуміє жанр фентезі, я не можу достатньо високо оцінити Катерину. Вона стала неоціненною частиною втілення моєї творчої візії в життя."
  },
  {
    id: 2,
    name: "Gurmiz Publishing",
    role: "Видавець Amazon",
    text: "Працювати з Катериною було дуже приємно, вона справді зробила чудову роботу! Вона швидко відповідала на повідомлення і професійно відповідала на всі питання. Обкладинка, яку вона створила, вийшла просто чудовою. Я дуже рекомендую її всім, хто потребує обкладинки для електронної книги."
  },
  {
    id: 3,
    name: "Каміла Грін",
    role: "Авторка Самвидав",
    text: "Дуже щаслива була попрацювати з Катериною. Вона є справжньою професіоналкою своєї справи, а також дуже приємна і відповідальна людина. Мої читачі теж особливо відмічають обкладинку та дизайн закладинок, над якими працювала Катерина і я сподіваюся на подальшу плідну працю."
  },
  {
    id: 4,
    name: "Anna D.",
    role: "Клієнт з Upwork",
    text: "З Катериною ДУЖЕ приємно працювати. Її навички чудові, як і її смак у виборі правильних моделей обкладинок, шрифту тощо. Вона чітко розуміє напрямок книги. З нею легко спілкуватися. Всю роботу здає вчасно, а іноді й раніше. Абсолютна перлина для роботи! Я можу дуже рекомендувати Катерину іншим професіоналам, які шукають професіонального дизайнера обкладинок."
  },
  {
    id: 5,
    name: "Kimberly Ann Martin",
    role: "Замовник-автор з Upwork",
    text: "Працювати з Катериною було абсолютним задоволенням! Вона була неймовірно доступною, завжди готовою приступити до роботи в будь-яку годину, і її відданість справі дійсно оживила мою обкладинку. Її редизайн був не що інше, як досконалість, відображаючи саме те, що я собі уявляла, і навіть більше. Я не можу настійно рекомендувати її будь-кому, хто шукає першокласного дизайнера - вона джерело таланту!"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Відгуки</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Що кажуть автори та видавці про співпрацю</p>
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
              
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
                    {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold font-serif text-sm">{review.name}</h4>
                  <p className="text-purple-400 text-xs uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;