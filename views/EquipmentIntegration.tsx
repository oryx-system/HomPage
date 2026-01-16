import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Radio, 
  Shield, 
  Zap, 
  Lock, 
  Activity,
  CheckCircle2,
  ArrowRight,
  Database,
  GitBranch,
  Layers,
  Network
} from 'lucide-react';
import type { ViewType } from '../App';

interface EquipmentIntegrationProps {
  setView: (view: ViewType) => void;
}

const EquipmentIntegration: React.FC<EquipmentIntegrationProps> = ({ setView }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('opc');

  const protocols = [
    {
      id: 'opc',
      name: 'OPC UA',
      icon: Network,
      description: '산업 표준 프로토콜',
      compatibility: '99%',
      devices: 'Siemens, Rockwell, Schneider'
    },
    {
      id: 'modbus',
      name: 'Modbus TCP/IP',
      icon: Radio,
      description: '레거시 장비 지원',
      compatibility: '95%',
      devices: 'Yokogawa, Honeywell, ABB'
    },
    {
      id: 'ethernet',
      name: 'EtherNet/IP',
      icon: GitBranch,
      description: 'Allen-Bradley 최적화',
      compatibility: '98%',
      devices: 'Rockwell Automation'
    },
    {
      id: 'profinet',
      name: 'PROFINET',
      icon: Layers,
      description: 'Siemens 전용',
      compatibility: '99%',
      devices: 'Siemens S7-1200/1500'
    }
  ];

  const plcBrands = [
    {
      name: 'Siemens',
      series: ['S7-1200', 'S7-1500', 'S7-300/400'],
      protocol: 'OPC UA, PROFINET',
      realtime: 'Sub-10ms',
      status: 'verified'
    },
    {
      name: 'Allen-Bradley',
      series: ['ControlLogix', 'CompactLogix', 'MicroLogix'],
      protocol: 'EtherNet/IP, OPC UA',
      realtime: 'Sub-15ms',
      status: 'verified'
    },
    {
      name: 'Mitsubishi',
      series: ['MELSEC-Q', 'iQ-R', 'FX5'],
      protocol: 'Modbus TCP, MC Protocol',
      realtime: 'Sub-20ms',
      status: 'verified'
    },
    {
      name: 'LS Electric',
      series: ['XGT', 'XGB', 'MASTER-K'],
      protocol: 'Modbus TCP, Cnet',
      realtime: 'Sub-20ms',
      status: 'verified'
    },
    {
      name: 'Schneider Electric',
      series: ['Modicon M580', 'M340', 'M221'],
      protocol: 'Modbus TCP, OPC UA',
      realtime: 'Sub-25ms',
      status: 'verified'
    },
    {
      name: 'Yokogawa',
      series: ['CENTUM VP', 'ProSafe-RS'],
      protocol: 'OPC UA, Modbus',
      realtime: 'Sub-30ms',
      status: 'certified'
    }
  ];

  const dataFlowSteps = [
    {
      step: 1,
      title: 'PLC 실시간 수집',
      description: '온도, 압력, 유량 등 공정 데이터 실시간 모니터링',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: 2,
      title: 'AES-256 암호화',
      description: '수집 즉시 암호화로 데이터 조작 원천 차단',
      icon: Lock,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 3,
      title: 'ALCOA+ 검증',
      description: '귀속성, 판독성, 동시성, 원본성, 정확성 자동 검증',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: 4,
      title: '전자서명 적용',
      description: '21 CFR Part 11 준수 전자서명 자동 적용',
      icon: Shield,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <Cpu className="w-4 h-4" />
              PLC 직접 연동 전문 전자서명 시스템
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-huge font-black mb-8 md:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tighter leading-tight md:leading-none">
              모든 장비와 대화합니다
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-3xl mx-auto">
              20년 현장 엔지니어링 경험으로 설계된<br />
              제약 공정 장비 직접 연동 솔루션
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('demo')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                실시간 데모 체험
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('contact')}
                className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-600 transition-all"
              >
                기술 상담 신청
              </motion.button>
            </div>
          </motion.div>

          {/* 지원 프로토콜 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid md:grid-cols-4 gap-4"
          >
            {protocols.map((protocol) => {
              const Icon = protocol.icon;
              return (
                <motion.div
                  key={protocol.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProtocol(protocol.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    selectedProtocol === protocol.id
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl'
                      : 'bg-white hover:shadow-lg border border-gray-200'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${selectedProtocol === protocol.id ? 'text-white' : 'text-blue-600'}`} />
                  <h3 className="font-bold text-lg mb-1">{protocol.name}</h3>
                  <p className={`text-sm mb-2 ${selectedProtocol === protocol.id ? 'text-blue-100' : 'text-gray-600'}`}>
                    {protocol.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={selectedProtocol === protocol.id ? 'text-blue-100' : 'text-gray-500'}>
                      호환성
                    </span>
                    <span className="font-bold">{protocol.compatibility}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 지원 장비 목록 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">검증된 장비 연동</h2>
            <p className="text-xl text-gray-600">
              글로벌 주요 PLC 제조사 100% 호환
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plcBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{brand.name}</h3>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-semibold">{brand.status === 'verified' ? '검증 완료' : '인증 완료'}</span>
                    </div>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-600" />
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">지원 시리즈</p>
                    <p className="text-sm text-gray-700">{brand.series.join(', ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">통신 프로토콜</p>
                    <p className="text-sm text-gray-700">{brand.protocol}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs text-gray-500">실시간 수집</span>
                    <span className="text-sm font-bold text-blue-600">{brand.realtime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 데이터 플로우 */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">데이터 무결성 보장 프로세스</h2>
            <p className="text-xl text-gray-600">
              수집부터 서명까지, 완벽한 자동화
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataFlowSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative"
                >
                  <div className="p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-sm font-bold text-gray-400">STEP {item.step}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {index < dataFlowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              경쟁사는 '기록을 관리'하지만<br />
              Oryx는 '데이터 생성'부터 보호합니다
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              20년 현장 경험의 차이를 직접 확인하세요
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('demo')}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Activity className="w-5 h-5" />
                실시간 연동 데모 체험
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('contact')}
                className="px-8 py-4 bg-transparent text-white rounded-lg font-bold border-2 border-white hover:bg-white hover:text-blue-600 transition-all"
              >
                전문가 상담 예약
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EquipmentIntegration;