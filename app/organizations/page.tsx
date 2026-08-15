import type { Metadata } from "next";

import { OrganizationsHero } from "@/src/components/pandora/OrganizationsHero";
import { OrganizationsMap } from "@/src/components/pandora/OrganizationsMap";
import { ScrollProgressVine } from "@/src/components/scroll/ScrollProgressVine";

export const metadata: Metadata = {
  title: "Organizations",
};

export default function OrganizationsPage() {
  return (
    <main id="main-content">
      <ScrollProgressVine route="organizations" />
      <OrganizationsHero />
      <OrganizationsMap />
    </main>
  );
}
