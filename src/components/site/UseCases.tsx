import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionShell } from "./SectionShell";
import { groupOrder, useCases } from "./useCaseData";

export function UseCases() {
  const [active, setActive] = useState(0);
  const [showCatalogue, setShowCatalogue] = useState(false);
  const current = useCases[active] ?? useCases[0]!;

  return (
    <SectionShell
      id="use-cases"
      eyebrow="Section 07"
      title="Power-plant security scenarios and control-room response"
      intro="Every scenario is one chain: detect, correlate, respond. Drawn from generation-plant operating reality — switchyard, CHP, stores, hazardous zones, remote assets and airspace."
      tone="tint"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <div className="flex max-h-[34rem] flex-col gap-3 overflow-y-auto pr-1 lg:min-w-0">
          {groupOrder.map((group) => (
            <div key={group} className="flex flex-col gap-1.5">
              <p className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group}
              </p>
              {useCases.map((uc, i) =>
                uc.group !== group ? null : (
                  <button
                    key={uc.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left text-base font-medium leading-tight transition-colors",
                      i === active
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-hairline bg-surface text-muted-foreground hover:border-navy/30 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-base",
                        i === active ? "opacity-70" : "text-ey-gold",
                      )}
                    >
                      {String(uc.id).padStart(2, "0")}
                    </span>
                    <span className="truncate">{uc.name}</span>
                  </button>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <article className="rounded-xl border border-hairline bg-surface p-6 shadow-card md:p-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-base font-semibold uppercase tracking-[0.16em] text-ey-gold">
                {current.zone}
              </p>
              {current.plantTypes ? (
                <p className="rounded-full border border-hairline px-2 py-0.5 text-base uppercase tracking-[0.12em] text-muted-foreground">
                  {current.plantTypes}
                </p>
              ) : null}
            </div>
            <h3 className="mt-2 text-lg font-semibold md:text-2xl">{current.name}</h3>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-surface-2 px-4 py-3 text-base">
              {(
                [
                  ["Detect", current.chain.detect],
                  ["Correlate", current.chain.correlate],
                  ["Respond", current.chain.respond],
                ] as const
              ).map(([label, value], i) => (
                <span key={label} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-ey-gold">&rarr;</span> : null}
                  <span className="font-mono uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="font-medium">{value}</span>
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  What it detects
                </p>
                <p className="mt-2 text-base leading-relaxed">{current.detects}</p>
              </div>
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Why it matters
                </p>
                <p className="mt-2 text-base leading-relaxed">{current.matters}</p>
              </div>
            </div>
            <div className="mt-8 border-t border-hairline pt-6">
              <p className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                How the control room responds
              </p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {current.response.map((step, i) => (
                  <li key={step} className="rounded-lg bg-surface-2 px-4 py-3">
                    <span className="font-mono text-base text-ey-gold">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1.5 text-base font-medium leading-snug">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-6 border-t border-hairline pt-4 text-base leading-relaxed text-muted-foreground">
              Note: the final scenario library, thresholds and escalation matrix are confirmed per
              plant type and per zone during the as-is assessment.
            </p>
          </article>

          <div className="rounded-xl border border-hairline bg-surface">
            <button
              type="button"
              onClick={() => setShowCatalogue((v) => !v)}
              className="print-hidden flex w-full items-center justify-between gap-3 px-5 py-3 text-left"
            >
              <span className="text-base font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Full catalogue &mdash; {useCases.length} scenarios
              </span>
              <span className="font-mono text-base text-ey-gold">
                {showCatalogue ? "Hide" : "Show"}
              </span>
            </button>
            <div
              className={cn(
                "use-case-catalogue grid gap-x-8 gap-y-2 border-t border-hairline px-5 py-4 md:grid-cols-2",
                !showCatalogue && "hidden",
              )}
            >
              {useCases.map((uc, i) => (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex items-baseline gap-2 text-left text-base leading-snug hover:text-ey-gold"
                >
                  <span className="font-mono text-base text-ey-gold">
                    {String(uc.id).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-semibold">{uc.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {uc.chain.detect} &rarr; {uc.chain.correlate} &rarr; {uc.chain.respond}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
