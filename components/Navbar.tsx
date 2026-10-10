import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n";
import LanguagePicker from "./LanguagePicker";
import Logo from "./Logo";
const links = [
  { path: "datastation", label: "DataStation" },
  { path: "lockdown", label: "LockDown" },
  { path: "calibration", label: "Calibration" },
  { path: "brochures", label: "브로셔" },
  { path: "implementation", label: "도입 과정" },
  { path: "about", label: "회사 소개" },
];
export default function Navbar({ currentPath }: { currentPath: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const restoreOpener = useRef(true);
  const close = (restoreFocus = true) => {
    if (dialog.current?.open) restoreOpener.current = restoreFocus;
    dialog.current?.close();
    setOpen(false);
  };
  const keepFocusInMenu = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    )).filter(item => item.getClientRects().length > 0);
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    const oldOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1200px)");
    const onResize = () => {
      if (media.matches) close();
    };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);
  useEffect(() => {
    const onAnchorChange = () => close(false);
    window.addEventListener("hashchange", onAnchorChange);
    return () => window.removeEventListener("hashchange", onAnchorChange);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#home" aria-label={t("Oryx DataSafe 홈")}>
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label={t("주 메뉴")}>
          {links.map(({ path, label }) => (
            <a
              key={path}
              href={`#${path}`}
              aria-current={currentPath === path ? "location" : undefined}
            >
              {t(label)}
            </a>
          ))}
        </nav>
        <LanguagePicker />
        <a className="button button-primary header-cta" href="#contact">
          {t("도입 문의")} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={trigger}
          type="button"
          className="menu-trigger"
          aria-label={t("메뉴 열기")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={25} aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label={t("전체 메뉴")}
        onKeyDown={keepFocusInMenu}
        onCancel={() => {
          restoreOpener.current = true;
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
          if (restoreOpener.current) trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-header">
            <Logo />
            <button
              type="button"
              className="menu-trigger"
              aria-label={t("메뉴 닫기")}
              onClick={() => close()}
              autoFocus
            >
              <X size={25} aria-hidden="true" />
            </button>
          </div>
          <span className="section-kicker">ORYX DATASAFE</span>
          <nav aria-label={t("모바일 주 메뉴")}>
            <a
              href="#home"
              aria-current={currentPath === "home" ? "location" : undefined}
              onClick={() => close(false)}
            >
              {t("홈")} <ArrowUpRight aria-hidden="true" />
            </a>
            {links.map(({ path, label }) => (
              <a
                key={path}
                href={`#${path}`}
                aria-current={currentPath === path ? "location" : undefined}
                onClick={() => close(false)}
              >
                {t(label)}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <a className="button button-primary" href="#contact" onClick={() => close(false)}>
            {t("도입 문의")} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="mobile-menu-contact">
            <p>{t("현장에 맞는 시작을 함께 찾습니다.")}</p>
            <a href="mailto:schong@oryxsystem.co.kr">schong@oryxsystem.co.kr</a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
