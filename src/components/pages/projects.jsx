"use client";

import { useState } from "react";

const items = [
  { group: "LLM Research", title: "LLM Truthfulness & Interpretability", summary: "Evaluating how adversarial prompts influence truthfulness in large language models.", problem: "Understand how different prompting strategies affect model truthfulness and where untruthful behaviors emerge inside the model.", approach: "Used TruthfulQA (790 questions) with four prompt conditions, generated responses using Gemma-3-4B-it, and analyzed results with GPT-5.6 Sol. Applied logit lens analysis to study internal activations.", keyResults: ["Baseline: 89.7%", "Conspiracy: 75.6%", "Popular Myth: 72.0%", "Force Wrong: 60.5%"], tags: ["Python", "PyTorch", "Transformers", "TruthfulQA", "Interpretability", "Logit Lens", "Pandas", "Matplotlib"], link: "https://github.com/sandunmunasinghe91/truthfulqa-adversarial-eval", kind: "green", label: "01 / LLM RESEARCH", art: "brain" },
  { group: "AI Systems", title: "Multi-Agent LLM Conflict Resolution", summary: "Exploring multi-agent decision-making using LangGraph orchestration strategies such as majority voting, structured debate, hierarchical authority, and evidence-weighted consensus.", problem: "Investigate how multiple LLM agents with different roles can collaborate, resolve disagreements, and make better decisions on complex, open-ended tasks.", approach: "Built a multi-agent framework using LangGraph with majority voting, structured debate, hierarchical authority, and evidence-weighted consensus. Evaluated across 9 behavioral metrics and 32 scenarios.", keyResults: ["Misinformation agents outperformed factual agents in 88% of cases (p < 0.006) across 9 behavioral metrics and 32 scenarios."], tags: ["Python", "LangGraph", "LangChain", "FastAPI", "Next.js", "NLP", "Multi-Agent Systems"], link: "https://github.com/sandunmunasinghe91/Multi-agent-LLM-conflict-resolution-research-", kind: "blue", label: "02 / AI SYSTEMS", resultLabel: "Key Results", art: "agent" },
  { group: "Engineering AI", title: "Chemical Engineering LLM from Scratch", summary: "Building a domain-specific language model for chemical and process engineering using a GPT-2 style decoder-only transformer.", problem: "Create a specialized language model that understands chemical engineering concepts, equations, process design knowledge, and troubleshooting steps for real industrial applications.", approach: "Built a GPT-2 style decoder-only transformer in PyTorch. Developed automated pipelines to collect 3,000+ arXiv papers and Wikipedia articles, and processed 2,300+ research papers into a curated 10M-token corpus.", goal: "Develop an AI-powered chemical engineering assistant capable of answering technical questions, explaining engineering concepts, and supporting process troubleshooting and engineering design.", tags: ["PyTorch", "tiktoken", "Transformers", "NLP", "Data Processing", "Chemical Engineering"], link: "https://github.com/sandunmunasinghe91/ChemEng-LLM", kind: "violet", label: "03 / ENGINEERING AI", resultLabel: "Long-term Goal", art: "process", badge: "IN PROGRESS" },
];

function LineIcon({ name }) {
  const paths = {
    target: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></>,
    gear: <><path d="m10 2-.5 2.1a8 8 0 0 0-1.8.8L5.8 3.8 3.7 5.9 4.8 7.8A8 8 0 0 0 4 9.6L2 10v3l2 .5a8 8 0 0 0 .8 1.8l-1.1 1.9 2.1 2.1 1.9-1.1a8 8 0 0 0 1.8.8l.5 2h3l.5-2a8 8 0 0 0 1.8-.8l1.9 1.1 2.1-2.1-1.1-1.9a8 8 0 0 0 .8-1.8l2-.5v-3l-2-.4a8 8 0 0 0-.8-1.8l1.1-1.9-2.1-2.1-1.9 1.1a8 8 0 0 0-1.8-.8L13 2h-3Z"/><circle cx="11.5" cy="11.5" r="3"/></>,
    chart: <><path d="M4 20V11h4v9m4 0V5h4v15m4 0V9h2v11M2 20h21"/></>,
    github: <path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>,
  };
  return <svg className="project-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function BrainMesh() {
  const nodes = [[120, 78], [98, 60], [144, 58], [76, 84], [166, 84], [108, 44], [138, 42], [88, 104], [152, 104], [120, 118], [64, 66], [176, 66], [86, 46], [158, 48], [104, 92], [138, 92], [118, 62], [132, 74], [100, 74], [84, 70], [156, 72]];
  const links = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 6], [3, 7], [4, 8], [7, 9], [8, 9], [3, 10], [4, 11], [5, 12], [6, 13], [0, 14], [0, 15], [16, 17], [1, 18], [2, 17], [10, 19], [11, 20], [14, 18], [15, 17]];
  return <svg viewBox="0 0 240 160" aria-hidden="true"><defs><radialGradient id="brainGlow" cx="50%" cy="46%" r="55%"><stop offset="0%" stopColor="#d8ff8a" stopOpacity=".55"/><stop offset="100%" stopColor="#1d6b32" stopOpacity="0"/></radialGradient><filter id="brainSoft"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><ellipse cx="120" cy="84" rx="82" ry="54" fill="url(#brainGlow)"/><g filter="url(#brainSoft)" fill="none" stroke="#c6ff70" strokeWidth="1.6"><path d="M120 26c-30 6-52 26-54 50-8 8-12 16-8 26 6 18 24 30 44 34 8 8 14 12 18 12s10-4 18-12c20-4 38-16 44-34 4-10 0-18-8-26-2-24-24-44-54-50z"/><path d="M120 28v108M78 64c16 10 30 12 42 8M162 64c-16 10-30 12-42 8M72 100c18-8 34-8 48 0M168 100c-18-8-34-8-48 0"/></g><g filter="url(#brainSoft)">{links.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#d7ff9a" strokeWidth="1.15"/>)}{nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3.4 : 2.2} fill="#f3ffd2"/>)}</g></svg>;
}

function Art({ kind }) {
  if (kind === "brain") return <div className="project-art brain-network" aria-hidden="true"><span>Truthfulness</span><span>Interpretability</span><span>LLMs</span><span>Adversarial Prompts</span><BrainMesh /></div>;
  if (kind === "agent") return <div className="project-art agent-orbit-art" aria-hidden="true">
    <svg viewBox="0 0 320 180">
      <g fill="none" stroke="#49d7ea" strokeWidth="1.4"><path d="M160 38v22M78 78l58 16M242 78l-58 16M108 142l36-22M212 142l-36-22"/><path d="M160 58c46 8 78 28 78 28" opacity=".35"/></g>
      <circle cx="160" cy="96" r="28" fill="#08343c" stroke="#5ce7ef" strokeWidth="1.6"/>
      <text x="160" y="93" textAnchor="middle" fill="#d9fbff" fontSize="8" fontWeight="700">CONSENSUS</text>
      <text x="160" y="104" textAnchor="middle" fill="#9eebf2" fontSize="6">Evidence-weighted</text>
      {[[160, 28, "Planner", "Task Decomposition"], [62, 74, "Researcher", "Information"], [258, 74, "Critic", "Fact-check"], [96, 150, "Executor", "Solution"], [224, 150, "Tools", "Orchestration"]].map(([x, y, title, sub]) => <g key={title}><circle cx={x} cy={y} r="20" fill="#102c38" stroke="#67d7ea" strokeWidth="1.5"/><text x={x} y={y - 1} textAnchor="middle" fill="#e8fdff" fontSize="7" fontWeight="700">{title}</text><text x={x} y={y + 9} textAnchor="middle" fill="#b7eef4" fontSize="5.5">{sub}</text></g>)}
    </svg>
  </div>;
  return <div className="project-art process-art"><svg className="process-plant" viewBox="0 0 280 160" aria-hidden="true"><defs><filter id="plantGlow"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#plantGlow)" fill="none" stroke="#d2b4ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 142h246M40 142V78h34v64m8 0V50h40v92m10 0V68h32v74m10 0V32h36v110m10 0V82h36v60"/><path d="M46 78V58h20v20m22-8h26M96 50V32h28v18m-22-8h16m16 48h26m-20-18V52h20v18m28-34V16h22v18m-16-10h12m-8 112V98h22v32m-50-40h18m-2 0V72h22m-16 0V54h16"/></g><g fill="#efe4ff"><circle cx="62" cy="98" r="2.4"/><circle cx="108" cy="64" r="2.4"/><circle cx="188" cy="52" r="2.4"/><circle cx="220" cy="108" r="2.4"/></g></svg><span className="art-chip process-chip">Process Design</span><span className="art-chip process-chip-two">Thermodynamics</span><span className="art-chip process-chip-three">Reactor Design</span><span className="art-chip process-chip-four">Separations</span><span className="art-chip process-chip-five">Process Control</span></div>;
}

function ResultsChart() {
  const bars = [[89.7, "Baseline"], [75.6, "Conspiracy"], [72, "Popular Myth"], [60.5, "Force Wrong"]];
  return <div className="results-chart"><span>Truthfulness under different prompting conditions</span><div className="results-plot"><div className="results-yaxis" aria-hidden="true">{[100, 80, 60, 40, 20, 0].map((tick) => <small key={tick}>{tick}</small>)}</div><div className="results-bars">{bars.map(([number, label]) => <div key={label}><b>{number}%</b><i style={{ height: `${number}%` }} /><small>{label}</small></div>)}</div></div></div>;
}

const agentSteps = [["Task Input", "User Query"], ["Planner", "Decompose"], ["Researcher", "Gather Info"], ["Critic", "Evaluate"], ["Consensus", "Aggregate"], ["Executor", "Generate"]];
const pipelineSteps = [["Collect", "arXiv · Wikipedia"], ["Clean", "Deduplicate"], ["2,300+", "Papers"], ["Tokens", "tiktoken"], ["Train", "GPT-2"], ["10M", "Corpus"]];

function ResultsList({ item }) {
  return <div className="results-list">{item.keyResults.map((result) => <span key={result}><i />{result}</span>)}</div>;
}

function Flow({ steps, kind }) {
  return <div className={`architecture-flow ${kind}`}>
    {steps.map(([title, detail], index) => <span className="flow-step" key={title}><b>{title}</b><small>{detail}</small>{index < steps.length - 1 && <i aria-hidden="true">→</i>}</span>)}
  </div>;
}

function ProjectCard({ item }) {
  return <article className={`detailed-project ${item.kind}`}><span className="section-kicker">{item.label}</span><div className="detailed-project-head"><div><h2>{item.title}{item.badge && <em className="in-progress-badge">{item.badge}</em>}</h2><p>{item.summary}</p></div><Art kind={item.art} /></div><div className="project-facts"><div><b><LineIcon name="target" />Problem</b><p>{item.problem}</p></div><div><b><LineIcon name="gear" />Approach</b><p>{item.approach}</p></div><div><b><LineIcon name="chart" />{item.resultLabel || "Key Results"}</b>{item.goal ? <p className="goal-copy">{item.goal}</p> : <ResultsList item={item} />}</div></div><div className="project-lower"><div className="architecture-box">{item.art === "agent" ? <><span>System Architecture · LangGraph Multi-Agent Workflow</span><Flow steps={agentSteps} kind="agent-flow" /></> : item.art === "brain" ? <ResultsChart /> : <><span>Data Pipeline · 10M-Token Corpus</span><Flow steps={pipelineSteps} kind="pipeline-flow" /></>}</div><div className="technology-box"><span>Technologies &amp; Tools</span><div className="detail-tags">{item.tags.map((tag, index) => <small className={index === 0 ? "tag-lead" : ""} key={tag}>{tag}</small>)}</div><div className="project-actions"><a className="button lime-button" href={item.link} target="_blank" rel="noreferrer"><LineIcon name="github" /><b>View Code</b><span>→</span></a><a className="button dark-outline" href={item.link} target="_blank" rel="noreferrer"><b>{item.art === "process" ? "Read More" : "Read Case Study"}</b><span>→</span></a></div></div></div></article>;
}

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const filters = [["All", 3], ["LLM Research", 1], ["AI Systems", 1], ["Engineering AI", 1]];
  const shown = active === "All" ? items : items.filter((item) => item.group === active);
  return <div className="subpage projects-page"><div className="container page-intro"><div className="section-kicker">SANDUN MUNASINGHE / PROJECTS</div><div className="page-intro-row"><div><h1>Projects</h1><p>Research, experimentation, and engineering behind intelligent systems.</p></div><span className="intro-aside page-description">A collection of research projects, personal builds, and applied ML/AI solutions across natural language processing, multi-agent systems, and chemical engineering.</span></div></div><div className="project-filter-bar"><div className="container">{filters.map(([label, count]) => <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)} aria-pressed={active === label}>{label} <small>({count})</small></button>)}</div></div><section className="container detailed-project-list">{shown.map((item, index) => <ProjectCard key={item.title} item={item} index={index} />)}</section></div>;
}
