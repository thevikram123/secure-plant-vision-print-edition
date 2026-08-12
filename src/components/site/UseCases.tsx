import { ArrowRight, BellRing, MapPinned, Radio, ScanSearch, ShieldCheck } from "lucide-react";

import coalHandlingScene from "@/assets/scenarios/coal-handling-intrusion.webp";
import commandCentreScene from "@/assets/scenarios/command-centre-response.webp";
import perimeterScene from "@/assets/scenarios/perimeter-intrusion.webp";
import switchyardScene from "@/assets/scenarios/switchyard-intrusion.webp";

import { SectionShell } from "./SectionShell";
import { groupOrder, useCases, type UseCase } from "./useCaseData";

const scenarioScenes = [
  {
    id: "01",
    zone: "Zone A / perimeter",
    title: "Perimeter intrusion",
    image: perimeterScene,
    alt: "3D isometric power plant perimeter intrusion detected by thermal and PTZ cameras",
    chain: ["Thermal + PTZ", "PIDS + GIS", "Guard dispatch"],
  },
  {
    id: "02",
    zone: "Zone B / electrical",
    title: "Switchyard intrusion",
    image: switchyardScene,
    alt: "3D isometric switchyard intrusion detected inside a transformer zone",
    chain: ["Video detect", "Permit check", "Security alert"],
  },
  {
    id: "03",
    zone: "Zone B / fuel path",
    title: "Coal-handling approach",
    image: coalHandlingScene,
    alt: "3D isometric unauthorised approach to a coal conveyor and handling plant",
    chain: ["Person detect", "CHP clearance", "Control-room action"],
  },
];

const responseSteps = [
  { icon: ScanSearch, label: "Detect", detail: "Field device identifies the event" },
  { icon: MapPinned, label: "Correlate", detail: "ICCC adds location, identity and plant context" },
  { icon: Radio, label: "Respond", detail: "Operator triggers the verified SOP" },
];

export function UseCases() {
  return (
    <SectionShell
      id="use-cases"
      eyebrow="Section 07"
      title="Power-Plant Security Scenarios and Control-Room Response"
      intro="Every scenario remains in the register below. The isometric scenes provide the visual overview; the complete detect, correlate and respond logic remains available for screen review and print."
      tone="tint"
    >
      <div className="section-07-infographic overflow-hidden rounded-[2rem] border border-navy/10 bg-[#f5f2e9] shadow-card">
        <div className="grid gap-px bg-navy/10 lg:grid-cols-[1.3fr_0.9fr]">
          <ScenarioCard scene={scenarioScenes[0]} featured />
          <div className="grid gap-px bg-navy/10 sm:grid-cols-2 lg:grid-cols-1">
            {scenarioScenes.slice(1).map((scene) => (
              <ScenarioCard key={scene.id} scene={scene} />
            ))}
          </div>
        </div>

        <div className="grid gap-px border-t border-navy/10 bg-navy/10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-56 overflow-hidden bg-[#f5f2e9]">
            <img
              src={commandCentreScene}
              alt="3D isometric integrated security command centre coordinating incident response"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[#f5f2e9]/15" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-navy/10 bg-[#fffdf7]/90 p-4 text-navy backdrop-blur-sm">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/55">
                Integrated command centre
              </p>
              <p className="mt-1 text-lg font-semibold">
                One operating picture. One response workflow.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 text-navy md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/45">
                  Control-room response
                </p>
                <h3 className="mt-1 text-xl font-semibold">
                  From weak signal to accountable action
                </h3>
              </div>
              <BellRing className="h-7 w-7 shrink-0 text-navy" />
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              {responseSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="contents">
                    <div className="rounded-2xl border border-navy/10 bg-[#f5f2e9] p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffe600] text-navy">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{step.label}</p>
                          <p className="mt-1 text-xs leading-snug text-navy/55">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                    {index < responseSteps.length - 1 ? (
                      <ArrowRight className="hidden h-4 w-4 text-navy/30 sm:block" />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center gap-3 border-t border-navy/10 pt-4">
              <ShieldCheck className="h-4 w-4 shrink-0 text-navy" />
              <p className="text-xs leading-relaxed text-navy/55">
                Thresholds, escalation roles and agency interfaces are confirmed per plant during
                the as-is assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 section-07-register">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-navy/15 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Complete scenario register
            </p>
            <h3 className="mt-1 text-2xl font-semibold">
              All {useCases.length} scenarios—no hidden content
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Each record retains its zone, plant applicability, detection chain, operational meaning
            and four-step control-room response.
          </p>
        </div>

        <div className="mt-6 space-y-8">
          {groupOrder.map((group) => {
            const scenarios = useCases.filter((useCase) => useCase.group === group);
            return (
              <section key={group} className="scenario-group">
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid h-8 min-w-8 place-items-center rounded-full bg-[#ffe600] px-2 font-mono text-xs font-bold text-navy">
                    {scenarios.length}
                  </span>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy">
                    {group}
                  </h4>
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  {scenarios.map((scenario) => (
                    <ScenarioRecord key={scenario.id} scenario={scenario} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function ScenarioCard({
  scene,
  featured = false,
}: {
  scene: (typeof scenarioScenes)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "relative min-h-[25rem] overflow-hidden bg-[#eee9dc]"
          : "relative min-h-[12.5rem] overflow-hidden bg-[#eee9dc]"
      }
    >
      <img
        src={scene.image}
        alt={scene.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-[#f5f2e9]/10" />
      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-4">
        <div className="rounded-xl border border-navy/10 bg-[#fffdf7]/90 px-3 py-2 text-navy backdrop-blur-sm">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-navy/50">
            Scenario {scene.id}
          </p>
          <h3 className="mt-0.5 text-base font-semibold">{scene.title}</h3>
        </div>
        <span className="rounded-full border border-navy/10 bg-[#fffdf7]/90 px-3 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-navy/65 backdrop-blur-sm">
          {scene.zone}
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-navy/10 bg-[#fffdf7]/92 p-3 text-navy backdrop-blur-sm">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {scene.chain.map((item, index) => (
            <div key={item} className="contents">
              <p className="text-center text-[0.63rem] font-semibold leading-tight">{item}</p>
              {index < scene.chain.length - 1 ? (
                <ArrowRight className="h-3.5 w-3.5 text-navy/35" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
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
      <div className="border-t border-navy/10 px-4 py-3">
        <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/45">
          Control-room response
        </p>
        <ol className="mt-2 grid gap-2 sm:grid-cols-4">
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
      </div>
    </article>
  );
}
