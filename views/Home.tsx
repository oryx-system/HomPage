
import React from 'react';
import Hero from '../components/Hero';
import ComplianceGrid from '../components/ComplianceGrid';
import Features from '../components/Features';
import { ViewType } from '../App';
import { Settings, ShieldCheck, Zap, HardDrive, BarChart, FileText, ArrowRight } from 'lucide-react';

interface HomeProps {
  setView: (view: ViewType) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="bg-white">
      <Hero setView={setView} />

      {/* 초강력 신뢰 섹션: 엔지니어링 헤리티지 */}
      <section className="py-40 px-6 lg:px-12 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full schematic-bg opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-12">
                The Founder's DNA
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-12 leading-[0.9] tracking-tighter">
                코드가 아닌 <br />
                <span className="text-blue-500">엔지니어링</span>입니다.
              </h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12">
                우리는 화면상의 버튼 하나가 실제 공장의 밸브를 열고 닫는 무게감을 압니다.
                20년 현장 엔지니어가 직접 설계한 Oryx DataSafe는 장비의 통신 패킷 수준에서
                데이터 무결성을 검증합니다.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10">
                  <p className="text-4xl font-black text-white mb-2 tracking-tighter">20Y+</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Field Expertise</p>
                </div>
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10">
                  <p className="text-4xl font-black text-white mb-2 tracking-tighter">ZERO</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Packet Loss Rate</p>
                </div>
              </div>
              <button
                onClick={() => setView('about')}
                className="group flex items-center gap-4 text-white font-black text-lg hover:text-blue-400 transition-colors"
              >
                Oryx의 철학 자세히 보기
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform text-blue-500" />
              </button>
            </div>

            <div className="relative group">
              <div className="aspect-square bg-blue-600 rounded-[80px] rotate-3 absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="aspect-square bg-slate-800 rounded-[64px] border border-white/10 p-12 relative flex items-center justify-center overflow-hidden">
                <div className="scanline absolute top-0 left-0" />
                <Settings className="w-64 h-64 text-blue-600/20 animate-spin-slow" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/40">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl font-black text-white mb-4">"현장 엔지니어링 기반의 신뢰할 수 있는 솔루션"</p>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Industrial Standard Connectivity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 압도적인 신뢰 지표 섹션 */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-12 justify-between items-center py-20 border-y border-slate-100">
            <div className="text-center md:text-left">
              <p className="text-6xl font-black text-slate-900 tracking-tighter mb-2">100%</p>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">CFR Part 11 Compliant</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block" />
            <div className="text-center md:text-left">
              <p className="text-6xl font-black text-slate-900 tracking-tighter mb-2">ZERO</p>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Data Manipulation</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block" />
            <div className="text-center md:text-left">
              <p className="text-6xl font-black text-slate-900 tracking-tighter mb-2">99.9%</p>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </section>

      <ComplianceGrid />

      <section className="py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-32">
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              System Modules
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.9]">
              규제를 넘어 <br /> <span className="text-blue-600">성능을 정의합니다.</span>
            </h2>
          </div>
          <Features />
        </div>
      </section>

      {/* 독보적 기술 섹션 - PLC 직접 연동 강조 */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Unique Advantage
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.9]">
              경쟁사와의 <br /> <span className="text-purple-600">결정적 차이</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-16">
              20년 PLC 현장 경험이 만든 국내 유일 장비 직접 연동 솔루션
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Settings className="w-12 h-12" />,
                title: 'PLC 직접 연동',
                description: '경쟁사는 수기 입력에 의존하지만, Oryx는 Siemens, Allen-Bradley, Mitsubishi 등 모든 PLC에서 직접 데이터를 수집합니다.',
                color: 'from-blue-500 to-cyan-500',
                stat: 'Sub-10ms 실시간 수집'
              },
              {
                icon: <ShieldCheck className="w-12 h-12" />,
                title: '원본 데이터 보호',
                description: '경쟁사는 DB 저장 후 암호화하지만, Oryx는 수집 즉시 AES-256 암호화로 데이터 조작을 원천 차단합니다.',
                color: 'from-purple-500 to-pink-500',
                stat: 'ZERO 데이터 조작'
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: '빠른 구축',
                description: '경쟁사는 6-12개월이 걸리지만, Oryx는 2-3개월에 구축 완료. 밸리데이션 패키지 포함으로 즉시 대응 가능합니다.',
                color: 'from-green-500 to-emerald-500',
                stat: '70% 기간 단축'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group p-10 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 hover:border-purple-200"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{item.description}</p>
                <div className="text-sm font-black text-purple-600 uppercase tracking-wide">
                  {item.stat}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => setView('equipment')}
              className="group p-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl text-white hover:shadow-2xl transition-all"
            >
              <Settings className="w-12 h-12 mb-6 group-hover:rotate-90 transition-transform duration-500" />
              <h3 className="text-3xl font-black mb-4">장비 연동 기술</h3>
              <p className="text-blue-100 mb-6">모든 PLC 제조사 100% 호환. 실시간 데이터 수집 및 암호화.</p>
              <div className="flex items-center gap-2 text-lg font-bold">
                자세히 보기 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setView('comparison')}
              className="group p-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl text-white hover:shadow-2xl transition-all"
            >
              <BarChart className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black mb-4">경쟁사 비교</h3>
              <p className="text-purple-100 mb-6">왜 Oryx인가? 압도적 기술 우위를 직접 확인하세요.</p>
              <div className="flex items-center gap-2 text-lg font-bold">
                비교 분석 보기 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 팟캐스트 Featured 섹션 */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Knowledge Hub
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 tracking-tighter leading-[0.9]">
              21 CFR Part 11 <br /> <span className="text-indigo-600">현장 에피소드</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-16">
              20년 현장 경험의 노하우를 팟캐스트로 공유합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                episode: '01',
                title: 'FDA 감사관이 묻는 5가지 핵심 질문',
                duration: '42:15',
                category: 'FDA 감사'
              },
              {
                episode: '05',
                title: 'ALCOA+ 완벽 이해하기',
                duration: '38:42',
                category: '데이터 무결성'
              },
              {
                episode: '12',
                title: 'PLC 데이터 수집의 모든 것',
                duration: '45:30',
                category: '시스템 관리'
              }
            ].map((item) => (
              <div
                key={item.episode}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-100 cursor-pointer"
                onClick={() => setView('podcast')}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black text-indigo-600">EP {item.episode}</span>
                  <span className="text-sm text-slate-500">{item.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.category}</span>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setView('podcast')}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
            >
              전체 에피소드 보기 →
            </button>
          </div>
        </div>
      </section>

      {/* 최종 컨버전 섹션 - 블러 및 쉐도우 최적화 */}
      <section className="py-40 px-6 lg:px-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[64px] p-20 lg:p-32 text-center relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-[0.85]">
              TRUST IS <br /> THE NEW GOLD.
            </h2>
            <p className="text-white/80 text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto leading-tight">
              당신의 소중한 데이터를 규제 위반의 위험에서 구하세요. <br />
              지금 바로 전문가와 상의하십시오.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setView('contact')}
                className="px-12 py-6 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-50 transition-all text-xl shadow-lg"
              >
                시스템 진단 신청하기
              </button>
              <button
                onClick={() => setView('necessity')}
                className="px-12 py-6 bg-blue-700 text-white font-black rounded-2xl hover:bg-blue-800 transition-all text-xl"
              >
                위험 관리 리포트 받기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
