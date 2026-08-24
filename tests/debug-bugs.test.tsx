import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const rafCallbacks = new Map<number, FrameRequestCallback>();
let nextRafId = 1;

function installRafSpy() {
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    const id = nextRafId++;
    rafCallbacks.set(id, callback);
    return id;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => {
    rafCallbacks.delete(id);
  });
}

function flushRaf(time = 0) {
  const callbacks = [...rafCallbacks.values()];
  rafCallbacks.clear();
  callbacks.forEach((callback) => callback(time));
}

describe("bug verification", () => {
  beforeEach(() => {
    rafCallbacks.clear();
    nextRafId = 1;
    installRafSpy();
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      bezierCurveTo: vi.fn(),
      stroke: vi.fn(),
    })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("bug 1: guard viewport flip starts RAF when canvas mounts", async () => {
    vi.doUnmock("@/src/lib/motion/usePrefersReducedMotion");
    vi.resetModules();
    vi.doMock("@/src/lib/motion/usePrefersReducedMotion", () => ({
      usePrefersReducedMotion: () => false,
    }));

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 390,
      writable: true,
    });
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 2,
      writable: true,
    });

    const { WoodspriteHero: Hero } =
      await import("@/src/components/pandora/WoodspriteHero");

    const { container, rerender } = render(<Hero />);
    expect(container.querySelector("canvas")).not.toBeInTheDocument();

    await act(async () => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: 1200,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });
    rerender(<Hero />);

    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();

    flushRaf(16);
    const rafAfterGuardEnable = vi.mocked(window.requestAnimationFrame).mock
      .calls.length;

    expect(rafAfterGuardEnable).toBeGreaterThan(0);
  });

  it("bug 3: bloom blocks focus on off-screen content until in view", async () => {
    vi.doUnmock("@/src/lib/motion/usePrefersReducedMotion");
    vi.resetModules();
    vi.doMock("@/src/lib/motion/usePrefersReducedMotion", () => ({
      usePrefersReducedMotion: () => false,
    }));
    vi.doMock("framer-motion", async () => {
      const actual =
        await vi.importActual<typeof import("framer-motion")>("framer-motion");
      return {
        ...actual,
        useInView: () => false,
      };
    });

    const { Bloom: AnimatedBloom } =
      await import("@/src/components/scroll/Bloom");

    const { container } = render(
      <AnimatedBloom>
        <a href="#target">Off-screen link</a>
      </AnimatedBloom>,
    );

    const bloom = container.querySelector('[data-motion-primitive="bloom"]');
    expect(bloom).toHaveAttribute("inert");
    expect(Number(getComputedStyle(bloom!).opacity)).toBeLessThan(1);
  }, 20_000);
});
