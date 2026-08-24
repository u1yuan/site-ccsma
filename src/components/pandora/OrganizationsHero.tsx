import { GlowTree } from "./GlowTree";
import { HeroFrame } from "./HeroFrame";

export function OrganizationsHero() {
  return (
    <HeroFrame
      eyebrow="Recognized Student Organizations"
      title="Organizations"
      intro="Four academic organizations orbit the Student Coordinating Council at the centre. Select an organization to open its profile, compiled from public sources."
      visual={<GlowTree variant="groves" />}
    />
  );
}
