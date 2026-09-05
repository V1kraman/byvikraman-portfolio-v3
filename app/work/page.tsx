import { getAllPosts } from "@/lib/content/mdx";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { WorkFeed } from "@/components/WorkFeed";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

export const metadata = {
  title: "Work | Vikraman V",
  description:
    "A unified archive of engineering projects and technical writing. Projects show what I built; articles show what I learned.",
};

export default function WorkPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 flex flex-col">
        <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow">
          
          {/* Navigation Bar & Breadcrumbs */}
          <div className="flex flex-col mb-8">
            <BackButton fallback="/" />
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Work" }
              ]} 
            />
          </div>

          {/* Hero Header */}
          <header className="mb-14 md:mb-20 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#C2A370]"></div>
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C2A370]">
                Engineering & Insights
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-[-0.03em] text-white mb-6 leading-tight">
              Work.
            </h1>

            <p className="text-lg sm:text-xl text-white/60 font-light leading-relaxed mb-6">
              A single unified archive of everything I build and everything I write.
            </p>

            {/* Editorial Philosophy Statement */}
            <div className="relative pl-6 py-2 border-l border-[#C2A370]/60 bg-white/[0.015] rounded-r-xl max-w-2xl">
              <p className="text-sm md:text-base font-light text-white/70 italic leading-relaxed">
                &ldquo;Projects show what I built. Articles show what I learned. Both belong together.&rdquo;
              </p>
            </div>
          </header>

          {/* Main Interactive Work Feed */}
          <WorkFeed initialPosts={posts} />

        </div>
      </main>
      <Footer />
    </>
  );
}
