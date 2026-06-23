"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "NeuralChat",
    description:
      "An LLM-powered chat platform with RAG over private documents, streaming responses, and multi-model routing.",
    tags: ["Next.js", "LangChain", "PostgreSQL", "OpenAI"],
    gradient: "from-[#2C5C88]/30 to-black/40",
    letter: "N",
    letterColor: "#2C5C88",
    featured: true,
  },
  {
    title: "VisionBoard",
    description:
      "Real-time object detection dashboard for retail analytics, processing live video streams with edge-deployed models.",
    tags: ["PyTorch", "FastAPI", "React", "WebRTC"],
    gradient: "from-[#4c7fa8]/30 to-black/40",
    letter: "V",
    letterColor: "#4c7fa8",
    featured: true,
  },
  {
    title: "DevFlow",
    description:
      "Full-stack project management tool with AI-assisted task breakdown, built for small engineering teams.",
    tags: ["Next.js", "tRPC", "Prisma", "Tailwind"],
    gradient: "from-[#1e3e5c]/30 to-black/40",
    letter: "D",
    letterColor: "#1e3e5c",
    featured: false,
  },
  {
    title: "SentimentAPI",
    description:
      "High-throughput sentiment analysis API serving fine-tuned transformer models with sub-100ms latency.",
    tags: ["Hugging Face", "FastAPI", "Docker", "AWS"],
    gradient: "from-[#2C5C88]/30 to-black/40",
    letter: "S",
    letterColor: "#2C5C88",
    featured: false,
  },
  {
    title: "CodeMentor AI",
    description:
      "VS Code extension that reviews code in real time and suggests improvements using local LLMs.",
    tags: ["TypeScript", "Ollama", "VS Code API"],
    gradient: "from-[#4c7fa8]/30 to-black/40",
    letter: "C",
    letterColor: "#4c7fa8",
    featured: false,
  },
  {
    title: "StreamSync",
    description:
      "Collaborative watch-party platform with synchronized playback, live chat, and WebSocket infrastructure.",
    tags: ["Node.js", "Socket.io", "Redis", "React"],
    gradient: "from-[#1e3e5c]/30 to-black/40",
    letter: "S",
    letterColor: "#1e3e5c",
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
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="glass glow-card group flex flex-col overflow-hidden rounded-2xl"
          >
            {/* Thumbnail */}
            <div
              className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${project.gradient}`}
            >
              <span
                className="font-display text-5xl font-bold opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
                style={{ color: project.letterColor }}
              >
                {project.letter}
              </span>
              {project.featured && (
                <span className="absolute top-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70 backdrop-blur">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 text-sm">
                <a href="#" className="font-medium text-accent-2 transition-colors hover:text-white">
                  Live Demo
                </a>
                <a href="#" className="text-white/45 transition-colors hover:text-white">
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
