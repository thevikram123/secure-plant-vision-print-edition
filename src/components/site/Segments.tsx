import { ArrowRight, Cog, Network, ShieldAlert } from "lucide-react";

import { SectionShell } from "./SectionShell";

const archetypes = [
  {
    icon: Network,
    number: "01",
    short: "Fleet operators",
    name: "Enterprise-scale multi-plant operators",
    stance: "Standardise, then scale",
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
    outcome: "Common standards + enterprise visibility",
  },
  {
    icon: Cog,
    number: "02",
    short: "Brownfield",
    name: "Brownfield modernisation environments",
    stance: "Sequence, then replace",
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
    outcome: "Risk sequencing + controlled transition",
  },
  {
    icon: ShieldAlert,
    number: "03",
    short: "Remote assets",
    name: "Elevated-threat / remote assets",
    stance: "Detect deep, respond fast",
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
    outcome: "Layered detection + rapid response",
  },
];

export function Segments() {
  return (
    <SectionShell
      id="segments"
      eyebrow="Section 03"
      title="Different Starting Points Require Different Security Strategies"
      intro="An operator's starting point—not its sector label—determines where the modernisation strategy should begin."
      tone="cream"
    >
      <div className="section-03-infographic overflow-hidden rounded-[2rem] border border-navy/10 bg-[#f5f2e9] shadow-card">
        <div className="grid bg-navy text-white lg:grid-cols-[17rem_1fr]">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#ffe600]">
              Strategy selector
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">
              Start with context. Build the right route.
            </h3>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-3">
            {archetypes.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.number} className="bg-navy px-5 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe600] text-navy">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-xs font-bold text-[#ffe600]">
                      {item.number}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-snug">{item.name}</p>
                  <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#ffe600]">
                    {item.stance}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid border-b border-navy/10 lg:grid-cols-[10rem_1fr]">
          <MatrixLabel number="01" title="Starting condition" subtitle="Typical challenge" />
          <div className="grid gap-px bg-navy/10 sm:grid-cols-3">
            {archetypes.map((item) => (
              <InfoList key={item.number} items={item.challenge} />
            ))}
          </div>
        </div>

        <div className="grid border-b border-navy/10 lg:grid-cols-[10rem_1fr]">
          <MatrixLabel
            number="02"
            title="Transformation route"
            subtitle="Likely engagement"
            yellow
          />
          <div className="grid gap-px bg-navy/10 sm:grid-cols-3">
            {archetypes.map((item) => (
              <div key={item.number} className="bg-white p-5">
                <div className="space-y-3">
                  {item.engagement.map((point, index) => (
                    <div key={point} className="grid grid-cols-[1.5rem_1fr] gap-2.5">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffe600] font-mono text-[0.58rem] font-bold text-navy">
                        {index + 1}
                      </span>
                      <p className="text-sm font-medium leading-snug text-navy">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[10rem_1fr]">
          <div className="flex items-center bg-[#ffe600] px-5 py-4 text-navy">
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Result</p>
          </div>
          <div className="grid gap-px bg-navy/10 sm:grid-cols-3">
            {archetypes.map((item) => (
              <div key={item.number} className="flex items-center gap-3 bg-[#f5f2e9] px-5 py-4">
                <span className="font-mono text-xs font-bold text-navy/40">{item.number}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-navy/30" />
                <p className="text-sm font-semibold text-navy">{item.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function MatrixLabel({
  number,
  title,
  subtitle,
  yellow = false,
}: {
  number: string;
  title: string;
  subtitle: string;
  yellow?: boolean;
}) {
  return (
    <div className={yellow ? "bg-[#ffe600] p-5 text-navy" : "bg-[#e9e5da] p-5 text-navy"}>
      <span className="font-mono text-xs font-bold">{number}</span>
      <p className="mt-3 text-sm font-semibold leading-tight">{title}</p>
      <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] opacity-55">
        {subtitle}
      </p>
    </div>
  );
}

function InfoList({ items }: { items: string[] }) {
  return (
    <div className="bg-white p-5">
      <ul className="space-y-3">
        {items.map((point) => (
          <li
            key={point}
            className="grid grid-cols-[0.55rem_1fr] gap-2.5 text-sm leading-snug text-navy/80"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-navy/25" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
