"use client";

import { Reveal } from "./Reveal";
import { ArrowUpRight, Copy, CheckCircle2, ArrowRight, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              I&apos;m currently looking for new opportunities. My inbox is always open—whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href={`mailto:${personalInfo.email}`}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#C2A370] text-black font-semibold text-xs uppercase tracking-widest rounded-sm overflow-hidden shadow-[0_0_30px_rgba(194,163,112,0.15)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Say Hello</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a 
                href={personalInfo.resume || "/Vikraman_V_Resume.pdf"}
                download="Vikraman_V_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-8 py-4 border border-[#C2A370]/60 hover:border-[#C2A370] text-[#C2A370] font-semibold text-xs uppercase tracking-widest rounded-sm overflow-hidden transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-[#C2A370] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Download CV</span>
                <Download className="w-4 h-4 relative z-10 group-hover:text-black group-hover:translate-y-0.5 transition-all duration-300" />
              </a>
              
              <button 
                onClick={handleCopy}
                className="group relative flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium text-xs uppercase tracking-widest rounded-sm transition-colors hover:bg-white/5"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 text-[#C2A370]"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 text-white/50 group-hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
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
