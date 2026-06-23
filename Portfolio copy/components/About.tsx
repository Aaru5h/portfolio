"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const highlights = [
  {
    icon: "🧠",
    title: "AI/ML Engineering",
    text: "Designing, training and deploying models — from classical ML to LLM-powered applications.",
  },
  {
    icon: "⚡",
    title: "Full Stack Development",
    text: "End-to-end product development with modern web frameworks, APIs, and cloud infrastructure.",
  },
  {
    icon: "🚀",
    title: "Product Mindset",
    text: "I care about shipping things people actually use — performance, polish, and UX included.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28">
      <SectionHeading
        eyebrow="About Me"
        title="Engineer at the intersection of web & intelligence"
      />

      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-5 text-white/65 leading-relaxed"
        >
          <p>
            I&apos;m Aarush — a developer who loves building products where{" "}
            <span className="text-white">solid engineering meets machine
            intelligence</span>. Whether it&apos;s a fast, beautiful frontend, a
            resilient backend, or a model pipeline that actually makes it to
            production, I enjoy owning the whole stack.
          </p>
          <p>
            My current focus is on{" "}
            <span className="text-white">LLM-powered applications</span>,
            retrieval systems, and the infrastructure that makes AI useful in
            real products — not just in notebooks.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m usually reading ML papers,
            contributing to open source, or experimenting with new tools.
          </p>
        </motion.div>

        <div className="space-y-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className="glass glow-card flex items-start gap-4 rounded-2xl p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/30 to-accent-2/20 text-xl">
                {h.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{h.title}</h3>
                <p className="mt-1 text-sm text-white/55">{h.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
