import { fireEvent, render, screen } from "@testing-library/react";

import { MediaReveal } from "@/src/components/pandora/MediaReveal";
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

  it("reveals the same photo panel on hover and focus", () => {
    const { container } = render(
      <MediaReveal title="ACM activity photos" items={[]} previewOnHover>
        Node
      </MediaReveal>,
    );

    fireEvent.mouseEnter(container.querySelector(".media-reveal")!);
    expect(
      screen.getByRole("dialog", { name: "ACM activity photos" }),
    ).toBeVisible();
    expect(screen.getByText("Photos coming soon")).toBeVisible();

    fireEvent.mouseLeave(container.querySelector(".media-reveal")!);
    expect(
      screen.queryByRole("dialog", { name: "ACM activity photos" }),
    ).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole("button", { name: "Node" }));
    expect(
      screen.getByRole("dialog", { name: "ACM activity photos" }),
    ).toBeVisible();
  });

  it("keeps MediaReveal content present under reduced motion", () => {
    render(
      <MediaReveal title="Visible reveal" items={[]}>
        Open reveal
      </MediaReveal>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open reveal" }));
    expect(
      screen.getByRole("dialog", { name: "Visible reveal" }),
    ).toBeVisible();
    expect(screen.getByText("Photos coming soon")).toBeVisible();
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "data-motion-state",
      "static",
    );
  });
});
