"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
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
  const targetHref = `/projects/${project.slug}`;

  // Gather unique tags prioritizing tech stack then general tags
  const tagsList = (project.tech && project.tech.length > 0)
    ? project.tech
    : (project.tags && project.tags.length > 0)
      ? project.tags
      : [];

  return (
    <Link
      href={targetHref}
      aria-label={`View project: ${project.title}`}
      className={`group flex flex-col h-full bg-[#ffffff03] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-7 transition-all duration-300 ease-out shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] motion-safe:hover:-translate-y-1 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A370] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C] ${className}`}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Internal Content ordered strictly per specification */}
      <div className="relative z-10 flex flex-col h-full space-y-4">
        
        {/* 1. Header Row: Index Number & Status Badge */}
        <div className="flex items-center justify-between gap-3 min-h-[26px]">
          {showIndex && typeof index === "number" ? (
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : (
            <span className="text-[11px] uppercase tracking-wider font-mono text-white/30">
              {project.timeline || "Project"}
            </span>
          )}

          {project.status && (
            <ProjectStatusBadge status={project.status} size="sm" />
          )}
        </div>

        {/* 2. Thumbnail / Screenshot Slot (16:9 aspect ratio) */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-[#121215]">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              aria-hidden="true"
              fill
              priority={priority}
              referrerPolicy="no-referrer"
              className="object-cover opacity-85 group-hover:opacity-100 transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            /* Graceful Placeholder with Subtle Pattern & Accent */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/[0.04] via-[#C2A370]/[0.05] to-transparent">
              <div className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-[#C2A370]/80 mb-2">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/40">
                Engineering Case Study
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* 3. Title */}
        <h3 className="text-2xl sm:text-[26px] font-light text-white tracking-[-0.01em] group-hover:text-[#C2A370] transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* 4. Description (Clamped to 2-3 lines) */}
        <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed font-light line-clamp-2 sm:line-clamp-3 flex-grow">
          {project.summary}
        </p>

        {/* 5. Tag Row (Discrete Pills) */}
        {tagsList.length > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Project technologies">
            {tagsList.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/70 font-normal tracking-wide"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* 6. CTA Affordance ("View Project" with min 44px tap target) */}
        <div className="pt-4 border-t border-white/10 mt-auto">
          <div className="flex items-center justify-between min-h-[44px]">
            <span className="text-xs uppercase tracking-widest font-semibold text-white group-hover:text-[#C2A370] transition-colors">
              View Project
            </span>
            <div className="p-2 -mr-2 rounded-full text-white/40 group-hover:text-[#C2A370] transition-colors">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
