export default function BlogPage() {
  return <div className="subpage upcoming-page blog-page">
    <div className="container page-intro">
      <div className="section-kicker">SANDUN MUNASINGHE / BLOG</div>
      <div className="page-intro-row"><div><h1>Blog</h1><p>A space for research notes, ideas, and exploration.</p></div><span className="intro-aside page-description">Notes on machine learning, interpretability, multi-agent systems, and engineering.</span></div>
    </div>
    <section className="container upcoming-grid">
      <article className="upcoming-card">
        <span className="section-kicker">01 / BLOG</span>
        <div className="upcoming-mark" aria-hidden="true">✳</div>
        <h2>Notes from<br />the research desk.</h2>
        <p>Articles coming soon.</p>
        <span className="coming-label"><i /> A space for ideas, insights, and exploration.</span>
      </article>
    </section>
  </div>;
}
