"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Cpu, Code2, Camera, Guitar } from "lucide-react";

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
              <span className="text-[11px] text-[#C2A370] uppercase tracking-[0.3em] font-medium">Software & Hardware</span>
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
              <p>
                An engineering student bridging the gap between <strong className="font-medium text-white/80">embedded systems</strong> and <strong className="font-medium text-white/80">modern software</strong>. Crafting digital experiences with precision and purpose.
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

          <div className="lg:col-span-4 flex flex-col justify-end gap-6 pt-12 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="flex flex-col gap-4"
            >
              <div className="p-6 bg-[#ffffff03] border border-white/5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 bg-white/5 rounded-lg text-white/70"><Cpu className="w-4 h-4" /></div>
                  <h3 className="text-xs uppercase tracking-widest text-white/70">Hardware</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed font-light relative z-10">
                  Arduino, Analog Circuits, PCB Design, Digital Logic, Sensors.
                </p>
              </div>

              <div className="p-6 bg-[#ffffff03] border border-white/5 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="p-2 bg-white/5 rounded-lg text-white/70"><Code2 className="w-4 h-4" /></div>
                  <h3 className="text-xs uppercase tracking-widest text-white/70">Software</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed font-light relative z-10">
                  Python, Java, C, Web Technologies, System Architecture.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
