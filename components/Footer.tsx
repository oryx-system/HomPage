import Logo from './Logo';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <a className="footer-brand" href="#home" aria-label={t('Oryx DataSafe 홈')}><Logo /></a>
      <div className="footer-company">
        <strong>{t('오릭스 데이터세이프')}</strong>
        <p>{t('대표 홍승철')}<span>{t('충청남도 금산군 비호산로 4, 1층')}</span></p>
        <p><a href="tel:+821065450415">010-6545-0415</a><span><a href="mailto:schong@oryxsystem.co.kr">schong@oryxsystem.co.kr</a></span></p>
      </div>
      <a className="back-top" href="#home">{t('맨 위로')}</a>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Oryx DataSafe. {t('All rights reserved.')}</span>
      <span>{t('IT SOFTWARE & DATA SECURITY')}</span>
      <a className="footer-related" href="https://oryxsystem.co.kr" target="_blank" rel="noopener noreferrer">{t('관련 사이트 · Oryx System')}<span className="sr-only">{t(' (새 탭)')}</span></a>
    </div>
  </div></footer>;
}
