"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { motionTokens } from "@/src/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

export function Pulse({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      data-motion-primitive="pulse"
      data-motion-state={reduceMotion ? "static" : "animated"}
      animate={
        reduceMotion
          ? { opacity: 1, filter: "brightness(1)" }
          : {
              opacity: [0.88, 1, 0.88],
              filter: [
                "brightness(0.9)",
                "brightness(1.14)",
                "brightness(0.9)",
              ],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: motionTokens.pulse.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}
