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
      {/* Node Marker: 10-12px, accent filled with outer ring punching through line */}
      <div 
        aria-hidden="true"
        className="absolute left-[11px] sm:left-[15px] top-6 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C2A370] ring-4 ring-[#0A0A0C] group-hover:scale-125 transition-transform duration-300 z-10" 
      />

      {/* Card Block shell providing solid structural weight */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] relative overflow-hidden">
        {/* Subtle inner hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-2">
          {/* Header metadata row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C2A370] font-medium">
              {period}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/40 font-light">
              <MapPin className="w-3 h-3 text-white/30" />
              <span>{location}</span>
            </span>
          </div>

          {/* Role / Degree Title */}
          <h4 className="text-lg sm:text-xl font-medium text-white group-hover:text-[#C2A370] transition-colors duration-200">
            {title}
          </h4>

          {/* Organization / Institution */}
          <div className="text-sm font-medium text-white/80 pb-1">
            {subtitle}
          </div>

          {/* Description Body */}
          <p className="text-sm sm:text-[15px] text-white/55 font-light leading-relaxed pt-1 border-t border-white/5">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  return (
    <section id="experience" className="py-24 md:py-32 relative border-t border-white/5 bg-white/[0.01]">
      <div className="container px-6 sm:px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Section Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-8 bg-[#C2A370]"></div>
                <h2 className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C2A370]">
                  Background
                </h2>
              </div>
              <div className="text-[36px] sm:text-[44px] md:text-[50px] font-light tracking-[-0.02em] text-white leading-[1.15]">
                Experience <br className="hidden lg:block" />& Education.
              </div>
              <p className="text-white/40 text-sm font-light mt-4 max-w-xs leading-relaxed hidden sm:block">
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
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-[#C2A370]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-light text-white tracking-wide">
                      Work & Experience
                    </h3>
                  </div>
                </Reveal>

                {/* Vertical Timeline container with persistent connecting line */}
                <div className="relative">
                  {/* Left Continuous Line */}
                  <div 
                    aria-hidden="true" 
                    className="absolute left-[10px] sm:left-[14px] top-6 bottom-6 w-[2px] bg-white/10" 
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
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/70">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-light text-white/90 tracking-wide">
                      Academic Background
                    </h3>
                  </div>
                </Reveal>

                {/* Vertical Timeline container with persistent connecting line */}
                <div className="relative">
                  {/* Left Continuous Line */}
                  <div 
                    aria-hidden="true" 
                    className="absolute left-[10px] sm:left-[14px] top-6 bottom-6 w-[2px] bg-white/10" 
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

