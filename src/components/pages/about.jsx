import Image from "next/image";
import Link from "next/link";

const stats = [["10K+", "Research papers processed"], ["790", "TruthfulQA questions evaluated"], ["2+", "AI projects (research + applied)"], ["5+ years", "Operations & data experience"]];
const skills = ["Python", "PyTorch", "LLMs", "NLP", "Transformers", "Multi-Agent Systems", "Machine Learning", "Data Analysis", "SQL", "Chemical Engineering", "Process Systems", "Engineering Analysis", "Optimization", "Statistical Analysis", "Git", "Linux", "LaTeX"];

function AboutIcon({ name }) {
  const paths = {
    brain: <><path d="M12 4.2a3 3 0 0 0-5.7 1.2A3.2 3.2 0 0 0 4 10.8a3.5 3.5 0 0 0 2.2 5.9 3 3 0 0 0 5.8 1.1V4.2Z"/><path d="M12 4.2a3 3 0 0 1 5.7 1.2 3.2 3.2 0 0 1 2.3 5.4 3.5 3.5 0 0 1-2.2 5.9 3 3 0 0 1-5.8 1.1M8 8.5c1.6 0 2.4 1 2.4 2.2M7.2 14c1.4-.3 2.5.3 2.8 1.6m5-7.1c-1.6 0-2.4 1-2.4 2.2m3.2 3.3c-1.4-.3-2.5.3-2.8 1.6"/></>,
    gear: <><path d="m10 2-.5 2.1a8 8 0 0 0-1.8.8L5.8 3.8 3.7 5.9 4.8 7.8A8 8 0 0 0 4 9.6L2 10v3l2 .5a8 8 0 0 0 .8 1.8l-1.1 1.9 2.1 2.1 1.9-1.1a8 8 0 0 0 1.8.8l.5 2h3l.5-2a8 8 0 0 0 1.8-.8l1.9 1.1 2.1-2.1-1.1-1.9a8 8 0 0 0 .8-1.8l2-.5v-3l-2-.4a8 8 0 0 0-.8-1.8l1.1-1.9-2.1-2.1-1.9 1.1a8 8 0 0 0-1.8-.8L13 2h-3Z"/><circle cx="11.5" cy="11.5" r="3.2"/></>,
    document: <><path d="M6 3h8l5 5v13H6zM14 3v5h5M9 13h7m-7 4h7"/></>,
    database: <><ellipse cx="12" cy="5" rx="7.5" ry="3"/><path d="M4.5 5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5m-15 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/></>,
    users: <><path d="M16 20v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V20m6-8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6.5-6.5a3 3 0 0 1 0 5.8m1.5 3a4 4 0 0 1 3 3.8V20"/></>,
    flask: <><path d="M9 3h6m-5 0v6l-5.2 9a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9V3m-7 11h10"/></>,
    cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.5 2.8 8.5 2.8 12 0v-5M22 9v6"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11-1v3h4v-3"/></>,
  };
  return <svg className="about-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function AboutPage() {
  return <div className="subpage about-page">
    <div className="container page-intro"><div className="section-kicker">SANDUN MUNASINGHE / ABOUT</div><div className="page-intro-row"><div><h1>About</h1><p>An engineering mindset. A curiosity for intelligence.</p></div><blockquote className="about-quote">“ Turning complex problems into intelligent systems. ”</blockquote></div></div>
    <section className="container about-profile">
      <div className="about-photo">
        <Image src="/sandun-portrait.png" alt="Sandun Munasinghe seated in a navy suit" fill sizes="(max-width: 700px) 90vw, 36vw" />
        <div className="about-photo-glow" aria-hidden="true" />
        <div className="about-photo-caption"><strong>Sandun Munasinghe</strong><span>Graduate Research Assistant &amp; Machine Learning Engineer</span></div>
      </div>
      <div className="about-copy">
        <span className="section-kicker">01 / ME</span>
        <h2>An Engineering Mindset.<br /><span>A Passion for Intelligent Systems.</span></h2>
        <p>I’m currently pursuing a Master’s degree in Computer Science with a specialization in Machine Learning at Stevens Institute of Technology. As a Graduate Research Assistant at the ECAI Lab, I research large language model (LLM) truthfulness and interpretability, develop multi-agent AI systems, and build transformer-based language models from scratch using PyTorch.</p>
        <p>Before focusing on AI, I earned my Bachelor’s degree in Chemical Engineering from Rutgers University and gained more than five years of professional experience in operations. At the United States Postal Service, I applied data-driven analysis to improve staffing decisions, operational efficiency, and automated sorting processes.</p>
        <p>Today, I combine my engineering problem-solving background with machine learning to build practical, intelligent systems that address real-world challenges across engineering and industry.</p>
        <div className="about-actions"><a className="button lime-button" href="/assets/Sandun_Munasinghe.pdf" target="_blank" rel="noreferrer">View Resume <span>↗</span></a><Link className="button dark-outline" href="/projects">Explore Projects <span>↗</span></Link></div>
      </div>
    </section>
    <section className="container about-drive">
      <span className="section-kicker">02 / WHAT DRIVES ME</span>
      <div className="about-pillars">
        <article className="drive-research"><span className="pillar-icon lime"><AboutIcon name="brain" /></span><h3>AI Research &amp; Development</h3><p>Exploring LLM truthfulness, interpretability, multi-agent systems, and transformer architectures through research and hands-on development.</p></article>
        <article className="drive-engineering"><span className="pillar-icon mint"><AboutIcon name="gear" /></span><h3>Engineering &amp; Problem-Solving</h3><p>Bringing chemical engineering knowledge, operational experience, and analytical thinking to complex technical challenges.</p></article>
      </div>
    </section>
    <section className="container about-impact">
      <span className="section-kicker">03 / IMPACT IN NUMBERS</span>
      <div className="stats-strip">{stats.map(([value, label], i) => <div key={label}><b><AboutIcon name={["document", "database", "users", "flask"][i]} /></b><p><strong>{value}</strong><small>{label}</small></p></div>)}</div>
    </section>
    <section className="container about-records">
      <span className="section-kicker">04 / EDUCATION &amp; EXPERIENCE</span>
      <div className="about-record-grid">
        <article>
          <h3><AboutIcon name="cap" />Education</h3>
          <div className="record-row"><b className="record-brand stevens-mark">S</b><p><strong>Stevens Institute of Technology</strong><small>M.S. in Computer Science (Machine Learning)<br />Hoboken, NJ</small></p><time>2024 – 2027<br />(Expected)</time></div>
          <div className="record-row"><b className="record-brand rutgers-mark">R</b><p><strong>Rutgers University</strong><small>B.S. in Chemical Engineering<br />New Brunswick, NJ</small></p><time>2018 – 2022</time></div>
        </article>
        <article>
          <h3><AboutIcon name="briefcase" />Professional Experience</h3>
          <div className="record-row"><b className="record-brand usps-mark">USPS</b><p><strong>United States Postal Service</strong><small>Data Analyst<br />Analyzed operational data to improve staffing decisions and processing efficiency. Supported automated sorting systems through data-driven insights and analysis.</small></p><time>2022 – 2024</time></div>
          <div className="record-row"><b className="record-brand reckitt-mark">R</b><p><strong>Reckitt Benckiser</strong><small>Process &amp; Quality Engineering Associate<br />Supported process improvement and quality initiatives. Worked on operational efficiency and process optimization projects.</small></p><time>2021</time></div>
        </article>
      </div>
    </section>
    <section className="container about-skills"><span className="section-kicker">05 / CORE TECHNICAL SKILLS</span><div className="skill-pills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>
  </div>;
}
