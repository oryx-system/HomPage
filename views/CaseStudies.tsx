
import React from 'react';
import { BarChart3, TrendingUp, Users, Award } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const cases = [
    {
      company: "글로벌 A 제약사",
      title: "글로벌 임상 3상 데이터 무결성 확보",
      impact: "감사 준비 시간 85% 단축",
      desc: "20개국 이상에서 진행된 대규모 임상 시험의 전자 기록을 Oryx DataSafe로 통합하여 FDA 실사를 결함 없이 통과했습니다.",
      stats: ["도입 기간: 3개월", "사용자 수: 1,200명+"]
    },
    {
      company: "B 바이오텍",
      title: "R&D 실험실 페이퍼리스(Paperless) 전환",
      impact: "문서 승인 속도 5배 향상",
      desc: "수기 기록에 의존하던 초기 연구 단계를 디지털화하여 데이터 소급성을 확보하고 지식재산권 보호 체계를 강화했습니다.",
      stats: ["승인 주기: 7일 -> 1일", "종이 사용량 90% 감소"]
    },
    {
      company: "C 위탁생산(CMO) 기업",
      title: "EU Annex 11 기준 제조 공정 최적화",
      impact: "배치 레코드 오류율 0%",
      desc: "실시간 감사 추적과 전자서명을 통해 제조 공정 중 발생할 수 있는 휴먼 에러를 원천 차단했습니다.",
      stats: ["배치 통과율 100%", "실시간 모니터링 적용"]
    }
  ];

  return (
    <div className="pt-32 pb-24">
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
              <p className="text-3xl font-bold mb-2">50,000+</p>
              <p className="text-sm text-gray-500">활성 사용자</p>
           </div>
           <div className="p-8">
              <Award className="w-10 h-10 text-gray-500 mx-auto mb-6" />
              <p className="text-3xl font-bold mb-2">100%</p>
              <p className="text-sm text-gray-500">글로벌 실사 통과율</p>
           </div>
           <div className="p-8">
              <BarChart3 className="w-10 h-10 text-gray-500 mx-auto mb-6" />
              <p className="text-3xl font-bold mb-2">1,000만+</p>
              <p className="text-sm text-gray-500">매월 생성되는 전자 기록</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
