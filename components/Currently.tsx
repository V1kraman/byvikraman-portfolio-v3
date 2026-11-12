"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { currentlyItems } from "@/lib/data";

export function Currently() {
  // Show the primary 4 verified items on the homepage minimal Currently strip
  const homepageItems = currentlyItems.slice(0, 4);

  return (
    <section
      id="currently"
      className="py-12 sm:py-16 border-t border-border/80 bg-surface/30"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 mb-8 border-b border-border">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-1.5">
                01 · Currently
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-foreground">
                What I’m building, studying &amp;{" "}
                <span className="italic text-primary">exploring right now.</span>
              </h2>
            </div>

            <Link
              href="/now"
              className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline shrink-0 py-1"
            >
              <span>Full /now log</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {homepageItems.map((item) => (
              <div
                key={item.id}
                className="bg-background p-5 sm:p-6 flex flex-col justify-between gap-4 hover:bg-card/60 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-primary font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.code}</span>
                  </div>
                  <h3 className="text-base font-medium text-foreground leading-snug">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="hover:text-primary transition-colors inline-flex items-baseline gap-1"
                      >
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>{item.meta}</span>
                  {item.href && (
                    <Link
                      href={item.href}
                      className="text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
