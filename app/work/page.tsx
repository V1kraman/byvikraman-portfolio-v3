import { getAllPosts } from "@/lib/content/mdx";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WorkFeed } from "@/components/WorkFeed";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

export const metadata = {
  title: "Works Archive",
  description:
    "Unified editorial index of engineering projects (U1–U7) and technical articles & field notes (FN1–FN4) by Vikraman V.",
};

export default function WorkPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative min-h-screen pt-24 sm:pt-28 pb-20 sm:pb-24 flex flex-col"
      >
        <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10 flex-grow">
          {/* Navigation Bar & Breadcrumbs */}
          <div className="flex flex-col mb-6 sm:mb-8">
            <BackButton fallback="/" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Works" },
              ]}
            />
          </div>

          {/* Editorial Archive Header */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
                  01 · Works Index
                </div>

                <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-4 leading-[1.04]">
                  Projects, prototypes &amp;{" "}
                  <span className="italic text-primary">field notes.</span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  A unified index of hardware builds, embedded firmware experiments, and written
                  reflections. Engineering builds are catalogued as units (
                  <span className="font-mono text-xs text-primary">U1–U7</span>) alongside technical
                  articles and essays (
                  <span className="font-mono text-xs text-primary">FN1–FN4</span>).
                </p>
              </div>

              <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-6 font-mono text-xs space-y-1.5 text-muted-foreground">
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  ARCHIVE STRUCTURE
                </div>
                <p className="font-sans text-xs sm:text-sm text-foreground/85 leading-relaxed">
                  Projects open engineering case studies at{" "}
                  <code className="font-mono text-[11px] text-primary">/projects/[slug]</code>;
                  articles open technical notebook entries at{" "}
                  <code className="font-mono text-[11px] text-primary">/blog/[slug]</code>.
                </p>
              </div>
            </div>
          </header>

          {/* Interactive Editorial Index & Filter Console */}
          <WorkFeed initialPosts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
