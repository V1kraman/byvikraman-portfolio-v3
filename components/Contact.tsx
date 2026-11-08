"use client";

import { Reveal } from "./Reveal";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(personalInfo.email);
        setCopied(true);
        setStatusMessage("Email address copied to clipboard!");
        timerRef.current = setTimeout(() => {
          setCopied(false);
          setStatusMessage("");
        }, 2000);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
      setStatusMessage(`Opening mail client for ${personalInfo.email}`);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative border-t border-border/70 bg-card/20 overflow-hidden"
    >
      <div className="container px-6 md:px-12 mx-auto relative z-10">
        <Reveal>
          {/* Silkscreen Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-12 border-b-2 border-primary/50">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-2">
                {"/// 05 · SOLDER A CONNECTION"}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.025em] text-foreground leading-tight">
                Test Points &amp;{" "}
                <span className="font-[family-name:var(--font-cormorant)] italic text-primary font-normal">
                  Direct Channels
                </span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-light mt-2 max-w-xl">
                Open to embedded systems internships, collaborative hardware/software builds, and engineering discussions. All connection pads are exposed below.
              </p>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
              TEST POINTS · TP1–TP4 EXPOSED
            </div>
          </div>
        </Reveal>

        {/* Test-Point Pads Grid (TP1 - TP3: Email, LinkedIn, GitHub) */}
        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* TP1: Email Pad (Click to Copy + Mailto) */}
            <button
              id="contact-copy-email"
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Email copied to clipboard" : `Copy email address ${personalInfo.email}`}
              className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/60 text-left transition-all duration-200 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              {/* Solder pad indicator dot */}
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/45 group-hover:bg-primary transition-colors"
              />

              <span className="w-11 h-11 rounded-lg bg-primary/15 border border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground font-mono text-xs font-semibold text-primary flex items-center justify-center shrink-0 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : "EM"}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  TP1 · {copied ? "COPIED TO CLIPBOARD" : "EMAIL (TAP TO COPY)"}
                </span>
                <strong className="block font-mono text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate mt-0.5">
                  {personalInfo.email}
                </strong>
              </span>
              <span className="sr-only" aria-live="polite">
                {statusMessage}
              </span>
            </button>

            {/* TP2: LinkedIn Pad */}
            <a
              id="contact-linkedin"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/60 transition-all duration-200 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/45 group-hover:bg-primary transition-colors"
              />
              <span className="w-11 h-11 rounded-lg bg-primary/15 border border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground font-mono text-xs font-semibold text-primary flex items-center justify-center shrink-0 transition-colors">
                IN
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  TP2 · LINKEDIN
                </span>
                <strong className="flex items-center gap-1 font-mono text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate mt-0.5">
                  <span>/in/byvikraman</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </strong>
              </span>
            </a>

            {/* TP3: GitHub Pad */}
            <a
              id="contact-github"
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/60 transition-all duration-200 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/45 group-hover:bg-primary transition-colors"
              />
              <span className="w-11 h-11 rounded-lg bg-primary/15 border border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground font-mono text-xs font-semibold text-primary flex items-center justify-center shrink-0 transition-colors">
                GH
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  TP3 · GITHUB REPOS
                </span>
                <strong className="flex items-center gap-1 font-mono text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate mt-0.5">
                  <span>/V1kraman</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </strong>
              </span>
            </a>
          </div>
        </Reveal>

        {/* TP4: Primary Résumé / Datasheet Bar */}
        <Reveal delay={0.14}>
          <a
            id="contact-download-cv"
            href={personalInfo.resume || "/Vikraman_V_Resume.pdf"}
            download="Vikraman_V_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/40 hover:border-primary transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="w-11 h-11 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold flex items-center justify-center shrink-0 shadow-sm">
                PDF
              </span>
              <div className="min-w-0">
                <strong className="block text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                  Download Curriculum Vitae (Résumé)
                </strong>
                <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-muted-foreground mt-0.5 truncate">
                  TP4 · OPERATOR DATASHEET · EDUCATION, PROJECTS &amp; TECHNICAL STACK
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold shrink-0">
              <span className="hidden sm:inline">DOWNLOAD</span>
              <Download className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-border/80 bg-background font-mono text-xs">
      <div className="container px-6 md:px-12 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-muted-foreground">
          <span className="text-foreground font-semibold tracking-[0.14em]">
            © {new Date().getFullYear()} VIKRAMAN V
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="text-[11px] tracking-[0.12em] uppercase">
            ECE UNDERGRADUATE · TAMIL NADU, INDIA
          </span>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            [ HOME ]
          </Link>
          <Link href="/work" className="text-primary font-semibold hover:underline">
            [ WORK ]
          </Link>
          <Link href="/#about" className="hover:text-primary transition-colors">
            [ ABOUT ]
          </Link>
          <Link href="/#capabilities" className="hover:text-primary transition-colors">
            [ STACK ]
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            [ NOTES ]
          </Link>
          <Link href="/#contact" className="hover:text-primary transition-colors">
            [ CONTACT ]
          </Link>
        </nav>
      </div>
    </footer>
  );
}
