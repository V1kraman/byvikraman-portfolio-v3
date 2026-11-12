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
  title = "Latest Project",
  subtitle = "Strictly the single most recently published engineering project—selected dynamically by publication date from the MDX repository.",
  eyebrow = "02 · Featured Build",
}: ProjectsProps) {
  // Enforce strictly ONE project on the homepage
  const displayedProjects = projects.slice(0, 1);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 md:py-28 relative border-t border-border/80"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 sm:mb-12 border-b border-border">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-2">
                {eyebrow}
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              {typeof totalProjectsCount === "number" && (
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Showing 01 / {String(totalProjectsCount).padStart(2, "0")} Total Works
                </span>
              )}
              {viewAllLink && (
                <Link
                  href={viewAllLink}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-sm bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] font-medium hover:opacity-90 transition-opacity shrink-0"
                >
                  <span>{viewAllText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>

        {/* Single Latest Project in Wide Split Layout */}
        <div>
          {displayedProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={0.05}>
              <ProjectCard
                project={project}
                index={idx}
                showIndex={showIndex}
                priority={true}
                splitLayout={true}
              />
            </Reveal>
          ))}
        </div>

        {/* Secondary Archive Strip */}
        {viewAllLink && (
          <Reveal delay={0.12}>
            <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted-foreground">
                Looking for earlier hardware prototypes, ESP32-S3 experiments, or technical field notes?
              </p>
              <Link
                href={viewAllLink}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary font-medium hover:underline shrink-0"
              >
                <span>{viewAllText} (/work)</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
