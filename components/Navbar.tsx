import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "../i18n";
import LanguagePicker from "./LanguagePicker";
import Logo from "./Logo";
const links = [
  { path: "about", label: "회사 소개" },
  { path: "datastation", label: "DataStation" },
  { path: "lockdown", label: "LockDown" },
  { path: "calibration", label: "Calibration" },
  { path: "brochures", label: "브로셔" },
  { path: "implementation", label: "도입 과정" },
];
export default function Navbar({ currentPath }: { currentPath: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  };
  const menuKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (!open || event.defaultPrevented) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
  };
  useLayoutEffect(() => {
    const element = header.current;
    if (!element) return;
    const viewport = window.visualViewport;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const bottom = element.getBoundingClientRect().bottom;
      const viewportBottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
      element.style.setProperty("--mobile-menu-height", `${Math.max(0, viewportBottom - bottom)}px`);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    window.addEventListener("resize", schedule);
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);
    measure();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
    };
  }, []);
  useLayoutEffect(() => {
    if (!open) return;
    if (panel.current) panel.current.scrollTop = 0;
    panel.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (panel.current?.contains(event.target) || trigger.current?.contains(event.target) ||
        header.current?.querySelector(".language-picker")?.contains(event.target)) return;
      close(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
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
    <header className="site-header" ref={header} onKeyDown={menuKeyboard} onBlur={event => {
      if (open && (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget))) close(false);
    }}>
      <div className="header-inner container">
        <a className="brand" href="#home" aria-label={t("Oryx DataSafe 홈")} onClick={() => close(false)}>
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
        <a className="button button-primary header-cta" href="#contact" onClick={() => close(false)}>
          {t("도입 문의")} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={trigger}
          type="button"
          className="menu-trigger"
          aria-label={t(open ? "메뉴 닫기" : "메뉴 열기")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => open ? close() : setOpen(true)}
        >
          {open ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
        </button>
      </div>
      <div
        ref={panel}
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        role="region"
        aria-label={t("전체 메뉴")}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-menu-inner">
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
          </div>
        </div>
      </div>
    </header>
  );
}
