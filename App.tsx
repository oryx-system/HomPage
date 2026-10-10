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
  const [currentSection, setCurrentSection] = useState("home");
  useRevealMotion(mainRef);

  useLayoutEffect(() => {
    const resolveAnchor = (initial = false) => {
      const hash = window.location.hash.slice(1);
      const legacy = hash.startsWith("/");
      const anchor = legacy ? legacyAnchors[hash.replace(/\/+$/, "") || "/"] ?? "home" : sections.includes(hash) ? hash : "home";
      if (legacy) window.history.replaceState(null, "", `#${anchor}`);
      const target = document.getElementById(anchor);
      if (hash && target) {
        target.focus({ preventScroll: true });
        if (initial || legacy) target.scrollIntoView({ block: "start", behavior: initial || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
      setCurrentSection(anchor);
    };
    const onHash = () => resolveAnchor();
    resolveAnchor(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
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
