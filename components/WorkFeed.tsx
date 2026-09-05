"use client";

import { useState, useMemo, useId } from "react";
import { Search, X, Sparkles, Filter } from "lucide-react";
import { WorkCard } from "./WorkCard";
import type { Post } from "@/lib/content/mdx";
import { motion, AnimatePresence } from "motion/react";

interface WorkFeedProps {
  initialPosts: Post[];
}

export function WorkFeed({ initialPosts }: WorkFeedProps) {
  const searchInputId = useId();
  const [selectedType, setSelectedType] = useState<"all" | "project" | "article">("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract featured items (intermixed projects and articles)
  const featuredItems = useMemo(() => {
    return initialPosts.filter((p) => p.featured);
  }, [initialPosts]);

  // Dynamically extract all available tags/tech from posts
  const dynamicTags = useMemo(() => {
    const tagSet = new Set<string>();
    
    // Desired core filters from requirements
    const standardTags = [
      "Embedded Systems",
      "Web Development",
      "AI",
      "Electronics",
      "Hardware",
      "Music",
      "Next.js",
      "Arduino",
      "Python",
      "C"
    ];

    // Collect tags from actual content
    initialPosts.forEach((post) => {
      post.tags?.forEach((t) => tagSet.add(t));
      post.tech?.forEach((t) => tagSet.add(t));
    });

    // Merge standard tags with dynamic ones while preserving case/neatness
    const merged = Array.from(tagSet);
    standardTags.forEach((s) => {
      const lower = s.toLowerCase();
      if (!merged.some((m) => m.toLowerCase() === lower)) {
        merged.push(s);
      }
    });

    return merged.sort((a, b) => a.localeCompare(b));
  }, [initialPosts]);

  // Filter posts based on type, tag, and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // 1. Filter by content type
      if (selectedType === "project" && post.type !== "project") return false;
      if (selectedType === "article" && post.type !== "article") return false;

      // 2. Filter by tag
      if (selectedTag !== "all") {
        const target = selectedTag.toLowerCase();
        const matchesTag = post.tags?.some((t) => t.toLowerCase() === target);
        const matchesTech = post.tech?.some((t) => t.toLowerCase() === target);
        const matchesTitleOrSummary =
          post.title.toLowerCase().includes(target) ||
          post.summary.toLowerCase().includes(target);

        if (!matchesTag && !matchesTech && !matchesTitleOrSummary) {
          return false;
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = post.title.toLowerCase().includes(query);
        const inSummary = post.summary.toLowerCase().includes(query);
        const inTags = post.tags?.some((t) => t.toLowerCase().includes(query));
        const inTech = post.tech?.some((t) => t.toLowerCase().includes(query));
        const inContent = post.content?.toLowerCase().includes(query);

        if (!inTitle && !inSummary && !inTags && !inTech && !inContent) {
          return false;
        }
      }

      return true;
    });
  }, [initialPosts, selectedType, selectedTag, searchQuery]);

  const resetFilters = () => {
    setSelectedType("all");
    setSelectedTag("all");
    setSearchQuery("");
  };

  const isFiltering = selectedType !== "all" || selectedTag !== "all" || searchQuery !== "";

  return (
    <div className="flex flex-col gap-16">
      {/* Featured Section (Intermixed Projects and Articles) */}
      {!isFiltering && featuredItems.length > 0 && (
        <section aria-labelledby="featured-work-heading" className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-[#C2A370]" />
              <h2 id="featured-work-heading" className="text-xs uppercase tracking-[0.25em] font-semibold text-white/90">
                Curated Showcase
              </h2>
            </div>
            <span className="text-[11px] text-white/30 uppercase tracking-widest font-mono">
              {featuredItems.length} Total Works
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredItems.map((item, idx) => (
              <WorkCard key={`featured-${item.slug}`} item={item} priority={idx === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Filter & Search Bar */}
      <div className="sticky top-20 z-30 -mx-6 md:-mx-12 px-6 md:px-12 py-4 bg-[#0A0A0C]/90 backdrop-blur-xl border-y border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Main Content Type Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-xl w-fit">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-all ${
                selectedType === "all"
                  ? "bg-[#C2A370] text-black shadow-sm font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              All ({initialPosts.length})
            </button>
            <button
              onClick={() => setSelectedType("project")}
              className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-all ${
                selectedType === "project"
                  ? "bg-[#C2A370] text-black shadow-sm font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Projects ({initialPosts.filter((p) => p.type === "project").length})
            </button>
            <button
              onClick={() => setSelectedType("article")}
              className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-widest font-medium transition-all ${
                selectedType === "article"
                  ? "bg-[#C2A370] text-black shadow-sm font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Articles ({initialPosts.filter((p) => p.type === "article").length})
            </button>
          </div>

          {/* Unified Search Input */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor={searchInputId} className="sr-only">
              Search projects and articles
            </label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, tag, or technology..."
              className="w-full pl-10 pr-10 py-2 bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#C2A370] focus:bg-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Topic & Tech Tags Scrollable Row */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/30 shrink-0 mr-1">
            <Filter className="w-3 h-3 text-[#C2A370]" />
            <span>Topics:</span>
          </div>

          <button
            onClick={() => setSelectedTag("all")}
            className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap uppercase tracking-wider transition-all shrink-0 ${
              selectedTag === "all"
                ? "bg-white/20 text-white font-semibold border border-white/30"
                : "bg-white/[0.03] text-white/50 border border-white/5 hover:text-white hover:border-white/15"
            }`}
          >
            All Topics
          </button>

          {dynamicTags.map((tag) => {
            const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? "all" : tag)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap uppercase tracking-wider transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#C2A370]/20 text-[#C2A370] border border-[#C2A370]/50 font-semibold"
                    : "bg-white/[0.03] text-white/50 border border-white/5 hover:text-white hover:border-white/15"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Metrics & Active Filter Tags */}
      <div className="flex flex-wrap items-center justify-between gap-4 -mt-6">
        <div className="text-xs text-white/40 uppercase tracking-widest font-mono">
          Showing {filteredPosts.length} of {initialPosts.length} {filteredPosts.length === 1 ? "item" : "items"}
        </div>

        {isFiltering && (
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/40">Filtered view</span>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs text-[#C2A370] hover:text-[#C2A370]/80 underline underline-offset-4 uppercase tracking-wider transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Unified Content Feed Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <WorkCard key={post.slug} item={post} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-4">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-light text-white mb-2 tracking-tight">
            No matching work found
          </h3>
          <p className="text-white/40 text-sm max-w-md mb-6 leading-relaxed">
            We couldn&apos;t find any projects or articles matching your current filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
          >
            Clear All Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
