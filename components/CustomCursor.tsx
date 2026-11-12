"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const isCalm = document.documentElement.classList.contains("calm");
      const shouldEnable = !coarseQuery.matches && !reduceQuery.matches && !isCalm;
      setEnabled(shouldEnable);
    };

    evaluate();

    coarseQuery.addEventListener("change", evaluate);
    reduceQuery.addEventListener("change", evaluate);

    const observer = new MutationObserver(evaluate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      coarseQuery.removeEventListener("change", evaluate);
      reduceQuery.removeEventListener("change", evaluate);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId: number | null = null;
    let mouseX = -100;
    let mouseY = -100;

    const updatePosition = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updatePosition);
      }

      const target = e.target as HTMLElement | null;
      const isHoveringInteractive = Boolean(
        target?.closest("a, button, [role='button'], input, textarea, select, summary")
      );
      setInteractive(isHoveringInteractive);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[90] hidden lg:block transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary/80 transition-transform duration-75 ease-out will-change-transform"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border transition-all duration-200 ease-out will-change-transform ${
          interactive
            ? "scale-125 border-primary/60 bg-primary/[0.06]"
            : "scale-100 border-foreground/20 bg-transparent"
        }`}
      />
    </div>
  );
}
