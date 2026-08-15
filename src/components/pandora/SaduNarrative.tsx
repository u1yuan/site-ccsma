import { sadu } from "@/src/content/sadu";

import { Section } from "../scroll/Section";
import { MantraRoots } from "./MantraRoots";

export function SaduNarrative() {
  return (
    <div id="story-start" className="sadu-narrative">
      <div className="sadu-trunk" aria-hidden="true" />
      <Section
        id="vision"
        eyebrow="01 / Orientation"
        title="Vision"
        className="sadu-section"
      >
        <p className="sadu-lead">{sadu.vision}</p>
      </Section>

      <Section
        id="mission"
        eyebrow="02 / Direction"
        title="Mission"
        className="sadu-section sadu-section--right"
      >
        <ul className="root-list">
          {sadu.mission.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="roles"
        eyebrow="03 / Practice"
        title="Roles and Function"
        className="sadu-section"
      >
        <div className="prose-stack">
          {sadu.roles.map((role) => (
            <p key={role}>{role}</p>
          ))}
        </div>
      </Section>

      <Section
        id="development-programs"
        eyebrow="04 / Growth"
        title="Student Development programs"
        className="sadu-section sadu-section--right"
      >
        <ul className="signal-list">
          {sadu.developmentPrograms.map((program) => (
            <li key={program}>{program}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="activities-responsibilities"
        eyebrow="05 / Stewardship"
        title="Student Activities responsibilities"
        className="sadu-section"
      >
        <ul className="signal-list">
          {sadu.activityResponsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      </Section>

      <MantraRoots />
    </div>
  );
}
