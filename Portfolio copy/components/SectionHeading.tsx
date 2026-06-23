"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <span className="text-sm font-semibold tracking-widest text-accent-2 uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-white/55">{subtitle}</p>}
    </motion.div>
  );
}
