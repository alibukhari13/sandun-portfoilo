import Image from "next/image";
import styles from "./blog.module.css";

export default function BlogPage({ posts = [] }) {
  return <div className="subpage upcoming-page blog-page">
    <div className="container page-intro">
      <div className="section-kicker">SANDUN MUNASINGHE / BLOG</div>
      <div className="page-intro-row"><div><h1>Blog</h1><p>A space for research notes, ideas, and exploration.</p></div><span className="intro-aside page-description">Notes on machine learning, interpretability, multi-agent systems, and engineering.</span></div>
    </div>
    <section className={`container ${styles.posts}`}>
      {posts.length === 0 ? <article className={styles.empty}>
        <span className="section-kicker">01 / BLOG</span>
        <h2>Notes from the research desk.</h2>
        <p>New articles will appear here.</p>
      </article> : posts.map((post) => <article className={styles.post} key={post.id}>
        <div className={styles.postMeta}>
          <span className="section-kicker">RESEARCH NOTES / {post.slug}</span>
          <time dateTime={post.published_at ?? post.created_at}>
            {new Date(post.published_at ?? post.created_at).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
        <h2>{post.title}</h2>
        {post.imageUrl && <Image className={styles.coverImage} src={post.imageUrl} alt={post.title} width={1600} height={900} unoptimized />}
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <div className={styles.content}>{post.content}</div>
      </article>)}
    </section>
  </div>;
}
