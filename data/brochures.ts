export type BrochureLanguage = "ko" | "en";

export interface Brochure {
  product: "Oryx DataStation" | "Oryx LockDown" | "Oryx Calibration";
  language: BrochureLanguage;
  languageLabel: string;
  fileName: string;
  href: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  description: string;
  bytes: number;
  pages: number;
}

const dataStationDescription = "설비 데이터의 수집·보호부터 보고서, 감사 이력과 역할별 검토·승인까지 살펴보는 자료입니다.";
const lockDownDescription = "Windows PC의 전용 운영 화면과 허용 앱을 중심으로 접근과 작업 환경을 통제하는 별도 제품 자료입니다.";
const calibrationDescription = "교정 업무의 접수·배정부터 측정 기록, 검토·승인, 성적서 발행과 고객 조회까지 살펴보는 자료입니다.";

export const brochures: Brochure[] = [
  {
    product: "Oryx DataStation", language: "ko", languageLabel: "한국어",
    fileName: "Oryx_DataStation_Brochure_WordingReview_20261010.pdf", href: "/downloads/Oryx_DataStation_Brochure_WordingReview_20261010.pdf",
    cover: "/downloads/Oryx_DataStation_Brochure_WordingReview-cover.webp", coverWidth: 745, coverHeight: 1053,
    description: dataStationDescription, bytes: 5699290, pages: 13,
  },
  {
    product: "Oryx DataStation", language: "en", languageLabel: "English",
    fileName: "OryxDataStation_Brochure_EN_WordingReview_20261010.pdf", href: "/downloads/OryxDataStation_Brochure_EN_WordingReview_20261010.pdf",
    cover: "/downloads/OryxDataStation_Brochure_EN_WordingReview-cover.webp", coverWidth: 745, coverHeight: 1053,
    description: dataStationDescription, bytes: 5695812, pages: 13,
  },
  {
    product: "Oryx LockDown", language: "ko", languageLabel: "한국어",
    fileName: "Oryx_LockDown_Brochure_WordingReview_20261010.pdf", href: "/downloads/Oryx_LockDown_Brochure_WordingReview_20261010.pdf",
    cover: "/downloads/Oryx_LockDown_Brochure-cover.2786311e4565.webp", coverWidth: 1191, coverHeight: 1684,
    description: lockDownDescription, bytes: 6216950, pages: 8,
  },
  {
    product: "Oryx LockDown", language: "en", languageLabel: "English",
    fileName: "OryxLockDown_Brochure_EN_WordingReview_20261010.pdf", href: "/downloads/OryxLockDown_Brochure_EN_WordingReview_20261010.pdf",
    cover: "/downloads/OryxLockDown_Brochure_EN-cover.7d92ec6dac03.webp", coverWidth: 1191, coverHeight: 1684,
    description: lockDownDescription, bytes: 804580, pages: 8,
  },
  {
    product: "Oryx Calibration", language: "ko", languageLabel: "한국어",
    fileName: "OryxCalibration_고객소개브로셔_20261010_WordingReview_20261010.pdf", href: "/downloads/OryxCalibration_고객소개브로셔_20261010_WordingReview_20261010.pdf",
    cover: "/downloads/OryxCalibration_고객소개브로셔_20261010_WordingReview-cover.webp", coverWidth: 745, coverHeight: 1053,
    description: calibrationDescription, bytes: 3610806, pages: 7,
  },
  {
    product: "Oryx Calibration", language: "en", languageLabel: "English",
    fileName: "OryxCalibration_Introduction_EN_20261010_WordingReview_20261010.pdf", href: "/downloads/OryxCalibration_Introduction_EN_20261010_WordingReview_20261010.pdf",
    cover: "/downloads/OryxCalibration_Introduction_EN_20261010_WordingReview-cover.webp", coverWidth: 745, coverHeight: 1053,
    description: calibrationDescription, bytes: 7136090, pages: 7,
  },
];
