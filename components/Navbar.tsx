"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
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
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

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

  // Scroll-aware header: hides smoothly on downward scroll, reappears immediately on upward scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 16);

      if (currentY <= 64) {
        setHiddenOnScroll(false);
      } else if (currentY > lastScrollY.current + 6 && !mobileMenuOpen) {
        setHiddenOnScroll(true);
      } else if (currentY < lastScrollY.current - 4) {
        setHiddenOnScroll(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const links = [
    { name: "Works", index: "01", href: "/work" },
    { name: "About", index: "02", href: "/about" },
    { name: "Now", index: "03", href: "/now" },
    { name: "Contact", index: "04", href: "/#contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/work") {
      return (
        pathname === "/work" ||
        pathname.startsWith("/projects") ||
        pathname.startsWith("/blog")
      );
    }
    if (href === "/about") {
      return pathname === "/about";
    }
    if (href === "/now") {
      return pathname === "/now";
    }
    return false;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ease-out will-change-transform",
          hiddenOnScroll && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-background/92 backdrop-blur-md border-b border-border/85"
            : "bg-background/75 backdrop-blur-sm border-b border-border/45"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Typographic Wordmark: VIKRAMAN V. */}
          <Link
            id="navbar-brand-logo"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Vikraman V. — Home"
            className="group inline-flex items-baseline gap-2.5 py-1.5 min-h-[40px] sm:min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm shrink-0"
          >
            <span className="font-[family-name:var(--font-antonio)] text-lg sm:text-xl tracking-[0.08em] font-semibold text-foreground uppercase leading-none transition-colors group-hover:text-primary">
              VIKRAMAN{" "}
              <span className="font-[family-name:var(--font-cormorant)] italic font-semibold tracking-normal">
                V
              </span>
              <span className="text-primary">.</span>
            </span>
            <span className="hidden xl:inline-block font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground border-l border-border pl-2.5">
              ECE · SRM IST &apos;29
            </span>
          </Link>

          {/* Compact Text-Based Editorial Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
            {links.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "group relative py-1.5 inline-flex items-baseline gap-1.5 text-sm tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                    active
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.1em] text-primary/80">
                    {link.index}
                  </span>
                  <span>{link.name}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-primary transition-transform duration-200 origin-left",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Motion Toggle, Theme Switch, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleMotion}
              aria-pressed={isCalm}
              aria-label={isCalm ? "Resume interface animations" : "Pause interface animations"}
              title={isCalm ? "Resume motion" : "Pause motion"}
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-sm font-mono text-[10px] uppercase tracking-[0.12em] border whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
                isCalm
                  ? "bg-primary/15 border-primary text-primary font-medium"
                  : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              )}
            >
              {isCalm ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isCalm ? "Calm: On" : "Calm"}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to warm paper light theme" : "Switch to warm ink dark theme"}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-0 rounded-sm border border-border bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-primary" />
              )}
              <span className="hidden md:inline">{isDark ? "Paper" : "Ink"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-sm border border-border bg-transparent text-foreground hover:border-primary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 h-[100dvh] z-40 pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-5 sm:px-8 bg-background/98 backdrop-blur-xl lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-2 mt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground pb-2 border-b border-border">
                Index · Navigation
              </div>
              <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-border/60">
                {links.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "py-4 min-h-[52px] flex items-baseline justify-between transition-colors",
                        active ? "text-primary font-medium" : "text-foreground hover:text-primary"
                      )}
                    >
                      <span className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl tracking-tight">
                        {link.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {link.index}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-border flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={toggleMotion}
                  aria-pressed={isCalm}
                  className={cn(
                    "min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm font-mono text-xs uppercase tracking-widest border cursor-pointer",
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
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm font-mono text-xs uppercase tracking-widest border border-border bg-card text-foreground cursor-pointer"
                >
                  {isDark ? (
                    <Sun className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-primary" />
                  )}
                  <span>{isDark ? "Paper Light" : "Ink Dark"}</span>
                </button>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-2">
                <span>VIKRAMAN V. · ECE &apos;29</span>
                <span className="text-primary">byvikraman.me</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
