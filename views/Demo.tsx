import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle2, 
  FileSignature, 
  Shield, 
  Database,
  Clock,
  User,
  Lock
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface DemoStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
}

const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps: DemoStep[] = [
    {
      id: 1,
      title: '사용자 인증',
      description: '생체 인식 및 다중 요소 인증을 통한 안전한 로그인',
      icon: <User className="w-8 h-8" />,
      status: currentStep >= 1 ? 'completed' : currentStep === 0 ? 'active' : 'pending',
    },
    {
      id: 2,
      title: '문서 접근',
      description: '역할 기반 접근 제어(RBAC)로 권한 확인',
      icon: <Lock className="w-8 h-8" />,
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'active' : 'pending',
    },
    {
      id: 3,
      title: '데이터 무결성 검증',
      description: 'ALCOA+ 원칙에 따른 실시간 데이터 검증',
      icon: <Database className="w-8 h-8" />,
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'active' : 'pending',
    },
    {
      id: 4,
      title: '전자 서명',
      description: 'FDA 21 CFR Part 11 준수 전자 서명 생성',
      icon: <FileSignature className="w-8 h-8" />,
      status: currentStep >= 4 ? 'completed' : currentStep === 3 ? 'active' : 'pending',
    },
    {
      id: 5,
      title: '감사 추적 기록',
      description: '타임스탬프 포함 모든 활동 자동 기록',
      icon: <Clock className="w-8 h-8" />,
      status: currentStep >= 5 ? 'completed' : currentStep === 4 ? 'active' : 'pending',
    },
    {
      id: 6,
      title: '보안 저장',
      description: '암호화된 안전한 저장소에 데이터 보관',
      icon: <Shield className="w-8 h-8" />,
      status: currentStep >= 6 ? 'completed' : currentStep === 5 ? 'active' : 'pending',
    },
  ];

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demoSteps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
            Interactive Demo
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            실시간 <br />
            <span className="text-blue-600">시스템 체험</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Oryx DataSafe의 핵심 기능을 실시간으로 체험해보세요. <br />
            FDA 21 CFR Part 11 준수 프로세스를 단계별로 확인할 수 있습니다.
          </p>
        </AnimatedSection>

        {/* Demo Control Panel */}
        <AnimatedSection delay={0.2} className="mb-16">
          <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">데모 컨트롤</h3>
                  <p className="text-slate-600">단계: {currentStep + 1} / {demoSteps.length}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startDemo}
                  disabled={isPlaying}
                  className="px-8 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? '진행 중...' : '데모 시작'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetDemo}
                  className="px-8 py-4 bg-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-3"
                >
                  <RefreshCw className="w-5 h-5" />
                  초기화
                </motion.button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Demo Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoSteps.map((step, index) => (
            <AnimatedSection key={step.id} delay={0.1 * index}>
              <motion.div
                animate={{
                  scale: step.status === 'active' ? 1.05 : 1,
                }}
                className={`
                  relative p-8 rounded-[32px] border-2 transition-all duration-500
                  ${step.status === 'completed' 
                    ? 'bg-green-50 border-green-500 shadow-lg shadow-green-500/20' 
                    : step.status === 'active'
                    ? 'bg-blue-50 border-blue-500 shadow-xl shadow-blue-500/30'
                    : 'bg-white border-slate-200'
                  }
                `}
              >
                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <AnimatePresence mode="wait">
                    {step.status === 'completed' && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </motion.div>
                    )}
                    {step.status === 'active' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <RefreshCw className="w-8 h-8 text-blue-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors
                  ${step.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : step.status === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                  }
                `}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  {step.id}. {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Progress Bar */}
                {step.status === 'active' && (
                  <motion.div
                    className="mt-6 h-2 bg-slate-200 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'linear' }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Demo Complete Message */}
        <AnimatePresence>
          {currentStep >= demoSteps.length - 1 && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-16 text-center"
            >
              <div className="inline-block p-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[48px] shadow-2xl">
                <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-6" />
                <h2 className="text-4xl font-black text-white mb-4">데모 완료!</h2>
                <p className="text-white/90 text-xl max-w-2xl mx-auto mb-8">
                  Oryx DataSafe의 전체 프로세스를 성공적으로 체험하셨습니다. <br />
                  지금 바로 실제 시스템을 도입해보세요.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetDemo}
                  className="px-10 py-5 bg-white text-green-600 font-black rounded-xl hover:bg-slate-50 transition-colors"
                >
                  다시 체험하기
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="bg-slate-900 rounded-[48px] p-12 lg:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              실제 시스템을 경험하고 싶으신가요?
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
              전문 컨설턴트와 함께 귀사의 환경에 맞는 맞춤형 데모를 받아보세요.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors text-xl"
            >
              전문가 상담 신청하기
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Demo;
