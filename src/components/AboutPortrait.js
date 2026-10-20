"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutPortrait() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let seed = 97;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      particles = Array.from({ length: 190 }, (_, i) => {
        const onRing = i < 120;
        return {
          angle: random() * Math.PI * 2,
          band: onRing ? 0.88 + random() * 0.3 : 0.2 + random() * 1.3,
          size: onRing ? 0.6 + random() * 1.5 : 0.4 + random() * 0.9,
          speed: (random() - 0.5) * 0.0016,
          phase: random() * Math.PI * 2,
        };
      });
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.4;
      const radius = Math.min(width, height) * 0.42;

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius * 1.35);
      glow.addColorStop(0, "rgba(120, 230, 60, 0.20)");
      glow.addColorStop(0.55, "rgba(70, 150, 40, 0.10)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const pulse = reduce ? 1 : 0.85 + Math.sin(now * 0.0016) * 0.15;
      ctx.save();
      ctx.shadowColor = "#a8ff3c";
      ctx.shadowBlur = 26 * pulse;
      ctx.strokeStyle = `rgba(190, 255, 80, ${0.9 * pulse})`;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(190, 255, 80, 0.28)";
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.9, 0, Math.PI * 2);
      ctx.stroke();

      const sweep = reduce ? 0 : now * 0.0006;
      const arc = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      arc.addColorStop(0, "rgba(240, 255, 190, 0)");
      arc.addColorStop(0.5, "rgba(240, 255, 190, 0.95)");
      arc.addColorStop(1, "rgba(240, 255, 190, 0)");
      ctx.strokeStyle = arc;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, sweep, sweep + 0.9);
      ctx.stroke();
      ctx.restore();

      particles.forEach((p) => {
        const angle = p.angle + (reduce ? 0 : now * p.speed * 0.05);
        const r = radius * p.band;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const twinkle = reduce ? 0.8 : 0.45 + 0.55 * Math.sin(now * 0.002 + p.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(214, 255, 140, ${0.25 + twinkle * 0.65})`;
        ctx.shadowColor = "#b6ff4a";
        ctx.shadowBlur = p.size > 1.4 ? 8 : 0;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    const observer = new ResizeObserver(() => { resize(); if (reduce) draw(0); });
    observer.observe(canvas);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, []);

  return (
    <div className="about-photo">
      <canvas ref={canvasRef} className="about-field" aria-hidden="true" />
      <div className="about-cutout-wrap">
        <Image className="about-cutout" src="/sandun-about-cutout.png" alt="Sandun Munasinghe seated in a navy suit" fill priority sizes="(max-width: 700px) 90vw, 40vw" />
      </div>
      <div className="about-photo-caption">
        <strong><i aria-hidden="true" />Sandun Munasinghe</strong>
        <span>Graduate Research Assistant<br />&amp; Machine Learning Engineer</span>
      </div>
    </div>
  );
}
