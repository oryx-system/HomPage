import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Scale, Cpu, Play, Youtube, Info, CheckCircle2, Lock, History } from 'lucide-react';

const Concept: React.FC = () => {
   return (
      <div className="pt-24 pb-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            {/* 히어로 섹션 */}
            <motion.header
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="mb-24 text-center max-w-4xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 mb-8 uppercase tracking-[0.2em]">
                  Knowledge Base
               </div>
               <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-huge font-black mb-8 md:mb-12 text-slate-900 tracking-tighter leading-tight md:leading-none">
                  전자서명의 <span className="text-blue-600">본질과 기술</span>
               </h1>
               <p className="text-lg sm:text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
                  단순한 이미지 서명을 넘어, 법적 효력과 데이터 무결성을 보장하는 <br />
                  전자서명의 기술적 매커니즘과 제약 산업의 규제 기준을 설명합니다.
               </p>
            </motion.header>

            {/* 0. 비교 섹션: 단순 이미지 vs 전문 전자서명 */}
            <motion.section
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="mb-32">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center text-center">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Common Misconception</p>
                     <div className="w-full aspect-[16/6] bg-white rounded-2xl border border-slate-200 mb-8 flex items-center justify-center p-6 grayscale opacity-40">
                        <div className="text-3xl font-serif italic text-slate-400 border-b border-slate-400 px-4 pb-2">Lee Young-hee</div>
                     </div>
                     <h4 className="text-xl font-black text-slate-900 mb-3">단순 이미지 서명</h4>
                     <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        종이에 적힌 서명을 스캔하거나 단순히 이미지로 붙이는 방식입니다. 언제, 누가, 무엇을 위해 서명했는지에 대한 데이터가 없으며 위변조가 쉽습니다.
                     </p>
                     <div className="mt-8 px-4 py-2 bg-red-50 text-red-500 text-[10px] font-black rounded-full border border-red-100 uppercase tracking-widest">
                        Low Integrity / High Risk
                     </div>
                  </div>

                  <div className="p-8 bg-blue-600 rounded-[40px] shadow-2xl shadow-blue-600/20 flex flex-col items-center text-center relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                     <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-6 relative z-10">Oryx DataSafe Standard</p>
                     <div className="w-full aspect-[16/6] bg-white/10 rounded-2xl border border-white/20 mb-8 flex flex-col items-center justify-center p-6 relative z-10">
                        <ShieldCheck className="w-8 h-8 text-white mb-2" />
                        <div className="text-white font-mono text-[10px] leading-tight opacity-80">
                           SIGNED_BY: LYH_GMP_01 <br />
                           TS: 2026-01-03T15:24:00Z <br />
                           HASH: 0x8F2E...4A1B
                        </div>
                     </div>
                     <h4 className="text-xl font-black text-white mb-3 relative z-10">GxP 전문 전자서명</h4>
                     <p className="text-blue-100 text-sm font-medium leading-relaxed relative z-10">
                        서명자의 신원, 정확한 시각(Timestamp), 서명 목적 및 데이터 해시값이 영구적으로 결합된 디지털 증적입니다. 21 CFR Part 11을 충족하며 법적 효력이 확실합니다.
                     </p>
                     <div className="mt-8 px-4 py-2 bg-white text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest relative z-10">
                        Maximum Integrity / Regulatory Ready
                     </div>
                  </div>
               </div>
            </motion.section>

            {/* 1. 기본 개념 섹션 */}
            <motion.section
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.6 }}
               className="mb-40 grid lg:grid-cols-3 gap-8">
               <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20">
                     <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">법적 효력 (Legal Status)</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                     전자서명법 제3조에 따라 전자서명은 '서명, 날인 또는 기명날인'으로서의 효력을 가집니다. 특히 GxP 환경에서는 종이 문서의 수기 서명과 동일한 법적 위상을 갖습니다.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                     Compliance Verified
                  </div>
               </div>

               <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20">
                     <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">불변성 (Immutability)</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                     해시(Hash) 알고리즘을 통해 서명 시점의 데이터 상태를 고정합니다. 서명 이후 단 한 글자라도 수정되면 서명은 즉시 무효화되어 데이터 조작을 원천 차단합니다.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                     AES-256 Hash
                  </div>
               </div>

               <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col">
                  <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-500/20">
                     <History className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">감사 추적 (Audit Trail)</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                     전자서명은 단순한 '이름'이 아닌, 서명 주체, 시점(Timestamp), 서명 이유, 그리고 서명 시 사용된 기기 정보까지 포함하는 포괄적 디지털 증적입니다.
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-white w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                     ALCOA+ Standard
                  </div>
               </div>
            </motion.section>

            {/* 2. 기술적 워크플로우 시각화 */}
            <motion.section
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="mb-40 py-24 px-12 bg-slate-900 rounded-[56px] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px] -z-0" />
               <div className="text-center mb-16 relative z-10">
                  <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Oryx 전자서명 기술 프로세스</h2>
                  <p className="text-slate-400 text-sm font-medium">단 0.5초 안에 이루어지는 고도의 보안 매커니즘</p>
               </div>

               <div className="grid md:grid-cols-4 gap-8 relative z-10">
                  {[
                     { step: '01', title: '데이터 스냅샷', desc: '장비에서 수집된 로우 데이터를 해시화하여 핑거프린트 생성' },
                     { step: '02', title: '사용자 인증', desc: 'ID/PW, 생체 인식 또는 MFA를 통한 강력한 신원 검증' },
                     { step: '03', title: '디지털 씰링', desc: '비대칭 암호화 기술을 사용해 데이터와 서명을 영구 결합' },
                     { step: '04', title: '타임스탬핑', desc: '신뢰할 수 있는 외부 표준시를 사용하여 위변조 불가한 시간 기록' }
                  ].map((item, i) => (
                     <div key={i} className="text-center group/item relative">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400 font-black text-xl mb-6 mx-auto group-hover/item:border-blue-500/50 group-hover/item:text-white transition-all relative z-10">
                           {item.step}
                        </div>
                        <h4 className="text-white font-black mb-3 text-md">{item.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p>

                        {/* 연결선 강화: 더 길고 확실한 연결 느낌 */}
                        {i < 3 && (
                           <div className="hidden md:block absolute top-7 left-1/2 w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent z-0 translate-x-7" />
                        )}
                     </div>
                  ))}
               </div>
            </motion.section>

            {/* 3. 유튜브 비디오 라이브러리 (Placeholder) */}
            <motion.section
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="mb-24">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="max-w-xl">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-[0.2em] rounded-md mb-4">
                        <Youtube className="w-3 h-3" /> Video Insight
                     </div>
                     <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                        현장 엔지니어가 전하는 <br /> <span className="text-blue-600">실무 가이드 영상</span>
                     </h2>
                  </div>
                  <p className="text-slate-500 text-sm font-medium max-w-sm pb-1">
                     Oryx DataSafe의 실제 운영 환경과 규제 대응 노하우를 <br /> 영상으로 생생하게 확인해 보십시오.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* 비디오 카드 1 */}
                  <div className="group cursor-pointer">
                     <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden relative mb-6 border border-slate-100 shadow-sm">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                              <Play className="w-6 h-6 text-blue-600 fill-current" />
                           </div>
                        </div>
                        {/* Placeholder Thumbnail Text */}
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Coming Soon</p>
                              <p className="text-xs font-bold text-slate-900">21 CFR Part 11 완전 정복 가이드</p>
                           </div>
                        </div>
                     </div>
                     <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">실무자를 위한 규제 대응 워크플로우</h4>
                     <p className="text-slate-400 text-xs font-medium">15:30 • 규제 준수 가이드</p>
                  </div>

                  {/* 비디오 카드 2 */}
                  <div className="group cursor-pointer">
                     <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden relative mb-6 border border-slate-100 shadow-sm">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                              <Play className="w-6 h-6 text-blue-600 fill-current" />
                           </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Coming Soon</p>
                              <p className="text-xs font-bold text-slate-900">현장 장비(PLC) 데이터 무결성 연동</p>
                           </div>
                        </div>
                     </div>
                     <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">엔지니어의 시각으로 본 장비 연동 기술</h4>
                     <p className="text-slate-400 text-xs font-medium">12:45 • 기술 딥다이브</p>
                  </div>

                  {/* 비디오 카드 3 */}
                  <div className="group cursor-pointer">
                     <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden relative mb-6 border border-slate-100 shadow-sm">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                              <Play className="w-6 h-6 text-blue-600 fill-current" />
                           </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Coming Soon</p>
                              <p className="text-xs font-bold text-slate-900">CSV 밸리데이션 패키지 구성</p>
                           </div>
                        </div>
                     </div>
                     <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">성공적인 시스템 도입을 위한 밸리데이션</h4>
                     <p className="text-slate-400 text-xs font-medium">08:20 • 밸리데이션 전략</p>
                  </div>
               </div>

               <div className="mt-16 p-8 bg-blue-50 rounded-[32px] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                        <Info className="w-6 h-6" />
                     </div>
                     <p className="text-slate-700 font-bold text-sm">신규 가이드 영상이 업로드될 때마다 알림을 받고 싶으신가요?</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-blue-600 border border-blue-200 font-black text-xs rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                     뉴스레터 구독하기
                  </button>
               </div>
            </motion.section>
         </div>
      </div>
   );
};

export default Concept;
