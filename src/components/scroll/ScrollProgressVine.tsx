"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

const routeBranches = {
  programs: [12, 27, 42, 57, 72, 87],
  organizations: [20, 38, 56, 74, 88],
  "student-activities": [14, 29, 44, 59, 74, 89],
};

export function ScrollProgressVine({
  route,
}: {
  route: keyof typeof routeBranches;
}) {
  const { scrollYProgress } = useScroll();
  const reduceMotion = usePrefersReducedMotion();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div className="progress-vine" aria-hidden="true" data-route={route}>
      <div className="progress-vine__track" />
      <motion.div
        className="progress-vine__growth"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
        data-motion-state={reduceMotion ? "static" : "animated"}
      />
      {routeBranches[route].map((position, index) => (
        <span
          className={`progress-vine__branch ${index % 2 ? "is-left" : "is-right"}`}
          style={{ top: `${position}%` }}
          key={position}
        />
      ))}
    </div>
  );
}
