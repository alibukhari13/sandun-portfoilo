function ContactIcon({ name }) {
  const icons = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    work: <><path d="M3 8h18v12H3zM8 8V5h8v3M3 13h18M10 13v2h4v-2"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    research: <><path d="M9 3h6m-5 0v6l-5.5 9.3A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.7L14 9V3m-7 12h10"/></>,
    job: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18m-11 0v2h4v-2"/></>,
    code: <><path d="m8 8-5 4 5 4m8-8 5 4-5 4m-3-9-2 10"/></>,
    connect: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1m1-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1"/></>,
  };
  return <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg></span>;
}

function ProfileMark({ type }) {
  if (type === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>;
  if (type === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 8.3H1.8V22h3.3V8.3ZM3.45 2a1.92 1.92 0 1 0 0 3.84 1.92 1.92 0 0 0 0-3.84ZM22.2 14.15c0-4.12-2.2-6.04-5.14-6.04a4.44 4.44 0 0 0-4 2.2V8.3H9.8V22h3.27v-6.78c0-1.79.34-3.52 2.55-3.52 2.17 0 2.2 2.04 2.2 3.64V22h3.28l1.1-7.85Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>;
}

function FieldIcon({ name }) {
  const paths = {
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-3.2 3-5 7-5s6.3 1.8 7 5"/></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    topic: <><path d="M4 6h16M4 12h10M4 18h7"/><circle cx="18" cy="16" r="3"/></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-3.5-.7L4 20l1.4-3.4A7 7 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z"/></>,
  };
  return <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function FieldControl({ icon, children }) {
  return <span className="field-control"><FieldIcon name={icon}/>{children}</span>;
}

const topics = [
  ["⚗", "Research Collaboration", "ML, LLMs, multi-agent systems, or scientific machine learning."],
  ["▣", "Job Opportunities", "Internships, full-time roles, and research positions."],
  ["‹/›", "Project Discussion", "Technical challenges, new ideas, or open-source contributions."],
  ["♧", "Networking", "Connect and learn from each other’s experiences."],
];

const questions = [
  ["What types of opportunities are you open to?", "Research opportunities, internships, full-time roles, and collaborations in machine learning, AI, and chemical engineering."],
  ["Do you respond to unsolicited research ideas?", "Yes. I’m happy to hear thoughtful research ideas and project proposals."],
  ["Are you open to remote opportunities?", "Yes, I’m open to discussing remote opportunities and collaborations."],
  ["What is the best way to reach you?", "Email is the best way to get in touch: sandunmunasinghe2017@gmail.com."],
];

export default function ContactPage() {
  return <div className="subpage contact-page">
    <div className="container page-intro">
      <div className="section-kicker">SANDUN MUNASINGHE / CONTACT</div>
      <div className="page-intro-row"><div><h1>Contact</h1><p>Have a research idea, an opportunity, or a project in mind?<br/>I’d love to hear from you.</p></div><span className="intro-aside page-description">I’m open to machine learning and AI opportunities, research collaborations, and interesting technical challenges at the intersection of computer science and chemical engineering.</span></div>
    </div>
    <section className="container contact-main">
      <div className="contact-copy">
        <h2>Let’s build something<br/><span>meaningful.</span></h2>
        <p className="contact-lede">I’m open to machine learning and AI opportunities, research collaborations, project discussions, and technical conversations at the intersection of computer science and chemical engineering.</p>
        <div className="contact-method"><ContactIcon name="email"/><p><small>Email</small><a href="mailto:sandunmunasinghe2017@gmail.com">sandunmunasinghe2017@gmail.com ↗</a></p></div>
        <div className="contact-method"><ContactIcon name="location"/><p><small>Location</small><span>Hoboken, New Jersey, USA</span></p></div>
        <div className="contact-method"><ContactIcon name="work"/><p><small>Open to</small><span>Research opportunities · Internships · Full-time roles<br/>Collaborations · Technical discussions</span></p></div>
        <div className="contact-profiles"><a href="https://github.com/sandunmunasinghe91?tab=repositories" target="_blank" rel="noreferrer"><ProfileMark type="github"/>GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/sandun-munasinghe-268a1a27b" target="_blank" rel="noreferrer"><ProfileMark type="linkedin"/>LinkedIn <span>↗</span></a><a href="mailto:sandunmunasinghe2017@gmail.com"><ProfileMark type="email"/>Email <span>↗</span></a></div>
      </div>
      <form className="message-card" action="mailto:sandunmunasinghe2017@gmail.com" method="post" encType="text/plain">
        <div className="message-heading"><ContactIcon name="send"/><div><h3>Send a message</h3><p>I’ll get back to you as soon as possible.</p></div></div>
        <label>Your name *<FieldControl icon="user"><input required name="name" placeholder="Enter your name"/></FieldControl></label>
        <label>Your email *<FieldControl icon="email"><input required name="email" type="email" placeholder="you@example.com"/></FieldControl></label>
        <label>What is this about?<FieldControl icon="topic"><select name="topic" defaultValue=""><option value="" disabled>Select a topic</option><option>Research collaboration</option><option>Job opportunity</option><option>Project discussion</option><option>Networking</option><option>Other</option></select></FieldControl></label>
        <label>Your message *<FieldControl icon="message"><textarea required name="message" placeholder="Tell me about your idea, opportunity, or question..." rows="5"/></FieldControl></label>
        <button className="button lime-button" type="submit">Send Message <span>↗</span></button>
        <small className="form-privacy"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>I’ll only use your information to respond to your message.</small>
      </form>
    </section>
    <section className="container contact-extras">
      <div><span className="section-kicker"><i/> TYPICAL TOPICS</span><h2>Ways we can work together.</h2><p>Some common reasons people reach out.</p><div className="topic-grid">{topics.map(([, name, text], i) => <article key={name}><ContactIcon name={["research", "job", "code", "connect"][i]}/><div><b>{name}</b><p>{text}</p></div></article>)}</div></div>
      <div className="faq-block"><span className="section-kicker"><i/> FAQ</span><h2>Quick answers.</h2><p>A few common questions about getting in touch.</p>{questions.map(([q,a]) => <details key={q}><summary>{q}<span>›</span></summary><p>{a}</p></details>)}</div>
    </section>
  </div>;
}
