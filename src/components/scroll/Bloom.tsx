"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { motionTokens } from "@/src/lib/motion/tokens";
import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

export function Bloom({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const hidden = !reduceMotion && !inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      data-motion-primitive="bloom"
      data-motion-state={reduceMotion ? "static" : "animated"}
      data-in-view={inView ? "true" : "false"}
      inert={hidden ? true : undefined}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              visibility: "hidden",
              y: motionTokens.bloom.offset,
              filter: "brightness(0.7)",
            }
      }
      whileInView={{
        opacity: 1,
        visibility: "visible",
        y: 0,
        filter: "brightness(1)",
      }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : motionTokens.bloom.duration,
        ease: motionTokens.bloom.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
