import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  Shield,
  ArrowRight,
  Award,
  Target
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  timeline: string;
  tags: string[];
}

const CaseStudies: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'pharma-a',
      company: 'A 제약사',
      industry: '의약품 제조 (주사제)',
      companySize: '직원 800명, 생산 라인 5개',
      challenge: '수기 배치 기록으로 인한 데이터 누락 및 감사 대응 지연. FDA 경고장(Warning Letter) 수령 후 긴급 개선 필요.',
      solution: 'Oryx DataSafe를 통해 충진기, 멸균기, 동결건조기의 PLC 데이터를 실시간 자동 수집. 모든 공정 데이터를 21 CFR Part 11 준수 형식으로 저장.',
      results: [
        {
          metric: '데이터 입력 인력',
          value: '70% 절감',
          description: '6명 → 2명으로 축소 (연간 1.9억원 절감)'
        },
        {
          metric: '감사 대응 시간',
          value: '80% 단축',
          description: '평균 40시간 → 8시간 (증적 자동 생성)'
        },
        {
          metric: '데이터 오류율',
          value: '92% 감소',
          description: '월 50건 → 4건 (수기 입력 제거 효과)'
        },
        {
          metric: 'FDA 재감사',
          value: '무결함 통과',
          description: '시스템 밸리데이션 문서 즉시 제출'
        }
      ],
      testimonial: {
        quote: 'Oryx 도입 전에는 매 배치마다 수기 기록과 스캔 업로드로 인력이 소진되었습니다. 지금은 PLC에서 자동으로 데이터가 수집되어 담당자들이 품질 관리에 집중할 수 있게 되었습니다.',
        author: '김철수 상무',
        position: 'QA/QC 담당 임원'
      },
      timeline: '3주 (요구사항 분석 3일 + PLC 연동 10일 + 검증 8일)',
      tags: ['주사제', 'FDA 규제', '실시간 수집', 'PLC 연동']
    },
    {
      id: 'bio-b',
      company: 'B 바이오텍',
      industry: '바이오의약품 (항체 치료제)',
      companySize: '직원 500명, 발효조 12기',
      challenge: '발효 공정 데이터의 수동 기록으로 인한 ALCOA+ 준수 불가. EU 수출을 위한 Annex 11 대응 시급.',
      solution: '12개 발효조의 Siemens PLC와 실시간 연동. 온도, pH, DO, 교반속도 등 핵심 파라미터를 밀리초 단위로 자동 수집 및 암호화 저장.',
      results: [
        {
          metric: '배치 기록 시간',
          value: '90% 단축',
          description: '배치당 4시간 → 30분 (자동 리포트 생성)'
        },
        {
          metric: '데이터 무결성',
          value: '100% 보증',
          description: 'ALCOA+ 완벽 준수 (원본 데이터 직접 보호)'
        },
        {
          metric: 'EU 수출 승인',
          value: '6개월 단축',
          description: 'Annex 11 문서 사전 준비로 신속 승인'
        },
        {
          metric: 'ROI',
          value: '18개월 회수',
          description: '인력 절감 + 오류 감소 효과'
        }
      ],
      testimonial: {
        quote: '발효 공정은 24시간 모니터링이 필수인데, 이전에는 교대조마다 수기로 기록했습니다. Oryx 덕분에 모든 데이터가 자동으로 기록되고, 이상 징후 발생 시 즉시 알람을 받을 수 있어 품질이 크게 향상되었습니다.',
        author: '박영희 박사',
        position: '생산기술 연구소장'
      },
      timeline: '4주 (12개 발효조 순차 연동 + 밸리데이션)',
      tags: ['바이오', 'Annex 11', '발효조', 'Siemens PLC']
    },
    {
      id: 'medical-c',
      company: 'C 의약품사',
      industry: '의약품 (경구제)',
      companySize: '직원 1,200명, 생산 라인 8개',
      challenge: '다양한 PLC 브랜드(Siemens, Mitsubishi, LS) 혼재로 데이터 통합 불가. 경쟁사 솔루션은 일부 PLC만 지원.',
      solution: 'Oryx의 범용 PLC 연동 기술로 모든 브랜드 통합. 타정기, 코팅기, 포장기 등 전 공정 데이터를 단일 플랫폼에서 관리.',
      results: [
        {
          metric: '시스템 통합',
          value: '3개 브랜드',
          description: 'Siemens + Mitsubishi + LS 동시 연동'
        },
        {
          metric: '구축 기간',
          value: '3주 완료',
          description: '경쟁사 대비 75% 단축 (3개월 → 3주)'
        },
        {
          metric: '운영 비용',
          value: '65% 절감',
          description: '월 2,400만원 → 840만원 (인력 최적화)'
        },
        {
          metric: '공정 가시성',
          value: '실시간 대시보드',
          description: '전 라인 모니터링 및 트렌드 분석'
        }
      ],
      testimonial: {
        quote: 'PLC 브랜드가 다양해서 데이터 통합이 불가능하다고 생각했습니다. Oryx는 20년 현장 경험으로 모든 프로토콜을 지원해서, 레거시 장비도 문제없이 연동되었습니다.',
        author: '이민수 이사',
        position: '생산본부장'
      },
      timeline: '3주 (8개 라인 병렬 연동)',
      tags: ['경구제', '다중 PLC', '레거시 통합', '3주 구축']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-green-600/10 border border-green-600/20 text-green-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
            <Award className="w-4 h-4 inline-block mr-2" />
            Success Stories
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-huge font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            검증된 <span className="text-green-600">성공 사례</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            제약·바이오 기업들이 Oryx DataSafe로 <br />
            규제 준수와 운영 효율을 동시에 달성한 이야기
          </p>
        </AnimatedSection>

        {/* Success Metrics Overview */}
        <AnimatedSection delay={0.1} className="mb-20">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: '평균 인력 절감', value: '70%', icon: <Users className="w-8 h-8" /> },
              { label: '평균 구축 기간', value: '3주', icon: <Clock className="w-8 h-8" /> },
              { label: '평균 ROI 회수', value: '18개월', icon: <DollarSign className="w-8 h-8" /> },
              { label: 'FDA/EU 감사', value: '100% 통과', icon: <Shield className="w-8 h-8" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate-200 hover:border-green-500 transition-all"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  {metric.icon}
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2">
                  {metric.value}
                </div>
                <p className="text-sm text-slate-600 font-bold">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Case Study Cards */}
        <div className="grid gap-8">
          {caseStudies.map((caseStudy, index) => (
            <AnimatedSection key={caseStudy.id} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-[48px] p-12 shadow-2xl border-2 border-slate-200 hover:border-green-500 transition-all cursor-pointer"
                onClick={() => setSelectedCase(caseStudy)}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Company Info */}
                  <div className="lg:w-1/3">
                    <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-xs font-black rounded-full mb-4">
                      {caseStudy.industry}
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">
                      {caseStudy.company}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-600 mb-6">
                      <Building2 className="w-5 h-5" />
                      <span className="text-sm font-bold">{caseStudy.companySize}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {caseStudy.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-3 text-green-600">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-black">{caseStudy.timeline}</span>
                    </div>
                  </div>

                  {/* Right: Results Grid */}
                  <div className="lg:w-2/3">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {caseStudy.results.map((result, i) => (
                        <div
                          key={i}
                          className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                        >
                          <p className="text-xs text-slate-600 font-bold mb-2">{result.metric}</p>
                          <div className="text-3xl font-black text-green-600 mb-2">
                            {result.value}
                          </div>
                          <p className="text-sm text-slate-700">{result.description}</p>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-green-600 font-black text-lg"
                    >
                      상세 사례 보기
                      <ArrowRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Case Study Detail Modal */}
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[48px] p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-xs font-black rounded-full mb-4">
                  {selectedCase.industry}
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">
                  {selectedCase.company} 성공 사례
                </h2>
                <p className="text-slate-600 flex items-center gap-3">
                  <Building2 className="w-5 h-5" />
                  {selectedCase.companySize}
                </p>
              </div>

              {/* Challenge */}
              <div className="mb-8 p-6 bg-red-50 rounded-3xl border-2 border-red-200">
                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-3">
                  <Target className="w-6 h-6 text-red-600" />
                  도입 전 과제
                </h3>
                <p className="text-slate-700 leading-relaxed">{selectedCase.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-8 p-6 bg-blue-50 rounded-3xl border-2 border-blue-200">
                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  Oryx 솔루션
                </h3>
                <p className="text-slate-700 leading-relaxed">{selectedCase.solution}</p>
              </div>

              {/* Results */}
              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  도입 효과
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCase.results.map((result, i) => (
                    <div
                      key={i}
                      className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                    >
                      <p className="text-xs text-slate-600 font-bold mb-2">{result.metric}</p>
                      <div className="text-3xl font-black text-green-600 mb-2">
                        {result.value}
                      </div>
                      <p className="text-sm text-slate-700">{result.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="mb-8 p-8 bg-slate-900 rounded-3xl">
                <p className="text-xl text-white leading-relaxed mb-6 italic">
                  "{selectedCase.testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-black text-lg">
                      {selectedCase.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-black">{selectedCase.testimonial.author}</p>
                    <p className="text-slate-400 text-sm">{selectedCase.testimonial.position}</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCase(null)}
                className="w-full py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition-colors"
              >
                닫기
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section */}
        <AnimatedSection delay={0.6} className="mt-20">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-[48px] p-12 lg:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              귀사도 다음 성공 사례의 <br />
              주인공이 될 수 있습니다
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              제약·바이오 기업을 위한 맞춤형 컨설팅을 받아보세요. <br />
              업계 전문가가 직접 귀사의 현황을 분석해 드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-12 py-5 sm:py-6 bg-white text-green-600 font-black rounded-2xl hover:bg-slate-50 transition-colors text-base sm:text-xl whitespace-nowrap"
              >
                무료 현장 진단 신청
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-12 py-5 sm:py-6 bg-green-800 text-white font-black rounded-2xl hover:bg-green-900 transition-colors text-base sm:text-xl whitespace-nowrap"
              >
                상세 사례집 다운로드
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default CaseStudies;
