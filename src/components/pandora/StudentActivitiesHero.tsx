import { GlowTree } from "./GlowTree";
import { HeroFrame } from "./HeroFrame";

export function StudentActivitiesHero() {
  return (
    <HeroFrame
      eyebrow="Student Activities and Development Unit"
      title="Student Activities"
      intro="Vision, mission, development programs, responsibilities, and contact details for the FEU Tech Student Activities and Development Unit."
      visual={<GlowTree variant="souls" />}
      mark={
        <img
          className="sadu-logo"
          src="/logos/orgs/sadu.png"
          alt="Student Activities and Development Unit logo"
        />
      }
    />
  );
}
