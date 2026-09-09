"use client";

import { Reveal } from "./Reveal";
import { Camera, Code2, Cpu, Gamepad2, Guitar, LucideIcon } from "lucide-react";

interface InterestItem {
  icon: LucideIcon;
  label: string;
}

function InterestChip({ icon: Icon, label }: InterestItem) {
  return (
    <div className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-xs sm:text-[13px] text-white/75 hover:text-white hover:border-[#C2A370]/40 hover:bg-white/[0.06] transition-all duration-200 cursor-default select-none shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
      <Icon className="w-[17px] h-[17px] text-white/45 group-hover:text-[#C2A370] transition-colors duration-200 flex-shrink-0" />
      <span className="font-normal tracking-wide whitespace-nowrap">{label}</span>
    </div>
  );
}

export function About() {
  const interests: InterestItem[] = [
    { icon: Cpu, label: "Electronics" },
    { icon: Code2, label: "Development" },
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
                <p id="about-narrative-p1" className="text-white/70 text-xl font-light leading-relaxed mb-6">
                  I am an Electronics and Communication Engineering student at SRM Institute of Science and Technology, driven by a fascination with how ideas become tangible systems. Whether it&apos;s a line of code, an electronic circuit, or a carefully crafted interface, I&apos;m drawn to understanding how individual pieces come together to create something meaningful.
                </p>
                <p id="about-narrative-p2" className="text-white/50 text-lg font-light leading-relaxed mb-6">
                  My work spans software development, electronics, and modern web technologies, with each project becoming another opportunity to learn, experiment, and refine my craft. I enjoy building with intention, paying attention to the details that often go unnoticed but quietly shape the overall experience.
                </p>
                <p id="about-narrative-p3" className="text-white/50 text-lg font-light leading-relaxed mb-6">
                  Beyond engineering, I find inspiration in the things that reward patience and observation. You&apos;ll often find me with a guitar in hand, behind a camera, immersed in a good book, or exploring worlds that celebrate perseverance and thoughtful design. Those experiences influence the way I approach technology, reminding me that the best work is rarely rushed and that meaningful progress is built one deliberate step at a time.
                </p>
                <p id="about-narrative-p4" className="text-white/50 text-lg font-light leading-relaxed">
                  I don&apos;t see engineering as simply writing code or assembling circuits. For me, it&apos;s a lifelong pursuit of understanding, creating, and leaving every project better than the one before it.
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
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-6 font-medium">
                  Interests & Pursuits
                </h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((item) => (
                    <InterestChip key={item.label} icon={item.icon} label={item.label} />
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
