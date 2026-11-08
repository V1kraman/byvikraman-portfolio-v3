import { getAllPosts } from "@/lib/content/mdx";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WorkCard } from "@/components/WorkCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

export const metadata = {
  title: "Field Notes & Articles | Vikraman V",
  description: "Technical writing, architecture case studies, and engineering reflections.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const articles = posts.filter((p) => p.type === "article");

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative min-h-screen pt-28 pb-24 flex flex-col">
        <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow">
          <div className="flex flex-col mb-8">
            <BackButton fallback="/work" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: "Field Notes & Articles" },
              ]}
            />
          </div>

          {/* Silkscreen Header Section */}
          <header className="mb-12 md:mb-16 pb-8 border-b-2 border-primary/50">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-3">
              {`/// FIELD NOTES & JOURNAL · TECHNICAL WRITING (FN1–FN${articles.length})`}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.025em] text-foreground mb-4">
              Field Notes &amp;{" "}
              <span className="font-[family-name:var(--font-cormorant)] italic text-primary font-normal">
                Journal
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed mb-6">
              Architecture deep dives, hardware repair logs, design reflections, and notes from engineering workshops.
            </p>

            {/* Unified Experience Notice */}
            <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-lg bg-card border border-border font-mono text-xs text-muted-foreground">
              <FileText className="w-4 h-4 text-primary" />
              <span>Looking for hardware prototypes and firmware builds too?</span>
              <Link
                href="/work"
                className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>[ OPEN UNIFIED WORKBENCH ]</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </header>

          {/* Field Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {(articles.length > 0 ? articles : posts).map((post, idx) => (
              <WorkCard key={post.slug} item={post} index={idx} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
