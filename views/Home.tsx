
import React from 'react';
import Hero from '../components/Hero';
import ComplianceGrid from '../components/ComplianceGrid';
import Features from '../components/Features';
import ComplianceAI from '../components/ComplianceAI';
import { ViewType } from '../App';
import { Settings, CheckCircle } from 'lucide-react';

interface HomeProps {
  setView: (view: ViewType) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <>
      <Hero setView={setView} />
      
      {/* 20년 엔지니어 노하우 배너 */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[32px] p-8 md:p-12 border-blue-500/20 bg-gradient-to-r from-blue-900/10 to-transparent flex flex-col md:flex-row items-center gap-8">
           <div className="p-6 bg-blue-600/20 rounded-2xl">
              <Settings className="w-12 h-12 text-blue-400 animate-spin-slow" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">20년 PLC+HMI 엔지니어의 현장 지능(Field Intelligence)</h3>
              <p className="text-gray-400">데이터의 무결성은 코드만으로 완성되지 않습니다. 현장 설비를 가장 잘 아는 엔지니어가 데이터의 '첫 마일'부터 끝까지 완벽하게 보호합니다.</p>
           </div>
           <div className="flex items-center gap-4 px-6 py-4 glass rounded-2xl border-white/5">
              <div className="text-center">
                 <p className="text-2xl font-bold text-white">ALL</p>
                 <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Protocol Support</p>
              </div>
           </div>
        </div>
      </section>

      {/* 핵심 수치 섹션 - 준비성 중심으로 변경 */}
      <section className="py-12 border-y border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-white mb-1">100%</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">규제 준수 대응</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">GAMP 5</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">글로벌 표준 채택</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">&lt; 1초</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">실시간 감사 추적</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">AES-256</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">군사 등급 보안</p>
          </div>
        </div>
      </section>

      <ComplianceGrid />
      
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
         <div className="inline-block glass rounded-2xl px-6 py-2 text-blue-400 text-sm font-bold mb-6">
           전문 기능
         </div>
         <h2 className="text-4xl md:text-6xl font-bold mb-12">제약 데이터 무결성의 <br /> 새로운 기준을 제시합니다.</h2>
         <Features />
      </div>

      <ComplianceAI />

      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto glass rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-600/5 -z-10" />
           <h2 className="text-4xl md:text-5xl font-bold mb-8">규제 준수의 디지털 전환, <br /> 준비된 파트너와 함께하세요.</h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
             Oryx DataSafe는 기술적 완성도와 규제 전문성을 모두 갖추었습니다. 귀사의 첫 번째 디지털 전환 파트너가 되어 드립니다.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView('contact')}
                className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all"
              >
                상담 및 데모 예약하기
              </button>
              <button 
                onClick={() => setView('validation')}
                className="px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
              >
                밸리데이션 절차 보기
              </button>
           </div>
         </div>
      </section>
    </>
  );
};

export default Home;
