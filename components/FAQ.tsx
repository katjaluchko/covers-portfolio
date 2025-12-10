import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Які жанри книг я найчастіше оформляю?",
    answer: "Я працюю з різними жанрами, але найбільше спеціалізуюся на художній літературі: трилерах, науковій фантастиці, фентезі. Проте завжди рада працювати і з іншими жанрами, щоб створювати обкладинки, які привернуть увагу читачів."
  },
  {
    question: "Скільки часу займає створення обкладинки?",
    answer: "Зазвичай створення обкладинки займає від 2 тижнів до місяця, залежно від складності та поточної завантаженості. Завжди стараюсь дотримуватися узгоджених термінів, щоб ви могли своєчасно представити свою книгу."
  },
  {
    question: "Чи можу я допомогти з вибором стилю обкладинки?",
    answer: "Так, із задоволенням допоможу! Разом ми розглянемо найкращі варіанти, враховуючи жанр, цільову аудиторію та ваші побажання. Моя мета — створити дизайн, який ідеально підкреслить унікальність вашої книги."
  },
  {
    question: "Які матеріали або інформація потрібні для початку роботи над обкладинкою?",
    answer: "Створіть коротке технічне завдання, в якому ви можете написати опис вашої книги, що хочете бачити на обкладинці, та можете додатково вставити кілька референсів, щоб я краще вхопила потрібну атмосферу. За необхідності надам власний приклад т.з."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-dark-900 border-t border-white/5 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <HelpCircle className="w-6 h-6 text-purple-400" />
                </div>
            </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Відповіді на запитання</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-dark-800 border ${openIndex === index ? 'border-purple-500/50' : 'border-white/5'} rounded-sm overflow-hidden transition-all duration-300`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-white/5 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`text-lg font-serif font-bold ${openIndex === index ? 'text-purple-400' : 'text-white'}`}>
                  {faq.question}
                </span>
                <div className={`p-1 rounded-full ${openIndex === index ? 'bg-purple-500 text-black' : 'bg-white/10 text-gray-400'} transition-all`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-dashed border-white/10 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;