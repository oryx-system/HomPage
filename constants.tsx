
import React from 'react';
import { ShieldCheck, FileCheck, History, Fingerprint, Lock, Database } from 'lucide-react';
import { Feature, ComplianceStandard } from './types';

export const FEATURES: Feature[] = [
  {
    title: "생체 인식 검증",
    description: "생체 인식 통합을 포함한 다중 요소 인증을 통해 21 CFR Part 11의 전자서명 부인 방지 요구사항을 충족합니다.",
    icon: <Fingerprint className="w-6 h-6 text-blue-400" />
  },
  {
    title: "동적 감사 추적 (Audit Trail)",
    description: "사용자의 모든 행위와 시퀀스를 날짜, 시간과 함께 기록하는 타임스탬프 전자 감사 추적 기능을 제공합니다.",
    icon: <History className="w-6 h-6 text-indigo-400" />
  },
  {
    title: "데이터 무결성 (ALCOA+)",
    description: "기록의 귀속성, 판독성, 동시성, 원본성 및 정확성(ALCOA+)을 수명 주기 전반에 걸쳐 지원합니다.",
    icon: <Database className="w-6 h-6 text-purple-400" />
  },
  {
    title: "버전 관리 시스템",
    description: "엄격한 Check-in/Check-out 기능과 개정 이력을 포함한 정교한 문서 수명 주기 관리 기능을 제공합니다.",
    icon: <FileCheck className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "시스템 보안 및 접근 제어",
    description: "글로벌 GxP 표준을 충족하는 역할 기반 접근 제어(RBAC)와 강력한 암호화 기술을 적용합니다.",
    icon: <Lock className="w-6 h-6 text-red-400" />
  },
  {
    title: "밸리데이션 즉시 대응",
    description: "VMP(Validation Master Plan) 및 IQ/OQ/PQ 프로토콜이 포함된 밸리데이션 준비 플랫폼을 제공합니다.",
    icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
  }
];

export const COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  {
    id: "21cfr11",
    title: "FDA 21 CFR Part 11",
    details: [
      "접근 제어가 필요한 폐쇄형 시스템 대응",
      "권한 확인 및 장치 체크 자동화",
      "감사 추적 보호 및 데이터 보존 정책 준수",
      "전자서명 명시 요구사항(Signature Manifest) 충족",
      "비생체 인식 및 생체 인식 서명 규칙 적용"
    ]
  },
  {
    id: "annex11",
    title: "EU EudraLex Annex 11",
    details: [
      "컴퓨터 시스템의 리스크 관리 프로세스 구축",
      "레거시 및 신규 시스템에 대한 밸리데이션 지원",
      "정확한 백업 및 복구 프로세스 지원",
      "비즈니스 연속성 관리(BCM) 체계 마련",
      "자가 점검 및 외부 감사 대응 리포트 제공"
    ]
  }
];
