"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const categories = [
  {
    title: "Frontend",
    accent: "from-accent/30 to-accent/5",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    accent: "from-accent-2/30 to-accent-2/5",
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "AI / ML",
    accent: "from-accent-3/30 to-accent-3/5",
    skills: ["PyTorch", "TensorFlow", "LangChain", "Hugging Face", "scikit-learn", "RAG Systems"],
  },
  {
    title: "DevOps & Cloud",
    accent: "from-accent-2/30 to-accent-2/5",
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions", "Kubernetes"],
  },
];

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Python", "PyTorch", "TensorFlow",
  "LangChain", "FastAPI", "PostgreSQL", "Docker", "AWS", "Tailwind CSS",
  "Hugging Face", "Node.js", "Redis", "Kubernetes",
];

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-6 py-28">
      <div className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

      <SectionHeading
        eyebrow="Skills"
        title="My tech stack"
        subtitle="The tools I reach for to build fast, intelligent, production-grade software."
      />

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass glow-card rounded-2xl p-6"
          >
            <div
              className={`mb-4 inline-block rounded-lg bg-gradient-to-br ${cat.accent} px-3 py-1 text-sm font-semibold text-white`}
            >
              {cat.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/65 transition-colors hover:border-accent/40 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max gap-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm whitespace-nowrap text-white/45"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
