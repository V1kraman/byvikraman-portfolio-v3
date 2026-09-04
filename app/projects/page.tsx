import { getAllPosts } from "@/lib/content/mdx";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata = {
  title: "Projects | Vikraman V",
  description: "A showcase of my hardware and software engineering projects.",
};

export default function ProjectsIndex() {
  const projects = getAllPosts().filter((post) => post.type === "project");

  return (
    <main className="relative min-h-screen pt-32 pb-24 flex flex-col">
      <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow">
        
        <div className="flex flex-col mb-8">
          <BackButton fallback="/" />
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Projects" }
            ]} 
          />
        </div>

        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#C2A370]"></div>
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C2A370]">Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-white mb-6">
            Selected Works.
          </h1>
          <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed">
            An archive of my engineering projects, spanning from low-level embedded hardware and analog circuits to modern software applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <div key={project.slug}>
              <Link 
                href={`/blog/${project.slug}`}
                className="group flex flex-col h-full bg-[#ffffff03] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
