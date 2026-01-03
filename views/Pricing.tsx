
import React from 'react';
import { Check, Info, Server, CreditCard, PlusCircle } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">합리적이고 투명한 가격 정책</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            귀사의 운영 규모와 예산 구조에 최적화된 유연한 플랜을 제공합니다. <br />
            모든 플랜에는 21 CFR Part 11 준수 핵심 엔진이 포함되어 있습니다.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* 구독형 플랜 */}
          <div className="glass rounded-[40px] p-10 border-white/10 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-24 h-24" />
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Standard Subscription</h3>
              <p className="text-gray-500 text-sm">초기 비용 절감과 유연한 확장을 원하는 기업용</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-white">3,000만원</span>
                <span className="text-gray-500 text-sm">초기 도입비</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-400">월 30만원</span>
                <span className="text-gray-500 text-sm">구독료</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "기본 장비 레포트 3개 연동 포함",
                "21 CFR Part 11 / Annex 11 엔진",
                "무제한 사용자 계정 생성",
                "실시간 감사 추적(Audit Trail)",
                "클라우드 기반 기술 지원 서비스"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-blue-500" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all">
              구독형 데모 신청
            </button>
          </div>

          {/* 일시불 플랜 */}
          <div className="glass rounded-[40px] p-10 border-blue-500/30 bg-blue-500/5 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Server className="w-24 h-24" />
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Enterprise Perpetual</h3>
              <p className="text-gray-500 text-sm">장기적인 총 소유 비용(TCO) 절감을 원하는 기업용</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-white">1억 5,000만원</span>
                <span className="text-gray-500 text-sm">1회성 라이선스</span>
              </div>
              <p className="text-emerald-400 text-sm font-bold">월 구독료 없음 (영구 소유)</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "장비 레포트 3개 기본 연동 포함",
                "자체 서버 설치(On-premise) 지원",
                "매년 정기 점검 서비스 제공",
                "최고 수준의 전담 기술 매니저 배정",
                "맞춤형 밸리데이션 패키지 포함"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-2xl font-bold transition-all">
              엔터프라이즈 견적 요청
            </button>
          </div>
        </div>

        {/* 확장 비용 안내 */}
        <div className="glass rounded-[40px] p-12 border-white/5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full mb-6">
                <PlusCircle className="w-4 h-4" /> 확장성 옵션
              </div>
              <h2 className="text-3xl font-bold mb-6">성장에 맞춰 유연하게 <br /> 장비를 추가하세요.</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                기본 3개의 레포트 외에 추가 장비 연동이 필요한 경우, 합리적인 추가 비용으로 시스템을 확장할 수 있습니다. 
                Oryx DataSafe의 인터페이스는 다양한 장비와의 연동에 최적화되어 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">레포트 1개 추가 시</p>
                   <p className="text-xl font-bold text-white">300만원 <span className="text-xs text-gray-500 font-normal">설치비</span></p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">구독료 인상분</p>
                   <p className="text-xl font-bold text-blue-400">10만원 <span className="text-xs text-gray-500 font-normal">/월</span></p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[400px] aspect-video glass bg-black/40 rounded-3xl border border-white/10 flex items-center justify-center relative">
               <div className="text-center">
                  <Info className="w-12 h-12 text-blue-500/30 mx-auto mb-4" />
                  <p className="text-sm text-gray-500 px-8">5개 이상의 대규모 장비 연동 시 <br /> 별도의 할인 정책이 적용됩니다.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center text-gray-500 text-sm">
           <p>* 모든 가격은 부가세(VAT) 별도 금액입니다.</p>
           <p>* 밸리데이션(CSV) 수행 범위에 따라 컨설팅 비용이 별도로 추가될 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
