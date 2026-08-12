import { ArrowDown, Cog, Network, ShieldAlert } from "lucide-react";

import { SectionShell } from "./SectionShell";

const archetypes = [
  {
    icon: Network,
    number: "01",
    name: "Enterprise-scale multi-plant operators",
    stance: "Standardise, then scale",
    maturity: 76,
    threat: 58,
    start: ["Heterogeneous station estates", "Multiple vendors", "Limited fleet governance"],
    moves: ["Common architecture", "Fleet analytics", "Enterprise performance reporting"],
    destination: "One governed security estate",
  },
  {
    icon: Cog,
    number: "02",
    name: "Brownfield modernisation environments",
    stance: "Sequence, then replace",
    maturity: 42,
    threat: 64,
    start: ["Mixed-vintage systems", "Legacy network constraints", "Phased CAPEX reality"],
    moves: ["Baseline maturity", "Risk-led priorities", "Interoperable phased roadmap"],
    destination: "Modernise without disruption",
  },
  {
    icon: ShieldAlert,
    number: "03",
    name: "Elevated-threat / remote assets",
    stance: "Detect deep, respond fast",
    maturity: 55,
    threat: 92,
    start: ["Long exposed perimeter", "Delayed reinforcement", "Terrain and airspace risk"],
    moves: ["Layered sensing", "Resilient communications", "Agency-linked response"],
    destination: "Resilience at the edge",
  },
];

export function Segments() {
  return (
    <SectionShell
      id="segments"
      eyebrow="Section 03"
      title="Three Starting Points. Three Modernisation Pathways."
      intro="The operating context determines the transformation route: standardise a fleet, sequence a brownfield estate, or deepen detection at an elevated-threat asset."
    >
      <div className="section-03-infographic overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-card">
        <div className="grid gap-px bg-hairline lg:grid-cols-3">
          {archetypes.map((item) => (
            <article key={item.name} className="flex flex-col bg-surface">
              <div className="relative bg-navy px-6 pb-6 pt-7 text-navy-foreground">
                <span className="absolute inset-x-0 top-0 h-1.5 bg-[#ffe600]" />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5">
                    <item.icon className="h-5 w-5 text-[#ffe600]" />
                  </span>
                  <span className="font-mono text-xl font-semibold tracking-[0.16em] text-[#ffe600]">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-5 min-h-12 text-lg font-semibold leading-snug">{item.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#ffe600]">
                  {item.stance}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-hairline">
                <Metric label="Current maturity" value={item.maturity} />
                <Metric label="Threat exposure" value={item.threat} inverse />
              </div>

              <div className="flex flex-1 flex-col px-6 py-6">
                <PathStage label="Starting condition" items={item.start} />
                <div className="relative my-4 flex h-12 items-center justify-center" aria-hidden>
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-hairline" />
                  <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#ffe600] text-navy">
                    <ArrowDown className="h-4 w-4" />
                  </span>
                </div>
                <PathStage label="Transformation moves" items={item.moves} numbered />
                <div className="mt-5 rounded-xl border border-[#ffe600]/70 bg-[#ffe600]/15 px-4 py-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Destination
                  </p>
                  <p className="mt-1 font-semibold text-ey-green-deep">{item.destination}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-px border-t border-hairline bg-hairline md:grid-cols-3">
          {[
            ["Fleet", "Common standards + enterprise visibility"],
            ["Brownfield", "Risk sequencing + controlled transition"],
            ["Elevated threat", "Layered detection + rapid response"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center gap-3 bg-ey-cream px-6 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffe600] ring-4 ring-[#ffe600]/25" />
              <p className="text-sm">
                <span className="font-semibold text-ey-green-deep">{label}:</span>{" "}
                <span className="text-muted-foreground">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function Metric({
  label,
  value,
  inverse = false,
}: {
  label: string;
  value: number;
  inverse?: boolean;
}) {
  return (
    <div className="bg-ey-cream px-5 py-4">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
          {label}
        </p>
        <span className="font-mono text-sm font-semibold text-ey-green-deep">{value}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10">
        <span
          className={inverse ? "block h-full bg-navy" : "block h-full bg-[#ffe600]"}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function PathStage({
  label,
  items,
  numbered = false,
}: {
  label: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-sm leading-snug text-foreground/90"
          >
            <span
              className={
                numbered
                  ? "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy font-mono text-[10px] text-white"
                  : "h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffe600] ring-2 ring-[#ffe600]/25"
              }
            >
              {numbered ? index + 1 : null}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
