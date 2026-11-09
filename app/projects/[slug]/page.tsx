import { getAllPosts, getRelatedContent } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import { Calendar, Clock, Cpu, Github, ExternalLink, BookOpen, UserCheck } from "lucide-react";
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
    return { title: "Project Not Found | Vikraman V" };
  }

  return {
    title: `${post.title} | Projects | Vikraman V`,
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

  let formattedDate = "";
  try {
    if (post.date) {
      formattedDate = format(parseISO(post.date), "MMMM d, yyyy");
    }
  } catch {
    formattedDate = post.date;
  }

  const refCode = post.refId || "U1";

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <BackToTop />
      <main id="main-content" className="relative min-h-screen pt-24 sm:pt-28 pb-20 sm:pb-24 flex flex-col">
        <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10 flex-grow max-w-4xl">
          <div className="flex flex-col mb-6 sm:mb-8">
            <BackButton fallback="/work" />
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: post.title },
              ]}
            />
          </div>

          <article>
            {/* Engineering Dossier Header */}
            <header className="mb-10 sm:mb-14 pb-8 sm:pb-10 border-b-2 border-primary/50">
              {/* Top Silkscreen Identification Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-border font-mono text-xs">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="px-2.5 py-1 rounded bg-primary text-primary-foreground font-semibold tracking-wider">
                    REFDES // {refCode}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-card border border-border text-muted-foreground uppercase tracking-widest text-[10px] inline-flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-primary shrink-0" />
                    <span>{post.category || "ENGINEERING DOSSIER"}</span>
                  </span>
                  {post.status && <ProjectStatusBadge status={post.status} size="md" />}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground">
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

              {/* Dossier Title & Executive Summary */}
              <h1 className="text-2xl sm:text-5xl md:text-6xl font-light tracking-[-0.025em] text-foreground mb-4 sm:mb-5 leading-[1.12] sm:leading-[1.08] text-balance">
                {post.title}
              </h1>

              {post.summary && (
                <p className="text-sm sm:text-lg text-muted-foreground font-light leading-relaxed mb-6">
                  {post.summary}
                </p>
              )}

              {/* Structured Engineering Dossier Specification Card */}
              <div className="rounded-xl bg-card border border-border overflow-hidden divide-y divide-border/80">
                {/* Role / Contribution Attribution Row (Honest Team vs. Individual distinction) */}
                {post.role && (
                  <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 bg-primary/[0.06]">
                    <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary font-semibold shrink-0 sm:w-40">
                      <UserCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>ROLE &amp; SCOPE</span>
                    </div>
                    <div className="text-xs sm:text-sm text-foreground font-normal leading-relaxed">
                      {post.role}
                    </div>
                  </div>
                )}

                {/* Subsystem / Architecture Line */}
                {post.subsystem && (
                  <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0 sm:w-40">
                      SIGNAL / SUBSYSTEM
                    </div>
                    <div className="font-mono text-xs text-foreground/90 break-words">
                      {post.subsystem}
                    </div>
                  </div>
                )}

                {/* Component & Protocol Tags */}
                {((post.tech && post.tech.length > 0) || (post.tags && post.tags.length > 0)) && (
                  <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shrink-0 sm:w-40 pt-1">
                      BILL OF TECH
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {(post.tech && post.tech.length > 0 ? post.tech : post.tags || []).map((t) => (
                        <li
                          key={t}
                          className="px-2.5 py-1 bg-background/80 border border-border rounded font-mono text-[10px] uppercase tracking-wider text-foreground/85"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* External Repository, Documentation & Live Tool Pads */}
                {(post.github || post.demo || post.docs) && (
                  <div className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-background/40">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      EXTERNAL ARTIFACTS &amp; VERIFICATION LINKS
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {post.docs ? (
                        <a
                          href={post.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-[42px] sm:min-h-[38px] bg-card hover:bg-secondary transition-colors rounded-md font-mono text-xs text-foreground border border-border hover:border-primary/50"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>[ DOCUMENTATION ]</span>
                        </a>
                      ) : null}
                      {post.github ? (
                        <a
                          href={post.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 min-h-[42px] sm:min-h-[38px] bg-card hover:bg-secondary transition-colors rounded-md font-mono text-xs text-foreground border border-border hover:border-primary/50"
                        >
                          <Github className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>[ SOURCE REPO ]</span>
                        </a>
                      ) : null}
                      {post.demo ? (
                        <a
                          href={post.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[42px] sm:min-h-[38px] bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-md font-mono text-xs font-semibold"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span>[ LIVE TOOL / DEMO ]</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Dossier Markdown Content */}
            <div
              className="prose prose-base sm:prose-lg max-w-none 
              prose-headings:font-light prose-headings:tracking-[-0.02em] prose-headings:text-foreground
              prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 sm:prose-h2:mt-16 prose-h2:mb-5 sm:prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3.5
              prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-10 sm:prose-h3:mt-12 prose-h3:mb-3.5
              prose-p:text-foreground/85 prose-p:leading-relaxed prose-p:font-light
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-medium
              prose-code:text-primary prose-code:bg-secondary/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.86em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-obsidian prose-pre:border prose-pre:border-border prose-pre:rounded-xl
              prose-blockquote:border-l-primary prose-blockquote:bg-card/70 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:text-muted-foreground prose-blockquote:font-serif prose-blockquote:italic
              prose-li:text-foreground/85 prose-li:font-light
              prose-img:rounded-xl prose-img:border prose-img:border-border"
            >
              <Markdown content={post.content} />
            </div>
          </article>

          {/* Related Content Section */}
          <RelatedContent currentPost={post} relatedItems={relatedItems} />
        </div>
      </main>
      <Footer />
    </>
  );
}
