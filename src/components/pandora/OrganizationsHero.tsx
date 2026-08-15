import { GlowTree } from "./GlowTree";
import { HeroFrame } from "./HeroFrame";

export function OrganizationsHero() {
  return (
    <HeroFrame
      eyebrow="Connected groves / organization directory"
      title="Organizations"
      intro="Five named student bodies form this map. Their official descriptions are still pending, so every entry is clearly marked as forthcoming."
      visual={<GlowTree variant="groves" />}
    />
  );
}
