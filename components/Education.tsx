"use client";

import { Reveal } from "./Reveal";
import { education, experience } from "@/lib/data";
import { Briefcase, GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="experience" className="py-24 md:py-32 relative border-t border-white/5 bg-white/[0.01]">
      <div className="container px-8 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 mb-4">Background</h2>
              <div className="text-[40px] md:text-[50px] font-light tracking-[-0.02em] text-white leading-[1.1]">
                Experience <br className="hidden lg:block" />& Education.
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-8">
            <div className="space-y-16">
              
              {/* Experience Section */}
              {experience.length > 0 && (
                <div>
                  <Reveal>
                    <div className="flex items-center gap-3 mb-10">
                      <Briefcase className="w-5 h-5 text-[#C2A370]" />
                      <h3 className="text-xl font-light text-white tracking-wide">Work & Experience</h3>
                    </div>
                  </Reveal>
                  <div className="space-y-12">
                    {experience.map((exp, idx) => (
                      <Reveal key={idx} delay={idx * 0.1}>
                        <div className="relative pl-8 md:pl-0 border-b border-white/5 pb-12 last:border-0 last:pb-0 group">
                          {/* Timeline Line */}
                          <div className="md:hidden absolute left-[3px] top-4 bottom-[-3rem] w-[1px] bg-white/5 group-last:hidden" />
                          <div className="md:hidden absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[#C2A370]/50 border border-[#C2A370] group-hover:scale-150 group-hover:bg-[#C2A370] transition-all duration-300" />
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="md:col-span-1 text-[10px] uppercase tracking-widest font-medium text-white/50 mt-1">
                              {exp.period}
                            </div>
                            <div className="md:col-span-3 space-y-2">
                              <h4 className="text-xl font-medium text-white group-hover:text-[#C2A370] transition-colors">
                                {exp.role}
                              </h4>
                              <div className="text-sm font-light text-white/70">
                                {exp.company}
                              </div>
                              <div className="text-xs uppercase tracking-widest text-white/30 pb-4">
                                {exp.location}
                              </div>
                              <p className="text-white/50 font-light leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {education.length > 0 && (
                <div>
                  <Reveal>
                    <div className="flex items-center gap-3 mb-10">
                      <GraduationCap className="w-5 h-5 text-white/60" />
                      <h3 className="text-xl font-light text-white/80 tracking-wide">Academic Background</h3>
                    </div>
                  </Reveal>
                  <div className="space-y-12">
                    {education.map((edu, idx) => (
                      <Reveal key={idx} delay={idx * 0.1}>
                        <div className="relative pl-8 md:pl-0 border-b border-white/5 pb-12 last:border-0 last:pb-0 group">
                          {/* Timeline Line */}
                          <div className="md:hidden absolute left-[3px] top-4 bottom-[-3rem] w-[1px] bg-white/5 group-last:hidden" />
                          <div className="md:hidden absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:scale-150 group-hover:bg-white/60 transition-all duration-300" />
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="md:col-span-1 text-[10px] uppercase tracking-widest font-medium text-white/50 mt-1">
                              {edu.period}
                            </div>
                            <div className="md:col-span-3 space-y-2">
                              <h4 className="text-xl font-light text-white">
                                {edu.degree}
                              </h4>
                              <div className="text-sm text-white/60">
                                {edu.institution}
                              </div>
                              <div className="text-xs uppercase tracking-widest text-white/30 pb-4">
                                {edu.location}
                              </div>
                              <p className="text-white/50 font-light leading-relaxed">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
