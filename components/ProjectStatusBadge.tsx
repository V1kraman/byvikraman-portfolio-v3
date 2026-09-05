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
        className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)] ${sizeClasses} ${className}`}
      >
        <span className={`relative flex ${dotSize}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-amber-400" />
        </span>
        <span>{status}</span>
      </span>
    );
  }

  if (isCompleted) {
    return (
      <span
        className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 ${sizeClasses} ${className}`}
      >
        <CheckCircle className={iconSize} />
        <span>{status}</span>
      </span>
    );
  }

  if (isPlanned) {
    return (
      <span
        className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-sky-300 bg-sky-500/10 border border-sky-500/20 ${sizeClasses} ${className}`}
      >
        <Clock className={iconSize} />
        <span>{status}</span>
      </span>
    );
  }

  // Fallback for custom statuses
  return (
    <span
      className={`inline-flex items-center rounded-sm uppercase tracking-wider font-medium text-white/70 bg-white/5 border border-white/10 ${sizeClasses} ${className}`}
    >
      <span className={`rounded-full bg-white/50 ${dotSize}`} />
      <span>{status}</span>
    </span>
  );
}
