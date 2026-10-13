const entries = [
  {
    section: "01 / MACHINE LEARNING & AI RESEARCH",
    role: "Graduate Research Assistant",
    organization: "Stevens Institute of Technology · ECAI Lab",
    date: "Jan 2026 – Present",
    focus: "LLM Truthfulness and Interpretability Research · Advisor: Zining Zhu",
    bullets: [
      "Developed an automated LLM evaluation pipeline using 790 TruthfulQA questions across four prompting conditions to investigate adversarial effects on model truthfulness.",
      "Evaluated GPT-5.6 Sol and Gemma 3 4B IT with automated truthfulness assessment and ROUGE metrics to analyze changes in model behavior.",
      "Developed a logit-lens analysis framework to investigate layer-wise model representations and changes in token-level predictions under adversarial prompting.",
    ],
    skills: ["Python", "PyTorch", "Hugging Face", "LLM Evaluation", "Model Interpretability"],
  },
  {
    section: "02 / PROFESSIONAL EXPERIENCE",
    role: "Operations & Customer Service Associate Manager",
    organization: "United States Postal Service",
    date: "Oct 2018 – Oct 2023",
    bullets: [
      "Applied demand-variability analysis to redesign staffing models across a 200K+ daily-package operation, reducing overtime costs by 20%.",
      "Led deployment of automated sorting systems (SDUS), troubleshooting integration issues and training 20+ staff to improve system adoption.",
      "Communicated performance insights and operational decisions to non-technical stakeholders and senior leadership.",
    ],
    skills: ["Operations Analysis", "Staffing Models", "Process Improvement", "Automated Sorting", "Leadership"],
  },
];

const activities = [
  {
    role: "Vice President",
    organization: "ACOBAs – East Coast, USA",
    date: "Jan 2025 – Present",
    bullets: [
      "Manage chapter finances and support executive decision-making.",
      "Co-organized the largest East Coast cricket festival, overseeing logistics, community partnerships, and charity fundraising.",
    ],
  },
  {
    role: "Member, AIChE Chem-E-Car Team",
    organization: "Rutgers University",
    date: "2024 – 2025",
    bullets: ["Designed, built, and competed with chemically powered model cars in national AIChE competitions."],
  },
  {
    role: "Member, Phi Theta Kappa Honor Society",
    organization: "Academic Excellence Recognition",
    date: "2020 – 2022",
    bullets: ["Inducted for academic excellence and demonstrated leadership."],
  },
];

function ExperienceEntry({ entry }) {
  return <article className="experience-entry">
    <time>{entry.date}</time><b className="timeline-mark" aria-hidden="true">●</b>
    <div className="experience-entry-copy">
      <h2>{entry.role}</h2>
      <h3>{entry.organization}</h3>
      {entry.focus && <p className="experience-focus">{entry.focus}</p>}
      <ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      {entry.skills && <div className="skill-pills">{entry.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>}
    </div>
  </article>;
}

function ActivityEntry({ entry }) {
  return <article className="experience-entry activity-entry">
    <time>{entry.date}</time><b className="timeline-mark" aria-hidden="true">●</b>
    <div className="experience-entry-copy">
      <h2>{entry.role}</h2><h3>{entry.organization}</h3>
      <ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
    </div>
  </article>;
}

export default function ExperiencePage() {
  return <div className="subpage experience-page">
    <div className="container page-intro">
      <div className="section-kicker">SANDUN MUNASINGHE / EXPERIENCE</div>
      <div className="page-intro-row">
        <div><h1>Experience</h1><p>Researching intelligent systems and improving real-world operations.</p></div>
        <span className="intro-aside page-description">Machine learning research, more than five years of operations experience, and leadership across academic and community teams.</span>
      </div>
    </div>
    <section className="container experience-list">
      {entries.map((entry) => <section className="experience-group" key={entry.section}>
        <span className="section-kicker">{entry.section}</span>
        <ExperienceEntry entry={entry} />
      </section>)}
      <section className="experience-group">
        <span className="section-kicker">03 / LEADERSHIP &amp; ACTIVITIES</span>
        {activities.map((entry) => <ActivityEntry entry={entry} key={`${entry.role}-${entry.date}`} />)}
      </section>
    </section>
  </div>;
}
