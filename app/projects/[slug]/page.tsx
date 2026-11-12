import { getAllPosts, getRelatedContent } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Cpu,
  Github,
  ExternalLink,
  BookOpen,
  UserCheck,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { Markdown } from "@/components/Markdown";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReadingProgress } from "@/components/navigation/ReadingProgress";
import { BackToTop } from "@/components/navigation/BackToTop";
import { RelatedContent } from "@/components/RelatedContent";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function extractHeadings(markdown: string): Array<{ id: string; text: string; level: 2 | 3 }> {
  const lines = markdown.split("\n");
  const results: Array<{ id: string; text: string; level: 2 | 3 }> = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (match) {
      const level = match[1].length as 2 | 3;
      const rawText = match[2].replace(/[`*_~]/g, "").trim();
      const id = rawText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      if (id && rawText) {
        results.push({ id, text: rawText, level });
      }
    }
  }
  return results;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);

  if (!post) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${post.title} — Case Study`,
    description: post.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedItems = getRelatedContent(post, allPosts);
  const headings = extractHeadings(post.content);

  let formattedDate = "";
  try {
    if (post.date) {
      formattedDate = format(parseISO(post.date), "MMMM d, yyyy");
    }
  } catch {
    formattedDate = post.date;
  }

  const refCode = post.refId || "U1";
  const techList =
    post.tech && post.tech.length > 0 ? post.tech : post.tags || [];

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <BackToTop />
      <main
        id="main-content"
        className="relative min-h-screen pt-24 sm:pt-28 pb-20 sm:pb-24 flex flex-col"
      >
        <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10 flex-grow max-w-5xl">
          <div className="flex flex-col mb-6 sm:mb-8">
            <BackButton fallback="/work" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Works", href: "/work" },
                { label: post.title },
              ]}
            />
          </div>

          <article>
            {/* Karthick-Inspired Engineering Case Study Dossier Header */}
            <header className="mb-10 sm:mb-14 pb-8 sm:pb-10 border-b border-border">
              {/* Top Identification Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-border font-mono text-xs">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-[family-name:var(--font-antonio)] text-xl tracking-[0.06em] px-2.5 py-0.5 rounded-sm bg-primary text-primary-foreground font-semibold">
                    {refCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-card border border-border text-muted-foreground uppercase tracking-[0.14em] text-[10px] inline-flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-primary shrink-0" />
                    <span>{post.category || "ENGINEERING CASE STUDY"}</span>
                  </span>
                  {post.status && <ProjectStatusBadge status={post.status} size="md" />}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {formattedDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                      <time dateTime={post.date}>{formattedDate}</time>
                    </div>
                  )}
                  {post.readingTime && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{post.readingTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dossier Title & Overview */}
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-5 leading-[1.06] text-balance">
                {post.title}
              </h1>

              {post.summary && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  {post.summary}
                </p>
              )}

              {/* Main Project Image / Visual Preview (when available) */}
              {post.image && (
                <div className="relative aspect-[16/9] w-full mb-8 rounded-sm overflow-hidden border border-border bg-surface">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    referrerPolicy="no-referrer"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm bg-background/90 border border-border font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">
                    {refCode} · HARDWARE / PROTOTYPE DOCUMENTATION
                  </div>
                </div>
              )}

              {/* Structured Engineering Metadata Table */}
              <div className="rounded-sm bg-card border border-border overflow-hidden divide-y divide-border/80">
                {/* Honest Personal Role vs. Team Work Attribution */}
                {post.role && (
                  <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 bg-primary/[0.05]">
                    <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary font-semibold shrink-0 sm:w-44">
                      <UserCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>PERSONAL ROLE &amp; SCOPE</span>
                    </div>
                    <div className="text-xs sm:text-sm text-foreground font-normal leading-relaxed">
                      {post.role}
                    </div>
                  </div>
                )}

                {post.subsystem && (
                  <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0 sm:w-44">
                      SUBSYSTEM / ARCHITECTURE
                    </div>
                    <div className="font-mono text-xs text-foreground/90 break-words">
                      {post.subsystem}
                    </div>
                  </div>
                )}

                {techList.length > 0 && (
                  <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0 sm:w-44 pt-1">
                      TECHNOLOGIES
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {techList.map((t) => (
                        <li
                          key={t}
                          className="px-2.5 py-1 bg-surface border border-border rounded-sm font-mono text-[10px] uppercase tracking-[0.08em] text-foreground/85"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(post.github || post.demo || post.docs) && (
                  <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface/50">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      VERIFICATION &amp; ARTIFACTS
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {post.docs && (
                        <a
                          href={post.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-[38px] bg-card hover:bg-secondary transition-colors rounded-sm font-mono text-xs text-foreground border border-border hover:border-primary/50"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Documentation</span>
                        </a>
                      )}
                      {post.github && (
                        <a
                          href={post.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-[38px] bg-card hover:bg-secondary transition-colors rounded-sm font-mono text-xs text-foreground border border-border hover:border-primary/50"
                        >
                          <Github className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Source Repository</span>
                        </a>
                      )}
                      {post.demo && (
                        <a
                          href={post.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[38px] bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-sm font-mono text-xs font-medium"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span>Live Demo / Tool</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Compact Section Outline for Longer Case Studies */}
              {headings.filter((h) => h.level === 2).length >= 3 && (
                <nav
                  aria-label="Case study sections"
                  className="mt-6 p-4 sm:p-5 rounded-sm bg-surface/60 border border-border"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-2.5">
                    DOSSIER SECTIONS
                  </div>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 font-mono text-xs">
                    {headings
                      .filter((h) => h.level === 2)
                      .map((h, i) => (
                        <li key={h.id} className="truncate">
                          <a
                            href={`#${h.id}`}
                            className="text-muted-foreground hover:text-primary transition-colors inline-flex items-baseline gap-2"
                          >
                            <span className="text-[10px] text-primary/80">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="truncate">{h.text}</span>
                          </a>
                        </li>
                      ))}
                  </ol>
                </nav>
              )}
            </header>

            {/* Case Study Markdown Content */}
            <div
              className="prose prose-base sm:prose-lg max-w-3xl mx-auto
              prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:font-[family-name:var(--font-cormorant)] prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 sm:prose-h2:mt-16 prose-h2:mb-5 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-9 prose-h3:mb-3
              prose-p:text-foreground/85 prose-p:leading-[1.8] prose-p:font-normal
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-medium
              prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-[0.86em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-pre:border prose-pre:border-border prose-pre:rounded-sm
              prose-blockquote:border-l-primary prose-blockquote:bg-card/70 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-sm prose-blockquote:text-muted-foreground prose-blockquote:font-serif prose-blockquote:italic
              prose-li:text-foreground/85
              prose-img:rounded-sm prose-img:border prose-img:border-border"
            >
              <Markdown content={post.content} />
            </div>

            {/* Footer Back to Works Link */}
            <div className="mt-14 pt-8 border-t border-border flex items-center justify-between">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-primary hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Works (/work)</span>
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                END OF DOSSIER · {refCode}
              </span>
            </div>
          </article>

          {/* Related Projects & Articles */}
          <RelatedContent currentPost={post} relatedItems={relatedItems} />
        </div>
      </main>
      <Footer />
    </>
  );
}
