import { useState } from "react";
import {
  BadgeCheck,
  ClipboardList,
  FileCode2,
  Gauge,
  Grid2x2,
  Layers,
  ListChecks,
  Map,
  ScrollText,
  Wallet,
} from "lucide-react";
import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";

const deliverables = [
  {
    icon: ClipboardList,
    name: "Security Risk Register",
    stage: "Diagnose",
    body: "Ranked threat and vulnerability inventory by zone, asset criticality and likely impact on generation.",
  },
  {
    icon: Map,
    name: "Plant Security Zoning Plan",
    stage: "Diagnose",
    body: "Zone boundaries, access tiers and control expectations mapped onto actual plant layout drawings.",
  },
  {
    icon: Grid2x2,
    name: "Coverage and Gap Heatmap",
    stage: "Diagnose",
    anchor: "heatmap" as const,
    body: "Camera, detection and access coverage against required coverage, with blind spots made visible.",
  },
  {
    icon: Layers,
    name: "Target Architecture",
    stage: "Design",
    anchor: "architecture" as const,
    body: "Field, edge, VMS/PSIM, ICCC and integration layers with cyber and OT security cross-cutting controls.",
  },
  {
    icon: Wallet,
    name: "Phased CAPEX Plan",
    stage: "Design",
    body: "Prioritised phases with indicative cost bands aligned to approval cycles and outage windows.",
  },
  {
    icon: FileCode2,
    name: "Technical Specifications",
    stage: "Procure",
    body: "Vendor-neutral, tender-ready specifications for devices, network, platforms and command-centre build.",
  },
  {
    icon: ScrollText,
    name: "Bill of Quantities (BoQ)",
    stage: "Procure",
    body: "Itemised quantities per zone and per plant, structured for comparable bid evaluation.",
  },
  {
    icon: ListChecks,
    name: "SOP Catalogue",
    stage: "Deliver",
    body: "Scenario-wise control-room SOPs with escalation matrix, plant roles and evidence-handling steps.",
  },
  {
    icon: BadgeCheck,
    name: "Acceptance Test Framework",
    stage: "Assure",
    body: "FAT, SAT and UAT test cases with pass criteria that make vendor sign-off objective.",
  },
  {
    icon: Gauge,
    name: "Operational KPI Dashboard",
    stage: "Assure",
    body: "Uptime, response time, alarm quality and SLA compliance reported to plant and corporate leadership.",
  },
];

const stages = ["All", "Diagnose", "Design", "Procure", "Deliver", "Assure"];

function HeatmapThumb() {
  const cells = [3, 1, 2, 0, 2, 3, 1, 3, 0, 1, 2, 2, 3, 0, 1, 2];
  return (
    <div aria-hidden className="grid grid-cols-4 gap-1">
      {cells.map((c, i) => (
        <span
          key={i}
          className={cn(
            "aspect-square rounded-[3px]",
            c === 0 && "bg-hairline",
            c === 1 && "bg-navy/25",
            c === 2 && "bg-navy/55",
            c === 3 && "bg-brand/80",
          )}
        />
      ))}
    </div>
  );
}

function ArchitectureThumb() {
  const layers = ["ICCC", "VMS / PSIM", "Edge & network", "Field detection"];
  return (
    <div aria-hidden className="space-y-1">
      {layers.map((l, i) => (
        <div
          key={l}
          className={cn(
            "rounded-[3px] px-2 py-1 text-base font-semibold tracking-wide",
            i === 0 ? "bg-brand/85 text-brand-foreground" : "bg-navy/[0.09] text-navy",
          )}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

export function Deliverables() {
  const [filter, setFilter] = useState("All");
  const shown = deliverables.filter((d) => filter === "All" || d.stage === filter);

  return (
    <SectionShell
      id="deliverables"
      eyebrow="Section 09"
      title="What the Client Receives"
      intro="Tangible, reusable artefacts designed to carry into procurement, implementation and operations."
      tone="tint"
    >
      <div className="print-hidden flex flex-wrap gap-2">
        {stages.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-base font-semibold transition-colors",
              filter === s
                ? "bg-navy text-navy-foreground"
                : "border border-hairline bg-surface text-foreground/80 hover:bg-surface-2",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((d) => {
          const isAnchor = Boolean(d.anchor);
          return (
            <article
              key={d.name}
              className={cn(
                "flex flex-col",
                isAnchor
                  ? "rounded-xl border border-hairline bg-surface p-5 shadow-card sm:col-span-2"
                  : "border-t border-hairline pt-4",
              )}
            >
              {isAnchor ? (
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_7.5rem] sm:items-start">
                  <div className="min-w-0">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-navy-foreground">
                      <d.icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="mt-3.5 text-base font-semibold leading-snug">{d.name}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{d.body}</p>
                    <p className="mt-3 text-base font-semibold uppercase tracking-[0.16em] text-ey-gold">
                      {d.stage}
                    </p>
                  </div>
                  <div className="w-full max-w-[7.5rem]">
                    {d.anchor === "heatmap" ? <HeatmapThumb /> : <ArchitectureThumb />}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <d.icon className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                    <h3 className="min-w-0 text-base font-semibold leading-snug">{d.name}</h3>
                  </div>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                  <p className="mt-3 text-base font-semibold uppercase tracking-[0.16em] text-ey-gold">
                    {d.stage}
                  </p>
                </>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-base text-muted-foreground">
        Note: the final deliverable set, formats and review cadence are confirmed in the engagement
        scope.
      </p>
    </SectionShell>
  );
}
