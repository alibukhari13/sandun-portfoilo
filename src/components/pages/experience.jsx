"use client";

import { useMemo, useState } from "react";
import { ReckittLogo, StevensLogo, UspsLogo } from "@/components/BrandLogos";
import SatelliteGlobe, { WorldDots } from "@/components/SatelliteGlobe";

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
    href: "https://www.stevens.edu/",
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
    href: "https://www.usps.com/",
  },
  {
    id: "process",
    tags: ["chemical", "systems"],
    years: ["2012", "2017"],
    badge: "Process Engineering",
    tone: "violet",
    title: "Process & Quality Engineering Associate",
    org: "Reckitt Benckiser",
    place: "Colombo, Sri Lanka",
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
    href: "https://www.reckitt.com/offices/sri-lanka/",
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

function Logo({ kind }) {
  if (kind === "stevens") return <StevensLogo className="xp-logo stevens-logo" />;
  if (kind === "usps") return <UspsLogo className="xp-logo usps-logo" />;
  return <ReckittLogo className="xp-logo reckitt-logo" />;
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
      <div className="xp-globe" aria-hidden="true"><SatelliteGlobe /><i className="xp-globe-ring"/><i className="xp-globe-ring xp-globe-ring-b"/></div>
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
                <a className="xp-logo-link" href={role.href} target="_blank" rel="noreferrer" aria-label={`${role.org}, opens in a new tab`}><Logo kind={role.logo}/></a>
                <a className="xp-arrow" href={role.href} target="_blank" rel="noreferrer" aria-label={`${role.org} website`}>↗</a>
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
          <WorldDots />
          <p>Experience across research, industry, and global systems, with a focus on building intelligent and impactful solutions.</p>
        </section>
      </aside>
    </section>
  </div>;
}
