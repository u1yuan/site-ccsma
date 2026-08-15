import type { Metadata } from "next";

import { SaduContact } from "@/src/components/pandora/SaduContact";
import { SaduNarrative } from "@/src/components/pandora/SaduNarrative";
import { StudentActivitiesHero } from "@/src/components/pandora/StudentActivitiesHero";
import { ScrollProgressVine } from "@/src/components/scroll/ScrollProgressVine";

export const metadata: Metadata = {
  title: "Student Activities",
};

export default function StudentActivitiesPage() {
  return (
    <main id="main-content">
      <ScrollProgressVine route="student-activities" />
      <StudentActivitiesHero />
      <SaduNarrative />
      <SaduContact />
    </main>
  );
}
