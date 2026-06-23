"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const items = [
  {
    type: "Work",
    role: "Full Stack Engineer",
    org: "Tech Startup",
    period: "2024 — Present",
    points: [
      "Building LLM-powered features end to end — from prompt pipelines to production UIs.",
      "Cut API latency 40% by redesigning the caching and retrieval layer.",
    ],
  },
  {
    type: "Work",
    role: "ML Engineering Intern",
    org: "AI Research Lab",
    period: "2023 — 2024",
    points: [
      "Trained and evaluated transformer models for document understanding tasks.",
      "Shipped a model-serving pipeline handling 1M+ daily inferences.",
    ],
  },
  {
    type: "Education",
    role: "B.Tech in Computer Science",
    org: "University",
    period: "2021 — 2025",
    points: [
      "Specialization in Artificial Intelligence and Machine Learning.",
      "Led the developer society; organized hackathons with 500+ participants.",
    ],
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
        <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent sm:left-1/2" />

        <div className="space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative flex flex-col pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0
                  ? "sm:mr-auto sm:pr-12 sm:text-right"
                  : "sm:ml-auto sm:pl-12"
              }`}
            >
              <div
                className={`absolute top-1 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background sm:left-auto ${
                  i % 2 === 0
                    ? "sm:right-0 sm:translate-x-1/2"
                    : "sm:left-0 sm:-translate-x-1/2"
                }`}
              />
              <span className="text-xs font-semibold tracking-widest text-accent-2 uppercase">
                {item.type} &middot; {item.period}
              </span>
              <h3 className="font-display mt-1.5 text-lg font-bold text-white">{item.role}</h3>
              <div className="text-sm text-white/45">{item.org}</div>
              <ul
                className={`mt-3 space-y-1.5 text-sm text-white/50 ${
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
