import { useState } from "react";
import { ArrowRight, Check, MapPin, Radio, ScanSearch, ShieldCheck } from "lucide-react";

import coalHandlingScene from "@/assets/scenarios/coal-handling-intrusion.webp";
import commandCentreScene from "@/assets/scenarios/command-centre-response.webp";
import perimeterScene from "@/assets/scenarios/perimeter-intrusion.webp";
import switchyardScene from "@/assets/scenarios/switchyard-intrusion.webp";
import { cn } from "@/lib/utils";

import { SectionShell } from "./SectionShell";
import { groupOrder, useCases, type UseCase } from "./useCaseData";

const groupImages: Record<string, string> = {
  "Generation and electrical assets": switchyardScene,
  "Material and movement integrity": coalHandlingScene,
  "Safety and process events": switchyardScene,
  "Remote and distributed assets": perimeterScene,
  "System integrity and investigation": commandCentreScene,
};

export function UseCases() {
  const [activeId, setActiveId] = useState(1);
  const current = useCases.find((scenario) => scenario.id === activeId) ?? useCases[0]!;

  return (
    <SectionShell
      id="use-cases"
      eyebrow="Section 07"
      title="Power-Plant Security Scenario Workspace"
      intro="A case-management view of all 26 operating scenarios. Select a case to review its evidence chain, operational consequence and response playbook; the print edition expands every record automatically."
      tone="tint"
    >
      <div className="section-07-workspace print-hidden overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-card">
        <WorkspaceHeader active={current} />

        <div className="grid min-h-[43rem] lg:grid-cols-[18rem_1fr]">
          <aside className="border-b border-navy/10 bg-[#f3efe5] lg:border-b-0 lg:border-r">
            <div className="border-b border-navy/10 px-4 py-4">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy/45">
                Scenario queue
              </p>
              <div className="mt-2 flex items-end justify-between">
                <p className="font-mono text-3xl font-semibold text-navy">{useCases.length}</p>
                <p className="text-xs text-navy/45">5 operating groups</p>
              </div>
            </div>

            <div className="max-h-[38rem] overflow-y-auto px-3 py-3">
              {groupOrder.map((group) => {
                const scenarios = useCases.filter((scenario) => scenario.group === group);
                return (
                  <div key={group} className="mb-5 last:mb-0">
                    <div className="mb-2 flex items-center justify-between gap-3 px-2">
                      <p className="text-[0.58rem] font-bold uppercase leading-tight tracking-[0.12em] text-navy/45">
                        {group}
                      </p>
                      <span className="font-mono text-[0.58rem] text-navy/35">
                        {scenarios.length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {scenarios.map((scenario) => (
                        <button
                          key={scenario.id}
                          type="button"
                          onClick={() => setActiveId(scenario.id)}
                          className={cn(
                            "grid w-full grid-cols-[2rem_1fr] items-center gap-2 rounded-xl px-2 py-2.5 text-left transition-colors",
                            scenario.id === current.id
                              ? "bg-[#ffe600] text-navy"
                              : "text-navy/65 hover:bg-white hover:text-navy",
                          )}
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-full border border-current/15 font-mono text-[0.58rem] font-bold">
                            {String(scenario.id).padStart(2, "0")}
                          </span>
                          <span className="text-xs font-semibold leading-snug">
                            {scenario.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0 bg-white">
            <CaseHero scenario={current} />
            <CaseChain scenario={current} />

            <div className="grid gap-px border-t border-navy/10 bg-navy/10 lg:grid-cols-[1fr_0.9fr]">
              <div className="grid gap-px bg-navy/10 sm:grid-cols-2">
                <CaseText label="What it detects" body={current.detects} icon={ScanSearch} />
                <CaseText label="Why it matters" body={current.matters} icon={ShieldCheck} />
              </div>
              <ResponseTimeline scenario={current} />
            </div>
          </div>
        </div>
      </div>

      <div className="section-07-register hidden print:block">
        <div className="border-b border-navy/15 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Complete printable scenario register
          </p>
          <h3 className="mt-1 text-2xl font-semibold">All {useCases.length} scenarios</h3>
        </div>
        <div className="mt-6 space-y-8">
          {groupOrder.map((group) => (
            <section key={group} className="scenario-group">
              <h4 className="mb-3 border-l-4 border-[#ffe600] pl-3 text-sm font-semibold uppercase tracking-[0.14em]">
                {group}
              </h4>
              <div className="grid gap-4 xl:grid-cols-2">
                {useCases
                  .filter((scenario) => scenario.group === group)
                  .map((scenario) => (
                    <ScenarioRecord key={scenario.id} scenario={scenario} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function WorkspaceHeader({ active }: { active: UseCase }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 bg-[#fffdf8] px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffe600] text-navy">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy/40">
            Integrated scenario register
          </p>
          <p className="mt-0.5 text-sm font-semibold text-navy">Case review / response playbook</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ffe600]" />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-navy/50">
          Case {String(active.id).padStart(2, "0")} of {useCases.length}
        </span>
      </div>
    </div>
  );
}

function CaseHero({ scenario }: { scenario: UseCase }) {
  return (
    <div className="relative min-h-[17rem] overflow-hidden bg-[#eee9dc]">
      <img
        key={scenario.group}
        src={groupImages[scenario.group] ?? commandCentreScene}
        alt="Isometric power-plant security scenario context"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5ec] via-[#f8f5ec]/85 to-[#f8f5ec]/25" />
      <div className="relative flex min-h-[17rem] max-w-xl flex-col justify-end p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#ffe600] px-3 py-1 font-mono text-[0.62rem] font-bold text-navy">
            {String(scenario.id).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-navy/10 bg-white/80 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-navy/55">
            {scenario.zone}
          </span>
          {scenario.plantTypes ? (
            <span className="rounded-full border border-navy/10 bg-white/80 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-navy/55">
              {scenario.plantTypes}
            </span>
          ) : null}
        </div>
        <h3 className="mt-4 text-3xl font-semibold leading-tight text-navy">{scenario.name}</h3>
        <p className="mt-3 text-sm font-medium text-navy/55">{scenario.group}</p>
      </div>
    </div>
  );
}

function CaseChain({ scenario }: { scenario: UseCase }) {
  const chain = [
    ["Detect", scenario.chain.detect, ScanSearch],
    ["Correlate", scenario.chain.correlate, MapPin],
    ["Respond", scenario.chain.respond, Radio],
  ] as const;
  return (
    <div className="grid gap-2 border-t border-navy/10 bg-[#fffdf8] p-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center md:p-5">
      {chain.map(([label, value, Icon], index) => (
        <div key={label} className="contents">
          <div className="rounded-2xl border border-navy/10 bg-white p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffe600] text-navy">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/40">
                  {label}
                </p>
                <p className="mt-1 text-xs font-semibold leading-snug text-navy">{value}</p>
              </div>
            </div>
          </div>
          {index < chain.length - 1 ? (
            <ArrowRight className="hidden h-4 w-4 text-navy/25 sm:block" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function CaseText({
  label,
  body,
  icon: Icon,
}: {
  label: string;
  body: string;
  icon: typeof ScanSearch;
}) {
  return (
    <div className="bg-white p-5 md:p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-navy/45" />
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-navy/45">{label}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-navy/70">{body}</p>
    </div>
  );
}

function ResponseTimeline({ scenario }: { scenario: UseCase }) {
  return (
    <div className="bg-[#f3efe5] p-5 md:p-6">
      <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-navy/45">
        Control-room response timeline
      </p>
      <ol className="mt-4 space-y-0">
        {scenario.response.map((step, index) => (
          <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
            <div className="flex flex-col items-center">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffe600] font-mono text-[0.58rem] font-bold text-navy">
                {index + 1}
              </span>
              {index < scenario.response.length - 1 ? (
                <span className="h-8 w-px bg-navy/15" />
              ) : null}
            </div>
            <div className="pt-1.5">
              <p className="text-sm font-semibold leading-snug text-navy">{step}</p>
              {index === scenario.response.length - 1 ? (
                <div className="mt-3 flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-navy/40">
                  <Check className="h-3.5 w-3.5" /> Evidence retained
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScenarioRecord({ scenario }: { scenario: UseCase }) {
  return (
    <article className="scenario-record overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <div className="grid grid-cols-[3.25rem_1fr] border-b border-navy/10">
        <div className="grid place-items-center bg-[#ffe600] font-mono text-sm font-bold text-navy">
          {String(scenario.id).padStart(2, "0")}
        </div>
        <div className="px-4 py-3">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {scenario.zone}
            {scenario.plantTypes ? ` / ${scenario.plantTypes}` : ""}
          </p>
          <h4 className="mt-1 text-base font-semibold text-navy">{scenario.name}</h4>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 bg-[#f5f2e9] px-4 py-3">
        {[scenario.chain.detect, scenario.chain.correlate, scenario.chain.respond].map(
          (item, index) => (
            <div key={`${scenario.id}-${item}`} className="contents">
              <p className="text-center text-[0.64rem] font-semibold leading-tight text-navy/75">
                {item}
              </p>
              {index < 2 ? <ArrowRight className="h-3.5 w-3.5 text-navy/30" /> : null}
            </div>
          ),
        )}
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/45">
            What it detects
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-navy/75">{scenario.detects}</p>
        </div>
        <div>
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/45">
            Why it matters
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-navy/75">{scenario.matters}</p>
        </div>
      </div>
      <ol className="grid gap-2 border-t border-navy/10 px-4 py-3 sm:grid-cols-4">
        {scenario.response.map((step, index) => (
          <li
            key={step}
            className="grid grid-cols-[1.25rem_1fr] gap-2 text-[0.65rem] leading-snug text-navy/70"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ffe600] font-mono text-[0.5rem] font-bold text-navy">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
