"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetwork({ density = "normal" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let nodes = [];
    let dpr = 1;
    const count = density === "dense" ? 76 : 50;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      let seed = 831;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      nodes = Array.from({ length: count }, (_, i) => ({
        x: random() * width, y: random() * height,
        phase: random() * Math.PI * 2,
        radius: i % 11 === 0 ? 2.8 : 1.25 + random() * 1.1,
        speed: .0003 + random() * .0006,
      }));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const draw = (now) => {
      context.clearRect(0, 0, width, height);
      const points = nodes.map((node) => ({
        x: node.x + Math.sin(now * node.speed + node.phase) * 7,
        y: node.y + Math.cos(now * node.speed * .83 + node.phase) * 6,
        r: node.radius,
        phase: node.phase,
      }));
      const connections = [];
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i]; const b = points[j];
          const dx = b.x - a.x; const dy = b.y - a.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 140) {
            const opacity = (1 - distance / 140) * .36;
            context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(166,255,78,${opacity})`; context.lineWidth = .7; context.stroke();
            connections.push({ a, b, phase: (i * 13 + j * 7) % 1900 });
          }
        }
      }
      connections.forEach(({ a, b, phase }) => {
        const progress = ((now * .00032 + phase / 1900) % 1);
        const x = a.x + (b.x - a.x) * progress;
        const y = a.y + (b.y - a.y) * progress;
        context.beginPath(); context.arc(x, y, 1.2, 0, Math.PI * 2);
        context.fillStyle = "rgba(219,255,153,.95)"; context.shadowColor = "#b6ff51"; context.shadowBlur = 8; context.fill(); context.shadowBlur = 0;
      });
      points.forEach((point) => {
        const pulse = .62 + .38 * Math.sin(now * .002 + point.phase);
        context.beginPath(); context.arc(point.x, point.y, point.r * (point.r > 2 ? 1 : pulse), 0, Math.PI * 2);
        context.fillStyle = `rgba(207,255,131,${.62 + pulse * .35})`;
        context.shadowColor = "#a6ff4e"; context.shadowBlur = point.r > 2 ? 18 : 8; context.fill(); context.shadowBlur = 0;
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [density]);
  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}
