"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { WorkCard } from "./WorkCard";
import type { Post } from "@/lib/content/mdx";

interface RelatedContentProps {
  currentPost: Post;
  relatedItems: Post[];
}

export function RelatedContent({ currentPost, relatedItems }: RelatedContentProps) {
  if (!relatedItems || relatedItems.length === 0) {
    return null;
  }

  const isProject = currentPost.type === "project";
  const sectionTitle = isProject ? "Related Articles & Reflections" : "Related Projects & Builds";
  const sectionDescription = isProject
    ? "Explore technical articles documenting the theories, architecture, and lessons learned."
    : "Explore real-world projects and hardware prototypes that bring these concepts to life.";

  return (
    <section aria-labelledby="related-content-heading" className="mt-24 pt-16 border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A370]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C2A370]">
              Connected Knowledge
            </span>
          </div>
          <h2 id="related-content-heading" className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-sm text-white/50 font-light mt-1 max-w-xl">
            {sectionDescription}
          </p>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-[#C2A370] transition-colors shrink-0"
        >
          <span>Browse All Work</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedItems.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
