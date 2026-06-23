"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_40px_-12px_rgba(124,108,246,0.35)]" : ""
        }`}
      >
        <a href="#" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">AG</span>
          <span className="text-white/80">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:block"
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 mx-4 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
