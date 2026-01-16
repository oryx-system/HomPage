import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Zap, 
  Shield, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  Database,
  Activity,
  Lock,
  GitBranch
} from 'lucide-react';
import type { ViewType } from '../App';

interface ComparisonProps {
  setView: (view: ViewType) => void;
}

const Comparison: React.FC<ComparisonProps> = ({ setView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('features');

  const categories = [
    { id: 'features', name: '핵심 기능', icon: Zap },
    { id: 'integration', name: '장비 연동', icon: Activity },
    { id: 'compliance', name: '규제 준수', icon: Shield },
    { id: 'cost', name: '비용 효율', icon: DollarSign }
  ];

  const comparisonData = {
    features: [
      {
        feature: 'PLC 직접 연동',
        oryx: true,
        competitor: false,
        highlight: true,
        detail: 'Siemens, Allen-Bradley, Mitsubishi 등 모든 PLC 직접 연동'
      },
      {
        feature: '실시간 데이터 수집',
        oryx: 'Sub-10ms',
        competitor: '수동 입력',
        highlight: true,
        detail: '밀리초 단위 실시간 수집'
      },
      {
        feature: '원본 데이터 암호화',
        oryx: 'AES-256 (수집 즉시)',
        competitor: 'DB 저장 후 암호화',
        highlight: true,
        detail: '데이터 조작 원천 차단'
      },
      {
        feature: 'ALCOA+ 자동 검증',
        oryx: true,
        competitor: '부분 지원',
        highlight: false,
        detail: '귀속성, 판독성, 동시성, 원본성, 정확성'
      },
      {
        feature: '전자서명 자동 적용',
        oryx: true,
        competitor: true,
        highlight: false,
        detail: '21 CFR Part 11 준수'
      },
      {
        feature: '감사 추적 (Audit Trail)',
        oryx: true,
        competitor: true,
        highlight: false,
        detail: '모든 이벤트 로깅'
      },
      {
        feature: '수기 기록 의존도',
        oryx: '0%',
        competitor: '70-90%',
        highlight: true,
        detail: '완전 자동화'
      }
    ],
    integration: [
      {
        feature: 'PLC 제조사 지원',
        oryx: '6개사 이상',
        competitor: '제한적',
        highlight: true,
        detail: 'Siemens, Allen-Bradley, Mitsubishi, LS, Schneider, Yokogawa'
      },
      {
        feature: '통신 프로토콜',
        oryx: 'OPC UA, Modbus, EtherNet/IP, PROFINET',
        competitor: 'OPC UA만',
        highlight: true,
        detail: '모든 산업 표준 지원'
      },
      {
        feature: 'SCADA 연동',
        oryx: true,
        competitor: false,
        highlight: true,
        detail: 'Wonderware, WinCC, iFIX'
      },
      {
        feature: 'HMI 직접 연동',
        oryx: true,
        competitor: false,
        highlight: true,
        detail: '20년 현장 경험 기반'
      },
      {
        feature: '레거시 장비 지원',
        oryx: true,
        competitor: '제한적',
        highlight: false,
        detail: '구형 장비도 연동 가능'
      },
      {
        feature: '커스텀 프로토콜 개발',
        oryx: true,
        competitor: false,
        highlight: true,
        detail: '고객 맞춤 개발'
      }
    ],
    compliance: [
      {
        feature: 'FDA 21 CFR Part 11',
        oryx: 'Native 준수',
        competitor: '준수',
        highlight: false,
        detail: '설계 단계부터 반영'
      },
      {
        feature: 'EU Annex 11',
        oryx: 'Native 준수',
        competitor: '준수',
        highlight: false,
        detail: 'GMP 표준 준수'
      },
      {
        feature: '밸리데이션 패키지',
        oryx: 'IQ/OQ/PQ 포함',
        competitor: '별도 비용',
        highlight: true,
        detail: '사전 검증 완료'
      },
      {
        feature: 'CSV (Computer System Validation)',
        oryx: '즉시 대응',
        competitor: '6-12개월',
        highlight: true,
        detail: '검증 기간 단축'
      },
      {
        feature: 'FDA 감사 대응',
        oryx: '자동 리포트 생성',
        competitor: '수동 작업',
        highlight: true,
        detail: '대응 시간 단축 목표'
      },
      {
        feature: '데이터 무결성 보장',
        oryx: 'ALCOA+ 완전 준수',
        competitor: 'ALCOA 부분 준수',
        highlight: true,
        detail: '완전 준수 목표'
      }
    ],
    cost: [
      {
        feature: '구축 기간',
        oryx: '2-3개월',
        competitor: '6-12개월',
        highlight: true,
        detail: '빠른 ROI 실현'
      },
      {
        feature: '인력 투입',
        oryx: '1-2명',
        competitor: '3-5명',
        highlight: true,
        detail: '인건비 절감 예상'
      },
      {
        feature: '밸리데이션 비용',
        oryx: '포함',
        competitor: '별도 (평균 5천만원)',
        highlight: true,
        detail: 'IQ/OQ/PQ 포함'
      },
      {
        feature: '연간 유지보수',
        oryx: '라이선스의 15%',
        competitor: '라이선스의 20-25%',
        highlight: true,
        detail: '장기 비용 절감'
      },
      {
        feature: '커스터마이징',
        oryx: '유연한 대응',
        competitor: '제한적',
        highlight: true,
        detail: '현장 경험 기반'
      },
      {
        feature: 'ROI 실현 기간',
        oryx: '6-9개월',
        competitor: '18-24개월',
        highlight: true,
        detail: '빠른 투자 회수'
      }
    ]
  };

  const stats = [
    {
      icon: Clock,
      value: '~70%',
      label: '구축 기간 단축 목표',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      value: '~60%',
      label: '총 소유 비용 절감 예상',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      value: '~90%',
      label: 'FDA 감사 대응 시간 단축 목표',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      value: '~50%',
      label: '필요 인력 감소 예상',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const currentData = comparisonData[selectedCategory as keyof typeof comparisonData];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" />
              경쟁사 대비 차별화 포인트
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-huge font-black mb-8 md:mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tighter leading-tight md:leading-none">
              왜 Oryx DataSafe인가?
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
              경쟁사는 '기록을 관리'하지만<br />
              Oryx는 '데이터 생성'부터 보호합니다
            </p>
          </motion.div>

          {/* 핵심 통계 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 비교 카테고리 선택 */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>

          {/* 비교 테이블 */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="col-span-5 font-bold text-lg">비교 항목</div>
              <div className="col-span-3 font-bold text-lg text-center">Oryx DataSafe</div>
              <div className="col-span-4 font-bold text-lg text-center">경쟁사 평균</div>
            </div>

            {/* 테이블 바디 */}
            <div className="divide-y divide-gray-200">
              {currentData.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-12 p-6 hover:bg-gray-50 transition-colors ${
                    item.highlight ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="col-span-5">
                    <div className="flex items-start gap-3">
                      {item.highlight && (
                        <Zap className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{item.feature}</div>
                        <div className="text-sm text-gray-600">{item.detail}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center justify-center">
                    {typeof item.oryx === 'boolean' ? (
                      item.oryx ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <Check className="w-6 h-6" />
                          <span className="font-semibold">지원</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <X className="w-6 h-6" />
                          <span>미지원</span>
                        </div>
                      )
                    ) : (
                      <div className="text-center">
                        <div className="font-bold text-purple-600 text-lg">{item.oryx}</div>
                      </div>
                    )}
                  </div>

                  <div className="col-span-4 flex items-center justify-center">
                    {typeof item.competitor === 'boolean' ? (
                      item.competitor ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <Check className="w-6 h-6" />
                          <span className="font-semibold">지원</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <X className="w-6 h-6" />
                          <span>미지원</span>
                        </div>
                      )
                    ) : (
                      <div className="text-center">
                        <div className="font-bold text-gray-600 text-lg">{item.competitor}</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 핵심 차별점 */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Oryx의 기술적 차별화</h2>
            <p className="text-xl text-gray-600">
              20년 현장 경험이 만든 차이
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: 'PLC 직접 연동',
                description: '경쟁사는 수기 입력에 의존하지만, Oryx는 PLC에서 직접 데이터를 수집합니다.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Lock,
                title: '원본 데이터 보호',
                description: '경쟁사는 DB 저장 후 암호화하지만, Oryx는 수집 즉시 암호화로 조작을 원천 차단합니다.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: GitBranch,
                title: '모든 장비 연동',
                description: '경쟁사는 일부 프로토콜만 지원하지만, Oryx는 모든 산업 표준을 지원합니다.',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              이제 선택할 시간입니다
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              20년 현장 경험의 차이를 직접 확인하세요
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('demo')}
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                실시간 데모 체험
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('contact')}
                className="px-8 py-4 bg-transparent text-white rounded-lg font-bold border-2 border-white hover:bg-white hover:text-purple-600 transition-all"
              >
                전문가 상담 신청
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Comparison;