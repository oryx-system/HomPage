
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';

// Lazy load views for better performance
const Validation = lazy(() => import('./views/Validation'));
const Solutions = lazy(() => import('./views/Solutions'));
const Security = lazy(() => import('./views/Security'));
const About = lazy(() => import('./views/About'));
const Support = lazy(() => import('./views/Support'));
const Contact = lazy(() => import('./views/Contact'));
const Pricing = lazy(() => import('./views/Pricing'));
const Necessity = lazy(() => import('./views/Necessity'));
const Concept = lazy(() => import('./views/Concept'));
const Demo = lazy(() => import('./views/Demo'));
const Portal = lazy(() => import('./views/Portal'));
const Blog = lazy(() => import('./views/Blog'));
const Resources = lazy(() => import('./views/Resources'));
const Podcast = lazy(() => import('./views/Podcast'));
const Comparison = lazy(() => import('./views/Comparison'));
const EquipmentIntegration = lazy(() => import('./views/EquipmentIntegration'));
const CaseStudies = lazy(() => import('./views/CaseStudies'));

export type ViewType = 'home' | 'validation' | 'solutions' | 'security' | 'about' | 'support' | 'contact' | 'pricing' | 'necessity' | 'concept' | 'demo' | 'portal' | 'blog' | 'resources' | 'podcast' | 'comparison' | 'equipment' | 'cases';

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="min-h-[80vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-600 font-bold">로딩 중...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case 'necessity': return <Necessity setView={setCurrentView} />;
      case 'concept': return <Concept />;
      case 'demo': return <Demo />;
      case 'portal': return <Portal />;
      case 'blog': return <Blog />;
      case 'resources': return <Resources />;
      case 'podcast': return <Podcast />;
      case 'comparison': return <Comparison />;
      case 'equipment': return <EquipmentIntegration />;
      case 'cases': return <CaseStudies />;
      default: return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <Suspense fallback={<LoadingScreen />}>
        <main className="min-h-[80vh]">
          {renderView()}
        </main>
      </Suspense>
      <Footer setView={setCurrentView} />
    </div>
  );
};

export default App;
