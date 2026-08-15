import { render, screen } from "@testing-library/react";

import { OrgCard } from "@/src/components/pandora/OrgCard";
import { SaduContact } from "@/src/components/pandora/SaduContact";
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

  it("models every organization as a visible placeholder", () => {
    expect(organizations).toHaveLength(5);
    expect(
      organizations.every(
        (organization) => organization.status === "placeholder",
      ),
    ).toBe(true);

    organizations.forEach((organization) => {
      const { unmount } = render(<OrgCard organization={organization} />);
      expect(
        screen.getByRole("heading", { name: organization.name }),
      ).toBeVisible();
      expect(screen.getByText("Content coming soon")).toBeVisible();
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
});
