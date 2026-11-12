"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { education, experience, verifiedTimeline } from "@/lib/data";

export function Education() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 md:py-28 relative border-t border-border/80"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 sm:mb-12 border-b border-border">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-2">
                04B · Chronology &amp; Milestones
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.08]">
                Academic &amp;{" "}
                <span className="italic text-primary">Project Timeline</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                Verified academic milestones, internship experience, and key hardware/software builds
                arranged chronologically.
              </p>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shrink-0">
              VERIFIED RECORD · 2023 — 2029
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 cols): Academic Foundation & Internship Cards */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="space-y-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  Academic Foundation
                </div>
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-sm bg-card border border-border space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="text-primary font-medium">{edu.id}</span>
                      <span>{edu.period}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-foreground">
                      {edu.degree}
                    </h3>
                    <div className="font-mono text-xs text-muted-foreground">
                      {edu.institution} · {edu.location}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-4 pt-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  Internship Experience
                </div>
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-sm bg-card border border-border space-y-2"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="text-primary font-medium">{exp.id}</span>
                      <span>{exp.period}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-foreground">
                      {exp.role} — {exp.company}
                    </h3>
                    <div className="font-mono text-xs text-muted-foreground">
                      {exp.location}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column (7 cols): Visual Academic & Project Timeline with Monospaced Dates */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-4">
                Chronological Log
              </div>
              <div className="relative pl-6 sm:pl-8 border-l border-border space-y-6">
                {verifiedTimeline.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Hairline Timeline Node */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors"
                    />

                    <div className="p-4 sm:p-5 rounded-sm bg-card/60 hover:bg-card border border-border hover:border-primary/50 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-sm bg-surface border border-border text-primary font-medium">
                            {item.date}
                          </span>
                          <span className="text-muted-foreground">{item.category}</span>
                        </div>
                        <span className="text-muted-foreground">{item.id}</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.href ? (
                            <Link href={item.href} className="hover:underline">
                              {item.title}
                            </Link>
                          ) : (
                            item.title
                          )}
                        </h4>
                        {item.href && (
                          <Link
                            href={item.href}
                            aria-label={`Inspect ${item.title}`}
                            className="text-primary shrink-0"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>

                      <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                        {item.organization}
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
