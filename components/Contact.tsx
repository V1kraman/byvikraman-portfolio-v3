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
      // Graceful fallback to mailto link
      window.location.href = `mailto:${personalInfo.email}`;
      setStatusMessage(`Opening mail client for ${personalInfo.email}`);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C2A370]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container px-8 md:px-12 mx-auto relative z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C2A370] mb-4">What&apos;s Next?</h2>
            <div className="text-[50px] md:text-[70px] leading-[0.9] font-light tracking-[-0.04em] text-white mb-6">
              Let&apos;s work together.
            </div>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto">
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
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#C2A370] hover:bg-[#d4b581] text-black font-semibold text-xs uppercase tracking-widest rounded-sm overflow-hidden shadow-[0_0_25px_rgba(194,163,112,0.15)] transition-all duration-200"
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
                className={`group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 border text-xs uppercase tracking-widest rounded-sm transition-all duration-200 min-w-[155px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A370] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C] ${
                  copied
                    ? "border-[#C2A370] bg-[#C2A370]/10 text-[#C2A370] font-semibold shadow-[0_0_20px_rgba(194,163,112,0.1)]"
                    : "border-white/20 hover:border-white/40 text-white font-medium hover:bg-white/5"
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
                        className="absolute inset-0 flex items-center justify-center text-[#C2A370]"
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
                        className="absolute inset-0 flex items-center justify-center text-white/50 group-hover:text-white transition-colors"
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
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-white/20 hover:border-[#C2A370]/60 text-white/90 hover:text-[#C2A370] font-medium text-xs uppercase tracking-widest rounded-sm transition-all duration-200 hover:bg-white/5"
              >
                <Linkedin className="w-4 h-4 text-white/60 group-hover:text-[#C2A370] transition-colors" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#C2A370] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* GitHub Link */}
              <a 
                id="contact-github"
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-white/20 hover:border-[#C2A370]/60 text-white/90 hover:text-[#C2A370] font-medium text-xs uppercase tracking-widest rounded-sm transition-all duration-200 hover:bg-white/5"
              >
                <Github className="w-4 h-4 text-white/60 group-hover:text-[#C2A370] transition-colors" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#C2A370] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
    <footer className="mt-auto pt-10 pb-14 border-t border-white/5 bg-[#0A0A0C]">
      <div className="container px-8 md:px-12 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-auto">
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mb-1">Vikraman V</div>
          <div className="text-xs text-white/40 font-light">&copy; {new Date().getFullYear()} All rights reserved. &bull; Bridging hardware &amp; software</div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest font-medium text-white/50">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/work" className="text-[#C2A370] hover:text-[#C2A370]/80 transition-colors font-semibold">Work</Link>
          <Link href="/#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex gap-8 items-center w-full md:w-auto justify-center md:justify-end">
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest font-medium">
            <Link href={personalInfo.linkedin} target="_blank" className="text-white/40 hover:text-[#C2A370] transition-colors">LinkedIn</Link>
            <Link href={personalInfo.github} target="_blank" className="text-white/40 hover:text-[#C2A370] transition-colors">GitHub</Link>
            <Link href={`mailto:${personalInfo.email}`} className="text-white/40 hover:text-[#C2A370] transition-colors">Email</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
