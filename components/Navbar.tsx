"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Don't hide navbar if mobile menu is open
    if (mobileMenuOpen) return;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setIsScrolled(latest > 50);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const links = [
    { name: "About", href: "/#about" },
    { name: "Work", href: "/work" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-between items-center pt-6 px-6 md:pt-8 md:px-12 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Link
            id="navbar-brand-logo"
            href="/"
            className="flex items-center group transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Vikraman V - Home"
          >
            <svg
              viewBox="22.04 58.88 467.92 378.88"
              className="h-7 sm:h-8 w-auto fill-white transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <polygon points="22.04,58.88 155.40,58.88 200.43,153.60 67.08,153.60" />
              <polygon points="356.60,58.88 489.96,58.88 444.92,153.60 311.57,153.60" />
              <polygon points="75.37,171.03 208.72,171.03 256.00,270.46 189.32,410.70" />
              <polygon points="303.28,171.03 436.63,171.03 322.68,410.70 256.00,270.46" />
              <polygon points="256.00,289.76 193.91,420.35 202.19,437.76 309.81,437.76 318.09,420.35" />
            </svg>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-8 px-6 py-2.5 rounded-full border transition-all duration-500 pointer-events-auto",
            isScrolled 
              ? "bg-[#0A0A0C]/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border-white/10" 
              : "bg-transparent border-transparent"
          )}
        >
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto relative z-[60] p-2 -mr-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div id="navbar-location" className="hidden md:block pointer-events-auto text-[10px] text-white/30 uppercase tracking-tighter">Based in India</div>
      </motion.header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl uppercase tracking-[0.15em] font-light text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
