"use client";
import { useEffect, useRef } from "react";

export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      t += 0.0018;
      ctx.fillStyle = "#010101";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const orbs: { x: number; y: number; r: number; c: [number, number, number]; a: number }[] = [
        { x: 0.2 + Math.sin(t * 0.6) * 0.1,  y: 0.18 + Math.cos(t * 0.4) * 0.08, r: 0.62, c: [124, 108, 246], a: 0.09 },
        { x: 0.8 + Math.cos(t * 0.5) * 0.1,  y: 0.28 + Math.sin(t * 0.7) * 0.1,  r: 0.55, c: [34, 211, 238],  a: 0.07 },
        { x: 0.5 + Math.sin(t * 0.8) * 0.12, y: 0.6  + Math.cos(t * 0.3) * 0.1,  r: 0.5,  c: [244, 114, 182], a: 0.06 },
        { x: 0.1 + Math.cos(t * 0.9) * 0.07, y: 0.72 + Math.sin(t * 0.6) * 0.07, r: 0.4,  c: [124, 108, 246], a: 0.045 },
        { x: 0.9 + Math.sin(t * 0.7) * 0.06, y: 0.82 + Math.cos(t * 0.5) * 0.06, r: 0.38, c: [34, 211, 238],  a: 0.045 },
      ];

      for (const { x, y, r, c: [cr, cg, cb], a } of orbs) {
        const cx = x * canvas.width;
        const cy = y * canvas.height;
        const rad = r * Math.min(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
