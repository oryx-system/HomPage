import Logo from './Logo';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  const links = [['about', '회사 소개'], ['brochures', '제품 브로셔'], ['implementation', '도입 과정'], ['privacy', '개인정보 안내'], ['contact', '제품 및 도입 문의']];
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <a className="footer-brand" href="#home" aria-label={t('Oryx DataSafe 홈')}><Logo /></a>
      <nav aria-label={t('하단 메뉴')}>{links.map(([id, label]) => <a key={id} href={`#${id}`}>{t(label)}</a>)}</nav>
      <a className="back-top" href="#home">{t('맨 위로')}</a>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Oryx DataSafe. {t('All rights reserved.')}</span>
      <span>{t('IT SOFTWARE & DATA SECURITY')}</span>
      <a className="footer-related" href="https://oryxsystem.co.kr" target="_blank" rel="noopener noreferrer">{t('관련 사이트 · Oryx System')}<span className="sr-only">{t(' (새 탭)')}</span></a>
    </div>
  </div></footer>;
}
