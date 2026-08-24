import { render, screen } from "@testing-library/react";

import { OrgCard } from "@/src/components/pandora/OrgCard";
import { SaduContact } from "@/src/components/pandora/SaduContact";
import { accreditations } from "@/src/content/accreditations";
import {
  activityMedia,
  directors,
  programIllustrations,
} from "@/src/content/media";
import { organizations } from "@/src/content/organizations";
import { programs } from "@/src/content/programs";
import { sadu } from "@/src/content/sadu";

describe("typed content modules", () => {
  it("contains all six official programs in the required order", () => {
    expect(programs.map((program) => program.abbr)).toEqual([
      "BSCS",
      "BSIT",
      "BMMA",
      "BSCY",
      "BDMM",
      "BSFTE",
    ]);
    expect(programs.every((program) => program.status === "official")).toBe(
      true,
    );
    expect(programs.every((program) => program.description.length > 100)).toBe(
      true,
    );
  });

  it("models every organization as a compiled community description", () => {
    expect(organizations).toHaveLength(5);
    expect(
      organizations.every(
        (organization) =>
          organization.status === "summary" ||
          organization.status === "official",
      ),
    ).toBe(true);
    expect(
      organizations.every(
        (organization) => organization.status !== "placeholder",
      ),
    ).toBe(true);
    expect(
      organizations.every(
        (organization) => organization.description.length > 60,
      ),
    ).toBe(true);

    const acm = organizations.find((organization) => organization.id === "acm");
    expect(acm?.values).toEqual(["Aptitude", "Competence", "Magnanimity"]);

    const scc = organizations.find((organization) => organization.id === "scc");
    expect(scc?.role).toBe("connector");
    expect(
      organizations
        .filter((organization) => organization.id !== "scc")
        .every((organization) => organization.role === "grove"),
    ).toBe(true);

    organizations.forEach((organization) => {
      const { unmount } = render(<OrgCard organization={organization} />);
      expect(
        screen.getByRole("heading", { name: organization.name }),
      ).toBeVisible();
      expect(screen.getByText(organization.description)).toBeVisible();
      unmount();
    });
  });

  it("renders the exact SADU contact block and summary provenance", () => {
    render(<SaduContact />);

    Object.values(sadu.contact).forEach((line) => {
      expect(screen.getByText(line)).toBeVisible();
    });
    expect(sadu.mantras.every((mantra) => mantra.status === "summary")).toBe(
      true,
    );
    expect(sadu.mantras.every((mantra) => mantra.headline.length > 0)).toBe(
      true,
    );
  });

  it("keeps media manifests empty until the human adds files", () => {
    expect(
      Object.values(activityMedia).every((items) => items.length === 0),
    ).toBe(true);
    expect(
      Object.values(programIllustrations).every((items) => items.length === 0),
    ).toBe(true);
    expect(Object.values(directors).every((items) => items.length === 0)).toBe(
      true,
    );
    expect(accreditations.map((mark) => mark.label)).toEqual([
      "PAASCU",
      "PICAB",
      "Cisco",
      "SAP",
      "Oracle Academy",
      "MIE",
      "AutoCAD",
    ]);
    expect(accreditations.every((mark) => !mark.src)).toBe(true);
  });
});
