"use client";

import { CheckCircle, Clock } from "lucide-react";

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
  const isPlanned =
    lower.includes("planned") ||
    lower.includes("concept") ||
    lower.includes("upcoming");

  const sizeClasses =
    size === "md"
      ? "px-2.5 py-1 text-[10px] gap-1.5"
      : "px-2 py-0.5 text-[9px] gap-1";

  const dotSize = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";
  const iconSize = size === "md" ? "w-3 h-3" : "w-2.5 h-2.5";

  if (isOngoing) {
    return (
      <span
        className={`inline-flex items-center rounded-sm uppercase tracking-wider font-semibold text-primary bg-primary/10 border border-primary/35 ${sizeClasses} ${className}`}
      >
        <span className={`relative flex ${dotSize}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-primary" />
        </span>
        <span>{status}</span>
      </span>
    );
  }

  if (isCompleted) {
    return (
      <span
        className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-foreground/85 bg-secondary border border-border ${sizeClasses} ${className}`}
      >
        <CheckCircle className={`${iconSize} text-primary`} />
        <span>{status}</span>
      </span>
    );
  }

  if (isPlanned) {
    return (
      <span
        className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-muted-foreground bg-muted border border-border ${sizeClasses} ${className}`}
      >
        <Clock className={`${iconSize} text-primary`} />
        <span>{status}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-muted-foreground bg-secondary border border-border ${sizeClasses} ${className}`}
    >
      <span className={`rounded-full bg-primary ${dotSize}`} />
      <span>{status}</span>
    </span>
  );
}
