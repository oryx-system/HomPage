
import React from 'react';
import { BarChart3, TrendingUp, Users, Award } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const cases = [
    {
      company: "제조 공정 디지털화",
      title: "기존 수기 기록의 완전한 디지털 전환",
      impact: "데이터 무결성 확보",
      desc: "제조 공정에서 발생하는 모든 데이터를 실시간으로 캡처하고 감사 추적을 생성하여 휴먼 에러를 방지합니다.",
      stats: ["실시간 감사 추적", "전자서명 워크플로우"]
    },
    {
      company: "실험실 정보 관리",
      title: "R&D 실험실 페이퍼리스(Paperless) 환경 구축",
      impact: "업무 효율성 증대",
      desc: "수기 기록에 의존하던 연구 단계를 디지털화하여 데이터 소급성을 강화하고 지식재산권 보호 체계를 공고히 합니다.",
      stats: ["데이터 이력 관리", "전자 기록 보존"]
    },
    {
      company: "규제 실사 대응",
      title: "FDA/EMA 등 규제 기관 실사 준비 최적화",
      impact: "비용 리스크 감소",
      desc: "21 CFR Part 11 기준을 충족하는 아키텍처를 통해 실사 시 필요한 데이터를 즉시 추출하고 증명할 수 있습니다.",
      stats: ["정기 점검 리포트", "자동화된 검증 패키지"]
    }
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <h1 className="text-5xl font-bold mb-6">성공 사례</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            전 세계 선도적인 제약 및 바이오 기업들이 Oryx DataSafe를 통해 디지털 혁신과 규제 준수를 동시에 달성하고 있습니다.
          </p>
        </header>

        <div className="grid gap-8">
          {cases.map((c, i) => (
            <div key={i} className="glass p-10 rounded-[32px] border-white/5 flex flex-col md:flex-row gap-12 items-start group hover:bg-white/5 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">{c.company}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{c.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{c.desc}</p>
                <div className="flex flex-wrap gap-4">
                  {c.stats.map(s => (
                    <span key={s} className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-gray-300 font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-64 p-8 bg-blue-600/10 rounded-3xl border border-blue-600/20 text-center flex flex-col justify-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-white mb-2">{c.impact}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">핵심 성과 지표</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8">
            <Users className="w-10 h-10 text-gray-500 mx-auto mb-6" />
            <p className="text-3xl font-bold mb-2">Modern</p>
            <p className="text-sm text-gray-500">Architecture</p>
          </div>
          <div className="p-8">
            <Award className="w-10 h-10 text-gray-500 mx-auto mb-6" />
            <p className="text-3xl font-bold mb-2">Standard</p>
            <p className="text-sm text-gray-500">GxP Compliance</p>
          </div>
          <div className="p-8">
            <BarChart3 className="w-10 h-10 text-gray-500 mx-auto mb-6" />
            <p className="text-3xl font-bold mb-2">Reliable</p>
            <p className="text-sm text-gray-500">Data Integrity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
