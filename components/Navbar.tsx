
import React, { useState } from 'react';
import { ViewType } from '../App';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; id: ViewType }[] = [
    { label: '홈', id: 'home' },
    { label: '전자서명 가이드', id: 'concept' },
    { label: '도입 필요성', id: 'necessity' },
    { label: '솔루션', id: 'solutions' },
    { label: '장비 연동', id: 'equipment' },
    { label: '경쟁사 비교', id: 'comparison' },
    { label: '성공 사례', id: 'cases' },
    { label: '실시간 데모', id: 'demo' },
    { label: '밸리데이션', id: 'validation' },
    { label: '보안 기술', id: 'security' },
    { label: '가격 정책', id: 'pricing' },
    { label: '팟캐스트', id: 'podcast' },
    { label: '블로그', id: 'blog' },
    { label: '자료실', id: 'resources' },
    { label: '기업 개요', id: 'about' },
    { label: '고객 지원', id: 'support' },
  ];

  const handleNavClick = (id: ViewType) => {
    setView(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-2 bg-white border-b border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div
          className="cursor-pointer flex items-center h-auto shrink-0"
          onClick={() => handleNavClick('home')}
        >
          <Logo className="h-[42px] md:h-[50px] w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 text-[13px] font-bold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${currentView === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
                } transition-colors tracking-tighter whitespace-nowrap`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('portal')}
            className="hidden sm:block px-5 py-2.5 text-[13px] font-black text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all active:scale-95"
          >
            고객 포털
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:block px-5 py-2.5 text-[13px] font-black text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            상담 신청
          </button>

          {/* Hamburger Button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl p-8 pt-24 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-lg font-bold tracking-tight ${currentView === item.id ? 'text-blue-600' : 'text-slate-600'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-slate-100 my-2" />
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-4 text-center font-black text-white bg-blue-600 rounded-xl shadow-lg active:scale-95 transition-all"
              >
                상담 신청
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
