"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, BookOpen } from "lucide-react";
import type { Post } from "@/lib/content/mdx";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface ProjectCardProps {
  project: Post;
  index?: number;
  showIndex?: boolean;
  priority?: boolean;
  splitLayout?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  index = 0,
  priority = false,
  splitLayout = false,
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
      className={`group relative bg-card border border-border hover:border-primary/60 rounded-sm overflow-hidden transition-colors duration-300 ${
        splitLayout
          ? "grid grid-cols-1 lg:grid-cols-12"
          : "flex flex-col h-full"
      } ${className}`}
    >
      {/* Visual / Schematic Side */}
      <Link
        href={targetHref}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative overflow-hidden bg-surface block ${
          splitLayout
            ? "lg:col-span-6 min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] border-b lg:border-b-0 lg:border-r border-border"
            : "aspect-[16/10] w-full border-b border-border"
        }`}
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
              className="object-cover opacity-92 group-hover:opacity-100 transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
              sizes={
                splitLayout
                  ? "(max-width: 1024px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, 50vw"
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            <span className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-sm bg-background/90 text-foreground border border-border font-mono text-[10px] uppercase tracking-[0.16em]">
              {refCode} · {project.date || project.timeline || "2026"}
            </span>
          </>
        ) : (
          /* Structured Engineering Architecture Schematic Preview (e.g. GARUDA) */
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:1.75rem_1.75rem]">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>SYSTEM ARCHITECTURE // {refCode}</span>
              <span className="text-primary font-medium">
                {project.date || project.timeline || "2026"}
              </span>
            </div>

            <div className="my-auto space-y-4 py-4">
              <div className="p-4 rounded-sm bg-background/90 border border-border">
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary mb-2">
                  <span>OPERATIONAL PIPELINE</span>
                  <span>HUMAN-IN-THE-LOOP</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-[10px] uppercase tracking-wider text-center">
                  {["SEARCH", "PINPOINT", "REPORT", "VERIFY", "RESCUE"].map(
                    (stage, idx) => (
                      <div
                        key={stage}
                        className={`py-2 px-1.5 rounded-sm border ${
                          stage === "VERIFY"
                            ? "border-primary/60 bg-primary/10 text-primary font-semibold"
                            : "border-border bg-card text-foreground/90"
                        }`}
                      >
                        <span className="block text-[8px] text-muted-foreground mb-0.5">
                          0{idx + 1}
                        </span>
                        {stage}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-[10px]">
                <div className="p-3 rounded-sm bg-background/85 border border-border">
                  <span className="block text-muted-foreground text-[9px] uppercase tracking-wider">
                    NODE ARCHITECTURE
                  </span>
                  <span className="block text-foreground mt-0.5 truncate">
                    {project.subsystem || "Autonomous Aerial Node & Mesh"}
                  </span>
                </div>
                <div className="p-3 rounded-sm bg-background/85 border border-border">
                  <span className="block text-muted-foreground text-[9px] uppercase tracking-wider">
                    DESIGN PRINCIPLE
                  </span>
                  <span className="block text-primary mt-0.5 truncate">
                    Drone = Node · Network = Intelligence
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground border-t border-border/80 pt-3">
              <span>PROTOTYPE DOSSIER</span>
              <span className="text-primary group-hover:translate-x-0.5 transition-transform">
                INSPECT ARCHITECTURE →
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Right / Details Column */}
      <div
        className={`p-5 sm:p-7 md:p-8 flex flex-col justify-between ${
          splitLayout ? "lg:col-span-6" : "flex-grow"
        }`}
      >
        <div className="space-y-4">
          {/* Metadata Header: Identifier, Category, Publication Date, Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/80 font-mono text-[11px]">
            <div className="flex items-center gap-2.5">
              <span className="font-[family-name:var(--font-antonio)] text-lg tracking-[0.06em] text-primary font-semibold">
                {refCode}
              </span>
              <span className="text-border">/</span>
              <span className="uppercase tracking-[0.14em] text-muted-foreground text-[10px]">
                {project.category || (isProject ? "ENGINEERING PROJECT" : "FIELD NOTE")}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {project.date && (
                <time
                  dateTime={project.date}
                  className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground"
                >
                  {project.date}
                </time>
              )}
              {project.status && (
                <ProjectStatusBadge status={project.status} size="sm" />
              )}
            </div>
          </div>

          {/* Title & Personal Role */}
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl font-normal text-foreground tracking-tight group-hover:text-primary transition-colors leading-[1.12]">
              <Link
                href={targetHref}
                className="focus-visible:outline-none focus-visible:underline"
              >
                {project.title}
              </Link>
            </h3>

            {project.role && (
              <p className="mt-2 font-mono text-[11px] text-muted-foreground leading-relaxed">
                <span className="uppercase tracking-[0.14em] text-primary mr-1.5">
                  Role:
                </span>
                {project.role}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
            {project.summary}
          </p>

          {/* Technologies */}
          {tagsList.length > 0 && (
            <div className="pt-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                Technologies &amp; Subsystems
              </div>
              <ul
                className="flex flex-wrap gap-1.5"
                aria-label="Components and technologies"
              >
                {tagsList.slice(0, 7).map((tag) => (
                  <li
                    key={tag}
                    className="px-2.5 py-1 rounded-sm bg-surface border border-border font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/85"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="pt-6 mt-6 border-t border-border/80 flex items-center justify-between gap-3">
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2 py-1.5 font-mono text-xs uppercase tracking-[0.16em] font-medium text-foreground group-hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span>{isProject ? "Read Case Study" : "Read Article"}</span>
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
                className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-surface hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors"
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
                className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-surface hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors"
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
                className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-surface hover:bg-secondary text-muted-foreground hover:text-primary border border-border transition-colors"
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
