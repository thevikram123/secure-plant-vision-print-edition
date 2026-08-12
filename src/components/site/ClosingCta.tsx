import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section id="closing" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="rounded-2xl border border-hairline bg-surface-2 px-6 py-12 text-center shadow-card md:px-16 md:py-16">
          <p className="text-base font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Section 11
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-2xl font-semibold leading-tight md:text-4xl">
            Start with a structured security assessment for one pilot plant or one operating cluster
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-base">
            EY can help define the current state, target state, implementation roadmap, and
            procurement-ready roadmap.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:contact@example.com?subject=Security%20assessment%20discussion"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-base font-semibold text-navy-foreground transition-opacity hover:opacity-90"
            >
              Book an assessment discussion
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#offerings"
              className="inline-flex items-center rounded-md border border-navy/25 px-5 py-3 text-base font-semibold text-foreground transition-colors hover:bg-surface"
            >
              View the delivery framework
            </a>
          </div>
          <p className="mt-8 text-base text-muted-foreground">
            Placeholder: engagement contact details and EY team credentials to be inserted before
            client circulation.
          </p>
        </div>
      </div>
    </section>
  );
}