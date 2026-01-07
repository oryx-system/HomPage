
import React from 'react';
import { HelpCircle, Mail, MessageSquare, Phone } from 'lucide-react';

const Support: React.FC = () => {
  const faqs = [
    {
      q: "Oryx DataSafe는 21 CFR Part 11의 모든 조항을 지원하나요?",
      a: "네, 접근 제어, 감사 추적(Audit Trail), 전자서명 요구사항, 시스템 보안 및 장치 체크를 포함한 모든 조항을 지원하며, 이를 증명하는 밸리데이션 패키지를 함께 제공합니다."
    },
    {
      q: "기존 레거시 시스템과의 데이터 연동이 가능한가요?",
      a: "표준 REST API 및 맞춤형 커넥터를 통해 SAP, LIMS, ELN 등 기존 엔터프라이즈 시스템과의 안전한 데이터 연동을 지원합니다."
    },
    {
      q: "데이터 센터의 물리적 보안은 어떻게 관리되나요?",
      a: "ISO 27001 및 SOC2 인증을 획득한 글로벌 데이터 센터에서 운영되며, 모든 데이터는 지리적으로 분산된 위치에 실시간 백업됩니다."
    },
    {
      q: "시스템 업데이트 시 밸리데이션 상태가 유지되나요?",
      a: "우리는 '연속적 밸리데이션' 전략을 사용하여, 업데이트 후에도 시스템의 적격성 상태가 유지되도록 자동화된 회귀 테스트와 차이 분석 리포트를 제공합니다."
    }
  ];

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 mb-8 uppercase tracking-[0.2em]">
            Customer Support
          </div>
          <h1 className="text-5xl font-bold mb-6">고객 지원 센터</h1>
          <p className="text-gray-400 text-lg">궁금한 점이 있으신가요? 규제 준수 전문가가 상시 대기 중입니다.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <HelpCircle className="text-blue-500" /> 자주 묻는 질문
            </h2>
            {faqs.map((f, i) => (
              <div key={i} className="p-6 glass rounded-2xl border-white/5 hover:bg-white/5 transition-colors">
                <h4 className="font-bold mb-3 text-slate-900">Q. {f.q}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">A. {f.a}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-8">문의 채널</h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5 group hover:border-blue-500/30 cursor-pointer">
                <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">이메일 문의</p>
                  <p className="text-sm text-gray-500">oryx@oryxdatasafe.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5 group hover:border-emerald-500/30 cursor-pointer">
                <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">실시간 기술 상담</p>
                  <p className="text-sm text-gray-500">평일 09:00 - 18:00 (GMT+9)</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 glass rounded-2xl border-white/5 group hover:border-purple-500/30 cursor-pointer">
                <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">글로벌 핫라인</p>
                  <p className="text-sm text-gray-500">+82 (0)10-6545-0415</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
