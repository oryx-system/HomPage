import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  const links = [['about', '회사 소개'], ['datastation', 'Oryx DataStation'], ['lockdown', 'Oryx LockDown'], ['calibration', 'Oryx Calibration'], ['brochures', '제품 브로셔'], ['implementation', '도입 과정'], ['validation', '규제 검토 가이드'], ['contact', '제품 및 도입 문의'], ['privacy', '개인정보 안내']];
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand">
        <a href="#home" aria-label={t('Oryx DataSafe 홈')}><Logo /></a>
        <a className="text-link" href="https://oryxsystem.co.kr" target="_blank" rel="noopener noreferrer">{t('관련 사이트 · Oryx System')}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">{t(' (새 탭)')}</span></a>
      </div>
      <nav aria-label={t('하단 메뉴')}><p className="footer-label">DATASAFE</p>{links.map(([id,label])=><a key={id} href={`#${id}`}>{t(label)}</a>)}</nav>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Oryx DataSafe. {t('All rights reserved.')}</p></div>
  </div></footer>;
}
