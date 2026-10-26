"use client";

import Link from "next/link";

const groups = [
  {
    number: "01",
    category: "MACHINE LEARNING & DEEP LEARNING",
    title: "Machine Learning & Deep Learning",
    description: "Building and fine-tuning models to understand data, learn patterns, and make intelligent predictions.",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Neural Networks", "Statistical Modeling", "Model Training", "Hyperparameter Tuning", "Computer Vision (basics)", "Feature Engineering", "ETL Pipelines"],
    accent: "green",
    picture: "surface",
    label: "CORE COMPETENCIES",
    icon: "brain",
  },
  {
    number: "02",
    category: "GENERATIVE AI & LLM ENGINEERING",
    title: "Generative AI & Large Language Models",
    description: "Working with state-of-the-art language models and building systems that can reason, generate, and collaborate.",
    items: ["Transformers", "Hugging Face", "LLM Pretraining", "RAG", "LangChain", "LangGraph", "Multi-Agent Systems", "Prompt Engineering", "OpenAI API", "Model Evaluation", "Fine-tuning (PEFT, LoRA)", "Gemma / Llama Models"],
    accent: "teal",
    picture: "layers",
    label: "SPECIALIZED EXPERTISE",
    icon: "chat",
  },
  {
    number: "03",
    category: "SOFTWARE ENGINEERING & DATA",
    title: "Software Engineering & Data",
    description: "Developing end-to-end systems, data pipelines, and APIs to support research and real-world applications.",
    items: ["Python", "SQL", "FastAPI", "Docker", "Git & GitHub", "CI/CD", "AWS (basics)", "Data Processing", "Web Development (Next.js)", "REST APIs", "Linux", "Jupyter Notebooks"],
    accent: "blue",
    picture: "stack",
    label: "DEVELOPMENT TOOLKIT",
    icon: "code",
  },
  {
    number: "04",
    category: "EVALUATION & INTERPRETABILITY",
    title: "Evaluation & Interpretability",
    description: "Analyzing model behavior, improving reliability, and understanding how language models make decisions.",
    items: ["TruthfulQA", "ROUGE / BLEU", "Logit Lens", "Adversarial Prompting", "Interpretability Methods", "Model Diagnostics", "Hallucination Detection", "Evaluation Frameworks", "Ablation Studies", "Sentence-Transformers"],
    accent: "violet",
    picture: "lens",
    label: "RESEARCH FOCUS",
    icon: "search",
  },
  {
    number: "05",
    category: "ENGINEERING & SCIENTIFIC FOUNDATION",
    title: "Engineering & Applied Mathematics",
    description: "Applying chemical engineering principles and mathematical reasoning to complex technical challenges.",
    items: ["Chemical Engineering", "Process Design", "Thermodynamics", "Mass & Energy Transfer", "Process Systems", "Mathematical Modeling", "Differential Equations", "Optimization", "Statistical Analysis", "Data Analysis"],
    accent: "mint",
    picture: "plant",
    label: "ACADEMIC FOUNDATION",
    icon: "flask",
  },
];

function SkillIcon({ name }) {
  const art = {
    brain: <><path d="M12 4a3 3 0 0 0-5.8 1.4A3.5 3.5 0 0 0 5 11a3.5 3.5 0 0 0 1 6.5A3.2 3.2 0 0 0 12 19V4Zm0 0a3 3 0 0 1 5.8 1.4A3.5 3.5 0 0 1 19 11a3.5 3.5 0 0 1-1 6.5A3.2 3.2 0 0 1 12 19V4Z" /><path d="M8 8c1.5 0 2.2.7 2.2 2m-3 4c1.5 0 2.5-.7 3-1.8m5.8-4.2c-1.5 0-2.2.7-2.2 2m3 4c-1.5 0-2.5-.7-3-1.8" /></>,
    chat: <><path d="M5 5.5h14A2.5 2.5 0 0 1 21.5 8v7a2.5 2.5 0 0 1-2.5 2.5h-7l-5.5 3v-3.5A2.5 2.5 0 0 1 4 14.5V8a2.5 2.5 0 0 1 1-2.5Z" /><circle cx="9" cy="11.5" r=".8" /><circle cx="12" cy="11.5" r=".8" /><circle cx="15" cy="11.5" r=".8" /></>,
    code: <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />,
    search: <><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></>,
    flask: <><path d="M9 3h6M10 3v6l-6.2 10.2A1.2 1.2 0 0 0 4.9 21h14.2a1.2 1.2 0 0 0 1.1-1.8L14 9V3M7.5 16h9" /><path d="M8.5 14h7" /></>,
    bars: <><path d="M4 20V11h4v9m4 0V5h4v15m4 0V9h2v11M2 20h21" /></>,
  };
  return (
    <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {art[name]}
    </svg>
  );
}

function SurfaceArt() {
  const ridges = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <svg className="skill-illustration surface-art skill-art-live" viewBox="0 0 300 180" aria-hidden="true">
      <defs>
        <linearGradient id="sk-terrain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8ff8a" stopOpacity=".85" />
          <stop offset=".55" stopColor="#6bcf3a" stopOpacity=".35" />
          <stop offset="1" stopColor="#1d6a32" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id="sk-grid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9ff54" stopOpacity="0" />
          <stop offset=".5" stopColor="#c9ff54" stopOpacity=".45" />
          <stop offset="1" stopColor="#c9ff54" stopOpacity="0" />
        </linearGradient>
        <filter id="sk-surf-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="sk-surf-grid" stroke="url(#sk-grid)" strokeWidth="1" fill="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`gx${i}`} d={`M24 ${40 + i * 20} L276 ${28 + i * 18}`} opacity={0.35 + i * 0.05} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={`gy${i}`} d={`M${36 + i * 36} 148 L${70 + i * 32} 24`} opacity={0.25 + (i % 3) * 0.08} />
        ))}
      </g>
      <g className="sk-surf-ridges" filter="url(#sk-surf-glow)" fill="none" stroke="#b8ff6a" strokeWidth="1.35">
        {ridges.map((row) => (
          <path
            key={row}
            className="sk-ridge"
            style={{ "--d": `${row * 90}ms` }}
            d={`M18 ${118 - row * 8} C52 ${70 - row * 6}, 88 ${128 - row * 7}, 124 ${48 - row * 4} S188 ${110 - row * 5}, 228 ${58 - row * 3} S268 ${96 - row * 4}, 286 ${78 - row * 2}`}
            opacity={0.28 + row * 0.08}
          />
        ))}
      </g>
      <path
        className="sk-surf-fill"
        d="M22 132 C58 78, 96 118, 132 52 C168 8, 204 96, 248 44 L278 132 L22 132 Z"
        fill="url(#sk-terrain)"
      />
      <g className="sk-surf-peaks" fill="#f3ffd0">
        {[[78, 78], [132, 48], [188, 72], [236, 54], [108, 98], [160, 88]].map(([x, y], i) => (
          <circle key={i} className="sk-peak" style={{ "--d": `${i * 110}ms` }} cx={x} cy={y} r={i % 2 ? 2.2 : 3} />
        ))}
      </g>
    </svg>
  );
}

function LayersArt() {
  const layers = [
    { y: 18, label: "LLMs", side: "right" },
    { y: 46, label: "Agents", side: "left" },
    { y: 74, label: "Tools", side: "left" },
    { y: 102, label: "RAG", side: "right" },
  ];
  return (
    <svg className="skill-illustration layers-art skill-art-live" viewBox="0 0 300 180" aria-hidden="true">
      <defs>
        <linearGradient id="sk-layer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9fff2" stopOpacity=".92" />
          <stop offset="1" stopColor="#12806c" stopOpacity=".55" />
        </linearGradient>
        <filter id="sk-layer-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="sk-layer-stack" filter="url(#sk-layer-glow)">
        {layers.map((layer, i) => (
          <g key={layer.label} className="sk-layer" style={{ "--d": `${i * 140}ms` }}>
            <path
              d={`M86 ${layer.y + 18} L150 ${layer.y} L214 ${layer.y + 18} L150 ${layer.y + 36} Z`}
              fill="url(#sk-layer)"
              stroke="#9dffe4"
              strokeWidth="1.4"
              opacity={0.95 - i * 0.1}
            />
            <path d={`M86 ${layer.y + 18} L86 ${layer.y + 28} L150 ${layer.y + 46} L214 ${layer.y + 28} L214 ${layer.y + 18}`} fill="#0d3d36" opacity=".35" stroke="#7fe9d4" strokeWidth="1" />
            <text
              className="sk-layer-label"
              x={layer.side === "left" ? 54 : 246}
              y={layer.y + 22}
              textAnchor={layer.side === "left" ? "end" : "start"}
            >
              {layer.label}
            </text>
          </g>
        ))}
      </g>
      <g className="sk-layer-base">
        <ellipse cx="150" cy="158" rx="78" ry="10" fill="#3fd2c222" />
        <text className="sk-layer-label sk-apps" x="150" y="162" textAnchor="middle">Applications</text>
      </g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} className="sk-spark" cx={40 + (i * 31) % 220} cy={28 + (i * 19) % 110} r={i % 3 ? 1 : 1.6} />
      ))}
    </svg>
  );
}

/** Brand logos in 36×28 local space — no circular/white logo backgrounds */
function StackLogo({ name }) {
  // logos drawn in a 36×28 space, no background plates
  if (name === "github") {
    return (
      <g className="sk-logo sk-logo-github">
        <path
          fill="#F0F6FC"
          d="M18 1.5C9.72 1.5 3 8.22 3 16.5c0 6.62 4.29 12.23 10.24 14.21.75.14 1.02-.32 1.02-.72v-2.55c-4.16.9-5.04-1.77-5.04-1.77-.68-1.73-1.66-2.19-1.66-2.19-1.36-.93.1-.91.1-.91 1.5.11 2.29 1.54 2.29 1.54 1.34 2.29 3.51 1.63 4.36 1.25.14-.97.52-1.63.95-2-3.33-.38-6.83-1.67-6.83-7.42 0-1.64.58-2.98 1.54-4.03-.15-.38-.67-1.92.15-4 0 0 1.26-.4 4.13 1.54a14.3 14.3 0 0 1 7.52 0c2.87-1.94 4.13-1.54 4.13-1.54.82 2.08.3 3.62.15 4 0.96 1.05 1.54 2.39 1.54 4.03 0 5.77-3.51 7.03-6.85 7.4.54.46 1.02 1.38 1.02 2.78v4.12c0 .4.27.87 1.03.72C28.71 28.73 33 23.12 33 16.5 33 8.22 26.28 1.5 18 1.5Z"
        />
      </g>
    );
  }
  if (name === "docker") {
    return (
      <g className="sk-logo sk-logo-docker" transform="translate(4.5 4) scale(1.12)" fill="#2496ED">
        {/* Moby Dock mark, fitted inside the cube face */}
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.186.186 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51q-.508.001-1.01.087c-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199l-.226.327c-.284.438-.49.922-.612 1.43c-.23.97-.09 1.882.403 2.661c-.595.332-1.55.413-1.744.42H.751a.75.75 0 0 0-.75.748a11.4 11.4 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124c1.18.723 3.1 1.137 5.275 1.137a15.7 15.7 0 0 0 2.93-.266a12.3 12.3 0 0 0 3.823-1.389a10.5 10.5 0 0 0 2.61-2.136c1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009c.309-.293.55-.65.707-1.046l.098-.288Z" />
      </g>
    );
  }
  if (name === "aws") {
    return (
      <g className="sk-logo sk-logo-aws">
        <text x="18" y="14" textAnchor="middle" fill="#FF9900" fontFamily="Sora, Inter, sans-serif" fontSize="14" fontWeight="800" letterSpacing=".05em">aws</text>
        <path d="M5.5 21c4.8 2.7 12.4 2.9 18.8.2" fill="none" stroke="#FF9900" strokeWidth="2.15" strokeLinecap="round" />
        <path d="m22.2 19 3.1 2.15-3.2 1.55" fill="none" stroke="#FF9900" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
  if (name === "db") {
    return (
      <g className="sk-logo sk-logo-db" fill="none" stroke="#36C5F0" strokeWidth="2">
        <ellipse cx="18" cy="6.2" rx="10.2" ry="3.8" />
        <path d="M7.8 6.2v13.6c0 2.1 4.6 3.9 10.2 3.9s10.2-1.8 10.2-3.9V6.2" />
        <path d="M7.8 12.8c0 2.1 4.6 3.9 10.2 3.9s10.2-1.8 10.2-3.9" />
        <path d="M7.8 18.8c0 2.1 4.6 3.9 10.2 3.9s10.2-1.8 10.2-3.9" />
      </g>
    );
  }
  return (
    <g className="sk-logo sk-logo-code">
      <text
        x="18"
        y="20.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize="20"
        fontWeight="900"
        letterSpacing="-0.04em"
      >
        {"</>"}
      </text>
    </g>
  );
}

function StackArt() {
  // Front-facing boxes: logo sits on the large face aimed at the viewer
  const cubes = [
    { x: 116, y: 10, w: 64, h: 48, logo: "github", accent: "#8b949e", delay: 0 },
    { x: 20, y: 52, w: 64, h: 48, logo: "docker", accent: "#2496ED", delay: 120 },
    { x: 212, y: 52, w: 64, h: 48, logo: "aws", accent: "#FF9900", delay: 240 },
    { x: 56, y: 108, w: 64, h: 48, logo: "code", accent: "#C9FF54", delay: 360 },
    { x: 176, y: 108, w: 64, h: 48, logo: "db", accent: "#36C5F0", delay: 480 },
  ];

  return (
    <svg className="skill-illustration stack-art skill-art-live" viewBox="0 0 300 180" aria-hidden="true">
      <defs>
        <linearGradient id="sk-cube-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#245a78" />
          <stop offset="1" stopColor="#0c2234" />
        </linearGradient>
        <linearGradient id="sk-cube-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#163a54" />
          <stop offset="1" stopColor="#081826" />
        </linearGradient>
        <linearGradient id="sk-cube-top" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2a6a8e" />
          <stop offset="1" stopColor="#12384e" />
        </linearGradient>
        <filter id="sk-cube-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="sk-stack-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3fc8e8" stopOpacity=".28" />
          <stop offset="1" stopColor="#3fc8e8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} className="sk-spark" cx={(i * 41) % 290 + 6} cy={(i * 27) % 140 + 10} r={i % 3 ? 0.7 : 1.3} fill="#7fe3ff" />
      ))}

      <ellipse cx="150" cy="168" rx="118" ry="10" fill="url(#sk-stack-aura)" />
      <ellipse className="sk-stack-floor" cx="150" cy="168" rx="100" ry="6" fill="none" stroke="#3fc8e844" strokeWidth="1" />

      <g className="sk-stack-beams" fill="none" stroke="#7fd0ff" strokeWidth="1.2" strokeLinecap="round">
        <path className="sk-beam" d="M148 56 L52 76" />
        <path className="sk-beam" d="M148 56 L244 76" />
        <path className="sk-beam" d="M148 56 L88 132" />
        <path className="sk-beam" d="M148 56 L208 132" />
        <path className="sk-beam sk-beam-flow" d="M52 76 L88 132" />
        <path className="sk-beam sk-beam-flow" d="M244 76 L208 132" />
      </g>

      {cubes.map((cube) => {
        const { x, y, w, h, accent, logo } = cube;
        // Logo face square-on to camera; tiny bevel only so the logo side reads as "front"
        const dx = 5;
        const dy = 4;
        const fw = w - dx;
        const fh = h - dy;
        const fx = x;
        const fy = y + dy;

        const faceCx = fx + fw / 2;
        const faceCy = fy + fh / 2;
        const logoScale =
          logo === "code" ? 1 :
          logo === "aws" ? 0.96 :
          logo === "docker" ? 0.82 :
          0.8;
        // aws mark sits high in its glyph box — push down into face center
        const nudgeY = logo === "aws" ? 2.4 : logo === "code" ? 0.5 : 0;
        const logoX = faceCx - (36 * logoScale) / 2;
        const logoY = faceCy - (28 * logoScale) / 2 + nudgeY;

        return (
          <g key={logo} className="sk-cube" style={{ "--d": `${cube.delay}ms`, "--accent": accent }} filter="url(#sk-cube-glow)">
            <path
              d={`M${fx + 3} ${y} L${fx + fw + dx} ${y} L${fx + fw} ${fy} L${fx} ${fy} Z`}
              fill="url(#sk-cube-top)"
              stroke={accent}
              strokeWidth="1"
              opacity=".95"
            />
            <path
              d={`M${fx + fw} ${fy} L${fx + fw + dx} ${y} L${fx + fw + dx} ${fy + fh - 1} L${fx + fw} ${fy + fh} Z`}
              fill="url(#sk-cube-side)"
              stroke={accent}
              strokeWidth="0.95"
              opacity=".9"
            />
            <path
              d={`M${fx} ${fy} L${fx + fw} ${fy} L${fx + fw} ${fy + fh} L${fx} ${fy + fh} Z`}
              fill="url(#sk-cube-face)"
              stroke={accent}
              strokeWidth="1.55"
            />
            <g transform={`translate(${logoX} ${logoY}) scale(${logoScale})`}>
              <StackLogo name={logo} />
            </g>
            <ellipse cx={faceCx + 1} cy={fy + fh + 8} rx="16" ry="2.8" fill={accent} opacity=".28" />
          </g>
        );
      })}
    </svg>
  );
}

function LensArt() {
  const tokens = [
    ["The", 36, "#9a90aa"],
    ["cat", 86, "#fff"],
    ["sat", 132, "#efe8ff"],
    ["on", 176, "#b7adc8"],
    ["the", 220, "#9a90aa"],
    ["mat", 268, "#9a90aa"],
  ];
  const logits = ["-0.2", "2.4", "1.8", "0.1", "0.3", "-1.1"];
  return (
    <svg className="skill-illustration lens-art skill-art-live" viewBox="0 0 320 180" aria-hidden="true">
      <defs>
        <radialGradient id="sk-lens-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#c8b5eb" stopOpacity=".55" />
          <stop offset="1" stopColor="#c8b5eb" stopOpacity="0" />
        </radialGradient>
        <filter id="sk-lens-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path className="sk-lens-wave" d="M10 150 C50 130, 90 170, 130 148 S210 120, 250 150 S300 170, 320 140" fill="none" stroke="#9b7bff44" strokeWidth="2" />
      <path className="sk-lens-wave" d="M0 160 C40 140, 80 175, 120 155 S200 130, 240 158 S290 175, 320 150" fill="none" stroke="#9b7bff33" strokeWidth="1.5" />
      <text className="sk-lens-tag" x="16" y="28">logits</text>
      <text className="sk-lens-tag" x="196" y="158">interpretability</text>
      <g className="sk-tokens">
        {tokens.map(([word, x, color], i) => (
          <g key={word + i} className="sk-token" style={{ "--d": `${i * 80}ms` }}>
            <text x={x} y="82" textAnchor="middle" fill={color} fontSize="17" fontWeight="700">{word}</text>
            <text x={x} y="106" textAnchor="middle" className="sk-logit">{logits[i]}</text>
          </g>
        ))}
      </g>
      <g className="sk-magnifier" filter="url(#sk-lens-soft)">
        <circle cx="86" cy="76" r="34" fill="url(#sk-lens-glow)" />
        <circle cx="86" cy="76" r="26" fill="#c8b5eb22" stroke="#d7c4ff" strokeWidth="3.2" />
        <path d="m106 98 30 30" stroke="#efe8ff" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PlantArt() {
  return (
    <svg className="skill-illustration plant-art skill-art-live" viewBox="0 0 300 180" aria-hidden="true">
      <defs>
        <linearGradient id="sk-vessel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7dffe0" stopOpacity=".55" />
          <stop offset=".5" stopColor="#123a34" stopOpacity=".75" />
          <stop offset="1" stopColor="#7dffe0" stopOpacity=".55" />
        </linearGradient>
        <radialGradient id="sk-plant-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#7dffe0" stopOpacity=".4" />
          <stop offset="1" stopColor="#7dffe0" stopOpacity="0" />
        </radialGradient>
        <filter id="sk-plant-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {Array.from({ length: 28 }, (_, i) => (
        <circle key={i} className="sk-spark" cx={(i * 47) % 290 + 4} cy={(i * 23) % 120 + 8} r={i % 4 ? 0.7 : 1.2} fill="#9ef0d8" />
      ))}
      <text className="skill-plant-eq-svg" x="288" y="28" textAnchor="end">dC/dt = −kC</text>
      <ellipse cx="150" cy="168" rx="120" ry="12" fill="url(#sk-plant-floor)" />
      <ellipse cx="150" cy="168" rx="108" ry="8" fill="none" stroke="#7dffe066" strokeWidth="1" />
      <g className="sk-plant-body" filter="url(#sk-plant-glow)" fill="url(#sk-vessel)" stroke="#9ef0d8" strokeWidth="1.5">
        <path d="M52 150 V100 h22 V150 Z" />
        <path d="M88 150 V48 h24 V150 Z" />
        <path d="M128 150 V78 h22 V150 Z" />
        <path d="M166 150 V58 h28 V150 Z" />
        <path d="M210 150 V110 h20 V150 Z" />
        <path d="M98 48 A12 10 0 0 1 110 48" fill="none" />
        <path d="M176 58 A14 11 0 0 1 190 58" fill="none" />
        <path className="sk-plant-pipe" fill="none" stroke="#7dffe0" strokeWidth="2" d="M74 110 H88 M112 78 H128 M150 90 H166 M194 110 H210 M63 128 H74 M220 130 H248 V150" />
        {[62, 78, 96, 114, 132].map((y) => <path key={y} d={`M90 ${y} H110`} fill="none" stroke="#7dffe088" strokeWidth="1" />)}
        {[72, 90, 108, 126].map((y) => <path key={`b${y}`} d={`M168 ${y} H192`} fill="none" stroke="#7dffe088" strokeWidth="1" />)}
      </g>
      <g fill="#e8fff6">
        {[[74, 110], [112, 78], [150, 90], [194, 110], [248, 150]].map(([cx, cy], i) => (
          <circle key={i} className="sk-peak" style={{ "--d": `${i * 100}ms` }} cx={cx} cy={cy} r="2.2" />
        ))}
      </g>
    </svg>
  );
}

function Illustration({ kind }) {
  if (kind === "surface") return <SurfaceArt />;
  if (kind === "layers") return <LayersArt />;
  if (kind === "stack") return <StackArt />;
  if (kind === "lens") return <LensArt />;
  return <PlantArt />;
}

function SkillCard({ group }) {
  return (
    <article className={`skill-detail-card ${group.accent}`}>
      <div className="skill-detail-copy">
        <div className="skill-card-top">
          <span className="section-kicker">{group.number} / {group.category}</span>
          <em className="skill-badge">{group.label}</em>
        </div>
        <div className="skill-detail-heading">
          <b><SkillIcon name={group.icon} /></b>
          <div>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
          </div>
        </div>
        <div className="skill-pills">
          {group.items.map((item, index) => (
            <span className={index === 0 ? "pill-lead" : ""} key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="skill-art-panel">
        <Illustration kind={group.picture} />
      </div>
    </article>
  );
}

export default function SkillsPage() {
  return (
    <div className="subpage skills-page">
      <div className="container page-intro">
        <div className="section-kicker">SANDUN MUNASINGHE / SKILLS</div>
        <div className="page-intro-row">
          <div>
            <h1>Technical Skills &amp; Expertise</h1>
            <p>Tools, technologies, and engineering knowledge behind my research and projects.</p>
          </div>
          <span className="intro-aside page-description">
            A combination of machine learning, software engineering, and chemical engineering knowledge to build intelligent systems and solve real-world problems.
          </span>
        </div>
      </div>

      <section className="container skill-card-list">
        {groups.map((group) => <SkillCard group={group} key={group.number} />)}
      </section>

      <section className="container skills-in-action">
        <b><SkillIcon name="bars" /></b>
        <div>
          <h3>Skills in Action</h3>
          <p>These skills are applied in my research projects, from LLM evaluation to multi-agent systems.</p>
        </div>
        <Link href="/projects">LLM Truthfulness Research ↗</Link>
        <Link href="/projects">Multi-Agent Systems ↗</Link>
        <Link href="/projects">Chemical Engineering LLM ↗</Link>
      </section>
    </div>
  );
}
