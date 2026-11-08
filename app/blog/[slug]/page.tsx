import { getAllPosts, getRelatedContent } from "@/lib/content/mdx";
import { notFound } from "next/navigation";
import { Calendar, Clock, Code2, PenTool, Github, ExternalLink } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Markdown } from "@/components/Markdown";
import { BackButton } from "@/components/navigation/BackButton";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ReadingProgress } from "@/components/navigation/ReadingProgress";
import { RelatedContent } from "@/components/RelatedContent";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Contact";

interface BlogPostPageProps {
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

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  
  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | Vikraman V`,
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
              { 
                label: "Work", 
                href: "/work" 
              },
              { label: post.title }
            ]} 
          />
        </div>

        <article>
          {/* Post Header */}
          <header className="mb-16 border-b border-border pb-16">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/15 text-primary border border-primary/25 text-[10px] uppercase tracking-widest font-medium rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className={`px-2.5 py-1 rounded-sm text-[9px] uppercase tracking-widest font-medium flex items-center gap-1.5 border ${post.type === 'project' ? 'bg-primary/15 text-primary border-primary/30' : 'bg-secondary text-foreground/80 border-border'}`}>
                  {post.type === 'project' ? <Code2 className="w-3 h-3" /> : <PenTool className="w-3 h-3" />}
                  {post.type}
                </div>

                {post.status && (
                  <ProjectStatusBadge status={post.status} size="md" />
                )}
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-foreground mb-8 leading-[1.1]">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-widest text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <time dateTime={post.date}>
                  {format(parseISO(post.date), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Project Specific Metadata */}
            {post.type === 'project' && (
              <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-border">
                {post.tech && post.tech.length > 0 && (
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground/75 mb-3">Technologies</div>
                    <ul className="flex flex-wrap gap-2">
                      {post.tech.map(t => (
                        <li key={t} className="px-2 py-1 bg-secondary/60 border border-border rounded-sm text-[10px] text-foreground/85">{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(post.github || post.demo) && (
                  <div className="flex gap-4 items-start">
                    {post.github ? (
                      <a href={post.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-secondary transition-colors rounded-sm text-xs font-medium text-foreground border border-border">
                        <Github className="w-4 h-4 text-primary" /> Repository
                      </a>
                    ) : null}
                    {post.demo ? (
                      <a href={post.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-sm text-xs font-semibold">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none 
            prose-headings:font-light prose-headings:tracking-[-0.02em] prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-4
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
            prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:font-light
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-medium
            prose-code:text-primary prose-code:bg-secondary/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-obsidian prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-blockquote:border-l-primary prose-blockquote:bg-card/60 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-muted-foreground prose-blockquote:font-serif prose-blockquote:italic
            prose-li:text-foreground/80 prose-li:font-light
            prose-img:rounded-xl prose-img:border prose-img:border-border">
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
