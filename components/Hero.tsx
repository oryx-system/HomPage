
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, ShieldCheck, Database, Lock, Cpu } from 'lucide-react';
import { ViewType } from '../App';
import FloatingParticles from './FloatingParticles';

interface HeroProps {
   setView: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
   return (
      <section className="relative pt-20 md:pt-24 pb-24 md:pb-32 overflow-hidden px-4 md:px-6 lg:px-12">
         <FloatingParticles />
         
         <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24">
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[9px] md:text-[10px] font-black text-blue-600 mb-8 md:mb-12 uppercase tracking-[0.2em] md:tracking-[0.3em] blue-glow"
               >
                  <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  <span className="hidden sm:inline">21 CFR Part 11 & Annex 11 Native Architecture</span>
                  <span className="sm:hidden">21 CFR Part 11 준수</span>
               </motion.div>

               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-huge mb-8 md:mb-12 text-slate-900 leading-tight md:leading-none px-4"
               >
                  ENGINEERED <br />
                  <span className="text-blue-600">FOR INTEGRITY.</span>
               </motion.h1>

               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-12 md:mb-16 px-4"
               >
                  <p className="text-base md:text-xl lg:text-2xl text-slate-500 max-w-3xl leading-relaxed md:leading-tight font-medium tracking-tight mb-3 md:mb-4">
                     우리는 단순한 전자서명이 아닌,<br className="md:hidden" /> 제약 공정 데이터의 <br className="hidden md:inline" />
                     <span className="text-slate-900 font-bold">'첫 번째 마일'</span>을 보호하는 엔지니어링 표준입니다.
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-blue-600/60 font-bold uppercase tracking-wider md:tracking-widest">
                     — 데이터가 생성되는 그 첫 순간부터 무결성 확보
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full max-w-2xl px-4"
               >
                  <motion.button
                     whileHover={{ scale: 1.05, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setView('contact')}
                     className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-blue-600 text-white font-black rounded-xl md:rounded-2xl hover:bg-blue-700 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 group"
                  >
                     전문가 상담 예약
                     <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  <motion.button
                     whileHover={{ scale: 1.05, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setView('concept')}
                     className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-white text-slate-900 font-black rounded-xl md:rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-base md:text-lg"
                  >
                     기술 명세서 보기
                  </motion.button>
               </motion.div>
            </div>

            {/* 3D 컨셉의 데이터 시각화 보드 */}
            <motion.div
               initial={{ opacity: 0, y: 60 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="relative mt-20 perspective-view"
            >
               <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-2 shadow-2xl">
                  <div className="bg-slate-900 rounded-[46px] p-12 overflow-hidden relative">
                     <div className="scanline absolute top-0 left-0" />

                     <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        <motion.div
                           initial={{ opacity: 0, x: -30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.8, delay: 1.2 }}
                           className="space-y-8"
                        >
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
                                 <motion.div
                                    animate={{ height: ['2rem', '2.5rem', '2rem'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className="w-1 bg-blue-500 rounded-full"
                                 />
                                 <motion.div
                                    animate={{ height: ['3rem', '2rem', '3rem'] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
                                    className="w-1 bg-blue-500/50 rounded-full"
                                 />
                                 <motion.div
                                    animate={{ height: ['4rem', '3rem', '4rem'] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
                                    className="w-1 bg-blue-500 rounded-full"
                                 />
                                 <motion.div
                                    animate={{ height: ['2.5rem', '3.5rem', '2.5rem'] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.9, ease: 'easeInOut' }}
                                    className="w-1 bg-blue-500/50 rounded-full"
                                 />
                                 <motion.div
                                    animate={{ height: ['3.5rem', '2.5rem', '3.5rem'] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1.2, ease: 'easeInOut' }}
                                    className="w-1 bg-blue-500 rounded-full"
                                 />
                              </div>
                              <p className="text-[10px] text-slate-500 font-mono">ENCRYPTING_PACKET_0x4F2...</p>
                           </div>
                        </motion.div>

                        <motion.div
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.8, delay: 1.4 }}
                           className="flex flex-col items-center justify-center border-x border-white/10 px-8"
                        >
                           <motion.div
                              animate={{ 
                                rotate: 360,
                                y: [0, -8, 0]
                              }}
                              transition={{ 
                                rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                              }}
                              className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center mb-6 blue-glow"
                           >
                              <ShieldCheck className="w-12 h-12 text-blue-500" />
                           </motion.div>
                           <p className="text-white font-black text-xl mb-2">ALCOA+ Verified</p>
                           <p className="text-blue-400 text-[10px] font-black tracking-widest uppercase">Signature Locked</p>
                        </motion.div>

                        <motion.div
                           initial={{ opacity: 0, x: 30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.8, delay: 1.6 }}
                           className="space-y-6"
                        >
                           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                              <p className="text-[10px] text-slate-500 font-black mb-4 tracking-widest uppercase">Blockchain Audit Log</p>
                              <div className="space-y-2">
                                 <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '66.666%' }}
                                    transition={{ duration: 1.5, delay: 1.8 }}
                                    className="h-1.5 w-full bg-blue-600/20 rounded-full overflow-hidden"
                                 >
                                    <div className="h-full bg-blue-600 w-full" />
                                 </motion.div>
                                 <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '50%' }}
                                    transition={{ duration: 1.5, delay: 2 }}
                                    className="h-1.5 w-full bg-blue-600/20 rounded-full overflow-hidden"
                                 >
                                    <div className="h-full bg-blue-600 w-full" />
                                 </motion.div>
                                 <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '80%' }}
                                    transition={{ duration: 1.5, delay: 2.2 }}
                                    className="h-1.5 w-full bg-blue-600/20 rounded-full overflow-hidden"
                                 >
                                    <div className="h-full bg-blue-600 w-full" />
                                 </motion.div>
                              </div>
                           </div>
                           <div className="flex gap-4">
                              <div className="flex-1 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                 <Database className="w-4 h-4 text-slate-500" />
                              </div>
                              <motion.div
                                 whileHover={{ scale: 1.1 }}
                                 className="flex-1 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 cursor-pointer"
                              >
                                 <Lock className="w-4 h-4 text-white" />
                              </motion.div>
                           </div>
                        </motion.div>
                     </div>
                  </div>
               </div>

               {/* Decorative elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-blue-600/3 blur-[80px] -z-10 rounded-full" />
            </motion.div>
         </div>
      </section>
   );
};

export default Hero;
