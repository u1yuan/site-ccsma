import { ProgramsHero } from "@/src/components/pandora/ProgramsHero";
import { ProgramSection } from "@/src/components/pandora/ProgramSection";
import { ScrollProgressVine } from "@/src/components/scroll/ScrollProgressVine";
import { programs } from "@/src/content/programs";

export default function ProgramsPage() {
  return (
    <main id="main-content">
      <ScrollProgressVine route="programs" />
      <ProgramsHero />
      <div aria-label="CCSMA degree programs">
        {programs.map((program, index) => (
          <ProgramSection key={program.id} program={program} index={index} />
        ))}
      </div>
    </main>
  );
}
