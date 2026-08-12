import { ArrowUpRight, Building2, Factory, RadioTower, ShieldCheck } from "lucide-react";

import { SectionShell } from "./SectionShell";

const pathways = [
  {
    icon: Building2,
    number: "01",
    short: "Fleet",
    name: "Enterprise-scale multi-plant",
    maturity: 76,
    threat: 58,
    stance: "Standardise, then scale",
    steps: ["Standardise", "Integrate", "Scale"],
    destination: "One governed security estate",
  },
  {
    icon: Factory,
    number: "02",
    short: "Brownfield",
    name: "Brownfield modernisation",
    maturity: 42,
    threat: 64,
    stance: "Sequence, then replace",
    steps: ["Baseline", "Sequence", "Modernise"],
    destination: "Modernise without disruption",
  },
  {
    icon: RadioTower,
    number: "03",
    short: "Remote",
    name: "Elevated-threat / remote",
    maturity: 55,
    threat: 92,
    stance: "Detect deep, respond fast",
    steps: ["Sense", "Connect", "Respond"],
    destination: "Resilience at the edge",
  },
];

export function Segments() {
  return (
    <SectionShell
      id="segments"
      eyebrow="Section 03"
      title="Three Starting Points. One Security Transformation Portfolio."
      intro="A portfolio view makes the route visible: where each operating context starts, the pressure it carries, and the transformation sequence that moves it forward."
      tone="cream"
    >
      <div className="section-03-infographic overflow-hidden rounded-[2rem] border border-navy/10 bg-navy text-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe600] text-navy">
              <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Security portfolio / 2026
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">Transformation control view</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/55">
            <span className="h-2 w-2 rounded-full bg-[#ffe600]" />
            Static decision model
          </div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative overflow-hidden bg-[#ffe600] p-6 text-navy md:p-8">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-navy/15" />
            <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-navy/15" />
            <div className="relative">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Portfolio logic</p>
              <div className="mt-6 flex items-end gap-4">
                <span className="font-mono text-[5.5rem] font-semibold leading-[0.78] tracking-[-0.08em]">
                  03
                </span>
                <p className="max-w-40 pb-1 text-sm font-semibold leading-snug">
                  operating contexts, each requiring a different route
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-2 border-t border-navy/20 pt-5">
                {pathways.map((pathway) => (
                  <div key={pathway.number}>
                    <p className="font-mono text-[0.62rem] font-bold">{pathway.number}</p>
                    <p className="mt-1 text-xs font-semibold">{pathway.short}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-navy p-4 text-white">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Common destination
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="max-w-52 text-base font-semibold leading-tight">
                    Governed, measurable security operations
                  </p>
                  <ArrowUpRight className="h-7 w-7 shrink-0 text-[#ffe600]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f5ee] p-5 text-navy md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Portfolio position
                </p>
                <h3 className="mt-1 text-xl font-semibold">Threat exposure × current maturity</h3>
              </div>
              <div className="hidden items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:flex">
                <span className="h-2 w-7 rounded-full bg-[#ffe600]" />
                Priority pressure
              </div>
            </div>

            <RiskMaturityMap />

            <div className="mt-3 grid grid-cols-3 gap-2">
              {pathways.map((pathway) => (
                <div
                  key={pathway.number}
                  className="rounded-xl border border-navy/10 bg-white px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-navy font-mono text-[0.58rem] font-bold text-[#ffe600]">
                      {pathway.number}
                    </span>
                    <p className="truncate text-xs font-semibold">{pathway.short}</p>
                  </div>
                  <p className="mt-2 font-mono text-[0.62rem] text-muted-foreground">
                    M {pathway.maturity} / T {pathway.threat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-3">
          {pathways.map((pathway) => {
            const Icon = pathway.icon;
            return (
              <article key={pathway.number} className="bg-navy p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-[#ffe600]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6rem] font-bold text-[#ffe600]">
                        PATH {pathway.number}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold leading-tight">{pathway.name}</h3>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/35" />
                </div>

                <p className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {pathway.stance}
                </p>

                <div className="mt-4 flex items-center gap-1.5">
                  {pathway.steps.map((step, index) => (
                    <div key={step} className="contents">
                      <div className="min-w-0 flex-1">
                        <div
                          className="h-1.5 rounded-full bg-[#ffe600]"
                          style={{ opacity: 0.45 + index * 0.25 }}
                        />
                        <p className="mt-2 truncate text-[0.63rem] font-medium text-white/75">
                          {step}
                        </p>
                      </div>
                      {index < pathway.steps.length - 1 ? (
                        <span className="mb-4 text-xs text-white/30">→</span>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Destination
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{pathway.destination}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function RiskMaturityMap() {
  return (
    <svg
      viewBox="0 0 620 270"
      className="mt-4 w-full"
      role="img"
      aria-label="Risk and maturity map showing fleet, brownfield and remote operating contexts"
    >
      <defs>
        <pattern id="segment-grid" width="54" height="45" patternUnits="userSpaceOnUse">
          <path d="M 54 0 L 0 0 0 45" fill="none" stroke="#201d1a" strokeOpacity="0.08" />
        </pattern>
        <filter id="segment-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#201d1a" floodOpacity="0.18" />
        </filter>
      </defs>

      <rect x="42" y="14" width="548" height="218" rx="18" fill="white" />
      <rect x="42" y="14" width="548" height="218" rx="18" fill="url(#segment-grid)" />
      <path d="M42 123H590" stroke="#201d1a" strokeOpacity="0.14" strokeDasharray="4 6" />
      <path d="M316 14V232" stroke="#201d1a" strokeOpacity="0.14" strokeDasharray="4 6" />

      <rect x="42" y="14" width="274" height="109" rx="18" fill="#ffe600" fillOpacity="0.12" />
      <text
        x="58"
        y="37"
        fill="#201d1a"
        opacity="0.5"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
      >
        PRIORITY TRANSFORMATION
      </text>
      <text
        x="452"
        y="217"
        fill="#201d1a"
        opacity="0.42"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.2"
      >
        SCALE & GOVERN
      </text>

      <path
        d="M81 205 C178 181 244 150 330 119 C420 87 480 70 558 46"
        fill="none"
        stroke="#201d1a"
        strokeOpacity="0.12"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M81 205 C178 181 244 150 330 119 C420 87 480 70 558 46"
        fill="none"
        stroke="#ffe600"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="5 12"
      />

      <MapPoint x={443} y={126} number="01" label="Fleet" />
      <MapPoint x={272} y={112} number="02" label="Brownfield" />
      <MapPoint x={340} y={42} number="03" label="Remote" featured />

      <text
        x="48"
        y="254"
        fill="#201d1a"
        opacity="0.5"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.4"
      >
        LOW MATURITY
      </text>
      <text
        x="491"
        y="254"
        fill="#201d1a"
        opacity="0.5"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.4"
      >
        HIGH MATURITY
      </text>
      <text
        x="18"
        y="188"
        fill="#201d1a"
        opacity="0.5"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.4"
        transform="rotate(-90 18 188)"
      >
        THREAT EXPOSURE
      </text>
    </svg>
  );
}

function MapPoint({
  x,
  y,
  number,
  label,
  featured = false,
}: {
  x: number;
  y: number;
  number: string;
  label: string;
  featured?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`} filter="url(#segment-shadow)">
      {featured ? <circle r="27" fill="#ffe600" opacity="0.22" /> : null}
      <circle r="19" fill={featured ? "#ffe600" : "#201d1a"} />
      <text
        y="4"
        textAnchor="middle"
        fill={featured ? "#201d1a" : "#ffe600"}
        fontSize="10"
        fontWeight="800"
      >
        {number}
      </text>
      <text x="28" y="4" fill="#201d1a" fontSize="11" fontWeight="700">
        {label}
      </text>
    </g>
  );
}
