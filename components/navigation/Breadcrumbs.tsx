"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // If no items are explicitly passed, automatically generate from route
  const generatedItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items) return items;
    const paths = pathname.split("/").filter(Boolean);
    const autoItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    
    let currentPath = "";
    paths.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === paths.length - 1;
      autoItems.push({
        label: segment.replace(/-/g, " "),
        href: isLast ? undefined : currentPath
      });
    });
    
    return autoItems;
  }, [items, pathname]);

  const displayItems = items || generatedItems;

  return (
    <motion.nav 
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/40 mt-2 mb-12"
    >
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        
        return (
          <div key={item.label} className="flex items-center gap-2">
            {isLast || !item.href ? (
              <span className="text-white/70 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm"
              >
                {item.label}
              </Link>
            )}
            
            {!isLast && (
              <span className="text-white/10 select-none">/</span>
            )}
          </div>
        );
      })}
    </motion.nav>
  );
}
