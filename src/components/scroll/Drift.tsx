"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

import { motionTokens } from "@/src/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

export function Drift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-motionTokens.drift.range, motionTokens.drift.range],
  );

  return (
    <motion.div
      ref={target}
      className={className}
      style={reduceMotion ? undefined : { y }}
      data-motion-primitive="drift"
      data-motion-state={reduceMotion ? "static" : "animated"}
    >
      {children}
    </motion.div>
  );
}
