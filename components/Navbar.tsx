
import React from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import { ViewType } from '../App';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems: { label: string; id: ViewType }[] = [
    { label: '홈', id: 'home' },
    { label: '솔루션', id: 'solutions' },
    { label: '가격 정책', id: 'pricing' },
    { label: '밸리데이션', id: 'validation' },
    { label: '보안 기술', id: 'security' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass bg-opacity-20 backdrop-blur-md">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('home')}
      >
        <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Oryx DataSafe</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`${
              currentView === item.id ? 'text-blue-400' : 'text-gray-300 hover:text-white'
            } transition-colors`}
          >
            {item.label}
          </button>
        ))}
        <div className="relative group">
          <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
            회사소개 <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute top-full right-0 pt-4 hidden group-hover:block w-48">
            <div className="glass p-2 rounded-xl border-white/10 shadow-2xl">
              <button onClick={() => setView('about')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">기업 개요</button>
              <button onClick={() => setView('support')} className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">고객 지원</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button 
          onClick={() => setView('contact')}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          무료 상담 신청
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
