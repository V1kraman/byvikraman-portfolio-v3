"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";

interface BackToTopProps {
  threshold?: number;
}

export function BackToTop({ threshold = 420 }: BackToTopProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > threshold);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
  });

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    const isCalm = document.documentElement.classList.contains("calm");
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion || isCalm ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          id="back-to-top-button"
          type="button"
          onClick={scrollToTop}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-2.5 px-3.5 py-2.5 min-h-[44px] rounded-lg bg-card/95 backdrop-blur-md border border-border hover:border-primary text-foreground hover:text-primary shadow-[0_8px_30px_rgba(25,26,24,0.32)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
        >
          {/* Burnt Orange icon pad */}
          <span className="w-6 h-6 rounded bg-primary/15 border border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground text-primary flex items-center justify-center transition-colors">
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </span>

          <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold">
            [ TOP ]
          </span>

          <span
            aria-hidden="true"
            className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-muted-foreground border-l border-border pl-2"
          >
            {String(percent).padStart(2, "0")}%
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
