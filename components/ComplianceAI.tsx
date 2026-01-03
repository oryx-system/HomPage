
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { getComplianceAssistantResponse } from '../services/geminiService';

const ComplianceAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '안녕하세요! Oryx DataSafe 규제 준수 어시스턴트입니다. 21 CFR Part 11 또는 Annex 11 요구사항에 대해 궁금한 점이 있으신가요?' }
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
    <section id="qa" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-blue-500/10 blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-blue-400 mb-4">
            <Bot className="w-3 h-3" />
            Gemini 기반 전문 상담
          </div>
          <h2 className="text-4xl font-bold mb-4">규제 준수 전문가 Q&A</h2>
          <p className="text-gray-400">특정 규제 조항에 대한 기술적 해석이나 밸리데이션 전략에 대해 AI 어시스턴트에게 물어보세요.</p>
        </div>

        <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${m.role === 'assistant' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  {m.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'assistant' ? 'bg-white/5 text-gray-200' : 'bg-blue-600 text-white'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="예: 비생체 인식 서명의 관리 기준은 무엇인가요?"
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="p-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ComplianceAI;
