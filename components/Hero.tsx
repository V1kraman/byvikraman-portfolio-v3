"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative min-h-[100svh] pt-32 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container px-6 md:px-12 mx-auto relative z-10 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 bg-[#C2A370]"></div>
              <span id="hero-tagline" className="text-[11px] text-[#C2A370] uppercase tracking-[0.3em] font-medium">IN PURSUIT OF BETTER</span>
            </motion.div>

            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease }}
                className="text-6xl sm:text-7xl md:text-[110px] leading-[0.85] font-light tracking-[-0.04em] text-white"
              >
                Vikraman V
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="max-w-xl text-lg sm:text-xl text-white/50 font-light leading-relaxed mb-10"
            >
              <p id="hero-bio">
                An <strong className="font-medium text-white/85">Electronics and Communication Engineering</strong> student exploring the intersection of <strong className="font-medium text-white/85">software</strong>, <strong className="font-medium text-white/85">technology</strong>, and <strong className="font-medium text-white/85">thoughtful design</strong>. Building meaningful <strong className="font-medium text-white/85">projects</strong>, embracing every <strong className="font-medium text-white/85">challenge</strong>, and treating each step as part of a lifelong pursuit of <strong className="font-medium text-white/85">mastery</strong>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              <Link 
                href="/work"
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded-sm overflow-hidden"
              >
                <span className="relative z-10">Explore Work</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-[#C2A370] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-3.5 pt-8 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="flex flex-col gap-3.5"
            >
              {/* Card 1: Resolve */}
              <div 
                id="hero-card-resolve"
                className="p-5 bg-white/[0.02] border border-white/10 hover:border-[#C2A370]/40 rounded-xl backdrop-blur-sm relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C2A370]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
                  <h3 className="font-[family-name:var(--font-cormorant)] font-serif italic font-medium text-2xl sm:text-[27px] leading-none tracking-wide text-white/95 group-hover:text-[#C2A370] transition-colors duration-300">
                    Resolve
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C2A370]/40 group-hover:bg-[#C2A370] transition-colors" />
                </div>
                <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-light relative z-10 group-hover:text-white/70 transition-colors">
                  Complex problems rarely yield on the first attempt. Progress is earned through iteration.
                </p>
              </div>

              {/* Card 2: Curiosity */}
              <div 
                id="hero-card-curiosity"
                className="p-5 bg-white/[0.02] border border-white/10 hover:border-[#C2A370]/40 rounded-xl backdrop-blur-sm relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C2A370]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
                  <h3 className="font-[family-name:var(--font-cormorant)] font-serif italic font-medium text-2xl sm:text-[27px] leading-none tracking-wide text-white/95 group-hover:text-[#C2A370] transition-colors duration-300">
                    Curiosity
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C2A370]/40 group-hover:bg-[#C2A370] transition-colors" />
                </div>
                <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-light relative z-10 group-hover:text-white/70 transition-colors">
                  Every project begins with a question worth chasing.
                </p>
              </div>

              {/* Card 3: Craft */}
              <div 
                id="hero-card-craft"
                className="p-5 bg-white/[0.02] border border-white/10 hover:border-[#C2A370]/40 rounded-xl backdrop-blur-sm relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C2A370]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center justify-between gap-3 mb-2 relative z-10">
                  <h3 className="font-[family-name:var(--font-cormorant)] font-serif italic font-medium text-2xl sm:text-[27px] leading-none tracking-wide text-white/95 group-hover:text-[#C2A370] transition-colors duration-300">
                    Craft
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C2A370]/40 group-hover:bg-[#C2A370] transition-colors" />
                </div>
                <p className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-light relative z-10 group-hover:text-white/70 transition-colors">
                  Thoughtful systems, clean interfaces, and details that reveal themselves over time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
