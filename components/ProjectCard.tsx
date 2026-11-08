"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, PenTool } from "lucide-react";
import type { Post } from "@/lib/content/mdx";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface ProjectCardProps {
  project: Post;
  index?: number;
  showIndex?: boolean;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  index,
  showIndex = false,
  priority = false,
  className = "",
}: ProjectCardProps) {
  const isProject = project.type === "project";
  const targetHref = isProject ? `/projects/${project.slug}` : `/blog/${project.slug}`;

  const tagsList = (project.tech && project.tech.length > 0)
    ? project.tech
    : (project.tags && project.tags.length > 0)
      ? project.tags
      : [];

  return (
    <Link
      href={targetHref}
      aria-label={isProject ? `View project: ${project.title}` : `Read article: ${project.title}`}
      className={`group flex flex-col h-full bg-card border border-border hover:border-primary/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 ease-out shadow-[0_4px_24px_rgba(25,26,24,0.12)] hover:shadow-[0_12px_40px_rgba(25,26,24,0.22)] motion-safe:hover:-translate-y-1 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Internal Content ordered strictly per specification */}
      <div className="relative z-10 flex flex-col h-full space-y-4">
        
        {/* 1. Header Row: Index Number & Status Badge */}
        <div className="flex items-center justify-between gap-3 min-h-[26px]">
          {showIndex && typeof index === "number" ? (
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : (
            <span className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground">
              {project.timeline || (isProject ? "Project" : "Article")}
            </span>
          )}

          {project.status ? (
            <ProjectStatusBadge status={project.status} size="sm" />
          ) : !isProject ? (
            <span className="inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-foreground/80 bg-secondary border border-border px-2 py-0.5 text-[9px] gap-1">
              Article
            </span>
          ) : null}
        </div>

        {/* 2. Thumbnail / Screenshot Slot (16:9 aspect ratio) */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-secondary/70">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              aria-hidden="true"
              fill
              priority={priority}
              referrerPolicy="no-referrer"
              className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            /* Graceful Placeholder with Subtle Pattern & Accent */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-secondary/60 via-primary/[0.06] to-transparent">
              <div className="p-3 rounded-full bg-card border border-border text-primary mb-2">
                {isProject ? <Code2 className="w-6 h-6" /> : <PenTool className="w-6 h-6" />}
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
                {isProject ? "Engineering Case Study" : "Technical Article"}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/65 via-transparent to-transparent opacity-55 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* 3. Title */}
        <h3 className="text-2xl sm:text-[26px] font-light text-foreground tracking-[-0.01em] group-hover:text-primary transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* 4. Description (Clamped to 2-3 lines) */}
        <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed font-light line-clamp-2 sm:line-clamp-3 flex-grow">
          {project.summary}
        </p>

        {/* 5. Tag Row (Discrete Pills) */}
        {tagsList.length > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Project technologies">
            {tagsList.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/75 border border-border text-xs text-foreground/80 font-normal tracking-wide"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* 6. CTA Affordance (min 44px tap target) */}
        <div className="pt-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between min-h-[44px]">
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground group-hover:text-primary transition-colors">
              {isProject ? "View Project" : "Read Article"}
            </span>
            <div className="p-2 -mr-2 rounded-full text-muted-foreground group-hover:text-primary transition-colors">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
