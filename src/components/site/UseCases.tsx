import { ArrowRight, BookOpen, MapPin, Radio, ScanSearch, ShieldCheck } from "lucide-react";

import commandCentreScene from "@/assets/scenarios/command-centre-response.webp";
import perimeterScene from "@/assets/scenarios/perimeter-intrusion.webp";

import { SectionShell } from "./SectionShell";
import { ScenarioWorkspace } from "./ScenarioWorkspace";
import { groupOrder, useCases } from "./useCaseData";

const responseModel = [
  {
    icon: ScanSearch,
    number: "01",
    label: "Detect",
    detail: "Field sensing identifies the event at the earliest practical point.",
  },
  {
    icon: MapPin,
    number: "02",
    label: "Correlate",
    detail: "The ICCC adds zone, identity, permit, process and asset context.",
  },
  {
    icon: Radio,
    number: "03",
    label: "Respond",
    detail: "Operators execute the verified plant and agency response playbook.",
  },
];

export function UseCases() {
  const groups = groupOrder.map((group, index) => ({
    number: String(index + 1).padStart(2, "0"),
    group,
    count: useCases.filter((scenario) => scenario.group === group).length,
  }));

  return (
    <SectionShell
      id="use-cases"
      eyebrow="Section 07"
      title="Security Scenario Coverage and Response Model"
      intro="Coverage spans all 26 operating scenarios, linking field evidence and operational consequence to a verified control-room response."
      tone="tint"
    >
      <div className="interactive-only">
        <ScenarioWorkspace />
      </div>

      <div className="static-only section-07-summary overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-card">
        <div className="grid gap-px bg-navy/10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[22rem] overflow-hidden bg-[#eee9dc]">
            <img
              src={perimeterScene}
              alt="Isometric power-plant perimeter security scenario"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f3e9] via-[#f7f3e9]/25 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-navy/10 bg-[#fffdf8]/92 p-5 text-navy backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/45">
                    Scenario coverage
                  </p>
                  <p className="mt-2 font-mono text-5xl font-semibold tracking-[-0.06em]">
                    {useCases.length}
                  </p>
                  <p className="mt-1 text-sm font-semibold">plant-specific operating scenarios</p>
                </div>
                <ShieldCheck className="h-10 w-10 text-navy/55" strokeWidth={1.4} />
              </div>
            </div>
          </div>

          <div className="bg-[#f5f2e9] p-5 md:p-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/45">
              Five operating families
            </p>
            <div className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
              {groups.map((item) => (
                <div
                  key={item.group}
                  className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-3"
                >
                  <span className="font-mono text-[0.62rem] font-bold text-navy/35">
                    {item.number}
                  </span>
                  <p className="text-sm font-semibold leading-snug text-navy">{item.group}</p>
                  <span className="grid h-8 min-w-8 place-items-center rounded-full bg-[#ffe600] px-2 font-mono text-xs font-bold text-navy">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-px border-t border-navy/10 bg-navy/10 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="relative min-h-52 overflow-hidden bg-[#eee9dc]">
            <img
              src={commandCentreScene}
              alt="Isometric integrated security command centre"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[#f5f2e9]/20" />
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-navy/10 bg-[#fffdf8]/92 px-4 py-3 text-navy backdrop-blur-sm">
              <p className="text-xs font-semibold">One operating picture across every scenario</p>
            </div>
          </div>

          <div className="bg-white p-5 md:p-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/45">
              Common response model
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              {responseModel.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="contents">
                    <div className="rounded-2xl border border-navy/10 bg-[#f5f2e9] p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffe600] text-navy">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[0.56rem] font-bold uppercase tracking-[0.14em] text-navy/40">
                            {step.number}
                          </p>
                          <p className="text-sm font-semibold text-navy">{step.label}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-navy/60">{step.detail}</p>
                    </div>
                    {index < responseModel.length - 1 ? (
                      <ArrowRight className="hidden h-4 w-4 text-navy/25 sm:block" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 bg-navy px-5 py-5 text-white md:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffe600] text-navy">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/40">
                Separate A4 document
              </p>
              <p className="mt-0.5 text-sm font-semibold">
                Annexure A — Complete Security Scenario Register
              </p>
            </div>
          </div>
          <a
            href="scenario-annexure.html"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffe600]/60 px-4 py-2.5 text-xs font-semibold text-[#ffe600]"
          >
            Open scenario annexure
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
