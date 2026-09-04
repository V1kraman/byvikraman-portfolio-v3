"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

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
    <motion.button
      onClick={handleBack}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group inline-flex items-center gap-3 py-2 pr-4 text-[10px] sm:text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 w-fit"
      aria-label="Go back"
    >
      <div className="bg-white/5 p-2 rounded-full group-hover:bg-white/10 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
      </div>
      <span className="font-medium">Back</span>
    </motion.button>
  );
}
