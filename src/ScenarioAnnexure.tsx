import { ArrowLeft, ArrowRight, BookOpen, MapPin, ShieldCheck } from "lucide-react";

import commandCentreScene from "@/assets/scenarios/command-centre-response.webp";
import { groupOrder, useCases, type UseCase } from "@/components/site/useCaseData";

export function ScenarioAnnexure() {
  return (
    <div className="annexure-root min-h-screen bg-[#f5f2e9] text-navy">
      <header className="annexure-screen-nav sticky top-0 z-20 border-b border-navy/10 bg-[#f5f2e9]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a
            href="index.html#use-cases"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Main document
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white"
          >
            Print annexure
          </button>
        </div>
      </header>

      <main className="annexure-document">
        <section className="annexure-cover relative flex min-h-screen items-end overflow-hidden bg-navy text-white">
          <img
            src={commandCentreScene}
            alt="Integrated security command centre"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/25" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ffe600] text-navy">
              <BookOpen className="h-5 w-5" />
            </span>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe600]">
              Annexure A
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl">
              Complete Security Scenario Register
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65">
              Power-generation surveillance, security and control-room response scenarios. All{" "}
              {useCases.length} records retain the original zone, applicability, detection logic,
              operational importance and response sequence.
            </p>
            <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-5">
              {groupOrder.map((group) => (
                <div key={group} className="bg-navy/80 p-4">
                  <p className="font-mono text-2xl font-semibold text-[#ffe600]">
                    {useCases.filter((s) => s.group === group).length}
                  </p>
                  <p className="mt-2 text-[0.62rem] font-semibold leading-tight text-white/55">
                    {group}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="annexure-guide mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/45">
            How to read each record
          </p>
          <h2 className="mt-3 text-3xl font-semibold">One consistent operating logic</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              ["01", "Detect", "Field devices identify the condition or event."],
              ["02", "Correlate", "The ICCC adds plant, identity, permit and process context."],
              ["03", "Respond", "Operators execute and document the verified response."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-2xl border border-navy/10 bg-white p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe600] font-mono text-xs font-bold">
                  {n}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {groupOrder.map((group, groupIndex) => {
          const scenarios = useCases.filter((scenario) => scenario.group === group);
          return (
            <section
              key={group}
              className="annexure-group mx-auto w-full max-w-6xl px-5 py-14 md:px-8"
            >
              <div className="flex items-end justify-between gap-4 border-b-2 border-navy pb-4">
                <div>
                  <p className="font-mono text-xs font-bold text-navy/35">
                    GROUP {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">{group}</h2>
                </div>
                <span className="grid h-12 min-w-12 place-items-center rounded-full bg-[#ffe600] px-3 font-mono text-sm font-bold">
                  {scenarios.length}
                </span>
              </div>
              <div className="mt-6 grid gap-5 xl:grid-cols-2">
                {scenarios.map((scenario) => (
                  <AnnexureRecord key={scenario.id} scenario={scenario} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <footer className="annexure-screen-nav border-t border-navy/10 px-5 py-6 text-center text-xs text-navy/45">
        Integrated Surveillance and Security Modernization for Power Generation Assets
      </footer>
    </div>
  );
}

function AnnexureRecord({ scenario }: { scenario: UseCase }) {
  return (
    <article className="annexure-record overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <div className="grid grid-cols-[3.5rem_1fr] border-b border-navy/10">
        <div className="grid place-items-center bg-[#ffe600] font-mono text-sm font-bold">
          {String(scenario.id).padStart(2, "0")}
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-navy/45">
            <MapPin className="h-3 w-3" />
            {scenario.zone}
            {scenario.plantTypes ? (
              <span className="rounded-full border border-navy/10 px-2 py-0.5">
                {scenario.plantTypes}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-lg font-semibold leading-tight">{scenario.name}</h3>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 bg-[#f5f2e9] px-4 py-3">
        {[scenario.chain.detect, scenario.chain.correlate, scenario.chain.respond].map(
          (item, index) => (
            <div key={item} className="contents">
              <p className="text-center text-[0.64rem] font-semibold leading-tight text-navy/70">
                {item}
              </p>
              {index < 2 ? <ArrowRight className="h-3.5 w-3.5 text-navy/25" /> : null}
            </div>
          ),
        )}
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <RecordText label="What it detects" body={scenario.detects} />
        <RecordText label="Why it matters" body={scenario.matters} />
      </div>
      <div className="border-t border-navy/10 px-4 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-navy/40" />
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/45">
            Control-room response
          </p>
        </div>
        <ol className="mt-3 grid gap-2 sm:grid-cols-4">
          {scenario.response.map((step, index) => (
            <li
              key={step}
              className="grid grid-cols-[1.3rem_1fr] gap-2 text-[0.66rem] leading-snug text-navy/70"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ffe600] font-mono text-[0.5rem] font-bold">
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

function RecordText({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/45">{label}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-navy/70">{body}</p>
    </div>
  );
}
