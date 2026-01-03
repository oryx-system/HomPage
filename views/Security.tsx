
import React from 'react';
import { Lock, Fingerprint, RefreshCcw, Database, ShieldCheck, HardDrive } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 mb-6 uppercase tracking-widest">
            Enterprise Grade Security
          </div>
          <h1 className="text-5xl font-bold mb-8">타협 없는 보안 아키텍처</h1>
          <p className="text-gray-400 text-lg">
            가장 엄격한 데이터 보안 표준을 충족하도록 설계된 Oryx DataSafe는 여러분의 지식재산권과 품질 데이터를 24/7 보호합니다.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {[
             { title: 'AES-256 데이터 암호화', desc: '모든 데이터는 저장 시점(At-rest)과 전송 시점(In-transit) 모두에서 군사 등급 암호화가 적용됩니다.', icon: <Lock /> },
             { title: '다중 요소 인증(MFA)', desc: '생체 인식과 일회용 비밀번호(OTP)를 결합한 접근 제어로 서명자의 신원을 확실히 보장합니다.', icon: <Fingerprint /> },
             { title: '실시간 이중화 백업', desc: '재해 복구 시나리오를 대비하여 실시간으로 암호화된 백업이 분산 데이터 센터에 저장됩니다.', icon: <RefreshCcw /> },
             { title: '불변성 감사 로그', desc: '기록된 감사 추적 정보는 수정이나 삭제가 불가능한 불변성(Immutability) 저장소에 기록됩니다.', icon: <Database /> },
             { title: '인증 기반 인프라', desc: 'ISO 27001, SOC2 Type II 인증을 획득한 글로벌 클러스터에서 안정적으로 운영됩니다.', icon: <ShieldCheck /> },
             { title: '데이터 보존 정책', desc: '규제 기관의 요구에 따라 최장 수십 년간 데이터의 가독성과 무결성을 유지하는 보관 정책을 지원합니다.', icon: <HardDrive /> },
           ].map((item, i) => (
             <div key={i} className="p-8 glass rounded-3xl border-white/5 hover:border-blue-500/30 transition-all">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl w-fit text-blue-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>

        <div className="p-12 glass rounded-[40px] border-white/10 bg-gradient-to-r from-blue-900/10 to-transparent">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-bold mb-6">ALCOA+ 원칙의 기술적 구현</h2>
                 <p className="text-gray-400 mb-8 leading-relaxed">
                   Oryx DataSafe는 단순한 문서 저장소가 아닙니다. 데이터 무결성의 핵심인 ALCOA+(Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, Available) 원칙을 시스템 기능으로 직접 구현하였습니다.
                 </p>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      원본 데이터와 감사 추적 데이터의 영구적 연결
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      모든 작업에 대한 전자 타임스탬프 자동 부여
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      사용자 권한 및 작업 범위의 철저한 분리
                    </li>
                 </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                    <p className="text-2xl font-bold text-white mb-1">99.99%</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Uptime SLA</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                    <p className="text-2xl font-bold text-white mb-1">ISO 27001</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Certified</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                    <p className="text-2xl font-bold text-white mb-1">SOC2</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Type II Compliant</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                    <p className="text-2xl font-bold text-white mb-1">GDPR</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ready</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
