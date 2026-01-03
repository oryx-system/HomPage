
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
         <div className="max-w-md mx-auto glass p-12 rounded-[40px] border-white/10">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
               <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">전송 완료</h2>
            <p className="text-gray-400 mb-8">전문 상담사가 24시간 이내에 입력하신 연락처로 연락드리겠습니다. 감사합니다.</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black font-bold rounded-xl">돌아가기</button>
         </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-bold mb-8">디지털 규제 준수의 <br /> 여정을 함께 시작하세요.</h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            무료 데모 세션을 통해 귀사의 프로세스에 Oryx DataSafe가 어떻게 적용될 수 있는지 직접 확인해 보세요.
          </p>
          
          <div className="space-y-8">
             <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0 mt-1" />
                <p className="text-gray-300 font-medium">귀사의 특정 규제 환경에 맞춘 커스텀 데모 시연</p>
             </div>
             <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0 mt-1" />
                <p className="text-gray-300 font-medium">기존 시스템과의 연동 가능성 및 ROI 분석</p>
             </div>
             <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0 mt-1" />
                <p className="text-gray-300 font-medium">최신 21 CFR Part 11 및 Annex 11 규제 동향 공유</p>
             </div>
          </div>
        </div>

        <div className="glass p-10 rounded-[40px] border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">이름</label>
                 <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50" placeholder="홍길동" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">직함</label>
                 <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50" placeholder="QA 팀장" />
               </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">회사 이메일</label>
              <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50" placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">주요 관심 분야</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50 appearance-none text-gray-400">
                 <option>관심 분야 선택</option>
                 <option>R&D / 실험실 관리</option>
                 <option>임상 시험(Clinical)</option>
                 <option>제조 및 생산(GMP)</option>
                 <option>기타 시스템 통합</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">문의 내용</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/50" placeholder="상담받고 싶은 내용을 적어주세요."></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              전송하기 <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
