import { ArrowRight, FileSpreadsheet, GitBranch, ShieldHalf, Target, Zap } from "lucide-react";

const capabilities = [
  {
    icon: Zap,
    number: "01",
    title: "Power-sector context",
    body: "Critical assets, generation operations and Indian public-sector realities.",
  },
  {
    icon: ShieldHalf,
    number: "02",
    title: "Security convergence",
    body: "Physical, cyber, OT and command-centre architecture in one control model.",
  },
  {
    icon: FileSpreadsheet,
    number: "03",
    title: "Procurement engineering",
    body: "Risk translated into DPRs, BoQs, SLAs and objective acceptance criteria.",
  },
  {
    icon: GitBranch,
    number: "04",
    title: "Programme governance",
    body: "Pilot-to-fleet delivery with gates, evidence, escalation and ownership.",
  },
];

const proof = [
  "Power & utilities",
  "Surveillance programmes",
  "Command-centre design",
  "OT / cyber",
  "Tender / RFP",
  "Deployment governance",
  "India public sector",
  "Major infrastructure PMO",
];

const outcomes = [
  "Decision-ready design",
  "Procurement-ready package",
  "Implementation-ready governance",
];

export function WhyEy() {
  return (
    <section
      id="why-ey"
      className="section-10-infographic scroll-mt-20 bg-navy py-16 text-navy-foreground md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#ffe600]">
              <span className="h-3 w-1.5 rounded-sm bg-[#ffe600]" />
              Section 10
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-[2.6rem]">
              EY Brings the Four Capabilities That Turn Architecture into Delivery
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-muted">
              Domain context, converged security design, procurement engineering and programme
              governance operate as one delivery system—not four disconnected workstreams.
            </p>
          </div>
          <a
            href="#credentials"
            className="print-hidden inline-flex items-center gap-2 rounded-md border border-[#ffe600]/60 px-4 py-2.5 text-sm font-semibold text-[#ffe600] transition-colors hover:bg-[#ffe600]/10"
          >
            View evidence base
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-9 overflow-hidden rounded-[1.75rem] border border-white/15">
          <div className="grid gap-px bg-white/15 lg:grid-cols-[1fr_12rem_1fr]">
            <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-1">
              {capabilities.slice(0, 2).map((capability) => (
                <Capability key={capability.title} capability={capability} />
              ))}
            </div>

            <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden bg-[#ffe600] px-5 py-8 text-center text-navy">
              <span className="absolute -left-10 -top-10 h-32 w-32 rounded-full border border-navy/10" />
              <span className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full border border-navy/10" />
              <Target className="relative h-10 w-10" strokeWidth={1.5} />
              <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.18em]">
                Integrated value
              </p>
              <h3 className="relative mt-2 text-xl font-semibold leading-tight">
                From advice to an operable system
              </h3>
              <div className="relative mt-5 h-px w-16 bg-navy/30" />
              <p className="relative mt-4 text-sm leading-relaxed text-navy/75">
                Independent choices. Procurement discipline. Delivery accountability.
              </p>
            </div>

            <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-1">
              {capabilities.slice(2).map((capability) => (
                <Capability key={capability.title} capability={capability} />
              ))}
            </div>
          </div>

          <div className="grid gap-px border-t border-white/15 bg-white/15 md:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <div key={outcome} className="flex items-center gap-3 bg-navy-soft px-5 py-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ffe600] font-mono text-xs font-bold text-navy">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffe600]">
            Evidence spans
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 border-l border-white/20 pl-3 text-sm text-navy-muted"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffe600]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Capability({ capability }: { capability: (typeof capabilities)[number] }) {
  return (
    <article className="flex min-h-40 gap-4 bg-navy px-5 py-5">
      <span className="font-mono text-sm font-semibold text-[#ffe600]">{capability.number}</span>
      <div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-[#ffe600] ring-1 ring-white/15">
          <capability.icon className="h-4.5 w-4.5" strokeWidth={1.7} />
        </span>
        <h3 className="mt-4 font-semibold">{capability.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-muted">{capability.body}</p>
      </div>
    </article>
  );
}
