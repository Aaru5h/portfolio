"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A headline line that slides up from behind a mask. */
function Line({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

const stats = [
  ["3+", "Years building"],
  ["20+", "Projects shipped"],
  ["10+", "Models deployed"],
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end px-6 pt-32 pb-10 lg:px-10"
    >
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="label flex items-center gap-3"
        >
          <span className="bg-accent/60 h-px w-8" />
          Full-Stack · AI / ML Engineer
        </motion.div>

        <h1 className="mt-8 text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.03em]">
          <Line delay={0.15}>Building software</Line>
          <Line delay={0.27}>
            that{" "}
            <span className="font-serif text-accent italic font-normal">thinks</span>
            <span className="text-accent">.</span>
          </Line>
        </h1>

        <div className="mt-12 flex flex-col gap-10 border-t border-white/10 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="text-muted max-w-md text-base leading-relaxed"
          >
            I&apos;m <span className="text-ink">Aarush</span> — I design and ship
            end-to-end products where solid engineering meets machine intelligence.
            Frontends, APIs, and model pipelines that actually make it to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="bg-accent group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#070708] transition-transform duration-300 hover:scale-[1.03]"
            >
              Selected work
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-px overflow-hidden border-y border-white/10 bg-white/10"
        >
          {stats.map(([value, label]) => (
            <div key={label} className="bg-[#070708] px-1 py-5 sm:px-4">
              <div className="text-2xl font-medium tracking-tight sm:text-3xl">
                {value}
              </div>
              <div className="label mt-1.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="label mx-auto mt-10 flex w-full max-w-7xl items-center gap-2"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        Scroll
      </motion.div>
    </section>
  );
}
