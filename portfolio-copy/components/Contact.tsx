"use client";

import { motion } from "framer-motion";

const EMAIL = "aarushgupta707.2@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/Aaru5h", handle: "@Aaru5h" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aarush-gupta-2946783a6/",
    handle: "in/aarush-gupta",
  },
  { label: "X / Twitter", href: "https://x.com/AarushG61471880", handle: "@AarushG61471880" },
  { label: "Email", href: `mailto:${EMAIL}`, handle: EMAIL },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-4 border-t border-white/10 pt-5">
            <span className="label text-accent">05</span>
            <span className="label">Contact</span>
          </div>

          <h2 className="mt-8 max-w-4xl text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.02] font-medium tracking-[-0.03em]">
            Let&apos;s build something{" "}
            <span className="font-serif text-accent italic font-normal">together</span>.
          </h2>

          <p className="text-muted mt-6 max-w-md leading-relaxed">
            Have a project in mind, a role to fill, or just want to argue about model
            evals? My inbox is open — usually a reply within 24 hours.
          </p>

          <a
            href={`mailto:${EMAIL}`}
            className="group mt-12 inline-flex items-center gap-4 text-2xl font-medium tracking-tight sm:text-4xl"
          >
            <span className="wipe pb-1">{EMAIL}</span>
            <span className="text-accent inline-block transition-transform duration-500 group-hover:translate-x-2">
              ↗
            </span>
          </a>
        </motion.div>

        <div className="mt-20 grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#070708] p-6 transition-colors duration-500 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="label">{social.label}</span>
                <span className="text-accent translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </div>
              <div className="text-muted group-hover:text-ink mt-4 truncate font-mono text-sm transition-colors">
                {social.handle}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
