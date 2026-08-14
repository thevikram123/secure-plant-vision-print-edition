import { useMemo, useState } from "react";
import { ChevronDown, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionShell } from "./SectionShell";
import { IndiaMap } from "./IndiaMap";
import { categories, powerEngagements, programmes } from "./credentialsData";

const stats = [
  { value: "40+", label: "Surveillance, ICCC & ERSS programmes" },
  { value: "25+", label: "Cities with command-centre deployments" },
  { value: "18", label: "States & union territories" },
  { value: "~38 GW", label: "Generation capacity advised" },
];

const columns: Array<{ title: string; ids: string[] }> = [
  { title: "Safe city & statewide surveillance", ids: ["safecity"] },
  { title: "ICCC & smart city", ids: ["iccc"] },
  { title: "Emergency response & fire", ids: ["erss", "fire"] },
  { title: "Power sector, large-scale & counter-drone", ids: ["power", "police", "cdrone"] },
];

export function Credentials() {
  return (
    <>
      <CredentialsFootprint />
      <PowerEngagements />
    </>
  );
}

export function CredentialsFootprint() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>("delhi-safe");

  const selected = useMemo(() => programmes.find((p) => p.id === selectedId) ?? null, [selectedId]);

  return (
    <SectionShell
      id="credentials"
      eyebrow="Section 09 (1/2)"
      title="Credentials"
      intro="A national surveillance, command-centre and emergency-response footprint — the delivery base for power-sector security modernization, supported by power generation engagements where EY has run as-is / to-be studies, DPRs, specifications, tendering and implementation governance."
      tone="cream"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-hairline bg-surface/70 p-5 shadow-card"
          >
            <p className="text-2xl font-semibold text-ey-green-deep md:text-3xl">{s.value}</p>
            <p className="mt-1 text-base font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Surveillance footprint — the hero of this section */}
      <div className="mt-6 rounded-3xl bg-ey-charcoal p-5 text-navy-foreground md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-ey-yellow">
              Surveillance, ICCC and emergency-response footprint
            </p>
            <p className="mt-2 max-w-3xl text-base leading-relaxed">
              The largest and most diverse defence and surveillance consulting practice in India
              among all consulting firms.
            </p>
          </div>
          <div className="print-hidden flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                activeCategory === "all"
                  ? "border-ey-yellow bg-ey-yellow/15 text-ey-yellow"
                  : "border-navy-foreground/25 text-navy-foreground/75 hover:border-navy-foreground/50",
              )}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                  activeCategory === c.id
                    ? "border-ey-yellow bg-ey-yellow/15 text-ey-yellow"
                    : "border-navy-foreground/25 text-navy-foreground/75 hover:border-navy-foreground/50",
                )}
              >
                {c.short}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.72fr_1.56fr_0.72fr]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {columns.slice(0, 2).map((col) => (
              <ProgrammeList
                key={col.title}
                title={col.title}
                ids={col.ids}
                activeCategory={activeCategory}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>

          <div>
            <div className="mx-auto h-[32rem] w-full lg:h-[44rem]">
              <IndiaMap
                items={programmes}
                activeCategory={activeCategory}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {categories.map((c) => (
                <span
                  key={c.id}
                  className="flex items-center gap-1.5 text-sm font-medium text-navy-foreground/80"
                >
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
                    <circle cx="5" cy="5" r="5" className={c.dot} />
                  </svg>
                  {c.label}
                </span>
              ))}
            </div>

            {selected ? (
              <div className="mt-3 rounded-2xl border border-ey-yellow/40 bg-navy-foreground/[0.06] p-4">
                <p
                  className={cn(
                    "text-sm font-semibold uppercase tracking-[0.16em]",
                    categories.find((c) => c.id === selected.category)?.text,
                  )}
                >
                  {categories.find((c) => c.id === selected.category)?.label} · {selected.place}
                </p>
                <p className="mt-1.5 text-base font-semibold leading-snug">{selected.name}</p>
                <p className="mt-1 text-base leading-relaxed text-navy-foreground/80">
                  {selected.detail}
                </p>
              </div>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {columns.slice(2).map((col) => (
              <ProgrammeList
                key={col.title}
                title={col.title}
                ids={col.ids}
                activeCategory={activeCategory}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Power-sector engagements — supporting strip */}
    </SectionShell>
  );
}

export function PowerEngagements() {
  const [openEngagement, setOpenEngagement] = useState<string | null>(
    powerEngagements[0]?.client ?? null,
  );

  return (
    <SectionShell
      id="credentials-power"
      eyebrow="Section 09 (2/2) · Power-sector evidence"
      title="Power Generation Engagements"
      intro="Selected generation-sector assignments demonstrating the assessment, design, procurement and implementation-governance experience behind the proposed security modernisation approach."
      tone="cream"
    >
      <div>
        <p className="text-base font-semibold uppercase tracking-[0.18em] text-ey-green-deep">
          Power generation engagements
        </p>
        <div className="mt-3 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface/70 shadow-card">
          {powerEngagements.map((e) => {
            const open = openEngagement === e.client;
            return (
              <div key={e.client}>
                <button
                  type="button"
                  onClick={() => setOpenEngagement(open ? null : e.client)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ey-yellow/20 text-ey-green-deep">
                    <Zap size={15} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold leading-snug text-ey-green-deep">
                      {e.client}
                    </span>
                    <span className="block text-base leading-snug text-muted-foreground">
                      {e.project}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-base font-semibold text-foreground/80 md:block">
                    {e.capacity.split(" (")[0]}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.8}
                    className={cn("shrink-0 transition-transform", open && "rotate-180")}
                  />
                </button>
                {open ? (
                  <div className="grid gap-4 border-t border-hairline px-5 py-4 lg:grid-cols-[1.1fr_1fr]">
                    <dl className="grid gap-x-4 gap-y-1.5 text-base leading-relaxed sm:grid-cols-2">
                      <div>
                        <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Capacity covered
                        </dt>
                        <dd className="text-foreground/85">{e.capacity}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          EY role
                        </dt>
                        <dd className="text-foreground/85">{e.role}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Unit capacity
                        </dt>
                        <dd className="text-foreground/85">{e.units}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Coverage
                        </dt>
                        <dd className="text-foreground/85">{e.stations}</dd>
                      </div>
                    </dl>
                    <div>
                      <p className="text-base font-semibold uppercase tracking-[0.16em] text-ey-green">
                        Scope of work
                      </p>
                      <ul className="mt-1.5 grid gap-1 text-base leading-relaxed text-muted-foreground">
                        {e.scope.map((s) => (
                          <li key={s} className="flex gap-2">
                            <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-ey-yellow" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Additional credentials and detailed case studies available on request, subject to client
        approval.
      </p>
    </SectionShell>
  );
}

function ProgrammeList({
  title,
  ids,
  activeCategory,
  selectedId,
  onSelect,
}: {
  title: string;
  ids: string[];
  activeCategory: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const items = programmes.filter((p) => ids.includes(p.category));
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ey-yellow">{title}</p>
      <ul className="mt-2 grid gap-0.5">
        {items.map((p) => {
          const dimmed = activeCategory !== "all" && activeCategory !== p.category;
          const active = selectedId === p.id;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={cn(
                  "flex w-full items-start gap-2 rounded-md px-2 py-1 text-left text-base leading-snug transition-colors",
                  dimmed ? "opacity-40" : "opacity-100",
                  active
                    ? "bg-ey-yellow/15 text-navy-foreground"
                    : "text-navy-foreground/80 hover:bg-navy-foreground/[0.06]",
                )}
              >
                <svg viewBox="0 0 10 10" className="mt-[0.45rem] h-2 w-2 shrink-0">
                  <circle
                    cx="5"
                    cy="5"
                    r="5"
                    className={categories.find((c) => c.id === p.category)?.dot}
                  />
                </svg>
                <span>{p.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
