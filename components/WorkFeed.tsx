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

  const projectsCount = useMemo(
    () => initialPosts.filter((p) => p.type === "project").length,
    [initialPosts]
  );
  const articlesCount = useMemo(
    () => initialPosts.filter((p) => p.type === "article").length,
    [initialPosts]
  );

  const filteredPosts = useMemo(() => {
    if (selectedType === "all") return initialPosts;
    return initialPosts.filter((post) => post.type === selectedType);
  }, [initialPosts, selectedType]);

  const resetFilters = () => {
    setSelectedType("all");
  };

  return (
    <section aria-labelledby="archive-heading" className="flex flex-col gap-8">
      {/* Instrument-Panel Filter Console */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          <h2 id="archive-heading" className="uppercase tracking-[0.2em] font-semibold text-foreground">
            MODULE CATALOGUE
          </h2>
          <span className="text-border">•</span>
          <span className="uppercase tracking-wider text-muted-foreground">
            {selectedType === "all"
              ? `${initialPosts.length} TOTAL ENTRIES`
              : `${filteredPosts.length} OF ${initialPosts.length} SHOWN`}
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-background/80 border border-border rounded-lg font-mono">
            <button
              id="work-filter-all"
              type="button"
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              [ ALL · {initialPosts.length} ]
            </button>
            <button
              id="work-filter-projects"
              type="button"
              onClick={() => setSelectedType("project")}
              className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedType === "project"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              [ PROJECTS (U) · {projectsCount} ]
            </button>
            <button
              id="work-filter-articles"
              type="button"
              onClick={() => setSelectedType("article")}
              className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedType === "article"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              [ FIELD NOTES (FN) · {articlesCount} ]
            </button>
          </div>

          {selectedType !== "all" && (
            <button
              id="work-filter-clear"
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider text-primary hover:text-foreground bg-background hover:bg-secondary border border-primary/40 transition-all font-medium whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Feed Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <WorkCard key={post.slug} item={post} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-border rounded-xl bg-card/50">
          <h3 className="font-mono text-base uppercase tracking-widest text-foreground mb-2">
            NO MATCHING MODULES FOUND
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
            No {selectedType === "project" ? "projects" : "field notes"} available under the active filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 bg-primary hover:opacity-90 text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold rounded-md transition-all"
          >
            [ RESET FILTER ]
          </button>
        </div>
      )}
    </section>
  );
}
