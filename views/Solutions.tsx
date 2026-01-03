
import React from 'react';
import { Microscope, Activity, Factory, Beaker, Cpu, Link } from 'lucide-react';

const Solutions: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest">
            Hardware & Software Synergy
          </div>
          <h1 className="text-5xl font-bold mb-8">어떤 장비라도, <br /> 어떤 데이터라도 연동합니다.</h1>
          <p className="text-gray-400 text-lg">
            20년 PLC/HMI 현장 노하우로 설계된 독보적인 장비 연동 기술. 
            레거시 설비부터 최신 자동화 라인까지 데이터 무결성을 위한 완벽한 통로를 제공합니다.
          </p>
        </header>

        <div className="grid gap-12">
          {[
            {
              title: '전 장비 실시간 연동 (Equipment Integration)',
              desc: 'PLC, HMI, SCADA와 직접 연동하여 사람의 개입 없이 데이터를 실시간으로 수집합니다. Modbus, OPC UA 등 모든 산업용 표준 프로토콜을 지원하며 비표준 레거시 장비도 맞춤형 커넥터로 연결합니다.',
              icon: <Cpu className="w-12 h-12 text-blue-400" />,
              tags: ['PLC/HMI 연동', '프로토콜 컨버팅', '데이터 자동 수집']
            },
            {
              title: 'R&D 및 실험실 자동화',
              desc: '실험 데이터의 실시간 기록과 전자 서명 적용으로 종이 문서 없는 연구 환경을 구축합니다. 전자 실험 노트(ELN)와의 유연한 통합을 지원합니다.',
              icon: <Beaker className="w-12 h-12 text-purple-400" />,
              tags: ['실험실 관리', '프로토콜 승인', '시약 관리']
            },
            {
              title: 'GMP 생산 및 제조(Quality)',
              desc: '제조 공정 기록(Batch Records)의 실시간 승인 및 변경 관리(Change Control) 프로세스를 간소화하여 품질 사고를 예방합니다.',
              icon: <Factory className="w-12 h-12 text-emerald-400" />,
              tags: ['배치 레코드', '일탈 관리', '공정 검토']
            }
          ].map((sol, i) => (
            <div key={i} className="group glass p-12 rounded-[40px] border-white/5 flex flex-col lg:flex-row gap-12 items-center hover:bg-white/5 transition-all">
               <div className="p-8 bg-black/40 rounded-3xl border border-white/10 group-hover:scale-105 transition-transform shrink-0">
                 {sol.icon}
               </div>
               <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl font-bold mb-4">{sol.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl">{sol.desc}</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                     {sol.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-500">#{tag}</span>
                     ))}
                  </div>
               </div>
               <button className="px-8 py-4 glass text-sm font-bold rounded-xl hover:bg-white/10 shrink-0 flex items-center gap-2">
                 <Link className="w-4 h-4" /> 연동 리스트 확인
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
