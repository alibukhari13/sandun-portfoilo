import Image from "next/image";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";

const projects = [
  { category: "Machine Learning & AI", title: "LLM Truthfulness & Interpretability Research", description: "Evaluated how adversarial prompting affects LLM truthfulness using 790 TruthfulQA questions across four conditions. Analyzed layer-wise representations with logit lens and token predictions.", tags: ["LLM Evaluation", "PyTorch", "Interpretability", "NLP"], href: "https://github.com/sandunmunasinghe91/truthfulqa-adversarial-eval", art: "chart" },
  { category: "Multi-Agent Systems", title: "Multi-Agent LLM Conflict Resolution", description: "Built a multi-agent system with voting, debate, hierarchical authority, and consensus strategies. Implemented real-time communication with FastAPI and Next.js and evaluated behavioral outcomes across 32 scenarios.", tags: ["LangGraph", "NLP", "Multi-Agent Systems", "FastAPI"], href: "https://github.com/sandunmunasinghe91/Multi-agent-LLM-conflict-resolution-research-", art: "agents" },
  { category: "Chemical Engineering", title: "Chemical Engineering Domain Language Model", description: "Building a GPT-2-style language model from scratch in PyTorch using a curated corpus of 3,000+ arXiv papers and technical articles. Goal is to support engineering knowledge retrieval and technical troubleshooting.", tags: ["PyTorch", "Transformers", "Data Engineering", "Chemical Engineering"], href: "https://github.com/sandunmunasinghe91/ChemEng-LLM", art: "atom" },
];

function Mark({ type }) {
  if (type === "chart") return <div className="mini-chart" aria-label="Truthfulness results chart"><small>Truthfulness Rate (%)</small><div className="mini-plot"><div className="mini-axis" aria-hidden="true">{[100, 80, 60, 40, 20, 0].map((tick) => <span key={tick}>{tick}</span>)}</div><div className="mini-bars">{[["89.7%", "Baseline"], ["75.6%", "Conspiracy"], ["72.0%", "Popular Myth"], ["60.5%", "Force Wrong"]].map(([value, label], index) => <span key={label}><b>{value}</b><i style={{ height: `${Number.parseFloat(value)}%`, animationDelay: `${index * 90}ms` }} /><em>{label}</em></span>)}</div></div></div>;
  if (type === "agents") return <div className="home-agents" aria-hidden="true">
    <svg viewBox="0 0 220 140"><path d="M48 36h124M48 104h124M48 36 110 70 48 104M172 36 110 70 172 104" /></svg>
    <span>A1<small>Planner</small></span><span>A2<small>Critic</small></span>
    <b>CONSENSUS</b>
    <span>A3<small>Researcher</small></span><span>A4<small>Executor</small></span>
  </div>;
  return <div className="home-plant" aria-hidden="true">
    <svg viewBox="0 0 220 120"><g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round"><path d="M12 108h196M28 108V62h18v46m8 0V42h26v66m8 0V58h22v50m8 0V28h26v80m8 0V70h22v38"/><path d="M32 62V48h10v14m18-20V32h16v10m22 26h14m-8-16V40h14v12m24-24V16h16v12m20 54V70h14v16"/></g><g fill="currentColor"><circle cx="40" cy="82" r="2.4"/><circle cx="78" cy="58" r="2.4"/><circle cx="132" cy="44" r="2.4"/><circle cx="176" cy="84" r="2.4"/></g></svg>
    <em>Process Design</em><em>Thermodynamics</em><em>Reactor Design</em><em>Separations</em><em>Process Control</em>
  </div>;
}

function ProjectCard({ project, index }) {
  return <article className={`home-project-card project-art-${project.art}`}>
    <div className="home-project-body"><div className="home-project-heading"><span className="home-project-category">{project.category}{project.art === "atom" && <em className="in-progress-badge">IN PROGRESS</em>}</span><span className="home-project-index">0{index + 1}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="home-project-art"><Mark type={project.art} /></div><div className="home-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a></div>
  </article>;
}

export default function OverviewPage() {
  return <div className="home-page">
    <section className="home-hero">
      <div className="hero-network"><NeuralNetwork density="dense" /></div>
      <div className="container home-hero-grid">
        <div className="home-hero-copy"><p className="hero-location"><i /> New Jersey, United States</p><h1>Hey, I’m Sandun<br />Munasinghe.</h1><h2>Machine Learning &amp; AI Researcher.<br /><span>Building Intelligent Systems.</span></h2><p className="hero-description">I research large language model truthfulness and interpretability, develop multi-agent AI systems, and build domain-specific language models. With a background in Chemical Engineering and professional experience in operations, I bring an engineering mindset and a data-driven approach to solving real-world problems.</p><p className="hero-skills">LLMs <b>·</b> Deep Learning <b>·</b> NLP <b>·</b> PyTorch <b>·</b> AI Systems</p><div className="hero-buttons"><Link className="button primary lime-button" href="/projects">Explore Projects <span>↗</span></Link><a className="button secondary dark-outline" href="/assets/Sandun_Munasinghe.pdf" target="_blank" rel="noreferrer">Download Resume <span>↓</span></a></div></div>
        <div className="hero-metrics"><div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg></span><p><strong>10K+</strong><small>Research papers<br />processed</small></p></div><div><span className="metric-icon"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3V5m-14 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5m-14 5v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" /></svg></span><p><strong>790</strong><small>TruthfulQA questions<br />evaluated</small></p></div><div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m6-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.5a4 4 0 0 1 0 7.8m2 3.2a4 4 0 0 1 3 3.9V21" /></svg></span><p><strong>2+</strong><small>AI projects<br />(research + applied)</small></p></div><div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M9 3h6m-5 0v6l-5.5 9.3A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.7L14 9V3m-7 12h10" /></svg></span><p><strong>5+ years</strong><small>Operations &amp;<br />data experience</small></p></div></div>
      </div>
    </section>
    <div className="credential-strip" aria-label="Education and research affiliations"><div className="container credential-inner">
      <a className="credential-item" href="https://www.stevens.edu/" target="_blank" rel="noreferrer" aria-label="Stevens Institute of Technology, opens in a new tab">
        <span className="credential-index">01</span>
        <span className="school-mark mark-image stevens-mark" aria-label="Stevens Institute official logo"><Image src="/logos/stevens-primary.png" alt="Stevens Institute of Technology shield and S mark" width={1500} height={732} /></span>
        <span className="credential-copy"><strong>Stevens Institute of Technology</strong><small>MS Computer Science · Machine Learning</small></span>
      </a>
      <a className="credential-item" href="https://ecailab.org/" target="_blank" rel="noreferrer" aria-label="ECAI Lab, opens in a new tab">
        <span className="credential-index">02</span>
        <span className="school-mark ecai-mark" aria-hidden="true">Z</span>
        <span className="credential-copy"><strong>ECAI Lab</strong><small>Graduate Research Assistant<br />LLM Research &amp; Interpretability</small></span>
      </a>
      <a className="credential-item" href="https://www.rutgers.edu/" target="_blank" rel="noreferrer" aria-label="Rutgers University, opens in a new tab">
        <span className="credential-index">03</span>
        <span className="school-mark rutgers-mark" aria-label="Rutgers University">R</span>
        <span className="credential-copy"><strong>Rutgers University</strong><small>BS Chemical Engineering<br />Process Systems &amp; Engineering</small></span>
      </a>
    </div></div>
    <section className="home-focus"><div className="focus-wave" aria-hidden="true"><NeuralNetwork density="dense" /></div><div className="container focus-inner"><div><span className="section-kicker">TWO DISCIPLINES / ONE PERSPECTIVE</span><h2>Research-led.<br /><span>Engineering-grounded.</span></h2></div><div><p>My work connects large language models, interpretability, multi-agent systems, and domain-specific AI with a foundation in chemical engineering, process systems, and data-driven analysis. I focus on building and applying intelligent systems to solve complex, real-world challenges in engineering and industry.</p><div className="focus-links"><Link className="button lime-button" href="/projects">View My Work <span>↗</span></Link><Link className="button dark-outline" href="/contact">Contact Sandun <span>↗</span></Link></div></div></div></section>
    <section className="home-featured"><div className="container"><div className="featured-heading featured-heading-row"><h2><i /> Featured Projects</h2><Link href="/projects">View All Projects <span>↗</span></Link></div><div className="home-project-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></div></section>
  </div>;
}
