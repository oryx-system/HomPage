import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  const links = [['datastation', 'Oryx DataStation'], ['lockdown', 'Oryx LockDown'], ['calibration', 'Oryx Calibration'], ['brochures', '제품 브로셔'], ['implementation', '도입 과정'], ['validation', '규제 검토 가이드'], ['about', '회사 소개']];
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div className="footer-brand">
        <a href="https://oryxsystem.co.kr" target="_blank" rel="noopener noreferrer" aria-label={t('오릭스 시스템 사이트')}><Logo variant="company" /></a>
        <p>{t('현장의 기록을, 신뢰할 수 있는 데이터로.')}<br />{t('오릭스 시스템의 전자기록·전자서명·데이터 무결성 솔루션.')}</p>
        <a className="text-link" href="https://oryxsystem.co.kr" target="_blank" rel="noopener noreferrer">{t('오릭스 시스템 사이트')}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">{t(' (새 탭)')}</span></a>
      </div>
      <nav aria-label={t('하단 메뉴')}><p className="footer-label">DATASAFE</p>{links.map(([id,label])=><a key={id} href={`#${id}`}>{t(label)}</a>)}</nav>
      <div className="footer-contact"><p className="footer-label">{t('LET’S TALK')}</p>
        <a href="mailto:schong@oryxsystem.co.kr"><Mail size={16} aria-hidden="true" />schong@oryxsystem.co.kr</a>
        <a href="tel:+821065450415"><Phone size={16} aria-hidden="true" />+82-10-6545-0415</a>
        <p>{t('충청남도 금산군 비호산로 4 1층')}</p>
      </div>
    </div>
    <div className="footer-bottom"><div><p>{t('오릭스 시스템 · 대표 홍승철')}</p><p>© {new Date().getFullYear()} Oryx System. {t('All rights reserved.')}</p></div><a href="#privacy">{t('문의와 개인정보 안내')}</a><a href="#contact">{t('견적 및 자료 문의')}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
  </div></footer>;
}
