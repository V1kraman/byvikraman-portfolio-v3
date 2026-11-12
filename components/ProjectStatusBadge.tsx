"use client";

import { CheckCircle, Clock, Sparkles, Archive } from "lucide-react";

interface ProjectStatusBadgeProps {
  status?: string;
  size?: "sm" | "md";
  className?: string;
}

export function ProjectStatusBadge({
  status,
  size = "sm",
  className = "",
}: ProjectStatusBadgeProps) {
  if (!status) return null;

  const lower = status.toLowerCase().trim();
  const isOngoing =
    lower.includes("ongoing") ||
    lower.includes("progress") ||
    lower.includes("wip") ||
    lower.includes("active") ||
    lower.includes("building");
  const isCompleted =
    lower.includes("completed") ||
    lower.includes("done") ||
    lower.includes("finished") ||
    lower.includes("shipped");
  const isExperimental =
    lower.includes("experimental") ||
    lower.includes("prototype") ||
    lower.includes("planned") ||
    lower.includes("concept");
  const isArchived = lower.includes("archived") || lower.includes("legacy");

  const normalizedLabel = isOngoing
    ? "ONGOING"
    : isCompleted
      ? "COMPLETED"
      : isExperimental
        ? "EXPERIMENTAL"
        : isArchived
          ? "ARCHIVED"
          : status.toUpperCase();

  const sizeClasses =
    size === "md"
      ? "px-2.5 py-1 text-[10px] gap-1.5"
      : "px-2 py-0.5 text-[9px] gap-1";

  const dotSize = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";
  const iconSize = size === "md" ? "w-3 h-3" : "w-2.5 h-2.5";

  if (isOngoing) {
    return (
      <span
        className={`inline-flex items-center rounded-sm font-mono uppercase tracking-[0.14em] font-semibold text-primary bg-primary/10 border border-primary/35 ${sizeClasses} ${className}`}
      >
        <span className={`relative flex ${dotSize}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-primary" />
        </span>
        <span>{normalizedLabel}</span>
      </span>
    );
  }

  if (isCompleted) {
    return (
      <span
        className={`inline-flex items-center rounded-sm font-mono uppercase tracking-[0.14em] font-medium text-foreground/85 bg-secondary/80 border border-border ${sizeClasses} ${className}`}
      >
        <CheckCircle className={`${iconSize} text-primary`} />
        <span>{normalizedLabel}</span>
      </span>
    );
  }

  if (isExperimental) {
    return (
      <span
        className={`inline-flex items-center rounded-sm font-mono uppercase tracking-[0.14em] font-medium text-muted-foreground bg-muted border border-border ${sizeClasses} ${className}`}
      >
        <Sparkles className={`${iconSize} text-primary`} />
        <span>{normalizedLabel}</span>
      </span>
    );
  }

  if (isArchived) {
    return (
      <span
        className={`inline-flex items-center rounded-sm font-mono uppercase tracking-[0.14em] font-medium text-muted-foreground bg-muted/60 border border-border ${sizeClasses} ${className}`}
      >
        <Archive className={`${iconSize} text-muted-foreground`} />
        <span>{normalizedLabel}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-sm font-mono uppercase tracking-[0.14em] font-medium text-muted-foreground bg-secondary/70 border border-border ${sizeClasses} ${className}`}
    >
      <Clock className={`${iconSize} text-primary`} />
      <span>{normalizedLabel}</span>
    </span>
  );
}
