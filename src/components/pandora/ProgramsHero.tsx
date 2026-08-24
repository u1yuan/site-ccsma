import { AccreditationStrip } from "./AccreditationStrip";
import { HeroFrame } from "./HeroFrame";
import { WoodspriteHero } from "./WoodspriteHero";

export function ProgramsHero() {
  return (
    <HeroFrame
      eyebrow="College of Computer Studies and Multimedia Arts"
      title="Programs that grow futures"
      intro="Six distinct paths move through one connected world of computing, media, cybersecurity, marketing, and financial technology."
      visual={<WoodspriteHero />}
      className="route-hero--programs route-hero--paraverse"
    >
      <AccreditationStrip />
    </HeroFrame>
  );
}
