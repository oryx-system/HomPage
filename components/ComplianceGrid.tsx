
import React from 'react';
import { COMPLIANCE_STANDARDS } from '../constants';

const ComplianceGrid: React.FC = () => {
  return (
    <section id="compliance" className="py-24 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">엄격한 글로벌 규격 설계</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Oryx DataSafe는 글로벌 제약 표준을 기본적으로 지원합니다. 복잡한 감사 과정을 간소화하고, 모든 전자 기록이 법적 효력을 갖도록 보장합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {COMPLIANCE_STANDARDS.map((std) => (
            <div key={std.id} className="p-8 glass rounded-3xl group hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">{std.title}</h3>
              <ul className="space-y-4">
                {std.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-sm leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="bg-black rounded-xl px-8 py-10">
                    <p className="text-xl font-medium text-gray-300 mb-6">맞춤형 밸리데이션 패키지가 필요하신가요?</p>
                    <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        밸리데이션 브로슈어 다운로드
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceGrid;
