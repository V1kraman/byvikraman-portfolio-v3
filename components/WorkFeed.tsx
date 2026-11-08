"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { WorkCard } from "./WorkCard";
import type { Post } from "@/lib/content/mdx";
import { AnimatePresence } from "motion/react";

interface WorkFeedProps {
  initialPosts: Post[];
}

export function WorkFeed({ initialPosts }: WorkFeedProps) {
  const [selectedType, setSelectedType] = useState<"all" | "project" | "article">("all");

  // Counts for each type
  const projectsCount = useMemo(
    () => initialPosts.filter((p) => p.type === "project").length,
    [initialPosts]
  );
  const articlesCount = useMemo(
    () => initialPosts.filter((p) => p.type === "article").length,
    [initialPosts]
  );

  // Filter posts based on selected type
  const filteredPosts = useMemo(() => {
    if (selectedType === "all") return initialPosts;
    return initialPosts.filter((post) => post.type === selectedType);
  }, [initialPosts, selectedType]);

  const resetFilters = () => {
    setSelectedType("all");
  };

  return (
    <section aria-labelledby="archive-heading" className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        {/* Total Works Counter / Section Label */}
        <div className="flex items-center gap-3">
          <h2 id="archive-heading" className="text-xs uppercase tracking-[0.25em] font-semibold text-foreground">
            Archive
          </h2>
          <span className="text-border text-xs">•</span>
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {selectedType === "all"
              ? `${initialPosts.length} Total Works`
              : `${filteredPosts.length} of ${initialPosts.length} Works`}
          </span>
        </div>

        {/* Content Type Filter Controls & Clear Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-xl">
            <button
              id="work-filter-all"
              onClick={() => setSelectedType("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({initialPosts.length})
            </button>
            <button
              id="work-filter-projects"
              onClick={() => setSelectedType("project")}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedType === "project"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects ({projectsCount})
            </button>
            <button
              id="work-filter-articles"
              onClick={() => setSelectedType("article")}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedType === "article"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles ({articlesCount})
            </button>
          </div>

          {selectedType !== "all" && (
            <button
              id="work-filter-clear"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider text-primary hover:text-foreground bg-card hover:bg-secondary border border-primary/40 transition-all font-medium whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Feed Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <WorkCard key={post.slug} item={post} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-border rounded-2xl bg-card/50">
          <h3 className="text-lg font-light text-foreground mb-2 tracking-tight">
            No matching work found
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
            No {selectedType === "project" ? "projects" : "articles"} available in this section.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 bg-primary hover:opacity-90 text-primary-foreground text-xs uppercase tracking-widest font-semibold rounded-lg transition-all"
          >
            Clear Filter
          </button>
        </div>
      )}
    </section>
  );
}
