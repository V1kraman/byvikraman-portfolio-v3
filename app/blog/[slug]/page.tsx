import { getAllPosts, getRelatedContent } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, List } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Markdown } from "@/components/Markdown";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReadingProgress } from "@/components/navigation/ReadingProgress";
import { BackToTop } from "@/components/navigation/BackToTop";
import { RelatedContent } from "@/components/RelatedContent";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

interface BlogPostPageProps {
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

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedItems = getRelatedContent(post, allPosts);
  const headings = extractHeadings(post.content);
  const refCode = post.refId || (post.type === "project" ? "U1" : "FN1");
  const tagsList =
    post.tags && post.tags.length > 0 ? post.tags : post.tech || [];

  let formattedDate = "";
  try {
    if (post.date) {
      formattedDate = format(parseISO(post.date), "MMMM d, yyyy");
    }
  } catch {
    formattedDate = post.date;
  }

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <BackToTop />
      <main
        id="main-content"
        className="relative min-h-screen pt-24 sm:pt-28 pb-20 sm:pb-24 flex flex-col"
      >
        <div className="container px-4 sm:px-6 md:px-12 mx-auto relative z-10 flex-grow max-w-3xl">
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
            {/* Technical-Notebook Reading Header (Warm Editorial, Not Forced Datasheet) */}
            <header className="mb-10 sm:mb-12 pb-8 border-b border-border">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-4">
                <span className="text-primary font-semibold">{refCode}</span>
                <span className="text-border">·</span>
                <span>{post.category || "FIELD NOTE & ESSAY"}</span>
                {formattedDate && (
                  <>
                    <span className="text-border">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-primary" />
                      <time dateTime={post.date}>{formattedDate}</time>
                    </span>
                  </>
                )}
                {post.readingTime && (
                  <>
                    <span className="text-border">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{post.readingTime}</span>
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-foreground mb-5 leading-[1.08] text-balance">
                {post.title}
              </h1>

              {post.summary && (
                <p className="text-base sm:text-lg text-muted-foreground leading-[1.75] mb-6">
                  {post.summary}
                </p>
              )}

              {tagsList.length > 0 && (
                <ul className="flex flex-wrap gap-1.5" aria-label="Article tags">
                  {tagsList.map((tag) => (
                    <li
                      key={tag}
                      className="px-2.5 py-0.5 rounded-sm bg-surface border border-border font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/85"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </header>

            {/* Table of Contents for Longer Articles */}
            {headings.length >= 2 && (
              <nav
                aria-label="Table of contents"
                className="mb-10 p-5 rounded-sm bg-card/70 border border-border"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-3">
                  <List className="w-3.5 h-3.5" />
                  <span>Table of Contents</span>
                </div>
                <ol className="space-y-2 font-mono text-xs">
                  {headings.map((heading, idx) => (
                    <li
                      key={`${heading.id}-${idx}`}
                      className={heading.level === 3 ? "pl-5" : ""}
                    >
                      <a
                        href={`#${heading.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-baseline gap-2.5"
                      >
                        <span className="text-[10px] text-primary/80">
                          {heading.level === 2
                            ? String(idx + 1).padStart(2, "0")
                            : "↳"}
                        </span>
                        <span className="font-sans text-xs sm:text-sm text-foreground/90 hover:text-primary">
                          {heading.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Comfortable Technical-Notebook Prose Width */}
            <div
              className="prose prose-base sm:prose-lg max-w-none
              prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:font-[family-name:var(--font-cormorant)] prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 sm:prose-h2:mt-14 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2.5
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground/85 prose-p:leading-[1.85] prose-p:font-normal
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-medium
              prose-code:text-primary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-mono prose-code:text-[0.86em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-pre:border prose-pre:border-border prose-pre:rounded-sm
              prose-blockquote:border-l-primary prose-blockquote:bg-card/60 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-sm prose-blockquote:text-muted-foreground prose-blockquote:font-serif prose-blockquote:italic
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
                FIELD NOTE · {refCode}
              </span>
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
