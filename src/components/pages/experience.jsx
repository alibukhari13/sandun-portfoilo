"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const roles = [
  {
    id: "research",
    tags: ["ai", "systems"],
    years: ["2026", "Present"],
    badge: "Research",
    tone: "green",
    title: "Graduate Research Assistant",
    org: "Stevens Institute of Technology  |  ECAI Lab",
    place: "Hoboken, NJ",
    date: "Jan 2026 – Present",
    summary: "Researching LLM truthfulness and interpretability, with a focus on model evaluation, adversarial prompting, and mechanistic interpretability.",
    bullets: [
      "Developed an automated LLM evaluation pipeline using 790 TruthfulQA questions across four prompting conditions to investigate adversarial effects on model truthfulness.",
      "Evaluated GPT-5.6 Sol and Gemma 3 4B IT using automated truthfulness assessment and ROUGE metrics.",
      "Developed a logit-lens analysis framework to investigate layer-wise model representations and changes in token-level predictions under adversarial prompting.",
    ],
    skills: ["Python", "PyTorch", "Hugging Face", "LLM Evaluation", "Model Interpretability", "NLP", "Research Methods"],
    logo: "stevens",
  },
  {
    id: "operations",
    tags: ["operations", "systems"],
    years: ["2018", "2023"],
    badge: "Operations",
    tone: "blue",
    title: "Operations & Customer Service Associate Manager",
    org: "United States Postal Service",
    place: "New Jersey, USA",
    date: "Oct 2018 – Oct 2023",
    summary: "Managed large-scale operations, applied data-driven analysis to optimize staffing and automation, and led cross-functional teams in a high-volume logistics environment.",
    bullets: [
      "Applied demand variability analysis to redesign staffing models across a 200K+ daily package operation, reducing overtime costs by 20%.",
      "Led deployment of automated sorting systems (SDUS), troubleshot integration issues, and trained 20+ staff.",
      "Communicated performance insights and operational decisions to non-technical stakeholders and senior leadership.",
    ],
    skills: ["Operations Management", "Data Analysis", "Process Improvement", "Team Leadership", "Stakeholder Communication", "Logistics Systems"],
    logo: "usps",
  },
  {
    id: "process",
    tags: ["chemical", "systems"],
    years: ["2012", "2017"],
    badge: "Process Engineering",
    tone: "violet",
    title: "Process & Quality Engineering Associate",
    org: "Reckitt Benckiser",
    place: "Parsippany, NJ",
    date: "Aug 2012 – Oct 2017",
    summary: "Supported process design, scale-up, and quality control for disinfectant production, ensuring operational efficiency and regulatory compliance.",
    bullets: [
      "Supported batch reactor design, scale-up, and optimization for global brands (Lysol, Harpic, Air Wick).",
      "Managed quality control from raw materials through final packaging, meeting GMP and ISO standards.",
      "Identified and resolved process bottlenecks, increasing throughput by 40% and reducing material waste by 20%.",
      "Partnered with cross-functional teams on continuous improvement and process documentation.",
    ],
    skills: ["Process Engineering", "GMP / ISO", "Quality Control", "Process Optimization", "Troubleshooting", "MATLAB/Simulink"],
    logo: "reckitt",
  },
];

const filters = [
  ["ai", "AI/ML"],
  ["operations", "Operations"],
  ["chemical", "Chemical Engineering"],
  ["systems", "Systems Thinking"],
];

const highlights = [
  ["years", "5+", "Years of industry experience"],
  ["orgs", "3", "Major organizations"],
  ["overtime", "20%", "Overtime cost reduction (USPS)"],
  ["throughput", "40%", "Throughput increase (Reckitt Benckiser)"],
];

const journey = [
  ["AI Research", "Advancing model evaluation and interpretability"],
  ["Operations Leadership", "Optimizing large-scale systems and teams"],
  ["Chemical Engineering", "Building process, quality, and analytical foundations"],
];

function Icon({ name }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "pin") return <svg {...common}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>;
  if (name === "cal") return <svg {...common}><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M8 3.5V7M16 3.5V7M3.5 10h17"/></svg>;
  if (name === "years") return <svg {...common}><path d="M9 3h6M10 3v6l-5.2 8.8A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.2L14 9V3"/><path d="M8.2 15h7.6"/></svg>;
  if (name === "orgs") return <svg {...common}><path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6M9 11h.01M12 11h.01M15 11h.01"/></svg>;
  if (name === "overtime") return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 2"/></svg>;
  if (name === "throughput") return <svg {...common}><path d="M4 16.5 9 11l3.5 3.5L20 7"/><path d="M14 7h6v6"/></svg>;
  if (name === "brain") return <svg {...common}><path d="M9 5.5A3.2 3.2 0 0 0 5.2 9 3 3 0 0 0 4 14.2 3.4 3.4 0 0 0 7.2 18 3 3 0 0 0 12 19.5V5.5A3 3 0 0 0 9 5.5Z"/><path d="M15 5.5A3.2 3.2 0 0 1 18.8 9 3 3 0 0 1 20 14.2 3.4 3.4 0 0 1 16.8 18 3 3 0 0 1 12 19.5V5.5A3 3 0 0 1 15 5.5Z"/></svg>;
  if (name === "ops") return <svg {...common}><circle cx="8" cy="8" r="2.4"/><path d="M3.5 19v-1.2A4.5 4.5 0 0 1 8 13.3 4.5 4.5 0 0 1 12.5 17.8V19"/><path d="M16 11.2a2.3 2.3 0 1 0-1.2-4.3M14.2 19v-.8a3.6 3.6 0 0 1 2.4-3.4"/></svg>;
  return <svg {...common}><path d="M9 3h6M10 3v5.5L5.2 18A2 2 0 0 0 7 21h10a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M8 15h8"/></svg>;
}

function StevensLogo() {
  return <span className="xp-logo stevens-logo"><Image src="/logos/stevens-primary.png" alt="Stevens Institute of Technology" width={1500} height={732} /></span>;
}

function UspsLogo() {
  return <svg className="xp-logo usps-logo" viewBox="0 0 132 46" role="img" aria-label="United States Postal Service">
    <rect width="132" height="46" rx="3" fill="#004b87"/>
    <path fill="#fff" d="M22 33c-6.2-1.2-9.4-6.8-8.2-12.4 1-4.6 4.6-7.6 9.2-8.2 1.6-2.8 5.4-4.2 8.8-3.2 2.4-2.6 6.6-3.2 9.6-1.4 3.2.2 5.4 2.4 6.2 5.2 3.4.2 6.6 2.4 7.4 5.8.8 3.6-.8 7-3.8 8.6-1.2 4.8-5.6 8-10.6 8.2-2.4 1.6-6.2 1.8-8.8.4-3.2 1.2-7.2.6-9.8-3Z"/>
    <path fill="#004b87" d="M28.5 22.5c2.2-3.6 6.8-4.4 9.6-2.2l1.6-3.2c-4.4-3.2-10.8-2.2-14 2.6-2.6 4-2.2 9.2.8 12.4 1.2-2.2 1.4-6.2 2-9.6Z"/>
    <path fill="#e31c3d" d="M46 16.5h16.5v2.2H46zm0 3.4h16.5v2.1H46zm0 3.3h16.5V25H46z"/>
    <path fill="#fff" d="M64.2 14.8c2.8 0 4.4 1.6 4.4 4.2v8.6h-2.6v-1.4c-.8 1-2 1.6-3.4 1.6-2.8 0-4.6-2-4.6-4.8s1.8-4.8 4.6-4.8c1.2 0 2.2.4 3 .1v-.5c0-1.2-.8-1.8-2.2-1.8-1.2 0-2 .4-2.6 1.1l-1.6-1.6c1.1-1.1 2.6-1.7 4.6-1.7Zm-1.4 7.2c0-1.2-.8-2-2-2s-2 .8-2 2 .8 2 2 2 2-.8 2-2ZM72.2 19.2h2.5v1.2c.6-.8 1.6-1.4 2.9-1.4 2.4 0 3.8 1.6 3.8 4.2v5.4h-2.5v-4.8c0-1.4-.6-2.2-1.8-2.2-1.3 0-2.2.9-2.2 2.4v4.6h-2.5V19.2Zm14.2 0h2.5v1.3c.7-.9 1.7-1.5 3.1-1.5 2.6 0 4.2 1.8 4.2 4.6 0 2.9-1.6 4.7-4.2 4.7-1.3 0-2.3-.6-3-1.4v4.2h-2.6V19.2Zm5.4 3.2c0-1.4-.8-2.2-2-2.2s-2 .8-2 2.3.8 2.3 2 2.3 2-.9 2-2.4ZM99.6 19.2h2.6v9.4h-2.6z"/>
    <text x="8" y="42" fill="#9fd0ff" fontSize="4.2" fontFamily="Arial, sans-serif" letterSpacing=".4">UNITED STATES POSTAL SERVICE</text>
  </svg>;
}

function ReckittLogo() {
  return <span className="xp-logo reckitt-logo" role="img" aria-label="Reckitt">
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#e31c79"/><path d="M11 22c4.5-1.2 8.2-5.4 7.2-11.2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/><circle cx="18.2" cy="11.2" r="1.6" fill="#fff"/></svg>
    <b>reckitt</b>
  </span>;
}

function Logo({ kind }) {
  if (kind === "stevens") return <StevensLogo />;
  if (kind === "usps") return <UspsLogo />;
  return <ReckittLogo />;
}

function Globe() {
  const dots = [
    [62, 48], [78, 42], [96, 50], [118, 44], [136, 58], [150, 46],
    [58, 70], [74, 66], [92, 78], [112, 70], [132, 82], [148, 68],
    [70, 96], [88, 104], [108, 98], [126, 112], [146, 96], [84, 124],
    [104, 132], [124, 126], [66, 118], [140, 120],
  ];
  return <div className="xp-globe" aria-hidden="true">
    <div className="xp-globe-spin">
      <svg viewBox="0 0 200 200">
        <defs>
          <radialGradient id="xpEarth" cx="32%" cy="30%">
            <stop offset="0%" stopColor="#1d4a46"/>
            <stop offset="55%" stopColor="#0e2430"/>
            <stop offset="100%" stopColor="#071018"/>
          </radialGradient>
          <clipPath id="xpClip"><circle cx="100" cy="100" r="78"/></clipPath>
        </defs>
        <circle cx="100" cy="100" r="78" fill="url(#xpEarth)" stroke="#7dff9a55"/>
        <g clipPath="url(#xpClip)" fill="none" stroke="#9dffc244" strokeWidth="1">
          <ellipse cx="100" cy="100" rx="78" ry="26"/>
          <ellipse cx="100" cy="100" rx="78" ry="50"/>
          <ellipse cx="100" cy="100" rx="26" ry="78"/>
          <ellipse cx="100" cy="100" rx="52" ry="78"/>
          <path d="M22 100h156M100 22v156"/>
        </g>
        <g clipPath="url(#xpClip)">
          {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 2.4 : 1.35} fill="#d8ff8a"/>)}
          <path d="M62 48 96 50 136 58 148 68 126 112 88 104 70 96 62 48" fill="none" stroke="#c6ff57" strokeWidth="0.8" opacity=".7"/>
          <path d="M78 42 118 44 150 46 146 96 124 126" fill="none" stroke="#7dffe0" strokeWidth="0.7" opacity=".55"/>
        </g>
        <circle cx="136" cy="58" r="3.2" fill="#eaffb0"/>
      </svg>
    </div>
    <i className="xp-globe-ring"/>
    <i className="xp-globe-ring xp-globe-ring-b"/>
  </div>;
}

function WorldMap() {
  const land = [
    [28, 38], [36, 34], [44, 40], [34, 46], [42, 50], [52, 44], [48, 56], [58, 50], [40, 62], [50, 68], [62, 60],
    [46, 86], [52, 98], [58, 112], [54, 124],
    [118, 36], [128, 40], [136, 34], [146, 42], [124, 50], [136, 52], [150, 50], [128, 64], [140, 70], [132, 84], [124, 96], [136, 108],
    [168, 38], [180, 34], [192, 42], [204, 36], [176, 48], [190, 52], [206, 48], [184, 62], [198, 66], [214, 58], [222, 46], [230, 54], [208, 74], [196, 82],
    [236, 96], [246, 104], [254, 112],
  ];
  return <svg className="xp-map" viewBox="0 0 280 150" aria-hidden="true">
    <rect width="280" height="150" rx="10" fill="#07131c"/>
    {land.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.7" fill="#7fbf86"/>)}
    <circle className="xp-hot" cx="62" cy="52" r="3.4" fill="#d6ff6a"/>
    <circle className="xp-hot xp-hot-b" cx="136" cy="42" r="3" fill="#9dffd2"/>
    <circle className="xp-hot xp-hot-c" cx="214" cy="58" r="3" fill="#d6ff6a"/>
    <path d="M62 52C90 30 120 28 136 42c22-18 58-8 78 16" fill="none" stroke="#c6ff57" strokeWidth="1" strokeDasharray="3 4" opacity=".8"/>
    <text x="14" y="142" fill="#9eb0aa" fontSize="8" fontFamily="Inter, sans-serif">New Jersey · Research · Industry · Global systems</text>
  </svg>;
}

export default function ExperiencePage() {
  const [active, setActive] = useState([]);
  const shown = useMemo(() => active.length ? roles.filter((role) => role.tags.some((tag) => active.includes(tag))) : roles, [active]);

  function toggle(id) {
    setActive((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return <div className="xp-page">
    <section className="container xp-hero">
      <div className="xp-hero-copy">
        <span className="section-kicker">SANDUN MUNASINGHE / EXPERIENCE</span>
        <div className="xp-hero-row">
          <div>
            <h1>Experience</h1>
            <p>A combination of research, engineering, and industry experience at the intersection of AI, machine learning, operations, and chemical engineering.</p>
          </div>
          <p className="xp-aside">From industry operations to AI research — a journey of continuous learning and impact.</p>
        </div>
      </div>
      <Globe />
    </section>

    <section className="container xp-layout">
      <div className="xp-main">
        <div className="xp-filters" role="toolbar" aria-label="Filter experience">
          {filters.map(([id, label]) => <button key={id} type="button" className={active.includes(id) ? "active" : ""} aria-pressed={active.includes(id)} onClick={() => toggle(id)}>{label}</button>)}
        </div>
        <div className="xp-timeline">
          {shown.map((role) => <article className={`xp-role xp-${role.tone}`} key={role.id}>
            <div className="xp-years"><b>{role.years[0]}</b><span>{role.years[1]}</span><i/></div>
            <div className="xp-card">
              <div className="xp-card-top">
                <span className="xp-badge">{role.badge}</span>
                <Logo kind={role.logo}/>
                <span className="xp-arrow" aria-hidden="true">↗</span>
              </div>
              <h2>{role.title}</h2>
              <p className="xp-org">{role.org}</p>
              <p className="xp-meta"><span><Icon name="pin"/>{role.place}</span><span><Icon name="cal"/>{role.date}</span></p>
              <p className="xp-summary">{role.summary}</p>
              <ul>{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <div className="xp-skills"><span>Key Skills</span><div>{role.skills.map((skill) => <em key={skill}>{skill}</em>)}</div></div>
            </div>
          </article>)}
          {shown.length === 0 && <p className="xp-empty">No roles match those filters yet.</p>}
        </div>
      </div>

      <aside className="xp-side">
        <section className="xp-panel">
          <h2>Experience Highlights</h2>
          <div className="xp-highlights">
            {highlights.map(([icon, value, label]) => <div key={label}><b><Icon name={icon}/></b><p><strong>{value}</strong><small>{label}</small></p></div>)}
          </div>
        </section>
        <blockquote className="xp-quote">
          <span aria-hidden="true">“</span>
          <p>A unique combination of chemical engineering, operations, and AI research, enabling a data-driven approach to real-world problems.</p>
          <cite>— Sandun Munasinghe</cite>
        </blockquote>
        <section className="xp-panel">
          <h2>My Experience Journey</h2>
          <ol className="xp-journey">
            {journey.map(([title, text], index) => <li key={title}><b><Icon name={["brain", "ops", "flask"][index]}/></b><div><strong>{title}</strong><small>{text}</small></div></li>)}
          </ol>
        </section>
        <section className="xp-panel xp-global">
          <h2>Global Perspective</h2>
          <WorldMap />
          <p>Experience across research, industry, and global systems, with a focus on building intelligent and impactful solutions.</p>
        </section>
      </aside>
    </section>
  </div>;
}
