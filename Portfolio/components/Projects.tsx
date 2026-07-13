"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "One Stop",
    description:
      "A premium, Netflix-style streaming platform featuring real-time metadata from TMDB, glassmorphic UI, and smooth custom player controls.",
    tags: ["Next.js", "Framer Motion", "TMDB API", "CSS Modules"],
    gradient: "from-[#E50914]/20 to-black/40",
    letter: "O",
    letterColor: "#E50914",
    featured: true,
    githubLink: "https://github.com/Aaru5h/One-Stop",
    liveLink: "https://one-stop-zvu1.vercel.app/",
  },
  {
    title: "CrisisGrid AI",
    description:
      "Intelligent multi-agent emergency EOC dispatch simulator using LangGraph, FastAPI, and NetworkX for real-time triage, call fusion, and shortest-path routing.",
    tags: ["Next.js 15", "FastAPI", "LangGraph", "NetworkX", "WebSockets"],
    gradient: "from-[#EF4444]/20 to-black/40",
    letter: "C",
    letterColor: "#EF4444",
    featured: true,
    githubLink: "https://github.com/Priyal-2005/CrisisGrid-AI",
    liveLink: "https://crisis-grid-ai-three.vercel.app/"
  },
  {
    title: "Customer Churn Predictor",
    description:
      "Full-stack predictive ML application utilizing lazy-loaded Scikit-learn pipelines, combined with a LangGraph & FAISS AI Retention Specialist Agent.",
    tags: ["FastAPI", "LangGraph", "Scikit-Learn", "FAISS", "Streamlit"],
    gradient: "from-[#10B981]/20 to-black/40",
    letter: "C",
    letterColor: "#10B981",
    featured: true,
    githubLink: "https://github.com/Aaru5h/Customer_Churn",
    liveLink: "https://customer-churn-yf2q.onrender.com/",
  },
  {
    title: "ShelfSync",
    description:
      "Smart book and inventory management platform designed for multi-store synchronization, real-time tracking, and automated stock alerts.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    gradient: "from-[#F59E0B]/20 to-black/40",
    letter: "S",
    letterColor: "#F59E0B",
    featured: false,
    githubLink: "https://github.com/harshilv17/ShelfSync",
    liveLink: "https://shelf-sync-five.vercel.app/"
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
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
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
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-2 transition-colors hover:text-white"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/45 transition-colors hover:text-white"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
