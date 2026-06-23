"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.35));
      sectionRef.current.style.opacity = String(fade);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "opacity 0.1s ease-out",
      }}
    >
      <div
        className="gradient-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent, transparent)",
        }}
      />
      <div
        className="content"
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          textAlign: "center",
          padding: "0 1.5rem 6.5rem",
        }}
      >
        <p
          className="subtitle"
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
            marginBottom: "1rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Aarush Gupta — Full Stack &amp; AI/ML Engineer
        </p>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 5.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "52rem",
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          Building{" "}
          <span className="underlined" style={{ position: "relative", display: "inline-block" }}>
            <span
              className="line"
              style={{
                position: "absolute",
                bottom: "0.25rem",
                left: 0,
                width: "100%",
                height: "10px",
                background: "#2C5C88",
                borderRadius: "2px",
                opacity: 0.8,
              }}
            />
            <span style={{ position: "relative" }}>intelligent products</span>
          </span>{" "}
          end to end.
        </h1>
        <div
          className="ctas"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            className="code-box"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.75rem",
              padding: "0.875rem 1.75rem",
            }}
          >
            <span className="prompt" style={{ color: "#2C5C88", fontFamily: "monospace", fontSize: "0.875rem" }}>
              &gt;
            </span>
            <code style={{ fontSize: "0.875rem", color: "#e5e7eb", fontFamily: "monospace" }}>
              npx aarush.dev
            </code>
          </div>
          <a
            href="#projects"
            className="cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#2C5C88",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "0.75rem",
              padding: "0.875rem 2rem",
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#3a7aad";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#2C5C88";
            }}
          >
            View My Work <span style={{ fontSize: "1.1em" }}>&rarr;</span>
          </a>
        </div>
      </div>
      <div
        className="bounce-arrow"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          paddingBottom: "2.5rem",
        }}
      >
        <a href="#about" aria-label="Scroll down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="animate-bounce-custom"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "#6b7280",
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
