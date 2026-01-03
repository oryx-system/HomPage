
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 text-center">
         <div className="max-w-md mx-auto bg-white p-12 rounded-[40px] border border-slate-100 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">전송 완료</h2>
            <p className="text-slate-500 mb-8">전문 상담사가 24시간 이내에 입력하신 연락처로 연락드리겠습니다. 감사합니다.</p>
            <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">돌아가기</button>
         </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto border-[3px] border-blue-500 rounded-[48px] p-10 lg:p-20 bg-white shadow-2xl shadow-blue-500/5">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl lg:text-6xl font-black mb-8 text-slate-900 tracking-tighter leading-[1.1]">
              디지털 규제 준수의 <br /> 여정을 함께 시작하세요.
            </h1>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed font-medium">
              무료 데모 세션을 통해 귀사의 프로세스에 Oryx DataSafe가 어떻게 적용될 수 있는지 직접 확인해 보세요.
            </p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                  <p className="text-slate-400 font-bold text-sm">귀사의 특정 규제 환경에 맞춘 커스텀 데모 시연</p>
               </div>
               <div className="flex items-center gap-5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                  <p className="text-slate-400 font-bold text-sm">기존 시스템과의 연동 가능성 및 ROI 분석</p>
               </div>
               <div className="flex items-center gap-5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                  <p className="text-slate-400 font-bold text-sm">최신 21 CFR Part 11 및 Annex 11 규제 동향 공유</p>
               </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest">이름</label>
                   <input 
                    type="text" 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" 
                    placeholder="호기도" 
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest">직함</label>
                   <input 
                    type="text" 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" 
                    placeholder="QA 팀장" 
                   />
                 </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest">회사 이메일</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" 
                  placeholder="name@company.com" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest">주요 관심 분야</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium appearance-none">
                     <option>관심 분야 선택</option>
                     <option>R&D / 실험실 관리</option>
                     <option>임상 시험(Clinical)</option>
                     <option>제조 및 생산(GMP)</option>
                     <option>기타 시스템 통합</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest">문의 내용</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium resize-none" 
                  placeholder="상담받고 싶은 내용을 적어주세요."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-blue-600/20 active:scale-[0.98]"
              >
                전송하기 <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
