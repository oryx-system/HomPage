import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  BookOpen,
  FileCheck,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2,
  Search
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'whitepaper' | 'guide' | 'checklist' | 'case-study';
  category: string;
  pages: number;
  downloads: number;
  icon: React.ReactNode;
  fileSize: string;
}

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('전체');

  const resources: Resource[] = [
    {
      id: 1,
      title: 'FDA 21 CFR Part 11 완벽 준수 가이드',
      description: 'FDA 전자기록 규제의 모든 요구사항을 상세히 설명하고, 실무 적용 방법을 제시하는 종합 가이드입니다.',
      type: 'whitepaper',
      category: '규제 준수',
      pages: 45,
      downloads: 1523,
      icon: <Shield className="w-8 h-8" />,
      fileSize: '3.2 MB'
    },
    {
      id: 2,
      title: 'ALCOA+ 데이터 무결성 체크리스트',
      description: '데이터 무결성 원칙 ALCOA+의 각 항목별 점검 사항과 준수 방법을 정리한 실무 체크리스트입니다.',
      type: 'checklist',
      category: '데이터 무결성',
      pages: 12,
      downloads: 2847,
      icon: <FileCheck className="w-8 h-8" />,
      fileSize: '850 KB'
    },
    {
      id: 3,
      title: '글로벌 제약사 도입 사례 연구',
      description: '국내외 주요 제약사의 Oryx DataSafe 도입 사례와 ROI 분석, 성공 요인을 분석한 케이스 스터디입니다.',
      type: 'case-study',
      category: '도입 사례',
      pages: 28,
      downloads: 1256,
      icon: <Users className="w-8 h-8" />,
      fileSize: '4.5 MB'
    },
    {
      id: 4,
      title: '전자서명 시스템 선택 가이드',
      description: '제약 및 바이오 산업에 최적화된 전자서명 시스템 선택을 위한 핵심 기준과 평가 방법을 제시합니다.',
      type: 'guide',
      category: '시스템 선택',
      pages: 32,
      downloads: 1894,
      icon: <BookOpen className="w-8 h-8" />,
      fileSize: '2.8 MB'
    },
    {
      id: 5,
      title: '감사 추적 시스템 구축 백서',
      description: '효과적인 감사 추적 시스템의 설계 원칙과 구현 방법, 운영 전략을 상세히 다룬 기술 백서입니다.',
      type: 'whitepaper',
      category: '기술',
      pages: 38,
      downloads: 967,
      icon: <FileText className="w-8 h-8" />,
      fileSize: '3.9 MB'
    },
    {
      id: 6,
      title: 'ROI 계산 및 비용 절감 분석',
      description: 'Oryx DataSafe 도입 시 예상되는 비용 절감 효과와 투자 대비 수익률을 계산하는 방법을 안내합니다.',
      type: 'guide',
      category: '비즈니스',
      pages: 18,
      downloads: 2134,
      icon: <TrendingUp className="w-8 h-8" />,
      fileSize: '1.5 MB'
    }
  ];

  const types = [
    { key: '전체', label: '전체', icon: <FileText className="w-5 h-5" /> },
    { key: 'whitepaper', label: '백서', icon: <Shield className="w-5 h-5" /> },
    { key: 'guide', label: '가이드', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'checklist', label: '체크리스트', icon: <FileCheck className="w-5 h-5" /> },
    { key: 'case-study', label: '케이스 스터디', icon: <Users className="w-5 h-5" /> }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === '전체' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (resource: Resource) => {
    alert(`"${resource.title}" 다운로드를 시작합니다. (데모 버전)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-600/10 border border-purple-600/20 text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
            Resource Center
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            전문 자료 <br />
            <span className="text-purple-600">다운로드</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            규제 준수와 시스템 도입을 위한 <br />
            전문 백서, 가이드, 체크리스트를 무료로 제공합니다.
          </p>
        </AnimatedSection>

        {/* Search and Filter */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-200">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="자료명 또는 키워드로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-3">
              {types.map((type) => (
                <motion.button
                  key={type.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(type.key)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors
                    ${selectedType === type.key
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }
                  `}
                >
                  {type.icon}
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredResources.map((resource, index) => (
            <AnimatedSection key={resource.id} delay={0.1 * index}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                    {resource.icon}
                  </div>
                  <div className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                    {resource.category}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                  {resource.description}
                </p>

                {/* Meta Info */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">페이지</p>
                    <p className="text-lg font-black text-slate-900">{resource.pages}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">다운로드</p>
                    <p className="text-lg font-black text-slate-900">{resource.downloads.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">파일 크기</p>
                    <p className="text-lg font-black text-slate-900">{resource.fileSize}</p>
                  </div>
                </div>

                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload(resource)}
                  className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  무료 다운로드
                </motion.button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <AnimatedSection className="text-center py-20">
            <p className="text-2xl text-slate-600 mb-4">검색 결과가 없습니다</p>
            <p className="text-slate-500">다른 검색어나 카테고리를 시도해보세요.</p>
          </AnimatedSection>
        )}

        {/* Contact Section */}
        <AnimatedSection delay={0.4} className="mt-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[48px] p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                  맞춤형 자료가 <br />
                  필요하신가요?
                </h2>
                <p className="text-slate-300 text-xl mb-8 leading-relaxed">
                  귀사의 특정 요구사항에 맞춘 맞춤형 자료 제작 및 <br />
                  전문 컨설팅을 제공합니다.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    '산업별 맞춤 가이드',
                    '시스템 도입 로드맵',
                    '비용 분석 리포트',
                    '규제 대응 전략'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                      <span className="text-slate-200 text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-[32px] p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-6">문의하기</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="이름"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="이메일"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="회사명"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <textarea
                    placeholder="필요하신 자료에 대해 설명해주세요"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    문의 제출하기
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Resources;
