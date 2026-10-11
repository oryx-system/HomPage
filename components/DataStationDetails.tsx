import { useEffect, useRef, useState, type ReactNode } from 'react';

// Keep native summary keyboard semantics, but own its height change so the
// browser never expands the entire disclosure as a default click action.
export default function DataStationDetails({ label, children }: { label: string; children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const expandedRef = useRef(false);
  const contentSizeRef = useRef<{ width: number; height: number } | null>(null);
  const scrollFrameRef = useRef(0);
  const motionStyleRef = useRef<{ value: string; priority: string } | null>(null);
  const [expanded, setExpanded] = useState(false);

  const releaseScroll = () => {
    window.cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = 0;
    const previous = motionStyleRef.current;
    if (previous) {
      if (previous.value) document.documentElement.style.setProperty('scroll-behavior', previous.value, previous.priority);
      else document.documentElement.style.removeProperty('scroll-behavior');
      motionStyleRef.current = null;
    }
  };

  const transition = (next: boolean) => {
    const details = detailsRef.current!;
    const content = contentRef.current!;
    const summary = details.querySelector('summary')!;
    // An already submitted compositor scroll can survive the first cancellation.
    // Drain its next two frames, then release; new user input releases immediately.
    releaseScroll();
    const position = { left: window.scrollX, top: window.scrollY, behavior: 'instant' as const };
    const html = document.documentElement;
    motionStyleRef.current = { value: html.style.getPropertyValue('scroll-behavior'), priority: html.style.getPropertyPriority('scroll-behavior') };
    html.style.setProperty('scroll-behavior', 'auto', 'important');
    window.scrollTo(position);
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      window.scrollTo(position);
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        window.scrollTo(position);
        releaseScroll();
      });
    });
    const start = details.getBoundingClientRect().height;
    // Capture the rendered height before cancellation, including a reversal.
    details.style.height = `${start}px`;
    animationRef.current?.cancel();
    animationRef.current = null;
    expandedRef.current = next;
    setExpanded(next);
    summary.focus({ preventScroll: true });
    details.open = true;
    content.inert = !next;
    const contentSize = content.getBoundingClientRect();
    contentSizeRef.current = { width: contentSize.width, height: contentSize.height };
    const style = getComputedStyle(details);
    const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const target = summary.getBoundingClientRect().height + border + (next ? content.getBoundingClientRect().height : 0);
    const finish = () => {
      details.open = next;
      details.style.removeProperty('height');
      animationRef.current = null;
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !details.animate) {
      finish();
      return;
    }
    details.style.height = `${target}px`;
    const animation = details.animate([{ height: `${start}px` }, { height: `${target}px` }], {
      duration: 300, easing: 'cubic-bezier(.2,.65,.3,1)',
    });
    animationRef.current = animation;
    animation.onfinish = () => { if (animationRef.current === animation) finish(); };
  };

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      const details = detailsRef.current;
      animationRef.current?.cancel();
      animationRef.current = null;
      if (details) {
        details.open = expandedRef.current;
        details.style.removeProperty('height');
      }
    };
    // A translation or viewport resize must not leave a stale fixed height.
    const observer = new ResizeObserver(() => {
      if (!detailsRef.current?.open) return;
      const size = contentRef.current!.getBoundingClientRect();
      const previous = contentSizeRef.current;
      contentSizeRef.current = { width: size.width, height: size.height };
      if (animationRef.current && previous && (Math.abs(size.width - previous.width) > 1 || Math.abs(size.height - previous.height) > 1)) settle();
    });
    observer.observe(contentRef.current!);
    const onPreference = () => { if (preference.matches) settle(); };
    const onKey = (event: KeyboardEvent) => {
      if (!((event.key === 'Enter' || event.key === ' ') && event.target instanceof Element && event.target.matches('.ds-detail-group > summary'))) releaseScroll();
    };
    preference.addEventListener('change', onPreference);
    window.addEventListener('wheel', releaseScroll, { passive: true });
    window.addEventListener('touchmove', releaseScroll, { passive: true });
    window.addEventListener('pointerdown', releaseScroll, { passive: true });
    window.addEventListener('hashchange', releaseScroll);
    window.addEventListener('keydown', onKey);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', onPreference);
      animationRef.current?.cancel();
      releaseScroll();
      window.removeEventListener('wheel', releaseScroll);
      window.removeEventListener('touchmove', releaseScroll);
      window.removeEventListener('pointerdown', releaseScroll);
      window.removeEventListener('hashchange', releaseScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <details ref={detailsRef} className="product-details ds-detail-group ds-animated-details">
      <summary aria-expanded={expanded} aria-controls="ds-disclosure-content" onClick={event => {
        event.preventDefault();
        transition(!expandedRef.current);
      }} onKeyDown={event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        // Space must not start a separate native page scroll before keyup.
        event.preventDefault();
        if (!event.repeat) transition(!expandedRef.current);
      }}>{label}</summary>
      <div ref={contentRef} id="ds-disclosure-content" className="ds-disclosure-content" aria-hidden={!expanded} inert={!expanded}>
        {children}
      </div>
    </details>
  );
}
