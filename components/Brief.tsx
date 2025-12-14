import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, ArrowRight, FileText, Edit3, User, Book, Type as TypeIcon, AlignLeft, Palette, Sparkles, X, Loader2, MousePointerClick, BrainCircuit, Lightbulb } from 'lucide-react';
import { FormData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GoogleGenAI, Type } from '@google/genai';

interface BriefProps {
  onBack: () => void;
  onGoToContact: (data: Partial<FormData>) => void;
}

interface AiConcept {
  title: string;
  description: string;
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
  const [showAiModal, setShowAiModal] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiConcepts, setAiConcepts] = useState<AiConcept[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

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
    onGoToContact(formData);
  };

  // --- AI Logic Start ---
  const handleGenerateAi = async () => {
    if (!formData.synopsis.trim()) {
        alert(language === 'uk' ? 'Будь ласка, заповніть поле "Анотація", щоб AI міг згенерувати ідеї.' : 'Please fill in the "Synopsis" field so AI can generate ideas.');
        return;
    }

    setIsLoadingAi(true);
    setAiConcepts([]);
    setSelectedIndices([]);
    
    try {
        // Initialize Gemini Client
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const isUk = language === 'uk';

        // Strict System Instruction
        const systemInstruction = isUk 
            ? "Ти — досвідчений арт-директор і дизайнер обкладинок. Твоє завдання — проаналізувати сюжет книги та запропонувати 3 візуальні концепції обкладинки. Кожна концепція має бути унікальною, атмосферною та відповідати жанру."
            : "You are an experienced art director and book cover designer. Your task is to analyze the book synopsis and propose 3 visual cover concepts. Each concept must be unique, atmospheric, and genre-appropriate.";

        // Structured Prompt
        const userPrompt = isUk 
            ? `Створи 3 концепції дизайну обкладинки для цього синопсису:
            "${formData.synopsis}"
            
            Для кожної концепції надай:
            1. Лаконічну, креативну назву.
            2. Детальний опис візуалу (композиція, кольори, настрій).`
            : `Create 3 book cover design concepts for this synopsis:
            "${formData.synopsis}"
            
            For each concept provide:
            1. A concise, creative title.
            2. Detailed visual description (composition, colors, mood).`;

        // API Call with Schema
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        concepts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["title", "description"]
                            }
                        }
                    },
                    required: ["concepts"]
                }
            }
        });

        const textOutput = response.text;

        if (textOutput) {
            // Clean Markdown if present
            const cleanText = textOutput.replace(/```json\n?|```/g, '').trim();
            const parsed = JSON.parse(cleanText);
            
            if (parsed.concepts && Array.isArray(parsed.concepts)) {
                setAiConcepts(parsed.concepts);
                setShowAiModal(true);
            } else {
                throw new Error("Invalid JSON structure received");
            }
        } else {
             throw new Error("No text response received");
        }

    } catch (error) {
        console.error("AI Generation Error:", error);
        alert(isUk 
            ? "Виникла помилка при генерації. Перевірте підключення або спробуйте пізніше." 
            : "An error occurred during generation. Check your connection or try again later.");
    } finally {
        setIsLoadingAi(false);
    }
  };
  // --- AI Logic End ---

  const toggleConceptSelection = (index: number) => {
    setSelectedIndices(prev => 
        prev.includes(index) 
            ? prev.filter(i => i !== index) 
            : [...prev, index]
    );
  };

  const insertAiContent = () => {
    const conceptsToInsert = selectedIndices.length > 0 
        ? selectedIndices.map(i => aiConcepts[i]) 
        : aiConcepts;

    const formattedText = conceptsToInsert.map((c, i) => {
        return `[КОНЦЕПТ ${i + 1}: ${c.title}]\n${c.description}`;
    }).join('\n\n');

    setFormData(prev => ({
        ...prev,
        preferences: prev.preferences 
            ? prev.preferences + '\n\n' + '--- AI Suggestions ---\n' + formattedText 
            : formattedText
    }));
    setShowAiModal(false);
  };

  // Example Data
  const exampleData = language === 'uk' ? {
    name: "Лерайя Мілл",
    genre: "Темне Фентезі",
    bookTitle: "Резермор",
    synopsis: `Марія прибуває запізно. Її брата, який першим ступив у новий світ, було розділено на сім видів легендарної зброї — тієї самої, яка колись була лише іграшками в руках Марії на Землі. Тепер його душа, розірвана на шматки і ледь жива, розкидана по всьому світу.`,
    preferences: `Я хочу, щоб одна зі зброї була в центрі, перша буде косою. Загалом, ваше бачення того, як вона буде там виглядати, має бути в темній і теплій кольоровій гамі, з назвою в центрі та цікавим дизайном.`
  } : {
    name: "Leraia Mill",
    genre: "Dark Fantasy",
    bookTitle: "Resermor",
    synopsis: `Maria arrives too late. Her brother, the first to step into the new world, has been split into seven types of legendary weapons—the very same ones that were once mere toys in Maria's hands on Earth. Now his soul, torn apart and barely alive, is scattered across the world.`,
    preferences: `I want one of the weapons to be in the center, the first one will be a scythe. In general, your vision of how it will look there should be in a dark and warm color scheme, with the title in the center and an interesting design.`
  };

  const isUk = language === 'uk';

  return (
    <section className="min-h-screen bg-dark-900 pt-32 pb-24 px-6 relative">
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
            
            {/* Left Column: Example */}
            <div className="flex order-last lg:order-first bg-dark-800 border border-purple-500/20 rounded-sm p-6 md:p-8 flex-col h-full shadow-[0_0_50px_rgba(168,85,247,0.05)] relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.brief.example_title}</h3>
                </div>
                
                <div className="flex flex-col gap-6 flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[800px] opacity-70 pointer-events-none select-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2"><User className="w-3 h-3" />{t.brief.fields.name}</label>
                            <input type="text" value={exampleData.name} readOnly className="w-full bg-dark-900/50 border border-white/10 text-gray-300 p-3 rounded-sm" />
                        </div>
                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2"><TypeIcon className="w-3 h-3" />{t.brief.fields.genre}</label>
                            <input type="text" value={exampleData.genre} readOnly className="w-full bg-dark-900/50 border border-white/10 text-gray-300 p-3 rounded-sm" />
                        </div>
                    </div>
                    <div className="group">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2"><Book className="w-3 h-3" />{t.brief.fields.title}</label>
                        <input type="text" value={exampleData.bookTitle} readOnly className="w-full bg-dark-900/50 border border-white/10 text-gray-300 p-3 rounded-sm font-bold" />
                    </div>
                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2"><AlignLeft className="w-3 h-3" />{t.brief.fields.synopsis}</label>
                        <textarea value={exampleData.synopsis} readOnly className="w-full flex-grow bg-dark-900/50 border border-white/10 text-gray-300 p-4 rounded-sm resize-none font-sans text-sm leading-relaxed min-h-[100px]"></textarea>
                    </div>
                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2"><Palette className="w-3 h-3" />{t.brief.fields.pref}</label>
                        <textarea value={exampleData.preferences} readOnly className="w-full flex-grow bg-dark-900/50 border border-white/10 text-gray-300 p-4 rounded-sm resize-none font-sans text-sm leading-relaxed min-h-[100px]"></textarea>
                    </div>
                </div>
            </div>

            {/* Right Column: User Input */}
            <div className="bg-dark-800 border border-purple-500/20 rounded-sm p-6 md:p-8 flex flex-col h-full shadow-[0_0_50px_rgba(168,85,247,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] pointer-events-none"></div>

                <div className="flex items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <Edit3 className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.brief.user_title}</h3>
                    </div>
                    {(formData.name || formData.bookTitle || formData.synopsis) && (
                        <button onClick={handleCopy} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all duration-300 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? t.brief.copied : t.brief.copy}</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-6 flex-grow overflow-y-auto custom-scrollbar pr-2 max-h-[800px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors"><User className="w-3 h-3" />{t.brief.fields.name}</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-3 rounded-sm focus:outline-none transition-all placeholder-gray-700" placeholder={language === 'uk' ? "Лерайя Мілл" : "Leraia Mill"} />
                        </div>
                        <div className="group">
                            <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors"><TypeIcon className="w-3 h-3" />{t.brief.fields.genre}</label>
                            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-3 rounded-sm focus:outline-none transition-all placeholder-gray-700" placeholder={language === 'uk' ? "Фентезі, Трилер..." : "Fantasy, Thriller..."} />
                        </div>
                    </div>

                    <div className="group">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors"><Book className="w-3 h-3" />{t.brief.fields.title}</label>
                        <input type="text" name="bookTitle" value={formData.bookTitle} onChange={handleChange} className="w-full bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-3 rounded-sm focus:outline-none transition-all placeholder-gray-700 font-bold" placeholder={language === 'uk' ? "Резермор" : "Resermor"} />
                    </div>

                    <div className="group flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors"><AlignLeft className="w-3 h-3" />{t.brief.fields.synopsis}</label>
                        <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} className="w-full flex-grow bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-4 rounded-sm focus:outline-none transition-all resize-none font-sans text-sm leading-relaxed placeholder-gray-700 min-h-[150px]" placeholder={t.brief.placeholders.synopsis}></textarea>
                    </div>

                    <div className="group flex-grow flex flex-col relative">
                        <div className="flex justify-between items-center mb-2">
                             <label className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest group-focus-within:text-purple-400 transition-colors"><Palette className="w-3 h-3" />{t.brief.fields.pref}</label>
                             
                             <button
                                onClick={handleGenerateAi}
                                disabled={isLoadingAi}
                                className="group/ai flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-sm text-[10px] uppercase font-bold tracking-widest transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-white/10"
                            >
                                {isLoadingAi ? <Loader2 className="w-3 h-3 animate-spin" /> : <BrainCircuit className="w-3.5 h-3.5 group-hover/ai:text-purple-200" />}
                                {isLoadingAi ? t.brief.ai_generating : t.brief.ai_btn}
                            </button>
                        </div>
                        <textarea name="preferences" value={formData.preferences} onChange={handleChange} className="w-full flex-grow bg-dark-900/50 border border-white/10 focus:border-purple-500/50 text-white p-4 rounded-sm focus:outline-none transition-all resize-none font-sans text-sm leading-relaxed placeholder-gray-700 min-h-[150px]" placeholder={t.brief.placeholders.pref}></textarea>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                    <button onClick={handleSubmit} className="group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20 w-full md:w-auto justify-center">
                        <span>{t.brief.transfer}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>

        {/* AI Modal */}
        {showAiModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                <div className="bg-dark-800 border border-purple-500/30 rounded-sm shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh] relative overflow-hidden">
                    
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-dark-800 to-purple-900/20">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            <h3 className="text-xl font-serif font-bold text-white">{t.brief.ai_modal_title}</h3>
                        </div>
                        <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-dark-900/50">
                         {aiConcepts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {aiConcepts.map((concept, idx) => {
                                    const isSelected = selectedIndices.includes(idx);
                                    return (
                                        <div 
                                            key={idx}
                                            onClick={() => toggleConceptSelection(idx)}
                                            className={`
                                                relative p-6 rounded-sm border cursor-pointer transition-all duration-300 group flex flex-col h-full
                                                ${isSelected 
                                                    ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.1)]' 
                                                    : 'bg-dark-800 border-white/10 hover:border-purple-500/40 hover:bg-dark-800/80'}
                                            `}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Lightbulb className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-gray-600'}`} />
                                                    <h4 className={`font-serif font-bold text-base leading-tight ${isSelected ? 'text-purple-200' : 'text-white'}`}>
                                                        {concept.title}
                                                    </h4>
                                                </div>
                                                <div className={`
                                                    w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-300 shrink-0
                                                    ${isSelected ? 'bg-purple-500 border-purple-500 text-black scale-110' : 'border-gray-600 bg-transparent group-hover:border-gray-400'}
                                                `}>
                                                    {isSelected && <Check className="w-3 h-3" />}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                                                {concept.description}
                                            </p>
                                            
                                            <div className={`mt-4 text-xs font-bold uppercase tracking-widest transition-colors ${isSelected ? 'text-purple-400' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                                {isSelected ? (isUk ? 'Обрано' : 'Selected') : (isUk ? 'Натисніть для вибору' : 'Click to Select')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                         ) : (
                             <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-4">
                                 <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                                 <p>{t.brief.ai_placeholder}</p>
                             </div>
                         )}
                    </div>

                    <div className="p-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-dark-800">
                        <p className="text-gray-400 text-sm hidden md:block">
                            {selectedIndices.length > 0 
                                ? (isUk ? `Обрано концепцій: ${selectedIndices.length}` : `${selectedIndices.length} concept(s) selected`)
                                : (isUk ? "Оберіть концепції, які вам сподобались" : "Select concepts you like")}
                        </p>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button onClick={() => setShowAiModal(false)} className="flex-1 md:flex-none px-6 py-3 border border-white/10 hover:bg-white/5 text-gray-300 font-bold uppercase text-xs tracking-widest rounded-sm transition-colors">
                                {t.brief.ai_close}
                            </button>
                            <button 
                                onClick={insertAiContent}
                                className="flex-1 md:flex-none px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase text-xs tracking-widest rounded-sm transition-colors shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                {selectedIndices.length > 0 ? t.brief.ai_insert : (isUk ? "Вставити Все" : "Insert All")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.5); }
      `}</style>
    </section>
  );
};

export default Brief;