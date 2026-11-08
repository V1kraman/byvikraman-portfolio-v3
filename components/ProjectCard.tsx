"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu, FileText, Github, ExternalLink, BookOpen } from "lucide-react";
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
  index = 0,
  priority = false,
  className = "",
}: ProjectCardProps) {
  const isProject = project.type === "project";
  const targetHref = isProject ? `/projects/${project.slug}` : `/blog/${project.slug}`;
  const refCode = project.refId || (isProject ? `U${index + 1}` : `FN${index + 1}`);

  const tagsList =
    project.tech && project.tech.length > 0
      ? project.tech
      : project.tags && project.tags.length > 0
        ? project.tags
        : [];

  return (
    <article
      id={`p-${refCode}`}
      data-ref={refCode}
      className={`group relative flex flex-col h-full bg-card border border-border hover:border-primary/60 rounded-xl overflow-hidden transition-all duration-300 shadow-[0_4px_24px_rgba(25,26,24,0.12)] hover:shadow-[0_14px_36px_rgba(25,26,24,0.24)] ${className}`}
    >
      {/* Top Copper Accent Trace on Featured/Ongoing Modules */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-gradient-to-r from-primary/80 via-primary/30 to-transparent opacity-75 group-hover:opacity-100 transition-opacity"
      />

      {/* 1. Module Header Silkscreen Bar */}
      <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border/80 bg-background/40 font-mono text-[11px]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-primary/15 border border-primary/40 text-primary font-semibold tracking-wider shrink-0">
            {refCode}
          </span>
          <span className="uppercase tracking-[0.14em] text-muted-foreground truncate text-[10px]">
            {project.category || (isProject ? "ENGINEERING MODULE" : "FIELD NOTE")}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {project.status ? (
            <ProjectStatusBadge status={project.status} size="sm" />
          ) : (
            <span className="px-2 py-0.5 rounded-sm bg-secondary border border-border text-[9px] uppercase tracking-widest text-foreground/80">
              {project.timeline || "2026"}
            </span>
          )}
        </div>
      </div>

      {/* 2. Hardware Proof / Media Slot (16:10 aspect ratio) */}
      <Link
        href={targetHref}
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/80 bg-secondary/50 block"
      >
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt=""
              aria-hidden="true"
              fill
              priority={priority}
              referrerPolicy="no-referrer"
              className="object-cover opacity-92 group-hover:opacity-100 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-obsidian/25 opacity-60 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none" />
            <span className="absolute bottom-2.5 left-3 z-10 px-2 py-0.5 rounded bg-obsidian/85 text-bone border border-bone/20 font-mono text-[9px] uppercase tracking-[0.16em]">
              PROTOTYPE EVIDENCE · {project.timeline || "2026"}
            </span>
          </>
        ) : (
          /* Technical Schematic Blueprint Fallback for non-photo modules (like GARUDA or essays) */
          <div className="absolute inset-0 flex flex-col justify-between p-5 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]">
            <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>SCHEMATIC DOSSIER // {refCode}</span>
              <span>{project.timeline || "2026"}</span>
            </div>
            <div className="my-auto flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-card border border-primary/40 flex items-center justify-center text-primary font-mono text-sm font-semibold shadow-sm">
                {refCode}
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  {isProject ? "SYSTEM ARCHITECTURE" : "TECHNICAL DOSSIER"}
                </div>
                <div className="font-mono text-xs text-foreground/85 truncate">
                  {project.subsystem || "Hardware & Software Architecture"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground border-t border-border/60 pt-2">
              <span>EVIDENCE-LED CASE STUDY</span>
              <span className="text-primary">INSPECT →</span>
            </div>
          </div>
        )}
      </Link>

      {/* 3. Module Body: Title, Summary, Role/Contribution, Component Chips */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-normal text-foreground tracking-[-0.015em] group-hover:text-primary transition-colors leading-snug">
            <Link
              href={targetHref}
              className="focus-visible:outline-none focus-visible:underline"
            >
              {project.title}
            </Link>
          </h3>

          {project.role && (
            <p className="mt-1.5 font-mono text-[11px] text-primary/90 leading-relaxed">
              <span className="uppercase tracking-wider text-muted-foreground mr-1.5">ROLE:</span>
              {project.role}
            </p>
          )}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-3 flex-grow">
          {project.summary}
        </p>

        {/* Component / Protocol Reference Chips */}
        {tagsList.length > 0 && (
          <ul
            className="flex flex-wrap gap-1.5 pt-1"
            aria-label="Components and technologies"
          >
            {tagsList.slice(0, 6).map((tag) => (
              <li
                key={tag}
                className="px-2 py-0.5 rounded bg-secondary/75 border border-border font-mono text-[10px] uppercase tracking-wider text-foreground/85"
              >
                {tag}
              </li>
            ))}
            {tagsList.length > 6 && (
              <li className="px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{tagsList.length - 6}
              </li>
            )}
          </ul>
        )}

        {/* 4. Bottom Action Bar */}
        <div className="pt-4 mt-auto border-t border-border/80 flex items-center justify-between gap-3">
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-foreground group-hover:text-primary transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span>{isProject ? "INSPECT MODULE" : "READ DOSSIER"}</span>
            <ArrowUpRight className="w-4 h-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.docs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Documentation for ${project.title}`}
                title="Documentation"
                className="p-2 rounded-md bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                title="GitHub Repository"
                className="p-2 rounded-md bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live tool or demo for ${project.title}`}
                title="Live Tool / Demo"
                className="p-2 rounded-md bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
