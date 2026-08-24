import type { Program } from "@/src/content/programs";

import { Drift } from "../scroll/Drift";
import { Section } from "../scroll/Section";
import { ProgramFlora } from "./ProgramFlora";

export function ProgramSection({
  program,
  index,
}: {
  program: Program;
  index: number;
}) {
  const position = String(index + 1).padStart(2, "0");

  return (
    <Section
      id={index === 0 ? "story-start" : program.id}
      eyebrow={`${position} / ${program.abbr} · Official description`}
      title={program.title}
      className={`program-section ${index % 2 ? "program-section--reverse" : ""}`}
    >
      <div className="program-section__grid">
        <div className="program-section__copy">
          <p className="program-abbr" aria-hidden="true">
            {program.abbr}
          </p>
          <p>{program.description}</p>
          {program.specializations?.length ? (
            <div className="program-specializations">
              <p className="utility-label">2-in-1 specializations</p>
              <ul className="program-specializations__list">
                {program.specializations.map((track) => (
                  <li key={track.label}>
                    <a href={track.url} target="_blank" rel="noreferrer">
                      {track.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <a
            className="text-link"
            href="https://www.feutech.edu.ph/academics/ccsma"
            target="_blank"
            rel="noreferrer"
          >
            Read at the official source
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
        <Drift className="program-section__flora">
          <ProgramFlora variant={program.flora} />
        </Drift>
      </div>
    </Section>
  );
}
