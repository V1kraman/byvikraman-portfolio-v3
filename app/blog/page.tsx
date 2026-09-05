import { getAllPosts } from "@/lib/content/mdx";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WorkCard } from "@/components/WorkCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

export const metadata = {
  title: "Articles & Journal | Vikraman V",
  description: "Writing about software, hardware, design, and selected project case studies.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const articles = posts.filter((p) => p.type === "article");

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
                { label: "Articles" }
              ]} 
            />
          </div>

          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C2A370]"></div>
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C2A370]">Writing &amp; Guides</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-white mb-6">
              Articles &amp; Journal.
            </h1>
            <p className="text-lg text-white/50 font-light max-w-2xl leading-relaxed mb-8">
              Technical articles, design reflections, and deep dives into engineering problem solving.
            </p>

            {/* Unified Experience Notice */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white/60">
              <Sparkles className="w-4 h-4 text-[#C2A370]" />
              <span>Looking for engineering projects and hardware builds too?</span>
              <Link href="/work" className="text-[#C2A370] hover:underline font-semibold inline-flex items-center gap-1">
                <span>Explore the unified Work hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Unified Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {(articles.length > 0 ? articles : posts).map((post) => (
              <WorkCard key={post.slug} item={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

