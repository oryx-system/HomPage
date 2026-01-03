
import React from 'react';
import { Activity, ArrowRight, ShieldCheck, Database, Lock, Cpu } from 'lucide-react';
import { ViewType } from '../App';

interface HeroProps {
   setView: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
   return (
      <section className="relative pt-24 pb-32 overflow-hidden px-6 lg:px-12">
         <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col items-center text-center mb-24">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 mb-12 uppercase tracking-[0.3em] blue-glow">
                  <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  21 CFR Part 11 & Annex 11 Native Architecture
               </div>

               <h1 className="text-huge mb-12 text-slate-900">
                  ENGINEERED <br />
                  <span className="text-blue-600">FOR INTEGRITY.</span>
               </h1>

               <div className="mb-16">
                  <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-tight font-medium tracking-tight mb-4">
                     우리는 단순한 전자서명이 아닌, 제약 공정 데이터의 <br />
                     <span className="text-slate-900 font-bold">'첫 번째 마일'</span>을 보호하는 엔지니어링 표준입니다.
                  </p>
                  {/* 한국어 이해를 돕기 위한 보조 설명 추가 */}
                  <p className="text-sm md:text-base text-blue-600/60 font-bold uppercase tracking-widest">
                     — 데이터가 생성되는 그 첫 순간(The Source)부터 무결성을 확보합니다
                  </p>
               </div>

               <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <button
                     onClick={() => setView('contact')}
                     className="px-12 py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] text-lg flex items-center gap-3 group"
                  >
                     전문가 상담 예약
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button
                     onClick={() => setView('concept')}
                     className="px-12 py-6 bg-white text-slate-900 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-lg"
                  >
                     기술 명세서 보기
                  </button>
               </div>
            </div>

            {/* 3D 컨셉의 데이터 시각화 보드 */}
            <div className="relative mt-20 perspective-view">
               <div className="floating-3d max-w-5xl mx-auto glass-card rounded-[48px] p-2 shadow-2xl">
                  <div className="bg-slate-900 rounded-[46px] p-12 overflow-hidden relative">
                     <div className="scanline absolute top-0 left-0" />

                     <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        <div className="space-y-8">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                 <Cpu className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-[10px] text-blue-400 font-black tracking-widest uppercase">OT Integration</p>
                                 <p className="text-white font-bold">PLC Live Stream</p>
                              </div>
                           </div>
                           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                              <div className="flex justify-between items-end mb-4">
                                 <div className="h-8 w-1 bg-blue-500 rounded-full animate-pulse" />
                                 <div className="h-12 w-1 bg-blue-500/50 rounded-full" />
                                 <div className="h-16 w-1 bg-blue-500 rounded-full animate-pulse" />
                                 <div className="h-10 w-1 bg-blue-500/50 rounded-full" />
                                 <div className="h-14 w-1 bg-blue-500 rounded-full animate-pulse" />
                              </div>
                              <p className="text-[10px] text-slate-500 font-mono">ENCRYPTING_PACKET_0x4F2...</p>
                           </div>
                        </div>

                        <div className="flex flex-col items-center justify-center border-x border-white/10 px-8">
                           <div className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center mb-6 blue-glow">
                              <ShieldCheck className="w-12 h-12 text-blue-500" />
                           </div>
                           <p className="text-white font-black text-xl mb-2">ALCOA+ Verified</p>
                           <p className="text-blue-400 text-[10px] font-black tracking-widest uppercase">Signature Locked</p>
                        </div>

                        <div className="space-y-6">
                           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                              <p className="text-[10px] text-slate-500 font-black mb-4 tracking-widest uppercase">Blockchain Audit Log</p>
                              <div className="space-y-2">
                                 <div className="h-1.5 w-full bg-blue-600/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-2/3" />
                                 </div>
                                 <div className="h-1.5 w-full bg-blue-600/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-1/2" />
                                 </div>
                                 <div className="h-1.5 w-full bg-blue-600/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 w-4/5" />
                                 </div>
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                 <Database className="w-4 h-4 text-slate-500" />
                              </div>
                              <div className="flex-1 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                 <Lock className="w-4 h-4 text-white" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Decorative elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-blue-600/3 blur-[80px] -z-10 rounded-full" />
            </div>
         </div>
      </section>
   );
};

export default Hero;
