import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, ArrowRight, FileText, Edit3, User, Book, Type, AlignLeft, Palette } from 'lucide-react';
import { FormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BriefProps {
  onBack: () => void;
  onGoToContact: (data: Partial<FormData>) => void;
}

const Brief: React.FC<BriefProps> = ({ onBack, onGoToContact }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    bookTitle: '',
    genre: '',
    synopsis: '',
    preferences: ''
  });
  
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopy = () => {
    // Construct a formatted string for copying
    const textToCopy = `${t.brief.fields.name}: ${formData.name}
${t.brief.fields.title}: ${formData.bookTitle}
${t.brief.fields.genre}: ${formData.genre}

${t.brief.fields.synopsis}:
${formData.synopsis}

${t.brief.fields.pref}:
${formData.preferences}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    // Pass the structured data directly to the contact form
    onGoToContact(formData);
  };

  // Example Data Constants
  const exampleData = language === 'uk' ? {
    name: "Лерайя Мілл",
    genre: "Темне Фентезі",
    bookTitle: "Резермор",
    synopsis: `Марія прибуває запізно. Її брата, який першим ступив у новий світ, було розділено на сім видів легендарної зброї — тієї самої, яка колись була лише іграшками в руках Марії на Землі. Тепер його душа, розірвана на шматки і ледь жива, розкидана по всьому світу.

Її шлях — це не епічна подорож, а відчайдушне полювання. Тепер вона — мисливець на власні творіння.`,
    preferences: `Я хочу, щоб одна зі зброї була в центрі, перша буде косою. Загалом, ваше бачення того, як вона буде там виглядати, має бути в темній і теплій кольоровій гамі, з назвою в центрі та цікавим дизайном.

Розмір книги: 6x9 дюймів.
Кількість сторінок: ~360.`
  } : {
    name: "Leraia Mill",
    genre: "Dark Fantasy",
    bookTitle: "Resermor",
    synopsis: `Maria arrives too late. Her brother, the first to step into the new world, has been split into seven types of legendary weapons—the very same ones that were once mere toys in Maria's hands on Earth. Now his soul, torn apart and barely alive, is scattered across the world.

Her path is not an epic journey, but a desperate hunt. Now she is a hunter of her own creations.`,
    preferences: `I want one of the weapons to be in the center, the first one will be a scythe. In general, your vision of how it will look there should be in a dark and warm color scheme, with the title in the center and an interesting design.

Book size: 6x9 inches.
Page count: ~360.`
  };

  return (
    <section className="min-h-screen bg-dark-900 pt-32 pb-24 px-6 relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <button 
                onClick={onBack}
                className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm uppercase tracking-widest font-bold"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>{t.brief.back}</span>
            </button>

            <div className="text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">{t.brief.title}</h1>
                <p className="text-gray-400 text-sm">{t.brief.subtitle}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Example (Visible on mobile now, order-last on mobile) */}
            <div className="flex order-last lg:order-first bg-dark-800 border border-purple-500/20 rounded-sm p-6 md:p-8 flex-col h-full shadow-[0_0_50px_rgba(168,85,247,0.05)] relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.brief.example_title}</h3>
                </div>
                
                <div className="flex flex-col gap-6 flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[800px]">
                    
                    {/* Name & Genre Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                                <User className="w-3 h-3" />
                                {t.brief.fields.name}
                            </label>
                            <input 
                                type="text" 
                                value={exampleData.name} 
                                readOnly
                                className="w-full bg-dark-900/50 border border-white/10 text-gray-300 p-3 rounded-sm focus:outline-none cursor-default"
                            />
                        </div>

                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                                <Type className="w-3 h-3" />
                                {t.brief.fields.genre}
                            </label>
                            <input 
                                type="text" 
                                value={exampleData.genre} 
                                readOnly
                                className="w-full bg-dark-900/50 border border-white/10 text-gray-300 p-3 rounded-sm focus:outline-none cursor-default"
                            />
                        </div>
                    </div>

                    {/* Book Title */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                            <Book className="w-3 h-3" />
                            {t.brief.fields.title}
                        </label>
                        <input 
                            type="text" 
                            value={exampleData.bookTitle} 
                            readOnly
                            className="w-full bg-dark-900/50 border border-white/10 text-gray-300 p-3 rounded-sm focus:outline-none font-bold cursor-default"
                        />
                    </div>

                    {/* Synopsis */}
                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                            <AlignLeft className="w-3 h-3" />
                            {t.brief.fields.synopsis}
                        </label>
                        <textarea
                            value={exampleData.synopsis}
                            readOnly
                            className="w-full flex-grow bg-dark-900/50 border border-white/10 text-gray-300 p-4 rounded-sm focus:outline-none resize-none font-sans text-sm leading-relaxed min-h-[150px] cursor-default custom-scrollbar"
                        ></textarea>
                    </div>

                    {/* Design Preferences */}
                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                            <Palette className="w-3 h-3" />
                            {t.brief.fields.pref}
                        </label>
                        <textarea
                            value={exampleData.preferences}
                            readOnly
                            className="w-full flex-grow bg-dark-900/50 border border-white/10 text-gray-300 p-4 rounded-sm focus:outline-none resize-none font-sans text-sm leading-relaxed min-h-[150px] cursor-default custom-scrollbar"
                        ></textarea>
                    </div>

                </div>
            </div>

            {/* Right Column: User Input Form */}
            <div className="bg-dark-800 border border-purple-500/20 rounded-sm p-6 md:p-8 flex flex-col h-full shadow-[0_0_50px_rgba(168,85,247,0.05)] relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] pointer-events-none"></div>

                <div className="flex items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <Edit3 className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.brief.user_title}</h3>
                    </div>
                    {(formData.name || formData.bookTitle || formData.synopsis) && (
                        <button 
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all duration-300 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? t.brief.copied : t.brief.copy}</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-6 flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[800px]">
                    
                    {/* Name & Genre Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">
                                <User className="w-3 h-3" />
                                {t.brief.fields.name}
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange}
                                className="w-full bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-3 rounded-sm focus:outline-none transition-all placeholder-gray-700"
                                placeholder={language === 'uk' ? "Лерайя Мілл" : "Leraia Mill"}
                            />
                        </div>

                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">
                                <Type className="w-3 h-3" />
                                {t.brief.fields.genre}
                            </label>
                            <input 
                                type="text" 
                                name="genre" 
                                value={formData.genre} 
                                onChange={handleChange}
                                className="w-full bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-3 rounded-sm focus:outline-none transition-all placeholder-gray-700"
                                placeholder={language === 'uk' ? "Фентезі, Трилер..." : "Fantasy, Thriller..."}
                            />
                        </div>
                    </div>

                    {/* Book Title */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">
                            <Book className="w-3 h-3" />
                            {t.brief.fields.title}
                        </label>
                        <input 
                            type="text" 
                            name="bookTitle" 
                            value={formData.bookTitle} 
                            onChange={handleChange}
                            className="w-full bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-3 rounded-sm focus:outline-none transition-all placeholder-gray-700 font-bold"
                            placeholder={language === 'uk' ? "Резермор" : "Resermor"}
                        />
                    </div>

                    {/* Synopsis */}
                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">
                            <AlignLeft className="w-3 h-3" />
                            {t.brief.fields.synopsis}
                        </label>
                        <textarea
                            name="synopsis"
                            value={formData.synopsis}
                            onChange={handleChange}
                            className="w-full flex-grow bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-4 rounded-sm focus:outline-none transition-all resize-none font-sans text-sm leading-relaxed placeholder-gray-700 min-h-[150px]"
                            placeholder={t.brief.placeholders.synopsis}
                        ></textarea>
                    </div>

                    {/* Design Preferences */}
                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">
                            <Palette className="w-3 h-3" />
                            {t.brief.fields.pref}
                        </label>
                        <textarea
                            name="preferences"
                            value={formData.preferences}
                            onChange={handleChange}
                            className="w-full flex-grow bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-4 rounded-sm focus:outline-none transition-all resize-none font-sans text-sm leading-relaxed placeholder-gray-700 min-h-[150px]"
                            placeholder={t.brief.placeholders.pref}
                        ></textarea>
                    </div>

                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                    <button 
                        onClick={handleSubmit}
                        className="group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20 w-full md:w-auto justify-center"
                    >
                        <span>{t.brief.transfer}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>

      </div>
      
      {/* Custom Scrollbar Styles for this page */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Brief;