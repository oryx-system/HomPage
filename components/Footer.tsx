
import React from 'react';
import { Shield, Linkedin, Twitter, Github } from 'lucide-react';
import { ViewType } from '../App';

interface FooterProps {
  setView: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="py-20 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div 
            className="flex items-center gap-2 mb-6 cursor-pointer"
            onClick={() => setView('home')}
          >
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold">Oryx DataSafe</span>
          </div>
          <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
            엄격한 규제 환경에 최적화된 세계 최고의 전자서명 플랫폼입니다. 품질 보증(QA) 전문가에 의해, 전문가를 위해 만들어졌습니다.
          </p>
          <div className="flex gap-4">
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">제품 서비스</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li onClick={() => setView('solutions')} className="hover:text-white cursor-pointer transition-colors">산업별 솔루션</li>
            <li onClick={() => setView('pricing')} className="hover:text-white cursor-pointer transition-colors font-semibold text-blue-400">가격 정책</li>
            <li onClick={() => setView('validation')} className="hover:text-white cursor-pointer transition-colors">밸리데이션 패키지</li>
            <li onClick={() => setView('security')} className="hover:text-white cursor-pointer transition-colors">보안 기술 아키텍처</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">회사 정보</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li onClick={() => setView('about')} className="hover:text-white cursor-pointer transition-colors">회사 개요</li>
            <li onClick={() => setView('support')} className="hover:text-white cursor-pointer transition-colors">기술 지원 및 FAQ</li>
            <li onClick={() => setView('contact')} className="hover:text-white cursor-pointer transition-colors">상담 및 도입 문의</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
        <p>© 2024 Oryx DataSafe. All rights reserved. 21 CFR Part 11 & EU Annex 11 Compliant.</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Sitemap</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
