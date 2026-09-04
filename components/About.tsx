"use client";

import { Reveal } from "./Reveal";
import { Camera, Code, Cpu, Gamepad2, Guitar } from "lucide-react";

export function About() {
  const interests = [
    { icon: Cpu, label: "Electronics" },
    { icon: Code, label: "Development" },
    { icon: Guitar, label: "Music" },
    { icon: Camera, label: "Photography" },
    { icon: Gamepad2, label: "Gaming" },
  ];

  return (
    <section id="about" className="py-24 md:py-40 relative border-t border-white/5 overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C2A370]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 md:px-12 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-[#C2A370]"></div>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C2A370]">The Narrative</span>
              </div>
              <h2 className="text-[40px] sm:text-[50px] md:text-[60px] font-light leading-[1.1] tracking-[-0.02em] text-white">
                Engineering <br className="hidden md:block" />
                the future, <br className="hidden md:block" />
                <span className="text-white/40 italic font-serif">one circuit</span> at a time.
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 space-y-12 lg:pt-12">
            <Reveal delay={0.1}>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 text-xl font-light leading-relaxed mb-6">
                  I am an Electronics and Communication Engineering student at SRM Institute of Science and Technology. My journey began with a deep-seated curiosity about the inner workings of technology—a drive to understand the systems that power our world.
                </p>
                <p className="text-white/50 text-lg font-light leading-relaxed mb-6">
                  With hands-on experience designing Arduino-based projects and analog circuits, I have cultivated a strong foundation in embedded systems. This hardware knowledge doesn&apos;t exist in a vacuum; it is deeply intertwined with my proficiency in Python, Java, and C. I believe the most elegant solutions emerge when hardware and software are designed to speak the same language seamlessly.
                </p>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  Beyond breadboards and code editors, I am a creator at heart. Whether I&apos;m coordinating a team project, strumming a guitar, framing a photograph, or getting lost in a good book, I approach life with the same meticulous attention to detail and creative problem-solving that I apply to engineering.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors duration-500">
                  <div className="text-4xl font-light text-white mb-2">ECE</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Discipline</div>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors duration-500">
                  <div className="text-4xl font-light text-white mb-2">2029</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Graduation</div>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors duration-500">
                  <div className="text-4xl font-light text-white mb-2">India</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Location</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-12 border-t border-white/5">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">Interests & Pursuits</h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                      <item.icon className="w-4 h-4 text-white/40" />
                      <span className="font-light">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
