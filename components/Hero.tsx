"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Post } from "@/lib/content/mdx";
import { personalInfo } from "@/lib/data";

interface HeroProps {
  projects?: Post[];
}

export function Hero({ projects = [] }: HeroProps) {
  const latestProject = projects[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative pt-24 sm:pt-32 md:pt-36 pb-14 sm:pb-20 md:pb-24 overflow-hidden"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10">
        {/* Top Editorial Index Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-10 sm:mb-14 border-b border-border/80 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0"
              aria-hidden="true"
            />
            <span id="hero-tagline" className="text-foreground/90 truncate">
              PERSONAL DIGITAL SPACE &amp; ENGINEERING NOTEBOOK
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] shrink-0">
            <span>{personalInfo.designation}</span>
            <span className="hidden sm:inline text-border">/</span>
            <span className="hidden sm:inline">{personalInfo.location}</span>
          </div>
        </div>

        {/* Wide Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): First-Person Editorial Introduction & Actions */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-4">
              00 · Introduction
            </div>

            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl md:text-[68px] xl:text-[76px] leading-[1.02] font-normal tracking-[-0.02em] text-foreground mb-6 sm:mb-8 text-balance">
              Studying how{" "}
              <span className="italic text-primary">physical signals</span>{" "}
              become working circuits, firmware, and software.
            </h1>

            <p
              id="hero-bio"
              className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-[1.75] font-normal mb-8"
            >
              {personalInfo.heroIntro}
            </p>

            {/* Primary Actions: Explore Works & Prominent Download Résumé */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 pb-7 border-b border-border/80">
              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 min-h-[46px] bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-mono text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>Explore Works</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href={personalInfo.resume}
                download="Vikraman_V_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[46px] bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Résumé</span>
              </a>
            </div>

            {/* Direct Correspondence & Social Links: GitHub, LinkedIn, Email */}
            <div className="pt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-mono text-xs uppercase tracking-[0.14em]">
              <span className="text-muted-foreground text-[10px]">Direct:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors py-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors py-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors py-1 lowercase"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Editorial Monograph Art Composition */}
          <div className="lg:col-span-5 w-full lg:pt-2">
            <div className="group relative rounded-sm bg-card/85 border border-border p-5 sm:p-7 overflow-hidden transition-colors duration-300">
              {/* Subtle Paper Grain & Warm Tactile Lighting Wash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(210,101,62,0.12),transparent_58%)]"
              />

              {/* Top Editorial Colophon Header */}
              <div className="relative z-10 flex items-center justify-between gap-2 pb-3.5 mb-5 border-b border-border/80 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                <span>Monograph · Issue No. 01</span>
                <span className="text-foreground/75">Precision × Imagination</span>
              </div>

              {/* Main Art-Directed Visual Canvas: Responsive Layout (Horizontal Split on Mobile, Poster Composition on Desktop) */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 lg:grid-cols-1 gap-5 sm:gap-6 items-center">
                {/* Abstract Organic & Sculptural Print Plate */}
                <div className="sm:col-span-7 lg:col-span-1 relative aspect-[5/4] sm:aspect-[4/4] lg:aspect-[5/4] w-full rounded-sm bg-surface/90 border border-border/80 overflow-hidden flex items-center justify-center p-4 sm:p-6">
                  {/* Inner Passe-Partout Hairline Frame */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 border border-border/60"
                  />

                  {/* Cropped Editorial Issue Numeral in Corner Negative Space */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 left-5 font-[family-name:var(--font-cormorant)] italic text-xs sm:text-sm tracking-wide text-muted-foreground/80"
                  >
                    Plate I — Form &amp; Inquiry
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3.5 right-5 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70"
                  >
                    13.08° N · 80.27° E
                  </div>

                  {/* Sculptural & Organic Abstract SVG Composition */}
                  <svg
                    viewBox="0 0 360 280"
                    className="w-full h-full max-h-[240px] sm:max-h-[260px] overflow-visible select-none"
                    role="img"
                    aria-label="Abstract editorial art composition combining a warm vermilion sun disc, fluid organic stone silhouette, and balanced architectural geometry"
                  >
                    <defs>
                      <linearGradient id="editorial-stone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.92" />
                        <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.72" />
                      </linearGradient>
                      <linearGradient id="editorial-relief-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--card)" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Quiet Architectural Proportion Guides (Golden Ratio Division) */}
                    <line
                      x1="222"
                      y1="16"
                      x2="222"
                      y2="264"
                      stroke="currentColor"
                      className="text-border"
                      strokeWidth="0.75"
                    />
                    <line
                      x1="24"
                      y1="172"
                      x2="336"
                      y2="172"
                      stroke="currentColor"
                      className="text-border"
                      strokeWidth="0.75"
                    />

                    {/* Warm Vermilion Sun-Disc (Asymmetric Focal Anchor) */}
                    <motion.circle
                      cx="222"
                      cy="106"
                      r="54"
                      className="fill-primary"
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? { y: 0, scale: 1 }
                          : { y: [0, -3, 0], scale: [1, 1.015, 1] }
                      }
                      transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Subtle Crescent Shadow on the Sun-Disc */}
                    <path
                      d="M 222 52 A 54 54 0 0 1 276 106 A 54 54 0 0 1 222 160 A 42 54 0 0 0 222 52 Z"
                      className="fill-background/15"
                    />

                    {/* Fluid, Hand-Carved Organic Stone Form Overlapping the Disc */}
                    <motion.path
                      d="M 88 214 C 76 168, 98 112, 146 96 C 186 83, 214 114, 232 146 C 248 174, 272 188, 266 218 C 260 244, 214 248, 166 244 C 122 240, 96 238, 88 214 Z"
                      fill="url(#editorial-stone-grad)"
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? { x: 0, y: 0 }
                          : { x: [0, 2, 0], y: [0, 2, 0] }
                      }
                      transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Inner Cutout / Negative-Space Aperture Inside the Organic Form */}
                    <path
                      d="M 138 168 C 134 148, 152 132, 174 136 C 194 140, 204 162, 194 180 C 184 196, 144 192, 138 168 Z"
                      fill="url(#editorial-relief-grad)"
                      stroke="currentColor"
                      className="text-border"
                      strokeWidth="0.8"
                    />

                    {/* Sweeping Calligraphic / Acoustic Arc Bridging Left to Right */}
                    <path
                      d="M 52 196 C 96 118, 188 68, 304 82"
                      fill="none"
                      stroke="currentColor"
                      className="text-foreground/45"
                      strokeWidth="1.15"
                    />

                    {/* Tactile Counter-Balance Plinth & Small Vermilion Registration Seal */}
                    <rect
                      x="64"
                      y="214"
                      width="76"
                      height="18"
                      rx="1"
                      className="fill-card stroke-border"
                      strokeWidth="1"
                    />
                    <rect
                      x="288"
                      y="206"
                      width="14"
                      height="14"
                      rx="1"
                      className="fill-primary/85"
                    />
                  </svg>
                </div>

                {/* Editorial Statement & Three Multidisciplinary Facets */}
                <div className="sm:col-span-5 lg:col-span-1 space-y-4">
                  <div className="space-y-1.5">
                    <p className="font-[family-name:var(--font-cormorant)] italic text-xl sm:text-2xl text-foreground leading-snug">
                      &ldquo;Built with structured rigour, shaped by curiosity and quiet observation.&rdquo;
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      An intersection of engineering discipline, hands-on experimentation, written reflection, and music.
                    </p>
                  </div>

                  {/* Three Editorial Chapters (Making / Writing / Rhythm) */}
                  <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-2.5 pt-3 border-t border-border/80">
                    <div className="space-y-0.5">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                        I · Craft
                      </span>
                      <span className="block text-xs font-medium text-foreground">
                        Systems &amp; Objects
                      </span>
                    </div>
                    <div className="space-y-0.5 sm:border-t lg:border-t-0 lg:border-l border-border/60 sm:pt-2 lg:pt-0 lg:pl-3">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                        II · Writing
                      </span>
                      <span className="block text-xs font-medium text-foreground">
                        Field Notes
                      </span>
                    </div>
                    <div className="space-y-0.5 sm:border-t lg:border-t-0 lg:border-l border-border/60 sm:pt-2 lg:pt-0 lg:pl-3">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                        III · Rhythm
                      </span>
                      <span className="block text-xs font-medium text-foreground">
                        Guitar &amp; Film
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiet Editorial Colophon Footer */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-border/80 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>Index · Selected Works &amp; Essays</span>
                {latestProject && (
                  <Link
                    href={`/projects/${latestProject.slug}`}
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Latest entry</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

