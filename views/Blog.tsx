import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import AnimatedSection from '../components/AnimatedSection';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: Date;
  readTime: string;
  image: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'FDA 21 CFR Part 11 준수를 위한 필수 체크리스트',
      excerpt: '제약 및 바이오 기업이 FDA 규제를 준수하기 위해 확인해야 할 핵심 요구사항들을 정리했습니다.',
      category: '규제 준수',
      author: '오릭스 시스템 규제팀',
      date: new Date(2026, 0, 10),
      readTime: '8분',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      tags: ['FDA', '규제', '체크리스트']
    },
    {
      id: 2,
      title: '데이터 무결성 위반 사례로 배우는 ALCOA+ 원칙',
      excerpt: '실제 발생한 데이터 무결성 위반 사례를 분석하고, ALCOA+ 원칙을 통해 어떻게 예방할 수 있는지 알아봅니다.',
      category: '데이터 무결성',
      author: '김영수 컴플라이언스 전문가',
      date: new Date(2026, 0, 5),
      readTime: '12분',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      tags: ['ALCOA+', '사례연구', '데이터무결성']
    },
    {
      id: 3,
      title: '전자서명 시스템 도입 시 고려해야 할 10가지',
      excerpt: '전자서명 시스템 도입을 고려 중이신가요? 성공적인 구축을 위한 핵심 고려사항을 소개합니다.',
      category: '시스템 도입',
      author: '이정민 솔루션 아키텍트',
      date: new Date(2025, 11, 28),
      readTime: '10분',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
      tags: ['전자서명', '시스템구축', '도입가이드']
    },
    {
      id: 4,
      title: 'EU Annex 11 vs FDA 21 CFR Part 11: 무엇이 다를까?',
      excerpt: '유럽과 미국의 전자기록 규제 차이점을 비교 분석하고, 글로벌 규제 준수 전략을 제시합니다.',
      category: '규제 준수',
      author: '박서연 글로벌 규제 전문가',
      date: new Date(2025, 11, 20),
      readTime: '15분',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
      tags: ['Annex11', 'CFRPart11', '글로벌규제']
    },
    {
      id: 5,
      title: '감사 추적(Audit Trail) 가이드',
      excerpt: '효과적인 감사 추적 시스템 구축 방법과 FDA 감사 대응 전략을 상세히 설명합니다.',
      category: '기술 가이드',
      author: '최동욱 시스템 엔지니어',
      date: new Date(2025, 11, 15),
      readTime: '20분',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      tags: ['감사추적', 'AuditTrail', '기술가이드']
    },
    {
      id: 6,
      title: '클라우드 vs 온프레미스: 제약업계 시스템 선택 가이드',
      excerpt: '제약 및 바이오 기업의 특수한 요구사항을 고려한 최적의 인프라 선택 방법을 제시합니다.',
      category: '시스템 도입',
      author: '강민호 인프라 전문가',
      date: new Date(2025, 11, 10),
      readTime: '18분',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      tags: ['클라우드', '온프레미스', '인프라']
    }
  ];

  const categories = ['전체', '규제 준수', '데이터 무결성', '시스템 도입', '기술 가이드'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
            Knowledge Hub
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-huge font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            규제 준수 <br />
            <span className="text-blue-600">인사이트</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            데이터 무결성, 규제 준수, 시스템 도입에 관한 <br />
            전문가의 인사이트와 실무 가이드를 제공합니다.
          </p>
        </AnimatedSection>

        {/* Search and Filter */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-200">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-3 rounded-xl font-bold transition-colors
                      ${selectedCategory === category
                        ? 'bg-blue-600 text-white'
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
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={0.1 * index}>
              <motion.article
                whileHover={{ y: -8 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(post.date, 'yyyy년 M월 d일', { locale: ko })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-blue-600 font-black hover:text-blue-700 transition-colors"
                  >
                    자세히 읽기
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Author */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      작성자: <span className="font-bold text-slate-900">{post.author}</span>
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <AnimatedSection className="text-center py-20">
            <p className="text-2xl text-slate-600 mb-4">검색 결과가 없습니다</p>
            <p className="text-slate-500">다른 검색어나 카테고리를 시도해보세요.</p>
          </AnimatedSection>
        )}

        {/* Newsletter Section */}
        <AnimatedSection delay={0.4} className="mt-20">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[48px] p-12 lg:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              최신 인사이트를 받아보세요
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              규제 준수와 데이터 무결성에 관한 최신 정보를 이메일로 받아보세요.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 rounded-2xl border-2 border-transparent focus:border-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                구독하기
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Blog;
