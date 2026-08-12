import { SiteNav } from "@/components/site/SiteNav";
import { DeckNavigation } from "@/components/site/DeckNavigation";
import { Hero } from "@/components/site/Hero";
import { WhyNow } from "@/components/site/WhyNow";
import { Segments } from "@/components/site/Segments";
import { PlantBlocks } from "@/components/site/PlantBlocks";
import { RiskLogicStrip } from "@/components/site/RiskLogicStrip";
import { AsIsAssessment } from "@/components/site/AsIsAssessment";
import { ToBeArchitecture } from "@/components/site/ToBeArchitecture";
import { UseCases } from "@/components/site/UseCases";
import { Offerings } from "@/components/site/Offerings";
import { Deliverables } from "@/components/site/Deliverables";
import { WhyEy } from "@/components/site/WhyEy";
import { Credentials } from "@/components/site/Credentials";
import { ClosingCta } from "@/components/site/ClosingCta";

export function PrintApp() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <DeckNavigation />
      <main>
        <Hero />
        <WhyNow />
        <Segments />
        <PlantBlocks />
        <RiskLogicStrip />
        <AsIsAssessment />
        <ToBeArchitecture />
        <UseCases />
        <Offerings />
        <Deliverables />
        <WhyEy />
        <Credentials />
        <ClosingCta />
      </main>
      <footer className="border-t border-hairline bg-navy py-8 text-navy-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-xs text-navy-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>Integrated Surveillance and Security Modernization for Power Generation Assets</p>
          <p>
            Illustrative advisory perspective. Client-specific facts, costs and timelines are
            placeholders pending assessment.
          </p>
        </div>
      </footer>
    </div>
  );
}
