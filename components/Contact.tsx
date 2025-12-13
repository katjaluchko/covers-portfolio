import React, { useState, useEffect } from 'react';
import { Send, Check, Tablet, Book, Mail, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { FormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
    initialData?: Partial<FormData> | null;
}

const Contact: React.FC<ContactProps> = ({ initialData }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    packageType: 'ebook', // Default selection
    bookTitle: '',
    genre: '',
    synopsis: '',
    preferences: '',
    deadline: '',
  });

  // Pre-fill form when initialData changes
  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            ...initialData
        }));
    }
  }, [initialData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (value: string) => {
    setFormData(prev => ({ ...prev, packageType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Create a new native FormData object for the API request
    const data = new globalThis.FormData();

    // Append text fields
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
        data.append(key, formData[key]);
    });

    try {
        const response = await fetch("https://formspree.io/f/xvgevgov", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setSubmitStatus('success');
            // Reset form
            setFormData({
                name: '',
                email: '',
                packageType: 'ebook',
                bookTitle: '',
                genre: '',
                synopsis: '',
                preferences: '',
                deadline: '',
            });
        } else {
            setSubmitStatus('error');
        }
    } catch (error) {
        console.error("Submission error:", error);
        setSubmitStatus('error');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Image for the entire section */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393798-3828fb4090bb?q=80&w=1470&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-dark-900/90"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <span className="text-purple-400 font-serif tracking-widest uppercase text-sm">{t.contact.label}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 mb-6">{t.contact.title}</h2>
          <p className="text-gray-400">
            {t.contact.desc}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-900 p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden rounded-sm">
           
           {/* Decorative background element inside form (abstract, not the photo) */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none z-0"></div>

          {/* Package Selection */}
          <div className="mb-10 relative z-10">
            <label className="block text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">{t.contact.form.package_label}</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* E-Book Option */}
              <div 
                onClick={() => handlePackageSelect('ebook')}
                className={`cursor-pointer p-6 border rounded-sm transition-all duration-300 flex items-center gap-4 ${formData.packageType === 'ebook' ? 'bg-purple-500/10 border-purple-500' : 'bg-dark-800/80 border-white/10 hover:border-white/30'}`}
              >
                <div className={`p-3 rounded-full ${formData.packageType === 'ebook' ? 'bg-purple-500 text-black' : 'bg-dark-700 text-gray-400'}`}>
                  <Tablet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">E-Book</h4>
                  <p className="text-gray-400 text-sm">{t.contact.form.ebook_sub}</p>
                </div>
                {formData.packageType === 'ebook' && <Check className="ml-auto w-6 h-6 text-purple-500" />}
              </div>

              {/* Print Option */}
              <div 
                onClick={() => handlePackageSelect('print')}
                className={`cursor-pointer p-6 border rounded-sm transition-all duration-300 flex items-center gap-4 ${formData.packageType === 'print' ? 'bg-purple-500/10 border-purple-500' : 'bg-dark-800/80 border-white/10 hover:border-white/30'}`}
              >
                <div className={`p-3 rounded-full ${formData.packageType === 'print' ? 'bg-purple-500 text-black' : 'bg-dark-700 text-gray-400'}`}>
                  <Book className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Hardback / Paperback</h4>
                  <p className="text-gray-400 text-sm">{t.contact.form.print_sub}</p>
                </div>
                {formData.packageType === 'print' && <Check className="ml-auto w-6 h-6 text-purple-500" />}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
            <div className="group">
              <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.name}</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                required
                className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder={t.contact.form.name_ph}
              />
            </div>
            <div className="group">
              <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.email}</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                required
                className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
            <div className="group">
              <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.book}</label>
              <input 
                type="text" 
                name="bookTitle" 
                value={formData.bookTitle} 
                onChange={handleChange}
                required
                className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder={t.contact.form.book_ph}
              />
            </div>
            <div className="group">
              <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.genre}</label>
              <input 
                type="text" 
                name="genre" 
                value={formData.genre} 
                onChange={handleChange}
                required
                className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                placeholder="Фентезі, Трилер..."
              />
            </div>
          </div>

          <div className="mb-6 group relative z-10">
            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.synopsis}</label>
            <textarea 
              name="synopsis" 
              rows={4}
              value={formData.synopsis} 
              onChange={handleChange}
              required
              className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 resize-none"
              placeholder={t.contact.form.synopsis_ph}
            ></textarea>
          </div>

          <div className="mb-6 group relative z-10">
            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.pref}</label>
            <textarea 
              name="preferences" 
              rows={3}
              value={formData.preferences} 
              onChange={handleChange}
              className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 resize-none"
              placeholder={t.contact.form.pref_ph}
            ></textarea>
          </div>

          <div className="mb-10 group relative z-10">
            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 group-focus-within:text-purple-400 transition-colors">{t.contact.form.deadline}</label>
            <input 
              type="date" 
              name="deadline" 
              value={formData.deadline} 
              onChange={handleChange}
              className="w-full bg-dark-800/80 border-b border-white/10 text-white p-3 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 appearance-none"
            />
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-sm flex items-center gap-3 text-green-400 relative z-10">
                <Check className="w-5 h-5 flex-shrink-0" />
                <p>{t.contact.form.success}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-sm flex items-center gap-3 text-red-400 relative z-10">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{t.contact.form.error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 relative z-10 group disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.contact.form.sending}</span>
                </>
            ) : (
                <>
                    <span>{t.contact.form.btn}</span>
                    <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </>
            )}
          </button>
        </form>

        {/* Improved Direct Email Link Section */}
        <div className="mt-20 flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center gap-4 mb-8 opacity-50">
                <div className="h-px bg-white w-12 md:w-24"></div>
                <p className="text-gray-300 text-xs md:text-sm uppercase tracking-[0.2em]">{t.contact.alt.title}</p>
                <div className="h-px bg-white w-12 md:w-24"></div>
            </div>
            
            <div className="flex justify-center w-full">
                <a 
                    href="mailto:katjaluchko@gmail.com" 
                    className="group w-full md:w-auto relative inline-flex items-center gap-6 px-8 py-5 bg-white/5 hover:bg-purple-900/20 border border-white/10 hover:border-purple-500/50 rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                >
                    {/* Animated Icon Container */}
                    <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-dark-900 rounded-full border border-white/10 group-hover:border-purple-500/50 group-hover:scale-110 transition-all duration-500">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10 group-hover:-rotate-12 duration-300" />
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                    </div>

                    <div className="text-left">
                        <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 group-hover:text-purple-300 transition-colors">
                            Email
                        </span>
                        <span className="block text-xl md:text-3xl font-serif font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                            katjaluchko@gmail.com
                        </span>
                    </div>

                    {/* Arrow that appears on hover */}
                    <div className="w-0 overflow-hidden group-hover:w-8 transition-all duration-300 flex items-center justify-center">
                         <ArrowRight className="w-6 h-6 text-purple-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 delay-100" />
                    </div>
                </a>
            </div>
            
            <p className="text-gray-500 mt-6 text-sm">{t.contact.alt.desc}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;