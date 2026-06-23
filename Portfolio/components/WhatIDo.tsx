"use client";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const cards = [
  {
    num: "01",
    title: "Deep Full Stack",
    desc: "Production-grade web applications built end to end — from database schema to polished UI. Fast, accessible, and battle-tested.",
  },
  {
    num: "02",
    title: "Real AI / ML",
    desc: "Fine-tuned models, retrieval pipelines, and LLM integrations that ship to production — not just Jupyter notebooks.",
  },
  {
    num: "03",
    title: "End-to-End Ownership",
    desc: "From idea to deployment and iteration: design, code, infra, and every layer in between — no hand-offs, no gaps.",
  },
];

export default function WhatIDo() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let rafId: number;

    function tick() {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      const grid = gridRef.current;
      if (!trigger || !panel) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const triggerTop = trigger.getBoundingClientRect().top + window.scrollY;
      const triggerHeight = trigger.offsetHeight;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const start = triggerTop - vh * 0.5;
      const end = triggerTop + triggerHeight - vh * 0.3;
      const range = end - start;
      let progress = range > 0 ? (scrollY - start) / range : 0;
      progress = Math.max(0, Math.min(1, progress));

      const isActive = scrollY >= start - vh * 0.2 && scrollY <= end + vh * 0.3;
      const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - vh * 0.2)) / (vh * 0.2)));
      const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollY) / (vh * 0.3)));
      const opacity = isActive ? Math.min(fadeIn, fadeOut) : 0;

      panel.style.opacity = String(opacity);
      panel.style.pointerEvents = opacity > 0.1 ? "auto" : "none";

      if (grid) {
        const revealPct = progress * 130;
        const isMobile = window.innerWidth < 768;
        const mask = isMobile
          ? `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`
          : `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;
        grid.style.maskImage = mask;
        (grid.style as unknown as { webkitMaskImage: string }).webkitMaskImage = mask;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mounted]);

  const panel = (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        opacity: 0,
        padding: "2rem 2.5rem",
        pointerEvents: "none",
      }}
    >
      <div
        ref={gridRef}
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2.5rem",
        }}
      >
        {cards.map((card) => (
          <div key={card.title}>
            <span
              style={{
                display: "block",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "rgba(124,108,246,0.8)",
                marginBottom: "0.6rem",
                textTransform: "uppercase",
              }}
            >
              {card.num}
            </span>
            <h3
              style={{
                fontSize: "1.375rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.7rem",
                letterSpacing: "-0.02em",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                color: "rgba(209,213,219,0.8)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {mounted && createPortal(panel, document.body)}
      <div ref={triggerRef} style={{ height: "260vh" }} />
    </>
  );
}
