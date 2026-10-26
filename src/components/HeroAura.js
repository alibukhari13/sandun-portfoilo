"use client";

import { useEffect, useRef } from "react";

const palettes = {
  dark: {
    wash: ["rgba(96,220,130,.2)", "rgba(0,0,0,0)"],
    link: "176,255,90",
    node: "214,255,150",
    hub: "rgba(240,255,196,.96)",
    glow: "#c8ff4e",
    globe: ["rgba(170,255,226,.24)", "rgba(18,130,104,.1)", "rgba(0,0,0,0)"],
    rim: "rgba(176,255,232,.82)",
    wire: "150,255,226",
    spark: "rgba(244,255,210,.95)",
  },
  light: {
    wash: ["rgba(64,150,72,.18)", "rgba(255,255,255,0)"],
    link: "28,104,46",
    node: "24,108,46",
    hub: "rgba(16,86,36,.95)",
    glow: "#1f7a34",
    globe: ["rgba(16,150,132,.2)", "rgba(12,110,100,.08)", "rgba(255,255,255,0)"],
    rim: "rgba(8,118,108,.78)",
    wire: "14,128,118",
    spark: "rgba(12,90,70,.9)",
  },
};

export default function HeroAura() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let nodes = [];
    let theme = "dark";
    const readTheme = () => { theme = document.documentElement.dataset.theme === "light" ? "light" : "dark"; };
    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      let seed = 41;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      const hubs = [
        [.12, .16, 5.4], [.28, .08, 4.6], [.46, .07, 4], [.64, .12, 4.8],
        [.88, .2, 5], [.94, .42, 4.2], [.78, .62, 3.8], [.1, .42, 4.4], [.2, .68, 4.6], [.04, .58, 3.6],
      ];
      nodes = hubs.map(([x, y, radius]) => ({ x: x * width, y: y * height, radius, phase: random() * Math.PI * 2, hub: true }));
      for (let i = 0; i < 190; i += 1) {
        const side = random();
        const x = side < .42 ? random() * .42 : side < .82 ? .56 + random() * .42 : .16 + random() * .68;
        const y = random() < .72 ? random() * .58 : .48 + random() * .42;
        nodes.push({
          x: x * width,
          y: y * height,
          radius: random() > .9 ? 2.5 : .7 + random() * .85,
          phase: random() * Math.PI * 2,
          hub: false,
        });
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const globe = (now, ink) => {
      const cx = width * .8;
      const cy = height * .5;
      const breath = reduce ? 1 : 1 + Math.sin(now * .0007) * .012;
      const radius = Math.min(width, height) * .25 * breath;
      const spin = reduce ? .6 : now * .00011;
      const fill = context.createRadialGradient(cx - radius * .28, cy - radius * .32, radius * .05, cx, cy, radius);
      fill.addColorStop(0, ink.globe[0]);
      fill.addColorStop(.6, ink.globe[1]);
      fill.addColorStop(1, ink.globe[2]);
      context.fillStyle = fill;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fill();
      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.clip();
      for (let i = 0; i < 7; i += 1) {
        const rx = Math.abs(Math.cos(spin + i * .45)) * radius;
        context.strokeStyle = `rgba(${ink.wire},${rx / radius > .5 ? .5 : .26})`;
        context.lineWidth = .85;
        context.beginPath();
        context.ellipse(cx, cy, Math.max(1, rx), radius, 0, 0, Math.PI * 2);
        context.stroke();
      }
      for (let i = -3; i <= 3; i += 1) {
        const k = i / 4;
        const ry = radius * Math.sqrt(Math.max(0, 1 - k * k));
        context.strokeStyle = i === 0 ? `rgba(${ink.wire},.62)` : `rgba(${ink.wire},.3)`;
        context.beginPath();
        context.ellipse(cx, cy + radius * k, ry, Math.max(1.2, ry * .16), 0, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();
      context.strokeStyle = ink.rim;
      context.lineWidth = 1.35;
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = `rgba(${ink.wire},.85)`;
      context.lineWidth = 2.2;
      context.beginPath();
      context.arc(cx, cy, radius * .98, spin, spin + 1.15);
      context.stroke();
      if (!reduce) {
        for (let i = 0; i < 7; i += 1) {
          const angle = spin * 2.4 + i * ((Math.PI * 2) / 7);
          const ox = cx + Math.cos(angle) * radius * 1.08;
          const oy = cy + Math.sin(angle) * radius * .42;
          context.beginPath();
          context.arc(ox, oy, i % 3 === 0 ? 2.1 : 1.25, 0, Math.PI * 2);
          context.fillStyle = ink.spark;
          context.fill();
        }
      }
    };

    const draw = (now) => {
      const ink = palettes[theme];
      context.clearRect(0, 0, width, height);
      const wash = context.createRadialGradient(width * .42, height * .34, 10, width * .5, height * .46, width * .7);
      wash.addColorStop(0, ink.wash[0]);
      wash.addColorStop(1, ink.wash[1]);
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);
      globe(now, ink);
      const points = nodes.map((node) => ({
        ...node,
        px: node.x + (reduce ? 0 : Math.sin(now * .00035 + node.phase) * 3.2),
        py: node.y + (reduce ? 0 : Math.cos(now * .00028 + node.phase) * 2.2),
      }));
      const reach = Math.min(width, height) * .135;
      context.lineWidth = .75;
      context.lineCap = "round";
      const sparks = [];
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const distance = Math.hypot(points[j].px - points[i].px, points[j].py - points[i].py);
          const limit = points[i].hub && points[j].hub ? reach * 1.65 : reach;
          if (distance > limit) continue;
          const alpha = (1 - distance / limit) * (points[i].hub || points[j].hub ? .62 : .42);
          context.strokeStyle = `rgba(${ink.link},${alpha})`;
          context.beginPath();
          context.moveTo(points[i].px, points[i].py);
          context.lineTo(points[j].px, points[j].py);
          context.stroke();
          if ((i * 3 + j) % 17 === 0) sparks.push([points[i], points[j], (i * 13 + j) % 1000]);
        }
      }
      if (!reduce) {
        sparks.forEach(([a, b, phase]) => {
          const t = ((now * .00022) + phase / 1000) % 1;
          context.beginPath();
          context.arc(a.px + (b.px - a.px) * t, a.py + (b.py - a.py) * t, 1.2, 0, Math.PI * 2);
          context.fillStyle = ink.spark;
          context.fill();
        });
      }
      points.forEach((point) => {
        const pulse = .8 + .2 * Math.sin(now * .0018 + point.phase);
        if (point.hub) {
          context.beginPath();
          context.arc(point.px, point.py, point.radius * 2.4, 0, Math.PI * 2);
          context.fillStyle = `rgba(${ink.node},.16)`;
          context.fill();
        }
        context.beginPath();
        context.arc(point.px, point.py, point.radius * (point.hub ? 1 : pulse), 0, Math.PI * 2);
        context.fillStyle = point.hub ? ink.hub : `rgba(${ink.node},${.45 + pulse * .4})`;
        context.shadowColor = ink.glow;
        context.shadowBlur = point.hub ? 14 : 0;
        context.fill();
        context.shadowBlur = 0;
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);
  return <canvas ref={canvasRef} className="hero-aura" aria-hidden="true" />;
}
