import { ClipboardCheck, FileText, Handshake, Settings, ShieldCheck } from "lucide-react";
import { SectionShell } from "./SectionShell";

const stages = [
  {
    icon: ClipboardCheck,
    phase: "Diagnose",
    items: [
      "Security maturity assessment",
      "Site risk assessment",
      "Coverage and gap analysis",
      "Threat and zoning baseline",
    ],
  },
  {
    icon: FileText,
    phase: "Design",
    items: [
      "To-be integrated architecture",
      "Zoning and control mapping",
      "Phasing and CAPEX bands",
      "DPR preparation",
    ],
  },
  {
    icon: Handshake,
    phase: "Procure",
    items: [
      "Technical specifications",
      "BoQ and cost estimation",
      "RFP drafting",
      "Vendor evaluation framework",
    ],
  },
  {
    icon: Settings,
    phase: "Deliver",
    items: [
      "Implementation PMU / PMC",
      "Milestone and issue governance",
      "FAT, SAT and UAT support",
      "SOP design and training",
    ],
  },
  {
    icon: ShieldCheck,
    phase: "Assure",
    items: [
      "Acceptance sign-off",
      "SLA and O&M framework",
      "KPI and uptime reporting",
      "Continuous improvement roadmap",
    ],
  },
];

const stance = ["Vendor-neutral", "Governance-led", "Implementation-oriented"];

export function Offerings() {
  return (
    <SectionShell
      id="offerings"
      eyebrow="Section 08"
      title="How EY Can Support"
      intro="One advisory lifecycle — Diagnose, Design, Procure, Deliver, Assure — with defined outputs at every stage."
    >
      {/* Desktop ribbon */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 overflow-hidden rounded-lg bg-navy text-navy-foreground">
          {stages.map((s, i) => (
            <div
              key={s.phase}
              className="relative flex items-center gap-3 px-6 py-4 [&:not(:first-child)]:pl-8"
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px bg-navy-foreground/20"
                />
              ) : null}
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand/20 text-brand">
                <s.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-base font-semibold tracking-[0.16em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="truncate text-base font-semibold">{s.phase}</p>
              </div>
              {i < stages.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-[-0.4rem] top-1/2 z-10 -translate-y-1/2 text-base text-brand"
                >
                  ▶
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5">
          {stages.map((s) => (
            <div key={s.phase} className="px-6 pt-0">
              <span aria-hidden className="mx-auto block h-6 w-px bg-hairline" />
              <ul className="space-y-2.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-base leading-snug text-foreground/90"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-brand"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet vertical rail */}
      <div className="relative lg:hidden">
        <span aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-hairline" />
        <div className="space-y-7">
          {stages.map((s, i) => (
            <div key={s.phase} className="relative pl-12">
              <span className="absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-md bg-navy text-navy-foreground">
                <s.icon className="h-4 w-4" />
              </span>
              <p className="font-mono text-base font-semibold tracking-[0.16em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-base font-semibold">{s.phase}</p>
              <ul className="mt-2.5 space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-2 text-base leading-snug text-foreground/90">
                    <span
                      aria-hidden
                      className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-brand"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-hairline pt-5 text-base text-muted-foreground">
        {stance.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            {i > 0 ? <span aria-hidden className="text-hairline">/</span> : null}
            <span className="font-semibold text-foreground/90">{s}</span>
          </span>
        ))}
        <span className="basis-full sm:basis-auto">
          — no product or OEM interest; specifications, SLAs and acceptance criteria that hold
          through rollout and go-live.
        </span>
      </p>
    </SectionShell>
  );
}
