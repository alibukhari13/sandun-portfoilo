const WIDTH = 1200;
const HEIGHT = 340;

function tone(x) {
  const t = x / WIDTH;
  const r = Math.round(47 + (185 - 47) * t);
  const g = Math.round(214 + (255 - 214) * t);
  const b = Math.round(181 + (90 - 181) * t);
  return `rgb(${r},${g},${b})`;
}

export default function ParticleWave({ className = "", rows = 34, phase = 0, lift = 150, amplitude = 34, frequency = .0075, anchor = "middle" }) {
  const dots = [];
  for (let row = 0; row < rows; row += 1) {
    const t = row / (rows - 1);
    const step = row % 3 === 0 ? 8 : 11;
    for (let x = 0; x <= WIDTH; x += step) {
      const swell = Math.sin(x * frequency + phase + t * 2.1) * amplitude * (.3 + t * .7);
      const y = 250 + (t - .62) * 210 + swell - (x / WIDTH) * lift;
      const crest = Math.exp(-((t - .72) ** 2) / .02);
      dots.push({
        x,
        y: Number(y.toFixed(1)),
        r: Number((.55 + t * 1.35 + crest * 1.1).toFixed(2)),
        o: Number(Math.min(1, .08 + t * .55 + crest * .4 + (x / WIDTH) * .28).toFixed(2)),
      });
    }
  }
  return <svg className={`particle-wave ${className}`} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio={anchor === "end" ? "xMaxYMax slice" : "xMidYMid slice"} aria-hidden="true">
    <g className="particle-wave-drift">
      {dots.map((dot, i) => <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={tone(dot.x)} opacity={dot.o} />)}
    </g>
  </svg>;
}
