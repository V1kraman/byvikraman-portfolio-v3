"use client";

import { Reveal } from "./Reveal";
import { ArrowUpRight, ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Post } from "@/lib/content/mdx";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface ProjectsProps {
  projects: Post[];
  viewAllLink?: string;
  viewAllText?: string;
}

export function Projects({ projects, viewAllLink, viewAllText = "Explore All Work" }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-white/5">
      <div className="container px-8 md:px-12 mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C2A370] mb-4">Selected Work</h2>
            <div className="text-[40px] md:text-[50px] font-light tracking-[-0.02em] text-white">
              Featured Projects
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.1}>
              <Link 
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full bg-[#ffffff03] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/30">
                      0{idx + 1}
                    </span>
                    {project.status && (
                      <ProjectStatusBadge status={project.status} size="sm" />
                    )}
                  </div>

                  {project.image && (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 border border-white/5 bg-[#1a1a1e]">
                      <div className="absolute inset-0 bg-white/5 animate-pulse" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 tracking-[-0.01em] group-hover:text-[#C2A370] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/50 text-base leading-relaxed font-light mb-8 flex-grow">
                    {project.summary}
                  </p>
                  
                  <ul className="flex flex-wrap gap-2 mb-8">
                    {project.tech && project.tech.map((tech) => (
                      <li key={tech} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-sm text-[10px] uppercase tracking-widest font-medium text-white/50">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                    <span className="text-xs uppercase tracking-widest font-semibold text-white">View Project</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#C2A370] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {viewAllLink && (
          <Reveal delay={0.2}>
            <div className="mt-16 flex justify-center">
              <Link 
                href={viewAllLink}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
