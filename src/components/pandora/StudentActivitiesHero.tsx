import { GlowTree } from "./GlowTree";
import { HeroFrame } from "./HeroFrame";

export function StudentActivitiesHero() {
  return (
    <HeroFrame
      eyebrow="Student Activities and Development Unit"
      title="Student Activities"
      intro="Vision, mission, development programs, responsibilities, and contact details—traced from canopy to roots."
      visual={<GlowTree variant="souls" />}
    />
  );
}
