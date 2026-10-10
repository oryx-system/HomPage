import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown, Globe2 } from 'lucide-react';
import { useLanguage, type Language } from '../i18n';

const options: { language: Language; label: string }[] = [{ language: 'ko', label: '한국어' }, { language: 'en', label: 'English' }, { language: 'ru', label: 'Русский' }];

export default function LanguagePicker() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = (restore = false) => { setOpen(false); if (restore) trigger.current?.focus({ preventScroll: true }); };
  useLayoutEffect(() => { if (open) wrapper.current?.querySelector<HTMLButtonElement>(`[data-language="${language}"]`)?.focus({ preventScroll: true }); }, [open]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !wrapper.current?.contains(event.target)) close(); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (!open) { setOpen(true); return; }
    const buttons = Array.from(wrapper.current?.querySelectorAll<HTMLButtonElement>('[data-language]') ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowUp' ? -1 : 1) + buttons.length) % buttons.length;
    buttons[next]?.focus({ preventScroll: true });
  };
  return <div className="language-picker" ref={wrapper} onKeyDown={keyboard} onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) close(); }}>
    <button ref={trigger} type="button" className="language-trigger" aria-label={`${t('언어 선택')}: ${options.find(o => o.language === language)?.label}`} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? 'language-options' : undefined} onClick={() => setOpen(!open)}><Globe2 size={18} aria-hidden="true" /><span>{options.find(o => o.language === language)?.label}</span><ChevronDown size={14} aria-hidden="true" /></button>
    {open && <div id="language-options" className="language-options" role="menu" aria-label={t('언어 선택')}>{options.map(option => <button key={option.language} type="button" role="menuitemradio" aria-checked={language === option.language} data-language={option.language} lang={option.language} onClick={() => { setLanguage(option.language); close(true); }}>{option.label}<span aria-hidden="true">{language === option.language ? '✓' : ''}</span></button>)}</div>}
  </div>;
}
