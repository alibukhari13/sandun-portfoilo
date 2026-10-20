"use client";

import { useEffect, useRef } from "react";

const polygons = [
  [[-168, 71], [-140, 70], [-105, 73], [-88, 74], [-70, 68], [-56, 52], [-64, 46], [-70, 41], [-76, 35], [-81, 25], [-90, 29], [-97, 26], [-110, 23], [-115, 32], [-124, 40], [-124, 48], [-136, 57], [-153, 60], [-166, 66]],
  [[-80, 12], [-70, 12], [-60, 10], [-50, 2], [-35, -6], [-39, -22], [-48, -28], [-58, -38], [-68, -52], [-74, -46], [-72, -18], [-78, 2], [-81, 8]],
  [[-10, 36], [-9, 43], [-2, 43], [2, 51], [-5, 58], [5, 62], [12, 55], [24, 60], [30, 70], [28, 46], [20, 40], [10, 44], [0, 36]],
  [[-17, 21], [-10, 32], [10, 37], [25, 32], [32, 31], [43, 12], [51, 12], [42, -2], [35, -26], [19, -35], [14, -18], [8, 4], [-8, 5], [-16, 12]],
  [[26, 40], [36, 46], [40, 36], [48, 42], [60, 46], [72, 48], [80, 56], [90, 70], [110, 72], [140, 70], [160, 66], [180, 66], [180, 50], [160, 46], [145, 44], [140, 35], [128, 32], [122, 22], [110, 8], [104, 1], [98, 8], [80, 6], [72, 8], [68, 22], [60, 25], [54, 26], [44, 12], [36, 14], [32, 28], [28, 36]],
  [[114, -22], [128, -14], [142, -11], [146, -18], [153, -27], [150, -38], [136, -35], [116, -35], [114, -28]],
  [[-68, 76], [-60, 83], [-40, 83], [-20, 80], [-20, 70], [-44, 60], [-52, 66], [-68, 70]],
];

const cities = [
  [40.7, -74.2], [40.2, -74.6], [34.05, -118.2], [41.9, -87.6], [29.8, -95.4], [33.7, -84.4], [47.6, -122.3], [19.4, -99.1],
  [-23.5, -46.6], [-34.6, -58.4], [51.5, -0.12], [48.86, 2.35], [52.5, 13.4], [41.9, 12.5], [40.4, -3.7], [59.9, 10.75],
  [55.75, 37.6], [41, 29], [30.05, 31.2], [6.5, 3.4], [-26.2, 28.05], [-33.9, 18.4], [25.2, 55.3], [19.07, 72.88],
  [28.6, 77.2], [6.93, 79.86], [1.35, 103.8], [13.75, 100.5], [22.3, 114.2], [31.2, 121.5], [39.9, 116.4], [35.7, 139.7],
  [37.57, 126.98], [-33.87, 151.2], [-37.8, 144.9], [35.7, 51.4], [24.7, 46.7], [14.6, 121], [21.3, -157.8], [64.1, -21.9],
];

function inside(lon, lat, ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersect = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi + 0.00001) + xi;
    if (intersect) hit = !hit;
  }
  return hit;
}

function buildDots() {
  const dots = [];
  for (let lat = -55; lat <= 76; lat += 2.15) {
    for (let lon = -170; lon <= 180; lon += 2.15) {
      if (polygons.some((ring) => inside(lon, lat, ring))) dots.push([lat, lon, 0]);
    }
  }
  cities.forEach(([lat, lon]) => dots.push([lat, lon, 1]));
  return dots;
}

const DOTS = buildDots();

function project(lat, lon, rot, radius) {
  const phi = (lat * Math.PI) / 180;
  const lambda = ((lon + rot) * Math.PI) / 180;
  const x = Math.cos(phi) * Math.sin(lambda);
  const y = Math.sin(phi);
  const z = Math.cos(phi) * Math.cos(lambda);
  return { x, y, z };
}

export default function SatelliteGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let raf = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.max(1, Math.round(rect.width * dpr));
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width = size;
        canvas.height = size;
      }
      const radius = size * 0.42;
      const cx = size / 2;
      const cy = size / 2;
      context.clearRect(0, 0, size, size);
      const ocean = context.createRadialGradient(cx - radius * 0.28, cy - radius * 0.32, radius * 0.12, cx, cy, radius);
      ocean.addColorStop(0, "#2f8ea0");
      ocean.addColorStop(0.42, "#12384a");
      ocean.addColorStop(1, "#07141c");
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = ocean;
      context.fill();

      const rot = reduce ? 28 : (frame * 0.18) % 360;
      DOTS.forEach(([lat, lon, city]) => {
        const point = project(lat, lon, rot, radius);
        if (point.z <= 0.05) return;
        const px = cx + point.x * radius;
        const py = cy - point.y * radius;
        const alpha = 0.25 + point.z * 0.75;
        if (city) {
          context.beginPath();
          context.fillStyle = `rgba(230, 255, 150, ${alpha})`;
          context.arc(px, py, (2.2 + point.z * 2.4) * dpr, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillStyle = `rgba(150, 235, 120, ${0.35 + alpha * 0.65})`;
          const mark = Math.max(1.8, 1.6 * dpr);
          context.fillRect(px, py, mark, mark);
        }
      });

      const shade = context.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.2, cx, cy, radius);
      shade.addColorStop(0, "rgba(255,255,255,0.14)");
      shade.addColorStop(0.45, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(0,0,0,0.55)");
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = shade;
      context.fill();

      context.beginPath();
      context.arc(cx, cy, radius + 1.5 * dpr, 0, Math.PI * 2);
      context.strokeStyle = "rgba(170, 255, 190, 0.45)";
      context.lineWidth = 2 * dpr;
      context.stroke();
      context.beginPath();
      context.arc(cx, cy, radius + 7 * dpr, 0, Math.PI * 2);
      context.strokeStyle = "rgba(120, 255, 160, 0.16)";
      context.lineWidth = 8 * dpr;
      context.stroke();

      frame += 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="sat-globe-canvas" aria-hidden="true" />;
}

export function WorldDots() {
  const width = 280;
  const height = 150;
  const land = [];
  for (let lat = -50; lat <= 74; lat += 4) {
    for (let lon = -168; lon <= 180; lon += 5) {
      if (polygons.some((ring) => inside(lon, lat, ring))) {
        land.push([(lon + 180) / 360 * width, (90 - lat) / 180 * height]);
      }
    }
  }
  const pins = [
    [-74.2, 40.7],
    [79.86, 6.93],
    [139.7, 35.7],
  ].map(([lon, lat]) => [(lon + 180) / 360 * width, (90 - lat) / 180 * height]);

  return (
    <svg className="xp-map" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <rect width={width} height={height} rx="12" fill="#07131c" />
      {land.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="1.55" fill="#8fbf86" />)}
      <path d={`M${pins[0][0]} ${pins[0][1]} Q ${(pins[0][0] + pins[1][0]) / 2} ${Math.min(pins[0][1], pins[1][1]) - 28} ${pins[1][0]} ${pins[1][1]}`} fill="none" stroke="#c6ff57" strokeWidth="1.1" strokeDasharray="3 3" />
      <path d={`M${pins[1][0]} ${pins[1][1]} Q ${(pins[1][0] + pins[2][0]) / 2} ${pins[1][1] - 26} ${pins[2][0]} ${pins[2][1]}`} fill="none" stroke="#9dffd2" strokeWidth="1" strokeDasharray="3 3" />
      {pins.map(([x, y], index) => <circle key={index} className={index === 0 ? "xp-hot" : index === 1 ? "xp-hot xp-hot-b" : "xp-hot xp-hot-c"} cx={x} cy={y} r="3.2" fill={index === 1 ? "#9dffd2" : "#d6ff6a"} />)}
      <text x="14" y="142" fill="#c5d4cc" fontSize="8" fontFamily="Inter, sans-serif">New Jersey · Colombo · Research · Industry</text>
    </svg>
  );
}
