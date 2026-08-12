import { Zap, ShieldHalf, FileSpreadsheet, GitBranch, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: Zap,
    title: "Power-sector operating context",
    body: "Generation operations, critical assets and the Indian regulatory environment.",
  },
  {
    icon: ShieldHalf,
    title: "Physical + cyber + OT convergence",
    body: "Architecture across plant security, networks and operational systems.",
  },
  {
    icon: FileSpreadsheet,
    title: "Procurement-grade engineering",
    body: "Requirements translated into DPRs, BoQs, SLAs and acceptance criteria.",
  },
  {
    icon: GitBranch,
    title: "Programme governance",
    body: "From pilot design through multi-site implementation.",
  },
];

const credentialDimensions = [
  "Power & utilities",
  "Security / surveillance programmes",
  "Command-centre design",
  "OT / cyber",
  "Major infrastructure programme management",
  "Tender / RFP procurement",
  "Deployment governance",
  "India public sector",
];

export function WhyEy() {
  return (
    <section id="why-ey" className="scroll-mt-20 bg-navy py-20 text-navy-foreground md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.22em] text-brand">
              Section 10
            </p>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight md:text-4xl">
              What EY Brings
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy-muted md:text-base">
              Four capabilities that the programme actually depends on — domain, convergence,
              procurement engineering and governance — followed by the credential set to be
              evidenced during the engagement discussion.
            </p>
            <a
              href="#closing"
              className="mt-8 inline-flex items-center rounded-md bg-brand px-5 py-3 text-base font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Discuss a pilot engagement
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-navy-foreground/15 bg-navy-foreground/[0.04] p-5"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand/15 text-brand">
                  <c.icon size={18} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-base font-semibold md:text-base">{c.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-navy-muted md:text-base">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-navy-foreground/15 pt-8">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-navy-muted">
            Credentials will be evidenced across
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {credentialDimensions.map((d) => (
              <span
                key={d}
                className="rounded-full border border-navy-foreground/20 px-3 py-1.5 text-base font-medium text-navy-foreground/85 md:text-base"
              >
                {d}
              </span>
            ))}
          </div>

          <a
            href="#credentials"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-brand/50 px-4 py-2.5 text-base font-semibold text-brand transition-colors hover:bg-brand/10"
          >
            See power-sector credentials
            <ArrowRight size={15} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  );
}
