"use client";

import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ArrowUpRight, ArrowRight, Calendar, Clock, Github, ExternalLink, BookOpen } from "lucide-react";
import type { Post } from "@/lib/content/mdx";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface WorkCardProps {
  item: Post;
  index?: number;
  priority?: boolean;
}

export function WorkCard({ item, index = 0, priority = false }: WorkCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isProject = item.type === "project";
  const targetHref = isProject ? `/projects/${item.slug}` : `/blog/${item.slug}`;
  const refCode = item.refId || (isProject ? `U${index + 1}` : `FN${index + 1}`);

  let formattedDate = "";
  try {
    if (item.date) {
      formattedDate = format(parseISO(item.date), "MMM d, yyyy");
    }
  } catch {
    formattedDate = item.date;
  }

  const staggerDelay = shouldReduceMotion ? 0 : Math.min((index % 6) * 0.06, 0.3);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.45,
        delay: staggerDelay,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const chipList =
    item.tech && item.tech.length > 0
      ? item.tech
      : item.tags && item.tags.length > 0
        ? item.tags
        : [];

  return (
    <motion.article
      id={`archive-${refCode}`}
      data-ref={refCode}
      layout="position"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      exit="exit"
      className="group relative flex flex-col h-full bg-card border border-border hover:border-primary/60 rounded-xl overflow-hidden transition-all duration-300 shadow-[0_4px_24px_rgba(25,26,24,0.1)] hover:shadow-[0_14px_36px_rgba(25,26,24,0.22)]"
    >
      {/* Top Copper Hairline */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-gradient-to-r from-primary/80 via-primary/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"
      />

      {/* Silkscreen Module Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-b border-border/80 bg-background/40 font-mono text-[11px]">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex items-center justify-center px-2 py-0.5 rounded font-semibold tracking-wider shrink-0 ${
              isProject
                ? "bg-primary/15 border border-primary/40 text-primary"
                : "bg-secondary border border-border text-foreground"
            }`}
          >
            {refCode}
          </span>
          <span className="uppercase tracking-[0.12em] text-muted-foreground truncate text-[10px]">
            {item.category || (isProject ? "ENGINEERING MODULE" : "FIELD NOTE")}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isProject ? (
            <>
              <span className="px-2 py-0.5 rounded-sm bg-primary/15 border border-primary/40 text-[9px] uppercase tracking-widest text-primary font-semibold">
                PROJECT
              </span>
              {item.status && <ProjectStatusBadge status={item.status} size="sm" />}
            </>
          ) : (
            <span className="px-2 py-0.5 rounded-sm bg-secondary border border-border text-[9px] uppercase tracking-widest text-foreground/85 font-semibold">
              ARTICLE
            </span>
          )}
        </div>
      </div>

      {/* Media / Schematic Slot */}
      {item.image ? (
        <Link
          href={targetHref}
          tabIndex={-1}
          aria-hidden="true"
          className="block relative aspect-[16/10] w-full overflow-hidden border-b border-border/80 bg-secondary/50"
        >
          <Image
            src={item.image}
            alt=""
            aria-hidden="true"
            fill
            priority={priority}
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] opacity-92 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-55 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
          <span className="absolute bottom-2.5 left-3 z-10 px-2 py-0.5 rounded bg-obsidian/85 text-bone border border-bone/20 font-mono text-[9px] uppercase tracking-[0.16em]">
            {isProject ? "PROTOTYPE PROOF" : "DOCUMENTED LOG"}
          </span>
        </Link>
      ) : (
        <Link
          href={targetHref}
          tabIndex={-1}
          aria-hidden="true"
          className="block relative py-6 px-5 border-b border-border/80 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 rounded-lg bg-card border border-primary/40 flex items-center justify-center font-mono text-xs font-semibold text-primary shrink-0">
                {refCode}
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  {isProject ? "SYSTEM ARCHITECTURE DOSSIER" : "TECHNICAL ESSAY & FIELD NOTE"}
                </div>
                <div className="font-mono text-xs text-foreground/85 truncate mt-0.5">
                  {item.subsystem || "Engineering Analysis & Documentation"}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-4">
        {/* Date & Reading Time */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-primary" />
              <time dateTime={item.date}>{formattedDate}</time>
            </div>
          )}
          {item.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-primary" />
              <span>{item.readingTime}</span>
            </div>
          )}
        </div>

        {/* Title & Role */}
        <div>
          <h3 className="text-xl sm:text-2xl font-normal text-foreground tracking-[-0.015em] group-hover:text-primary transition-colors duration-200 leading-snug">
            <Link href={targetHref} className="focus-visible:outline-none focus-visible:underline">
              {item.title}
            </Link>
          </h3>

          {item.role && (
            <p className="mt-1.5 font-mono text-[11px] text-primary/90 leading-relaxed">
              <span className="uppercase tracking-wider text-muted-foreground mr-1.5">ROLE:</span>
              {item.role}
            </p>
          )}
        </div>

        {/* Summary */}
        <p className="text-muted-foreground text-sm leading-relaxed font-light flex-grow line-clamp-3">
          {item.summary}
        </p>

        {/* Component / Topic Chips */}
        {chipList.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies and topics">
            {chipList.slice(0, 5).map((tag) => (
              <li
                key={tag}
                className="px-2 py-0.5 rounded bg-secondary/75 border border-border font-mono text-[10px] uppercase tracking-wider text-foreground/85"
              >
                {tag}
              </li>
            ))}
            {chipList.length > 5 && (
              <li className="px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{chipList.length - 5}
              </li>
            )}
          </ul>
        )}

        {/* Bottom Action Row */}
        <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-border/80">
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2 py-2 min-h-[42px] font-mono text-xs uppercase tracking-[0.15em] font-semibold text-foreground group-hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <span>{isProject ? "INSPECT MODULE" : "READ FIELD NOTE"}</span>
            {isProject ? (
              <ArrowUpRight className="w-4 h-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            ) : (
              <ArrowRight className="w-4 h-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </Link>

          <div className="flex items-center gap-2">
            {item.docs && (
              <a
                href={item.docs}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View documentation for ${item.title}`}
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[36px] sm:min-h-[36px] p-2 text-muted-foreground hover:text-primary bg-secondary/60 hover:bg-secondary rounded-md border border-border transition-colors"
              >
                <BookOpen className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${item.title}`}
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[36px] sm:min-h-[36px] p-2 text-muted-foreground hover:text-primary bg-secondary/60 hover:bg-secondary rounded-md border border-border transition-colors"
              >
                <Github className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </a>
            )}
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo for ${item.title}`}
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[36px] sm:min-h-[36px] p-2 text-muted-foreground hover:text-primary bg-secondary/60 hover:bg-secondary rounded-md border border-border transition-colors"
              >
                <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
