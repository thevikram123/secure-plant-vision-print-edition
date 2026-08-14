import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section id="closing" className="scroll-mt-20 bg-navy py-20 text-white md:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe600]">
            Section 11
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.02] md:text-5xl">
            Start with a structured security assessment for one pilot plant or one operating cluster
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
            EY can help define the current state, target state, implementation roadmap, and
            procurement-ready roadmap.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="mailto:Raja.Bhattacharjee@in.ey.com?subject=Security%20assessment%20discussion"
              className="inline-flex items-center gap-2 rounded-md bg-[#ffe600] px-5 py-3 text-sm font-semibold text-navy"
            >
              Book an assessment discussion
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-8 text-xs text-white/35">
            Placeholder: engagement contact details and EY team credentials to be inserted before
            client circulation.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {[
            ["01", "Assess", "Critical assets, zones, threats and current controls"],
            ["02", "Prioritise", "Risk-led gaps and the pilot scope that matters most"],
            ["03", "Design", "Target architecture, SOPs and procurement specifications"],
            ["04", "Mobilise", "A phased roadmap with governance and measurable outcomes"],
          ].map(([number, title, copy]) => (
            <div key={number} className="flex min-h-40 flex-col justify-between bg-white/[0.04] p-6">
              <span className="font-mono text-sm font-bold text-[#ffe600]">{number}</span>
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
