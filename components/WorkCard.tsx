"use client";

import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  Github,
  ExternalLink,
  BookOpen,
} from "lucide-react";
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
  const rowNumber = String(index + 1).padStart(2, "0");

  let formattedDate = "";
  try {
    if (item.date) {
      formattedDate = format(parseISO(item.date), "yyyy-MM-dd");
    }
  } catch {
    formattedDate = item.date;
  }

  const staggerDelay = shouldReduceMotion ? 0 : Math.min((index % 8) * 0.04, 0.24);

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.12 : 0.35,
        delay: staggerDelay,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
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
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      exit="exit"
      className="group relative py-7 sm:py-9 px-2 sm:px-4 hover:bg-card/45 transition-colors duration-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* Column 1 (2 cols): Editorial Index Number, Technical Ref ID & Date */}
        <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start justify-between gap-3">
          <div className="flex items-baseline gap-2.5">
            <span className="font-[family-name:var(--font-antonio)] text-2xl sm:text-3xl tracking-[0.04em] text-foreground/35 group-hover:text-primary transition-colors leading-none">
              {rowNumber}
            </span>
            <span
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] font-semibold uppercase tracking-[0.14em] border ${
                isProject
                  ? "bg-primary/10 border-primary/35 text-primary"
                  : "bg-surface border-border text-foreground/85"
              }`}
            >
              {refCode}
            </span>
          </div>

          <div className="flex lg:flex-col items-center lg:items-start gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {formattedDate && <time dateTime={item.date}>{formattedDate}</time>}
            <span className="text-foreground/70">
              {isProject ? "PROJECT" : "ARTICLE"}
            </span>
          </div>
        </div>

        {/* Column 2 (7 cols): Title, Technical Metadata, Summary, Role & Tags */}
        <div className="lg:col-span-7 space-y-3">
          {/* Category + Status / Reading Time */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="text-primary">
              {item.category || (isProject ? "ENGINEERING MODULE" : "FIELD NOTE")}
            </span>
            {item.subsystem && (
              <>
                <span className="text-border">/</span>
                <span className="text-muted-foreground truncate max-w-[280px] sm:max-w-md">
                  {item.subsystem}
                </span>
              </>
            )}
            {isProject && item.status && (
              <ProjectStatusBadge status={item.status} size="sm" />
            )}
            {!isProject && item.readingTime && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3 text-primary" />
                <span>{item.readingTime}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-normal text-foreground tracking-tight group-hover:text-primary transition-colors leading-[1.14]">
            <Link
              href={targetHref}
              className="focus-visible:outline-none focus-visible:underline"
            >
              {item.title}
            </Link>
          </h3>

          {/* Personal Role (when available on projects) */}
          {item.role && (
            <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
              <span className="uppercase tracking-[0.14em] text-primary mr-1.5">
                Role:
              </span>
              {item.role}
            </p>
          )}

          {/* Description */}
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            {item.summary}
          </p>

          {/* Compact Technical Tags */}
          {chipList.length > 0 && (
            <ul
              className="flex flex-wrap gap-1.5 pt-1"
              aria-label="Technologies and topics"
            >
              {chipList.slice(0, 6).map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-0.5 rounded-sm bg-surface border border-border font-mono text-[10px] tracking-[0.06em] text-foreground/85"
                >
                  {tag}
                </li>
              ))}
              {chipList.length > 6 && (
                <li className="px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  +{chipList.length - 6}
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Column 3 (3 cols): Small Thumbnail / Architecture Preview & Actions */}
        <div className="lg:col-span-3 w-full flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-2 lg:pt-0">
          {item.image ? (
            <Link
              href={targetHref}
              tabIndex={-1}
              aria-hidden="true"
              className="relative w-28 sm:w-36 lg:w-44 aspect-[16/10] rounded-sm overflow-hidden border border-border bg-surface shrink-0 block"
            >
              <Image
                src={item.image}
                alt=""
                aria-hidden="true"
                fill
                priority={priority}
                referrerPolicy="no-referrer"
                className="object-cover opacity-90 group-hover:opacity-100 transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="180px"
              />
            </Link>
          ) : isProject ? (
            <Link
              href={targetHref}
              tabIndex={-1}
              aria-hidden="true"
              className="hidden sm:flex flex-col justify-between w-36 lg:w-44 p-3 rounded-sm border border-border bg-surface/80 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground shrink-0"
            >
              <span className="text-primary font-semibold">{refCode} · ARCHITECTURE</span>
              <span className="text-foreground/85 truncate mt-1">
                SEARCH → PINPOINT → VERIFY
              </span>
            </Link>
          ) : null}

          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            {item.docs && (
              <a
                href={item.docs}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View documentation for ${item.title}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-border bg-surface text-muted-foreground hover:text-primary transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${item.title}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-border bg-surface text-muted-foreground hover:text-primary transition-colors"
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
                className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-border bg-surface text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <Link
              href={targetHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-sm border border-border group-hover:border-primary/60 bg-card font-mono text-[11px] uppercase tracking-[0.14em] text-foreground group-hover:text-primary transition-colors"
            >
              <span>{isProject ? "Case Study" : "Read Note"}</span>
              {isProject ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
