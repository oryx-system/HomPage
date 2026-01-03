
import React from 'react';
import { ClipboardCheck, FileSearch, Layers, Zap } from 'lucide-react';

const Validation: React.FC = () => {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 mb-6">
            GAMP 5 준수
          </div>
          <h1 className="text-5xl font-bold mb-8">컴퓨터 시스템 밸리데이션(CSV)</h1>
          <p className="text-gray-400 text-lg">
            Oryx DataSafe는 GAMP 5 및 V-모델 방법론을 기반으로 설계되었습니다. 도입부터 운영까지 전 단계에서 체계적인 밸리데이션 패키지를 지원합니다.
          </p>
        </header>

        {/* V-Model 인포그래픽 */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">검증된 밸리데이션 방법론</h2>
            <p className="text-gray-400 leading-relaxed">
              사용자 요구사항 정의(URS)부터 기능 사양서(FS), 디자인 사양서(DS)를 거쳐 설치 적격성 평가(IQ), 운전 적격성 평가(OQ), 성능 적격성 평가(PQ)에 이르는 전 과정을 지원합니다.
            </p>
            <div className="space-y-4">
              {[
                { title: 'URS & FS 대응', desc: '고객사의 비즈니스 프로세스에 맞춘 요구사항 문서화 지원' },
                { title: 'RTM (Traceability Matrix)', desc: '모든 요구사항이 테스트 및 검증되었음을 입증하는 추적성 매트릭스' },
                { title: 'IQ/OQ/PQ 프로토콜', desc: '산업별 표준을 준수하는 검증된 테스트 시나리오 제공' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 glass rounded-xl border-white/5">
                  <div className="mt-1"><ClipboardCheck className="text-blue-400 w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative glass p-10 rounded-[40px] border-white/10 bg-gradient-to-br from-blue-600/5 to-transparent">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="font-bold text-blue-400 uppercase tracking-widest text-xs">V-Model Phase</span>
                <span className="text-xs text-gray-500">Validation Status: Compliant</span>
              </div>
              {/* V-모델 비주얼화 (CSS로 간단하게 표현) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center opacity-40">
                  <div className="w-1/3 p-3 bg-white/5 rounded-lg text-[10px] text-center">URS</div>
                  <div className="h-px bg-white/10 flex-1 mx-4" />
                  <div className="w-1/3 p-3 bg-emerald-500/20 rounded-lg text-[10px] text-center text-emerald-400">PQ</div>
                </div>
                <div className="flex justify-between items-center opacity-70">
                  <div className="w-1/3 p-3 bg-white/5 rounded-lg text-[10px] text-center">FS</div>
                  <div className="h-px bg-white/10 flex-1 mx-4" />
                  <div className="w-1/3 p-3 bg-emerald-500/20 rounded-lg text-[10px] text-center text-emerald-400">OQ</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-1/3 p-3 bg-white/5 rounded-lg text-[10px] text-center border border-blue-500/50">DS</div>
                  <div className="h-px bg-white/10 flex-1 mx-4" />
                  <div className="w-1/3 p-3 bg-emerald-500/20 rounded-lg text-[10px] text-center text-emerald-400 border border-emerald-500/50">IQ</div>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="p-4 bg-blue-600 rounded-xl text-xs font-bold">Coding & Configuration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 glass rounded-3xl border-white/10">
            <Layers className="w-10 h-10 text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">표준화된 VMP</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Validation Master Plan을 통해 전사적 규제 준수 전략을 수립하고 일관된 품질 관리를 유지합니다.
            </p>
          </div>
          <div className="p-8 glass rounded-3xl border-white/10">
            <FileSearch className="w-10 h-10 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">자동화된 리포팅</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              모든 밸리데이션 결과는 실시간으로 요약 리포트로 생성되어 실무자의 문서 작업 시간을 80% 이상 단축시킵니다.
            </p>
          </div>
          <div className="p-8 glass rounded-3xl border-white/10">
            <Zap className="w-10 h-10 text-amber-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">전문 밸리데이션 서비스</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              경험 풍부한 컨설턴트들이 고객사의 현장 실사를 대비한 모의 감사 및 맞춤형 밸리데이션 지원을 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;
