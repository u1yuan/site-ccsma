import { GlowTree } from "./GlowTree";
import { HeroFrame } from "./HeroFrame";

export function OrganizationsHero() {
  return (
    <HeroFrame
      eyebrow="Connected groves / organization directory"
      title="Organizations"
      intro="Five named student bodies form this map of connected groves. Each entry carries a community description compiled from public sources, not official FEU copy."
      visual={<GlowTree variant="groves" />}
    />
  );
}
