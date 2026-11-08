"use client";

import { Reveal } from "./Reveal";
import { ArrowUpRight, Copy, Check, Download, Linkedin, Github } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

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
        }, 1800);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
      setStatusMessage(`Opening mail client for ${personalInfo.email}`);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-t border-border/60 overflow-hidden">
      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container px-8 md:px-12 mx-auto relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary mb-4">What&apos;s Next?</h2>
            <div className="text-[50px] md:text-[70px] leading-[0.9] font-light tracking-[-0.04em] text-foreground mb-6">
              Let&apos;s work together.
            </div>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto">
              I&apos;m currently looking for new opportunities. My inbox is always open—whether you have a question or want to discuss a project, feel free to connect!
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full max-w-2xl">
              {/* Download CV Button */}
              <a 
                id="contact-download-cv"
                href={personalInfo.resume || "/Vikraman_V_Resume.pdf"}
                download="Vikraman_V_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-primary hover:opacity-90 text-primary-foreground font-semibold text-xs uppercase tracking-widest rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(196,107,69,0.2)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>

              {/* Copy Email Button */}
              <button 
                id="contact-copy-email"
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Email copied to clipboard" : `Copy email address ${personalInfo.email}`}
                className={`group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 border text-xs uppercase tracking-widest rounded-sm transition-all duration-200 min-w-[155px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  copied
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border bg-card/70 hover:border-primary/60 text-foreground font-medium hover:bg-secondary/70"
                }`}
              >
                <div className="relative w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center text-primary"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="whitespace-nowrap">{copied ? "Copied!" : "Copy Email"}</span>
                <span className="sr-only" aria-live="polite">
                  {statusMessage}
                </span>
              </button>

              {/* LinkedIn Link */}
              <a 
                id="contact-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-border bg-card/70 hover:border-primary/60 text-foreground hover:text-primary font-medium text-xs uppercase tracking-widest rounded-sm transition-all duration-200 hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* GitHub Link */}
              <a 
                id="contact-github"
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-border bg-card/70 hover:border-primary/60 text-foreground hover:text-primary font-medium text-xs uppercase tracking-widest rounded-sm transition-all duration-200 hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto pt-10 pb-14 border-t border-border/60 bg-background">
      <div className="container px-8 md:px-12 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-auto">
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium mb-1">Vikraman V</div>
          <div className="text-xs text-muted-foreground/85 font-light">&copy; {new Date().getFullYear()} All rights reserved. &bull; Bridging hardware &amp; software</div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/work" className="text-primary hover:opacity-85 transition-colors font-semibold">Work</Link>
          <Link href="/#experience" className="hover:text-foreground transition-colors">Experience</Link>
          <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>

        <div className="flex gap-8 items-center w-full md:w-auto justify-center md:justify-end">
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest font-medium">
            <Link href={personalInfo.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link>
            <Link href={personalInfo.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
            <Link href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">Email</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
