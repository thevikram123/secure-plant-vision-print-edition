import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

import { Hero } from "@/components/site/Hero";
import { WhyNow } from "@/components/site/WhyNow";
import { Segments } from "@/components/site/Segments";
import { PlantBlocks } from "@/components/site/PlantBlocks";
import { AsIsAssessment } from "@/components/site/AsIsAssessment";
import { ToBeArchitecture } from "@/components/site/ToBeArchitecture";
import { UseCases } from "@/components/site/UseCases";
import { Offerings } from "@/components/site/Offerings";
import { Deliverables } from "@/components/site/Deliverables";
import { WhyEy } from "@/components/site/WhyEy";
import { CredentialsFootprint, PowerEngagements } from "@/components/site/Credentials";
import { ClosingCta } from "@/components/site/ClosingCta";
import eyLogo from "@/assets/ey-logo.png";

const PRESENTATION_NAV_HEIGHT = 44;

const slides: Array<{ id: string; label: string; Component: ComponentType }> = [
  { id: "top", label: "Overview", Component: Hero },
  { id: "why-now", label: "Why now", Component: WhyNow },
  { id: "segments", label: "Segments", Component: Segments },
  { id: "plant-blocks", label: "Security zones", Component: PlantBlocks },
  { id: "as-is", label: "As-is assessment", Component: AsIsAssessment },
  { id: "to-be", label: "To-be architecture", Component: ToBeArchitecture },
  { id: "use-cases", label: "Use cases", Component: UseCases },
  { id: "offerings", label: "EY support", Component: Offerings },
  { id: "deliverables", label: "Deliverables", Component: Deliverables },
  { id: "why-ey", label: "What EY brings", Component: WhyEy },
  { id: "credentials", label: "Credentials 1/2", Component: CredentialsFootprint },
  { id: "credentials-power", label: "Credentials 2/2", Component: PowerEngagements },
  { id: "closing", label: "Next step", Component: ClosingCta },
];

function initialSlide() {
  if (typeof window === "undefined") return 0;
  const id = new URLSearchParams(window.location.search).get("slide") ?? "";
  const index = slides.findIndex((slide) => slide.id === id);
  return index >= 0 ? index : 0;
}

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return Boolean(
    element &&
      (element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT" ||
        element.isContentEditable),
  );
}

export function PresentationApp() {
  const [active, setActive] = useState(initialSlide);
  const [fullscreen, setFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wheelLockRef = useRef(0);
  const pointerStartRef = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const index = Math.max(0, Math.min(slides.length - 1, next));
    setActive(index);
    const url = new URL(window.location.href);
    url.searchParams.set("slide", slides[index]!.id);
    url.hash = "";
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, []);

  const fitSlides = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const availableHeight = window.innerHeight - PRESENTATION_NAV_HEIGHT;
    const viewportWidth = window.innerWidth;

    root.querySelectorAll<HTMLElement>(".presentation-slide").forEach((frame) => {
      const canvas = frame.querySelector<HTMLElement>(":scope > .presentation-canvas");
      const section = canvas?.firstElementChild as HTMLElement | null;
      if (!canvas || !section) return;
      const inner = section.firstElementChild as HTMLElement | null;

      canvas.style.width = `${viewportWidth}px`;
      canvas.style.left = "0px";
      canvas.style.transform = "none";
      section.style.zoom = "";
      section.style.width = `${viewportWidth}px`;
      section.style.maxHeight = "none";
      section.style.overflowY = "visible";
      if (inner) inner.style.maxWidth = `${Math.max(1152, viewportWidth - 96)}px`;

      const maxScale =
        section.id === "top"
          ? 1
          : section.id === "closing"
            ? 1.6
          : section.id === "as-is"
            ? 1.2
            : 1.3;
      const minReadableScale = 0;

      // Responsive layouts change height as their width changes. Search for the
      // largest scale that fits after reflow instead of reserving an empty band.
      let low = 0.35;
      let high = maxScale;
      let fittedScale = low;
      for (let pass = 0; pass < 14; pass += 1) {
        const candidate = (low + high) / 2;
        const candidateWidth = viewportWidth / candidate;
        canvas.style.width = `${candidateWidth}px`;
        section.style.width = `${candidateWidth}px`;
        if (inner) inner.style.maxWidth = `${Math.max(1152, candidateWidth - 96)}px`;
        const candidateHeight = Math.max(section.scrollHeight, section.offsetHeight);
        if (candidateHeight * candidate <= availableHeight - 1) {
          fittedScale = candidate;
          low = candidate;
        } else {
          high = candidate;
        }
      }

      const scale = Math.max(minReadableScale, fittedScale);
      const canvasWidth = viewportWidth / scale;
      canvas.style.width = `${canvasWidth}px`;
      section.style.width = `${canvasWidth}px`;
      if (inner) inner.style.maxWidth = `${Math.max(1152, canvasWidth - 96)}px`;
      canvas.style.left = "0px";
      canvas.style.transform = `scale(${scale})`;
      frame.style.backgroundColor = getComputedStyle(section).backgroundColor;
    });
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.title = "Presentation | Integrated Surveillance & Security Modernization";

    const runFit = () => requestAnimationFrame(fitSlides);
    runFit();
    document.fonts.ready.then(runFit);
    const delayedFit = window.setTimeout(runFit, 700);
    const resizeObserver = new ResizeObserver(runFit);
    rootRef.current
      ?.querySelectorAll<HTMLElement>(".presentation-canvas > section")
      .forEach((section) => resizeObserver.observe(section));
    window.addEventListener("resize", runFit);
    const onFullscreen = () => {
      setFullscreen(Boolean(document.fullscreenElement));
      runFit();
    };
    document.addEventListener("fullscreenchange", onFullscreen);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(delayedFit);
      resizeObserver.disconnect();
      window.removeEventListener("resize", runFit);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [fitSlides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(active + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(active - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  const onWheel = (event: React.WheelEvent) => {
    const nestedScroller = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      "[data-presentation-scroll]",
    );
    if (nestedScroller && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
      if (nestedScroller.scrollHeight > nestedScroller.clientHeight + 1) return;
    }

    const now = Date.now();
    if (now < wheelLockRef.current) return;
    const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(movement) < 24) return;
    wheelLockRef.current = now + 650;
    goTo(active + (movement > 0 ? 1 : -1));
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await rootRef.current?.requestFullscreen();
  };

  return (
    <div
      ref={rootRef}
      className="presentation-root relative flex h-screen w-screen flex-col overflow-hidden bg-navy"
      onWheel={onWheel}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement | null)?.closest(".presentation-header")) return;
        pointerStartRef.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const start = pointerStartRef.current;
        pointerStartRef.current = null;
        if (start === null || Math.abs(event.clientX - start) < 60) return;
        goTo(active + (event.clientX < start ? 1 : -1));
      }}
    >
      <header className="presentation-header order-2 relative z-50 flex h-11 shrink-0 items-center border-t border-white/10 bg-[#1f1b19] px-3 text-white">
        <a href="./" className="flex shrink-0 items-center gap-1.5 pr-3" aria-label="EY Security modernization">
          <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-sm bg-black" aria-hidden="true">
            <img
              src={eyLogo}
              alt=""
              className="absolute -left-[21px] -top-[9px] h-auto w-[73px] max-w-none"
            />
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 2xl:inline">
            Security modernization
          </span>
        </a>

        <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto py-1" aria-label="Presentation sections">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={`shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap transition-colors ${
                index === active
                  ? "bg-[#ffe600] text-[#1f1b19]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {slide.label}
            </button>
          ))}
        </nav>

        <div className="ml-2 flex shrink-0 items-center gap-0.5 border-l border-white/15 pl-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-white/10 disabled:opacity-30"
            aria-label="Previous slide"
          >
            <ArrowLeft size={17} />
          </button>
          <span className="min-w-14 text-center font-mono text-[11px] text-white/60">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === slides.length - 1}
            className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-white/10 disabled:opacity-30"
            aria-label="Next slide"
          >
            <ArrowRight size={17} />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-white/10"
            aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
          >
            <Expand size={16} />
          </button>
          <a
            href="./"
            className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-white/10"
            aria-label="Exit presentation"
          >
            <X size={17} />
          </a>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-black/20">
          <div
            className="h-full bg-[#ffe600] transition-[width] duration-500"
            style={{ width: `${((active + 1) / slides.length) * 100}%` }}
          />
        </div>
      </header>

      <main
        className="order-1 flex h-[calc(100vh-2.75rem)] transition-transform duration-500 ease-[cubic-bezier(.22,.8,.24,1)] motion-reduce:transition-none"
        style={{ transform: `translate3d(-${active * 100}vw, 0, 0)` }}
      >
        {slides.map(({ id, label, Component }, index) => {
          const verticallyScrollable = false;
          return (
            <div
              key={id}
              data-presentation-scroll={verticallyScrollable ? "true" : undefined}
              className={`presentation-slide relative h-[calc(100vh-2.75rem)] w-screen shrink-0 ${
                verticallyScrollable ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
              }`}
              aria-hidden={index !== active}
              aria-label={`${index + 1}. ${label}`}
            >
              <div className="presentation-canvas absolute top-0 origin-top-left">
                <Component />
              </div>
            </div>
          );
        })}
      </main>

    </div>
  );
}
