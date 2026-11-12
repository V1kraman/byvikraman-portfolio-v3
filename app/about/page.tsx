import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact, Footer } from "@/components/Contact";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { personalInfo } from "@/lib/data";

export const metadata = {
  title: "About",
  description:
    "About Vikraman V. — Electronics and Communication Engineering undergraduate at SRM IST working across embedded hardware, firmware, and software.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative min-h-screen pt-24 sm:pt-28 flex flex-col">
        <div className="container px-4 sm:px-6 md:px-12 mx-auto">
          <div className="flex flex-col mb-4">
            <BackButton fallback="/" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About" },
              ]}
            />
          </div>

          <header className="pb-8 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-2">
                02 · Personal &amp; Engineering Dossier
              </div>
              <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.04]">
                About{" "}
                <span className="italic text-primary">Vikraman V.</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={personalInfo.resume}
                download="Vikraman_V_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[40px] rounded-sm bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.14em] font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Résumé</span>
              </a>
              <Link
                href="/now"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-sm border border-border bg-card hover:border-primary/60 text-foreground font-mono text-xs uppercase tracking-[0.14em] transition-colors"
              >
                <span>Living /now Page</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>
          </header>
        </div>

        <About />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
