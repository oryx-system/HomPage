
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, ShieldCheck, Database, FileX, Zap, ArrowRight, Skull, ShieldAlert, FileWarning } from 'lucide-react';
import { ViewType } from '../App';

interface NecessityProps {
  setView: (view: ViewType) => void;
}

const Necessity: React.FC<NecessityProps> = ({ setView }) => {
  return (
    <div className="pt-24 pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 mb-8 uppercase tracking-[0.2em]">
            Digital Transformation
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-huge font-black mb-8 md:mb-12 text-slate-900 tracking-tighter leading-tight md:leading-none">
            왜 지금 <span className="text-blue-600">전자서명</span>인가?
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
            제약 산업에서 '종이 문서'는 단순한 불편함을 넘어 거대한 경영 리스크입니다. <br />
            데이터 무결성은 이제 기업의 신뢰와 직결되는 가장 중요한 자산입니다.
          </p>
        </motion.header>

        {/* 리스크 섹션 - 이미지와 동일하게 구현 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 mb-40 items-center bg-[#FFF8F8] p-6 sm:p-8 md:p-12 lg:p-20 xl:p-24 rounded-[32px] md:rounded-[48px] lg:rounded-[64px] border border-red-50 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-10 md:mb-12 text-slate-900 leading-[1.1] tracking-tighter">
              종이 기반 관리의 <br />
              <span className="text-red-600 border-b-[6px] border-red-100 pb-1">치명적인 위험요소</span>
            </h2>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {[
                {
                  icon: <FileX className="text-white w-5 h-5" />,
                  title: "데이터 조작 및 누락 위험",
                  desc: "수기 기록은 사후 수정이나 데이터 누락을 통제하기 어려운 구조적 한계가 있으며, 이는 실사 시 무결성 결여로 이어질 수 있습니다.",
                  level: "CRITICAL",
                  color: "bg-[#E11D48]"
                },
                {
                  icon: <Skull className="text-white w-5 h-5" />,
                  title: "Warning Letter 리스크",
                  desc: "매년 수많은 제약사가 'Data Integrity' 위반으로 경고장을 받으며, 이는 제품 승인 거부와 막대한 손실로 이어집니다.",
                  level: "FATAL",
                  color: "bg-[#450A0A]"
                },
                {
                  icon: <AlertTriangle className="text-white w-5 h-5" />,
                  title: "비효율성 및 승인 지연",
                  desc: "물리적 이동과 수기 서명 대기로 인해 발생하는 지연은 신약 출시 속도를 늦추고 경쟁력을 상실하게 합니다.",
                  level: "HIGH",
                  color: "bg-[#D97706]"
                }
              ].map((item, i) => (
                <div key={i} className="danger-shake flex gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-7 bg-white rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-red-50 shadow-[0_10px_25px_-5px_rgba(239,68,68,0.05)] group transition-all cursor-pointer relative overflow-hidden">
                  <div className={`mt-1 p-3 sm:p-3.5 md:p-4 ${item.color} rounded-xl sm:rounded-2xl shadow-lg shrink-0`}>{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <h4 className="font-black text-base sm:text-lg text-slate-900">{item.title}</h4>
                      <span className={`text-[8px] sm:text-[9px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${item.color} text-white tracking-wider sm:tracking-widest`}>{item.level}</span>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                    <div className="mt-3 sm:mt-4 h-1 bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} ${item.level === 'FATAL' ? 'w-[98%]' : item.level === 'CRITICAL' ? 'w-[85%]' : 'w-[70%]'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group cursor-crosshair">
            {/* Warning Letter 문서 비주얼화 */}
            <div className="aspect-[4/5] bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-slate-200 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col group-hover:rotate-1 transition-transform duration-700">

              {/* CRITICAL FAILURE 도장 (Stamp) 효과 - 사용자가 요청한 핵심 기능 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-150 group-hover:scale-100 -rotate-12 group-hover:-rotate-[15deg]">
                <div className="border-[6px] sm:border-[8px] border-red-600 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-md shadow-2xl">
                  <p className="text-red-600 font-black text-2xl sm:text-3xl md:text-4xl whitespace-nowrap tracking-tighter uppercase px-2 sm:px-3 md:px-4">
                    CRITICAL FAILURE
                  </p>
                  <div className="h-[2px] bg-red-600/30 my-1 sm:my-2" />
                  <p className="text-red-600 font-black text-[8px] sm:text-[9px] md:text-[10px] text-center tracking-[0.25em] sm:tracking-[0.3em] uppercase">
                    Compliance Violation
                  </p>
                </div>
              </div>

              <div className="border-b-[2px] sm:border-b-[3px] border-slate-900 pb-3 sm:pb-4 md:pb-5 mb-4 sm:mb-6 md:mb-8 flex justify-between items-end">
                <div>
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] font-black text-slate-900 tracking-wider sm:tracking-widest uppercase">DEPARTMENT OF HEALTH & HUMAN SERVICES</p>
                  <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 italic">Food and Drug Administration</p>
                </div>
                <FileWarning className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-600" />
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                <div className="h-2 sm:h-2.5 bg-slate-100 rounded-full w-1/4" />
                <div className="h-2.5 sm:h-3 md:h-3.5 bg-slate-50 rounded-full w-full" />
                <div className="h-2.5 sm:h-3 md:h-3.5 bg-slate-50 rounded-full w-5/6" />
                <div className="h-2.5 sm:h-3 md:h-3.5 bg-slate-50 rounded-full w-full" />

                <div className="py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 bg-red-50/50 border-l-[4px] sm:border-l-[5px] md:border-l-[6px] border-red-600 rounded-r-xl sm:rounded-r-2xl">
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] font-black text-red-600 mb-3 sm:mb-4 uppercase tracking-wider sm:tracking-widest">OBSERVATIONS: DATA INTEGRITY</p>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="h-1.5 sm:h-2 bg-red-100 rounded-full w-full opacity-60" />
                    <div className="h-1.5 sm:h-2 bg-red-100 rounded-full w-11/12 opacity-60" />
                    <div className="h-1.5 sm:h-2 bg-red-100 rounded-full w-full opacity-60" />
                  </div>
                </div>

                <div className="h-2.5 sm:h-3 md:h-3.5 bg-slate-50 rounded-full w-4/6" />
                <div className="h-2.5 sm:h-3 md:h-3.5 bg-slate-50 rounded-full w-full" />
              </div>

              <div className="mt-auto pt-6 sm:pt-8 md:pt-10 border-t border-slate-50 text-center">
                <p className="text-2xl sm:text-3xl font-black text-red-600 mb-1 sm:mb-2 tracking-tighter">Warning Letter의 80%</p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] sm:tracking-[0.25em]">데이터 무결성 결여로 인한 사유</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-red-500/5 blur-[120px] -z-10 rounded-full" />
          </div>
        </motion.div>

        {/* 해결책: ALCOA+ 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-40">
          <div className="text-center mb-24">
            <div className="inline-block px-5 py-2 bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-[0.25em] rounded-full mb-8 shadow-sm">
              ENGINEERING STANDARD
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
              전자서명이 보장하는 <br />
              <span className="text-blue-600">ALCOA+</span> 데이터 무결성
            </h2>
            <p className="text-slate-400 font-bold text-lg">Oryx DataSafe는 기술적으로 ALCOA+ 원칙을 시스템 아키텍처에 내재화하였습니다.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { t: 'Attributable', d: '누가 작성했는가?', c: '생체 인식 & MFA' },
              { t: 'Legible', d: '읽을 수 있는가?', c: '표준 아카이브' },
              { t: 'Contemporaneous', d: '즉시 기록되었는가?', c: '실시간 타임스탬프' },
              { t: 'Original', d: '원본인가?', c: '불변성 감사 로그' },
              { t: 'Accurate', d: '정확한가?', c: '장비 직접 연동' }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all text-center flex flex-col items-center group cursor-default">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-2xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  {item.t[0]}
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">{item.t}</h4>
                <p className="text-[12px] text-slate-400 font-bold mb-8">{item.d}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 w-full">
                  <p className="text-[12px] text-blue-600 font-black tracking-tight">{item.c}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-slate-900 p-16 md:p-24 rounded-[64px] relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full schematic-bg opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black mb-8 text-white tracking-tight leading-tight">
              디지털 규제 준수로 <br /> <span className="text-blue-500">비즈니스를 가속화</span>하세요.
            </h3>
            <p className="text-slate-400 font-medium text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              더 이상 종이 문서 더미 속에서 실사를 걱정하지 마십시오. <br />
              현장 지능을 담은 Oryx DataSafe가 규제 준수를 위한 강력한 기반이 되어 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setView('contact')}
                className="px-8 sm:px-12 py-5 sm:py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-base sm:text-lg whitespace-nowrap"
              >
                무료 상담·데모 신청
              </button>
              <button
                onClick={() => setView('pricing')}
                className="px-8 sm:px-12 py-5 sm:py-6 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-base sm:text-lg whitespace-nowrap"
              >
                도입 비용 확인하기
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Necessity;
