import { ArrowRight, Check, ClipboardList, FileCheck2, History, Ruler, ScanText, UsersRound } from "lucide-react";
import { useLanguage } from "../i18n";

const features = [
  {
    icon: ClipboardList,
    title: "일반·저울·기록계의 측정 기록",
    paragraphs: ["일반 교정, 저울과 기록계의 측정값을 입력하고 교정 업무의 기록으로 관리합니다."],
  },
  {
    icon: Ruler,
    title: "표준기·SOP·서식의 근거 관리",
    paragraphs: ["교정에 사용하는 표준기, SOP와 서식의 근거를 관리하고 측정 기록과 함께 확인합니다."],
  },
  {
    icon: FileCheck2,
    title: "제출과 별도 검토·승인",
    paragraphs: ["수행자가 기록을 제출한 뒤 별도의 검토·승인 절차를 거칩니다. 역할과 권한에 따라 전자서명을 연결합니다."],
  },
  {
    icon: History,
    title: "Audit Trail 조회와 내보내기",
    paragraphs: ["업무의 Audit Trail을 조회하고 PDF로 내보내 이력을 확인합니다."],
  },
  {
    icon: UsersRound,
    title: "성적서 발행과 고객 조회",
    paragraphs: ["성적서를 발행하고 고객 공개 여부를 별도로 관리합니다. 권한에 따라 COPY 표시 사본을 조회합니다."],
  },
  {
    icon: ScanText,
    title: "온라인 OCR과 오프라인 기록",
    paragraphs: [
      "온라인에서는 사진을 촬영·업로드하고 서버 OCR 결과를 사용자가 확인합니다.",
      "오프라인에서는 사진과 수기 입력값을 보관한 뒤 연결 시 업로드합니다. 오프라인 즉시 자동 OCR은 지원 기능으로 안내하지 않습니다.",
    ],
  },
];

export default function CalibrationSection() {
  const { t } = useLanguage();

  return (
    <section id="calibration" className="section supporting-section calibration-section" data-main-section tabIndex={-1} aria-labelledby="calibration-heading">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{t("ORYX CALIBRATION · 교정 업무 관리")}</p>
          <h2 id="calibration-heading">{t("교정 업무의 시작부터, 성적서 조회까지.")}</h2>
          <p>{t("Oryx Calibration은 교정 업무의 접수·배정부터 현장 측정 기록, 전자서명 검토·승인, 성적서 발행과 고객 조회까지 연결하는 교정 업무 관리 소프트웨어입니다.")}</p>
        </div>
        <div className="grid-3">
          {features.map(({ icon: Icon, title, paragraphs }) => (
            <article className="card reveal" key={title}>
              <div className="card-icon"><Icon size={25} aria-hidden="true" /></div>
              <h3>{t(title)}</h3>
              {paragraphs.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}
            </article>
          ))}
        </div>
        <div className="lockdown-details reveal">
          <p><Check size={17} aria-hidden="true" /><span>{t("입력 양식, 연결 조건과 권한 구성은 사용하는 버전과 현장 환경에 맞춰 확인합니다.")}</span></p>
          <a className="text-link" href="#brochures">{t("Calibration 소개서 보기")} <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
