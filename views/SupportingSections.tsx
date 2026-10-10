import { useLanguage } from "../i18n";
import {
  Check,
  ClipboardCheck,
  ExternalLink,
  Mail,
  Search,
  ShieldCheck,
  Signature,
  Database,
  LockKeyhole,
  ClipboardList,
} from "lucide-react";

const email = "schong@oryxsystem.co.kr";
const phone = "010-6545-0415";
const regulationUrl =
  "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11";

export function ImplementationSection() {
  const { t } = useLanguage();
  const steps = [
    {
      title: "현장과 요구사항 확인",
      description: "대상 업무, 기록 종류, 설비와 기존 시스템을 함께 살펴봅니다.",
    },
    {
      title: "적용 범위와 구성 검토",
      description:
        "필요한 기능과 연결 조건을 확인하고 구현 가능 범위 및 제외 범위를 정리합니다.",
    },
    {
      title: "도입 계획 협의",
      description:
        "구성·일정·산출물·계약 조건과 검증 요구·지원 범위를 협의합니다.",
    },
    {
      title: "검증과 운영 준비",
      description:
        "합의한 범위에 따라 적용 결과를 확인하고 현장 절차·사용자 교육·운영 책임을 점검합니다.",
    },
  ];

  return (
    <section id="implementation" className="section supporting-section" data-main-section tabIndex={-1} aria-labelledby="implementation-heading">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{t("IMPLEMENTATION")}</p>
          <h2 id="implementation-heading">{t("현장의 요구에서 시작하는 도입 과정")}</h2>
          <p>{t("기능, 구성, 일정과 지원 범위는 실제 요구사항을 검토한 뒤 협의합니다. 프로젝트별 진행 방식과 산출물은 상담 및 계약에서 정합니다.")}</p>
        </div>
        <ol className="flow-steps">
          {steps.map((step, index) => (
            <li className="card reveal" key={step.title}>
              <span className="card-number">0{index + 1}</span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.description)}</p>
            </li>
          ))}
        </ol>
        <div className="supporting-details">
          <article className="card reveal">
            <div className="card-icon"><ClipboardCheck size={25} aria-hidden="true" /></div>
            <h3>{t("첫 상담에 필요한 정보")}</h3>
            <ul className="check-list">
              <li><Check size={16} aria-hidden="true" /><span>{t("개선하려는 업무와 현재의 불편 사항")}</span></li>
              <li><Check size={16} aria-hidden="true" /><span>{t("대상 기록·설비와 관련 시스템")}</span></li>
              <li><Check size={16} aria-hidden="true" /><span>{t("사용 부서와 예상 사용자 규모")}</span></li>
              <li><Check size={16} aria-hidden="true" /><span>{t("희망 일정과 내부 검증 요구")}</span></li>
            </ul>
            <p className="form-note">{t("초기 문의에는 기밀 자료, 비밀번호, 개인정보를 포함하지 않아도 됩니다.")}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ValidationSection() {
  const { t } = useLanguage();
  return (
    <section id="validation" className="section supporting-section" data-main-section tabIndex={-1} aria-labelledby="validation-heading">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{t("SYSTEM · PROCESS · VALIDATION")}</p>
          <h2 id="validation-heading">{t("규제 검토는 기능과 운영을 함께.")}</h2>
          <p>{t("21 CFR Part 11과 ALCOA 원칙의 관련 요구사항을 고려해 설계합니다. 실제 적합성은 지원 기능, 설정, 사용 목적과 고객의 절차·교육·검증을 함께 평가해야 합니다. 제품 자체의 외부 인증이나 규정 충족을 의미하지 않습니다.")}</p>
        </div>
        <div className="grid-3">
          <article className="card reveal">
            <div className="card-icon"><Search size={25} aria-hidden="true" /></div>
            <h3>{t("어떤 기록을 관리하나요?")}</h3>
            <p>{t("기록의 생성 지점, 작성자, 검토자와 사용 목적을 정리하세요. 원본과 사본의 관계, 변경과 보관 요구도 함께 살펴봅니다.")}</p>
          </article>
          <article className="card reveal">
            <div className="card-icon"><Signature size={25} aria-hidden="true" /></div>
            <h3>{t("누가 무엇을 승인하나요?")}</h3>
            <p>{t("서명자의 식별과 권한, 서명의 의미, 승인 단계와 기록의 연결을 정리하세요. 현재 사용하는 절차도 확인합니다.")}</p>
          </article>
          <article className="card reveal">
            <div className="card-icon"><ClipboardCheck size={25} aria-hidden="true" /></div>
            <h3>{t("어떻게 확인하고 운영하나요?")}</h3>
            <p>{t("필요한 검증 범위, 변경 관리, 사용자 교육과 운영 책임을 정리하세요. 접근 권한과 백업·복구 요구도 검토합니다.")}</p>
          </article>
        </div>
        <details className="product-details validation-detail-group">
          <summary>{t("규제 기준과 적용 범위 자세히 보기")}</summary>
        <div className="grid-2 supporting-details">
          <article className="card reveal">
            <h3>{t("요구사항의 기준과 적용 범위")}</h3>
            <p>{t("21 CFR Part 11은 전자기록과 전자서명에 관한 규정입니다. 적용 여부와 구체적인 요구는 사용 목적과 업무에 따라 확인해야 합니다.")}</p>
            <p>{t("ALCOA는 기록의 귀속성, 판독성, 동시성, 원본성, 정확성을 살펴보는 데이터 무결성 원칙입니다. 시스템 기능과 현장의 운영 절차를 함께 확인합니다.")}</p>
            <a className="text-link" href={regulationUrl} target="_blank" rel="noopener noreferrer">{t("21 CFR Part 11 원문 확인")}<ExternalLink size={16} aria-hidden="true" /><span className="sr-only">{t(" (새 창)")}</span></a>
          </article>
          <div className="notice">
            <ShieldCheck size={24} aria-hidden="true" />
            <div>
              <h3>{t("지원 기능과 적합성 판단의 구분")}</h3>
              <p>{t("기록 보호, 이력과 역할별 전자서명은 관련 요구사항 검토를 돕는 기능입니다. 실제 적합성은 제품 설정과 고객의 절차, 교육, 검증 및 운영 관리를 함께 평가해야 합니다.")}</p>
              <p>{t("이 안내는 초기 요구사항 정리를 위한 자료입니다. 법률 자문, 인증서 또는 제품 검증 결과를 대신하지 않습니다.")}</p>
            </div>
          </div>
        </div>
        </details>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section supporting-section" data-main-section tabIndex={-1} aria-labelledby="about-heading">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{t("ABOUT ORYX DATASAFE")}</p>
          <p className="about-meta">{t("회사 소개")}</p>
        </div>
        <div className="about-intro">
          <div className="about-lead reveal">
            <h2 id="about-heading">{t("업무에 맞춘 소프트웨어를 설계합니다.")}</h2>
          </div>
          <div className="company-summary reveal">
            <p>{t("Oryx DataSafe는 Oryx System과 별도로 운영되는 IT 기업입니다.")}</p>
            <p>{t("전자기록·데이터 무결성·보안을 중심으로, 제약회사의 업무와 운영 환경에 맞는 소프트웨어를 설계·개발합니다.")}</p>
            <p className="form-note">{t("로고의 “Compliance”는 관련 요구를 고려한 설계·지원을 나타내며, 제품의 외부 인증이나 규정 충족·보안 성능의 보장을 뜻하지 않습니다.")}</p>
          </div>
        </div>
        <div className="about-capabilities">
          {[
            { icon: Database, name: 'DataStation', title: '장비 기록 관리', description: '장비 기록을 수집·보호하고 검토합니다.', id: 'datastation' },
            { icon: LockKeyhole, name: 'LockDown', title: 'PC 접근 통제', description: '업무용 PC의 접근과 허용 앱을 관리합니다.', id: 'lockdown' },
            { icon: ClipboardList, name: 'Calibration', title: '교정 업무 관리', description: '교정 기록과 검토·승인 흐름을 관리합니다.', id: 'calibration' },
          ].map(({ icon: Icon, name, title, description, id }) => (
            <article className="about-capability reveal" key={id}>
              <Icon size={44} strokeWidth={1.65} aria-hidden="true" />
              <h3><a href={`#${id}`}>{name}</a></h3>
              <strong>{t(title)}</strong>
              <p>{t(description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section supporting-section" data-main-section tabIndex={-1} aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-details reveal">
            <div className="section-heading">
              <p className="section-kicker">{t("CONTACT")}</p>
              <h2 id="contact-heading">{t("제품 및 도입 문의")}</h2>
              <p>{t("제품 기능과 도입 검토는 이메일 또는 전화로 문의해 주세요.")}</p>
            </div>
          </div>
          <div className="contact-primary reveal">
            <dl className="contact-facts">
              <div><dt>{t("PHONE")}</dt><dd><a href="tel:+821065450415">{phone}</a></dd></div>
              <div><dt>{t("EMAIL")}</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
            </dl>
            <p className="contact-person">{t("도입 문의 · 대표 홍승철")}</p>
            <a className="button button-primary" href={`mailto:${email}?subject=Oryx%20DataSafe`}><Mail size={18} aria-hidden="true" />{t("메일 보내기")}</a>
            <p className="form-note">{t("이메일 링크는 기기의 메일 앱을 엽니다. 메일 앱을 사용할 수 없다면 주소를 복사해 보내주세요.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PrivacySection() {
  const { t } = useLanguage();
  return (
    <section id="privacy" className="section supporting-section" data-main-section tabIndex={-1} aria-labelledby="privacy-heading">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{t("PRIVACY")}</p>
          <h2 id="privacy-heading">{t("개인정보 안내")}</h2>
        </div>
        <div className="privacy-brief reveal">
          <p>{t("이 사이트에는 문의 입력 폼이 없으며 문의 내용을 수집·전송·저장하지 않습니다. 이메일은 사용자가 직접 보내며, 이용하는 메일 서비스의 개인정보 및 이용 정책이 적용됩니다.")}</p>
          <p>{t("이메일 문의의 처리 방식과 보관 기간을 포함한 정식 개인정보 처리방침은 운영자의 확인과 확정이 필요합니다.")}</p>
        </div>
      </div>
    </section>
  );
}
