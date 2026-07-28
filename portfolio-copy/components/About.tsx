"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionHeading from "./SectionHeading";

const paragraph =
  "I build products where solid engineering meets machine intelligence. A fast frontend, a resilient backend, a model pipeline that survives contact with real users — I like owning the whole thing. My current focus is LLM-powered applications, retrieval systems, and the infrastructure that makes AI useful in real products, not just in notebooks.";

const capabilities = [
  {
    title: "AI / ML Engineering",
    text: "Designing, training and deploying models — from classical ML to LLM-powered applications and RAG pipelines.",
  },
  {
    title: "Full-Stack Development",
    text: "End-to-end product work: modern web frameworks, typed APIs, databases, and cloud infrastructure.",
  },
  {
    title: "Product Mindset",
    text: "I care about shipping things people actually use — performance, polish and UX included.",
  },
];

/** Word brightens as it passes through the viewport. */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = paragraph.split(" ");

  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Engineer at the intersection of{" "}
              <span className="font-serif italic font-normal">web</span> and{" "}
              <span className="font-serif italic font-normal">intelligence</span>.
            </>
          }
        />

        <p
          ref={ref}
          className="max-w-4xl flex-wrap text-xl leading-[1.6] font-light sm:text-2xl"
        >
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1.5) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>

        <div className="mt-20 grid gap-px border-y border-white/10 bg-white/10 md:grid-cols-3">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#070708] p-7 transition-colors duration-500 hover:bg-white/[0.03]"
            >
              <span className="label text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-lg font-medium tracking-tight">{c.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
