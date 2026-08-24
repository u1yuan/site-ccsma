import type { Metadata } from "next";

import { HeroFrame } from "@/src/components/pandora/HeroFrame";
import { WelcomeHub } from "@/src/components/pandora/WelcomeHub";
import { WoodspriteHero } from "@/src/components/pandora/WoodspriteHero";

export const metadata: Metadata = {
  description:
    "Welcome to CCSMA — the College of Computer Studies and Multimedia Arts at FEU Tech. Explore the programs, meet the student organizations, and get involved.",
};

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroFrame
        eyebrow="College of Computer Studies & Multimedia Arts"
        title="Welcome to CCSMA"
        intro="Your home at FEU Tech for computing, media, cybersecurity, marketing, and financial technology. Start here — explore your program, meet your organizations, and find where you belong."
        visual={<WoodspriteHero />}
        className="route-hero--paraverse route-hero--welcome"
      />
      <WelcomeHub />
    </main>
  );
}
