import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'uk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  uk: {
    nav: {
      portfolio: 'Портфоліо',
      pricing: 'Ціни',
      contact: 'Контакти',
      order: 'Замовити',
      home: 'На Головну',
      blog: 'Блог'
    },
    hero: {
      line1: ['Шукаєш', 'дизайнера'],
      line2: ['для', 'своєї', 'книги?'],
      subtitle: 'Гортай униз, щоб дізнатися більше.'
    },
    portfolio: {
      label: 'Галерея робіт',
      title: 'Останні проєкти',
      details: 'Детальніше'
    },
    services: {
      title: 'Ціни',
      ebook: {
        title: 'E-Book обкладинка',
        desc: '(ціна середня, залежить від складності)',
        features: [
          "Дизайн обкладинки електронної книги",
          "1 Мокап",
          "Усі вихідні файли",
          "оформлення контенту для соц-мереж"
        ]
      },
      print: {
        title: 'Hardback/paperback обкладинка',
        desc: '(ціна середня, залежить від складності)',
        note: 'Форзац, зрізи обговорюються окремо, ціна вираховується окремо від вартості цілої обкладинки.',
        features: [
          "Повний E-BOOK Пакет",
          "Дизайн обкладинки в м'якій чи твердій обкладинці",
          "Усі вихідні файли",
          "оформлення контенту для соц-мереж"
        ]
      }
    },
    process: {
      btn: 'Умови та положення',
      title: 'Процес роботи',
      subtitle: 'Ознайомімося з процесом роботи та термінами створення обкладинки:',
      steps: [
        { num: "01", title: "Зв’яжіться зі мною.", desc: "Поговоримо про вашу книгу. Я вислухаю ваші побажання та за потреби поставлю декілька запитань, щоб зрозуміти всі деталі для створення обкладинки." },
        { num: "02", title: "50% передоплати", desc: "Після узгодження всіх умов, вам потрібно буде внести передоплату у розмірі 50% перед початком роботи на карту ФОП дизайнера." },
        { num: "03", title: "Етапи роботи", desc: "Спершу я підготую ескізи, потім ми узгодимо один з них. Після цього почнеться робота над обраним варіантом, і я надам фінальну оцінку та можливість внести правки." },
        { num: "04", title: "Фіналізація проєкту", desc: "Після затвердження обкладинки, я надам вам посилання на файлообмінник з усіма вихідними файлами. Решту оплати потрібно внести перед отриманням файлів." }
      ]
    },
    faq: {
      title: 'Відповіді на запитання',
      btn: 'Технічне Завдання',
      items: [
        { q: "Які жанри книг я найчастіше оформляю?", a: "Я працюю з різними жанрами, але найбільше спеціалізуюся на художній літературі: трилерах, науковій фантастиці, фентезі. Проте завжди рада працювати і з іншими жанрами, щоб створювати обкладинки, які привернуть увагу читачів." },
        { q: "Скільки часу займає створення обкладинки?", a: "Зазвичай створення обкладинки займає від 2 тижнів до місяця, залежно від складності та поточної завантаженості. Завжди стараюсь дотримуватися узгоджених термінів, щоб ви могли своєчасно представити свою книгу." },
        { q: "Чи можу я допомогти з вибором стилю обкладинки?", a: "Так, із задоволенням допоможу! Разом ми розглянемо найкращі варіанти, враховуючи жанр, цільову аудиторію та ваші побажання. Моя мета — створити дизайн, який ідеально підкреслить унікальність вашої книги." },
        { q: "Які матеріали або інформація потрібні для початку роботи над обкладинкою?", a: "Створіть коротке технічне завдання, в якому ви можете написати опис вашої книги, що хочете бачити на обкладинці, та можете додатково вставити кілька референсів, щоб я краще вхопила потрібну атмосферу. За необхідності нижче надається приклад простого технічого завдання:" }
      ]
    },
    contact: {
      label: 'Почати співпрацю',
      title: 'Дані проєкту',
      desc: 'Заповніть форму нижче, щоб я міг краще зрозуміти ваш проєкт та надати точну оцінку вартості та строків.',
      form: {
        package_label: 'Оберіть пакет послуг',
        ebook_sub: 'Електронна обкладинка',
        print_sub: 'Друкована + Електронна',
        name: "Ваше Ім'я",
        name_ph: "Іван Іванов",
        email: "Email",
        book: "Назва Книги",
        book_ph: "Назва вашого твору",
        genre: "Жанр",
        synopsis: "Анотація",
        synopsis_ph: "Короткий опис сюжету книги...",
        pref: "Побажання до дизайну",
        pref_ph: "Кольори, атмосфера, символи...",
        deadline: "Бажаний Дедлайн",
        success: "Дякую! Вашу анкету успішно відправлено. Я зв'яжусь з вами найближчим часом.",
        error: "Виникла помилка при відправці.",
        btn: "Надіслати Анкету",
        sending: "Відправка..."
      },
      alt: {
        title: "Альтернативний зв'язок",
        desc: "Для окремих запитань та консультацій",
      }
    },
    testimonials: {
      title: 'Відгуки',
      subtitle: 'Що кажуть автори та видавці про співпрацю'
    },
    footer: {
      rights: 'Всі права захищено.'
    },
    terms: {
      back: 'Назад на головну',
      title: 'Умови та положення',
      intro: 'Для ознайомлення перед початком співпраці:',
      disclaimer: 'Майбутня угода регулює відносини між Виконавцем та приватним Замовником і не поширюється на співпрацю з юридичними особами, зокрема видавництвами. Умови співпраці з видавництвами визначаються окремим договором.',
      btn: 'Зрозуміло, назад',
      s1: {
        title: '1. Предмет договору',
        text: 'Виконавець зобов\'язується створити дизайн обкладинки для книги Замовника, а Замовник зобов\'язується прийняти та оплатити виконані роботи на умовах, викладених нижче.'
      },
      s2: {
        title: '2. Порядок оплати',
        items: [
            'Замовник сплачує авансовий платіж у розмірі 50% від загальної вартості проекту перед початком роботи. Цей платіж є гарантією початку робіт та використовується для придбання необхідних ліцензійних ресурсів.',
            'Решту 50% суми Замовник зобов\'язується сплатити після повного завершення робіт та отримання фінального затвердженого макету.',
            'Оплата здійснюється виключно на банківську картку Виконавця, відкриту у рамках ФОП. Реквізити для оплати надаються окремо.'
        ]
      },
      s3: {
        title: '3. Процес роботи та правки',
        p1: '3.1. Після затвердження початкового концепту макету, Замовник має право на безкоштовні правки, що включають:',
        l1: [
            'Корекцію тексту (назви, імені автора, анотації, тощо).',
            'Зміну шрифтів, стилю чи розміщення текстових блоків.',
            'Незначні корекції (колір волосся, очей, деталі тощо).',
            'Зміну розміру обкладинки під конкретні цілі (інтернет або друк).'
        ],
        p2: '3.2. Платними правками, що оплачуються окремо за погодженням сторін, вважаються складні зміни, які суттєво впливають на загальну композицію дизайну, зокрема:',
        l2: [
            'Зміна позицій моделей чи основних об\'єктів.',
            'Заміна моделей, об\'єктів або фону.',
            'Додавання нових складних графічних елементів.'
        ]
      },
      s4: {
        title: '4. Авторські права та ліцензії',
        l1: 'Виконавець гарантує, що всі зображення, ліцензовані у третіх осіб, надаються з ліцензією, що дозволяє використання у тиражі до 500 000 примірників (цифрових або друкованих). Для необхідності розширеної ліцензії (понад 500 000 примірників) Замовник зобов\'язується повідомити про це заздалегідь, така ліцензія оплачується додатково.',
        l2: 'Виключні майнові права на готовий дизайн обкладинки передаються Замовнику після отримання Виконавцем повної (100%) оплати.',
        l3_intro: 'Замовник зобов\'язується вказувати авторство Виконавця у всіх публікаціях та репродукціях роботи, у тому числі:',
        l3_list: [
            'Фізичні копії: «Дизайн обкладинки: Катерина Лучко / KateryDesign»',
            'Цифрові копії (електронні книги, аудіокниги): «Дизайн обкладинки: Катерина Лучко / KateryDesign»'
        ],
        l4: 'Виконавець (KateryDesign) зберігає за собою право некомерційного використання фінального дизайну обкладинки, назви та імені автора книги для розміщення в портфоліо, участі у конкурсах, а також в маркетингових та рекламних цілях (своїх навичок).'
      },
      s5: {
        title: '5. Конфіденційність',
        items: [
            'Вся інформація, надана Замовником, є конфіденційною і використовується Виконавцем виключно для виконання умов цього Договору.',
            'Виконавець має право розмістити остаточний дизайн у своєму публічному портфоліо лише після публічного розкриття дизайну Замовником або після отримання письмового дозволу від Замовника.'
        ]
      },
      s6: {
        title: '6. Відповідальність',
        text: 'Виконавець не несе відповідальності за схожість дизайну обкладинки з іншими існуючими роботами, якщо така схожість обумовлена загальними тенденціями, темами або вимогами жанру.'
      }
    },
    brief: {
      back: 'Назад до питань',
      title: 'Технічне Завдання',
      subtitle: 'Приклад та форма для заповнення',
      example_title: 'Приклад ТЗ',
      user_title: 'Ваше ТЗ',
      copy: 'Копіювати все',
      copied: 'Скопійовано',
      transfer: 'Перенести в анкету',
      fields: {
        name: "Ім'я Автора",
        genre: "Жанр",
        title: "Назва Книги",
        synopsis: "Анотація / Опис Книги",
        pref: "Побажання до дизайну"
      },
      placeholders: {
        synopsis: "Про що ваша історія? Опишіть світ, героїв та конфлікт...",
        pref: "Кольорова гама, центральні об'єкти, настрій, референси..."
      }
    }
  },
  en: {
    nav: {
      portfolio: 'Portfolio',
      pricing: 'Pricing',
      contact: 'Contact',
      order: 'Order Now',
      home: 'Back to Home',
      blog: 'Blog'
    },
    hero: {
      line1: ['Looking', 'for a'],
      line2: ['book cover', 'designer?'],
      subtitle: 'Scroll down to learn more.'
    },
    portfolio: {
      label: 'Works Gallery',
      title: 'Latest Projects',
      details: 'View Details'
    },
    services: {
      title: 'Pricing',
      ebook: {
        title: 'E-Book Cover',
        desc: '(average price, depends on complexity)',
        features: [
          "E-book cover design",
          "1 Mockup",
          "All source files",
          "Social media content design"
        ]
      },
      print: {
        title: 'Hardback/Paperback',
        desc: '(average price, depends on complexity)',
        note: 'Endpapers and sprayed edges are discussed separately; the price is calculated separately from the total cover cost.',
        features: [
          "Full E-BOOK Package",
          "Paperback or Hardback cover design",
          "All source files",
          "Social media content design"
        ]
      }
    },
    process: {
      btn: 'Terms & Conditions',
      title: 'Work Process',
      subtitle: 'Let\'s review the workflow and timelines for creating your cover:',
      steps: [
        { num: "01", title: "Contact Me", desc: "Let's talk about your book. I will listen to your wishes and ask a few questions to understand all the details needed for the cover." },
        { num: "02", title: "50% Deposit", desc: "After agreeing on all terms, you will need to pay a 50% deposit before work begins via a secure bank transfer." },
        { num: "03", title: "Work Stages", desc: "First, I'll prepare sketches, then we'll agree on one. After that, work on the chosen version begins, and I'll provide a final review for edits." },
        { num: "04", title: "Finalization", desc: "After the cover is approved, I will provide a link to download all source files. The remaining payment is due before file delivery." }
      ]
    },
    faq: {
      title: 'FAQ',
      btn: 'Design Brief',
      items: [
        { q: "What genres do I design for?", a: "I work with various genres but specialize in fiction: thrillers, sci-fi, and fantasy. However, I'm always happy to work with other genres to create covers that grab readers' attention." },
        { q: "How long does it take?", a: "Usually, creating a cover takes from 2 weeks to a month, depending on complexity and current workload. I always strive to meet agreed deadlines." },
        { q: "Can you help me choose a style?", a: "Yes, I'd love to help! Together we'll look at the best options considering the genre, target audience, and your wishes. My goal is to create a design that perfectly highlights your book." },
        { q: "What do I need to start?", a: "Create a short technical brief describing your book, what you want to see on the cover, and include some references so I can catch the vibe. A simple brief example is provided below:" }
      ]
    },
    contact: {
      label: 'Start Cooperation',
      title: 'Project Details',
      desc: 'Fill out the form below so I can better understand your project and provide an accurate estimate of cost and timeline.',
      form: {
        package_label: 'Select Service Package',
        ebook_sub: 'Electronic Cover',
        print_sub: 'Print + Electronic',
        name: "Your Name",
        name_ph: "John Doe",
        email: "Email",
        book: "Book Title",
        book_ph: "Title of your work",
        genre: "Genre",
        synopsis: "Synopsis",
        synopsis_ph: "Short description of the plot...",
        pref: "Design Preferences",
        pref_ph: "Colors, atmosphere, symbols...",
        deadline: "Desired Deadline",
        success: "Thank you! Your form has been sent successfully. I will contact you shortly.",
        error: "An error occurred while sending.",
        btn: "Send Inquiry",
        sending: "Sending..."
      },
      alt: {
        title: "Alternative Contact",
        desc: "For specific questions and consultations",
      }
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'What authors and publishers say about working with me'
    },
    footer: {
      rights: 'All rights reserved.'
    },
    terms: {
      back: 'Back to Home',
      title: 'Terms & Conditions',
      intro: 'For review before starting cooperation:',
      disclaimer: 'The future agreement regulates the relationship between the Contractor and a private Client and does not apply to cooperation with legal entities, particularly publishing houses. The terms of cooperation with publishing houses are determined by a separate agreement.',
      btn: 'Understood, Go Back',
      s1: {
        title: '1. Subject of Agreement',
        text: 'The Designer agrees to create a book cover design for the Client, and the Client agrees to accept and pay for the work under the conditions set forth below.'
      },
      s2: {
        title: '2. Payment Procedure',
        items: [
            'The Client pays a 50% advance payment of the total project cost before work begins. This payment serves as a guarantee for starting work and is used to purchase necessary licensed resources.',
            'The Client agrees to pay the remaining 50% after full completion of work and receipt of the final approved layout.',
            'Payment is made exclusively to the Designer\'s bank account opened under the sole proprietorship (FOP). Payment details are provided separately.'
        ]
      },
      s3: {
        title: '3. Workflow and Edits',
        p1: '3.1. After approving the initial layout concept, the Client is entitled to free edits, which include:',
        l1: [
            'Text correction (title, author name, synopsis, etc.).',
            'Changing fonts, style, or placement of text blocks.',
            'Minor corrections (hair color, eye color, small details, etc.).',
            'Changing cover size for specific purposes (web or print).'
        ],
        p2: '3.2. Paid edits, which are paid separately by agreement of the parties, are considered complex changes that significantly affect the overall composition of the design, in particular:',
        l2: [
            'Changing the positions of models or main objects.',
            'Replacing models, objects, or background.',
            'Adding new complex graphic elements.'
        ]
      },
      s4: {
        title: '4. Copyrights and Licenses',
        l1: 'The Designer guarantees that all images licensed from third parties are provided with a license allowing usage up to 500,000 copies (digital or print). If an extended license is needed (over 500,000 copies), the Client agrees to notify in advance; such license is paid separately.',
        l2: 'Exclusive property rights to the finished cover design are transferred to the Client after the Designer receives full (100%) payment.',
        l3_intro: 'The Client agrees to credit the Designer in all publications and reproductions of the work, including:',
        l3_list: [
            'Physical copies: "Cover Design: Kateryna Luchko / KateryDesign"',
            'Digital copies (e-books, audiobooks): "Cover Design: Kateryna Luchko / KateryDesign"'
        ],
        l4: 'The Designer (KateryDesign) retains the right to non-commercial use of the final cover design, book title, and author\'s name for placement in portfolio, participation in contests, and for marketing and advertising purposes (of their skills).'
      },
      s5: {
        title: '5. Confidentiality',
        items: [
            'All information provided by the Client is confidential and used by the Designer exclusively to fulfill the terms of this Agreement.',
            'The Designer has the right to publish the final design in their public portfolio only after the public disclosure of the design by the Client or after receiving written permission from the Client.'
        ]
      },
      s6: {
        title: '6. Liability',
        text: 'The Designer is not liable for the similarity of the cover design to other existing works if such similarity is due to general trends, themes, or genre requirements.'
      }
    },
    brief: {
      back: 'Back to FAQ',
      title: 'Technical Brief',
      subtitle: 'Example and form to fill out',
      example_title: 'Example Brief',
      user_title: 'Your Brief',
      copy: 'Copy All',
      copied: 'Copied',
      transfer: 'Transfer to Form',
      fields: {
        name: "Author Name",
        genre: "Genre",
        title: "Book Title",
        synopsis: "Synopsis / Description",
        pref: "Design Preferences"
      },
      placeholders: {
        synopsis: "What is your story about? Describe the world, heroes, and conflict...",
        pref: "Color scheme, central objects, mood, references..."
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uk');

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};