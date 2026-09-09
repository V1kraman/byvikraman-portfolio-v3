"use client";

import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/content/mdx";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  projects: Post[];
  totalProjectsCount?: number;
  viewAllLink?: string;
  viewAllText?: string;
  showIndex?: boolean;
}

export function Projects({
  projects,
  totalProjectsCount,
  viewAllLink,
  viewAllText = "Explore All Work",
  showIndex = false,
}: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-white/5">
      <div className="container px-6 sm:px-8 md:px-12 mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[#C2A370]"></div>
              <h2 className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C2A370]">
                Selected Work
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="text-[36px] sm:text-[46px] md:text-[52px] font-light tracking-[-0.02em] text-white leading-tight">
                Featured Projects
              </div>

              {typeof totalProjectsCount === "number" && (
                <div className="text-xs font-mono uppercase tracking-widest text-white/45 pb-1">
                  Showing {projects.length} of {totalProjectsCount} projects
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.1}>
              <ProjectCard
                project={project}
                index={idx}
                showIndex={showIndex}
                priority={idx === 0}
              />
            </Reveal>
          ))}
        </div>

        {/* Secondary Button CTA to Explore All Work */}
        {viewAllLink && (
          <Reveal delay={0.2}>
            <div className="mt-14 md:mt-16 flex justify-center">
              <Link
                href={viewAllLink}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 hover:border-[#C2A370]/60 text-white text-xs uppercase tracking-widest font-semibold rounded-md shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A370] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C]"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-[#C2A370] group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

