import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle2
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Portal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 데모용 로그인 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      alert('데모 버전입니다. 실제 로그인 기능은 백엔드 연동 후 사용 가능합니다.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Information */}
          <AnimatedSection direction="left">
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-400/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
                Customer Portal
              </div>
              <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                안전한 <br />
                <span className="text-blue-400">고객 포털</span>
              </h1>
              <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                Oryx DataSafe 고객 포털에 로그인하여 <br />
                시스템 현황, 감사 리포트, 기술 지원을 받아보세요.
              </p>

              {/* Features */}
              <div className="space-y-6">
                {[
                  '실시간 시스템 모니터링',
                  '감사 추적 리포트 다운로드',
                  '24/7 기술 지원 티켓',
                  '시스템 업데이트 알림'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-slate-300 text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Side - Login Form */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="bg-white rounded-[48px] p-12 shadow-2xl">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-8 mx-auto">
                <Shield className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-black text-slate-900 text-center mb-3">
                로그인
              </h2>
              <p className="text-slate-600 text-center mb-10">
                고객 포털에 접속하세요
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-slate-900 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-600 font-medium">로그인 상태 유지</span>
                  </label>
                  <button
                    type="button"
                    className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                  >
                    비밀번호 찾기
                  </button>
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <LogIn className="w-6 h-6" />
                      </motion.div>
                      로그인 중...
                    </>
                  ) : (
                    <>
                      로그인
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">또는</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-slate-600 mb-4">아직 계정이 없으신가요?</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  회원가입
                </motion.button>
              </div>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900 leading-relaxed">
                    <strong className="font-bold">보안 알림:</strong> 이 포털은 21 CFR Part 11을 준수하는 
                    보안 시스템으로 보호됩니다. 모든 로그인 시도는 감사 추적에 기록됩니다.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Info */}
        <AnimatedSection delay={0.6} className="mt-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-[32px] p-8 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">계정이 필요하신가요?</h3>
                <p className="text-slate-400">
                  영업팀에 문의하여 Oryx DataSafe 라이선스를 받아보세요.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                영업팀 문의하기
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Portal;
