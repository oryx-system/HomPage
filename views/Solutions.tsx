
import React from 'react';
import { Microscope, Activity, Factory, Beaker, Cpu, Link } from 'lucide-react';

const Solutions: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 mb-6 uppercase tracking-[0.2em]">
            Synergy
          </div>
          <h1 className="text-4xl font-black mb-6 text-slate-900 tracking-tighter leading-tight">어떤 장비라도, <br /> 어떤 데이터라도 연동합니다.</h1>
          <p className="text-slate-500 text-md leading-relaxed font-medium">
            20년 PLC/HMI 현장 노하우로 설계된 독보적인 장비 연동 기술. 
            레거시 설비부터 최신 자동화 라인까지 완벽한 통로를 제공합니다.
          </p>
        </header>

        <div className="grid gap-8 relative">
          {[
            {
              title: '전 장비 실시간 연동 (Equipment Integration)',
              desc: 'PLC, HMI, SCADA와 직접 연동하여 사람의 개입 없이 데이터를 실시간으로 수집합니다. Modbus, OPC UA 등 모든 산업용 표준 프로토콜을 지원합니다.',
              icon: <Cpu className="w-8 h-8 text-white" />,
              bg: 'bg-blue-600',
              shadow: 'shadow-blue-600/20',
              tags: ['PLC/HMI', 'Protocol', 'Auto-Log']
            },
            {
              title: 'R&D 및 실험실 자동화',
              desc: '실험 데이터의 실시간 기록과 전자 서명 적용으로 종이 문서 없는 연구 환경을 구축합니다. ELN과의 유연한 통합을 지원합니다.',
              icon: <Beaker className="w-8 h-8 text-white" />,
              bg: 'bg-purple-600',
              shadow: 'shadow-purple-600/20',
              tags: ['ELN', 'Protocol', 'Reagent']
            },
            {
              title: 'GMP 생산 및 제조(Quality)',
              desc: '제조 공정 기록(Batch Records)의 실시간 승인 및 변경 관리 프로세스를 간소화하여 품질 사고를 예방합니다.',
              icon: <Factory className="w-8 h-8 text-white" />,
              bg: 'bg-emerald-600',
              shadow: 'shadow-emerald-600/20',
              tags: ['Batch Record', 'Deviation', 'Review']
            }
          ].map((sol, i) => (
            <div key={i} className="group bg-white p-10 rounded-[40px] border border-slate-100 flex flex-col lg:flex-row gap-10 items-center hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)] transition-all duration-500">
               <div className={`p-6 ${sol.bg} rounded-[24px] ${sol.shadow} shadow-xl group-hover:scale-105 transition-transform duration-500 shrink-0`}>
                 {sol.icon}
               </div>
               <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-black mb-3 text-slate-900 tracking-tight">{sol.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 max-w-xl">{sol.desc}</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                     {sol.tags.map(tag => (
                       <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-400">#{tag}</span>
                     ))}
                  </div>
               </div>
               <button className="px-7 py-3.5 bg-white border border-slate-200 text-slate-800 text-[13px] font-black rounded-xl hover:bg-slate-50 hover:border-blue-200 transition-all shrink-0 flex items-center gap-2 shadow-sm active:scale-95">
                 <Link className="w-4 h-4 text-blue-600" /> 연동 리스트
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
