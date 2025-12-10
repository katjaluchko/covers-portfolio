import React from 'react';
import Navbar from './components/Navbar';
import UnicornHero from './components/UnicornHero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Process from './components/Process';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-dark-900 text-gray-100 font-sans min-h-screen selection:bg-purple-500 selection:text-black">
      <Navbar />
      
      <main>
        <UnicornHero />
        <Portfolio />
        <Services />
        <Process />
        <FAQ />
        <Contact />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

export default App;