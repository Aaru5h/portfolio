"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="section-three"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0 2.5rem 8rem",
      }}
    >
      <div
        ref={containerRef}
        className={`inner ${visible ? "visible" : ""}`}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          filter: visible ? "blur(0)" : "blur(8px)",
          transition: "opacity 1s ease-out, transform 1s ease-out, filter 1s ease-out",
        }}
      >
        <p style={{ color: "#d1d5db", fontSize: "1rem", marginBottom: "0.75rem" }}>
          Designing &amp; Engineering
        </p>
        <h2 style={{ fontSize: "clamp(1.875rem, 6vw, 4.5rem)", fontWeight: 700 }}>
          Intelligent Web Systems
        </h2>
      </div>
    </section>
  );
}
