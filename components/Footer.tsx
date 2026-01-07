
import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { ViewType } from '../App';
import Logo from './Logo';

interface FooterProps {
  setView: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="py-24 border-t border-slate-100 bg-white/60 backdrop-blur-2xl px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div
            className="mb-8 cursor-pointer group inline-block"
            onClick={() => setView('home')}
          >
            <Logo className="h-12 w-auto" />
          </div>
          <p className="text-slate-600 max-w-sm mb-8 leading-relaxed font-medium">
            엄격한 규제 환경에 최적화된 세계 최고의 전자서명 플랫폼입니다. <br />
            제약 공정의 첫 1초부터 데이터의 무결성을 보장하는 유일한 기술을 제공합니다.
          </p>
          <div className="flex gap-4">
            <div className="p-2.5 bg-white rounded-xl border border-slate-100 hover:text-blue-600 cursor-pointer transition-all shadow-sm">
              <Linkedin className="w-5 h-5" />
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-100 hover:text-blue-400 cursor-pointer transition-all shadow-sm">
              <Twitter className="w-5 h-5" />
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-slate-100 hover:text-slate-900 cursor-pointer transition-all shadow-sm">
              <Github className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-black mb-6 text-slate-900 text-xs uppercase tracking-[0.2em]">제품 서비스</h4>
          <ul className="space-y-4 text-slate-500 text-sm font-semibold">
            <li onClick={() => setView('necessity')} className="hover:text-blue-600 cursor-pointer transition-colors text-blue-600 underline underline-offset-4 decoration-2">도입 필요성</li>
            <li onClick={() => setView('solutions')} className="hover:text-blue-600 cursor-pointer transition-colors">산업별 솔루션</li>
            <li onClick={() => setView('pricing')} className="hover:text-blue-600 cursor-pointer transition-colors">가격 정책</li>
            <li onClick={() => setView('validation')} className="hover:text-blue-600 cursor-pointer transition-colors">밸리데이션 패키지</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-6 text-slate-900 text-xs uppercase tracking-[0.2em]">회사 정보</h4>
          <ul className="space-y-4 text-slate-500 text-sm font-semibold">
            <li onClick={() => setView('about')} className="hover:text-blue-600 cursor-pointer transition-colors">회사 개요</li>
            <li onClick={() => setView('support')} className="hover:text-blue-600 cursor-pointer transition-colors">기술 지원 및 FAQ</li>
            <li onClick={() => setView('contact')} className="hover:text-blue-600 cursor-pointer transition-colors">상담 및 도입 문의</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400 font-bold gap-6">
        <p>© 2024 Oryx DataSafe Co. All rights reserved. <span className="text-slate-400/60 ml-4 font-normal">21 CFR Part 11 & EU Annex 11 Compliant Platform.</span></p>
        <div className="flex gap-8 uppercase tracking-widest">
          <span onClick={() => alert('사이트맵은 준비 중입니다.')} className="hover:text-slate-600 cursor-pointer transition-colors">Sitemap</span>
          <span onClick={() => alert('개인정보 처리방침은 준비 중입니다.')} className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
          <span onClick={() => setView('security')} className="hover:text-slate-600 cursor-pointer transition-colors">Security Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
