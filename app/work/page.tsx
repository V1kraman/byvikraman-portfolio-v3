import { getAllPosts } from "@/lib/content/mdx";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WorkFeed } from "@/components/WorkFeed";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

export const metadata = {
  title: "Work Archive | Vikraman V",
  description:
    "A unified workbench archive of engineered project modules (U1–U6) and technical field notes (FN1–FN5).",
};

export default function WorkPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative min-h-screen pt-28 pb-24 flex flex-col">
        <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow">
          {/* Navigation Bar & Breadcrumbs */}
          <div className="flex flex-col mb-8">
            <BackButton fallback="/" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Work Archive" },
              ]}
            />
          </div>

          {/* Silkscreen Archive Header */}
          <header className="mb-12 md:mb-16 pb-8 border-b-2 border-primary/50">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-3">
                  {"/// WORKBENCH ARCHIVE · BILL OF MODULES & FIELD NOTES"}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-foreground mb-4 leading-tight">
                  Engineered Modules &amp;{" "}
                  <span className="font-[family-name:var(--font-cormorant)] italic text-primary font-normal">
                    Field Notes
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                  A single unified archive of everything I build on the bench and everything I document in writing. Projects are indexed as hardware/software units (<span className="font-mono text-xs text-primary">U1–Un</span>); articles and architectural essays are indexed as field notes (<span className="font-mono text-xs text-primary">FN1–FNn</span>).
                </p>
              </div>

              {/* Editorial Philosophy Box */}
              <div className="p-4 rounded-xl bg-card border border-border max-w-sm shrink-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-1.5">
                  SYSTEM PRINCIPLE
                </div>
                <p className="text-xs sm:text-sm font-light text-foreground/85 italic leading-relaxed">
                  &ldquo;Projects show what I built. Articles show what I learned. Both belong on the same workbench.&rdquo;
                </p>
              </div>
            </div>
          </header>

          {/* Interactive Work Feed */}
          <WorkFeed initialPosts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
