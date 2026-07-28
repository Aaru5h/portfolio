"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const categories = [
  {
    id: "AI / ML",
    skills: [
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "Hugging Face",
      "scikit-learn",
      "RAG Systems",
      "Vector DBs",
    ],
  },
  {
    id: "Backend",
    skills: ["Python", "Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    id: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "Infra",
    skills: ["Docker", "CI/CD", "AWS", "Vercel", "Git"],
  },
];

const marqueeItems = [
  "PyTorch", "LangChain", "Next.js", "TypeScript", "FastAPI", "Hugging Face",
  "PostgreSQL", "Docker", "React", "Python", "TensorFlow", "Redis", "AWS",
];

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Stack"
          title="The tools I reach for."
          subtitle="Chosen for shipping fast, intelligent, production-grade software — not for the résumé."
        />

        <div className="border-t border-white/10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 items-baseline gap-4 border-b border-white/10 py-7 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-medium tracking-tight">{cat.id}</h3>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-muted hover:text-ink font-mono text-sm transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="font-mono text-sm whitespace-nowrap text-white/25"
              >
                {item} <span className="text-accent/40">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
