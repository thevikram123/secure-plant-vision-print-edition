import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  Handshake,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { SectionShell } from "./SectionShell";

const stages = [
  {
    icon: ClipboardCheck,
    phase: "Diagnose",
    verb: "Know the risk",
    output: "Fact base",
    items: ["Maturity assessment", "Site risk and zoning", "Coverage and control gaps"],
  },
  {
    icon: FileText,
    phase: "Design",
    verb: "Define the target",
    output: "Target state",
    items: ["Integrated architecture", "Control mapping", "DPR and CAPEX phasing"],
  },
  {
    icon: Handshake,
    phase: "Procure",
    verb: "Make it buyable",
    output: "Tender pack",
    items: ["Specifications and BoQ", "RFP drafting", "Vendor evaluation"],
  },
  {
    icon: Settings,
    phase: "Deliver",
    verb: "Control execution",
    output: "Working system",
    items: ["PMU / PMC governance", "FAT, SAT and UAT", "SOPs and training"],
  },
  {
    icon: ShieldCheck,
    phase: "Assure",
    verb: "Sustain value",
    output: "Operational control",
    items: ["Acceptance sign-off", "SLA and O&M model", "KPI improvement loop"],
  },
];

export function Offerings() {
  return (
    <SectionShell
      id="offerings"
      eyebrow="Section 08"
      title="One Advisory Lifecycle—from Risk Discovery to Operational Assurance"
      intro="Each stage converts uncertainty into a decision-ready artefact, with governance and vendor neutrality running through the full programme."
      tone="tint"
    >
      <div className="section-08-infographic overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-card">
        <div className="relative px-5 py-7 md:px-7">
          <div className="absolute left-[10%] right-[10%] top-[5.2rem] hidden h-px bg-hairline lg:block" />
          <div className="grid gap-4 lg:grid-cols-5">
            {stages.map((stage, index) => (
              <article key={stage.phase} className="relative flex flex-col">
                <div className="relative z-10 flex items-center gap-3 lg:flex-col lg:text-center">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-surface bg-navy text-[#ffe600] ring-1 ring-hairline">
                    <stage.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                      PHASE {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-ey-green-deep">{stage.phase}</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{stage.verb}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-1 flex-col rounded-xl bg-ey-cream p-4">
                  <ul className="space-y-2.5">
                    {stage.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-snug text-foreground/90">
                        <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffe600] ring-2 ring-[#ffe600]/25" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 border-t border-hairline pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Decision output
                    </p>
                    <p className="mt-1 font-semibold text-ey-green-deep">{stage.output}</p>
                  </div>
                </div>

                {index < stages.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-[3.95rem] z-20 hidden h-5 w-5 rounded-full bg-surface p-1 text-ey-green-deep/45 lg:block" />
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-px border-t border-hairline bg-hairline md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {[
            ["Vendor-neutral", "Control choices without OEM bias"],
            ["Governance-led", "Gates, evidence and accountable decisions"],
            ["Implementation-oriented", "Specifications that survive rollout"],
          ].map(([title, body], index) => (
            <div key={title} className="contents">
              <div className="bg-navy px-6 py-5 text-navy-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffe600]">
                  {title}
                </p>
                <p className="mt-1 text-sm text-navy-muted">{body}</p>
              </div>
              {index < 2 ? (
                <ArrowRight className="mx-2 hidden self-center text-[#ffe600] md:block" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
