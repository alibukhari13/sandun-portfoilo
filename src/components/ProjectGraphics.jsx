"use client";

import { useEffect, useRef, useState } from "react";

const truthfulness = [
  { value: 89.7, label: "Baseline", from: "#e8ff8a", to: "#8ed63a", soft: "#c9ff54" },
  { value: 75.6, label: "Conspiracy", from: "#9af5b0", to: "#2fb07a", soft: "#6fe3a0" },
  { value: 72.0, label: "Popular Myth", from: "#7aecd0", to: "#1f9e88", soft: "#5fd4b8" },
  { value: 60.5, label: "Force Wrong", from: "#d4f56e", to: "#6fb83a", soft: "#b8e84a" },
];

const agents = [
  { id: "A1", role: "Planner", x: 14, y: 4, path: "M91 52 L116 68" },
  { id: "A2", role: "Critic", x: 209, y: 4, path: "M209 52 L184 68" },
  { id: "A3", role: "Researcher", x: 14, y: 138, path: "M91 148 L116 132" },
  { id: "A4", role: "Executor", x: 209, y: 138, path: "M209 148 L184 132" },
];

const plantLabels = [
  { text: "Process Design", x: 206, y: 2, w: 90 },
  { text: "Thermodynamics", x: 0, y: 48, w: 98 },
  { text: "Reactor Design", x: 210, y: 64, w: 90 },
  { text: "Separations", x: 0, y: 124, w: 78 },
  { text: "Process Control", x: 206, y: 146, w: 94 },
];

function useChartLive(threshold = 0.12) {
  const rootRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setLive(true);
    };

    if (typeof IntersectionObserver === "undefined") {
      activate();
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          activate();
          io.disconnect();
        }
      },
      { threshold, rootMargin: "180px 0px" }
    );
    io.observe(node);

    const kickIfVisible = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.08 && rect.bottom > -48) activate();
    };
    const near = window.setTimeout(kickIfVisible, 50);
    const failsafe = window.setTimeout(activate, 1600);

    return () => {
      window.clearTimeout(near);
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [threshold]);

  return [rootRef, live];
}

export function TruthfulnessChart({ idPrefix = "pg" }) {
  const [rootRef, live] = useChartLive();
  const left = 44;
  const right = 292;
  const top = 26;
  const base = 156;
  const scale = (base - top) / 100;
  const slot = (right - left) / truthfulness.length;
  const barWidth = 44;

  return (
    <svg
      ref={rootRef}
      className={`pg-chart${live ? " is-live" : ""}`}
      viewBox="0 0 300 192"
      role="img"
      aria-label="Truthfulness rate by condition: Baseline 89.7%, Conspiracy 75.6%, Popular Myth 72.0%, Force Wrong 60.5%"
    >
      <defs>
        {truthfulness.map((bar, i) => (
          <linearGradient key={bar.label} id={`${idPrefix}-bar-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={bar.from} />
            <stop offset="1" stopColor={bar.to} />
          </linearGradient>
        ))}
        <linearGradient id={`${idPrefix}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".42" stopColor="#ffffff" stopOpacity=".42" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9ff54" stopOpacity=".18" />
          <stop offset="1" stopColor="#c9ff54" stopOpacity="0" />
        </linearGradient>
        <filter id={`${idPrefix}-bar-glow`} x="-70%" y="-40%" width="240%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id={`${idPrefix}-plot`}>
          <rect x={left} y={top - 4} width={right - left} height={base - top + 6} rx="2" />
        </clipPath>
      </defs>

      <rect className="pg-chart-floor" x={left} y={base - 18} width={right - left} height="18" fill={`url(#${idPrefix}-floor)`} />

      <text className="pg-chart-title" x={(left + right) / 2} y="12" textAnchor="middle">
        Truthfulness Rate (%)
      </text>

      {[0, 25, 50, 75, 100].map((tick) => {
        const y = base - tick * scale;
        return (
          <g key={tick} className="pg-grid-row">
            <line className="pg-grid" x1={left} y1={y} x2={right} y2={y} />
            <text className="pg-tick" x={left - 8} y={y + 3.5} textAnchor="end">
              {tick}
            </text>
          </g>
        );
      })}

      <path className="pg-axis" d={`M${left} ${top - 4} V${base} H${right}`} fill="none" />

      {/* baseline reference */}
      <g className="pg-baseline-ref" style={{ "--d": "180ms" }}>
        <line
          className="pg-baseline-line"
          x1={left}
          y1={base - 89.7 * scale}
          x2={right}
          y2={base - 89.7 * scale}
        />
        <text className="pg-baseline-label" x={right - 2} y={base - 89.7 * scale - 5} textAnchor="end">
          baseline
        </text>
      </g>

      <g clipPath={`url(#${idPrefix}-plot)`}>
        {truthfulness.map((bar, i) => {
          const x = left + i * slot + (slot - barWidth) / 2;
          const height = bar.value * scale;
          const y = base - height;
          return (
            <g key={bar.label} className="pg-bar" style={{ "--d": `${i * 140}ms`, "--soft": bar.soft }}>
              <rect
                className="pg-bar-halo"
                x={x - 3}
                y={y}
                width={barWidth + 6}
                height={height}
                rx="5"
                fill={bar.soft}
                filter={`url(#${idPrefix}-bar-glow)`}
              />
              <rect
                className="pg-bar-fill"
                x={x}
                y={y}
                width={barWidth}
                height={height}
                rx="5"
                fill={`url(#${idPrefix}-bar-${i})`}
              />
              <rect className="pg-bar-sheen" x={x + 2} y={y} width={barWidth * 0.34} height={height} rx="3" fill={`url(#${idPrefix}-sheen)`} />
              <rect className="pg-bar-cap" x={x + 4} y={y + 2.5} width={barWidth - 8} height="3.5" rx="1.5" fill="#ffffff" />
              <circle className="pg-bar-spark" cx={x + barWidth / 2} cy={y + 2} r="2.2" fill={bar.from} />
            </g>
          );
        })}
      </g>

      {truthfulness.map((bar, i) => {
        const x = left + i * slot + (slot - barWidth) / 2;
        const height = bar.value * scale;
        const y = base - height;
        return (
          <g key={`${bar.label}-meta`} className="pg-bar-meta" style={{ "--d": `${i * 140}ms` }}>
            <text className="pg-value" x={x + barWidth / 2} y={y - 8} textAnchor="middle">
              {bar.value.toFixed(1)}%
            </text>
            <text className="pg-label" x={x + barWidth / 2} y={base + 18} textAnchor="middle">
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function AgentsDiagram({ idPrefix = "pg" }) {
  const [rootRef, live] = useChartLive();
  return (
    <svg ref={rootRef} className={`pg-agents${live ? " is-live" : ""}`} viewBox="0 0 300 200" role="img" aria-label="Four agents — Planner, Critic, Researcher, Executor — converging on consensus">
      <defs>
        <radialGradient id={`${idPrefix}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#0f4d60" />
          <stop offset=".72" stopColor="#072634" />
          <stop offset="1" stopColor="#051b26" />
        </radialGradient>
        <filter id={`${idPrefix}-cyan-glow`} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <path className="pg-cross" d="M0 100 H300 M150 0 V200" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} className="pg-spark" cx={(i * 53) % 296 + 2} cy={(i * 37) % 196 + 2} r={i % 3 ? 0.7 : 1.2} />
      ))}
      {agents.map((agent) => (
        <g key={agent.id}>
          <path className="pg-link" d={agent.path} />
          <path className="pg-link-flow" d={agent.path} />
        </g>
      ))}
      <circle className="pg-core-halo" cx="150" cy="100" r="52" filter={`url(#${idPrefix}-cyan-glow)`} />
      <circle cx="150" cy="100" r="50" fill={`url(#${idPrefix}-core)`} />
      <circle className="pg-core-ring" cx="150" cy="100" r="50" />
      <circle className="pg-core-orbit" cx="150" cy="100" r="58" />
      <text className="pg-core-text" x="150" y="105" textAnchor="middle">consensus</text>
      {agents.map((agent) => (
        <g key={agent.id} className="pg-agent">
          <rect x={agent.x} y={agent.y} width="77" height="58" rx="10" />
          <text className="pg-agent-id" x={agent.x + 38.5} y={agent.y + 26} textAnchor="middle">{agent.id}</text>
          <text className="pg-agent-role" x={agent.x + 38.5} y={agent.y + 43} textAnchor="middle">{agent.role}</text>
        </g>
      ))}
    </svg>
  );
}

function Column({ x, top, bottom, width, trays = 0, dome = true, fill }) {
  const rx = width / 2, ry = width * 0.2, cx = x + rx;
  return (
    <g className="pg-vessel">
      <path fill={fill || undefined} d={`M${x} ${top} V${bottom} A${rx} ${ry} 0 0 0 ${x + width} ${bottom} V${top} ${dome ? `A${rx} ${rx} 0 0 0 ${x} ${top}` : `A${rx} ${ry} 0 0 0 ${x} ${top}`}`} />
      {Array.from({ length: trays }, (_, i) => {
        const y = top + ((bottom - top) / (trays + 1)) * (i + 1);
        return <path key={i} className="pg-tray" d={`M${x} ${y} A${rx} ${ry} 0 0 0 ${x + width} ${y}`} />;
      })}
      {dome && <circle className="pg-node" cx={cx} cy={top - rx} r="1.6" />}
    </g>
  );
}

export function ChemPlant({ idPrefix = "pg" }) {
  const [rootRef, live] = useChartLive();
  return (
    <svg ref={rootRef} className={`pg-plant${live ? " is-live" : ""}`} viewBox="0 0 300 200" role="img" aria-label="Chemical plant illustration: process design, thermodynamics, reactor design, separations, process control">
      <defs>
        <linearGradient id={`${idPrefix}-vessel-fill`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a36a0" stopOpacity=".8" />
          <stop offset=".5" stopColor="#1d1646" stopOpacity=".6" />
          <stop offset="1" stopColor="#4a36a0" stopOpacity=".8" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#a07bff" stopOpacity=".55" />
          <stop offset="1" stopColor="#9b6bff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${idPrefix}-violet-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} className="pg-star" cx={(i * 61) % 296 + 2} cy={(i * 29) % 150 + 4} r={i % 4 ? 0.6 : 1.1} />
      ))}
      <ellipse cx="160" cy="184" rx="138" ry="16" fill={`url(#${idPrefix}-floor)`} />
      <ellipse className="pg-floor-ring" cx="160" cy="184" rx="124" ry="10" />
      <g className="pg-plant-body" filter={`url(#${idPrefix}-violet-glow)`}>
        <path className="pg-pipe" d="M88 120 V104 H112 M138 60 H150 V40 H178 M138 110 H178 M200 96 H214 V122 M104 150 H120 M160 150 H178 M230 160 H252 V176 M62 176 V160 H76" />
        <Column x={76} top={122} bottom={178} width={28} trays={1} fill={`url(#${idPrefix}-vessel-fill)`} />
        <Column x={112} top={22} bottom={176} width={26} trays={8} fill={`url(#${idPrefix}-vessel-fill)`} />
        <Column x={178} top={58} bottom={176} width={22} trays={6} fill={`url(#${idPrefix}-vessel-fill)`} />
        <Column x={214} top={126} bottom={178} width={22} trays={1} fill={`url(#${idPrefix}-vessel-fill)`} />
        <Column x={120} top={140} bottom={182} width={42} trays={1} dome={false} fill={`url(#${idPrefix}-vessel-fill)`} />
        <path className="pg-ladder" d="M115 34 V172 M118.5 34 V172 M115 48 H118.5 M115 62 H118.5 M115 76 H118.5 M115 90 H118.5 M115 104 H118.5 M115 118 H118.5 M115 132 H118.5 M115 146 H118.5 M115 160 H118.5" />
        {[[150, 40], [178, 40], [138, 110], [214, 96], [104, 150], [252, 176]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="pg-node" cx={cx} cy={cy} r="1.8" />
        ))}
      </g>
      {plantLabels.map((label) => (
        <g key={label.text} className="pg-plant-label">
          <rect x={label.x} y={label.y} width={label.w} height="24" rx="5" />
          <text x={label.x + label.w / 2} y={label.y + 15.5} textAnchor="middle">{label.text}</text>
        </g>
      ))}
    </svg>
  );
}

export function ProjectMark({ type, idPrefix = "pg" }) {
  if (type === "chart") return <TruthfulnessChart idPrefix={idPrefix} />;
  if (type === "agents") return <AgentsDiagram idPrefix={idPrefix} />;
  return <ChemPlant idPrefix={idPrefix} />;
}
