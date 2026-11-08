"use client";

import { Reveal } from "./Reveal";
import { capabilityLayers } from "@/lib/data";

export function Skills() {
  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 relative border-t border-border/70 bg-card/25"
    >
      <div className="container px-6 md:px-12 mx-auto">
        <Reveal>
          {/* Silkscreen Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-12 border-b-2 border-primary/50">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-2">
                {"/// 03 · LAYER STACK-UP"}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.025em] text-foreground leading-tight">
                Capabilities &amp;{" "}
                <span className="font-[family-name:var(--font-cormorant)] italic text-primary font-normal">
                  Technical Stack
                </span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-light mt-2 max-w-2xl">
                Organized as a 5-layer engineering stack—from physical microcontrollers and analog circuits up to firmware, web systems, and documentation.
              </p>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
              5-LAYER SUBSTRATE · NO ARBITRARY SCORE BARS
            </div>
          </div>
        </Reveal>

        {/* Karthick-inspired Layer Stack-Up Table */}
        <Reveal delay={0.08}>
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-[0_8px_30px_rgba(25,26,24,0.12)] divide-y divide-border">
            {capabilityLayers.map((layer) => (
              <div
                key={layer.id}
                className="group relative p-5 sm:p-6 md:px-8 transition-all duration-200 hover:bg-secondary/35"
              >
                {/* Copper edge trace that illuminates on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start lg:items-center">
                  {/* Layer Number & Title */}
                  <div className="lg:col-span-5 flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/15 border border-primary/40 font-mono text-xs font-semibold text-primary shrink-0">
                      {layer.id}
                    </span>
                    <div>
                      <div className="font-mono text-xs sm:text-sm font-semibold tracking-[0.08em] text-foreground group-hover:text-primary transition-colors">
                        {layer.name}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mt-0.5">
                        {layer.domain}
                      </div>
                      <p className="text-xs text-muted-foreground font-light mt-1.5 leading-relaxed">
                        {layer.summary}
                      </p>
                    </div>
                  </div>

                  {/* Layer Capabilities / Components */}
                  <div className="lg:col-span-7 flex flex-wrap lg:justify-end gap-2">
                    {layer.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-background/80 border border-border group-hover:border-primary/35 font-mono text-[11px] tracking-wide text-foreground/85 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
