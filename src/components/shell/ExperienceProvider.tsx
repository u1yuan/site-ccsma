"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let frame = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
