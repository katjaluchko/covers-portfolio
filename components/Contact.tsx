import React, { useState } from 'react';
import { Send, Upload } from 'lucide-react';
import { FormData } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bookTitle: '',
    genre: '',
    synopsis: '',
    preferences: '',
    deadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Дякую! Вашу анкету отримано. Я зв'яжусь з вами найближчим часом.");
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-dark-800 to-black relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-purple-400 font-serif tracking-widest uppercase text-sm">Почати співпрацю</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 mb-6">Анкета Проєкту</h2>
          <p className="text-gray-400">
            Заповніть форму нижче, щоб я міг краще зрозуміти ваш проект та надати точну оцінку вартості та строків.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-900 p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Ваше Ім'я</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder="Іван Іванов"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Email</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Назва Книги</label>
              <input 
                type="text" 
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder="Тіні минулого"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Жанр</label>
              <select 
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="">Оберіть жанр...</option>
                <option value="fantasy">Фентезі</option>
                <option value="scifi">Наукова Фантастика</option>
                <option value="romance">Романтика</option>
                <option value="thriller">Трилер / Детектив</option>
                <option value="nonfiction">Non-Fiction</option>
                <option value="other">Інше</option>
              </select>
            </div>
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Синопсис (Короткий опис)</label>
            <textarea 
              name="synopsis"
              rows={4}
              value={formData.synopsis}
              onChange={handleChange}
              className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 resize-none"
              placeholder="Про що ваша книга? Ключові сцени, атмосфера..."
            ></textarea>
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Візуальні побажання</label>
            <textarea 
              name="preferences"
              rows={3}
              value={formData.preferences}
              onChange={handleChange}
              className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 resize-none"
              placeholder="Кольорова гама, символи, настрій..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
                <label className="text-sm text-purple-400 uppercase tracking-wider font-bold block">Референси (Приклади)</label>
                <div className="relative border border-dashed border-gray-600 bg-dark-800 hover:border-purple-500 transition-colors p-4 text-center cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple />
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <Upload className="w-6 h-6 mb-2" />
                        <span className="text-xs">Завантажити файли (зображення)</span>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-purple-400 uppercase tracking-wider font-bold">Бажаний Дедлайн</label>
              <input 
                type="date" 
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-dark-800 border-b border-gray-700 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors text-gray-400"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-purple-500 text-black font-serif font-bold py-4 hover:bg-white transition-all duration-300 uppercase tracking-wider shadow-[0_0_20px_rgba(192,132,252,0.4)] flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Відправити Анкету
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;