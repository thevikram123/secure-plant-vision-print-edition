import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const sectionIds = [
  "top",
  "why-now",
  "segments",
  "plant-blocks",
  "as-is",
  "to-be",
  "use-cases",
  "offerings",
  "deliverables",
  "why-ey",
  "credentials",
  "closing",
] as const;

const labels: Record<string, string> = {
  top: "Overview",
  "why-now": "Why now",
  segments: "Segments",
  "plant-blocks": "Security zones",
  "as-is": "As-is",
  "to-be": "To-be",
  "use-cases": "Use cases",
  offerings: "EY support",
  deliverables: "Deliverables",
  "why-ey": "What EY brings",
  credentials: "Credentials",
  closing: "Next step",
};

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable === true
  );
}

export function DeckNavigation() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const targetTop = useRef<number | null>(null);
  const lockUntil = useRef(0);

  const setActiveIndex = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  // Scale each section down (if needed) so it fits fully in the viewport.
  const fitSections = useCallback(() => {
    const nav = document.querySelector("header");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const available = window.innerHeight - navHeight;
    const enable = window.innerWidth >= 1024 && available > 480;
    sectionIds.forEach((id) => {
      const el = document.getElementById(id) as HTMLElement | null;
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      el.style.zoom = "";
      if (inner) inner.style.maxWidth = "";
      el.style.overflowY = "";
      el.style.maxHeight = "";
      if (!enable) return;
      // Iterate: measure the unscaled layout height, derive the scale needed, and
      // widen the content container so the shrunken section still fills the screen.
      let scale = 1;
      let widened = false;
      for (let pass = 0; pass < 5; pass++) {
        const height = el.offsetHeight;
        // Never shrink past a legibility floor — text must stay readable on a
        // projector. Sections that still overflow scroll internally instead.
        const next = Math.max(0.78, Math.min(1, (available / height) * 0.995));
        const settled = Math.abs(next - scale) < 0.008;
        scale = next;
        if (!inner || settled) break;
        inner.style.maxWidth = `${Math.round((window.innerWidth - 64) / scale)}px`;
        widened = true;
      }
      if (scale >= 1 && !widened) {
        if (inner) inner.style.maxWidth = "";
        return;
      }
      if (scale < 1) el.style.zoom = String(Math.round(scale * 1000) / 1000);
      // If a section still exceeds the viewport at the legibility floor, it simply
      // scrolls with the page — type is never shrunk further to force a fit.
    });
  }, []);

  useEffect(() => {
    const run = () => fitSections();
    const id = window.setTimeout(run, 300);
    const id2 = window.setTimeout(run, 1200);
    window.addEventListener("resize", run);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(id2);
      window.removeEventListener("resize", run);
    };
  }, [fitSections]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(sectionIds.length - 1, index));
    const el = document.getElementById(sectionIds[clamped]!);
    if (!el) return;
    setActiveIndex(clamped);
    fitSections();
    const nav = document.querySelector("header");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    targetTop.current = top;
    lockUntil.current = Date.now() + 3000;
    window.scrollTo({ top, behavior: "smooth" });
  }, [setActiveIndex, fitSections]);

  // Which section is currently framed, measured live from scroll position.
  const currentIndex = useCallback(() => {
    const nav = document.querySelector("header");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const dist = Math.abs(el.getBoundingClientRect().top - navHeight);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }, []);

  // Track which section the viewport is currently on.
  useEffect(() => {
    const onScroll = () => {
      if (targetTop.current !== null) {
        const reached = Math.abs(window.scrollY - targetTop.current) < 6;
        if (!reached && Date.now() < lockUntil.current) return;
        targetTop.current = null;
      }
      let current = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = i;
      });
      if (current !== activeRef.current) setActiveIndex(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setActiveIndex]);

  // Arrow-key navigation between sections.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      let delta = 0;
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          delta = 1;
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          delta = -1;
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          return;
        case "End":
          event.preventDefault();
          goTo(sectionIds.length - 1);
          return;
        default:
          return;
      }
      event.preventDefault();
      goTo(currentIndex() + delta);
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [goTo, currentIndex]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex"
    >
      {sectionIds.map((id, i) => (
        <button
          key={id}
          type="button"
          onClick={() => goTo(i)}
          aria-current={i === active ? "true" : undefined}
          aria-label={labels[id] ?? id}
          title={labels[id] ?? id}
          className={cn(
            "h-2 rounded-full transition-all",
            i === active ? "w-6 bg-brand" : "w-2 bg-foreground/20 hover:bg-foreground/40",
          )}
        />
      ))}
      <span className="mt-2 hidden text-sm uppercase tracking-[0.16em] text-muted-foreground lg:block">
        ↑ ↓ keys
      </span>
    </nav>
  );
}
