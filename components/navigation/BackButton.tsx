"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallback: string;
}

export function BackButton({ fallback }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group inline-flex items-center gap-2.5 py-2 px-3.5 min-h-[44px] sm:min-h-[38px] rounded-md bg-card border border-border hover:border-primary/50 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-fit cursor-pointer"
      aria-label="Go back"
    >
      <ArrowLeft className="w-3.5 h-3.5 text-primary group-hover:-translate-x-0.5 transition-transform" />
      <span>[ BACK ]</span>
    </button>
  );
}
