import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#why-now", label: "Why now" },
  { href: "#segments", label: "Segments" },
  { href: "#plant-blocks", label: "Security zones" },
  { href: "#as-is", label: "As-is" },
  { href: "#to-be", label: "To-be" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#offerings", label: "EY support" },
  { href: "#deliverables", label: "Deliverables" },
  { href: "#credentials", label: "Credentials" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-hairline bg-background/95 backdrop-blur"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 md:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          <a href="#top" className="flex min-w-0 items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">EY</span>
            <span className="hidden text-xs uppercase tracking-[0.12em] text-muted-foreground whitespace-nowrap lg:inline">
              SECURITY MODERNIZATION FOR POWER GENERATION COMPANIES
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="present.html"
              className="rounded-md border border-navy/15 px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-navy/30 hover:bg-navy/[0.04]"
            >
              Present
            </a>
            <a
              href="#closing"
              className="rounded-md bg-navy px-3 py-1.5 text-sm font-semibold text-navy-foreground transition-opacity hover:opacity-90"
            >
              Request assessment
            </a>
          </div>
        </div>
        <nav className="hidden items-center gap-3 border-t border-hairline/60 pb-3 pt-2 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
