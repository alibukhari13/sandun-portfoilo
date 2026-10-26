"use client";

import { useState } from "react";
import { AgentsDiagram, ChemPlant, TruthfulnessChart } from "@/components/ProjectGraphics";

const truthRows = [
  { label: "Baseline", value: 89.7, soft: "#c9ff54" },
  { label: "Conspiracy", value: 75.6, soft: "#6fe3a0" },
  { label: "Popular Myth", value: 72.0, soft: "#5fd4b8" },
  { label: "Force Wrong", value: 60.5, soft: "#b8e84a" },
];

const items = [
  {
    group: "LLM Research",
    title: "LLM Truthfulness & Interpretability",
    summary: "Evaluating how adversarial prompts influence truthfulness in large language models.",
    problem: "Understand how different prompting strategies affect model truthfulness and where untruthful behaviors emerge inside the model.",
    approach: "Used TruthfulQA (790 questions) with four prompt conditions, generated responses using Gemma-3-4B-it, and analyzed results with GPT-5.6 Sol. Applied logit lens analysis to study internal activations.",
    keyResults: ["Baseline: 89.7%", "Conspiracy: 75.6%", "Popular Myth: 72.0%", "Force Wrong: 60.5%"],
    tags: ["Python", "PyTorch", "Transformers", "TruthfulQA", "Interpretability", "Logit Lens", "Pandas", "Matplotlib"],
    link: "https://github.com/sandunmunasinghe91/truthfulqa-adversarial-eval",
    kind: "green",
    label: "01 / LLM RESEARCH",
    art: "chart",
  },
  {
    group: "AI Systems",
    title: "Multi-Agent LLM Conflict Resolution",
    summary: "Exploring multi-agent decision-making using LangGraph orchestration strategies such as majority voting, structured debate, hierarchical authority, and evidence-weighted consensus.",
    problem: "Investigate how multiple LLM agents with different roles can collaborate, resolve disagreements, and make better decisions on complex, open-ended tasks.",
    approach: "Built a multi-agent framework using LangGraph with majority voting, structured debate, hierarchical authority, and evidence-weighted consensus. Evaluated across 9 behavioral metrics and 32 scenarios.",
    keyResults: ["Misinformation agents outperformed factual agents in 88% of cases (p < 0.006) across 9 behavioral metrics and 32 scenarios."],
    tags: ["Python", "LangGraph", "LangChain", "FastAPI", "Next.js", "NLP", "Multi-Agent Systems"],
    link: "https://github.com/sandunmunasinghe91/Multi-agent-LLM-conflict-resolution-research-",
    kind: "blue",
    label: "02 / AI SYSTEMS",
    resultLabel: "Key Results",
    art: "agents",
  },
  {
    group: "Engineering AI",
    title: "Chemical Engineering LLM from Scratch",
    summary: "Building a domain-specific language model for chemical and process engineering using a GPT-2 style decoder-only transformer.",
    problem: "Create a specialized language model that understands chemical engineering concepts, equations, process design knowledge, and troubleshooting steps for real industrial applications.",
    approach: "Built a GPT-2 style decoder-only transformer in PyTorch. Developed automated pipelines to collect 3,000+ arXiv papers and Wikipedia articles, and processed 2,300+ research papers into a curated 10M-token corpus.",
    goal: "Develop an AI-powered chemical engineering assistant capable of answering technical questions, explaining engineering concepts, and supporting process troubleshooting and engineering design.",
    tags: ["PyTorch", "tiktoken", "Transformers", "NLP", "Data Processing", "Chemical Engineering"],
    link: "https://github.com/sandunmunasinghe91/ChemEng-LLM",
    kind: "violet",
    label: "03 / ENGINEERING AI",
    resultLabel: "Long-term Goal",
    art: "atom",
    badge: "IN PROGRESS",
  },
];

function LineIcon({ name }) {
  const paths = {
    target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
    gear: <><path d="m10 2-.5 2.1a8 8 0 0 0-1.8.8L5.8 3.8 3.7 5.9 4.8 7.8A8 8 0 0 0 4 9.6L2 10v3l2 .5a8 8 0 0 0 .8 1.8l-1.1 1.9 2.1 2.1 1.9-1.1a8 8 0 0 0 1.8.8l.5 2h3l.5-2a8 8 0 0 0 1.8-.8l1.9 1.1 2.1-2.1-1.1-1.9a8 8 0 0 0 .8-1.8l2-.5v-3l-2-.4a8 8 0 0 0-.8-1.8l1.1-1.9-2.1-2.1-1.9 1.1a8 8 0 0 0-1.8-.8L13 2h-3Z" /><circle cx="11.5" cy="11.5" r="3" /></>,
    chart: <><path d="M4 20V11h4v9m4 0V5h4v15m4 0V9h2v11M2 20h21" /></>,
    github: <path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />,
  };
  return (
    <svg className="project-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function FlowIcon({ name }) {
  const icons = {
    input: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    planner: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
    research: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    critic: <><path d="M12 3 4 7v5c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V7l-8-4Z" /><path d="m9 12 2 2 4-4" /></>,
    consensus: <><path d="M7 10h10M7 14h10" /><path d="M4 8h16v8H4z" /></>,
    executor: <><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></>,
    collect: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6m-14 4v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" /></>,
    clean: <><path d="M4 7h16M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2m1 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7" /></>,
    papers: <><path d="M8 4h9l3 3v13H8zM17 4v3h3" /><path d="M11 12h6M11 16h4" /></>,
    tokens: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h2v4H7zm4 0h2v4h-2zm4 0h2v4h-2z" /></>,
    train: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3 5.6 18.4" /></>,
    corpus: <><path d="M4 19V7l8-4 8 4v12l-8 4-8-4Z" /><path d="M12 3v16M4 7l8 4 8-4" /></>,
  };
  return (
    <svg className="flow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function ProjectArt({ art }) {
  if (art === "chart") {
    return (
      <div className="pcard-art pcard-art-chart" aria-hidden="true">
        <TruthfulnessChart idPrefix="dp-art-chart" />
      </div>
    );
  }
  if (art === "agents") {
    return (
      <div className="pcard-art pcard-art-agents" aria-hidden="true">
        <AgentsDiagram idPrefix="dp-art-agents" />
      </div>
    );
  }
  return (
    <div className="pcard-art pcard-art-atom" aria-hidden="true">
      <ChemPlant idPrefix="dp-art-atom" />
    </div>
  );
}

const agentSteps = [
  ["Task Input", "User Query", "input"],
  ["Planner", "Decompose", "planner"],
  ["Researcher", "Gather Info", "research"],
  ["Critic", "Evaluate", "critic"],
  ["Consensus", "Aggregate", "consensus"],
  ["Executor", "Generate", "executor"],
];

const pipelineSteps = [
  ["Collect", "arXiv · Wikipedia", "collect"],
  ["Clean", "Deduplicate", "clean"],
  ["2,300+", "Papers", "papers"],
  ["Tokens", "tiktoken", "tokens"],
  ["Train", "GPT-2", "train"],
  ["10M", "Corpus", "corpus"],
];

function ResultsList({ item }) {
  return (
    <div className="pcard-results">
      {item.keyResults.map((result) => (
        <span key={result}><i />{result}</span>
      ))}
    </div>
  );
}

function Flow({ steps, kind }) {
  return (
    <div className={`pcard-flow ${kind}`}>
      {steps.map(([title, detail, icon], index) => (
        <div className="pcard-flow-step" key={title}>
          <span className="pcard-flow-icon"><FlowIcon name={icon} /></span>
          <b>{title}</b>
          <small>{detail}</small>
          {index < steps.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function TruthBars() {
  return (
    <div className="pcard-truth-bars" aria-label="Truthfulness rates across prompting conditions">
      {truthRows.map((row, i) => (
        <div className="pcard-truth-row" key={row.label} style={{ "--d": `${i * 120}ms`, "--w": `${row.value}%`, "--soft": row.soft }}>
          <span className="pcard-truth-label">{row.label}</span>
          <span className="pcard-truth-track">
            <i className="pcard-truth-fill" />
            <em>{row.value.toFixed(1)}%</em>
          </span>
        </div>
      ))}
    </div>
  );
}

function ProjectLower({ item }) {
  if (item.art === "chart") {
    return (
      <div className="pcard-box pcard-chart-box">
        <span className="pcard-box-label">Truthfulness under different prompting conditions</span>
        <TruthBars />
      </div>
    );
  }
  if (item.art === "agents") {
    return (
      <div className="pcard-box">
        <span className="pcard-box-label">System Architecture · LangGraph Multi-Agent Workflow</span>
        <Flow steps={agentSteps} kind="agent-flow" />
      </div>
    );
  }
  return (
    <div className="pcard-box">
      <span className="pcard-box-label">Data Pipeline · 10M-Token Corpus</span>
      <Flow steps={pipelineSteps} kind="pipeline-flow" />
    </div>
  );
}

function ProjectCard({ item }) {
  return (
    <article className={`pcard pcard-${item.kind}`}>
      <p className="pcard-kicker">{item.label}</p>

      <div className="pcard-top">
        <div className="pcard-copy">
          <div className="pcard-title-row">
            <h2>{item.title}</h2>
            {item.badge && <em className="pcard-badge">{item.badge}</em>}
          </div>
          <p className="pcard-summary">{item.summary}</p>
        </div>
        <ProjectArt art={item.art} />
      </div>

      <div className="pcard-facts">
        <div className="pcard-fact">
          <b><LineIcon name="target" />Problem</b>
          <p>{item.problem}</p>
        </div>
        <div className="pcard-fact">
          <b><LineIcon name="gear" />Approach</b>
          <p>{item.approach}</p>
        </div>
        <div className="pcard-fact">
          <b><LineIcon name="chart" />{item.resultLabel || "Key Results"}</b>
          {item.goal ? <p>{item.goal}</p> : <ResultsList item={item} />}
        </div>
      </div>

      <div className="pcard-bottom">
        <ProjectLower item={item} />
        <div className="pcard-box pcard-tech">
          <span className="pcard-box-label">Technologies &amp; Tools</span>
          <div className="pcard-tags">
            {item.tags.map((tag, index) => (
              <span className={index === 0 ? "lead" : ""} key={tag}>{tag}</span>
            ))}
          </div>
          <div className="pcard-actions">
            <a className="button lime-button" href={item.link} target="_blank" rel="noreferrer">
              <LineIcon name="github" /><b>View Code</b><span>→</span>
            </a>
            <a className="button dark-outline" href={item.link} target="_blank" rel="noreferrer">
              <b>{item.art === "atom" ? "Read More" : "Read Case Study"}</b><span>→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const filters = [["All", 3], ["LLM Research", 1], ["AI Systems", 1], ["Engineering AI", 1]];
  const shown = active === "All" ? items : items.filter((item) => item.group === active);
  return (
    <div className="subpage projects-page">
      <div className="container page-intro">
        <div className="section-kicker">SANDUN MUNASINGHE / PROJECTS</div>
        <div className="page-intro-row">
          <div>
            <h1>Projects</h1>
            <p>Research, experimentation, and engineering behind intelligent systems.</p>
          </div>
          <span className="intro-aside page-description">
            A collection of research projects, personal builds, and applied ML/AI solutions across natural language processing, multi-agent systems, and chemical engineering.
          </span>
        </div>
      </div>
      <div className="project-filter-bar">
        <div className="container">
          {filters.map(([label, count]) => (
            <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)} aria-pressed={active === label}>
              {label} <small>({count})</small>
            </button>
          ))}
        </div>
      </div>
      <section className="container pcard-list">
        {shown.map((item) => <ProjectCard key={item.title} item={item} />)}
      </section>
    </div>
  );
}
