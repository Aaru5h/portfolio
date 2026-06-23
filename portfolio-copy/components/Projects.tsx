"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "NeuralChat",
    description:
      "An LLM-powered chat platform with RAG over private documents, streaming responses, and multi-model routing.",
    tags: ["Next.js", "LangChain", "PostgreSQL", "OpenAI"],
    gradient: "from-accent/40 via-accent/10 to-transparent",
    emoji: "💬",
    featured: true,
  },
  {
    title: "VisionBoard",
    description:
      "Real-time object detection dashboard for retail analytics, processing live video streams with edge-deployed models.",
    tags: ["PyTorch", "FastAPI", "React", "WebRTC"],
    gradient: "from-accent-2/40 via-accent-2/10 to-transparent",
    emoji: "👁️",
    featured: true,
  },
  {
    title: "DevFlow",
    description:
      "Full-stack project management tool with AI-assisted task breakdown, built for small engineering teams.",
    tags: ["Next.js", "tRPC", "Prisma", "Tailwind"],
    gradient: "from-accent-3/40 via-accent-3/10 to-transparent",
    emoji: "📋",
    featured: false,
  },
  {
    title: "SentimentAPI",
    description:
      "High-throughput sentiment analysis API serving fine-tuned transformer models with sub-100ms latency.",
    tags: ["Hugging Face", "FastAPI", "Docker", "AWS"],
    gradient: "from-emerald-400/40 via-emerald-400/10 to-transparent",
    emoji: "📊",
    featured: false,
  },
  {
    title: "CodeMentor AI",
    description:
      "VS Code extension that reviews code in real time and suggests improvements using local LLMs.",
    tags: ["TypeScript", "Ollama", "VS Code API"],
    gradient: "from-amber-400/40 via-amber-400/10 to-transparent",
    emoji: "🤖",
    featured: false,
  },
  {
    title: "StreamSync",
    description:
      "Collaborative watch-party platform with synchronized playback, live chat, and WebSocket infrastructure.",
    tags: ["Node.js", "Socket.io", "Redis", "React"],
    gradient: "from-sky-400/40 via-sky-400/10 to-transparent",
    emoji: "🎬",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-6 py-28">
      <div className="absolute top-1/3 -left-20 h-96 w-96 rounded-full bg-accent-3/10 blur-[140px]" />

      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A selection of projects spanning full-stack apps, ML systems, and developer tools."
      />

      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
            className={`glass glow-card group flex flex-col overflow-hidden rounded-2xl ${
              project.featured ? "lg:col-span-1" : ""
            }`}
          >
            {/* Thumbnail */}
            <div
              className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${project.gradient}`}
            >
              <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                {project.emoji}
              </span>
              {project.featured && (
                <span className="absolute top-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold text-white">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 text-sm">
                <a
                  href="#"
                  className="font-medium text-accent-2 transition-colors hover:text-white"
                >
                  Live Demo →
                </a>
                <a
                  href="#"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
