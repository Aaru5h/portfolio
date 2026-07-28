"use client";

import { useEffect, useRef } from "react";

// ponytail: node count scales with width so phones don't get a dense mesh
// behind the copy. Tune the divisor, not the clamp.
const nodeCount = (w: number) => Math.min(54, Math.max(18, Math.round(w / 26)));
const CONNECTION_DIST = 150;
const MOUSE_RADIUS = 190;
const PULSE_CHANCE = 0.006;

// Hue band: lime accent → cool grey-green. Keeps the canvas monochrome-ish
// so it never competes with the type.
const HUE_A = 68;
const HUE_B = 96;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  layer: number;
  pulsePhase: number;
};

type Pulse = { ax: number; ay: number; bx: number; by: number; t: number; speed: number };

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId = 0;

    function resize() {
      // Assigning width/height also resets the transform, so re-scale each time.
      canvas!.width = canvas!.offsetWidth * devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const logicalW = () => canvas.offsetWidth;
    const logicalH = () => canvas.offsetHeight;

    const nodes: Node[] = Array.from({ length: nodeCount(logicalW()) }, () => ({
      x: rand(0, logicalW()),
      y: rand(0, logicalH()),
      vx: rand(-0.22, 0.22),
      vy: rand(-0.22, 0.22),
      r: rand(1.2, 3),
      layer: Math.random(),
      pulsePhase: rand(0, Math.PI * 2),
    }));

    const pulses: Pulse[] = [];

    function onMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let frame = 0;

    function draw() {
      const lw = logicalW();
      const lh = logicalH();
      ctx!.clearRect(0, 0, lw, lh);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      frame++;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > lw) n.vx *= -1;
        if (n.y < 0 || n.y > lh) n.vy *= -1;
        n.x = Math.max(0, Math.min(lw, n.x));
        n.y = Math.max(0, Math.min(lh, n.y));

        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 1.2;
          n.vx += (dx / dist) * force * 0.12;
          n.vy += (dy / dist) * force * 0.12;
        }

        n.vx *= 0.994;
        n.vy *= 0.994;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.22;
            const hue = lerp(HUE_A, HUE_B, (a.layer + b.layer) / 2);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `hsla(${hue}, 45%, 60%, ${alpha})`;
            ctx!.lineWidth = 0.55;
            ctx!.stroke();

            if (Math.random() < PULSE_CHANCE) {
              pulses.push({
                ax: a.x,
                ay: a.y,
                bx: b.x,
                by: b.y,
                t: 0,
                speed: rand(0.01, 0.022),
              });
            }
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t > 1) {
          pulses.splice(i, 1);
          continue;
        }
        const px = lerp(p.ax, p.bx, p.t);
        const py = lerp(p.ay, p.by, p.t);
        const glow = Math.sin(p.t * Math.PI);
        ctx!.beginPath();
        ctx!.arc(px, py, 1.4 + glow * 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(74, 90%, 70%, ${glow * 0.9})`;
        ctx!.fill();

        const grad = ctx!.createRadialGradient(px, py, 0, px, py, 7 + glow * 6);
        grad.addColorStop(0, `hsla(74, 90%, 72%, ${glow * 0.25})`);
        grad.addColorStop(1, `hsla(74, 90%, 72%, 0)`);
        ctx!.beginPath();
        ctx!.arc(px, py, 7 + glow * 6, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      }

      for (const n of nodes) {
        const pulse = Math.sin(frame * 0.025 + n.pulsePhase) * 0.3 + 0.7;
        const depthAlpha = lerp(0.25, 0.9, n.layer);
        const r = n.r * lerp(0.6, 1.25, n.layer);
        const hue = lerp(HUE_A, HUE_B, n.layer);

        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        glow.addColorStop(0, `hsla(${hue}, 70%, 65%, ${depthAlpha * pulse * 0.14})`);
        glow.addColorStop(1, `hsla(${hue}, 70%, 65%, 0)`);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${hue}, 60%, 75%, ${depthAlpha * pulse * 0.8})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
      {/* hairline grid, faded toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 85%)",
        }}
      />
    </div>
  );
}
