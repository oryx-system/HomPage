import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Home() {
  const { t } = useLanguage();
  return <>
    <section id="home" className="home-hero" data-main-section tabIndex={-1} aria-labelledby="home-heading">
      <div className="container hero-layout">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span />{t('IT SOFTWARE & DATA SECURITY')}</p>
          <h1 id="home-heading">{t('데이터를 지키고,')}<br /><span>{t('기록의 신뢰를')}</span><br />{t('이어갑니다.')}</h1>
          <p className="hero-lead">{t('Oryx DataSafe는 IT 소프트웨어를 중심으로 전자기록 보호, 이력 관리, 역할별 전자서명과 교정 업무를 지원합니다. 기록의 수집부터 검토·보관까지, 필요한 기능과 도입 범위를 함께 확인합니다.')}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#datastation">{t('DataStation 살펴보기')}<ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button button-secondary" href="#contact">{t('도입 상담')}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <p className="hero-small"><span className="small-line" />{t('소프트웨어로 연결하는 기록, 보호와 추적성을 고려한 설계')}</p>
        </div>
        <figure className="hero-artwork reveal">
          <svg className="hero-monitor" viewBox="660 80 880 850" width="880" height="850" role="img" aria-label={t('보안 방패를 표시한 모니터를 표현한 Oryx DataSafe 콘셉트 이미지.')}>
            <defs>
              <filter id="monitor-edge-feather"><feGaussianBlur stdDeviation="8" /></filter>
              <filter id="lock-removal-feather"><feGaussianBlur stdDeviation="3" /></filter>
              <clipPath id="lock-safe-region"><path d="M1005 375H1096V490L1083 532L1067 553H998L979 530L978 395Z" /></clipPath>
              <linearGradient id="lock-screen-fill" gradientUnits="userSpaceOnUse" x1="980" y1="380" x2="1090" y2="550">
                <stop stopColor="#012b55" /><stop offset=".5" stopColor="#012a54" /><stop offset="1" stopColor="#002d5b" />
              </linearGradient>
              <mask id="monitor-edge-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024">
                <path d="M760 0H1536V1024H650L660 900L682 760L698 670L717 530L737 420L760 260Z" fill="white" filter="url(#monitor-edge-feather)" />
                <path d="M1046 354Q1005 383 962 399L957 452C953 511 976 549 1024 580C1090 565 1118 498 1126 388Q1082 377 1046 354Z" fill="black" filter="url(#lock-removal-feather)" />
                <rect className="hero-lock-exclusion" x="985" y="392" width="95" height="148" fill="black" clipPath="url(#lock-safe-region)" />
              </mask>
              <filter id="lock-edge-feather"><feGaussianBlur stdDeviation="1.8" /></filter>
              <mask id="lock-light-mask" maskUnits="userSpaceOnUse" x="967" y="367" width="137" height="197">
                <path d="M1005 375H1096V490L1083 532L1067 553H998L979 530L978 395Z" fill="white" filter="url(#lock-edge-feather)" clipPath="url(#lock-safe-region)" />
              </mask>
            </defs>
            <g className="hero-lock-background" aria-hidden="true"><rect x="945" y="340" width="195" height="255" fill="url(#lock-screen-fill)" /></g>
            <image href="/oryx-datasafe-monitor-hero.webp" width="1536" height="1024" mask="url(#monitor-edge-mask)" aria-hidden="true" />
            <text className="hero-security-label" x="0" y="0" textAnchor="middle" transform="matrix(1 0.029 -0.087 1 1019 658)" aria-hidden="true">DATA SECURITY</text>
            <g className="hero-lock-light" aria-hidden="true">
              <image className="hero-lock-pulse" href="/oryx-datasafe-monitor-hero.webp" width="1536" height="1024" mask="url(#lock-light-mask)" />
            </g>
          </svg>
        </figure>
      </div>
      <div className="container hero-bottom"><span>{t('RECORDS. SIGNATURES. INTEGRITY.')}</span><a href="#implementation">{t('도입 과정 살펴보기')}<ArrowRight size={14} aria-hidden="true" /></a></div>
    </section>
    <section className="proof-strip" aria-label={t('DataSafe 소프트웨어 기능')}>
      <div className="container proof-grid">
        <div className="proof-intro"><span className="section-kicker">{t('RECORDS & DATA SECURITY')}</span><p>{t('IT 소프트웨어로 기록 관리의 흐름을 연결합니다.')}</p></div>
        <div className="proof-item"><strong>{t('기록 보호')}</strong><p>{t('파일 보호 · 해시 변경 확인')}</p></div>
        <div className="proof-item proof-focus"><strong>{t('서명과 이력')}</strong><p>{t('역할별 전자서명 · Audit Trail')}</p></div>
      </div>
    </section>
  </>;
}
