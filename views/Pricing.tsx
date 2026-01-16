import React from 'react';
import { Check, Info, Server, CreditCard, PlusCircle } from 'lucide-react';
import ROICalculator from '../components/ROICalculator';
import AnimatedSection from '../components/AnimatedSection';

const Pricing: React.FC = () => {
  return (
    <div className="pt-24 pb-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Investment Plans
          </div>
          <h1 className="text-5xl font-bold mb-8 text-slate-900">투명하고 합리적인 비용</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            귀사의 운영 규모와 생산 라인의 복잡도에 최적화된 유연한 플랜을 선택하십시오. <br />
            모든 비용은 시스템의 안정적인 밸리데이션과 무결성을 지원합니다.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {/* 구독형 플랜 */}
          <div className="bg-slate-50 rounded-[48px] p-12 border border-slate-100 flex flex-col relative group transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50">
            <div className="absolute top-0 right-0 p-10 text-blue-600/5 group-hover:text-blue-600/10 transition-colors">
              <CreditCard className="w-32 h-32" />
            </div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Standard Subscription</h3>
              <p className="text-slate-500 text-sm">운용 효율성과 초기 비용 최소화를 원하는 기업</p>
            </div>
            <div className="mb-12">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900 tracking-tight">3,000만원</span>
                <span className="text-slate-400 text-sm font-bold uppercase">Setup Fee</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-600">월 30만원</span>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Monthly</span>
              </div>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
              {[
                "기본 장비 레포트 3개 연동 포함",
                "21 CFR Part 11 / Annex 11 규제 엔진",
                "무제한 유저 라이선스 제공",
                "실시간 클라우드 자동 백업",
                "원격 기술 지원 서비스 패키지"
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              구독형 데모 신청
            </button>
          </div>

          {/* 일시불 플랜 */}
          <div className="bg-white rounded-[48px] p-12 border-2 border-blue-600 flex flex-col relative shadow-2xl shadow-blue-600/5 group">
            <div className="absolute -top-5 left-12 px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/30">
              Most Selected For Long Term
            </div>
            <div className="absolute top-0 right-0 p-10 text-blue-600/5">
              <Server className="w-32 h-32" />
            </div>
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Enterprise Perpetual</h3>
              <p className="text-slate-500 text-sm">총 소유 비용(TCO) 절감과 데이터 영구 소유를 원하는 기업</p>
            </div>
            <div className="mb-12">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black text-slate-900 tracking-tight">1억 5,000만원</span>
                <span className="text-slate-400 text-sm font-bold uppercase">One-time</span>
              </div>
              <p className="text-emerald-600 text-sm font-extrabold uppercase tracking-widest">No Monthly Subscription</p>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
              {[
                "장비 레포트 5개 기본 연동 포함",
                "온프레미스(서버형) 설치 지원",
                "영구 라이선스 소유권 부여",
                "전문 밸리데이션(CSV) 풀 패키지",
                "매년 1회 정기 현장 점검 서비스"
              ].map(item => (
                <li key={item} className="flex items-center gap-4 text-sm font-semibold text-slate-600">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
              엔터프라이즈 맞춤 견적
            </button>
          </div>
        </div>

        {/* 확장 옵션 */}
        <div className="bg-slate-50 rounded-[40px] p-12 border border-slate-100 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
              <PlusCircle className="w-4 h-4" /> Expansion Option
            </div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">생산 라인 확장에 따른 <br /> 유연한 가격 설계</h2>
            <p className="text-slate-500 leading-relaxed mb-10 text-lg">
              기본 연동 장비 외에 추가 연동이 필요한 경우, 합리적인 비용으로 시스템 규모를 확장할 수 있습니다.
              모든 프로토콜을 지원하므로 추가 공사 없이 소프트웨어 설정만으로 확장이 가능합니다.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">장비 1대 추가 시</p>
                <p className="text-2xl font-black text-slate-900">300만원 <span className="text-xs text-slate-400 font-bold uppercase">Setup</span></p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">구독료 인상분</p>
                <p className="text-2xl font-black text-blue-600">10만원 <span className="text-xs text-slate-400 font-bold uppercase">/ Mo</span></p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[450px] aspect-video bg-white rounded-[32px] border border-slate-100 shadow-inner flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Info className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-slate-500 font-medium">10개 이상의 대규모 연동 시 <br /> 대량 연동 특별 할인이 제공됩니다.</p>
            </div>
          </div>
        </div>

        {/* ROI Calculator Section */}
        <AnimatedSection delay={0.3} className="mb-24">
          <ROICalculator />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Pricing;
