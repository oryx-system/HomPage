
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Validation from './views/Validation';
import Solutions from './views/Solutions';
import Security from './views/Security';
import About from './views/About';
import Support from './views/Support';
import Contact from './views/Contact';
import Pricing from './views/Pricing';

export type ViewType = 'home' | 'validation' | 'solutions' | 'security' | 'about' | 'support' | 'contact' | 'pricing';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home setView={setCurrentView} />;
      case 'validation': return <Validation />;
      case 'solutions': return <Solutions />;
      case 'security': return <Security />;
      case 'about': return <About />;
      case 'support': return <Support />;
      case 'contact': return <Contact />;
      case 'pricing': return <Pricing />;
      default: return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="min-h-[80vh]">
        {renderView()}
      </main>
      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;
