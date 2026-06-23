"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const highlights = [
  {
    title: "AI/ML Engineering",
    text: "Designing, training and deploying models — from classical ML to LLM-powered applications that reach production.",
    accent: "border-accent",
  },
  {
    title: "Full Stack Development",
    text: "End-to-end product development with modern web frameworks, APIs, and cloud infrastructure that scales.",
    accent: "border-accent-2",
  },
  {
    title: "Product Mindset",
    text: "I care about shipping things people actually use — performance, polish, and user experience included.",
    accent: "border-accent-3",
  },
];

const revealItem = {
  hidden: { opacity: 0, x: 32, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28">
      <SectionHeading
        eyebrow="About Me"
        title="Engineer at the intersection of web and intelligence"
      />

      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-5 leading-relaxed text-white/80"
        >
          <p>
            I&apos;m Aarush — a developer who loves building products where{" "}
            <span className="text-white font-medium">solid engineering meets machine intelligence</span>.
            Whether it&apos;s a fast frontend, a resilient backend, or a model pipeline
            that makes it to production, I enjoy owning the whole stack.
          </p>
          <p>
            My current focus is on{" "}
            <span className="text-white font-medium">LLM-powered applications</span>, retrieval systems,
            and the infrastructure that makes AI useful in real products — not just notebooks.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m reading ML papers, contributing to open
            source, or experimenting with new tools on the frontier.
          </p>
        </motion.div>

        <div className="space-y-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              variants={revealItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className={`glass glow-card rounded-2xl border-l-2 p-5 ${h.accent}`}
            >
              <h3 className="font-semibold text-white">{h.title}</h3>
              <p className="mt-1.5 text-sm text-white/75">{h.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
