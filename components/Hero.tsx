"use client";

import Link from "next/link";
import { ArrowRight, Download, Cpu, ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/content/mdx";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface HeroProps {
  projects?: Post[];
}

export function Hero({ projects = [] }: HeroProps) {
  const latestModule = projects[0];

  const tickerItems = [
    "ESP32-S3 N8R8",
    "ARDUINO UNO",
    "ST7735 SPI TFT",
    "SH1106 I²C OLED",
    "MPU6050 IMU",
    "NE555 ASTABLE",
    "MQ-6 GAS SENSOR",
    "NRF24L01+ 2.4GHZ",
    "PN532 NFC",
    "TINYML EDGE AI",
    "EMBEDDED C/C++",
    "PYTHON · JAVA · TYPESCRIPT",
    "SRM IST ECE '29",
  ];

  return (
    <section
      id="top"
      className="relative pt-24 sm:pt-28 pb-10 flex flex-col justify-between overflow-hidden"
    >
      <div className="container px-6 md:px-12 mx-auto relative z-10">
        {/* Top Silkscreen Registration Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-8 border-b border-border/70 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            <span id="hero-tagline" className="text-primary font-medium">
              {"SYS·BENCH // VIKRAMAN V · TAMIL NADU, IN"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px]">
            <span>REV 2026.4</span>
            <span>•</span>
            <span>DISCIPLINE: B.TECH ECE (2025–2029)</span>
          </div>
        </div>

        {/* Main 12-Column Technical Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Role Headline, Signal Lifecycle & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              <span>[ ELECTRONICS &amp; COMMUNICATION ENGINEERING STUDENT ]</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[82px] leading-[0.94] font-light tracking-[-0.035em] text-foreground mb-6">
              Vikraman V
              <span className="block text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] text-muted-foreground mt-3">
                Hardware prototypes,{" "}
                <span className="font-[family-name:var(--font-cormorant)] italic font-normal text-primary">
                  embedded firmware
                </span>{" "}
                &amp; thoughtful software.
              </span>
            </h1>

            {/* Signal Lifecycle Statement */}
            <div className="my-4 p-4 rounded-lg bg-card/90 border border-border font-mono text-xs sm:text-[13px] leading-relaxed text-foreground/90 shadow-sm">
              <div className="text-primary">
                {"// curiosity → breadboard circuit → firmware bring-up → documented build"}
              </div>
              <div className="text-muted-foreground mt-1">
                {"// embedded systems · sensor interfacing · edge AI · web architecture · creative craft"}
              </div>
            </div>

            <p
              id="hero-bio"
              className="max-w-2xl text-base sm:text-lg text-muted-foreground font-light leading-relaxed mt-3 mb-8"
            >
              An undergraduate <strong className="font-medium text-foreground">ECE student at SRM IST</strong> exploring how physical circuits, microcontrollers, and clean software come together. Every module on this workbench documents real hardware wiring, register-level debugging, and honest lessons learned.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.16em] font-semibold rounded-md shadow-sm hover:opacity-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="/Vikraman_V_Resume.pdf"
                download="Vikraman_V_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-card hover:bg-secondary text-foreground border border-border hover:border-primary/60 font-mono text-xs uppercase tracking-[0.16em] rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>RÉSUMÉ / CV</span>
                <Download className="w-3.5 h-3.5 text-primary" />
              </a>

              <Link
                href="/#about"
                className="inline-flex items-center gap-2 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
              >
                <span>[ INSPECT PROFILE ]</span>
              </Link>
            </div>

            {/* Three Core Engineering Principles (Preserving Resolve, Curiosity, Craft) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 pt-8 border-t border-border/70">
              <div
                id="hero-card-resolve"
                className="p-3.5 rounded-lg bg-card/70 border border-border/80 hover:border-primary/45 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                  <span>P1 · RESOLVE</span>
                  <span>●</span>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Complex problems rarely yield on the first attempt. Progress is earned through iteration.
                </p>
              </div>

              <div
                id="hero-card-curiosity"
                className="p-3.5 rounded-lg bg-card/70 border border-border/80 hover:border-primary/45 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                  <span>P2 · CURIOSITY</span>
                  <span>●</span>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Every hardware build or software experiment begins with a question worth chasing.
                </p>
              </div>

              <div
                id="hero-card-craft"
                className="p-3.5 rounded-lg bg-card/70 border border-border/80 hover:border-primary/45 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                  <span>P3 · CRAFT</span>
                  <span>●</span>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Thoughtful systems, clean interfaces, and honest documentation that holds up to inspection.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Workbench Signal Bus & Latest Active Module Readout */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-xl bg-card border border-border p-5 sm:p-6 shadow-[0_12px_40px_rgba(25,26,24,0.16)] overflow-hidden">
              {/* Corner PCB Fiducial Marks */}
              <span
                aria-hidden="true"
                className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-primary/60"
              />
              <span
                aria-hidden="true"
                className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-primary/60"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-primary/60"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-primary/60"
              />

              {/* Console Board Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-border font-mono text-[10px] uppercase tracking-[0.16em]">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  <span>{"WORKBENCH SIGNAL BUS // REV 1.4"}</span>
                </div>
                <span className="text-primary">3.3V / 5V LOGIC</span>
              </div>

              {/* Restrained SVG Signal Bus Diagram */}
              <div className="relative rounded-lg bg-background/70 border border-border/80 p-3.5 mb-4">
                <svg
                  viewBox="0 0 420 96"
                  className="w-full h-auto overflow-visible"
                  role="img"
                  aria-label="Signal path block diagram showing Sensors & Input feeding into Microcontroller Compute and Display/Telemetry Output"
                >
                  <line
                    x1="112"
                    y1="48"
                    x2="154"
                    y2="48"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="1.75"
                    strokeDasharray="4 3"
                  />
                  <line
                    x1="266"
                    y1="48"
                    x2="308"
                    y2="48"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="1.75"
                    strokeDasharray="4 3"
                  />
                  <circle cx="112" cy="48" r="3" className="fill-primary" />
                  <circle cx="154" cy="48" r="3" className="fill-primary" />
                  <circle cx="266" cy="48" r="3" className="fill-primary" />
                  <circle cx="308" cy="48" r="3" className="fill-primary" />

                  {/* Block 1: Sensing & Input */}
                  <rect
                    x="8"
                    y="16"
                    width="104"
                    height="64"
                    rx="6"
                    className="fill-card stroke-border"
                    strokeWidth="1.2"
                  />
                  <text
                    x="18"
                    y="34"
                    className="fill-primary font-mono text-[8px] tracking-widest uppercase"
                  >
                    STAGE 01 · IN
                  </text>
                  <text
                    x="18"
                    y="51"
                    className="fill-foreground font-mono text-[10px] font-semibold"
                  >
                    SENSORS &amp; RF
                  </text>
                  <text
                    x="18"
                    y="66"
                    className="fill-muted-foreground font-mono text-[8px]"
                  >
                    MPU6050 · MQ-6 · GPS
                  </text>

                  {/* Block 2: Core Compute */}
                  <rect
                    x="154"
                    y="12"
                    width="112"
                    height="72"
                    rx="6"
                    className="fill-card stroke-primary"
                    strokeWidth="1.5"
                  />
                  <text
                    x="166"
                    y="31"
                    className="fill-primary font-mono text-[8px] tracking-widest uppercase"
                  >
                    STAGE 02 · MCU
                  </text>
                  <text
                    x="166"
                    y="49"
                    className="fill-foreground font-mono text-[10px] font-semibold"
                  >
                    ESP32-S3 / UNO
                  </text>
                  <text
                    x="166"
                    y="63"
                    className="fill-muted-foreground font-mono text-[8px]"
                  >
                    SPI · I²C · ADC · PWM
                  </text>
                  <text
                    x="166"
                    y="75"
                    className="fill-primary font-mono text-[7.5px]"
                  >
                    LATEST REF: {latestModule?.refId || "U1"}
                  </text>

                  {/* Block 3: Output & Interface */}
                  <rect
                    x="308"
                    y="16"
                    width="104"
                    height="64"
                    rx="6"
                    className="fill-card stroke-border"
                    strokeWidth="1.2"
                  />
                  <text
                    x="318"
                    y="34"
                    className="fill-primary font-mono text-[8px] tracking-widest uppercase"
                  >
                    STAGE 03 · OUT
                  </text>
                  <text
                    x="318"
                    y="51"
                    className="fill-foreground font-mono text-[10px] font-semibold"
                  >
                    UI &amp; TELEMETRY
                  </text>
                  <text
                    x="318"
                    y="66"
                    className="fill-muted-foreground font-mono text-[8px]"
                  >
                    ST7735 · OLED · WEB
                  </text>
                </svg>
              </div>

              {/* Latest Published Module Telemetry Readout */}
              {latestModule && (
                <div className="rounded-lg bg-background/85 border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-primary/15 border border-primary/40 font-mono text-[11px] font-semibold text-primary">
                        {latestModule.refId || "U1"}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        LATEST BENCH MODULE
                      </span>
                    </div>
                    {latestModule.status && (
                      <ProjectStatusBadge status={latestModule.status} size="sm" />
                    )}
                  </div>

                  <div className="text-base sm:text-lg font-medium text-foreground mb-1.5 leading-snug">
                    {latestModule.title}
                  </div>

                  {latestModule.subsystem && (
                    <div className="font-mono text-[10px] text-foreground/85 bg-card px-2.5 py-1.5 rounded border border-border/80 mb-3 truncate">
                      <span className="text-primary mr-1.5">BUS:</span>
                      {latestModule.subsystem}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/70">
                    <Link
                      href="#projects"
                      className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ↓ FEATURED BELOW
                    </Link>
                    <Link
                      href={`/projects/${latestModule.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest font-semibold text-primary hover:underline shrink-0"
                    >
                      <span>OPEN DOSSIER</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Signal Ticker */}
      <div
        aria-hidden="true"
        className="mt-14 border-y border-border/80 bg-card/50 py-2.5 overflow-hidden select-none"
      >
        <div className="flex whitespace-nowrap animate-signal-ticker font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {tickerItems.map((item, idx) => (
                <span key={`${dup}-${idx}`} className="inline-flex items-center mx-4">
                  <span className="text-primary mr-2">▸</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
