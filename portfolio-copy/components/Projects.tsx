"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "NeuralChat",
    year: "2026",
    kind: "LLM Application",
    description:
      "An LLM-powered chat platform with RAG over private documents, streaming responses, and multi-model routing.",
    tags: ["Next.js", "LangChain", "PostgreSQL", "OpenAI"],
    tint: "rgba(201,242,77,0.14)",
    live: "#",
    repo: "#",
  },
  {
    title: "VisionBoard",
    year: "2025",
    kind: "Computer Vision",
    description:
      "Real-time object detection dashboard for retail analytics, processing live video streams with edge-deployed models.",
    tags: ["PyTorch", "FastAPI", "React", "WebRTC"],
    tint: "rgba(120,200,255,0.12)",
    live: "#",
    repo: "#",
  },
  {
    title: "DevFlow",
    year: "2025",
    kind: "Full-Stack Product",
    description:
      "Full-stack project management tool with AI-assisted task breakdown, built for small engineering teams.",
    tags: ["Next.js", "tRPC", "Prisma", "Tailwind"],
    tint: "rgba(255,150,200,0.12)",
    live: "#",
    repo: "#",
  },
  {
    title: "SentimentAPI",
    year: "2025",
    kind: "ML Infrastructure",
    description:
      "High-throughput sentiment analysis API serving fine-tuned transformer models with sub-100ms latency.",
    tags: ["Hugging Face", "FastAPI", "Docker", "AWS"],
    tint: "rgba(130,255,190,0.12)",
    live: "#",
    repo: "#",
  },
  {
    title: "CodeMentor AI",
    year: "2024",
    kind: "Developer Tooling",
    description:
      "VS Code extension that reviews code in real time and suggests improvements using local LLMs.",
    tags: ["TypeScript", "Ollama", "VS Code API"],
    tint: "rgba(255,200,120,0.12)",
    live: "#",
    repo: "#",
  },
  {
    title: "StreamSync",
    year: "2024",
    kind: "Realtime Systems",
    description:
      "Collaborative watch-party platform with synchronized playback, live chat, and WebSocket infrastructure.",
    tags: ["Node.js", "Socket.io", "Redis", "React"],
    tint: "rgba(160,170,255,0.12)",
    live: "#",
    repo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Things I've built."
          subtitle="Full-stack apps, ML systems and developer tools — shipped, not shelved."
        />

        {/* Cards pin and stack as you scroll past them. */}
        <div className="space-y-8">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="sticky"
              style={{ top: `calc(6rem + ${i * 0.9}rem)` }}
            >
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] md:grid-cols-[1.2fr_1fr]"
              >
                <div className="flex flex-col justify-between p-7 sm:p-10">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="label text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="label">{p.kind}</span>
                      <span className="label ml-auto">{p.year}</span>
                    </div>
                    <h3 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="text-muted mt-4 max-w-md leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs text-white/35">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-6 text-sm">
                      <a
                        href={p.live}
                        className="wipe hover:text-accent pb-0.5 font-medium transition-colors"
                      >
                        Live demo ↗
                      </a>
                      <a
                        href={p.repo}
                        className="wipe text-muted hover:text-ink pb-0.5 transition-colors"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  className="relative hidden overflow-hidden border-l border-white/8 md:block"
                  style={{
                    backgroundImage: `radial-gradient(120% 90% at 80% 10%, ${p.tint}, transparent 70%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <span className="font-serif absolute right-6 -bottom-8 text-[10rem] leading-none text-white/[0.06] transition-transform duration-700 group-hover:-translate-y-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
