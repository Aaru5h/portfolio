"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background layers */}
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-accent-2/10 blur-[120px]" />
      <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-accent-3/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">Aarush Gupta</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          Full Stack Engineer with a passion for{" "}
          <span className="text-white">AI &amp; Machine Learning</span> — I build
          intelligent, end-to-end products that ship from idea to production.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-xl bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,108,246,0.6)] transition-transform hover:scale-[1.03]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="glass rounded-xl px-7 py-3.5 font-semibold text-white/80 transition-colors hover:text-white"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-white/40"
        >
          {[
            ["3+", "Years Building"],
            ["20+", "Projects Shipped"],
            ["10+", "ML Models Deployed"],
          ].map(([stat, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl font-bold text-white">{stat}</div>
              <div className="mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.a>
    </section>
  );
}
