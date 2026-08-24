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

    expect(
      organizations.every((organization) =>
        organization.logo?.endsWith(`/${organization.id}.jpg`),
      ),
    ).toBe(true);

    organizations.forEach((organization) => {
      const { container, unmount } = render(
        <OrgCard organization={organization} />,
      );
      const nodeLink = screen.getByRole("link", {
        name: `${organization.name} details`,
      });
      expect(nodeLink.getAttribute("href")).toMatch(
        new RegExp(`/organizations/${organization.id}/?$`),
      );
      expect(screen.getByText(organization.abbr)).toBeVisible();
      expect(
        container.querySelector(`img[src="${organization.logo}"]`),
      ).not.toBeNull();
      expect(
        screen.queryByText(organization.description),
      ).not.toBeInTheDocument();
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

  it("wires activity photos and keeps unfilled manifests empty", () => {
    // Activity photos are now supplied for every org node on the tree.
    const activityKeys = ["acm", "aits", "jpcs", "prism", "scc", "sadu"];
    activityKeys.forEach((key) => {
      expect(activityMedia[key]?.length).toBeGreaterThan(0);
    });
    expect(
      Object.values(activityMedia)
        .flat()
        .every((item) => item.src.startsWith("/activities/") && item.alt),
    ).toBe(true);
    // Program illustrations remain placeholders until the human adds files.
    expect(
      Object.values(programIllustrations).every((items) => items.length === 0),
    ).toBe(true);
    // Director photos are placeholders until the human adds per-person files.
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
