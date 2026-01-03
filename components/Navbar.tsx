
import React from 'react';
import { ViewType } from '../App';
import Logo from './Logo';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems: { label: string; id: ViewType }[] = [
    { label: '홈', id: 'home' },
    { label: '전자서명 가이드', id: 'concept' },
    { label: '도입 필요성', id: 'necessity' },
    { label: '솔루션', id: 'solutions' },
    { label: '밸리데이션', id: 'validation' },
    { label: '보안 기술', id: 'security' },
    { label: '가격 정책', id: 'pricing' },
    { label: '기업 개요', id: 'about' },
    { label: '고객 지원', id: 'support' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-12 py-5 bg-white border-b border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div 
        className="cursor-pointer flex items-center h-10 shrink-0"
        onClick={() => setView('home')}
      >
        <Logo className="h-8 md:h-9 w-auto" />
      </div>
      
      <div className="hidden xl:flex items-center gap-5 text-[13px] font-bold">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`${
              currentView === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
            } transition-colors tracking-tighter whitespace-nowrap`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="shrink-0">
        <button 
          onClick={() => setView('contact')}
          className="px-5 py-2.5 text-[13px] font-black text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          상담 신청
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
