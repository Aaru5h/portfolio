"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";

const items = [
  {
    type: "Journey",
    role: "AI Engineering",
    org: "RAG & LLM Applications",
    period: "2026 — Present",
    points: [
      "Building RAG pipelines and LLM-powered applications.",
      "Bringing AI features into full-stack products end to end.",
    ],
  },
  {
    type: "Journey",
    role: "Machine Learning & DevOps",
    org: "Self-driven Learning",
    period: "Late 2025 — 2026",
    points: [
      "Started the ML journey — fundamentals, models, and evaluation.",
      "Picked up DevOps along the way: CI/CD, containers, and deployment.",
    ],
  },
  {
    type: "Journey",
    role: "Full Stack Development",
    org: "Web Development",
    period: "2024 — Present",
    points: [
      "Began building full-stack apps alongside the first year of college.",
      "Shipped projects across the stack — from UIs to APIs and databases.",
    ],
  },
  {
    type: "Education",
    role: "B.Tech in Computer Science",
    org: "University",
    period: "2024 — 2028",
    points: ["Currently in 3rd year."],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="Path"
          title="How I got here."
          subtitle="A short timeline of the work and the learning behind it."
        />

        <div ref={ref} className="relative pl-8 sm:pl-12">
          {/* rail */}
          <div className="absolute top-2 bottom-2 left-0 w-px bg-white/10" />
          <motion.div
            style={{ scaleY }}
            className="bg-accent absolute top-2 bottom-2 left-0 w-px origin-top"
          />

          <div className="space-y-14">
            {items.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <span className="bg-accent absolute top-2 -left-8 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-transform duration-500 group-hover:scale-[2] sm:-left-12" />

                <div className="flex flex-wrap items-baseline gap-x-4">
                  <span className="label text-accent">{item.period}</span>
                  <span className="label">{item.type}</span>
                </div>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">{item.role}</h3>
                <div className="text-muted mt-1 font-mono text-sm">{item.org}</div>
                <ul className="text-muted mt-4 max-w-lg space-y-2 text-sm leading-relaxed">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-accent/50">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
