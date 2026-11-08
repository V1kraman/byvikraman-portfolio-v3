"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  const sectionTitle = isProject
    ? "Connected Field Notes & Architecture Logs"
    : "Connected Hardware & Software Modules";
  const sectionDescription = isProject
    ? "Technical articles documenting the underlying engineering concepts, architecture decisions, and reflections."
    : "Engineered prototypes and builds that apply these principles on physical hardware.";

  return (
    <section aria-labelledby="related-content-heading" className="mt-20 pt-14 border-t-2 border-border">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary mb-2">
            {"/// CROSS-REFERENCED MODULES"}
          </div>
          <h2 id="related-content-heading" className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-sm text-muted-foreground font-light mt-1 max-w-xl">
            {sectionDescription}
          </p>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline shrink-0"
        >
          <span>[ BROWSE FULL WORKBENCH ]</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {relatedItems.map((item, idx) => (
          <WorkCard key={item.slug} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}
