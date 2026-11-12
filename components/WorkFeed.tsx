"use client";

import { useState, useMemo, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { WorkCard } from "./WorkCard";
import type { Post } from "@/lib/content/mdx";
import { AnimatePresence } from "motion/react";

interface WorkFeedProps {
  initialPosts: Post[];
}

const FILTER_TABS: Array<{ id: "all" | "project" | "article"; label: string }> = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "article", label: "Articles" },
];

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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = FILTER_TABS.findIndex((t) => t.id === selectedType);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = FILTER_TABS[(currentIndex + 1) % FILTER_TABS.length];
      setSelectedType(next.id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = FILTER_TABS[(currentIndex - 1 + FILTER_TABS.length) % FILTER_TABS.length];
      setSelectedType(prev.id);
    }
  };

  return (
    <section aria-labelledby="archive-heading" className="flex flex-col gap-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
          <h2
            id="archive-heading"
            className="uppercase tracking-[0.18em] font-medium text-foreground"
          >
            Index Directory
          </h2>
          <span className="text-border">/</span>
          <span className="uppercase tracking-[0.12em] text-muted-foreground text-[11px]">
            {selectedType === "all"
              ? `${initialPosts.length} Entries (${projectsCount} Projects · ${articlesCount} Articles)`
              : `${filteredPosts.length} of ${initialPosts.length} Shown`}
          </span>
        </div>

        {/* Keyboard-Accessible Category Filter Tabs: All / Projects / Articles */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div
            role="tablist"
            aria-label="Filter works by category"
            onKeyDown={handleKeyDown}
            className="grid grid-cols-3 sm:inline-flex items-center p-1 bg-card border border-border rounded-sm font-mono w-full sm:w-auto"
          >
            <button
              id="work-filter-all"
              role="tab"
              aria-selected={selectedType === "all"}
              tabIndex={selectedType === "all" ? 0 : -1}
              type="button"
              onClick={() => setSelectedType("all")}
              className={`px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-sm text-[11px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                selectedType === "all"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({initialPosts.length})
            </button>
            <button
              id="work-filter-projects"
              role="tab"
              aria-selected={selectedType === "project"}
              tabIndex={selectedType === "project" ? 0 : -1}
              type="button"
              onClick={() => setSelectedType("project")}
              className={`px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-sm text-[11px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                selectedType === "project"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects ({projectsCount})
            </button>
            <button
              id="work-filter-articles"
              role="tab"
              aria-selected={selectedType === "article"}
              tabIndex={selectedType === "article" ? 0 : -1}
              type="button"
              onClick={() => setSelectedType("article")}
              className={`px-3.5 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-sm text-[11px] uppercase tracking-[0.14em] transition-colors whitespace-nowrap text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                selectedType === "article"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Articles ({articlesCount})
            </button>
          </div>

          {selectedType !== "all" && (
            <button
              id="work-filter-clear"
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[40px] sm:min-h-[34px] rounded-sm font-mono text-[11px] uppercase tracking-[0.12em] text-primary hover:text-foreground bg-card border border-border hover:border-primary/50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Editorial Index List */}
      {filteredPosts.length > 0 ? (
        <div className="divide-y divide-border border-b border-border">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <WorkCard key={post.slug} item={post} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-border rounded-sm bg-card/40">
          <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-foreground mb-2">
            No matching entries found
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mb-6 leading-relaxed">
            No {selectedType === "project" ? "projects" : "articles"} available under the active filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 bg-primary hover:opacity-90 text-primary-foreground font-mono text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-opacity cursor-pointer"
          >
            Show All Works
          </button>
        </div>
      )}
    </section>
  );
}
