import {
  createSupabaseAdminClient,
  hasBlogDataConfig,
  safeSupabaseRequest,
} from "@/lib/supabase";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getBlogImageUrl } from "@/lib/blogs";
import { listLocalPosts } from "@/lib/local-blog-store";
import {
  defaultPortfolioSettings,
} from "@/lib/portfolio-content";
import BlogPostForm from "./BlogPostForm";
import ProjectForm from "./ProjectForm";
import PortfolioSettingsForm from "./PortfolioSettingsForm";
import {
  createBlog,
  createProject,
  deleteBlog,
  deleteProject,
  login,
  logout,
  savePortfolioSettings,
  updateProject,
  updateBlog,
} from "@/app/admin/actions";
import styles from "./admin.module.css";

const statusMessages = {
  created: "Draft saved.",
  updated: "Changes saved.",
  published: "Post published on the public blog.",
  unpublished: "Post returned to drafts.",
  deleted: "Post deleted.",
  "project-created": "Project added to the portfolio.",
  "project-updated": "Project changes saved.",
  "project-deleted": "Project deleted.",
  "settings-updated": "Site details saved.",
};

const errorMessages = {
  login: "Sign-in failed. Check the email and password.",
  unauthorized: "This account is not authorized to manage the blog.",
  "auth-config":
    "Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in the server environment.",
  supabase: "Add the Supabase URL and service-role key to enable blog storage.",
  database:
    "Add the Supabase URL and service-role key, then apply supabase/schema.sql to enable portfolio editing.",
  validation: "Check the title, excerpt, and content fields, then try again.",
  image: "Choose a JPEG, PNG, WebP, or AVIF image no larger than 3 MB.",
  save: "The change could not be saved. Please try again.",
};

function LoginPanel({ error }) {
  return (
    <main className={styles.page}>
      <div className={styles.loginPanel}>
        <a className={styles.backLink} href="/blog">
          ← Public blog
        </a>
        <span className={styles.kicker}>SANDUN MUNASINGHE / ADMIN</span>
        <h1>Sign in</h1>
        <p className={styles.intro}>Manage articles for the public blog.</p>
        {error && (
          <p className={styles.alert} role="alert">
            {error}
          </p>
        )}
        <form action={login} className={styles.form}>
          <label>
            Email
            <input type="email" name="email" autoComplete="username" required />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className={styles.primaryButton} type="submit">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

function PostRow({ post }) {
  return (
    <article className={styles.postRow}>
      <div className={styles.postSummary}>
        <div>
          <span
            className={`${styles.status} ${post.published ? styles.live : ""}`}
          >
            {post.published ? "Published" : "Draft"}
          </span>
          <h2>{post.title}</h2>
          <p>
            /{post.slug} · Updated{" "}
            {new Date(post.updated_at).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.rowActions}>
          <details className={styles.disclosure}>
            <summary>Edit</summary>
            <BlogPostForm
              action={updateBlog}
              post={post}
              imageUrl={getBlogImageUrl(post.image_path)}
              submitLabel="Save changes"
            />
          </details>
          <details
            className={`${styles.disclosure} ${styles.deleteDisclosure}`}
          >
            <summary>Delete</summary>
            <form action={deleteBlog} className={styles.deleteConfirm}>
              <input type="hidden" name="id" value={post.id} />
              <span>Delete this post permanently?</span>
              <button className={styles.deleteButton} type="submit">
                Confirm delete
              </button>
            </form>
          </details>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ project }) {
  return (
    <article className={styles.postRow}>
      <div className={styles.postSummary}>
        <div>
          <span className={styles.status}>{project.group_name}</span>
          <h2>{project.title}</h2>
          <p>Display order: {project.sort_order}</p>
        </div>
        <div className={styles.rowActions}>
          <details className={styles.disclosure}>
            <summary>Edit</summary>
            <ProjectForm
              action={updateProject}
              project={project}
              submitLabel="Save project"
            />
          </details>
          <details className={`${styles.disclosure} ${styles.deleteDisclosure}`}>
            <summary>Delete</summary>
            <form action={deleteProject} className={styles.deleteConfirm}>
              <input type="hidden" name="id" value={project.id} />
              <span>Delete this project permanently?</span>
              <button className={styles.deleteButton} type="submit">
                Confirm delete
              </button>
            </form>
          </details>
        </div>
      </div>
    </article>
  );
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const databaseConfigured = hasBlogDataConfig();
  const signedIn = await isAdminSessionValid();
  if (!signedIn || params?.screen === "login") {
    return <LoginPanel error={errorMessages[params?.error]} />;
  }
  const result = databaseConfigured
    ? await safeSupabaseRequest(
        createSupabaseAdminClient()
          .from("blog_posts")
          .select(
            "id, title, excerpt, content, slug, image_path, published, created_at, updated_at, published_at",
          )
          .order("updated_at", { ascending: false }),
      )
    : { data: await listLocalPosts(), error: null };
  const posts = result.data ?? [];
  const error = result.error;
  const portfolioResult = databaseConfigured
    ? await Promise.all([
        safeSupabaseRequest(
          createSupabaseAdminClient()
            .from("portfolio_projects")
            .select(
              "id, group_name, title, summary, problem, approach, key_results, result_label, goal, tags, link, kind, label, art, badge, sort_order",
            )
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: true }),
        ),
        safeSupabaseRequest(
          createSupabaseAdminClient()
            .from("portfolio_settings")
            .select("settings")
            .eq("id", "main")
            .maybeSingle(),
        ),
      ])
    : [
        { data: null, error: { message: "Supabase is not configured" } },
        { data: null, error: { message: "Supabase is not configured" } },
      ];
  const projects = portfolioResult[0].data ?? [];
  const portfolioSettings = {
    ...defaultPortfolioSettings,
    ...(portfolioResult[1].data?.settings ?? {}),
  };
  const portfolioError =
    portfolioResult.find((item) => item.error)?.error ?? null;

  return (
    <main className={styles.page}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div>
            <a className={styles.backLink} href="/blog">
              ← Public blog
            </a>
            <span className={styles.kicker}>SANDUN MUNASINGHE / ADMIN</span>
            <h1>Portfolio dashboard</h1>
            <p className={styles.intro}>
              Manage portfolio projects and site details, and create, revise,
              publish, or delete blog articles.
            </p>
          </div>
          <form action={logout}>
            <button className={styles.secondaryButton} type="submit">
              Sign out
            </button>
          </form>
        </header>

        {params?.status && statusMessages[params.status] && (
          <p className={styles.success} role="status">
            {statusMessages[params.status]}
          </p>
        )}
        {params?.error && (
          <p className={styles.alert} role="alert">
            {errorMessages[params.error] ?? "Something went wrong."}
          </p>
        )}

        <section className={styles.createSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>PROJECTS</span>
              <h2>Add a project</h2>
            </div>
            <span className={styles.counter}>
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          {portfolioError && (
            <p className={styles.alert} role="alert">
              {errorMessages.database}
            </p>
          )}
          <ProjectForm action={createProject} submitLabel="Add project" />
        </section>

        <section className={styles.postsSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>LIBRARY</span>
              <h2>Portfolio projects</h2>
            </div>
          </div>
          {!portfolioError && projects.length === 0 && (
            <p className={styles.emptyState}>No projects have been added.</p>
          )}
          {!portfolioError &&
            projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
        </section>

        <section className={styles.createSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>SITE DETAILS</span>
              <h2>Contact, social links, and shared copy</h2>
            </div>
          </div>
          <PortfolioSettingsForm
            action={savePortfolioSettings}
            settings={portfolioSettings}
          />
        </section>

        <section className={styles.createSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>NEW ARTICLE</span>
              <h2>Write a post</h2>
            </div>
            <span className={styles.counter}>
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>
          <BlogPostForm action={createBlog} submitLabel="Save article" />
        </section>

        <section className={styles.postsSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.kicker}>LIBRARY</span>
              <h2>All articles</h2>
            </div>
          </div>
          {error && (
            <p className={styles.alert} role="alert">
              {databaseConfigured
                ? "Articles could not be loaded. Check the Supabase schema and service role key."
                : errorMessages.supabase}
            </p>
          )}
          {!error && posts.length === 0 && (
            <p className={styles.emptyState}>
              No articles yet. Your saved posts will appear here.
            </p>
          )}
          {!error && posts.map((post) => <PostRow key={post.id} post={post} />)}
        </section>
      </div>
    </main>
  );
}
