import Image from "next/image";

const gradCourses = ["Machine Learning", "Deep Learning", "Natural Language Processing", "Text Mining & Information Retrieval", "Big Data Technologies", "Artificial Intelligence", "Statistics & Probability"];
const chemCourses = ["Process Design", "Thermodynamics", "Mass & Energy Transfer", "Material Science", "Differential Equations"];
const roles = [
  ["people", "Vice President", "ACOBAs – East Coast, USA", "Helped coordinate chapter activities, community initiatives, and student networking opportunities.", "2023 – 2025", "city"],
  ["people", "Member", "American Institute of Chemical Engineers (AIChE)", "Active member involved in engineering community events and professional development activities.", "2022 – 2025", "event"],
  ["gear", "Chem-E-Car Team Lead", "AIChE Chem-E-Car Team", "Led the student team in building and refining a chemical-powered car for competition, coordinating design decisions and testing.", "2023 – 2025", "car"],
  ["cap", "Phi Theta Kappa Honor Society", "Academic Achievement", "Recognized for strong academic performance and commitment to learning.", "2021 – 2023", "books"],
];

function Icon({ name, size = 22 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "people") return <svg {...common}><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.2a5.5 5.5 0 0 1 11 0V20M16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V20"/><circle cx="16" cy="8.5" r="2.5"/></svg>;
  if (name === "gear") return <svg {...common}><path d="m10 2-.5 2.1a8 8 0 0 0-1.8.8L5.8 3.8 3.8 5.9l1.1 1.8a8 8 0 0 0-.7 1.8L2 10v3l2.2.5a8 8 0 0 0 .7 1.8l-1.1 1.8 2.1 2.1 1.8-1.1a8 8 0 0 0 1.8.7L10 21h3l.5-2.2a8 8 0 0 0 1.8-.7l1.8 1.1 2.1-2.1-1.1-1.8a8 8 0 0 0 .7-1.8L21 13v-3l-2.2-.5a8 8 0 0 0-.7-1.8l1.1-1.8-2.1-2.1-1.8 1.1a8 8 0 0 0-1.8-.7L13 2z"/><circle cx="11.5" cy="11.5" r="3.2"/></svg>;
  if (name === "cap") return <svg {...common}><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.8 3 8.2 3 12 0v-5M22 9v6"/></svg>;
  if (name === "laptop") return <svg {...common}><rect x="4" y="4" width="16" height="12" rx="1.5"/><path d="M2 20h20l-2-4H4l-2 4Z"/></svg>;
  if (name === "flask") return <svg {...common}><path d="M9 3h6M10 3v6l-6 10a1.4 1.4 0 0 0 1.2 2h13.6a1.4 1.4 0 0 0 1.2-2L14 9V3M7.5 16h9"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 3 19 6v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
  return <svg {...common}><path d="M3 20V8l9-5 9 5v12M7 20v-6h10v6M8 9h.01M12 9h.01M16 9h.01"/></svg>;
}

function SchoolMark({ kind }) {
  return kind === "rutgers" ? <span className="school-mark rutgers-mark" aria-label="Rutgers University">R</span> : <span className="school-mark stevens-mark" aria-label="Stevens Institute of Technology"><svg viewBox="0 0 42 42" aria-hidden="true"><path d="M21 2 37 10v18L21 40 5 28V10L21 2Z"/><path d="M12 27V17l9-6 9 6v10M17 27V20h8v7M9 31h24"/><path d="M19 8h4"/></svg></span>;
}

export default function EducationPage() {
  return <div className="subpage education-page">
    <div className="container page-intro"><div className="section-kicker">SANDUN MUNASINGHE / EDUCATION</div><div className="page-intro-row"><div><h1>Education</h1><p>A foundation in computer science and chemical engineering, combining AI research with engineering problem-solving.</p></div><span className="intro-aside page-description">Two complementary disciplines that shape my approach to building intelligent systems: machine learning and software development from Computer Science, and analytical thinking and domain expertise from Chemical Engineering.</span></div></div>
    <div className="container education-content">
      <h2 className="education-slogan">Always learning. Always moving forward.</h2>
      <section className="education-degrees"><span className="section-kicker">01 / DEGREES</span><div className="degree-grid">
        <article className="degree-card"><div className="degree-card-top"><SchoolMark kind="stevens"/><strong>STEVENS<small>INSTITUTE OF TECHNOLOGY</small></strong><span className="degree-status">2027<br/><i>Expected</i></span></div><h3>Master of Science in Computer Science</h3><p>Specialization: Machine Learning</p><p>Deepening my knowledge in machine learning, natural language processing, and scalable AI systems.</p><div className="degree-meta"><div><small>Expected Graduation</small><b>December 2027</b></div><div><small>GPA</small><b>3.75 / 4.00</b></div></div></article>
        <article className="degree-card"><div className="degree-card-top"><SchoolMark kind="rutgers"/><strong>RUTGERS<small>UNIVERSITY</small></strong><span className="degree-status completed">2025<br/><i>Completed</i></span></div><h3>Bachelor of Science in Chemical Engineering</h3><p>Cum Laude · Dean’s List</p><p>Built a strong foundation in engineering principles, mathematical modeling, and process systems.</p><div className="degree-meta"><div><small>Graduated</small><b>May 2025</b></div><a className="diploma-link" href="https://www.michaelsutter.com/ediploma?fn=diplomastatuscheck&key=02000000c90032f6758c233d5b00ba873929d5accafc59a8b4939721eecc4796d094fc217ebae1e071f8dd2b8fb0520341ab117a24fefa742046431ee61b5c4ecb5cbe5f" target="_blank" rel="noreferrer"><Icon name="shield" size={15}/> View Verified Digital Diploma <span>↗</span></a></div></article>
      </div></section>
      <section className="coursework-section"><span className="section-kicker">02 / SELECTED COURSEWORK</span><div className="coursework-grid">
        <article><b><Icon name="laptop"/></b><div><h3>Computer Science Coursework</h3><p>Selected courses most relevant to my research and work.</p></div><div className="course-pills">{gradCourses.map(course => <span key={course}>{course}</span>)}</div></article>
        <article><b><Icon name="flask"/></b><div><h3>Chemical Engineering Coursework</h3><p>Key courses that built my engineering foundation.</p></div><div className="course-pills">{chemCourses.map(course => <span key={course}>{course}</span>)}</div></article>
      </div></section>
      <section className="beyond-section"><span className="section-kicker">03 / BEYOND THE CLASSROOM</span><div>{roles.map(([icon, title, org, description, date, art]) => <article className="beyond-row" key={title}><b className="beyond-icon"><Icon name={icon} size={21}/></b><div className="beyond-copy"><h3>{title}</h3><p>{org}</p><small>{description}</small></div><time>{date}</time><div className={`beyond-art ${art}`}><Image src={`/education-${art}.jpg`} alt={{city:"New York City skyline at sunset",event:"Audience at a professional event",car:"Student-engineered Chem-E-Car",books:"Graduation cap and books"}[art]} width={250} height={80}/></div></article>)}</div></section>
    </div>
  </div>;
}
