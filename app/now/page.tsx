import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { currentlyItems, personalInfo } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Now",
  description:
    "A living personal status page showing what Vikraman V. is currently studying, building, researching, learning, and exploring.",
};

export default function NowPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="relative min-h-screen pt-24 sm:pt-28 pb-20 sm:pb-24 flex flex-col"
      >
        <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10 flex-grow max-w-4xl">
          <div className="flex flex-col mb-6 sm:mb-8">
            <BackButton fallback="/" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Now" },
              ]}
            />
          </div>

          {/* Editorial Header */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              <span className="text-primary">03 · Living Status Log (/now)</span>
              <span>LOC: {personalInfo.location}</span>
            </div>

            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-4 leading-[1.04]">
              What I’m focused on{" "}
              <span className="italic text-primary">right now.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Inspired by Derek Sivers’{" "}
              <span className="font-mono text-xs text-foreground">/now</span> page movement
              and personal digital notebooks, this page is a snapshot of what I’m currently
              studying at SRM IST, building on the workbench, researching, and exploring off-hours.
            </p>
          </header>

          {/* Verified Currently Items List */}
          <section aria-label="Current focus areas" className="divide-y divide-border border-y border-border">
            {currentlyItems.map((item, idx) => (
              <article
                key={item.id}
                className="py-7 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                {/* Left Column: Category & Code */}
                <div className="md:col-span-4 space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-primary font-semibold">{item.code}</span>
                    <span className="text-border">/</span>
                    <span className="text-muted-foreground">0{idx + 1}</span>
                  </div>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-normal text-foreground tracking-tight">
                    {item.category}
                  </h2>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground pt-1">
                    {item.meta}
                  </div>
                </div>

                {/* Right Column: Activity Title, Description & Optional Link */}
                <div className="md:col-span-8 space-y-2.5">
                  <h3 className="text-base sm:text-lg font-medium text-foreground">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="hover:text-primary transition-colors inline-flex items-baseline gap-1.5"
                      >
                        <span>{item.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-primary shrink-0 translate-y-0.5" />
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* Bottom Cross-Links */}
          <div className="mt-12 p-5 sm:p-6 rounded-sm bg-card/70 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                SOURCE DATA · LIB/DATA.TS
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Want to inspect the full engineering archive or read my technical field notes?
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-sm bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] font-medium hover:opacity-90 transition-opacity"
              >
                <span>Explore Works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-sm border border-border bg-background hover:border-primary/60 text-foreground font-mono text-xs uppercase tracking-[0.14em] transition-colors"
              >
                <span>About &amp; Stack</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
