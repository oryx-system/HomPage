
import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Loader2, FileText } from 'lucide-react';
import { ViewType } from '../App';

interface HeroProps {
  setView: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleWhitepaperClick = () => {
    setIsDownloading(true);
    // 전문가용 문서를 불러오는 듯한 느낌을 주기 위해 1.5초 지연 후 이동
    setTimeout(() => {
      setIsDownloading(false);
      setView('security');
    }, 1500);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden px-6">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-400 uppercase tracking-widest bg-blue-400/10 border border-blue-400/20 rounded-full mb-6">
            <CheckCircle2 className="w-3 h-3" />
            완벽한 GxP 밸리데이션 지원
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 gradient-text">
            제약 산업을 위한 <br /> 신뢰의 전자서명.
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
            Oryx DataSafe로 규제 리스크를 제거하십시오. 21 CFR Part 11 및 EU Annex 11을 100% 준수하도록 설계되어, R&D부터 생산까지 전 과정의 데이터 무결성을 보장합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setView('contact')}
              className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              무료 체험 시작하기
            </button>
            <button 
              onClick={handleWhitepaperClick}
              disabled={isDownloading}
              className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  백서 분석 중...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  규제 준수 백서 읽기
                </>
              )}
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">글로벌 파트너십</span>
            <div className="flex gap-6 items-center">
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="w-8 h-8 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10 glass rounded-3xl p-6 floating shadow-2xl border-white/5 bg-gradient-to-br from-white/5 to-white/0">
             <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded-md border border-emerald-500/30">
                  컴플라이언스: 활성
                </div>
             </div>
             
             <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">문서 승인 요청</p>
                    <p className="text-sm font-semibold">안정성 시험 프로토콜 #2024-X</p>
                  </div>
                  <div className="ml-auto">
                    <button 
                      onClick={() => setView('contact')}
                      className="text-[10px] px-2 py-1 bg-blue-600 rounded text-white font-bold"
                    >
                      서명
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">감사 추적 (Audit Trail)</p>
                    <div className="space-y-2">
                       <div className="h-1 w-full bg-gray-700 rounded" />
                       <div className="h-1 w-[80%] bg-gray-700 rounded" />
                       <div className="h-1 w-[60%] bg-gray-700 rounded" />
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">보안 등급</p>
                    <p className="text-sm font-mono text-emerald-400">AES-256 적용</p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                  <p className="text-xs text-gray-500 mb-2">서명 무결성 실시간 검증 중</p>
                  <div className="flex justify-center">
                     <svg className="w-24 h-24 text-blue-500" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="200" strokeDashoffset="50" />
                       <path d="M30 50 L45 65 L70 35" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
                     </svg>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full scale-125 -z-10 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
