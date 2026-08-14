import { useState } from "react";
import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";

type Domain = {
  key: string;
  label: string;
  short: string;
  maturity: number;
  items: string[];
  reveals: { title: string; body: string }[];
};

const domains: Domain[] = [
  {
    key: "arch",
    label: "Architecture & zoning",
    short: "Arch",
    maturity: 2,
    items: ["Site security architecture", "Compliance and procurement gaps"],
    reveals: [
      {
        title: "Where the security model is undefined",
        body: "Missing zone boundaries, inconsistent risk classification between blocks, and unclear demarcation between IT, OT and physical security ownership.",
      },
      {
        title: "Which regulations are already in scope",
        body: "Existing CEA/CERC/NERC/ISO obligations, site-specific statutory requirements, and procurement rules that constrain vendor selection.",
      },
      {
        title: "How the plant layout drives risk",
        body: "Distance between perimeter and critical assets, natural choke points, adjacent public areas, and how topology affects detection and response time.",
      },
    ],
  },
  {
    key: "cctv",
    label: "Surveillance systems",
    short: "CCTV",
    maturity: 2,
    items: ["CCTV inventory and health", "Camera placement adequacy", "Day/night visibility"],
    reveals: [
      {
        title: "Where coverage actually breaks",
        body: "Blind spots, unusable night footage, cameras aimed at the wrong risk, and legacy analog equipment that cannot be integrated into a modern VMS.",
      },
      {
        title: "Which feeds are operationally useful",
        body: "Resolution, frame rate, storage retention, and whether recorded evidence is admissible and accessible to security and operations teams.",
      },
      {
        title: "How analytics maturity compares",
        body: "Current reliance on manual monitoring versus available AI-based detection for intrusion, perimeter crossing, crowd formation and object left behind.",
      },
    ],
  },
  {
    key: "perimeter",
    label: "Perimeter protection",
    short: "Perim",
    maturity: 2,
    items: ["Perimeter protection coverage"],
    reveals: [
      {
        title: "Where the perimeter can be breached undetected",
        body: "Gaps in fencing, ineffective lighting, unmanned gates, and vegetation or structures that create natural hiding points.",
      },
      {
        title: "Which sensors are actually integrated",
        body: "Standalone fences, bollards, beams or patrol routes that do not feed a common alert stream or generate actionable control-room alarms.",
      },
      {
        title: "How deterrence works after dark",
        body: "Lighting uniformity, thermal coverage, drone patrolling gaps, and whether perimeter response forces can reach an intrusion point in time.",
      },
    ],
  },
  {
    key: "access",
    label: "Access & movement",
    short: "Access",
    maturity: 3,
    items: [
      "Gate and access-control controls",
      "Visitor and contractor movement",
      "Vehicle and material movement",
      "Security manpower deployment",
    ],
    reveals: [
      {
        title: "Which identities move through the plant",
        body: "Employee, contractor, visitor and vehicle flows; badge issuance discipline; and whether access rights are reviewed and revoked on time.",
      },
      {
        title: "Where material controls are weak",
        body: "Stores, tool cribs, scrap yards and fuel logistics points where material can leave without traceable authorization or weighing.",
      },
      {
        title: "How movement is monitored",
        body: "Escort policies, zone-based access enforcement, and whether guards, barriers and boom controls operate as a single system.",
      },
    ],
  },
  {
    key: "command",
    label: "Command centre",
    short: "ICCC",
    maturity: 2,
    items: ["Command centre / control room capability", "Incident logging and evidence management"],
    reveals: [
      {
        title: "How incidents are really handled",
        body: "Detection-to-response time, evidence integrity, whether the control room can act or only observe, and how escalations are tracked.",
      },
      {
        title: "What technology the command centre can absorb",
        body: "Display real estate, video wall capacity, workstation ergonomics, and ability to integrate VMS, ACS, fire, safety and OT alarms.",
      },
      {
        title: "Where situational awareness is incomplete",
        body: "Lack of GIS, missing camera-to-zone mapping, unclear runbooks, and manual incident logging that slows audit and review.",
      },
    ],
  },
  {
    key: "network",
    label: "Network & storage",
    short: "Network",
    maturity: 3,
    items: ["Network, storage and retention"],
    reveals: [
      {
        title: "What the system can and cannot sustain",
        body: "Retention limits, bandwidth headroom, storage redundancy, and whether the network can carry new camera, access and sensor loads.",
      },
      {
        title: "Where cyber-physical separation is unclear",
        body: "IT and OT network segmentation, camera VLAN hygiene, and how video storage is protected from ransomware or insider tampering.",
      },
      {
        title: "How archival evidence is managed",
        body: "Chain-of-custody procedures, export readiness, and whether retention periods satisfy legal and compliance requirements.",
      },
    ],
  },
  {
    key: "sop",
    label: "SOPs & drills",
    short: "SOPs",
    maturity: 2,
    items: ["SOPs, escalation and drills", "Integration with fire, safety and operational systems"],
    reveals: [
      {
        title: "Which controls exist only on paper",
        body: "Access rules, contractor discipline, escalation paths and incident playbooks that are documented but not rehearsed or enforced.",
      },
      {
        title: "How drills are conducted and scored",
        body: "Frequency of security drills, participation by operations and safety, after-action reviews, and gap closure tracking.",
      },
      {
        title: "Where integration with safety and operations breaks",
        body: "Whether fire, medical, operations and security control rooms share protocols, channels and a common incident timeline.",
      },
    ],
  },
  {
    key: "oandm",
    label: "O&M & SLA readiness",
    short: "O&M",
    maturity: 3,
    items: ["AMC, uptime, spares and SLA readiness"],
    reveals: [
      {
        title: "Where maintenance is reactive",
        body: "Camera downtime patterns, deferred repairs, vendor response delays, and whether spares are held on site or ordered ad-hoc.",
      },
      {
        title: "How SLAs are measured",
        body: "Uptime targets, mean time to repair, penalty clauses, and whether the plant receives meaningful performance reports from integrators.",
      },
      {
        title: "What capability exists in-house",
        body: "Technical staffing, training currency, and whether the plant can self-diagnose faults or remains fully dependent on vendors.",
      },
    ],
  },
];

const CX = 160;
const CY = 160;
const INNER = 52;
const OUTER = 140;
const GAP = 2.2; // degrees

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(cx + r * Math.cos(rad)), y: round(cy + r * Math.sin(rad)) };
}

function sector(startDeg: number, endDeg: number, rInner: number, rOuter: number) {
  const s1 = polar(CX, CY, rOuter, startDeg);
  const e1 = polar(CX, CY, rOuter, endDeg);
  const e2 = polar(CX, CY, rInner, endDeg);
  const s2 = polar(CX, CY, rInner, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${e2.x} ${e2.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${s2.x} ${s2.y}`,
    "Z",
  ].join(" ");
}

export function AsIsAssessment() {
  const [activeKey, setActiveKey] = useState(domains[0]!.key);
  const active = domains.find((d) => d.key === activeKey) ?? domains[0]!;
  const step = 360 / domains.length;

  return (
    <SectionShell
      id="as-is"
      className="overflow-hidden"
      eyebrow="Section 05"
      title="As-Is Security Assessment"
      intro="EY would assess the current security posture across the plant and its associated assets, on site and on record."
    >
      <div className="as-is-layout grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div>
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Assessment framework — eight domains
          </p>
          <div className="as-is-framework mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <svg
              viewBox="-55 -10 430 340"
              role="img"
              aria-label="Assessment maturity wheel across eight domains"
              className="as-is-wheel h-auto w-full max-w-[32rem] shrink-0 sm:w-[28rem]"
            >
              {domains.map((d, i) => {
                const start = i * step + GAP;
                const end = (i + 1) * step - GAP;
                const filled = Math.round(INNER + ((OUTER - INNER) * d.maturity) / 5);
                const isActive = d.key === activeKey;
                const mid = (start + end) / 2;
                const lp = polar(CX, CY, OUTER + 12, mid);
                return (
                  <g
                    key={d.key}
                    onMouseEnter={() => setActiveKey(d.key)}
                    onClick={() => setActiveKey(d.key)}
                    className="cursor-pointer"
                  >
                    <path
                      d={sector(start, end, INNER, OUTER)}
                      className="fill-navy/[0.06] stroke-hairline"
                      strokeWidth={1}
                    />
                    <path
                      d={sector(start, end, INNER, filled)}
                      className={cn(
                        "transition-colors",
                        isActive ? "fill-brand" : "fill-navy/70",
                      )}
                    />
                    <text
                      x={lp.x}
                      y={lp.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        "text-base font-semibold",
                        isActive ? "fill-brand" : "fill-muted-foreground",
                      )}
                    >
                      {d.short}
                    </text>
                  </g>
                );
              })}
              <circle cx={CX} cy={CY} r={INNER - 5} className="fill-surface stroke-hairline" />
              <text
                x={CX}
                y={CY - 8}
                textAnchor="middle"
                className="fill-muted-foreground text-sm font-semibold uppercase tracking-[0.14em]"

              >
                Maturity
              </text>
              <text
                x={CX}
                y={CY + 12}
                textAnchor="middle"
                className="fill-navy text-lg font-semibold"
              >
                {active.maturity}/5
              </text>
            </svg>

            <ul className="w-full space-y-px">
              {domains.map((d) => (
                <li key={d.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveKey(d.key)}
                    onClick={() => setActiveKey(d.key)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-base font-medium transition-colors",
                      d.key === activeKey
                        ? "bg-navy text-navy-foreground"
                        : "text-foreground/85 hover:bg-surface-2",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{d.label}</span>
                    <span aria-hidden className="flex shrink-0 gap-[3px]">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={cn(
                            "h-3 w-1 rounded-sm",
                            n <= d.maturity
                              ? d.key === activeKey
                                ? "bg-brand"
                                : "bg-navy/70"
                              : d.key === activeKey
                                ? "bg-navy-foreground/25"
                                : "bg-hairline",
                          )}
                        />
                      ))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Maturity bands shown are illustrative placeholders — actual scoring is produced during
            the on-site assessment.
          </p>
        </div>

        <div className="rounded-xl bg-navy p-6 text-navy-foreground shadow-card md:p-8">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-brand">
            {active.label} — what we examine
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {active.items.map((it) => (
              <li
                key={it}
                className="rounded-full border border-navy-foreground/20 px-3 py-1.5 text-base font-medium"
              >
                {it}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-base font-semibold uppercase tracking-[0.18em] text-brand">
            What it reveals
          </p>
          <ol className="mt-4 space-y-4">
            {active.reveals.map((r, i) => (
              <li key={r.title} className="flex gap-4">
                <span className="mt-px font-mono text-base font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-snug">{r.title}</p>
                  <p className="mt-1 text-base leading-relaxed text-navy-muted">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-6 border-l-2 border-brand pl-4 text-base leading-relaxed text-foreground/90 md:text-base">
        The assessment creates the fact base for the to-be design, costing, and procurement plan.
      </p>
    </SectionShell>
  );
}
