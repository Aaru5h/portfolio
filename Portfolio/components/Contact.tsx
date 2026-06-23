"use client";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const socials = [
  { label: "GitHub", href: "https://github.com/Aaru5h", handle: "@Aaru5h" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aarush-gupta-2946783a6/", handle: "in/aarush-gupta-2946783a6" },
  { label: "X / Twitter", href: "https://x.com/AarushG61471880", handle: "@AarushG61471880" },
  { label: "Email", href: "mailto:aarushgupta707.2@gmail.com", handle: "aarushgupta707.2@gmail.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-28">
      <div className="absolute bottom-0 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[160px]" />

      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        subtitle="Have a project in mind, a role to fill, or just want to talk AI? My inbox is open."
      />

      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass relative mx-auto max-w-3xl rounded-3xl p-8 sm:p-12"
      >
        <div className="text-center">
          <a
            href="mailto:aarushgupta707.2@gmail.com"
            className="inline-block rounded-xl bg-gradient-to-r from-accent to-accent-2 px-8 py-4 font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,108,246,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_40px_-8px_rgba(124,108,246,0.75)]"
          >
            Say Hello
          </a>
          <p className="mt-4 text-sm text-white/40">Usually responds within 24 hours</p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
            >
              <span className="font-medium text-white/75 group-hover:text-white">
                {social.label}
              </span>
              <span className="text-sm text-white/40 group-hover:text-accent-2">
                {social.handle}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
