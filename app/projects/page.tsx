import { getAllPosts } from "@/lib/content/mdx";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WorkCard } from "@/components/WorkCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

export const metadata = {
  title: "Projects | Vikraman V",
  description: "A showcase of my hardware and software engineering projects.",
};

export default function ProjectsIndex() {
  const projects = getAllPosts().filter((post) => post.type === "project");

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 flex flex-col">
        <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow">
          
          <div className="flex flex-col mb-8">
            <BackButton fallback="/work" />
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: "Projects" }
              ]} 
            />
          </div>

          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C2A370]"></div>
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C2A370]">Portfolio Archive</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-white mb-6">
              Selected Works.
            </h1>
            <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed mb-8">
              An archive of my engineering projects, spanning from low-level embedded hardware and analog circuits to modern software applications.
            </p>

            {/* Unified Experience Notice */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white/60">
              <Sparkles className="w-4 h-4 text-[#C2A370]" />
              <span>Looking for technical articles and written guides too?</span>
              <Link href="/work" className="text-[#C2A370] hover:underline font-semibold inline-flex items-center gap-1">
                <span>Explore the unified Work hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Unified Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project) => (
              <WorkCard key={project.slug} item={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

