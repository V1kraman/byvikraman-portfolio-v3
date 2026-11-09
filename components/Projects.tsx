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
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}

export function Projects({
  projects,
  totalProjectsCount,
  viewAllLink = "/work",
  viewAllText = "Explore Work",
  showIndex = true,
  title = "Latest Engineered Module",
  subtitle = "My most recently published engineering project—dynamically loaded from the MDX workbench archive.",
  eyebrow = "/// 01 · SELECTED WORK",
}: ProjectsProps) {
  const displayedProjects = projects.slice(0, 1);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-28 relative border-t border-border/70">
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <Reveal>
          {/* Silkscreen Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 sm:mb-12 border-b-2 border-primary/50 relative">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-2">
                {eyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.025em] text-foreground leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm sm:text-base text-muted-foreground font-light mt-2 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:items-end gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shrink-0">
              <span>SOURCE: MDX REPOSITORY</span>
              {typeof totalProjectsCount === "number" && (
                <span className="text-primary">
                  LATEST 1 OF {totalProjectsCount} ARCHIVED WORKS
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* Single Latest Project Module Spotlight */}
        <div className="max-w-4xl mx-auto">
          {displayedProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={0.05}>
              <ProjectCard
                project={project}
                index={idx}
                showIndex={showIndex}
                priority={true}
              />
            </Reveal>
          ))}
        </div>

        {/* CTA to Explore All Work */}
        {viewAllLink && (
          <Reveal delay={0.15}>
            <div className="mt-10 sm:mt-12 md:mt-14 max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-card/70 border border-border">
              <div className="font-mono text-xs text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold mr-2">{"ARCHIVE INDEX //"}</span>
                Browse all hardware builds, lab repairs, and technical articles in the unified Work archive.
              </div>
              <Link
                href={viewAllLink}
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 min-h-[46px] bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.16em] font-semibold rounded-md transition-all hover:opacity-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
