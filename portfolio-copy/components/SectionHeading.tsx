"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16"
    >
      <div className="flex items-baseline gap-4 border-t border-white/10 pt-5">
        <span className="label text-accent">{index}</span>
        <span className="label">{eyebrow}</span>
      </div>
      <h2 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted mt-5 max-w-xl text-base leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
