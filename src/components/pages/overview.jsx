import Image from "next/image";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import ParticleWave from "@/components/ParticleWave";
import { ProjectMark } from "@/components/ProjectGraphics";

const skills = ["LLMs", "Deep Learning", "NLP", "PyTorch", "AI Systems"];

function ProjectCard({ project, index }) {
  return <article className={`home-project-card project-art-${project.art}`}>
    <div className="home-project-body"><div className="home-project-heading"><span className="home-project-category"><b>{String(index + 1).padStart(2, "0")}</b> / {project.group_name}</span>{project.badge ? <em className="in-progress-badge">{project.badge}</em> : <span className="home-project-index">{String(index + 1).padStart(2, "0")}</span>}</div><h3>{project.title}</h3><p>{project.summary}</p><div className="home-project-art"><ProjectMark type={project.art} idPrefix={`home-${project.art}-${index}`} /></div><div className="home-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.link && <a className="home-project-link" href={project.link} target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>}</div>
  </article>;
}

export default function OverviewPage({ projects }) {
  return <div className="home-page">
    <section className="home-hero">
      <div className="hero-network"><NeuralNetwork density="dense" /></div>
      <div className="container home-hero-grid">
        <div className="home-hero-copy">
          <p className="hero-location"><i /> New Jersey, United States</p>
          <h1>Hey, I’m Sandun<br />Munasinghe.</h1>
          <h2>Machine Learning &amp; AI Researcher:<br /><span>Building Intelligent Systems.</span></h2>
          <p className="hero-description">I research large language model truthfulness and interpretability, develop multi-agent AI systems, and build domain-specific language models. With a background in Chemical Engineering and professional experience in operations, I bring an engineering mindset and a data-driven approach to solving real-world problems.</p>
          <ul className="hero-skill-pills" aria-label="Focus areas">
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
          <div className="hero-buttons">
            <Link className="button primary lime-button" href="/projects">Explore Projects <span>↗</span></Link>
            <a className="button secondary dark-outline" href="/assets/Sandun_Munasinghe.pdf" target="_blank" rel="noreferrer">Download Resume <svg className="tray-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v11m-4.5-4.5 4.5 4.5 4.5-4.5M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg></a>
          </div>
        </div>
        <div className="hero-metrics">
          <div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg></span><p><strong>10K+</strong><small>Research papers<br />processed</small></p></div>
          <div><span className="metric-icon"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3V5m-14 5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5m-14 5v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" /></svg></span><p><strong>790</strong><small>TruthfulQA questions<br />evaluated</small></p></div>
          <div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m6-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.5a4 4 0 0 1 0 7.8m2 3.2a4 4 0 0 1 3 3.9V21" /></svg></span><p><strong>2+</strong><small>AI projects<br />(research + applied)</small></p></div>
          <div><span className="metric-icon"><svg viewBox="0 0 24 24"><path d="M9 3h6m-5 0v6l-5.5 9.3A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.7L14 9V3m-7 12h10" /></svg></span><p><strong>5+ years</strong><small>Operations &amp;<br />data experience</small></p></div>
        </div>
      </div>
    </section>
    <div className="credential-strip" aria-label="Education and research affiliations"><div className="container credential-inner">
      <a className="credential-item" href="https://www.stevens.edu/" target="_blank" rel="noreferrer" aria-label="Stevens Institute of Technology, opens in a new tab">
        <span className="credential-index">01</span>
        <span className="school-mark mark-image stevens-mark" aria-label="Stevens Institute official logo"><Image src="/logos/stevens-shield.png" alt="Stevens Institute of Technology shield" width={370} height={580} /></span>
        <span className="credential-copy"><strong>Stevens Institute of Technology</strong><small>MS Computer Science · Machine Learning</small></span>
      </a>
      <a className="credential-item" href="https://ecailab.org/" target="_blank" rel="noreferrer" aria-label="ECAI Lab, opens in a new tab">
        <span className="credential-index">02</span>
        <span className="school-mark ecai-mark" aria-hidden="true">Z</span>
        <span className="credential-copy"><strong>ECAI Lab</strong><small>Graduate Research Assistant<br />LLM Research &amp; Interpretability</small></span>
      </a>
      <a className="credential-item" href="https://www.rutgers.edu/" target="_blank" rel="noreferrer" aria-label="Rutgers University, opens in a new tab">
        <span className="credential-index">03</span>
        <span className="school-mark mark-image rutgers-r-mark"><Image src="/logos/rutgers-r.png" alt="Rutgers University block R" width={124} height={110} /></span>
        <span className="credential-copy"><strong>Rutgers University</strong><small>BS Chemical Engineering<br />Process Systems &amp; Engineering</small></span>
      </a>
    </div></div>
    <section className="home-focus"><ParticleWave className="focus-wave" id="focus-wave" rows={22} phase={2.4} lift={-20} amplitude={38} /><div className="container focus-inner"><div><span className="section-kicker">TWO DISCIPLINES / ONE PERSPECTIVE</span><h2>Research-led.<br /><span>Engineering-grounded.</span></h2></div><div><p>My work connects large language models, interpretability, multi-agent systems, and domain-specific AI with a foundation in chemical engineering, process systems, and data-driven analysis. I focus on building and applying intelligent systems to solve complex, real-world challenges in engineering and industry.</p><div className="focus-links"><Link className="button lime-button" href="/projects">View My Work <span>↗</span></Link><Link className="button dark-outline" href="/contact">Contact Sandun <span>↗</span></Link></div></div></div></section>
    <section className="home-featured"><div className="container"><div className="featured-heading featured-heading-row"><h2><i /> Featured Projects</h2><p>A collection of research projects, personal builds, and applied ML/AI solutions across natural language processing, multi-agent systems, and chemical engineering.</p><Link className="featured-all-link" href="/projects">View All Projects <span>↗</span></Link></div><div className="home-project-grid">{projects.map((project, index) => <ProjectCard key={project.id ?? project.title} project={project} index={index} />)}</div></div></section>
  </div>;
}
