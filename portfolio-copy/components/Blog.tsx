"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const posts = [
  {
    title: "Building Production RAG Systems: Lessons Learned",
    excerpt:
      "What actually matters when taking retrieval-augmented generation from prototype to production.",
    date: "Coming soon",
    readTime: "8 min read",
    tag: "AI/ML",
  },
  {
    title: "Next.js App Router: Patterns That Scale",
    excerpt:
      "Server components, streaming, and data patterns I keep coming back to in real projects.",
    date: "Coming soon",
    readTime: "6 min read",
    tag: "Web Dev",
  },
  {
    title: "Fine-tuning vs. Prompting: A Practical Guide",
    excerpt:
      "When to fine-tune a model, when to prompt-engineer, and when to do neither.",
    date: "Coming soon",
    readTime: "10 min read",
    tag: "AI/ML",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative scroll-mt-24 px-6 py-28">
      <div className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-accent-2/10 blur-[140px]" />

      <SectionHeading
        eyebrow="Blog"
        title="Writing & thoughts"
        subtitle="Articles on full-stack engineering and AI/ML — coming soon."
      />

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="glass glow-card flex flex-col rounded-2xl p-6"
          >
            <span className="self-start rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-2">
              {post.tag}
            </span>
            <h3 className="font-display mt-4 text-lg font-bold text-white">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center justify-between text-xs text-white/40">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
