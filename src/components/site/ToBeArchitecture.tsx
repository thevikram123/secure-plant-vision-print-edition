import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronDown, ShieldHalf, Network as NetworkIcon } from "lucide-react";

import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";
import {
  archLayers,
  cyberRail,
  flows,
  integrationRail,
  principles,
  type ArchLayer,
  type Component,
  type RailGroup,
} from "./toBeArchitectureData";
import perimeterArt from "@/assets/arch-perimeter.jpg";
import commandArt from "@/assets/arch-command.jpg";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

function Chip({ item, tone = "light" }: { item: Component; tone?: "light" | "dark" }) {
  const Icon = item.icon;
  return (
    <span
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-full px-3 py-1.5",
        tone === "dark"
          ? "bg-navy-foreground/10 text-navy-foreground"
          : "bg-ey-green/[0.07] text-ey-green-deep",
      )}
    >
      <Icon size={15} strokeWidth={1.5} className="shrink-0 opacity-80" />
      <span className="min-w-0 truncate text-base font-medium leading-tight">{item.label}</span>
    </span>
  );
}

function FlowBand({ label, lit }: { label: string; lit: boolean }) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-2">
      <span
        className={cn("h-px flex-1 transition-colors", lit ? "bg-ey-yellow" : "bg-ey-yellow/30")}
      />
      <ArrowUp
        size={13}
        strokeWidth={1.6}
        className={cn("shrink-0 transition-colors", lit ? "text-ey-yellow" : "text-ey-yellow/45")}
      />
      <span
        className={cn(
          "shrink-0 text-base font-semibold uppercase tracking-[0.16em] transition-colors",
          lit ? "text-ey-green-deep" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      <span
        className={cn("h-px flex-1 transition-colors", lit ? "bg-ey-yellow" : "bg-ey-yellow/30")}
      />
    </div>
  );
}

function Layer({
  layer,
  index,
  shown,
  open,
  dim,
  onToggle,
  onEnter,
  onLeave,
}: {
  layer: ArchLayer;
  index: number;
  shown: boolean;
  open: boolean;
  dim: boolean;
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const art = layer.id === "field" ? perimeterArt : layer.id === "platform" ? commandArt : null;
  const primary = layer.components.slice(0, layer.primary);
  const hiddenCount = layer.components.length - primary.length;

  return (
    <div
      style={{ transitionDelay: `${index * 90}ms` }}
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={cn(
          "group relative overflow-hidden rounded-2xl transition-all duration-300",
          open
            ? "border border-ey-amber/50 bg-ey-amber/[0.09] shadow-lift"
            : layer.emphasis
              ? "border border-ey-gold/45 bg-surface shadow-lift"
              : "border border-hairline bg-surface/70 shadow-card",
          dim && "opacity-70 saturate-[0.85]",
          !dim && "opacity-100",
        )}
      >
        {art ? (
          <img
            src={art}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1920}
            height={640}
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-full w-full object-cover transition-opacity duration-500",
              layer.emphasis ? "opacity-[0.09]" : "opacity-[0.12]",
              "mix-blend-multiply",
            )}
          />
        ) : null}

        <button
          type="button"
          onClick={onToggle}
          onFocus={onEnter}
          onBlur={onLeave}
          aria-expanded={open}
          className="relative w-full px-4 py-4 text-left md:px-5"
        >
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 md:gap-4">
            <span
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base tabular-nums md:h-11 md:w-11",
                open
                  ? "bg-black font-bold text-white"
                  : layer.emphasis
                    ? "bg-ey-green-deep font-normal text-navy-foreground"
                    : "bg-ey-green/12 font-normal text-ey-green-deep",
              )}
            >
              {layer.number}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block truncate font-bold leading-tight text-ey-green-deep",
                  layer.emphasis ? "text-lg md:text-xl" : "text-lg md:text-lg",
                )}
              >
                {layer.title}
              </span>
              <span className="mt-1 block text-base font-semibold uppercase tracking-[0.18em] text-ey-green">
                {layer.subtitle}
              </span>
            </span>
            <span className="print-hidden flex shrink-0 items-center gap-2 text-base font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="hidden sm:inline">
                {open ? "Hide detail" : hiddenCount > 0 ? `+${hiddenCount} more` : "Detail"}
              </span>
              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className={cn("transition-transform", open && "rotate-180")}
              />
            </span>
          </div>

          {!open ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {primary.map((c) => (
                <Chip key={c.label} item={c} />
              ))}
            </div>
          ) : null}

          {layer.id === "command" ? (
            <div className="mt-3 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-ey-gold/50 bg-ey-gold/10 px-3 py-1.5 text-base font-semibold uppercase tracking-[0.14em] text-ey-green-deep">
              <span>Detect earlier</span>
              <span className="text-ey-gold">&rarr;</span>
              <span>Decide faster</span>
              <span className="text-ey-gold">&rarr;</span>
              <span>Respond better</span>
            </div>
          ) : null}
        </button>

        <div
          className={cn(
            "architecture-layer-detail relative border-t border-hairline px-4 py-4 md:px-5",
            !open && "hidden",
          )}
        >
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {layer.components.map((c) => (
              <div key={c.label} className="flex min-w-0 gap-2.5">
                <c.icon size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ey-green" />
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-tight text-ey-green-deep">
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-base leading-relaxed text-muted-foreground">
                    {c.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CrossRail({
  side,
  eyebrow,
  title,
  strapline,
  groups,
  lit,
  shown,
}: {
  side: "left" | "right";
  eyebrow: string;
  title: string;
  strapline?: string;
  groups: RailGroup[];
  lit: boolean;
  shown: boolean;
}) {
  const dark = true;
  const Icon = side === "left" ? ShieldHalf : NetworkIcon;
  return (
    <aside
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl bg-ey-green-deep text-navy-foreground transition-all duration-500 motion-reduce:transition-none",
        lit ? "ring-2 ring-ey-gold/60" : "",
        shown ? "opacity-100" : "opacity-0",
      )}
    >
      <div className={cn("px-3.5 pt-4", dark ? "" : "")}>
        <Icon size={18} strokeWidth={1.5} className={dark ? "text-ey-gold" : "text-ey-green"} />
        <p
          className={cn(
            "mt-2 text-base font-semibold uppercase tracking-[0.18em]",
            dark ? "text-ey-gold/85" : "text-muted-foreground",
          )}
        >
          {eyebrow}
        </p>
        <h4 className="mt-1 text-base font-semibold leading-tight">{title}</h4>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-3.5 py-4">
        {groups.map((group) => (
          <div key={group.caption ?? "all"} className="flex flex-1 flex-col">
            {group.caption ? (
              <p
                className={cn(
                  "mb-1.5 text-base font-semibold uppercase tracking-[0.16em]",
                  dark ? "text-navy-foreground/60" : "text-ey-green/80",
                )}
              >
                {group.caption}
              </p>
            ) : null}
            <ul className="grid gap-1.5 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:gap-2">
              {group.items.map((item) => (
                <li
                  key={item.label}
                  className="flex min-w-0 items-center gap-2"
                  title={item.detail}
                >
                  <item.icon
                    size={13}
                    strokeWidth={1.5}
                    className={cn("shrink-0", dark ? "text-ey-gold/80" : "text-ey-green/80")}
                  />
                  <span
                    className={cn(
                      "min-w-0 text-base font-medium leading-tight",
                      dark ? "text-navy-foreground/90" : "text-foreground/85",
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {strapline ? (
        <p
          className={cn(
            "px-3.5 pb-4 text-base font-semibold uppercase leading-relaxed tracking-[0.14em]",
            dark ? "text-ey-gold/80" : "text-muted-foreground",
          )}
        >
          {strapline}
        </p>
      ) : null}
    </aside>
  );
}

export function ToBeArchitecture() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const topDown = [...archLayers].reverse();

  return (
    <SectionShell
      id="to-be"
      className="overflow-hidden"
      eyebrow="Section 06"
      title="To-Be Integrated Security Architecture"
      intro="Read bottom-up: distributed sensing becomes transported data, then correlated intelligence, then coordinated human decision, then governed operational resilience — with cyber security and enterprise integration spanning every layer. Select any layer for the technical detail."
      tone="cream"
    >
      <div
        ref={ref}
        className="grid gap-3 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,16rem)] lg:items-stretch lg:gap-4"
      >
        <CrossRail
          side="left"
          eyebrow="Cross-cutting"
          title="Cybersecurity & resilience"
          strapline="Secure by design - Resilient by default"
          groups={cyberRail}
          lit={hovered !== null}
          shown={shown}
        />

        <div className="min-w-0">
          {topDown.map((layer, i) => {
            const flowFrom = topDown[i + 1];
            return (
              <div key={layer.id}>
                <Layer
                  layer={layer}
                  index={archLayers.length - 1 - i}
                  shown={shown}
                  open={open === layer.id}
                  dim={hovered !== null && hovered !== layer.id}
                  onToggle={() => setOpen(open === layer.id ? null : layer.id)}
                  onEnter={() => setHovered(layer.id)}
                  onLeave={() => setHovered(null)}
                />
                {flowFrom ? (
                  <FlowBand
                    label={flows[flowFrom.id] ?? ""}
                    lit={hovered === flowFrom.id || hovered === layer.id}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <CrossRail
          side="right"
          eyebrow="Integrations"
          title="Enterprise & external integration"
          strapline="Interfaces into the architecture, not part of the core platform"
          groups={integrationRail}
          lit={hovered !== null}
          shown={shown}
        />
      </div>

      <div className="mt-6 border-t border-ey-gold/50 pt-4">
        <p className="text-base font-semibold uppercase tracking-[0.22em] text-ey-gold">
          From devices to decisions
        </p>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-foreground/85">
          An integrated security architecture that converts distributed sensing into situational
          awareness, coordinated response and measurable operational resilience.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {principles.map((p) => (
            <span
              key={p}
              className="text-base font-semibold uppercase tracking-[0.16em] text-ey-green-deep"
            >
              {p}
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-2 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
          <p>
            The design is tailored to plant type, threat profile and current infrastructure maturity
            rather than applied as a uniform template across stations.
          </p>
          <p>
            The plant builds drone detection, tracking and airspace awareness; mitigation is
            exercised with the designated agency under Indian drone regulation.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
