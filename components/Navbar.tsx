
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewType } from '../App';
import Logo from './Logo';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // 드롭다운 메뉴 정의
  const dropdownMenus = {
    product: {
      label: '제품',
      items: [
        { label: '전자서명 가이드', id: 'concept' as ViewType },
        { label: '도입 필요성', id: 'necessity' as ViewType },
        { label: '솔루션', id: 'solutions' as ViewType },
      ]
    },
    technology: {
      label: '기술',
      items: [
        { label: '장비 연동', id: 'equipment' as ViewType, badge: 'NEW' },
        { label: '경쟁사 비교', id: 'comparison' as ViewType, badge: 'NEW' },
        { label: '밸리데이션', id: 'validation' as ViewType },
        { label: '보안 기술', id: 'security' as ViewType },
        { label: '실시간 데모', id: 'demo' as ViewType },
      ]
    },
    resources: {
      label: '리소스',
      items: [
        { label: '팟캐스트', id: 'podcast' as ViewType },
        { label: '블로그', id: 'blog' as ViewType },
        { label: '자료실', id: 'resources' as ViewType },
      ]
    },
    company: {
      label: '회사',
      items: [
        { label: '기업 개요', id: 'about' as ViewType },
        { label: '가격 정책', id: 'pricing' as ViewType },
        { label: '고객 지원', id: 'support' as ViewType },
      ]
    }
  };

  // 모바일 카테고리
  const navCategories = [
    {
      title: '제품',
      items: [
        { label: '홈', id: 'home' as ViewType },
        { label: '전자서명 가이드', id: 'concept' as ViewType },
        { label: '도입 필요성', id: 'necessity' as ViewType },
        { label: '솔루션', id: 'solutions' as ViewType },
      ]
    },
    {
      title: '기술',
      items: [
        { label: '장비 연동', id: 'equipment' as ViewType },
        { label: '경쟁사 비교', id: 'comparison' as ViewType },
        { label: '실시간 데모', id: 'demo' as ViewType },
        { label: '밸리데이션', id: 'validation' as ViewType },
        { label: '보안 기술', id: 'security' as ViewType },
      ]
    },
    {
      title: '리소스',
      items: [
        { label: '팟캐스트', id: 'podcast' as ViewType },
        { label: '블로그', id: 'blog' as ViewType },
        { label: '자료실', id: 'resources' as ViewType },
      ]
    },
    {
      title: '회사',
      items: [
        { label: '기업 개요', id: 'about' as ViewType },
        { label: '가격 정책', id: 'pricing' as ViewType },
        { label: '고객 지원', id: 'support' as ViewType },
      ]
    }
  ];

  const handleNavClick = (id: ViewType) => {
    setView(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12 py-3 md:py-2 bg-white border-b border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div
          className="cursor-pointer flex items-center h-auto shrink-0"
          onClick={() => handleNavClick('home')}
        >
          <Logo className="h-[38px] md:h-[42px] lg:h-[50px] w-auto" />
        </div>

        {/* Desktop Menu with Dropdowns */}
        <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold">
          {/* 홈 */}
          <button
            onClick={() => handleNavClick('home')}
            className={`${currentView === 'home' ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
              } transition-colors tracking-tighter whitespace-nowrap`}
          >
            홈
          </button>

          {/* 제품 드롭다운 */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors tracking-tighter whitespace-nowrap py-2"
            >
              제품
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                {dropdownMenus.product.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                      currentView === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 기술 드롭다운 (차별점 강조 ⭐) */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors tracking-tighter whitespace-nowrap py-2"
            >
              기술 <span className="text-[10px]">⭐</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                {dropdownMenus.technology.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between ${
                      currentView === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-black px-2 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 리소스 드롭다운 */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors tracking-tighter whitespace-nowrap py-2"
            >
              리소스
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                {dropdownMenus.resources.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                      currentView === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 회사 드롭다운 */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors tracking-tighter whitespace-nowrap py-2"
            >
              회사
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2">
                {dropdownMenus.company.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                      currentView === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('portal')}
            className="hidden sm:block px-4 md:px-5 py-2 md:py-2.5 text-[12px] md:text-[13px] font-black text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all active:scale-95"
          >
            고객 포털
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:block px-4 md:px-5 py-2 md:py-2.5 text-[12px] md:text-[13px] font-black text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            상담 신청
          </button>

          {/* Hamburger Button */}
          <button
            className="lg:hidden p-2.5 md:p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 lg:hidden w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            >
              {/* 헤더 */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Logo className="h-[36px] w-auto" />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors active:scale-95"
                  aria-label="메뉴 닫기"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 메뉴 내용 */}
              <div className="px-6 py-6 space-y-8">
                {/* 주요 액션 버튼 */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="px-6 py-4 text-center font-black text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg active:scale-95 transition-all"
                  >
                    상담 신청
                  </button>
                  <button
                    onClick={() => handleNavClick('portal')}
                    className="px-6 py-4 text-center font-black text-blue-600 bg-blue-50 rounded-xl active:scale-95 transition-all"
                  >
                    고객 포털
                  </button>
                </div>

                {/* 카테고리별 메뉴 */}
                {navCategories.map((category, catIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.1 }}
                  >
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                      {category.title}
                      {category.title === '기술' && <span className="text-[10px]">⭐</span>}
                    </h3>
                    <div className="space-y-1">
                      {category.items.map((item) => {
                        const isNew = item.id === 'equipment' || item.id === 'comparison';
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all active:scale-98 ${
                              currentView === item.id
                                ? 'bg-blue-50 text-blue-600 font-bold'
                                : 'text-slate-700 font-semibold hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {item.label}
                              {isNew && (
                                <span className="text-[9px] font-black px-2 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </span>
                            {currentView === item.id && (
                              <ChevronRight className="w-5 h-5 text-blue-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* 하단 정보 */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-400 text-center">
                    Oryx DataSafe<br />
                    제약 업계 데이터 무결성 솔루션
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
