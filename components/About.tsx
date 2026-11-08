"use client";

import { Reveal } from "./Reveal";
import Link from "next/link";
import { Camera, Code2, Cpu, Gamepad2, Guitar, ArrowUpRight, LucideIcon } from "lucide-react";
import { beyondTheBench } from "@/lib/data";

interface InterestItem {
  icon: LucideIcon;
  label: string;
  code: string;
}

function InterestChip({ icon: Icon, label, code }: InterestItem) {
  return (
    <div className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-md bg-card border border-border text-xs text-foreground/85 hover:text-foreground hover:border-primary/55 hover:bg-secondary/60 transition-all duration-200 cursor-default select-none">
      <span className="font-mono text-[10px] text-primary">{code}</span>
      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0" />
      <span className="font-normal tracking-wide whitespace-nowrap">{label}</span>
    </div>
  );
}

export function About() {
  const interests: InterestItem[] = [
    { code: "I1", icon: Cpu, label: "Electronics" },
    { code: "I2", icon: Code2, label: "Development" },
    { code: "I3", icon: Guitar, label: "Music & Guitar" },
    { code: "I4", icon: Camera, label: "Photography" },
    { code: "I5", icon: Gamepad2, label: "Gaming" },
  ];

  const specRows = [
    {
      code: "EDU",
      value: "B.Tech in Electronics & Communication Engineering (2025 – 2029) · SRM IST, Kattankulathur",
    },
    {
      code: "BENCH",
      value: "ESP32-S3 · Arduino Uno · 555 Analog Circuits · SPI / I²C / UART · Sensor Interfacing",
    },
    {
      code: "CODE",
      value: "C / C++ · Python · Java · TypeScript · Next.js App Router · PlatformIO",
    },
    {
      code: "XP",
      value: "Intern — SYNK (AI-based systems architecture, Aug – Sept 2026)",
    },
    {
      code: "BEYOND",
      value: "Guitar · Photography · Technical Writing · DaVinci Resolve & Photoshop",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative border-t border-border/70 overflow-hidden">
      <div className="container px-6 md:px-12 mx-auto relative z-10">
        {/* Silkscreen Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-12 border-b-2 border-primary/50">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-2">
                {"/// 02 · THE ENGINEER & STUDENT"}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.025em] text-foreground leading-tight">
                Engineering the future,{" "}
                <span className="font-[family-name:var(--font-cormorant)] italic text-primary font-normal">
                  one circuit
                </span>{" "}
                at a time.
              </h2>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
              SUBSTRATE · FR-4 · SRM IST ECE &apos;29
            </div>
          </div>
        </Reveal>

        {/* Main Engineer Grid: Spec Dossier + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: System Identity Card & Spec Table */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-xl bg-card border border-border p-6 relative overflow-hidden">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground pb-4 mb-5 border-b border-border">
                  <span>FIG. 01 — OPERATOR SPECIFICATION</span>
                  <span className="text-primary">REV 2026</span>
                </div>

                {/* Key Metrics / Identity Strip (Authentic to Vikraman) */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-lg bg-background/70 border border-border">
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-primary">ECE</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                      Discipline
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-background/70 border border-border">
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-foreground">2029</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                      Cohort
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-background/70 border border-border">
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-foreground">IN</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                      Tamil Nadu
                    </div>
                  </div>
                </div>

                {/* Karthick-style Specification List */}
                <ul className="divide-y divide-border/80 font-mono text-xs">
                  {specRows.map((row) => (
                    <li key={row.code} className="py-3 flex items-start gap-4">
                      <span className="w-16 shrink-0 text-primary font-semibold tracking-wider">
                        {row.code}
                      </span>
                      <span className="text-foreground/85 font-sans text-xs sm:text-[13px] leading-relaxed">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Honest Engineering Narrative & Pursuits */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-5">
                <p
                  id="about-narrative-p1"
                  className="text-foreground/90 text-lg sm:text-xl font-light leading-relaxed"
                >
                  I am an Electronics and Communication Engineering student at SRM Institute of Science and Technology, driven by a fascination with how ideas become tangible systems. Whether it&apos;s a line of code, an electronic circuit, or a carefully crafted interface, I&apos;m drawn to understanding how individual pieces come together to create something meaningful.
                </p>
                <p
                  id="about-narrative-p2"
                  className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed"
                >
                  My work spans software development, electronics, and modern web technologies, with each project becoming another opportunity to learn, experiment, and refine my craft. I enjoy building with intention, paying attention to the details that often go unnoticed but quietly shape the overall experience.
                </p>
                <p
                  id="about-narrative-p3"
                  className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed"
                >
                  Beyond engineering, I find inspiration in the things that reward patience and observation. You&apos;ll often find me with a guitar in hand, behind a camera, immersed in a good book, or exploring worlds that celebrate perseverance and thoughtful design. Those experiences influence the way I approach technology, reminding me that the best work is rarely rushed and that meaningful progress is built one deliberate step at a time.
                </p>
                <p
                  id="about-narrative-p4"
                  className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed"
                >
                  I don&apos;t see engineering as simply writing code or assembling circuits. For me, it&apos;s a lifelong pursuit of understanding, creating, and leaving every project better than the one before it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="pt-6 border-t border-border/70">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
                  ACTIVE INTERESTS &amp; PURSUITS
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {interests.map((item) => (
                    <InterestChip key={item.label} code={item.code} icon={item.icon} label={item.label} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Parallel "Beyond the Bench / Field Notes" System Strip (Lighter visual density per PDF page 3) */}
        <Reveal delay={0.22}>
          <div className="mt-16 pt-12 border-t border-border/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-secondary border border-border font-mono text-[10px] uppercase tracking-widest text-primary">
                  BEYOND THE BENCH
                </span>
                <h3 className="text-lg sm:text-xl font-light text-foreground">
                  Creative Practice &amp; Personal Pursuits
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                PHOTOGRAPHY · GUITAR · WRITING
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {beyondTheBench.map((item) => (
                <div
                  key={item.code}
                  className="p-5 rounded-xl bg-card/60 border border-border/80 hover:border-primary/45 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest mb-3">
                      <span className="text-primary font-semibold">{item.code}</span>
                      <span className="text-muted-foreground">{item.tag}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-medium text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2 font-mono text-[10px] text-muted-foreground">
                    <span className="truncate">{item.detail}</span>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-primary hover:underline shrink-0 uppercase tracking-wider font-semibold"
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
