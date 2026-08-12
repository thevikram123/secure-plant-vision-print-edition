import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  Cpu,
  Gauge,
  HandHeart,
  Layers,
  ShieldCheck,
  Target,
} from "lucide-react";

import { SectionShell } from "./SectionShell";

const drivers = [
  {
    icon: ShieldCheck,
    label: "Critical infrastructure",
    detail: "A plant incident can cascade into grid, fuel and regional continuity impacts.",
    signal: "National consequence",
  },
  {
    icon: AlertTriangle,
    label: "Threat convergence",
    detail: "Intrusion, insider, drone and cyber-physical threats now overlap.",
    signal: "Blended threat",
  },
  {
    icon: Building2,
    label: "Plant-specific risk",
    detail: "Terrain, fuel, workforce and asset criticality change the control design.",
    signal: "Context matters",
  },
  {
    icon: Layers,
    label: "Fragmented estates",
    detail: "Cameras, access systems and alarms often operate without one incident picture.",
    signal: "Siloed control",
  },
  {
    icon: BarChart3,
    label: "Measurable performance",
    detail: "Response time, alarm quality and resilience now matter more than camera count.",
    signal: "Outcome-led KPI",
  },
  {
    icon: Cpu,
    label: "Enterprise platform",
    detail: "Analytics, GIS, OT context and workflows must converge in the command centre.",
    signal: "Integrated decision",
  },
];

const outcomes = [
  { icon: Target, value: "01", label: "Detect earlier", note: "See weak signals before impact" },
  { icon: Gauge, value: "02", label: "Decide faster", note: "Correlate context at the ICCC" },
  {
    icon: HandHeart,
    value: "03",
    label: "Recover better",
    note: "Limit operational disruption",
  },
];

export function WhyNow() {
  return (
    <SectionShell
      id="why-now"
      eyebrow="Section 02"
      title="Why Security Architecture Has Become a Generation Imperative"
      intro="The risk equation has shifted: wider consequences and converging threats now demand an integrated, measurable security operating model."
      tone="cream"
    >
      <div className="section-02-infographic overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-card">
        <div className="grid lg:grid-cols-[1fr_14rem_1fr]">
          <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-1">
            {drivers.slice(0, 3).map((driver, index) => (
              <DriverNode key={driver.label} driver={driver} number={index + 1} align="right" />
            ))}
          </div>

          <div className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden bg-navy px-6 py-10 text-center text-navy-foreground">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-[#ffe600]" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative grid h-28 w-28 place-items-center rounded-full border border-[#ffe600]/60 bg-[#ffe600]/10">
              <ShieldCheck className="h-10 w-10 text-[#ffe600]" strokeWidth={1.4} />
              <span className="absolute inset-2 rounded-full border border-white/10" />
            </div>
            <p className="relative mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#ffe600]">
              Required response
            </p>
            <h3 className="relative mt-2 text-xl font-semibold leading-tight">
              Integrated security architecture
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-navy-muted">
              One risk picture across field, network, analytics, command and response.
            </p>
          </div>

          <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-1">
            {drivers.slice(3).map((driver, index) => (
              <DriverNode key={driver.label} driver={driver} number={index + 4} align="left" />
            ))}
          </div>
        </div>

        <div className="border-t border-hairline bg-ey-cream px-5 py-5 md:px-7">
          <div className="grid items-stretch gap-3 md:grid-cols-[auto_1fr_auto_1fr_auto]">
            {outcomes.map((outcome, index) => (
              <div key={outcome.label} className="contents">
                <div className="flex items-center gap-3 rounded-xl bg-surface px-4 py-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ffe600] text-navy">
                    <outcome.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                      OUTCOME {outcome.value}
                    </p>
                    <p className="mt-1 font-semibold text-ey-green-deep">{outcome.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{outcome.note}</p>
                  </div>
                </div>
                {index < outcomes.length - 1 ? (
                  <ArrowRight className="mx-auto hidden self-center text-ey-green-deep/35 md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function DriverNode({
  driver,
  number,
  align,
}: {
  driver: (typeof drivers)[number];
  number: number;
  align: "left" | "right";
}) {
  return (
    <article className="relative flex min-h-36 items-start gap-4 bg-surface px-5 py-5">
      {align === "right" ? (
        <span
          aria-hidden
          className="absolute right-0 top-1/2 hidden h-px w-6 bg-[#ffe600] lg:block"
        />
      ) : (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 hidden h-px w-6 bg-[#ffe600] lg:block"
        />
      )}
      <span className="font-mono text-sm font-semibold text-muted-foreground/60">
        {String(number).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ffe600] text-navy">
            <driver.icon className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <p className="font-semibold leading-tight text-ey-green-deep">{driver.label}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{driver.detail}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ey-green-deep/70">
          {driver.signal}
        </p>
      </div>
    </article>
  );
}
