import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Mic2,
  Calendar,
  Clock,
  Tag,
  Youtube,
  Rss,
  Search,
  Filter,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface Episode {
  id: number;
  episodeNumber: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  publishDate: string;
  tags: string[];
  category: string;
}

const Podcast: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredEpisode, setFeaturedEpisode] = useState<Episode | null>(null);

  // 샘플 에피소드 데이터 (실제 유튜브 ID로 교체 필요)
  const episodes: Episode[] = [
    {
      id: 1,
      episodeNumber: 'EP20',
      title: 'FDA 감사관이 가장 자주 지적하는 전자서명 오류 TOP 5',
      description: '20년 현장 경험을 바탕으로 실제 FDA 감사에서 가장 빈번하게 발견되는 21 CFR Part 11 위반 사항과 대응 방법을 공유합니다.',
      youtubeId: 'dQw4w9WgXcQ', // 실제 유튜브 ID로 교체
      duration: '18:32',
      publishDate: '2026-01-15',
      tags: ['FDA감사', '전자서명', '규제준수'],
      category: 'FDA 감사'
    },
    {
      id: 2,
      episodeNumber: 'EP19',
      title: '데이터 무결성 위반으로 50억 과징금? 실제 사례 분석',
      description: '국내 제약사에서 발생한 데이터 무결성 위반 사례를 심층 분석하고, ALCOA+ 원칙을 통한 예방법을 설명합니다.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '22:15',
      publishDate: '2026-01-08',
      tags: ['데이터무결성', 'ALCOA+', '사례연구'],
      category: '데이터 무결성'
    },
    {
      id: 3,
      episodeNumber: 'EP18',
      title: '감사 추적 기록, 이렇게 관리하면 안전합니다',
      description: 'Audit Trail의 핵심 요구사항과 실무에서 바로 적용 가능한 관리 방법을 단계별로 설명합니다.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '16:45',
      publishDate: '2026-01-01',
      tags: ['감사추적', 'AuditTrail', '실무가이드'],
      category: '시스템 관리'
    },
    {
      id: 4,
      episodeNumber: 'EP17',
      title: 'EU Annex 11 vs FDA 21 CFR Part 11: 핵심 차이점',
      description: '유럽과 미국 규제의 주요 차이점을 비교하고, 글로벌 규제 준수를 위한 통합 전략을 제시합니다.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '20:08',
      publishDate: '2025-12-25',
      tags: ['글로벌규제', 'Annex11', 'CFRPart11'],
      category: '규제 비교'
    },
    {
      id: 5,
      episodeNumber: 'EP16',
      title: '전자기록 밸리데이션, 처음부터 끝까지',
      description: 'IQ/OQ/PQ 프로토콜 작성부터 실행, 보고서 작성까지 전자기록 시스템 밸리데이션 전 과정을 다룹니다.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '25:30',
      publishDate: '2025-12-18',
      tags: ['밸리데이션', 'IQ/OQ/PQ', '전자기록'],
      category: '밸리데이션'
    },
    {
      id: 6,
      episodeNumber: 'EP15',
      title: '클라우드 시스템도 21 CFR Part 11 준수 가능할까?',
      description: '클라우드 환경에서의 규제 준수 가능성과 주의사항, 실제 도입 사례를 소개합니다.',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '19:22',
      publishDate: '2025-12-11',
      tags: ['클라우드', '시스템도입', '규제준수'],
      category: '시스템 도입'
    }
  ];

  const categories = ['전체', 'FDA 감사', '데이터 무결성', '시스템 관리', '규제 비교', '밸리데이션', '시스템 도입'];

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         episode.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayEpisode = (episode: Episode) => {
    setFeaturedEpisode(episode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
            <Mic2 className="w-4 h-4 inline-block mr-2" />
            Oryx 규제 준수 팟캐스트
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            현장의 <br />
            <span className="text-indigo-600">목소리</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            20년 현장 경험을 바탕으로 전하는 <br />
            21 CFR Part 11 실전 에피소드와 규제 준수 노하우
          </p>
        </AnimatedSection>

        {/* Featured Episode */}
        <AnimatedSection delay={0.2} className="mb-20">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[48px] p-8 lg:p-12 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-bold">최신 에피소드</p>
                <p className="text-2xl font-black">{episodes[0].episodeNumber}</p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              {featuredEpisode ? featuredEpisode.title : episodes[0].title}
            </h2>

            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              {featuredEpisode ? featuredEpisode.description : episodes[0].description}
            </p>

            {/* YouTube Player */}
            <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden mb-6 relative">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${featuredEpisode ? featuredEpisode.youtubeId : episodes[0].youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Episode Meta */}
            <div className="flex flex-wrap gap-4 items-center text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{featuredEpisode ? featuredEpisode.publishDate : episodes[0].publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{featuredEpisode ? featuredEpisode.duration : episodes[0].duration}</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-auto">
                {(featuredEpisode ? featuredEpisode.tags : episodes[0].tags).map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Search and Filter */}
        <AnimatedSection delay={0.3} className="mb-12">
          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-200">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="에피소드 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-3 overflow-x-auto">
                <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        px-4 py-2 rounded-xl font-bold transition-colors whitespace-nowrap text-sm
                        ${selectedCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }
                      `}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Episodes Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900">
              전체 에피소드
              <span className="text-indigo-600 ml-3">({filteredEpisodes.length})</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredEpisodes.map((episode, index) => (
              <AnimatedSection key={episode.id} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow h-full flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-500 overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg`}
                      alt={episode.title}
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePlayEpisode(episode)}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Play className="w-8 h-8 text-indigo-600 ml-1" />
                      </motion.button>
                    </div>
                    <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-indigo-600 text-sm font-black rounded-full">
                      {episode.episodeNumber}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                      {episode.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                      {episode.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{episode.publishDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{episode.duration}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {episode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePlayEpisode(episode)}
                        className="flex-1 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        재생하기
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${episode.youtubeId}`, '_blank')}
                        className="px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredEpisodes.length === 0 && (
          <AnimatedSection className="text-center py-20">
            <p className="text-2xl text-slate-600 mb-4">검색 결과가 없습니다</p>
            <p className="text-slate-500">다른 검색어나 카테고리를 시도해보세요.</p>
          </AnimatedSection>
        )}

        {/* Subscribe Section */}
        <AnimatedSection delay={0.5} className="mt-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[48px] p-12 lg:p-16 text-center">
            <Rss className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              팟캐스트 구독하기
            </h2>
            <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
              매주 새로운 에피소드를 가장 먼저 받아보세요. <br />
              현장 전문가의 생생한 인사이트를 놓치지 마세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.youtube.com/@oryxdatasafe"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-colors flex items-center justify-center gap-3 text-sm sm:text-base whitespace-nowrap"
              >
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                YouTube 구독
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-3 text-sm sm:text-base whitespace-nowrap"
              >
                <Rss className="w-5 h-5 sm:w-6 sm:h-6" />
                RSS 피드
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Podcast;
