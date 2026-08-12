import { Cog, Network, ShieldAlert } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";

const archetypes = [
  {
    icon: Network,
    name: "Enterprise-scale multi-plant operators",
    stance: "Standardise, then scale",
    accentText: "text-[#ffe600]",
    accentBar: "bg-[#ffe600]",
    accentMarker: "marker:text-[#ffe600]",
    accentLabel: "text-ey-green-deep",
    challenge: [
      "Heterogeneous estates across multiple stations",
      "Multiple vendors and inconsistent standards",
      "Limited enterprise visibility and governance",
    ],
    engagement: [
      "Standardisation of architecture and specifications",
      "Integration and analytics across the fleet",
      "Fleet-wide governance and performance reporting",
    ],
  },
  {
    icon: Cog,
    name: "Brownfield modernisation environments",
    stance: "Sequence, then replace",
    accentText: "text-[#ffe600]",
    accentBar: "bg-[#ffe600]",
    accentMarker: "marker:text-[#ffe600]",
    accentLabel: "text-ey-green-deep",
    challenge: [
      "Mixed-vintage CCTV and access-control systems",
      "Legacy networks and capex constraints",
      "Phased replacement instead of greenfield rebuild",
    ],
    engagement: [
      "Baseline assessment of current-state maturity",
      "Risk prioritisation and interoperability roadmap",
      "Phased investment plan with quick-win sequencing",
    ],
  },
  {
    icon: ShieldAlert,
    name: "Elevated-threat / remote assets",
    stance: "Detect deep, respond fast",
    accentText: "text-[#ffe600]",
    accentBar: "bg-[#ffe600]",
    accentMarker: "marker:text-[#ffe600]",
    accentLabel: "text-ey-green-deep",
    challenge: [
      "Remote terrain with delayed reinforcement",
      "Insurgency and law-and-order exposure",
      "Long perimeters and limited static coverage",
    ],
    engagement: [
      "Layered detection across perimeter and airspace",
      "Resilient communications and autonomous sensing",
      "Accelerated response protocols with agency linkage",
    ],
  },
];

export function Segments() {
  return (
    <SectionShell
      id="segments"
      eyebrow="Section 03"
      title="Different starting points require different security strategies"
      intro="An operator's starting point — not its sector label — determines where the modernisation strategy should begin."
      headerMedia={
        <img
          src="/__l5e/assets-v1/5f7691a3-1699-4377-b783-53444d7a5935/hero-power-plant.jpg"
          alt="Power generation plant"
          className="h-32 w-full rounded-lg object-cover opacity-90 shadow-card lg:h-40"
        />
      }
    >
      <div className="segment-board grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-3">
        {archetypes.map((a, i) => (
          <article key={a.name} className="segment-lane flex flex-col bg-surface">
            <header className="relative bg-navy px-6 pb-6 pt-7 text-navy-foreground">
              <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", a.accentBar)} />
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-foreground/10">
                  <a.icon className="h-5 w-5" />
                </span>
                <span
                  className={cn("font-mono text-lg font-semibold tracking-[0.2em]", a.accentText)}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{a.name}</h3>
              <p className={cn("mt-2 text-base font-medium", a.accentText)}>{a.stance}</p>
            </header>

            <div className="flex flex-1 flex-col px-6 py-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Starting condition
                </p>
                <ul className="mt-3 list-disc space-y-2.5 pl-5 marker:text-foreground/35">
                  {a.challenge.map((p) => (
                    <li key={p} className="text-base leading-snug text-foreground/90">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="my-5 flex items-center gap-3" aria-hidden>
                <span className={cn("h-px flex-1", a.accentBar)} />
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full text-sm font-bold text-white",
                    a.accentBar,
                  )}
                >
                  →
                </span>
                <span className={cn("h-px flex-1", a.accentBar)} />
              </div>

              <div className="rounded-xl bg-surface-2 p-4">
                <p
                  className={cn("text-sm font-semibold uppercase tracking-[0.16em]", a.accentLabel)}
                >
                  Security strategy
                </p>
                <ul className={cn("mt-3 list-disc space-y-2.5 pl-5", a.accentMarker)}>
                  {a.engagement.map((p) => (
                    <li key={p} className="text-base leading-snug text-foreground/90">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
