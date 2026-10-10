import { useEffect, type RefObject } from "react";

// Official Oryx System motion values. Content is visible before enhancement.
export function useRevealMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Map<Element, Animation>();
    const visited = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        visited.add(entry.target);
        if (reduced.matches || document.hidden || entry.target.contains(document.activeElement)) continue;
        const animation = entry.target.animate(
          [{ opacity: 0.3, transform: "translateY(14px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 560, easing: "cubic-bezier(.2,.65,.3,1)" },
        );
        active.set(entry.target, animation);
        animation.onfinish = () => active.delete(entry.target);
        animation.oncancel = () => active.delete(entry.target);
      }
    }, { threshold: 0.08 });
    const observe = () => element.querySelectorAll(".reveal").forEach(target => { if (!visited.has(target)) observer.observe(target); });
    const cancel = () => { for (const animation of active.values()) animation.cancel(); active.clear(); };
    const onFocus = (event: FocusEvent) => {
      for (const [target, animation] of active) if (event.target instanceof Node && target.contains(event.target)) animation.cancel();
    };
    const visibility = () => { if (document.hidden) cancel(); };
    const preference = () => { if (reduced.matches) cancel(); };
    const mutations = new MutationObserver(observe);
    observe();
    mutations.observe(element, { childList: true, subtree: true });
    document.addEventListener("focusin", onFocus);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    return () => {
      cancel(); observer.disconnect(); mutations.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
    };
  }, [root]);
}
