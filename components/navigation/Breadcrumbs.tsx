"use client";

import Link from "next/link";
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
        href: isLast ? undefined : currentPath,
      });
    });

    return autoItems;
  }, [items, pathname]);

  const displayItems = items || generatedItems;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mt-3 mb-8"
    >
      <span className="text-primary font-semibold" aria-hidden="true">
        PATH //
      </span>
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;

        return (
          <div key={item.label} className="flex items-center gap-2">
            {isLast || !item.href ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
              >
                {item.label}
              </Link>
            )}

            {!isLast && <span className="text-border select-none">/</span>}
          </div>
        );
      })}
    </nav>
  );
}
