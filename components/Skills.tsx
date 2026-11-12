"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section
      id="capabilities"
      className="py-16 sm:py-24 md:py-28 relative border-t border-border/80 bg-surface/25"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 sm:mb-12 border-b border-border">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-2">
                04 · Technical Capabilities
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.08]">
                Skills &amp;{" "}
                <span className="italic text-primary">Engineering Stack</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                Grouped across six practical domains—from programming and discrete electronics to
                embedded experimentation, circuit design, development tools, and creative software.
              </p>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shrink-0">
              6 DOMAINS · VERIFIED BY BUILD LOGS
            </div>
          </div>
        </Reveal>

        {/* 6-Category Structured Skills Matrix (No arbitrary percentage bars) */}
        <Reveal delay={0.06}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {skillCategories.map((group) => (
              <div
                key={group.id}
                className="p-5 sm:p-6 md:p-7 bg-background hover:bg-card/60 transition-colors flex flex-col justify-between gap-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border/70 font-mono text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-primary font-semibold">{group.code}</span>
                    <span className="text-muted-foreground truncate">{group.subtitle}</span>
                  </div>

                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-normal text-foreground tracking-tight">
                    {group.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {group.description}
                  </p>

                  <ul
                    className="flex flex-wrap gap-1.5 pt-1"
                    aria-label={`${group.title} skills`}
                  >
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="px-2.5 py-1 rounded-sm bg-surface border border-border font-mono text-[10px] tracking-[0.06em] text-foreground/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {group.evidence && group.evidence.length > 0 && (
                  <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em]">
                    <span className="text-muted-foreground">Applied in:</span>
                    {group.evidence.map((ev) => (
                      <Link
                        key={ev.href}
                        href={ev.href}
                        className="inline-flex items-center gap-0.5 text-primary hover:underline"
                      >
                        <span>{ev.label}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
