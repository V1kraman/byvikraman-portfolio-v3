"use client";

import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: "w-fit" | "w-full";
  className?: string;
  yOffset?: number;
}

export function Reveal({
  children,
  delay = 0,
  width = "w-full",
  className = "",
  yOffset = 28,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={`relative ${width} ${className}`}>{children}</div>;
  }

  return (
    <div className={`relative ${width} ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
