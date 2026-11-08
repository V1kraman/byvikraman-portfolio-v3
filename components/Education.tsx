"use client";

import { Reveal } from "./Reveal";
import { education, experience } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

interface TimelineItemProps {
  code: string;
  period: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  isLast?: boolean;
}

function TimelineItem({
  code,
  period,
  title,
  subtitle,
  location,
  description,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className={`relative pl-9 sm:pl-12 ${isLast ? "pb-0" : "pb-8 sm:pb-10"} group`}>
      {/* Node Marker */}
      <div
        aria-hidden="true"
        className="absolute left-[11px] sm:left-[15px] top-6 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background group-hover:scale-125 transition-transform duration-300 z-10"
      />

      {/* Module Shell */}
      <div className="p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-[0_4px_20px_rgba(25,26,24,0.1)] relative overflow-hidden">
        <div className="relative z-10 flex flex-col space-y-2">
          {/* Silkscreen Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/70 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary/15 border border-primary/40 text-primary font-semibold">
                {code}
              </span>
              <span className="uppercase tracking-widest text-foreground/85">{period}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <MapPin className="w-3 h-3 text-primary" />
              <span>{location}</span>
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-200 pt-1">
            {title}
          </h4>

          <div className="text-sm font-medium text-muted-foreground">{subtitle}</div>

          <p className="text-sm text-muted-foreground font-light leading-relaxed pt-2 border-t border-border/50">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  return (
    <section id="experience" className="py-20 md:py-28 relative border-t border-border/70">
      <div className="container px-6 sm:px-8 md:px-12 mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-12 border-b-2 border-primary/50">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-2">
                {"/// 04 · BENCH & ACADEMIC LOG"}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.025em] text-foreground leading-tight">
                Experience &amp;{" "}
                <span className="font-[family-name:var(--font-cormorant)] italic text-primary font-normal">
                  Education
                </span>
              </h2>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
              CHRONOLOGY · VERIFIED RECORD
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Experience Column */}
          <div className="lg:col-span-5">
            {experience.length > 0 && (
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-md bg-card border border-border text-primary">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-foreground font-semibold">
                      Industry &amp; Internship Log
                    </h3>
                  </div>
                </Reveal>

                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute left-[10px] sm:left-[14px] top-6 bottom-6 w-[2px] bg-border"
                  />
                  <div>
                    {experience.map((exp, idx) => (
                      <Reveal key={idx} delay={idx * 0.08}>
                        <TimelineItem
                          code={exp.id || `EXP·0${idx + 1}`}
                          period={exp.period}
                          title={exp.role}
                          subtitle={exp.company}
                          location={exp.location}
                          description={exp.description}
                          isLast={idx === experience.length - 1}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Academic Background Column */}
          <div className="lg:col-span-7">
            {education.length > 0 && (
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-md bg-card border border-border text-primary">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-foreground font-semibold">
                      Academic Foundation
                    </h3>
                  </div>
                </Reveal>

                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute left-[10px] sm:left-[14px] top-6 bottom-6 w-[2px] bg-border"
                  />
                  <div>
                    {education.map((edu, idx) => (
                      <Reveal key={idx} delay={idx * 0.08}>
                        <TimelineItem
                          code={edu.id || `EDU·0${idx + 1}`}
                          period={edu.period}
                          title={edu.degree}
                          subtitle={edu.institution}
                          location={edu.location}
                          description={edu.description}
                          isLast={idx === education.length - 1}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
