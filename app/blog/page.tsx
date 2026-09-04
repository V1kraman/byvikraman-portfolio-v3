import { getAllPosts } from "@/lib/content/mdx";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Code2, PenTool } from "lucide-react";
import { format, parseISO } from "date-fns";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export const metadata = {
  title: "Journal & Archive | Vikraman V",
  description: "Writing about software, hardware, design, and selected project case studies.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen pt-32 pb-24 flex flex-col">
      <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow">
        
        <div className="flex flex-col mb-8">
          <BackButton fallback="/" />
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Journal & Archive" }
            ]} 
          />
        </div>

        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#C2A370]"></div>
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C2A370]">Journal & Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-white mb-6">
            Work & Thoughts.
          </h1>
          <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed">
            A unified collection of technical articles, design reflections, and deep dives into my selected engineering projects.
          </p>
        </div>

        {/* Unified Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-[#ffffff03] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-white/40">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.date}>
                        {format(parseISO(post.date), "MMM d, yyyy")}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className={`px-2.5 py-1 rounded-sm text-[9px] uppercase tracking-widest font-medium flex items-center gap-1.5 ${post.type === 'project' ? 'bg-[#C2A370]/10 text-[#C2A370]' : 'bg-white/10 text-white/70'}`}>
                    {post.type === 'project' ? <Code2 className="w-3 h-3" /> : <PenTool className="w-3 h-3" />}
                    {post.type}
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 tracking-[-0.01em] group-hover:text-[#C2A370] transition-colors duration-300">
                  {post.title}
                </h2>
                
                <p className="text-white/50 text-base leading-relaxed font-light mb-8 flex-grow">
                  {post.summary}
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                  <span className="text-xs uppercase tracking-widest font-semibold text-white">
                    {post.type === 'project' ? 'View Project' : 'Read Article'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#C2A370] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
