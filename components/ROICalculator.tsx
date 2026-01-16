import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock,
  Calculator,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { ViewType } from '../App';

interface ROICalculatorProps {
  setView: (view: ViewType) => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ setView }) => {
  const [monthlyBatches, setMonthlyBatches] = useState<number>(1000);
  const [avgPersonnelCost, setAvgPersonnelCost] = useState<number>(4000000);
  const [currentPersonnel, setCurrentPersonnel] = useState<number>(3);
  const [manualDataEntry, setManualDataEntry] = useState<number>(80);

  // 계산 로직
  const calculateROI = () => {
    // 현재 비용 (경쟁사 솔루션)
    const currentMonthlyCost = currentPersonnel * avgPersonnelCost;
    const currentAnnualCost = currentMonthlyCost * 12;
    
    // Oryx 도입 후 비용
    const oryxPersonnel = Math.max(1, Math.floor(currentPersonnel * (1 - manualDataEntry / 100)));
    const oryxMonthlyCost = oryxPersonnel * avgPersonnelCost;
    const oryxAnnualCost = oryxMonthlyCost * 12;
    
    // 절감액
    const monthlySavings = currentMonthlyCost - oryxMonthlyCost;
    const annualSavings = currentAnnualCost - oryxAnnualCost;
    
    // ROI
    const implementationCost = 50000000; // 5천만원 (평균 구축 비용)
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100;
    const paybackMonths = implementationCost / monthlySavings;
    
    // 추가 절감 효과
    const auditTimeSavings = monthlyBatches * 0.5 * 50000; // 배치당 30분 절감, 시간당 5만원
    const dataIntegritySavings = monthlyBatches * 0.2 * 100000; // 데이터 오류 감소로 인한 절감
    
    return {
      currentMonthlyCost,
      currentAnnualCost,
      oryxMonthlyCost,
      oryxAnnualCost,
      oryxPersonnel,
      monthlySavings,
      annualSavings,
      roi,
      paybackMonths,
      auditTimeSavings,
      dataIntegritySavings,
      totalAnnualSavings: annualSavings + (auditTimeSavings * 12) + (dataIntegritySavings * 12)
    };
  };

  const results = calculateROI();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(value));
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
            <Calculator className="w-4 h-4" />
            투자 대비 효과 시뮬레이터
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            ROI 계산기
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            귀사의 현황을 입력하고<br />
            Oryx DataSafe 도입 시 절감 효과를 확인하세요
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 섹션 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Users className="w-7 h-7 text-blue-600" />
                현재 운영 현황
              </h2>

              <div className="space-y-6">
                {/* 월간 배치 수 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    월간 배치 기록 수
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={monthlyBatches}
                    onChange={(e) => setMonthlyBatches(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">100건</span>
                    <span className="text-2xl font-bold text-blue-600">{formatNumber(monthlyBatches)}건</span>
                    <span className="text-sm text-gray-500">5,000건</span>
                  </div>
                </div>

                {/* 평균 인건비 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    직원 1인당 월 평균 인건비
                  </label>
                  <input
                    type="range"
                    min="3000000"
                    max="8000000"
                    step="500000"
                    value={avgPersonnelCost}
                    onChange={(e) => setAvgPersonnelCost(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">300만원</span>
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(avgPersonnelCost)}</span>
                    <span className="text-sm text-gray-500">800만원</span>
                  </div>
                </div>

                {/* 현재 투입 인력 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    현재 데이터 관리 투입 인력
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={currentPersonnel}
                    onChange={(e) => setCurrentPersonnel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">1명</span>
                    <span className="text-2xl font-bold text-blue-600">{currentPersonnel}명</span>
                    <span className="text-sm text-gray-500">10명</span>
                  </div>
                </div>

                {/* 수기 입력 비율 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    수기 데이터 입력 비율
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={manualDataEntry}
                    onChange={(e) => setManualDataEntry(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">50%</span>
                    <span className="text-2xl font-bold text-blue-600">{manualDataEntry}%</span>
                    <span className="text-sm text-gray-500">100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 참고 정보 */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">계산 기준</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 구축 비용: 평균 5천만원 (밸리데이션 포함)</li>
                    <li>• 감사 대응 시간: 배치당 30분 절감</li>
                    <li>• 데이터 오류 감소: 배치당 평균 10만원 절감</li>
                    <li>• 자동화율: 수기 입력 비율 만큼 인력 감소</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 결과 섹션 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* 주요 지표 */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: DollarSign,
                  label: '연간 절감액',
                  value: formatCurrency(results.totalAnnualSavings),
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: TrendingUp,
                  label: 'ROI',
                  value: `${formatNumber(results.roi)}%`,
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Clock,
                  label: '투자 회수 기간',
                  value: `${formatNumber(results.paybackMonths)}개월`,
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Users,
                  label: '필요 인력',
                  value: `${results.oryxPersonnel}명`,
                  color: 'from-orange-500 to-red-500'
                }
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white rounded-xl shadow-lg border border-gray-200"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* 상세 비교 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">비용 비교</h2>

              <div className="space-y-6">
                {/* 현재 비용 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">현재 운영 비용 (연간)</span>
                    <span className="text-xl font-bold text-red-600">{formatCurrency(results.currentAnnualCost)}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">인력 {currentPersonnel}명 × 월 {formatCurrency(avgPersonnelCost)}</p>
                </div>

                {/* Oryx 비용 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Oryx 도입 후 (연간)</span>
                    <span className="text-xl font-bold text-green-600">{formatCurrency(results.oryxAnnualCost)}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                      style={{ width: `${(results.oryxAnnualCost / results.currentAnnualCost) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">인력 {results.oryxPersonnel}명 × 월 {formatCurrency(avgPersonnelCost)}</p>
                </div>

                {/* 절감액 */}
                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">총 절감액 (연간)</span>
                    <span className="text-3xl font-bold text-green-600">{formatCurrency(results.totalAnnualSavings)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 효과 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                추가 절감 효과
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-green-800">감사 대응 시간 절감 (연간)</span>
                  <span className="font-bold text-green-900">{formatCurrency(results.auditTimeSavings * 12)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-800">데이터 오류 감소 (연간)</span>
                  <span className="font-bold text-green-900">{formatCurrency(results.dataIntegritySavings * 12)}</span>
                </div>
                <div className="pt-2 border-t border-green-300">
                  <div className="flex items-center justify-between">
                    <span className="text-green-900 font-semibold">3년 누적 절감액</span>
                    <span className="font-bold text-green-900 text-lg">{formatCurrency(results.totalAnnualSavings * 3)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView('contact')}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              맞춤 견적 상담 신청
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;