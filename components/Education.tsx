"use client";

import { Reveal } from "./Reveal";
import { education, experience } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  isLast?: boolean;
}

function TimelineItem({
  period,
  title,
  subtitle,
  location,
  description,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className={`relative pl-9 sm:pl-12 ${isLast ? "pb-0" : "pb-10 sm:pb-12"} group`}>
      {/* Node Marker: accent filled with outer ring punching through line */}
      <div 
        aria-hidden="true"
        className="absolute left-[11px] sm:left-[15px] top-6 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background group-hover:scale-125 transition-transform duration-300 z-10" 
      />

      {/* Card Block shell providing solid structural weight */}
      <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/45 transition-all duration-300 shadow-[0_4px_24px_rgba(25,26,24,0.1)] group-hover:shadow-[0_8px_30px_rgba(25,26,24,0.18)] relative overflow-hidden">
        {/* Subtle inner hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-2">
          {/* Header metadata row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-medium">
              {period}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-light">
              <MapPin className="w-3 h-3 text-muted-foreground/75" />
              <span>{location}</span>
            </span>
          </div>

          {/* Role / Degree Title */}
          <h4 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h4>

          {/* Organization / Institution */}
          <div className="text-sm font-medium text-foreground/85 pb-1">
            {subtitle}
          </div>

          {/* Description Body */}
          <p className="text-sm sm:text-[15px] text-muted-foreground font-light leading-relaxed pt-1 border-t border-border/60">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  return (
    <section id="experience" className="py-24 md:py-32 relative border-t border-border/60 bg-card/30">
      <div className="container px-6 sm:px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Section Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-primary"></div>
                <h2 className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
                  Background
                </h2>
              </div>
              <div className="text-[36px] sm:text-[44px] md:text-[50px] font-light tracking-[-0.02em] text-foreground leading-[1.15]">
                Experience <br className="hidden lg:block" />&amp; Education.
              </div>
              <p className="text-muted-foreground text-sm font-light mt-4 max-w-xs leading-relaxed hidden sm:block">
                A timeline of professional experience, research endeavors, and academic foundation.
              </p>
            </Reveal>
          </div>
          
          {/* Timelines Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Work & Experience Timeline */}
            {experience.length > 0 && (
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-lg bg-card border border-border text-primary">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-light text-foreground tracking-wide">
                      Work &amp; Experience
                    </h3>
                  </div>
                </Reveal>

                {/* Vertical Timeline container with persistent connecting line */}
                <div className="relative">
                  {/* Left Continuous Line */}
                  <div 
                    aria-hidden="true" 
                    className="absolute left-[10px] sm:left-[14px] top-6 bottom-6 w-[2px] bg-border" 
                  />

                  <div>
                    {experience.map((exp, idx) => (
                      <Reveal key={idx} delay={idx * 0.1}>
                        <TimelineItem
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

            {/* Academic Background Timeline */}
            {education.length > 0 && (
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-lg bg-card border border-border text-primary">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-light text-foreground tracking-wide">
                      Academic Background
                    </h3>
                  </div>
                </Reveal>

                {/* Vertical Timeline container with persistent connecting line */}
                <div className="relative">
                  {/* Left Continuous Line */}
                  <div 
                    aria-hidden="true" 
                    className="absolute left-[10px] sm:left-[14px] top-6 bottom-6 w-[2px] bg-border" 
                  />

                  <div>
                    {education.map((edu, idx) => (
                      <Reveal key={idx} delay={idx * 0.1}>
                        <TimelineItem
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
