import { useLanguage } from "../i18n";
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardCheck,
  ExternalLink,
  FileCheck2,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Signature,
} from "lucide-react";

const email = "schong@oryxsystem.co.kr";
const phone = "+82-10-6545-0415";
const regulationUrl =
  "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11";

export function ImplementationSection() {
  const { t } = useLanguage();
  const steps = [
    {
      title: "현장과 요구사항 확인",
      description: "대상 업무, 기록 종류, 설비와 기존 시스템을 함께 살펴봅니다.",
      details: "준비할 정보: 업무 흐름, 설비 목록, 현재 기록 방식",
    },
    {
      title: "적용 범위와 구성 검토",
      description:
        "필요한 기능과 연결 조건을 확인하고 구현 가능 범위 및 제외 범위를 정리합니다.",
      details: "확인할 정보: 기능·버전, 연동 조건, 역할과 권한",
    },
    {
      title: "도입 계획과 견적 협의",
      description:
        "구성, 일정, 검증 요구와 지원 범위를 협의한 뒤 견적을 확인합니다.",
      details: "협의할 정보: 산출물, 비용, 일정, 계약 조건",
    },
    {
      title: "검증과 운영 준비",
      description:
        "합의한 범위에 따라 적용 결과를 확인하고 현장의 절차와 운영 준비를 점검합니다.",
      details: "점검할 정보: 검증 계획, 사용자 교육, 운영 책임",
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
              <p className="form-note">{t(step.details)}</p>
            </li>
          ))}
        </ol>
        <div className="grid-2 supporting-details">
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
          <article className="card reveal">
            <div className="card-icon"><FileCheck2 size={25} aria-hidden="true" /></div>
            <h3>{t("가격과 지원은 견적으로 확인합니다.")}</h3>
            <p>{t("구성 및 적용 범위에 따라 필요한 작업이 달라집니다. 제품 가격, 도입 비용, 유지보수와 서비스 수준은 개별 견적 및 계약에서 확인합니다.")}</p>
            <p>{t("견적에서 포함된 항목과 별도 협의가 필요한 항목을 함께 확인해 주세요.")}</p>
            <a className="text-link" href="#contact">{t("견적 문의하기")}<ArrowRight size={17} aria-hidden="true" /></a>
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
          <p>{t("21 CFR Part 11과 ALCOA 원칙에 관한 요구는 실제 지원 기능, 사용 목적과 조직의 운영 절차를 함께 살펴야 합니다. 제품 도입만으로 인증이나 규제 준수가 보장되지는 않습니다.")}</p>
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
          <p className="section-kicker">{t("ABOUT ORYX SYSTEM")}</p>
          <h2 id="about-heading">{t("현장의 경험을 기록의 신뢰로 연결합니다.")}</h2>
          <p>{t("Oryx DataSafe는 오릭스 시스템의 전자기록·전자서명·데이터 무결성 솔루션입니다. 제약·산업 현장의 업무와 데이터 관리 요구를 살펴봅니다.")}</p>
        </div>
        <div className="split-section">
          <div>
            <h3>{t("업무와 설비를 이해하는 데서 시작합니다.")}</h3>
            <p>{t("대표 홍승철은 20년의 국내외 현장 경험을 바탕으로 오릭스 시스템을 시작했습니다. 현장 업무와 기술을 연결하는 관점으로 Oryx DataSafe의 적용 범위를 검토합니다.")}</p>
            <p>{t("기록을 만드는 사람, 확인하는 사람과 실제 운영 환경을 이해하고, 필요한 기능과 관리 절차를 구체적으로 논의합니다.")}</p>
            <a className="text-link" href="https://oryxsystem.co.kr" target="_blank" rel="noopener noreferrer">{t("오릭스 시스템 회사 사이트")}<ExternalLink size={16} aria-hidden="true" /><span className="sr-only">{t(" (새 창)")}</span></a>
          </div>
          <div className="card reveal">
            <div className="card-icon"><Building2 size={25} aria-hidden="true" /></div>
            <p className="section-kicker">{t("FOUNDER & CEO")}</p>
            <h3>{t("홍승철")}</h3>
            <p>{t("오릭스 시스템 대표")}</p>
            <dl className="about-facts">
              <div><dt>{t("현장 경험")}</dt><dd>{t("국내외 20년")}</dd></div>
              <div><dt>{t("소재지")}</dt><dd>{t("충청남도 금산군 비호산로 4 1층")}</dd></div>
            </dl>
          </div>
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
        <div className="section-heading reveal">
          <p className="section-kicker">{t("CONTACT")}</p>
          <h2 id="contact-heading">{t("현장의 과제부터 이야기해 주세요.")}</h2>
          <p>{t("제품 기능 확인, 도입 검토와 견적 문의를 받고 있습니다. 필요한 업무와 대상 설비를 알려주시면 상담의 출발점을 정리할 수 있습니다.")}</p>
        </div>
        <div className="contact-layout">
          <div className="contact-details reveal">
            <p className="section-kicker">{t("DIRECT CONTACT")}</p>
            <h3>{t("오릭스 시스템")}</h3>
            <p>{t("담당자 홍승철 · Founder & CEO")}</p>
            <div className="contact-card">
              <Mail size={22} aria-hidden="true" />
              <div><h3>{t("이메일")}</h3><a href={`mailto:${email}`}>{email}</a></div>
            </div>
            <div className="contact-card">
              <Phone size={22} aria-hidden="true" />
              <div><h3>{t("전화")}</h3><a href="tel:+821065450415">{phone}</a></div>
            </div>
            <div className="contact-card">
              <MapPin size={22} aria-hidden="true" />
              <div><h3>{t("주소")}</h3><p>{t("충청남도 금산군 비호산로 4 1층")}</p></div>
            </div>
            <p className="form-note">{t("메일 앱을 사용할 수 없다면 위 이메일 주소를 복사해 사용하는 이메일 서비스에서 직접 보내주세요.")}</p>
          </div>
          <div className="contact-form reveal">
            <h3 id="contact-form-heading">{t("이메일로 문의하기")}</h3>
            <p>{t("제품·기능 확인, 도입 검토와 견적 문의는 아래 이메일로 보내주세요.")}</p>
            <a className="button button-primary" href={`mailto:${email}`}>{t("이메일로 문의하기")}<Mail size={18} aria-hidden="true" />
            </a>
            <p className="form-note">{t("이메일 버튼은 기기의 메일 앱을 엽니다. 문의는 메일 앱에서 직접 작성하고 전송합니다.")}</p>
            <p className="form-note">{t("이 사이트는 문의 내용을 입력받거나 전송·저장하지 않으며, 발송 여부를 확인하지 않습니다.")}</p>
            <p className="form-note">{t("초기 문의에는 비밀번호, API 키, 기밀 자료나 민감한 개인정보를 포함하지 마세요.")}</p>
            <p className="form-note"><a href="#privacy">{t("문의 및 개인정보 안내")}</a></p>
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
          <p className="section-kicker">{t("PRIVACY & CONTACT")}</p>
          <h2 id="privacy-heading">{t("문의 및 개인정보 안내")}</h2>
          <p>{t("이 웹사이트의 이메일 문의 경로와 관련 안내입니다.")}</p>
        </div>
        <div className="grid-2">
          <article className="card reveal">
            <div className="card-icon"><Mail size={25} aria-hidden="true" /></div>
            <h3>{t("웹사이트 문의 경로")}</h3>
            <p>{t("이 사이트는 직접 이메일 링크를 제공합니다. 이메일 버튼을 선택하면 기기의 메일 앱에서 문의를 작성할 수 있습니다.")}</p>
            <p>{t("웹사이트에는 문의 입력 폼이 없으며 문의 내용을 수집·전송·저장하지 않습니다.")}</p>
          </article>
          <article className="card reveal">
            <div className="card-icon"><FileText size={25} aria-hidden="true" /></div>
            <h3>{t("이메일 문의")}</h3>
            <p>{t("작성한 문의는 사용자가 메일 앱에서 직접 전송합니다. 메일 서비스 이용에는 해당 서비스의 개인정보 및 이용 정책이 적용됩니다.")}</p>
            <p>{t("발송된 문의의 처리 방식, 보관 기간과 개인정보 관련 문의는 아래 담당 연락처로 확인해 주세요.")}</p>
            <a className="text-link" href={`mailto:${email}`}>{email} <ArrowRight size={17} aria-hidden="true" /></a>
          </article>
        </div>
        <div className="notice supporting-details">
          <FileCheck2 size={24} aria-hidden="true" />
          <div>
            <h3>{t("정식 개인정보 처리방침 확인이 필요합니다.")}</h3>
            <p>{t("현재 안내는 웹사이트의 직접 이메일 링크 동작을 설명합니다. 이메일 문의 처리에 관한 정식 개인정보 처리방침은 운영자의 확인과 확정이 필요하며, 확인되지 않은 보관 기간이나 개인정보 담당자 정보를 기재하지 않습니다.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
