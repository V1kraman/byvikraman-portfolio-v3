"use client";

import { Reveal } from "./Reveal";
import Link from "next/link";
import { BookOpen, Film, Gamepad2, Guitar, ArrowUpRight, LucideIcon } from "lucide-react";
import { personalInfo, personalInterests } from "@/lib/data";

const interestIcons: Record<string, LucideIcon> = {
  "INT·01": Guitar,
  "INT·02": BookOpen,
  "INT·03": Film,
  "INT·04": Gamepad2,
};

export function About() {
  const specRows = [
    {
      code: "STUDY",
      value: "B.Tech in Electronics & Communication Engineering (2025 – 2029) · SRM IST, Kattankulathur",
    },
    {
      code: "BENCH",
      value: "ESP32-S3 (N8R8) · Arduino Uno · 555 Timer IC · SPI / I²C / UART · Sensor Interfacing",
    },
    {
      code: "STACK",
      value: "C / C++ · Python · Java · TypeScript · Next.js · PlatformIO · TinyML",
    },
    {
      code: "INTERN",
      value: "Intern — SYNK (AI-based systems architecture & workflows, Aug – Sept 2026)",
    },
    {
      code: "OFF-BENCH",
      value: "Music & Guitar · Books & Reading · Cinema & Films · Gaming",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 md:py-28 relative border-t border-border/80 overflow-hidden"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10">
        {/* Editorial Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 sm:mb-12 border-b border-border">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-2">
                03 · About &amp; Context
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.08]">
                Working at the boundary of{" "}
                <span className="italic text-primary">hardware and software.</span>
              </h2>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shrink-0">
              SRM IST · B.TECH ECE (&apos;25–&apos;29)
            </div>
          </div>
        </Reveal>

        {/* Main Asymmetric Narrative + Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column (7 cols): Personal First-Person Introduction */}
          <div className="lg:col-span-7 space-y-5">
            <Reveal>
              <div className="space-y-5">
                {personalInfo.aboutNarrative.map((paragraph, idx) => (
                  <p
                    key={idx}
                    id={`about-narrative-p${idx + 1}`}
                    className={
                      idx === 0
                        ? "text-foreground/95 text-base sm:text-lg leading-[1.8] font-normal"
                        : "text-muted-foreground text-sm sm:text-base leading-[1.8] font-normal"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.14em]">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline py-1"
                >
                  <span>Full About &amp; Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-border">/</span>
                <Link
                  href="/now"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  <span>What I’m doing /now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column (5 cols): Technical Index Sheet */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-sm bg-card/80 border border-border p-5 sm:p-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground pb-3.5 mb-4 border-b border-border">
                  <span>SPECIFICATION SHEET</span>
                  <span className="text-primary">VERIFIED PROFILE</span>
                </div>

                <ul className="divide-y divide-border/80 font-mono text-xs">
                  {specRows.map((row) => (
                    <li key={row.code} className="py-3 flex items-start gap-4">
                      <span className="w-20 shrink-0 text-primary font-medium tracking-[0.1em] text-[10px] pt-0.5">
                        {row.code}
                      </span>
                      <span className="text-foreground/90 font-sans text-xs sm:text-[13px] leading-relaxed">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Compact Personal Interests Strip (Music & Guitar, Books & Reading, Cinema & Films, Gaming — NO photography) */}
        <Reveal delay={0.16}>
          <div className="mt-14 sm:mt-16 pt-10 border-t border-border/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-1">
                  OFF THE WORKBENCH
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-normal text-foreground">
                  Personal Interests &amp; Creative Pursuits
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                MUSIC · BOOKS · CINEMA · GAMING
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {personalInterests.map((item) => {
                const Icon = interestIcons[item.code] || Guitar;
                return (
                  <div
                    key={item.code}
                    className="p-5 bg-background hover:bg-card/60 transition-colors flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] mb-3">
                        <span className="text-primary font-medium">{item.code}</span>
                        <span className="text-muted-foreground">{item.tag}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-primary shrink-0" />
                        <h4 className="text-sm sm:text-base font-medium text-foreground">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.href && (
                      <div className="pt-2 border-t border-border/60">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary hover:underline"
                        >
                          <span>Related Build</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
