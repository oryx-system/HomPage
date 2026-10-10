import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Download, FileText } from "lucide-react";
import { brochures, type BrochureLanguage } from "../data/brochures";
import { useLanguage } from "../i18n";
import "./brochures.css";

export default function BrochuresPage({ embedded = false }: { embedded?: boolean }) {
  const { language: uiLanguage, t } = useLanguage();
  const [pdfLanguage, setPdfLanguage] = useState<BrochureLanguage>("ko");
  useEffect(() => {
    // Warm the small static covers for both PDF languages; fetch no PDFs.
    for (const { cover } of brochures) {
      const image = new Image();
      image.decoding = "async";
      image.src = cover;
    }
  }, []);
  const languageName = (language: BrochureLanguage) => t(language === "ko" ? "한국어" : "영어");
  return (
    <>
      {!embedded && <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{t("PRODUCT BROCHURES")}</p>
          <h1 className="page-title">{t("제품을 더 자세히 살펴보세요.")}</h1>
          <div className="page-lead">
            <p>{t("Oryx DataStation, Oryx LockDown, Oryx Calibration의 제품 소개서입니다. 한국어와 영어 자료를 원본 PDF로 제공합니다.")}</p>
          </div>
        </div>
      </header>}
      <section className="section brochure-section" aria-labelledby="brochure-heading">
        <div className="container">
          <div className="brochure-toolbar reveal">
            <div>
              <p className="section-kicker">{t("READ · PREVIEW · DOWNLOAD")}</p>
              <h2 id="brochure-heading">{t("필요한 언어로 확인하세요.")}</h2>
            </div>
            <div className="brochure-language" role="group" aria-label={t("브로셔 언어 선택")}>
              <button type="button" lang="ko" aria-pressed={pdfLanguage === "ko"} onClick={() => setPdfLanguage("ko")}>{t("한국어")}</button>
              <button type="button" lang="en" aria-pressed={pdfLanguage === "en"} onClick={() => setPdfLanguage("en")}>{t("영어")}</button>
            </div>
          </div>
          <div className="brochure-grid">
            {brochures.filter(item => item.language === pdfLanguage).map(item => (
              <article className="brochure-card reveal" key={item.fileName}>
                <a className="brochure-cover" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.product} ${languageName(item.language)} ${t("PDF 미리보기")} ${t("(새 탭)")}`}>
                  <img src={item.cover} alt={`${item.product} ${languageName(item.language)} ${t("브로셔 원본 첫 페이지")}`} width={item.coverWidth} height={item.coverHeight} loading="eager" decoding="async" fetchPriority="low" />
                  <span>{t("PDF 미리보기")} <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
                <div className="brochure-card-content">
                  <p className="section-kicker">{languageName(item.language)} · PDF</p>
                  <h3>{item.product}</h3>
                  <p>{t(item.description)}</p>
                  <p className="brochure-file"><FileText size={16} aria-hidden="true" /> {item.pages} {t("페이지")} · {(item.bytes / 1_000_000).toLocaleString(uiLanguage, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {t("MB")}</p>
                  <div className="brochure-actions">
                    <a className="button button-secondary" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.product} ${languageName(item.language)} ${t("미리보기")} PDF ${t("(새 탭)")}`}>{t("미리보기")} <ArrowUpRight size={17} aria-hidden="true" /></a>
                    <a className="button button-primary" href={item.href} download={item.fileName} aria-label={`${item.product} ${languageName(item.language)} ${t("PDF 다운로드")}`}>{t("다운로드")} <Download size={17} aria-hidden="true" /></a>
                  </div>
                  {item.product === "Oryx DataStation" && <a className="text-link" href="#datastation">{t("DataStation 기능 살펴보기")} <ArrowRight size={17} aria-hidden="true" /></a>}
                </div>
              </article>
            ))}
          </div>
          <div className="brochure-guidance">
            <p>{t("미리보기는 원본 PDF를 새 탭에서 엽니다. 기기의 PDF 뷰어 설정에 따라 파일이 다운로드될 수 있습니다.")}</p>
            <p>{t("제품별 한국어·영어 원본 PDF를 제공합니다.")} {t("언어별 구성과 페이지 수는 다를 수 있으며, 적용 기능과 제공 버전은 도입 상담에서 확인해 주세요.")}</p>
            {uiLanguage === "ru" && <p>{t("러시아어 PDF는 제공되지 않습니다. 한국어 또는 영어 원본을 확인해 주세요.")}</p>}
          </div>
        </div>
      </section>
      {!embedded && <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div><p className="section-kicker">{t("LET’S TALK")}</p><h2>{t("자료에서 찾은 기능을 현장에 연결하세요.")}</h2><p>{t("대상 설비와 기록 형식, 사용자 역할을 바탕으로 적용 범위를 검토합니다.")}</p></div>
            <a className="button button-primary" href="#contact">{t("도입 문의")} <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </section>}
    </>
  );
}
