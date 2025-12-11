import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Process from './components/Process';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Brief from './components/Brief';
import { FormData } from './types';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'terms' | 'brief'>('home');
  const [prefilledFormData, setPrefilledFormData] = useState<Partial<FormData> | null>(null);

  const handleGoToContact = (data?: Partial<FormData>) => {
    if (data) {
        setPrefilledFormData(data);
    }
    setCurrentPage('home');
    // Wait for the DOM to update and render the home page
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  const handleBackFromBrief = () => {
    setCurrentPage('home');
    setTimeout(() => {
        const faqTrigger = document.getElementById('faq-brief-trigger');
        if (faqTrigger) {
            faqTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
  };

  const handleBackFromTerms = () => {
    setCurrentPage('home');
    setTimeout(() => {
        const processSection = document.getElementById('process');
        if (processSection) {
            processSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  return (
    <div className="bg-dark-900 text-gray-100 font-sans min-h-screen selection:bg-purple-500 selection:text-black">
      <Navbar onGoHome={() => setCurrentPage('home')} isHomePage={currentPage === 'home'} />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Portfolio />
            <Services />
            <Process onOpenTerms={() => setCurrentPage('terms')} />
            <FAQ onOpenBrief={() => setCurrentPage('brief')} />
            <Contact initialData={prefilledFormData} />
            <Testimonials />
          </>
        )}
        
        {currentPage === 'terms' && (
          <Terms onBack={handleBackFromTerms} />
        )}

        {currentPage === 'brief' && (
          <Brief 
            onBack={handleBackFromBrief} 
            onGoToContact={handleGoToContact}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;