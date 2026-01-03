
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { getComplianceAssistantResponse } from '../services/geminiService';

const ComplianceAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '안녕하세요! Oryx DataSafe 규제 준수 전문가입니다. 21 CFR Part 11 가이드라인이나 현장 장비 연동 기술에 대해 무엇이든 물어보세요.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const response = await getComplianceAssistantResponse([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "답변을 가져오는 중 오류가 발생했습니다." }]);
    setLoading(false);
  };

  return (
    <section id="qa" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50/50 blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            <Bot className="w-4 h-4 inline-block mr-2" />
            Gemini Assistant
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-900">규제 준수 지능형 Q&A</h2>
          <p className="text-slate-500 text-lg">복잡한 규제 조항에 대한 해석과 현장 연동 시나리오를 즉시 상담하세요.</p>
        </div>

        <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${m.role === 'assistant' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {m.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div className={`max-w-[75%] p-6 rounded-3xl text-sm leading-relaxed font-medium ${m.role === 'assistant' ? 'bg-slate-50 text-slate-700' : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center animate-pulse">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: PLC 데이터를 실시간으로 서명 매핑하는 방식은?"
              className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-sm"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="p-4 bg-blue-600 rounded-2xl hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ComplianceAI;
