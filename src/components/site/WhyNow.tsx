import {
  AlertTriangle,
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
import { AccentCard, AccentMedallion, type AccentSlot } from "./AccentCard";

import grid from "@/assets/why-1-grid.jpg";
import threat from "@/assets/why-2-threat.jpg";
import plant from "@/assets/why-3-plant.jpg";
import videowall from "@/assets/why-4-videowall.jpg";
import kpi from "@/assets/why-5-kpi.jpg";
import platform from "@/assets/why-6-platform.jpg";

const drivers: {
  icon: typeof ShieldCheck;
  slot: AccentSlot;
  image: string;
  title: string;
  body: string;
}[] = [
  {
    icon: ShieldCheck,
    slot: 1,
    image: grid,
    title: "Critical Infrastructure Is Now a National Security Asset",
    body: "Power generation is a critical infrastructure sector, and designated systems and assets may fall within India's Critical Information Infrastructure protection framework. A security incident no longer affects a plant alone—it can cascade across grid operations, fuel logistics, evacuation infrastructure, and regional economic activity.",
  },
  {
    icon: AlertTriangle,
    slot: 2,
    image: threat,
    title: "Threats Have Changed from Theft to Operational Disruption",
    body: "Traditional perimeter threats now coexist with coordinated intrusion, insider risk, drone reconnaissance, cyber-physical attacks, contractor vulnerabilities, and deliberate disruption of critical operations.",
  },
  {
    icon: Building2,
    slot: 3,
    image: plant,
    title: "Security Must Match Plant Risk",
    body: "Plant risk is not uniform. Security architecture must reflect asset scale, terrain, fuel type, population density, contractor flows, and local threat conditions.",
  },
  {
    icon: Layers,
    slot: 4,
    image: videowall,
    title: "Existing Surveillance Estates Are Reaching Their Limits",
    body: "Many plants already operate hundreds of cameras. The challenge is no longer video acquisition—it is integrating surveillance, access control, analytics, incident workflows and command visibility into a single operational architecture.",
  },
  {
    icon: BarChart3,
    slot: 5,
    image: kpi,
    title: "Security Performance is becoming Measurable",
    body: "Security performance increasingly influences operational continuity, contractor governance, regulatory audits, emergency preparedness and insurance exposure. Modern security programmes are measured through response times, incident intelligence and operational resilience rather than camera counts.",
  },
  {
    icon: Cpu,
    slot: 6,
    image: platform,
    title: "Modernization Requires an Enterprise Platform",
    body: "The next generation of plant security is built around integrated command platforms combining AI-enabled video analytics, perimeter intelligence, access management, drone awareness, GIS, OT integration and decision-support workflows.",
  },
];

const outcomes: { label: string; slot: AccentSlot; icon: typeof Target }[] = [
  { label: "Detect earlier.", slot: 1, icon: Target },
  { label: "Decide faster.", slot: 2, icon: Gauge },
  { label: "Recover with less operational impact.", slot: 3, icon: HandHeart },
];

export function WhyNow() {
  return (
    <SectionShell
      id="why-now"
      eyebrow="Section 02"
      title="Why Security Architecture Has Become a Generation Imperative"
      intro="Six strategic drivers are reshaping how power generation companies in India must think about physical security, OT resilience and command-centre capability."
      tone="cream"
    >
      <div className="why-now-outcomes mb-10 grid gap-5 xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-center">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
          {outcomes.map((o) => (
            <div
              key={o.label}
              style={{ ["--a" as string]: "#ffe600" }}
              className="relative flex min-h-24 items-center gap-3 bg-surface px-5 py-4"
            >
              <span aria-hidden className="absolute left-0 top-0 h-1 w-full bg-[color:var(--a)]" />
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--a)] text-white">
                <o.icon className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <p className="max-w-[11rem] text-base font-bold uppercase leading-tight tracking-wide text-[color:var(--a)]">
                {o.label}
              </p>
            </div>
          ))}
        </div>
        <p className="rounded-xl border border-border bg-card p-4 text-base leading-relaxed text-muted-foreground shadow-card">
          The three operational outcomes that every surveillance, access and command-centre
          investment must be judged against.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-3">
        {drivers.map((driver, i) => (
          <AccentCard key={driver.title} slot={2} className="rounded-none border-0 shadow-none">
            <img
              src={driver.image}
              alt=""
              aria-hidden
              loading="lazy"
              width={768}
              height={768}
              style={{
                maskImage: "linear-gradient(to left, black 40%, transparent 96%)",
                WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 96%)",
              }}
              className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] object-cover opacity-90 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100 sm:block"
            />
            <div className="relative sm:max-w-[58%]">
              <div className="flex items-start gap-3">
                <AccentMedallion>
                  <driver.icon className="h-5 w-5" />
                </AccentMedallion>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--a)]">
                    Risk driver {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-bold leading-snug text-ey-green-deep md:text-lg">
                    {driver.title}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{driver.body}</p>
            </div>
          </AccentCard>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-ey-green-deep px-5 py-6 shadow-lift md:px-8">
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ey-gold/60 text-ey-gold sm:inline-flex">
          <ShieldCheck aria-hidden className="h-5 w-5" />
        </span>
        <p className="text-base font-medium leading-relaxed text-white md:text-lg">
          Security is no longer a support function. It is a{" "}
          <span className="font-bold text-ey-gold">force multiplier</span> for reliability, safety
          and national resilience.
        </p>
      </div>
    </SectionShell>
  );
}
