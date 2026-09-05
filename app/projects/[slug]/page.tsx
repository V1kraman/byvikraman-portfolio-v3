import { getAllPosts, getRelatedContent } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import { Calendar, Clock, Code2, Github, ExternalLink, CheckCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Markdown } from "@/components/Markdown";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReadingProgress } from "@/components/navigation/ReadingProgress";
import { RelatedContent } from "@/components/RelatedContent";
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

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <main className="relative min-h-screen pt-32 pb-24 flex flex-col">
        <div className="container px-6 md:px-12 mx-auto relative z-10 flex-grow max-w-4xl">
          
          <div className="flex flex-col mb-8">
            <BackButton fallback="/work" />
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: post.title }
              ]} 
            />
          </div>

          <article>
            {/* Project Header */}
            <header className="mb-16 border-b border-white/5 pb-16">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5 bg-[#C2A370]/10 text-[#C2A370] border border-[#C2A370]/25">
                    <Code2 className="w-3 h-3" />
                    <span>Project Case Study</span>
                  </div>

                  {post.status && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      {post.status}
                    </span>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-white/[0.04] text-white/60 text-[10px] uppercase tracking-widest font-medium rounded-sm border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-white mb-8 leading-[1.1]">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-widest text-white/40 mb-8">
                {formattedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C2A370]" />
                    <time dateTime={post.date}>{formattedDate}</time>
                  </div>
                )}
                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C2A370]" />
                    <span>{post.readingTime}</span>
                  </div>
                )}
              </div>

              {/* Technologies & Links */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/5">
                {post.tech && post.tech.length > 0 && (
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Technologies</div>
                    <ul className="flex flex-wrap gap-2">
                      {post.tech.map((t) => (
                        <li key={t} className="px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-sm text-[10px] text-white/70">{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(post.github || post.demo) && (
                  <div className="flex flex-wrap gap-4 items-start sm:self-end">
                    {post.github ? (
                      <a href={post.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-sm text-xs font-medium text-white border border-white/10">
                        <Github className="w-4 h-4" /> Repository
                      </a>
                    ) : null}
                    {post.demo ? (
                      <a href={post.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#C2A370] text-black hover:bg-[#C2A370]/90 transition-colors rounded-sm text-xs font-semibold">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </header>

            {/* Markdown Content */}
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-light prose-headings:tracking-[-0.02em] prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-light
              prose-a:text-[#C2A370] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-medium
              prose-code:text-[#C2A370] prose-code:bg-white/[0.03] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0A0A0C] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-blockquote:border-l-[#C2A370] prose-blockquote:bg-white/[0.02] prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-white/60 prose-blockquote:font-serif prose-blockquote:italic
              prose-li:text-white/70 prose-li:font-light
              prose-img:rounded-xl prose-img:border prose-img:border-white/5">
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
