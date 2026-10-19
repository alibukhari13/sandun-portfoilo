import {
  createSupabaseAdminClient,
  hasBlogDataConfig,
  safeSupabaseRequest,
} from "@/lib/supabase";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getBlogImageUrl } from "@/lib/blogs";
import BlogPostForm from "./BlogPostForm";
import {
  createBlog,
  deleteBlog,
  login,
  logout,
  updateBlog,
} from "@/app/admin/actions";
import styles from "./admin.module.css";

const statusMessages = {
  created: "Draft saved.",
  updated: "Changes saved.",
  published: "Post published on the public blog.",
  unpublished: "Post returned to drafts.",
  deleted: "Post deleted.",
};

const errorMessages = {
  login: "Sign-in failed. Check the email and password.",
  unauthorized: "This account is not authorized to manage the blog.",
  "auth-config": "Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the server environment.",
  supabase: "Add the Supabase URL and service-role key to enable blog storage.",
  validation: "Check the title, excerpt, and content fields, then try again.",
  image: "Choose a JPEG, PNG, WebP, or AVIF image no larger than 3 MB.",
  save: "The change could not be saved. Please try again.",
};

function LoginPanel({ error }) {
  return <main className={styles.page}>
    <div className={styles.loginPanel}>
      <a className={styles.backLink} href="/blog">← Public blog</a>
      <span className={styles.kicker}>SANDUN MUNASINGHE / ADMIN</span>
      <h1>Sign in</h1>
      <p className={styles.intro}>Manage articles for the public blog.</p>
        {error && <p className={styles.alert} role="alert">{error}</p>}
      <form action={login} className={styles.form}>
        <label>Email<input type="email" name="email" autoComplete="username" required /></label>
        <label>Password<input type="password" name="password" autoComplete="current-password" required /></label>
        <button className={styles.primaryButton} type="submit">Sign in</button>
      </form>
    </div>
  </main>;
}

function PostRow({ post }) {
  return <article className={styles.postRow}>
    <div className={styles.postSummary}>
      <div>
        <span className={`${styles.status} ${post.published ? styles.live : ""}`}>
          {post.published ? "Published" : "Draft"}
        </span>
        <h2>{post.title}</h2>
        <p>/{post.slug} · Updated {new Date(post.updated_at).toLocaleDateString()}</p>
      </div>
      <div className={styles.rowActions}>
        <details className={styles.disclosure}>
          <summary>Edit</summary>
          <BlogPostForm action={updateBlog} post={post} imageUrl={getBlogImageUrl(post.image_path)} submitLabel="Save changes" />
        </details>
        <details className={`${styles.disclosure} ${styles.deleteDisclosure}`}>
          <summary>Delete</summary>
          <form action={deleteBlog} className={styles.deleteConfirm}>
            <input type="hidden" name="id" value={post.id} />
            <span>Delete this post permanently?</span>
            <button className={styles.deleteButton} type="submit">Confirm delete</button>
          </form>
        </details>
      </div>
    </div>
  </article>;
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  if (!(await isAdminSessionValid())) return <LoginPanel error={errorMessages[params?.error]} />;

  const databaseConfigured = hasBlogDataConfig();
  const result = databaseConfigured
    ? await safeSupabaseRequest(createSupabaseAdminClient()
      .from("blog_posts")
      .select("id, title, excerpt, content, slug, image_path, published, created_at, updated_at, published_at")
      .order("updated_at", { ascending: false }))
    : { data: null, error: { message: "Supabase is not configured" } };
  const posts = result.data ?? [];
  const error = result.error;

  return <main className={styles.page}>
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <a className={styles.backLink} href="/blog">← Public blog</a>
          <span className={styles.kicker}>SANDUN MUNASINGHE / ADMIN</span>
          <h1>Blog dashboard</h1>
          <p className={styles.intro}>Create, revise, and publish articles.</p>
        </div>
        <form action={logout}><button className={styles.secondaryButton} type="submit">Sign out</button></form>
      </header>

      {params?.status && statusMessages[params.status] && <p className={styles.success} role="status">{statusMessages[params.status]}</p>}
      {params?.error && <p className={styles.alert} role="alert">{errorMessages[params.error] ?? "Something went wrong."}</p>}

      <section className={styles.createSection}>
        <div className={styles.sectionHeading}>
          <div><span className={styles.kicker}>NEW ARTICLE</span><h2>Write a post</h2></div>
          <span className={styles.counter}>{posts.length} {posts.length === 1 ? "post" : "posts"}</span>
        </div>
        <BlogPostForm action={createBlog} submitLabel="Save article" />
      </section>

      <section className={styles.postsSection}>
        <div className={styles.sectionHeading}>
          <div><span className={styles.kicker}>LIBRARY</span><h2>All articles</h2></div>
        </div>
        {error && <p className={styles.alert} role="alert">{databaseConfigured ? "Articles could not be loaded. Check the Supabase schema and service role key." : errorMessages.supabase}</p>}
        {!error && posts.length === 0 && <p className={styles.emptyState}>No articles yet. Your saved posts will appear here.</p>}
        {!error && posts.map((post) => <PostRow key={post.id} post={post} />)}
      </section>
    </div>
  </main>;
}