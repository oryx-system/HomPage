
import React from 'react';
import { Target, Eye, Heart, Shield, Settings, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 mb-8 uppercase tracking-[0.2em]">
            Our Heritage & Expertise
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 text-slate-900 tracking-tight leading-none">
            현장의 언어를 아는 <br /> <span className="text-blue-600">규제 준수 솔루션.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
              Oryx DataSafe의 모든 코드는 **20년 경력의 현장 PLC+HMI 엔지니어의 노하우**에서 시작되었습니다.
              우리는 단순한 IT 기업이 아닙니다. 설비 현장의 진동과 데이터의 흐름을 이해하는 엔지니어가 직접 설계한,
              현장에서 가장 신뢰할 수 있는 데이터 무결성 플랫폼입니다.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-bold text-blue-500 mb-1">20년+</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">PLC/HMI 엔지니어링 경력</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500 mb-1">Standard</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Protocol Connectivity</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square glass rounded-[60px] flex items-center justify-center p-12 border-white/5 relative overflow-hidden bg-slate-50">
              <Settings className="w-64 h-64 text-blue-600/10 absolute animate-spin-slow opacity-20" />
              <div className="relative z-10 text-center">
                <Zap className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <p className="text-xl font-medium text-slate-600 italic mb-4">"현장 설비의 데이터는 거짓말을 하지 않습니다."</p>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Oryx DataSafe Founder & Chief Engineer</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl -z-10" />
          </div>
        </div>

        <div className="p-12 glass rounded-[40px] border-white/10 mb-24 bg-gradient-to-br from-blue-900/10 to-transparent">
          <h2 className="text-3xl font-bold mb-10 text-center">우리가 현장에 강한 이유</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="text-blue-400 font-bold">현장 프로토콜의 전문 지식</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Modbus, EtherCAT, Profibus 등 주요 산업용 프로토콜에 대한 깊은 이해를 바탕으로 다양한 장비와의 안정적인 데이터 연동을 지원합니다.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-blue-400 font-bold">OT-IT 컨버전스 아키텍처</h4>
              <p className="text-sm text-gray-500 leading-relaxed">현장 제어 단(OT)에서 발생한 데이터가 클라우드/서버(IT)로 전달되는 과정에서 단 하나의 패킷 손실도 허용하지 않는 무결성을 구현합니다.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-blue-400 font-bold">엔지니어 친화적 인터페이스</h4>
              <p className="text-sm text-gray-500 leading-relaxed">실제 오퍼레이터와 QA 담당자가 현장에서 겪는 고충을 반영하여, 가장 직관적이고 오류 없는 승인 워크플로우를 제공합니다.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "미션 (Mission)",
              desc: "제약 및 생명 과학 산업이 데이터 무결성의 위협 없이 오직 혁신에만 집중할 수 있는 환경을 구축합니다.",
              icon: <Target className="w-8 h-8 text-blue-400" />
            },
            {
              title: "비전 (Vision)",
              desc: "글로벌 GxP 표준의 실시간 디지털 검증을 주도하는 세계 최고의 데이터 컴플라이언스 플랫폼이 됩니다.",
              icon: <Eye className="w-8 h-8 text-purple-400" />
            },
            {
              title: "핵심 가치 (Values)",
              desc: "무결성(Integrity), 투명성(Transparency), 그리고 혁신(Innovation)을 모든 제품 개발의 근간으로 삼습니다.",
              icon: <Heart className="w-8 h-8 text-red-400" />
            }
          ].map((item, i) => (
            <div key={i} className="p-10 glass rounded-[40px] border-white/5">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
