"use client";

import { motion } from "framer-motion";
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
  return (
    <section id="experience" className="relative scroll-mt-24 px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been"
        subtitle="My journey through work and education so far."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent sm:left-1/2" />

        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className={`relative flex flex-col pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:mr-auto sm:pr-12 sm:text-right"
                  : "sm:ml-auto sm:pl-12"
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute top-1 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background sm:left-auto ${
                  i % 2 === 0
                    ? "sm:right-0 sm:translate-x-1/2"
                    : "sm:left-0 sm:-translate-x-1/2"
                }`}
              />

              <span className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
                {item.type} · {item.period}
              </span>
              <h3 className="font-display mt-1.5 text-lg font-bold text-white">
                {item.role}
              </h3>
              <div className="text-sm text-white/50">{item.org}</div>
              <ul
                className={`mt-3 space-y-1.5 text-sm text-white/55 ${
                  i % 2 === 0 ? "sm:ml-auto" : ""
                }`}
              >
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
