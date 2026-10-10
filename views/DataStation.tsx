import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Database,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  HardDrive,
  History,
  LockKeyhole,
  Network,
  Timer,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../i18n";
import "./datastation.css";

const features = [
  { icon: FileSpreadsheet, title: "CSV 수집과 데이터 조회", description: "장비 CSV를 자동 수집해 DB로 저장·조회하고 PDF 보고서를 만듭니다." },
  { icon: LockKeyhole, title: "파일 보호와 접근 권한", description: "새 CSV·DB·PDF 파일에 암호화와 접근 권한을 적용합니다." },
  { icon: Fingerprint, title: "원본 확인과 버전 구분", description: "원본 해시값으로 변경을 확인하고 최초 보고서와 이후 버전을 보관합니다." },
  { icon: History, title: "장비·프로그램 활동 이력", description: "연결 장비의 Audit Trail을 조회·내보내고 프로그램·시스템 활동을 기록합니다." },
  { icon: HardDrive, title: "정기 백업과 선택 복원", description: "대상·경로·일정을 정해 백업하고 필요한 범위를 선택해 복원합니다." },
  { icon: Timer, title: "장기 보관과 PC 시간 맞춤", description: "외부 보관 확인 후 PC 정리 정책을 적용하고, 설치 PC별로 NTP 시간을 맞춥니다." },
];

function DataFlow() {
  const { t } = useLanguage();
  const steps = [
    { icon: FileSpreadsheet, title: "CSV · 장비 원본 기록", text: "자동 수집하는 원본 데이터" },
    { icon: Database, title: "DB · 저장과 조회", text: "기록을 변환해 검색·조회" },
    { icon: FileText, title: "PDF · 검토 보고서", text: "보고서 생성과 검토·인쇄" },
  ];
  return (
    <figure className="ds-flow-figure reveal" aria-labelledby="ds-flow-caption">
      <div className="ds-flow-heading">
        <span>{t("RECORD FLOW")}</span>
        <Database size={17} aria-hidden="true" />
      </div>
      <ol className="ds-flow-list">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <li key={title}>
            <div className="ds-flow-icon"><Icon size={23} aria-hidden="true" /></div>
            <div><strong>{t(title)}</strong><p>{t(text)}</p></div>
            <span className="ds-flow-number">0{index + 1}</span>
          </li>
        ))}
      </ol>
      <div className="ds-flow-foundation">
        <span><LockKeyhole size={13} aria-hidden="true" />{t("파일 보호")}</span>
        <span><Fingerprint size={13} aria-hidden="true" />{t("원본 확인")}</span>
        <span><History size={13} aria-hidden="true" />{t("이력 관리")}</span>
      </div>
      <figcaption id="ds-flow-caption">{t("기록 처리 흐름을 설명하는 개념도입니다. 실제 제품 화면이 아닙니다.")}</figcaption>
    </figure>
  );
}

export default function DataStationPage({ embedded = false }: { embedded?: boolean }) {
  const { t } = useLanguage();
  const Intro = embedded ? "section" : "header";
  const ProductTitle = embedded ? "h2" : "h1";
  const SectionTitle = embedded ? "h3" : "h2";
  const ItemTitle = embedded ? "h4" : "h3";
  return (
    <div className={`ds-page${embedded ? " ds-embedded" : ""}`}>
      <Intro className="ds-hero" aria-labelledby="ds-product-title">
        <div className="container ds-hero-layout">
          <div className="reveal">
            <p className="eyebrow">{t("EQUIPMENT DATA MANAGEMENT")}</p>
            <ProductTitle id="ds-product-title" className="ds-product-title product-heading">Oryx DataStation</ProductTitle>
            <p className="ds-headline product-subtitle">{t("설비의 기록을, 검토 가능한 데이터로.")}</p>
            <p className="ds-hero-lead">{t("장비 CSV를 수집·보호하고 PDF 보고서로 검토·보관합니다. 전자서명과 사무실 검토는 제품 구성에 따라 제공합니다.")}</p>
            <p className="ds-source-note">{t("DataStation 제품 소개서에 근거한 기능 안내입니다.")}<br />{t("전자서명과 원격 검토 기능은 제품 구성에 따라 다릅니다.")}</p>
          </div>
          <DataFlow />
        </div>
      </Intro>

      <div className="ds-intro-bar">
        <div className="container">
          <strong>{t("수집 · 보호 · 보고서 · 검토 · 보관")}</strong>
          <p>{t("DataStation은 기록 관리 소프트웨어입니다. 설비 제어기·조작 화면(PLC/HMI) 프로그램은 DataStation의 기능 범위에 포함되지 않습니다.")}</p>
        </div>
      </div>

      <section className="ds-core-flow section" aria-label={t("DataStation 핵심 흐름")}>
        <div className="container">
          <ol>{[
            { icon: Database, title: "수집", text: "CSV 수집 · DB 조회" },
            { icon: ShieldCheck, title: "보호", text: "파일 보호 · 변경 확인" },
            { icon: ClipboardCheck, title: "검토", text: "PDF 보고서 · 역할별 서명" },
            { icon: HardDrive, title: "보관", text: "백업 · 선택 복원" },
          ].map(({ icon: Icon, title, text }) => <li key={title}><Icon size={40} aria-hidden="true" /><strong>{t(title)}</strong><span>{t(text)}</span></li>)}</ol>
          <p className="ds-source-note">{t("전자서명은 Professional·Enterprise에서 제공합니다. 장비 연결과 지원 범위는 현장 구성에 따라 확인합니다.")}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="ds-features-title">
        <div className="container">
          <div className="section-heading reveal">
            <p className="section-kicker">{t("COLLECT & PROTECT")}</p>
            <SectionTitle id="ds-features-title" className="ds-section-title">{t("기록의 출처와 이력을 함께 관리합니다.")}</SectionTitle>
            <p>{t("수집한 파일을 찾고, 변경 여부를 확인하고, 필요한 기록을 보관하는 기능을 제공합니다.")}</p>
          </div>
          <div className="ds-feature-grid">
            {features.map(({ icon: Icon, title, description }, index) => (
              <article className="ds-feature-card reveal" key={title}>
                <div className="ds-feature-top"><Icon size={25} strokeWidth={1.65} aria-hidden="true" /><span>0{index + 1}</span></div>
                <ItemTitle className="ds-card-title">{t(title)}</ItemTitle>
                <p>{t(description)}</p>

              </article>
            ))}
          </div>
          <p className="ds-source-note">{t("장비 연결과 이력 가져오기의 적용 범위는 대상 장비와 현장 구성에 따라 확인합니다. 모든 장비·통신 방식의 지원을 의미하지 않습니다.")}</p>
        </div>
      </section>

      <details className="product-details ds-detail-group">
        <summary>{t("보고서·역할·원격 검토 자세히 보기")}</summary>
        <div className="detail-content container">
          <h3>{t("파일·보관 설정의 적용 조건")}</h3>
          <ul className="check-list">
            <li><Check size={16} aria-hidden="true" /><span>{t("기존 비암호화 CSV·DB도 처리하며, 새 파일의 보호 범위와 역할별 권한은 설정에 따라 확인합니다.")}</span></li>
            <li><Check size={16} aria-hidden="true" /><span>{t("CSV·DB 파일명과 디지털 지문을 PDF에 남깁니다. 전자서명한 PDF는 앱에서 다시 생성할 수 없습니다.")}</span></li>
            <li><Check size={16} aria-hidden="true" /><span>{t("수치·시간 변화와 설정값·측정값을 비교하고, 필요한 항목 또는 전체 이력을 확인합니다.")}</span></li>
            <li><Check size={16} aria-hidden="true" /><span>{t("NAS·서버 공유 경로·USB 등 외부 보관 경로와 보관 기간, NTP 서버는 현장 운영 기준에 맞춰 설정합니다.")}</span></li>
          </ul>
        </div>
      <section className="section ds-workflow-section" aria-labelledby="ds-report-title">
        <div className="container">
          <div className="section-heading reveal">
            <p className="section-kicker">{t("REPORT & REVIEW")}</p>
            <SectionTitle id="ds-report-title" className="ds-section-title">{t("검토 목적에 맞춰 보고서를 구성합니다.")}</SectionTitle>
            <p>{t("적합·부적합 판정에 따른 로우 데이터 출력으로 예외 중심 검토(Review by Exception)를 돕습니다.")}</p>
          </div>
          <div className="ds-scope-grid">
            <article className="ds-scope-card ds-report-card reveal">
              <p className="section-kicker">{t("PASS · 적합 판정")}</p>
              <ItemTitle className="ds-card-title">{t("설정에 따라 상세 출력 생략")}</ItemTitle>
              <p>{t("적합 판정에서는 설정에 따라 로우 데이터(원시 측정값)의 출력을 생략합니다. 수동 재발행 시에는 포함 여부를 선택할 수 있습니다.")}</p>
            </article>
            <article className="ds-scope-card ds-report-card reveal">
              <p className="section-kicker">{t("FAIL · 부적합 판정")}</p>
              <ItemTitle className="ds-card-title">{t("로우 데이터를 항상 포함")}</ItemTitle>
              <p>{t("부적합 판정에서는 로우 데이터를 항상 포함해 상세 기록을 확인하도록 합니다. 출력 보고서와 별도로 원본 데이터는 보존합니다.")}</p>
            </article>
          </div>
          <div className="ds-report-details reveal">
            <p><strong>{t("현장에 맞는 양식")}</strong>{t("한국어·영어 및 날짜 표시를 선택하고, 장비·공정에 맞춰 공급자가 보고서 양식을 구성합니다.")}</p>
            <p><strong>{t("조건에 따른 인쇄")}</strong>{t("자동 인쇄는 설정한 판정 조건과 Windows 기본 프린터를 사용합니다.")}</p>
            <p><strong>{t("지원 보고서의 점검 안내")}</strong>{t("과거 이력에 따른 예방 점검 권고를 표시하며, 판정 결과를 바꾸지는 않습니다.")}</p>
          </div>
          <p className="ds-source-note">{t("로우 데이터 포함 선택은 해당 수동 보고서에만 적용됩니다. 최초 보고서는 보존하며, 이후 보고서는 별도 버전으로 남깁니다.")}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="ds-sign-title">
        <div className="container">
          <div className="section-heading reveal">
            <p className="section-kicker">{t("ROLE-BASED ELECTRONIC SIGNATURES")}</p>
            <SectionTitle id="ds-sign-title" className="ds-section-title">{t("작업·확인·승인의 책임을 구분합니다.")}</SectionTitle>
            <p>{t("Professional·Enterprise는 담당자 역할과 순서에 따른 전자서명을 제공합니다.")}</p>
          </div>
          <ol className="ds-workflow">
            <li className="reveal"><span>{t("01 / OPERATOR")}</span><ItemTitle className="ds-card-title">{t("작업자")}</ItemTitle><p>{t("작업 기록을 확인하고 첫 번째 전자서명을 남깁니다.")}</p><ArrowRight className="ds-workflow-arrow" size={25} aria-hidden="true" /></li>
            <li className="reveal"><span>{t("02 / REVIEWER")}</span><ItemTitle className="ds-card-title">{t("확인자")}</ItemTitle><p>{t("작업자의 서명 후 기록을 검토하고 확인 서명을 남깁니다.")}</p><ArrowRight className="ds-workflow-arrow" size={25} aria-hidden="true" /></li>
            <li className="reveal"><span>{t("03 / APPROVER")}</span><ItemTitle className="ds-card-title">{t("승인자")}</ItemTitle><p>{t("확인 서명 후 최종 검토하고 승인 서명을 남깁니다.")}</p></li>
          </ol>
          <div className="ds-role-notes">
            <p><strong>{t("감사자")}</strong>{t("기록과 감사 이력을 조회·내보냅니다. 감사자 권한만으로는 서명하지 않으며, 승인에는 승인자 역할이 필요합니다.")}</p>
            <p><strong>{t("관리자")}</strong>{t("계정·권한·운영 설정과 백업을 관리합니다. 비밀번호, 미사용 시간과 계정 잠금 기준을 설정합니다.")}</p>
          </div>
        </div>
      </section>

      <section className="section ds-workflow-section ds-enterprise-section" aria-labelledby="ds-enterprise-title">
        <div className="container ds-enterprise">
          <div className="reveal">
            <p className="section-kicker">{t("ENTERPRISE · REMOTE REVIEW")}</p>
            <SectionTitle id="ds-enterprise-title" className="ds-section-title">{t("현장의 기록을, 사무실에서 조회하고 검토합니다.")}</SectionTitle>
            <p>{t("Enterprise는 현장 DataStation이 보관한 기록을 사무실에서 조회·검토하는 구성입니다. 별도 보관함에서 PDF 보고서와 서명 이력을 모아 확인합니다.")}</p>
            <p>{t("도입 시 현장 PC, 사무실 검토 환경과 연결 조건을 함께 확인합니다.")}</p>
          </div>
          <div className="ds-enterprise-card reveal">
            <Network size={32} strokeWidth={1.6} aria-hidden="true" />
            <ItemTitle className="ds-card-title">{t("기록과 검토 업무의 연결")}</ItemTitle>
            <ul className="check-list">
              <li><Check size={16} aria-hidden="true" /><span>{t("현장 DataStation의 보관 기록 조회·검토")}</span></li>
              <li><Check size={16} aria-hidden="true" /><span>{t("PDF·서명 이력 전용 보관함")}</span></li>
              <li><Check size={16} aria-hidden="true" /><span>{t("작업·확인·승인 순서별 전자서명")}</span></li>
            </ul>
          </div>
        </div>
      </section>

      </details>

      <section className="section" aria-labelledby="ds-editions-title">
        <div className="container">
          <div className="section-heading reveal">
            <p className="section-kicker">{t("CHOOSE YOUR CONFIGURATION")}</p>
            <SectionTitle id="ds-editions-title" className="ds-section-title">{t("업무 범위에 맞는 구성을 선택합니다.")}</SectionTitle>
            <p>{t("전자서명과 사무실 검토, 전용 보관의 필요에 따라 Standard·Professional·Enterprise를 검토합니다.")}</p>
          </div>
          <ul className="edition-summary" aria-label={t("제품 구성 핵심 차이")}>
            <li><strong>Standard</strong><span>{t("현장 기록 관리 · 전자서명 미제공")}</span></li>
            <li><strong>Professional</strong><span>{t("현장 기록 관리 · 역할별 전자서명")}</span></li>
            <li><strong>Enterprise</strong><span>{t("사무실 원격 조회·검토 · 전자서명 · 전용 보관함")}</span></li>
          </ul>
          <p className="ds-table-hint">{t("비교표가 화면보다 넓으면 좌우로 스크롤하세요.")}</p>
          <div className="ds-table-wrap reveal" role="region" tabIndex={0} aria-label={t("DataStation 제품 구성 비교표 (좌우 스크롤 가능)")}>
            <table className="ds-edition-table">
              <caption className="sr-only">{t("DataStation 제품 구성별 역할, 전자서명 및 기록 검토 기능 비교")}</caption>
              <thead><tr><th scope="col">{t("구분")}</th><th scope="col">Standard</th><th scope="col">Professional</th><th scope="col">Enterprise</th></tr></thead>
              <tbody>
                <tr><th scope="row">{t("주요 운영 목적")}</th><td>{t("현장 기록 관리")}</td><td>{t("현장 기록 관리·서명")}</td><td>{t("사무실 원격 조회·검토")}</td></tr>
                <tr><th scope="row">{t("계정 역할")}</th><td>{t("관리자·감사자")}</td><td>{t("서명·관리 역할 추가")}</td><td>{t("서명·관리 역할 추가")}</td></tr>
                <tr><th scope="row">{t("전자서명")}</th><td>{t("미제공")}</td><td>{t("제공")}</td><td>{t("제공")}</td></tr>
                <tr><th scope="row">{t("기록 조회·검토 환경")}</th><td>{t("현장 PC에서 연동")}</td><td>{t("현장 PC에서 연동")}</td><td>{t("사무실에서 검토")}</td></tr>
                <tr><th scope="row">{t("PDF·서명 이력 전용 보관함")}</th><td>{t("미제공")}</td><td>{t("미제공")}</td><td>{t("제공")}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="ds-source-note">{t("Professional도 전자서명한 보고서를 저장합니다. Enterprise의 별도 PDF·서명 이력 보관함과는 구분됩니다. 앱 전체 화면의 한국어·영어 전환을 지원합니다.")}</p>
          <div className="lockdown-details reveal"><a className="text-link" href="#brochures">{t("DataStation 소개서 보기")}<ArrowRight size={17} aria-hidden="true" /></a></div>
        </div>
      </section>

      {!embedded && <section className="section ds-scope-section" aria-labelledby="ds-scope-title">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">{t("FUNCTIONS & VALIDATION")}</p>
            <SectionTitle id="ds-scope-title" className="ds-section-title">{t("지원 기능과 현장 검증을 함께 확인합니다.")}</SectionTitle>
          </div>
          <div className="ds-scope-grid">
            <article className="ds-scope-card">
              <p className="section-kicker">{t("21 CFR PART 11 · ALCOA+")}</p>
              <ItemTitle className="ds-card-title">{t("규제·무결성 요구를 지원하는 기능")}</ItemTitle>
              <p>{t("기록 보호, 원본 확인, 활동 이력, 역할별 권한과 전자서명은 전자기록 및 데이터 무결성 요구를 검토하는 데 활용할 수 있습니다.")}</p>
              <p>{t("관련 요구사항을 고려한 설계입니다. 실제 적합성은 지원 기능·설정·사용 목적과 고객의 절차·교육·검증을 함께 평가해야 합니다. 제품의 외부 인증이나 규정 충족을 뜻하지 않습니다.")}</p>
              <a className="text-link" href="#validation">{t("검토 가이드 보기")}<ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className="ds-scope-card">
              <p className="section-kicker">{t("SEPARATE SOLUTION · ORYX LOCKDOWN")}</p>
              <ItemTitle className="ds-card-title">{t("업무 전용 Windows 환경은 별도 솔루션입니다.")}</ItemTitle>
              <p>{t("Oryx LockDown은 허용 앱 중심의 Windows 업무 환경을 제공하고 바탕화면 접근과 설정된 Windows 단축키를 제한하는 별도 제품입니다.")}</p>
              <p>{t("DataStation의 기록 관리 기능과 구분해 적용 범위를 검토합니다.")}</p>
              <a className="text-link" href="#brochures">{t("LockDown 소개서 확인")}<ArrowRight size={16} aria-hidden="true" /></a>
            </article>
          </div>
          <div className="notice">
            <ClipboardCheck size={24} aria-hidden="true" />
            <div>
              <ItemTitle className="ds-card-title">{t("도입 전에 확인할 사항")}</ItemTitle>
              <p>{t("대상 장비의 CSV 형식과 연결 조건, 보고서 양식, 사용자 역할, 파일 보호 범위, 백업·보관 정책과 검증 요구를 함께 확인합니다. 제공 버전, 구성과 지원 범위는 상담 및 계약에서 정합니다.")}</p>
            </div>
          </div>
        </div>
      </section>}

    </div>
  );
}
