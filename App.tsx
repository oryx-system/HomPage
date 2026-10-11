import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OnePage from "./views/OnePage";
import { useRevealMotion } from "./hooks/useRevealMotion";
import { useLanguage } from "./i18n";
import "./styles.css";
import "./one-page.css";

const sections = ["home", "about", "datastation", "lockdown", "calibration", "brochures", "implementation", "validation", "privacy", "contact"];
const legacyAnchors: Record<string, string> = {
  "/": "home", "/home": "home", "/products": "datastation", "/solutions": "datastation",
  "/equipment": "datastation", "/necessity": "datastation", "/datastation": "datastation",
  "/lockdown": "lockdown", "/calibration": "calibration", "/resources": "brochures", "/brochures": "brochures",
  "/implementation": "implementation", "/validation": "validation", "/guide": "validation",
  "/concept": "validation", "/security": "validation", "/podcast": "validation", "/blog": "validation",
  "/about": "about", "/contact": "contact", "/pricing": "contact", "/support": "contact",
  "/portal": "contact", "/demo": "contact", "/comparison": "datastation", "/privacy": "privacy",
};

export default function App() {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const pendingRestoration = useRef<ScrollRestoration | null>(null);
  const [currentSection, setCurrentSection] = useState("home");
  useRevealMotion(mainRef);

  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const restoringDocument = navigation?.type === 'reload' || navigation?.type === 'back_forward';
    // The browser can attempt restoration before React has rendered a tall document.
    // Retain this tab's reading position for reloads; history traversal stays native.
    const positionKey = 'oryx-datasafe-reload-position';
    let saved: { url?: string; x?: number; y?: number } | null = null;
    try { saved = JSON.parse(window.sessionStorage.getItem(positionKey) || 'null'); } catch { /* Storage may be unavailable. */ }
    if (navigation?.type === 'reload' && saved?.url === window.location.href && typeof saved.x === 'number' && typeof saved.y === 'number' && Number.isFinite(saved.x) && Number.isFinite(saved.y) && saved.x >= 0 && saved.y >= 0) {
      pendingRestoration.current = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      if (Math.abs(window.scrollX - saved.x) > 1 || Math.abs(window.scrollY - saved.y) > 1) {
        window.scrollTo({ left: saved.x, top: saved.y, behavior: 'instant' });
      }
    }
    const rememberDocumentPosition = () => {
      try {
        window.sessionStorage.setItem(positionKey, JSON.stringify({ url: window.location.href, x: window.scrollX, y: window.scrollY }));
      } catch { /* Native restoration remains available when storage is disabled. */ }
    };
    const resolveAnchor = (initial = false) => {
      const hash = window.location.hash.slice(1);
      const legacy = hash.startsWith("/");
      const anchor = legacy ? legacyAnchors[hash.replace(/\/+$/, "") || "/"] ?? "home" : sections.includes(hash) ? hash : "home";
      if (legacy) window.history.replaceState(window.history.state, "", `#${anchor}`);
      const target = document.getElementById(anchor);
      if (hash && target && (!initial || !restoringDocument)) {
        target.focus({ preventScroll: true });
        if (initial || legacy) target.scrollIntoView({ block: "start", behavior: initial || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
      setCurrentSection(anchor);
    };
    const onHash = () => resolveAnchor();
    resolveAnchor(true);
    window.addEventListener("hashchange", onHash);
    window.addEventListener('pagehide', rememberDocumentPosition);
    window.addEventListener('scroll', rememberDocumentPosition, { passive: true });
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener('pagehide', rememberDocumentPosition);
      window.removeEventListener('scroll', rememberDocumentPosition);
      if (pendingRestoration.current !== null) {
        window.history.scrollRestoration = pendingRestoration.current;
        pendingRestoration.current = null;
      }
    };
  }, []);

  // Native document restoration must finish without CSS scroll animation.
  // Smooth movement remains available for navigation after the page has loaded.
  useEffect(() => {
    let frame = 0;
    const enableNavigationMotion = () => {
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          if (pendingRestoration.current !== null) {
            window.history.scrollRestoration = pendingRestoration.current;
            pendingRestoration.current = null;
          }
          document.documentElement.setAttribute('data-navigation-ready', '');
        });
      });
    };
    if (document.readyState === 'complete') enableNavigationMotion();
    else window.addEventListener('load', enableNavigationMotion, { once: true });
    return () => {
      window.removeEventListener('load', enableNavigationMotion);
      window.cancelAnimationFrame(frame);
      document.documentElement.removeAttribute('data-navigation-ready');
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (document.querySelector(".site-header")?.getBoundingClientRect().height ?? 94) + 60;
      let active = "home";
      for (const id of sections) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line) active = id;
      }
      setCurrentSection(active);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>{t('본문 바로가기')}</a>
      <Navbar currentPath={currentSection} />
      <main id="main-content" ref={mainRef} tabIndex={-1}><OnePage /></main>
      <Footer />
    </>
  );
}
