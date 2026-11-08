"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Sun, Moon, Pause, Play } from "lucide-react";

function subscribeToHtmlClasses(callback: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return true;
}

function getCalmSnapshot() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("calm");
}

function getServerCalmSnapshot() {
  return false;
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = useSyncExternalStore(
    subscribeToHtmlClasses,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const isCalm = useSyncExternalStore(
    subscribeToHtmlClasses,
    getCalmSnapshot,
    getServerCalmSnapshot
  );

  const toggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("portfolio-theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("portfolio-theme", "light");
      } catch {}
    }
  };

  const toggleMotion = () => {
    const nextCalm = !isCalm;
    if (nextCalm) {
      document.documentElement.classList.add("calm");
      try {
        localStorage.setItem("portfolio-motion", "paused");
      } catch {}
    } else {
      document.documentElement.classList.remove("calm");
      try {
        localStorage.setItem("portfolio-motion", "active");
      } catch {}
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const links = [
    { name: "Work", code: "WORK", href: "/work" },
    { name: "About", code: "ENGINEER", href: "/#about" },
    { name: "Capabilities", code: "STACK", href: "/#capabilities" },
    { name: "Notes", code: "NOTES", href: "/blog" },
    { name: "Contact", code: "CONTACT", href: "/#contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/work") {
      return pathname === "/work" || pathname.startsWith("/projects");
    }
    if (href === "/blog") {
      return pathname.startsWith("/blog");
    }
    return false;
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/80 transition-colors duration-200">
        {/* Top copper trace hairline */}
        <div
          aria-hidden="true"
          className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Left: System Console Brand Badge (Pin-1 + Wordmark + Role) */}
          <Link
            id="navbar-brand-logo"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Vikraman V — Home"
            className="group inline-flex items-center gap-2.5 px-2.5 py-1.5 rounded-md bg-card/90 border border-border hover:border-primary/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {/* Pin-1 registration mark + geometric V */}
            <span className="w-5 h-5 rounded-[4px] bg-primary/15 border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <svg
                viewBox="22.04 58.88 467.92 378.88"
                className="h-3 w-auto fill-primary group-hover:fill-primary-foreground transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon points="22.04,58.88 155.40,58.88 200.43,153.60 67.08,153.60" />
                <polygon points="356.60,58.88 489.96,58.88 444.92,153.60 311.57,153.60" />
                <polygon points="75.37,171.03 208.72,171.03 256.00,270.46 189.32,410.70" />
                <polygon points="303.28,171.03 436.63,171.03 322.68,410.70 256.00,270.46" />
                <polygon points="256.00,289.76 193.91,420.35 202.19,437.76 309.81,437.76 318.09,420.35" />
              </svg>
            </span>

            <span className="font-mono text-[11px] sm:text-xs tracking-[0.12em] font-semibold text-foreground">
              VIKRAMAN V
            </span>
            <span className="hidden xl:inline-block font-mono text-[10px] tracking-[0.1em] text-muted-foreground border-l border-border pl-2.5">
              ECE STUDENT · INDIA
            </span>
          </Link>

          {/* Center: Silkscreen Console Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 rounded-md font-mono text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  <span>[ {link.code} ]</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Pause Motion Switch, Theme Toggle, Status LED & Mobile Trigger */}
          <div className="flex items-center gap-2">
            {/* Pause / Resume Motion Control (WCAG 2.2.2) */}
            <button
              type="button"
              onClick={toggleMotion}
              aria-pressed={isCalm}
              aria-label={isCalm ? "Resume interface animations" : "Pause interface animations"}
              title={isCalm ? "Resume motion" : "Pause motion"}
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[34px] rounded-md font-mono text-[10px] uppercase tracking-[0.1em] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isCalm
                  ? "bg-primary/15 border-primary text-primary font-medium"
                  : "bg-card/80 border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              )}
            >
              {isCalm ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isCalm ? "MOTION: OFF" : "PAUSE MOTION"}</span>
            </button>

            {/* Theme Switch (Obsidian / Bone) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to Bone light theme" : "Switch to Obsidian dark theme"}
              title={isDark ? "Switch to Light Mode (Bone)" : "Switch to Dark Mode (Obsidian)"}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[34px] rounded-md border border-border bg-card/80 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-primary" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
              <span className="hidden md:inline">{isDark ? "BONE" : "OBSIDIAN"}</span>
            </button>

            {/* Power / System Status Pill */}
            <div
              id="navbar-status"
              className="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 min-h-[34px] rounded-md bg-card/80 border border-border font-mono text-[10px] tracking-[0.1em] text-foreground/85"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>PWR·OK</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-card text-foreground hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-16 bg-background/98 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="space-y-2 mt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground pb-2 border-b border-border">
                {"/// SYSTEM NAVIGATION"}
              </div>
              <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-border/60">
                {links.map((link, idx) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "py-4 flex items-center justify-between font-mono text-sm uppercase tracking-[0.14em] transition-colors",
                        active ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                      )}
                    >
                      <span>[ {link.code} ] — {link.name}</span>
                      <span className="text-xs text-muted-foreground">0{idx + 1}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-border flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={toggleMotion}
                  aria-pressed={isCalm}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md font-mono text-xs uppercase tracking-widest border",
                    isCalm
                      ? "bg-primary/15 border-primary text-primary font-semibold"
                      : "bg-card border-border text-foreground"
                  )}
                >
                  {isCalm ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  <span>{isCalm ? "Resume Motion" : "Pause Motion"}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-md font-mono text-xs uppercase tracking-widest border border-border bg-card text-foreground"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-primary" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
                  <span>{isDark ? "Bone Theme" : "Obsidian Theme"}</span>
                </button>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-2">
                <span>VIKRAMAN V · SRM IST ECE &apos;29</span>
                <span className="text-primary">PWR·OK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
