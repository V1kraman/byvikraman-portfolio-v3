"use client";

import { Reveal } from "./Reveal";
import { ArrowUpRight, Check, Download, Mail } from "lucide-react";
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
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(personalInfo.email);
        setCopied(true);
        setStatusMessage("Email address copied to clipboard!");
        timerRef.current = setTimeout(() => {
          setCopied(false);
          setStatusMessage("");
        }, 2200);
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
      className="py-16 sm:py-24 md:py-28 relative border-t border-border/80 bg-surface/40 overflow-hidden"
    >
      <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Editorial Invitation */}
            <div className="lg:col-span-6 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                05 · Correspondence
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.08]">
                Start a conversation or{" "}
                <span className="italic text-primary">compare notes.</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                I’m always glad to talk about embedded hardware prototypes, microcontroller firmware,
                engineering internships, or collaborative builds. Reach out directly by email or connect
                through GitHub and LinkedIn.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-sm bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Write an Email</span>
                </a>
                <a
                  id="contact-download-cv"
                  href={personalInfo.resume || "/Vikraman_V_Resume.pdf"}
                  download="Vikraman_V_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-sm border border-border bg-card hover:border-primary/60 text-foreground font-mono text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Download className="w-3.5 h-3.5 text-primary" />
                  <span>Download Résumé (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Direct Index Channels */}
            <div className="lg:col-span-6 w-full border-t lg:border-t-0 border-border pt-6 lg:pt-0">
              <div className="divide-y divide-border border-y border-border">
                {/* Channel 01: Copy / Mail Email */}
                <button
                  id="contact-copy-email"
                  type="button"
                  onClick={handleCopy}
                  aria-label={
                    copied
                      ? "Email copied to clipboard"
                      : `Copy email address ${personalInfo.email}`
                  }
                  className="group w-full py-4 sm:py-5 px-2 flex items-center justify-between gap-4 text-left hover:bg-card/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      CH·01 · {copied ? "COPIED TO CLIPBOARD" : "DIRECT EMAIL (CLICK TO COPY)"}
                    </span>
                    <span className="block font-mono text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate mt-1">
                      {personalInfo.email}
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-sm border border-border group-hover:border-primary/60 flex items-center justify-center text-muted-foreground group-hover:text-primary shrink-0 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <ArrowUpRight className="w-4 h-4" />}
                  </span>
                  <span className="sr-only" aria-live="polite">
                    {statusMessage}
                  </span>
                </button>

                {/* Channel 02: GitHub */}
                <a
                  id="contact-github"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-4 sm:py-5 px-2 flex items-center justify-between gap-4 hover:bg-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      CH·02 · SOURCE REPOSITORIES &amp; FIRMWARE
                    </span>
                    <span className="block font-mono text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate mt-1">
                      github.com/V1kraman
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-sm border border-border group-hover:border-primary/60 flex items-center justify-center text-muted-foreground group-hover:text-primary shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>

                {/* Channel 03: LinkedIn */}
                <a
                  id="contact-linkedin"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-4 sm:py-5 px-2 flex items-center justify-between gap-4 hover:bg-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      CH·03 · PROFESSIONAL NETWORK
                    </span>
                    <span className="block font-mono text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate mt-1">
                      linkedin.com/in/byvikraman
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-sm border border-border group-hover:border-primary/60 flex items-center justify-center text-muted-foreground group-hover:text-primary shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto py-8 sm:py-10 pb-[max(2rem,env(safe-area-inset-bottom))] border-t border-border/85 bg-background">
      <div className="container px-4 sm:px-6 md:px-12 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Wordmark & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-antonio)] text-base tracking-[0.08em] font-semibold text-foreground uppercase hover:text-primary transition-colors"
          >
            VIKRAMAN{" "}
            <span className="font-[family-name:var(--font-cormorant)] italic font-semibold tracking-normal">
              V
            </span>
            <span className="text-primary">.</span>
          </Link>
          <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
            © {new Date().getFullYear()} Vikraman V. · Kattankulathur, Tamil Nadu
          </span>
        </div>

        {/* Right: Navigation + Direct Email, GitHub, LinkedIn */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/work" className="hover:text-foreground transition-colors">
            Works
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/now" className="hover:text-foreground transition-colors">
            Now
          </Link>
          <span aria-hidden="true" className="text-border">
            /
          </span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-primary transition-colors lowercase font-mono"
          >
            {personalInfo.email}
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors inline-flex items-center gap-0.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors inline-flex items-center gap-0.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
