import React from 'react';

const steps = [
  {
    num: "01",
    title: "Зв’яжіться зі мною.",
    desc: "Поговоримо про вашу книгу. Я вислухаю ваші побажання та за потреби поставлю декілька запитань, щоб зрозуміти всі деталі для створення обкладинки."
  },
  {
    num: "02",
    title: "50% передоплати",
    desc: "Після узгодження всіх умов, вам потрібно буде внести передоплату в розмірі 50% перед початком роботи. Детальні умови можна знайти тут"
  },
  {
    num: "03",
    title: "Етапи роботи",
    desc: "Спершу я підготую ескізи, потім ми узгодимо один з них. Після цього почнеться робота над обраним варіантом, і я надам фінальну оцінку та можливість внести правки."
  },
  {
    num: "04",
    title: "Фіналізація проєкту",
    desc: "Після затвердження обкладинки, я надам вам посилання на файлообмінник з усіма вихідними файлами. Решту оплати потрібно внести перед отриманням файлів."
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-dark-800 to-transparent opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 sticky top-32">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Процес роботи</h2>
                <p className="text-gray-400 mb-8">
                    Прозорий процес роботи гарантує результат, який перевершить ваші очікування. Від ідеї до готової книги на полиці.
                </p>
                <a href="#contact" className="inline-flex items-center text-purple-400 font-bold uppercase tracking-wider hover:text-white transition-colors">
                    Почати проект <span className="ml-2">→</span>
                </a>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-white/5 p-8 backdrop-blur-sm border border-white/5 hover:border-purple-500/50 transition-all duration-300">
                        <span className="text-6xl font-serif font-bold text-white/10 mb-4 block">{step.num}</span>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;