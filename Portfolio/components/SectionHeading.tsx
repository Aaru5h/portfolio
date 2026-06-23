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
      initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <span className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-white/50">{subtitle}</p>}
    </motion.div>
  );
}
