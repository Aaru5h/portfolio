"use client";

import { useEffect, useRef, useState } from "react";

export default function FixedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let active = true;

    function tickCards() {
      if (!active) return;
      const container = containerRef.current;
      const grid = gridRef.current;
      const trigger = document.getElementById("cards-trigger");

      if (!container || !grid || !trigger) {
        requestAnimationFrame(tickCards);
        return;
      }

      // If mobile, keep things clean, relative, and fully visible
      if (window.innerWidth < 768) {
        container.style.opacity = "1";
        container.style.pointerEvents = "auto";
        grid.style.maskImage = "none";
        grid.style.webkitMaskImage = "none";
        requestAnimationFrame(tickCards);
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const triggerTop = rect.top + window.scrollY;
      const triggerHeight = rect.height;
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
      const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0;

      container.style.opacity = String(containerOpacity);
      container.style.pointerEvents = containerOpacity > 0.1 ? "auto" : "none";

      const revealPct = progress * 130;
      grid.style.maskImage = `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;
      grid.style.webkitMaskImage = `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;

      requestAnimationFrame(tickCards);
    }

    requestAnimationFrame(tickCards);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="fixed-cards"
      style={{
        position: isMobile ? "relative" : "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        padding: isMobile ? "4rem 1.5rem" : "2rem 2.5rem",
        opacity: isMobile ? 1 : 0,
        pointerEvents: isMobile ? "auto" : "none",
        transition: isMobile ? "none" : "opacity 0.1s ease-out",
      }}
    >
      <div
        ref={gridRef}
        className="grid"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2.5rem",
        }}
      >
        <div className="card">
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            AI/ML Engineering
          </h3>
          <p style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.6 }}>
            Designing, training, and deploying models — from classical ML to LLM-powered applications
            that reach production.
          </p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Full Stack Development
          </h3>
          <p style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.6 }}>
            End-to-end product development with modern web frameworks, APIs, and cloud infrastructure
            that scales.
          </p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Product Mindset
          </h3>
          <p style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.6 }}>
            I care about shipping things people actually use — performance, polish, and user experience
            included.
          </p>
        </div>
      </div>
    </div>
  );
}
