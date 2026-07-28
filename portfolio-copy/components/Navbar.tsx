"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Stack", href: "#skills", id: "skills" },
  { label: "Work", href: "#projects", id: "projects" },
  { label: "Path", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/8 bg-[#070708]/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" className="group flex items-baseline gap-2.5">
          <span className="text-[15px] font-medium tracking-tight">Aarush Gupta</span>
          <span className="label hidden sm:inline">AI / Full-Stack</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group font-mono text-[12px] tracking-wide transition-colors"
              >
                <span className={active === link.id ? "text-accent" : "text-muted"}>
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                <span
                  className={`transition-colors ${
                    active === link.id ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <span className="label hidden items-center gap-2 lg:flex">
            <span className="bg-accent inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
            Open to work
          </span>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`bg-ink h-px w-5 transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`bg-ink h-px w-5 transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/8 bg-[#070708]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="px-6 py-4">
              {links.map((link, i) => (
                <li key={link.href} className="border-b border-white/5 last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 py-3.5"
                  >
                    <span className="label text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
