"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NeuralNetwork from "@/components/NeuralNetwork";

const projects = [
  { category: "Machine Learning & AI", title: "LLM Truthfulness & Interpretability Research", description: "Evaluated how adversarial prompting affects LLM truthfulness using 790 TruthfulQA questions across four conditions. Analyzed layer-wise representations with logit lens and token predictions.", tags: ["LLM Evaluation", "PyTorch", "Interpretability", "NLP"], href: "https://github.com/sandunmunasinghe91/truthfulqa-adversarial-eval", art: "chart" },
  { category: "Multi-Agent Systems", title: "Multi-Agent LLM Conflict Resolution", description: "Built a multi-agent system with voting, debate, hierarchical authority, and consensus strategies. Implemented real-time communication with FastAPI and Next.js and evaluated behavioral outcomes across 32 scenarios.", tags: ["LangGraph", "NLP", "Multi-Agent Systems", "FastAPI"], href: "https://github.com/sandunmunasinghe91/Multi-agent-LLM-conflict-resolution-research-", art: "agents" },
  { category: "Chemical Engineering", title: "Chemical Engineering Domain Language Model", description: "Building a GPT-2-style language model from scratch in PyTorch using a curated corpus of 3,000+ arXiv papers and technical articles. Goal is to support engineering knowledge retrieval and technical troubleshooting.", tags: ["PyTorch", "Transformers", "Data Engineering", "Chemical Engineering"], href: "https://github.com/sandunmunasinghe91/ChemEng-LLM", art: "atom" },
];

function Mark({ type }) {
  if (type === "chart") return <div className="mini-chart" aria-label="Truthfulness results chart"><small>Truthfulness Rate (%)</small><div>{[["89.7%", "Base Fine", "89.7%"], ["75.6%", "Conspiracy", "75.6%"], ["72%", "Popular Myth", "72%"], ["60.5%", "Force Wrong", "60.5%"]].map(([height, label, value]) => <span key={label}><b>{value}</b><i style={{ height }} /><em>{label}</em></span>)}</div></div>;
  if (type === "agents") return <div className="mini-agents" aria-hidden="true"><span>A1</span><span>A2</span><b>Consensus</b><span>A3</span><span>A4</span></div>;
  return <div className="mini-atom" aria-hidden="true"><svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="43" ry="17"/><ellipse cx="50" cy="50" rx="43" ry="17" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="43" ry="17" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="4"/></svg></div>;
}

function ProjectCard({ project, index }) {
  return <article className={`home-project-card project-art-${project.art}`}>
    <div className="home-project-body"><div className="home-project-heading"><span className="home-project-category">{project.category}{project.art === "atom" && <em className="in-progress-badge">IN PROGRESS</em>}</span><span className="home-project-index">0{index + 1}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="home-project-art"><Mark type={project.art} /></div><div className="home-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a></div>
  </article>;
}

export default function OverviewPage() {
  const [projectFilter, setProjectFilter] = useState("all");
  const visibleProjects = projects.filter((project) => {
    if (projectFilter === "ai") return project.art !== "atom";
    if (projectFilter === "engineering") return project.art === "atom";
    return true;
  });

  return <div className="home-page">
    <section className="home-hero">
      <div className="hero-network"><NeuralNetwork density="dense" /></div>
      <div className="container home-hero-grid">
        <div className="home-hero-copy"><p className="hero-location"><i /> New Jersey, United States</p><h1>Hey, I’m Sandun<br />Munasinghe.</h1><h2>Machine Learning &amp; AI Researcher.<br /><span>Building Intelligent Systems.</span></h2><p className="hero-description">I research large language model truthfulness and interpretability, develop multi-agent AI systems, and build domain-specific language models. With a background in Chemical Engineering and professional experience in operations, I bring an engineering mindset and a data-driven approach to solving real-world problems.</p><p className="hero-skills">LLMs <b>·</b> Deep Learning <b>·</b> NLP <b>·</b> PyTorch <b>·</b> AI Systems</p><div className="hero-buttons"><Link className="button primary lime-button" href="/projects">Explore Projects <span>↗</span></Link><a className="button secondary dark-outline" href="https://sandun.figma.site/Sandun-Munasinghe-Resume.pdf" target="_blank" rel="noreferrer">Download Resume <span>↓</span></a></div></div>
        <div className="home-portrait-stage"><div className="portrait-neural"><NeuralNetwork /></div><Image className="hero-portrait" src="/sandun-portrait-cutout.png" alt="Sandun Munasinghe" fill priority sizes="(max-width: 700px) 100vw, 42vw" /></div>
        <div className="hero-metrics"><div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg></span><p><strong>10K+</strong><small>Research papers<br />processed</small></p></div><div><span className="metric-icon"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3V5m-14 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5m-14 5v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" /></svg></span><p><strong>790</strong><small>TruthfulQA questions<br />evaluated</small></p></div><div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m6-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.5a4 4 0 0 1 0 7.8m2 3.2a4 4 0 0 1 3 3.9V21" /></svg></span><p><strong>2+</strong><small>AI projects<br />(research + applied)</small></p></div><div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M9 3h6m-5 0v6l-5.5 9.3A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.7L14 9V3m-7 12h10" /></svg></span><p><strong>5+ years</strong><small>Operations &amp;<br />data experience</small></p></div></div>
      </div>
    </section>
    <div className="credential-strip"><div className="container credential-inner"><div className="credential-item"><b className="school-mark stevens-mark">S</b><p><strong>Stevens Institute of Technology</strong><small>MS Computer Science · Machine Learning</small></p></div><div className="credential-item"><b className="school-mark ecai-mark">Z</b><p><strong>ECAI Lab</strong><small>Graduate Research Assistant</small></p></div><div className="credential-item"><b className="school-mark rutgers-mark">R</b><p><strong>Rutgers University</strong><small>BS Chemical Engineering</small></p></div></div></div>
    <section className="home-focus"><div className="container focus-inner"><div><span className="section-kicker">TWO DISCIPLINES / ONE PERSPECTIVE</span><h2>Research-led.<br /><span>Engineering-grounded.</span></h2></div><div><p>My work connects large language models, interpretability, multi-agent systems, and domain-specific AI with a foundation in chemical engineering, process systems, and data-driven analysis. I focus on building and applying intelligent systems to solve complex, real-world challenges in engineering.</p><div className="focus-links"><Link className="button primary" href="/projects">View My Work <span>↗</span></Link><Link className="button secondary" href="/contact">Contact Sandun <span>↗</span></Link></div></div></div></section>
    <section className="home-featured"><div className="container"><div className="featured-heading"><h2>Featured Projects</h2><span className="featured-watermark" aria-hidden="true">PORTFOLIO</span></div><div className="featured-filters" aria-label="Featured project categories">
      {[{ id: "all", label: "All" }, { id: "ai", label: "Machine Learning & AI" }, { id: "engineering", label: "Chemical Engineering" }].map((filter) => <button key={filter.id} type="button" className={projectFilter === filter.id ? "active" : ""} aria-pressed={projectFilter === filter.id} onClick={() => setProjectFilter(filter.id)}>{filter.label}</button>)}
    </div><div className="home-project-grid">{visibleProjects.map((project) => <ProjectCard key={project.title} project={project} index={projects.indexOf(project)} />)}</div></div></section>
  </div>;
}
