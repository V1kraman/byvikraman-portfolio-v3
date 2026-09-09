"use client";

import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, ArrowRight, Calendar, Clock, Code2, PenTool, Github, ExternalLink } from "lucide-react";
import type { Post } from "@/lib/content/mdx";
import { motion } from "motion/react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface WorkCardProps {
  item: Post;
  priority?: boolean;
}

export function WorkCard({ item, priority = false }: WorkCardProps) {
  const isProject = item.type === "project";
  const targetHref = isProject ? `/projects/${item.slug}` : `/blog/${item.slug}`;

  // Safely format date
  let formattedDate = "";
  try {
    if (item.date) {
      formattedDate = format(parseISO(item.date), "MMM d, yyyy");
    }
  } catch {
    formattedDate = item.date;
  }

  return (
    <motion.article 
      layout="position"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-[#ffffff03] border border-white/5 hover:border-white/15 rounded-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Bar: Badges & Timestamps */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          {/* Content Type Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-widest font-semibold ${
                isProject
                  ? "bg-[#C2A370]/10 text-[#C2A370] border border-[#C2A370]/25"
                  : "bg-white/10 text-white/90 border border-white/15"
              }`}
            >
              {isProject ? <Code2 className="w-3 h-3" /> : <PenTool className="w-3 h-3" />}
              <span>{isProject ? "Project" : "Article"}</span>
            </span>

            {isProject && item.status && (
              <ProjectStatusBadge status={item.status} size="sm" />
            )}
          </div>

          {/* Date & Reading time */}
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-white/40 font-light">
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                <time dateTime={item.date}>{formattedDate}</time>
              </div>
            )}
            {item.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 opacity-70" />
                <span>{item.readingTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Optional Image */}
        {item.image && (
          <Link href={targetHref} tabIndex={-1} aria-hidden="true" className="block relative aspect-video w-full rounded-xl overflow-hidden mb-6 border border-white/10 bg-[#141417]">
            <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
            <Image
              src={item.image}
              alt=""
              aria-hidden="true"
              fill
              priority={priority}
              referrerPolicy="no-referrer"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
          </Link>
        )}

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-light text-white mb-3 tracking-[-0.01em] group-hover:text-[#C2A370] transition-colors duration-300 leading-snug">
          <Link href={targetHref} className="focus:outline-none">
            {item.title}
          </Link>
        </h3>

        {/* Excerpt / Summary */}
        <p className="text-white/55 text-sm sm:text-base leading-relaxed font-light mb-6 flex-grow line-clamp-3">
          {item.summary}
        </p>

        {/* Tags / Technologies (discrete chip pills) */}
        {((item.tech && item.tech.length > 0) || (item.tags && item.tags.length > 0)) && (
          <ul className="flex flex-wrap gap-2 mb-6" aria-label="Tags">
            {(item.tech && item.tech.length > 0 ? item.tech : item.tags || []).slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/70 font-normal tracking-wide"
              >
                {tag}
              </li>
            ))}
            {((item.tech?.length || 0) + (item.tags?.length || 0) > 4) && (
              <li className="inline-flex items-center px-2 py-1 text-xs text-white/40 font-normal">
                +more
              </li>
            )}
          </ul>
        )}

        {/* Bottom Action Row */}
        <div className="flex items-center justify-between gap-4 mt-auto pt-5 border-t border-white/5">
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-[#C2A370] transition-colors"
          >
            <span>{isProject ? "View Project" : "Read Article"}</span>
            {isProject ? (
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#C2A370] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" />
            ) : (
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C2A370] group-hover:translate-x-1 transition-all duration-300" />
            )}
          </Link>

          {/* External links */}
          <div className="flex items-center gap-3">
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${item.title}`}
                className="p-2 text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/10 rounded-full border border-white/5 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo for ${item.title}`}
                className="p-2 text-white/40 hover:text-[#C2A370] bg-white/[0.03] hover:bg-white/10 rounded-full border border-white/5 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
