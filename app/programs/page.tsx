import type { Metadata } from "next";

import { ProgramsHero } from "@/src/components/pandora/ProgramsHero";
import { ProgramSection } from "@/src/components/pandora/ProgramSection";
import { ScrollProgressVine } from "@/src/components/scroll/ScrollProgressVine";
import { programs } from "@/src/content/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "The six CCSMA degree programs at FEU Tech: Computer Science, Information Technology, Multimedia Arts, Cybersecurity, Digital Marketing and Management, and Financial Technology Engineering.",
};

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
