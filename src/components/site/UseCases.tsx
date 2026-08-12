import {
  ArrowRight,
  BellRing,
  Crosshair,
  MapPinned,
  Radio,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

import coalHandlingScene from "@/assets/scenarios/coal-handling-intrusion.webp";
import commandCentreScene from "@/assets/scenarios/command-centre-response.webp";
import perimeterScene from "@/assets/scenarios/perimeter-intrusion.webp";
import switchyardScene from "@/assets/scenarios/switchyard-intrusion.webp";

import { SectionShell } from "./SectionShell";
import { groupOrder, useCases } from "./useCaseData";

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
  {
    icon: ScanSearch,
    label: "Detect",
    detail: "Field device identifies the event",
  },
  {
    icon: MapPinned,
    label: "Correlate",
    detail: "ICCC adds location, identity and plant context",
  },
  {
    icon: Radio,
    label: "Respond",
    detail: "Operator triggers the verified SOP",
  },
];

export function UseCases() {
  const groupCounts = groupOrder.map((group) => ({
    group,
    count: useCases.filter((useCase) => useCase.group === group).length,
  }));

  return (
    <SectionShell
      id="use-cases"
      eyebrow="Section 07"
      title="Security Scenarios—Seen as the Plant Would Experience Them"
      intro="Representative incidents are shown as one visual operating chain: detect at the asset, correlate in context, and coordinate the response from the command centre."
      tone="tint"
    >
      <div className="section-07-infographic overflow-hidden rounded-[2rem] border border-navy/10 bg-navy shadow-card">
        <div className="grid gap-px bg-white/10 lg:grid-cols-[1.3fr_0.9fr]">
          <ScenarioCard scene={scenarioScenes[0]} featured />

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
            {scenarioScenes.slice(1).map((scene) => (
              <ScenarioCard key={scene.id} scene={scene} />
            ))}
          </div>
        </div>

        <div className="grid gap-px border-t border-white/10 bg-white/10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-56 overflow-hidden bg-[#f5f2e9]">
            <img
              src={commandCentreScene}
              alt="3D isometric integrated security command centre coordinating incident response"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/45 to-transparent px-5 pb-5 pt-16 text-white">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#ffe600]">
                Integrated command centre
              </p>
              <p className="mt-1 text-lg font-semibold">
                One operating picture. One response workflow.
              </p>
            </div>
          </div>

          <div className="bg-navy p-5 text-white md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#ffe600]">
                  Control-room response
                </p>
                <h3 className="mt-1 text-xl font-semibold">
                  From weak signal to accountable action
                </h3>
              </div>
              <BellRing className="h-7 w-7 shrink-0 text-[#ffe600]" />
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              {responseSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="contents">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffe600] text-navy">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{step.label}</p>
                          <p className="mt-1 text-xs leading-snug text-white/55">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                    {index < responseSteps.length - 1 ? (
                      <ArrowRight className="hidden h-4 w-4 text-[#ffe600] sm:block" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#ffe600]" />
              <p className="text-xs leading-relaxed text-white/60">
                Thresholds, escalation roles and agency interfaces are confirmed per plant during
                the as-is assessment.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#f5f2e9] px-5 py-4 text-navy md:px-6">
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <div>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Scenario library
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold">{useCases.length}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
              {groupCounts.map(({ group, count }) => (
                <div key={group} className="flex items-center gap-2 border-l border-navy/15 pl-3">
                  <span className="font-mono text-sm font-bold text-navy">{count}</span>
                  <span className="text-[0.65rem] font-medium leading-tight text-muted-foreground">
                    {group}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
          ? "group relative min-h-[25rem] overflow-hidden bg-[#f5f2e9]"
          : "group relative min-h-[12.5rem] overflow-hidden bg-[#f5f2e9]"
      }
    >
      <img
        src={scene.image}
        alt={scene.alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015] print:transition-none"
      />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 bg-gradient-to-b from-navy/65 to-transparent px-5 pb-12 pt-4 text-white">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#ffe600]">
            Scenario {scene.id}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{scene.title}</h3>
        </div>
        <span className="rounded-full border border-white/20 bg-navy/55 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
          {scene.zone}
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-navy/85 p-3 text-white backdrop-blur-md">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {scene.chain.map((item, index) => (
            <div key={item} className="contents">
              <p className="text-center text-[0.63rem] font-semibold leading-tight">{item}</p>
              {index < scene.chain.length - 1 ? (
                <ArrowRight className="h-3.5 w-3.5 text-[#ffe600]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
