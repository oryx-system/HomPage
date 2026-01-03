
import React from 'react';
import { COMPLIANCE_STANDARDS } from '../constants';
import { Download } from 'lucide-react';

const ComplianceGrid: React.FC = () => {
  return (
    <section id="compliance" className="py-32 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            Global Compliance
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 tracking-tight">엄격한 글로벌 인증 표준 준수</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Oryx DataSafe는 설계 단계부터 글로벌 제약 및 생명 과학 산업의 규제를 핵심 엔진으로 내재화했습니다. 
            단순한 소프트웨어를 넘어, 법적 보호 장치를 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {COMPLIANCE_STANDARDS.map((std) => (
            <div key={std.id} className="p-12 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:border-blue-300 transition-all group">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h3 className="text-2xl font-black text-slate-900">{std.title}</h3>
              </div>
              <ul className="space-y-6">
                {std.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-slate-600">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-100 shrink-0 border border-blue-600" />
                    <span className="text-sm font-bold leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
            <div className="p-1 rounded-[40px] bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl shadow-blue-600/20 max-w-4xl mx-auto">
                <div className="bg-white rounded-[38px] px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-black text-slate-900 mb-2">밸리데이션 풀 패키지 가이드</p>
                        <p className="text-slate-500 font-bold">도입부터 CSV 완료까지의 상세 프로세스 확인</p>
                    </div>
                    <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-3">
                        <Download className="w-5 h-5" /> 가이드 다운로드
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceGrid;
