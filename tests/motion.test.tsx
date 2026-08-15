import { render, screen } from "@testing-library/react";

import { WoodspriteHero } from "@/src/components/pandora/WoodspriteHero";
import { Bloom } from "@/src/components/scroll/Bloom";
import { Drift } from "@/src/components/scroll/Drift";
import { Pulse } from "@/src/components/scroll/Pulse";
import { Section } from "@/src/components/scroll/Section";

vi.mock("@/src/lib/motion/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => true,
}));

describe("reduced-motion fallbacks", () => {
  it.each([
    ["bloom", Bloom],
    ["drift", Drift],
    ["pulse", Pulse],
  ] as const)(
    "renders %s content fully in its static state",
    (name, Primitive) => {
      render(
        <Primitive>
          <span>Always visible {name}</span>
        </Primitive>,
      );

      const content = screen.getByText(`Always visible ${name}`);
      expect(content).toBeVisible();
      expect(content.parentElement).toHaveAttribute(
        "data-motion-state",
        "static",
      );
    },
  );

  it("keeps Section content visible", () => {
    render(
      <Section id="test-section" title="Visible section">
        <p>Complete content</p>
      </Section>,
    );

    expect(
      screen.getByRole("heading", { name: "Visible section" }),
    ).toBeVisible();
    expect(screen.getByText("Complete content")).toBeVisible();
  });

  it("uses the complete static canopy alternative and omits canvas", () => {
    const { container } = render(<WoodspriteHero />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "data-canvas-state",
      "static",
    );
    expect(container.querySelector("canvas")).not.toBeInTheDocument();
  });
});
